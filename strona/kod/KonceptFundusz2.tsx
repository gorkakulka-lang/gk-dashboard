import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

// Górka & Kulka — koncept strony głównej, wersja 3.
// Jedna opowieść: Szary Dzień -> kolor. Start z grafiki Szarego Dnia, filmy z kawiarni, sklep świąteczny pod kokardą,
// wigilie firmowe, smaki spływające na rożek, kubek na wynos, święto marki (tego dnia cała strona jest szara).

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
    { f: "6jNwbhYhSQpNCiupLkUbX4Ebc.jpg", wyc: "6OiT6TePNj7plGBew2Kr0itT0.webp", w: 840, nazwa: "Sernik waniliowy", opis: "Kremowy w\u00a0środku, mocno przypieczony z\u00a0wierzchu. Świąteczna klasyka w\u00a0naszym wydaniu." },
    { f: "zdqTZNtOtNyLBT1wi6bLYKjYhM.jpg", wyc: "iP6jW8FH9UpAKGGNFZobBkVUg.webp", w: 804, nazwa: "Makowiec", opis: "Drożdżowe ciasto zwinięte z\u00a0gęstą masą makową. Bez niego nie ma Wigilii." },
    { f: "XZiPiwkX7kaehGjFJrxTCVpvoNo.jpg", wyc: "yXip6FRU4fEi08sgSqP5hq8c2uQ.webp", w: 736, nazwa: "Ciasto czekoladowe", opis: "Warstwy czekoladowego biszkoptu i\u00a0kremu pod wiórkami czekolady." },
]
const ZAMOWIENIA = "/kolekcja-swiateczna"

type Smak = { nr: string; nazwa: string[]; en: string; opis: string; kolor: string; gala: string; tekst: string }
const SMAKI: Smak[] = [
    { nr: "01", nazwa: ["Śmietanka"], en: "Whipped Cream", opis: "Biała. Uparcie prosta.", kolor: "#F3ECDC", gala: "#FFFFFF", tekst: "#111111" },
    { nr: "02", nazwa: ["Solony", "karmel"], en: "Salted Caramel", opis: "Z kawałkami czekolady. Słodki, ale z charakterem.", kolor: "#C4773B", gala: "#DC9A5E", tekst: "#111111" },
    { nr: "03", nazwa: ["Pistacja"], en: "Pistachio", opis: "Zielona bez kompromisów.", kolor: "#A9BD78", gala: "#C6D79E", tekst: "#111111" },
    { nr: "04", nazwa: ["Mascarpone", "z szafranem"], en: "Mascarpone & Saffron", opis: "I z pomarańczą. Brzmi poważnie, znika od razu.", kolor: "#FFB23E", gala: "#FFCD78", tekst: "#111111" },
    { nr: "05", nazwa: ["Beza", "dacquoise"], en: "Dacquoise Meringue", opis: "Chrupie, zanim się rozpłynie.", kolor: "#EAD2C0", gala: "#F8E9DD", tekst: "#111111" },
    { nr: "06", nazwa: ["Gruszka", "z imbirem"], en: "Pear & Ginger", opis: "Sorbet. Rozgrzewa, choć mrozi.", kolor: "#D3D77C", gala: "#E4E7A8", tekst: "#111111" },
]
// Kolory smaków jako liczby 0–1: chromowy rożek odbija kolor smaku, który właśnie spłynął.
const rgb01 = (hex: string) => [parseInt(hex.slice(1, 3), 16) / 255, parseInt(hex.slice(3, 5), 16) / 255, parseInt(hex.slice(5, 7), 16) / 255]
const SMAKI_RGB = SMAKI.map((s) => ({ a: rgb01(s.kolor), b: rgb01(s.gala) }))
// Koniec zamówień świątecznych: 22.12.2026, północ czasu polskiego.
const KONIEC_ZAMOWIEN = Date.UTC(2026, 11, 21, 23, 0, 0)
// Kapki na brzegu zalewu: położenie (ułamek szerokości), promień, długość (ułamek najdłuższej) i faza falowania.
const KAPKI = [
    { x: 0.05, r: 0.017, l: 0.5, f: 0.3 },
    { x: 0.19, r: 0.022, l: 0.95, f: 1.9 },
    { x: 0.33, r: 0.013, l: 0.3, f: 4.1 },
    { x: 0.47, r: 0.021, l: 1, f: 2.6 },
    { x: 0.6, r: 0.015, l: 0.42, f: 0.9 },
    { x: 0.75, r: 0.022, l: 0.82, f: 5.3 },
    { x: 0.9, r: 0.016, l: 0.6, f: 3.7 },
]
// Szary Dzień w podróży przez stronę: wycięty z rysunku marki (bez stolika i krzesła).
// Obrazek to faktura (mnożona przez kolor) z kanałem przezroczystości; ten sam plik jest maską koloru.
type SzaryPlik = { f: string; w: number; h: number }
const SZARY_CALY: SzaryPlik = { f: obraz("u70wwFBUSl9qRiD96vtf1wHo1NA.webp"), w: 800, h: 1002 }
// Jego własny szary (k = 0) i róż marki na wypadek, gdyby kiedyś miał się rozpogodzić.
const SZARY_OD = "#BAB3B1"
const SZARY_DO = "#F4AFC2"
const hexRgb = (h: string) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]
const mieszaj = (a: string, b: string, t: number) => {
    const x = hexRgb(a)
    const y = hexRgb(b)
    return "rgb(" + Math.round(lerp(x[0], y[0], t)) + "," + Math.round(lerp(x[1], y[1], t)) + "," + Math.round(lerp(x[2], y[2], t)) + ")"
}

// Podpisy pod rysunkiem na starcie: zmieniają się razem z klatkami.
const RYCINY = [
    "Ryc. 1 — Szary Dzień. Sam przy stoliku.",
    "Ryc. 2 — Dosiada się Kulka.",
    "Ryc. 3 — „To dla ciebie”.",
    "Ryc. 4 — Szary Dzień próbuje.",
    "Ryc. 5 — Jest uśmiech.",
    "Ryc. 6 — Rozpogodziło się.",
]

// Od podstaw: skąd bierzemy mleko, śmietankę i jajka.
// Żywy obrazek łąki. LAKA_TLO to rysunek bez ogonów, łbów i kęp trawy; te części leżą na arkuszu LAKA_CZESCI.
// LAKA_POSTACI to arkusz części Górki i Kulki z plików marki: bez żadnego wypełnienia, wnętrza kreski są przezroczyste.
const LAKA_TLO = obraz("XMzNJrpzWFFU7U5oqRAqU19G1jQ.webp")
const LAKA_CZESCI = obraz("V5OsQGCvGCiZa61xIPaff10WBU.webp")
const LAKA_POSTACI = obraz("XUWgDr4seXK0zZQTHXxzoINPWLo.webp")
const LAKA_W = 1448
const LAKA_H = 1086
const ARK_C = [760, 383]
const ARK_P = [720, 511]
// Części krów i trawy: rodzaj (o = ogniwo ogona, g = łeb skubiący, w = łeb krowy z przodu, która skubie i wącha Kulkę, n = łeb kiwający,
// k = kępa trawy, p = kępa przed postaciami),
// x, y, szer., wys. na rysunku, x i y na arkuszu, przegub x i y, wychylenie w stopniach, rytm i start w sekundach, numer ogona, numer ogniwa.
const LAKA_OPIS: (string | number)[][] = [
    ["n", 292, 340, 170, 117, 309, 8, 342.5, 438.5, 1.3, 7.5, -3.3, 0, 0], // g1
    ["w", 627, 764, 168, 235, 8, 8, 653.5, 825.5, 2.2, 3.6, -0.8, 0, 0], // g2
    ["g", 653, 484, 83, 114, 487, 8, 674.5, 512.5, 3, 3, -1.9, 0, 0], // g3
    ["g", 1008, 664, 117, 158, 184, 8, 1111.5, 706.5, 2.6, 4.2, -2.7, 0, 0], // g5
    ["g", 1189, 459, 65, 91, 676, 8, 1243.5, 488.5, 3.4, 3.3, -0.3, 0, 0], // g6
    ["p", 1041, 942, 78, 53, 447, 251, 1075.9, 990, 7, 3.4, -0.5, 0, 0], // k1
    ["k", 77, 786, 73, 67, 252, 251, 115.7, 848, 8, 2.9, -1.7, 0, 0], // k2
    ["p", 159, 934, 63, 62, 333, 251, 186, 991, 7, 3.8, -2.4, 0, 0], // k3
    ["p", 833, 888, 90, 102, 578, 8, 874.9, 985, 6, 3.2, -0.9, 0, 0], // k4
    ["p", 1196, 889, 103, 75, 85, 251, 1243.9, 959, 6, 3.6, -3.1, 0, 0], // k5
    ["k", 409, 570, 47, 36, 275, 335, 431.9, 601, 8, 2.7, -1.1, 0, 0], // k6
    ["k", 740, 582, 80, 40, 112, 335, 783.7, 617, 8, 3.1, -2, 0, 0], // k7
    ["k", 1321, 785, 69, 76, 8, 251, 1355.3, 856, 7, 3, -2.8, 0, 0], // k9
    ["o", 80, 469, 27, 36, 200, 335, 94.5, 470.5, 7, 5.6, -1.2, 1, 0], // o1.0
    ["o", 78, 498, 22, 40, 8, 335, 90, 503, 7, 5.6, -1.2, 1, 1], // o1.1
    ["o", 63, 531, 34, 40, 38, 335, 87.4, 536, 7, 5.6, -1.2, 1, 2], // o1.2
    ["o", 61, 564, 35, 56, 404, 251, 78.3, 569, 7, 5.6, -1.2, 1, 3], // o1.3
    ["o", 315, 706, 32, 50, 533, 251, 335.5, 712.5, 6, 6.4, -3, 2, 0], // o2.0
    ["o", 305, 749, 32, 48, 625, 251, 325.9, 754, 6, 6.4, -3, 2, 1], // o2.1
    ["o", 282, 790, 44, 49, 573, 251, 315.1, 795, 6, 6.4, -3, 2, 2], // o2.2
    ["o", 268, 832, 48, 72, 196, 251, 299, 837, 6, 6.4, -3, 2, 3], // o2.3
    ["o", 483, 463, 23, 35, 330, 335, 495.5, 467.5, 9, 4.6, -0.4, 3, 0], // o3.0
    ["o", 469, 491, 32, 36, 235, 335, 491.5, 496, 9, 4.6, -0.4, 3, 1], // o3.1
    ["o", 466, 520, 29, 35, 361, 335, 481.9, 525, 9, 4.6, -0.4, 3, 2], // o3.2
    ["o", 1097, 495, 27, 35, 398, 335, 1107.5, 500.5, 8, 5, -2.1, 4, 0], // o4.0
    ["o", 1098, 523, 35, 35, 433, 335, 1112.8, 528, 8, 5, -2.1, 4, 1], // o4.1
    ["o", 1109, 551, 31, 45, 665, 251, 1121.9, 556, 8, 5, -2.1, 4, 2], // o4.2
    ["o", 1329, 641, 24, 40, 80, 335, 1339.5, 644.5, 8, 6, -4.4, 5, 0], // o5.0
    ["o", 1334, 674, 31, 42, 704, 251, 1343.9, 679, 8, 6, -4.4, 5, 1], // o5.1
    ["o", 1336, 709, 35, 35, 476, 335, 1350.6, 714, 8, 6, -4.4, 5, 2], // o5.2
    ["o", 1354, 483, 25, 26, 519, 335, 1360.5, 485.5, 11, 4.2, -2.6, 6, 0], // o6.0
    ["o", 1355, 502, 24, 22, 552, 335, 1367, 507, 11, 4.2, -2.6, 6, 1], // o6.1
]
// Górka i Kulka: ramka na rysunku (x, y, skala), rozmiar ramki w pikselach źródła, zwrot (1 = w prawo), liczba kroków wejścia, czas kroku,
// uniesienie stopy, wysokość podskoku, sprężystość tułowia; osie obrotu nóg, tułowia i głowy; punkt zawieszenia wiadra i długość wahadła (puste, gdy bez wiadra);
// czy stoi przy łbie krowy z przodu (krowa go wącha); nogi (przednia, tylna): kąt, promień, kierunek podeszwy, kostka;
// części w kolejności: noga tylna, stopa tylna, noga przednia, stopa przednia, podkład głowy, tułów, głowa, wiadro, pięść nad pałąkiem, przedramię z lodem (brak = null):
// x, y, szer., wys. w ramce, potem x, y, szer., wys. na arkuszu.
type LakaPostac = { x: number; y: number; s: number; w: number; h: number; dir: number; kroki: number; takt: number; unos: number; skok: number; zgniot: number; osNog: number[]; osTulowia: number[]; osGlowy: number[]; osWiadra: number[]; osReki: number[]; przyLbie: number; nogi: number[][]; cz: (number[] | null)[] }
const LAKA_POSTACIE: LakaPostac[] = [
    {
        x: 180, y: 686, s: 0.40146, w: 453, h: 822, dir: 1, kroki: 5, takt: 0.54, unos: 22, skok: 50, zgniot: 0.012,
        osNog: [222.5, 166.5], osTulowia: [226.5, 330.5], osGlowy: [249.5, 182.5],
        osWiadra: [229.5, 378.5, 140], osReki: [], przyLbie: 0,
        nogi: [[10.26, 629.1, -40.5, 334.5, 785.5], [-14.5, 631.1, 34.2, 64.5, 777.5]],
        cz: [[38.88, 405.31, 148.47, 382.3, 270, 6, 84, 216], [44.19, 761.05, 81.3, 61.95, 199, 452, 46, 35], [226.23, 440.7, 116.65, 366.37, 360, 6, 66, 207], [318.14, 727.43, 95.44, 88.49, 83, 452, 54, 50], null, [0, 153.98, 456, 426.54, 6, 6, 258, 241], [102.51, 0, 226.23, 200, 576, 253, 128, 113], [143.16, 366.37, 173.21, 228.32, 168, 253, 98, 129], [167.91, 325.66, 125.49, 93.8, 6, 452, 71, 53], null],
    }, // Górka
    {
        x: 792, y: 630, s: 0.50734, w: 326, h: 749, dir: -1, kroki: 7, takt: 0.5, unos: 15, skok: 56, zgniot: 0.022,
        osNog: [172.5, 323.5], osTulowia: [165.5, 340.5], osGlowy: [173.5, 190.5],
        osWiadra: [], osReki: [282.5, 331.5], przyLbie: 1,
        nogi: [[-15.26, 410.5, -142, 64.5, 719.5], [13.38, 401.9, 146.9, 265.5, 714.5]],
        cz: [[186.85, 445.53, 95.03, 264.73, 103, 253, 59, 164], [217.45, 697.34, 69.26, 51.66, 251, 452, 43, 32], [28.99, 427.77, 146.58, 311.55, 6, 253, 91, 193], [0, 669.9, 80.54, 74.25, 143, 452, 50, 46], [77.32, 0, 135.3, 203.39, 272, 253, 84, 126], [0, 175.95, 330.21, 329.3, 432, 6, 205, 204], [77.32, 0, 132.08, 201.78, 362, 253, 82, 125], null, null, [86.98, 206.62, 193.29, 185.64, 450, 253, 120, 115]],
    }, // Kulka
]
// Prawdziwe krowy: film gospodarstwa na YouTubie, od ujęć z pastwiska.
const JUCHOWO_FILM = "https://www.youtube.com/watch?v=MCZsIUALDIY&t=22s"
type Zrodlo = { co: string; skad: string; opis: string; link?: string[] }
const ZRODLA: Zrodlo[] = [
    { co: "Mleko i śmietanka", skad: "Juchowo Farm", opis: "Mleko sienne z\u00a0biodynamicznego gospodarstwa. Latem łąka, zimą siano. Wyjątkowe mleko.", link: ["juchowo.org", "https://www.juchowo.org/"] },
    { co: "Jajka", skad: "Rozlewiska nad Wartą", opis: "Od\u00a0kur z\u00a0wolnego wybiegu." },
    { co: "Lody i wypieki", skad: "Nasza pracownia", opis: "Tu z\u00a0mleka, śmietanki i\u00a0jajek powstaje cała\u00a0reszta." },
]

const MANIFEST =
    "~Szary ~Dzień przychodzi do każdego. Do Gorzowa i do Nowego Jorku. W poniedziałki, w listopadzie, po pracy. Nie przeganiamy go. Częstujemy. Od dziesięciu lat robimy lody, po których dzień zmienia *kolor. Teraz zabieramy ten *kolor w świat. Po jednej kulce."

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

// Termin wigilii: kalendarz w stylu strony zamiast systemowego. Miesiące liczone dopiero po otwarciu (bez rozjazdu z wersją z serwera).
const MIESIACE = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"]
const MIESIACE_D = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"]
const DNI_TYG = ["pn", "wt", "śr", "cz", "pt", "so", "nd"]
const DNI_PELNE = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"]

function Termin(props: { id: string; etykieta: string; dialog: string; odDzis?: boolean }) {
    const [otwarty, ustawOtwarty] = useState(false)
    const [wybrany, ustawWybrany] = useState<null | { r: number; m: number; d: number }>(null)
    const [widok, ustawWidok] = useState(-1) // rok * 12 + miesiąc
    const [dzis, ustawDzis] = useState(-1) // rok * 10000 + miesiąc * 100 + dzień
    const ref = useRef<HTMLDivElement>(null)
    const otworz = () => {
        const t = new Date()
        const d0 = t.getFullYear() * 10000 + t.getMonth() * 100 + t.getDate()
        ustawDzis(d0)
        if (widok < 0) ustawWidok(wybrany ? wybrany.r * 12 + wybrany.m : props.odDzis ? t.getFullYear() * 12 + t.getMonth() : t.getFullYear() * 12 + 11)
        ustawOtwarty(true)
    }
    useEffect(() => {
        if (!otwarty) return
        const poza = (e: Event) => {
            if (ref.current && !ref.current.contains(e.target as Node)) ustawOtwarty(false)
        }
        const klawisz = (e: KeyboardEvent) => {
            if (e.key === "Escape") ustawOtwarty(false)
        }
        document.addEventListener("pointerdown", poza)
        document.addEventListener("keydown", klawisz)
        return () => {
            document.removeEventListener("pointerdown", poza)
            document.removeEventListener("keydown", klawisz)
        }
    }, [otwarty])
    const iso = wybrany ? wybrany.r + "-" + dwa(wybrany.m + 1) + "-" + dwa(wybrany.d) : ""
    const opis = wybrany ? DNI_PELNE[new Date(wybrany.r, wybrany.m, wybrany.d).getDay()] + ", " + wybrany.d + " " + MIESIACE_D[wybrany.m] + " " + wybrany.r : "Wybierz dzień"
    const rok = Math.floor(widok / 12)
    const mies = widok % 12
    const komorki: Array<null | { d: number; klucz: number }> = []
    if (widok >= 0) {
        const pierwszy = (new Date(rok, mies, 1).getDay() + 6) % 7
        const ile = new Date(rok, mies + 1, 0).getDate()
        for (let i = 0; i < pierwszy; i++) komorki.push(null)
        for (let d = 1; d <= ile; d++) komorki.push({ d, klucz: rok * 10000 + mies * 100 + d })
    }
    const minWidok = dzis >= 0 ? Math.floor(dzis / 10000) * 12 + (Math.floor(dzis / 100) % 100) : 0
    return (
        <div className="gk2-pole gk2-termin" ref={ref}>
            <span className="gk2-e" id={"gk2-termin-etykieta-" + props.id}>
                {props.etykieta}
            </span>
            <button
                type="button"
                className={"gk2-termin-pole" + (wybrany ? " gk2-termin-pelne" : "")}
                aria-haspopup="dialog"
                aria-expanded={otwarty}
                aria-labelledby={"gk2-termin-etykieta-" + props.id + " gk2-termin-wartosc-" + props.id}
                onClick={() => (otwarty ? ustawOtwarty(false) : otworz())}
            >
                <span id={"gk2-termin-wartosc-" + props.id}>{opis}</span>
                <i aria-hidden="true">{otwarty ? "↑" : "↓"}</i>
            </button>
            <input className="gk2-termin-ukryte" type="text" name="termin" required value={iso} onChange={() => {}} onInvalid={() => otworz()} tabIndex={-1} aria-hidden="true" />
            {otwarty && widok >= 0 ? (
                <div className="gk2-kalendarz" role="dialog" aria-label={props.dialog}>
                    <div className="gk2-kalendarz-gora">
                        <button type="button" aria-label="Poprzedni miesiąc" disabled={widok <= minWidok} onClick={() => ustawWidok(widok - 1)}>
                            ←
                        </button>
                        <span className="gk2-e">{MIESIACE[mies] + " " + rok}</span>
                        <button type="button" aria-label="Następny miesiąc" disabled={widok >= minWidok + 14} onClick={() => ustawWidok(widok + 1)}>
                            →
                        </button>
                    </div>
                    <div className="gk2-kalendarz-siatka">
                        {DNI_TYG.map((d) => (
                            <span key={d} className="gk2-e gk2-kalendarz-dt" aria-hidden="true">
                                {d}
                            </span>
                        ))}
                        {komorki.map((c, i) =>
                            c ? (
                                <button
                                    key={c.klucz}
                                    type="button"
                                    disabled={c.klucz < dzis}
                                    aria-pressed={!!wybrany && wybrany.r === rok && wybrany.m === mies && wybrany.d === c.d}
                                    aria-label={c.d + " " + MIESIACE_D[mies] + " " + rok}
                                    className={c.klucz === dzis ? "gk2-kalendarz-dzis" : undefined}
                                    onClick={() => {
                                        ustawWybrany({ r: rok, m: mies, d: c.d })
                                        ustawOtwarty(false)
                                    }}
                                >
                                    {c.d}
                                </button>
                            ) : (
                                <span key={"p" + i} />
                            )
                        )}
                    </div>
                </div>
            ) : null}
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
            <Termin id="wigilia" etykieta="Termin" dialog="Wybierz dzień wigilii firmowej" />
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

// Prośba o stolik w Kawiarni Centrum: kawiarnia oddzwania albo pisze SMS. Makieta: nic nie jest wysyłane.
const GODZINY_STOLIKA = (() => {
    const g: string[] = []
    for (let h = 10; h <= 18; h++) {
        g.push(h + ":00")
        if (h < 18) g.push(h + ":30")
    }
    return g
})()
function Stolik() {
    const [wyslane, ustawWyslane] = useState(false)
    if (wyslane)
        return (
            <div className="gk2-zapytanie-dzieki">
                <p className="gk2-d gk2-h3">Dziękujemy. Oddzwonimy albo napiszemy SMS.</p>
                <p className="gk2-drobny">Tak będzie wyglądać potwierdzenie. To makieta: prośba jeszcze nigdzie nie trafia.</p>
            </div>
        )
    return (
        <form
            className="gk2-zapytanie gk2-stolik-formularz"
            onSubmit={(e) => {
                e.preventDefault()
                ustawWyslane(true)
            }}
        >
            <Termin id="stolik" etykieta="Dzień" dialog="Wybierz dzień rezerwacji" odDzis />
            <label className="gk2-pole">
                <span className="gk2-e">Godzina</span>
                <select name="godzina" required defaultValue="">
                    <option value="" disabled>
                        Wybierz
                    </option>
                    {GODZINY_STOLIKA.map((g) => (
                        <option key={g} value={g}>
                            {g}
                        </option>
                    ))}
                </select>
            </label>
            <label className="gk2-pole">
                <span className="gk2-e">Liczba osób</span>
                <select name="osoby" required defaultValue="2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>
            </label>
            <label className="gk2-pole">
                <span className="gk2-e">Imię</span>
                <input type="text" name="imie" required autoComplete="given-name" placeholder="np. Ola" />
            </label>
            <label className="gk2-pole">
                <span className="gk2-e">Telefon</span>
                <input type="tel" name="telefon" required autoComplete="tel" inputMode="tel" placeholder="np. 601 234 567" />
            </label>
            <div className="gk2-zapytanie-dol">
                <button type="submit" className="gk2-przycisk">
                    Poproś o stolik
                </button>
                <span className="gk2-drobny">{"Więcej niż 8 osób albo firma? Napisz w\u00a0sprawie wigilii firmowej."}</span>
            </div>
        </form>
    )
}

// Kubek na wynos: wycięty z pliku marki, a etykieta jest złożona na nowo (ostra w każdym rozmiarze).
// Szary Dzień wycięty z rysunku marki. k = ile koloru (0 = jego własny szary).
function Szary(props: { p: SzaryPlik; k: number; className?: string; lustro?: boolean }) {
    const m = "url(" + props.p.f + ")"
    return (
        <span className={"gk2-sz" + (props.className ? " " + props.className : "")} data-sz="" aria-hidden="true" style={{ ["--sz" as any]: mieszaj(SZARY_OD, SZARY_DO, props.k), aspectRatio: props.p.w + " / " + props.p.h }}>
            <span className={"gk2-sz-ruch" + (props.lustro ? " gk2-sz-lustro" : "")}>
                <i className="gk2-sz-kolor" style={{ WebkitMaskImage: m, maskImage: m }} />
                <img className="gk2-sz-faktura" src={props.p.f} width={props.p.w} height={props.p.h} alt="" loading="lazy" decoding="async" draggable={false} />
            </span>
        </span>
    )
}

function Kubek(props: { tiltRef: (el: HTMLDivElement | null) => void }) {
    const [wybrany, ustawWybrany] = useState(0)
    const [zapisany, ustawZapisany] = useState(false)
    const smak = SMAKI[wybrany]
    const L = P.logotyp
    const okno = [L.b[0] * L.w, L.b[1] * L.h, (L.b[2] - L.b[0]) * L.w, (L.b[3] - L.b[1]) * L.h].map((n) => n.toFixed(1)).join(" ")
    return (
        <section className="gk2-kubek" id="gk2-kubek" data-motyw="jasny">
            <div className="gk2-kubek-tekst">
                <div className="gk2-e">10 — Na wynos</div>
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

// Żywy obrazek: krowy na łące. Ogony, łby i kępy trawy są osobnymi kawałkami arkusza i ruszają się same,
// dopóki obrazek widać na ekranie. Górka i Kulka wchodzą na łąkę z dwóch stron razem z przewijaniem (silnik).
// Przy ograniczonym ruchu zostaje zwykły, nieruchomy rysunek z postaciami na miejscach.
function procent(v: number) {
    return (Math.round(v * 100000) / 1000).toString() + "%"
}

// Styl kawałka wyciętego z arkusza: położenie w ramce rodzica (pw x ph), wycinek arkusza (ark), punkt obrotu.
function sprajt(x: number, y: number, w: number, h: number, ax: number, ay: number, aw: number, ah: number, ox: number, oy: number, pw: number, ph: number, ark: number[]): any {
    return {
        left: procent(x / pw),
        top: procent(y / ph),
        width: procent(w / pw),
        height: procent(h / ph),
        backgroundSize: procent(ark[0] / aw) + " " + procent(ark[1] / ah),
        backgroundPosition: procent(ax / (ark[0] - aw)) + " " + procent(ay / (ark[1] - ah)),
        transformOrigin: procent((ox - x) / w) + " " + procent((oy - y) / h),
    }
}

function czescStyl(c: (string | number)[]): any {
    const x = c[1] as number, y = c[2] as number, w = c[3] as number, h = c[4] as number
    return sprajt(x, y, w, h, c[5] as number, c[6] as number, w, h, c[7] as number, c[8] as number, LAKA_W, LAKA_H, ARK_C)
}

// Punkt obrotu kawałka postaci: nogi kręcą się wokół wspólnej osi, stopy w kostkach, tułów wokół środka, głowa u nasady szyi.
function kawalekOs(p: LakaPostac, j: number): number[] {
    if (j === 0 || j === 2) return p.osNog
    if (j === 1) return [p.nogi[1][3], p.nogi[1][4]]
    if (j === 3) return [p.nogi[0][3], p.nogi[0][4]]
    if (j === 5 || j === 8) return p.osTulowia
    if (j === 7) return p.osWiadra
    if (j === 9) return p.osReki
    return p.osGlowy
}

function kawalekStyl(p: LakaPostac, j: number): any {
    const c = p.cz[j] as number[]
    const os = kawalekOs(p, j)
    return sprajt(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], os[0], os[1], p.w, p.h, ARK_P)
}

// Ruch na łące. Wszystko liczy się na czas, klatka po klatce, niezależnie od przewijania:
// krowy machają giętkimi ogonami i skubią trawę, trawa faluje z wiatrem, a Górka i Kulka wchodzą krokami
// (stopa stoi na ziemi, ciało przechodzi nad nią), podskakują na powitanie i zostają. Zwraca funkcję sprzątającą.
function lakaRuch(laka: HTMLElement, gotowa: () => boolean) {
    const okno = (laka.parentElement || laka) as HTMLElement
    const RAD = Math.PI / 180
    const DWA_PI = Math.PI * 2
    const sin = Math.sin
    const cos = Math.cos
    const gl = (v: number) => {
        const x = clamp(v, 0, 1)
        return x * x * (3 - 2 * x)
    }
    const los = (x: number) => {
        const v = sin(x * 12.9898) * 43758.5453
        return v - Math.floor(v)
    }
    const pr = (v: number) => v.toFixed(2) + "%"
    const kat180 = (v: number) => ((((v + 180) % 360) + 360) % 360) - 180
    const ROZBIEG = 1.0 // pierwszy krok rusza łagodnie przez sekundę, żeby wiadro nie wystrzeliło do tyłu

    // Części krów i trawy
    const cz: Array<HTMLElement | null> = LAKA_OPIS.map(() => null)
    const lista = laka.querySelectorAll("[data-cz]")
    for (let i = 0; i < lista.length; i++) {
        const e = lista[i] as HTMLElement
        cz[parseInt(e.getAttribute("data-cz") || "0", 10)] = e
    }
    const ogony: number[][] = []
    for (let i = 0; i < LAKA_OPIS.length; i++) {
        const c = LAKA_OPIS[i]
        if (c[0] !== "o") continue
        const n = c[12] as number
        if (!ogony[n]) ogony[n] = []
        ogony[n][c[13] as number] = i
    }

    // Postaci: model chodu wynika z rysunku. Obie nogi kręcą się wokół jednej osi, w spoczynku stoją w rozkroku +-alf.
    const postaci = LAKA_POSTACIE.map((p, k) => {
        const box = laka.querySelector('[data-postac="' + k + '"]') as HTMLElement | null
        const kaw: Array<HTMLElement | null> = [null, null, null, null, null, null, null, null, null, null]
        if (box) {
            const l = box.querySelectorAll("[data-kaw]")
            for (let i = 0; i < l.length; i++) {
                const e = l[i] as HTMLElement
                kaw[parseInt(e.getAttribute("data-kaw") || "0", 10)] = e
            }
        }
        const cien = box ? (box.querySelector("[data-cien]") as HTMLElement | null) : null
        const F = p.nogi[0]
        const B = p.nogi[1]
        const alf = Math.abs(F[0] - B[0]) / 2
        const r = (F[1] + B[1]) / 2
        // nachylenie podeszwy: dodatnie = czubek buta w górze
        const nach = (ks: number) => kat180(p.dir > 0 ? -ks : ks - 180)
        // czas wejścia: łagodny rozbieg, równe kroki, a ostatni krok hamuje aż do zatrzymania
        const czas = (p.kroki + 1) * p.takt + ROZBIEG / 2
        return { p, box, kaw, cien, gam: (F[0] + B[0]) / 2, alf, r, krok: 2 * r * sin(alf * RAD), uderz: nach(F[2]), odbij: nach(B[2]), czas, start: 0, faza: k * 2.4 + 0.7, zwloka: k === 0 ? 0.1 : 0, pod: -1, th: 0, om: 0 }
    })
    let najdl = 0
    for (const f of postaci) najdl = Math.max(najdl, f.czas)
    for (const f of postaci) f.start = f.czas < najdl ? Math.max(0, najdl - f.czas - 0.15) : 0
    const T_SKOK = najdl + 0.45 // wspólny podskok na powitanie
    const T_ZYCIE = T_SKOK + 1.0 // odtąd postaci stoją i żyją
    const POD_OD = 840 // podkład pod głową Kulki gaśnie między tymi pozycjami (piksele rysunku): dalej w lewo jest już sama łąka
    const POD_DO = 913
    // Krowa z przodu wącha Kulkę: przerywa skubanie, podnosi łeb w jego stronę i węszy („Muu?”),
    // a Kulka odskakuje krok w tył i podnosi loda pod samą brodę. Pierwszy raz zaraz po powitaniu, potem co 12 sekund.
    const T_WACHA = T_SKOK + 0.9
    const CO_ILE_WACHA = 12
    const fazaWachania = (tw: number) => (tw < T_WACHA ? -1 : (tw - T_WACHA) % CO_ILE_WACHA)
    const wacha = (tw: number) => {
        const x = fazaWachania(tw)
        if (x < 0) return 0
        return x < 0.6 ? gl(x / 0.6) : x < 2.9 ? 1 : x < 3.7 ? 1 - gl((x - 2.9) / 0.8) : 0
    }
    // Kulka reaguje z opóźnieniem: szybki odskok, a gdy krowa wraca do trawy, spokojny powrót na miejsce.
    const odskok = (tw: number) => {
        const x = fazaWachania(tw) - 0.45
        if (x < 0) return { o: 0, lot: 0 }
        if (x < 0.3) return { o: 1 - Math.pow(1 - x / 0.3, 3), lot: sin((Math.PI * x) / 0.3) }
        if (x < 2.75) return { o: 1, lot: 0 }
        if (x < 3.55) {
            const v = (x - 2.75) / 0.8
            return { o: 1 - gl(v), lot: 0.45 * sin(Math.PI * v) }
        }
        return { o: 0, lot: 0 }
    }

    // Ile kroków jest już za postacią w chwili tau.
    const krokiZa = (p: LakaPostac, tau: number) => {
        if (tau <= 0) return 0
        const te = tau < ROZBIEG ? (tau * tau) / (2 * ROZBIEG) : tau - ROZBIEG / 2
        const n1 = (p.kroki - 1) * p.takt
        if (te < n1) return te / p.takt
        const x = (te - n1) / (2 * p.takt)
        return x < 1 ? p.kroki - (1 - x) * (1 - x) : p.kroki
    }

    // Poza postaci w chwili tw (bez dotykania strony), w pikselach jej rysunku.
    const poza = (f: (typeof postaci)[number], tw: number) => {
        const p = f.p
        const tau = tw < 0 ? -1 : tw - f.start
        const d = krokiZa(p, tau)
        let fiF = f.alf, fiB = -f.alf, kF = 1, kB = 1, nF = f.uderz, nB = f.odbij
        let by = 0, rho = 0, eta = 0, zg = 0, skok = 0
        let wyrown = 0 // w marszu obie nogi liczą się jak równej długości; przy zatrzymaniu wracają do długości z rysunku
        if (d < p.kroki) {
            const n = Math.min(Math.floor(d), p.kroki - 1)
            const u = d - n
            const u2 = u * u
            const u3 = u2 * u
            // noga podporowa: kostka stoi w miejscu, więc kąt wynika z drogi ciała
            const fiSt = Math.asin(sin(f.alf * RAD) * (1 - 2 * u)) / RAD
            // noga w locie: od tyłu do przodu, z rozpędem zgranym z ziemią na obu końcach
            const m = -Math.tan(f.alf * RAD) / RAD
            const fiSw = (2 * u3 - 3 * u2 + 1) * -f.alf + (u3 - 2 * u2 + u) * m + (-2 * u3 + 3 * u2) * f.alf + (u3 - u2) * m
            const lot = Math.pow(sin(Math.PI * u), 1.3)
            const kSw = 1 - (p.unos / f.r) * lot
            // stopa podporowa: pięta, cała podeszwa, palce; stopa w locie: od odbicia do pięty
            const nSt = u < 0.22 ? f.uderz * (1 - gl(u / 0.22)) : u > 0.6 ? f.odbij * gl((u - 0.6) / 0.4) : 0
            const nSw = f.odbij + (f.uderz - f.odbij) * gl(u)
            // ciało unosi się, gdy przechodzi nad nogą podporową: łagodnym łukiem, bez twardego stuknięcia przy stawianiu stopy.
            // Noga podporowa ugina się o ułamek procenta, żeby kostka mimo to została dokładnie na ziemi.
            by = -1.35 * f.r * (1 - cos(f.alf * RAD)) * Math.pow(sin(Math.PI * u), 2)
            const kSt = (f.r * cos(f.alf * RAD) - by) / (f.r * cos(fiSt * RAD))
            if ((p.kroki - n) % 2 === 1) {
                fiF = fiSw
                kF = kSw
                nF = nSw
                fiB = fiSt
                kB = kSt
                nB = nSt
            } else {
                fiB = fiSw
                kB = kSw
                nB = nSw
                fiF = fiSt
                kF = kSt
                nF = nSt
            }
            const gasnie = p.kroki - n === 1 ? gl(u) : 0
            wyrown = 1 - gasnie
            rho = p.dir * (2.2 + 0.8 * sin(DWA_PI * u)) * (1 - gasnie)
            eta = -p.dir * 1.8 * sin(DWA_PI * (u - 0.15)) * (1 - 0.6 * gasnie)
            zg = u < 0.3 ? p.zgniot * Math.pow(sin((Math.PI * u) / 0.3), 2) : 0
        }
        if (tau >= f.czas) {
            // zatrzymanie: tułów i głowa jeszcze chwilę się bujają
            const s1 = tau - f.czas
            rho += p.dir * 1.3 * Math.exp(-3.2 * s1) * sin(DWA_PI * 1.5 * s1)
            eta -= p.dir * 2.4 * Math.exp(-2.6 * s1) * sin(DWA_PI * 1.2 * s1)
        }
        if (tw >= T_SKOK + f.zwloka) {
            const x = tw - T_SKOK - f.zwloka
            if (x < 0.16) zg += 0.05 * gl(x / 0.16)
            else if (x < 0.5) {
                const v = (x - 0.16) / 0.34
                skok = -p.skok * 4 * v * (1 - v)
                zg += 0.05 * (1 - gl(v / 0.25)) - 0.03 * sin(Math.PI * v)
            } else if (x < 0.74) {
                const a = (x - 0.5) / 0.24
                zg += 0.04 * sin(Math.PI * a) * (1 - 0.4 * a)
            }
        }
        if (tw >= T_ZYCIE) {
            const s2 = tw - T_ZYCIE
            const b = gl(s2 / 1.2)
            rho += b * 0.7 * sin((DWA_PI * s2) / 5.3 + f.faza)
            eta += b * (1.5 * sin((DWA_PI * s2) / 6.1 + 2 * f.faza) + 0.6 * sin((DWA_PI * s2) / 2.7 + f.faza))
            zg += b * 0.005 * sin((DWA_PI * s2) / 3.4 + f.faza)
            // co kilka sekund dwa stuknięcia czubkiem buta
            const xt = (s2 + f.faza * 1.9) % (6.3 + f.faza * 0.7)
            const st = xt < 0.24 ? Math.pow(sin((Math.PI * xt) / 0.24), 2) : xt > 0.32 && xt < 0.56 ? Math.pow(sin((Math.PI * (xt - 0.32)) / 0.24), 2) : 0
            nF -= 20 * st
            // i krótki przysiad z radości
            const xb = (s2 + f.faza * 2.6) % 11.4
            if (xb < 0.5) zg += 0.03 * Math.pow(sin((Math.PI * xb) / 0.5), 2)
        }
        let cofa = 0
        let reka = 0
        if (p.przyLbie) {
            // krowa wącha: Kulka odskakuje w tył, odchyla się i podnosi loda pod brodę, z dala od krowiego nosa
            const r = odskok(tw)
            cofa = 46 * r.o
            by -= 26 * r.lot
            rho -= p.dir * 9 * r.o
            eta -= p.dir * 5 * r.o
            reka = 36 * gl(r.o * 1.25)
        }
        // Droga do miejsca. Ziemia pod stopami z rysunku nie jest idealnie pozioma (pięta przedniej stopy stoi odrobinę niżej),
        // więc ciało idzie po tej samej, lekko pochyłej linii: wtedy stopa podporowa nie drga ani w poziomie, ani w pionie.
        const zostalo = (p.kroki - d) * f.krok
        const bx = -p.dir * (zostalo * cos(f.gam * RAD) + cofa)
        const nadZiemia = by + skok // o tyle ciało jest teraz wyżej, niż stoi ziemia (ujemne = w górze)
        by += p.dir * zostalo * sin(f.gam * RAD)
        return { d, bx, by, skok, nadZiemia, rho, eta, zg, fiF, fiB, kF, kB, nF, nB, wyrown, reka }
    }

    // Gdzie trafia punkt przyczepiony do tułowia, gdy tułów się przechyla i sprężynuje (piksele rysunku postaci, względem ramki).
    const naTulowiu = (p: LakaPostac, q: ReturnType<typeof poza>, x: number, y: number) => {
        const sx = 1 + q.zg * 0.55
        const sy = 1 - q.zg
        const wx = x - p.osTulowia[0]
        const wy = y - p.osTulowia[1]
        const c = cos(q.rho * RAD)
        const s = sin(q.rho * RAD)
        return [p.osTulowia[0] + c * wx * sx - s * wy * sy, p.osTulowia[1] + s * wx * sx + c * wy * sy + q.zg * p.h * 0.22]
    }

    // Wiadro wisi na pałąku jak wahadło: grawitacja je prostuje, a ruch dłoni (start, kroki, zatrzymanie, podskok) je rozbuja.
    const wahadlo = (f: (typeof postaci)[number], tw: number, dt: number) => {
        const p = f.p
        if (p.osWiadra.length < 3) return
        if (tw < 0) {
            f.th = 0
            f.om = 0
            return
        }
        const g = (9.81 / 1.65) * p.h // przyspieszenie ziemskie w pikselach rysunku (postać ma około 1,65 m)
        const L = p.osWiadra[2]
        const tlum = 2 * 0.1 * Math.sqrt(g / L)
        const h = 1 / 240
        const zaczep = (t: number) => {
            const q = poza(f, t)
            const w = naTulowiu(p, q, p.osWiadra[0], p.osWiadra[1])
            return [q.bx + w[0], q.by + q.skok + w[1]]
        }
        const n = Math.max(1, Math.min(48, Math.ceil(dt / h)))
        const k = dt / n
        let t = tw - dt
        for (let i = 0; i < n; i++) {
            t += k
            const a = zaczep(t - h)
            const b = zaczep(t)
            const c = zaczep(t + h)
            const ax = clamp((a[0] - 2 * b[0] + c[0]) / (h * h), -40000, 40000)
            const ay = clamp((a[1] - 2 * b[1] + c[1]) / (h * h), -40000, 40000)
            f.om += ((ax * cos(f.th) - (g - ay) * sin(f.th)) / L - tlum * f.om) * k
            f.th = clamp(f.th + f.om * k, -0.9, 0.9)
        }
    }

    const ustaw = (f: (typeof postaci)[number], tw: number, dt: number) => {
        const p = f.p
        const box = f.box
        if (!box) return
        const F = p.nogi[0]
        const B = p.nogi[1]
        const q = poza(f, tw)
        wahadlo(f, tw, dt)
        box.style.transform = "translate3d(" + pr((q.bx / p.w) * 100) + "," + pr(((q.by + q.skok) / p.h) * 100) + ",0)"
        // cień zostaje na ziemi, a w podskoku robi się mniejszy
        if (f.cien) f.cien.style.transform = "translate(0," + pr((-q.nadZiemia / (p.h * 0.056)) * 100) + ") scale(" + (1 + (q.skok / p.skok) * 0.22).toFixed(3) + ")"
        const noga = (e: HTMLElement | null, st: HTMLElement | null, g: number[], fi: number, k0: number, nachyl: number, c: number[] | null) => {
            // kąt nogi od pionu po obrocie i jej długość (skalowanie dokładnie wzdłuż osi nogi)
            const cel = f.gam + p.dir * fi
            const k = k0 * (1 + (f.r / g[1] - 1) * q.wyrown)
            if (e) e.style.transform = "rotate(" + (-cel).toFixed(2) + "deg) scaleY(" + k.toFixed(4) + ") rotate(" + g[0].toFixed(2) + "deg)"
            if (st && c) {
                // stopa: kostka jedzie razem z nogą, a podeszwa trzyma własny kąt względem ziemi
                const dx = k * g[1] * sin(cel * RAD) - (g[3] - p.osNog[0])
                const dy = k * g[1] * cos(cel * RAD) - (g[4] - p.osNog[1])
                const obr = kat180((p.dir > 0 ? 0 : 180) - p.dir * nachyl - g[2])
                st.style.transform = "translate(" + pr((dx / c[2]) * 100) + "," + pr((dy / c[3]) * 100) + ") rotate(" + obr.toFixed(2) + "deg)"
            }
        }
        noga(f.kaw[0], f.kaw[1], B, q.fiB, q.kB, q.nB, p.cz[1])
        noga(f.kaw[2], f.kaw[3], F, q.fiF, q.kF, q.nF, p.cz[3])
        // tułów: sprężynuje i przysiada; głowa siedzi na nim i kiwa się z opóźnieniem
        const sx = 1 + q.zg * 0.55
        const sy = 1 - q.zg
        const siad = q.zg * p.h * 0.22
        const ruch = (c: number[]) => "translate(0," + pr((siad / c[3]) * 100) + ") rotate(" + q.rho.toFixed(2) + "deg) scale(" + sx.toFixed(4) + "," + sy.toFixed(4) + ")"
        const tul = f.kaw[5]
        const ct = p.cz[5]
        if (tul && ct) tul.style.transform = ruch(ct)
        // pięść nad pałąkiem wiadra to kawałek tułowia: rusza się dokładnie tak samo
        const piesc = f.kaw[8]
        const cpi = p.cz[8]
        if (piesc && cpi) piesc.style.transform = ruch(cpi)
        const wia = f.kaw[7]
        const cw = p.cz[7]
        if (wia && cw && p.osWiadra.length > 2) {
            const w = naTulowiu(p, q, p.osWiadra[0], p.osWiadra[1])
            wia.style.transform = "translate(" + pr(((w[0] - p.osWiadra[0]) / cw[2]) * 100) + "," + pr(((w[1] - p.osWiadra[1]) / cw[3]) * 100) + ") rotate(" + (f.th / RAD).toFixed(2) + "deg)"
        }
        // przedramię z lodem kręci się w łokciu, a łokieć jedzie razem z tułowiem
        const rk = f.kaw[9]
        const crk = p.cz[9]
        if (rk && crk && p.osReki.length > 1) {
            const w = naTulowiu(p, q, p.osReki[0], p.osReki[1])
            rk.style.transform = "translate(" + pr(((w[0] - p.osReki[0]) / crk[2]) * 100) + "," + pr(((w[1] - p.osReki[1]) / crk[3]) * 100) + ") rotate(" + (q.rho - p.dir * q.reka).toFixed(2) + "deg)"
        }
        const gw = naTulowiu(p, q, p.osGlowy[0], p.osGlowy[1])
        const gx = gw[0] - p.osGlowy[0]
        const gy = gw[1] - p.osGlowy[1]
        const obrot = ") rotate(" + (q.rho + q.eta).toFixed(2) + "deg)"
        const glo = f.kaw[6]
        const cg = p.cz[6]
        if (glo && cg) glo.style.transform = "translate(" + pr((gx / cg[2]) * 100) + "," + pr((gy / cg[3]) * 100) + obrot
        const pod = f.kaw[4]
        const cp = p.cz[4]
        if (pod && cp) {
            // Kulka przechodzi przed krową: wtedy wnętrze jego głowy dostaje kolor łąki, żeby krowa nie prześwitywała przez twarz.
            // Na otwartej łące podkład znika i głowa jest znów przezroczysta.
            pod.style.transform = "translate(" + pr((gx / cp[2]) * 100) + "," + pr((gy / cp[3]) * 100) + obrot
            const o = Math.round(gl((p.x + q.bx * p.s - POD_OD) / (POD_DO - POD_OD)) * 100)
            if (o !== f.pod) {
                f.pod = o
                pod.style.opacity = (o / 100).toString()
            }
        }
    }

    const muu = laka.querySelector("[data-muu]") as HTMLElement | null
    let muuStan = ""
    const krowy = (t: number, tw: number) => {
        if (muu) {
            const x = fazaWachania(tw)
            const v = x < 0.5 || x > 2.85 ? 0 : x < 0.72 ? gl((x - 0.5) / 0.22) : x > 2.6 ? 1 - gl((x - 2.6) / 0.25) : 1
            const s = v <= 0 ? "" : v.toFixed(2)
            if (s !== muuStan) {
                muuStan = s
                muu.style.opacity = s || "0"
                muu.style.transform = "translate(-50%, -100%) scale(" + (0.6 + 0.4 * v + (v > 0 && v < 1 ? 0.08 * sin(Math.PI * v) : 0)).toFixed(3) + ") rotate(-4deg)"
            }
        }
        for (let i = 0; i < LAKA_OPIS.length; i++) {
            const c = LAKA_OPIS[i]
            const e = cz[i]
            if (!e || c[0] === "o") continue
            const kat = c[9] as number
            const rytm = c[10] as number
            const st = c[11] as number
            if (c[0] === "g" || c[0] === "w") {
                // skubanie: powolne kołysanie łba, a co jakiś czas seria krótkich szarpnięć
                const f = t - st * 3
                const seria = Math.pow(Math.max(0, sin((DWA_PI * f) / (rytm * 2.6))), 2)
                let a = kat * (0.55 * sin((DWA_PI * f) / rytm) + 0.25 * sin((DWA_PI * f) / (rytm * 0.41) + 1.3) + 0.45 * seria * sin(DWA_PI * f * 2.3))
                if (c[0] === "w") {
                    // krowa z przodu podnosi łeb w stronę Kulki i węszy krótkimi, szybkimi kiwnięciami
                    const wq = wacha(tw)
                    if (wq > 0) a = a * (1 - wq) + wq * (-8.6 + 1.5 * sin(DWA_PI * 3.4 * t))
                }
                e.style.transform = "rotate(" + a.toFixed(2) + "deg)"
            } else if (c[0] === "n") {
                // krowa z łbem w górze rozgląda się powoli, a na powitanie postaci kiwa łbem
                const f = t - st
                let a = kat * (0.8 * sin((DWA_PI * f) / rytm) + 0.35 * sin((DWA_PI * f) / (rytm * 0.37) + 0.8))
                const x = tw - T_SKOK - 0.1
                if (x > 0 && x < 1.6) a += 2.4 * Math.pow(sin((Math.PI * x) / 1.6), 2)
                e.style.transform = "rotate(" + a.toFixed(2) + "deg)"
            } else {
                // trawa: wiatr idzie przez łąkę od lewej do prawej, raz mocniej, raz słabiej
                const x = c[7] as number
                const w = 0.55 * sin(DWA_PI * (t / 3.4 - x / 900)) + 0.3 * sin(DWA_PI * (t / 1.9 - x / 520) + 1.3) + 0.15 * sin(DWA_PI * (t / 0.83 - x / 300) + 2.1)
                const powiew = 0.62 + 0.38 * sin(DWA_PI * (t / 7.7 - x / 2000))
                e.style.transform = "skewX(" + (kat * w * powiew).toFixed(2) + "deg)"
            }
        }
        // ogony: łańcuch ogniw. Machnięcie zaczyna się u nasady i z opóźnieniem dochodzi do kity.
        for (let o = 0; o < ogony.length; o++) {
            const lanc = ogony[o]
            if (!lanc) continue
            const c0 = LAKA_OPIS[lanc[0]]
            const kat = c0[9] as number
            const st = c0[11] as number
            const okres = (c0[10] as number) * 1.3
            const f = t - st * 2
            const n0 = Math.floor(f / okres)
            let A = 0
            let jx = c0[7] as number
            let jy = c0[8] as number
            let px = jx
            let py = jy
            for (let i = 0; i < lanc.length; i++) {
                const c = LAKA_OPIS[lanc[i]]
                const ox = c[7] as number
                const oy = c[8] as number
                if (i > 0) {
                    const ca = cos(A * RAD)
                    const sa = sin(A * RAD)
                    const dx = ox - px
                    const dy = oy - py
                    jx += ca * dx - sa * dy
                    jy += sa * dx + ca * dy
                }
                let a = kat * 0.1 * sin((DWA_PI * f) / (okres * 0.83) - 0.7 * i + st)
                if (o === 2) {
                    // krowa z przodu macha ogonem z przejęcia, gdy wącha loda
                    const wq = wacha(tw)
                    if (wq > 0) a += kat * 0.55 * wq * sin(DWA_PI * 2.1 * t - 0.85 * i)
                }
                // machnięcia: bierzemy też następne (mogło zacząć się odrobinę przed czasem) i poprzednie (jeszcze wygasa)
                for (let k = -1; k < 2; k++) {
                    const n = n0 - k
                    const u = f - (n * okres + (los(n * 7.13 + st) - 0.5) * okres * 0.35) - i * 0.085 - (i === lanc.length - 1 ? 0.03 : 0)
                    if (u > 0) {
                        const moc = (0.55 + 0.75 * los(n * 3.7 + st * 1.9)) * (los(n * 1.31 + st) > 0.5 ? 1 : -1)
                        a += kat * (i === 0 ? 0.75 : 0.5) * moc * sin(DWA_PI * 1.25 * u) * Math.exp(-u / 0.8) * (1 - Math.exp(-u / 0.07))
                    }
                }
                A += a
                const e = cz[lanc[i]]
                if (e) e.style.transform = "translate(" + pr(((jx - ox) / (c[3] as number)) * 100) + "," + pr(((jy - oy) / (c[4] as number)) * 100) + ") rotate(" + A.toFixed(2) + "deg)"
                px = ox
                py = oy
            }
        }
    }

    let raf = 0
    let dziala = true
    let widac = false
    let ost = 0
    let tz = 0 // czas łąki
    let tw = -1 // czas od początku wejścia postaci; -1 = jeszcze nie weszły
    let pokazane = false
    const klatka = (teraz: number) => {
        raf = 0
        if (!dziala || !widac) return
        const dt = ost ? Math.min(0.1, Math.max(0, (teraz - ost) / 1000)) : 0
        ost = teraz
        tz += dt
        if (tw >= 0) tw += dt
        else if (gotowa()) {
            // Wejście rusza samo, gdy kadr jest już otwarty po brzegi, którymi wchodzą postaci, a ich miejsce widać na ekranie.
            const r = okno.getBoundingClientRect()
            const vh = window.innerHeight
            const klip = okno.style.clipPath
            let otwarte = !klip || klip === "none"
            if (!otwarte) {
                const m = /circle\(([0-9.]+)px/.exec(klip)
                otwarte = !!m && parseFloat(m[1]) >= Math.hypot(r.width * 0.56, r.height * 0.22)
            }
            if (otwarte && r.top <= vh - r.height * 0.75 && r.top >= -r.height * 0.62) tw = 0
        }
        krowy(tz, tw)
        for (const f of postaci) ustaw(f, tw, dt)
        if (!pokazane) {
            pokazane = true
            okno.classList.add("gk2-laka-ruch")
        }
        raf = requestAnimationFrame(klatka)
    }
    const zmiana = (jest: boolean) => {
        if (jest === widac) return
        widac = jest
        if (widac) {
            ost = 0
            if (!raf) raf = requestAnimationFrame(klatka)
        } else {
            // Rysunek zjechał z ekranu: postaci wracają za kadr i przy powrocie wejdą jeszcze raz.
            tw = -1
            for (const f of postaci) ustaw(f, tw, 0)
        }
    }
    let io: IntersectionObserver | null = null
    if (typeof IntersectionObserver === "undefined") zmiana(true)
    else {
        io = new IntersectionObserver(
            (wpisy) => {
                for (const w of wpisy) zmiana(w.isIntersecting)
            },
            { rootMargin: "80px 0px" }
        )
        io.observe(okno)
    }
    return () => {
        dziala = false
        if (raf) cancelAnimationFrame(raf)
        if (io) io.disconnect()
    }
}

function Laka(props: { oknoRef: (el: HTMLDivElement | null) => void }) {
    const [gotowa, ustawGotowa] = useState(false)
    const [blisko, ustawBlisko] = useState(false)
    const gotowaRef = useRef(false)
    const lakaRef = useRef<HTMLDivElement>(null)
    const tloRef = useRef<HTMLImageElement>(null)
    useEffect(() => {
        // Obrazek pokazujemy dopiero, gdy są wszystkie trzy pliki: bez arkuszy krowy stałyby bez łbów, a postaci bez nóg.
        let anulowane = false
        let ile = 0
        const jest = () => {
            ile += 1
            if (ile >= 3 && !anulowane) {
                gotowaRef.current = true
                ustawGotowa(true)
            }
        }
        const tlo = tloRef.current
        if (tlo && tlo.complete && tlo.naturalWidth > 0) jest()
        else if (tlo) tlo.addEventListener("load", jest, { once: true })
        // Arkusze części ściągamy dopiero, gdy rysunek jest blisko ekranu (tak jak leniwie ładowane tło).
        const arkusze: HTMLImageElement[] = []
        const sciagnij = () => {
            if (arkusze.length) return
            ustawBlisko(true)
            for (const src of [LAKA_CZESCI, LAKA_POSTACI]) {
                const im = new Image()
                im.onload = jest
                im.src = src
                arkusze.push(im)
            }
        }
        let czujka: IntersectionObserver | null = null
        const laka = lakaRef.current
        if (!laka || typeof IntersectionObserver === "undefined" || naKanwie()) sciagnij()
        else {
            czujka = new IntersectionObserver(
                (wpisy) => {
                    for (const w of wpisy) if (w.isIntersecting) sciagnij()
                },
                { rootMargin: "1400px 0px" }
            )
            czujka.observe(laka)
        }
        return () => {
            anulowane = true
            if (czujka) czujka.disconnect()
            for (const im of arkusze) im.onload = null
            if (tlo) tlo.removeEventListener("load", jest)
        }
    }, [])
    useEffect(() => {
        const laka = lakaRef.current
        // W edytorze Framera rysunek jest nieruchomy: postaci stoją na miejscach.
        if (!laka || naKanwie()) return
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            // Bez animacji: postaci stoją od razu na swoich miejscach, w pozie z rysunku marki.
            if (laka.parentElement) laka.parentElement.classList.add("gk2-laka-ruch")
            return
        }
        return lakaRuch(laka, () => gotowaRef.current)
    }, [])
    return (
        <div className="gk2-farma-okno" ref={props.oknoRef}>
            <noscript>
                <style>{".gk2-laka-cz{background-image:url(" + LAKA_CZESCI + ")}.gk2-laka-kaw{background-image:url(" + LAKA_POSTACI + ")}"}</style>
            </noscript>
            <div ref={lakaRef} className={"gk2-laka" + (gotowa ? " gk2-laka-gotowa" : "") + (blisko ? " gk2-laka-blisko" : "")} role="img" aria-label="Rysunek: Górka z wiadrem mleka i Kulka z lodem wchodzą na łąkę i stają przy krowie, wśród pasących się szarobrązowych krów.">
                <img ref={tloRef} className="gk2-laka-tlo" src={LAKA_TLO} alt="" loading="lazy" decoding="async" draggable={false} />
                {LAKA_OPIS.map((c, i) => (c[0] === "p" ? null : <i key={i} data-cz={i} className="gk2-laka-cz" style={czescStyl(c)} aria-hidden="true" />))}
                {LAKA_POSTACIE.map((p, k) => (
                    <span key={k} data-postac={k} className="gk2-laka-postac" style={{ left: procent(p.x / LAKA_W), top: procent(p.y / LAKA_H), width: procent((p.w * p.s) / LAKA_W), aspectRatio: p.w + " / " + p.h }} aria-hidden="true">
                        <i className="gk2-laka-cien" data-cien="1" />
                        {p.cz.map((c, j) => (c ? <i key={j} data-kaw={j} className={"gk2-laka-kaw" + (j === 4 ? " gk2-laka-pod" : "")} style={kawalekStyl(p, j)} /> : null))}
                    </span>
                ))}
                {LAKA_OPIS.map((c, i) => (c[0] === "p" ? <i key={i} data-cz={i} className="gk2-laka-cz" style={czescStyl(c)} aria-hidden="true" /> : null))}
                <span className="gk2-laka-muu gk2-e" data-muu="1" aria-hidden="true">
                    Muu?
                </span>
            </div>
        </div>
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
    ".gk2-ilu i { position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: block; background-color: #D0D0D0; background-repeat: no-repeat; background-size: calc(100% - 4px) calc(100% - 4px), 100% 100%; background-position: 2px 2px, 0 0; background-blend-mode: multiply, normal; }",
    ".gk2-kolor .gk2-ilu i { background-color: var(--roz); }",
    // Deszcz w Gorzowie: Szary Dzień siedzi pod różowym parasolem z plików marki (na szarej stronie parasol też jest szary).
    ".gk2-ilu i.gk2-parasol-stolik { left: 25.6%; top: -38.5%; width: 69%; height: 104%; opacity: 1; background-color: transparent; background-size: 100% 100%; background-position: 0 0; mix-blend-mode: normal; transform: rotate(-15.4deg); transform-origin: 36.8% 88%; clip-path: inset(0 0 12% 0); transition: none; }",
    ".gk2-szara .gk2-ilu i.gk2-parasol-stolik { filter: grayscale(1) brightness(1.08) contrast(.9); }",
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
    ".gk2-manifest { position: relative; padding: calc(var(--vh) * 16) var(--m) calc(var(--vh) * 12); background: #D9D6D1; overflow: clip; }",
    ".gk2-manifest-tekst { margin-top: calc(var(--vh) * 12); font-size: clamp(30px, 4.5vw, 78px); line-height: 1; max-width: 1340px; }",
    ".gk2-slowo { opacity: 1; transition: opacity .2s linear; }",
    ".gk2-js .gk2-slowo { opacity: .13; }",
    ".gk2-slowo-szare { color: #85827E; }",
    // Jedyny kolor w szarym manifeście: słowo KOLOR jak zakreślacz, przechodzi przez barwy smaków.
    ".gk2-zakreslacz { color: var(--tusz); background-color: var(--roz); padding: 0 .07em; margin: 0 -.07em; border-radius: .07em; -webkit-box-decoration-break: clone; box-decoration-break: clone; animation: gk2-zakreslacz 9s ease-in-out infinite; }",
    "@keyframes gk2-zakreslacz { 0%, 13% { background-color: #F7C2CF; color: #111111; } 17%, 30% { background-color: #FFB23E; color: #111111; } 34%, 47% { background-color: #A9BD78; color: #111111; } 51%, 64% { background-color: #C4773B; color: #111111; } 68%, 81% { background-color: #D3D77C; color: #111111; } 85%, 96% { background-color: #FFE295; color: #111111; } 100% { background-color: #F7C2CF; color: #111111; } }",
    ".gk2-plaza { position: relative; margin-top: calc(var(--vh) * 5); height: clamp(190px, 25vw, 400px); pointer-events: none; will-change: transform; }",
    ".gk2-plaza-parasol { position: absolute; right: 19vw; bottom: 3%; width: clamp(150px, 19vw, 310px); transform-origin: 46% 96%; animation: gk2-kolys 7s ease-in-out infinite; }",
    ".gk2-plaza-lezak { position: absolute; right: 1vw; bottom: 0; width: clamp(210px, 27vw, 440px); }",
    ".gk2-plaza-podpis { position: absolute; left: 0; bottom: 8px; }",

    "/* Taśmy 10 YEARS */",
    ".gk2-tasmy { position: relative; height: 0; z-index: 5; --th: clamp(38px, 5vw, 72px); }",
    ".gk2-tasma { position: absolute; left: -6vw; right: -6vw; height: var(--th); overflow: hidden; --th: clamp(38px, 5vw, 72px); --tw: calc(var(--th) * 6.109); box-shadow: 0 12px 30px -18px rgba(0,0,0,.5); }",
    ".gk2-tasma-maslo { background: #FDE59F; }",
    ".gk2-js .gk2-tasma { touch-action: pan-y; -webkit-user-select: none; user-select: none; }",
    "@media (hover: hover) { .gk2-js .gk2-tasma { cursor: grab; } .gk2-js .gk2-tasma.gk2-ciagnie { cursor: grabbing; } }",
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
    ".gk2-portal-2 { position: absolute; right: 6vw; bottom: calc(var(--vh) * -11); height: calc(var(--vh) * 40); aspect-ratio: 9 / 16; z-index: 3; opacity: 0; box-shadow: 0 40px 80px -30px rgba(0,0,0,.85); }",
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
    ".gk2-sklep { position: relative; overflow: hidden; min-height: calc(var(--vh) * 100); padding: 92px var(--m) calc(var(--vh) * 6); display: grid; grid-template-columns: .8fr 1.5fr; gap: 4.5vw; align-items: center;",
    // Rozwinięty papier od środka: jaśniejszy, z zagięciami tam, gdzie szła wstążka, i z ledwo widocznymi kropkami.
    "  background-color: #F9DCE3; background-image: linear-gradient(90deg, transparent calc(70% - 2px), rgba(130,40,62,.10) calc(70% - 1px), rgba(255,255,255,.55) 70%, transparent calc(70% + 3px)), linear-gradient(180deg, transparent calc(58% - 2px), rgba(130,40,62,.10) calc(58% - 1px), rgba(255,255,255,.55) 58%, transparent calc(58% + 3px)), radial-gradient(120% 90% at 70% 58%, rgba(255,255,255,.35), rgba(255,255,255,0) 60%), radial-gradient(circle, rgba(255,255,255,.3) 0 4.5px, rgba(255,255,255,0) 5.5px), radial-gradient(circle, rgba(255,255,255,.3) 0 4.5px, rgba(255,255,255,0) 5.5px);",
    "  background-size: 100% 100%, 100% 100%, 100% 100%, 56px 56px, 56px 56px; background-position: 0 0, 0 0, 0 0, 0 0, 28px 28px; }",
    ".gk2-sklep > *:not(.gk2-sklep-wstazka):not(.gk2-sklep-kokarda) { position: relative; z-index: 1; }",
    ".gk2-sklep-wstazka { position: absolute; z-index: 0; display: block; height: clamp(30px, 3.4vw, 58px); background: " + ZIARNO + " 0 0 / 200px 200px, linear-gradient(180deg, " + AKSAMIT + "); box-shadow: 0 10px 22px -10px rgba(70,10,20,.5); pointer-events: none; }",
    ".gk2-sklep-wstazka-a { right: -8vw; top: 9%; width: 38vw; transform: rotate(-17deg); border-radius: 2px; }",
    ".gk2-sklep-wstazka-b { left: -7vw; bottom: 6%; width: 31vw; transform: rotate(7deg); }",
    ".gk2-sklep-kokarda { position: absolute; z-index: 0; display: block; right: 1.5vw; top: 1%; width: clamp(110px, 12vw, 210px); aspect-ratio: 1000 / 941; background: url(" + KOKARDA + ") 0 0 / 100% 100% no-repeat; transform: rotate(24deg); filter: drop-shadow(0 12px 14px rgba(70,10,20,.35)); pointer-events: none; }",
    ".gk2-h2-sklep { font-size: clamp(46px, 7vw, 124px); }",
    ".gk2-sklep .gk2-lead { margin-top: 24px; }",
    ".gk2-fakty { margin: 26px 0 30px; border-top: 1.5px solid var(--tusz); font-size: 12px; line-height: 1.5; letter-spacing: .05em; text-transform: uppercase; }",
    ".gk2-fakty div { display: grid; grid-template-columns: 9em 1fr; gap: 12px; padding: 11px 0; border-bottom: 1.5px solid var(--tusz); }",
    ".gk2-fakty dt { opacity: .6; }",
    ".gk2-fakty dd span { display: block; }",
    ".gk2-fakty dd b { font-weight: 400; white-space: nowrap; }",
    ".gk2-wypieki { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.8vw; align-items: start; }",
    ".gk2-wypiek { display: grid; gap: 8px; align-content: start; }",
    ".gk2-wypiek-foto { position: relative; display: block; aspect-ratio: 1 / .78; }",
    ".gk2-wypiek-foto i { position: absolute; left: -9%; top: 0; width: 118%; height: 100%; display: block; background-repeat: no-repeat; background-size: contain; background-position: 50% 100%; transition: transform .45s cubic-bezier(.3,.7,.3,1); transform-origin: 50% 90%; }",
    "@media (hover: hover) { .gk2-wypiek:hover .gk2-wypiek-foto i { transform: translateY(-4%) scale(1.06) rotate(-2deg); } }",
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
    ".gk2-termin { position: relative; }",
    ".gk2-termin-pole { display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%; min-height: 46px; background: transparent; border: 0; border-bottom: 1.5px solid var(--tusz); border-radius: 0; padding: 10px 2px 12px; font: inherit; font-size: 16px; color: rgba(17,17,17,.42); text-align: left; cursor: pointer; }",
    ".gk2-termin-pelne { color: var(--tusz); }",
    ".gk2-termin-pole:focus-visible, .gk2-termin-pole[aria-expanded=true] { border-bottom-color: var(--rubin); outline: none; }",
    ".gk2-termin-pole i { font-style: normal; color: var(--tusz); }",
    ".gk2-termin-ukryte { position: absolute; left: 0; bottom: 0; width: 1px; height: 1px; opacity: 0; pointer-events: none; }",
    ".gk2-kalendarz { position: absolute; left: 0; top: calc(100% + 8px); z-index: 30; width: min(320px, 86vw); padding: 14px; background: #FBF4EC; color: var(--tusz); border: 1px solid var(--tusz); border-radius: 18px; box-shadow: 0 24px 50px -24px rgba(40,30,20,.45); }",
    ".gk2-kalendarz-gora { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }",
    ".gk2-kalendarz-gora button { width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--tusz); background: transparent; color: var(--tusz); cursor: pointer; font: inherit; }",
    ".gk2-kalendarz-gora button:disabled { opacity: .25; cursor: default; }",
    ".gk2-kalendarz-siatka { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 3px; text-align: center; }",
    ".gk2-kalendarz-dt { opacity: .55; padding: 4px 0; }",
    ".gk2-kalendarz-siatka button { aspect-ratio: 1; border: 0; border-radius: 50%; background: transparent; color: var(--tusz); font: inherit; font-size: 14px; cursor: pointer; }",
    ".gk2-kalendarz-siatka button:hover:not(:disabled) { background: var(--roz); }",
    ".gk2-kalendarz-siatka button:disabled { opacity: .25; cursor: default; }",
    ".gk2-kalendarz-siatka button[aria-pressed=true] { background: var(--tusz); color: var(--maslo); }",
    ".gk2-kalendarz-dzis { box-shadow: inset 0 0 0 1px var(--tusz); }",
    ".gk2-zapytanie-dol { grid-column: 1 / -1; display: flex; flex-wrap: wrap; align-items: center; gap: 12px 20px; margin-top: 8px; }",
    ".gk2-zapytanie-dol .gk2-drobny { margin-top: 0; }",
    ".gk2-zapytanie-dzieki { margin-top: 34px; max-width: 760px; }",

    "/* 5b. Od podstaw: skąd mleko, śmietanka i jajka; film z gospodarstwa */",
    ".gk2-zrodla { position: relative; background: var(--krem); padding: calc(var(--vh) * 18) var(--m) calc(var(--vh) * 16); overflow: clip; }",
    ".gk2-zrodla-glowa, .gk2-zrodla-rzad { display: grid; grid-template-columns: 1.62fr 1fr; column-gap: 4vw; }",
    ".gk2-zrodla-glowa { align-items: end; }",
    ".gk2-zrodla-rzad { margin-top: calc(var(--vh) * 8); align-items: stretch; }",
    ".gk2-farma-okno { position: relative; aspect-ratio: 1388 / 936; border-radius: 22px; overflow: hidden; background: #FBF4EC; will-change: clip-path; }",
    "/* rysunek ma własny papierowy margines; okno przycina go do samej łąki */",
    ".gk2-laka { position: absolute; left: -2.16%; top: -13.9%; width: 104.32%; aspect-ratio: 1448 / 1086; }",
    ".gk2-js .gk2-laka { opacity: 0; transition: opacity .6s ease; }",
    ".gk2-js .gk2-laka-gotowa { opacity: 1; }",
    ".gk2-laka-tlo { position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: block; }",
    // Arkusze części (tła CSS) ściągają się dopiero, gdy rysunek jest blisko ekranu: wtedy Laka dodaje klasę gk2-laka-blisko.
    ".gk2-laka-cz { position: absolute; display: block; background-repeat: no-repeat; will-change: transform; }",
    ".gk2-laka-blisko .gk2-laka-cz { background-image: url(" + LAKA_CZESCI + "); }",
    // Górka i Kulka: każda część (nogi, stopy, tułów, głowa) to osobny kawałek arkusza; ruch nadaje im pętla w lakaRuch().
    ".gk2-laka-postac { position: absolute; display: block; will-change: transform; }",
    ".gk2-laka-kaw { position: absolute; display: block; background-repeat: no-repeat; will-change: transform; }",
    ".gk2-laka-blisko .gk2-laka-kaw { background-image: url(" + LAKA_POSTACI + "); }",
    ".gk2-laka-pod { opacity: 0; }",
    // „Muu?” krowy z przodu, gdy wącha loda Kulki
    ".gk2-laka-muu { position: absolute; left: 49.6%; top: 65.6%; padding: 6px 11px 5px; border-radius: 999px; background: #FBF4EC; border: 1px solid var(--tusz); color: var(--tusz); white-space: nowrap; opacity: 0; transform: translate(-50%, -100%) scale(.6); transform-origin: 70% 100%; box-shadow: 0 6px 16px -10px rgba(40,30,20,.5); pointer-events: none; }",
    ".gk2-laka-muu::after { content: ''; position: absolute; left: 66%; bottom: -6px; width: 9px; height: 9px; background: #FBF4EC; border-right: 1px solid var(--tusz); border-bottom: 1px solid var(--tusz); transform: rotate(45deg); }",
    // Cień pod stopami, w kolorze cieni pod krowami: bez niego postaci wyglądałyby na doklejone.
    ".gk2-laka-cien { position: absolute; display: block; left: -9%; width: 118%; top: 96.2%; height: 5.6%; background: radial-gradient(ellipse at 50% 50%, rgba(123,120,61,.34) 0%, rgba(123,120,61,.22) 38%, rgba(123,120,61,0) 70%); will-change: transform; }",
    // Dopóki pętla nie ustawi postaci poza kadrem, nie pokazujemy ich (bez JS stoją od razu na miejscu).
    ".gk2-js .gk2-laka-postac { visibility: hidden; }",
    ".gk2-js .gk2-laka-ruch .gk2-laka-postac { visibility: visible; }",
    ".gk2-farma figcaption { margin-top: 14px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 4px 20px; }",
    ".gk2-farma figcaption .gk2-zrodla-link { margin-top: 0; }",
    ".gk2-zrodla-lista { display: flex; flex-direction: column; border-top: 1.5px solid var(--tusz); }",
    ".gk2-zrodla-lista li { flex: 1 0 auto; display: grid; gap: 7px; align-content: center; padding: 18px 0; border-bottom: 1.5px solid var(--tusz); }",
    ".gk2-zrodla-co { opacity: .6; }",
    ".gk2-zrodla-skad { font-size: clamp(26px, 2.8vw, 46px); line-height: .95; }",
    ".gk2-zrodla-opis { font-size: 13px; line-height: 1.5; max-width: 36em; }",
    ".gk2-zrodla-link { justify-self: start; position: relative; margin-top: 2px; }",
    ".gk2-zrodla-link::after { content: ''; position: absolute; left: 0; right: 0; bottom: -2px; height: 1px; background: currentColor; transform-origin: left; transition: transform .35s ease; }",
    "@media (hover: hover) { .gk2-zrodla-link:hover::after { transform: scaleX(.4); } }",

    "/* 6. Smaki: jeden rożek; nowy smak spływa z góry jak roztopiony lód */",
    ".gk2-smaki { position: relative; height: calc(var(--vh) * 100 + (var(--n, 6) - 1) * var(--vh) * 22); background: #F3ECDC; }",
    ".gk2-smaki-scena { position: sticky; top: 0; height: calc(var(--vh) * 100); overflow: hidden; touch-action: pan-y; -webkit-user-select: none; user-select: none; -webkit-tap-highlight-color: transparent; }",
    "@media (hover: hover) { .gk2-js .gk2-smaki-scena { cursor: grab; } .gk2-js .gk2-smaki-scena.gk2-ciagnie { cursor: grabbing; } }",
    ".gk2-smaki-zalew { position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: block; pointer-events: none; overflow: visible; }",
    ".gk2-smaki-gora { position: absolute; left: var(--m); right: var(--m); top: calc(var(--vh) * 12); display: flex; justify-content: space-between; gap: 24px; z-index: 3; pointer-events: none; }",
    ".gk2-beben { position: absolute; left: var(--m); width: 60vw; top: calc(var(--vh) * 19); height: calc(var(--vh) * 52); z-index: 3; perspective: 1700px; perspective-origin: 30% 50%; pointer-events: none;",
    "  -webkit-mask-image: linear-gradient(transparent, #000 22%, #000 78%, transparent); mask-image: linear-gradient(transparent, #000 22%, #000 78%, transparent); }",
    ".gk2-beben-os { position: absolute; left: 0; right: 0; top: 50%; height: 0; transform-style: preserve-3d; }",
    ".gk2-beben-nazwa { position: absolute; left: 0; top: 0; font-size: min(8.2vw, calc(var(--vh) * 15)); line-height: .86; opacity: 0; transform: translate3d(0, -50%, 0); backface-visibility: hidden; -webkit-backface-visibility: hidden; will-change: transform, opacity; }",
    ".gk2-beben-nazwa:first-child { opacity: 1; }",
    ".gk2-beben-nazwa span { display: block; white-space: nowrap; }",
    ".gk2-smaki-opisy { position: absolute; left: var(--m); bottom: calc(var(--vh) * 8); width: min(34em, 44vw); z-index: 3; pointer-events: none; }",
    ".gk2-smaki-opisy-stos { display: grid; }",
    ".gk2-smaki-opis { grid-area: 1 / 1; opacity: 0; will-change: opacity, transform; }",
    ".gk2-smaki-opis:first-child { opacity: 1; }",
    ".gk2-smaki-opis .gk2-lead { font-size: clamp(16px, 1.45vw, 23px); line-height: 1.45; margin-top: 10px; }",
    ".gk2-smak-stopka { margin-top: 22px; opacity: .7; max-width: 36em; }",
    ".gk2-rozek { --rh: min(calc(var(--vh) * 80), 100vw); position: absolute; left: 72%; top: 50%; height: var(--rh); aspect-ratio: 0.4908; margin: calc(var(--rh) * -.5) 0 0 calc(var(--rh) * -.2454); transform-origin: 50% 92%; z-index: 2; will-change: transform; }",
    ".gk2-rozek .gk2-wyc, .gk2-rozek canvas { position: absolute; left: 0; top: 0; width: 100%; height: 100%; pointer-events: none; }",
    ".gk2-rozek canvas { opacity: 0; transition: opacity .5s ease; }",
    ".gk2-chrom-1 .gk2-rozek canvas { opacity: 1; }",
    ".gk2-chrom-1 .gk2-rozek .gk2-wyc { visibility: hidden; }",
    "@media (hover: hover) { .gk2-js .gk2-rozek { cursor: pointer; } }",
    ".gk2-smaki-kropki { position: absolute; right: var(--m); bottom: calc(var(--vh) * 8); z-index: 4; display: flex; align-items: center; gap: 4px; margin-right: -9px; }",
    ".gk2-smaki-kropki button { width: 30px; height: 30px; padding: 0; border: 0; background: none; color: inherit; cursor: pointer; display: grid; place-items: center; -webkit-appearance: none; appearance: none; }",
    ".gk2-smaki-kropki button::before { content: ''; width: 10px; height: 10px; border-radius: 50%; border: 1.5px solid currentColor; box-sizing: border-box; transition: background .3s ease, transform .3s ease; }",
    ".gk2-smaki-kropki button.gk2-on::before { background: currentColor; transform: scale(1.3); }",
    ".gk2-smaki-kropki button:focus-visible { outline: 1.5px solid currentColor; outline-offset: -3px; border-radius: 50%; }",
    ".gk2-balony canvas { position: absolute; left: 0; top: 0; width: 100%; height: 100%; opacity: 0; transition: opacity .5s ease; }",
    ".gk2-chrom-2 .gk2-balony canvas { opacity: 1; }",
    ".gk2-chrom-2 .gk2-balony .gk2-wyc { visibility: hidden; }",

    "/* 7. Kubek */",
    ".gk2-kubek { position: relative; background: var(--krem); padding: calc(var(--vh) * 16) var(--m); display: grid; grid-template-columns: 1fr 1fr; gap: 4vw; align-items: center; }",
    ".gk2-kubek-tekst .gk2-lead { margin-top: 28px; }",
    ".gk2-kubek-foto { position: relative; justify-self: center; width: min(calc(var(--vh) * 62), 36vw, 600px); aspect-ratio: 630 / 668; perspective: 1400px; }",
    ".gk2-kubek-cien { position: absolute; left: 6%; right: 6%; bottom: -4%; height: 13%; background: radial-gradient(closest-side, rgba(70,45,30,.32), rgba(70,45,30,0)); }",
    ".gk2-kubek-tilt { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; will-change: transform; }",
    ".gk2-kubek-obraz { position: relative; width: 100%; height: 100%; animation: gk2-unoszenie 6s ease-in-out infinite; }",
    ".gk2-kubek-obraz img { position: relative; width: 100%; height: 100%; }",
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
    ".gk2-deptak { position: relative; height: clamp(170px, 21vw, 320px); margin-top: calc(var(--vh) * 7); }",
    ".gk2-para { position: absolute; left: 0; bottom: 0; height: 100%; transform-origin: 50% 100%; will-change: transform; z-index: 2; }",
    ".gk2-para .gk2-wyc { height: 100%; }",
    ".gk2-deptak-napis { position: absolute; right: 0; top: 36%; display: grid; gap: 2px; text-align: right; }",

    "/* 10. Stopka */",
    ".gk2-tasmy-dol .gk2-tasma-a { top: calc(var(--th) * -0.9); }",
    ".gk2-tasmy-dol .gk2-tasma-b { top: calc(var(--th) * -0.1); }",
    ".gk2-stopka { position: relative; background: var(--maslo); padding: calc(var(--vh) * 22) var(--m) 84px; overflow: clip; }",
    ".gk2-stopka-logo { width: 100%; }",
    ".gk2-stopka-dzieci { display: flex; align-items: flex-end; gap: 16px; margin-bottom: calc(var(--vh) * 5); }",
    ".gk2-stopka-dzieci .gk2-wyc { width: clamp(84px, 9vw, 150px); animation: gk2-unoszenie 6s ease-in-out infinite; }",
    ".gk2-stopka-dzieci .gk2-e { padding-bottom: 6px; }",
    ".gk2-stopka-wiersz { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px 28px; margin-top: calc(var(--vh) * 6); }",

    "/* Pierwszy ekran na grudzień: na papierze prezentu kim jesteśmy i trzy drogi */",
    ".gk2-prezent { display: none; position: absolute; left: var(--m); top: calc(var(--vh) * 67); z-index: 7; max-width: min(640px, 56vw); }",
    ".gk2-js .gk2-prezent { display: block; }",
    ".gk2-prezent-kto { margin-bottom: 16px; }",
    ".gk2-prezent-termin { display: none; }",
    ".gk2-prezent-cta { display: flex; flex-wrap: wrap; align-items: center; gap: 14px 24px; }",
    ".gk2-prezent-link { padding: 6px 0 3px; border-bottom: 1px solid currentColor; }",
    "@media (hover: hover) { .gk2-prezent-link:hover { color: var(--rubin); } }",
    ".gk2-lista-strzalka { border-bottom: 1px solid currentColor; padding-bottom: 2px; white-space: nowrap; }",
    "@media (hover: hover) { .gk2-lista-strzalka:hover { color: var(--rubin); } }",

    "/* Stolik w Kawiarni Centrum */",
    ".gk2-stolik { position: relative; background: var(--krem); padding: calc(var(--vh) * 18) var(--m) calc(var(--vh) * 16); display: grid; grid-template-columns: .9fr 1.1fr; column-gap: 6vw; align-items: center; }",
    ".gk2-stolik-foto { position: relative; width: min(100%, 540px); }",
    ".gk2-stolik-okno { border-radius: 24px; overflow: hidden; aspect-ratio: 4 / 5; background: #E9DFCF; }",
    ".gk2-stolik-okno img { width: 100%; height: 100%; object-fit: cover; }",
    ".gk2-stolik-foto figcaption { margin-top: 14px; }",
    ".gk2-stolik-tresc .gk2-lead { margin-top: 30px; }",
    ".gk2-stolik-formularz { grid-template-columns: 1fr 1fr 1fr; }",
    ".gk2-stolik-formularz .gk2-termin { grid-column: span 2; }",
    ".gk2-pole-szerokie { grid-column: span 2; }",
    ".gk2-pole select { width: 100%; min-width: 0; min-height: 46px; background: transparent; border: 0; border-bottom: 1.5px solid var(--tusz); border-radius: 0; color: var(--tusz); padding: 10px 26px 12px 2px; font: inherit; font-size: 16px; outline: none; -webkit-appearance: none; appearance: none; cursor: pointer;",
    "  background-image: linear-gradient(45deg, transparent 50%, var(--tusz) 50%), linear-gradient(135deg, var(--tusz) 50%, transparent 50%); background-position: calc(100% - 12px) 52%, calc(100% - 7px) 52%; background-size: 5px 5px; background-repeat: no-repeat; }",
    ".gk2-pole select:focus { border-bottom-color: var(--rubin); }",
    ".gk2-pasek-zamow { display: none; }",

    "/* Szary Dzień: na 18.01 i w stopce obok Kulki */",
    ".gk2-sz { position: absolute; display: block; pointer-events: auto; -webkit-tap-highlight-color: transparent; }",
    ".gk2-sz-ruch { position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: block; isolation: isolate; transform-origin: 50% 100%; }",
    ".gk2-sz-kolor, .gk2-sz-faktura { position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: block; }",
    ".gk2-sz-kolor { background: var(--sz); -webkit-mask-size: 100% 100%; mask-size: 100% 100%; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; }",
    ".gk2-sz-faktura { mix-blend-mode: multiply; }",
    ".gk2-sz-lustro .gk2-sz-kolor, .gk2-sz-lustro .gk2-sz-faktura { transform: scaleX(-1); }",
    ".gk2-sz-gosc-okno { position: absolute; left: 33%; top: -38%; width: 46%; aspect-ratio: 800 / 1002; display: block; pointer-events: none; }",
    ".gk2-sz-gosc { left: 0; top: 0; width: 100%; animation: gk2-sz-unos 7s ease-in-out infinite; }",
    ".gk2-js .gk2-sz-gosc-okno .gk2-sz-ruch { opacity: 0; transform: translate3d(0, 16%, 0) scale(.94); transition: opacity 1s ease, transform 1.4s cubic-bezier(.2, .9, .25, 1); }",
    ".gk2-js .gk2-sz-gosc-okno.gk2-widac .gk2-sz-ruch { opacity: 1; transform: none; transition-delay: .3s; }",
    ".gk2-sz-stoi { position: relative; flex: none; width: clamp(62px, 6.6vw, 112px); margin: 0 6px 0 -10px; animation: gk2-unoszenie 6s ease-in-out -2.2s infinite; }",
    "@media (hover: hover) { .gk2-sz-stoi:hover .gk2-sz-ruch, .gk2-js .gk2-sz-gosc-okno.gk2-widac .gk2-sz-gosc:hover .gk2-sz-ruch { animation: gk2-sz-tancz .9s ease-in-out infinite; } }",
    ".gk2-sz-tanczy .gk2-sz-ruch, .gk2-js .gk2-sz-gosc-okno.gk2-widac .gk2-sz-tanczy .gk2-sz-ruch { animation: gk2-sz-tancz .9s ease-in-out 2; }",
    "@keyframes gk2-sz-unos { 0%, 100% { transform: translate3d(0, 0, 0) rotate(-1.5deg); } 50% { transform: translate3d(0, -3%, 0) rotate(1.8deg); } }",
    "@keyframes gk2-sz-tancz { 0%, 100% { transform: none; } 25% { transform: translate3d(0, -4%, 0) rotate(-6deg); } 50% { transform: none; } 75% { transform: translate3d(0, -4%, 0) rotate(6deg); } }",

    "/* Najszarszy Dzień: cała strona szara, kulka pod kursorem oddaje kolor */",
    ".gk2-szaro { position: sticky; top: 0; height: calc(var(--vh) * 100); margin-bottom: calc(var(--vh) * -100); z-index: 70; pointer-events: none; --x: 50%; --y: 45%; --r: 130px;",
    "  -webkit-backdrop-filter: grayscale(1) contrast(.97); backdrop-filter: grayscale(1) contrast(.97);",
    "  -webkit-mask-image: radial-gradient(circle var(--r) at var(--x) var(--y), transparent calc(var(--r) - 2.5px), #000 var(--r)); mask-image: radial-gradient(circle var(--r) at var(--x) var(--y), transparent calc(var(--r) - 2.5px), #000 var(--r)); }",
    ".gk2-szaro-ui { position: sticky; top: 0; height: calc(var(--vh) * 100); margin-bottom: calc(var(--vh) * -100); z-index: 71; pointer-events: none; }",
    ".gk2-szaro-kula { position: absolute; left: 0; top: 0; width: 200px; height: 200px; border-radius: 50%; will-change: transform; transform: translate3d(-400px, -400px, 0);",
    "  box-shadow: inset 0 0 0 1.5px rgba(255,255,255,.85), inset 0 0 26px rgba(255,255,255,.45), inset -12px -16px 36px rgba(155,17,30,.12), 0 18px 46px -20px rgba(20,10,10,.55); }",
    ".gk2-szaro-kula::before { content: ''; position: absolute; left: 15%; top: 10%; width: 36%; height: 22%; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,255,255,.8), rgba(255,255,255,0)); transform: rotate(-28deg); }",
    ".gk2-szaro-pasek { position: absolute; left: 50%; bottom: 22px; transform: translateX(-50%); display: flex; align-items: center; gap: 16px; padding: 7px 7px 7px 18px; border-radius: 999px; background: rgba(17,17,17,.88); color: #F2EFE8; pointer-events: auto; white-space: nowrap; box-shadow: 0 14px 40px -18px rgba(0,0,0,.6); }",
    ".gk2-szaro-pasek button { font: inherit; letter-spacing: inherit; text-transform: inherit; color: var(--tusz); background: var(--roz); border: 0; border-radius: 999px; padding: 9px 14px; cursor: pointer; }",
    ".gk2[data-szaro] .gk2-kula { display: none; }",
    "@supports not ((backdrop-filter: grayscale(1)) or (-webkit-backdrop-filter: grayscale(1))) { .gk2[data-szaro] { filter: grayscale(1); } .gk2-szaro-kula { display: none; } }",
    ".gk2-szaro-podglad { display: inline-block; margin-top: 18px; padding: 6px 0 4px; font: inherit; font-size: 11px; color: inherit; background: none; border: 0; border-bottom: 1px solid currentColor; cursor: pointer; opacity: .8; }",
    "@media (hover: hover) { .gk2-szaro-podglad:hover { opacity: 1; } }",

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
    "  .gk2-sklep .gk2-lead { order: 3; margin-top: 20px; }",
    "  .gk2-wypieki { order: 4; margin-top: 18px; grid-template-columns: minmax(0, 1fr); gap: 12px; }",
    "  .gk2-fakty { order: 5; margin: 18px 0 0; font-size: 11px; }",
    "  .gk2-fakty div { grid-template-columns: 7.2em 1fr; padding: 8px 0; }",
    "  .gk2-sklep-tekst > .gk2-przycisk { order: 6; margin-top: 18px; align-self: flex-start; }",
    "  .gk2-wypiek { grid-template-columns: 26vw minmax(0, 1fr); column-gap: 14px; row-gap: 5px; align-items: start; }",
    "  .gk2-wypiek-foto { grid-row: 1 / span 4; }",
    "  .gk2-wypiek-nr { margin-top: 2px; }",
    "  .gk2-wypiek-nazwa { font-size: 7.2vw; }",
    "  .gk2-wypiek-opis { font-size: 12px; line-height: 1.42; }",
    "  .gk2-wypiek-link { margin-top: 2px; }",
    "  .gk2-opak { --kx: calc(var(--sw) * .5); --ky: calc(var(--sh) * .67); --kw: calc(var(--sw) * .62); }",
    "  .gk2-pas-v { display: none; }",
    "  .gk2-papier-gora { top: 64px; }",
    "  .gk2-papier-gora span + span { display: none; }",
    "  .gk2-papier-napis { top: calc(var(--sh) * .14); font-size: 18.6vw; }",
    "  .gk2-papier-dol { bottom: calc(var(--sh) * .045); }",
    "  .gk2-firmy { grid-template-columns: minmax(0, 1fr); grid-template-areas: 'glowa' 'foto' 'tresc'; padding: calc(var(--vh) * 13) var(--m); }",
    "  .gk2-firmy-foto { justify-self: center; width: 78vw; margin: 14vw 0 10px; }",
    "  .gk2-firmy-tresc .gk2-lead { margin-top: 22px; }",
    "  .gk2-trojka { grid-template-columns: minmax(0, 1fr); margin-top: 26px; }",
    "  .gk2-trojka li { padding: 15px 0; gap: 9px; }",
    "  .gk2-trojka li + li { padding-left: 0; border-left: 0; border-top: 1.5px solid var(--tusz); }",
    "  .gk2-trojka b { font-size: 8vw; }",
    "  .gk2-zapytanie { grid-template-columns: minmax(0, 1fr); margin-top: 28px; }",
    "  .gk2-zrodla { padding: calc(var(--vh) * 13) var(--m); }",
    "  .gk2-zrodla-glowa, .gk2-zrodla-rzad { grid-template-columns: minmax(0, 1fr); }",
    "  .gk2-zrodla-glowa .gk2-lead { margin-top: 22px; }",
    "  .gk2-zrodla-rzad { margin-top: calc(var(--vh) * 5); row-gap: 26px; }",
    "  .gk2-farma { margin: 0 calc(var(--m) * -1); }",
    "  .gk2-farma-okno { border-radius: 0; }",
    "  .gk2-farma figcaption { display: grid; gap: 0; margin-top: 12px; padding: 0 var(--m); }",
    "  /* linki pod palec: większe pole dotyku, ten sam wygląd */",
    "  .gk2-zrodla-link { padding: 10px 0 5px; margin-top: 0; }",
    "  .gk2-zrodla-lista li { padding: 16px 0; }",
    "  .gk2-zrodla-skad { font-size: 8vw; }",
    "  .gk2-smaki-gora { top: calc(var(--vh) * 9.5); }",
    "  .gk2-rozek { --rh: min(calc(var(--vh) * 44), 90vw); left: 50%; top: calc(var(--vh) * 36); }",
    "  .gk2-beben { left: 0; right: 0; width: auto; top: calc(var(--vh) * 58); height: calc(var(--vh) * 22); perspective-origin: 50% 50%; }",
    "  .gk2-beben-nazwa { left: var(--m); right: var(--m); text-align: center; font-size: min(12.4vw, calc(var(--vh) * 6.6)); }",
    "  .gk2-smaki-opisy { left: var(--m); right: var(--m); width: auto; bottom: calc(var(--vh) * 10.5); text-align: center; }",
    "  .gk2-smaki-opis .gk2-lead { font-size: 15px; margin: 6px auto 0; max-width: 26em; }",
    "  .gk2-smak-stopka { display: none; }",
    "  .gk2-smaki-kropki { left: 0; right: 0; bottom: calc(var(--vh) * 3); justify-content: center; margin-right: 0; gap: 8px; }",
    "  .gk2-smaki-kropki button { width: 36px; height: 36px; }",
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
    "  .gk2-lista li { position: relative; }",
    "  .gk2-lista-strzalka { position: absolute; right: 0; top: 24px; }",
    "  .gk2-deptak { height: 46vw; }",
    "  .gk2-deptak-napis { right: auto; left: 0; top: auto; bottom: calc(100% + 10px); display: block; text-align: left; white-space: nowrap; }",
    "  .gk2-stopka { padding-top: calc(var(--vh) * 15); }",
    "  .gk2-prezent { left: var(--m); right: var(--m); top: calc(var(--vh) * 14 + 37.9vw + 18px); max-width: none; }",
    "  .gk2-prezent-cta { gap: 12px 18px; }",
    "  .gk2-prezent-kto { margin-bottom: 4px; }",
    "  .gk2-prezent-termin { display: block; margin-bottom: 16px; }",
    "  .gk2-papier-gora span + span { display: none; }",
    "  .gk2-stolik { grid-template-columns: minmax(0, 1fr); padding: calc(var(--vh) * 13) var(--m); }",
    "  .gk2-stolik-foto { order: 2; justify-self: center; width: 78vw; margin-top: 12vw; }",
    "  .gk2-stolik-formularz { grid-template-columns: 1fr 1fr; }",
    "  .gk2-pasek-zamow { position: sticky; bottom: 12px; z-index: 66; display: flex; align-items: center; justify-content: space-between; gap: 12px; height: 56px; margin: -68px var(--m) 12px; padding: 0 7px 0 18px; border-radius: 999px; background: var(--tusz); color: #F2EFE8; line-height: 1.35; transform: translate3d(0, 160%, 0); transition: transform .45s cubic-bezier(.2,.85,.25,1); box-shadow: 0 14px 36px -16px rgba(0,0,0,.55); }",
    "  .gk2-pasek-zamow.gk2-pasek-widac { transform: none; }",
    "  .gk2-pasek-zamow b { font-weight: 400; color: var(--tusz); background: var(--roz); border-radius: 999px; padding: 12px 16px; }",
    "  .gk2-szaro-pasek { left: var(--m); right: var(--m); bottom: 14px; transform: none; white-space: normal; justify-content: space-between; gap: 12px; padding: 8px 8px 8px 16px; border-radius: 22px; line-height: 1.4; }",
    "  .gk2-szaro-pasek button { flex: none; }",
    "  .gk2-sz-gosc-okno { left: 52%; top: -26%; width: 34%; }",
    "}",
    "@media (max-width: 809px) and (max-height: 700px), (max-aspect-ratio: 21/20) and (max-height: 700px) {",
    "  .gk2-opak { --ky: calc(var(--sh) * .71); --kw: calc(var(--sw) * .52); }",
    "  .gk2-papier-napis { top: calc(var(--sh) * .13); font-size: 16.5vw; }",
    "  .gk2-prezent { top: calc(var(--vh) * 13 + 33.7vw + 16px); }",
    "  .gk2-papier-dol { display: none; }",
    "}",
    "@media (prefers-reduced-motion: reduce) {",
    "  .gk2 *, .gk2 *::before, .gk2 *::after { animation: none !important; transition: none !important; }",
    "  .gk2-js .gk2-wjazd, .gk2-js .gk2-linie > span > span, .gk2-js .gk2-s { opacity: 1 !important; transform: none !important; }",
    "  .gk2-js .gk2-opak, .gk2-js .gk2-swieta-droga { display: none !important; }",
    "  .gk2-film-zdjecia img:first-child { opacity: 1; }",
    "  .gk2-js .gk2-hero, .gk2-js .gk2-kino { height: calc(var(--vh) * 100); }",
    "  .gk2-js .gk2-sz-ruch { transform: none !important; opacity: 1 !important; }",
    "  .gk2-js .gk2-prezent { display: none; }",
    "}",
].join("\n")

const CSS = CSS_A + "\n" + CSS_B

// Brzeg zalewu w Smakach: falująca linia z kapkami, które rosną, gdy smak spływa w dół ekranu.
// Współrzędne w pikselach sceny pomniejszone o (ox, oy), żeby ten sam kształt przyciął też gałkę rożka.
function zalew(w: number, h: number, p: number, czas: number, ox: number, oy: number) {
    const D = h * 0.2
    const yb = lerp(-D - 14, h + 4, p) - oy
    const rzadko = w < 700
    const ro = rzadko ? w * 1.8 : w
    const wzrost = 0.55 + 0.45 * clamp(p / 0.6, 0, 1)
    const X = (v: number) => (v - ox).toFixed(1)
    const Y = (v: number) => v.toFixed(1)
    let d = "M" + X(-6) + "," + Y(-6 - oy) + "H" + X(w + 6) + "V" + Y(yb)
    let px = w + 6
    for (let k = KAPKI.length - 1; k >= 0; k--) {
        if (rzadko && k % 2) continue
        const kp = KAPKI[k]
        const x = kp.x * w
        const r = kp.r * ro
        const b = r * 1.5
        const L = Math.max(b, kp.l * D * wzrost * (1 + 0.07 * Math.sin(czas * 1.6 + kp.f)) - r)
        const prawo = x + r + b
        // między kapkami brzeg lekko faluje
        d += "Q" + X((px + prawo) / 2) + "," + Y(yb + h * 0.012 * Math.sin(czas * 1.1 + k * 1.7)) + " " + X(prawo) + "," + Y(yb)
        d += "C" + X(x + r + b * 0.35) + "," + Y(yb) + " " + X(x + r) + "," + Y(yb + b * 0.6) + " " + X(x + r) + "," + Y(yb + L)
        d += "A" + r.toFixed(1) + "," + r.toFixed(1) + " 0 0 1 " + X(x - r) + "," + Y(yb + L)
        d += "C" + X(x - r) + "," + Y(yb + b * 0.6) + " " + X(x - r - b * 0.35) + "," + Y(yb) + " " + X(x - r - b) + "," + Y(yb)
        px = x - r - b
    }
    d += "Q" + X(px / 2) + "," + Y(yb + h * 0.01 * Math.sin(czas * 0.9)) + " " + X(-6) + "," + Y(yb) + "Z"
    return d
}

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
        smakG: 0,
        smakFs: 0,
        smakV: 0,
        smakTlo: "",
        smakZ: "",
        smakB: "",
        pasek: false,
        szX: -1,
        szY: -1,
        szLx: -1,
        szLy: -1,
        farma: "",
        farmaSam: 0,
        farmaT: 0,
    }
    const geo = { vw: 0, vh: 0, il: 0, it: 0, iw: 0, ih: 0, pw: 150, p1w: 0, p1h: 0, dpr: 1, zw: 0, zh: 0, rx: 0, ry: 0, bR: 300 }
    // Napisy w Smakach zmieniają kolor dopiero wtedy, gdy dopłynie do nich nowy smak: środek każdego bloku w pionie.
    const SMAKI_NAPISY = ["smakiGora", "beben", "smakiOpisy", "smakiKropki"]
    const napisY: number[] = SMAKI_NAPISY.map(() => 0)
    const napisKol: string[] = SMAKI_NAPISY.map(() => "")
    const wygl: Record<string, number> = {}
    const gladko = (k: string, cel: number) => {
        if (dotyk || reduce || wygl[k] === undefined) wygl[k] = cel
        else wygl[k] += (cel - wygl[k]) * 0.16
        return wygl[k]
    }

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
        // Smaki: rozmiar sceny (zalew), miejsce rożka w scenie (przycięcie gałki) i promień bębna z nazwami.
        if (el.smakiScena) {
            geo.zw = el.smakiScena.clientWidth
            geo.zh = el.smakiScena.clientHeight
            if (el.smakiZalew) el.smakiZalew.setAttribute("viewBox", "0 0 " + geo.zw + " " + geo.zh)
            if (el.rozek) geo.ry = el.rozek.offsetTop + el.rozek.offsetHeight / 2
            const n0 = el.bebenNazwa0 as HTMLElement | undefined
            const fz = n0 ? parseFloat(window.getComputedStyle(n0).fontSize) || 100 : 100
            geo.bR = fz * 3.3
            SMAKI_NAPISY.forEach((k, i) => {
                const b = el[k] as HTMLElement | undefined
                if (b) napisY[i] = b.offsetTop + b.offsetHeight / 2
            })
            s.smakZ = "-"
            s.smakB = "-"
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

    // Żywy chrom: rożek w Smakach (odbija kolor smaku) i balony na Najszarszy Dzień.
    let chromRozek: Chrom | null = null
    let chromBalony: Chrom | null = null
    const kolA = [0, 0, 0]
    const kolB = [0, 0, 0]
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

    // Smaki: przeciąganie w bok, kropki, klik w rożek i strzałki zmieniają smak (przewijając sekcję).
    const smakiSek = el.smaki as HTMLElement | undefined
    const smakiSc = el.smakiScena as HTMLElement | undefined
    const ciag = { id: -1, x0: 0, y0: 0, przes0: 0, smak0: 0, ruszyl: false, vx: 0, ostX: 0, ostT: 0, tlumKlik: false }
    // Ile pikseli przeciągnięcia to jeden smak: na telefonie jedno zwykłe machnięcie = jeden smak.
    const krokSmaku = () => (dotyk ? Math.max(150, geo.vw * 0.6) : clamp(geo.vw * 0.3, 110, 380))
    const zakresSmakow = () => (smakiSek ? Math.max(1, smakiSek.offsetHeight - window.innerHeight) : 1)
    const smakTeraz = () => {
        if (!smakiSek) return 0
        const n = SMAKI.length
        return clamp(-smakiSek.getBoundingClientRect().top / zakresSmakow(), 0, 1) * (n - 1)
    }
    const naSmak = (i: number, plynnie: boolean) => {
        if (!smakiSek) return
        const n = SMAKI.length
        const k = clamp(Math.round(i), 0, n - 1)
        const gora = smakiSek.getBoundingClientRect().top + window.scrollY
        window.scrollTo({ top: Math.round(gora + (k / (n - 1)) * zakresSmakow()), behavior: plynnie && !reduce ? "smooth" : "auto" })
    }
    const smakDol = (e: PointerEvent) => {
        ciag.tlumKlik = false
        if (e.button > 0) return
        const cel = e.target as HTMLElement | null
        if (cel && cel.closest && cel.closest("button, a")) return
        ciag.id = e.pointerId
        ciag.x0 = e.clientX
        ciag.y0 = e.clientY
        ciag.przes0 = window.scrollY
        ciag.smak0 = Math.round(smakTeraz())
        ciag.ruszyl = false
        ciag.vx = 0
        ciag.ostX = e.clientX
        ciag.ostT = performance.now()
    }
    const smakRuch = (e: PointerEvent) => {
        if (e.pointerId !== ciag.id || !smakiSc) return
        const dx = e.clientX - ciag.x0
        if (!ciag.ruszyl) {
            if (Math.abs(dx) < 8) return
            if (Math.abs(e.clientY - ciag.y0) > Math.abs(dx)) {
                ciag.id = -1
                return
            }
            ciag.ruszyl = true
            try {
                smakiSc.setPointerCapture(e.pointerId)
            } catch (_) {}
            smakiSc.classList.add("gk2-ciagnie")
        }
        const teraz = performance.now()
        ciag.vx = lerp(ciag.vx, (e.clientX - ciag.ostX) / Math.max(1, teraz - ciag.ostT), 0.35)
        ciag.ostX = e.clientX
        ciag.ostT = teraz
        window.scrollTo(0, ciag.przes0 - (dx / krokSmaku()) * (zakresSmakow() / (SMAKI.length - 1)))
    }
    const smakGora = (e: PointerEvent) => {
        if (e.pointerId !== ciag.id) return
        ciag.id = -1
        if (!ciag.ruszyl) return
        ciag.ruszyl = false
        ciag.tlumKlik = true
        if (smakiSc) smakiSc.classList.remove("gk2-ciagnie")
        // Dokończ do najbliższego smaku; wyraźny ruch w bok to zawsze co najmniej jeden smak dalej.
        const dx = ciag.ostX - ciag.x0
        let cel = Math.round(ciag.smak0 - dx / krokSmaku() + clamp(-ciag.vx * 0.3, -0.45, 0.45))
        if (cel === ciag.smak0 && Math.abs(dx) > 40) cel = ciag.smak0 + (dx < 0 ? 1 : -1)
        naSmak(cel, true)
    }
    const smakKlik = (e: MouseEvent) => {
        if (ciag.tlumKlik) {
            ciag.tlumKlik = false
            return
        }
        const cel = e.target as HTMLElement | null
        if (!cel || !cel.closest) return
        const kropka = cel.closest("[data-smak]") as HTMLElement | null
        if (kropka) {
            naSmak(parseInt(kropka.getAttribute("data-smak") || "0", 10), true)
            return
        }
        if (cel.closest(".gk2-rozek")) {
            const i = Math.round(smakTeraz())
            naSmak(i >= SMAKI.length - 1 ? 0 : i + 1, true)
        }
    }
    const smakKlawisz = (e: KeyboardEvent) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
        const i = clamp(Math.round(smakTeraz()) + (e.key === "ArrowRight" ? 1 : -1), 0, SMAKI.length - 1)
        naSmak(i, true)
        const b = el.smakiKropki && (el.smakiKropki.children[i] as HTMLElement | undefined)
        if (b && b.focus) b.focus({ preventScroll: true })
        e.preventDefault()
    }
    if (smakiSc) {
        smakiSc.addEventListener("pointerdown", smakDol)
        smakiSc.addEventListener("pointermove", smakRuch)
        smakiSc.addEventListener("pointerup", smakGora)
        smakiSc.addEventListener("pointercancel", smakGora)
        smakiSc.addEventListener("click", smakKlik)
    }
    if (el.smakiKropki) el.smakiKropki.addEventListener("keydown", smakKlawisz)

    // Zabawka: taśmy „10 YEARS” da się pociągnąć; puszczone wracają sprężyście.
    const tasmy = Array.prototype.slice.call(root.querySelectorAll(".gk2-tasma")).map((e: HTMLElement) => ({
        e,
        kat: e.classList.contains("gk2-tasma-a") ? -2.4 : 1.8,
        x: 0,
        y: 0,
        r: 0,
        vx: 0,
        vy: 0,
        vr: 0,
        id: -1,
        x0: 0,
        y0: 0,
        gx: 0,
        ruch: false,
    }))
    const gumka = (d: number, lim: number) => lim * Math.tanh(d / lim)
    const tasmaDol = (e: PointerEvent) => {
        const cel = e.target as HTMLElement | null
        const te = cel && cel.closest ? (cel.closest(".gk2-tasma") as HTMLElement | null) : null
        if (!te) return
        const ta = tasmy.find((q) => q.e === te)
        if (!ta) return
        const r = te.getBoundingClientRect()
        ta.id = e.pointerId
        ta.x0 = e.clientX - ta.x
        ta.y0 = e.clientY - ta.y
        ta.gx = clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2), -1, 1)
        ta.ruch = true
        try {
            te.setPointerCapture(e.pointerId)
        } catch (_) {}
        te.classList.add("gk2-ciagnie")
    }
    const tasmaRuch = (e: PointerEvent) => {
        for (const ta of tasmy) {
            if (ta.id !== e.pointerId) continue
            ta.x = gumka(e.clientX - ta.x0, 90)
            ta.y = dotyk ? 0 : gumka(e.clientY - ta.y0, 70)
            ta.r = clamp(ta.y * 0.07 * ta.gx, -7, 7)
            ta.vx = ta.vy = ta.vr = 0
        }
    }
    const tasmaGora = (e: PointerEvent) => {
        for (const ta of tasmy) {
            if (ta.id !== e.pointerId) continue
            ta.id = -1
            ta.e.classList.remove("gk2-ciagnie")
        }
    }
    root.addEventListener("pointerdown", tasmaDol)
    root.addEventListener("pointermove", tasmaRuch)
    root.addEventListener("pointerup", tasmaGora)
    root.addEventListener("pointercancel", tasmaGora)
    let tOst = performance.now()

    // Zabawka: słońce na pierwszym ekranie kliknięte kręci się jak bąk.
    const slonceKlik = (e: MouseEvent) => {
        const sl = el.slonce as HTMLElement | undefined
        if (!sl || reduce) return
        const r = sl.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        if (Math.hypot(e.clientX - cx, e.clientY - cy) > Math.min(r.width, r.height) * 0.5) return
        const img = sl.querySelector("img") as HTMLElement | null
        if (img && (img as any).animate) img.animate([{ transform: "rotate(0deg)" }, { transform: "rotate(720deg)" }], { duration: 1700, easing: "cubic-bezier(.12,.7,.2,1)" })
    }
    root.addEventListener("click", slonceKlik)

    // Najszarszy Dzień: na telefonie kulka idzie za palcem (dotyk działa też w trakcie przewijania).
    const palecKuli = (e: TouchEvent) => {
        const p = e.touches && e.touches[0]
        if (!p) return
        s.szX = p.clientX
        s.szY = p.clientY
    }
    window.addEventListener("touchstart", palecKuli, { passive: true })
    window.addEventListener("touchmove", palecKuli, { passive: true })

    // Szary Dzień: dotknięty chowa się za krawędź (albo tańczy, gdy stoi na widoku).
    const szaryKlik = (e: MouseEvent) => {
        const cel = e.target as HTMLElement | null
        const sz = cel && cel.closest ? (cel.closest("[data-sz]") as HTMLElement | null) : null
        if (!sz) return
        e.preventDefault()
        const klasa = sz.classList.contains("gk2-sz-zza") ? "gk2-sz-chowa" : "gk2-sz-tanczy"
        sz.classList.remove(klasa)
        void sz.offsetWidth
        sz.classList.add(klasa)
        window.setTimeout(() => sz.classList.remove(klasa), klasa === "gk2-sz-chowa" ? 1400 : 1900)
    }
    root.addEventListener("click", szaryKlik)

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
                // Przy słońcu w Gorzowie strona startuje od razu w kolorze (kulka nie musi go przynosić).
                const slonecznie = root.getAttribute("data-pogoda") === "slonce"
                const r = reduce || slonecznie ? rMax : lerp(r0, rMax, easeIn(pr))
                kolor.style.clipPath = "circle(" + r.toFixed(1) + "px at " + s.x.toFixed(1) + "px " + s.y.toFixed(1) + "px)"
                if (el.kula) {
                    el.kula.style.transform = "translate3d(" + (s.x - 100).toFixed(1) + "px," + (s.y - 100).toFixed(1) + "px,0) scale(" + (r / 100).toFixed(4) + ")"
                    el.kula.style.opacity = reduce || slonecznie ? "0" : clamp(1 - pr * 3.2, 0, 1).toFixed(3)
                }
                if (el.podpis) {
                    el.podpis.style.opacity = !reduce && !slonecznie && s.droga < 260 && p < 0.03 ? "1" : "0"
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
                    if (el.prezent) {
                        const o = clamp(1 - p / 0.05, 0, 1)
                        el.prezent.style.opacity = o.toFixed(3)
                        el.prezent.style.visibility = o > 0 ? "visible" : "hidden"
                    }
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

        // 5b. Od podstaw: rysunek łąki otwiera się z kulki do pełnego kadru
        const farma = el.farma as HTMLElement | undefined
        if (farma && !reduce) {
            const r = farma.getBoundingClientRect()
            if (r.bottom > -80 && r.top < vh + 80) {
                // Środek kulki leży na krowie z pierwszego planu (44% szerokości, 60% wysokości), nie na środku ekranu.
                let p = clamp((vh - r.top - r.height * 0.15) / (vh * 0.55), 0, 1)
                // Gdy większość rysunku jest już na ekranie, kadr otwiera się do końca sam, na czas: nie czeka na dalsze przewijanie.
                const naEkranie = (Math.min(vh, r.bottom) - Math.max(0, r.top)) / Math.max(1, r.height)
                if (naEkranie >= 0.7) s.farmaSam = Math.min(1, s.farmaSam + clamp(t - s.farmaT, 0, 0.1) / 0.8)
                s.farmaT = t
                p = Math.max(p, easeInOut(s.farmaSam))
                // Kulka rośnie coraz szybciej, żeby ostatnie rogi rysunku nie wisiały przycięte.
                const R = lerp(Math.min(r.width, r.height) * 0.3, Math.hypot(r.width * 0.56, r.height * 0.6) + 2, Math.pow(p, 1.5))
                const klip = p >= 1 ? "none" : "circle(" + R.toFixed(1) + "px at 44% 60%)"
                if (klip !== s.farma) {
                    s.farma = klip
                    farma.style.setProperty("-webkit-clip-path", klip)
                    farma.style.clipPath = klip
                }
            } else if (s.farmaSam) s.farmaSam = 0
        }

        // 6. Smaki: nowy smak spływa z góry jak roztopiony lód i po drodze maluje gałkę rożka
        const smaki = el.smaki as HTMLElement | undefined
        const scS = el.smakiScena as HTMLElement | undefined
        if (smaki && scS) {
            const r = smaki.getBoundingClientRect()
            if (r.bottom > -80 && r.top < vh + 80) {
                const n = SMAKI.length
                const g = gladko("smaki", clamp(-r.top / Math.max(1, smaki.offsetHeight - vh), 0, 1) * (n - 1))
                s.smakG = g
                // Miękkie zatrzaski: przy każdym smaku chwila spokoju, między nimi płynne przejście.
                const i0 = Math.min(n - 2, Math.floor(g))
                const u = g - i0
                const p = reduce ? (u < 0.5 ? 0 : 1) : easeInOut(clamp((u - 0.14) / 0.72, 0, 1))
                const fs = i0 + p
                const A = SMAKI[i0]
                const B = SMAKI[i0 + 1]
                const trwa = p > 0 && p < 1
                const tlo = p >= 1 ? B.kolor : A.kolor
                if (tlo !== s.smakTlo) {
                    scS.style.background = tlo
                    smaki.style.background = tlo
                    s.smakTlo = tlo
                }
                // Kolor napisów: każdy blok przełącza się, kiedy brzeg zalewu (z kapkami) przechodzi przez jego środek.
                const D = geo.zh * 0.2
                const yb = lerp(-D - 14, geo.zh + 4, p)
                for (let k = 0; k < SMAKI_NAPISY.length; k++) {
                    const b = el[SMAKI_NAPISY[k]] as HTMLElement | undefined
                    if (!b) continue
                    const q = p >= 1 ? 1 : p <= 0 ? 0 : easeInOut(clamp((yb - (napisY[k] - D)) / D, 0, 1))
                    const kol = A.tekst === B.tekst || q <= 0 ? A.tekst : q >= 1 ? B.tekst : mieszaj(A.tekst, B.tekst, q)
                    if (kol !== napisKol[k]) {
                        b.style.color = kol
                        napisKol[k] = kol
                    }
                }
                const sc = el.smakiZalewSciezka as SVGPathElement | undefined
                const kap = trwa ? zalew(geo.zw, geo.zh, p, t, 0, 0) : ""
                if (sc && kap !== s.smakZ) {
                    sc.setAttribute("d", kap)
                    sc.style.fill = B.kolor
                    s.smakZ = kap
                }
                // Chromowy rożek: kolor smaku w odbiciach zmienia się, kiedy zalew przepływa przez rożek.
                if (chromRozek) {
                    const D0 = geo.zh * 0.2
                    const yb0 = lerp(-D0 - 14, geo.zh + 4, p)
                    const q = p >= 1 ? 1 : p <= 0 ? 0 : easeInOut(clamp((yb0 - (geo.ry - D0)) / (D0 * 1.6), 0, 1))
                    const RA = SMAKI_RGB[i0]
                    const RB = SMAKI_RGB[i0 + 1]
                    for (let c = 0; c < 3; c++) {
                        kolA[c] = lerp(RA.a[c], RB.a[c], q)
                        kolB[c] = lerp(RA.b[c], RB.b[c], q)
                    }
                    chromRozek.rysuj({ czas: t, lx: s.lx, ly: s.ly, kx: 0, ky: 0, kr: 0, caly: 1, A: kolA, B: kolB })
                }
                // Bęben z nazwami obraca się razem z przewijaniem.
                const KROK = 34
                if (el.bebenOs) el.bebenOs.style.transform = reduce ? "none" : "translateZ(" + (-geo.bR).toFixed(0) + "px)"
                const aktywny = Math.round(fs)
                for (let i = 0; i < n; i++) {
                    const it = el["bebenNazwa" + i] as HTMLElement | undefined
                    if (it) {
                        const th = (fs - i) * KROK
                        const o = reduce ? (i === aktywny ? 1 : 0) : clamp(1 - Math.abs(th) / (KROK * 1.3), 0, 1)
                        it.style.opacity = o.toFixed(3)
                        it.style.transform = o > 0 && !reduce ? "translate3d(0,-50%,0) rotateX(" + th.toFixed(2) + "deg) translateZ(" + geo.bR.toFixed(0) + "px)" : "translate3d(0,-50%,0)"
                    }
                    const op = el["smakOpis" + i] as HTMLElement | undefined
                    if (op) {
                        const d = fs - i
                        const oo = reduce ? (i === aktywny ? 1 : 0) : clamp(1 - Math.abs(d) * 2.4, 0, 1)
                        op.style.opacity = oo.toFixed(3)
                        op.style.transform = reduce ? "none" : "translate3d(0," + (-d * 22).toFixed(1) + "px,0)"
                        op.style.visibility = oo > 0 ? "visible" : "hidden"
                    }
                }
                if (aktywny !== s.smak) {
                    s.smak = aktywny
                    if (el.smakiNr) el.smakiNr.textContent = SMAKI[aktywny].nr
                    if (el.smakiKropki) {
                        const dzieci = el.smakiKropki.children
                        for (let i = 0; i < dzieci.length; i++) dzieci[i].classList.toggle("gk2-on", i === aktywny)
                    }
                }
                // Rożek: lekko się kołysze, a przy zmianie smaku przechyla się w stronę ruchu.
                if (el.rozek && !reduce) {
                    const v = fs - s.smakFs
                    s.smakFs = fs
                    s.smakV += (clamp(v * 60, -3, 3) - s.smakV) * 0.12
                    const kat = Math.sin(t * 1.1) * 1.1 + s.smakV * 3.2 + (maKursor ? s.lx * 2.4 : 0)
                    el.rozek.style.transform = "translate3d(0," + (Math.sin(t * 0.8) * vh * 0.006).toFixed(1) + "px,0) rotate(" + kat.toFixed(2) + "deg)"
                }
            }
        }

        // 11. Taśmy: sprężyna po puszczeniu (pociągnięte trzymają się palca)
        const dtT = Math.min(0.05, Math.max(0, (teraz - tOst) / 1000))
        tOst = teraz
        for (const ta of tasmy) {
            if (!ta.ruch) continue
            if (ta.id < 0) {
                const K = 170
                const C = 9
                ta.vx += (-K * ta.x - C * ta.vx) * dtT
                ta.vy += (-K * ta.y - C * ta.vy) * dtT
                ta.vr += (-K * ta.r - C * ta.vr) * dtT
                ta.x += ta.vx * dtT
                ta.y += ta.vy * dtT
                ta.r += ta.vr * dtT
                if (Math.abs(ta.x) + Math.abs(ta.y) < 0.05 && Math.abs(ta.r) < 0.01 && Math.abs(ta.vx) + Math.abs(ta.vy) < 0.5) {
                    ta.ruch = false
                    ta.e.style.transform = ""
                    continue
                }
            }
            ta.e.style.transform = "rotate(" + ta.kat + "deg) translate3d(" + ta.x.toFixed(1) + "px," + ta.y.toFixed(1) + "px,0) rotate(" + ta.r.toFixed(2) + "deg)"
        }

        // 10. Najszarszy Dzień: strona szara, kulka pod kursorem (albo nad palcem) oddaje kolor
        const szaro = el.szaro as HTMLElement | undefined
        if (szaro) {
            const r = clamp(Math.min(vw, vh) * 0.17, 84, 170)
            let cx = 0
            let cy = 0
            if (maKursor) {
                cx = s.mx
                cy = s.my
            } else if (s.szX >= 0) {
                cx = s.szX
                cy = s.szY - (dotyk ? r * 0.9 : 0)
            } else {
                cx = vw * 0.5 + (reduce ? 0 : Math.sin(t * 0.31) * vw * 0.22)
                cy = vh * 0.42 + (reduce ? 0 : Math.sin(t * 0.47 + 1) * vh * 0.14)
            }
            if (s.szLx < 0 || reduce) {
                s.szLx = cx
                s.szLy = cy
            } else {
                s.szLx += (cx - s.szLx) * 0.22
                s.szLy += (cy - s.szLy) * 0.22
            }
            szaro.style.setProperty("--x", s.szLx.toFixed(1) + "px")
            szaro.style.setProperty("--y", s.szLy.toFixed(1) + "px")
            szaro.style.setProperty("--r", r.toFixed(1) + "px")
            const kula = el.szaroKula as HTMLElement | undefined
            if (kula) kula.style.transform = "translate3d(" + (s.szLx - 100).toFixed(1) + "px," + (s.szLy - 100).toFixed(1) + "px,0) scale(" + (r / 100).toFixed(4) + ")"
        } else if (s.szLx >= 0) s.szLx = -1

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

        // 12. Telefon: pasek „Zamów wypieki” do 21.12, schowany na pierwszym ekranie, przy sklepie i w stopce
        const pasek = el.pasekZamow as HTMLElement | undefined
        if (pasek) {
            let pokaz = false
            if (mobile && window.scrollY > vh * 0.6) {
                const sw = el.swieta as HTMLElement | undefined
                const rs = sw ? sw.getBoundingClientRect() : null
                const sklep = !!rs && s.otwarte && rs.bottom > vh * 0.35 && rs.top < vh * 0.65
                const st = el.stopka as HTMLElement | undefined
                const stopka = !!st && st.getBoundingClientRect().top < vh * 0.92
                // na przypiętych scenach (opowieść, filmy, smaki) pasek zasłaniałby podpisy i kropki
                let scena = false
                for (const k of ["hero", "kino", "smaki"]) {
                    const e = el[k] as HTMLElement | undefined
                    if (!e) continue
                    const r = e.getBoundingClientRect()
                    if (r.top <= 1 && r.bottom >= vh - 1) scena = true
                }
                pokaz = !sklep && !stopka && !scena
            }
            if (pokaz !== s.pasek) {
                pasek.classList.toggle("gk2-pasek-widac", pokaz)
                s.pasek = pokaz
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
            const dy = y - s.ostY
            let schowaj = s.schowana
            if (y < vh * 0.9) schowaj = false
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
        if (smakiSc) {
            smakiSc.removeEventListener("pointerdown", smakDol)
            smakiSc.removeEventListener("pointermove", smakRuch)
            smakiSc.removeEventListener("pointerup", smakGora)
            smakiSc.removeEventListener("pointercancel", smakGora)
            smakiSc.removeEventListener("click", smakKlik)
        }
        if (el.smakiKropki) el.smakiKropki.removeEventListener("keydown", smakKlawisz)
        root.removeEventListener("click", szaryKlik)
        window.removeEventListener("touchstart", palecKuli)
        root.removeEventListener("pointerdown", tasmaDol)
        root.removeEventListener("pointermove", tasmaRuch)
        root.removeEventListener("pointerup", tasmaGora)
        root.removeEventListener("pointercancel", tasmaGora)
        root.removeEventListener("click", slonceKlik)
        window.removeEventListener("touchmove", palecKuli)
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
    const [pogoda, ustawPogode] = useState<null | { temp: number; chmury: number; rodzaj: string }>(null)
    const [dzien, ustawDzien] = useState({ krotko: "18.01", dlugo: "poniedziałek, 18 stycznia 2027" })
    // Najszarszy Dzień: tego dnia cała strona jest szara, a kulka pod kursorem (albo palcem) oddaje kolor.
    // "dzien" = naprawdę dziś, "podglad" = ?szary w adresie albo przycisk w sekcji 18.01.
    const [szaro, ustawSzaro] = useState<"" | "dzien" | "podglad">("")
    // Pasek „Zamów wypieki” na telefonie: tylko do końca zamówień świątecznych.
    const [przedKoncemZamowien, ustawPrzedKoncem] = useState(true)

    useEffect(() => {
        const teraz = Date.now()
        ustawPrzedKoncem(teraz < KONIEC_ZAMOWIEN)
        const w = najszarszy(teraz)
        ustawDzien({ krotko: dwa(w.dzien) + ".01", dlugo: "poniedziałek, " + w.dzien + " stycznia " + w.rok })
        let tryb: "" | "dzien" | "podglad" = ""
        if (/[?&](szary|najszarszy)(=|&|$)/.test(window.location.search)) tryb = "podglad"
        else if (teraz >= w.start && teraz < w.start + 24 * 3600 * 1000) {
            let wylaczone = false
            try {
                wylaczone = window.sessionStorage.getItem("gk2-szaro-wyl") === "1"
            } catch (_) {}
            if (!wylaczone) tryb = "dzien"
        }
        if (tryb) ustawSzaro(tryb)
    }, [])
    const koniecSzarosci = () => {
        if (szaro === "dzien") {
            try {
                window.sessionStorage.setItem("gk2-szaro-wyl", "1")
            } catch (_) {}
        }
        ustawSzaro("")
    }

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
        // Podgląd: ?pogoda=deszcz | slonce | szaro w adresie strony.
        const wymus = (/[?&]pogoda=(deszcz|slonce|szaro)/.exec(window.location.search) || [])[1]
        fetch("https://api.open-meteo.com/v1/forecast?latitude=52.73&longitude=15.24&current=temperature_2m,cloud_cover,precipitation,weather_code,is_day&timezone=Europe%2FWarsaw", ctrl ? { signal: ctrl.signal } : undefined)
            .then((r) => (r.ok ? r.json() : Promise.reject(new Error("pogoda"))))
            .then((d) => {
                const c = d && d.current
                if (!anulowano && c && typeof c.cloud_cover === "number" && typeof c.temperature_2m === "number") {
                    const kod = typeof c.weather_code === "number" ? c.weather_code : 0
                    const pada = (kod >= 51 && kod <= 67) || (kod >= 80 && kod <= 82) || kod >= 95 || (typeof c.precipitation === "number" && c.precipitation >= 0.1)
                    const slonce = !pada && c.cloud_cover < 30 && c.is_day !== 0
                    ustawPogode({ temp: Math.round(c.temperature_2m), chmury: Math.round(c.cloud_cover), rodzaj: wymus || (pada ? "deszcz" : slonce ? "slonce" : "szaro") })
                } else if (!anulowano && wymus) ustawPogode({ temp: 6, chmury: 90, rodzaj: wymus })
            })
            .catch(() => {
                const wymus = (/[?&]pogoda=(deszcz|slonce|szaro)/.exec(window.location.search) || [])[1]
                if (!anulowano && wymus) ustawPogode({ temp: 6, chmury: 90, rodzaj: wymus })
            })
        return () => {
            anulowano = true
            clearTimeout(timer)
            if (ctrl) ctrl.abort()
        }
    }, [])

    const rodzajPogody = pogoda ? pogoda.rodzaj : ""
    const statusSzary = pogoda
        ? "Gorzów Wlkp., teraz " + pogoda.temp + "°C" + (rodzajPogody === "deszcz" ? " i pada. Szaro, ale pod parasolem." : ", " + pogoda.chmury + "% chmur. " + (pogoda.chmury >= 60 ? "Szaro." : pogoda.chmury >= 30 ? "Tak sobie." : "Słońce, ale kulka nie zaszkodzi."))
        : "Prognoza na dziś: szaro."
    const statusKolor = pogoda
        ? "Gorzów Wlkp., teraz " + pogoda.temp + "°C" + (rodzajPogody === "slonce" ? " i słońce. Od rana kolorowo." : rodzajPogody === "deszcz" ? " i pada. A u nas kolorowo." : ". I kolorowo.")
        : "Prognoza na dziś: kolorowo."
    const parasol = rodzajPogody === "deszcz" ? <i className="gk2-parasol-stolik" style={{ backgroundImage: "url(" + obraz(P.parasol.f, 1024) + ")" }} aria-hidden="true" /> : null

    const slowa = MANIFEST.split(" ")
    slowaRef.current = []

    const skok = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault()
        if (id === "gora") {
            window.scrollTo({ top: 0, behavior: "smooth" })
            return
        }
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
                <span>01 — Święta 2026</span>
                <span>Zamówienia do 21.12 · odbiór 23–24.12</span>
            </div>
            <div className="gk2-d gk2-papier-napis">
                <span>Rozpakuj</span>
                <span>Święta.</span>
            </div>
            <div className="gk2-e gk2-papier-dol">Przewijaj. Kokarda puści ↓</div>
        </div>
    )

    return (
        <div className="gk2" ref={rootRef} style={props.style} data-pogoda={rodzajPogody || undefined} data-szaro={szaro || undefined}>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />
            <div className="gk2-ziarno" aria-hidden="true" />
            {szaro ? <div className="gk2-szaro" ref={u("szaro")} aria-hidden="true" /> : null}
            {szaro ? (
                <div className="gk2-szaro-ui">
                    <div className="gk2-szaro-kula" ref={u("szaroKula")} aria-hidden="true" />
                    <div className="gk2-szaro-pasek gk2-e" role="status">
                        <span>
                            {szaro === "dzien" ? "Dziś Najszarszy Dzień. " : "Podgląd: tak wygląda strona " + dzien.krotko + ". "}
                            Kulka oddaje kolor tam, gdzie <span className="gk2-tylko-mysz">patrzysz</span>
                            <span className="gk2-tylko-dotyk">dotkniesz</span>.
                        </span>
                        <button type="button" onClick={koniecSzarosci}>
                            {szaro === "dzien" ? "Pokaż kolory" : "Zakończ podgląd"}
                        </button>
                    </div>
                </div>
            ) : null}

            <div className="gk2-nav-kotwica">
                <header className="gk2-nav" ref={u("nav")}>
                    <a className="gk2-nav-logo" href="#gk2-swieta" onClick={skok("gora")} aria-label="Górka & Kulka — początek strony">
                        <Wyc a={P.logotyp} rozmiar={1024} alt="Górka & Kulka" odrazu />
                    </a>
                    <nav className="gk2-nav-linki" aria-label="Główne">
                        {[
                            ["Wypieki", "gk2-swieta"],
                            ["Wigilie", "gk2-firmy"],
                            ["Stolik", "gk2-stolik"],
                            ["Lokale", "gk2-lokale"],
                            ["O nas", "gk2-dlaczego"],
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

            <section className="gk2-swieta" ref={u("swieta")} id="gk2-swieta" data-motyw="jasny">
                <h1 className="gk2-sr">Górka & Kulka — lody rzemieślnicze i ciasta z Gorzowa Wielkopolskiego. Wypieki na Święta 2026: zamówienia do 21 grudnia.</h1>
                <div className="gk2-swieta-lep">
                    <div className="gk2-sklep">
                        <i className="gk2-sklep-wstazka gk2-sklep-wstazka-a" aria-hidden="true" />
                        <i className="gk2-sklep-wstazka gk2-sklep-wstazka-b" aria-hidden="true" />
                        <i className="gk2-sklep-kokarda" aria-hidden="true" />
                        <div className="gk2-sklep-tekst">
                            <div className="gk2-e gk2-s">01 — Święta 2026</div>
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
                                        <span>
                                            <b>23 grudnia 10–19</b> · <b>24 grudnia 10–12</b>
                                        </span>
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
                                        <i style={{ backgroundImage: "url(" + obraz(w.wyc) + ")" }} />
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
                    <div className="gk2-prezent" ref={u("prezent")}>
                        <p className="gk2-e gk2-prezent-kto">{"Górka & Kulka · lody i\u00a0ciasta z\u00a0Gorzowa · od\u00a02016"}</p>
                        <p className="gk2-e gk2-prezent-termin">{"Zamówienia do 21\u00a0grudnia · odbiór 23–24.12 w\u00a0Kawiarni Centrum"}</p>
                        <div className="gk2-prezent-cta">
                            <a className="gk2-przycisk" href={ZAMOWIENIA}>
                                Zamów wypieki →
                            </a>
                            <a className="gk2-prezent-link gk2-e" href="#gk2-firmy" onClick={skok("gk2-firmy")}>
                                Wigilia firmowa
                            </a>
                            <a className="gk2-prezent-link gk2-e" href="#gk2-stolik" onClick={skok("gk2-stolik")}>
                                Stolik w Kawiarni Centrum
                            </a>
                        </div>
                    </div>
                </div>
                <div className="gk2-swieta-droga" ref={u("swietaDroga")} aria-hidden="true" />
            </section>

            <section className="gk2-firmy" id="gk2-firmy" data-motyw="jasny">
                <div className="gk2-firmy-glowa">
                    <div className="gk2-e">02 — Dla firm</div>
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

            <section className="gk2-stolik" id="gk2-stolik" data-motyw="jasny">
                <figure className="gk2-stolik-foto gk2-wjazd" data-wjazd="">
                    <div className="gk2-stolik-okno">
                        <img src={FOTO.sniadanie} alt="Śniadanie na stoliku w Kawiarni Centrum Górka & Kulka" loading="lazy" decoding="async" />
                    </div>
                    <figcaption className="gk2-e">Kawiarnia Centrum, ul. Sikorskiego 126 · codziennie 10–19</figcaption>
                </figure>
                <div className="gk2-stolik-tresc">
                    <div className="gk2-e">03 — Stolik</div>
                    <Linie linie={["Zarezerwuj", "stolik."]} className="gk2-h2" />
                    <p className="gk2-lead">{"Śniadanie, kawa, kawałek ciasta w\u00a0Kawiarni Centrum. Zostaw prośbę, a\u00a0my oddzwonimy albo napiszemy SMS, żeby ją potwierdzić."}</p>
                    <Stolik />
                </div>
            </section>

            <section className="gk2-lokale" ref={u("lokale")} id="gk2-lokale" data-motyw="jasny">
                <div className="gk2-lokale-gora">
                    <div>
                        <div className="gk2-e">04 — Lokale</div>
                        <Linie linie={["Trzy adresy", "w Gorzowie."]} className="gk2-h2" />
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
                        ["Kawiarnia Centrum", "ul. Sikorskiego 126", "Kawiarnia, lody, ciasta · codziennie 10–19", "Górka & Kulka Sikorskiego 126 Gorzów Wielkopolski"],
                        ["Nova Park", "Centrum handlowe Nova Park", "Lodziarnia · godziny galerii", "Górka & Kulka Nova Park Gorzów Wielkopolski"],
                        ["Górczyn", "Lodziarnia sezonowa", "Otwarta w sezonie, wiosna–lato", "Górka & Kulka Górczyn Gorzów Wielkopolski"],
                    ].map((l) => (
                        <li key={l[0]}>
                            <span className="gk2-d gk2-lista-nazwa">{l[0]}</span>
                            <span>{l[1]}</span>
                            <span>{l[2]}</span>
                            <a className="gk2-lista-strzalka" href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(l[3])} target="_blank" rel="noopener noreferrer">
                                Jak dojść ↗
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="gk2-deptak" ref={u("deptak")}>
                    <span className="gk2-e gk2-deptak-napis">
                        <span>Następny przystanek:</span> <span>Sikorskiego 126 →</span>
                    </span>
                    <div className="gk2-para" ref={u("para")}>
                        <Wyc a={P.para} rozmiar={1024} alt="Górka i Kulka idą na Sikorskiego, każde z rożkiem" />
                    </div>
                </div>
            </section>

            <section className="gk2-hero" ref={u("hero")} id="gk2-dlaczego" data-motyw="jasny">
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
                            {parasol}
                        </div>
                        <div className="gk2-ryc gk2-e">
                            <span>{RYCINY[0]}</span>
                            <span>Przewiń. Niech się rozpogodzi ↓</span>
                        </div>
                    </div>
                    <div className="gk2-warstwa gk2-kolor" ref={u("kolor")}>
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
                            {parasol}
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
                    <span>05 — Manifest</span>
                    <span>Górka & Kulka, Gorzów Wielkopolski, od 2016</span>
                </div>
                <p className="gk2-d gk2-manifest-tekst">
                    {slowa.map((w, i) => {
                        const rodzaj = w.charAt(0) === "~" ? " gk2-slowo-szare" : w.charAt(0) === "*" ? " gk2-slowo-rubin" : ""
                        const tekst = w.replace(/^[~*]/, "")
                        return (
                            <span
                                key={i}
                                className={"gk2-slowo" + rodzaj}
                                ref={(sl) => {
                                    slowaRef.current[i] = sl
                                }}
                            >
                                {rodzaj === " gk2-slowo-rubin" ? (
                                    <span className="gk2-zakreslacz" style={{ animationDelay: -((i * 1.7) % 9).toFixed(1) + "s" }}>
                                        {tekst}
                                    </span>
                                ) : (
                                    tekst
                                )}{" "}
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
                        <span>06 — Zajrzyj do nas</span>
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

            <section className="gk2-zrodla" id="gk2-zrodla" data-motyw="jasny">
                <div className="gk2-wiersz gk2-e">
                    <span>07 — Od podstaw</span>
                    <span>Mleko, śmietanka, jajka</span>
                </div>
                <div className="gk2-zrodla-glowa">
                    <Linie linie={["Sami.", "Od podstaw."]} className="gk2-h2" />
                    <p className="gk2-lead">{"Wszystko robimy sami, od\u00a0podstaw. Dlatego dokładnie wiemy, skąd bierzemy mleko, śmietankę i\u00a0jajka."}</p>
                </div>
                <div className="gk2-zrodla-rzad">
                    <figure className="gk2-farma">
                        <Laka oknoRef={u("farma")} />
                        <figcaption className="gk2-e">
                            <span>Ryc. 8 — Górka i Kulka u krów z Juchowa.</span>
                            <a className="gk2-zrodla-link" href={JUCHOWO_FILM} target="_blank" rel="noopener noreferrer">
                                Zobacz prawdziwe Juchowo ↗
                            </a>
                        </figcaption>
                    </figure>
                    <ul className="gk2-zrodla-lista">
                        {ZRODLA.map((z) => (
                            <li key={z.skad}>
                                <span className="gk2-e gk2-zrodla-co">{z.co}</span>
                                <b className="gk2-d gk2-zrodla-skad">{z.skad}</b>
                                <span className="gk2-zrodla-opis">{z.opis}</span>
                                {z.link ? (
                                    <a className="gk2-e gk2-zrodla-link" href={z.link[1]} target="_blank" rel="noopener noreferrer">
                                        {z.link[0]} ↗
                                    </a>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="gk2-noc" ref={u("noc")} id="gk2-dzien" data-motyw="ciemny">
                <div className="gk2-noc-tekst">
                    <div className="gk2-e">08 — Święto marki · {dzien.dlugo}</div>
                    <div className="gk2-d gk2-data gk2-wjazd" data-wjazd="">
                        {dzien.krotko}
                    </div>
                    <Linie linie={["Najszarszy", "Dzień."]} className="gk2-h2 gk2-h2-szary" />
                    <p className="gk2-lead">
                        Trzeci poniedziałek stycznia uchodzi za najsmutniejszy dzień w roku. U nas to święto. Raz do roku Szary Dzień jest gościem honorowym, a każda lodziarnia zamienia się w jego przyjęcie.
                    </p>
                    <Odliczanie />
                    <Zapis data={dzien.krotko} />
                    <button type="button" className="gk2-szaro-podglad gk2-e" onClick={() => (szaro ? koniecSzarosci() : ustawSzaro("podglad"))}>
                        {szaro ? "Wyłącz szarość" : "Zobacz stronę w dniu " + dzien.krotko + " →"}
                    </button>
                </div>
                <div className="gk2-balony" ref={u("balony")}>
                    <span className="gk2-sz-gosc-okno" data-wjazd="" aria-hidden="true">
                        <Szary p={SZARY_CALY} k={0} className="gk2-sz-gosc" />
                    </span>
                    <Wyc a={P.balony} rozmiar={1024} alt="Chromowe balony z monogramem Górka & Kulka" />
                    <canvas ref={u("plotnoBalony")} aria-hidden="true" />
                </div>
            </section>

            <section className="gk2-smaki" ref={u("smaki")} id="gk2-smaki" data-motyw="jasny" style={{ ["--n" as any]: SMAKI.length }}>
                <div className="gk2-smaki-scena" ref={u("smakiScena")} style={{ background: SMAKI[0].kolor, color: SMAKI[0].tekst }}>
                    <h2 className="gk2-sr">Smaki lodów</h2>
                    <ol className="gk2-sr">
                        {SMAKI.map((sm) => (
                            <li key={sm.nr}>
                                {sm.nazwa.join(" ")} ({sm.en}). {sm.opis}
                            </li>
                        ))}
                    </ol>
                    <svg className="gk2-smaki-zalew" ref={u("smakiZalew")} aria-hidden="true" preserveAspectRatio="none">
                        <path ref={u("smakiZalewSciezka")} d="" />
                    </svg>
                    <div className="gk2-smaki-gora gk2-e" ref={u("smakiGora")} aria-hidden="true">
                        <span>
                            09 — Smaki · <span ref={u("smakiNr")}>01</span> / 0{SMAKI.length}
                        </span>
                        <span className="gk2-tylko-mysz">← Przeciągnij w bok →</span>
                        <span className="gk2-tylko-dotyk">← Przesuń palcem →</span>
                    </div>
                    <div className="gk2-beben" ref={u("beben")} aria-hidden="true">
                        <div className="gk2-beben-os" ref={u("bebenOs")}>
                            {SMAKI.map((sm, i) => (
                                <div key={sm.nr} className="gk2-d gk2-beben-nazwa" ref={u("bebenNazwa" + i)}>
                                    {sm.nazwa.map((l) => (
                                        <span key={l}>{l}</span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="gk2-smaki-opisy" ref={u("smakiOpisy")} aria-hidden="true">
                        <div className="gk2-smaki-opisy-stos">
                            {SMAKI.map((sm, i) => (
                                <div key={sm.nr} className="gk2-smaki-opis" ref={u("smakOpis" + i)}>
                                    <p className="gk2-e">
                                        {sm.nr} · {sm.en}
                                    </p>
                                    <p className="gk2-lead">{sm.opis}</p>
                                </div>
                            ))}
                        </div>
                        <p className="gk2-e gk2-smak-stopka">Karta zmienia się jak pogoda. Dziś gościnnie: pumpkin spice latte i matcha z truskawką.</p>
                    </div>
                    <div className="gk2-rozek" ref={u("rozek")}>
                        <Wyc a={P.rozek} rozmiar={1024} alt="Chromowy rożek lodów Górka & Kulka" />
                        <canvas ref={u("plotnoRozek")} aria-hidden="true" />
                    </div>
                    <div className="gk2-smaki-kropki" ref={u("smakiKropki")} role="group" aria-label="Wybierz smak">
                        {SMAKI.map((sm, i) => (
                            <button key={sm.nr} type="button" data-smak={i} className={i === 0 ? "gk2-on" : undefined} aria-label={"Smak: " + sm.nazwa.join(" ")} />
                        ))}
                    </div>
                </div>
            </section>

            <Kubek tiltRef={u("kubekTilt")} />

            <div className="gk2-tasmy gk2-tasmy-dol" aria-hidden="true">
                <Tasma src={TASMA_ROZ} klasa="gk2-tasma-a gk2-tasma-roz" />
                <Tasma src={TASMA_MASLO} klasa="gk2-tasma-b gk2-tasma-maslo" />
            </div>

            <footer className="gk2-stopka" ref={u("stopka")} data-motyw="jasny">
                <div className="gk2-stopka-dzieci">
                    <Wyc a={P.dzieci} rozmiar={1024} alt="Mała Kulka z balonami w kształcie liczby 10" />
                    <Szary p={SZARY_CALY} k={0} className="gk2-sz-stoi" />
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
            {przedKoncemZamowien ? (
                <a className="gk2-pasek-zamow" ref={u("pasekZamow")} href={ZAMOWIENIA}>
                    <span className="gk2-e">
                        Wypieki na Święta
                        <br />
                        zamówienia do 21.12
                    </span>
                    <b className="gk2-e">Zamów →</b>
                </a>
            ) : null}
        </div>
    )
}

addPropertyControls(KonceptFundusz2, {
    film1: { type: ControlType.String, title: "Film 1", defaultValue: CDN + "assets/IQjZBI2wSEc8Xk8B4R0DBh6J0o.mp4" },
    film2: { type: ControlType.String, title: "Film 2", defaultValue: CDN + "assets/Qr03SvkgAz41mkdTjNXeLpjLE54.mp4" },
})
