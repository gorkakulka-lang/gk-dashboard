// Karta gościa: zapis, droga Kulki i Górki, kod do skanu.
import { rpc, pamiec, esc, czekaj } from './api.js';
import { wolacz, ladnie } from './wolacz.js';
import { svgQr } from './qr.js';

const app = document.getElementById('app');
const K_TOKEN = 'gk.karta.token';
const K_STAN = 'gk.karta.stan';
const K_LOKAL = 'gk.karta.lokal';
const POL = (164.3 + 12) / 2; // tyle pikseli każda postać przechodzi przez 10 kroków
const BEZ_RUCHU = matchMedia('(prefers-reduced-motion: reduce)').matches;
const ZGODA_TEKST = 'Piszcie mi o nowych smakach.';
const PAMIEC_STRONY = '/api/karta'; // ciasteczko ustawiane przez serwer strony, patrz netlify/edge-functions/karta.js
const WZOR_KLUCZA = /^[0-9a-f]{48}$/;

let token = null;
let stan = null; // ostatni stan z bazy
let ekran = { n: 0, nagroda: false }; // to, co właśnie widać w scenie
let widok = null;
let zajete = false; // trwa animacja
let dopisek = null; // jednorazowe zdanie zamiast zasady (powitanie, smacznego)
let zegar = null;
let dzis = null; // ostatnia odpowiedź „Dziś u nas”
let utrwalony = null; // klucz, który w tej wizycie trafił już do ciasteczka

const xK = (n) => 8 + (POL * n) / 10;
const xG = (n) => 264.5 - (POL * n) / 10;

function naglowek(n, nagroda) {
  if (nagroda) return 'Spotkały się!';
  const zostalo = 10 - n;
  if (zostalo <= 1) return 'Kulkę i Górkę dzieli jeszcze 1 krok.';
  if (zostalo <= 4) return `Kulkę i Górkę dzielą jeszcze ${zostalo} kroki.`;
  return `Kulkę i Górkę dzieli jeszcze ${zostalo} kroków.`;
}

function zasada(nagroda) {
  if (dopisek) return dopisek;
  return nagroda
    ? 'Masz dużą porcję lodów albo kawę gratis. Potem ruszają do siebie od nowa.'
    : 'Każda Twoja wizyta zbliża je o krok. Gdy się spotkają, masz dużą porcję lodów albo kawę gratis.';
}

const gora = (prawy = '') =>
  `<header class="gora"><img class="logo" src="/img/logo.png" alt="Górka &amp; Kulka" width="900" height="133">${prawy}</header>`;

// Dolne menu: karta (droga albo zapis) i „Dziś u nas”.
const dol = (tu) =>
  `<nav class="dol" aria-label="Miejsca w aplikacji"><a href="#"${tu === 'karta' ? ' class="tu" aria-current="page"' : ''}>${token ? 'Droga' : 'Karta'}</a><a href="#dzis"${tu === 'dzis' ? ' class="tu" aria-current="page"' : ''}>Dziś u nas</a></nav>`;

function scena(n, nagroda) {
  let kropki = '';
  for (let i = 0; i < 10; i++) kropki += `<span class="kropka${i < n ? ' jest' : ''}"><i></i></span>`;
  return `<div class="scena${nagroda ? ' nagroda' : ''}">
    <img class="rozek" src="/img/rozek.jpg" alt="${nagroda ? 'Chromowy rożek z kulkami' : ''}" width="452" height="900">
    <span class="kolo" aria-hidden="true"></span>
    <div class="postac gorka" style="transform:translateX(${xG(n).toFixed(1)}px)"><div class="skok"><img src="/img/gorka.webp" alt="Górka" width="358" height="640"></div></div>
    <div class="postac kulka" style="transform:translateX(${xK(n).toFixed(1)}px)"><div class="skok"><img src="/img/kulka.webp" alt="Kulka" width="281" height="640"></div></div>
    <div class="kropki" role="img" aria-label="Pieczątki: ${n} z 10">${kropki}</div>
  </div>`;
}

// ===== Widoki =====

function pokazDroge() {
  widok = 'droga';
  app.dataset.widok = widok;
  const { n, nagroda } = ekran;
  app.innerHTML = `${gora()}
    <section class="tekst" id="tekst">
      <p class="czesc">Cześć, ${esc(wolacz(stan.imie))}!</p>
      <h1 id="naglowek">${esc(naglowek(n, nagroda))}</h1>
      <p id="zasada">${esc(zasada(nagroda))}</p>
    </section>
    <section class="scena-ramka" id="ramka">${scena(n, nagroda)}</section>
    <a class="guzik" id="guzik" href="#kod">${nagroda ? 'Odbierz nagrodę' : 'Pokaż kod przy ladzie'}</a>
    ${dol('karta')}`;
  dopasuj();
}

function pokazKod() {
  widok = 'kod';
  app.dataset.widok = widok;
  const nag = ekran.nagroda;
  app.innerHTML = `${gora('<a class="link" href="#">Wróć</a>')}
    <section class="tekst">
      <h1>${nag ? 'Pokaż kod i odbierz nagrodę.' : 'Pokaż ten kod przy ladzie.'}</h1>
      <p>${nag ? 'Duża porcja lodów albo kawa. Wybierasz przy ladzie.' : 'Obsługa skanuje go raz, a Kulka i Górka zbliżają się o krok.'}</p>
    </section>
    <section class="kod-karta">
      <div class="qr">${svgQr('GK1:' + stan.kod, 'Kod QR Twojej karty', 'Alphanumeric')}</div>
      <div class="podpis"><b>${esc(ladnie(stan.imie).split(' ')[0])}</b><span>G&amp;K ${String(stan.numer).padStart(6, '0')}</span></div>
    </section>
    <div class="odstep"></div>
    <div class="scena-mini" aria-hidden="true">${scena(ekran.n, false)}</div>`;
}

function pokazZapis() {
  widok = 'zapis';
  app.dataset.widok = widok;
  app.innerHTML = `${gora('<a class="link" href="#mam">Mam już kartę</a>')}
    <section class="tekst">
      <h1>Pomóż im się spotkać.</h1>
      <p>Każda Twoja wizyta zbliża Kulkę i Górkę o krok. Gdy się spotkają, masz dużą porcję lodów albo kawę gratis.</p>
    </section>
    <form class="formularz" id="zapis" novalidate>
      <label class="pole" for="imie">Imię</label>
      <input id="imie" name="imie" type="text" autocomplete="given-name" autocapitalize="words" maxlength="40" placeholder="np. Ania" required>
      <label class="pole" for="email">E-mail</label>
      <input id="email" name="email" type="email" inputmode="email" autocomplete="email" autocapitalize="none" spellcheck="false" maxlength="254" placeholder="np. ania@example.com" required>
      <label class="zgoda"><input type="checkbox" id="zgoda" name="zgoda"><span>${ZGODA_TEKST}</span></label>
      <p class="blad" id="blad" role="alert"></p>
      <button class="guzik" type="submit" id="wyslij">Załóż kartę</button>
      <p class="drobne">Zakładając kartę, akceptujesz <a href="/regulamin/">regulamin</a> i <a href="/prywatnosc/">politykę prywatności</a>.</p>
    </form>
    <div class="odstep"></div>
    <div class="scena-mini" aria-hidden="true">${scena(0, false)}</div>
    ${dol('karta')}`;
  document.getElementById('zapis').addEventListener('submit', zapisz);
}

function pokazMam(blad = '') {
  widok = 'mam';
  app.dataset.widok = widok;
  app.innerHTML = `${gora('<a class="link" href="#">Wróć</a>')}
    <section class="tekst">
      <h1>Masz już kartę?</h1>
      <p>Powiedz przy ladzie, na jaki e-mail była założona. Dostaniesz kod i wpiszesz go tutaj.</p>
    </section>
    <form class="formularz" id="odzysk" novalidate>
      <label class="pole" for="okod">Kod od obsługi</label>
      <input class="kod8" id="okod" name="kod" type="text" inputmode="numeric" pattern="[0-9 ]*" maxlength="9" autocomplete="off" placeholder="8 cyfr">
      <p class="blad" id="blad" role="alert">${esc(blad)}</p>
      <button class="guzik" type="submit" id="wyslij">Przywróć kartę</button>
    </form>`;
  document.getElementById('odzysk').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const pole = document.getElementById('okod');
    const info = document.getElementById('blad');
    const guzik = document.getElementById('wyslij');
    const kod = pole.value.replace(/\D/g, '');
    info.textContent = '';
    if (kod.length !== 8) {
      info.textContent = BLEDY_ODZYSKU.dlugosc;
      pole.focus();
      return;
    }
    guzik.disabled = true;
    guzik.textContent = 'Przywracam…';
    const kodBledu = await odzyskaj(kod);
    if (!kodBledu || widok !== 'mam') return;
    guzik.disabled = false;
    guzik.textContent = 'Przywróć kartę';
    info.textContent = BLEDY_ODZYSKU[kodBledu] || BLEDY_ODZYSKU.siec;
  });
}

// ===== Przywracanie karty kodem od obsługi =====

const BLEDY_ODZYSKU = {
  dlugosc: 'Kod od obsługi ma 8 cyfr.',
  kod: 'Ten kod nie działa albo minął jego czas. Poproś przy ladzie o nowy.',
  limit: 'Za dużo prób. Spróbuj za godzinę.',
  siec: 'Nie udało się połączyć. Sprawdź internet i spróbuj jeszcze raz.',
};

// Zwraca null, gdy karta wróciła, albo kod błędu.
async function odzyskaj(kod) {
  let odp;
  try {
    odp = await rpc('karta_odzyskaj', { p_kod: kod });
  } catch (e) {
    odp = { ok: false, blad: 'siec' };
  }
  if (!odp.ok) return odp.blad || 'siec';
  token = odp.token;
  stan = odp.stan;
  pamiec(K_TOKEN, token);
  pamiec(K_STAN, JSON.stringify(stan));
  utrwal();
  ekran = { n: Math.min(10, stan.n), nagroda: !!stan.nagroda };
  ustawAdres('');
  dopisek = 'Karta wróciła. Kulka i Górka czekały na Ciebie.';
  pokazDroge();
  dopisek = null;
  window.scrollTo(0, 0);
  ustawTempo();
  return null;
}

// ===== Pamięć karty po stronie strony =====
// Safari kasuje pamięć strony (localStorage) po 7 dniach bez wizyty. Ciasteczka ustawionego
// przez serwer ta reguła nie dotyczy, więc klucz karty leży w obu miejscach.

async function zeStrony() {
  const ster = new AbortController();
  const stoper = setTimeout(() => ster.abort(), 3000);
  try {
    const odp = await fetch(PAMIEC_STRONY, { credentials: 'same-origin', cache: 'no-store', signal: ster.signal });
    if (!odp.ok) return null;
    const d = await odp.json();
    return d && typeof d.token === 'string' && WZOR_KLUCZA.test(d.token) ? d.token : null;
  } catch (e) {
    return null; // bez tej pamięci karta działa jak dotąd
  } finally {
    clearTimeout(stoper);
  }
}

function naStrone(klucz) {
  return fetch(PAMIEC_STRONY, {
    method: 'POST',
    credentials: 'same-origin',
    cache: 'no-store',
    keepalive: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: klucz }),
  }).catch(() => {});
}

function utrwal() {
  if (!token || utrwalony === token) return;
  utrwalony = token;
  naStrone(token);
}

// ===== Dziś u nas: lody w witrynach =====

const godz = (t) => t.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });

function kiedyOstatnio(iso) {
  const t = new Date(iso);
  const wczoraj = new Date();
  wczoraj.setDate(wczoraj.getDate() - 1);
  const dzien = t.toDateString() === wczoraj.toDateString() ? 'wczoraj' : t.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' });
  return `${dzien}, ${godz(t)}`;
}

function rysujDzis() {
  let srodek;
  if (!dzis) {
    srodek = '<p class="stan-witryny">Sprawdzam witryny…</p>';
  } else if (dzis.blad) {
    srodek = '<p class="stan-witryny">Nie udało się sprawdzić witryn. Spróbuj za chwilę.</p>';
  } else {
    const lokale = dzis.lokale;
    let slug = pamiec(K_LOKAL);
    if (!lokale.some((l) => l.slug === slug)) slug = lokale[0] ? lokale[0].slug : null;
    const l = lokale.find((x) => x.slug === slug);
    const moje = new Set(dzis.moje.map((m) => m.id));
    const przelacznik =
      lokale.length > 1
        ? `<div class="przelacznik" role="group" aria-label="Lokal">${lokale
            .map((x) => `<button type="button" data-lokal="${esc(x.slug)}" aria-pressed="${x.slug === slug}"${x.slug === slug ? ' class="tu"' : ''}>${esc(x.nazwa)}</button>`)
            .join('')}</div>`
        : '';
    let stanWitryny = 'Żaden lokal nie jest teraz czynny.';
    let lista = '';
    let brak = '';
    if (l) {
      if (!l.potwierdzona) stanWitryny = `${esc(l.nazwa)}: jeszcze bez listy smaków.`;
      else if (l.dzisiaj) stanWitryny = `Witryna potwierdzona dziś o ${godz(new Date(l.potwierdzona))}.`;
      else stanWitryny = `Dziś jeszcze bez potwierdzenia. Ostatni stan: ${kiedyOstatnio(l.potwierdzona)}.`;
      const smaki = l.smaki.slice().sort((a, b) => moje.has(b.id) - moje.has(a.id) || a.nazwa.localeCompare(b.nazwa, 'pl'));
      lista = smaki
        .map(
          (s) => `<li><button type="button" class="smak-kolko" data-smak="${s.id}" aria-pressed="${moje.has(s.id)}" aria-label="${esc(s.nazwa)}: ${moje.has(s.id) ? 'mój smak, stuknij, żeby odznaczyć' : 'oznacz jako mój smak'}"></button><span class="smak-nazwa">${esc(s.nazwa)}</span>${s.sorbet && !/^sorbet/i.test(s.nazwa) ? '<small class="smak-znak">sorbet</small>' : ''}</li>`,
        )
        .join('');
      if (l.potwierdzona && !smaki.length) lista = '<li><span class="smak-nazwa">Witryna jest teraz pusta.</span></li>';
      // ulubione, których w tym lokalu dziś nie ma (i gdzie są)
      const tutaj = new Set(l.smaki.map((s) => s.id));
      const nieMa = dzis.moje
        .filter((m) => !tutaj.has(m.id))
        .map((m) => {
          const gdzie = lokale.filter((x) => x.slug !== slug && x.smaki.some((s) => s.id === m.id)).map((x) => x.nazwa);
          return esc(m.nazwa) + (gdzie.length ? ` (jest w: ${esc(gdzie.join(', '))})` : '');
        });
      if (nieMa.length) brak = `<p class="dopisek">Twoje smaki, których tu dziś nie ma: ${nieMa.join(', ')}.</p>`;
    }
    const zacheta = token
      ? '<p class="dopisek">Stuknij kółko przy smaku, żeby oznaczyć go jako swój. Będzie na górze listy, gdy trafi do witryny.</p>'
      : '<p class="dopisek">Z kartą oznaczysz swoje smaki, a każda wizyta zbliży Kulkę i Górkę o krok.</p><a class="guzik" href="#">Załóż kartę</a>';
    srodek = `${przelacznik}<p class="stan-witryny" role="status">${stanWitryny}</p><ul class="smaki">${lista}</ul>${brak}${zacheta}`;
  }
  app.innerHTML = `${gora(token ? '' : '<a class="link" href="#mam">Mam już kartę</a>')}
    <section class="tekst"><h1>Dziś u nas.</h1></section>
    ${srodek}
    <div class="odstep"></div>
    ${dol('dzis')}`;
  app.querySelectorAll('.przelacznik button').forEach((b) =>
    b.addEventListener('click', () => {
      pamiec(K_LOKAL, b.dataset.lokal);
      rysujDzis();
    }),
  );
  app.querySelectorAll('.smak-kolko').forEach((b) => b.addEventListener('click', () => przelaczSmak(Number(b.dataset.smak))));
}

async function zaladujDzis() {
  try {
    const o = await rpc('karta_dzis', { p_token: token });
    if (o && o.ok) dzis = o;
  } catch (e) {
    if (!dzis) dzis = { blad: true };
  }
  if (widok === 'dzis') rysujDzis();
}

function pokazDzis() {
  widok = 'dzis';
  app.dataset.widok = widok;
  rysujDzis();
  zaladujDzis();
}

async function przelaczSmak(id) {
  if (!token) return komunikat('Żeby zapamiętać swoje smaki, załóż kartę.');
  if (!dzis || dzis.blad) return;
  const byl = dzis.moje.some((m) => m.id === id);
  let nazwa = '';
  dzis.lokale.forEach((l) => l.smaki.forEach((s) => s.id === id && (nazwa = s.nazwa)));
  const przed = dzis.moje;
  dzis.moje = byl ? przed.filter((m) => m.id !== id) : przed.concat([{ id, nazwa }]);
  rysujDzis();
  let odp;
  try {
    odp = await rpc('karta_ulubiony', { p_token: token, p_smak: id, p_jest: !byl });
  } catch (e) {
    odp = { ok: false };
  }
  if (!odp.ok) {
    dzis.moje = przed;
    if (widok === 'dzis') rysujDzis();
    komunikat('Nie udało się zapisać. Spróbuj jeszcze raz.');
    setTimeout(() => komunikat(''), 3500);
  }
}

// ===== Zapis =====

const BLEDY = {
  imie: 'Wpisz imię: same litery, bez cyfr.',
  email: 'Sprawdź e-mail, coś się w nim nie zgadza.',
  istnieje: 'Ten e-mail ma już kartę. Stuknij „Mam już kartę” na górze.',
  limit: 'Za dużo zapisów naraz. Spróbuj za chwilę.',
  siec: 'Nie udało się połączyć. Sprawdź internet i spróbuj jeszcze raz.',
};

async function zapisz(ev) {
  ev.preventDefault();
  const f = ev.currentTarget;
  const blad = document.getElementById('blad');
  const guzik = document.getElementById('wyslij');
  const imie = f.imie.value.trim().replace(/\s+/g, ' ');
  const email = f.email.value.trim();
  const pokaz = (kod, pole) => {
    blad.textContent = BLEDY[kod] || BLEDY.siec;
    if (pole) pole.focus();
  };
  blad.textContent = '';
  if (imie.length < 2 || !/^\p{L}[\p{L} .'-]*$/u.test(imie)) return pokaz('imie', f.imie);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s.]{2,}$/.test(email)) return pokaz('email', f.email);
  guzik.disabled = true;
  guzik.textContent = 'Zakładam…';
  let odp;
  try {
    odp = await rpc('karta_zapis', { p_imie: imie, p_email: email, p_zgoda: f.zgoda.checked });
  } catch (e) {
    odp = { ok: false, blad: 'siec' };
  }
  if (!odp.ok) {
    guzik.disabled = false;
    guzik.textContent = 'Załóż kartę';
    return pokaz(odp.blad, odp.blad === 'imie' ? f.imie : odp.blad === 'email' || odp.blad === 'istnieje' ? f.email : null);
  }
  token = odp.token;
  stan = odp.stan;
  pamiec(K_TOKEN, token);
  pamiec(K_STAN, JSON.stringify(stan));
  utrwal();
  ustawAdres('');
  // Powitanie: gość widzi start drogi, a po chwili pierwszy krok w prezencie.
  const cel = { n: Math.min(10, stan.n), nagroda: !!stan.nagroda };
  ekran = { n: Math.max(0, cel.n - 1), nagroda: false };
  dopisek = 'Pierwszy krok jest od nas. Każda Twoja wizyta zbliża je o następny, a gdy się spotkają, masz dużą porcję lodów albo kawę gratis.';
  pokazDroge();
  dopisek = null;
  window.scrollTo(0, 0);
  ustawTempo();
  await czekaj(700);
  await doPrzodu(cel);
}

// ===== Ruch =====

function dopasuj() {
  const ramka = document.getElementById('ramka');
  if (!ramka) return;
  const sc = ramka.querySelector('.scena');
  const wys = sc.classList.contains('nagroda') ? 450 : 300;
  const s = Math.min(1, ramka.clientWidth / 390, ramka.clientHeight / wys);
  sc.style.setProperty('--s', Math.max(0.4, s).toFixed(4));
}

function krok(sc, a, b) {
  const kropka = sc.querySelectorAll('.kropka')[b - 1];
  const kulka = sc.querySelector('.kulka');
  const gorka = sc.querySelector('.gorka');
  const tekst = () => {
    sc.querySelector('.kropki').setAttribute('aria-label', `Pieczątki: ${b} z 10`);
    const h = document.getElementById('naglowek');
    if (h && b < 10) h.textContent = naglowek(b, false); // przy dziesiątym kroku tekst zmienia dopiero spotkanie
  };
  if (BEZ_RUCHU) {
    kropka.classList.add('jest');
    kulka.style.transform = `translateX(${xK(b).toFixed(1)}px)`;
    gorka.style.transform = `translateX(${xG(b).toFixed(1)}px)`;
    tekst();
    return Promise.resolve();
  }
  setTimeout(tekst, 100);
  // stempel na kropce
  const stempel = kropka.querySelector('i').animate(
    [
      { opacity: 0, transform: 'scale(1.9)' },
      { opacity: 1, transform: 'scale(.88)', offset: 0.6 },
      { opacity: 1, transform: 'scale(1)' },
    ],
    { duration: 260, easing: 'ease-out', fill: 'forwards' },
  );
  stempel.finished.then(() => {
    kropka.classList.add('jest');
    stempel.cancel();
  });
  // krok z podskokiem: Kulka rusza pierwsza, Górka ułamek sekundy po niej
  const idz = (el, x0, x1, opoznienie, kier) => {
    const ruch = el.animate(
      [{ transform: `translateX(${x0.toFixed(1)}px)` }, { transform: `translateX(${x1.toFixed(1)}px)` }],
      { duration: 420, delay: opoznienie, easing: 'ease-in-out', fill: 'both' },
    );
    el.querySelector('.skok').animate(
      [
        { transform: 'translateY(0) rotate(0deg)', easing: 'ease-out' },
        { transform: `translateY(-11px) rotate(${3 * kier}deg)`, easing: 'ease-in' },
        { transform: 'translateY(0) rotate(0deg)' },
      ],
      { duration: 420, delay: opoznienie },
    );
    return ruch.finished.then(() => {
      el.style.transform = `translateX(${x1.toFixed(1)}px)`;
      ruch.cancel();
    });
  };
  return Promise.all([idz(kulka, xK(a), xK(b), 70, 1), idz(gorka, xG(a), xG(b), 140, -1)]);
}

// Krótkie przygaszenie tekstu i sceny na czas podmiany treści.
async function przejscie(zmiana) {
  const czesci = () => [document.getElementById('tekst'), document.getElementById('ramka')].filter(Boolean);
  if (BEZ_RUCHU) {
    zmiana();
    return;
  }
  czesci().forEach((e) => e.classList.add('znika'));
  await czekaj(190);
  zmiana();
  const nowe = czesci();
  nowe.forEach((e) => e.classList.add('znika'));
  void document.body.offsetWidth;
  nowe.forEach((e) => e.classList.remove('znika'));
  await czekaj(220);
}

async function spotkanie() {
  await przejscie(() => {
    ekran.nagroda = true;
    pokazDroge();
  });
  if (BEZ_RUCHU) return;
  app.querySelectorAll('#ramka .postac .skok').forEach((f, i) =>
    f.animate(
      [
        { transform: 'translateY(0)', easing: 'ease-out' },
        { transform: 'translateY(-18px)', easing: 'ease-in' },
        { transform: 'translateY(0)', easing: 'ease-out' },
        { transform: 'translateY(-8px)', easing: 'ease-in' },
        { transform: 'translateY(0)' },
      ],
      { duration: 720, delay: i * 60 },
    ),
  );
  const rozek = app.querySelector('#ramka .rozek');
  if (rozek) rozek.animate([{ transform: 'translateY(-16px)' }, { transform: 'translateY(0)' }], { duration: 520, easing: 'cubic-bezier(.2,.8,.2,1)' });
  await czekaj(780);
}

async function doPrzodu(cel) {
  zajete = true;
  try {
    if (widok !== 'droga') {
      ustawAdres('');
      pokazDroge();
      ustawTempo();
      window.scrollTo(0, 0);
      await czekaj(450);
    }
    const sc = app.querySelector('#ramka .scena');
    while (ekran.n < cel.n) {
      await krok(sc, ekran.n, ekran.n + 1);
      ekran.n += 1;
      if (ekran.n < cel.n) await czekaj(240);
    }
    if (cel.nagroda && !ekran.nagroda) {
      await czekaj(260);
      await spotkanie();
    }
  } finally {
    zajete = false;
  }
  dogon();
}

async function poNagrodzie(cel) {
  zajete = true;
  try {
    if (widok !== 'droga') {
      ustawAdres('');
      pokazDroge();
      ustawTempo();
      window.scrollTo(0, 0);
      await czekaj(300);
    }
    await przejscie(() => {
      ekran = cel;
      dopisek = 'Smacznego! Kulka i Górka ruszają do siebie od nowa.';
      pokazDroge();
      dopisek = null;
    });
  } finally {
    zajete = false;
  }
  dogon();
}

// Po animacji: jeśli w międzyczasie zmienił się adres albo stan, wyrównaj.
function dogon() {
  const h = location.hash.replace('#', '');
  if ((h === 'kod') !== (widok === 'kod') || (h === 'dzis') !== (widok === 'dzis')) trasa();
  const cel = { n: Math.min(10, stan.n), nagroda: !!stan.nagroda };
  if (cel.n > ekran.n || (cel.nagroda && !ekran.nagroda)) doPrzodu(cel);
}

// ===== Stan z bazy =====

async function przyjmij(nowy) {
  const stary = stan;
  stan = nowy;
  pamiec(K_STAN, JSON.stringify(nowy));
  const cel = { n: Math.min(10, nowy.n), nagroda: !!nowy.nagroda };
  if (zajete) return; // animacja sama dogoni po zakończeniu
  if (!stary) {
    ekran = cel;
    if (widok !== 'dzis') trasa();
    return;
  }
  if (nowy.spotkania > stary.spotkania) return poNagrodzie(cel);
  if (cel.n > ekran.n || (cel.nagroda && !ekran.nagroda)) return doPrzodu(cel);
  if (cel.n !== ekran.n || cel.nagroda !== ekran.nagroda) {
    ekran = cel; // obsługa cofnęła pomyłkę: cicha poprawka
    if (widok !== 'dzis') trasa();
  }
}

async function odswiez() {
  if (!token || zajete) return;
  let odp;
  try {
    odp = await rpc('karta_stan', { p_token: token });
  } catch (e) {
    komunikat(stan ? 'Brak połączenia. Pokazuję ostatni zapisany stan.' : 'Brak połączenia. Spróbuj za chwilę.');
    return;
  }
  komunikat('');
  if (!odp.ok) {
    if (odp.blad === 'token') zapomnij();
    return;
  }
  utrwal();
  await przyjmij(odp.stan);
}

async function zapomnij() {
  const zly = token;
  token = null;
  stan = null;
  utrwalony = null;
  pamiec(K_TOKEN, null);
  pamiec(K_STAN, null);
  clearInterval(zegar);
  history.replaceState(null, '', location.pathname);
  // w ciasteczku może leżeć inny, dobry klucz (na przykład adres z ?k= był stary)
  const zapas = await zeStrony();
  if (token) return; // w międzyczasie gość założył albo przywrócił kartę
  if (zapas && zapas !== zly) {
    token = zapas;
    pamiec(K_TOKEN, token);
    ustawAdres();
    odswiez();
    return;
  }
  if (zapas) naStrone(null);
  trasa();
}

function komunikat(tekst) {
  let e = document.getElementById('komunikat');
  if (!tekst) {
    if (e) e.remove();
    return;
  }
  if (!e) {
    e = document.createElement('div');
    e.id = 'komunikat';
    e.setAttribute('role', 'status');
    document.body.appendChild(e);
  }
  e.textContent = tekst;
}

// ===== Adres i trasa =====

// Token trzymamy też w adresie, żeby „Dodaj do ekranu początkowego” zabrało kartę ze sobą.
function ustawAdres(hash) {
  const h = hash === undefined ? location.hash : hash ? '#' + hash : '';
  history.replaceState(null, '', `${location.pathname}?k=${token}${h}`);
}

function trasa() {
  const h = location.hash.replace('#', '');
  komunikat('');
  if (h === 'dzis') {
    pokazDzis(); // widoczne dla każdego, także bez karty
    window.scrollTo(0, 0);
    ustawTempo();
    return;
  }
  if (!token) {
    clearInterval(zegar);
    if (h === 'mam') pokazMam();
    else pokazZapis();
    return;
  }
  if (!stan) return; // czekamy na pierwszy stan z bazy
  if (h === 'kod') pokazKod();
  else pokazDroge();
  window.scrollTo(0, 0);
  ustawTempo();
}

function ustawTempo() {
  clearInterval(zegar);
  if (!token && widok !== 'dzis') return;
  // przy kodzie pytamy bazę często, żeby krok pojawił się w ręku gościa od razu po skanie
  zegar = setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    if (token) odswiez();
    if (widok === 'dzis') zaladujDzis();
  }, widok === 'kod' ? 2500 : 20000);
}

async function start() {
  const adres = new URL(location.href);
  const nowa = adres.searchParams.has('nowa');
  const kodObslugi = adres.searchParams.get('o');
  window.addEventListener('hashchange', () => {
    if (!zajete) trasa();
  });
  window.addEventListener('resize', dopasuj);
  if ('ResizeObserver' in window) new ResizeObserver(dopasuj).observe(app);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') odswiez();
  });
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) odswiez();
  });
  if (nowa) {
    // do testów: kilka osób zakłada kartę na jednym telefonie
    pamiec(K_TOKEN, null);
    pamiec(K_STAN, null);
    history.replaceState(null, '', location.pathname);
    await naStrone(null);
  }
  const zAdresu = nowa ? null : adres.searchParams.get('k');
  const zPamieci = pamiec(K_TOKEN);
  token = zAdresu && WZOR_KLUCZA.test(zAdresu) ? zAdresu : zPamieci;
  if (kodObslugi && /^[0-9]{8}$/.test(kodObslugi)) {
    // gość skierował aparat na kod z ekranu obsługi: wymieniamy go na kartę, zanim cokolwiek pokażemy
    history.replaceState(null, '', location.pathname + (token ? `?k=${token}` : '#mam'));
    app.innerHTML = `${gora()}<section class="tekst"><h1>Przywracam kartę…</h1></section>`;
    const kodBledu = await odzyskaj(kodObslugi);
    if (!kodBledu) return;
    if (!token) {
      pokazMam(BLEDY_ODZYSKU[kodBledu] || BLEDY_ODZYSKU.siec);
      return;
    }
    // kod nie zadziałał, ale w tym telefonie jest już karta: pokazujemy ją
  }
  if (!token && !nowa) {
    // pamięć przeglądarki pusta: może klucz przetrwał w ciasteczku
    if (location.hash === '#dzis') trasa();
    else app.innerHTML = gora();
    token = await zeStrony();
  }
  if (token) {
    if (token === zPamieci) {
      try {
        const z = JSON.parse(pamiec(K_STAN) || 'null');
        if (z && z.kod) {
          stan = z;
          ekran = { n: Math.min(10, z.n), nagroda: !!z.nagroda };
        }
      } catch (e) {
        /* uszkodzona pamięć: pobierzemy stan z bazy */
      }
    }
    pamiec(K_TOKEN, token);
    ustawAdres();
    if (stan || location.hash === '#dzis') trasa();
    odswiez();
  } else {
    trasa();
  }
}

start();
