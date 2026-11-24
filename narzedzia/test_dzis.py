#!/usr/bin/env python3
"""„Dziś u nas” na atrapie bazy: gość bez karty i z kartą, ulubione, zakładka Witryna u obsługi, smaki w panelu."""
import sys, os, json, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import atrapa
from playwright.sync_api import sync_playwright

OUT = '/home/claude/render/karta'
srv, port = atrapa.uruchom(0)
B = atrapa.BAZA
BASE = f'http://127.0.0.1:{port}'
bledy = []
def nasluch(pg, n):
    pg.on('pageerror', lambda e: bledy.append((n, 'pageerror', str(e))))
    pg.on('console', lambda m: bledy.append((n, m.type, m.text)) if m.type == 'error' else None)
idn = {s['nazwa']: s['id'] for s in B.smaki}
B.lokale['centrum']['pin'] = '123456'; B.lokale['nova-park']['pin'] = '654321'
urz = B.karta_obsluga_paruj('centrum', '123456')['token']
urz2 = B.karta_obsluga_paruj('nova-park', '654321')['token']
for n in ['Pistacja', 'Solony karmel', 'Sorbet malinowy', 'Czekolada', 'Śmietanka']: B.karta_obsluga_witryna_ustaw(urz, idn[n], True)
for n in ['Bounty', 'Wanilia', 'Mango lassi']: B.karta_obsluga_witryna_ustaw(urz2, idn[n], True)
ania = B.karta_zapis('Ania', 'ania@example.com', True)

with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    # 1) gość bez karty
    ctx = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, locale='pl-PL', timezone_id='Europe/Warsaw')
    pg = ctx.new_page(); nasluch(pg, 'bez-karty')
    pg.goto(BASE + '/#dzis'); pg.wait_for_selector('.smaki li'); pg.evaluate('document.fonts.ready.then(() => 1)'); pg.wait_for_timeout(300)
    assert pg.locator('.smaki li').count() == 5, pg.locator('.smaki li').count()
    assert 'potwierdzona dziś' in pg.inner_text('.stan-witryny'), pg.inner_text('.stan-witryny')
    pg.screenshot(path=f'{OUT}/d-01-bez-karty.png')
    pg.click('.smak-kolko >> nth=0'); pg.wait_for_selector('#komunikat')
    pg.click('.przelacznik button >> nth=1'); pg.wait_for_timeout(200)
    assert pg.locator('.smaki li').count() == 3
    pg.click('.guzik'); pg.wait_for_selector('#zapis'); pg.wait_for_timeout(200)
    pg.screenshot(path=f'{OUT}/d-02-zapis-z-menu.png')
    uk = pg.evaluate('({ sh: document.documentElement.scrollHeight, ch: document.documentElement.clientHeight })'); assert uk['sh'] <= uk['ch'] + 1, uk
    ctx.close()
    # 2) gość z kartą
    ctx = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, locale='pl-PL', timezone_id='Europe/Warsaw')
    pg = ctx.new_page(); nasluch(pg, 'z-karta')
    pg.goto(f"{BASE}/?k={ania['token']}#dzis"); pg.wait_for_selector('.smaki li'); pg.wait_for_timeout(300)
    pg.click('.smaki li:has-text("Śmietanka") .smak-kolko'); pg.wait_for_timeout(400)
    assert B.ulubione.get((ania['stan']['numer'], idn['Śmietanka'])) is True
    assert pg.inner_text('.smaki li >> nth=0 >> .smak-nazwa').lower() == 'śmietanka', pg.inner_text('.smaki li >> nth=0')
    B.karta_ulubiony(ania['token'], idn['Wanilia'], True); B.karta_ulubiony(ania['token'], idn['Eton mess'], True)
    pg.reload(); pg.wait_for_selector('.dopisek'); pg.wait_for_timeout(300)
    d = pg.inner_text('.dopisek >> nth=0'); assert 'Wanilia (jest w: Nova Park)' in d and 'Eton mess' in d, d
    pg.screenshot(path=f'{OUT}/d-03-z-karta.png')
    pg.click('.dol a >> nth=0'); pg.wait_for_selector('#ramka'); pg.wait_for_timeout(300)
    pg.screenshot(path=f'{OUT}/d-04-droga-z-menu.png')
    uk = pg.evaluate('({ sh: document.documentElement.scrollHeight, ch: document.documentElement.clientHeight })'); assert uk['sh'] <= uk['ch'] + 1, uk
    pg.click('.dol a >> nth=1'); pg.wait_for_selector('.smaki li')
    # krok na żywo, gdy gość ogląda smaki
    B.karta_obsluga_skan(urz, ania['stan']['kod'])
    pg.evaluate('document.dispatchEvent(new Event("visibilitychange"))')
    pg.wait_for_selector('#ramka', timeout=6000); pg.wait_for_timeout(1500)
    assert 'jeszcze 8' in pg.inner_text('#naglowek').lower(), pg.inner_text('#naglowek')
    # stan nieaktualny: wczoraj
    B.potwierdzona['centrum'] = time.time() - 26 * 3600
    pg.click('.dol a >> nth=1'); pg.wait_for_selector('.smaki li'); pg.wait_for_timeout(400)
    assert 'Ostatni stan' in pg.inner_text('.stan-witryny'), pg.inner_text('.stan-witryny')
    stary = pg.inner_text('.stan-witryny')
    ctx.close()
    # 3) niski telefon: droga z menu ma się mieścić
    ctx = b.new_context(viewport={'width': 390, 'height': 664}, device_scale_factor=2, locale='pl-PL')
    pg = ctx.new_page(); nasluch(pg, '664')
    pg.goto(f"{BASE}/?k={ania['token']}"); pg.wait_for_selector('#ramka'); pg.wait_for_timeout(1800)
    uk664 = pg.evaluate('({ sh: document.documentElement.scrollHeight, ch: document.documentElement.clientHeight, s: getComputedStyle(document.querySelector("#ramka .scena")).getPropertyValue("--s") })')
    pg.screenshot(path=f'{OUT}/d-05-droga-664.png')
    ctx.close()
    # 4) obsługa: zakładka Witryna
    ctx = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, locale='pl-PL', timezone_id='Europe/Warsaw')
    ctx.add_init_script(f"localStorage.setItem('gk.obsluga.token', '{urz}'); localStorage.setItem('gk.obsluga.lokal', JSON.stringify({{slug: 'centrum', nazwa: 'Kawiarnia Centrum'}}));")
    pg = ctx.new_page(); nasluch(pg, 'obsluga')
    pg.goto(BASE + '/obsluga/'); pg.wait_for_selector('.zakladki'); pg.wait_for_timeout(600)
    pg.click('.zakladki button >> nth=1'); pg.wait_for_selector('.wsmak'); pg.wait_for_timeout(300)
    assert pg.locator('.wsmak').count() == 16 and pg.locator('.wsmak.jest').count() == 5
    assert 'niepotwierdzona' in pg.inner_text('#wstan'), pg.inner_text('#wstan')
    pg.click('.wsmak:has-text("Eton mess")'); pg.wait_for_timeout(500)
    assert B.witryna.get(('centrum', idn['Eton mess'])) is True and pg.locator('.wsmak.jest').count() == 6
    pg.wait_for_timeout(2600); pg.click('.wsmak:has(span:text-is("Czekolada"))'); pg.wait_for_timeout(500)
    assert B.witryna.get(('centrum', idn['Czekolada'])) is False, B.witryna
    assert 'Potwierdzona dziś' in pg.inner_text('#wstan'), pg.inner_text('#wstan')
    pg.screenshot(path=f'{OUT}/d-06-witryna.png')
    pg.click('.zakladki button >> nth=0'); pg.wait_for_selector('#wideo')
    ctx.close()
    # 5) panel: smaki
    B.otwarte = True
    ctx = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, locale='pl-PL', timezone_id='Europe/Warsaw')
    pg = ctx.new_page(); nasluch(pg, 'panel')
    pg.on('dialog', lambda d: d.accept('Sorbet malina') if d.type == 'prompt' else d.accept())
    pg.goto(BASE + '/panel/'); pg.wait_for_selector('#f'); pg.fill('#h1', 'bardzo-dlugie-haslo'); pg.fill('#h2', 'bardzo-dlugie-haslo'); pg.click('#f button')
    pg.wait_for_selector('.smaki-panel li'); pg.wait_for_timeout(300)
    assert pg.locator('.smaki-panel li').count() == 16
    pg.fill('#nowy-smak input', 'Kawa z kardamonem'); pg.click('#nowy-smak button'); pg.wait_for_selector('.smaki-panel li:has-text("Kawa z kardamonem")')
    pg.fill('#nowy-smak input', 'pistacja'); pg.click('#nowy-smak button'); pg.wait_for_selector('.uwaga.zle:has-text("już jest")')
    pg.click('.smaki-panel li:has-text("Bounty") [data-s=aktywny]'); pg.wait_for_selector('.smaki-panel li:has-text("Bounty") .ukryty')
    pg.click('.smaki-panel li:has-text("Sorbet malinowy") [data-s=nazwa]'); pg.wait_for_selector('.smaki-panel li:has-text("Sorbet malina")')
    assert [s for s in B.smaki if s['nazwa'] == 'Bounty'][0]['aktywny'] is False
    pg.locator('h2:has-text("Smaki")').scroll_into_view_if_needed(); pg.wait_for_timeout(200)
    pg.screenshot(path=f'{OUT}/d-07-panel-smaki.png')
    ctx.close(); b.close()
srv.shutdown()
print('dzis OK | stary stan:', stary, '| 664:', uk664)
print('BLEDY:', json.dumps(bledy, ensure_ascii=False, indent=1) if bledy else 'brak')
