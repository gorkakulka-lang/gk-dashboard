#!/usr/bin/env python3
"""Przepływ gościa na atrapie bazy: zapis -> krok powitalny -> kod -> skany -> spotkanie -> nagroda."""
import sys, os, json, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import atrapa
from playwright.sync_api import sync_playwright

OUT = '/home/claude/render/karta'
ROZMIARY = [('844', 390, 844), ('664', 390, 664), ('640', 360, 640), ('568', 320, 568)]
tylko = sys.argv[1].split(',') if len(sys.argv) > 1 else None

srv, port = atrapa.uruchom(0)
B = atrapa.BAZA
B.okno_duplikatu = 0
B.lokale['centrum']['pin'] = '123456'
urz = B.karta_obsluga_paruj('centrum', '123456')['token']
BASE = f'http://127.0.0.1:{port}'
bledy = []

with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    for nazwa, w, h in ROZMIARY:
        if tylko and nazwa not in tylko: continue
        ctx = b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, locale='pl-PL')
        pg = ctx.new_page()
        pg.on('pageerror', lambda e, n=nazwa: bledy.append((n, 'pageerror', str(e))))
        pg.on('console', lambda m, n=nazwa: bledy.append((n, m.type, m.text)) if m.type in ('error', 'warning') else None)
        pg.on('requestfailed', lambda r, n=nazwa: bledy.append((n, 'requestfailed', r.url)))
        shot = lambda nr, opis: pg.screenshot(path=f'{OUT}/g{nazwa}-{nr:02d}-{opis}.png')
        pg.goto(BASE + '/')
        pg.wait_for_selector('#zapis')
        pg.evaluate('document.fonts.ready.then(() => 1)')
        pg.wait_for_function('Array.from(document.images).every(i => i.complete)')
        shot(1, 'zapis')
        pg.click('#wyslij'); pg.wait_for_timeout(150); shot(2, 'zapis-blad')
        pg.fill('#imie', 'ania'); pg.fill('#email', f'ania{nazwa}@example.com'); pg.check('#zgoda')
        pg.click('#wyslij')
        pg.wait_for_selector('#ramka'); pg.wait_for_timeout(350); shot(3, 'droga-start')
        pg.wait_for_timeout(2300); shot(4, 'droga-po-powitaniu')
        st = pg.evaluate('JSON.parse(localStorage.getItem("gk.karta.stan"))')
        assert st['n'] == 1, st
        assert 'k=' in pg.url, pg.url
        pg.click('#guzik'); pg.wait_for_selector('.kod-karta'); pg.wait_for_timeout(200); shot(5, 'kod')
        qr = pg.evaluate('document.querySelector(".qr svg").getAttribute("viewBox")')
        # skan przy ladzie: krok ma się pojawić w ręku gościa
        r = B.karta_obsluga_skan(urz, 'GK1:' + st['kod']); assert r['wynik'] == 'krok', r
        pg.wait_for_selector('#ramka', timeout=6000); pg.wait_for_timeout(700); shot(6, 'krok-w-locie')
        pg.wait_for_timeout(1200); shot(7, 'droga-2')
        for i in range(5): B.karta_obsluga_skan(urz, st['kod'])
        pg.evaluate('document.dispatchEvent(new Event("visibilitychange"))')
        pg.wait_for_timeout(5200); shot(8, 'droga-7')
        assert pg.inner_text('#naglowek').lower().startswith('kulkę i górkę dzielą jeszcze 3'), pg.inner_text('#naglowek')
        for i in range(3): B.karta_obsluga_skan(urz, st['kod'])
        pg.evaluate('document.dispatchEvent(new Event("visibilitychange"))')
        pg.wait_for_timeout(5000); shot(9, 'spotkanie')
        assert pg.inner_text('#naglowek').lower() == 'spotkały się!', pg.inner_text('#naglowek')
        assert pg.inner_text('#guzik').lower() == 'odbierz nagrodę'
        pg.click('#guzik'); pg.wait_for_selector('.kod-karta'); pg.wait_for_timeout(200); shot(10, 'kod-nagroda')
        r = B.karta_obsluga_wydaj(urz, st['kod'], 'lody'); assert r['wynik'] == 'wydano', r
        pg.wait_for_selector('#ramka', timeout=6000); pg.wait_for_timeout(1300); shot(11, 'po-nagrodzie')
        # powrót na stronę: karta ma się otworzyć sama, z pamięci i z adresu
        pg.reload(); pg.wait_for_selector('#ramka'); pg.wait_for_timeout(500)
        pg2 = ctx.new_page(); pg2.goto(BASE + '/#mam'); pg2.wait_for_selector('#ramka'); pg2.close()
        ctx2 = b.new_context(viewport={'width': w, 'height': h}); pg3 = ctx2.new_page(); pg3.goto(pg.url); pg3.wait_for_selector('#ramka'); ctx2.close()
        uklad = pg.evaluate('''() => { const d = document.documentElement; const g = document.getElementById('guzik').getBoundingClientRect();
            return { przewija: d.scrollHeight > d.clientHeight + 1, scrollH: d.scrollHeight, clientH: d.clientHeight, guzikDol: Math.round(g.bottom), skala: getComputedStyle(document.querySelector('#ramka .scena')).getPropertyValue('--s') } }''')
        print(nazwa, 'OK', 'qr', qr, 'uklad', json.dumps(uklad))
        ctx.close()
    b.close()
srv.shutdown()
print('BLEDY:', json.dumps(bledy, ensure_ascii=False, indent=1) if bledy else 'brak')
