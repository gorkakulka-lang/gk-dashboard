#!/usr/bin/env python3
"""Atrapa bazy do testów lokalnych (piaskownica nie ma dostępu do Supabase).
Serwuje site/ i udaje funkcje public.karta_* w pamięci, z tymi samymi odpowiedziami co baza."""
import json, sys, os, secrets, time, threading, http.server, socketserver, functools, re, hashlib

SITE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'site')
ALFABET = '23456789ABCDEFGHJKMNPQRSTVWXYZ'

class Baza:
    def __init__(self):
        self.goscie = {}      # token -> gosc
        self.kroki = []       # dict(id, gosc, zrodlo, lokal, urz, kiedy, cofniety)
        self.nagrody = []     # dict(id, gosc, rodzaj, lokal, urz, kiedy, cofnieta)
        self.lokale = {'centrum': {'nazwa': 'Kawiarnia Centrum', 'pin': None, 'aktywny': True},
                       'nova-park': {'nazwa': 'Nova Park', 'pin': None, 'aktywny': True},
                       'gorczyn': {'nazwa': 'Górczyn', 'pin': None, 'aktywny': False}}
        self.urzadzenia = {}  # token -> dict(lokal, aktywne)
        self.haslo = None; self.otwarte = False; self.sesje = set()
        self.nr = 0; self.kid = 0; self.nid = 0
        nazwy = ['Biała czekolada', 'Biała czekolada z brownie i truskawkami', 'Bounty', 'Czekolada', 'Eton mess', 'Mango lassi', 'Mleczna truskawka',
                 'Pistacja', 'Śmietanka', 'Snickers', 'Solony karmel', 'Sorbet malinowy', 'Sorbet mojito', 'Sorbet truskawkowy', 'Truskawkowa stracciatella', 'Wanilia']
        self.smaki = [{'id': i + 1, 'nazwa': n, 'sorbet': n.startswith('Sorbet'), 'aktywny': True} for i, n in enumerate(nazwy)]
        self.witryna = {}      # (lokal, smak_id) -> bool
        self.potwierdzona = {} # lokal -> czas
        self.ulubione = {}     # (numer gościa, smak_id) -> bool
        self.okno_duplikatu = 180
        self.lock = threading.Lock()

    def stan_drogi(self, g):
        wyd = len([n for n in self.nagrody if n['gosc'] is g and not n['cofnieta']])
        k = [x for x in self.kroki if x['gosc'] is g and not x['cofniety']]
        runda = k[wyd * 10: wyd * 10 + 10]
        return {'n': len(runda), 'nagroda': len(runda) >= 10, 'spotkania': wyd,
                'zapas': max(len(k) - wyd * 10 - 10, 0), 'kulka': len(runda), 'gorka': 0, 'osob': 1,
                'ostatni': max([x['id'] for x in k], default=0)}

    def stan_goscia(self, g):
        return {'imie': g['imie'], 'numer': g['numer'], 'kod': g['kod'], 'postac': 'kulka', **self.stan_drogi(g)}

    def znajdz(self, kod):
        v = re.sub(r'[\s-]', '', (kod or '')).upper()
        if v.startswith('GK1:'): v = v[4:]
        for g in self.goscie.values():
            if (v.isdigit() and g['numer'] == int(v)) or g['kod'] == v: return g
        return None

    # ---- gość ----
    def karta_zapis(self, p_imie='', p_email='', p_zgoda=False):
        imie = re.sub(r'\s+', ' ', (p_imie or '').strip()); email = (p_email or '').strip().lower()
        if len(imie) < 2 or len(imie) > 40 or not re.match(r"^[^\W\d_][^\W\d_ .'-]*$", imie): return {'ok': False, 'blad': 'imie'}
        if not re.match(r'^[^@\s]+@[^@\s]+\.[^@\s.]{2,}$', email): return {'ok': False, 'blad': 'email'}
        if any(g['email'] == email for g in self.goscie.values()): return {'ok': False, 'blad': 'istnieje'}
        token = secrets.token_hex(24); self.nr += 1
        g = {'imie': imie, 'email': email, 'zgoda': bool(p_zgoda), 'numer': self.nr,
             'kod': ''.join(secrets.choice(ALFABET) for _ in range(10))}
        self.goscie[token] = g
        self.kid += 1; self.kroki.append({'id': self.kid, 'gosc': g, 'zrodlo': 'powitanie', 'lokal': None, 'urz': None, 'kiedy': time.time(), 'cofniety': False})
        return {'ok': True, 'token': token, 'stan': self.stan_goscia(g)}

    def karta_stan(self, p_token=''):
        g = self.goscie.get(p_token or '')
        if not g: return {'ok': False, 'blad': 'token'}
        return {'ok': True, 'stan': self.stan_goscia(g)}

    # ---- dziś u nas ----
    def _iso(self, t): return time.strftime('%Y-%m-%dT%H:%M:%S+00:00', time.gmtime(t)) if t else None
    def _dzisiaj(self, t): return bool(t) and time.strftime('%Y-%m-%d', time.localtime(t)) == time.strftime('%Y-%m-%d')

    def karta_dzis(self, p_token=None):
        g = self.goscie.get(p_token or '')
        akt = {s['id']: s for s in self.smaki if s['aktywny']}
        klucz = lambda s: s['nazwa'].lower()
        lokale = []
        for slug, l in self.lokale.items():
            if not l['aktywny']: continue
            sm = sorted([akt[i] for (lk, i), j in self.witryna.items() if lk == slug and j and i in akt], key=klucz)
            t = self.potwierdzona.get(slug)
            lokale.append({'slug': slug, 'nazwa': l['nazwa'], 'potwierdzona': self._iso(t), 'dzisiaj': self._dzisiaj(t),
                           'smaki': [{'id': s['id'], 'nazwa': s['nazwa'], 'sorbet': s['sorbet']} for s in sm]})
        moje = sorted([akt[i] for (nr, i), j in self.ulubione.items() if g and nr == g['numer'] and j and i in akt], key=klucz) if g else []
        return {'ok': True, 'karta': g is not None, 'lokale': lokale, 'moje': [{'id': s['id'], 'nazwa': s['nazwa']} for s in moje]}

    def karta_ulubiony(self, p_token='', p_smak=0, p_jest=True):
        g = self.goscie.get(p_token or '')
        if not g: return {'ok': False, 'blad': 'token'}
        if not any(s['id'] == p_smak and s['aktywny'] for s in self.smaki): return {'ok': False, 'blad': 'smak'}
        self.ulubione[(g['numer'], p_smak)] = bool(p_jest); return {'ok': True}

    def karta_obsluga_witryna(self, p_token=''):
        u = self._urz(p_token)
        if not u: return {'ok': False, 'blad': 'urzadzenie'}
        t = self.potwierdzona.get(u['lokal'])
        return {'ok': True, 'potwierdzona': self._iso(t), 'dzisiaj': self._dzisiaj(t),
                'smaki': [{'id': s['id'], 'nazwa': s['nazwa'], 'sorbet': s['sorbet'], 'jest': bool(self.witryna.get((u['lokal'], s['id'])))}
                          for s in sorted(self.smaki, key=lambda s: s['nazwa'].lower()) if s['aktywny']]}

    def karta_obsluga_witryna_ustaw(self, p_token='', p_smak=0, p_jest=False):
        u = self._urz(p_token)
        if not u: return {'ok': False, 'blad': 'urzadzenie'}
        if not any(s['id'] == p_smak and s['aktywny'] for s in self.smaki): return {'ok': False, 'blad': 'smak'}
        self.witryna[(u['lokal'], p_smak)] = bool(p_jest); self.potwierdzona[u['lokal']] = time.time()
        return {'ok': True, 'potwierdzona': self._iso(time.time())}

    def karta_obsluga_witryna_potwierdz(self, p_token=''):
        u = self._urz(p_token)
        if not u: return {'ok': False, 'blad': 'urzadzenie'}
        self.potwierdzona[u['lokal']] = time.time()
        return {'ok': True, 'potwierdzona': self._iso(time.time())}

    def karta_panel_smaki(self, p_sesja=''):
        if p_sesja not in self.sesje: return {'ok': False, 'blad': 'sesja'}
        return {'ok': True, 'smaki': [{**s, 'czeka': len([1 for (nr, i), j in self.ulubione.items() if i == s['id'] and j]),
                                       'gdzie': [l['nazwa'] for slug, l in self.lokale.items() if l['aktywny'] and self.witryna.get((slug, s['id']))]}
                                      for s in sorted(self.smaki, key=lambda s: s['nazwa'].lower())]}

    def karta_panel_smak(self, p_sesja='', p_id=None, p_nazwa='', p_sorbet=None, p_aktywny=None):
        if p_sesja not in self.sesje: return {'ok': False, 'blad': 'sesja'}
        nazwa = re.sub(r'\s+', ' ', (p_nazwa or '').strip())
        if len(nazwa) < 2 or len(nazwa) > 60: return {'ok': False, 'blad': 'nazwa'}
        if any(s['nazwa'].lower() == nazwa.lower() and s['id'] != p_id for s in self.smaki): return {'ok': False, 'blad': 'istnieje'}
        if p_id is None:
            s = {'id': max(x['id'] for x in self.smaki) + 1, 'nazwa': nazwa, 'sorbet': bool(p_sorbet), 'aktywny': True if p_aktywny is None else bool(p_aktywny)}
            self.smaki.append(s); return {'ok': True, 'id': s['id']}
        for s in self.smaki:
            if s['id'] == p_id:
                s['nazwa'] = nazwa
                if p_sorbet is not None: s['sorbet'] = bool(p_sorbet)
                if p_aktywny is not None: s['aktywny'] = bool(p_aktywny)
                return {'ok': True, 'id': p_id}
        return {'ok': False, 'blad': 'smak'}

    # ---- obsługa ----
    def karta_lokale(self):
        return [{'slug': s, 'nazwa': l['nazwa'], 'gotowy': l['pin'] is not None} for s, l in self.lokale.items() if l['aktywny']]

    def karta_obsluga_paruj(self, p_lokal='', p_pin='', p_nazwa=None):
        l = self.lokale.get(p_lokal)
        if not l or not l['aktywny'] or l['pin'] is None: return {'ok': False, 'blad': 'lokal'}
        if p_pin != l['pin']: return {'ok': False, 'blad': 'pin'}
        t = secrets.token_hex(24); self.urzadzenia[t] = {'lokal': p_lokal, 'aktywne': True}
        return {'ok': True, 'token': t, 'lokal': {'slug': p_lokal, 'nazwa': l['nazwa']}}

    def _urz(self, t):
        u = self.urzadzenia.get(t or '')
        return u if u and u['aktywne'] else None

    def karta_obsluga_skan(self, p_token='', p_kod='', p_wymus=False):
        u = self._urz(p_token)
        if not u: return {'ok': False, 'blad': 'urzadzenie'}
        g = self.znajdz(p_kod)
        if not g: return {'ok': True, 'wynik': 'nieznany'}
        st = self.stan_drogi(g)
        baza = {'imie': g['imie'], 'numer': g['numer']}
        if st['nagroda'] and not p_wymus: return {'ok': True, 'wynik': 'nagroda', **baza, 'stan': st}
        ost = max([x['kiedy'] for x in self.kroki if x['gosc'] is g and x['zrodlo'] == 'wizyta' and not x['cofniety']], default=None)
        if ost is not None and time.time() - ost < self.okno_duplikatu:
            return {'ok': True, 'wynik': 'duplikat', **baza, 'stan': st, 'sekund': int(time.time() - ost)}
        self.kid += 1
        self.kroki.append({'id': self.kid, 'gosc': g, 'zrodlo': 'wizyta', 'lokal': u['lokal'], 'urz': p_token, 'kiedy': time.time(), 'cofniety': False})
        return {'ok': True, 'wynik': 'krok', **baza, 'krok_id': self.kid, 'stan': self.stan_drogi(g)}

    def karta_obsluga_wydaj(self, p_token='', p_kod='', p_rodzaj=''):
        if p_rodzaj not in ('lody', 'kawa'): return {'ok': False, 'blad': 'rodzaj'}
        u = self._urz(p_token)
        if not u: return {'ok': False, 'blad': 'urzadzenie'}
        g = self.znajdz(p_kod)
        if not g: return {'ok': True, 'wynik': 'nieznany'}
        st = self.stan_drogi(g); baza = {'imie': g['imie'], 'numer': g['numer']}
        if not st['nagroda']: return {'ok': True, 'wynik': 'brak-nagrody', **baza, 'stan': st}
        self.nid += 1
        self.nagrody.append({'id': self.nid, 'gosc': g, 'rodzaj': p_rodzaj, 'lokal': u['lokal'], 'urz': p_token, 'kiedy': time.time(), 'cofnieta': False})
        return {'ok': True, 'wynik': 'wydano', **baza, 'nagroda_id': self.nid, 'rodzaj': p_rodzaj, 'stan': self.stan_drogi(g)}

    def karta_obsluga_cofnij(self, p_token='', p_krok_id=0):
        u = self._urz(p_token)
        if not u: return {'ok': False, 'blad': 'urzadzenie'}
        for k in self.kroki:
            if k['id'] == p_krok_id and k['urz'] == p_token and k['zrodlo'] == 'wizyta' and not k['cofniety'] and time.time() - k['kiedy'] < 600:
                if any(n['gosc'] is k['gosc'] and not n['cofnieta'] and n['kiedy'] >= k['kiedy'] for n in self.nagrody):
                    return {'ok': True, 'wynik': 'po-nagrodzie'}
                k['cofniety'] = True
                return {'ok': True, 'wynik': 'cofnieto', 'stan': self.stan_drogi(k['gosc'])}
        return {'ok': True, 'wynik': 'za-pozno'}

    def karta_obsluga_cofnij_nagrode(self, p_token='', p_nagroda_id=0):
        u = self._urz(p_token)
        if not u: return {'ok': False, 'blad': 'urzadzenie'}
        for n in self.nagrody:
            if n['id'] == p_nagroda_id and n['urz'] == p_token and not n['cofnieta'] and time.time() - n['kiedy'] < 600:
                n['cofnieta'] = True
                return {'ok': True, 'wynik': 'cofnieto', 'stan': self.stan_drogi(n['gosc'])}
        return {'ok': True, 'wynik': 'za-pozno'}

    def karta_obsluga_dzis(self, p_token=''):
        u = self._urz(p_token)
        if not u: return {'ok': False, 'blad': 'urzadzenie'}
        return {'ok': True, 'lokal': {'slug': u['lokal'], 'nazwa': self.lokale[u['lokal']]['nazwa']},
                'kroki': len([k for k in self.kroki if k['lokal'] == u['lokal'] and k['zrodlo'] == 'wizyta' and not k['cofniety']]),
                'nagrody': len([n for n in self.nagrody if n['lokal'] == u['lokal'] and not n['cofnieta']])}

    # ---- panel ----
    def karta_panel_status(self):
        return {'ustawione': self.haslo is not None, 'otwarte': self.otwarte and self.haslo is None}

    def _sesja(self):
        t = secrets.token_hex(24); self.sesje.add(t); return t

    def karta_panel_ustaw(self, p_haslo=''):
        if self.haslo is not None or not self.otwarte: return {'ok': False, 'blad': 'zamkniete'}
        if not p_haslo or len(p_haslo) < 10: return {'ok': False, 'blad': 'haslo'}
        self.haslo = p_haslo; self.otwarte = False
        return {'ok': True, 'sesja': self._sesja()}

    def karta_panel_login(self, p_haslo=''):
        if self.haslo is None: return {'ok': False, 'blad': 'brak'}
        if p_haslo != self.haslo: return {'ok': False, 'blad': 'haslo'}
        return {'ok': True, 'sesja': self._sesja()}

    def karta_panel_wyloguj(self, p_sesja=''):
        self.sesje.discard(p_sesja); return {'ok': True}

    def karta_panel_dane(self, p_sesja=''):
        if p_sesja not in self.sesje: return {'ok': False, 'blad': 'sesja'}
        wiz = [k for k in self.kroki if k['zrodlo'] == 'wizyta' and not k['cofniety']]
        nag = [n for n in self.nagrody if not n['cofnieta']]
        iso = lambda t: time.strftime('%Y-%m-%dT%H:%M:%S+00:00', time.gmtime(t))
        ost = [{'kiedy': iso(k['kiedy']), 'typ': 'krok', 'imie': k['gosc']['imie'], 'lokal': self.lokale[k['lokal']]['nazwa']} for k in wiz]
        ost += [{'kiedy': iso(n['kiedy']), 'typ': 'nagroda-' + n['rodzaj'], 'imie': n['gosc']['imie'], 'lokal': self.lokale[n['lokal']]['nazwa']} for n in nag]
        ost += [{'kiedy': iso(k['kiedy']), 'typ': 'zapis', 'imie': k['gosc']['imie'], 'lokal': None} for k in self.kroki if k['zrodlo'] == 'powitanie']
        ost.sort(key=lambda e: e['kiedy'], reverse=True)
        return {'ok': True,
                'goscie': {'razem': len(self.goscie), 'dzis': len(self.goscie), 'tydzien': len(self.goscie), 'zgody': len([g for g in self.goscie.values() if g['zgoda']])},
                'kroki': {'razem': len(wiz), 'dzis': len(wiz), 'tydzien': len(wiz)},
                'nagrody': {'razem': len(nag), 'dzis': len(nag), 'tydzien': len(nag), 'czekaja': len([g for g in self.goscie.values() if self.stan_drogi(g)['nagroda']])},
                'lokale': [{'slug': s, 'nazwa': l['nazwa'], 'aktywny': l['aktywny'], 'pin': l['pin'] is not None,
                            'kroki_dzis': len([k for k in wiz if k['lokal'] == s]), 'kroki_tydzien': len([k for k in wiz if k['lokal'] == s]),
                            'nagrody_tydzien': len([n for n in nag if n['lokal'] == s]),
                            'urzadzenia': len([u for u in self.urzadzenia.values() if u['lokal'] == s and u['aktywne']])} for s, l in self.lokale.items()],
                'ostatnie': ost[:20]}

    def karta_panel_pin(self, p_sesja='', p_lokal='', p_pin=''):
        if p_sesja not in self.sesje: return {'ok': False, 'blad': 'sesja'}
        if not re.match(r'^[0-9]{6}$', p_pin or ''): return {'ok': False, 'blad': 'pin'}
        if p_lokal not in self.lokale: return {'ok': False, 'blad': 'lokal'}
        self.lokale[p_lokal]['pin'] = p_pin; return {'ok': True}

    def karta_panel_lokal(self, p_sesja='', p_lokal='', p_aktywny=False):
        if p_sesja not in self.sesje: return {'ok': False, 'blad': 'sesja'}
        if p_lokal not in self.lokale: return {'ok': False, 'blad': 'lokal'}
        self.lokale[p_lokal]['aktywny'] = bool(p_aktywny); return {'ok': True}

    def karta_panel_odlacz(self, p_sesja='', p_lokal=''):
        if p_sesja not in self.sesje: return {'ok': False, 'blad': 'sesja'}
        n = 0
        for u in self.urzadzenia.values():
            if u['lokal'] == p_lokal and u['aktywne']: u['aktywne'] = False; n += 1
        return {'ok': True, 'odlaczono': n}


BAZA = Baza()
# ta sama polityka co w site/_headers (tam dodatkowo adres bazy w connect-src)
CSP = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://fnranvobetqcxtawcjop.supabase.co; worker-src 'self' blob:; media-src 'self' blob:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"

class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Security-Policy', CSP)
        self.send_header('Referrer-Policy', 'no-referrer')
        self.send_header('X-Content-Type-Options', 'nosniff')
        super().end_headers()
    def do_GET(self):
        if self.path.split('?')[0] == '/js/konfig.js':
            body = b"export const API = '/atrapa/';\nexport const KLUCZ = 'atrapa';\n"
            self.send_response(200); self.send_header('Content-Type', 'text/javascript'); self.send_header('Content-Length', str(len(body))); self.end_headers(); self.wfile.write(body); return
        return super().do_GET()
    def do_POST(self):
        m = re.match(r'^/atrapa/(karta_[a-z_]+)$', self.path)
        n = int(self.headers.get('Content-Length') or 0)
        try: args = json.loads(self.rfile.read(n) or b'{}')
        except Exception: args = {}
        if not m or not hasattr(BAZA, m.group(1)):
            self.send_response(404); self.end_headers(); return
        with BAZA.lock:
            wynik = getattr(BAZA, m.group(1))(**args)
        body = json.dumps(wynik).encode()
        self.send_response(200); self.send_header('Content-Type', 'application/json'); self.send_header('Content-Length', str(len(body))); self.end_headers(); self.wfile.write(body)

class Serwer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True

def uruchom(port=0):
    srv = Serwer(('127.0.0.1', port), functools.partial(Handler, directory=SITE))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv, srv.server_address[1]

if __name__ == '__main__':
    srv, port = uruchom(int(sys.argv[1]) if len(sys.argv) > 1 else 8765)
    print('http://127.0.0.1:%d' % port)
    threading.Event().wait()
