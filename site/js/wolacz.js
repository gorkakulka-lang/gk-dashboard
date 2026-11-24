// Wołacz imion do powitania („Cześć, Aniu!”).
// Zasada bezpieczeństwa: odmieniamy tylko imiona ze słownika. Nieznane imię zostaje
// w mianowniku („Cześć, Chris!”), bo zła odmiana razi bardziej niż jej brak.

const PARY = `
ada:Ado adela:Adelo adrianna:Adrianno aga:Ago agata:Agato agatka:Agatko agnieszka:Agnieszko ala:Alu
aleksandra:Aleksandro alicja:Alicjo amelia:Amelio aneta:Aneto angelika:Angeliko ania:Aniu aniela:Anielo
anita:Anito anka:Anko anna:Anno antonina:Antonino asia:Asiu barbara:Barbaro basia:Basiu beata:Beato
blanka:Blanko bogna:Bogno bogumiła:Bogumiło bożena:Bożeno celina:Celino dagmara:Dagmaro danuta:Danuto
daria:Dario dominika:Dominiko dorota:Doroto dorotka:Dorotko edyta:Edyto ela:Elu eliza:Elizo
elżbieta:Elżbieto emilia:Emilio emilka:Emilko ewa:Ewo ewelina:Ewelino ewka:Ewko gabriela:Gabrielo
gabrysia:Gabrysiu gosia:Gosiu grażyna:Grażyno halina:Halino hania:Haniu hanka:Hanko hanna:Hanno
helena:Heleno henryka:Henryko ida:Ido iga:Igo ilona:Ilono irena:Ireno iwona:Iwono iwonka:Iwonko
iza:Izo izabela:Izabelo jadwiga:Jadwigo jagna:Jagno jagoda:Jagodo janina:Janino joanna:Joanno
jola:Jolu jolanta:Jolanto józefa:Józefo julcia:Julciu julia:Julio julka:Julko justyna:Justyno
justynka:Justynko kaja:Kaju kamila:Kamilo karina:Karino karolina:Karolino kasia:Kasiu
katarzyna:Katarzyno kazimiera:Kazimiero kinga:Kingo klaudia:Klaudio kornelia:Kornelio krysia:Krysiu
krystyna:Krystyno laura:Lauro lena:Leno lenka:Lenko lidia:Lidio liliana:Liliano lucyna:Lucyno
łucja:Łucjo madzia:Madziu magda:Magdo magdalena:Magdaleno maja:Maju majka:Majko małgorzata:Małgorzato
marcela:Marcelo marcelina:Marcelino maria:Mario marianna:Marianno mariola:Mariolo marlena:Marleno
marta:Marto martusia:Martusiu martyna:Martyno marysia:Marysiu marzena:Marzeno matylda:Matyldo
michalina:Michalino milena:Mileno mirka:Mirko mirosława:Mirosławo monia:Moniu monika:Moniko
nadia:Nadio natalia:Natalio natalka:Natalko natka:Natko nikola:Nikolo nina:Nino ola:Olu oleńka:Oleńko
olga:Olgo oliwia:Oliwio oliwka:Oliwko olka:Olko patrycja:Patrycjo paula:Paulo paulina:Paulino
paulinka:Paulinko pola:Polu regina:Regino renata:Renato roksana:Roksano rozalia:Rozalio róża:Różo
sandra:Sandro sara:Saro stanisława:Stanisławo stefania:Stefanio sylwia:Sylwio teresa:Tereso
tosia:Tosiu ula:Ulu urszula:Urszulo viktoria:Viktorio wanda:Wando weronika:Weroniko wiesława:Wiesławo
wika:Wiko wiktoria:Wiktorio wiola:Wiolu wioletta:Wioletto zofia:Zofio zosia:Zosiu zuza:Zuzo
zuzanna:Zuzanno zuzia:Zuziu żaneta:Żaneto
adam:Adamie adaś:Adasiu adrian:Adrianie alan:Alanie albert:Albercie alek:Alku aleks:Aleksie
aleksander:Aleksandrze andrzej:Andrzeju antek:Antku antoni:Antoni antoś:Antosiu arek:Arku
arkadiusz:Arkadiuszu artur:Arturze bartek:Bartku bartłomiej:Bartłomieju bartosz:Bartoszu
błażej:Błażeju bogdan:Bogdanie bogusław:Bogusławie bolek:Bolku bolesław:Bolesławie borys:Borysie
bruno:Bruno cezary:Cezary czesław:Czesławie damian:Damianie daniel:Danielu darek:Darku
dariusz:Dariuszu dawid:Dawidzie denis:Denisie dominik:Dominiku dorian:Dorianie edek:Edku
edward:Edwardzie emil:Emilu ernest:Erneście eryk:Eryku fabian:Fabianie feliks:Feliksie filip:Filipie
franciszek:Franciszku franek:Franku franio:Franiu gabriel:Gabrielu gracjan:Gracjanie
grzegorz:Grzegorzu grzesiek:Grześku gustaw:Gustawie heniek:Heńku henryk:Henryku hubert:Hubercie
hugo:Hugo ignacy:Ignacy igor:Igorze irek:Irku ireneusz:Ireneuszu iwo:Iwo jacek:Jacku jakub:Jakubie
jan:Janie janek:Janku janusz:Januszu jarek:Jarku jarosław:Jarosławie jaś:Jasiu jeremi:Jeremi
jerzy:Jerzy jędrzej:Jędrzeju józef:Józefie józek:Józku julian:Julianie jurek:Jurku kacper:Kacprze
kajetan:Kajetanie kamil:Kamilu karol:Karolu karolek:Karolku kazik:Kaziku kazimierz:Kazimierzu
konrad:Konradzie kordian:Kordianie kornel:Kornelu krystian:Krystianie krzysiek:Krzyśku
krzysztof:Krzysztofie krzyś:Krzysiu ksawery:Ksawery kuba:Kubo kubuś:Kubusiu lech:Lechu leon:Leonie
leonard:Leonardzie leszek:Leszku lucjan:Lucjanie ludwik:Ludwiku łukasz:Łukaszu maciej:Macieju
maciek:Maćku maks:Maksie maksymilian:Maksymilianie marcel:Marcelu marceli:Marceli marcin:Marcinie
marek:Marku marian:Marianie mariusz:Mariuszu mateusz:Mateuszu michał:Michale michaś:Michasiu
mieczysław:Mieczysławie mieszko:Mieszko mikołaj:Mikołaju miłosz:Miłoszu mirek:Mirku
mirosław:Mirosławie natan:Natanie nataniel:Natanielu nikodem:Nikodemie norbert:Norbercie olaf:Olafie
olek:Olku oliwer:Oliwerze oliwier:Oliwierze oskar:Oskarze patryk:Patryku paweł:Pawle
pawełek:Pawełku piotr:Piotrze piotrek:Piotrku piotruś:Piotrusiu przemek:Przemku
przemysław:Przemysławie radek:Radku radosław:Radosławie rafał:Rafale remigiusz:Remigiuszu
robert:Robercie roch:Rochu roman:Romanie rysiek:Ryśku ryszard:Ryszardzie sebastian:Sebastianie
sergiusz:Sergiuszu seweryn:Sewerynie sławek:Sławku sławomir:Sławomirze stanisław:Stanisławie
staszek:Staszku staś:Stasiu stefan:Stefanie sylwek:Sylwku sylwester:Sylwestrze szczepan:Szczepanie
szymon:Szymonie tadeusz:Tadeuszu teodor:Teodorze tobiasz:Tobiaszu tomasz:Tomaszu tomek:Tomku
tymon:Tymonie tymoteusz:Tymoteuszu waldek:Waldku waldemar:Waldemarze wiesiek:Wieśku
wiesław:Wiesławie wiktor:Wiktorze witold:Witoldzie władysław:Władysławie włodzimierz:Włodzimierzu
wojciech:Wojciechu wojtek:Wojtku zbigniew:Zbigniewie zbyszek:Zbyszku zdzisław:Zdzisławie
zenon:Zenonie zygmunt:Zygmuncie
`;

const MAPA = new Map(PARY.trim().split(/\s+/).map((p) => p.split(':')));

// „ania kowalska” → „Ania Kowalska”, „ANNA-MARIA” → „Anna-Maria”
export function ladnie(imie) {
  return String(imie || '')
    .trim()
    .toLocaleLowerCase('pl')
    .replace(/(^|[\s'-])(\p{L})/gu, (_, a, b) => a + b.toLocaleUpperCase('pl'));
}

export function wolacz(imie) {
  const pierwsze = String(imie || '').trim().split(/\s+/)[0] || '';
  if (!pierwsze) return '';
  return MAPA.get(pierwsze.toLocaleLowerCase('pl')) || ladnie(pierwsze);
}
