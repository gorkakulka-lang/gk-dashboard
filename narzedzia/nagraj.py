#!/usr/bin/env python3
"""Nagranie prawdziwej aplikacji gościa (na atrapie bazy): zapis, krok powitalny, kod, skan, spotkanie, nagroda."""
import sys, os, glob, shutil, subprocess, base64
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import atrapa
from playwright.sync_api import sync_playwright

OUT = '/home/claude/render/karta/film'
shutil.rmtree(OUT, ignore_errors=True); os.makedirs(OUT)
srv, port = atrapa.uruchom(0)
B = atrapa.BAZA
B.okno_duplikatu = 0
B.lokale['centrum']['pin'] = '123456'
urz = B.karta_obsluga_paruj('centrum', '123456')['token']

with sync_playwright() as p:
    # prawdziwa (nie emulowana) gęstość 2x, żeby zrzut ekranu przez CDP miał 780x1688
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox', '--force-device-scale-factor=2'])
    ctx = b.new_context(viewport={'width': 390, 'height': 844}, locale='pl-PL')
    pg = ctx.new_page()
    klatki = []
    cdp = ctx.new_cdp_session(pg)
    def klatka(ev):
        klatki.append((ev['metadata']['timestamp'], base64.b64decode(ev['data'])))
        cdp.send('Page.screencastFrameAck', {'sessionId': ev['sessionId']})
    cdp.on('Page.screencastFrame', klatka)
    pg.goto(f'http://127.0.0.1:{port}/')
    pg.wait_for_selector('#zapis'); pg.evaluate('document.fonts.ready.then(() => 1)')
    pg.wait_for_function('Array.from(document.images).every(i => i.complete)')
    cdp.send('Page.startScreencast', {'format': 'jpeg', 'quality': 92, 'maxWidth': 780, 'maxHeight': 1688, 'everyNthFrame': 1})
    pg.wait_for_timeout(1300)
    pg.click('#imie'); pg.keyboard.type('Ania', delay=120); pg.wait_for_timeout(250)
    pg.click('#email'); pg.keyboard.type('ania@example.com', delay=45); pg.wait_for_timeout(300)
    pg.check('#zgoda'); pg.wait_for_timeout(500)
    pg.click('#wyslij')
    pg.wait_for_selector('#ramka'); pg.wait_for_timeout(3300)             # start drogi i krok powitalny
    kod = pg.evaluate('JSON.parse(localStorage.getItem("gk.karta.stan")).kod')
    pg.click('#guzik'); pg.wait_for_selector('.kod-karta'); pg.wait_for_timeout(1500)
    B.karta_obsluga_skan(urz, kod)                                         # obsługa skanuje kod
    pg.wait_for_selector('#ramka', timeout=6000); pg.wait_for_timeout(2600)
    for i in range(6): B.karta_obsluga_skan(urz, kod)                      # kolejne wizyty
    pg.evaluate('document.dispatchEvent(new Event("visibilitychange"))'); pg.wait_for_timeout(5200)
    B.karta_obsluga_skan(urz, kod)
    pg.evaluate('document.dispatchEvent(new Event("visibilitychange"))'); pg.wait_for_timeout(2000)
    B.karta_obsluga_skan(urz, kod)                                         # dziesiąty krok: spotkanie
    pg.evaluate('document.dispatchEvent(new Event("visibilitychange"))'); pg.wait_for_timeout(4300)
    pg.click('#guzik'); pg.wait_for_selector('.kod-karta'); pg.wait_for_timeout(1500)
    B.karta_obsluga_wydaj(urz, kod, 'lody')                                # obsługa wydaje nagrodę
    pg.wait_for_selector('#ramka', timeout=6000); pg.wait_for_timeout(3000)
    cdp.send('Page.stopScreencast'); pg.wait_for_timeout(200)
    ctx.close(); b.close()
srv.shutdown()
from PIL import Image
import io
print('klatek z ekranu:', len(klatki), 'rozmiar', Image.open(io.BytesIO(klatki[0][1])).size, 'czas', round(klatki[-1][0] - klatki[0][0], 1), 's')
FPS = 30
tmp = OUT + '/karta.part.mp4'
ff = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', str(FPS), '-c:v', 'mjpeg', '-i', '-',
                       '-vf', 'format=gbrp,scale=780:1688:out_color_matrix=bt709:out_range=tv:flags=lanczos+accurate_rnd+full_chroma_int,format=yuv420p',
                       '-c:v', 'libx264', '-crf', '19', '-preset', 'veryfast', '-pix_fmt', 'yuv420p',
                       '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv', '-movflags', '+faststart', tmp], stdin=subprocess.PIPE)
t0, t1 = klatki[0][0], klatki[-1][0] + 0.6
j = 0; n = 0; t = t0
while t <= t1:
    while j + 1 < len(klatki) and klatki[j + 1][0] <= t: j += 1
    ff.stdin.write(klatki[j][1]); n += 1; t = t0 + n / FPS
ff.stdin.close(); rc = ff.wait()
if rc == 0: os.replace(tmp, OUT + '/karta.mp4')
print('mp4 rc', rc, n, 'klatek', os.path.getsize(OUT + '/karta.mp4') // 1024, 'KB')
