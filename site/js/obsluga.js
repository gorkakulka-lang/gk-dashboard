// Ekran obsługi: skan kodu gościa, krok, wydanie nagrody, cofnięcie pomyłki, witryna, zgubiona karta.
import { rpc, pamiec, esc } from './api.js';
import { ladnie } from './wolacz.js';
import { svgQr } from './qr.js';
import QrScanner from '/vendor/qr-scanner.min.js';

const app = document.getElementById('app');
const K_TOKEN = 'gk.obsluga.token';
const K_LOKAL = 'gk.obsluga.lokal';

let token = pamiec(K_TOKEN);
let lokal = null;
try {
  lokal = JSON.parse(pamiec(K_LOKAL) || 'null');
} catch (e) {
  lokal = null;
}
let skaner = null;
let zajety = false;
let blokada = 0; // do kiedy ignorujemy skany po ostatnim wyniku
let ostatniKod = '';
let ostatniCzas = 0;
let zegarWyniku = null;
let dzwiek = null;
let blokadaEkranu = null;
let widok = 'skan';
let witryna = null;

const ZAKLADKI = [
  ['skan', 'Skan'],
  ['witryna', 'Witryna'],
  ['zguba', 'Zguba'],
];
const zakladki = (tu) =>
  `<nav class="zakladki" aria-label="Zakładki">${ZAKLADKI.map(
    ([z, nazwa]) => `<button type="button" data-z="${z}"${tu === z ? ' class="tu" aria-current="page"' : ''}>${nazwa}</button>`,
  ).join('')}</nav>`;

function podlaczZakladki() {
  app.querySelectorAll('.zakladki button').forEach((b) =>
    b.addEventListener('click', () => {
      odblokujDzwiek();
      if (b.dataset.z === 'witryna') pokazWitryne();
      else if (b.dataset.z === 'zguba') pokazZgube();
      else pokazSkaner();
    }),
  );
}

const pasek = (prawy) =>
  `<header class="pasek"><img class="logo" src="/img/logo.png" alt="Górka &amp; Kulka" width="900" height="133"><span>${prawy}</span></header>`;

// ===== Parowanie urządzenia =====

async function pokazParowanie(komunikat = '') {
  zatrzymaj();
  let lokale = [];
  let siec = true;
  try {
    lokale = await rpc('karta_lokale');
  } catch (e) {
    siec = false;
  }
  const gotowe = lokale.filter((l) => l.gotowy);
  const pierwszy = gotowe[0] ? gotowe[0].slug : '';
  const lista = lokale
    .map(
      (l) => `<label class="lokal${l.gotowy ? '' : ' wyl'}">
        <input type="radio" name="lokal" value="${esc(l.slug)}"${l.gotowy ? '' : ' disabled'}${l.slug === pierwszy ? ' checked' : ''}>
        <span>${esc(l.nazwa)}${l.gotowy ? '' : ' (bez kodu)'}</span></label>`,
    )
    .join('');
  const brak = !siec
    ? 'Nie udało się połączyć. Sprawdź internet i odśwież stronę.'
    : gotowe.length
      ? komunikat
      : 'Żaden lokal nie ma jeszcze kodu. Właściciel ustawia go w panelu.';
  app.innerHTML = `${pasek('Obsługa')}
    <section class="tekst"><h1>Połącz to urządzenie.</h1><p>Wybierz lokal i wpisz 6-cyfrowy kod lokalu. Robisz to raz.</p></section>
    <form class="formularz" id="par" novalidate>
      <div class="lokale" role="radiogroup" aria-label="Lokal">${lista}</div>
      <label class="pole" for="pin">Kod lokalu</label>
      <input class="kod6" id="pin" name="pin" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="off" placeholder="······">
      <p class="blad" id="blad" role="alert">${esc(brak)}</p>
      <button class="guzik" type="submit"${gotowe.length ? '' : ' disabled'}>Połącz</button>
    </form>`;
  document.getElementById('par').addEventListener('submit', paruj);
}

async function paruj(ev) {
  ev.preventDefault();
  const f = ev.currentTarget;
  const blad = document.getElementById('blad');
  const wybrany = f.querySelector('input[name=lokal]:checked');
  const pin = f.pin.value.trim();
  if (!wybrany) return void (blad.textContent = 'Wybierz lokal.');
  if (!/^[0-9]{6}$/.test(pin)) return void (blad.textContent = 'Kod lokalu ma 6 cyfr.');
  const guzik = f.querySelector('button');
  guzik.disabled = true;
  let odp;
  try {
    odp = await rpc('karta_obsluga_paruj', { p_lokal: wybrany.value, p_pin: pin, p_nazwa: (navigator.platform || '').slice(0, 40) });
  } catch (e) {
    odp = { ok: false, blad: 'siec' };
  }
  if (!odp.ok) {
    guzik.disabled = false;
    blad.textContent =
      {
        pin: 'Zły kod lokalu.',
        blokada: 'Za dużo błędnych prób. Spróbuj za kwadrans.',
        lokal: 'Ten lokal nie ma kodu albo jest wyłączony.',
      }[odp.blad] || 'Nie udało się połączyć. Spróbuj jeszcze raz.';
    return;
  }
  token = odp.token;
  lokal = odp.lokal;
  pamiec(K_TOKEN, token);
  pamiec(K_LOKAL, JSON.stringify(lokal));
  odblokujDzwiek();
  pokazSkaner();
}

// ===== Skaner =====

function pokazSkaner() {
  widok = 'skan';
  clearTimeout(zegarWyniku);
  app.innerHTML = `${pasek(esc(lokal ? lokal.nazwa : ''))}
    ${zakladki('skan')}
    <section class="kamera"><video id="wideo" playsinline muted></video><p class="kamera-info" id="kinfo">Uruchamiam aparat…</p></section>
    <section class="wynik" id="wynik" aria-live="assertive"></section>
    <form class="recznie" id="recznie" novalidate>
      <input id="numer" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="7" autocomplete="off" placeholder="Numer karty, np. 127" aria-label="Numer karty gościa">
      <button class="maly" type="submit">Dodaj krok</button>
    </form>
    <footer class="stopka"><span id="dzis"></span><button class="link" id="odlacz" type="button">Odłącz</button></footer>`;
  spokoj();
  podlaczZakladki();
  document.getElementById('wynik').addEventListener('click', klik);
  document.getElementById('recznie').addEventListener('submit', (ev) => {
    ev.preventDefault();
    odblokujDzwiek();
    const pole = document.getElementById('numer');
    const v = pole.value.trim();
    if (!/^[0-9]{1,7}$/.test(v)) return;
    pole.value = '';
    pole.blur();
    wyslij(v, false);
  });
  document.getElementById('odlacz').addEventListener('click', () => {
    if (confirm('Odłączyć to urządzenie? Żeby znów skanować, trzeba będzie wpisać kod lokalu.')) rozlacz('');
  });
  uruchom();
  dzis();
}

async function uruchom() {
  const wideo = document.getElementById('wideo');
  const info = document.getElementById('kinfo');
  if (!wideo) return;
  try {
    skaner = new QrScanner(wideo, (w) => zeskanowano(w.data), {
      preferredCamera: 'environment',
      highlightScanRegion: true,
      highlightCodeOutline: true,
      maxScansPerSecond: 8,
      returnDetailedScanResult: true,
    });
    await skaner.start();
    info.textContent = '';
    nieGasEkranu();
  } catch (e) {
    info.textContent = 'Aparat niedostępny. Zezwól na aparat w przeglądarce albo wpisz numer karty ręcznie.';
  }
}

function zatrzymaj() {
  if (skaner) {
    try {
      skaner.stop();
      skaner.destroy();
    } catch (e) {
      /* już zatrzymany */
    }
    skaner = null;
  }
}

function zeskanowano(tekst) {
  const teraz = Date.now();
  if (!/^GK1:[0-9A-Z]{10}$/i.test(tekst)) return; // obce kody ignorujemy
  if (zajety || teraz < blokada) return;
  if (tekst === ostatniKod && teraz - ostatniCzas < 8000) return; // ten sam kod wciąż przed aparatem
  ostatniKod = tekst;
  ostatniCzas = teraz;
  wyslij(tekst, false);
}

async function wywolaj(funkcja, argumenty) {
  zajety = true;
  try {
    const odp = await rpc(funkcja, { p_token: token, ...argumenty });
    if (!odp.ok && odp.blad === 'urzadzenie') {
      rozlacz('To urządzenie zostało odłączone. Połącz je ponownie.');
      return null;
    }
    return odp;
  } catch (e) {
    return { ok: true, wynik: 'siec' };
  } finally {
    zajety = false;
    blokada = Date.now() + 2500;
  }
}

async function wyslij(kod, wymus) {
  const odp = await wywolaj('karta_obsluga_skan', { p_kod: kod, p_wymus: wymus });
  if (odp) pokazWynik(odp, kod);
}

const kropki = (n) => {
  let s = '';
  for (let i = 0; i < 10; i++) s += `<span${i < n ? ' class="jest"' : ''}></span>`;
  return `<div class="mkropki" aria-hidden="true">${s}</div>`;
};

function spokoj() {
  const el = document.getElementById('wynik');
  if (!el) return;
  el.className = 'wynik';
  el.innerHTML = '<p class="cicho">Skieruj aparat na kod gościa. Jedna wizyta to jeden krok.</p>';
}

function pokazWynik(o, kod) {
  const el = document.getElementById('wynik');
  if (!el) return;
  const imie = esc(ladnie(o.imie || '').split(' ')[0]);
  const wydaj = '<div class="rzad"><button type="button" data-wydaj="lody">Wydaj lody</button><button type="button" data-wydaj="kawa">Wydaj kawę</button></div>';
  let klasa = 'wynik';
  let html = '';
  let ton = 'ok';
  switch (o.wynik) {
    case 'krok':
      klasa += ' dobrze';
      html = `<p class="kto">${imie}</p><p class="co">Krok ${o.stan.n} z 10</p>${kropki(o.stan.n)}`;
      if (o.stan.nagroda) {
        html += `<p class="cicho">To dziesiąty krok. Nagroda czeka: wydać teraz?</p>${wydaj}`;
        ton = 'nagroda';
      }
      html += `<button class="link" type="button" data-cofnij="${Number(o.krok_id)}">Cofnij ten krok</button>`;
      break;
    case 'nagroda':
      klasa += ' nagroda';
      ton = 'nagroda';
      html = `<p class="kto">${imie}</p><p class="co">Nagroda czeka</p>${wydaj}<button class="link" type="button" data-wymus="1">Gość coś kupuje: tylko dodaj krok</button>`;
      break;
    case 'wydano':
      klasa += ' dobrze';
      html = `<p class="kto">${imie}</p><p class="co">Wydano: ${o.rodzaj === 'kawa' ? 'kawa' : 'duża porcja lodów'}</p><button class="link" type="button" data-cofnij-nagrode="${Number(o.nagroda_id)}">Cofnij wydanie</button>`;
      break;
    case 'duplikat':
      klasa += ' info';
      ton = '';
      html = `<p class="kto">${imie}</p><p class="co">Krok już dodany ${o.sekund < 60 ? 'przed chwilą' : 'kilka minut temu'}</p>${kropki(o.stan.n)}<p class="cicho">Jedna wizyta to jeden krok.</p>`;
      break;
    case 'brak-nagrody':
      klasa += ' info';
      ton = '';
      html = `<p class="kto">${imie}</p><p class="co">Nagroda już wydana</p>`;
      break;
    case 'cofnieto':
      klasa += ' info';
      ton = '';
      html = `<p class="co">Cofnięte</p>${o.stan ? kropki(o.stan.n) : ''}`;
      break;
    case 'za-pozno':
    case 'po-nagrodzie':
      klasa += ' info';
      ton = '';
      html = '<p class="co">Tego już nie cofnę</p><p class="cicho">Cofnąć można własny skan z ostatnich 10 minut.</p>';
      break;
    case 'nieznany':
      klasa += ' zle';
      ton = 'zle';
      html = '<p class="co">Nie znam tej karty</p><p class="cicho">Poproś gościa o odświeżenie strony albo wpisz numer karty.</p>';
      break;
    default:
      klasa += ' zle';
      ton = 'zle';
      html = '<p class="co">Brak połączenia</p><p class="cicho">Krok nie został dodany. Spróbuj jeszcze raz.</p>';
  }
  el.className = klasa;
  el.innerHTML = html;
  el.dataset.kod = kod || el.dataset.kod || '';
  sygnal(ton);
  clearTimeout(zegarWyniku);
  zegarWyniku = setTimeout(spokoj, o.wynik === 'nagroda' || (o.stan && o.stan.nagroda) ? 90000 : 25000);
  if (o.wynik === 'krok' || o.wynik === 'wydano' || o.wynik === 'cofnieto') dzis();
}

async function klik(ev) {
  const b = ev.target.closest('button');
  if (!b || zajety) return;
  const kod = document.getElementById('wynik').dataset.kod;
  let odp = null;
  if (b.dataset.wydaj) odp = await wywolaj('karta_obsluga_wydaj', { p_kod: kod, p_rodzaj: b.dataset.wydaj });
  else if (b.dataset.cofnij) odp = await wywolaj('karta_obsluga_cofnij', { p_krok_id: Number(b.dataset.cofnij) });
  else if (b.dataset.cofnijNagrode) odp = await wywolaj('karta_obsluga_cofnij_nagrode', { p_nagroda_id: Number(b.dataset.cofnijNagrode) });
  else if (b.dataset.wymus) return wyslij(kod, true);
  if (odp) pokazWynik(odp, kod);
}

async function dzis() {
  const el = document.getElementById('dzis');
  if (!el || !token) return;
  try {
    const o = await rpc('karta_obsluga_dzis', { p_token: token });
    if (!o.ok) return;
    const k = o.kroki;
    const n = o.nagrody;
    el.textContent = `Dziś: ${k} ${k === 1 ? 'krok' : k % 10 >= 2 && k % 10 <= 4 && (k % 100 < 12 || k % 100 > 14) ? 'kroki' : 'kroków'}, ${n} ${n === 1 ? 'nagroda' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'nagrody' : 'nagród'}`;
  } catch (e) {
    /* licznik nie jest krytyczny */
  }
}

function rozlacz(komunikat) {
  token = null;
  lokal = null;
  pamiec(K_TOKEN, null);
  pamiec(K_LOKAL, null);
  pokazParowanie(komunikat);
}

// ===== Witryna: co jest dziś w lodach =====

const hhmm = (iso) => new Date(iso).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });

function rysujWitryne() {
  const stan = document.getElementById('wstan');
  const lista = document.getElementById('wlista');
  if (!stan || !lista) return;
  if (!witryna) {
    stan.textContent = 'Nie udało się pobrać listy smaków. Sprawdź internet.';
    return;
  }
  const ile = witryna.smaki.filter((s) => s.jest).length;
  stan.textContent = witryna.dzisiaj
    ? `W witrynie: ${ile}. Potwierdzona dziś o ${hhmm(witryna.potwierdzona)}.`
    : `W witrynie: ${ile}. Dziś jeszcze niepotwierdzona: zaznacz smaki i stuknij „Witryna aktualna”.`;
  lista.innerHTML = witryna.smaki
    .map((s) => `<button type="button" class="wsmak${s.jest ? ' jest' : ''}" data-smak="${s.id}" aria-pressed="${s.jest}"><span>${esc(s.nazwa)}</span><small>${s.jest ? 'w witrynie' : 'nie ma'}</small></button>`)
    .join('');
}

async function pokazWitryne() {
  widok = 'witryna';
  zatrzymaj();
  clearTimeout(zegarWyniku);
  app.innerHTML = `${pasek(esc(lokal ? lokal.nazwa : ''))}
    ${zakladki('witryna')}
    <p class="wstan" id="wstan" role="status">Pobieram listę smaków…</p>
    <div class="wlista" id="wlista"></div>
    <div class="wstopka"><button class="guzik" id="wpotw" type="button">Witryna aktualna</button></div>`;
  podlaczZakladki();
  document.getElementById('wlista').addEventListener('click', async (ev) => {
    const b = ev.target.closest('.wsmak');
    if (!b || !witryna) return;
    const s = witryna.smaki.find((x) => x.id === Number(b.dataset.smak));
    if (!s) return;
    s.jest = !s.jest; // od razu na ekranie, baza potwierdza za chwilę
    rysujWitryne();
    const o = await wywolaj('karta_obsluga_witryna_ustaw', { p_smak: s.id, p_jest: s.jest });
    if (!o) return;
    if (o.ok && o.potwierdzona) {
      witryna.potwierdzona = o.potwierdzona;
      witryna.dzisiaj = true;
    } else {
      s.jest = !s.jest;
      sygnal('zle');
    }
    if (widok === 'witryna') rysujWitryne();
  });
  document.getElementById('wpotw').addEventListener('click', async () => {
    const o = await wywolaj('karta_obsluga_witryna_potwierdz', {});
    if (o && o.ok && witryna) {
      witryna.potwierdzona = o.potwierdzona;
      witryna.dzisiaj = true;
      sygnal('ok');
      rysujWitryne();
    }
  });
  const o = await wywolaj('karta_obsluga_witryna', {});
  if (!o) return;
  witryna = o.ok ? o : null;
  if (widok === 'witryna') rysujWitryne();
}

// ===== Zguba: gość nie ma karty w telefonie =====

function pokazZgube() {
  widok = 'zguba';
  zatrzymaj();
  clearTimeout(zegarWyniku);
  app.innerHTML = `${pasek(esc(lokal ? lokal.nazwa : ''))}
    ${zakladki('zguba')}
    <section class="tekst"><h1>Karta zniknęła z telefonu?</h1><p>Wpisz e-mail, na który gość założył kartę. Pokażesz mu kod, którym przywróci ją u siebie.</p></section>
    <form class="formularz" id="zguba" novalidate>
      <label class="pole" for="zemail">E-mail gościa</label>
      <input id="zemail" name="email" type="email" inputmode="email" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="254" placeholder="np. ania@example.com">
      <p class="blad" id="zblad" role="alert"></p>
      <button class="guzik" type="submit">Szukaj karty</button>
    </form>`;
  podlaczZakladki();
  document.getElementById('zguba').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const f = ev.currentTarget;
    const blad = document.getElementById('zblad');
    const guzik = f.querySelector('button');
    const email = f.email.value.trim();
    blad.textContent = '';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s.]{2,}$/.test(email)) {
      blad.textContent = 'Sprawdź e-mail, coś się w nim nie zgadza.';
      return;
    }
    guzik.disabled = true;
    const o = await wywolaj('karta_obsluga_odzysk', { p_email: email });
    if (!o || widok !== 'zguba') return; // urządzenie odłączone albo obsługa wyszła z zakładki
    if (o.wynik === 'kod') return pokazKodZguby(o);
    guzik.disabled = false;
    blad.textContent =
      {
        nieznany: 'Nie ma karty na ten e-mail. Sprawdź literówki albo załóżcie nową kartę.',
        limit: 'Za dużo wyszukiwań z tego urządzenia. Spróbuj za godzinę.',
      }[o.wynik] || 'Brak połączenia. Spróbuj jeszcze raz.';
    sygnal('zle');
  });
}

function pokazKodZguby(o) {
  const imie = esc(ladnie(o.imie || '').split(' ')[0]);
  const kod = String(o.kod).replace(/\D/g, '');
  app.innerHTML = `${pasek(esc(lokal ? lokal.nazwa : ''))}
    ${zakladki('zguba')}
    <section class="wynik dobrze zguba-kto"><p class="kto">${imie}</p><p class="co">Karta nr ${Number(o.numer)}</p>${kropki(o.stan.n)}</section>
    <section class="kod-karta zguba-kod">
      <div class="qr">${svgQr(`${location.origin}/?o=${kod}`, 'Kod QR do przywrócenia karty')}</div>
      <div class="podpis"><b>${kod.slice(0, 4)} ${kod.slice(4)}</b></div>
    </section>
    <p class="wstan">Zgadza się imię? Gość kieruje aparat telefonu na ten kod. Może też otworzyć stronę karty, stuknąć „Mam już kartę” i wpisać cyfry. Kod działa 10 minut.</p>
    <div class="wstopka"><button class="guzik" id="zgotowe" type="button">Gotowe</button></div>`;
  podlaczZakladki();
  document.getElementById('zgotowe').addEventListener('click', pokazSkaner);
  sygnal('ok');
  zegarWyniku = setTimeout(() => widok === 'zguba' && pokazSkaner(), 600000); // kod i tak przestał działać
}

// ===== Dźwięk i ekran =====

function odblokujDzwiek() {
  try {
    if (!dzwiek) dzwiek = new (window.AudioContext || window.webkitAudioContext)();
    if (dzwiek.state === 'suspended') dzwiek.resume();
  } catch (e) {
    dzwiek = null;
  }
}

function sygnal(ton) {
  if (!ton) return;
  if (navigator.vibrate) navigator.vibrate(ton === 'zle' ? [80, 60, 80] : 60);
  if (!dzwiek || dzwiek.state !== 'running') return;
  const nuty = ton === 'zle' ? [[220, 0, 0.22]] : ton === 'nagroda' ? [[660, 0, 0.1], [880, 0.12, 0.1], [1100, 0.24, 0.16]] : [[880, 0, 0.12]];
  for (const [hz, kiedy, ile] of nuty) {
    const o = dzwiek.createOscillator();
    const g = dzwiek.createGain();
    o.frequency.value = hz;
    o.connect(g);
    g.connect(dzwiek.destination);
    const t = dzwiek.currentTime + kiedy;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.25, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + ile);
    o.start(t);
    o.stop(t + ile + 0.02);
  }
}

async function nieGasEkranu() {
  try {
    if ('wakeLock' in navigator && !blokadaEkranu) {
      blokadaEkranu = await navigator.wakeLock.request('screen');
      blokadaEkranu.addEventListener('release', () => (blokadaEkranu = null));
    }
  } catch (e) {
    /* nie wszędzie dostępne */
  }
}

document.addEventListener('visibilitychange', () => {
  if (!skaner || widok !== 'skan') return;
  if (document.visibilityState === 'visible') {
    skaner.start().then(nieGasEkranu).catch(() => {});
    dzis();
  } else {
    skaner.stop();
  }
});
document.addEventListener('pointerdown', odblokujDzwiek, { once: true });

if (token && lokal) pokazSkaner();
else pokazParowanie();
