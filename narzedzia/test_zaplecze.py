#!/usr/bin/env python3
"""Obsługa (ze sztucznym aparatem, który „widzi” prawdziwy kod QR gościa) i panel właściciela, na atrapie bazy."""
import sys, os, json, subprocess, re, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import atrapa
from playwright.sync_api import sync_playwright
from PIL import Image

OUT = '/home/claude/render/karta'
srv, port = atrapa.uruchom(0)
B = atrapa.BAZA
BASE = f'http://127.0.0.1:{port}'
bledy = []
def nasluch(pg, n):
    pg.on('pageerror', lambda e: bledy.append((n, 'pageerror', str(e))))
    pg.on('console', lambda m: bledy.append((n, m.type, m.text)) if m.type == 'error' else None)

ania = B.karta_zapis('Ania', 'ania@example.com', True)
tomek = B.karta_zapis('tomek', 'tomek@example.com', False)
ola = B.karta_zapis('Ola', 'ola@example.com', True)

with sync_playwright() as p:
    # 1) zrzut prawdziwego kodu QR z karty gościa -> klatka dla sztucznego aparatu
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    ctx = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2)
    pg = ctx.new_page(); nasluch(pg, 'gosc')
    pg.goto(f"{BASE}/?k={ania['token']}#kod"); pg.wait_for_selector('.qr svg')
    pg.locator('.kod-karta').screenshot(path=f'{OUT}/_qr-karta.png')
    b.close()
    karta = Image.open(f'{OUT}/_qr-karta.png').convert('RGB')
    klatka = Image.new('RGB', (640, 480), (247, 194, 207))
    karta.thumbnail((330, 400), Image.LANCZOS)
    klatka.paste(karta, ((640 - karta.width) // 2, (480 - karta.height) // 2))
    klatka.save(f'{OUT}/_klatka.png')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-loop', '1', '-i', f'{OUT}/_klatka.png', '-t', '2', '-r', '10', '-pix_fmt', 'yuv420p', f'{OUT}/_aparat.y4m'], check=True)

    # 2) obsługa
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox', '--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream', f'--use-file-for-fake-video-capture={OUT}/_aparat.y4m'])
    ctx = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, permissions=['camera'])
    pg = ctx.new_page(); nasluch(pg, 'obsluga')
    shot = lambda nr, opis: pg.screenshot(path=f'{OUT}/o-{nr:02d}-{opis}.png')
    pg.goto(BASE + '/obsluga/'); pg.wait_for_selector('#par'); pg.evaluate('document.fonts.ready.then(() => 1)'); pg.wait_for_timeout(200)
    shot(1, 'bez-kodow')
    assert 'nie ma jeszcze kodu' in pg.inner_text('#blad'), pg.inner_text('#blad')
    B.lokale['centrum']['pin'] = '123456'
    pg.reload(); pg.wait_for_selector('#par'); pg.wait_for_timeout(200)
    pg.fill('#pin', '111111'); pg.click('#par button'); pg.wait_for_timeout(300)
    assert pg.inner_text('#blad') == 'Zły kod lokalu.', pg.inner_text('#blad')
    shot(2, 'zly-kod')
    pg.fill('#pin', '123456'); pg.click('#par button')
    pg.wait_for_selector('#wideo')
    pg.wait_for_selector('#wynik.dobrze', timeout=15000)      # aparat sam złapał kod Ani
    pg.wait_for_timeout(400); shot(3, 'skan-krok')
    assert 'ANIA' in pg.inner_text('#wynik').upper() and 'Krok 2 z 10' in pg.inner_text('#wynik'), pg.inner_text('#wynik')
    assert B.stan_drogi(B.znajdz(ania['stan']['kod']))['n'] == 2
    pg.wait_for_timeout(9000)                                   # ten sam kod wciąż przed aparatem: baza odpowiada „już dodany”
    pg.wait_for_selector('#wynik.info', timeout=8000); shot(4, 'duplikat')
    assert B.stan_drogi(B.znajdz(ania['stan']['kod']))['n'] == 2, 'duplikat dodał krok!'
    # ręcznie: numer Tomka
    pg.fill('#numer', str(tomek['stan']['numer'])); pg.click('#recznie button'); pg.wait_for_selector('#wynik.dobrze'); pg.wait_for_timeout(200)
    assert 'TOMEK' in pg.inner_text('#wynik').upper(), pg.inner_text('#wynik')
    shot(5, 'recznie-krok')
    pg.wait_for_timeout(2600)
    pg.click('#wynik [data-cofnij]'); pg.wait_for_selector('#wynik.info'); pg.wait_for_timeout(200)
    assert 'Cofnięte' in pg.inner_text('#wynik'); assert B.stan_drogi(B.znajdz(str(tomek['stan']['numer'])))['n'] == 1
    shot(6, 'cofniete')
    # nagroda: Ola ma 9 kroków, dziesiąty robimy na ekranie
    B.okno_duplikatu = 0
    urz = list(B.urzadzenia.keys())[0]
    for i in range(8): B.karta_obsluga_skan(urz, ola['stan']['kod'])
    B.okno_duplikatu = 180
    for k in B.kroki:
        if k['gosc'] is B.znajdz(ola['stan']['kod']): k['kiedy'] -= 900   # wizyty Oli były wcześniej, nie przed chwilą
    pg.wait_for_timeout(2600)
    pg.fill('#numer', str(ola['stan']['numer'])); pg.click('#recznie button'); pg.wait_for_selector('#wynik.dobrze [data-wydaj]'); pg.wait_for_timeout(200)
    shot(7, 'dziesiaty-krok')
    pg.wait_for_timeout(2600)
    pg.fill('#numer', str(ola['stan']['numer'])); pg.click('#recznie button'); pg.wait_for_selector('#wynik.nagroda'); pg.wait_for_timeout(200)
    shot(8, 'nagroda-czeka')
    pg.wait_for_timeout(2600)
    pg.click('#wynik [data-wydaj=kawa]'); pg.wait_for_selector('#wynik [data-cofnij-nagrode]'); pg.wait_for_timeout(200)
    assert 'Wydano: kawa' in pg.inner_text('#wynik'), pg.inner_text('#wynik')
    shot(9, 'wydano')
    assert B.stan_drogi(B.znajdz(ola['stan']['kod']))['spotkania'] == 1
    pg.fill('#numer', '9999'); pg.wait_for_timeout(2600); pg.click('#recznie button'); pg.wait_for_selector('#wynik.zle'); pg.wait_for_timeout(200)
    shot(10, 'nieznany')
    # zguba: Tomek nie ma karty w telefonie
    pg.click('.zakladki [data-z=zguba]'); pg.wait_for_selector('#zguba'); pg.wait_for_timeout(250); shot(12, 'zguba')
    pg.fill('#zemail', 'tomek(at)example'); pg.click('#zguba button'); pg.wait_for_timeout(150)
    assert 'Sprawdź e-mail' in pg.inner_text('#zblad'), pg.inner_text('#zblad')
    pg.fill('#zemail', 'nikt@example.com'); pg.click('#zguba button'); pg.wait_for_selector('#zblad:has-text("Nie ma karty")')
    shot(13, 'zguba-nie-ma')
    pg.fill('#zemail', ' Tomek@Example.com '); pg.click('#zguba button'); pg.wait_for_selector('.zguba-kod'); pg.wait_for_timeout(250); shot(14, 'zguba-kod')
    kod = pg.inner_text('.zguba-kod .podpis b').replace(' ', '')
    assert re.match(r'^[0-9]{8}$', kod) and kod in B.odzyski, kod
    assert 'TOMEK' in pg.inner_text('.zguba-kto').upper() and f"Karta nr {tomek['stan']['numer']}" in pg.inner_text('.zguba-kto'), pg.inner_text('.zguba-kto')
    # kod QR na ekranie obsługi prowadzi pod adres strony z kodem (odczyt niezależnym czytnikiem)
    w_qr = pg.evaluate('''async () => {
      const { default: QrScanner } = await import('/vendor/qr-scanner.min.js');
      const svg = document.querySelector('.zguba-kod .qr svg');
      const img = new Image();
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(svg));
      await img.decode();
      const c = document.createElement('canvas'); c.width = c.height = 640;
      c.getContext('2d').drawImage(img, 0, 0, 640, 640);
      return (await QrScanner.scanImage(c, { returnDetailedScanResult: true })).data;
    }''')
    assert w_qr == f'{BASE}/?o={kod}', w_qr
    uklad_zguby = pg.evaluate('({ sh: document.documentElement.scrollHeight, ch: document.documentElement.clientHeight })')
    # nowy telefon gościa: „Mam już kartę” i kod od obsługi
    ctxn = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, locale='pl-PL')
    pn = ctxn.new_page(); nasluch(pn, 'nowy-telefon')
    pn.goto(BASE + '/'); pn.wait_for_selector('#zapis'); pn.click('.gora .link'); pn.wait_for_selector('#odzysk')
    pn.evaluate('document.fonts.ready.then(() => 1)'); pn.wait_for_timeout(250); pn.screenshot(path=f'{OUT}/g-mam-01.png')
    pn.fill('#okod', '1234'); pn.click('#wyslij'); pn.wait_for_timeout(150); assert '8 cyfr' in pn.inner_text('#blad'), pn.inner_text('#blad')
    pn.fill('#okod', '11111111' if kod == '00000000' else '00000000'); pn.click('#wyslij')
    pn.wait_for_selector('#blad:has-text("nie działa")'); pn.screenshot(path=f'{OUT}/g-mam-02-zly-kod.png')
    pn.fill('#okod', kod[:4] + ' ' + kod[4:]); pn.click('#wyslij'); pn.wait_for_selector('#ramka'); pn.wait_for_timeout(400)
    pn.screenshot(path=f'{OUT}/g-mam-03-wrocila.png')
    assert pn.inner_text('.czesc') == 'Cześć, Tomku!', pn.inner_text('.czesc')
    assert 'Karta wróciła' in pn.inner_text('#zasada'), pn.inner_text('#zasada')
    assert pn.evaluate('JSON.parse(localStorage.getItem("gk.karta.stan")).numer') == tomek['stan']['numer']
    nowy = pn.evaluate('localStorage.getItem("gk.karta.token")')
    assert nowy != tomek['token'] and f'k={nowy}' in pn.url and [x for x in ctxn.cookies() if x['name'] == 'gk_karta' and x['value'] == nowy]
    assert B.karta_stan(tomek['token'])['ok'], 'stary klucz przestał działać'
    assert not B.karta_odzyskaj(kod)['ok'], 'kod zadziałał drugi raz'
    pn.reload(); pn.wait_for_selector('#ramka'); ctxn.close()
    # druga droga: aparat telefonu na kod z ekranu obsługi, czyli adres z ?o=
    kod2 = B.karta_obsluga_odzysk(urz, 'ola@example.com')['kod']
    ctxn = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, locale='pl-PL')
    pn = ctxn.new_page(); nasluch(pn, 'nowy-telefon-qr')
    pn.goto(f'{BASE}/?o={kod2}'); pn.wait_for_selector('#ramka'); pn.wait_for_timeout(300)
    assert pn.inner_text('.czesc') == 'Cześć, Olu!', pn.inner_text('.czesc')
    assert 'o=' not in pn.url and 'k=' in pn.url, pn.url
    pn.goto(f'{BASE}/?nowa=1'); pn.wait_for_selector('#zapis')
    pn.goto(f'{BASE}/?o={kod2}'); pn.wait_for_selector('#odzysk'); pn.wait_for_timeout(200)    # kod zużyty: ekran z polem na nowy
    assert 'nie działa' in pn.inner_text('#blad') and 'o=' not in pn.url, (pn.inner_text('#blad'), pn.url)
    pn.screenshot(path=f'{OUT}/g-mam-04-kod-z-adresu-zuzyty.png')
    ctxn.close()
    pg.click('#zgotowe'); pg.wait_for_selector('#wideo'); pg.wait_for_timeout(600)
    print('zguba OK |', uklad_zguby)
    stopka = pg.inner_text('#dzis')
    uklad = pg.evaluate('({ sh: document.documentElement.scrollHeight, ch: document.documentElement.clientHeight })')
    print('obsluga OK |', stopka, '|', uklad)
    # odłączenie przez właściciela: następna akcja wraca do parowania
    for u in B.urzadzenia.values(): u['aktywne'] = False
    pg.wait_for_selector('#par', timeout=20000); pg.wait_for_timeout(300)   # aparat wciąż widzi kod Ani: pierwszy skan po odłączeniu wraca do parowania
    assert 'odłączone' in pg.inner_text('#blad'), pg.inner_text('#blad')
    shot(11, 'odlaczone')
    b.close()

    # 3) panel
    # powroty: Ania była też trzy dni temu, więc jedna z dwóch osób z wizytą wróciła innego dnia
    B.kid += 1
    B.kroki.append({'id': B.kid, 'gosc': B.znajdz(ania['stan']['kod']), 'zrodlo': 'wizyta', 'lokal': 'centrum', 'urz': None, 'kiedy': time.time() - 3 * 86400, 'cofniety': False})
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    ctx = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, locale='pl-PL', timezone_id='Europe/Warsaw')
    pg = ctx.new_page(); nasluch(pg, 'panel')
    pg.on('dialog', lambda d: d.accept())
    shot = lambda nr, opis: pg.screenshot(path=f'{OUT}/p-{nr:02d}-{opis}.png', full_page=True)
    pg.goto(BASE + '/panel/'); pg.wait_for_selector('h1'); pg.evaluate('document.fonts.ready.then(() => 1)'); pg.wait_for_timeout(200)
    assert 'zamknięty' in pg.inner_text('h1').lower(), pg.inner_text('h1'); shot(1, 'zamkniety')
    B.otwarte = True
    pg.reload(); pg.wait_for_selector('#f'); pg.wait_for_timeout(200)
    pg.fill('#h1', 'krotkie'); pg.fill('#h2', 'krotkie'); pg.click('#f button'); pg.wait_for_timeout(200)
    assert '10 znaków' in pg.inner_text('#blad')
    pg.fill('#h1', 'bardzo-dlugie-haslo'); pg.fill('#h2', 'bardzo-dlugie-haslo'); shot(2, 'ustaw-haslo'); pg.click('#f button')
    pg.wait_for_selector('.kafle'); pg.wait_for_timeout(300); shot(3, 'panel')
    assert pg.inner_text('.kafel.powroty b') == '50%', pg.inner_text('.kafel.powroty b')
    assert 'goście z wizytą: 2 · wrócili innego dnia: 1' in pg.inner_text('.kafel.powroty small'), pg.inner_text('.kafel.powroty small')
    assert pg.inner_text('.kafel:not(.powroty) b') == '3', pg.inner_text('.kafel:not(.powroty) b')
    # kod dla Nova Park
    nova = pg.locator('[data-lokal="nova-park"]')
    nova.locator('input').fill('12'); nova.locator('form button').click(); pg.wait_for_selector('[data-lokal="nova-park"] .uwaga.zle'); 
    nova = pg.locator('[data-lokal="nova-park"]'); nova.locator('input').fill('654321'); nova.locator('form button').click()
    pg.wait_for_selector('[data-lokal="nova-park"] .uwaga.ok'); assert B.lokale['nova-park']['pin'] == '654321'
    pg.locator('[data-lokal="gorczyn"] [data-przelacz]').click(); pg.wait_for_timeout(500); assert B.lokale['gorczyn']['aktywny'] is True
    shot(4, 'panel-po-zmianach')
    pg.click('#wyloguj'); pg.wait_for_selector('#f'); pg.wait_for_timeout(200)
    pg.fill('#h1', 'zle-haslo'); pg.click('#f button'); pg.wait_for_timeout(300); assert pg.inner_text('#blad') == 'Złe hasło.'
    shot(5, 'login')
    pg.fill('#h1', 'bardzo-dlugie-haslo'); pg.click('#f button'); pg.wait_for_selector('.kafle')
    print('panel OK')
    # tablet poziomo: szybki rzut oka na panel
    ctx2 = b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=1, locale='pl-PL', timezone_id='Europe/Warsaw')
    pg2 = ctx2.new_page(); pg2.goto(BASE + '/panel/'); pg2.wait_for_selector('#f'); pg2.fill('#h1', 'bardzo-dlugie-haslo'); pg2.click('#f button'); pg2.wait_for_selector('.kafle'); pg2.wait_for_timeout(300)
    pg2.screenshot(path=f'{OUT}/p-06-tablet.png')
    b.close()
srv.shutdown()
print('BLEDY:', json.dumps(bledy, ensure_ascii=False, indent=1) if bledy else 'brak')
