import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

// Górka & Kulka — zakładka rekrutacji „Stań się jednym z nas” (/dolacz), do strony po świętach (odsłona 2027).
// Głos: Szary Dzień mówi całą prawdę o pracy, Kulka odpowiada. Szarość przechodzi w kolor razem z przewijaniem.
// Filtr: prawda o pracy, pytania zamiast CV, ukryty test uważności (słowo w kwestii Szarego Dnia, właściwość
// „Słowo testu”), 30 s wideo albo trzy zdania — równorzędnie (brak zgody na nagranie nie może szkodzić
// kandydatowi, art. 22¹a § 2 k.p.). Stawka jawna (od 24.12.2025 kandydat musi ją znać najpóźniej przed rozmową).
// Pracodawca: Górka & Kulka s.c. TRYB PODGLĄDU: formularz niczego nie wysyła, dopóki nie podłączymy zapisu zgłoszeń.

const CDN = "https://framerusercontent.com/"
function obraz(plik: string, rozmiar?: number) {
    return CDN + "images/" + plik + (rozmiar ? "?scale-down-to=" + rozmiar : "")
}

const REGLO = "d09GMgABAAAAAAqIAA4AAAAAGLQAAAoyAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGhYbgxAcKgZgAIFMEQgKpEyaLwE2AiQDghALgQoABCAFPAcgGxgSo6J+clIOyP7iwDZmFnyFAmghzwpbtfxo5U/ZEupjMKEp1R3AIMitQQ4swRPZfb2qng8t2UvNnuHoHF+40QWRGEKIhEho/2ku+z8zWXh/pgAsTP0B2t1tA1Pg9FgCJjYR+hAksFAIjuQlOIB//wOEDzzCOa/AvDC35hvcy8RaWLEyyAc8MJPCxP42D1OX2kzTiehfa6+WQCUukYASPaCNjE2MuYUPb+82zCwMcBUxCdMKFdupZ9dpbHmID79mYmGhowSr1peFAHEAQBGEzvheIEo5PtpvwLBxJC2bvW4FSXgAXxVFls5fs4IwI56xh8LlRemHkIYHeBRRTi3tRGJuCVqQcYu7mWDVg9W7Q3RwZxByG6KUVUb7yQHuEiYI7rHvbjofEfiW5I5vOj7v97282LWB+PEIKeSSTwFFFFNKOVVUU0M9DTTSRAsdEFHxAAFAI3V4kHGPB4O5LIScsNCUQik2U6ejRnLG1dg5ZR6VbYXXSqq1cxqQMxv5pOcIgO7XEBiarEVm4MtYgGdhH1ZtXrMWi7WVRlxumHdiI23W1/52kGCgaQYGMfA4BbWif7dHlBJq6EpPpnBPPAlKjvSWvjJMpshm2WozbK4ttKW20rnAUkkdPemtppquUfAzzb3w3BOPLdRNezXkX/++/3v6mU+zCuTJkp5AYsW5RRf7eap7HS6DwFgInvKPbzUo6EreuUm4UjBYDrnhmwGa6rJwtdIY0yhQO1qRL0TLuOiODqM1dFO5jJFpUT19KHcY9AKA7qpUlK1WRwCDIaPbTMmiqcmgvakZM5W2sjVVaBJpgPpCekRDz1CAUeZes7ek+QfGvtVxYKI5tW3nYy84KxpzhSW9jtzKmS2h1CKUm+xFlRuQ+ngZN6VwELKTyK9TemXSEtglWaSw8bIHdwT5YdL0iAipg7oHSADgGDQ8CjA4BEo7yDwBApePzkIShHDOkgmcCn7uEdnGETlq4VHN5deJ3P1uso05vFeNRYGtFkqe2cmS4exm8EMya08k9PAwqf3h5ZvnnTy91qR9PMZooU1R+owFtC8HMZyIJ+DGMpLIXCGD/dBATZ06CaY3Prbj928GvmXWE7ZxxLD7LK6CM0GCuuvwS7qzy0AYF4ie+NshVvEXZsV/jjXkF4Vw/6eMp0E6YLfEyD9sQdUGlmURcRwmKBi+Umg+TJ2HSQISvoyO+ug6eZcs8tTGLMOWjTqcllePBSJQiofHMgmBhIxvKQ/0wDokRnixBKkOucUi4CMaSqWCeKKWtfhlqoidHdIyW9iG/SRCvIOEGU7WySSB+qR6VAPzOCByr8GIWRfqiPDFAdHhk76qUZQHh9X4OEe8NM0CrnfQTIqv9IvqMQdkwOJAhCV65uu5dQipQ4qbnJnmXnxx8D5nx6SwDEp2I7dT6jh4y/GO9PCRqho+2I4pxhdt++D+kQUsyeLyyQXEIQuMXHAJSYT5Blwsc4EcCT2oeHRsY09nJoatS7NcKy3LZyTRSSgU58yW5bsP737FYejOspbP0awQyKZDLG4w41ArtclMwJJag4l0noeClPKo+sTidXo4B292EJ+oo5M6VTu8TwBdnrm70XHsj4XWnHTT/bfi+fW5lVk80Rkh0Ksvh39O3uCA/9LOeYcJ//p7pUUCU/7zbhACY1TYCHW+pMggEW5AC99u8CE4jSsjY3LiE8hBRIpIM+WpGWKC6CsQyzU/NJ4hfOucD51QKWiR15oP9iQlreGS4lIOKkhe6tPQ3OhSk7ZNfNDH2L+/8RI8qw/MTfVu0q7xpcaFjbzRO7npBMneUPZq9Rpcs5qtXo3B6eH9fqoa1VkFgSUSk2Ds/h59iFqTIR0yFaZVGHi8XEAUAwVkVGBMCBQZZjGumNyc2XJAs1ekTPNuUfAaCMIlj5dg84IlCOHNxiUlhwSOOVac1WdhvxDqnciVcQToo4jYzrVp67aZ2GBbOTzcEQEzW/PteM0PTfkHORlT5Uw6aqsUWw8mnsG3nNciAlLupz7AB1VHVxmPU1MdF8aeh0BlOTZfK1LG6DXsZ4wykq4lUpcy7gEE3vG2JqHrKNHSAsnsXoDbgS7jtSSd50q7gFPBZvlzgoM1R+jed5SJ4hjx1okOokC3h36klIPoQUnkE4A3lLKgIq3m5A8VvJwUKiWirlbTm/9BEDQuyT8v4WDnTm26waQlkqGI+5mFwrK6HJMh3fxzI07RVUyaz5fnT56cnyfLecmNRJvPmrULeO2xHoYig2QwGWDQ/sM++3G3sj24JOwcoKsUXwkODkiIFCgyet95v9+Fhah9ByiRUCwRHqUVKUjHO1co5nT4KwKr6oixiNOjfmOZMI3kzqBT9EW+LVR/IqOZ4ysWEQFO5G//xX7TXNzqHIaloCCGol5uvKKIW8rkKcP9upfPKhQZijW8m8TlFnH6bIQ/ipMFHQxiUQD0KxVBJ9xX1I4fnYhM0KOeMxtJQFU1tV1jWzN7Uaj+F75G7rhmNhxmONyJBZClUSD+x+ze/z8lWeul3N65Fg1x/569OBoOquzXGr2MZi6wQjEZcyLolAdiPdrke1B3ZFOosYhrUjGdUHhRJTCnvS4yaVTzTbAcwVF0qeRt2Ibv6lB3dN4XD6Fr033oKM2cjfmOJVJtUgA8xrWva4jQOxHZkKyhk/Q/DvndvWtwDi1Jr8co4v7RQ4X4hJxq1BwS2bTFD7iVv6QAC5bgYfiuqIcdo2ZqhwXVcFuZrGwPIjDXzQ8ESyFC7rwGgMxlGK16KwZCXAE6Dds8TJbewgB5M1MpUT4Bly/Da2X7IU/03HpILvSQPGBPvssjhVMxsgaBJV/Y1xNXZpXhl0JVozurQPukj6o3tstRVe8wFTxXxC58QXh3KDYjPYbulhEbZzLFxZrSvi66a8hauxFboPOywTHz5SMZfFBQa7zabF61bWc7WLVQp/FcDLMqnD+wTYlhCX66MKPfZftP0CSYJbMp3dShQyjh6tatUEFpX7VrgkNSB45ZtePEhxk7M7wadjKvrFmrxsdPNseZfRsmyT0TY5q6V7eDsYmJvUcMX7xo08Xz9CMGCBMGlxWXZHTqGB5O6tetWMHXfnudOsHtUgvsqZy9woXDehlimzZz9xiKi0vs03vklCWLD8Odi1Lg9vKW64IzaWvXYPUKBepfhb+ASEKPcH7mIT6neszXwLD8T7yHO9YmgLfZDoIrXhdzAiGMGpB/lZERs0yg4jDXmFx6P/kK8RsSn266E188uskJ5tGD6A6mSA4ZcrWpdpRqeY2vFmiWdexb9s/xqOqlZ5OhY+imjUTV0luzaNBaessXiKBqtmqPynH6azIlWg9VX+q30VsGeUGiWnfwONXyigxtRzf5kmS8Ik3DNFG+A5OC1ToJ3ywDNqSMIrlENRQ1ZU/RL1SbY8p72JBeAjwsMpSov5RFZHFM+zGaACg2ECSsF+RsShEG8SIIKZBHKkn4bGOYz0KWsRLLKIZhWI+LzWYNBuKbO44PAAA="

type Plik = { f: string; w: number; h: number; b: number[] }
const LOGOTYP: Plik = { f: "yAwPPIb1WzY1tcRtyMDk7lxek.png", w: 3508, h: 2481, b: [0.088, 0.405, 0.912, 0.595] }
// Klatki z grafiki marki (białe tło, nakładane mnożeniem na kolor strony) — te same co na stronie po świętach.
const RYC_SAM = obraz("VCgccjDlx1qkFJmv9yduVkUV8.webp")
const RYC_RAZEM = obraz("kJWLQ7sBa9puoQStXzK5IxBK5SQ.webp")
const RYC_PROPORCJA = "952 / 636"

const INSTAGRAM = "https://www.instagram.com/gorka.kulka/"
const LIMIT_S = 30
const MAKS_ZNAKOW = 600

// Twarda spacja po jednoliterowych słowach (dwa przebiegi, bo sąsiednie spójniki dzielą spację).
const JEDNOLITEROWE = /(^|[\s„(])([aiouwzAIOUWZ]) /g
const sp = (t: string) => t.replace(JEDNOLITEROWE, "$1$2 ").replace(JEDNOLITEROWE, "$1$2 ")

type Kto = "sd" | "k"
type Watek = { nr: string; kw: [Kto, string][] }

function rozmowa(slowo: string): Watek[] {
    return [
        {
            nr: "01",
            kw: [
                ["sd", "Latem będzie kolejka. Długa, w upale, w sobotę o osiemnastej."],
                ["k", "Każda osoba w tej kolejce czeka na małe święto. Ty je podajesz."],
            ],
        },
        {
            nr: "02",
            kw: [
                ["sd", "Myślisz, że w gastronomii wszyscy na siebie krzyczą?"],
                ["k", "U nas nie. Pracujemy w przyjaźni i z szacunkiem — do gości i do siebie nawzajem."],
            ],
        },
        {
            nr: "03",
            kw: [
                ["sd", "Gość zapyta, z czego to jest. Każdy smak, każde ciasto. „Nie wiem” tu nie przejdzie."],
                ["k", "Nauczymy Cię. Sprzedajemy naprawdę dobre rzeczy, bez ściemy. Dowiesz się, z czego je robimy, i opowiesz o tym gościom."],
            ],
        },
        {
            nr: "04",
            kw: [
                ["sd", "Pracujesz wtedy, kiedy inni odpoczywają. Weekendy, wakacje, święta."],
                ["k", "Za to w najfajniejszym miejscu w Gorzowie."],
                ["sd", "Przesada."],
                ["k", "Przyjdź, to sprawdzisz."],
            ],
        },
        {
            nr: "05",
            kw: [
                ["sd", "Na koniec dnia sprzątasz. Codziennie i porządnie."],
                ["k", "Czysto ma być zawsze, nie tylko wtedy, gdy ktoś patrzy."],
            ],
        },
        {
            nr: "06",
            kw: [
                [
                    "sd",
                    "I jeszcze jedno, tylko dla tych, którzy czytają, a nie przewijają: odpowiedź na pytanie „Czego chcesz się u nas nauczyć?” zacznij od słowa „" +
                        slowo +
                        "”. Nikomu nie mów.",
                ],
                ["k", "Ciii."],
            ],
        },
    ]
}

type Rola = { rola: string; gdzie: string; kiedy?: string }
const NA_SEZON: Rola[] = [
    { rola: "Lodziarka / Lodziarz", gdzie: "Park Górczyński", kiedy: "12:00–20:00" },
    { rola: "Lodziarka / Lodziarz", gdzie: "Okienko przy pracowni, ul. Słoneczna 62", kiedy: "12:00–20:00" },
]
const NA_STALE: Rola[] = [
    { rola: "Baristka / Barista, obsługa sali", gdzie: "Kawiarnia Centrum, ul. Sikorskiego 126", kiedy: "codziennie 10:00–19:00" },
    { rola: "Lodziarka / Lodziarz", gdzie: "Nova Park, ul. Przemysłowa 2", kiedy: "pon.–sob. 9:00–21:00" },
    { rola: "Cukierniczka / Cukiernik, produkcja lodów", gdzie: "Pracownia, ul. Słoneczna 62" },
    { rola: "Szefowa / Szef zmiany lub punktu", gdzie: "Jedno z naszych czterech miejsc" },
]

const KROKI = [
    "Czytasz wszystko, co mówi Szary Dzień. Wszystko.",
    "Wypełniasz zgłoszenie. Bez CV, około dziesięciu minut.",
    "Dostajesz potwierdzenie na maila.",
    "Jeśli do siebie pasujemy, zapraszamy na rozmowę.",
]

const MIEJSCA = [
    "Lody: Park Górczyński",
    "Lody: okienko na Słonecznej",
    "Lody: Nova Park",
    "Kawiarnia Centrum",
    "Pracownia: lody i ciasta",
    "Szefowa / szef zmiany lub punktu",
]
const OKRESY = ["Na sezon (1.04–15.09)", "Na stałe", "Jedno i drugie"]

const RODO = [
    "Administrator: Górka & Kulka s.c. Magdalena Kowalska, Paweł Górka, ul. Gen. Władysława Sikorskiego 126, 66-400 Gorzów Wielkopolski, NIP 599 318 75 02, e-mail gorka.kulka@gmail.com.",
    "Cel: przeprowadzenie tej rekrutacji. Dane potrzebne do zawarcia umowy przetwarzamy na podstawie art. 6 ust. 1 lit. b RODO, a przy umowie o pracę także art. 6 ust. 1 lit. c RODO w związku z art. 22¹ Kodeksu pracy. Nagranie i to, co piszesz o sobie z własnej inicjatywy, przetwarzamy na podstawie Twojej zgody (art. 6 ust. 1 lit. a RODO).",
    "Nagranie jest dobrowolne. Brak zgody albo jej cofnięcie nie wpływa na ocenę zgłoszenia.",
    "Dane trzymamy do końca tej rekrutacji, a jeśli zgodzisz się na kolejne nabory — przez 12 miesięcy. Nagranie usuwamy najpóźniej po zakończeniu rekrutacji.",
    "Dostęp mają tylko osoby prowadzące rekrutację i firmy, które w naszym imieniu przechowują formularz i pocztę.",
    "Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania i przeniesienia, a zgodę możesz cofnąć w każdej chwili. Możesz też złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych.",
    "Podanie danych jest dobrowolne, ale bez danych kontaktowych nie odezwiemy się do Ciebie. O wyniku decydują ludzie, nie automat.",
]

const ZIARNO =
    "url('data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(
        "<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.42 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>"
    ).replace(/'/g, "%27") +
    "')"

const CSS = [
    "@import url('https://fonts.googleapis.com/css2?family=Fragment+Mono:ital@0;1&display=swap');",
    "@font-face { font-family: 'GK Reglo'; src: url(data:font/woff2;base64," + REGLO + ") format('woff2'); font-weight: 700; font-style: normal; font-display: swap; }",
    ".gkd { --szary: #D0D0D0; --roz: #F7C2CF; --maslo: #FFE295; --rubin: #9B111E; --tusz: #111111; --krem: #F6F1E7; --m: max(18px, 4vw);",
    "  position: relative; width: 100%; background: var(--roz); color: var(--tusz);",
    "  font-family: 'Fragment Mono', ui-monospace, Menlo, Consolas, monospace; font-size: 15px; line-height: 1.55;",
    "  -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; overflow-x: clip; }",
    ":where(.gkd) *, :where(.gkd) *::before, :where(.gkd) *::after { box-sizing: border-box; }",
    ":where(.gkd) img, :where(.gkd) video { display: block; max-width: 100%; }",
    ":where(.gkd) img { user-select: none; -webkit-user-drag: none; }",
    ":where(.gkd) :where(p, h1, h2, h3, figure, ul, ol, fieldset, legend) { margin: 0; padding: 0; }",
    ":where(.gkd) :where(ul, ol) { list-style: none; }",
    ":where(.gkd) :where(h1, h2, h3) { font-size: inherit; font-weight: inherit; }",
    ":where(.gkd) fieldset { border: 0; min-width: 0; }",
    ":where(.gkd) a { color: inherit; text-decoration: none; }",
    ":where(.gkd) :where(button, input, textarea) { font: inherit; color: inherit; }",
    ".gkd ::selection { background: var(--rubin); color: var(--maslo); }",
    ".gkd :focus-visible { outline: 2px solid var(--rubin); outline-offset: 3px; }",
    ".gkd-d { font-family: 'GK Reglo', 'Arial Narrow', Arial, sans-serif; font-weight: 700; text-transform: uppercase; line-height: .86; letter-spacing: -0.006em; }",
    ".gkd-e { font-size: 11px; line-height: 1.5; letter-spacing: .07em; text-transform: uppercase; }",
    ".gkd-wiersz { display: flex; justify-content: space-between; gap: 24px; }",
    ".gkd-kreska { border-top: 1.5px solid var(--tusz); padding-top: 12px; }",
    ".gkd-h2 { font-size: clamp(52px, 8.4vw, 144px); margin-top: 22px; }",
    ".gkd-wyc { position: relative; display: block; overflow: hidden; }",
    ".gkd-wyc img { position: absolute; height: auto; max-width: none; }",
    ".gkd-js [data-wjazd] { opacity: 0; transform: translate3d(0, 28px, 0); transition: opacity .9s ease, transform 1s cubic-bezier(.2,.85,.25,1); }",
    ".gkd-js [data-wjazd][data-widac] { opacity: 1; transform: none; }",

    "/* Ziarno i menu */",
    ".gkd-ziarno { position: sticky; top: 0; height: 100vh; margin-bottom: -100vh; z-index: 55; pointer-events: none; opacity: .3; background-image: " + ZIARNO + "; background-size: 240px 240px; }",
    ".gkd-nav-kotwica { position: sticky; top: 0; height: 0; z-index: 60; }",
    ".gkd-nav { position: absolute; top: 0; left: 0; right: 0; display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 14px var(--m); border-bottom: 1px solid transparent; transition: transform .45s cubic-bezier(.2,.85,.25,1), background-color .35s ease, border-color .35s ease; }",
    ".gkd-nav-tlo { background: rgba(246, 241, 231, .86); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); border-bottom-color: rgba(17,17,17,.18); }",
    ".gkd-nav-schowana { transform: translate3d(0, -110%, 0); }",
    ".gkd-nav-logo { display: block; width: clamp(118px, 11vw, 164px); }",
    ".gkd-pigulka { display: inline-flex; align-items: center; gap: 8px; border: 1.5px solid var(--tusz); border-radius: 999px; padding: 8px 14px; font-size: 11px; letter-spacing: .07em; text-transform: uppercase; white-space: nowrap; transition: background .25s ease, color .25s ease; }",
    ".gkd-pigulka:hover { background: var(--tusz); color: var(--maslo); }",
    ".gkd-pigulka i { width: 7px; height: 7px; border-radius: 50%; background: var(--rubin); display: block; animation: gkd-puls 2.4s ease-in-out infinite; }",
    "@keyframes gkd-puls { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }",

    "/* 0. Pierwszy ekran: Szary Dzień, obok wolne krzesło */",
    ".gkd-hero { position: relative; background: var(--szary); padding: calc(78px + 3vh) var(--m) 7vh; }",
    ".gkd-hero-siatka { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr); gap: 3vw; align-items: end; margin-top: 4vh; }",
    ".gkd-h1 { font-size: clamp(66px, 10.2vw, 188px); }",
    ".gkd-h1 > span { display: block; }",
    ".gkd-h1 sup { font-family: 'Fragment Mono', ui-monospace, monospace; font-weight: 400; font-size: .3em; vertical-align: top; position: relative; top: .08em; margin-left: .06em; }",
    ".gkd-lead { font-size: 16px; line-height: 1.6; max-width: 30em; margin-top: 4vh; }",
    ".gkd-przypis { font-size: 12px; opacity: .72; margin-top: 14px; max-width: 30em; }",
    ".gkd-strzalka { display: inline-block; margin-top: 4vh; border-bottom: 1px solid currentColor; padding-bottom: 2px; }",
    ".gkd-ryc img { width: 100%; height: auto; mix-blend-mode: multiply; }",
    ".gkd-ryc figcaption { margin-top: 10px; opacity: .8; }",

    "/* 1. Rozmowa: szarość przechodzi w kolor */",
    ".gkd-rozmowa { background: linear-gradient(180deg, var(--szary) 0%, #D8CDD0 38%, #EFC6D0 74%, var(--roz) 100%); padding: 13vh var(--m) 15vh; }",
    ".gkd-watki { margin-top: 8vh; display: grid; gap: 9vh; max-width: 1240px; }",
    ".gkd-watek { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 20px; row-gap: 18px; }",
    ".gkd-nr { grid-column: 1 / -1; border-top: 1px solid rgba(17,17,17,.3); padding-top: 10px; }",
    ".gkd-kw-sd { grid-column: 1 / span 8; }",
    ".gkd-kw-k { grid-column: 6 / span 7; }",
    ".gkd-kto { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }",
    ".gkd-kto i { display: block; width: 13px; height: 12px; }",
    ".gkd-kw-sd .gkd-kto i { background: #8E8A87; border-radius: 55% 45% 48% 52% / 62% 58% 42% 38%; }",
    ".gkd-kw-k .gkd-kto i { background: var(--roz); border: 1.5px solid var(--tusz); border-radius: 50%; width: 12px; }",
    ".gkd-kw-sd p { font-size: clamp(21px, 2.45vw, 36px); line-height: 1.26; letter-spacing: -0.015em; }",
    ".gkd-kw-k p { font-size: clamp(16px, 1.45vw, 20px); line-height: 1.5; background: var(--krem); border: 1.5px solid var(--tusz); padding: 16px 20px 17px; }",

    "/* 2. Kogo szukamy */",
    ".gkd-kogo { padding: 13vh var(--m) 11vh; }",
    ".gkd-kolumny { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; margin-top: 7vh; align-items: start; }",
    ".gkd-karta { border: 1.5px solid var(--tusz); background: var(--krem); }",
    ".gkd-karta-g { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; padding: 16px 18px 14px; border-bottom: 1.5px solid var(--tusz); background: var(--maslo); }",
    ".gkd-karta-g h3 { font-size: clamp(34px, 3.4vw, 54px); }",
    ".gkd-karta li { display: grid; gap: 6px; padding: 18px 18px 20px; border-bottom: 1px solid rgba(17,17,17,.22); }",
    ".gkd-karta li:last-child { border-bottom: 0; }",
    ".gkd-karta li b { font-family: 'GK Reglo', 'Arial Narrow', Arial, sans-serif; font-weight: 700; text-transform: uppercase; font-size: clamp(24px, 2.2vw, 34px); line-height: .95; }",
    ".gkd-karta li span { font-size: 14px; }",
    ".gkd-uwaga { margin-top: 22px; font-size: 13px; max-width: 46em; opacity: .8; }",

    "/* 3. Ile płacimy */",
    ".gkd-placa { padding: 0 var(--m) 12vh; }",
    ".gkd-placa-siatka { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: 4vw; align-items: end; margin-top: 6vh; }",
    ".gkd-kwota { font-size: clamp(110px, 17vw, 290px); line-height: .8; white-space: nowrap; }",
    ".gkd-kwota small { font-size: .36em; margin-left: .14em; }",
    ".gkd-placa-opis { display: grid; gap: 14px; padding-bottom: 1.2vw; }",
    ".gkd-placa-opis li { padding: 12px 0; border-top: 1px solid rgba(17,17,17,.3); font-size: 15px; }",
    ".gkd-placa-opis li:first-child { font-size: 17px; }",
    ".gkd-drobny { font-size: 12px; opacity: .72; }",

    "/* 4. Tu nie zostaniesz (Szary Dzień wraca) */",
    ".gkd-nie { background: var(--szary); padding: 12vh var(--m) 13vh; }",
    ".gkd-nie .gkd-watek { margin-top: 7vh; max-width: 1240px; }",
    ".gkd-lista-nie { grid-column: 1 / -1; display: grid; gap: 6px; margin: 1vh 0 2vh; }",
    ".gkd-lista-nie li { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 18px; border-top: 1.5px solid var(--tusz); padding-top: 12px; }",
    ".gkd-lista-nie b { font-family: 'GK Reglo', 'Arial Narrow', Arial, sans-serif; font-weight: 700; text-transform: uppercase; font-size: clamp(46px, 7.4vw, 124px); line-height: .9; }",
    ".gkd-lista-nie span { font-size: 14px; }",

    "/* 5. Jak to idzie */",
    ".gkd-jak { padding: 12vh var(--m) 4vh; }",
    ".gkd-kroki { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 6vh; border-top: 1.5px solid var(--tusz); }",
    ".gkd-kroki li { padding: 18px 22px 30px 0; border-right: 1px solid rgba(17,17,17,.22); }",
    ".gkd-kroki li + li { padding-left: 22px; }",
    ".gkd-kroki li:last-child { border-right: 0; }",
    ".gkd-kroki b { display: block; font-size: clamp(56px, 6vw, 96px); margin-bottom: 18px; }",
    ".gkd-kroki p { font-size: 15px; max-width: 18em; }",

    "/* 6. Zgłoszenie */",
    ".gkd-forma { padding: 10vh var(--m) 14vh; }",
    ".gkd-form { max-width: 1000px; margin: 7vh auto 0; background: var(--maslo); border: 1.5px solid var(--tusz); scroll-margin-top: 76px; }",
    ".gkd-blok { padding: 28px clamp(18px, 3.4vw, 44px) 32px; border-bottom: 1.5px solid var(--tusz); }",
    ".gkd-blok:last-child { border-bottom: 0; }",
    ".gkd-blok-g { display: flex; align-items: baseline; gap: 14px; margin-bottom: 22px; }",
    ".gkd-blok-g b { font-family: 'GK Reglo', 'Arial Narrow', Arial, sans-serif; font-weight: 700; font-size: 36px; line-height: .9; }",
    ".gkd-pola { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px 26px; }",
    ".gkd-pole { display: grid; gap: 8px; align-content: start; }",
    ".gkd-pytania { display: grid; gap: 30px; }",
    ".gkd-etykieta { font-size: 11px; line-height: 1.5; letter-spacing: .07em; text-transform: uppercase; }",
    ".gkd-pytanie { font-size: 17px; line-height: 1.45; max-width: 40em; }",
    ".gkd-input { width: 100%; border: 0; border-bottom: 1.5px solid var(--tusz); background: transparent; padding: 10px 0 9px; font-size: 16px; border-radius: 0; outline: none; }",
    ".gkd-input:focus { border-bottom-width: 2.5px; padding-bottom: 8px; }",
    ".gkd-input::placeholder, .gkd-tekst::placeholder { color: rgba(17,17,17,.42); }",
    ".gkd-tekst { width: 100%; min-height: 128px; resize: vertical; border: 1.5px solid var(--tusz); background: rgba(255,255,255,.45); padding: 12px 14px; font-size: 16px; line-height: 1.5; border-radius: 0; outline: none; }",
    ".gkd-tekst:focus { background: rgba(255,255,255,.75); }",
    ".gkd-licz { font-size: 11px; opacity: .6; justify-self: end; }",
    ".gkd-blad { color: var(--rubin); font-size: 12.5px; line-height: 1.45; }",
    ".gkd-zle .gkd-input, .gkd-zle .gkd-tekst { border-color: var(--rubin); }",
    ".gkd-chipy { display: flex; flex-wrap: wrap; gap: 8px; }",
    ".gkd-chip { border: 1.5px solid var(--tusz); border-radius: 999px; padding: 10px 15px; background: transparent; font-size: 13px; line-height: 1.2; cursor: pointer; transition: background .2s ease, color .2s ease; }",
    ".gkd-chip[aria-pressed='true'], .gkd-chip[aria-checked='true'] { background: var(--tusz); color: var(--maslo); }",
    ".gkd-podblok { margin-top: 26px; }",
    ".gkd-przelacznik { display: inline-flex; flex-wrap: wrap; border: 1.5px solid var(--tusz); border-radius: 999px; padding: 3px; gap: 3px; margin-top: 4px; }",
    ".gkd-przelacznik button { border: 0; background: transparent; border-radius: 999px; padding: 10px 16px; font-size: 12px; letter-spacing: .05em; text-transform: uppercase; cursor: pointer; }",
    ".gkd-przelacznik button[aria-checked='true'] { background: var(--tusz); color: var(--maslo); }",
    ".gkd-notka { font-size: 13px; margin-top: 12px; max-width: 40em; }",
    ".gkd-nagr { display: grid; gap: 14px; margin-top: 18px; }",
    ".gkd-ekran { position: relative; width: 100%; max-width: 340px; aspect-ratio: 3 / 4; background: #0E0D0C; border: 1.5px solid var(--tusz); overflow: hidden; color: #F2EFE8; }",
    ".gkd-live, .gkd-nagranie { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; max-width: none; }",
    ".gkd-live { display: none; transform: scaleX(-1); }",
    ".gkd-ekran-live .gkd-live { display: block; }",
    ".gkd-nagranie { background: #000; }",
    ".gkd-ekran-pusty { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; gap: 10px; padding: 26px; font-size: 14px; }",
    ".gkd-ekran-pusty b { font-family: 'GK Reglo', 'Arial Narrow', Arial, sans-serif; font-weight: 700; font-size: 64px; line-height: .9; color: var(--roz); }",
    ".gkd-licznik { position: absolute; top: 12px; left: 12px; display: inline-flex; align-items: center; gap: 8px; background: rgba(14,13,12,.72); padding: 6px 11px; border-radius: 999px; font-size: 13px; }",
    ".gkd-licznik i { width: 9px; height: 9px; border-radius: 50%; background: #E0303B; display: block; animation: gkd-puls 1s ease-in-out infinite; }",
    ".gkd-nagr-przyciski { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 18px; }",
    ".gkd-przycisk { display: inline-flex; align-items: center; gap: 10px; border: 1.5px solid var(--tusz); background: var(--tusz); color: var(--maslo); border-radius: 999px; padding: 13px 20px; font-size: 12px; letter-spacing: .07em; text-transform: uppercase; cursor: pointer; }",
    ".gkd-przycisk:disabled { opacity: .45; cursor: default; }",
    ".gkd-przycisk-rubin { background: var(--rubin); border-color: var(--rubin); color: #FFFFFF; }",
    ".gkd-link { background: none; border: 0; padding: 0; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; font-size: 13px; }",
    ".gkd-link:disabled { opacity: .45; cursor: default; }",
    ".gkd-zgoda { display: grid; grid-template-columns: 22px minmax(0, 1fr); gap: 12px; align-items: start; font-size: 13px; line-height: 1.5; cursor: pointer; max-width: 46em; }",
    ".gkd-zgoda input { -webkit-appearance: none; appearance: none; width: 22px; height: 22px; margin: 0; border: 1.5px solid var(--tusz); background: rgba(255,255,255,.5); display: grid; place-items: center; cursor: pointer; border-radius: 0; }",
    ".gkd-zgoda input:checked { background: var(--tusz); }",
    ".gkd-zgoda input:checked::after { content: ''; width: 10px; height: 5px; border-left: 2px solid var(--maslo); border-bottom: 2px solid var(--maslo); transform: translate(0, -2px) rotate(-45deg); }",
    ".gkd-rodo { font-size: 12.5px; line-height: 1.55; margin-top: 18px; max-width: 52em; }",
    ".gkd-rodo summary { cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }",
    ".gkd-rodo p { margin-top: 10px; }",
    ".gkd-wyslij-wiersz { display: flex; flex-wrap: wrap; align-items: center; gap: 14px 22px; margin-top: 26px; }",
    ".gkd-wyslij { display: inline-flex; align-items: center; gap: 12px; border: 0; background: var(--tusz); color: var(--maslo); border-radius: 999px; padding: 18px 28px; font-size: 13px; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; }",
    ".gkd-wyslij i { width: 8px; height: 8px; border-radius: 50%; background: var(--roz); display: block; }",
    ".gkd-podglad { font-size: 12px; opacity: .75; max-width: 30em; }",
    ".gkd-sukces { background: var(--roz); padding: 7vh clamp(18px, 4vw, 48px) 8vh; text-align: center; display: grid; justify-items: center; gap: 18px; }",
    ".gkd-sukces .gkd-ryc { width: min(560px, 100%); }",
    ".gkd-sukces h3 { font-size: clamp(56px, 8vw, 120px); }",
    ".gkd-sukces p { max-width: 34em; }",

    "/* Stopka */",
    ".gkd-stopka { padding: 0 var(--m) 5vh; }",
    ".gkd-stopka-logo { display: block; width: min(100%, 1400px); margin: 0 auto 3vh; }",
    ".gkd-stopka .gkd-wiersz { flex-wrap: wrap; }",
    ".gkd-stopka a { border-bottom: 1px solid currentColor; }",

    "@media (max-width: 809px) {",
    "  .gkd-wiersz { flex-direction: column; gap: 2px; }",
    "  .gkd-hero { padding-top: calc(70px + 2vh); }",
    "  .gkd-hero-siatka { grid-template-columns: minmax(0, 1fr); gap: 4vh; margin-top: 3vh; }",
    "  .gkd-h1 { font-size: clamp(60px, 19.5vw, 140px); }",
    "  .gkd-lead { margin-top: 2.6vh; }",
    "  .gkd-watek { grid-template-columns: minmax(0, 1fr); }",
    "  .gkd-kw-sd, .gkd-kw-k, .gkd-nr, .gkd-lista-nie { grid-column: 1 / -1; }",
    "  .gkd-kw-k { margin-left: 10%; }",
    "  .gkd-watki { gap: 7vh; }",
    "  .gkd-kolumny { grid-template-columns: minmax(0, 1fr); }",
    "  .gkd-placa-siatka { grid-template-columns: minmax(0, 1fr); gap: 3vh; }",
    "  .gkd-kwota { font-size: clamp(90px, 31vw, 200px); }",
    "  .gkd-rozmowa { padding: 9vh var(--m) 10vh; }",
    "  .gkd-kogo { padding-top: 9vh; }",
    "  .gkd-nie { padding: 9vh var(--m) 10vh; }",
    "  .gkd-jak { padding-top: 9vh; }",
    "  .gkd-forma { padding: 8vh var(--m) 10vh; }",
    "  .gkd-kroki { grid-template-columns: repeat(2, minmax(0, 1fr)); }",
    "  .gkd-kroki li { padding: 16px 14px 26px 0; }",
    "  .gkd-kroki li + li { padding-left: 0; }",
    "  .gkd-kroki li:nth-child(even) { padding-left: 14px; border-right: 0; }",
    "  .gkd-kroki li:nth-child(n+3) { border-top: 1px solid rgba(17,17,17,.22); }",
    "  .gkd-pola { grid-template-columns: minmax(0, 1fr); }",
    "  .gkd-form { margin-top: 5vh; }",
    "}",
    "@media (prefers-reduced-motion: reduce) {",
    "  .gkd-js [data-wjazd] { opacity: 1; transform: none; transition: none; }",
    "  .gkd-nav { transition: none; }",
    "}",
].join("\n")

// Wycinek grafiki z przezroczystymi marginesami: "b" to ramka samego rysunku (0–1).
function Wyc(props: { a: Plik; rozmiar?: number; alt?: string; className?: string }) {
    const a = props.a
    const bw = a.b[2] - a.b[0]
    const bh = a.b[3] - a.b[1]
    return (
        <span className={"gkd-wyc" + (props.className ? " " + props.className : "")} style={{ aspectRatio: String(Math.round(((bw * a.w) / (bh * a.h)) * 10000) / 10000) }}>
            <img
                src={obraz(a.f, props.rozmiar || 1024)}
                alt={props.alt || ""}
                decoding="async"
                draggable={false}
                style={{ width: (100 / bw).toFixed(3) + "%", left: ((-a.b[0] / bw) * 100).toFixed(3) + "%", top: ((-a.b[1] / bh) * 100).toFixed(3) + "%" }}
            />
        </span>
    )
}

function Kwestia(props: { kto: Kto; tekst: string }) {
    return (
        <div className={"gkd-kw gkd-kw-" + props.kto}>
            <span className="gkd-kto gkd-e">
                <i aria-hidden="true" />
                {props.kto === "sd" ? "Szary Dzień" : "Kulka"}
            </span>
            <p>{sp(props.tekst)}</p>
        </div>
    )
}

function Karta(props: { tytul: string; pod: string; role: Rola[] }) {
    return (
        <div className="gkd-karta" data-wjazd="">
            <div className="gkd-karta-g">
                <h3 className="gkd-d">{props.tytul}</h3>
                <span className="gkd-e">{props.pod}</span>
            </div>
            <ul>
                {props.role.map((r, i) => (
                    <li key={i}>
                        <b>{r.rola}</b>
                        <span>{sp(r.gdzie)}</span>
                        {r.kiedy ? <span className="gkd-e">{r.kiedy}</span> : null}
                    </li>
                ))}
            </ul>
        </div>
    )
}

type Wideo = { url: string; zrodlo: "kamera" | "plik"; rozmiar: number; typ: string; blob: Blob }

// Nagrywanie 30 sekund na stronie (przednia kamera, niska przepływność, żeby plik był mały)
// albo wybór gotowego nagrania z telefonu. Nic nie wychodzi z przeglądarki w trybie podglądu.
function Nagrywarka(props: { wideo: Wideo | null; onZmiana: (w: Wideo | null) => void; naPlotnie: boolean }) {
    const [faza, setFaza] = useState<"spoczynek" | "start" | "nagrywa">("spoczynek")
    const [zostalo, setZostalo] = useState(LIMIT_S)
    const [blad, setBlad] = useState("")
    const podglad = useRef<HTMLVideoElement>(null)
    const strumien = useRef<MediaStream | null>(null)
    const rejestrator = useRef<any>(null)
    const kawalki = useRef<Blob[]>([])
    const zegar = useRef<number>(0)
    const wybor = useRef<HTMLInputElement>(null)
    const zywy = useRef(true)

    const zatrzymajStrumien = () => {
        if (strumien.current) strumien.current.getTracks().forEach((t) => t.stop())
        strumien.current = null
        if (podglad.current) podglad.current.srcObject = null
    }

    useEffect(() => {
        zywy.current = true
        return () => {
            zywy.current = false
            window.clearInterval(zegar.current)
            try {
                if (rejestrator.current && rejestrator.current.state === "recording") rejestrator.current.stop()
            } catch (e) {}
            zatrzymajStrumien()
        }
    }, [])

    const nagraj = async () => {
        setBlad("")
        const md: any = typeof navigator !== "undefined" ? navigator.mediaDevices : null
        const MR: any = typeof window !== "undefined" ? (window as any).MediaRecorder : null
        if (!md || !md.getUserMedia || !MR) {
            setBlad("Ta przeglądarka nie nagra wideo na stronie. Wybierz nagranie z telefonu albo napisz trzy zdania.")
            return
        }
        setFaza("start")
        try {
            const s: MediaStream = await md.getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } }, audio: true })
            if (!zywy.current) {
                s.getTracks().forEach((t) => t.stop())
                return
            }
            strumien.current = s
            const v = podglad.current
            if (v) {
                v.srcObject = s
                v.muted = true
                const p = v.play()
                if (p && p.catch) p.catch(() => {})
            }
            const typy = ["video/mp4;codecs=avc1", "video/mp4", "video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"]
            const typ = typy.find((t) => MR.isTypeSupported && MR.isTypeSupported(t)) || ""
            const opcje: any = { videoBitsPerSecond: 900000, audioBitsPerSecond: 64000 }
            if (typ) opcje.mimeType = typ
            const r = new MR(s, opcje)
            rejestrator.current = r
            kawalki.current = []
            r.ondataavailable = (e: any) => {
                if (e.data && e.data.size) kawalki.current.push(e.data)
            }
            r.onstop = () => {
                window.clearInterval(zegar.current)
                const blob = new Blob(kawalki.current, { type: r.mimeType || typ || "video/webm" })
                zatrzymajStrumien()
                if (!zywy.current) return
                setFaza("spoczynek")
                if (blob.size > 0) props.onZmiana({ url: URL.createObjectURL(blob), zrodlo: "kamera", rozmiar: blob.size, typ: blob.type, blob })
                else setBlad("Nagranie wyszło puste. Spróbuj jeszcze raz.")
            }
            r.start(1000)
            const t0 = Date.now()
            setZostalo(LIMIT_S)
            setFaza("nagrywa")
            zegar.current = window.setInterval(() => {
                const z = LIMIT_S - (Date.now() - t0) / 1000
                setZostalo(Math.max(0, Math.ceil(z)))
                if (z <= 0 && r.state === "recording") r.stop()
            }, 200)
        } catch (e) {
            zatrzymajStrumien()
            setFaza("spoczynek")
            setBlad("Nie mamy dostępu do kamery. Zezwól na nią w przeglądarce, wybierz nagranie z telefonu albo napisz trzy zdania.")
        }
    }

    const stop = () => {
        const r = rejestrator.current
        if (r && r.state === "recording") r.stop()
    }

    const zPliku = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBlad("")
        const f = e.target.files && e.target.files[0]
        e.target.value = ""
        if (!f) return
        if (f.size > 80 * 1024 * 1024) {
            setBlad("To nagranie jest za duże (ponad 80 MB). Nagraj krótsze albo użyj przycisku „Nagraj teraz”.")
            return
        }
        const url = URL.createObjectURL(f)
        const v = document.createElement("video")
        v.preload = "metadata"
        v.onloadedmetadata = () => {
            if (isFinite(v.duration) && v.duration > LIMIT_S + 10) {
                URL.revokeObjectURL(url)
                setBlad("To nagranie trwa dłużej niż 30 sekund. Skróć je albo nagraj nowe.")
                return
            }
            props.onZmiana({ url, zrodlo: "plik", rozmiar: f.size, typ: f.type, blob: f })
        }
        v.onerror = () => props.onZmiana({ url, zrodlo: "plik", rozmiar: f.size, typ: f.type, blob: f })
        v.src = url
    }

    const gotowe = !!props.wideo && faza === "spoczynek"
    return (
        <div className="gkd-nagr">
            <div className={"gkd-ekran" + (faza !== "spoczynek" ? " gkd-ekran-live" : "")}>
                <video ref={podglad} className="gkd-live" playsInline muted autoPlay aria-hidden="true" />
                {gotowe ? <video className="gkd-nagranie" src={props.wideo!.url} controls playsInline preload="metadata" /> : null}
                {faza === "spoczynek" && !props.wideo ? (
                    <div className="gkd-ekran-pusty">
                        <b>0:30</b>
                        <span>{sp("Poleć deser tak, jakby gość stał przy ladzie.")}</span>
                    </div>
                ) : null}
                {faza === "nagrywa" ? (
                    <span className="gkd-licznik" aria-live="polite">
                        <i aria-hidden="true" />
                        {"0:" + String(zostalo).padStart(2, "0")}
                    </span>
                ) : null}
            </div>
            <div className="gkd-nagr-przyciski">
                {faza === "nagrywa" ? (
                    <button type="button" className="gkd-przycisk gkd-przycisk-rubin" onClick={stop}>
                        Zatrzymaj
                    </button>
                ) : (
                    <button type="button" className="gkd-przycisk" onClick={nagraj} disabled={faza === "start" || props.naPlotnie}>
                        {props.wideo ? "Nagraj jeszcze raz" : "Nagraj teraz"}
                    </button>
                )}
                <button type="button" className="gkd-link" onClick={() => wybor.current && wybor.current.click()} disabled={faza !== "spoczynek" || props.naPlotnie}>
                    albo wybierz nagranie z telefonu
                </button>
                {gotowe ? (
                    <button type="button" className="gkd-link" onClick={() => props.onZmiana(null)}>
                        usuń nagranie
                    </button>
                ) : null}
                <input ref={wybor} type="file" accept="video/*" onChange={zPliku} hidden />
            </div>
            {blad ? (
                <p className="gkd-blad" role="alert">
                    {blad}
                </p>
            ) : null}
        </div>
    )
}

type Dane = { imie: string; telefon: string; email: string; start: string; p1: string; p2: string; p3: string; deser: string }
const PUSTE: Dane = { imie: "", telefon: "", email: "", start: "", p1: "", p2: "", p3: "", deser: "" }

function Zgloszenie(props: { slowo: string; naPlotnie: boolean }) {
    const [dane, setDane] = useState<Dane>(PUSTE)
    const [miejsca, setMiejsca] = useState<string[]>([])
    const [okres, setOkres] = useState("")
    const [tryb, setTryb] = useState<"wideo" | "tekst">("wideo")
    const [wideo, setWideo] = useState<Wideo | null>(null)
    const [zgodaWideo, setZgodaWideo] = useState(false)
    const [zgodaPrzyszle, setZgodaPrzyszle] = useState(false)
    const [bledy, setBledy] = useState<Record<string, string>>({})
    const [wyslane, setWyslane] = useState(false)
    const formularz = useRef<HTMLDivElement>(null)
    const ostatnieWideo = useRef<Wideo | null>(null)
    // Gotowe zgłoszenie (w trybie podglądu zostaje w przeglądarce; tu podłączymy wysyłkę).
    const paczka = useRef<Record<string, unknown> | null>(null)

    useEffect(
        () => () => {
            if (ostatnieWideo.current) URL.revokeObjectURL(ostatnieWideo.current.url)
        },
        []
    )

    const wyczysc = (k: string) =>
        setBledy((b) => {
            if (!b[k]) return b
            const n = { ...b }
            delete n[k]
            return n
        })
    const ustaw = (k: keyof Dane) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const v = e.target.value
        setDane((d) => ({ ...d, [k]: v }))
        wyczysc(k)
    }
    const zmienWideo = (w: Wideo | null) => {
        if (ostatnieWideo.current && (!w || ostatnieWideo.current.url !== w.url)) URL.revokeObjectURL(ostatnieWideo.current.url)
        ostatnieWideo.current = w
        setWideo(w)
        if (w) wyczysc("deser")
    }
    const przelaczMiejsce = (m: string) => {
        setMiejsca((lista) => (lista.indexOf(m) >= 0 ? lista.filter((x) => x !== m) : lista.concat(m)))
        wyczysc("miejsca")
    }

    const sprawdz = () => {
        const b: Record<string, string> = {}
        if (dane.imie.trim().length < 3) b.imie = "Podaj imię i nazwisko."
        if (dane.telefon.replace(/\D/g, "").length < 9) b.telefon = "Sprawdź numer telefonu."
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(dane.email.trim())) b.email = "Sprawdź adres e-mail."
        if (!miejsca.length) b.miejsca = "Zaznacz przynajmniej jedno miejsce."
        if (!okres) b.okres = "Wybierz, na jak długo."
        if (dane.p1.trim().length < 3) b.p1 = "Odpowiedz swoimi słowami."
        if (dane.p2.trim().length < 3) b.p2 = "Odpowiedz swoimi słowami."
        if (dane.p3.trim().length < 3) b.p3 = "Odpowiedz swoimi słowami."
        if (tryb === "wideo") {
            if (!wideo) b.deser = "Nagraj 30 sekund albo wybierz „Wolę napisać”."
            else if (!zgodaWideo) b.zgoda = "Zaznacz zgodę na nagranie albo wybierz „Wolę napisać”."
        } else if (dane.deser.trim().length < 20) b.deser = "Napisz trzy zdania o swoim deserze."
        return b
    }

    const wyslij = (e: React.FormEvent) => {
        e.preventDefault()
        if (props.naPlotnie) return
        const b = sprawdz()
        setBledy(b)
        const klucze = Object.keys(b)
        if (klucze.length) {
            const el = document.getElementById("gkd-pole-" + klucze[0])
            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" })
            return
        }
        // Ukryty test uważności: widzimy go tylko my, kandydat nie dostaje żadnej podpowiedzi.
        const poczatek = dane.p3.trim().replace(/^[„"'«»(\s]+/, "").toLowerCase()
        paczka.current = {
            ...dane,
            miejsca,
            okres,
            deser: tryb === "tekst" ? dane.deser : "",
            wideo: tryb === "wideo" && wideo ? { zrodlo: wideo.zrodlo, rozmiar: wideo.rozmiar, typ: wideo.typ } : null,
            zgodaWideo: tryb === "wideo" ? zgodaWideo : false,
            zgodaPrzyszle,
            testUwaznosci: poczatek.indexOf(props.slowo.toLowerCase()) === 0,
        }
        setWyslane(true)
        if (formularz.current) formularz.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    if (wyslane) {
        return (
            <div className="gkd-form" ref={formularz}>
                <div className="gkd-sukces" role="status">
                    <figure className="gkd-ryc">
                        <img src={RYC_RAZEM} alt="Szary Dzień i Kulka siedzą przy jednym stoliku. Oboje się uśmiechają." decoding="async" style={{ aspectRatio: RYC_PROPORCJA }} />
                        <figcaption className="gkd-e">Ryc. 2 — Krzesło zajęte.</figcaption>
                    </figure>
                    <h3 className="gkd-d">Krzesło zajęte</h3>
                    <p>{sp("Tak będzie wyglądał koniec zgłoszenia. To wersja podglądowa, więc nic nie zostało wysłane.")}</p>
                    <button type="button" className="gkd-link" onClick={() => setWyslane(false)}>
                        wróć do formularza
                    </button>
                </div>
            </div>
        )
    }

    const pole = (k: string) => "gkd-pole" + (bledy[k] ? " gkd-zle" : "")
    const blad = (k: string) =>
        bledy[k] ? (
            <p className="gkd-blad" role="alert">
                {bledy[k]}
            </p>
        ) : null
    const licznik = (t: string) => <span className="gkd-licz">{t.length + "/" + MAKS_ZNAKOW}</span>

    return (
        <div className="gkd-form" ref={formularz}>
            <form onSubmit={wyslij} noValidate>
                <fieldset className="gkd-blok">
                    <div className="gkd-blok-g">
                        <b>01</b>
                        <span className="gkd-e">Kim jesteś</span>
                    </div>
                    <div className="gkd-pola">
                        <div className={pole("imie")} id="gkd-pole-imie">
                            <label className="gkd-etykieta" htmlFor="gkd-imie">
                                Imię i nazwisko
                            </label>
                            <input id="gkd-imie" className="gkd-input" type="text" autoComplete="name" value={dane.imie} onChange={ustaw("imie")} />
                            {blad("imie")}
                        </div>
                        <div className={pole("telefon")} id="gkd-pole-telefon">
                            <label className="gkd-etykieta" htmlFor="gkd-telefon">
                                Telefon
                            </label>
                            <input id="gkd-telefon" className="gkd-input" type="tel" inputMode="tel" autoComplete="tel" value={dane.telefon} onChange={ustaw("telefon")} />
                            {blad("telefon")}
                        </div>
                        <div className={pole("email")} id="gkd-pole-email">
                            <label className="gkd-etykieta" htmlFor="gkd-email">
                                E-mail
                            </label>
                            <input id="gkd-email" className="gkd-input" type="email" inputMode="email" autoComplete="email" value={dane.email} onChange={ustaw("email")} />
                            {blad("email")}
                        </div>
                    </div>
                </fieldset>

                <fieldset className="gkd-blok">
                    <div className="gkd-blok-g">
                        <b>02</b>
                        <span className="gkd-e">Gdzie i na jak długo</span>
                    </div>
                    <div className={pole("miejsca")} id="gkd-pole-miejsca">
                        <span className="gkd-etykieta" id="gkd-miejsca-et">
                            Gdzie chcesz pracować? Możesz zaznaczyć kilka miejsc.
                        </span>
                        <div className="gkd-chipy" role="group" aria-labelledby="gkd-miejsca-et">
                            {MIEJSCA.map((m) => (
                                <button key={m} type="button" className="gkd-chip" aria-pressed={miejsca.indexOf(m) >= 0} onClick={() => przelaczMiejsce(m)}>
                                    {m}
                                </button>
                            ))}
                        </div>
                        {blad("miejsca")}
                    </div>
                    <div className={pole("okres") + " gkd-podblok"} id="gkd-pole-okres">
                        <span className="gkd-etykieta" id="gkd-okres-et">
                            Na jak długo?
                        </span>
                        <div className="gkd-chipy" role="radiogroup" aria-labelledby="gkd-okres-et">
                            {OKRESY.map((o) => (
                                <button
                                    key={o}
                                    type="button"
                                    role="radio"
                                    className="gkd-chip"
                                    aria-checked={okres === o}
                                    onClick={() => {
                                        setOkres(o)
                                        wyczysc("okres")
                                    }}
                                >
                                    {o}
                                </button>
                            ))}
                        </div>
                        {blad("okres")}
                    </div>
                    <div className="gkd-pole gkd-podblok" style={{ maxWidth: 420 }}>
                        <label className="gkd-etykieta" htmlFor="gkd-start">
                            Od kiedy możesz zacząć?
                        </label>
                        <input id="gkd-start" className="gkd-input" type="text" placeholder="np. od marca" value={dane.start} onChange={ustaw("start")} />
                    </div>
                </fieldset>

                <fieldset className="gkd-blok">
                    <div className="gkd-blok-g">
                        <b>03</b>
                        <span className="gkd-e">Trzy pytania zamiast CV</span>
                    </div>
                    <div className="gkd-pytania">
                        {(
                            [
                                ["p1", "Opowiedz o chwili, kiedy ktoś zrobił Ci małe święto."],
                                ["p2", "Sobota, osiemnasta, kolejka do końca alejki. Najpopularniejszy smak właśnie się skończył. Co mówisz osobie, która o niego prosi?"],
                                ["p3", "Czego chcesz się u nas nauczyć?"],
                            ] as [keyof Dane, string][]
                        ).map(([k, pytanie]) => (
                            <div className={pole(k)} id={"gkd-pole-" + k} key={k}>
                                <label className="gkd-pytanie" htmlFor={"gkd-" + k}>
                                    {sp(pytanie)}
                                </label>
                                <textarea id={"gkd-" + k} className="gkd-tekst" maxLength={MAKS_ZNAKOW} value={dane[k]} onChange={ustaw(k)} />
                                {licznik(dane[k])}
                                {blad(k)}
                            </div>
                        ))}
                    </div>
                </fieldset>

                <fieldset className="gkd-blok">
                    <div className="gkd-blok-g">
                        <b>04</b>
                        <span className="gkd-e">Poleć nam swój ulubiony deser</span>
                    </div>
                    <p className="gkd-pytanie">{sp("Tak, jakby gość stał przy ladzie i nie mógł się zdecydować.")}</p>
                    <div className="gkd-przelacznik" role="radiogroup" aria-label="Jak polecisz deser">
                        <button type="button" role="radio" aria-checked={tryb === "wideo"} onClick={() => setTryb("wideo")}>
                            Nagram 30 sekund
                        </button>
                        <button
                            type="button"
                            role="radio"
                            aria-checked={tryb === "tekst"}
                            onClick={() => {
                                setTryb("tekst")
                                wyczysc("zgoda")
                            }}
                        >
                            Wolę napisać
                        </button>
                    </div>
                    <p className="gkd-notka">{sp("Nagranie nie jest obowiązkowe. Trzy zdania oceniamy tak samo.")}</p>
                    <div className={pole("deser")} id="gkd-pole-deser">
                        {tryb === "wideo" ? (
                            <Nagrywarka wideo={wideo} onZmiana={zmienWideo} naPlotnie={props.naPlotnie} />
                        ) : (
                            <div className="gkd-pole gkd-podblok">
                                <label className="gkd-etykieta" htmlFor="gkd-deser">
                                    Trzy zdania wystarczą
                                </label>
                                <textarea id="gkd-deser" className="gkd-tekst" maxLength={MAKS_ZNAKOW} value={dane.deser} onChange={ustaw("deser")} />
                                {licznik(dane.deser)}
                            </div>
                        )}
                        {blad("deser")}
                    </div>
                    {tryb === "wideo" ? (
                        <div className={pole("zgoda") + " gkd-podblok"} id="gkd-pole-zgoda">
                            <label className="gkd-zgoda">
                                <input
                                    type="checkbox"
                                    checked={zgodaWideo}
                                    onChange={(e) => {
                                        setZgodaWideo(e.target.checked)
                                        wyczysc("zgoda")
                                    }}
                                />
                                <span>{sp("Zgadzam się, żeby Górka & Kulka s.c. przetwarzała mój wizerunek i głos z nagrania na potrzeby tej rekrutacji. Mogę tę zgodę cofnąć w każdej chwili.")}</span>
                            </label>
                            {blad("zgoda")}
                        </div>
                    ) : null}
                </fieldset>

                <fieldset className="gkd-blok">
                    <div className="gkd-blok-g">
                        <b>05</b>
                        <span className="gkd-e">Na koniec</span>
                    </div>
                    <label className="gkd-zgoda">
                        <input type="checkbox" checked={zgodaPrzyszle} onChange={(e) => setZgodaPrzyszle(e.target.checked)} />
                        <span>{sp("Możecie zachować moje zgłoszenie na kolejne nabory przez 12 miesięcy. (Nieobowiązkowe.)")}</span>
                    </label>
                    <details className="gkd-rodo">
                        <summary>Kto i jak przetwarza Twoje dane</summary>
                        {RODO.map((t, i) => (
                            <p key={i}>{sp(t)}</p>
                        ))}
                    </details>
                    <div className="gkd-wyslij-wiersz">
                        <button type="submit" className="gkd-wyslij">
                            <i aria-hidden="true" />
                            Wyślij zgłoszenie
                        </button>
                        <p className="gkd-podglad">{sp("Wersja podglądowa: formularz jeszcze niczego nie wysyła.")}</p>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

interface Props {
    style?: React.CSSProperties
    slowo?: string
    stawka?: string
}

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 */
export default function KonceptDolacz(props: Props) {
    const slowo = (props.slowo || "").trim() || "parasol"
    const stawka = (props.stawka || "").trim() || "32,30"
    const naPlotnie = RenderTarget.current() === RenderTarget.canvas
    const korzen = useRef<HTMLDivElement>(null)
    const [js, setJs] = useState(false)
    const [navKlasa, setNavKlasa] = useState("")

    // Wjazdy przy przewijaniu oraz menu: tło po zjechaniu z góry, chowa się przy przewijaniu w dół.
    useEffect(() => {
        if (naPlotnie) return
        const el = korzen.current
        if (!el) return
        const mniejRuchu = !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
        let io: IntersectionObserver | null = null
        if (!mniejRuchu && "IntersectionObserver" in window) {
            io = new IntersectionObserver(
                (wpisy) => {
                    for (const w of wpisy) {
                        if (w.isIntersecting) {
                            w.target.setAttribute("data-widac", "")
                            if (io) io.unobserve(w.target)
                        }
                    }
                },
                { rootMargin: "0px 0px -6% 0px", threshold: 0.04 }
            )
            el.querySelectorAll("[data-wjazd]").forEach((n) => io!.observe(n))
            setJs(true)
        }
        let ostatni = window.scrollY
        let schowana = false
        let ramka = 0
        const naPrzewiniecie = () => {
            if (ramka) return
            ramka = requestAnimationFrame(() => {
                ramka = 0
                const y = window.scrollY
                if (y > ostatni + 6 && y > 220) schowana = true
                else if (y < ostatni - 6 || y <= 220) schowana = false
                if (Math.abs(y - ostatni) > 6) ostatni = y
                const k = (y > 40 ? "gkd-nav-tlo" : "") + (schowana ? " gkd-nav-schowana" : "")
                setNavKlasa((s) => (s === k ? s : k))
            })
        }
        window.addEventListener("scroll", naPrzewiniecie, { passive: true })
        naPrzewiniecie()
        return () => {
            if (io) io.disconnect()
            window.removeEventListener("scroll", naPrzewiniecie)
            if (ramka) cancelAnimationFrame(ramka)
        }
    }, [naPlotnie])

    const skok = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault()
        if (naPlotnie) return
        const cel = document.getElementById(id)
        if (cel) cel.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    return (
        <div ref={korzen} className={"gkd" + (js ? " gkd-js" : "")} style={props.style}>
            <style>{CSS}</style>
            <div className="gkd-ziarno" aria-hidden="true" />

            <div className="gkd-nav-kotwica">
                <header className={"gkd-nav " + navKlasa}>
                    <a className="gkd-nav-logo" href="/" aria-label="Górka & Kulka — strona główna">
                        <Wyc a={LOGOTYP} alt="Górka & Kulka" />
                    </a>
                    <a className="gkd-pigulka" href="#gkd-zgloszenie" onClick={skok("gkd-zgloszenie")}>
                        <i aria-hidden="true" />
                        Zgłoś się
                    </a>
                </header>
            </div>

            <section className="gkd-hero" id="gkd-start">
                <div className="gkd-wiersz gkd-e gkd-kreska">
                    <span>Praca w Górka & Kulka</span>
                    <span>Gorzów Wielkopolski · na sezon i na stałe</span>
                </div>
                <div className="gkd-hero-siatka">
                    <div>
                        <h1 className="gkd-d gkd-h1">
                            <span>Stań się</span>
                            <span>jednym</span>
                            <span>
                                z nas<sup aria-hidden="true">*</sup>
                            </span>
                        </h1>
                        <p className="gkd-lead">{sp("Szukamy ludzi do lodziarni, kawiarni i pracowni. Zanim się zgłosisz, posłuchaj Szarego Dnia. On nie słodzi.")}</p>
                        <p className="gkd-przypis">{sp("*Albo jedną z nas. Krzesło jest dla każdego.")}</p>
                        <a className="gkd-strzalka gkd-e" href="#gkd-rozmowa" onClick={skok("gkd-rozmowa")}>
                            Przewiń. Szary Dzień ma coś do powiedzenia ↓
                        </a>
                    </div>
                    <figure className="gkd-ryc">
                        <img
                            src={RYC_SAM}
                            alt="Szary Dzień, szara postać marki, siedzi sam przy kawiarnianym stoliku. Obok stoi wolne krzesło."
                            decoding="async"
                            style={{ aspectRatio: RYC_PROPORCJA }}
                        />
                        <figcaption className="gkd-e">Ryc. 1 — Szary Dzień. Obok wolne krzesło.</figcaption>
                    </figure>
                </div>
            </section>

            <section className="gkd-rozmowa" id="gkd-rozmowa">
                <div className="gkd-wiersz gkd-e gkd-kreska">
                    <span>01 — Prawda o pracy</span>
                    <span>Mówi Szary Dzień, odpowiada Kulka</span>
                </div>
                <h2 className="gkd-d gkd-h2" data-wjazd="">
                    Szary Dzień
                    <br />
                    nie słodzi
                </h2>
                <div className="gkd-watki">
                    {rozmowa(slowo).map((w) => (
                        <div className="gkd-watek" key={w.nr} data-wjazd="">
                            <span className="gkd-nr gkd-e">{w.nr}</span>
                            {w.kw.map((k, i) => (
                                <Kwestia key={i} kto={k[0]} tekst={k[1]} />
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            <section className="gkd-kogo" id="gkd-kogo">
                <div className="gkd-wiersz gkd-e gkd-kreska">
                    <span>02 — Kogo szukamy</span>
                    <span>Cztery miejsca w Gorzowie</span>
                </div>
                <h2 className="gkd-d gkd-h2" data-wjazd="">
                    Kogo
                    <br />
                    szukamy
                </h2>
                <div className="gkd-kolumny">
                    <Karta tytul="Na sezon" pod="1.04–15.09" role={NA_SEZON} />
                    <Karta tytul="Na stałe" pod="Cały rok" role={NA_STALE} />
                </div>
                <p className="gkd-uwaga">{sp("Godziny to godziny otwarcia, nie długość zmiany. Latem potrzebujemy więcej rąk we wszystkich miejscach.")}</p>
            </section>

            <section className="gkd-placa" id="gkd-placa">
                <div className="gkd-wiersz gkd-e gkd-kreska">
                    <span>03 — Ile płacimy</span>
                    <span>Stawka jawna, zanim przyjdziesz na rozmowę</span>
                </div>
                <div className="gkd-placa-siatka">
                    <p className="gkd-d gkd-kwota" data-wjazd="">
                        {stawka}
                        <small>zł</small>
                    </p>
                    <div className="gkd-placa-opis">
                        <p className="gkd-e">Za godzinę</p>
                        <ul>
                            <li>{sp("Tyle na rękę, jeśli masz mniej niż 26 lat i status ucznia lub studenta (umowa zlecenie).")}</li>
                            <li>{sp("W pozostałych przypadkach " + stawka + " zł brutto za godzinę.")}</li>
                            <li>{sp("Szefowa lub szef zmiany albo punktu: stawkę podamy przed rozmową.")}</li>
                        </ul>
                        <p className="gkd-drobny">{sp("Stawkę znasz od pierwszej minuty. Tak się umawia uczciwie.")}</p>
                    </div>
                </div>
            </section>

            <section className="gkd-nie" id="gkd-nie">
                <div className="gkd-wiersz gkd-e gkd-kreska">
                    <span>04 — Tu nie zostaniesz</span>
                    <span>Szary Dzień wraca na chwilę</span>
                </div>
                <div className="gkd-watek" data-wjazd="">
                    <Kwestia kto="sd" tekst="Uczciwie: tu nie zostaniesz, jeśli…" />
                    <ul className="gkd-lista-nie">
                        <li>
                            <b>ściemniasz gościom</b>
                        </li>
                        <li>
                            <b>nie szanujesz ludzi</b>
                            <span>{sp("— gości ani zespołu")}</span>
                        </li>
                        <li>
                            <b>znikasz bez słowa</b>
                            <span>{sp("— przed swoją zmianą")}</span>
                        </li>
                    </ul>
                    <Kwestia kto="k" tekst="Cała reszta jest do nauczenia." />
                </div>
            </section>

            <section className="gkd-jak" id="gkd-jak">
                <div className="gkd-wiersz gkd-e gkd-kreska">
                    <span>05 — Jak to idzie</span>
                    <span>Cztery kroki</span>
                </div>
                <ol className="gkd-kroki">
                    {KROKI.map((k, i) => (
                        <li key={i} data-wjazd="">
                            <b className="gkd-d">{"0" + (i + 1)}</b>
                            <p>{sp(k)}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="gkd-forma" id="gkd-zgloszenie">
                <div className="gkd-wiersz gkd-e gkd-kreska">
                    <span>06 — Zgłoszenie</span>
                    <span>Bez CV · około 10 minut</span>
                </div>
                <h2 className="gkd-d gkd-h2" data-wjazd="">
                    Twoje
                    <br />
                    zgłoszenie
                </h2>
                <Zgloszenie slowo={slowo} naPlotnie={naPlotnie} />
            </section>

            <footer className="gkd-stopka">
                <a href="/" className="gkd-stopka-logo" aria-label="Górka & Kulka — strona główna">
                    <Wyc a={LOGOTYP} rozmiar={2048} alt="Górka & Kulka" />
                </a>
                <div className="gkd-wiersz gkd-e gkd-kreska">
                    <span>Górka & Kulka s.c. · ul. Gen. Władysława Sikorskiego 126, 66-400 Gorzów Wielkopolski</span>
                    <span>
                        <a href="/">Strona główna</a> ·{" "}
                        <a href={INSTAGRAM} target="_blank" rel="noopener">
                            Instagram
                        </a>
                    </span>
                </div>
            </footer>
        </div>
    )
}

KonceptDolacz.defaultProps = { slowo: "parasol", stawka: "32,30" }

addPropertyControls(KonceptDolacz, {
    slowo: { type: ControlType.String, title: "Słowo testu", defaultValue: "parasol" },
    stawka: { type: ControlType.String, title: "Stawka zł/h", defaultValue: "32,30" },
})
