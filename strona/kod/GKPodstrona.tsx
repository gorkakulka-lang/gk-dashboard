import * as React from "react"
import { useEffect, useState } from "react"
import { addPropertyControls, ControlType } from "framer"

// Górka & Kulka — podstrony gorkaikulka.pl (O nas, Współpraca B2B, Wypożyczalnia rowerów, Handel obwoźny, Dotacje,
// Regulamin, Polityka prywatności). Treści przeniesione z poprzedniej strony (WordPress), w stylu strony świątecznej:
// róż RAL 3015, maślana stopka, drobne czarne napisy, pasek logotypów KPO na białym tle.

const CDN = "https://framerusercontent.com/"
function obraz(plik: string, rozmiar?: number) {
    return CDN + "images/" + plik + (rozmiar ? "?scale-down-to=" + rozmiar : "")
}
const LOGO = { f: "yAwPPIb1WzY1tcRtyMDk7lxek.png", w: 3508, h: 2481, b: [0.088, 0.405, 0.912, 0.595] }
const KPO_PASEK = obraz("xPEA5XMgW1UjbF6u0Y7xyz69A.png")
const ADRES = "ul. Gen. Władysława Sikorskiego 126, 66-400 Gorzów Wielkopolski"
const MAIL = "gorka.kulka@gmail.com"
const TEL = "+48 500 344 913"

type Blok =
    | { t: "h2"; x: string }
    | { t: "p"; x: string }
    | { t: "ul"; x: string[] }
    | { t: "ol"; x: string[] }
    | { t: "kontakt" }
    | { t: "kpo" }
    | { t: "maly"; x: string }

type Strona = {
    etykieta: string
    tytul: string
    lead?: string
    foto?: { src: string; w: number; h: number; alt: string; jasne?: boolean }
    bloki: Blok[]
}

const STRONY: Record<string, Strona> = {
    "o-nas": {
        etykieta: "O nas",
        tytul: "Lodziarnia i cukiernia.",
        lead: "Lodziarnia i cukiernia Górka & Kulka to miejsce, które zostało stworzone z miłości do jedzenia i tego, aby się tą miłością dzielić. Cały zespół codziennie tworzy z wielką przyjemnością słodkości o najwyższej jakości.",
        foto: { src: obraz("KoRowOosOJMF9onIaCIXgMFxHiA.jpg", 2048), w: 1170, h: 1460, alt: "Sala Kawiarni Centrum Górka & Kulka przy ul. Sikorskiego" },
        bloki: [
            { t: "p", x: "Produkty, których właściciele używają do produkcji swoich dań, dostarczane są od lokalnych dostawców. Rzeczy takie jak masło, śmietana, jajka i twarogi pochodzą z najbliższych wsi." },
            { t: "p", x: "W menu znajdziemy lody w przeróżnych smakach, jak np. solony karmel czy palone masło. Oprócz lodów są także boxy ze słodkościami, szeroki wybór kaw, napojów orzeźwiających oraz śniadania. Jest możliwość również zamówienia ciast na specjalne okazje." },
            { t: "kontakt" },
        ],
    },
    "wspolpraca-b2b": {
        etykieta: "Współpraca B2B",
        tytul: "Współpraca B2B.",
        lead: "Robimy lody rzemieślnicze i domowe ciasta, które dobrze smakują i dobrze się sprzedają.",
        foto: { src: obraz("L4lUEiLFPpyITYdqypDm9REys.jpg", 2048), w: 1084, h: 1389, alt: "Gość kawiarni Górka & Kulka kroi deser na stalowym talerzu" },
        bloki: [
            { t: "p", x: "Chętnie podejmiemy współpracę z kawiarniami, restauracjami, firmami oraz przy wydarzeniach i eventach." },
            { t: "p", x: "Jeśli myślisz o współpracy, zadzwoń lub napisz do nas: pogadamy i dopasujemy ofertę do Twoich potrzeb." },
            { t: "kontakt" },
        ],
    },
    "wypozyczalnia-rowerow": {
        etykieta: "Wypożyczalnia rowerów",
        tytul: "Wypożyczalnia rowerów elektrycznych.",
        lead: "Oferujemy nowoczesne rowery elektryczne, idealne dla mieszkańców oraz turystów.",
        foto: { src: obraz("FduunB2kD1NynHSiKnnqJeJCl4.png"), w: 720, h: 720, alt: "Rower elektryczny z wypożyczalni Górka & Kulka", jasne: true },
        bloki: [
            { t: "p", x: "Dzięki wspomaganiu jazdy rowery świetnie sprawdzają się podczas rekreacyjnych wycieczek, dłuższych tras oraz dla osób, które chcą poruszać się aktywnie bez dużego wysiłku. Nasza wypożyczalnia wspiera aktywny wypoczynek i pozwala komfortowo zwiedzać Gorzów Wielkopolski oraz okolice." },
            { t: "kontakt" },
            { t: "maly", x: "Wypożyczalnia powstała w ramach przedsięwzięcia dofinansowanego ze środków Krajowego Planu Odbudowy i Zwiększania Odporności. Szczegóły na stronie Dotacje." },
            { t: "h2", x: "Regulamin wypożyczalni rowerów elektrycznych" },
            { t: "h2", x: "1. Postanowienia ogólne" },
            { t: "ol", x: ["Wypożyczalnia rowerów elektrycznych prowadzona jest przez Górka & Kulka S.C.", "Wypożyczenie roweru oznacza akceptację niniejszego regulaminu.", "Regulamin obowiązuje wszystkich klientów wypożyczalni."] },
            { t: "h2", x: "2. Warunki wypożyczenia" },
            { t: "ol", x: ["Wypożyczający musi mieć ukończone 18 lat lub posiadać zgodę opiekuna prawnego.", "Wymagane jest okazanie ważnego dokumentu tożsamości.", "Rowery wypożyczane są na określony czas, zgodnie z ustaloną stawką.", "Płatność za wypożyczenie pobierana jest z góry."] },
            { t: "h2", x: "3. Zasady użytkowania" },
            { t: "ol", x: ["Rower należy użytkować zgodnie z jego przeznaczeniem i przepisami ruchu drogowego.", "Zabrania się: przekazywania roweru osobom trzecim, jazdy pod wpływem alkoholu lub środków odurzających oraz użytkowania roweru w sposób zagrażający bezpieczeństwu.", "Wypożyczający ponosi odpowiedzialność za rower przez cały okres wypożyczenia."] },
            { t: "h2", x: "4. Odpowiedzialność i szkody" },
            { t: "ol", x: ["Wypożyczający odpowiada za wszelkie uszkodzenia powstałe z jego winy.", "W przypadku kradzieży roweru należy niezwłocznie poinformować wypożyczalnię oraz policję.", "Koszty napraw wynikających z niewłaściwego użytkowania ponosi wypożyczający."] },
            { t: "h2", x: "5. Zwrot roweru" },
            { t: "ol", x: ["Rower należy zwrócić w ustalonym terminie i w stanie niepogorszonym.", "Opóźnienie w zwrocie może skutkować naliczeniem dodatkowej opłaty.", "Rower powinien zostać zwrócony z naładowaną baterią, o ile nie ustalono inaczej."] },
            { t: "h2", x: "6. Postanowienia końcowe" },
            { t: "ol", x: ["Wypożyczalnia zastrzega sobie prawo do odmowy wypożyczenia bez podania przyczyny.", "Regulamin dostępny jest na stronie internetowej oraz w miejscu wypożyczenia.", "W sprawach nieuregulowanych regulaminem mają zastosowanie przepisy prawa polskiego."] },
        ],
    },
    "handel-obwozny": {
        etykieta: "Handel obwoźny",
        tytul: "Handel obwoźny i sprzedaż lodów.",
        lead: "Górka & Kulka to nie tylko lodziarnia stacjonarna. Nasze lody możecie spotkać również w mobilnych przyczepach gastronomicznych.",
        foto: { src: obraz("osR5lNBfL3G6CePUh6JWiggKAMg.jpg", 2048), w: 1440, h: 1799, alt: "Goście z lodami przy przyczepie gastronomicznej Górka & Kulka" },
        bloki: [
            { t: "h2", x: "Start sezonu: 1 maja" },
            { t: "p", x: "W sezonie działamy w dwóch lokalizacjach:" },
            { t: "ul", x: ["Promenada w Santoku", "Osiedle Europejskie, ul. Londyńska"] },
            { t: "p", x: "Nasze przyczepy są otwarte w każdy ładny dzień w godzinach 12:00–19:00. Serwujemy rzemieślnicze lody Górka & Kulka, przygotowywane z dbałością o smak, jakość i dobre składniki. Nasze przyczepy sprawdzają się zarówno w stałych punktach sprzedaży, jak i podczas wydarzeń plenerowych." },
            { t: "h2", x: "Przyczepa z lodami na Twoim wydarzeniu" },
            { t: "p", x: "Organizujesz imprezę masową, festyn, piknik rodzinny, event firmowy, wesele, koncert albo wydarzenie miejskie? Możemy pojawić się z naszą przyczepą gastronomiczną i zadbać o słodką część wydarzenia. Jesteśmy otwarci na różne formy współpracy: od klasycznej sprzedaży lodów po indywidualne ustalenia dopasowane do charakteru wydarzenia." },
            { t: "p", x: "Masz pomysł, jak nasze przyczepy mogą wesprzeć Twoje wydarzenie? Napisz do nas lub zadzwoń." },
            { t: "kontakt" },
        ],
    },
    dotacje: {
        etykieta: "Dotacje",
        tytul: "Dotacje.",
        bloki: [
            { t: "kpo" },
            { t: "p", x: "GÓRKA & KULKA S.C. MAGDALENA KOWALSKA, PAWEŁ GÓRKA otrzymało dofinansowanie na realizację przedsięwzięcia pn.: „Inwestycja w dywersyfikację działalności GÓRKA & KULKA S.C. MAGDALENA KOWALSKA, PAWEŁ GÓRKA w regionie Lubuskim.” ze środków Krajowego Planu Odbudowy i Zwiększania Odporności." },
            { t: "p", x: "Głównym celem przedsięwzięcia jest unowocześnienie działalności restauracyjno-kawiarnianej oraz wprowadzenie nowej usługi wynajmu sprzętu rekreacyjnego na terenie Gorzowa Wlkp. – rowerów elektrycznych." },
            { t: "p", x: "W ramach przedsięwzięcia zostaną zakupione rowery elektryczne zarówno cargo do świadczenia usługi dostaw na wynos oraz rekreacyjne do wypożyczalni sprzętu rekreacyjnego. Ponadto przeprowadzone zostaną prace adaptacyjne wraz z dostosowaniem do potrzeb osób niepełnosprawnych i doposażenie w sprzęt gastronomiczny." },
            { t: "p", x: "Z rezultatów projektu będą korzystać zarówno dotychczasowi klienci, jak również przyszli użytkownicy świadczonych usług." },
            { t: "ul", x: ["Wartość projektu: 712 293,00 PLN", "Dofinansowanie projektu: 521 190,00 PLN", "Okres realizacji: 01.11.2024 – 31.10.2025"] },
        ],
    },
    regulamin: {
        etykieta: "Regulamin",
        tytul: "Regulamin zamówień świątecznych.",
        lead: "Obowiązuje od 21 listopada 2026 r.",
        bloki: [
            { t: "h2", x: "§ 1. Sprzedawca" },
            { t: "ol", x: ["Sprzedawcą jest GÓRKA & KULKA S.C. Magdalena Kowalska, Paweł Górka, " + ADRES + ", NIP 599 318 75 02 (dalej: Sprzedawca).", "Kontakt ze Sprzedawcą: e-mail " + MAIL + ", telefon " + TEL + ", osobiście w Kawiarni Centrum przy ul. Sikorskiego 126."] },
            { t: "h2", x: "§ 2. Czego dotyczy regulamin" },
            { t: "ol", x: ["Regulamin określa zasady zamawiania wypieków świątecznych przez stronę gorkaikulka.pl z odbiorem osobistym. Nie prowadzimy dostaw.", "Do złożenia zamówienia potrzebne są urządzenie z dostępem do internetu, aktualna przeglądarka i adres e-mail.", "Ceny na stronie są cenami brutto w złotych."] },
            { t: "h2", x: "§ 3. Zamówienie" },
            { t: "ol", x: ["Zamówienia przyjmujemy przez stronę do 21 grudnia 2026 r., godz. 23:59, albo do wyczerpania limitu danego wypieku.", "Aby złożyć zamówienie, Klient wybiera wypieki, miejsce i termin odbioru, podaje imię i nazwisko, numer telefonu i adres e-mail, akceptuje regulamin i płaci zadatek.", "Umowa zostaje zawarta z chwilą zaksięgowania zadatku. Potwierdzenie zamówienia z jego numerem wysyłamy na podany adres e-mail.", "Jeżeli zadatek nie zostanie zapłacony w ciągu 30 minut od przejścia do płatności, zamówienie wygasa, a zarezerwowane wypieki wracają do sprzedaży."] },
            { t: "h2", x: "§ 4. Zadatek i płatność" },
            { t: "ol", x: ["Przy składaniu zamówienia Klient płaci zadatek w wysokości 30% wartości zamówienia. Pozostałą kwotę Klient płaci przy odbiorze, gotówką lub kartą.", "Zadatek można zapłacić BLIK-iem, kartą płatniczą albo przez Przelewy24. Płatności obsługuje Stripe Payments Europe, Limited, 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, D02 H210, Irlandia.", "Zadatek jest zadatkiem w rozumieniu art. 394 Kodeksu cywilnego. Jeżeli Klient nie odbierze zamówienia, Sprzedawca zachowuje zadatek. Jeżeli Sprzedawca nie wykona zamówienia z przyczyn leżących po jego stronie, Klient może żądać zapłaty podwójnej wysokości zadatku.", "Zmianę albo anulowanie zamówienia można uzgodnić ze Sprzedawcą mailowo lub telefonicznie, najpóźniej do 18 grudnia 2026 r. Przy anulowaniu uzgodnionym ze Sprzedawcą zadatek zwracamy w ciągu 14 dni, tą samą metodą płatności."] },
            { t: "h2", x: "§ 5. Odbiór" },
            { t: "ol", x: ["Zamówienie odbiera się osobiście 23 grudnia 2026 r. w godz. 14:00–19:00, w miejscu i przedziale godzinowym wybranym przy zamówieniu: w Kawiarni Centrum (ul. Gen. Władysława Sikorskiego 126) albo w Nova Park w Gorzowie Wielkopolskim.", "Przy odbiorze należy podać numer zamówienia albo imię i nazwisko oraz dopłacić pozostałą kwotę.", "Zamówienie może odebrać inna osoba, która poda numer zamówienia.", "Nieodebrane zamówienie przechowujemy do zamknięcia lokalu w dniu odbioru."] },
            { t: "h2", x: "§ 6. Odstąpienie od umowy" },
            { t: "p", x: "Zgodnie z art. 38 ust. 1 pkt 4 ustawy z dnia 30 maja 2014 r. o prawach konsumenta prawo odstąpienia od umowy zawartej na odległość nie przysługuje, gdy przedmiotem świadczenia jest rzecz ulegająca szybkiemu zepsuciu lub mająca krótki termin przydatności do użycia. Dotyczy to wypieków świątecznych." },
            { t: "h2", x: "§ 7. Reklamacje" },
            { t: "ol", x: ["Sprzedawca odpowiada za zgodność wypieków z umową na zasadach określonych w ustawie o prawach konsumenta.", "Prosimy obejrzeć zamówienie przy odbiorze. Reklamację można zgłosić osobiście, mailowo lub telefonicznie. Warto opisać problem i dołączyć zdjęcie.", "Na reklamację odpowiadamy w ciągu 14 dni."] },
            { t: "h2", x: "§ 8. Alergeny" },
            { t: "p", x: "Informację o alergenach w wypiekach przekażemy na prośbę przed złożeniem zamówienia: mailowo, telefonicznie albo w kawiarni." },
            { t: "h2", x: "§ 9. Dane osobowe" },
            { t: "p", x: "Zasady przetwarzania danych osobowych opisuje polityka prywatności dostępna na stronie gorkaikulka.pl/polityka-prywatnosci." },
            { t: "h2", x: "§ 10. Postanowienia końcowe" },
            { t: "ol", x: ["W sprawach nieuregulowanych w regulaminie stosuje się przepisy prawa polskiego, w szczególności Kodeksu cywilnego i ustawy o prawach konsumenta.", "Klient będący konsumentem może skorzystać z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń, na przykład z pomocy miejskiego lub powiatowego rzecznika konsumentów albo wojewódzkiego inspektoratu Inspekcji Handlowej.", "Zmiany regulaminu nie dotyczą zamówień złożonych przed ich wprowadzeniem."] },
        ],
    },
    "polityka-prywatnosci": {
        etykieta: "Polityka prywatności",
        tytul: "Polityka prywatności.",
        lead: "Obowiązuje od 21 listopada 2026 r.",
        bloki: [
            { t: "h2", x: "1. Administrator danych" },
            { t: "p", x: "Administratorem danych osobowych jest GÓRKA & KULKA S.C. Magdalena Kowalska, Paweł Górka, " + ADRES + ", NIP 599 318 75 02. W sprawach danych osobowych napisz na " + MAIL + " albo zadzwoń: " + TEL + "." },
            { t: "h2", x: "2. Jakie dane zbieramy i po co" },
            { t: "ul", x: ["Zamówienia wypieków: imię i nazwisko, telefon, e-mail, wybrane wypieki, miejsce i termin odbioru, informacja o płatności. Cel: realizacja zamówienia i kontakt w jego sprawie (art. 6 ust. 1 lit. b RODO), obowiązki podatkowe i księgowe (art. 6 ust. 1 lit. c RODO), ustalenie i dochodzenie roszczeń (art. 6 ust. 1 lit. f RODO).", "Zapytanie o wigilię firmową: nazwa firmy, termin, liczba osób, e-mail lub telefon. Cel: odpowiedź i przygotowanie oferty (art. 6 ust. 1 lit. b i f RODO).", "Prośba o stolik: imię, telefon, dzień, godzina i liczba osób. Cel: potwierdzenie i obsługa rezerwacji (art. 6 ust. 1 lit. b RODO).", "Korespondencja mailowa i telefoniczna: dane podane w wiadomości. Cel: odpowiedź (art. 6 ust. 1 lit. f RODO)."] },
            { t: "p", x: "Podanie danych jest dobrowolne, ale bez nich nie przyjmiemy zamówienia ani nie odpowiemy na zapytanie." },
            { t: "h2", x: "3. Komu powierzamy dane" },
            { t: "p", x: "Korzystamy z usług dostawców, którzy przetwarzają dane na nasze zlecenie: Stripe Payments Europe, Limited (płatności online), Supabase (baza zamówień i zgłoszeń, serwery we Frankfurcie), Resend (wysyłka wiadomości e-mail), Framer (hosting strony), Google (poczta e-mail i czcionki strony), OVH (domena) oraz biuro rachunkowe. Część z nich może przekazywać dane poza Europejski Obszar Gospodarczy, np. do USA, na podstawie decyzji Komisji Europejskiej (EU-US Data Privacy Framework) albo standardowych klauzul umownych." },
            { t: "h2", x: "4. Jak długo przechowujemy dane" },
            { t: "ul", x: ["Zamówienia: przez okres wymagany przepisami podatkowymi (5 lat od końca roku, w którym powstał obowiązek podatkowy) i do przedawnienia roszczeń.", "Zapytania i prośby o stolik: do 12 miesięcy od ostatniego kontaktu."] },
            { t: "h2", x: "5. Twoje prawa" },
            { t: "p", x: "Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania i przeniesienia, a także prawo sprzeciwu wobec przetwarzania opartego na naszym prawnie uzasadnionym interesie. Możesz też złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa)." },
            { t: "h2", x: "6. Pliki cookies i pamięć przeglądarki" },
            { t: "p", x: "Strona nie używa reklamowych plików cookies. Koszyk zapisuje się w pamięci przeglądarki na Twoim urządzeniu, żeby nie zniknął po odświeżeniu strony. Hosting strony może zbierać anonimowe statystyki odwiedzin." },
            { t: "h2", x: "7. Zmiany" },
            { t: "p", x: "Aktualna wersja polityki prywatności jest zawsze na tej stronie." },
        ],
    },
}

const MENU = [
    ["Wypieki na Święta", "/#gk2-sklep"],
    ["Wigilia firmowa", "/#gk2-firmy"],
    ["Zarezerwuj stolik", "/#gk2-stolik"],
    ["Odbiór i adresy", "/#gk2-odbior"],
]
const PODSTRONY = [
    ["O nas", "/o-nas"],
    ["Współpraca B2B", "/wspolpraca-b2b"],
    ["Wypożyczalnia rowerów", "/wypozyczalnia-rowerow"],
    ["Handel obwoźny", "/handel-obwozny"],
    ["Dotacje", "/dotacje"],
    ["Regulamin", "/regulamin"],
    ["Polityka prywatności", "/polityka-prywatnosci"],
]

const CSS = [
    "@import url('https://fonts.googleapis.com/css2?family=Fragment+Mono:ital@0;1&display=swap');",
    ".gkp { --roz: #F7C2CF; --maslo: #FFE295; --rubin: #9B111E; --tusz: #111111; --nav: 52px; --m: 24px; --linia: rgba(17,17,17,.16);",
    "  position: relative; width: 100%; min-height: 100vh; background: var(--roz); color: var(--tusz); font-family: 'Fragment Mono', ui-monospace, Menlo, Consolas, monospace; font-size: 15px; line-height: 1.55; overflow-x: clip; -webkit-font-smoothing: antialiased; }",
    ".gkp *, .gkp *::before, .gkp *::after { box-sizing: border-box; margin: 0; }",
    ".gkp a { color: inherit; text-decoration: none; }",
    ".gkp img { display: block; max-width: 100%; }",
    ".gkp-e { font-size: 11px; line-height: 1.3; letter-spacing: .07em; text-transform: uppercase; }",
    ".gkp :focus-visible { outline: 2px solid var(--tusz); outline-offset: 3px; }",
    ".gkp-nav { position: sticky; top: 0; z-index: 50; height: var(--nav); display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); align-items: center; gap: 16px; padding: 0 var(--m); background: var(--roz); border-bottom: 1px solid var(--linia); }",
    ".gkp-nav-linki { display: flex; gap: 22px; }",
    ".gkp-nav-linki a, .gkp-stopka-linki a, .gkp-tresc a { background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size .3s ease; }",
    "@media (hover: hover) { .gkp-nav-linki a:hover, .gkp-stopka-linki a:hover { background-size: 100% 1px; } }",
    ".gkp-nav-menu { display: none; justify-self: start; height: 36px; padding: 0; border: 0; background: none; color: var(--tusz); font: inherit; cursor: pointer; }",
    ".gkp-logo { grid-column: 2; display: block; width: 112px; }",
    ".gkp-logo span { position: relative; display: block; overflow: hidden; }",
    ".gkp-logo img { position: absolute; max-width: none; }",
    ".gkp .gkp-pigulka { grid-column: 3; justify-self: end; display: inline-flex; align-items: center; gap: 8px; height: 32px; padding: 0 14px; border-radius: 999px; background: var(--tusz); color: var(--roz); white-space: nowrap; }",
    ".gkp-pigulka i { width: 6px; height: 6px; border-radius: 50%; background: var(--maslo); }",
    ".gkp-menu { position: fixed; z-index: 49; top: var(--nav); left: 0; right: 0; max-height: calc(100vh - var(--nav)); overflow-y: auto; padding: 4px var(--m) 26px; background: var(--roz); border-bottom: 1px solid var(--linia); }",
    ".gkp-menu[hidden] { display: none; }",
    ".gkp-menu a { display: flex; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid var(--linia); font-size: 19px; letter-spacing: -.02em; }",
    ".gkp-menu a.gkp-menu-maly { font-size: 13px; padding: 11px 0; }",
    ".gkp-glowa { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 48px; padding: 72px var(--m) 64px; align-items: end; }",
    ".gkp-glowa-sama { grid-template-columns: minmax(0, 1fr); max-width: 1100px; }",
    ".gkp-h1 { margin-top: 14px; font-size: clamp(34px, 4.4vw, 68px); font-weight: 400; line-height: 1.04; letter-spacing: -.04em; }",
    ".gkp-lead { margin-top: 24px; max-width: 36em; font-size: 15px; line-height: 1.65; }",
    ".gkp-foto { position: relative; aspect-ratio: 4 / 5; overflow: hidden; background: #3A2420; }",
    ".gkp-foto img { width: 100%; height: 100%; object-fit: cover; }",
    ".gkp-foto-jasne { background: #fff; aspect-ratio: 1 / 1; }",
    ".gkp-foto-jasne img { object-fit: contain; padding: 6%; }",
    ".gkp-tresc { padding: 0 var(--m) 96px; max-width: 860px; }",
    ".gkp-tresc > * + * { margin-top: 18px; }",
    ".gkp-tresc h2 { margin-top: 40px; font-size: 13px; font-weight: 400; letter-spacing: .07em; text-transform: uppercase; }",
    ".gkp-tresc h2 + * { margin-top: 12px; }",
    ".gkp-tresc p, .gkp-tresc li { font-size: 14px; line-height: 1.7; }",
    ".gkp-tresc ul, .gkp-tresc ol { padding-left: 1.4em; display: grid; gap: 8px; }",
    ".gkp-tresc a { text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }",
    ".gkp-maly { opacity: .72; font-size: 12px !important; }",
    ".gkp-kontakt { margin-top: 32px !important; padding-top: 18px; border-top: 1px solid rgba(17,17,17,.22); display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }",
    ".gkp-kontakt p { font-size: 13px; }",
    ".gkp .gkp-kpo, .gkp-tresc a.gkp-kpo { display: block; background: #fff; padding: 18px 20px; text-decoration: none; }",
    ".gkp-kpo img { width: 100%; max-width: 760px; height: auto; margin: 0 auto; }",
    ".gkp-stopka { background: var(--maslo); padding: 0 var(--m) 22px; }",
    ".gkp-stopka-wiersz { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 24px; padding: 18px 0 26px; border-top: 1px solid rgba(17,17,17,.25); }",
    ".gkp-stopka-linki { display: flex; flex-wrap: wrap; gap: 10px 24px; padding: 0 0 30px; }",
    ".gkp-stopka-logo { position: relative; display: block; width: 100%; overflow: hidden; }",
    ".gkp-stopka-logo img { position: absolute; max-width: none; }",
    ".gkp-stopka-firma { margin-top: 18px; font-size: 11px; line-height: 1.7; opacity: .8; }",
    ".gkp-stopka-firma a { text-decoration: underline; text-underline-offset: 2px; }",
    ".gkp-stopka .gkp-kpo { margin: 22px calc(var(--m) * -1) -22px; padding: 14px var(--m) calc(14px + env(safe-area-inset-bottom, 0px)); text-align: center; }",
    ".gkp-stopka .gkp-kpo img { max-width: 620px; }",
    "@media (max-width: 809px) {",
    "  .gkp { --m: 16px; }",
    "  .gkp-nav { grid-template-columns: auto minmax(0, 1fr) auto; gap: 10px; }",
    "  .gkp-nav-linki { display: none; }",
    "  .gkp-nav-menu { display: inline-flex; align-items: center; }",
    "  .gkp-logo { justify-self: center; width: 92px; }",
    "  .gkp-pigulka { padding: 0 12px; }",
    "  .gkp-tylko-duzy { display: none; }",
    "  .gkp-glowa { grid-template-columns: 1fr; gap: 28px; padding: 44px var(--m) 40px; }",
    "  .gkp-kontakt { grid-template-columns: 1fr; gap: 10px; }",
    "  .gkp-tresc { padding-bottom: 64px; }",
    "}",
    "@media (min-width: 810px) { .gkp-tylko-tel { display: none; } }",
].join("\n")

function Logo(props: { className: string; rozmiar: number; alt: string }) {
    const a = LOGO
    const bw = a.b[2] - a.b[0]
    const bh = a.b[3] - a.b[1]
    return (
        <span className={props.className} style={{ aspectRatio: String(Math.round(((bw * a.w) / (bh * a.h)) * 10000) / 10000) }}>
            <img
                src={obraz(a.f, props.rozmiar)}
                alt={props.alt}
                decoding="async"
                draggable={false}
                style={{ width: (100 / bw).toFixed(3) + "%", left: ((-a.b[0] / bw) * 100).toFixed(3) + "%", top: ((-a.b[1] / bh) * 100).toFixed(3) + "%" }}
            />
        </span>
    )
}

function Kontakt() {
    return (
        <div className="gkp-kontakt">
            <div>
                <p className="gkp-e">Adres</p>
                <p>{ADRES}</p>
            </div>
            <div>
                <p className="gkp-e">E-mail</p>
                <p>
                    <a href={"mailto:" + MAIL}>{MAIL}</a>
                </p>
            </div>
            <div>
                <p className="gkp-e">Telefon</p>
                <p>
                    <a href="tel:+48500344913">{TEL}</a>
                </p>
            </div>
        </div>
    )
}

function PasekKPO() {
    return (
        <a className="gkp-kpo" href="/dotacje" aria-label="Projekt dofinansowany z Krajowego Planu Odbudowy — strona Dotacje">
            <img src={KPO_PASEK} width={1024} height={131} alt="Krajowy Plan Odbudowy, Rzeczpospolita Polska, Sfinansowane przez Unię Europejską NextGenerationEU" loading="lazy" decoding="async" />
        </a>
    )
}

function BlokTresci(props: { b: Blok }) {
    const b = props.b
    if (b.t === "h2") return <h2>{b.x}</h2>
    if (b.t === "p") return <p>{b.x}</p>
    if (b.t === "maly") return <p className="gkp-maly">{b.x}</p>
    if (b.t === "kontakt") return <Kontakt />
    if (b.t === "kpo") return <PasekKPO />
    if (b.t === "ul")
        return (
            <ul>
                {b.x.map((x, i) => (
                    <li key={i}>{x}</li>
                ))}
            </ul>
        )
    return (
        <ol>
            {b.x.map((x, i) => (
                <li key={i}>{x}</li>
            ))}
        </ol>
    )
}

interface Props {
    strona: string
    style?: React.CSSProperties
}

/**
 * Górka & Kulka — podstrona gorkaikulka.pl (treść wybierana w ustawieniach: „Strona”).
 *
 * @framerIntrinsicWidth 1440
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 */
export default function GKPodstrona(props: Props) {
    const s = STRONY[props.strona] || STRONY["o-nas"]
    const [menu, ustawMenu] = useState(false)
    useEffect(() => {
        if (!menu) return
        const esc = (e: KeyboardEvent) => {
            if (e.key === "Escape") ustawMenu(false)
        }
        window.addEventListener("keydown", esc)
        return () => window.removeEventListener("keydown", esc)
    }, [menu])
    return (
        <div className="gkp" style={props.style}>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />
            <header className="gkp-nav gkp-e">
                <button type="button" className="gkp-nav-menu gkp-e" onClick={() => ustawMenu(!menu)} aria-expanded={menu} aria-controls="gkp-menu">
                    {menu ? "Zamknij" : "Menu"}
                </button>
                <nav className="gkp-nav-linki" aria-label="Główne">
                    <a href="/#gk2-sklep">Wypieki</a>
                    <a href="/#gk2-firmy">Dla firm</a>
                    <a href="/#gk2-stolik">Stolik</a>
                    <a href="/#gk2-odbior">Odbiór</a>
                </nav>
                <a className="gkp-logo" href="/" aria-label="Górka & Kulka — strona główna">
                    <Logo className="" rozmiar={1024} alt="" />
                </a>
                <a className="gkp-pigulka" href="/#gk2-sklep">
                    <i aria-hidden="true" />
                    <span className="gkp-tylko-duzy">Wypieki na Święta</span>
                    <span className="gkp-tylko-tel">Wypieki</span>
                </a>
            </header>
            <nav className="gkp-menu" id="gkp-menu" hidden={!menu} aria-label="Menu">
                {MENU.map((l) => (
                    <a key={l[1]} href={l[1]} onClick={() => ustawMenu(false)}>
                        {l[0]}
                        <span className="gkp-e">→</span>
                    </a>
                ))}
                {PODSTRONY.map((l) => (
                    <a key={l[1]} className="gkp-menu-maly gkp-e" href={l[1]} onClick={() => ustawMenu(false)}>
                        {l[0]}
                    </a>
                ))}
            </nav>

            <main>
                <section className={"gkp-glowa" + (s.foto ? "" : " gkp-glowa-sama")}>
                    <div>
                        <p className="gkp-e">{s.etykieta}</p>
                        <h1 className="gkp-h1">{s.tytul}</h1>
                        {s.lead ? <p className="gkp-lead">{s.lead}</p> : null}
                    </div>
                    {s.foto ? (
                        <div className={"gkp-foto" + (s.foto.jasne ? " gkp-foto-jasne" : "")}>
                            <img src={s.foto.src} width={s.foto.w} height={s.foto.h} alt={s.foto.alt} decoding="async" />
                        </div>
                    ) : null}
                </section>
                <div className="gkp-tresc">
                    {s.bloki.map((b, i) => (
                        <BlokTresci key={i} b={b} />
                    ))}
                </div>
            </main>

            <footer className="gkp-stopka">
                <div className="gkp-stopka-wiersz gkp-e">
                    <span>Małe święto każdego dnia.</span>
                    <a href="https://www.instagram.com/gorka.kulka/" target="_blank" rel="noopener noreferrer">
                        Instagram @gorka.kulka
                    </a>
                    <span>© 2026 Górka & Kulka s.c.</span>
                </div>
                <nav className="gkp-stopka-linki gkp-e" aria-label="Więcej">
                    {PODSTRONY.map((l) => (
                        <a key={l[1]} href={l[1]} aria-current={l[1] === "/" + props.strona ? "page" : undefined}>
                            {l[0]}
                        </a>
                    ))}
                </nav>
                <Logo className="gkp-stopka-logo" rozmiar={2048} alt="Górka & Kulka" />
                <p className="gkp-stopka-firma">
                    {"GÓRKA & KULKA S.C. Magdalena Kowalska, Paweł Górka · " + ADRES + " · NIP 599 318 75 02 · "}
                    <a href={"mailto:" + MAIL}>{MAIL}</a>
                    {" · tel. "}
                    <a href="tel:+48500344913">{TEL}</a>
                </p>
                <PasekKPO />
            </footer>
        </div>
    )
}

addPropertyControls(GKPodstrona, {
    strona: {
        type: ControlType.Enum,
        title: "Strona",
        options: Object.keys(STRONY),
        optionTitles: Object.keys(STRONY).map((k) => STRONY[k].etykieta),
        defaultValue: "o-nas",
    },
})
