import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

// Górka & Kulka — koncept strony głównej, wersja 3.
// Jedna opowieść: Szary Dzień -> kolor. Start z grafiki Szarego Dnia, filmy z kawiarni, sklep świąteczny pod kokardą,
// wigilie firmowe, smaki z chromowym rożkiem, kubek na wynos, święto marki.

const CDN = "https://framerusercontent.com/"

const REGLO = "d09GMgABAAAAAAqIAA4AAAAAGLQAAAoyAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGhYbgxAcKgZgAIFMEQgKpEyaLwE2AiQDghALgQoABCAFPAcgGxgSo6J+clIOyP7iwDZmFnyFAmghzwpbtfxo5U/ZEupjMKEp1R3AIMitQQ4swRPZfb2qng8t2UvNnuHoHF+40QWRGEKIhEho/2ku+z8zWXh/pgAsTP0B2t1tA1Pg9FgCJjYR+hAksFAIjuQlOIB//wOEDzzCOa/AvDC35hvcy8RaWLEyyAc8MJPCxP42D1OX2kzTiehfa6+WQCUukYASPaCNjE2MuYUPb+82zCwMcBUxCdMKFdupZ9dpbHmID79mYmGhowSr1peFAHEAQBGEzvheIEo5PtpvwLBxJC2bvW4FSXgAXxVFls5fs4IwI56xh8LlRemHkIYHeBRRTi3tRGJuCVqQcYu7mWDVg9W7Q3RwZxByG6KUVUb7yQHuEiYI7rHvbjofEfiW5I5vOj7v97282LWB+PEIKeSSTwFFFFNKOVVUU0M9DTTSRAsdEFHxAAFAI3V4kHGPB4O5LIScsNCUQik2U6ejRnLG1dg5ZR6VbYXXSqq1cxqQMxv5pOcIgO7XEBiarEVm4MtYgGdhH1ZtXrMWi7WVRlxumHdiI23W1/52kGCgaQYGMfA4BbWif7dHlBJq6EpPpnBPPAlKjvSWvjJMpshm2WozbK4ttKW20rnAUkkdPemtppquUfAzzb3w3BOPLdRNezXkX/++/3v6mU+zCuTJkp5AYsW5RRf7eap7HS6DwFgInvKPbzUo6EreuUm4UjBYDrnhmwGa6rJwtdIY0yhQO1qRL0TLuOiODqM1dFO5jJFpUT19KHcY9AKA7qpUlK1WRwCDIaPbTMmiqcmgvakZM5W2sjVVaBJpgPpCekRDz1CAUeZes7ek+QfGvtVxYKI5tW3nYy84KxpzhSW9jtzKmS2h1CKUm+xFlRuQ+ngZN6VwELKTyK9TemXSEtglWaSw8bIHdwT5YdL0iAipg7oHSADgGDQ8CjA4BEo7yDwBApePzkIShHDOkgmcCn7uEdnGETlq4VHN5deJ3P1uso05vFeNRYGtFkqe2cmS4exm8EMya08k9PAwqf3h5ZvnnTy91qR9PMZooU1R+owFtC8HMZyIJ+DGMpLIXCGD/dBATZ06CaY3Prbj928GvmXWE7ZxxLD7LK6CM0GCuuvwS7qzy0AYF4ie+NshVvEXZsV/jjXkF4Vw/6eMp0E6YLfEyD9sQdUGlmURcRwmKBi+Umg+TJ2HSQISvoyO+ug6eZcs8tTGLMOWjTqcllePBSJQiofHMgmBhIxvKQ/0wDokRnixBKkOucUi4CMaSqWCeKKWtfhlqoidHdIyW9iG/SRCvIOEGU7WySSB+qR6VAPzOCByr8GIWRfqiPDFAdHhk76qUZQHh9X4OEe8NM0CrnfQTIqv9IvqMQdkwOJAhCV65uu5dQipQ4qbnJnmXnxx8D5nx6SwDEp2I7dT6jh4y/GO9PCRqho+2I4pxhdt++D+kQUsyeLyyQXEIQuMXHAJSYT5Blwsc4EcCT2oeHRsY09nJoatS7NcKy3LZyTRSSgU58yW5bsP737FYejOspbP0awQyKZDLG4w41ArtclMwJJag4l0noeClPKo+sTidXo4B292EJ+oo5M6VTu8TwBdnrm70XHsj4XWnHTT/bfi+fW5lVk80Rkh0Ksvh39O3uCA/9LOeYcJ//p7pUUCU/7zbhACY1TYCHW+pMggEW5AC99u8CE4jSsjY3LiE8hBRIpIM+WpGWKC6CsQyzU/NJ4hfOucD51QKWiR15oP9iQlreGS4lIOKkhe6tPQ3OhSk7ZNfNDH2L+/8RI8qw/MTfVu0q7xpcaFjbzRO7npBMneUPZq9Rpcs5qtXo3B6eH9fqoa1VkFgSUSk2Ds/h59iFqTIR0yFaZVGHi8XEAUAwVkVGBMCBQZZjGumNyc2XJAs1ekTPNuUfAaCMIlj5dg84IlCOHNxiUlhwSOOVac1WdhvxDqnciVcQToo4jYzrVp67aZ2GBbOTzcEQEzW/PteM0PTfkHORlT5Uw6aqsUWw8mnsG3nNciAlLupz7AB1VHVxmPU1MdF8aeh0BlOTZfK1LG6DXsZ4wykq4lUpcy7gEE3vG2JqHrKNHSAsnsXoDbgS7jtSSd50q7gFPBZvlzgoM1R+jed5SJ4hjx1okOokC3h36klIPoQUnkE4A3lLKgIq3m5A8VvJwUKiWirlbTm/9BEDQuyT8v4WDnTm26waQlkqGI+5mFwrK6HJMh3fxzI07RVUyaz5fnT56cnyfLecmNRJvPmrULeO2xHoYig2QwGWDQ/sM++3G3sj24JOwcoKsUXwkODkiIFCgyet95v9+Fhah9ByiRUCwRHqUVKUjHO1co5nT4KwKr6oixiNOjfmOZMI3kzqBT9EW+LVR/IqOZ4ysWEQFO5G//xX7TXNzqHIaloCCGol5uvKKIW8rkKcP9upfPKhQZijW8m8TlFnH6bIQ/ipMFHQxiUQD0KxVBJ9xX1I4fnYhM0KOeMxtJQFU1tV1jWzN7Uaj+F75G7rhmNhxmONyJBZClUSD+x+ze/z8lWeul3N65Fg1x/569OBoOquzXGr2MZi6wQjEZcyLolAdiPdrke1B3ZFOosYhrUjGdUHhRJTCnvS4yaVTzTbAcwVF0qeRt2Ibv6lB3dN4XD6Fr033oKM2cjfmOJVJtUgA8xrWva4jQOxHZkKyhk/Q/DvndvWtwDi1Jr8co4v7RQ4X4hJxq1BwS2bTFD7iVv6QAC5bgYfiuqIcdo2ZqhwXVcFuZrGwPIjDXzQ8ESyFC7rwGgMxlGK16KwZCXAE6Dds8TJbewgB5M1MpUT4Bly/Da2X7IU/03HpILvSQPGBPvssjhVMxsgaBJV/Y1xNXZpXhl0JVozurQPukj6o3tstRVe8wFTxXxC58QXh3KDYjPYbulhEbZzLFxZrSvi66a8hauxFboPOywTHz5SMZfFBQa7zabF61bWc7WLVQp/FcDLMqnD+wTYlhCX66MKPfZftP0CSYJbMp3dShQyjh6tatUEFpX7VrgkNSB45ZtePEhxk7M7wadjKvrFmrxsdPNseZfRsmyT0TY5q6V7eDsYmJvUcMX7xo08Xz9CMGCBMGlxWXZHTqGB5O6tetWMHXfnudOsHtUgvsqZy9woXDehlimzZz9xiKi0vs03vklCWLD8Odi1Lg9vKW64IzaWvXYPUKBepfhb+ASEKPcH7mIT6neszXwLD8T7yHO9YmgLfZDoIrXhdzAiGMGpB/lZERs0yg4jDXmFx6P/kK8RsSn266E188uskJ5tGD6A6mSA4ZcrWpdpRqeY2vFmiWdexb9s/xqOqlZ5OhY+imjUTV0luzaNBaessXiKBqtmqPynH6azIlWg9VX+q30VsGeUGiWnfwONXyigxtRzf5kmS8Ik3DNFG+A5OC1ToJ3ywDNqSMIrlENRQ1ZU/RL1SbY8p72JBeAjwsMpSov5RFZHFM+zGaACg2ECSsF+RsShEG8SIIKZBHKkn4bGOYz0KWsRLLKIZhWI+LzWYNBuKbO44PAAA="

function obraz(plik: string, rozmiar?: number) {
    return CDN + "images/" + plik + (rozmiar ? "?scale-down-to=" + rozmiar : "")
}

// Pliki z przezroczystym tłem mają duże marginesy; "b" to ramka samego rysunku (0-1).
type Plik = { f: string; w: number; h: number; b: number[] }
const P: Record<string, Plik> = {
    rozek: { f: "GeyIkwREEgm90L6uKPbIl1LjZqo.png", w: 2481, h: 3508, b: [0.276, 0.153, 0.768, 0.862] },
    balony: { f: "dMfp4TiarM7xeh32TNMJDVQ.png", w: 2481, h: 3508, b: [0.061, 0.194, 0.924, 0.793] },
    kulka: { f: "MkODCKBpnDDT7zIpB9ghtsGE.png", w: 2481, h: 3508, b: [0.018, 0.132, 0.739, 0.882] },
    gorka: { f: "xsCFFdXkxAZooD9syIVyBn9DJI.png", w: 2481, h: 3508, b: [0.165, 0.134, 0.75, 0.88] },
    para: { f: "nZkq30KHkQ6dtTxxAHaYBTFjhk.png", w: 2481, h: 3508, b: [0.142, 0.225, 0.82, 0.807] },
    dzieci: { f: "WGMozes3AEfQGUYXJcengJohY.png", w: 2370, h: 3798, b: [0.27, 0.189, 0.761, 0.792] },
    lezak: { f: "rDSYmT0Z09ufR7qt5pnjMS1LiA.png", w: 1536, h: 1024, b: [0.149, 0.069, 0.878, 0.911] },
    parasol: { f: "r2H7gwMK5JasYIZaYIab1yOzyWo.png", w: 2084, h: 2084, b: [0.111, 0.085, 0.884, 0.951] },
    slonce: { f: "jGkCKcDaSJRtANErj1hjGoJiaLo.png", w: 2613, h: 2613, b: [0.108, 0.075, 0.891, 0.884] },
    logotyp: { f: "yAwPPIb1WzY1tcRtyMDk7lxek.png", w: 3508, h: 2481, b: [0.088, 0.405, 0.912, 0.595] },
}
const KROPKA = obraz("hcEYBPcpKbkyEwHkc1EN6UefB0.png", 1024)
const TASMA_MASLO = obraz("NXiY22MPtEtb0856oHwikxcvcs.png", 2048)
const TASMA_ROZ = obraz("7isRC6z3vVnmnlrFfF7Hq5QMBz0.png", 2048)
const FOTO = {
    sala: obraz("KoRowOosOJMF9onIaCIXgMFxHiA.jpg", 1024),
    sniadanie: obraz("w2vR1hwXObFvhmHEcVF6Zkkrqk.jpg", 1024),
    klientka: obraz("dwPaSynGE6Y5uG0zyaGctnfl0.jpg", 1024),
    witryna: obraz("LvYoXeTsubFOeEyunoXC3Ymsn2c.jpg", 2048),
    ciasto: obraz("0NCCWCqa0Ep8SmT5AztREO4KPA.jpg", 1024),
}

// Szary Dzień przy stoliku: sześć klatek z grafiki marki (białe tło, nakładane mnożeniem na kolor strony).
const SZARY = [
    "VCgccjDlx1qkFJmv9yduVkUV8.webp",
    "OKgHFxpcUbkXGbSbQuZyGBJnw.webp",
    "VhGxz0ApCYSPErN4GUAyOXjHL2k.webp",
    "Mx6Q73NrY9WDXHdnf6YdBeG4dY.webp",
    "sGBRlL3vOyZCDFzeyuu9mc53xNc.webp",
    "kJWLQ7sBa9puoQStXzK5IxBK5SQ.webp",
].map((f) => obraz(f))
const KOKARDA = obraz("vWtpmRjDk5QAd1EhNzGB6NOmV1c.webp")
const KUBEK = obraz("1oErhtKWUj4Zul5FVbxnAgZfWBI.webp")

// Kokarda pocięta na pięć części (wielokąty w procentach obrazka), żeby dało się ją rozwiązać.
const KOK: Record<string, string> = {
    petlaL: "polygon(0% 0%, 49.7% 0%, 49.7% 18.28%, 45.5% 18.7%, 42.2% 19.45%, 41.4% 22.85%, 41.2% 26.57%, 41.4% 30.82%, 41.8% 33.16%, 42.4% 34.75%, 40% 35.92%, 36% 37.89%, 33% 39.37%, 30.3% 40.75%, 29% 41.6%, 27% 43.36%, 25% 45.16%, 23.6% 46.76%, 0% 46.76%)",
    petlaP: "polygon(100% 0%, 49.7% 0%, 49.7% 18.28%, 54% 18.7%, 57.8% 19.55%, 58.5% 22.85%, 58.6% 26.57%, 58.5% 30.82%, 58.2% 32.94%, 57.8% 34.22%, 60% 35.55%, 64% 37.94%, 67% 39.69%, 69.2% 41.02%, 70.5% 42.03%, 72.5% 43.94%, 74.5% 45.91%, 75.3% 46.76%, 100% 46.76%)",
    ogonL: "polygon(42.4% 34.75%, 40% 35.92%, 36% 37.89%, 33% 39.37%, 30.3% 40.75%, 29% 41.6%, 27% 43.36%, 25% 45.16%, 23.6% 46.76%, 0% 46.76%, 0% 100%, 3.2% 100%, 21.5% 92.2%, 39.8% 100%, 49.7% 100%, 49.7% 37.94%, 47% 37.3%, 44.5% 36.66%, 43% 35.71%)",
    ogonP: "polygon(57.8% 34.22%, 60% 35.55%, 64% 37.94%, 67% 39.69%, 69.2% 41.02%, 70.5% 42.03%, 72.5% 43.94%, 74.5% 45.91%, 75.3% 46.76%, 100% 46.76%, 100% 100%, 94.8% 100%, 77.4% 92.2%, 60% 100%, 49.7% 100%, 49.7% 37.94%, 52.3% 37.3%, 54.8% 36.77%, 56.6% 35.81%)",
    wezel: "polygon(45.5% 18.7%, 49.7% 18.28%, 54% 18.7%, 57.8% 19.55%, 58.5% 22.85%, 58.6% 26.57%, 58.5% 30.82%, 58.2% 32.94%, 57.8% 34.22%, 56.6% 35.81%, 54.8% 36.77%, 52.3% 37.3%, 49.7% 37.94%, 47% 37.3%, 44.5% 36.66%, 43% 35.71%, 42.4% 34.75%, 41.8% 33.16%, 41.4% 30.82%, 41.2% 26.57%, 41.4% 22.85%, 42.2% 19.45%)",
}

// Wypieki na Święta 2026: trzy ciasta z makiety zamówień (bez cen).
const WYPIEKI = [
    { f: "6jNwbhYhSQpNCiupLkUbX4Ebc.jpg", w: 840, nazwa: "Sernik waniliowy", opis: "Kremowy w\u00a0środku, mocno przypieczony z\u00a0wierzchu. Świąteczna klasyka w\u00a0naszym wydaniu." },
    { f: "zdqTZNtOtNyLBT1wi6bLYKjYhM.jpg", w: 804, nazwa: "Makowiec", opis: "Drożdżowe ciasto zwinięte z\u00a0gęstą masą makową. Bez niego nie ma Wigilii." },
    { f: "XZiPiwkX7kaehGjFJrxTCVpvoNo.jpg", w: 736, nazwa: "Ciasto czekoladowe", opis: "Warstwy czekoladowego biszkoptu i\u00a0kremu pod wiórkami czekolady." },
]
const ZAMOWIENIA = "/kolekcja-swiateczna"

type Smak = { nr: string; nazwa: string[]; en: string; opis: string; kolor: string; gala: string; tekst: string }
const SMAKI: Smak[] = [
    { nr: "01", nazwa: ["Śmietanka"], en: "Whipped Cream", opis: "Biała. Uparcie prosta.", kolor: "#F3ECDC", gala: "#FFFFFF", tekst: "#111111" },
    { nr: "02", nazwa: ["Solony", "karmel"], en: "Salted Caramel", opis: "Z kawałkami czekolady. Słodki, ale z charakterem.", kolor: "#B4652F", gala: "#D58A4F", tekst: "#FFF3E2" },
    { nr: "03", nazwa: ["Pistacja"], en: "Pistachio", opis: "Zielona bez kompromisów.", kolor: "#A9BD78", gala: "#C6D79E", tekst: "#111111" },
    { nr: "04", nazwa: ["Mascarpone", "z szafranem"], en: "Mascarpone & Saffron", opis: "I z pomarańczą. Brzmi poważnie, znika od razu.", kolor: "#FFB23E", gala: "#FFCD78", tekst: "#111111" },
    { nr: "05", nazwa: ["Beza", "dacquoise"], en: "Dacquoise Meringue", opis: "Chrupie, zanim się rozpłynie.", kolor: "#EAD2C0", gala: "#F8E9DD", tekst: "#111111" },
    { nr: "06", nazwa: ["Gruszka", "z imbirem"], en: "Pear & Ginger", opis: "Sorbet. Rozgrzewa, choć mrozi.", kolor: "#D3D77C", gala: "#E4E7A8", tekst: "#111111" },
]
// Kolory smaków jako liczby 0–1: chromowy rożek odbija kolor smaku, który jest na ekranie.
const rgb01 = (hex: string) => [parseInt(hex.slice(1, 3), 16) / 255, parseInt(hex.slice(3, 5), 16) / 255, parseInt(hex.slice(5, 7), 16) / 255]
const SMAKI_RGB = SMAKI.map((s) => ({ a: rgb01(s.kolor), b: rgb01(s.gala) }))

// Podpisy pod rysunkiem na starcie: zmieniają się razem z klatkami.
const RYCINY = [
    "Ryc. 1 — Szary Dzień. Sam przy stoliku.",
    "Ryc. 2 — Dosiada się Kulka.",
    "Ryc. 3 — „To dla ciebie”.",
    "Ryc. 4 — Szary Dzień próbuje.",
    "Ryc. 5 — Jest uśmiech.",
    "Ryc. 6 — Rozpogodziło się.",
]

const MANIFEST =
    "~Szary ~Dzień przychodzi do każdego. Do Gorzowa i do Nowego Jorku. W poniedziałki, w listopadzie, po pracy. Nie przeganiamy go. Częstujemy. Od dziesięciu lat robimy lody, po których dzień zmienia *kolor. Teraz zabieramy ten *kolor w świat. Po jednej kulce."

const MIASTA = ["Warszawa", "Poznań", "Wrocław", "Kraków", "Berlin", "Kopenhaga"]

// Napisy do filmów: [sekunda początku ujęcia, tekst]. Czasy z prawdziwych cięć w filmach.
const NAPISY_1: Array<[number, string]> = [
    [0, "Najmłodszy gość dnia."],
    [1.53, "Kolejka po dobry humor."],
    [2.6, "Śniadania serwujemy do 18.00."],
    [3.93, "Kawiarnia Centrum. Sikorskiego 126."],
    [5.3, "Witryna. Tu zaczynają się trudne wybory."],
    [6.53, "Cappuccino w kolorze kulki."],
    [7.63, "Chwila namysłu przy ladzie."],
    [8.8, "Stolik na małe święto."],
    [10.13, "Gość honorowy."],
    [11.3, "Sos? Zawsze."],
    [12.7, "Na słono też umiemy."],
    [14.2, "I jeszcze jedno śniadanie na stół."],
]
const NAPISY_2: Array<[number, string]> = [
    [0, "Jesień w Centrum."],
    [1.5, "Dynia na stole, serce na kawie."],
    [2.93, "Czekolada z pianką."],
    [4.73, "Coś słodkiego? Zawsze."],
    [7.2, "Pełna sala."],
    [10.2, "Nasz zespół."],
    [11.73, "Uśmiech w cenie."],
    [13.2, "Tost francuski, sos z owoców."],
    [16.63, "Zapraszamy codziennie, 10–19."],
]

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeIn = (t: number) => t * t * t
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const dwa = (n: number) => (n < 10 ? "0" : "") + n

// W edytorze Framera (na kanwie) strona jest nieruchomym podglądem: bez pętli ruchu i bez filmów.
function naKanwie() {
    try {
        return RenderTarget.current() === RenderTarget.canvas
    } catch (e) {
        return false
    }
}

function przewinDo(id: string) {
    if (typeof document === "undefined") return
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
}

// ---------- Żywy chrom: WebGL na prawdziwym renderze ----------
const VS = "attribute vec2 p; varying vec2 v; void main(){ v = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }"
const FS = [
    "precision highp float;",
    "varying vec2 v;",
    "uniform sampler2D T;",
    "uniform vec4 K;",
    "uniform vec2 px;",
    "uniform float t;",
    "uniform vec2 L;",
    "uniform vec3 A;",
    "uniform vec3 B;",
    "uniform vec3 kolo;",
    "uniform float caly;",
    "float lum(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }",
    "void main(){",
    "  vec2 tc = K.xy + v * K.zw;",
    "  vec4 c = texture2D(T, tc);",
    "  float a = c.a;",
    "  if (a < 0.004) { gl_FragColor = vec4(0.0); return; }",
    "  float k = 2.5;",
    "  float hl = lum(texture2D(T, tc - vec2(px.x * k, 0.0)).rgb);",
    "  float hr = lum(texture2D(T, tc + vec2(px.x * k, 0.0)).rgb);",
    "  float hd = lum(texture2D(T, tc - vec2(0.0, px.y * k)).rgb);",
    "  float hu = lum(texture2D(T, tc + vec2(0.0, px.y * k)).rgb);",
    "  vec2 g = vec2(hr - hl, hu - hd);",
    "  vec3 n = normalize(vec3(-g * 2.2, 1.0));",
    "  vec2 drg = n.xy * px * 3.0 * sin(t * 0.8 + v.y * 9.0);",
    "  vec3 baza = texture2D(T, tc + drg).rgb / max(a, 0.004);",
    "  float l = lum(baza);",
    "  vec2 r = n.xy * 1.4 + (v - 0.5) * vec2(0.9, 0.5) + L * 0.45;",
    "  float pas1 = sin((r.x * 2.3 + r.y * 1.1) * 3.14159 + t * 0.55);",
    "  float pas2 = sin((r.x * -1.4 + r.y * 2.6) * 3.14159 - t * 0.35 + 1.7);",
    "  float env = 0.5 + 0.25 * pas1 + 0.25 * pas2;",
    "  vec3 otoczenie = mix(A, B, smoothstep(0.25, 0.75, env));",
    "  float srodek = smoothstep(0.10, 0.42, l) * (1.0 - smoothstep(0.74, 0.98, l));",
    "  vec3 kolorowy = baza * mix(vec3(1.0), otoczenie * 1.3, 0.6 * srodek) + otoczenie * 0.08 * srodek;",
    "  float krzywizna = clamp(length(g) * 6.0, 0.0, 1.0);",
    "  float przek = dot(v - 0.5, vec2(0.55, 0.83)) + n.x * 0.05;",
    "  float faza = fract(t * 0.12);",
    "  float pas = mix(-0.75, 0.75, smoothstep(0.0, 0.4, faza));",
    "  float blysk = exp(-pow((przek - pas) / 0.07, 2.0)) * step(faza, 0.4);",
    "  kolorowy += vec3(1.0) * blysk * (0.16 + 0.5 * krzywizna) * smoothstep(0.22, 0.7, l);",
    "  float kier = max(dot(normalize(g + vec2(0.00001)), normalize(L + vec2(0.00001))), 0.0);",
    "  kolorowy += vec3(1.0, 0.97, 0.94) * pow(kier, 3.0) * krzywizna * length(L) * 0.32;",
    "  vec3 szary = mix(vec3(l) * vec3(0.94, 0.96, 0.99), vec3(0.6), 0.14);",
    "  szary += vec3(1.0) * blysk * 0.08 * krzywizna;",
    "  float wkole = 1.0 - smoothstep(kolo.z - 1.5, kolo.z + 1.5, distance(gl_FragCoord.xy, kolo.xy));",
    "  vec3 wynik = mix(szary, kolorowy, max(wkole, caly));",
    "  gl_FragColor = vec4(wynik * a, a);",
    "}",
].join("\n")

type ChromU = { czas: number; lx: number; ly: number; kx: number; ky: number; kr: number; caly: number; A: number[]; B: number[] }
type Chrom = { rysuj: (u: ChromU) => void; usun: () => void }

function stworzChrom(plotno: HTMLCanvasElement, src: string, b: number[], poZaladowaniu: () => void): Chrom | null {
    let gl: WebGLRenderingContext | null = null
    try {
        gl = plotno.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false }) as WebGLRenderingContext | null
    } catch (e) {
        gl = null
    }
    if (!gl) return null
    const g = gl
    const kompiluj = (typ: number, kod: string) => {
        const s = g.createShader(typ)
        if (!s) return null
        g.shaderSource(s, kod)
        g.compileShader(s)
        return g.getShaderParameter(s, g.COMPILE_STATUS) ? s : null
    }
    const vs = kompiluj(g.VERTEX_SHADER, VS)
    const fs = kompiluj(g.FRAGMENT_SHADER, FS)
    const prog = g.createProgram()
    if (!vs || !fs || !prog) return null
    g.attachShader(prog, vs)
    g.attachShader(prog, fs)
    g.linkProgram(prog)
    if (!g.getProgramParameter(prog, g.LINK_STATUS)) return null
    g.useProgram(prog)
    g.bindBuffer(g.ARRAY_BUFFER, g.createBuffer())
    g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), g.STATIC_DRAW)
    const poz = g.getAttribLocation(prog, "p")
    g.enableVertexAttribArray(poz)
    g.vertexAttribPointer(poz, 2, g.FLOAT, false, 0, 0)
    const U = (n: string) => g.getUniformLocation(prog, n)
    const u = { T: U("T"), K: U("K"), px: U("px"), t: U("t"), L: U("L"), A: U("A"), B: U("B"), kolo: U("kolo"), caly: U("caly") }
    let gotowy = false
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
        try {
            g.bindTexture(g.TEXTURE_2D, g.createTexture())
            g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, 1)
            g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1)
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE)
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE)
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR)
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR)
            g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, img)
            g.uniform1i(u.T, 0)
            g.uniform4f(u.K, b[0], 1 - b[3], b[2] - b[0], b[3] - b[1])
            g.uniform2f(u.px, 1 / img.naturalWidth, 1 / img.naturalHeight)
            g.clearColor(0, 0, 0, 0)
            gotowy = true
            poZaladowaniu()
        } catch (e) {
            gotowy = false
        }
    }
    img.src = src
    return {
        rysuj: (w) => {
            if (!gotowy) return
            g.viewport(0, 0, plotno.width, plotno.height)
            g.uniform1f(u.t, w.czas)
            g.uniform2f(u.L, w.lx, w.ly)
            g.uniform3f(u.A, w.A[0], w.A[1], w.A[2])
            g.uniform3f(u.B, w.B[0], w.B[1], w.B[2])
            g.uniform3f(u.kolo, w.kx, w.ky, w.kr)
            g.uniform1f(u.caly, w.caly)
            g.clear(g.COLOR_BUFFER_BIT)
            g.drawArrays(g.TRIANGLE_STRIP, 0, 4)
        },
        usun: () => {
            gotowy = false
            const ext = g.getExtension("WEBGL_lose_context")
            if (ext) ext.loseContext()
        },
    }
}

const ROZ_RGB = [0.969, 0.761, 0.812]
const MASLO_RGB = [1, 0.886, 0.584]

// ---------- Drobne klocki ----------
function Wyc(props: { a: Plik; rozmiar?: number; alt?: string; className?: string; style?: React.CSSProperties; odrazu?: boolean }) {
    const a = props.a
    const bw = a.b[2] - a.b[0]
    const bh = a.b[3] - a.b[1]
    const styl: React.CSSProperties = { aspectRatio: String(Math.round(((bw * a.w) / (bh * a.h)) * 10000) / 10000) }
    if (props.style) Object.assign(styl, props.style)
    return (
        <span className={"gk2-wyc" + (props.className ? " " + props.className : "")} style={styl}>
            <img
                src={obraz(a.f, props.rozmiar || 1024)}
                alt={props.alt || ""}
                loading={props.odrazu ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                style={{ width: (100 / bw).toFixed(3) + "%", left: ((-a.b[0] / bw) * 100).toFixed(3) + "%", top: ((-a.b[1] / bh) * 100).toFixed(3) + "%" }}
            />
        </span>
    )
}

// Taśma "10 YEARS": kafle o długości jednego okresu wzoru, więc pętla nie ma szwu.
function Tasma(props: { src: string; klasa: string }) {
    return (
        <div className={"gk2-tasma " + props.klasa}>
            <div>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <i key={i} style={{ backgroundImage: "url(" + props.src + ")" }} />
                ))}
            </div>
        </div>
    )
}

function Linie(props: { linie: string[]; className?: string; znacznik?: "h2" | "h3" | "div"; bezWjazdu?: boolean }) {
    const Z = (props.znacznik || "h2") as any
    const dane: Record<string, string> = props.bezWjazdu ? {} : { "data-wjazd": "" }
    return (
        <Z className={"gk2-d gk2-linie" + (props.className ? " " + props.className : "")} {...dane}>
            {props.linie.map((l, i) => (
                <span key={i}>
                    <span style={{ transitionDelay: i * 90 + "ms" }}>{l}</span>
                </span>
            ))}
        </Z>
    )
}

function Film(props: { src: string; zapas: string[]; opis: string; wideoRef: (el: HTMLVideoElement | null) => void }) {
    const ramka = useRef<HTMLDivElement>(null)
    const wideo = useRef<HTMLVideoElement | null>(null)
    const [stan, ustawStan] = useState("czeka")
    useEffect(() => {
        const el = ramka.current
        const v = wideo.current
        if (!el || !v || typeof window === "undefined" || !("IntersectionObserver" in window) || naKanwie()) return
        v.muted = true
        v.defaultMuted = true
        let zaladowany = false
        let padl = false
        const graj = () => {
            if (padl) return
            const obietnica = v.play()
            if (obietnica && obietnica.catch)
                obietnica.catch((e: any) => {
                    // Tylko gdy przeglądarka zabrania autoodtwarzania (np. tryb oszczędzania energii): pokaż przycisk.
                    if (e && e.name === "NotAllowedError") ustawStan((s) => (s === "gra" ? s : "stop"))
                })
        }
        const blisko = new IntersectionObserver(
            (wpisy) => {
                wpisy.forEach((w) => {
                    if (w.isIntersecting && !zaladowany && props.src) {
                        zaladowany = true
                        v.src = props.src
                        v.load()
                    }
                })
            },
            { rootMargin: "120% 0px 120% 0px" }
        )
        const widac = new IntersectionObserver(
            (wpisy) => {
                wpisy.forEach((w) => {
                    if (w.isIntersecting) graj()
                    else v.pause()
                })
            },
            { threshold: 0.08 }
        )
        const poMetadanych = () => {
            // Film w kodeku, którego przeglądarka nie pokaże (sam dźwięk): zostają zdjęcia.
            if (v.videoWidth === 0) {
                padl = true
                v.pause()
                ustawStan("zapas")
            }
        }
        const blad = () => {
            padl = true
            ustawStan("zapas")
        }
        const gra = () => ustawStan("gra")
        v.addEventListener("loadedmetadata", poMetadanych)
        v.addEventListener("error", blad)
        v.addEventListener("playing", gra)
        blisko.observe(el)
        widac.observe(el)
        return () => {
            blisko.disconnect()
            widac.disconnect()
            v.removeEventListener("loadedmetadata", poMetadanych)
            v.removeEventListener("error", blad)
            v.removeEventListener("playing", gra)
            v.pause()
        }
    }, [props.src])
    return (
        <div className={"gk2-film" + (stan === "gra" ? " gk2-film-gra" : "")} ref={ramka}>
            <div className="gk2-film-zdjecia" aria-hidden="true">
                {props.zapas.map((z, i) => (
                    <img key={i} src={z} alt="" loading="lazy" decoding="async" style={{ animationDelay: i * 5 + "s" }} />
                ))}
            </div>
            <video
                ref={(el) => {
                    wideo.current = el
                    props.wideoRef(el)
                }}
                muted
                playsInline
                loop
                preload="none"
                aria-label={props.opis}
            />
            {stan === "stop" ? (
                <button
                    type="button"
                    className="gk2-graj"
                    onClick={() => {
                        const v = wideo.current
                        if (v) v.play().catch(() => {})
                    }}
                >
                    Odtwórz film
                </button>
            ) : null}
        </div>
    )
}

// Najszarszy Dzień = trzeci poniedziałek stycznia, 00:00 czasu polskiego.
function najszarszy(teraz: number) {
    const licz = (rok: number) => {
        const dz = new Date(Date.UTC(rok, 0, 1)).getUTCDay()
        const dzien = 1 + ((8 - dz) % 7) + 14
        return { start: Date.UTC(rok, 0, dzien - 1, 23, 0, 0), dzien: dzien, rok: rok }
    }
    const rok = new Date(teraz).getUTCFullYear()
    let w = licz(rok)
    if (teraz >= w.start + 24 * 3600 * 1000) w = licz(rok + 1)
    return w
}

function Odliczanie() {
    const [teraz, ustawTeraz] = useState<number | null>(null)
    useEffect(() => {
        ustawTeraz(Date.now())
        const i = setInterval(() => ustawTeraz(Date.now()), 1000)
        return () => clearInterval(i)
    }, [])
    if (teraz === null) return <div className="gk2-d gk2-odliczanie">&nbsp;</div>
    const start = najszarszy(teraz).start
    if (teraz >= start) return <div className="gk2-d gk2-odliczanie">Dziś. Najszarszy Dzień trwa.</div>
    let reszta = Math.floor((start - teraz) / 1000)
    const d = Math.floor(reszta / 86400)
    reszta -= d * 86400
    const h = Math.floor(reszta / 3600)
    reszta -= h * 3600
    const m = Math.floor(reszta / 60)
    const sek = reszta - m * 60
    return (
        <div className="gk2-d gk2-odliczanie" aria-label={"Do Najszarszego Dnia zostało " + d + " dni"}>
            <span>
                {d}
                <small>{d === 1 ? "dzień" : "dni"}</small>
            </span>
            <span>
                {dwa(h)}
                <small>godz.</small>
            </span>
            <span>
                {dwa(m)}
                <small>min</small>
            </span>
            <span>
                {dwa(sek)}
                <small>s</small>
            </span>
        </div>
    )
}

function Zapis(props: { data: string }) {
    const [gotowe, ustawGotowe] = useState(false)
    if (gotowe) return <p className="gk2-d gk2-zapis-dzieki">Jesteś na liście. Do zobaczenia {props.data}.</p>
    return (
        <form
            className="gk2-zapis"
            onSubmit={(e) => {
                e.preventDefault()
                ustawGotowe(true)
            }}
        >
            <label className="gk2-e" htmlFor="gk2-email">
                Prognoza na styczeń: szaro. Zostaw e-mail, a przed {props.data} dostaniesz zaproszenie.
            </label>
            <div className="gk2-zapis-wiersz">
                <input id="gk2-email" type="email" required placeholder="twoj@email.pl" autoComplete="email" />
                <button type="submit" className="gk2-przycisk gk2-przycisk-roz">
                    Zapisuję się
                </button>
            </div>
            <label className="gk2-zgoda">
                <input type="checkbox" required />
                <span>Chcę dostawać newsletter Górka & Kulka e-mailem. Mogę się wypisać w każdej chwili.</span>
            </label>
        </form>
    )
}

function Glosowanie() {
    const [glosy, ustawGlosy] = useState<string[]>([])
    return (
        <div className="gk2-glosuj">
            <div>
                <h3 className="gk2-d gk2-h3">Gdzie następne?</h3>
                <p className="gk2-lead">Tam, gdzie najszarzej, otworzymy najpierw. Zagłosuj na swoje miasto.</p>
            </div>
            <div>
                <div className="gk2-miasta">
                    {MIASTA.map((m) => {
                        const on = glosy.indexOf(m) >= 0
                        return (
                            <button key={m} type="button" className="gk2-miasto" aria-pressed={on} onClick={() => ustawGlosy(on ? glosy.filter((x) => x !== m) : glosy.concat([m]))}>
                                {m}
                                {on ? " ✓" : ""}
                            </button>
                        )
                    })}
                    <button type="button" className="gk2-miasto gk2-miasto-inne">
                        Moje miasto +
                    </button>
                </div>
                <p className="gk2-drobny">{glosy.length ? "Dzięki. Liczymy chmury nad: " + glosy.join(", ") + "." : "Jeden klik, bez logowania."}</p>
            </div>
        </div>
    )
}

// Kokarda z pliku marki, pocięta na części: pętle chowają się w węźle, ogony się wydłużają i zsuwają.
function Kokarda(props: { u: (k: string) => (el: any) => void }) {
    const czesc = (k: string, klasa: string) => <i ref={props.u("kok_" + k)} className={"gk2-kok-cz " + klasa} style={{ clipPath: KOK[k], WebkitClipPath: KOK[k] } as React.CSSProperties} />
    return (
        <div className="gk2-kok">
            {czesc("ogonL", "gk2-kok-ogon")}
            {czesc("ogonP", "gk2-kok-ogon")}
            {czesc("petlaL", "gk2-kok-petla-l")}
            {czesc("petlaP", "gk2-kok-petla-p")}
            {czesc("wezel", "gk2-kok-wezel")}
        </div>
    )
}

// Zapytanie o wigilię firmową. Makieta: nic nie jest wysyłane.
function Zapytanie() {
    const [wyslane, ustawWyslane] = useState(false)
    if (wyslane)
        return (
            <div className="gk2-zapytanie-dzieki">
                <p className="gk2-d gk2-h3">{"Dziękujemy. Odpiszemy z\u00a0ofertą."}</p>
                <p className="gk2-drobny">Tak będzie wyglądać potwierdzenie. To makieta: zapytanie jeszcze nigdzie nie trafia.</p>
            </div>
        )
    return (
        <form
            className="gk2-zapytanie"
            onSubmit={(e) => {
                e.preventDefault()
                ustawWyslane(true)
            }}
        >
            <label className="gk2-pole">
                <span className="gk2-e">Firma</span>
                <input type="text" name="firma" required autoComplete="organization" placeholder="Nazwa firmy" />
            </label>
            <label className="gk2-pole">
                <span className="gk2-e">Termin</span>
                <input type="date" name="termin" required />
            </label>
            <label className="gk2-pole">
                <span className="gk2-e">Liczba osób</span>
                <input type="number" name="osoby" required min={2} inputMode="numeric" placeholder="np. 12" />
            </label>
            <label className="gk2-pole">
                <span className="gk2-e">E-mail lub telefon</span>
                <input type="text" name="kontakt" required placeholder="Jak mamy odpisać?" />
            </label>
            <div className="gk2-zapytanie-dol">
                <button type="submit" className="gk2-przycisk">
                    Wyślij zapytanie
                </button>
                <span className="gk2-drobny">{"Odpiszemy z\u00a0propozycją menu i\u00a0wyceną."}</span>
            </div>
        </form>
    )
}

// Kubek na wynos: wycięty z pliku marki, a etykieta jest złożona na nowo (ostra w każdym rozmiarze).
function Kubek(props: { tiltRef: (el: HTMLDivElement | null) => void }) {
    const [wybrany, ustawWybrany] = useState(0)
    const [zapisany, ustawZapisany] = useState(false)
    const smak = SMAKI[wybrany]
    const L = P.logotyp
    const okno = [L.b[0] * L.w, L.b[1] * L.h, (L.b[2] - L.b[0]) * L.w, (L.b[3] - L.b[1]) * L.h].map((n) => n.toFixed(1)).join(" ")
    return (
        <section className="gk2-kubek" id="gk2-kubek" data-motyw="jasny">
            <div className="gk2-kubek-tekst">
                <div className="gk2-e">06 — Na wynos</div>
                <Linie linie={["Zapas", "lata."]} className="gk2-h2" />
                <p className="gk2-lead">Kubek 450 ml prosto do zamrażarki. Na wypadek, gdyby Szary Dzień przyszedł bez zapowiedzi.</p>
                <div className="gk2-wybor" role="group" aria-label="Wybierz smak">
                    {SMAKI.map((s, i) => (
                        <button key={s.nr} type="button" aria-pressed={i === wybrany} aria-label={s.nazwa.join(" ")} title={s.nazwa.join(" ")} style={{ background: s.kolor }} onClick={() => ustawWybrany(i)} />
                    ))}
                    <span className="gk2-wybor-nazwa gk2-e">Smak: {smak.nazwa.join(" ")}</span>
                </div>
                <button type="button" className="gk2-przycisk" onClick={() => ustawZapisany(true)}>
                    {zapisany ? "Dzięki, damy znać ✓" : "Zapisz mnie na start sklepu"}
                </button>
                <p className="gk2-drobny">Sklep internetowy i wysyłka w Polsce — wkrótce.</p>
            </div>
            <div className="gk2-kubek-foto">
                <div className="gk2-kubek-cien" aria-hidden="true" />
                <div className="gk2-kubek-tilt" ref={props.tiltRef}>
                    <div className="gk2-kubek-obraz">
                        <img src={KUBEK} width={630} height={668} alt={"Kubek lodów Górka & Kulka 450 ml, smak: " + smak.nazwa.join(" ")} loading="lazy" decoding="async" draggable={false} />
                        <svg className="gk2-etykieta" viewBox="0 0 300 400" aria-hidden="true">
                            <rect x="0" y="0" width="300" height="327" fill="#FFFFFF" />
                            <svg x="16.5" y="23.5" width="267" height="43.6" viewBox={okno} preserveAspectRatio="xMidYMid meet">
                                <image href={obraz(L.f, 1024)} x="0" y="0" width={L.w} height={L.h} />
                            </svg>
                            <text x="19" y="126" className="gk2-et">
                                Smak:
                            </text>
                            <text x="281" y="126" textAnchor="end" className="gk2-et">
                                {smak.nazwa.join(" ")}
                            </text>
                            <text x="281" y="139" textAnchor="end" className="gk2-et gk2-et-en">
                                {smak.en}
                            </text>
                            <circle cx="149.5" cy="198.5" r="25.5" style={{ fill: smak.kolor, transition: "fill .35s ease" }} />
                            <text x="19" y="304" className="gk2-et">
                                @gorka.kulka
                            </text>
                            <text x="281" y="304" textAnchor="end" className="gk2-et">
                                450 ml
                            </text>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    )
}

// ---------- Wygląd ----------
const ZIARNO =
    "url('data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(
        "<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.42 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>"
    ).replace(/'/g, "%27") +
    "')"

const AKSAMIT = "#5A0205 0%, #8F070B 16%, #AE0D13 36%, #8B0609 56%, #A20A0F 76%, #790407 91%, #520104 100%"

const CSS_A = [
    "@import url('https://fonts.googleapis.com/css2?family=Fragment+Mono:ital@0;1&display=swap');",
    "@font-face { font-family: 'GK Reglo'; src: url(data:font/woff2;base64," + REGLO + ") format('woff2'); font-weight: 700; font-style: normal; font-display: swap; }",
    ".gk2 { --roz: #F7C2CF; --maslo: #FFE295; --rubin: #9B111E; --tusz: #111111; --krem: #F6F1E7; --noc: #0E0D0C; --m: 4vw; --vh: 1vh;",
    "  position: relative; width: 100%; background: var(--roz); color: var(--tusz);",
    "  font-family: 'Fragment Mono', ui-monospace, Menlo, Consolas, monospace; font-size: 15px; line-height: 1.55;",
    "  -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; overflow-x: clip; }",
    "@supports (height: 100svh) { .gk2 { --vh: 1svh; } }",
    ":where(.gk2) *, :where(.gk2) *::before, :where(.gk2) *::after { box-sizing: border-box; }",
    ":where(.gk2) img, :where(.gk2) video, :where(.gk2) canvas { display: block; max-width: none; }",
    ":where(.gk2) img { user-select: none; -webkit-user-drag: none; }",
    ":where(.gk2) :where(p, h1, h2, h3, figure, ul, ol, dl, dd) { margin: 0; }",
    ":where(.gk2) :where(ul, ol) { list-style: none; padding: 0; }",
    ":where(.gk2) :where(h1, h2, h3) { font-size: inherit; font-weight: inherit; }",
    ":where(.gk2) a { color: inherit; text-decoration: none; }",
    ".gk2 ::selection { background: var(--rubin); color: var(--maslo); }",
    ".gk2-d { font-family: 'GK Reglo', 'Arial Narrow', Arial, sans-serif; font-weight: 700; text-transform: uppercase; line-height: .88; letter-spacing: -0.006em; }",
    ".gk2-e { font-size: 11px; line-height: 1.5; letter-spacing: .07em; text-transform: uppercase; }",
    ".gk2-lead { font-size: 15px; line-height: 1.6; max-width: 34em; }",
    ".gk2-drobny { font-size: 12px; opacity: .7; margin-top: 14px; }",
    ".gk2-h2 { font-size: clamp(52px, 8.4vw, 144px); margin-top: 18px; }",
    ".gk2-h3 { font-size: clamp(34px, 3.8vw, 64px); }",
    ".gk2-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }",
    ".gk2-wyc { position: relative; display: block; overflow: hidden; }",
    ".gk2-wyc img { position: absolute; height: auto; }",
    ".gk2-wiersz { display: flex; justify-content: space-between; gap: 24px; }",
    ".gk2-linie > span { display: block; overflow: hidden; padding: .16em 0 .15em; margin: -.16em 0 -.15em; }",
    ".gk2-linie > span > span { display: block; white-space: nowrap; }",
    ".gk2-js .gk2-linie > span > span { transform: translate3d(0, 150%, 0); transition: transform 1.1s cubic-bezier(.2,.85,.25,1); }",
    ".gk2-js .gk2-linie.gk2-widac > span > span { transform: none; }",
    ".gk2-js .gk2-wjazd { opacity: 0; transform: translate3d(0, 34px, 0); transition: opacity 1s ease, transform 1.1s cubic-bezier(.2,.85,.25,1); }",
    ".gk2-js .gk2-wjazd.gk2-widac { opacity: 1; transform: none; }",

    "/* Ziarno i menu */",
    ".gk2-ziarno { position: sticky; top: 0; height: calc(var(--vh) * 100); margin-bottom: calc(var(--vh) * -100); z-index: 55; pointer-events: none; opacity: .32; background-image: " + ZIARNO + "; background-size: 240px 240px; }",
    ".gk2-nav-kotwica { position: sticky; top: 0; height: 0; z-index: 60; }",
    ".gk2-nav { position: absolute; top: 0; left: 0; right: 0; display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 18px var(--m); font-size: 11px; letter-spacing: .07em; text-transform: uppercase; color: var(--tusz); transition: color .35s ease, transform .5s cubic-bezier(.2,.85,.25,1); }",
    ".gk2-nav-schowana { transform: translate3d(0, -130%, 0); }",
    ".gk2-nav-logo { display: block; width: clamp(126px, 11vw, 168px); transition: filter .35s ease; }",
    ".gk2-nav-linki { display: flex; gap: 30px; }",
    ".gk2-nav-linki a { position: relative; }",
    ".gk2-nav-linki a::after { content: ''; position: absolute; left: 0; right: 0; bottom: -3px; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform .35s ease; }",
    ".gk2-nav-linki a:hover::after { transform: scaleX(1); }",
    ".gk2-nav-prawo { display: flex; gap: 22px; align-items: center; }",
    ".gk2-pigulka { display: inline-flex; align-items: center; gap: 8px; border: 1.5px solid currentColor; border-radius: 999px; padding: 8px 14px; white-space: nowrap; transition: background .25s ease, color .25s ease; }",
    ".gk2-pigulka i { width: 7px; height: 7px; border-radius: 50%; background: var(--rubin); display: block; animation: gk2-puls 2.4s ease-in-out infinite; }",
    ".gk2-nav-ciemna { color: #F2EFE8; }",
    ".gk2-nav-ciemna .gk2-nav-logo { filter: invert(1); }",
    ".gk2-nav-ciemna .gk2-pigulka i { background: var(--roz); }",

    "/* 1. Pierwszy ekran: Szary Dzień przy stoliku */",
    ".gk2-hero { position: relative; height: calc(var(--vh) * 380); background: #D0D0D0; --hs: min(9.2vw, calc(var(--vh) * 16)); --ih: min(calc(var(--vh) * 82 - 1.86 * var(--hs)), 41vw); }",
    ".gk2-scena { position: sticky; top: 0; height: calc(var(--vh) * 100); overflow: hidden; }",
    "@media (hover: hover) { .gk2-js .gk2-scena { cursor: none; } }",
    ".gk2-warstwa { position: absolute; inset: 0; isolation: isolate; }",
    ".gk2-szara { background: #D0D0D0; color: #1D1D1D; }",
    ".gk2-kolor { background: var(--roz); clip-path: circle(0px at 66% 50%); will-change: clip-path; }",
    ".gk2-blok { position: absolute; left: var(--m); top: max(calc(var(--vh) * 13), 84px); z-index: 2; will-change: transform; }",
    ".gk2-napis { font-size: var(--hs); line-height: .93; }",
    ".gk2-napis-l { display: block; white-space: nowrap; }",
    ".gk2-status { margin-top: 20px; max-width: 30em; }",
    ".gk2-status-m { display: none; }",
    ".gk2-ilu { position: absolute; right: 5vw; bottom: calc(var(--vh) * 3); height: var(--ih); aspect-ratio: 952 / 636; pointer-events: none; transform-origin: 50% 100%; will-change: transform; }",
    ".gk2-ilu i { position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: block; background-color: #D0D0D0; background-repeat: no-repeat; background-size: 100% 100%; background-blend-mode: multiply, normal; }",
    ".gk2-kolor .gk2-ilu i { background-color: var(--roz); }",
    ".gk2-ilu i + i { opacity: 0; transition: opacity .32s ease; }",
    ".gk2-ryc { position: absolute; left: var(--m); bottom: calc(var(--vh) * 5); display: grid; gap: 4px; z-index: 2; max-width: calc(95vw - var(--m) - var(--ih) * 1.497 - 16px); }",
    ".gk2-ryc span + span { opacity: .6; }",
    ".gk2-slonce { position: absolute; left: 67vw; top: calc(var(--vh) * 9.5); width: calc(var(--vh) * 27); will-change: transform; }",
    ".gk2-slonce .gk2-wyc { width: 100%; animation: gk2-obrot 90s linear infinite; }",
    ".gk2-kula { position: absolute; left: 0; top: 0; width: 200px; height: 200px; border-radius: 50%; pointer-events: none; opacity: 0; z-index: 4; will-change: transform, opacity;",
    "  box-shadow: inset 0 0 0 1.5px rgba(255,255,255,.8), inset 0 0 26px rgba(255,255,255,.5), inset -12px -16px 36px rgba(155,17,30,.10), 0 18px 46px -20px rgba(60,20,30,.4); }",
    ".gk2-kula::before { content: ''; position: absolute; left: 15%; top: 10%; width: 36%; height: 22%; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,255,255,.8), rgba(255,255,255,0)); transform: rotate(-28deg); }",
    ".gk2-podpis { position: absolute; left: 0; top: 0; white-space: nowrap; pointer-events: none; opacity: 0; transition: opacity .5s ease; will-change: transform; z-index: 4; padding: 7px 12px; border-radius: 999px; background: rgba(255,255,255,.62); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); }",
    ".gk2-tylko-dotyk { display: none; }",
    "@media (hover: none) { .gk2-tylko-mysz { display: none; } .gk2-tylko-dotyk { display: inline; } }",

    "/* 2. Manifest */",
    ".gk2-manifest { position: relative; padding: calc(var(--vh) * 16) var(--m) calc(var(--vh) * 12); background: var(--roz); overflow: clip; }",
    ".gk2-manifest-tekst { margin-top: calc(var(--vh) * 12); font-size: clamp(30px, 4.5vw, 78px); line-height: 1; max-width: 1340px; }",
    ".gk2-slowo { opacity: 1; transition: opacity .2s linear; }",
    ".gk2-js .gk2-slowo { opacity: .13; }",
    ".gk2-slowo-szare { color: #8D8D8D; }",
    ".gk2-slowo-rubin { color: var(--rubin); }",
    ".gk2-plaza { position: relative; margin-top: calc(var(--vh) * 5); height: clamp(190px, 25vw, 400px); pointer-events: none; will-change: transform; }",
    ".gk2-plaza-parasol { position: absolute; right: 19vw; bottom: 3%; width: clamp(150px, 19vw, 310px); transform-origin: 46% 96%; animation: gk2-kolys 7s ease-in-out infinite; }",
    ".gk2-plaza-lezak { position: absolute; right: 1vw; bottom: 0; width: clamp(210px, 27vw, 440px); }",
    ".gk2-plaza-podpis { position: absolute; left: 0; bottom: 8px; }",

    "/* Taśmy 10 YEARS */",
    ".gk2-tasmy { position: relative; height: 0; z-index: 5; }",
    ".gk2-tasma { position: absolute; left: -6vw; right: -6vw; height: var(--th); overflow: hidden; --th: clamp(38px, 5vw, 72px); --tw: calc(var(--th) * 6.109); box-shadow: 0 12px 30px -18px rgba(0,0,0,.5); }",
    ".gk2-tasma-maslo { background: #FDE59F; }",
    ".gk2-tasma-roz { background: #F6C2CF; }",
    ".gk2-tasma div { display: flex; width: max-content; height: 100%; animation: gk2-tasma 17s linear infinite; }",
    ".gk2-tasma i { flex: none; display: block; width: var(--tw); height: 100%; background-repeat: no-repeat; background-size: calc(var(--th) * 15.714) 100%; background-position: calc(var(--th) * -0.6548) 0; }",
    ".gk2-tasma-a { top: calc(var(--th) * -1.25); transform: rotate(-2.4deg); }",
    ".gk2-tasma-b { top: calc(var(--th) * -0.3); transform: rotate(1.8deg); }",
    ".gk2-tasma-b div { animation-direction: reverse; animation-duration: 22s; }",

    "/* 3. Zajrzyj do nas: filmy z kawiarni */",
    ".gk2-kino { position: relative; height: calc(var(--vh) * 290); background: var(--noc); color: #F2EFE8; }",
    ".gk2-kino-scena { position: sticky; top: 0; height: calc(var(--vh) * 100); overflow: hidden; }",
    ".gk2-kino-gora { position: absolute; left: var(--m); right: var(--m); top: 76px; display: flex; justify-content: space-between; gap: 20px; z-index: 6; }",
    ".gk2-kino-rzad { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 3vw; }",
    ".gk2-kino-tytul { font-size: 8.4vw; line-height: 1; color: var(--roz); white-space: nowrap; will-change: transform; }",
    ".gk2-portal { position: relative; overflow: hidden; border-radius: 22px; background: #1B1A18; will-change: transform, clip-path; }",
    ".gk2-portal-1 { flex: none; height: calc(var(--vh) * 78); aspect-ratio: 9 / 16; z-index: 2; margin-top: 30px; }",
    ".gk2-portal-2 { position: absolute; right: 6vw; bottom: calc(var(--vh) * -5); height: calc(var(--vh) * 46); aspect-ratio: 9 / 16; z-index: 3; opacity: 0; box-shadow: 0 40px 80px -30px rgba(0,0,0,.85); }",
    ".gk2-portal-podpis { position: absolute; left: 14px; right: 14px; top: 12px; z-index: 2; color: #fff; text-shadow: 0 1px 10px rgba(0,0,0,.6); }",
    ".gk2-film { position: absolute; inset: 0; }",
    ".gk2-film video, .gk2-film-zdjecia img { position: absolute; left: 0; top: 0; width: 100%; height: 100%; object-fit: cover; }",
    ".gk2-film video { opacity: 0; transition: opacity .7s ease; }",
    ".gk2-film-gra video { opacity: 1; }",
    ".gk2-film-zdjecia img { opacity: 0; animation: gk2-slajd 15s linear infinite; }",
    ".gk2-film-gra .gk2-film-zdjecia { display: none; }",
    ".gk2-graj { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 3; border: 0; border-radius: 999px; padding: 16px 24px; background: var(--roz); color: var(--tusz); font: inherit; font-size: 12px; letter-spacing: .07em; text-transform: uppercase; cursor: pointer; white-space: nowrap; }",
    ".gk2-portal-1::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0) 58%, rgba(0,0,0,.6) 100%); pointer-events: none; z-index: 1; }",
    ".gk2-napisy { position: absolute; left: 9%; right: 9%; bottom: 6%; z-index: 2; text-align: center; font-size: clamp(20px, 2.1vw, 34px); line-height: .96; color: var(--maslo); text-shadow: 0 2px 18px rgba(0,0,0,.55); }",
    ".gk2-kino-meta { position: absolute; left: var(--m); bottom: calc(var(--vh) * 7); display: grid; gap: 2px; z-index: 6; color: #A9A49B; }",
    ".gk2-napis-wej { animation: gk2-napis .5s cubic-bezier(.2,.85,.25,1) both; }",
].join("\n")

const CSS_B = [
    "/* 4. Święta: sklep z wypiekami pod papierem i kokardą */",
    ".gk2-swieta { position: relative; background: var(--krem); }",
    ".gk2-swieta-lep { position: sticky; top: 0; min-height: calc(var(--vh) * 100); overflow: hidden; }",
    ".gk2-swieta-droga { display: none; height: calc(var(--vh) * 230); }",
    ".gk2-js .gk2-swieta-droga { display: block; }",
    ".gk2-sklep { position: relative; min-height: calc(var(--vh) * 100); padding: 92px var(--m) calc(var(--vh) * 6); display: grid; grid-template-columns: .8fr 1.5fr; gap: 4.5vw; align-items: center; }",
    ".gk2-h2-sklep { font-size: clamp(46px, 7vw, 124px); }",
    ".gk2-sklep .gk2-lead { margin-top: 24px; }",
    ".gk2-fakty { margin: 26px 0 30px; border-top: 1.5px solid var(--tusz); font-size: 12px; line-height: 1.5; letter-spacing: .05em; text-transform: uppercase; }",
    ".gk2-fakty div { display: grid; grid-template-columns: 9em 1fr; gap: 12px; padding: 11px 0; border-bottom: 1.5px solid var(--tusz); }",
    ".gk2-fakty dt { opacity: .6; }",
    ".gk2-fakty dd span { display: block; }",
    ".gk2-wypieki { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.8vw; align-items: start; }",
    ".gk2-wypiek { display: grid; gap: 8px; align-content: start; }",
    ".gk2-wypiek-foto { position: relative; display: block; aspect-ratio: 1 / 1.14; border-radius: 22px; background-color: #FDFBF6; overflow: hidden; transition: background-color .35s ease; }",
    ".gk2-wypiek-foto i { position: absolute; left: -12%; top: -6.5%; width: 124%; aspect-ratio: 1; display: block; background-color: #FDFBF6; background-repeat: no-repeat; background-size: 100% 100%; background-blend-mode: multiply; transition: background-color .35s ease, transform .6s cubic-bezier(.2,.85,.25,1); }",
    "@media (hover: hover) { .gk2-wypiek:hover .gk2-wypiek-foto, .gk2-wypiek:hover .gk2-wypiek-foto i { background-color: var(--roz); } .gk2-wypiek:hover .gk2-wypiek-foto i { transform: scale(1.07) rotate(-2deg); } }",
    ".gk2-wypiek-nr { margin-top: 8px; display: flex; align-items: center; gap: 8px; }",
    ".gk2-wypiek-nr::before { content: ''; flex: none; width: 7px; height: 7px; border-radius: 50%; background: var(--rubin); }",
    ".gk2-wypiek-nazwa { font-size: clamp(24px, 2.7vw, 46px); line-height: .92; }",
    ".gk2-wypiek-opis { font-size: 13px; line-height: 1.5; opacity: .82; }",
    ".gk2-wypiek-link { margin-top: 4px; color: var(--rubin); }",
    ".gk2-js .gk2-s { opacity: 0; transform: translate3d(0, 28px, 0); transition: opacity .7s ease, transform .9s cubic-bezier(.2,.85,.25,1); transition-delay: calc(var(--i, 0) * 80ms); }",
    ".gk2-js .gk2-swieta-otwarte .gk2-s { opacity: 1; transform: none; }",
    ".gk2-js .gk2-swieta-otwarte .gk2-linie > span > span { transform: none; }",

    "/* Opakowanie: papier w cztery strony, aksamitna wstążka, kokarda */",
    ".gk2-opak { display: none; position: absolute; left: 0; top: 0; width: 100%; height: calc(var(--vh) * 100); overflow: hidden; z-index: 5; pointer-events: none;",
    "  --sw: 100vw; --sh: calc(var(--vh) * 100); --kx: calc(var(--sw) * .7); --ky: calc(var(--sh) * .58); --kw: min(calc(var(--sh) * .5), calc(var(--sw) * .34)); --pas: calc(var(--kw) * .19); }",
    ".gk2-js .gk2-opak { display: block; }",
    ".gk2-cw { position: absolute; overflow: hidden; z-index: 2; pointer-events: auto; will-change: transform; box-shadow: 0 0 70px rgba(90,30,45, calc(.32 * var(--cien, 0))); }",
    ".gk2-cw-a { left: 0; top: 0; width: calc(var(--kx) + 1px); height: calc(var(--ky) + 1px); }",
    ".gk2-cw-b { left: var(--kx); right: 0; top: 0; height: calc(var(--ky) + 1px); }",
    ".gk2-cw-c { left: 0; top: var(--ky); width: calc(var(--kx) + 1px); bottom: 0; }",
    ".gk2-cw-d { left: var(--kx); right: 0; top: var(--ky); bottom: 0; }",
    ".gk2-papier { position: absolute; left: 0; top: 0; width: var(--sw); height: var(--sh); color: var(--tusz); background-color: var(--roz);",
    "  background-image: radial-gradient(circle, rgba(255,255,255,.36) 0 4.5px, rgba(255,255,255,0) 5.5px), radial-gradient(circle, rgba(255,255,255,.36) 0 4.5px, rgba(255,255,255,0) 5.5px); background-size: 56px 56px; background-position: 0 0, 28px 28px; }",
    ".gk2-cw-b .gk2-papier { left: calc(var(--kx) * -1); }",
    ".gk2-cw-c .gk2-papier { top: calc(var(--ky) * -1); }",
    ".gk2-cw-d .gk2-papier { left: calc(var(--kx) * -1); top: calc(var(--ky) * -1); }",
    ".gk2-papier-gora { position: absolute; left: var(--m); right: var(--m); top: min(92px, calc(var(--sh) * .1)); display: flex; justify-content: space-between; gap: 20px; }",
    ".gk2-papier-napis { position: absolute; left: var(--m); top: calc(var(--sh) * .17); font-size: min(clamp(56px, 10.4vw, 190px), calc(var(--sh) * .158)); line-height: 1.02; }",
    ".gk2-papier-napis span { display: block; white-space: nowrap; }",
    ".gk2-papier-dol { position: absolute; left: var(--m); bottom: calc(var(--sh) * .07); max-width: 24em; }",
    ".gk2-pas { position: absolute; display: block; z-index: 4; will-change: transform; box-shadow: 0 10px 26px -10px rgba(70,10,20,.55); }",
    ".gk2-pas-h { top: calc(var(--ky) - var(--pas) / 2); height: var(--pas); background: " + ZIARNO + " 0 0 / 200px 200px, linear-gradient(180deg, " + AKSAMIT + "); }",
    ".gk2-pas-hl { left: -3vw; width: calc(var(--kx) + 3vw); }",
    ".gk2-pas-hp { left: var(--kx); right: -3vw; }",
    ".gk2-pas-v { left: calc(var(--kx) - var(--pas) / 2); width: var(--pas); background: " + ZIARNO + " 0 0 / 200px 200px, linear-gradient(90deg, " + AKSAMIT + "); }",
    ".gk2-pas-vg { top: -3vh; height: calc(var(--ky) + 3vh); }",
    ".gk2-pas-vd { top: var(--ky); bottom: -3vh; }",
    ".gk2-kok-cien { position: absolute; left: var(--kx); top: var(--ky); width: calc(var(--kw) * 1.16); height: calc(var(--kw) * .96); margin: calc(var(--kw) * -.2) 0 0 calc(var(--kw) * -.58); background: radial-gradient(closest-side, rgba(80,8,22,.38), rgba(80,8,22,0)); z-index: 5; pointer-events: none; }",
    ".gk2-kok { position: absolute; left: var(--kx); top: var(--ky); width: var(--kw); aspect-ratio: 1000 / 941; margin: calc(var(--kw) * -.2654) 0 0 calc(var(--kw) * -.497); z-index: 6; pointer-events: none; transform-origin: 49.7% 28.2%; animation: gk2-kokarda 6s ease-in-out infinite; }",
    ".gk2-kok-cz { position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: block; background: url(" + KOKARDA + ") 0 0 / 100% 100% no-repeat; will-change: transform; }",
    ".gk2-kok-petla-l { transform-origin: 41.5% 28%; }",
    ".gk2-kok-petla-p { transform-origin: 58.5% 28%; }",
    ".gk2-kok-ogon { transform-origin: 49.7% 33%; }",
    ".gk2-kok-wezel { transform-origin: 49.7% 28.2%; }",

    "/* 5. Wigilie firmowe */",
    ".gk2-firmy { position: relative; background: var(--maslo); padding: calc(var(--vh) * 18) var(--m) calc(var(--vh) * 16); display: grid; grid-template-columns: 1.08fr .92fr; grid-template-areas: 'glowa foto' 'tresc foto'; column-gap: 6vw; align-items: start; overflow: clip; }",
    ".gk2-firmy-glowa { grid-area: glowa; }",
    ".gk2-firmy-tresc { grid-area: tresc; }",
    ".gk2-firmy-tresc .gk2-lead { margin-top: 30px; }",
    ".gk2-firmy-foto { grid-area: foto; align-self: center; justify-self: end; position: relative; width: min(100%, 560px); }",
    ".gk2-firmy-okno { border-radius: 24px; overflow: hidden; aspect-ratio: 4 / 5; background: #E9CF86; }",
    ".gk2-firmy-okno img { width: 100%; height: 116%; object-fit: cover; object-position: 57% 50%; will-change: transform; }",
    ".gk2-firmy-kokarda { position: absolute; display: block; left: -9%; top: -8%; width: 36%; aspect-ratio: 1000 / 941; background: url(" + KOKARDA + ") 0 0 / 100% 100% no-repeat; transform: rotate(-13deg); filter: drop-shadow(0 12px 14px rgba(70,10,20,.32)); pointer-events: none; }",
    ".gk2-firmy-foto figcaption { margin-top: 14px; }",
    ".gk2-trojka { margin-top: 34px; display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1.5px solid var(--tusz); border-bottom: 1.5px solid var(--tusz); max-width: 760px; }",
    ".gk2-trojka li { padding: 18px 16px 18px 0; display: grid; gap: 8px; align-content: start; font-size: 12px; line-height: 1.5; }",
    ".gk2-trojka li + li { padding-left: 16px; border-left: 1.5px solid var(--tusz); }",
    ".gk2-trojka b { font-size: clamp(26px, 2.6vw, 44px); line-height: .92; }",
    ".gk2-zapytanie { margin-top: 34px; display: grid; grid-template-columns: 1fr 1fr; gap: 18px 24px; max-width: 760px; }",
    ".gk2-pole { display: grid; gap: 4px; }",
    ".gk2-pole input { width: 100%; min-width: 0; min-height: 46px; background: transparent; border: 0; border-bottom: 1.5px solid var(--tusz); border-radius: 0; color: var(--tusz); padding: 10px 2px 12px; font: inherit; font-size: 16px; outline: none; transition: border-color .25s ease; }",
    ".gk2-pole input:focus { border-bottom-color: var(--rubin); }",
    ".gk2-pole input::placeholder { color: rgba(17,17,17,.42); }",
    ".gk2-zapytanie-dol { grid-column: 1 / -1; display: flex; flex-wrap: wrap; align-items: center; gap: 12px 20px; margin-top: 8px; }",
    ".gk2-zapytanie-dol .gk2-drobny { margin-top: 0; }",
    ".gk2-zapytanie-dzieki { margin-top: 34px; max-width: 760px; }",

    "/* 6. Smaki */",
    ".gk2-smaki { position: relative; height: calc(var(--vh) * 100 + var(--n, 6) * var(--vh) * 64); background: #F3ECDC; }",
    ".gk2-smaki-scena { position: sticky; top: 0; height: calc(var(--vh) * 100); overflow: hidden; }",
    ".gk2-smak { position: absolute; inset: 0; display: grid; grid-template-columns: 1.2fr .8fr; align-items: center; gap: 3vw; padding: 0 calc(var(--m) + 3vw) 0 var(--m); will-change: clip-path; }",
    ".gk2-js .gk2-smak + .gk2-smak { clip-path: circle(0px at 74% 50%); }",
    ".gk2-smak-tekst { position: relative; z-index: 2; will-change: transform; }",
    ".gk2-smak-nazwa { font-size: clamp(58px, 9vw, 152px); margin: 20px 0 28px; }",
    ".gk2-smak-nazwa span { display: block; white-space: nowrap; }",
    ".gk2-smak .gk2-lead { font-size: clamp(15px, 1.3vw, 20px); }",
    ".gk2-smak-stopka { margin-top: 34px; opacity: .75; max-width: 36em; }",
    ".gk2-gala { justify-self: center; width: min(calc(var(--vh) * 64), 34vw); aspect-ratio: 1137 / 1146; will-change: transform;",
    "  -webkit-mask-image: url(" + KROPKA + "); -webkit-mask-size: contain; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;",
    "  mask-image: url(" + KROPKA + "); mask-size: contain; mask-repeat: no-repeat; mask-position: center; }",
    ".gk2-rozek { --rh: min(calc(var(--vh) * 76), 47vw); position: absolute; left: 75.8%; top: 50%; height: var(--rh); aspect-ratio: 0.4908; margin: calc(var(--rh) * -.5) 0 0 calc(var(--rh) * -.2454); transform-origin: 50% 55%; will-change: transform; pointer-events: none; z-index: 15; }",
    ".gk2-rozek .gk2-wyc, .gk2-rozek canvas, .gk2-balony canvas { position: absolute; left: 0; top: 0; width: 100%; height: 100%; }",
    ".gk2-rozek canvas, .gk2-balony canvas { opacity: 0; transition: opacity .5s ease; }",
    ".gk2-chrom-1 .gk2-rozek canvas, .gk2-chrom-2 .gk2-balony canvas { opacity: 1; }",
    ".gk2-chrom-1 .gk2-rozek .gk2-wyc, .gk2-chrom-2 .gk2-balony .gk2-wyc { visibility: hidden; }",
    ".gk2-smaki-kropki { position: absolute; right: var(--m); top: 50%; transform: translateY(-50%); z-index: 20; display: grid; gap: 10px; color: var(--tusz); transition: color .4s ease; }",
    ".gk2-smaki-kropki li { width: 9px; height: 9px; border-radius: 50%; border: 1.5px solid currentColor; transition: background .3s ease, transform .3s ease; }",
    ".gk2-smaki-kropki li.gk2-on { background: currentColor; transform: scale(1.35); }",

    "/* 7. Kubek */",
    ".gk2-kubek { position: relative; background: var(--krem); padding: calc(var(--vh) * 16) var(--m); display: grid; grid-template-columns: 1fr 1fr; gap: 4vw; align-items: center; }",
    ".gk2-kubek-tekst .gk2-lead { margin-top: 28px; }",
    ".gk2-kubek-foto { position: relative; justify-self: center; width: min(calc(var(--vh) * 62), 36vw, 600px); aspect-ratio: 630 / 668; perspective: 1400px; }",
    ".gk2-kubek-cien { position: absolute; left: 6%; right: 6%; bottom: -4%; height: 13%; background: radial-gradient(closest-side, rgba(70,45,30,.32), rgba(70,45,30,0)); }",
    ".gk2-kubek-tilt { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; will-change: transform; }",
    ".gk2-kubek-obraz { position: relative; width: 100%; height: 100%; animation: gk2-unoszenie 6s ease-in-out infinite; }",
    ".gk2-kubek-obraz img { width: 100%; height: 100%; }",
    ".gk2-etykieta { position: absolute; left: 25.4%; top: 25.75%; width: 46.67%; height: 58.68%; overflow: visible; }",
    ".gk2-et { font-family: 'Fragment Mono', ui-monospace, Menlo, Consolas, monospace; font-size: 9.4px; letter-spacing: 0; fill: #111111; }",
    ".gk2-et-en { font-style: italic; }",
    ".gk2-wybor { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin: 34px 0 30px; }",
    ".gk2-wybor button { width: 36px; height: 36px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; box-shadow: inset 0 0 0 1.5px rgba(17,17,17,.16); transition: box-shadow .25s ease, transform .25s ease; }",
    ".gk2-wybor button:hover { transform: scale(1.08); }",
    ".gk2-wybor button[aria-pressed='true'] { box-shadow: 0 0 0 3px var(--krem), 0 0 0 5px var(--tusz); }",
    ".gk2-wybor-nazwa { margin-left: 8px; }",
    ".gk2-przycisk { display: inline-flex; align-items: center; justify-content: center; gap: 10px; border: 0; border-radius: 999px; padding: 18px 28px; background: var(--tusz); color: var(--maslo);",
    "  font-family: 'Fragment Mono', ui-monospace, monospace; font-size: 12px; letter-spacing: .07em; text-transform: uppercase; cursor: pointer; transition: background .25s ease, color .25s ease; white-space: nowrap; }",
    ".gk2-przycisk:hover { background: var(--rubin); }",
    ".gk2-przycisk-roz { background: var(--roz); color: var(--tusz); }",
    ".gk2-przycisk-roz:hover { background: var(--maslo); }",

    "/* 8. Najszarszy Dzień */",
    ".gk2-noc { position: relative; background: var(--noc); color: #EDEAE4; padding: calc(var(--vh) * 20) var(--m) calc(var(--vh) * 18); display: grid; grid-template-columns: 1.15fr .85fr; gap: 4vw; align-items: center; overflow: clip; }",
    ".gk2-data { font-size: clamp(130px, 21vw, 380px); line-height: .78; letter-spacing: -0.02em; color: var(--roz); margin-top: calc(.1em + 26px); }",
    ".gk2-h2-szary { color: #8E8E8E; }",
    ".gk2-noc .gk2-lead { margin-top: 30px; color: #CFCBC4; }",
    ".gk2-odliczanie { font-size: clamp(30px, 3.4vw, 56px); line-height: 1; display: flex; flex-wrap: wrap; gap: .35em .6em; margin: calc(var(--vh) * 7) 0 calc(var(--vh) * 6); }",
    ".gk2-odliczanie small { font-family: 'Fragment Mono', ui-monospace, monospace; font-weight: 400; font-size: 11px; letter-spacing: .07em; color: #8E8E8E; margin-left: .45em; vertical-align: .9em; }",
    ".gk2-balony { position: relative; justify-self: center; width: min(100%, calc(var(--vh) * 74)); aspect-ratio: 1.019; will-change: transform; }",
    ".gk2-balony .gk2-wyc { width: 100%; }",
    ".gk2-zapis { display: grid; gap: 14px; max-width: 600px; }",
    ".gk2-zapis-wiersz { display: flex; gap: 12px; align-items: center; }",
    ".gk2-zapis input[type='email'] { flex: 1; min-width: 0; background: transparent; border: 0; border-bottom: 1.5px solid #5B5B5B; border-radius: 0; color: #EDEAE4; padding: 15px 2px; font: inherit; font-size: 16px; outline: none; transition: border-color .25s ease; }",
    ".gk2-zapis input[type='email']:focus { border-bottom-color: var(--roz); }",
    ".gk2-zapis input[type='email']::placeholder { color: #6F6F6F; }",
    ".gk2-zgoda { display: flex; gap: 10px; align-items: flex-start; font-size: 12px; line-height: 1.5; color: #AFABA5; cursor: pointer; }",
    ".gk2-zgoda input { margin-top: 3px; accent-color: #F7C2CF; }",
    ".gk2-zapis-dzieki { font-size: clamp(26px, 2.6vw, 42px); line-height: 1; color: var(--roz); }",

    "/* 9. Lokale */",
    ".gk2-lokale { position: relative; background: var(--roz); padding: calc(var(--vh) * 20) var(--m) 0; overflow: clip; }",
    ".gk2-lokale-gora { display: grid; grid-template-columns: 1.15fr .85fr; gap: 4vw; align-items: end; }",
    ".gk2-luk { justify-self: end; width: min(100%, 470px); }",
    ".gk2-luk-okno { border-radius: 999px 999px 0 0; overflow: hidden; aspect-ratio: 4 / 5; background: #E9B5C3; }",
    ".gk2-luk-okno img { width: 100%; height: 115%; object-fit: cover; will-change: transform; }",
    ".gk2-luk figcaption { margin-top: 14px; }",
    ".gk2-lista { margin-top: calc(var(--vh) * 9); border-top: 1.5px solid var(--tusz); }",
    ".gk2-lista li { display: grid; grid-template-columns: 1.4fr 1fr 1fr auto; gap: 2vw; align-items: baseline; padding: 24px 0; border-bottom: 1.5px solid var(--tusz); font-size: 12px; letter-spacing: .05em; text-transform: uppercase; }",
    ".gk2-lista-nazwa { font-size: clamp(26px, 2.8vw, 46px); line-height: 1; }",
    ".gk2-glosuj { margin-top: calc(var(--vh) * 13); display: grid; grid-template-columns: 1fr 1fr; gap: 4vw; align-items: start; }",
    ".gk2-glosuj .gk2-lead { margin-top: 18px; }",
    ".gk2-miasta { display: flex; flex-wrap: wrap; gap: 10px; }",
    ".gk2-miasto { border: 1.5px solid var(--tusz); border-radius: 999px; padding: 13px 20px; background: transparent; color: var(--tusz); font-family: 'Fragment Mono', ui-monospace, monospace; font-size: 12px; letter-spacing: .07em; text-transform: uppercase; cursor: pointer; transition: background .25s ease, color .25s ease; }",
    ".gk2-miasto:hover { background: rgba(17,17,17,.07); }",
    ".gk2-miasto[aria-pressed='true'] { background: var(--tusz); color: var(--maslo); }",
    ".gk2-miasto-inne { border-style: dashed; }",
    ".gk2-deptak { position: relative; height: clamp(170px, 21vw, 320px); margin-top: calc(var(--vh) * 7); }",
    ".gk2-para { position: absolute; left: 0; bottom: 0; height: 100%; transform-origin: 50% 100%; will-change: transform; z-index: 2; }",
    ".gk2-para .gk2-wyc { height: 100%; }",
    ".gk2-deptak-napis { position: absolute; right: 0; bottom: 18px; }",

    "/* 10. Stopka */",
    ".gk2-tasmy-dol .gk2-tasma-a { top: calc(var(--th) * -0.9); }",
    ".gk2-tasmy-dol .gk2-tasma-b { top: calc(var(--th) * -0.1); }",
    ".gk2-stopka { position: relative; background: var(--maslo); padding: calc(var(--vh) * 22) var(--m) 84px; overflow: clip; }",
    ".gk2-stopka-logo { width: 100%; }",
    ".gk2-stopka-dzieci { display: flex; align-items: flex-end; gap: 16px; margin-bottom: calc(var(--vh) * 5); }",
    ".gk2-stopka-dzieci .gk2-wyc { width: clamp(84px, 9vw, 150px); animation: gk2-unoszenie 6s ease-in-out infinite; }",
    ".gk2-stopka-dzieci .gk2-e { padding-bottom: 6px; }",
    ".gk2-stopka-wiersz { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px 28px; margin-top: calc(var(--vh) * 6); }",

    "@keyframes gk2-unoszenie { 0%, 100% { transform: translate3d(0, 0, 0); } 50% { transform: translate3d(0, -14px, 0); } }",
    "@keyframes gk2-obrot { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }",
    "@keyframes gk2-kolys { 0%, 100% { transform: rotate(-1.6deg); } 50% { transform: rotate(1.8deg); } }",
    "@keyframes gk2-kokarda { 0%, 100% { transform: rotate(-1.1deg); } 50% { transform: rotate(1.1deg); } }",
    "@keyframes gk2-puls { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }",
    "@keyframes gk2-tasma { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(calc(var(--tw) * -1), 0, 0); } }",
    "@keyframes gk2-napis { from { opacity: 0; transform: translate3d(0, 12px, 0); } to { opacity: 1; transform: none; } }",
    "@keyframes gk2-slajd { 0% { opacity: 0; transform: scale(1.02); } 5% { opacity: 1; } 33% { opacity: 1; } 40% { opacity: 0; transform: scale(1.14); } 100% { opacity: 0; transform: scale(1.14); } }",

    "/* Telefon */",
    "@media (max-width: 809px), (max-aspect-ratio: 21/20) {",
    "  .gk2 { --m: 5vw; font-size: 14px; }",
    "  .gk2-nav { padding: 14px var(--m); }",
    "  .gk2-nav-linki, .gk2-nav-jezyk { display: none; }",
    "  .gk2-hero { height: calc(var(--vh) * 340); --hs: min(20vw, calc(var(--vh) * 9.2)); --iw: min(104vw, calc((var(--vh) * 77.5 - 4.12 * var(--hs)) * 1.497)); }",
    "  .gk2-blok { top: max(calc(var(--vh) * 11.5), 90px); }",
    "  .gk2-napis { line-height: 1.03; }",
    "  .gk2-napis-l span { display: block; }",
    "  .gk2-status { display: none; }",
    "  .gk2-status-m { display: block; position: absolute; left: var(--m); right: var(--m); top: 58px; z-index: 2; }",
    "  .gk2-ilu { right: auto; left: 50%; width: var(--iw); height: auto; margin-left: calc(var(--iw) / -2); bottom: calc(var(--vh) * 9); }",
    "  .gk2-ryc { bottom: calc(var(--vh) * 3.4); max-width: none; }",
    "  .gk2-ryc span + span { display: none; }",
    "  .gk2-slonce { left: 67vw; top: calc(var(--vh) * 11.5 + var(--hs) * .05); width: 28vw; }",
    "  .gk2-wiersz { flex-direction: column; gap: 4px; }",
    "  .gk2-manifest { padding: calc(var(--vh) * 13) var(--m) calc(var(--vh) * 12); }",
    "  .gk2-manifest-tekst { margin-top: calc(var(--vh) * 7); font-size: 8.3vw; line-height: 1.02; }",
    "  .gk2-plaza { height: 46vw; margin-top: calc(var(--vh) * 6); }",
    "  .gk2-plaza-parasol { right: 36vw; width: 34vw; }",
    "  .gk2-plaza-lezak { width: 50vw; }",
    "  .gk2-plaza-podpis { bottom: auto; top: -8px; }",
    "  .gk2-h2 { font-size: 15vw; }",
    "  .gk2-kino { height: calc(var(--vh) * 260); }",
    "  .gk2-kino-gora { top: 62px; }",
    "  .gk2-kino-seans { display: none; }",
    "  .gk2-kino-rzad { display: block; }",
    "  .gk2-kino-tytul { position: absolute; left: var(--m); top: 96px; font-size: 21vw; line-height: .88; z-index: 5; color: var(--maslo); text-shadow: 0 2px 30px rgba(0,0,0,.35); }",
    "  .gk2-kino-tytul + .gk2-portal + .gk2-kino-tytul { top: calc(96px + 18.5vw); }",
    "  .gk2-portal-1 { position: absolute; left: 0; top: 0; width: 100%; height: 100%; aspect-ratio: auto; border-radius: 0; margin-top: 0; }",
    "  .gk2-portal-1::after { background: linear-gradient(to bottom, rgba(0,0,0,.5) 0%, rgba(0,0,0,0) 34%, rgba(0,0,0,0) 60%, rgba(0,0,0,.66) 100%); }",
    "  .gk2-portal-2 { right: 4vw; bottom: calc(var(--vh) * 5); height: auto; width: 40vw; border-radius: 14px; }",
    "  .gk2-portal-podpis { font-size: 9px; left: 9px; right: 9px; top: 8px; }",
    "  .gk2-napisy { left: var(--m); right: 48vw; bottom: calc(var(--vh) * 6); text-align: left; font-size: 7.2vw; }",
    "  .gk2-kino-meta { display: none; }",
    "  .gk2-sklep { display: flex; flex-direction: column; align-items: stretch; gap: 0; padding: 66px var(--m) calc(var(--vh) * 5); }",
    "  .gk2-sklep-tekst { display: contents; }",
    "  .gk2-sklep-tekst > .gk2-e { order: 1; }",
    "  .gk2-h2-sklep { order: 2; font-size: 14.6vw; margin-top: 12px; }",
    "  .gk2-sklep .gk2-lead { order: 3; margin-top: 12px; }",
    "  .gk2-wypieki { order: 4; margin-top: 18px; grid-template-columns: minmax(0, 1fr); gap: 12px; }",
    "  .gk2-fakty { order: 5; margin: 18px 0 0; font-size: 11px; }",
    "  .gk2-fakty div { grid-template-columns: 7.2em 1fr; padding: 8px 0; }",
    "  .gk2-sklep-tekst > .gk2-przycisk { order: 6; margin-top: 18px; align-self: flex-start; }",
    "  .gk2-wypiek { grid-template-columns: 26vw minmax(0, 1fr); column-gap: 14px; row-gap: 3px; align-items: start; }",
    "  .gk2-wypiek-foto { grid-row: 1 / span 4; border-radius: 14px; }",
    "  .gk2-wypiek-nr { margin-top: 2px; }",
    "  .gk2-wypiek-nazwa { font-size: 7.2vw; }",
    "  .gk2-wypiek-opis { font-size: 12px; line-height: 1.42; }",
    "  .gk2-wypiek-link { margin-top: 2px; }",
    "  .gk2-opak { --kx: calc(var(--sw) * .5); --ky: calc(var(--sh) * .6); --kw: calc(var(--sw) * .66); }",
    "  .gk2-pas-v { display: none; }",
    "  .gk2-papier-gora { top: 64px; }",
    "  .gk2-papier-gora span + span { display: none; }",
    "  .gk2-papier-napis { top: calc(var(--sh) * .14); font-size: 18.6vw; }",
    "  .gk2-papier-dol { bottom: calc(var(--sh) * .045); }",
    "  .gk2-firmy { grid-template-columns: minmax(0, 1fr); grid-template-areas: 'glowa' 'foto' 'tresc'; padding: calc(var(--vh) * 13) var(--m); }",
    "  .gk2-firmy-foto { justify-self: center; width: 78vw; margin: 14vw 0 10px; }",
    "  .gk2-firmy-tresc .gk2-lead { margin-top: 22px; }",
    "  .gk2-trojka { grid-template-columns: minmax(0, 1fr); margin-top: 26px; }",
    "  .gk2-trojka li { padding: 14px 0; gap: 6px; }",
    "  .gk2-trojka li + li { padding-left: 0; border-left: 0; border-top: 1.5px solid var(--tusz); }",
    "  .gk2-trojka b { font-size: 8vw; }",
    "  .gk2-zapytanie { grid-template-columns: minmax(0, 1fr); margin-top: 28px; }",
    "  .gk2-smak { grid-template-columns: 1fr; grid-template-rows: auto auto; align-content: start; gap: calc(var(--vh) * 3); padding: calc(var(--vh) * 12) var(--m) 0; }",
    "  .gk2-js .gk2-smak + .gk2-smak { clip-path: circle(0px at 50% 30%); }",
    "  .gk2-gala { order: -1; width: min(66vw, calc(var(--vh) * 36)); }",
    "  .gk2-rozek { --rh: calc(var(--vh) * 35); left: 50%; top: 28%; }",
    "  .gk2-smak-nazwa { font-size: 14.4vw; margin: 14px 0 18px; }",
    "  .gk2-smak-stopka { margin-top: 20px; }",
    "  .gk2-smaki-kropki { right: 3.2vw; }",
    "  .gk2-kubek { grid-template-columns: 1fr; padding: calc(var(--vh) * 13) var(--m); }",
    "  .gk2-kubek-foto { order: -1; width: 74vw; }",
    "  .gk2-noc { grid-template-columns: 1fr; padding: calc(var(--vh) * 14) var(--m); }",
    "  .gk2-data { font-size: 36vw; }",
    "  .gk2-balony { order: -1; width: 86vw; }",
    "  .gk2-zapis-wiersz { flex-direction: column; align-items: stretch; }",
    "  .gk2-lokale { padding-top: calc(var(--vh) * 14); }",
    "  .gk2-lokale-gora { grid-template-columns: 1fr; gap: 34px; }",
    "  .gk2-luk { justify-self: start; width: 72vw; }",
    "  .gk2-lista li { grid-template-columns: 1fr; gap: 6px; }",
    "  .gk2-lista-strzalka { display: none; }",
    "  .gk2-glosuj { grid-template-columns: 1fr; gap: 30px; }",
    "  .gk2-deptak { height: 46vw; }",
    "  .gk2-deptak-napis { right: auto; left: 0; bottom: 12px; }",
    "  .gk2-stopka { padding-top: calc(var(--vh) * 15); }",
    "}",
    "@media (prefers-reduced-motion: reduce) {",
    "  .gk2 *, .gk2 *::before, .gk2 *::after { animation: none !important; transition: none !important; }",
    "  .gk2-js .gk2-wjazd, .gk2-js .gk2-linie > span > span, .gk2-js .gk2-s { opacity: 1 !important; transform: none !important; }",
    "  .gk2-js .gk2-opak, .gk2-js .gk2-swieta-droga { display: none !important; }",
    "  .gk2-film-zdjecia img:first-child { opacity: 1; }",
    "  .gk2-js .gk2-hero, .gk2-js .gk2-kino { height: calc(var(--vh) * 100); }",
    "}",
].join("\n")

const CSS = CSS_A + "\n" + CSS_B

// Silnik ruchu: jedna pętla, która czyta przewinięcie i kursor. Zwraca funkcję sprzątającą.
function silnik(root: HTMLDivElement, el: Record<string, any>, slowa: { current: Array<HTMLSpanElement | null> }) {
    root.classList.add("gk2-js")
    const mm = (q: string) => (window.matchMedia ? window.matchMedia(q).matches : false)
    const reduce = mm("(prefers-reduced-motion: reduce)")
    const dotyk = mm("(hover: none)")
    const s = {
        t0: performance.now(),
        mx: -1,
        my: -1,
        lx: 0,
        ly: 0,
        tx: 0,
        ty: 0,
        x: -1,
        y: -1,
        aktywny: false,
        ostatni: 0,
        droga: 0,
        kx: 0,
        ky: 0,
        ktx: 0,
        kty: 0,
        nav: "",
        ostY: window.scrollY,
        schowana: false,
        nap1: -1,
        nap2: -1,
        klatka: -1,
        swieta: -1,
        otwarte: false,
        smak: -1,
    }
    const geo = { vw: 0, vh: 0, il: 0, it: 0, iw: 0, ih: 0, pw: 150, p1w: 0, p1h: 0, dpr: 1 }
    const wygl: Record<string, number> = {}
    const gladko = (k: string, cel: number) => {
        if (dotyk || reduce || wygl[k] === undefined) wygl[k] = cel
        else wygl[k] += (cel - wygl[k]) * 0.16
        return wygl[k]
    }
    const kolA = [0, 0, 0]
    const kolB = [0, 0, 0]

    const ustawPlotno = (c: HTMLCanvasElement | null) => {
        if (!c) return
        const w = Math.max(2, Math.round(c.clientWidth * geo.dpr))
        const h = Math.max(2, Math.round(c.clientHeight * geo.dpr))
        if (c.width !== w || c.height !== h) {
            c.width = w
            c.height = h
        }
    }
    const mierz = () => {
        geo.vw = window.innerWidth
        geo.vh = window.innerHeight
        geo.dpr = Math.min(window.devicePixelRatio || 1, 2)
        if (el.ilu) {
            geo.il = el.ilu.offsetLeft
            geo.it = el.ilu.offsetTop
            geo.iw = el.ilu.offsetWidth
            geo.ih = el.ilu.offsetHeight
        }
        if (el.podpis) geo.pw = el.podpis.offsetWidth || 150
        if (el.portal1) {
            geo.p1w = el.portal1.offsetWidth
            geo.p1h = el.portal1.offsetHeight
        }
        // Opakowanie liczy się od prawdziwej szerokości sceny (bez paska przewijania).
        if (el.opak) {
            el.opak.style.setProperty("--sw", el.opak.clientWidth + "px")
            el.opak.style.setProperty("--sh", el.opak.clientHeight + "px")
        }
        // Chromowy rożek stoi dokładnie na środku kropki smaku.
        if (el.rozek && el.gala0) {
            el.rozek.style.left = (el.gala0.offsetLeft + el.gala0.offsetWidth / 2).toFixed(1) + "px"
            el.rozek.style.top = (el.gala0.offsetTop + el.gala0.offsetHeight / 2).toFixed(1) + "px"
        }
        ustawPlotno(el.plotnoRozek)
        ustawPlotno(el.plotnoBalony)
        s.swieta = -1
    }
    mierz()
    let szer0 = window.innerWidth
    let czekaResize = 0
    const poResize = () => {
        // Na telefonie pasek adresu zmienia wysokość okna przy przewijaniu; wtedy niczego nie przeliczamy.
        if (dotyk && window.innerWidth === szer0) return
        szer0 = window.innerWidth
        cancelAnimationFrame(czekaResize)
        czekaResize = requestAnimationFrame(mierz)
    }
    window.addEventListener("resize", poResize)
    const poCzasie = window.setTimeout(mierz, 1200)
    if ((document as any).fonts && (document as any).fonts.ready) (document as any).fonts.ready.then(mierz).catch(() => {})

    // Żywy chrom
    let chromRozek: Chrom | null = null
    let chromBalony: Chrom | null = null
    if (!reduce) {
        const duzy = geo.vh * geo.dpr > 1150
        if (el.plotnoRozek) chromRozek = stworzChrom(el.plotnoRozek, obraz(P.rozek.f, duzy ? 2048 : 1024), P.rozek.b, () => root.classList.add("gk2-chrom-1"))
        if (el.plotnoBalony) chromBalony = stworzChrom(el.plotnoBalony, obraz(P.balony.f, duzy ? 2048 : 1024), P.balony.b, () => root.classList.add("gk2-chrom-2"))
    }

    const ruch = (e: PointerEvent) => {
        s.mx = e.clientX
        s.my = e.clientY
        const scena = el.scena as HTMLElement | undefined
        if (scena) {
            const r = scena.getBoundingClientRect()
            if (e.clientY >= r.top && e.clientY <= r.bottom) {
                const x = e.clientX - r.left
                const y = e.clientY - r.top
                if (s.aktywny) s.droga += Math.hypot(x - s.tx, y - s.ty)
                s.tx = x
                s.ty = y
                s.aktywny = true
                s.ostatni = performance.now()
            }
        }
        const kubek = el.kubekTilt as HTMLElement | undefined
        if (kubek) {
            const r = kubek.getBoundingClientRect()
            const wSrodku = e.clientX > r.left - 200 && e.clientX < r.right + 200 && e.clientY > r.top - 200 && e.clientY < r.bottom + 200
            s.ktx = wSrodku ? clamp((e.clientX - (r.left + r.width / 2)) / r.width, -1, 1) : 0
            s.kty = wSrodku ? clamp((e.clientY - (r.top + r.height / 2)) / r.height, -1, 1) : 0
        }
    }
    window.addEventListener("pointermove", ruch, { passive: true })
    window.addEventListener("pointerdown", ruch, { passive: true })

    const sekcje = Array.prototype.slice.call(root.querySelectorAll("[data-motyw]")) as HTMLElement[]
    const napisz = (cel: HTMLElement | undefined, lista: Array<[number, string]>, czas: number, klucz: "nap1" | "nap2") => {
        if (!cel) return
        let i = 0
        for (let k = 0; k < lista.length; k++) if (czas >= lista[k][0]) i = k
        if (i !== s[klucz]) {
            s[klucz] = i
            cel.textContent = lista[i][1]
            cel.classList.remove("gk2-napis-wej")
            void cel.offsetWidth
            cel.classList.add("gk2-napis-wej")
        }
    }
    const przesun = (cel: HTMLElement | undefined, t: string) => {
        if (cel) cel.style.transform = t
    }

    let raf = 0
    let dziala = true
    const klatka = (teraz: number) => {
        if (!dziala) return
        const vw = geo.vw
        const vh = window.innerHeight
        const t = (teraz - s.t0) / 1000
        const mobile = vw < 810 || vw / vh < 1.05

        // Światło: za kursorem, a na telefonie krąży samo.
        const maKursor = s.mx >= 0 && !dotyk
        const celLx = maKursor ? (s.mx / vw) * 2 - 1 : Math.sin(t * 0.5) * 0.7
        const celLy = maKursor ? 1 - (s.my / vh) * 2 : Math.cos(t * 0.37) * 0.5
        s.lx += (celLx - s.lx) * 0.06
        s.ly += (celLy - s.ly) * 0.06

        // 1. Pierwszy ekran: Szary Dzień siedzi sam; w kulce widać kolor i Kulkę z lodami
        const hero = el.hero as HTMLElement | undefined
        const scena = el.scena as HTMLElement | undefined
        const kolor = el.kolor as HTMLElement | undefined
        if (hero && scena && kolor) {
            const hr = hero.getBoundingClientRect()
            if (hr.bottom > -80 && hr.top < vh + 80) {
                const sw = scena.clientWidth
                const sh = scena.clientHeight
                const p = gladko("hero", clamp(-hr.top / Math.max(1, hero.offsetHeight - sh), 0, 1))
                // Kulka czeka nad pustym krzesłem: po kolorowej stronie siedzi tam Kulka.
                const cx0 = geo.il + geo.iw * 0.79
                const cy0 = geo.it + geo.ih * 0.37
                if (dotyk && s.aktywny && teraz - s.ostatni > 3500) s.aktywny = false
                let tx = s.aktywny ? s.tx : cx0 + Math.sin(t * 0.55) * geo.iw * (mobile ? 0.07 : 0.03)
                let ty = s.aktywny ? s.ty : cy0 + Math.sin(t * 0.83) * geo.ih * 0.05
                const sciagnij = easeOut(clamp(p * 2.6, 0, 1))
                tx = lerp(tx, cx0, sciagnij)
                ty = lerp(ty, cy0, sciagnij)
                if (s.x < 0) {
                    s.x = tx
                    s.y = ty
                }
                s.x += (tx - s.x) * 0.15
                s.y += (ty - s.y) * 0.15
                const pr = clamp(p / 0.34, 0, 1)
                const r0 = clamp(Math.min(sw, sh) * (mobile ? 0.21 : 0.17), 72, 180) * (1 + 0.03 * Math.sin(t * 1.7))
                const rMax = Math.hypot(Math.max(s.x, sw - s.x), Math.max(s.y, sh - s.y)) + 6
                const r = reduce ? rMax : lerp(r0, rMax, easeIn(pr))
                kolor.style.clipPath = "circle(" + r.toFixed(1) + "px at " + s.x.toFixed(1) + "px " + s.y.toFixed(1) + "px)"
                if (el.kula) {
                    el.kula.style.transform = "translate3d(" + (s.x - 100).toFixed(1) + "px," + (s.y - 100).toFixed(1) + "px,0) scale(" + (r / 100).toFixed(4) + ")"
                    el.kula.style.opacity = reduce ? "0" : clamp(1 - pr * 3.2, 0, 1).toFixed(3)
                }
                if (el.podpis) {
                    el.podpis.style.opacity = !reduce && s.droga < 260 && p < 0.03 ? "1" : "0"
                    const px = clamp(s.x - geo.pw / 2, 10, sw - geo.pw - 10)
                    const py = Math.max(s.y - r - 46, 64)
                    el.podpis.style.transform = "translate3d(" + px.toFixed(1) + "px," + py.toFixed(1) + "px,0)"
                }
                const pk = reduce ? 1 : p
                // Klatki z grafiki marki: Kulka podaje lody, Szary Dzień próbuje i się uśmiecha.
                const k = pk >= 0.8 ? 4 : pk >= 0.68 ? 3 : pk >= 0.56 ? 2 : pk >= 0.44 ? 1 : 0
                if (k !== s.klatka) {
                    s.klatka = k
                    for (let i = 1; i < 5; i++) {
                        const kl = el["klatka" + i] as HTMLElement | undefined
                        if (kl) kl.style.opacity = i <= k ? "1" : "0"
                    }
                    if (el.ryc) el.ryc.textContent = RYCINY[k + 1]
                }
                // Słońce wychodzi, kiedy robi się kolorowo.
                if (el.slonce) {
                    const ps = easeOut(clamp((pk - 0.04) / 0.4, 0, 1))
                    el.slonce.style.transform = "rotate(" + (pk * 50).toFixed(2) + "deg) scale(" + (0.62 + 0.38 * ps).toFixed(3) + ")"
                }
                // Napis odjeżdża lekko w górę, rysunek rośnie.
                const wGore = "translate3d(0," + (-pk * (mobile ? 0 : 4)).toFixed(2) + "vh,0)"
                przesun(el.blok1, wGore)
                przesun(el.blok2, wGore)
                const wieksze = "scale(" + (1 + 0.035 * pk).toFixed(4) + ")"
                przesun(el.ilu, wieksze)
                przesun(el.ilu2, wieksze)
            }
        }

        // 2. Manifest: słowa zapalają się w rytmie przewijania
        const m = el.manifest as HTMLElement | undefined
        if (m) {
            const r = m.getBoundingClientRect()
            if (r.bottom > -80 && r.top < vh + 80) {
                const p = clamp((vh * 0.82 - r.top) / (r.height * 0.6), 0, 1)
                const n = slowa.current.length
                const zapalone = p * (n + 3)
                slowa.current.forEach((sl, i) => {
                    if (!sl) return
                    const o = reduce ? "1" : clamp(zapalone - i, 0.13, 1).toFixed(2)
                    if (sl.dataset.o !== o) {
                        sl.style.opacity = o
                        sl.dataset.o = o
                    }
                })
                if (el.plaza && !reduce) {
                    const pp = clamp((vh - r.bottom + el.plaza.offsetHeight) / (vh * 0.9), 0, 1)
                    el.plaza.style.transform = "translate3d(" + ((1 - easeOut(pp)) * 9).toFixed(2) + "vw,0,0)"
                }
            }
        }

        // 3. Zajrzyj do nas: film otwiera się jak przysłona, napisy idą za ujęciami
        const kino = el.kino as HTMLElement | undefined
        if (kino) {
            const kr = kino.getBoundingClientRect()
            if (kr.bottom > -80 && kr.top < vh + 80) {
                const p = gladko("kino", clamp(-kr.top / Math.max(1, kino.offsetHeight - vh), 0, 1))
                const wej = clamp((vh - kr.top) / vh, 0, 1)
                const q = reduce ? 1 : easeInOut(clamp(clamp((wej - 0.5) / 0.5, 0, 1) * 0.35 + clamp(p / 0.22, 0, 1) * 0.65, 0, 1))
                const p2 = reduce ? 1 : easeOut(clamp((p - 0.42) / 0.36, 0, 1))
                if (el.portal1) {
                    const pelny = Math.hypot(geo.p1w, geo.p1h) * 0.5 + 4
                    el.portal1.style.clipPath = q >= 1 ? "none" : "circle(" + lerp(Math.min(geo.p1w, geo.p1h) * 0.09, pelny, q).toFixed(1) + "px at 50% 50%)"
                    el.portal1.style.transform = mobile ? "scale(" + (1.06 - 0.06 * q).toFixed(4) + ")" : "translate3d(0," + ((0.5 - p) * 3).toFixed(2) + "vh,0) scale(" + (0.94 + 0.06 * q).toFixed(4) + ")"
                }
                if (el.portal2) {
                    el.portal2.style.opacity = p2.toFixed(3)
                    el.portal2.style.transform = "translate3d(" + ((1 - p2) * 16).toFixed(2) + "vw," + ((1 - p2) * 30 - p * 5).toFixed(2) + "vh,0) rotate(" + (3 + (1 - p2) * 9).toFixed(2) + "deg)"
                }
                przesun(el.kt1, "translate3d(" + (-(1 - q) * 6 - p * 2).toFixed(2) + "vw,0,0)")
                przesun(el.kt2, "translate3d(" + ((1 - q) * 6 + p * 2).toFixed(2) + "vw,0,0)")
                const v1 = el.wideo1 as HTMLVideoElement | undefined
                const v2 = el.wideo2 as HTMLVideoElement | undefined
                const c1 = v1 && !v1.paused && v1.videoWidth > 0 ? v1.currentTime : -1
                const c2 = v2 && !v2.paused && v2.videoWidth > 0 ? v2.currentTime : -1
                napisz(el.napis1, NAPISY_1, c1 < 0 ? 4.5 : c1, "nap1")
                napisz(el.napis2, NAPISY_2, c2 < 0 ? 0 : c2, "nap2")
            }
        }

        // 4. Święta: kokarda puszcza, wstążka się zsuwa, papier rozchyla się na cztery strony
        const swieta = el.swieta as HTMLElement | undefined
        if (swieta && el.opak && !reduce) {
            const r = swieta.getBoundingClientRect()
            if (r.bottom > -80 && r.top < vh + 80) {
                const dl = el.swietaDroga ? el.swietaDroga.offsetHeight : vh * 2.3
                const p = gladko("swieta", clamp(-r.top / Math.max(1, dl), 0, 1))
                if (Math.abs(p - s.swieta) > 0.0003) {
                    s.swieta = p
                    const f = (a: number, b: number) => clamp((p - a) / (b - a), 0, 1)
                    // Ciągniemy za końce: pętle chowają się w węźle, ogony się wydłużają.
                    const a1 = easeInOut(f(0.03, 0.3))
                    const a2 = easeIn(f(0.3, 0.55))
                    const a3 = easeOut(f(0.27, 0.38))
                    const sk = lerp(1, 0.05, a1).toFixed(4)
                    przesun(el.kok_petlaL, "rotate(" + (a1 * 18).toFixed(2) + "deg) scale(" + sk + ")")
                    przesun(el.kok_petlaP, "rotate(" + (-a1 * 18).toFixed(2) + "deg) scale(" + sk + ")")
                    const petle = (1 - a3).toFixed(3)
                    if (el.kok_petlaL) el.kok_petlaL.style.opacity = petle
                    if (el.kok_petlaP) el.kok_petlaP.style.opacity = petle
                    const dluzszy = " scale(" + (1 - 0.04 * a1).toFixed(4) + "," + (1 + 0.4 * a1).toFixed(4) + ")"
                    przesun(el.kok_ogonL, "translate3d(" + (-a2 * 14).toFixed(2) + "vw," + (a2 * 118).toFixed(2) + "vh,0) rotate(" + (a2 * 16).toFixed(2) + "deg)" + dluzszy)
                    przesun(el.kok_ogonP, "translate3d(" + (a2 * 14).toFixed(2) + "vw," + (a2 * 118).toFixed(2) + "vh,0) rotate(" + (-a2 * 16).toFixed(2) + "deg)" + dluzszy)
                    if (el.kok_wezel) {
                        el.kok_wezel.style.transform = "scale(" + lerp(1, 0.45, a3).toFixed(4) + ")"
                        el.kok_wezel.style.opacity = (1 - a3).toFixed(3)
                    }
                    if (el.kokCien) el.kokCien.style.opacity = (1 - Math.max(a3, a1 * 0.55)).toFixed(3)
                    // Wstążka zjeżdża z paczki.
                    const b1 = easeInOut(f(0.4, 0.58))
                    const b2 = easeInOut(f(0.45, 0.63))
                    przesun(el.pasHL, "translate3d(" + (-b1 * 102).toFixed(2) + "%,0,0)")
                    przesun(el.pasHP, "translate3d(" + (b1 * 102).toFixed(2) + "%,0,0)")
                    przesun(el.pasVG, "translate3d(0," + (-b2 * 102).toFixed(2) + "%,0)")
                    przesun(el.pasVD, "translate3d(0," + (b2 * 102).toFixed(2) + "%,0)")
                    // Papier rozchodzi się na cztery strony, pod spodem czeka sklep.
                    const c1 = easeInOut(f(0.58, 0.84))
                    const c2 = easeInOut(f(0.62, 0.88))
                    el.opak.style.setProperty("--cien", clamp(f(0.56, 0.62), 0, 1).toFixed(2))
                    przesun(el.cw_a, "translate3d(" + (-c1 * 104).toFixed(2) + "%," + (-c1 * 104).toFixed(2) + "%,0) rotate(" + (-c1 * 6).toFixed(2) + "deg)")
                    przesun(el.cw_d, "translate3d(" + (c1 * 104).toFixed(2) + "%," + (c1 * 104).toFixed(2) + "%,0) rotate(" + (-c1 * 6).toFixed(2) + "deg)")
                    przesun(el.cw_b, "translate3d(" + (c2 * 104).toFixed(2) + "%," + (-c2 * 104).toFixed(2) + "%,0) rotate(" + (c2 * 6).toFixed(2) + "deg)")
                    przesun(el.cw_c, "translate3d(" + (-c2 * 104).toFixed(2) + "%," + (c2 * 104).toFixed(2) + "%,0) rotate(" + (c2 * 6).toFixed(2) + "deg)")
                    const otwarte = p > 0.66
                    if (otwarte !== s.otwarte) {
                        s.otwarte = otwarte
                        swieta.classList.toggle("gk2-swieta-otwarte", otwarte)
                    }
                    el.opak.style.visibility = p > 0.9 ? "hidden" : "visible"
                }
            }
        }

        // 5. Wigilie firmowe: zdjęcie stołu przesuwa się w oknie
        if (el.firmyOkno && el.firmyObraz && !reduce) {
            const r = el.firmyOkno.getBoundingClientRect()
            if (r.bottom > -80 && r.top < vh + 80) {
                const p = clamp((vh - r.top) / (vh + r.height), 0, 1)
                el.firmyObraz.style.transform = "translate3d(0," + (-p * 13).toFixed(2) + "%,0)"
            }
        }

        // 6. Smaki: każdy smak zalewa ekran swoim kolorem, a chromowy rożek ten kolor odbija
        const smaki = el.smaki as HTMLElement | undefined
        if (smaki) {
            const r = smaki.getBoundingClientRect()
            if (r.bottom > -80 && r.top < vh + 80) {
                const n = SMAKI.length
                const f = gladko("smaki", clamp(-r.top / Math.max(1, smaki.offsetHeight - vh), 0, 1)) * (n - 0.35)
                const maks = Math.hypot(vw, vh) * 1.02
                let aktywny = 0
                for (let c = 0; c < 3; c++) {
                    kolA[c] = SMAKI_RGB[0].a[c]
                    kolB[c] = SMAKI_RGB[0].b[c]
                }
                for (let i = 0; i < n; i++) {
                    const w = el["smak" + i] as HTMLElement | undefined
                    const e = i === 0 ? 1 : reduce ? (f >= i - 0.2 ? 1 : 0) : easeInOut(clamp((f - (i - 0.42)) / 0.42, 0, 1))
                    if (e > 0.5) aktywny = i
                    if (i > 0 && e > 0) {
                        for (let c = 0; c < 3; c++) {
                            kolA[c] = lerp(kolA[c], SMAKI_RGB[i].a[c], e)
                            kolB[c] = lerp(kolB[c], SMAKI_RGB[i].b[c], e)
                        }
                    }
                    if (w && i > 0) w.style.clipPath = e >= 1 ? "none" : "circle(" + (e * maks).toFixed(1) + "px at " + (mobile ? "50% 30%" : "74% 50%") + ")"
                    const gala = el["gala" + i] as HTMLElement | undefined
                    if (gala && !reduce) gala.style.transform = "rotate(" + ((f - i) * 24).toFixed(2) + "deg) scale(" + (0.86 + 0.14 * e).toFixed(4) + ")"
                    const tekst = el["smakTekst" + i] as HTMLElement | undefined
                    if (tekst && !reduce) tekst.style.transform = "translate3d(0," + ((1 - e) * 46).toFixed(1) + "px,0)"
                }
                if (aktywny !== s.smak && el.smakiKropki) {
                    s.smak = aktywny
                    const dzieci = el.smakiKropki.children
                    for (let i = 0; i < dzieci.length; i++) dzieci[i].classList.toggle("gk2-on", i === aktywny)
                    el.smakiKropki.style.color = SMAKI[aktywny].tekst
                }
                if (el.rozek && !reduce) {
                    const odchyl = (f - Math.round(f)) * 12
                    el.rozek.style.transform =
                        "perspective(1300px) translate3d(0," + (Math.sin(t * 0.9) * vh * 0.008).toFixed(1) + "px,0) rotateY(" + (s.lx * 7).toFixed(2) + "deg) rotateX(" + (s.ly * 4).toFixed(2) + "deg) rotate(" + (Math.sin(t * 0.6) * 0.8 + odchyl).toFixed(2) + "deg)"
                }
                if (chromRozek) chromRozek.rysuj({ czas: t, lx: s.lx, ly: s.ly, kx: 0, ky: 0, kr: 0, caly: 1, A: kolA, B: kolB })
            }
        }

        // 7. Kubek obraca się lekko za kursorem
        if (el.kubekTilt && !reduce) {
            s.kx += (s.ktx - s.kx) * 0.08
            s.ky += (s.kty - s.ky) * 0.08
            el.kubekTilt.style.transform = "rotateY(" + (s.kx * 9).toFixed(2) + "deg) rotateX(" + (-s.ky * 7).toFixed(2) + "deg)"
        }

        // 8. Najszarszy Dzień: balony z chromu
        const noc = el.noc as HTMLElement | undefined
        if (noc && el.balony) {
            const r = noc.getBoundingClientRect()
            if (r.bottom > -80 && r.top < vh + 80) {
                const p = clamp((vh - r.top) / (vh + r.height), 0, 1)
                if (!reduce) el.balony.style.transform = "translate3d(0," + ((0.5 - p) * 16 + Math.sin(t * 0.7) * 0.8).toFixed(2) + "vh,0) rotate(" + ((p - 0.5) * 14 + Math.sin(t * 0.5) * 1.5).toFixed(2) + "deg)"
                if (chromBalony) chromBalony.rysuj({ czas: t, lx: s.lx, ly: s.ly, kx: 0, ky: 0, kr: 0, caly: 1, A: ROZ_RGB, B: MASLO_RGB })
            }
        }

        // 9. Lokale: okno z witryną i para na deptaku
        const lok = el.lokale as HTMLElement | undefined
        if (lok && !reduce) {
            const r = lok.getBoundingClientRect()
            if (r.bottom > -80 && r.top < vh + 80) {
                if (el.okno) {
                    const or = el.okno.getBoundingClientRect()
                    const p = clamp((vh - or.top) / (vh + or.height), 0, 1)
                    if (el.oknoFoto) el.oknoFoto.style.transform = "translate3d(0," + (-p * 13).toFixed(2) + "%,0)"
                }
                if (el.deptak && el.para) {
                    const dr = el.deptak.getBoundingClientRect()
                    const p = clamp((vh - dr.top) / (vh * 0.9), 0, 1)
                    const x = lerp(-0.3, 0.62, p) * dr.width
                    const k3 = Math.sin(x / 34)
                    el.para.style.transform = "translate3d(" + x.toFixed(1) + "px," + (-Math.abs(k3) * 5).toFixed(1) + "px,0) rotate(" + (k3 * 1.4).toFixed(2) + "deg)"
                }
            }
        }

        // 10. Menu: jasne na ciemnych sekcjach, chowa się przy przewijaniu w dół
        const nav = el.nav as HTMLElement | undefined
        if (nav) {
            let motyw = "jasny"
            for (let i = 0; i < sekcje.length; i++) {
                const r = sekcje[i].getBoundingClientRect()
                if (r.top <= 36 && r.bottom > 36) motyw = sekcje[i].dataset.motyw || "jasny"
            }
            if (motyw !== s.nav) {
                nav.classList.toggle("gk2-nav-ciemna", motyw === "ciemny")
                s.nav = motyw
            }
            const y = window.scrollY
            const koniecHero = hero ? hero.offsetTop + hero.offsetHeight - vh : vh
            const dy = y - s.ostY
            let schowaj = s.schowana
            if (y < koniecHero) schowaj = false
            else if (dy > 6) schowaj = true
            else if (dy < -6) schowaj = false
            if (schowaj !== s.schowana) {
                nav.classList.toggle("gk2-nav-schowana", schowaj)
                s.schowana = schowaj
            }
            s.ostY = y
        }

        raf = requestAnimationFrame(klatka)
    }
    raf = requestAnimationFrame(klatka)

    // Wjazdy sekcji
    let io: IntersectionObserver | null = null
    const wjazdy = root.querySelectorAll("[data-wjazd]")
    if ("IntersectionObserver" in window) {
        io = new IntersectionObserver(
            (wpisy) => {
                wpisy.forEach((w) => {
                    if (w.isIntersecting) {
                        w.target.classList.add("gk2-widac")
                        if (io) io.unobserve(w.target)
                    }
                })
            },
            { threshold: 0.2 }
        )
        for (let i = 0; i < wjazdy.length; i++) io.observe(wjazdy[i])
    } else {
        for (let i = 0; i < wjazdy.length; i++) wjazdy[i].classList.add("gk2-widac")
    }

    return () => {
        dziala = false
        cancelAnimationFrame(raf)
        cancelAnimationFrame(czekaResize)
        window.clearTimeout(poCzasie)
        window.removeEventListener("resize", poResize)
        window.removeEventListener("pointermove", ruch)
        window.removeEventListener("pointerdown", ruch)
        if (io) io.disconnect()
        if (chromRozek) chromRozek.usun()
        if (chromBalony) chromBalony.usun()
    }
}

interface Props {
    film1: string
    film2: string
    style?: React.CSSProperties
}

/**
 * Górka & Kulka — koncept strony głównej, wersja 3 (cała strona w jednym komponencie).
 *
 * @framerIntrinsicWidth 1440
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 */
export default function KonceptFundusz2(props: Props) {
    const film1 = props.film1 || CDN + "assets/IQjZBI2wSEc8Xk8B4R0DBh6J0o.mp4"
    const film2 = props.film2 || CDN + "assets/Qr03SvkgAz41mkdTjNXeLpjLE54.mp4"
    const rootRef = useRef<HTMLDivElement>(null)
    const E = useRef<Record<string, any>>({})
    const u = (k: string) => (el: any) => {
        E.current[k] = el
    }
    const slowaRef = useRef<Array<HTMLSpanElement | null>>([])
    const [pogoda, ustawPogode] = useState<null | { temp: number; chmury: number }>(null)
    const [dzien, ustawDzien] = useState({ krotko: "18.01", dlugo: "poniedziałek, 18 stycznia 2027" })

    useEffect(() => {
        const w = najszarszy(Date.now())
        ustawDzien({ krotko: dwa(w.dzien) + ".01", dlugo: "poniedziałek, " + w.dzien + " stycznia " + w.rok })
    }, [])

    useEffect(() => {
        const root = rootRef.current
        if (!root || typeof window === "undefined" || naKanwie()) return
        return silnik(root, E.current, slowaRef)
    }, [])

    // Prawdziwa pogoda w Gorzowie (bez klucza, bez ciasteczek); gdy się nie uda, zostaje "szaro".
    useEffect(() => {
        if (typeof window === "undefined" || typeof fetch === "undefined") return
        let anulowano = false
        const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null
        const timer = setTimeout(() => ctrl && ctrl.abort(), 4000)
        fetch("https://api.open-meteo.com/v1/forecast?latitude=52.73&longitude=15.24&current=temperature_2m,cloud_cover&timezone=Europe%2FWarsaw", ctrl ? { signal: ctrl.signal } : undefined)
            .then((r) => (r.ok ? r.json() : Promise.reject(new Error("pogoda"))))
            .then((d) => {
                const c = d && d.current
                if (!anulowano && c && typeof c.cloud_cover === "number" && typeof c.temperature_2m === "number") {
                    ustawPogode({ temp: Math.round(c.temperature_2m), chmury: Math.round(c.cloud_cover) })
                }
            })
            .catch(() => {})
        return () => {
            anulowano = true
            clearTimeout(timer)
            if (ctrl) ctrl.abort()
        }
    }, [])

    const statusSzary = pogoda
        ? "Gorzów Wlkp., teraz " + pogoda.temp + "°C, " + pogoda.chmury + "% chmur. " + (pogoda.chmury >= 60 ? "Szaro." : pogoda.chmury >= 30 ? "Tak sobie." : "Słońce, ale kulka nie zaszkodzi.")
        : "Prognoza na dziś: szaro."
    const statusKolor = pogoda ? "Gorzów Wlkp., teraz " + pogoda.temp + "°C. I kolorowo." : "Prognoza na dziś: kolorowo."

    const slowa = MANIFEST.split(" ")
    slowaRef.current = []

    const skok = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault()
        // Do Świąt przewijamy od razu za kokardę: paczka rozpakowuje się po drodze, a na końcu czeka sklep.
        const sekcja = E.current.swieta as HTMLElement | undefined
        const droga = E.current.swietaDroga as HTMLElement | undefined
        if (id === "gk2-swieta" && sekcja && droga && droga.offsetHeight > 0 && typeof window !== "undefined") {
            window.scrollTo({ top: sekcja.getBoundingClientRect().top + window.scrollY + droga.offsetHeight * 0.93, behavior: "smooth" })
            return
        }
        przewinDo(id)
    }

    // Napis startowy: dwie linie na komputerze, cztery na telefonie (każde słowo osobno).
    const blok = (linie: string[][], status: string, klucz: string) => (
        <>
            <div className="gk2-blok" ref={u(klucz)}>
                <div className="gk2-d gk2-napis" aria-hidden="true">
                    {linie.map((l, i) => (
                        <span key={i} className="gk2-napis-l">
                            {l.map((w, j) => (
                                <span key={j}>{w + (j < l.length - 1 ? " " : "")}</span>
                            ))}
                        </span>
                    ))}
                </div>
                <div className="gk2-e gk2-status">{status}</div>
            </div>
            <div className="gk2-e gk2-status-m">{status}</div>
        </>
    )

    // Klatka rysunku: grafika na białym tle mnożona z kolorem warstwy, pod nią miękka poświata (kończy się przed krawędzią).
    const klatkaTlo = (src: string): React.CSSProperties => ({ backgroundImage: "url(" + src + "), radial-gradient(closest-side at 58% 58%, rgba(255,255,255,.5), rgba(255,255,255,0))" })

    // Papier do pakowania: ta sama treść w czterech ćwiartkach, każda pokazuje swój kawałek.
    const papier = (
        <div className="gk2-papier">
            <div className="gk2-papier-gora gk2-e">
                <span>03 — Święta 2026</span>
                <span>Zamówienia 1–21 grudnia</span>
            </div>
            <div className="gk2-d gk2-papier-napis">
                <span>Rozpakuj</span>
                <span>Święta.</span>
            </div>
            <div className="gk2-e gk2-papier-dol">Przewijaj. Kokarda puści ↓</div>
        </div>
    )

    return (
        <div className="gk2" ref={rootRef} style={props.style}>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />
            <div className="gk2-ziarno" aria-hidden="true" />

            <div className="gk2-nav-kotwica">
                <header className="gk2-nav" ref={u("nav")}>
                    <a className="gk2-nav-logo" href="#gk2-start" onClick={skok("gk2-start")} aria-label="Górka & Kulka — początek strony">
                        <Wyc a={P.logotyp} rozmiar={1024} alt="Górka & Kulka" odrazu />
                    </a>
                    <nav className="gk2-nav-linki" aria-label="Główne">
                        {[
                            ["U nas", "gk2-unas"],
                            ["Święta", "gk2-swieta"],
                            ["Dla firm", "gk2-firmy"],
                            ["Smaki", "gk2-smaki"],
                            ["Lokale", "gk2-lokale"],
                        ].map((p) => (
                            <a key={p[1]} href={"#" + p[1]} onClick={skok(p[1])}>
                                {p[0]}
                            </a>
                        ))}
                    </nav>
                    <div className="gk2-nav-prawo">
                        <span className="gk2-nav-jezyk">PL / EN</span>
                        <a className="gk2-pigulka" href="#gk2-swieta" onClick={skok("gk2-swieta")}>
                            <i />
                            Zamów na Święta
                        </a>
                    </div>
                </header>
            </div>

            <section className="gk2-hero" ref={u("hero")} id="gk2-start" data-motyw="jasny">
                <div className="gk2-scena" ref={u("scena")}>
                    <div className="gk2-warstwa gk2-szara" aria-hidden="true">
                        {blok(
                            [
                                ["Dziś", "jest"],
                                ["Szary", "Dzień."],
                            ],
                            statusSzary,
                            "blok1"
                        )}
                        <div className="gk2-ilu" ref={u("ilu")}>
                            <i style={klatkaTlo(SZARY[0])} />
                        </div>
                        <div className="gk2-ryc gk2-e">
                            <span>{RYCINY[0]}</span>
                            <span>Przewiń. Niech się rozpogodzi ↓</span>
                        </div>
                    </div>
                    <div className="gk2-warstwa gk2-kolor" ref={u("kolor")}>
                        <h1 className="gk2-sr">Małe święto każdego dnia. Górka & Kulka — lody rzemieślnicze z Gorzowa Wielkopolskiego</h1>
                        <div className="gk2-slonce" ref={u("slonce")} aria-hidden="true">
                            <Wyc a={P.slonce} rozmiar={1024} odrazu />
                        </div>
                        {blok(
                            [
                                ["Małe", "święto"],
                                ["każdego", "dnia."],
                            ],
                            statusKolor,
                            "blok2"
                        )}
                        <div
                            className="gk2-ilu"
                            ref={u("ilu2")}
                            role="img"
                            aria-label="Szary Dzień, postać marki, siedzi sam przy kawiarnianym stoliku. Dosiada się Kulka i podaje mu lody. Szary Dzień próbuje i zaczyna się uśmiechać."
                        >
                            {SZARY.slice(1).map((src, i) => (
                                <i key={i} ref={u("klatka" + i)} style={klatkaTlo(src)} />
                            ))}
                        </div>
                        <div className="gk2-ryc gk2-e">
                            <span ref={u("ryc")}>{RYCINY[1]}</span>
                            <span>Przewijaj dalej ↓</span>
                        </div>
                    </div>
                    <div className="gk2-kula" ref={u("kula")} aria-hidden="true" />
                    <div className="gk2-podpis gk2-e" ref={u("podpis")} aria-hidden="true">
                        <span className="gk2-tylko-mysz">Przesuń kulkę</span>
                        <span className="gk2-tylko-dotyk">Dotknij i przesuń kulkę</span>
                    </div>
                </div>
            </section>

            <section className="gk2-manifest" ref={u("manifest")} data-motyw="jasny">
                <div className="gk2-wiersz gk2-e">
                    <span>01 — Manifest</span>
                    <span>Górka & Kulka, Gorzów Wielkopolski, od 2016</span>
                </div>
                <p className="gk2-d gk2-manifest-tekst">
                    {slowa.map((w, i) => {
                        const rodzaj = w.charAt(0) === "~" ? " gk2-slowo-szare" : w.charAt(0) === "*" ? " gk2-slowo-rubin" : ""
                        return (
                            <span
                                key={i}
                                className={"gk2-slowo" + rodzaj}
                                ref={(sl) => {
                                    slowaRef.current[i] = sl
                                }}
                            >
                                {w.replace(/^[~*]/, "")}{" "}
                            </span>
                        )
                    })}
                </p>
                <div className="gk2-plaza" ref={u("plaza")}>
                    <span className="gk2-e gk2-plaza-podpis">Ryc. 7 — Kulka po sezonie</span>
                    <Wyc a={P.parasol} rozmiar={1024} className="gk2-plaza-parasol" />
                    <Wyc a={P.lezak} rozmiar={1024} className="gk2-plaza-lezak" alt="Kulka odpoczywa na leżaku pod parasolem" />
                </div>
            </section>

            <div className="gk2-tasmy" aria-hidden="true">
                <Tasma src={TASMA_MASLO} klasa="gk2-tasma-a gk2-tasma-maslo" />
                <Tasma src={TASMA_ROZ} klasa="gk2-tasma-b gk2-tasma-roz" />
            </div>

            <section className="gk2-kino" ref={u("kino")} id="gk2-unas" data-motyw="ciemny">
                <div className="gk2-kino-scena">
                    <div className="gk2-kino-gora gk2-e">
                        <span>02 — Zajrzyj do nas</span>
                        <span className="gk2-kino-seans">Otwarte codziennie, 10–19</span>
                    </div>
                    <h2 className="gk2-sr">Zajrzyj do nas — filmy z naszej kawiarni</h2>
                    <div className="gk2-kino-rzad">
                        <div className="gk2-d gk2-kino-tytul" ref={u("kt1")} aria-hidden="true">
                            Zajrzyj
                        </div>
                        <div className="gk2-portal gk2-portal-1" ref={u("portal1")}>
                            <Film src={film1} zapas={[FOTO.sala, FOTO.sniadanie, FOTO.klientka]} opis="Film z Kawiarni Centrum: goście, witryna z ciastami, kawa i śniadania" wideoRef={u("wideo1")} />
                            <p className="gk2-d gk2-napisy" ref={u("napis1")}>
                                {NAPISY_1[0][1]}
                            </p>
                        </div>
                        <div className="gk2-d gk2-kino-tytul" ref={u("kt2")} aria-hidden="true">
                            do nas
                        </div>
                    </div>
                    <div className="gk2-kino-meta gk2-e">
                        <span>Kawiarnia Centrum, Gorzów Wlkp.</span>
                        <span>Nagrane u nas. Bez scenariusza, bez aktorów.</span>
                    </div>
                    <div className="gk2-portal gk2-portal-2" ref={u("portal2")}>
                        <Film src={film2} zapas={[FOTO.witryna, FOTO.ciasto, FOTO.klientka]} opis="Film z Kawiarni Centrum: jesienne menu, zespół i wejście do kawiarni" wideoRef={u("wideo2")} />
                        <span className="gk2-e gk2-portal-podpis" ref={u("napis2")}>
                            {NAPISY_2[0][1]}
                        </span>
                    </div>
                </div>
            </section>

            <section className="gk2-swieta" ref={u("swieta")} id="gk2-swieta" data-motyw="jasny">
                <div className="gk2-swieta-lep">
                    <div className="gk2-sklep">
                        <div className="gk2-sklep-tekst">
                            <div className="gk2-e gk2-s">03 — Święta 2026</div>
                            <Linie linie={["Wypieki", "na Święta."]} className="gk2-h2 gk2-h2-sklep" bezWjazdu />
                            <p className="gk2-lead gk2-s" style={{ ["--i" as any]: 1 }}>
                                {"Sernik, makowiec i\u00a0ciasto czekoladowe. Pieczemy sami, na\u00a0zamówienie — po\u00a0dwadzieścia sztuk każdego."}
                            </p>
                            <dl className="gk2-fakty gk2-s" style={{ ["--i" as any]: 2 }}>
                                <div>
                                    <dt>Zamówienia</dt>
                                    <dd>{"1–21\u00a0grudnia, przez stronę"}</dd>
                                </div>
                                <div>
                                    <dt>Odbiór</dt>
                                    <dd>
                                        <span>{"Kawiarnia Centrum, ul.\u00a0Sikorskiego\u00a0126"}</span>
                                        <span>{"23\u00a0grudnia 10–19 · 24\u00a0grudnia 10–12"}</span>
                                    </dd>
                                </div>
                                <div>
                                    <dt>Zadatek</dt>
                                    <dd>{"30% płatne online"}</dd>
                                </div>
                            </dl>
                            <a className="gk2-przycisk gk2-s" href={ZAMOWIENIA} style={{ ["--i" as any]: 3 }}>
                                Zamów wypieki →
                            </a>
                        </div>
                        <div className="gk2-wypieki">
                            {WYPIEKI.map((w, i) => (
                                <a key={w.nazwa} className="gk2-wypiek gk2-s" href={ZAMOWIENIA} style={{ ["--i" as any]: i + 2 }}>
                                    <span className="gk2-wypiek-foto" role="img" aria-label={w.nazwa + " — wypiek świąteczny Górka & Kulka"}>
                                        <i style={{ backgroundImage: "url(" + obraz(w.f) + ")" }} />
                                    </span>
                                    <span className="gk2-e gk2-wypiek-nr">
                                        Nr 0{i + 1} · limit 20 sztuk
                                    </span>
                                    <span className="gk2-d gk2-wypiek-nazwa">{w.nazwa}</span>
                                    <span className="gk2-wypiek-opis">{w.opis}</span>
                                    <span className="gk2-e gk2-wypiek-link">Zamawiam →</span>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="gk2-opak" ref={u("opak")} aria-hidden="true">
                        {["a", "b", "c", "d"].map((k) => (
                            <div key={k} className={"gk2-cw gk2-cw-" + k} ref={u("cw_" + k)}>
                                {papier}
                            </div>
                        ))}
                        <i className="gk2-pas gk2-pas-h gk2-pas-hl" ref={u("pasHL")} />
                        <i className="gk2-pas gk2-pas-h gk2-pas-hp" ref={u("pasHP")} />
                        <i className="gk2-pas gk2-pas-v gk2-pas-vg" ref={u("pasVG")} />
                        <i className="gk2-pas gk2-pas-v gk2-pas-vd" ref={u("pasVD")} />
                        <div className="gk2-kok-cien" ref={u("kokCien")} />
                        <Kokarda u={u} />
                    </div>
                </div>
                <div className="gk2-swieta-droga" ref={u("swietaDroga")} aria-hidden="true" />
            </section>

            <section className="gk2-firmy" id="gk2-firmy" data-motyw="jasny">
                <div className="gk2-firmy-glowa">
                    <div className="gk2-e">04 — Dla firm</div>
                    <Linie linie={["Wigilia", "firmowa."]} className="gk2-h2" />
                </div>
                <figure className="gk2-firmy-foto gk2-wjazd" data-wjazd="">
                    <div className="gk2-firmy-okno" ref={u("firmyOkno")}>
                        <img ref={u("firmyObraz")} src={FOTO.ciasto} alt="Sernik na paterze i ciasto czekoladowe na marmurowym stole, goście nakładają sobie po kawałku" loading="lazy" decoding="async" />
                    </div>
                    <i className="gk2-firmy-kokarda" aria-hidden="true" />
                    <figcaption className="gk2-e">Kawiarnia Centrum, ul. Sikorskiego 126</figcaption>
                </figure>
                <div className="gk2-firmy-tresc">
                    <p className="gk2-lead">{"Zamknijcie rok przy jednym stole. Dwie godziny, nasza obsługa i\u00a0specjalne menu ułożone na\u00a0tę okazję. Podajcie termin i\u00a0liczbę osób, a\u00a0odpiszemy z\u00a0ofertą."}</p>
                    <ul className="gk2-trojka">
                        <li>
                            <b className="gk2-d">2 godziny</b>
                            <span>przy wspólnym stole</span>
                        </li>
                        <li>
                            <b className="gk2-d">Obsługa</b>
                            <span>{"podajemy i\u00a0dbamy o\u00a0resztę"}</span>
                        </li>
                        <li>
                            <b className="gk2-d">Menu</b>
                            <span>{"specjalne, układane na\u00a0tę okazję"}</span>
                        </li>
                    </ul>
                    <Zapytanie />
                </div>
            </section>

            <section className="gk2-smaki" ref={u("smaki")} id="gk2-smaki" data-motyw="jasny" style={{ ["--n" as any]: SMAKI.length }}>
                <div className="gk2-smaki-scena">
                    <h2 className="gk2-sr">Smaki lodów</h2>
                    {SMAKI.map((sm, i) => (
                        <div key={sm.nr} className="gk2-smak" ref={u("smak" + i)} style={{ background: sm.kolor, color: sm.tekst, zIndex: i + 1 }}>
                            <div className="gk2-smak-tekst" ref={u("smakTekst" + i)}>
                                <div className="gk2-e">
                                    05 — Smaki · {sm.nr} / 0{SMAKI.length}
                                </div>
                                <h3 className="gk2-d gk2-smak-nazwa">
                                    {sm.nazwa.map((l) => (
                                        <span key={l}>{l}</span>
                                    ))}
                                </h3>
                                <p className="gk2-lead">{sm.opis}</p>
                                <p className="gk2-e gk2-smak-stopka">Karta zmienia się jak pogoda. Dziś gościnnie: pumpkin spice latte i matcha z truskawką.</p>
                            </div>
                            <div className="gk2-gala" ref={u("gala" + i)} style={{ backgroundColor: sm.gala }} aria-hidden="true" />
                        </div>
                    ))}
                    <div className="gk2-rozek" ref={u("rozek")}>
                        <Wyc a={P.rozek} rozmiar={1024} alt="Chromowy rożek lodów Górka & Kulka" />
                        <canvas ref={u("plotnoRozek")} aria-hidden="true" />
                    </div>
                    <ol className="gk2-smaki-kropki" ref={u("smakiKropki")} aria-hidden="true">
                        {SMAKI.map((sm) => (
                            <li key={sm.nr} />
                        ))}
                    </ol>
                </div>
            </section>

            <Kubek tiltRef={u("kubekTilt")} />

            <section className="gk2-noc" ref={u("noc")} id="gk2-dzien" data-motyw="ciemny">
                <div className="gk2-noc-tekst">
                    <div className="gk2-e">07 — Święto marki · {dzien.dlugo}</div>
                    <div className="gk2-d gk2-data gk2-wjazd" data-wjazd="">
                        {dzien.krotko}
                    </div>
                    <Linie linie={["Najszarszy", "Dzień."]} className="gk2-h2 gk2-h2-szary" />
                    <p className="gk2-lead">
                        Trzeci poniedziałek stycznia uchodzi za najsmutniejszy dzień w roku. U nas to święto. Raz do roku Szary Dzień jest gościem honorowym, a każda lodziarnia zamienia się w jego przyjęcie.
                    </p>
                    <Odliczanie />
                    <Zapis data={dzien.krotko} />
                </div>
                <div className="gk2-balony" ref={u("balony")}>
                    <Wyc a={P.balony} rozmiar={1024} alt="Chromowe balony z monogramem Górka & Kulka" />
                    <canvas ref={u("plotnoBalony")} aria-hidden="true" />
                </div>
            </section>

            <section className="gk2-lokale" ref={u("lokale")} id="gk2-lokale" data-motyw="jasny">
                <div className="gk2-lokale-gora">
                    <div>
                        <div className="gk2-e">08 — Lokale</div>
                        <Linie linie={["Gorzów", "na początek."]} className="gk2-h2" />
                    </div>
                    <figure className="gk2-luk">
                        <div className="gk2-luk-okno" ref={u("okno")}>
                            <img ref={u("oknoFoto")} src={FOTO.witryna} alt="Witryna Kawiarni Centrum z różową i żółtą ławką" loading="lazy" decoding="async" />
                        </div>
                        <figcaption className="gk2-e">Kawiarnia Centrum, ul. Sikorskiego 126</figcaption>
                    </figure>
                </div>
                <ul className="gk2-lista">
                    {[
                        ["Kawiarnia Centrum", "ul. Sikorskiego 126", "Kawiarnia, lody, ciasta"],
                        ["Nova Park", "Centrum handlowe Nova Park", "Lodziarnia"],
                        ["Górczyn", "Lodziarnia sezonowa", "Otwarta w sezonie"],
                    ].map((l) => (
                        <li key={l[0]}>
                            <span className="gk2-d gk2-lista-nazwa">{l[0]}</span>
                            <span>{l[1]}</span>
                            <span>{l[2]}</span>
                            <span className="gk2-lista-strzalka">Gorzów Wlkp. ↗</span>
                        </li>
                    ))}
                </ul>
                <Glosowanie />
                <div className="gk2-deptak" ref={u("deptak")}>
                    <span className="gk2-e gk2-deptak-napis">Następny przystanek: Twoje miasto →</span>
                    <div className="gk2-para" ref={u("para")}>
                        <Wyc a={P.para} rozmiar={1024} alt="Górka i Kulka idą dalej, każde z rożkiem" />
                    </div>
                </div>
            </section>

            <div className="gk2-tasmy gk2-tasmy-dol" aria-hidden="true">
                <Tasma src={TASMA_ROZ} klasa="gk2-tasma-a gk2-tasma-roz" />
                <Tasma src={TASMA_MASLO} klasa="gk2-tasma-b gk2-tasma-maslo" />
            </div>

            <footer className="gk2-stopka" data-motyw="jasny">
                <div className="gk2-stopka-dzieci">
                    <Wyc a={P.dzieci} rozmiar={1024} alt="Mała Kulka z balonami w kształcie liczby 10" />
                    <span className="gk2-e">10 lat. Dopiero się rozkręcamy.</span>
                </div>
                <Wyc a={P.logotyp} rozmiar={2048} className="gk2-stopka-logo" alt="Górka & Kulka" />
                <div className="gk2-stopka-wiersz gk2-e">
                    <span>Małe święto każdego dnia.</span>
                    <span>Instagram @gorka.kulka</span>
                    <span>© 2026 Górka & Kulka s.c.</span>
                    <span>Makieta koncepcyjna. To jeszcze nie jest działający sklep.</span>
                </div>
            </footer>
        </div>
    )
}

addPropertyControls(KonceptFundusz2, {
    film1: { type: ControlType.String, title: "Film 1", defaultValue: CDN + "assets/IQjZBI2wSEc8Xk8B4R0DBh6J0o.mp4" },
    film2: { type: ControlType.String, title: "Film 2", defaultValue: CDN + "assets/Qr03SvkgAz41mkdTjNXeLpjLE54.mp4" },
})
