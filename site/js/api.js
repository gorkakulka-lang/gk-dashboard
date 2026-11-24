import { API, KLUCZ } from './konfig.js';

// Jedno wejście do bazy: wywołanie funkcji public.karta_* przez REST.
export async function rpc(funkcja, argumenty = {}, { limitCzasu = 12000 } = {}) {
  const ster = new AbortController();
  const zegar = setTimeout(() => ster.abort(), limitCzasu);
  try {
    const odp = await fetch(API + funkcja, {
      method: 'POST',
      headers: { apikey: KLUCZ, 'Content-Type': 'application/json' },
      body: JSON.stringify(argumenty),
      signal: ster.signal,
      cache: 'no-store',
    });
    if (!odp.ok) throw new Error('HTTP ' + odp.status);
    return await odp.json();
  } finally {
    clearTimeout(zegar);
  }
}

export function pamiec(klucz, wartosc) {
  try {
    if (wartosc === undefined) return localStorage.getItem(klucz);
    if (wartosc === null) localStorage.removeItem(klucz);
    else localStorage.setItem(klucz, wartosc);
  } catch (e) {
    /* tryb prywatny albo pełna pamięć: karta działa dalej z adresu */
  }
  return null;
}

export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const czekaj = (ms) => new Promise((r) => setTimeout(r, ms));
