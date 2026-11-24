#!/usr/bin/env python3
"""Arkusz kontrolny ze zrzutów: arkusz.py <prefiks> <kolumny> <skala> <wyjście>"""
import sys, glob
from PIL import Image
pref, cols, sc, out = sys.argv[1], int(sys.argv[2]), float(sys.argv[3]), sys.argv[4]
fs = sorted(glob.glob(pref + '*.png'))
ims = [Image.open(f).convert('RGB') for f in fs]
ims = [im.resize((int(im.width * sc), int(im.height * sc)), Image.LANCZOS) for im in ims]
w = max(i.width for i in ims); h = max(i.height for i in ims)
rows = (len(ims) + cols - 1) // cols
sheet = Image.new('RGB', (cols * w + (cols + 1) * 10, rows * h + (rows + 1) * 10), (232, 228, 218))
for i, im in enumerate(ims):
    r, c = divmod(i, cols)
    sheet.paste(im, (10 + c * (w + 10), 10 + r * (h + 10)))
sheet.save(out)
print(len(ims), sheet.size)
