// Pamięć karty po stronie strony: jedno ciasteczko z kluczem karty, ustawiane nagłówkiem HTTP.
//
// Po co: Safari (iPhone, Mac) kasuje pamięć strony zapisaną przez JavaScript (localStorage)
// po 7 dniach używania przeglądarki bez wizyty na stronie. Gość, który wpada raz na dwa tygodnie,
// zastawałby pustą kartę. Ciasteczka ustawionego przez serwer ta reguła nie dotyczy.
//
// GET  /api/karta            -> { token } z ciasteczka albo { token: null }
// POST /api/karta { token }  -> zapisuje klucz w ciasteczku; { token: null } je kasuje
//
// Ciasteczko niesie wyłącznie klucz karty gościa (ten sam, który leży w pamięci przeglądarki).
// Nie ma tu żadnych sekretów ani dostępu do bazy.

const NAZWA = 'gk_karta';
const WZOR = /^[0-9a-f]{48}$/;
const WAZNOSC = 400 * 24 * 60 * 60; // 400 dni: tyle najdłużej trzymają ciasteczko przeglądarki
const CECHY = 'Path=/; Secure; HttpOnly; SameSite=Lax';

const odpowiedz = (dane, status = 200, dodatkowe = {}) =>
  new Response(JSON.stringify(dane), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      'x-robots-tag': 'noindex, nofollow',
      ...dodatkowe,
    },
  });

function zCiasteczka(request) {
  for (const czesc of (request.headers.get('cookie') || '').split(';')) {
    const i = czesc.indexOf('=');
    if (i > 0 && czesc.slice(0, i).trim() === NAZWA) return czesc.slice(i + 1).trim();
  }
  return null;
}

export default async (request) => {
  if (request.method === 'GET') {
    const klucz = zCiasteczka(request);
    return odpowiedz({ token: klucz && WZOR.test(klucz) ? klucz : null });
  }
  if (request.method === 'POST') {
    // Tylko z naszej własnej strony: przeglądarka sama dopisuje Origin do każdego POST,
    // a obca strona nie podrobi ani jego, ani typu application/json bez zgody serwera.
    const zrodlo = request.headers.get('origin');
    const typ = request.headers.get('content-type') || '';
    if (!zrodlo || zrodlo !== new URL(request.url).origin || !typ.toLowerCase().startsWith('application/json')) {
      return odpowiedz({ ok: false }, 403);
    }
    let klucz;
    try {
      klucz = (await request.json()).token;
    } catch (e) {
      return odpowiedz({ ok: false }, 400);
    }
    if (klucz === null) return odpowiedz({ ok: true }, 200, { 'set-cookie': `${NAZWA}=; Max-Age=0; ${CECHY}` });
    if (typeof klucz !== 'string' || !WZOR.test(klucz)) return odpowiedz({ ok: false }, 400);
    return odpowiedz({ ok: true }, 200, { 'set-cookie': `${NAZWA}=${klucz}; Max-Age=${WAZNOSC}; ${CECHY}` });
  }
  return odpowiedz({ ok: false }, 405, { allow: 'GET, POST' });
};

// onError: gdyby funkcja zawiodła, strona działa dalej bez tej pamięci (jak przed jej dodaniem).
export const config = { path: '/api/karta', onError: 'bypass' };
