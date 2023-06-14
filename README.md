# Optiflow
## Opis projekta
Naša spletna aplikacija bo zasnovana tako, da podjetjem vseh velikosti pomaga izboljšati svoje procese in povečati učinkovitost. Uporabnik lahko najprej ustvari en ali vec projektov. Za izbrani projekt pa ustvari potek dela procesa, aktivnosti za vsak proces in podrobnosti za vsaka aktivnost, nato pa isti proces izboljša z urejanjem istega procesa kot novo izboljšano različico. Na splošno je naša vizija opolnomočiti podjetja, da delajo pametneje, ne težje, tako da jim zagotovimo orodja in vpoglede, ki jih potrebujejo za optimizacijo svojih procesov in doseganje ciljev.

## Specifikacije
### Tehnologije
- Laravel: PHP ogrodje za spletni razvoj.
- AngularJS: JavaScript ogrodje za dinamične spletne aplikacije.
- MySQL: Odprtokodni relacijski sistem upravljanja baz podatkov.
- GitLab: DevOps platforma za upravljanje verzij in projektov.
- Firebase: Googlova platforma za razvoj mobilnih in spletnih aplikacij.
- SonarQube: Odprtokodna platforma za neprekinjeno upravljanje kakovosti kode.
- bpmn.io: Spletni komplet orodij za modeliranje in izvajanje BPMN (poslovno procesno modeliranje in notacija) delovnih tokov.
- Cloudflare: Storitev za upravljanje spletnega prometa, varnost in dostopnost, ki deluje kot posrednik med spletnim mestom in uporabniki. Nudi večplastno zaščito pred napadi DDoS, zmanjšuje obremenitev strežnikov in povečuje hitrost dostave spletnih vsebin.

### Razvojno okolje
- Visual studio code

### Sledenje poteku dela
- GitLab

## Način dela
Skupaj kot tim se pogovarjamo kaj je potrebno narediti.
Delo si razdelimo tako da ima vsaka oseba približno enako dela.
Napredek je pribeležen na Gitlabu in tamo spremljamo napredek projekta.
Tekom projekta če obstajajo težavo jih skupaj rešujemo.

## Funkcionalnosti
1. **Avtentikacija uporabnika**: Uporabniki lahko varno ustvarijo račun in se prijavijo v aplikacijo. 
2. **Uporabniški vmesnik**: Služi kot centralizirano mesto, ki uporabnikom omogoča spremljanje, interakcijo in upravljanje različnih vidikov aplikacije.
3. **Upravljanje projektov**: Uporabniki lahko ustvarijo enega ali več projektov, kar jim zagotavlja centralizirano okolje za upravljanje vseh dejavnosti (kot so procesi, verzije, aktivnosti), povezanih z določenim projektom.
4. **Oblikovanje delovnega toka**: Uporabniki lahko ustvarijo delovne tokove za svoje projekte (BPMN), vključno z različnimi aktivnosti in podrobnostmi za vsako aktivnost. Prav tako lahko prilagodijo in uredijo delovne tokove, da ustrezajo njihovim potrebam.
5. **Izboljšanje procesa**: Uporabniki lahko pregledajo in izboljšajo svoje obstoječe poteke dela, ustvarijo nove, optimizirane različice in jih shranijo kot ločene različice za prihodnjo uporabo. 
6. **Analitika**: Aplikacija lahko uporabnikom ponudi vpoglede in analitiko o njihovih projektih.
7. **Zgodovino dnevnika dejavnosti**: Dnevnik dejavnosti uporabnika, znan tudi kot dnevnik uporabniške zgodovine, je zapis dejanj ali dogodkov, ki jih izvede uporabnik znotraj sistema ali aplikacije. Zajame in shranjuje informacije o dejavnostih in interakcijah posameznih uporabnikov

## Zagon aplikacije (Online)
Naš frontend in backend so live na staging serveru in lahko dostopajo samo registrirani uporabniki: https://optiflow.gpc-hosting.com

## Zagon aplikacije - Backend (Lokalno)
Za lokalni zagon backend aplikacije najprej moramo prenesti projekt od github (https://gitlab.com/optiflow1/optiflow.git) na nas računalnik, potem si prenesimo in instaliramo composer (https://getcomposer.org/download/), prenesemo tud bazo in najprej odpremo mapo backenda in posodobimo .env datoteko z ustreznimi podatkimi za bazo. Potem v terminalu izvajamo komando **composer install** in za zagon v terminalu izvajamo komando **php artisan serve**.

## Zagon aplikacije - Frontend (Lokalno)
Za lokalni zagon backend aplikacije najprej moramo prenesti projekt od github (https://gitlab.com/optiflow1/optiflow.git) na nas računalnik, potem si prenesimo in instaliramo NodeJS (https://nodejs.org/en/download), Potem v terminalu izvajamo komando **npm install** in za zagon frontenda v terminalu izvajamo **ng serve**.

## Avtorji 
- Vlado Solakov (vlado.solakov@student.um.si)
- Olga Ivkovič (olga.ivkovic@student.um.si)
- Ivan Sergejev  (ivan.sergejev@student.um.si)

**Univerza:** [Univerza v Mariboru](https://www.um.si/en/home-page/) </br>
**Fakulteta:** [Fakulteta za elektrotehniko, računalništvo in informatiko](https://feri.um.si/) </br>
**Smer:** Informatika in tehnologije komuniciranja </br>
**Skrbnik:** prof. dr. Maja Pušnik

&copy; 2023 Vse pravice pridržane.
