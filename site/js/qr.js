// Kod QR jako SVG. Biblioteka /vendor/qrcode.js jest ładowana zwykłym <script> przed modułami.
// tryb 'Alphanumeric' daje mniejszy kod, ale przyjmuje tylko wielkie litery, cyfry i kilka znaków.
export function svgQr(tekst, opis, tryb = 'Byte') {
  const q = window.qrcode(0, 'M');
  q.addData(tekst, tryb);
  q.make();
  const n = q.getModuleCount();
  let d = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 ${n + 4} ${n + 4}" shape-rendering="crispEdges" role="img" aria-label="${opis}"><rect x="-2" y="-2" width="${n + 4}" height="${n + 4}" fill="#fff"/><path d="${d}" fill="#111"/></svg>`;
}
