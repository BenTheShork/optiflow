# Optiflow
## Opis projekta
### Člani
Na tem projektu delamo 4 študenta ki študirajo na FERI-ju. Mi smo Vlado Solakov, Olga Ivkovič, Ivan Sergejev. Vodja ekipe je pa Vlado Solakov. Na backend dela Vlado, na frontend pa delajo Olga in Ivan.

### Opis 
Naša spletna aplikacija bo zasnovana tako, da podjetjem vseh velikosti pomaga izboljšati svoje procese in povečati učinkovitost. Uporabnik lahko najprej ustvari en ali vec projektov. Za izbrani projekt pa ustvari potek dela procesa, aktivnosti za vsak proces in podrobnosti za vsaka aktivnost, nato pa isti proces izboljša z urejanjem istega procesa kot novo izboljšano različico. Na splošno je naša vizija opolnomočiti podjetja, da delajo pametneje, ne težje, tako da jim zagotovimo orodja in vpoglede, ki jih potrebujejo za optimizacijo svojih procesov in doseganje ciljev.

### Naloga
Naloga je izdelat popolnoma funkcionalno stran za izpis delovnih nalog, dnevno spremljanje (vnos datumov montaže s časom odhoda, časom pričetka in konca dela ter časom prihoda) poteka montaže ter na koncu pregled porabljenih ur po posameznem projektu (delovnem nalogu), po posameznem monterju, ter tudi v določenem časovnem obdobju ter tudi konec/zaključek projekta (delovnega naloga)

## Specifikacije
### Tehnologije
- Laravel
- MySQL
- GitLab

### Razvojno okolje
- Visual studio code

### Sledenje poteku dela
- GitLab

## Način dela
Skupaj kot tim se pogovarjamo kaj je potrebno narediti.
Delo si razdelimo tako da ima vsaka oseba približno enako dela.
Napredek je pribelezen na Gitlabu in tamo spremljamo napredek projekta.
Tekom projekta če obstajajo težavo jih skupaj rešujemo.

## Zagon aplikacije (Online)
Nas frontend in backend so live na staging serveru in lahko dostopajo samo registrirani uporabniki: https://optiflow.gpc-hosting.com

## Zagon aplikacije (Lokalno)
Za lokalni zagon aplikacije najprej moramo prenesti projekt od github (https://gitlab.com/optiflow1/optiflow.git) na nas racunalnik, potem si prenesimo in instaliramo composer (https://getcomposer.org/download/), prenesemo tud bazo in posodobimo .env datoteko z ustreznimi podatkimi za bazo. Potem v terminalu damo composer install in za zagon backenda v terminalu napisemo php artisan serve.
