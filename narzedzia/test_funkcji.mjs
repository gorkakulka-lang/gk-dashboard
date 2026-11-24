// Test funkcji brzegowej netlify/edge-functions/karta.js (prawdziwy kod, uruchomiony w Node).
//   node narzedzia/test_funkcji.mjs
import assert from 'node:assert/strict';
import funkcja, { config } from '../netlify/edge-functions/karta.js';

const ADRES = 'https://gk-karta.netlify.app/api/karta';
const STRONA = 'https://gk-karta.netlify.app';
const KLUCZ = 'ab12'.repeat(12);

async function wywolaj(metoda, { ciastko, zrodlo = STRONA, typ = 'application/json', tresc } = {}) {
  const headers = {};
  if (ciastko) headers.cookie = ciastko;
  if (metoda !== 'GET') {
    if (zrodlo) headers.origin = zrodlo;
    if (typ) headers['content-type'] = typ;
  }
  const odp = await funkcja(new Request(ADRES, { method: metoda, headers, body: metoda === 'GET' ? undefined : tresc }));
  return { status: odp.status, dane: await odp.json(), ciastko: odp.headers.get('set-cookie'), pamiec: odp.headers.get('cache-control') };
}

let n = 0;
const sprawdz = (opis, warunek) => {
  assert.ok(warunek, opis);
  n += 1;
};

// odczyt
let r = await wywolaj('GET');
sprawdz('bez ciasteczka: token null', r.status === 200 && r.dane.token === null && r.pamiec === 'no-store' && r.ciastko === null);
r = await wywolaj('GET', { ciastko: `gk_karta=${KLUCZ}` });
sprawdz('z ciasteczkiem: token', r.dane.token === KLUCZ);
r = await wywolaj('GET', { ciastko: `inne=1; gk_karta=${KLUCZ}; jeszcze=x=y` });
sprawdz('ciasteczko wśród innych', r.dane.token === KLUCZ);
r = await wywolaj('GET', { ciastko: 'gk_karta=<script>alert(1)</script>' });
sprawdz('śmieci w ciasteczku: null', r.dane.token === null);
r = await wywolaj('GET', { ciastko: `xgk_karta=${KLUCZ}` });
sprawdz('podobna nazwa to nie to samo', r.dane.token === null);

// zapis
r = await wywolaj('POST', { tresc: JSON.stringify({ token: KLUCZ }) });
sprawdz('zapis: 200', r.status === 200 && r.dane.ok === true);
sprawdz('zapis: ciasteczko z kluczem i cechami', r.ciastko === `gk_karta=${KLUCZ}; Max-Age=34560000; Path=/; Secure; HttpOnly; SameSite=Lax`);
r = await wywolaj('POST', { tresc: JSON.stringify({ token: null }) });
sprawdz('kasowanie: Max-Age=0', r.status === 200 && r.ciastko === 'gk_karta=; Max-Age=0; Path=/; Secure; HttpOnly; SameSite=Lax');

// odmowy
r = await wywolaj('POST', { zrodlo: 'https://obca-strona.example', tresc: JSON.stringify({ token: KLUCZ }) });
sprawdz('obca strona: 403 bez ciasteczka', r.status === 403 && r.ciastko === null);
r = await wywolaj('POST', { zrodlo: null, tresc: JSON.stringify({ token: KLUCZ }) });
sprawdz('brak Origin: 403', r.status === 403 && r.ciastko === null);
r = await wywolaj('POST', { typ: 'text/plain', tresc: JSON.stringify({ token: KLUCZ }) });
sprawdz('zwykły formularz (text/plain): 403', r.status === 403 && r.ciastko === null);
r = await wywolaj('POST', { tresc: JSON.stringify({ token: 'za-krotki' }) });
sprawdz('zły klucz: 400', r.status === 400 && r.ciastko === null);
r = await wywolaj('POST', { tresc: JSON.stringify({ token: KLUCZ + '\r\nSet-Cookie: x=1' }) });
sprawdz('próba wstrzyknięcia nagłówka: 400', r.status === 400 && r.ciastko === null);
r = await wywolaj('POST', { tresc: JSON.stringify({}) });
sprawdz('brak pola token: 400', r.status === 400 && r.ciastko === null);
r = await wywolaj('POST', { tresc: 'to nie json' });
sprawdz('zepsuta treść: 400', r.status === 400 && r.ciastko === null);
r = await wywolaj('PUT', { tresc: '{}' });
sprawdz('inna metoda: 405', r.status === 405);

sprawdz('adres funkcji', config.path === '/api/karta' && config.onError === 'bypass');

console.log(`funkcja brzegowa OK (${n} sprawdzeń)`);
