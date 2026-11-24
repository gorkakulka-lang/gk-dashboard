// Panel właściciela: liczby, lokale, kody lokali.
import { rpc, pamiec, esc } from './api.js';
import { ladnie } from './wolacz.js';

const app = document.getElementById('app');
const K_SESJA = 'gk.panel.sesja';
let sesja = pamiec(K_SESJA);
let zegar = null;
let uwagi = {}; // komunikaty przy lokalach, klucz = slug

const pasek = (prawy) =>
  `<header class="pasek"><img class="logo" src="/img/logo.png" alt="Górka &amp; Kulka" width="900" height="133"><span>${prawy}</span></header>`;

async function start() {
  clearInterval(zegar);
  if (sesja && (await pokazDane())) return;
  let st;
  try {
    st = await rpc('karta_panel_status');
  } catch (e) {
    app.innerHTML = `${pasek('Panel')}<section class="tekst"><h1>Brak połączenia.</h1><p>Sprawdź internet i odśwież stronę.</p></section>`;
    return;
  }
  if (st.ustawione) pokazLogin();
  else if (st.otwarte) pokazUstaw();
  else
    app.innerHTML = `${pasek('Panel')}<section class="tekst"><h1>Panel jeszcze zamknięty.</h1><p>Ustawianie hasła właściciela otwiera się tylko na chwilę, przy uruchamianiu aplikacji. Daj znać, kiedy jesteś na tej stronie.</p></section>`;
}

function pokazUstaw() {
  app.innerHTML = `${pasek('Panel')}
    <section class="tekst"><h1>Ustaw hasło właściciela.</h1><p>Robisz to raz. Hasło ma co najmniej 10 znaków i zna je tylko właściciel.</p></section>
    <form class="formularz" id="f" novalidate>
      <label class="pole" for="h1">Hasło</label>
      <input id="h1" name="h1" type="password" autocomplete="new-password" minlength="10" maxlength="200">
      <label class="pole" for="h2">Powtórz hasło</label>
      <input id="h2" name="h2" type="password" autocomplete="new-password" minlength="10" maxlength="200">
      <p class="blad" id="blad" role="alert"></p>
      <button class="guzik" type="submit">Ustaw hasło</button>
    </form>`;
  document.getElementById('f').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const f = ev.currentTarget;
    const blad = document.getElementById('blad');
    if (f.h1.value.length < 10) return void (blad.textContent = 'Hasło ma mieć co najmniej 10 znaków.');
    if (f.h1.value !== f.h2.value) return void (blad.textContent = 'Hasła różnią się od siebie.');
    await wejdz('karta_panel_ustaw', f.h1.value, blad, { zamkniete: 'Hasło jest już ustawione albo ustawianie jest zamknięte. Odśwież stronę.', haslo: 'Hasło ma mieć co najmniej 10 znaków.' });
  });
}

function pokazLogin(komunikat = '') {
  app.innerHTML = `${pasek('Panel')}
    <section class="tekst"><h1>Panel właściciela.</h1></section>
    <form class="formularz" id="f" novalidate>
      <label class="pole" for="h1">Hasło</label>
      <input id="h1" name="h1" type="password" autocomplete="current-password" maxlength="200">
      <p class="blad" id="blad" role="alert">${esc(komunikat)}</p>
      <button class="guzik" type="submit">Wejdź</button>
    </form>`;
  document.getElementById('f').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    await wejdz('karta_panel_login', ev.currentTarget.h1.value, document.getElementById('blad'), { haslo: 'Złe hasło.', blokada: 'Za dużo błędnych prób. Spróbuj za kwadrans.', brak: 'Hasło nie zostało jeszcze ustawione.' });
  });
}

async function wejdz(funkcja, haslo, blad, opisy) {
  let odp;
  try {
    odp = await rpc(funkcja, { p_haslo: haslo });
  } catch (e) {
    odp = { ok: false, blad: 'siec' };
  }
  if (!odp.ok) {
    blad.textContent = opisy[odp.blad] || 'Nie udało się połączyć. Spróbuj jeszcze raz.';
    return;
  }
  sesja = odp.sesja;
  pamiec(K_SESJA, sesja);
  start();
}

async function pokazDane() {
  let d;
  try {
    d = await rpc('karta_panel_dane', { p_sesja: sesja });
  } catch (e) {
    return true; // chwilowy brak sieci: zostaw to, co jest na ekranie
  }
  if (!d.ok) {
    sesja = null;
    pamiec(K_SESJA, null);
    return false;
  }
  // nie przerysowuj, gdy właściciel właśnie coś wpisuje
  const pisze = document.activeElement && document.activeElement.tagName === 'INPUT' && app.contains(document.activeElement);
  let smaki = [];
  try {
    const s = await rpc('karta_panel_smaki', { p_sesja: sesja });
    if (s.ok) smaki = s.smaki;
  } catch (e) {
    /* lista smaków dojdzie przy następnym odświeżeniu */
  }
  if (!pisze) rysuj(d, smaki);
  clearInterval(zegar);
  zegar = setInterval(() => {
    if (document.visibilityState === 'visible') pokazDane().then((ok) => ok || start());
  }, 30000);
  return true;
}

const godzina = (iso) => {
  const t = new Date(iso);
  const dzis = new Date().toDateString() === t.toDateString();
  return dzis
    ? t.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
    : t.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' });
};

function zdarzenie(e) {
  const imie = esc(ladnie(e.imie || 'Gość').split(' ')[0]);
  const gdzie = e.lokal ? ` · ${esc(e.lokal)}` : '';
  if (e.typ === 'zapis') return `${imie} · nowa karta`;
  if (e.typ === 'krok') return `${imie} · krok${gdzie}`;
  return `${imie} · nagroda: ${e.typ === 'nagroda-kawa' ? 'kawa' : 'lody'}${gdzie}`;
}

function rysuj(d, smaki) {
  const lokale = d.lokale
    .map((l) => {
      const u = uwagi[l.slug];
      return `<div class="lokal-panel${l.aktywny ? '' : ' nieczynny'}" data-lokal="${esc(l.slug)}">
        <div class="nazwa"><span>${esc(l.nazwa)}</span><small>${l.aktywny ? (l.pin ? 'kod ustawiony' : 'bez kodu') : 'wyłączony'}</small></div>
        <div class="liczby">Kroki: dziś ${l.kroki_dzis}, 7 dni ${l.kroki_tydzien}. Nagrody w 7 dni: ${l.nagrody_tydzien}. Połączone urządzenia: ${l.urzadzenia}.</div>
        <form data-pin novalidate>
          <input type="text" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="off" placeholder="6 cyfr" aria-label="Nowy kod lokalu ${esc(l.nazwa)}">
          <button class="maly" type="submit">${l.pin ? 'Zmień kod' : 'Ustaw kod'}</button>
        </form>
        ${u ? `<p class="uwaga ${u.ok ? 'ok' : 'zle'}" role="status">${esc(u.tekst)}</p>` : ''}
        <div class="akcje">
          <button class="link" type="button" data-przelacz="${l.aktywny ? '0' : '1'}">${l.aktywny ? 'Wyłącz lokal' : 'Włącz lokal'}</button>
          ${l.urzadzenia ? '<button class="link" type="button" data-odlacz>Odłącz urządzenia</button>' : ''}
        </div>
      </div>`;
    })
    .join('');
  const ostatnie = d.ostatnie.length
    ? d.ostatnie.map((e) => `<li><time datetime="${esc(e.kiedy)}">${godzina(e.kiedy)}</time><span>${zdarzenie(e)}</span></li>`).join('')
    : '<li><time></time><span>Jeszcze nic się nie wydarzyło.</span></li>';
  app.innerHTML = `${pasek('Panel')}
    <section class="kafle">
      <div class="kafel"><b>${d.goscie.razem}</b><span>Goście z kartą</span><small>dziś +${d.goscie.dzis} · 7 dni +${d.goscie.tydzien} · zgoda na smaki: ${d.goscie.zgody}</small></div>
      <div class="kafel"><b>${d.kroki.dzis}</b><span>Kroki dziś</span><small>7 dni: ${d.kroki.tydzien} · razem: ${d.kroki.razem}</small></div>
      <div class="kafel"><b>${d.nagrody.czekaja}</b><span>Nagrody do odebrania</span><small>wydane w 7 dni: ${d.nagrody.tydzien} · razem: ${d.nagrody.razem}</small></div>
    </section>
    <h2>Lokale</h2>
    <p class="uwaga" style="margin-bottom:10px">Kod lokalu obsługa wpisuje raz, na adresie /obsluga/. Zmiana kodu nie odłącza urządzeń, które już są połączone.</p>
    ${lokale}
    <h2>Smaki</h2>
    <p class="uwaga" style="margin-bottom:10px">Obsługa zaznacza w zakładce Witryna, które z tych smaków są dziś w lokalu. „Czeka” to liczba gości, którzy oznaczyli smak jako swój.</p>
    <form class="recznie" id="nowy-smak" novalidate>
      <input type="text" maxlength="60" autocomplete="off" placeholder="Nowy smak" aria-label="Nazwa nowego smaku">
      <button class="maly" type="submit">Dodaj</button>
    </form>
    ${uwagi._smak ? `<p class="uwaga ${uwagi._smak.ok ? 'ok' : 'zle'}" role="status" style="margin-top:8px">${esc(uwagi._smak.tekst)}</p>` : ''}
    <ul class="zdarzenia smaki-panel">${smaki
      .map(
        (s) => `<li data-smak="${s.id}" data-nazwa="${esc(s.nazwa)}" data-sorbet="${s.sorbet ? 1 : 0}" data-aktywny="${s.aktywny ? 1 : 0}">
        <span${s.aktywny ? '' : ' class="ukryty"'}><b>${esc(s.nazwa)}</b>${s.sorbet ? ' · sorbet' : ''}${s.aktywny ? '' : ' · ukryty'} · czeka: ${s.czeka}${s.gdzie.length ? ' · dziś: ' + esc(s.gdzie.join(', ')) : ''}</span>
        <span class="akcje"><button class="link" type="button" data-s="nazwa">Zmień nazwę</button><button class="link" type="button" data-s="sorbet">${s.sorbet ? 'To nie sorbet' : 'To sorbet'}</button><button class="link" type="button" data-s="aktywny">${s.aktywny ? 'Ukryj' : 'Pokaż'}</button></span></li>`,
      )
      .join('')}</ul>
    <h2>Ostatnio</h2>
    <ul class="zdarzenia">${ostatnie}</ul>
    <footer class="stopka"><span></span><button class="link" id="wyloguj" type="button">Wyloguj</button></footer>`;
}

const BLEDY_SMAKU = { nazwa: 'Nazwa smaku ma mieć od 2 do 60 znaków.', istnieje: 'Taki smak już jest na liście.' };

async function zapiszSmak(id, nazwa, sorbet, aktywny) {
  const o = await akcja('karta_panel_smak', { p_id: id, p_nazwa: nazwa, p_sorbet: sorbet, p_aktywny: aktywny });
  uwagi._smak = o && o.ok ? null : { ok: false, tekst: (o && BLEDY_SMAKU[o.blad]) || 'Nie udało się zapisać smaku.' };
  document.activeElement && document.activeElement.blur();
  pokazDane();
}

app.addEventListener('submit', async (ev) => {
  if (ev.target.id === 'nowy-smak') {
    ev.preventDefault();
    const pole = ev.target.querySelector('input');
    const nazwa = pole.value.trim();
    if (!nazwa) return;
    pole.value = '';
    return zapiszSmak(null, nazwa, /^sorbet/i.test(nazwa), true);
  }
  const f = ev.target.closest('form[data-pin]');
  if (!f) return;
  ev.preventDefault();
  const slug = f.closest('[data-lokal]').dataset.lokal;
  const pin = f.querySelector('input').value.trim();
  if (!/^[0-9]{6}$/.test(pin)) {
    uwagi[slug] = { ok: false, tekst: 'Kod lokalu to dokładnie 6 cyfr.' };
  } else {
    const o = await akcja('karta_panel_pin', { p_lokal: slug, p_pin: pin });
    uwagi[slug] = o && o.ok ? { ok: true, tekst: 'Kod zapisany. Podaj go obsłudze: wpisują go raz na swoim urządzeniu.' } : { ok: false, tekst: 'Nie udało się zapisać kodu.' };
  }
  document.activeElement && document.activeElement.blur();
  pokazDane();
});

app.addEventListener('click', async (ev) => {
  const b = ev.target.closest('button');
  if (!b) return;
  if (b.id === 'wyloguj') {
    try {
      await rpc('karta_panel_wyloguj', { p_sesja: sesja });
    } catch (e) {
      /* i tak wylogowujemy lokalnie */
    }
    sesja = null;
    pamiec(K_SESJA, null);
    return start();
  }
  const wiersz = b.closest('[data-smak]');
  if (wiersz && b.dataset.s) {
    const d = wiersz.dataset;
    const id = Number(d.smak);
    if (b.dataset.s === 'nazwa') {
      const nowa = prompt('Nazwa smaku', d.nazwa);
      if (nowa === null || !nowa.trim() || nowa.trim() === d.nazwa) return;
      return zapiszSmak(id, nowa.trim(), null, null);
    }
    if (b.dataset.s === 'sorbet') return zapiszSmak(id, d.nazwa, d.sorbet !== '1', null);
    if (b.dataset.s === 'aktywny') return zapiszSmak(id, d.nazwa, null, d.aktywny !== '1');
    return;
  }
  const karta = b.closest('[data-lokal]');
  if (!karta) return;
  const slug = karta.dataset.lokal;
  if (b.dataset.przelacz !== undefined) {
    await akcja('karta_panel_lokal', { p_lokal: slug, p_aktywny: b.dataset.przelacz === '1' });
    uwagi[slug] = null;
    pokazDane();
  } else if (b.dataset.odlacz !== undefined) {
    if (!confirm('Odłączyć wszystkie urządzenia tego lokalu? Obsługa będzie musiała wpisać kod lokalu od nowa.')) return;
    const o = await akcja('karta_panel_odlacz', { p_lokal: slug });
    uwagi[slug] = o && o.ok ? { ok: true, tekst: `Odłączone urządzenia: ${o.odlaczono}.` } : { ok: false, tekst: 'Nie udało się odłączyć urządzeń.' };
    pokazDane();
  }
});

async function akcja(funkcja, argumenty) {
  try {
    const o = await rpc(funkcja, { p_sesja: sesja, ...argumenty });
    if (!o.ok && o.blad === 'sesja') {
      sesja = null;
      pamiec(K_SESJA, null);
      start();
      return null;
    }
    return o;
  } catch (e) {
    return null;
  }
}

start();
