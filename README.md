# Karta gościa Górka & Kulka

Aplikacja gości: każda wizyta zbliża Kulkę i Górkę o krok, dziesiąty krok to spotkanie i nagroda
(duża porcja lodów albo kawa). Strona statyczna bez kroku budowania, dane w Supabase.

## Adresy

- `/` karta gościa: zapis, droga, kod do skanu
- `/obsluga/` ekran obsługi: skan aparatem albo numer karty, wydanie nagrody, cofnięcie pomyłki
- `/panel/` panel właściciela: powroty gości, liczby, lokale, kody lokali, smaki
- `/#dzis` „Dziś u nas”: lody w witrynie każdego lokalu, widoczne także bez karty (link do bio)
- `/?nowa=1` zapomina kartę zapisaną w tej przeglądarce (testy kilku osób na jednym telefonie)
- `/?o=KOD` przywraca kartę kodem od obsługi (taki adres niesie kod QR z zakładki „Zguba”)
- `/api/karta` pamięć karty po stronie strony: ciasteczko z kluczem karty (funkcja brzegowa Netlify)

## Układ

- `site/` cała strona (to katalog publikowany, patrz `netlify.toml`)
  - `js/gosc.js`, `js/obsluga.js`, `js/panel.js` trzy ekrany
  - `js/api.js`, `js/konfig.js` połączenie z bazą (klucz publiczny jest jawny z założenia)
  - `js/wolacz.js` wołacz imion do powitania
  - `js/qr.js` kod QR jako SVG (karta gościa i kod z zakładki „Zguba”)
  - `_headers` nagłówki bezpieczeństwa
- `netlify/edge-functions/karta.js` funkcja brzegowa `/api/karta` (poza katalogiem publikowanym)
- `narzedzia/` atrapa bazy i testy przepływów (Playwright), test funkcji brzegowej (Node)

## Baza

Projekt Supabase „GK OS”, Frankfurt. Tabele w zamkniętym schemacie `karta`, bez dostępu z zewnątrz.
Strona wywołuje wyłącznie funkcje `public.karta_*`. Niczego nie kasujemy: pomyłki są oznaczane
(`cofniety`, `cofnieta`). Migracje `karta_00` do `karta_09` są zapisane w historii migracji projektu.

- gość: `karta_zapis`, `karta_stan`, `karta_dzis`, `karta_ulubiony`, `karta_odzyskaj`
- obsługa: `karta_lokale`, `karta_obsluga_paruj`, `karta_obsluga_skan`, `karta_obsluga_wydaj`,
  `karta_obsluga_cofnij`, `karta_obsluga_cofnij_nagrode`, `karta_obsluga_dzis`,
  `karta_obsluga_witryna`, `karta_obsluga_witryna_ustaw`, `karta_obsluga_witryna_potwierdz`,
  `karta_obsluga_odzysk`
- panel: `karta_panel_status`, `karta_panel_ustaw`, `karta_panel_login`, `karta_panel_dane`,
  `karta_panel_pin`, `karta_panel_lokal`, `karta_panel_odlacz`, `karta_panel_wyloguj`,
  `karta_panel_smaki`, `karta_panel_smak`, `karta_panel_powroty`

## Zasady

- jedna wizyta = jeden krok, lody i kawa na jednej drodze
- pierwszy krok na powitanie, przy zapisie
- ten sam gość nie dostanie drugiego kroku w ciągu 3 minut (ochrona przed podwójnym skanem)
- obsługa może cofnąć własny skan i własne wydanie nagrody do 10 minut wstecz
- powroty w panelu: gość „wrócił”, gdy ma wizyty w co najmniej dwóch różnych dniach (krok powitalny
  nie jest wizytą)

## Gdzie mieszka karta

Gość nie ma hasła. Kartę otwiera klucz (48 znaków), który leży w trzech miejscach naraz:

- w pamięci przeglądarki (`localStorage`),
- w adresie strony (`?k=`), żeby „Dodaj do ekranu początkowego” zabrało kartę ze sobą,
- w ciasteczku `gk_karta` ustawianym przez serwer strony (`/api/karta`), na 400 dni.

Ciasteczko jest po to, że Safari kasuje pamięć zapisaną przez JavaScript po 7 dniach używania
przeglądarki bez wizyty na stronie. Ciasteczka ustawionego nagłówkiem HTTP ta reguła nie dotyczy.
Gdyby funkcja brzegowa nie działała, strona zachowuje się jak przed jej dodaniem.

Gdy karta mimo to zniknie (nowy telefon, inna przeglądarka, na przykład Instagram zamiast Safari):
gość podaje przy ladzie e-mail, obsługa w zakładce „Zguba” dostaje kod na 10 minut (8 cyfr i kod QR),
gość kieruje na niego aparat albo wpisuje cyfry w „Mam już kartę”. Dostaje nowy klucz do tej samej
karty. Poprzednie klucze działają dalej, więc karta może być w kilku przeglądarkach tej samej osoby.

## Test lokalny

    python3 narzedzia/atrapa.py 8765      # strona + atrapa bazy w pamięci
    python3 narzedzia/test_gosc.py        # przepływ gościa na czterech rozmiarach ekranu
    python3 narzedzia/test_zaplecze.py    # obsługa ze sztucznym aparatem i panel
    python3 narzedzia/test_dzis.py        # „Dziś u nas”, ulubione, zakładka Witryna, smaki w panelu
    node narzedzia/test_funkcji.mjs       # funkcja brzegowa /api/karta

Zrzuty ekranów z testów trafiają do `/home/claude/render/karta` (ścieżka z piaskownicy, do zmiany u siebie).
