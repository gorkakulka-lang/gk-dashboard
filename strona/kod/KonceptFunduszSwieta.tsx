import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

// Górka & Kulka — strona świąteczna 2026 w stylu Acne (/fundusz-swieta).
// Sernik na pierwszym ekranie, białe logo zjeżdża po zdjęciu aż do sklepu, rząd ciast z koszykiem i bilecikiem,
// wigilia firmowa, stolik, odbiór i adresy. Strona po świętach czeka w KonceptFunduszPropozycja (/fundusz-witryna).

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
// Wigilia firmowa: stół z kawą, brownie i świeczką przy lampkach (zdjęcie G&K, 1086 × 1448; w repo strona/grafiki/wigilia-firmowa-kawa.jpg)
const FOTO_WIGILIA = obraz("FXQzi3dxMw1Lhh7S2Y9o0nZZSM.jpg", 2048)
// Strona świąteczna: sernik baskijski z pudełkiem G&K (1729 × 910, ta sama sesja co FOTO.ciasto) i tarta pistacjowa
// z sernikiem i tortem w tle (1082 × 1492; w repo strona/grafiki/swieta-tarta-trzy-ciasta.jpg).
const FOTO_SWIETA = obraz("0NCCWCqa0Ep8SmT5AztREO4KPA.jpg")
const FOTO_TARTA = obraz("l5VY5R59aIxUHXLOCPUlwjhkNw.jpg", 2048)
// Wigilia firmowa (21.11.2026, zdjęcie od Pawła, 1086 × 1448; w repo strona/grafiki/swieta-wigilia-herbata-tort.jpg).
const FOTO_WIGILIA_SW = obraz("jq49oGmO0fmVniorvWL6gvBdzg.jpg")
// Sprzedaż online: false = oferta widoczna, koszyk zablokowany do startu płatności (Stripe). Przełącznik na dzień startu.
const SW_SPRZEDAZ = true
// Formularze (wigilia, stolik) zapisują się w G&K OS (Supabase, funkcja gk_www_request), a właściciel dostaje maila.
// Klucz publiczny (publishable) wolno trzymać w kodzie strony; dostęp do danych pilnują funkcje w bazie.
const SW_API = "https://fnranvobetqcxtawcjop.supabase.co/rest/v1/rpc/"
const SW_KLUCZ = "sb_publishable_PyMqWnUj33FHhXoALhy3Sw_rL0-4y73"
// Pasek logotypów KPO (plik z poprzedniej strony, przezroczysty PNG 1024 × 131) — zawsze na białym tle.
const KPO_PASEK = obraz("xPEA5XMgW1UjbF6u0Y7xyz69A.png")
const SW_PODSTRONY = [
    ["O nas", "/o-nas"],
    ["Współpraca B2B", "/wspolpraca-b2b"],
    ["Wypożyczalnia rowerów", "/wypozyczalnia-rowerow"],
    ["Handel obwoźny", "/handel-obwozny"],
    ["Dotacje", "/dotacje"],
    ["Regulamin", "/regulamin"],
    ["Polityka prywatności", "/polityka-prywatnosci"],
]

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
// Koniec zamówień świątecznych: 22.12.2026, północ czasu polskiego.
const KONIEC_ZAMOWIEN = Date.UTC(2026, 11, 21, 23, 0, 0)

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

// Zapytanie o wigilię firmową i prośba o stolik: zapis w G&K OS przez funkcję gk_www_request, mail do właściciela.
// Pole „strona” to pułapka na boty (ludzie go nie widzą), a czas wypełniania odsiewa automaty.
function swWyslij(rodzaj: string, dane: Record<string, string>, pulapka: string, ms: number): Promise<string> {
    return fetch(SW_API + "gk_www_request", {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: SW_KLUCZ },
        body: JSON.stringify({ p_kind: rodzaj, p_data: dane, p_trap: pulapka, p_ms: ms }),
    })
        .then((r) =>
            r.json().then(
                (j) => {
                    if (r.ok && j && j.ok) return ""
                    return (j && (j.hint || j.message)) || "Nie udało się wysłać."
                },
                () => (r.ok ? "" : "Nie udało się wysłać.")
            )
        )
        .catch(() => "Brak połączenia. Sprawdź internet i spróbuj jeszcze raz.")
}

function swDane(f: HTMLFormElement, pola: string[]): Record<string, string> {
    const d = new FormData(f)
    const w: Record<string, string> = {}
    pola.forEach((p) => {
        w[p] = String(d.get(p) || "").trim()
    })
    return w
}

function SwPulapka() {
    return (
        <label className="gk2-sw-pulapka" aria-hidden="true">
            Strona
            <input type="text" name="strona" tabIndex={-1} autoComplete="off" />
        </label>
    )
}

function SwStanWysylki(props: { blad: string; wysylam: boolean }) {
    if (props.blad)
        return (
            <p className="gk2-sw-blad" role="alert">
                {props.blad + " Możesz też zadzwonić: 500 344 913."}
            </p>
        )
    return null
}

function Zapytanie() {
    const [stan, ustawStan] = useState<"" | "wysylam" | "wyslane">("")
    const [blad, ustawBlad] = useState("")
    const start = useRef(Date.now())
    if (stan === "wyslane")
        return (
            <div className="gk2-zapytanie-dzieki" role="status">
                <p className="gk2-d gk2-h3">{"Dziękujemy. Odpiszemy z ofertą."}</p>
                <p className="gk2-drobny">{"Zwykle w ciągu jednego dnia roboczego."}</p>
            </div>
        )
    return (
        <form
            className="gk2-zapytanie"
            onSubmit={(e) => {
                e.preventDefault()
                if (stan === "wysylam") return
                const f = e.currentTarget
                const d = swDane(f, ["firma", "termin", "osoby", "kontakt"])
                ustawStan("wysylam")
                ustawBlad("")
                swWyslij("wigilia", d, String(new FormData(f).get("strona") || ""), Date.now() - start.current).then((b) => {
                    if (b) {
                        ustawBlad(b)
                        ustawStan("")
                    } else ustawStan("wyslane")
                })
            }}
        >
            <label className="gk2-pole">
                <span className="gk2-e">Firma</span>
                <input type="text" name="firma" required maxLength={120} autoComplete="organization" placeholder="Nazwa firmy" />
            </label>
            <Termin id="wigilia" etykieta="Termin" dialog="Wybierz dzień wigilii firmowej" />
            <label className="gk2-pole">
                <span className="gk2-e">Liczba osób</span>
                <input type="number" name="osoby" required min={2} max={400} inputMode="numeric" placeholder="np. 12" />
            </label>
            <label className="gk2-pole">
                <span className="gk2-e">E-mail lub telefon</span>
                <input type="text" name="kontakt" required maxLength={120} placeholder="Jak mamy odpisać?" />
            </label>
            <SwPulapka />
            <div className="gk2-zapytanie-dol">
                <button type="submit" className="gk2-przycisk" disabled={stan === "wysylam"}>
                    {stan === "wysylam" ? "Wysyłam…" : "Wyślij zapytanie"}
                </button>
                <span className="gk2-drobny">{"Odpiszemy z propozycją menu i wyceną."}</span>
            </div>
            <SwStanWysylki blad={blad} wysylam={stan === "wysylam"} />
            <p className="gk2-drobny gk2-sw-zgoda">
                {"Wysyłając formularz, przekazujesz nam dane do odpowiedzi na zapytanie. Szczegóły: "}
                <a href="/polityka-prywatnosci">polityka prywatności</a>.
            </p>
        </form>
    )
}

// Prośba o stolik w Kawiarni Centrum: kawiarnia oddzwania albo pisze SMS.
const GODZINY_STOLIKA = (() => {
    const g: string[] = []
    for (let h = 10; h <= 18; h++) {
        g.push(h + ":00")
        if (h < 18) g.push(h + ":30")
    }
    return g
})()
function Stolik() {
    const [stan, ustawStan] = useState<"" | "wysylam" | "wyslane">("")
    const [blad, ustawBlad] = useState("")
    const start = useRef(Date.now())
    if (stan === "wyslane")
        return (
            <div className="gk2-zapytanie-dzieki" role="status">
                <p className="gk2-d gk2-h3">Dziękujemy. Oddzwonimy albo napiszemy SMS.</p>
                <p className="gk2-drobny">{"Stolik jest zarezerwowany dopiero po naszym potwierdzeniu."}</p>
            </div>
        )
    return (
        <form
            className="gk2-zapytanie gk2-stolik-formularz"
            onSubmit={(e) => {
                e.preventDefault()
                if (stan === "wysylam") return
                const f = e.currentTarget
                const d = swDane(f, ["termin", "godzina", "osoby", "imie", "telefon"])
                ustawStan("wysylam")
                ustawBlad("")
                swWyslij("stolik", d, String(new FormData(f).get("strona") || ""), Date.now() - start.current).then((b) => {
                    if (b) {
                        ustawBlad(b)
                        ustawStan("")
                    } else ustawStan("wyslane")
                })
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
                <input type="text" name="imie" required maxLength={60} autoComplete="given-name" placeholder="np. Ola" />
            </label>
            <label className="gk2-pole">
                <span className="gk2-e">Telefon</span>
                <input type="tel" name="telefon" required maxLength={20} autoComplete="tel" inputMode="tel" placeholder="np. 601 234 567" />
            </label>
            <SwPulapka />
            <div className="gk2-zapytanie-dol">
                <button type="submit" className="gk2-przycisk" disabled={stan === "wysylam"}>
                    {stan === "wysylam" ? "Wysyłam…" : "Poproś o stolik"}
                </button>
                <span className="gk2-drobny">{"Więcej niż 8 osób albo firma? Napisz w sprawie wigilii firmowej."}</span>
            </div>
            <SwStanWysylki blad={blad} wysylam={stan === "wysylam"} />
            <p className="gk2-drobny gk2-sw-zgoda">
                {"Wysyłając prośbę, przekazujesz nam imię i telefon, żebyśmy mogli ją potwierdzić. Szczegóły: "}
                <a href="/polityka-prywatnosci">polityka prywatności</a>.
            </p>
        </form>
    )
}

// Sklep świąteczny „Scena ciast”: każde ciasto leży na różu RAL 3015, spod niego w poprzek sceny wychodzi aksamitna
// wstęga (ten sam aksamit co na paczce z kokardą). Przejście między ciastami steruje jedna zmienna --t (0..1):
// ciasta jadą po wstędze jak po taśmie. Palec prowadzi --t bezpośrednio, po puszczeniu domyka sprężyna.
type ScCiasto = { f: string; pw: number; ph: number; w: number; obr: number; cien: string; bx: number; by: number; bd: number; ba: number; lustro?: boolean }
type ScProdukt = { id: string; nr: string; krotko: string; tytul: string; reszta: string; sklad?: string[]; cena: number; miara: string; ciasto: ScCiasto; zast?: boolean }
const SC_P: ScProdukt[] = [
    {"id": "baskijski", "nr": "01", "krotko": "Baskijski", "tytul": "Sernik baskijski", "reszta": "na korzennym spodzie", "cena": 220, "miara": "24 cm", "zast": true, "ciasto": {"w": 74, "obr": 10, "cien": "bryla", "f": "aKhZ5Ex6DuMnZmya8csDwtl7zLQ.webp", "pw": 1100, "ph": 970, "bx": 0.5032, "by": 0.6528, "bd": 0.9918, "ba": 0.4601, "lustro": true}},
    {"id": "smietankowy", "nr": "02", "krotko": "Śmietankowy", "tytul": "Sernik śmietankowy", "reszta": "z polewą z białej czekolady z pomarańczą i ganache z białej czekolady", "cena": 220, "miara": "24 cm", "ciasto": {"w": 74, "obr": 10, "cien": "bryla", "f": "aKhZ5Ex6DuMnZmya8csDwtl7zLQ.webp", "pw": 1100, "ph": 970, "bx": 0.4968, "by": 0.6528, "bd": 0.9918, "ba": 0.4601}},
    {"id": "czekoladowy", "nr": "03", "krotko": "Czekoladowy", "tytul": "Sernik z polewą czekoladową", "reszta": "i czekoladowym ganache", "cena": 220, "miara": "24 cm", "ciasto": {"w": 74, "obr": 10, "cien": "bryla", "f": "w6ccdFYLNdUt5VcsUkEWWEJVxrY.webp", "pw": 1100, "ph": 1032, "bx": 0.4991, "by": 0.7063, "bd": 0.9922, "ba": 0.4379}},
    {"id": "tarta", "nr": "04", "krotko": "Tarta", "tytul": "Tarta pistacjowa", "reszta": "z malinami", "cena": 190, "miara": "24 cm", "ciasto": {"w": 64, "obr": 58, "cien": "dysk", "f": "e9LdZK2SAn0XT6xJePN95umsrE.webp", "pw": 1100, "ph": 1061, "bx": 0.4945, "by": 0.5119, "bd": 0.9925, "ba": 0.4754}},
    {"id": "tort", "nr": "05", "krotko": "Tort", "tytul": "Tort czekoladowy", "reszta": "z kremem czekoladowym", "cena": 300, "miara": "24 cm", "ciasto": {"w": 80, "obr": 10, "cien": "bryla", "f": "VmHOxUZcgfZvoWnf0yFaZDaXjgw.webp", "pw": 1100, "ph": 777, "bx": 0.4973, "by": 0.6283, "bd": 0.9897, "ba": 0.5001}},
    {"id": "marchewkowy", "nr": "06", "krotko": "Marchewkowy", "tytul": "Tort marchewkowy", "reszta": "z kremem cream cheese", "cena": 250, "miara": "24 cm", "ciasto": {"w": 72, "obr": 10, "cien": "bryla", "f": "yXOtkJRnRfkHUP8S0Nt1sGy6jyA.webp", "pw": 1081, "ph": 1025, "bx": 0.4995, "by": 0.7021, "bd": 0.9893, "ba": 0.4535}},
    {"id": "box", "nr": "07", "krotko": "Box", "tytul": "Box dla dwojga", "reszta": "", "sklad": ["2× ptyś Lotus z owocami leśnymi", "2× brownie z kremem pistacjowym", "2× ciastko NYC o smaku sernika cynamonowego", "2× cake pop marchewkowy"], "cena": 120, "miara": "8 sztuk", "ciasto": {"w": 66, "obr": 0, "cien": "brak", "f": "YaxTl71vaoGvGI2ixOpGwr5QGeM.webp", "pw": 880, "ph": 1142, "bx": 0.5, "by": 0.745, "bd": 1.0, "ba": 0.0}},
]
// scena otwiera się na pierwszym cieście z prawdziwym zdjęciem
const SC_START = Math.max(0, SC_P.findIndex((q) => !q.zast))
// Odbiór tylko 23.12, 14:00–19:00 (24.12 dzień wolny, Nova Park zamknięte — Paweł 22.11). Godziny co godzinę są w G&K OS.
const SC_ODBIORY = [
    { kiedy: "23.12, 14:00–19:00", gdzie: "Kawiarnia Centrum", adres: "ul. Sikorskiego 126" },
    { kiedy: "23.12, 14:00–19:00", gdzie: "Nova Park", adres: "centrum handlowe" },
]
const SC_KLUCZ = "gk2-koszyk-swieta-v3"
const SC_MAKS = 5
const SC_ZADATEK = 0.3
// sprężyna domykająca przejście: sztywność i tłumienie (lekko niedotłumiona, ciasto minimalnie „dobija”)
const SC_SZT = 74
const SC_TLU = 13.6

const wnZl = (n: number) => n + " zł"

function IkonaTorba() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M4.8 8.2h14.4l-1.3 12.3H6.1L4.8 8.2zM8.8 8.2V6.6a3.2 3.2 0 0 1 6.4 0v1.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
        </svg>
    )
}

function IkonaStrzalka(props: { w: "l" | "p" }) {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d={props.w === "l" ? "M15 4.5L7.5 12l7.5 7.5" : "M9 4.5l7.5 7.5L9 19.5"} fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
    )
}

function IkonaZamknij() {
    return (
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
    )
}

function IkonaDalej() {
    return (
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M3 12h17M13.5 5.5L20 12l-6.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.9" />
        </svg>
    )
}

function IkonaJest() {
    return (
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path d="M4.5 12.5l5 5L19.5 7" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
    )
}

// ---------- Strona świąteczna w stylu Acne: półka z ciastami ----------
// Rząd ciast jak „Shop the collection” u Acne: wycięte ciasto na jasnym kaflu, pod nim nazwa, cena i „Dodaj do koszyka”.
// Bilecik odbioru (koszyk) i drukowany bilecik zostają z poprzedniego sklepu. Torba z licznikiem siedzi w menu strony
// i otwiera koszyk zdarzeniem „gk2-koszyk-przelacz”; „Zamów na Święta” otwiera go zdarzeniem „gk2-koszyk-otworz”.
// Oferta i płatności (22.11.2026): ceny, limity i godziny odbioru są w G&K OS (gk_www_offer). Zamówienie z zadatkiem idzie
// przez funkcję „zamowienie” do Stripe Checkout, a po powrocie ze Stripe strona pyta o stan płatności i czyści koszyk.
type SwPoz = { id: string; code: string; price_grosze: number; left: number | null; sold_out: boolean }
type SwOkno = { id: string; place: string; label: string; starts_at: string; left: number | null; full: boolean }
type SwBaza = { open: boolean; poz: Record<string, SwPoz>; okna: SwOkno[] }
type SwDzieki = { stan: string; numer: string; slot: string; miejsce: string; zadatek: number; razem: number }
const SW_ZAM = "https://fnranvobetqcxtawcjop.supabase.co/functions/v1/zamowienie"
const SW_TEL = "500 344 913"

function swOferta(): Promise<SwBaza | null> {
    return fetch(SW_API + "gk_www_offer", {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: SW_KLUCZ },
        body: JSON.stringify({ p_code: "swieta-2026" }),
    })
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => {
            if (!j || !j.ok) return null
            const poz: Record<string, SwPoz> = {}
            const lista: SwPoz[] = Array.isArray(j.items) ? j.items : []
            lista.forEach((i) => {
                if (i && i.code) poz[i.code] = i
            })
            return { open: !!j.open, poz: poz, okna: Array.isArray(j.slots) ? j.slots : [] }
        })
        .catch(() => null)
}

// „środa 23.12, 15:00–16:00” → „15:00–16:00”
const swGodzina = (etykieta: string) => {
    const i = etykieta.lastIndexOf(", ")
    return i >= 0 ? etykieta.slice(i + 2) : etykieta
}

function SwKafel(props: { p: ScProdukt; i: number; mam: number; maks: number; wyprzedane: boolean; otwarte: boolean; dodano: boolean; dodaj: (i: number) => void }) {
    const p = props.p
    const c = p.ciasto
    const wolne = props.maks - props.mam
    const styl = { ["--cw" as any]: c.w, ["--bx" as any]: c.bx, ["--by" as any]: c.by, ["--ba" as any]: c.ba } as React.CSSProperties
    const blokada = !p.cena
        ? "Wkrótce"
        : !SW_SPRZEDAZ
          ? "Zamówienia wkrótce"
          : !props.otwarte
            ? "Zamówienia zamknięte"
            : props.wyprzedane
              ? "Wyprzedane"
              : wolne <= 0
                ? props.maks < SC_MAKS
                    ? "Więcej już nie ma"
                    : "Maks. " + SC_MAKS + " szt."
                : ""
    return (
        <article className="gk2-sw-kafel gk2-sw-wjazd" style={{ ["--i" as any]: props.i } as React.CSSProperties}>
            <div className="gk2-sw-kafel-foto" style={styl}>
                <span className="gk2-e gk2-sw-kafel-nr">{p.nr}</span>
                {p.zast ? <span className="gk2-sw-kafel-zast">Zdjęcie zastępcze</span> : null}
                <i className={"gk2-sw-cien gk2-sw-cien-" + c.cien} aria-hidden="true" />
                <span className="gk2-sw-ciasto">
                    <img className={c.lustro ? "gk2-sw-lustro" : undefined} src={obraz(c.f)} width={c.pw} height={c.ph} alt="" loading="lazy" decoding="async" draggable={false} />
                </span>
                {props.mam > 0 ? <span className="gk2-e gk2-sw-kafel-mam">{"W koszyku: " + props.mam}</span> : null}
            </div>
            <div className="gk2-sw-kafel-opis">
                <h3 className="gk2-sw-kafel-nazwa">{p.tytul}</h3>
                {p.reszta ? <p className="gk2-sw-kafel-reszta">{p.reszta}</p> : null}
                {p.sklad ? (
                    <details className="gk2-sw-kafel-sklad">
                        <summary>{"Co jest w środku"}</summary>
                        <ul>
                            {p.sklad.map((s) => (
                                <li key={s}>{s}</li>
                            ))}
                        </ul>
                    </details>
                ) : null}
                <p className="gk2-sw-kafel-cena">
                    <b>{p.cena ? wnZl(p.cena) : "Cena wkrótce"}</b>
                    <span>{p.miara}</span>
                </p>
            </div>
            <button
                type="button"
                className={"gk2-sw-dodaj" + (props.dodano ? " gk2-sw-dodano" : "")}
                onClick={() => props.dodaj(props.i)}
                disabled={blokada !== ""}
                aria-label={(blokada || (props.dodano ? "W koszyku" : "Dodaj do koszyka")) + ": " + p.tytul}
            >
                {blokada ? (
                    blokada
                ) : props.dodano ? (
                    <>
                        <IkonaJest />W koszyku
                    </>
                ) : (
                    "Dodaj do koszyka"
                )}
            </button>
        </article>
    )
}

function Polka() {
    const korzen = useRef<HTMLDivElement>(null)
    const rzad = useRef<HTMLDivElement>(null)
    const biletRef = useRef<HTMLDivElement>(null)
    const zamknijRef = useRef<HTMLButtonElement>(null)
    const koszykRef = useRef<Record<string, number>>({})
    const zegary = useRef<Record<string, number>>({})
    const startKasy = useRef(0)
    const [panel, ustawPanel] = useState("")
    const [koszyk, ustawKoszyk] = useState<Record<string, number>>({})
    const [odbior, ustawOdbior] = useState(-1)
    const [bilet, ustawBilet] = useState<{ i: number; k: number } | null>(null)
    const [leci, ustawLeci] = useState(false)
    const [dodano, ustawDodano] = useState(-1)
    const [otwarteCzas, ustawOtwarte] = useState(true)
    const [wczytany, ustawWczytany] = useState(false)
    const [baza, ustawBaza] = useState<SwBaza | null>(null)
    const [krok, ustawKrok] = useState<"koszyk" | "dane">("koszyk")
    const [okno, ustawOkno] = useState("")
    const [wysylam, ustawWysylam] = useState(false)
    const [blad, ustawBlad] = useState("")
    const [przerwana, ustawPrzerwana] = useState("")
    const [dzieki, ustawDzieki] = useState<SwDzieki | null>(null)

    const otwarte = otwarteCzas && (baza ? baza.open : true)
    // ceny i dostępność z G&K OS (gdy dojdą); bez nich zostają ceny z kodu strony
    const produkty: ScProdukt[] = SC_P.map((p) => {
        const b = baza ? baza.poz[p.id] : null
        return b && b.price_grosze > 0 && Math.round(b.price_grosze / 100) !== p.cena ? Object.assign({}, p, { cena: Math.round(b.price_grosze / 100) }) : p
    })
    const maksDla = (id: string) => {
        const b = baza ? baza.poz[id] : null
        return b && typeof b.left === "number" ? Math.max(0, Math.min(SC_MAKS, b.left)) : SC_MAKS
    }
    const wyprzedane = (id: string) => {
        const b = baza ? baza.poz[id] : null
        return !!(b && b.sold_out)
    }

    const pozniej = (klucz: string, fn: () => void, ms: number) => {
        window.clearTimeout(zegary.current[klucz])
        zegary.current[klucz] = window.setTimeout(fn, ms)
    }
    const ruchOk = () => typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const strona = () => (korzen.current ? (korzen.current.closest(".gk2") as HTMLElement | null) : null)
    const torba = () => {
        const s = strona()
        return s ? (s.querySelector(".gk2-sw-torba") as HTMLElement | null) : null
    }
    const podskocz = () => {
        const t = torba()
        if (!t) return
        t.classList.remove("gk2-wn-hop")
        void t.offsetWidth
        t.classList.add("gk2-wn-hop")
    }
    // pasek pod rzędem (telefon, mały ekran): ile rzędu już widać
    const przewin = () => {
        const r = rzad.current
        const k = korzen.current
        if (!r || !k) return
        const max = r.scrollWidth - r.clientWidth
        k.style.setProperty("--p", max > 1 ? (r.scrollLeft / max).toFixed(3) : "0")
        k.style.setProperty("--w", max > 1 ? (r.clientWidth / r.scrollWidth).toFixed(3) : "1")
        k.classList.toggle("gk2-sw-rzad-caly", max <= 1)
    }
    const przesun = (d: number) => {
        const r = rzad.current
        if (!r) return
        const pierwszy = r.firstElementChild as HTMLElement | null
        const krok = pierwszy ? pierwszy.getBoundingClientRect().width + 10 : r.clientWidth * 0.8
        r.scrollBy({ left: d * krok, behavior: ruchOk() ? "smooth" : "auto" })
    }
    const wczytajOferte = () => {
        if (!SW_SPRZEDAZ) return
        swOferta().then((b) => {
            if (b) ustawBaza(b)
        })
    }
    const wyczyscKoszyk = () => {
        ustawKoszyk({})
        ustawOdbior(-1)
        ustawOkno("")
        ustawKrok("koszyk")
        try {
            window.localStorage.removeItem(SC_KLUCZ)
        } catch (e) {}
    }
    // po powrocie ze Stripe: stan płatności z G&K OS (webhook Stripe dochodzi zwykle w kilka sekund)
    const sprawdz = (sesja: string, proba: number) => {
        fetch(SW_ZAM + "?sesja=" + encodeURIComponent(sesja))
            .then((r) => r.json())
            .then((j) => {
                if (j && j.ok) {
                    const stan = j.pay_status === "oplacone" ? "oplacone" : j.pay_status === "w_toku" ? "w_toku" : j.status === "anulowane" ? "anulowane" : "czeka"
                    ustawDzieki({
                        stan: stan,
                        numer: String(j.number || ""),
                        slot: String(j.slot_label || ""),
                        miejsce: String(j.place || ""),
                        zadatek: Math.round(Number(j.deposit_grosze || 0) / 100),
                        razem: Math.round(Number(j.total_grosze || 0) / 100),
                    })
                    if (stan === "oplacone" || stan === "w_toku") {
                        wyczyscKoszyk()
                        wczytajOferte()
                        return
                    }
                    if (stan === "anulowane") return
                }
                if (proba < 20) pozniej("dzieki", () => sprawdz(sesja, proba + 1), 2000)
                else ustawDzieki((d) => d || { stan: "czeka", numer: "", slot: "", miejsce: "", zadatek: 0, razem: 0 })
            })
            .catch(() => {
                if (proba < 20) pozniej("dzieki", () => sprawdz(sesja, proba + 1), 3000)
            })
    }

    // Start: koszyk z przeglądarki, termin zamówień, oferta z G&K OS i powrót ze Stripe.
    useEffect(() => {
        if (typeof window === "undefined") return
        try {
            const z = SW_SPRZEDAZ ? JSON.parse(window.localStorage.getItem(SC_KLUCZ) || "null") : null
            if (z && typeof z === "object") {
                const k: Record<string, number> = {}
                SC_P.forEach((p) => {
                    const n = clamp(Math.round(Number(z.k && z.k[p.id]) || 0), 0, SC_MAKS)
                    if (n > 0 && p.cena > 0) k[p.id] = n
                })
                ustawKoszyk(k)
                if (typeof z.o === "number" && z.o >= 0 && z.o < SC_ODBIORY.length) ustawOdbior(z.o)
            }
        } catch (e) {}
        ustawWczytany(true)
        ustawOtwarte(Date.now() < KONIEC_ZAMOWIEN)
        wczytajOferte()
        if (SW_SPRZEDAZ) {
            try {
                const u = new URL(window.location.href)
                const platnosc = u.searchParams.get("platnosc")
                if (platnosc) {
                    const sesja = u.searchParams.get("sesja") || ""
                    if (platnosc === "ok" && /^cs_(test|live)_[A-Za-z0-9]{10,200}$/.test(sesja)) {
                        ustawDzieki({ stan: "sprawdzam", numer: "", slot: "", miejsce: "", zadatek: 0, razem: 0 })
                        ustawPanel("dzieki")
                        sprawdz(sesja, 0)
                    } else if (platnosc === "przerwana") {
                        ustawPrzerwana((u.searchParams.get("zamowienie") || "").slice(0, 12))
                        ustawPanel("koszyk")
                    }
                    u.searchParams.delete("platnosc")
                    u.searchParams.delete("sesja")
                    u.searchParams.delete("zamowienie")
                    window.history.replaceState(null, "", u.pathname + u.search + u.hash)
                }
            } catch (e) {}
        }
        przewin()
        window.addEventListener("resize", przewin)
        const z = zegary.current
        return () => {
            window.removeEventListener("resize", przewin)
            Object.keys(z).forEach((klucz) => window.clearTimeout(z[klucz]))
        }
    }, [])

    let suma = 0
    let razem = 0
    produkty.forEach((p) => {
        const n = koszyk[p.id] || 0
        suma += n
        razem += n * p.cena
    })
    const zadatek = Math.ceil(razem * SC_ZADATEK)

    // Koszyk: zapis w przeglądarce i licznik w menu (bez przerysowywania całej strony).
    useEffect(() => {
        koszykRef.current = koszyk
        if (!wczytany || !SW_SPRZEDAZ) return
        try {
            window.localStorage.setItem(SC_KLUCZ, JSON.stringify({ k: koszyk, o: odbior }))
        } catch (e) {}
        const s = strona()
        if (s) {
            s.setAttribute("data-koszyk", String(suma))
            s.style.setProperty("counter-reset", "gk2koszyk " + suma)
        }
        const t = torba()
        if (t) t.setAttribute("aria-label", "Koszyk, " + suma + " szt.")
    }, [koszyk, odbior, suma, wczytany])

    // „Zamów na Święta” otwiera koszyk, jeśli coś w nim jest; torba w menu otwiera go i zamyka.
    useEffect(() => {
        const otworz = () => {
            if (SW_SPRZEDAZ && Object.keys(koszykRef.current).some((k) => koszykRef.current[k] > 0)) ustawPanel("koszyk")
        }
        const przelacz = () => {
            if (SW_SPRZEDAZ) ustawPanel((p) => (p === "koszyk" ? "" : "koszyk"))
        }
        window.addEventListener("gk2-koszyk-otworz", otworz)
        window.addEventListener("gk2-koszyk-przelacz", przelacz)
        return () => {
            window.removeEventListener("gk2-koszyk-otworz", otworz)
            window.removeEventListener("gk2-koszyk-przelacz", przelacz)
        }
    }, [])

    const zamknij = () => {
        ustawPanel("")
        const t = torba()
        if (t) t.focus({ preventScroll: true })
    }

    // Otwarty koszyk: fokus wchodzi do środka, Esc zamyka, fokus wraca na torbę. Przy otwarciu odświeżamy dostępność.
    useEffect(() => {
        const t = torba()
        if (t) t.setAttribute("aria-expanded", panel === "koszyk" ? "true" : "false")
        if (panel === "") return
        if (panel === "koszyk") wczytajOferte()
        if (zamknijRef.current) zamknijRef.current.focus({ preventScroll: true })
        const esc = (e: KeyboardEvent) => {
            if (e.key === "Escape") zamknij()
        }
        window.addEventListener("keydown", esc)
        return () => window.removeEventListener("keydown", esc)
    }, [panel])

    const zmien = (id: string, ile: number) => {
        ustawKoszyk((k0) => {
            const k = Object.assign({}, k0)
            const n = clamp(ile, 0, maksDla(id))
            if (n > 0) k[id] = n
            else delete k[id]
            return k
        })
    }
    const dodaj = (i: number) => {
        const p = produkty[i]
        const mam = koszyk[p.id] || 0
        if (!SW_SPRZEDAZ || !p.cena || !otwarte || wyprzedane(p.id) || mam >= maksDla(p.id)) return
        ustawKoszyk((k0) => {
            const ile = k0[p.id] || 0
            if (ile >= maksDla(p.id)) return k0
            const k = Object.assign({}, k0)
            k[p.id] = ile + 1
            return k
        })
        ustawDodano(i)
        pozniej("dodano", () => ustawDodano(-1), 2600)
        if (!ruchOk()) {
            podskocz()
            return
        }
        // bilecik drukuje się spod menu, potem składa się i leci do torby
        ustawLeci(false)
        ustawBilet({ i: i, k: Date.now() })
        pozniej(
            "lot",
            () => {
                const b = biletRef.current
                const t = torba()
                if (b && t) {
                    const rb = b.getBoundingClientRect()
                    const rt = t.getBoundingClientRect()
                    b.style.setProperty("--bx", (rt.left + rt.width / 2 - (rb.left + rb.width / 2)).toFixed(1) + "px")
                    b.style.setProperty("--by", (rt.top + rt.height / 2 - rb.top).toFixed(1) + "px")
                }
                ustawLeci(true)
            },
            1750
        )
        pozniej(
            "bilet",
            () => {
                ustawBilet(null)
                ustawLeci(false)
                podskocz()
            },
            2380
        )
    }

    const pozycje = produkty.filter((q) => (koszyk[q.id] || 0) > 0)
    const bp = bilet ? produkty[bilet.i] : null
    const miejsce = odbior >= 0 ? SC_ODBIORY[odbior].gdzie : ""
    const okna = baza ? baza.okna.filter((o) => o.place === miejsce) : []
    const wybraneOkno = okna.filter((o) => o.id === okno)[0] || null

    const zamow = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (wysylam) return
        const f = e.currentTarget
        const d = new FormData(f)
        if (!wybraneOkno || wybraneOkno.full) {
            ustawBlad("Wybierz godzinę odbioru.")
            return
        }
        ustawWysylam(true)
        ustawBlad("")
        fetch(SW_ZAM, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                pozycje: pozycje.map((q) => ({ kod: q.id, ile: koszyk[q.id] || 0 })),
                okienko: wybraneOkno.id,
                imie: String(d.get("imie") || "").trim(),
                telefon: String(d.get("telefon") || "").trim(),
                email: String(d.get("email") || "").trim(),
                uwagi: String(d.get("uwagi") || "").trim(),
                zgoda: d.get("zgoda") === "tak",
                strona: String(d.get("strona") || ""),
                ms: Date.now() - startKasy.current,
            }),
        })
            .then((r) => r.json().catch(() => null))
            .then((j) => {
                if (j && j.ok && j.url) {
                    window.location.href = j.url
                    return
                }
                ustawBlad((j && j.blad) || "Nie udało się złożyć zamówienia. Spróbuj jeszcze raz albo zadzwoń: " + SW_TEL + ".")
                ustawWysylam(false)
                wczytajOferte()
            })
            .catch(() => {
                ustawBlad("Brak połączenia. Sprawdź internet i spróbuj jeszcze raz.")
                ustawWysylam(false)
            })
    }

    const sumy = (
        <dl className="gk2-wn-sumy">
            <div className="gk2-wn-sumy-razem">
                <dt>Razem</dt>
                <dd>{wnZl(razem)}</dd>
            </div>
            <div>
                <dt>Zadatek 30% teraz</dt>
                <dd>{wnZl(zadatek)}</dd>
            </div>
            <div>
                <dt>Przy odbiorze</dt>
                <dd>{wnZl(razem - zadatek)}</dd>
            </div>
        </dl>
    )

    const glowa = (
        <>
            <button type="button" className="gk2-wn-x" onClick={zamknij} aria-label={panel === "dzieki" ? "Zamknij" : "Zamknij koszyk"} ref={zamknijRef}>
                <span>
                    <IkonaZamknij />
                </span>
            </button>
            <div className="gk2-wn-koszyk-glowa">
                <Wyc a={P.logotyp} rozmiar={1024} alt="Górka & Kulka" className="gk2-wn-koszyk-logo" />
                <span className="gk2-e">{panel === "dzieki" ? "Zamówienie · Święta 2026" : "Bilecik odbioru · Święta 2026"}</span>
            </div>
        </>
    )

    let tresc: React.ReactNode = null
    if (panel === "dzieki") {
        const dz = dzieki || { stan: "sprawdzam", numer: "", slot: "", miejsce: "", zadatek: 0, razem: 0 }
        tresc = (
            <div className="gk2-wn-koszyk-srodek">
                <div className="gk2-sw-dzieki" role="status" aria-live="polite">
                    {dz.stan === "oplacone" ? (
                        <>
                            <p className="gk2-d gk2-h3">
                                {"Dziękujemy! Zamówienie "}
                                <span className="gk2-sw-nw">{dz.numer}</span>
                                {" jest opłacone."}
                            </p>
                            <p>{"Potwierdzenie wysłaliśmy mailem."}</p>
                            <p>
                                <b>{"Odbiór: " + dz.slot + ", " + dz.miejsce}</b>
                            </p>
                            <p>{"Zadatek: " + wnZl(dz.zadatek) + " · przy odbiorze: " + wnZl(Math.max(dz.razem - dz.zadatek, 0))}</p>
                            <p className="gk2-drobny">
                                {"Przy odbiorze podaj numer zamówienia: "}
                                <span className="gk2-sw-nw">{dz.numer}</span>.
                            </p>
                        </>
                    ) : dz.stan === "w_toku" ? (
                        <>
                            <p className="gk2-d gk2-h3">{"Dziękujemy! Płatność jest w toku."}</p>
                            <p>{"Gdy bank ją potwierdzi, wyślemy maila z potwierdzeniem zamówienia " + dz.numer + "."}</p>
                        </>
                    ) : dz.stan === "anulowane" ? (
                        <>
                            <p className="gk2-d gk2-h3">{"Płatność nie doszła do skutku."}</p>
                            <p>{"Zamówienie " + dz.numer + " nie zostało przyjęte. Możesz złożyć je jeszcze raz."}</p>
                        </>
                    ) : dz.stan === "czeka" ? (
                        <>
                            <p className="gk2-d gk2-h3">{"Czekamy na potwierdzenie płatności."}</p>
                            <p>{"Gdy przyjdzie, wyślemy maila. Jeśli nie dostaniesz go w ciągu kilku minut, zadzwoń: " + SW_TEL + "."}</p>
                        </>
                    ) : (
                        <p className="gk2-d gk2-h3">{"Sprawdzamy płatność…"}</p>
                    )}
                </div>
            </div>
        )
    } else if (suma === 0) {
        tresc = <p className="gk2-wn-pusto">{"Bilecik jest jeszcze pusty. Wybierz ciasto i dodaj je do koszyka."}</p>
    } else if (krok === "koszyk") {
        tresc = (
            <>
                <div className="gk2-wn-koszyk-srodek">
                    {przerwana ? (
                        <p className="gk2-sw-blad" role="status">
                            {"Płatność za zamówienie " + przerwana + " została przerwana. Możesz spróbować jeszcze raz, a zamówienie bez wpłaty samo wygaśnie."}
                        </p>
                    ) : null}
                    <ul className="gk2-wn-lista">
                        {pozycje.map((q) => {
                            const ile = koszyk[q.id] || 0
                            return (
                                <li key={q.id}>
                                    <span className="gk2-wn-lista-nazwa">
                                        <b>{q.tytul}</b>
                                        <small>{q.miara + " · " + wnZl(q.cena)}</small>
                                    </span>
                                    <div className="gk2-wn-ilosc gk2-wn-ilosc-m" role="group" aria-label={"Ilość: " + q.tytul}>
                                        <button type="button" onClick={() => zmien(q.id, ile - 1)} aria-label={ile <= 1 ? "Usuń z koszyka: " + q.tytul : "Mniej"}>
                                            −
                                        </button>
                                        <output aria-live="polite">{ile}</output>
                                        <button type="button" onClick={() => zmien(q.id, ile + 1)} aria-label="Więcej" disabled={ile >= maksDla(q.id)}>
                                            +
                                        </button>
                                    </div>
                                    <b className="gk2-wn-lista-suma">{wnZl(ile * q.cena)}</b>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="gk2-wn-odbiory" role="radiogroup" aria-label="Miejsce odbioru">
                        <span className="gk2-e gk2-wn-etykieta">Odbiór — wybierz miejsce</span>
                        {SC_ODBIORY.map((o) => o.kiedy)
                            .filter((k, i, a) => a.indexOf(k) === i)
                            .map((dzien) => (
                                <div className="gk2-wn-odb-rzad" key={dzien}>
                                    <b>{dzien}</b>
                                    <span>
                                        {SC_ODBIORY.map((o, i) =>
                                            o.kiedy === dzien ? (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    role="radio"
                                                    aria-checked={odbior === i}
                                                    aria-label={o.kiedy + ", " + o.gdzie}
                                                    className={"gk2-wn-odb" + (odbior === i ? " gk2-wn-odb-on" : "")}
                                                    onClick={() => {
                                                        ustawOdbior(i)
                                                        ustawOkno("")
                                                    }}
                                                >
                                                    {o.gdzie}
                                                </button>
                                            ) : null
                                        )}
                                    </span>
                                </div>
                            ))}
                        {odbior >= 0 ? <p className="gk2-wn-odb-wybor">{SC_ODBIORY[odbior].kiedy + ", " + SC_ODBIORY[odbior].gdzie + (SC_ODBIORY[odbior].adres ? ", " + SC_ODBIORY[odbior].adres : "")}</p> : null}
                    </div>
                </div>
                {sumy}
                {otwarte ? (
                    <button
                        type="button"
                        className="gk2-wn-przycisk gk2-wn-zaplac"
                        disabled={odbior < 0}
                        onClick={() => {
                            if (odbior < 0) return
                            ustawKrok("dane")
                            ustawBlad("")
                            startKasy.current = Date.now()
                        }}
                    >
                        {odbior < 0 ? "Wybierz miejsce odbioru" : "Dalej: godzina i dane"}
                        {odbior < 0 ? null : <IkonaDalej />}
                    </button>
                ) : (
                    <span className="gk2-wn-przycisk gk2-wn-zaplac" aria-disabled="true">
                        Zamówienia zamknięte
                    </span>
                )}
            </>
        )
    } else {
        tresc = (
            <form className="gk2-sw-kasa" onSubmit={zamow}>
                <button
                    type="button"
                    className="gk2-sw-wroc"
                    onClick={() => {
                        ustawKrok("koszyk")
                        ustawBlad("")
                    }}
                >
                    {"← Koszyk"}
                </button>
                <div className="gk2-wn-koszyk-srodek">
                    <div className="gk2-sw-dane">
                        <div className="gk2-sw-okna" role="radiogroup" aria-label={"Godzina odbioru, " + miejsce}>
                            <span className="gk2-e gk2-wn-etykieta">{"Godzina odbioru · " + miejsce + " · środa 23.12"}</span>
                            <span>
                                {okna.map((o) => (
                                    <button
                                        key={o.id}
                                        type="button"
                                        role="radio"
                                        aria-checked={okno === o.id}
                                        className={"gk2-wn-odb" + (okno === o.id ? " gk2-wn-odb-on" : "")}
                                        disabled={o.full}
                                        onClick={() => ustawOkno(o.id)}
                                        aria-label={swGodzina(o.label) + (o.full ? ", brak miejsc" : "")}
                                    >
                                        {swGodzina(o.label)}
                                    </button>
                                ))}
                            </span>
                            {!baza ? <p className="gk2-drobny">{"Wczytuję wolne godziny…"}</p> : okna.length === 0 ? <p className="gk2-drobny">{"Brak wolnych godzin w tym miejscu. Wróć i wybierz inne miejsce."}</p> : null}
                        </div>
                        <label className="gk2-pole">
                            <span className="gk2-e">Imię i nazwisko</span>
                            <input type="text" name="imie" required minLength={2} maxLength={80} autoComplete="name" />
                        </label>
                        <label className="gk2-pole">
                            <span className="gk2-e">Telefon</span>
                            <input type="tel" name="telefon" required maxLength={20} autoComplete="tel" inputMode="tel" placeholder="np. 500 123 456" />
                        </label>
                        <label className="gk2-pole">
                            <span className="gk2-e">E-mail</span>
                            <input type="email" name="email" required maxLength={120} autoComplete="email" placeholder="tu wyślemy potwierdzenie" />
                        </label>
                        <label className="gk2-pole">
                            <span className="gk2-e">Uwagi (nieobowiązkowe)</span>
                            <textarea name="uwagi" maxLength={500} rows={2} />
                        </label>
                        <label className="gk2-sw-check">
                            <input type="checkbox" name="zgoda" value="tak" required />
                            <span>
                                {"Akceptuję "}
                                <a href="/regulamin" target="_blank" rel="noopener">
                                    regulamin zamówień
                                </a>
                                {" i "}
                                <a href="/polityka-prywatnosci" target="_blank" rel="noopener">
                                    politykę prywatności
                                </a>
                                .
                            </span>
                        </label>
                        <SwPulapka />
                    </div>
                </div>
                {sumy}
                {blad ? (
                    <p className="gk2-sw-blad gk2-sw-kasa-blad" role="alert">
                        {blad}
                    </p>
                ) : null}
                <button type="submit" className="gk2-wn-przycisk gk2-wn-zaplac" disabled={wysylam || !wybraneOkno || !otwarte}>
                    {wysylam ? "Otwieram płatność…" : !wybraneOkno ? "Wybierz godzinę odbioru" : "Zapłać zadatek " + wnZl(zadatek)}
                    {wysylam || !wybraneOkno ? null : <IkonaDalej />}
                </button>
                <p className="gk2-sw-kasa-info">{"Płatność na stronie Stripe: BLIK, Przelewy24 albo karta. Na wpłatę masz 30 minut."}</p>
            </form>
        )
    }

    const koszykPanel =
        panel === "koszyk" || panel === "dzieki" ? (
            <div className="gk2-wn-koszyk" role="dialog" aria-modal="true" aria-label={panel === "dzieki" ? "Zamówienie" : "Koszyk"} key="koszyk">
                {glowa}
                {tresc}
                {panel === "dzieki" ? (
                    <button type="button" className="gk2-wn-przycisk gk2-wn-zaplac" onClick={zamknij}>
                        Wróć na stronę
                    </button>
                ) : (
                    <p className="gk2-e gk2-wn-stopka">{otwarte ? "Zamówienia do 21 grudnia · odbiór 23.12" : "Zamówienia przyjmowaliśmy do 21 grudnia"}</p>
                )}
            </div>
        ) : null

    return (
        <div className={"gk2-sw-polka" + (panel !== "" ? " gk2-sw-z-koszykiem" : "")} ref={korzen}>
            <div className="gk2-sw-rzad" ref={rzad} onScroll={przewin}>
                {produkty.map((q, i) => (
                    <SwKafel key={q.id} p={q} i={i} mam={koszyk[q.id] || 0} maks={maksDla(q.id)} wyprzedane={wyprzedane(q.id)} otwarte={otwarte} dodano={dodano === i} dodaj={dodaj} />
                ))}
            </div>
            <div className="gk2-sw-pasek-rzad">
                <div className="gk2-sw-pasek" aria-hidden="true">
                    <i />
                </div>
                <button type="button" className="gk2-sw-strz" onClick={() => przesun(-1)} aria-label="Poprzednie ciasta">
                    <IkonaStrzalka w="l" />
                </button>
                <button type="button" className="gk2-sw-strz" onClick={() => przesun(1)} aria-label="Następne ciasta">
                    <IkonaStrzalka w="p" />
                </button>
            </div>
            {bilet && bp ? (
                <div className={"gk2-wn-bilet" + (leci ? " gk2-wn-bilet-leci" : "")} ref={biletRef} key={bilet.k} aria-hidden="true">
                    <div className="gk2-wn-bilet-papier">
                        <span className="gk2-wn-bilet-logo">
                            <Wyc a={P.logotyp} rozmiar={1024} alt="" />
                        </span>
                        <span style={{ ["--l" as any]: 1 }}>Odbiór świąteczny 2026</span>
                        <span className="gk2-wn-bilet-kreska" style={{ ["--l" as any]: 2 }} />
                        <span className="gk2-wn-bilet-rzad" style={{ ["--l" as any]: 3 }}>
                            <em>{"1 × " + bp.tytul}</em>
                            <b>{wnZl(bp.cena)}</b>
                        </span>
                        <span className="gk2-wn-bilet-rzad" style={{ ["--l" as any]: 4 }}>
                            <em>Zadatek 30%</em>
                            <b>{wnZl(Math.ceil(bp.cena * SC_ZADATEK))}</b>
                        </span>
                        <span className="gk2-wn-bilet-kreska" style={{ ["--l" as any]: 5 }} />
                        <span style={{ ["--l" as any]: 6 }}>Odbiór: wybierz w koszyku</span>
                    </div>
                </div>
            ) : null}
            <span className="gk2-sr" role="status" aria-live="polite">
                {dodano >= 0 ? "Dodano do koszyka: " + produkty[dodano].tytul + ". W koszyku: " + suma + " szt." : ""}
            </span>
            {panel !== "" ? <div className="gk2-sw-zaslona" onClick={zamknij} aria-hidden="true" /> : null}
            {koszykPanel}
        </div>
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
                <div className="gk2-e">08 — Na wynos</div>
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
    // Duży przycisk „Zamów na Święta”: nad obiema warstwami i nad kulką, pod napisem.
    ".gk2-hero-cta { position: absolute; left: var(--m); top: calc(max(calc(var(--vh) * 13), 84px) + var(--hs) * 1.86 + 104px); z-index: 6; display: inline-flex; align-items: center; gap: 16px; padding: 24px 34px 22px 30px; border-radius: 999px; background: var(--tusz); color: var(--maslo); font-size: clamp(22px, 1.9vw, 34px); line-height: 1; cursor: pointer; white-space: nowrap; box-shadow: 0 18px 44px -22px rgba(0,0,0,.6); transition: background .25s ease; -webkit-tap-highlight-color: transparent; }",
    ".gk2-hero-cta i { width: 10px; height: 10px; border-radius: 50%; background: var(--roz); display: block; flex: none; animation: gk2-puls 2.4s ease-in-out infinite; }",
    ".gk2-hero-cta svg { width: .82em; height: .82em; flex: none; margin-top: -.08em; transition: transform .25s ease; }",
    "@media (hover: hover) { .gk2-hero-cta:hover { background: var(--rubin); } .gk2-hero-cta:hover i { background: var(--maslo); } .gk2-hero-cta:hover svg { transform: translateX(6px); } }",
    ".gk2-hero-cta:focus-visible { outline: 2px solid var(--tusz); outline-offset: 4px; }",

    "/* 2. Manifest */",
    ".gk2-manifest { position: relative; padding: calc(var(--vh) * 16) var(--m) calc(var(--vh) * 12); background: #D9D6D1; overflow: clip; }",
    ".gk2-manifest-tekst { margin-top: calc(var(--vh) * 12); font-size: clamp(30px, 4.5vw, 78px); line-height: 1; max-width: 1340px; }",
    ".gk2-slowo { opacity: 1; transition: opacity .2s linear; }",
    ".gk2-js .gk2-slowo { opacity: .13; }",
    ".gk2-slowo-szare { color: #85827E; }",
    // Jedyny kolor w szarym manifeście: słowo KOLOR jak zakreślacz, przechodzi przez barwy smaków.
    ".gk2-zakreslacz { color: var(--tusz); background-color: var(--roz); padding: 0 .07em; margin: 0 -.07em; border-radius: .07em; -webkit-box-decoration-break: clone; box-decoration-break: clone; animation: gk2-zakreslacz 9s ease-in-out infinite; }",
    "@keyframes gk2-zakreslacz { 0%, 13% { background-color: #F7C2CF; color: #111111; } 17%, 30% { background-color: #FFB23E; color: #111111; } 34%, 47% { background-color: #A9BD78; color: #111111; } 51%, 64% { background-color: #B4652F; color: #FFF3E2; } 68%, 81% { background-color: #D3D77C; color: #111111; } 85%, 96% { background-color: #FFE295; color: #111111; } 100% { background-color: #F7C2CF; color: #111111; } }",
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
    "/* Sklep świąteczny „Scena ciast”: ciasto na różu RAL 3015, spod niego wychodzi aksamitna wstęga. Ruch liczy CSS ze zmiennych: */",
    "/* --t przejście 0..1, --k kierunek, --b wejście sceny 0..1, --mx/--my kursor, --u jednostka pola sceny, --sw jednostka sceny, */",
    "/* --ph wysokość pola, --wx/--wy punkt, w którym wstęga przechodzi pod ciastem, --wh szerokość wstęgi */",
    ".gk2-sc-korzen { position: relative; min-width: 0; --wn-krem: #FFFCF4; --wn-h: clamp(480px, calc(var(--vh) * 100 - 252px), 640px); --sw: .553vw; --u: .343vw; --ph: var(--wn-h); --hu: calc(var(--ph) / 100); --wx: 28%; --wy: .63; --wh: calc(11.5 * var(--u)); --zn: 2; --cs: rgba(112,14,42,.42); }",
    ".gk2-sc { position: relative; display: grid; height: var(--wn-h); border-radius: 22px; overflow: hidden; isolation: isolate; border: 1.5px solid var(--tusz); background: radial-gradient(calc(64 * var(--u)) calc(54 * var(--u)) at var(--wx) calc(var(--ph) * var(--wy) - 10 * var(--u)), rgba(255,255,255,.46), rgba(255,255,255,0) 100%), var(--roz); touch-action: pan-y; -webkit-user-select: none; user-select: none; -webkit-tap-highlight-color: transparent; cursor: grab; box-shadow: 0 34px 54px -36px rgba(110,24,56,.6); --t: 0; --k: 1; --b: 1; --mx: 0; --my: 0; --bq: clamp(0, calc((var(--b) - .32) / .68), 1); --bc: calc(1 - (1 - var(--bq)) * (1 - var(--bq)) * (1 - var(--bq))); }",
    ".gk2-sc.gk2-sc-chwyt { cursor: grabbing; }",
    // plakaty ciast nie tworzą własnych warstw: ich części przeplatają się ze wstęgą (napis 1, wstęga 2, opis 3, ciasto 4, znacznik zdjęcia 6, przyciski 7)
    ".gk2-sc-sl { grid-area: 1 / 1; position: relative; min-width: 0; overflow: hidden; color: var(--tusz); --d: 0; --ad: 0; }",
    ".gk2-sc-zegnaj { visibility: hidden; }",
    ".gk2-sc-wy { --d: calc(var(--t) * var(--k) * -1); --ad: var(--t); }",
    ".gk2-sc-we { --d: calc((1 - var(--t)) * var(--k)); --ad: calc(1 - var(--t)); }",
    // wstęga: aksamitny pas w poprzek sceny, przechodzi pod podstawą ciasta; przy przejściu jedzie razem z ciastami jak taśma
    ".gk2-sc-wstega { position: absolute; z-index: 2; left: 0; top: calc(var(--ph) * var(--wy)); width: 100%; height: 0; display: block; pointer-events: none; transform: rotate(-6deg); transform-origin: var(--wx) 0; }",
    ".gk2-sc-wstega > i { position: absolute; left: -30%; right: -30%; top: calc(var(--wh) / -2); height: var(--wh); display: block; overflow: hidden; background: linear-gradient(180deg, " + AKSAMIT + "); box-shadow: 0 calc(2 * var(--u)) calc(3.2 * var(--u)) calc(-1.4 * var(--u)) rgba(96,8,28,.62); --br: clamp(0, calc(var(--b) / .48), 1); clip-path: inset(-50% calc((1 - var(--br) * var(--br) * (3 - 2 * var(--br))) * 100%) -110% 0); }",
    ".gk2-sc-wstega b { position: absolute; left: calc(-120 * var(--sw)); right: calc(-120 * var(--sw)); top: 0; bottom: 0; display: block; background: " + ZIARNO + " 0 0 / calc(59 * var(--sw) / var(--zn)) calc(59 * var(--sw) / var(--zn)), radial-gradient(34% 70% at 50% 42%, rgba(255,132,120,.2), rgba(255,132,120,0)) 0 0 / calc(59 * var(--sw)) 100% repeat-x; transform: translate3d(calc((1 - var(--bc)) * 118 * var(--sw) - var(--t) * var(--k) * 118 * var(--sw)), 0, 0); will-change: transform; }",
    // wielki napis: nazwa ciasta płynie za nim, pod wstęgą; na komputerze lekko ucieka od kursora
    ".gk2-sc-slowo { position: absolute; z-index: 1; left: 0; top: calc(2.5 * var(--u)); width: 100%; color: rgba(255,255,255,.4); white-space: nowrap; pointer-events: none; transform: translate3d(calc(var(--d) * 40 * var(--sw) - var(--mx) * 2.2 * var(--u)), calc(var(--my) * -1.2 * var(--u)), 0); opacity: calc(clamp(0, var(--b) * 2.5, 1) * (1 - var(--ad) * 1.7)); }",
    ".gk2-sc-slowo span { display: inline-flex; font-size: calc(25 * var(--u)); line-height: 1; letter-spacing: 0; animation: gk2-sc-bieg 40s linear infinite; will-change: transform; }",
    ".gk2-sc-slowo b { font-weight: inherit; padding-right: .2em; }",
    ".gk2-sc-slowo b i { font-style: normal; padding-left: .2em; }",
    "@keyframes gk2-sc-bieg { to { transform: translate3d(-50%, 0, 0); } }",
    // pole sceny: ciasto (na komputerze lewa część sceny, na telefonie cała szerokość)
    ".gk2-sc-pole { position: absolute; left: 0; top: 0; width: 56%; height: 100%; pointer-events: none; }",
    // znacznik roboczy: ta pozycja nie ma jeszcze własnego zdjęcia (znika sam, gdy z oferty zejdzie „zast”)
    ".gk2-sc-zast { position: absolute; z-index: 6; left: 22px; top: 22px; padding: 6px 10px; border: 1px dashed var(--tusz); border-radius: 999px; background: rgba(255,252,244,.72); font-size: 10px; line-height: 1; letter-spacing: .08em; text-transform: uppercase; white-space: nowrap; opacity: calc(clamp(0, calc((var(--b) - .8) / .2), 1) * (1 - var(--ad) * 2.6)); }",
    // ciasto: prawdziwe zdjęcie, środek jego podstawy stoi na wstędze; przy przejściu i przy wejściu sceny jedzie wzdłuż wstęgi
    ".gk2-sc-ciasto { position: absolute; z-index: 4; left: 50%; top: calc(var(--wy) * 100%); width: calc(var(--cw) * var(--u)); --dc: calc(var(--d) + 1 - var(--bc)); transform-origin: calc(var(--bx) * 100%) calc(var(--by) * 100%); transform: translate3d(calc(var(--bx) * -100% + var(--dc) * 118 * var(--sw)), calc(var(--by) * -100% - var(--dc) * 12.4 * var(--sw)), 0) rotate(calc(var(--dc) * var(--cr))) scale(calc(1 - (var(--ad) + 1 - var(--bc)) * .08)); will-change: transform; }",
    ".gk2-sc-foto { position: relative; display: block; width: 100%; height: auto; }",
    ".gk2-sc-foto-lustro { transform: scaleX(-1); }",
    ".gk2-sc-foto-dysk { filter: drop-shadow(0 calc(1.5 * var(--u)) calc(1.9 * var(--u)) var(--cs)); }",
    ".gk2-sc-foto-bryla { filter: drop-shadow(0 calc(.9 * var(--u)) calc(1.3 * var(--u)) var(--cs)); }",
    ".gk2-sc-cien { position: absolute; display: block; border-radius: 50%; background: radial-gradient(closest-side, var(--cs), rgba(0,0,0,0)); transform: translate(-50%, -50%); }",
    // opis ciasta: nazwa nad wstęgą, cena pod nią; leży pod ciastem, więc jadące ciasto po prostu go zasłania
    ".gk2-sc-opis-g, .gk2-sc-cena { position: absolute; z-index: 3; right: 30px; width: min(40%, 320px); opacity: calc(1 - var(--ad) * 2.6); transform: translate3d(calc(var(--d) * 6 * var(--sw)), 0, 0); }",
    ".gk2-sc-opis-g { bottom: calc(100% - var(--ph) * var(--wy) + 7.2 * var(--sw) + var(--wh) / 2 + 18px); display: flex; flex-direction: column; }",
    ".gk2-sc-cena { top: calc(var(--ph) * var(--wy) - 2.9 * var(--sw) + var(--wh) / 2 + 20px); display: block; font-size: clamp(40px, 3.7vw, 58px); line-height: .85; white-space: nowrap; }",
    ".gk2-sc-nr { display: flex; align-items: center; gap: 8px; }",
    ".gk2-sc-nr::before { content: ''; flex: none; width: 7px; height: 7px; border-radius: 50%; background: var(--rubin); }",
    ".gk2-sc-tytul { margin-top: 12px; font-size: clamp(30px, 2.9vw, 44px); line-height: 1.03; }",
    ".gk2-sc-reszta { margin-top: 10px; font-size: 13px; line-height: 1.5; }",
    ".gk2-sc-sklad { margin-top: 10px; display: grid; gap: 2px; font-size: 11.5px; line-height: 1.4; }",
    ".gk2-sc-akcja { position: absolute; z-index: 7; right: 30px; bottom: 30px; width: max-content; min-width: min(40%, 320px); max-width: calc(100% - 60px); display: flex; gap: 10px; }",
    ".gk2-sc-akcja .gk2-wn-ilosc { background: rgba(255,255,255,.3); }",
    ".gk2-sc-nast { position: absolute; z-index: 7; top: 20px; width: 44px; height: 44px; padding: 0; border-radius: 50%; border: 1.5px solid var(--tusz); background: rgba(255,255,255,.3); color: var(--tusz); display: grid; place-items: center; cursor: pointer; transition: background .25s ease, color .25s ease; }",
    ".gk2-sc-nast-l { right: 74px; }",
    ".gk2-sc-nast-p { right: 22px; }",
    "@media (hover: hover) { .gk2-sc-nast:hover { background: var(--tusz); color: var(--maslo); } }",
    ".gk2-sc-kropki { position: absolute; z-index: 7; left: 50%; top: calc(98 * var(--u)); display: none; gap: 6px; transform: translateX(-50%); pointer-events: none; }",
    ".gk2-sc-kropki i { width: 6px; height: 6px; border-radius: 50%; background: rgba(17,17,17,.28); transition: background .3s ease, width .3s ease; }",
    ".gk2-sc-kropki .gk2-sc-kropka-on { width: 18px; background: var(--tusz); }",
    // poza ekranem scena śpi (bez animacji w tle)
    ".gk2-sc-spi .gk2-sc-slowo span { animation-play-state: paused; }",
    // pigułki: pasek przewija się w poziomie, gdy nie mieści wszystkich pozycji
    ".gk2-sc-korzen .gk2-wn-pigulki { position: relative; }",
    // tablet w pionie (układ jednokolumnowy, szeroki): dolna wstążka papieru zostaje krótkim końcem na marginesie, żeby nie wchodziła pod tabelkę z odbiorem
    "@media (min-width: 600px) and (max-width: 809px), (min-width: 600px) and (max-aspect-ratio: 21/20) { .gk2-sklep .gk2-sklep-wstazka-b { width: 11vw; } }",
    "@keyframes gk2-wn-karta-in { from { opacity: 0; transform: translate3d(28px, 0, 0); } }",
    ".gk2-wn-x { position: absolute; top: 8px; right: 8px; z-index: 2; width: 44px; height: 44px; padding: 0; border: 0; background: none; color: var(--tusz); display: grid; place-items: center; cursor: pointer; }",
    ".gk2-wn-x span { width: 32px; height: 32px; border-radius: 50%; border: 1.5px solid var(--tusz); display: grid; place-items: center; transition: background .25s ease, color .25s ease; }",
    "@media (hover: hover) { .gk2-wn-x:hover span { background: var(--tusz); color: var(--maslo); } }",
    ".gk2-wn-ilosc { display: inline-flex; align-items: center; flex: none; border: 1.5px solid var(--tusz); border-radius: 999px; }",
    ".gk2-wn-ilosc button { width: 40px; height: 45px; padding: 0; border: 0; background: none; color: var(--tusz); font: inherit; font-size: 18px; cursor: pointer; }",
    ".gk2-wn-ilosc button:disabled { opacity: .28; cursor: default; }",
    ".gk2-wn-ilosc output { min-width: 14px; text-align: center; font-size: 14px; }",
    ".gk2-wn-przycisk { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 48px; padding: 0 18px; border: 0; border-radius: 999px; background: var(--tusz); color: var(--maslo); font: inherit; font-size: 12px; letter-spacing: .07em; text-transform: uppercase; text-decoration: none; white-space: nowrap; cursor: pointer; transition: background .25s ease, color .25s ease; }",
    ".gk2-wn-przycisk:disabled, .gk2-wn-przycisk[aria-disabled='true'] { background: rgba(17,17,17,.14); color: rgba(17,17,17,.6); cursor: default; }",
    ".gk2-wn-przycisk.gk2-wn-dodano { background: var(--wn-krem); color: var(--tusz); }",
    "@media (hover: hover) { .gk2-wn-przycisk:not(:disabled):not([aria-disabled='true']):not(.gk2-wn-dodano):hover { background: var(--rubin); color: #fff; } }",
    ".gk2-wn-nawi { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 14px; }",
    ".gk2-wn-pigulki { display: flex; align-items: center; gap: 2px; min-width: 0; padding: 4px; border: 1.5px solid var(--tusz); border-radius: 999px; background: rgba(255,252,244,.94); overflow-x: auto; scrollbar-width: none; }",
    ".gk2-wn-pigulki::-webkit-scrollbar { display: none; }",
    ".gk2-wn-pig { flex: none; height: 36px; padding: 0 13px; border: 0; border-radius: 999px; background: none; color: var(--tusz); font: inherit; font-size: 11px; letter-spacing: .07em; text-transform: uppercase; white-space: nowrap; cursor: pointer; transition: background .25s ease, color .25s ease; }",
    ".gk2-wn-pig-on { background: var(--tusz); color: var(--maslo); }",
    "@media (hover: hover) { .gk2-wn-pig:not(.gk2-wn-pig-on):hover { background: rgba(17,17,17,.08); } }",
    ".gk2-wn-torba { flex: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-width: 47px; height: 47px; padding: 0 14px; border: 1.5px solid var(--tusz); border-radius: 999px; background: var(--tusz); color: var(--maslo); cursor: pointer; transition: background .25s ease, color .25s ease; }",
    ".gk2-wn-torba b { min-width: 20px; height: 20px; padding: 0 6px; border-radius: 10px; background: var(--roz); color: var(--tusz); font-size: 11px; line-height: 20px; font-weight: 400; text-align: center; }",
    ".gk2-wn-torba-on { background: var(--roz); color: var(--tusz); }",
    ".gk2-wn-torba-on b { background: var(--tusz); color: var(--maslo); }",
    ".gk2-wn-hop { animation: gk2-wn-hop .6s cubic-bezier(.3,1.6,.5,1); }",
    "@keyframes gk2-wn-hop { 0% { transform: scale(1); } 35% { transform: scale(1.22); } 100% { transform: scale(1); } }",
    ".gk2-wn-bilet { position: absolute; z-index: 7; left: 50%; top: 0; width: 288px; margin-left: -144px; padding: 0 26px 34px; overflow: hidden; pointer-events: none; transform-origin: 50% 0; }",
    ".gk2-wn-bilet::before { content: ''; position: absolute; left: 22px; right: 22px; top: 0; height: 5px; z-index: 2; border-radius: 0 0 4px 4px; background: #0B0B0B; }",
    ".gk2-wn-bilet-papier { position: relative; display: grid; gap: 5px; padding: 18px 14px 14px; background: var(--wn-krem); color: var(--tusz); font-size: 10.5px; line-height: 1.35; letter-spacing: .05em; text-transform: uppercase; filter: drop-shadow(0 12px 12px rgba(80,14,40,.34)); animation: gk2-wn-druk .78s steps(13, end) backwards; }",
    ".gk2-wn-bilet-papier::after { content: ''; position: absolute; left: 0; right: 0; top: 100%; height: 7px; background: linear-gradient(135deg, var(--wn-krem) 50%, rgba(255,252,244,0) 50%) 0 0 / 10px 7px repeat-x, linear-gradient(225deg, var(--wn-krem) 50%, rgba(255,252,244,0) 50%) 0 0 / 10px 7px repeat-x; }",
    "@keyframes gk2-wn-druk { from { transform: translate3d(0, -104%, 0); } }",
    ".gk2-wn-bilet-papier > span { display: block; animation: gk2-wn-linia .12s linear backwards; animation-delay: calc(.5s + var(--l, 0) * 62ms); }",
    "@keyframes gk2-wn-linia { from { opacity: 0; } }",
    ".gk2-wn-bilet-logo { width: 62%; margin: 0 auto 2px; }",
    ".gk2-wn-bilet-logo .gk2-wyc { width: 100%; }",
    ".gk2-wn-bilet-papier > .gk2-wn-bilet-kreska { height: 0; border-top: 1.5px dashed rgba(17,17,17,.6); margin: 3px 0; }",
    ".gk2-wn-bilet-papier > .gk2-wn-bilet-rzad { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }",
    ".gk2-wn-bilet-rzad em { font-style: normal; min-width: 0; }",
    ".gk2-wn-bilet-rzad b { flex: none; font-weight: 400; white-space: nowrap; }",
    ".gk2-wn-bilet-leci { animation: gk2-wn-lot .62s cubic-bezier(.5,0,.75,.4) forwards; }",
    "@keyframes gk2-wn-lot { 0% { transform: none; opacity: 1; } 32% { transform: scale(.86, .2); opacity: 1; } 100% { transform: translate3d(var(--bx, 0px), var(--by, 300px), 0) scale(.12, .04) rotate(10deg); opacity: .15; } }",
    ".gk2-wn-koszyk { position: absolute; z-index: 6; top: 14px; right: 14px; width: min(372px, 48%); max-height: calc(var(--wn-h) - 28px); display: flex; flex-direction: column; overflow: hidden; padding: 20px 20px 14px; border-radius: 6px 6px 0 0; background: var(--wn-krem); color: var(--tusz); font-size: 12px; line-height: 1.45; box-shadow: 0 30px 60px -20px rgba(0,0,0,.75); animation: gk2-wn-karta-in .6s cubic-bezier(.2,.8,.2,1) backwards; }",
    ".gk2-wn-koszyk > * { flex: none; }",
    ".gk2-wn-koszyk > .gk2-wn-koszyk-srodek { flex: 1 1 auto; min-height: 0; overflow-y: auto; scrollbar-width: thin; border-bottom: 1.5px dashed rgba(17,17,17,.6); }",
    ".gk2-wn-koszyk-glowa { display: grid; justify-items: center; gap: 6px; padding: 2px 34px 12px; border-bottom: 1.5px dashed rgba(17,17,17,.6); text-align: center; }",
    ".gk2-wn-koszyk-logo { width: 150px; }",
    ".gk2-wn-pusto { margin-top: 16px; font-size: 13px; line-height: 1.5; }",
    ".gk2-wn-lista li { display: grid; grid-template-columns: minmax(0, 1fr) auto 4.6em; align-items: center; column-gap: 10px; padding: 9px 0; border-bottom: 1.5px dashed rgba(17,17,17,.6); }",
    ".gk2-wn-lista-nazwa { display: grid; gap: 2px; }",
    ".gk2-wn-lista-nazwa b { font-weight: 400; font-size: 12.5px; letter-spacing: .05em; text-transform: uppercase; }",
    ".gk2-wn-lista-nazwa small { font-size: 11px; opacity: .7; }",
    ".gk2-wn-lista-suma { font-weight: 400; font-size: 13px; white-space: nowrap; text-align: right; }",
    ".gk2-wn-ilosc-m button { width: 36px; height: 38px; }",
    ".gk2-wn-odbiory { display: grid; gap: 6px; padding: 12px 0; }",
    ".gk2-wn-etykieta { opacity: .75; }",
    ".gk2-wn-odb-rzad { display: grid; gap: 5px; padding-top: 2px; }",
    ".gk2-wn-odb-rzad > b { font-weight: 400; font-size: 12px; letter-spacing: .04em; white-space: nowrap; }",
    ".gk2-wn-odb-rzad > span { display: flex; flex-wrap: wrap; gap: 6px; }",
    ".gk2-wn-odb { min-height: 40px; padding: 0 10px; border: 1.5px solid var(--tusz); border-radius: 999px; background: none; color: var(--tusz); font: inherit; font-size: 11px; letter-spacing: .03em; white-space: nowrap; cursor: pointer; transition: background .2s ease, color .2s ease; }",
    ".gk2-wn-odb-wybor { font-size: 11px; line-height: 1.4; opacity: .8; }",
    ".gk2-wn-odb-on { background: var(--tusz); color: var(--maslo); }",
    ".gk2-wn-sumy { padding: 10px 0 0; }",
    ".gk2-wn-sumy div { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding: 2px 0; }",
    ".gk2-wn-sumy dt { letter-spacing: .05em; text-transform: uppercase; font-size: 11px; }",
    ".gk2-wn-sumy dd { white-space: nowrap; }",
    ".gk2-wn-sumy .gk2-wn-sumy-razem { padding-bottom: 6px; font-size: 16px; }",
    ".gk2-wn-sumy .gk2-wn-sumy-razem dt { font-size: 13px; }",
    ".gk2-wn-zaplac { display: flex; width: 100%; margin-top: 10px; min-height: 50px; }",
    ".gk2-wn-stopka { margin-top: 10px; text-align: center; opacity: .7; }",
    ".gk2-licznik { display: none; min-width: 18px; height: 18px; padding: 0 5px; margin-right: -6px; border-radius: 9px; background: var(--rubin); color: #fff; font-size: 10px; line-height: 18px; letter-spacing: 0; text-align: center; font-weight: 400; box-sizing: border-box; }",
    ".gk2-licznik::before, .gk2-licznik-tekst::before { content: counter(gk2koszyk); }",
    ".gk2-licznik-tekst { font-style: normal; }",
    ".gk2[data-koszyk]:not([data-koszyk='0']) .gk2-licznik { display: inline-block; }",
    ".gk2-pasek-tekst-koszyk, .gk2-pasek-zamow-b { display: none; }",
    ".gk2[data-koszyk]:not([data-koszyk='0']) .gk2-pasek-tekst, .gk2[data-koszyk]:not([data-koszyk='0']) .gk2-pasek-zamow-a { display: none; }",
    ".gk2[data-koszyk]:not([data-koszyk='0']) .gk2-pasek-tekst-koszyk { display: block; }",
    ".gk2[data-koszyk]:not([data-koszyk='0']) .gk2-pasek-zamow-b { display: inline; }",
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
    ".gk2-firmy-okno img { width: 100%; height: 116%; object-fit: cover; object-position: 68% 50%; will-change: transform; }",
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
    ".gk2-lista-strzalka { border-bottom: 1px solid currentColor; padding-bottom: 2px; white-space: nowrap; }",
    "@media (hover: hover) { .gk2-lista-strzalka:hover { color: var(--rubin); } }",
    ".gk2-deptak { position: relative; height: clamp(170px, 21vw, 320px); margin-top: calc(var(--vh) * 7); }",
    ".gk2-para { position: absolute; left: 0; bottom: 0; height: 100%; transform-origin: 50% 100%; will-change: transform; z-index: 2; }",
    ".gk2-para .gk2-wyc { height: 100%; }",
    ".gk2-deptak-napis { position: absolute; right: 0; top: 36%; display: grid; gap: 2px; text-align: right; }",

    "/* Stolik w Kawiarni Centrum */",
    ".gk2-stolik { position: relative; background: var(--roz); padding: calc(var(--vh) * 18) var(--m) calc(var(--vh) * 16); display: grid; grid-template-columns: .9fr 1.1fr; column-gap: 6vw; align-items: center; }",
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
    "  .gk2-hero { height: calc(var(--vh) * 340); --cta: 68px; --hs: min(20vw, calc(var(--vh) * 9.2)); --iw: min(104vw, calc((var(--vh) * 77.5 - 4.12 * var(--hs) - var(--cta)) * 1.497)); }",
    "  .gk2-hero-cta { left: var(--m); right: var(--m); top: auto; bottom: max(14px, calc(var(--vh) * 2)); height: 56px; padding: 0 22px; justify-content: center; gap: 12px; font-size: 21px; }",
    "  .gk2-blok { top: max(calc(var(--vh) * 11.5), 90px); }",
    "  .gk2-napis { line-height: 1.03; }",
    "  .gk2-napis-l span { display: block; }",
    "  .gk2-status { display: none; }",
    "  .gk2-status-m { display: block; position: absolute; left: var(--m); right: var(--m); top: 58px; z-index: 2; }",
    "  .gk2-ilu { right: auto; left: 50%; width: var(--iw); height: auto; margin-left: calc(var(--iw) / -2); bottom: calc(var(--vh) * 9 + var(--cta)); }",
    "  .gk2-ryc { bottom: calc(var(--vh) * 3.4 + var(--cta)); max-width: none; }",
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
    "  .gk2-witryna { order: 4; margin-top: 22px; margin-left: calc(var(--m) * -1 + 8px); margin-right: calc(var(--m) * -1 + 8px); }",
    "  .gk2-sc-korzen { --sw: calc((100vw - 16px) / 100); --u: var(--sw); --ph: clamp(calc(88 * var(--u)), calc(var(--vh) * 100 - 332px), calc(102 * var(--u))); --wx: 50%; --wy: .6; --wh: calc(13 * var(--u)); --zn: 1; }",
    "  .gk2-sc { height: auto; border-radius: 18px; cursor: default; }",
    "  .gk2-sc-sl { padding-bottom: 82px; }",
    "  .gk2-sc-pole { position: relative; width: 100%; height: var(--ph); }",
    "  .gk2-sc-opis { position: relative; z-index: 6; margin: 0 16px; height: 146px; display: grid; grid-template-columns: minmax(0, 1fr) auto; align-content: end; align-items: end; column-gap: 12px; opacity: calc(1 - var(--ad) * 2.6); transform: translate3d(calc(var(--d) * 6 * var(--sw)), 0, 0); }",
    "  .gk2-sc-opis-g { display: contents; }",
    "  .gk2-sc-cena { position: static; width: auto; opacity: 1; transform: none; grid-column: 2; grid-row: 1; font-size: min(9.8vw, 50px); line-height: .8; }",
    "  .gk2-sc-nr { grid-column: 1; grid-row: 1; padding-bottom: 3px; }",
    "  .gk2-sc-tytul { grid-column: 1 / -1; margin-top: 10px; font-size: min(8.6vw, 44px); line-height: .96; }",
    "  .gk2-sc-reszta, .gk2-sc-sklad { grid-column: 1 / -1; margin-top: 7px; font-size: 12px; line-height: 1.4; }",
    "  .gk2-sc-akcja { left: 16px; right: 16px; bottom: 16px; width: auto; min-width: 0; max-width: none; }",
    "  .gk2-sc-nast { display: none; }",
    "  .gk2-sc-kropki { display: flex; top: auto; bottom: 238px; }",
    "  .gk2-sc-zast { left: 14px; top: 14px; }",
    "  @keyframes gk2-wn-arkusz-in { from { opacity: 0; transform: translate3d(0, 30px, 0); } }",
    "  .gk2-wn-x { top: 2px; right: 2px; }",
    "  .gk2-wn-ilosc button { width: 44px; }",
    "  .gk2-wn-nawi { margin-left: calc(var(--m) - 8px); margin-right: calc(var(--m) - 8px); justify-content: space-between; }",
    "  .gk2-wn-pig { height: 40px; padding: 0 10px; font-size: 10.5px; }",
    "  .gk2-wn-odb { min-height: 44px; }",
    "  .gk2-wn-koszyk { position: relative; top: auto; right: auto; width: auto; max-height: none; display: block; overflow: visible; margin: 14px calc(var(--m) - 8px) 8px; padding: 20px 16px 16px; animation-name: gk2-wn-arkusz-in; }",
    "  .gk2-wn-koszyk > .gk2-wn-koszyk-srodek { overflow: visible; }",
    "  .gk2-wn-koszyk::after { content: ''; position: absolute; left: 0; right: 0; top: 100%; height: 8px; background: linear-gradient(135deg, var(--wn-krem) 50%, rgba(255,252,244,0) 50%) 0 0 / 12px 8px repeat-x, linear-gradient(225deg, var(--wn-krem) 50%, rgba(255,252,244,0) 50%) 0 0 / 12px 8px repeat-x; }",
    "  .gk2-wn-bilet { width: 276px; margin-left: -138px; }",
    "  .gk2-sklep-tekst > * { position: relative; z-index: 1; }",
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
    "  .gk2-lista li { position: relative; }",
    "  .gk2-lista-strzalka { position: absolute; right: 0; top: 24px; }",
    "  .gk2-deptak { height: 46vw; }",
    "  .gk2-deptak-napis { right: auto; left: 0; top: auto; bottom: calc(100% + 10px); display: block; text-align: left; white-space: nowrap; }",
    "  .gk2-stopka { padding-top: calc(var(--vh) * 15); }",
    "  .gk2-stolik { grid-template-columns: minmax(0, 1fr); padding: calc(var(--vh) * 13) var(--m); }",
    "  .gk2-stolik-foto { order: 2; justify-self: center; width: 78vw; margin-top: 12vw; }",
    "  .gk2-stolik-formularz { grid-template-columns: 1fr 1fr; }",
    "  .gk2-pasek-zamow { position: sticky; bottom: 12px; z-index: 66; display: flex; align-items: center; justify-content: space-between; gap: 12px; height: 56px; margin: -68px var(--m) 12px; padding: 0 7px 0 18px; border-radius: 999px; background: var(--tusz); color: #F2EFE8; line-height: 1.35; transform: translate3d(0, 160%, 0); transition: transform .45s cubic-bezier(.2,.85,.25,1); box-shadow: 0 14px 36px -16px rgba(0,0,0,.55); }",
    "  .gk2-pasek-zamow.gk2-pasek-widac { transform: none; }",
    "  .gk2-pasek-zamow b { font-weight: 400; color: var(--tusz); background: var(--roz); border-radius: 999px; padding: 12px 16px; }",
    "}",
    "@media (prefers-reduced-motion: reduce) {",
    "  .gk2 *, .gk2 *::before, .gk2 *::after { animation: none !important; transition: none !important; }",
    "  .gk2-js .gk2-wjazd, .gk2-js .gk2-linie > span > span, .gk2-js .gk2-s { opacity: 1 !important; transform: none !important; }",
    "  .gk2-js .gk2-opak, .gk2-js .gk2-swieta-droga { display: none !important; }",
    "  .gk2-sc-slowo span { animation: none !important; }",
    "  .gk2-film-zdjecia img:first-child { opacity: 1; }",
    "  .gk2-js .gk2-hero, .gk2-js .gk2-kino { height: calc(var(--vh) * 100); }",
    "}",
].join("\n")

const CSS_SW = [
    "/* Strona świąteczna w stylu Acne: róż 3015, drobne czarne napisy, zdjęcia na całą szerokość, rząd ciast. */",
    ".gk2-sw { --nav: 52px; --m: 24px; --hh: max(520px, calc(var(--vh) * 100 - var(--nav))); --start: calc(var(--hh) * .36); --wn-krem: #FFFCF4; --kafel: #FBE3E9; --linia: rgba(17,17,17,.16); }",
    ".gk2-sw section[id] { scroll-margin-top: var(--nav); }",
    // menu: cienki różowy pasek jak u Acne, w środku małe logo dopiero po zjechaniu dużego ze zdjęcia
    ".gk2-sw-nav { position: sticky; top: 0; z-index: 90; height: var(--nav); display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); align-items: center; gap: 16px; padding: 0 var(--m); background: var(--roz); border-bottom: 1px solid var(--linia); font-size: 11px; line-height: 1; letter-spacing: .07em; text-transform: uppercase; }",
    ".gk2-sw-nav-linki, .gk2-sw-nav-menu { grid-column: 1; grid-row: 1; }",
    ".gk2-sw-nav-linki { display: flex; gap: 22px; }",
    ".gk2-sw-nav-linki a { padding: 8px 0; background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size .3s ease; }",
    "@media (hover: hover) { .gk2-sw-nav-linki a:hover { background-size: 100% 1px; } }",
    ".gk2-sw-nav-menu { display: none; justify-self: start; height: 36px; padding: 0; border: 0; background: none; color: var(--tusz); font: inherit; letter-spacing: inherit; text-transform: inherit; cursor: pointer; }",
    ".gk2-sw-nav-logo { grid-column: 2; grid-row: 1; width: 112px; opacity: 0; visibility: hidden; transition: opacity .45s ease, visibility .45s; }",
    ".gk2-sw-po-hero .gk2-sw-nav-logo { opacity: 1; visibility: visible; }",
    ".gk2-sw-nav-prawo { grid-column: 3; grid-row: 1; justify-self: end; display: flex; align-items: center; gap: 16px; }",
    ".gk2-sw-pigulka { display: inline-flex; align-items: center; gap: 8px; height: 32px; padding: 0 14px; border-radius: 999px; background: var(--tusz); color: var(--roz); white-space: nowrap; transition: background .25s ease; }",
    ".gk2-sw-pigulka > i { width: 6px; height: 6px; border-radius: 50%; background: var(--maslo); }",
    "@media (hover: hover) { .gk2-sw-pigulka:hover { background: var(--rubin); } }",
    ".gk2-sw-tylko-tel { display: none; }",
    ".gk2-sw-torba { display: inline-flex; align-items: center; gap: 6px; height: 36px; padding: 0 2px; border: 0; background: none; color: var(--tusz); font: inherit; letter-spacing: inherit; cursor: pointer; }",
    ".gk2-sw-torba-n { display: none; }",
    ".gk2-sw-torba-n::before { content: counter(gk2koszyk); }",
    ".gk2[data-koszyk]:not([data-koszyk='0']) .gk2-sw-torba-n { display: inline; }",
    ".gk2-sw-menu { position: fixed; z-index: 89; top: var(--nav); left: 0; right: 0; padding: 4px var(--m) 26px; background: var(--roz); border-bottom: 1px solid var(--linia); box-shadow: 0 30px 40px -30px rgba(60,10,20,.35); }",
    ".gk2-sw-menu[hidden] { display: none; }",
    ".gk2-sw-menu a { display: flex; justify-content: space-between; align-items: baseline; padding: 16px 0; border-bottom: 1px solid var(--linia); font-size: 22px; line-height: 1.2; letter-spacing: -.02em; }",
    ".gk2-sw-menu a span { font-size: 11px; letter-spacing: .07em; }",
    // pierwszy ekran: sernik na całą szerokość, białe logo przyklejone do ekranu zjeżdża po zdjęciu aż do sklepu
    ".gk2-sw-hero { position: relative; height: var(--hh); background: #3A2420; color: #fff; }",
    ".gk2-sw-hero-foto { position: absolute; inset: 0; overflow: hidden; }",
    ".gk2-sw-hero-foto img { width: 100%; height: 100%; object-fit: cover; object-position: 86% 52%; animation: gk2-sw-wejscie 1.9s cubic-bezier(.2,.8,.2,1) both; }",
    "@keyframes gk2-sw-wejscie { from { opacity: 0; transform: scale(1.06); } }",
    ".gk2-sw-hero-foto::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(24,10,8,.26) 0%, rgba(24,10,8,0) 22%, rgba(24,10,8,0) 64%, rgba(24,10,8,.3) 100%); }",
    ".gk2-sw-hero-et { position: absolute; z-index: 2; color: #fff; text-shadow: 0 1px 12px rgba(0,0,0,.35); }",
    ".gk2-sw-hero-et-lg { left: var(--m); top: 16px; }",
    ".gk2-sw-hero-et-pg { right: var(--m); top: 16px; text-align: right; }",
    ".gk2-sw-hero-et-ld { left: var(--m); bottom: 16px; }",
    ".gk2-sw-tor { position: absolute; inset: 0; z-index: 3; padding: var(--start) var(--m) 52px; pointer-events: none; }",
    ".gk2-sw-lep { position: sticky; top: calc(var(--nav) + var(--start)); display: grid; justify-items: center; gap: 24px; }",
    ".gk2-sw-logo { width: min(88%, 1240px); }",
    ".gk2-sw-logo img { filter: brightness(0) invert(1) drop-shadow(0 2px 30px rgba(30,8,8,.28)); }",
    ".gk2-sw-cta { pointer-events: auto; display: inline-flex; align-items: center; gap: 12px; height: 50px; padding: 0 24px; border-radius: 999px; background: var(--roz); color: var(--tusz); font-size: 12px; letter-spacing: .08em; text-transform: uppercase; white-space: nowrap; box-shadow: 0 14px 34px -14px rgba(20,4,4,.6); transition: background .3s ease, color .3s ease; }",
    ".gk2-sw-cta svg { width: 16px; height: 16px; transition: transform .3s ease; }",
    "@media (hover: hover) { .gk2-sw-cta:hover { background: var(--tusz); color: var(--roz); } .gk2-sw-cta:hover svg { transform: translateX(4px); } }",
    // sklep: rząd ciast jak „Shop the collection” u Acne
    ".gk2-sw-sklep { padding: 0 0 64px; }",
    ".gk2-sw-wiersz { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 6px 20px; padding: 18px var(--m) 16px; }",
    ".gk2-sw-polka { position: relative; }",
    ".gk2-sw-rzad { display: grid; grid-auto-flow: column; grid-auto-columns: 30vw; gap: 10px; padding: 0 var(--m); overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding: 0 var(--m); scrollbar-width: none; overscroll-behavior-x: contain; }",
    ".gk2-sw-rzad::-webkit-scrollbar { display: none; }",
    "@media (min-width: 1180px) { .gk2-sw-rzad { grid-auto-columns: calc((100vw - 2 * var(--m) - 50px) / 5.4); } }",
    "@media (min-width: 1760px) { .gk2-sw-rzad { grid-auto-flow: row; grid-template-columns: repeat(7, minmax(0, 1fr)); overflow: visible; } .gk2-sw-pasek-rzad { display: none !important; } }",
    ".gk2-sw-kafel { display: grid; grid-template-rows: auto 1fr auto; gap: 12px; min-width: 0; scroll-snap-align: start; }",
    ".gk2-sw-kafel-foto { position: relative; aspect-ratio: 4 / 5; overflow: hidden; background: var(--kafel); }",
    ".gk2-sw-kafel-nr { position: absolute; left: 12px; top: 11px; }",
    ".gk2-sw-kafel-zast { position: absolute; right: 9px; top: 8px; padding: 4px 8px; border: 1px dashed rgba(17,17,17,.55); border-radius: 999px; font-size: 9.5px; line-height: 1; letter-spacing: .06em; text-transform: uppercase; }",
    ".gk2-sw-kafel-mam { position: absolute; left: 12px; bottom: 10px; padding: 4px 8px; border-radius: 999px; background: var(--tusz); color: var(--maslo); line-height: 1.2; }",
    ".gk2-sw-ciasto { position: absolute; left: 50%; top: 70%; width: calc(var(--cw) / 74 * 80%); transform: translate(calc(var(--bx) * -100%), calc(var(--by) * -100%)); }",
    ".gk2-sw-ciasto img { width: 100%; height: auto; transition: transform .7s cubic-bezier(.2,.8,.2,1); }",
    ".gk2-sw-lustro { transform: scaleX(-1); }",
    "@media (hover: hover) { .gk2-sw-kafel:hover .gk2-sw-ciasto img { transform: translateY(-3%) scale(1.035); } .gk2-sw-kafel:hover .gk2-sw-ciasto .gk2-sw-lustro { transform: translateY(-3%) scale(-1.035, 1.035); } }",
    ".gk2-sw-cien { position: absolute; left: 50%; top: 70%; width: calc(var(--ba) * 2.1 * var(--cw) / 74 * 80%); aspect-ratio: 4.6 / 1; transform: translate(-50%, -38%); border-radius: 50%; background: radial-gradient(closest-side, rgba(110,30,45,.3), rgba(110,30,45,0)); }",
    ".gk2-sw-cien-dysk { aspect-ratio: 3.4 / 1; transform: translate(-50%, -30%); }",
    ".gk2-sw-cien-brak { display: none; }",
    ".gk2-sw-cien-brak + .gk2-sw-ciasto img { filter: drop-shadow(0 7px 9px rgba(110,30,45,.16)); }",
    ".gk2-sw-kafel-opis { display: flex; flex-direction: column; gap: 5px; padding: 0 2px; }",
    ".gk2-sw-kafel-nazwa { font-size: 12px; line-height: 1.35; letter-spacing: .05em; text-transform: uppercase; }",
    ".gk2-sw-kafel-reszta, .gk2-sw-kafel-sklad { font-size: 12px; line-height: 1.45; opacity: .72; }",
    ".gk2-sw-kafel-sklad summary { display: inline-flex; align-items: center; gap: 8px; padding: 2px 0; list-style: none; cursor: pointer; font-size: 11px; letter-spacing: .07em; text-transform: uppercase; text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }",
    ".gk2-sw-kafel-sklad summary::-webkit-details-marker { display: none; }",
    ".gk2-sw-kafel-sklad summary::after { content: '+'; display: inline-block; text-decoration: none; }",
    ".gk2-sw-kafel-sklad[open] summary::after { content: '−'; }",
    ".gk2-sw-kafel-sklad ul { display: grid; gap: 2px; margin-top: 6px; }",
    ".gk2-sw-nw { white-space: nowrap; }",
    ".gk2-sw-kafel-cena { display: flex; justify-content: space-between; gap: 10px; margin-top: auto; padding-top: 3px; font-size: 12px; }",
    ".gk2-sw-kafel-cena b { font-weight: 400; }",
    ".gk2-sw-kafel-cena span { opacity: .72; }",
    ".gk2-sw-dodaj { display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; min-height: 44px; padding: 0 12px; border: 1.5px solid var(--tusz); border-radius: 999px; background: transparent; color: var(--tusz); font: inherit; font-size: 11px; letter-spacing: .07em; text-transform: uppercase; cursor: pointer; transition: background .25s ease, color .25s ease; }",
    "@media (hover: hover) { .gk2-sw-dodaj:not(:disabled):hover { background: var(--tusz); color: var(--roz); } }",
    ".gk2-sw-dodaj.gk2-sw-dodano { background: var(--tusz); color: var(--maslo); }",
    ".gk2-sw-dodaj:disabled { opacity: .45; cursor: default; }",
    ".gk2-sw-pasek-rzad { display: flex; align-items: center; gap: 8px; margin: 18px var(--m) 0; }",
    ".gk2-sw-rzad-caly .gk2-sw-pasek-rzad { display: none; }",
    ".gk2-sw-pasek { position: relative; flex: 1; height: 2px; overflow: hidden; background: rgba(17,17,17,.14); }",
    ".gk2-sw-pasek i { position: absolute; top: 0; bottom: 0; left: calc(var(--p, 0) * (1 - var(--w, 1)) * 100%); width: calc(var(--w, 1) * 100%); background: var(--tusz); }",
    ".gk2-sw-strz { flex: none; display: grid; place-items: center; width: 38px; height: 38px; padding: 0; border: 1.5px solid var(--tusz); border-radius: 50%; background: none; color: var(--tusz); cursor: pointer; }",
    "@media (hover: none) { .gk2-sw-strz { display: none; } }",
    // bilecik drukuje się spod menu, koszyk wysuwa się z prawej jak torba u Acne
    ".gk2-sw .gk2-wn-bilet { position: fixed; z-index: 96; top: var(--nav); }",
    ".gk2-sw .gk2-wn-koszyk { position: fixed; z-index: 95; top: var(--nav); right: 0; bottom: 0; left: auto; width: min(400px, 100%); max-height: none; margin: 0; display: flex; flex-direction: column; overflow: hidden; padding: 22px 22px calc(16px + env(safe-area-inset-bottom, 0px)); border-radius: 0; box-shadow: -24px 0 60px -20px rgba(60,10,20,.35); animation: gk2-sw-szuflada .5s cubic-bezier(.2,.85,.25,1) both; }",
    ".gk2-sw .gk2-wn-koszyk::after { display: none; }",
    ".gk2-sw .gk2-wn-koszyk > .gk2-wn-koszyk-srodek { overflow-y: auto; overscroll-behavior: contain; }",
    "@keyframes gk2-sw-szuflada { from { transform: translate3d(100%, 0, 0); } }",
    ".gk2-sw-zaslona { position: fixed; z-index: 94; top: var(--nav); left: 0; right: 0; bottom: 0; background: rgba(17,17,17,.24); animation: gk2-sw-zaslona .4s ease both; }",
    "@keyframes gk2-sw-zaslona { from { opacity: 0; } }",
    // drugie duże zdjęcia: dwa pionowe obok siebie, jak „New arrivals” u Acne
    ".gk2-sw-para { display: grid; grid-template-columns: 1fr 1fr; }",
    ".gk2-sw-para-foto { position: relative; display: block; aspect-ratio: 4 / 5; overflow: hidden; background: #3A2420; color: #fff; }",
    ".gk2-sw-para-foto img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 1.4s cubic-bezier(.2,.8,.2,1); }",
    ".gk2-sw-para-foto::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, rgba(24,10,8,.34) 0%, rgba(24,10,8,0) 16%, rgba(24,10,8,0) 80%, rgba(24,10,8,.32) 100%); }",
    ".gk2-sw-para-tarta img { object-position: 50% 62%; }",
    ".gk2-sw-para-kawa img { object-position: 50% 58%; }",
    "@media (hover: hover) { .gk2-sw-para-foto:hover img { transform: scale(1.03); } }",
    ".gk2-sw-para-et { position: absolute; z-index: 1; left: var(--m); text-shadow: 0 1px 12px rgba(0,0,0,.4); }",
    ".gk2-sw-para-g { top: 16px; }",
    ".gk2-sw-para-d { bottom: 16px; }",
    // wigilia firmowa i stolik: tekst po lewej, formularz po prawej
    ".gk2-sw-blok { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 48px; padding: 96px var(--m); }",
    ".gk2-sw-blok + .gk2-sw-blok { border-top: 1px solid var(--linia); }",
    ".gk2-sw-h2 { margin-top: 14px; font-size: clamp(30px, 3.1vw, 46px); line-height: 1.08; letter-spacing: -.035em; }",
    ".gk2-sw-lead { margin-top: 22px; font-size: 14px; line-height: 1.65; max-width: 36em; }",
    ".gk2-sw-fakty { margin-top: 30px; border-top: 1px solid rgba(17,17,17,.22); max-width: 36em; }",
    ".gk2-sw-fakty div { display: grid; grid-template-columns: 10em minmax(0, 1fr); gap: 12px; padding: 11px 0; border-bottom: 1px solid rgba(17,17,17,.22); font-size: 12px; }",
    ".gk2-sw-fakty dt { letter-spacing: .07em; text-transform: uppercase; }",
    ".gk2-sw-adres { margin-top: 26px; }",
    ".gk2-sw-blok-forma { min-width: 0; }",
    ".gk2-sw-blok-forma .gk2-zapytanie, .gk2-sw-blok-forma .gk2-zapytanie-dzieki { margin-top: 0; }",
    // odbiór i adresy: maślany pas jak stopka u Acne
    ".gk2-sw-odbior { background: var(--maslo); padding: 80px var(--m) 56px; }",
    ".gk2-sw-kolumny { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px; margin-top: 44px; padding-top: 18px; border-top: 1px solid rgba(17,17,17,.25); }",
    ".gk2-sw-kolumny h3 { margin-bottom: 4px; }",
    ".gk2-sw-kolumny p { margin-top: 10px; font-size: 13px; line-height: 1.55; }",
    ".gk2-sw-kolumny a { display: inline-block; margin-top: 12px; font-size: 12px; text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }",
    "@media (hover: hover) { .gk2-sw-kolumny a:hover { color: var(--rubin); } }",
    ".gk2-sw-stopka { background: var(--maslo); padding: 0 var(--m) 22px; }",
    ".gk2-sw-stopka-wiersz { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 24px; padding: 18px 0 30px; border-top: 1px solid rgba(17,17,17,.25); }",
    ".gk2-sw-stopka-logo { width: 100%; }",
    ".gk2-sw-stopka-linki { display: flex; flex-wrap: wrap; gap: 10px 24px; padding: 0 0 30px; }",
    ".gk2-sw-stopka-linki a { background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size .3s ease; }",
    "@media (hover: hover) { .gk2-sw-stopka-linki a:hover { background-size: 100% 1px; } }",
    ".gk2-sw-stopka-firma { margin-top: 18px; font-size: 11px; line-height: 1.7; opacity: .8; }",
    ".gk2-sw-stopka-firma a { text-decoration: underline; text-underline-offset: 2px; text-decoration-thickness: 1px; }",
    // pasek KPO zawsze na białym tle (flaga i logotypy w oryginalnych kolorach)
    ".gk2-sw-kpo { display: block; margin: 22px calc(var(--m) * -1) -22px; padding: 14px var(--m) calc(14px + env(safe-area-inset-bottom, 0px)); background: #fff; text-align: center; }",
    ".gk2-sw-kpo img { display: inline-block; width: 100%; max-width: 620px; height: auto; }",
    // formularze: pułapka na boty, błąd, zgoda
    "/* Kasa w szufladzie koszyka (22.11.2026): godzina odbioru, dane, zgoda, płatność Stripe; po powrocie podziękowanie. */",
    ".gk2-sw .gk2-wn-odb:disabled { opacity: .38; text-decoration: line-through; cursor: default; }",
    ".gk2-sw-kasa { display: contents; }",
    ".gk2-sw-wroc { align-self: flex-start; margin: 10px 0 0; padding: 6px 0; border: 0; background: none; color: var(--tusz); font: inherit; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; }",
    ".gk2-sw-dane { display: grid; gap: 14px; padding: 10px 0 16px; }",
    ".gk2-sw-okna { display: grid; gap: 7px; }",
    ".gk2-sw-okna > span:nth-child(2) { display: flex; flex-wrap: wrap; gap: 6px; }",
    ".gk2-sw-dane .gk2-pole textarea { width: 100%; min-width: 0; min-height: 60px; resize: vertical; background: transparent; border: 0; border-bottom: 1.5px solid var(--tusz); border-radius: 0; color: var(--tusz); padding: 10px 2px 12px; font: inherit; font-size: 16px; outline: none; transition: border-color .25s ease; }",
    ".gk2-sw-dane .gk2-pole textarea:focus { border-bottom-color: var(--rubin); }",
    ".gk2-sw-check { display: grid; grid-template-columns: 20px minmax(0, 1fr); gap: 10px; align-items: start; font-size: 12px; line-height: 1.5; cursor: pointer; }",
    ".gk2-sw-check input { width: 18px; height: 18px; margin: 1px 0 0; accent-color: var(--tusz); }",
    ".gk2-sw-check a { text-decoration: underline; text-underline-offset: 2px; }",
    ".gk2-sw-kasa-blad { margin: 10px 0 0; }",
    ".gk2-sw-kasa-info { margin: 8px 0 0; font-size: 11px; line-height: 1.5; opacity: .7; text-align: center; }",
    ".gk2-sw-dzieki { display: grid; gap: 10px; padding: 18px 0 8px; }",
    ".gk2-sw-dzieki p { margin: 0; font-size: 13px; line-height: 1.55; }",
    ".gk2-sw-dzieki .gk2-h3 { font-size: 24px; line-height: 1.15; }",
    ".gk2-sw-pulapka { position: absolute; left: -9999px; top: auto; width: 1px; height: 1px; overflow: hidden; }",
    ".gk2-sw .gk2-zapytanie { position: relative; }",
    ".gk2-sw-blad { grid-column: 1 / -1; margin: 0; color: var(--rubin); font-size: 12px; line-height: 1.5; }",
    ".gk2-sw-zgoda { grid-column: 1 / -1; margin: 0; opacity: .7; }",
    ".gk2-sw-zgoda a { text-decoration: underline; text-underline-offset: 2px; }",
    ".gk2-sw .gk2-przycisk:disabled { opacity: .6; cursor: progress; }",
    // łagodne wejścia (tylko gdy działa skrypt i ruch nie jest ograniczony)
    ".gk2-sw-js .gk2-sw-wjazd { opacity: 0; transform: translate3d(0, 24px, 0); transition: opacity .9s ease, transform 1s cubic-bezier(.2,.85,.25,1); transition-delay: calc(var(--i, 0) * 70ms); }",
    ".gk2-sw-js .gk2-sw-wjazd.gk2-sw-widac { opacity: 1; transform: none; }",
    "@media (max-width: 1023px) { .gk2-sw-kolumny { grid-template-columns: 1fr 1fr; gap: 28px 24px; } }",
    // pionowy tablet: zdjęcie jest poziome, więc pierwszy ekran nie wyższy niż szerokość, a pod nim widać już sklep
    "@media (min-width: 810px) and (max-aspect-ratio: 1/1) { .gk2-sw { --hh: clamp(520px, 100vw, calc(var(--vh) * 100 - var(--nav))); --start: calc(var(--hh) * .3); } .gk2-sw-hero-foto img { object-position: 62% 50%; } }",
    "@media (max-width: 809px) {",
    "  .gk2-sw { --m: 16px; --hh: clamp(420px, 132vw, calc(var(--vh) * 100 - var(--nav) - 84px)); --start: calc(var(--hh) * .3); }",
    "  .gk2-sw-nav { grid-template-columns: auto minmax(0, 1fr) auto; gap: 10px; }",
    "  .gk2-sw-nav-linki { display: none; }",
    "  .gk2-sw-nav-menu { display: inline-flex; align-items: center; }",
    "  .gk2-sw-nav-logo { justify-self: center; width: 92px; }",
    "  .gk2-sw-nav-prawo { gap: 12px; }",
    "  .gk2-sw-tylko-duzy { display: none; }",
    "  .gk2-sw-tylko-tel { display: inline; }",
    "  .gk2-sw-pigulka { padding: 0 12px; }",
    "  .gk2-sw-hero-foto img { object-position: 62% 50%; }",
    "  .gk2-sw-tor { padding-bottom: 46px; }",
    "  .gk2-sw-lep { gap: 18px; }",
    "  .gk2-sw-logo { width: 100%; }",
    "  .gk2-sw-cta { height: 46px; padding: 0 20px; font-size: 11px; }",
    "  .gk2-sw-rzad { grid-auto-columns: 64vw; }",
    "  .gk2-sw-para { grid-template-columns: 1fr; }",
    "  .gk2-sw-blok { grid-template-columns: 1fr; gap: 30px; padding: 64px var(--m); }",
    "  .gk2-sw-h2 { font-size: 28px; }",
    "  .gk2-sw-odbior { padding: 60px var(--m) 44px; }",
    "  .gk2-sw .gk2-wn-koszyk { width: 100%; box-shadow: none; }",
    "}",
    "@media (max-width: 559px) { .gk2-sw-kolumny { grid-template-columns: 1fr; gap: 26px; } .gk2-sw-fakty div { grid-template-columns: 8.5em minmax(0, 1fr); } }",
    "@media (prefers-reduced-motion: reduce) { .gk2-sw-hero-foto img, .gk2-sw .gk2-wn-koszyk, .gk2-sw-zaslona { animation: none; } .gk2-sw-ciasto img, .gk2-sw-para-foto img { transition: none; } }",
].join("\n")

const CSS = CSS_A + "\n" + CSS_B + "\n" + CSS_SW

// ---------- Silnik strony świątecznej ----------
// Mało ruchu, jak u Acne: małe logo w menu pojawia się, kiedy duże logo zjedzie ze zdjęcia, a kafle i bloki łagodnie wjeżdżają.
function silnik(root: HTMLDivElement, el: Record<string, any>) {
    const sprzatanie: Array<() => void> = []
    if (typeof IntersectionObserver === "undefined") return () => {}
    const lep = el.lep as HTMLElement | undefined
    if (lep) {
        const io = new IntersectionObserver(
            (w) => {
                root.classList.toggle("gk2-sw-po-hero", !w[w.length - 1].isIntersecting)
            },
            { rootMargin: "-52px 0px 0px 0px" }
        )
        io.observe(lep)
        sprzatanie.push(() => io.disconnect())
    }
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        root.classList.add("gk2-sw-js")
        const io2 = new IntersectionObserver(
            (w) => {
                w.forEach((e) => {
                    if (!e.isIntersecting) return
                    e.target.classList.add("gk2-sw-widac")
                    io2.unobserve(e.target)
                })
            },
            { rootMargin: "0px 0px -6% 0px" }
        )
        root.querySelectorAll(".gk2-sw-wjazd").forEach((x) => io2.observe(x))
        sprzatanie.push(() => io2.disconnect())
    }
    return () => sprzatanie.forEach((f) => f())
}

interface Props {
    style?: React.CSSProperties
}

const SW_LINKI = [
    ["Wypieki", "Wypieki na Święta", "gk2-sklep"],
    ["Dla firm", "Wigilia firmowa", "gk2-firmy"],
    ["Stolik", "Zarezerwuj stolik", "gk2-stolik"],
    ["Odbiór", "Odbiór i adresy", "gk2-odbior"],
]

function SwStrzalka() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 12h16M13 5.5l6.5 6.5-6.5 6.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
        </svg>
    )
}

/**
 * Górka & Kulka — strona świąteczna w stylu Acne: sernik na pierwszym ekranie, białe logo zjeżdża po zdjęciu do sklepu,
 * rząd ciast z koszykiem, wigilia firmowa, stolik, odbiór i adresy.
 *
 * @framerIntrinsicWidth 1440
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 */
export default function KonceptFunduszSwieta(props: Props) {
    const rootRef = useRef<HTMLDivElement>(null)
    const E = useRef<Record<string, any>>({})
    const u = (k: string) => (el: any) => {
        E.current[k] = el
    }
    const [menu, ustawMenu] = useState(false)

    useEffect(() => {
        const root = rootRef.current
        if (!root || typeof window === "undefined" || naKanwie()) return
        return silnik(root, E.current)
    }, [])

    // Menu na telefonie: Esc zamyka.
    useEffect(() => {
        if (!menu) return
        const esc = (e: KeyboardEvent) => {
            if (e.key === "Escape") ustawMenu(false)
        }
        window.addEventListener("keydown", esc)
        return () => window.removeEventListener("keydown", esc)
    }, [menu])

    const skok = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault()
        ustawMenu(false)
        przewinDo(id)
    }
    // „Zamów” przewija do sklepu, a jeśli coś już jest w koszyku, od razu go otwiera.
    const doSklepu = (e: React.MouseEvent) => {
        skok("gk2-sklep")(e)
        if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("gk2-koszyk-otworz"))
    }
    const mapa = (q: string) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q)

    return (
        <div className={"gk2 gk2-sw" + (menu ? " gk2-sw-menu-on" : "")} ref={rootRef} style={props.style}>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />

            <header className="gk2-sw-nav">
                <button type="button" className="gk2-sw-nav-menu" onClick={() => ustawMenu(!menu)} aria-expanded={menu} aria-controls="gk2-sw-menu">
                    {menu ? "Zamknij" : "Menu"}
                </button>
                <nav className="gk2-sw-nav-linki" aria-label="Główne">
                    {SW_LINKI.map((l) => (
                        <a key={l[2]} href={"#" + l[2]} onClick={skok(l[2])}>
                            {l[0]}
                        </a>
                    ))}
                </nav>
                <a className="gk2-sw-nav-logo" href="#gk2-start" onClick={skok("gk2-start")} aria-label="Górka & Kulka — początek strony">
                    <Wyc a={P.logotyp} rozmiar={1024} alt="" odrazu />
                </a>
                <div className="gk2-sw-nav-prawo">
                    <a className="gk2-sw-pigulka" href="#gk2-sklep" onClick={doSklepu}>
                        <i aria-hidden="true" />
                        <span className="gk2-sw-tylko-duzy">{SW_SPRZEDAZ ? "Zamów na Święta" : "Wypieki na Święta"}</span>
                        <span className="gk2-sw-tylko-tel">{SW_SPRZEDAZ ? "Zamów" : "Wypieki"}</span>
                    </a>
                    {SW_SPRZEDAZ ? (
                        <button type="button" className="gk2-sw-torba" onClick={() => window.dispatchEvent(new CustomEvent("gk2-koszyk-przelacz"))} aria-label="Koszyk" aria-haspopup="dialog" aria-expanded="false">
                            <IkonaTorba />
                            <span className="gk2-sw-torba-n" aria-hidden="true" />
                        </button>
                    ) : null}
                </div>
            </header>
            <nav className="gk2-sw-menu" id="gk2-sw-menu" hidden={!menu} aria-label="Menu">
                {SW_LINKI.map((l) => (
                    <a key={l[2]} href={"#" + l[2]} onClick={skok(l[2])}>
                        {l[1]}
                        <span>→</span>
                    </a>
                ))}
            </nav>

            <section className="gk2-sw-hero" id="gk2-start" aria-label="Wypieki na Święta 2026">
                <h1 className="gk2-sr">Górka & Kulka — wypieki na Święta 2026 w Gorzowie Wielkopolskim. Zamówienia do 21 grudnia.</h1>
                <div className="gk2-sw-hero-foto">
                    <img src={FOTO_SWIETA} alt="Sernik baskijski na stalowej paterze, ktoś odkrawa kawałek; obok różowe pudełko Górka & Kulka" loading="eager" decoding="async" />
                </div>
                <span className="gk2-e gk2-sw-hero-et gk2-sw-hero-et-lg">Wypieki na Święta 2026</span>
                <span className="gk2-e gk2-sw-hero-et gk2-sw-hero-et-pg">Zamówienia do 21.12</span>
                <span className="gk2-e gk2-sw-hero-et gk2-sw-hero-et-ld">Na zdjęciu: sernik baskijski · 220 zł</span>
                <div className="gk2-sw-tor">
                    <div className="gk2-sw-lep" ref={u("lep")}>
                        <Wyc a={P.logotyp} rozmiar={2048} alt="Górka & Kulka" className="gk2-sw-logo" odrazu />
                        <a className="gk2-sw-cta" href="#gk2-sklep" onClick={doSklepu}>
                            {SW_SPRZEDAZ ? "Zamów ciasta na Święta" : "Zobacz wypieki na Święta"}
                            <SwStrzalka />
                        </a>
                    </div>
                </div>
            </section>

            <section className="gk2-sw-sklep" id="gk2-sklep" aria-labelledby="gk2-sw-sklep-t">
                <div className="gk2-sw-wiersz gk2-e">
                    <h2 id="gk2-sw-sklep-t">Wypieki na Święta</h2>
                    <span>
                        <span className="gk2-sw-nw">{SW_SPRZEDAZ ? "Zamówienia do 21.12" : "Zamówienia online ruszą wkrótce"}</span>
                        {" · "}
                        <span className="gk2-sw-nw">zadatek 30%</span>
                        {" · "}
                        <span className="gk2-sw-nw">{"odbiór 23.12"}</span>
                    </span>
                </div>
                <Polka />
            </section>

            <div className="gk2-sw-para">
                <a className="gk2-sw-para-foto gk2-sw-para-tarta" href="#gk2-sklep" onClick={skok("gk2-sklep")}>
                    <img src={FOTO_TARTA} alt="Tarta pistacjowa z malinami, za nią sernik z malinami i tort czekoladowy, w tle światełka" loading="lazy" decoding="async" />
                    <span className="gk2-e gk2-sw-para-et gk2-sw-para-g">Wypieki na Święta</span>
                    <span className="gk2-e gk2-sw-para-et gk2-sw-para-d">{"Tarta pistacjowa z malinami · 190 zł"}</span>
                </a>
                <a className="gk2-sw-para-foto gk2-sw-para-kawa" href="#gk2-firmy" onClick={skok("gk2-firmy")}>
                    <img src={FOTO_WIGILIA_SW} alt="Dwa kubki herbaty z pomarańczą, tort czekoladowy, ptyś z kremem Lotus, bita śmietana i świeczka na stole, obok czerwony wazon z amarantusem i aksamitna kokarda" loading="lazy" decoding="async" />
                    <span className="gk2-e gk2-sw-para-et gk2-sw-para-g">Wigilia firmowa</span>
                    <span className="gk2-e gk2-sw-para-et gk2-sw-para-d">Kawiarnia Centrum, ul. Sikorskiego 126</span>
                </a>
            </div>

            <section className="gk2-sw-blok" id="gk2-firmy" aria-labelledby="gk2-sw-firmy-t">
                <div className="gk2-sw-wjazd">
                    <div className="gk2-e">Dla firm</div>
                    <h2 className="gk2-sw-h2" id="gk2-sw-firmy-t">
                        Wigilia firmowa.
                    </h2>
                    <p className="gk2-sw-lead">{"Zamknijcie rok przy jednym stole. Dwie godziny, nasza obsługa i specjalne menu ułożone na tę okazję. Podajcie termin i liczbę osób, a odpiszemy z ofertą."}</p>
                    <dl className="gk2-sw-fakty">
                        <div>
                            <dt>2 godziny</dt>
                            <dd>przy wspólnym stole</dd>
                        </div>
                        <div>
                            <dt>Obsługa</dt>
                            <dd>{"podajemy i dbamy o resztę"}</dd>
                        </div>
                        <div>
                            <dt>Menu</dt>
                            <dd>{"specjalne, układane na tę okazję"}</dd>
                        </div>
                    </dl>
                </div>
                <div className="gk2-sw-blok-forma">
                    <Zapytanie />
                </div>
            </section>

            <section className="gk2-sw-blok" id="gk2-stolik" aria-labelledby="gk2-sw-stolik-t">
                <div className="gk2-sw-wjazd">
                    <div className="gk2-e">Stolik</div>
                    <h2 className="gk2-sw-h2" id="gk2-sw-stolik-t">
                        Zarezerwuj stolik.
                    </h2>
                    <p className="gk2-sw-lead">{"Śniadanie, kawa, kawałek ciasta w Kawiarni Centrum. Zostaw prośbę, a my oddzwonimy albo napiszemy SMS, żeby ją potwierdzić."}</p>
                    <p className="gk2-e gk2-sw-adres">{"Kawiarnia Centrum, ul. Sikorskiego 126 · codziennie 10–19"}</p>
                </div>
                <div className="gk2-sw-blok-forma">
                    <Stolik />
                </div>
            </section>

            <section className="gk2-sw-odbior" id="gk2-odbior" aria-labelledby="gk2-sw-odbior-t">
                <div className="gk2-e">Gorzów Wielkopolski</div>
                <h2 className="gk2-sw-h2" id="gk2-sw-odbior-t">
                    Odbiór i adresy.
                </h2>
                <div className="gk2-sw-kolumny">
                    <div>
                        <h3 className="gk2-e">Odbiór świąteczny</h3>
                        <p>
                            {"Środa 23 grudnia, 14:00–19:00"}
                            <br />
                            {"Kawiarnia Centrum albo Nova Park, do wyboru przy zamówieniu"}
                        </p>
                    </div>
                    <div>
                        <h3 className="gk2-e">Kawiarnia Centrum</h3>
                        <p>
                            {"ul. Sikorskiego 126"}
                            <br />
                            Gorzów Wielkopolski
                        </p>
                        <p>Codziennie 10–19</p>
                        <a href={mapa("Górka & Kulka Sikorskiego 126 Gorzów Wielkopolski")} target="_blank" rel="noopener noreferrer">
                            Jak dojść ↗
                        </a>
                    </div>
                    <div>
                        <h3 className="gk2-e">Nova Park</h3>
                        <p>
                            Centrum handlowe Nova Park
                            <br />
                            Gorzów Wielkopolski
                        </p>
                        <p>Godziny galerii</p>
                        <a href={mapa("Górka & Kulka Nova Park Gorzów Wielkopolski")} target="_blank" rel="noopener noreferrer">
                            Jak dojść ↗
                        </a>
                    </div>
                    <div>
                        <h3 className="gk2-e">Zamówienia</h3>
                        <p>{SW_SPRZEDAZ ? "Do 21 grudnia, przez stronę" : "Przez stronę, do 21 grudnia. Zamówienia online ruszą wkrótce."}</p>
                        <p>{"Zadatek 30% przy zamówieniu, reszta przy odbiorze"}</p>
                        <a href="#gk2-sklep" onClick={doSklepu}>
                            {SW_SPRZEDAZ ? "Zamów ciasta →" : "Zobacz wypieki →"}
                        </a>
                    </div>
                </div>
            </section>

            <footer className="gk2-sw-stopka">
                <div className="gk2-sw-stopka-wiersz gk2-e">
                    <span>Małe święto każdego dnia.</span>
                    <a href="https://www.instagram.com/gorka.kulka/" target="_blank" rel="noopener noreferrer">
                        Instagram @gorka.kulka
                    </a>
                    <span>© 2026 Górka & Kulka s.c.</span>
                </div>
                <nav className="gk2-sw-stopka-linki gk2-e" aria-label="Więcej">
                    {SW_PODSTRONY.map((l) => (
                        <a key={l[1]} href={l[1]}>
                            {l[0]}
                        </a>
                    ))}
                </nav>
                <Wyc a={P.logotyp} rozmiar={2048} className="gk2-sw-stopka-logo" alt="Górka & Kulka" />
                <p className="gk2-sw-stopka-firma">
                    {"GÓRKA & KULKA S.C. Magdalena Kowalska, Paweł Górka · ul. Gen. Władysława Sikorskiego 126, 66-400 Gorzów Wielkopolski · NIP 599 318 75 02 · "}
                    <a href="mailto:gorka.kulka@gmail.com">gorka.kulka@gmail.com</a>
                    {" · tel. "}
                    <a href="tel:+48500344913">{"+48 500 344 913"}</a>
                </p>
                <a className="gk2-sw-kpo" href="/dotacje" aria-label="Projekt dofinansowany z Krajowego Planu Odbudowy — szczegóły na stronie Dotacje">
                    <img src={KPO_PASEK} width={1024} height={131} alt="Krajowy Plan Odbudowy, Rzeczpospolita Polska, Sfinansowane przez Unię Europejską NextGenerationEU" loading="lazy" decoding="async" />
                </a>
            </footer>
        </div>
    )
}
