# Optiflow

## Project Description

Our web application is designed to help businesses of all sizes improve their processes and increase efficiency. Users can create one or more projects and define the workflow for each project, including activities and details for each activity. They can then improve the same process by editing it as a new version. Our vision is to empower companies to work smarter, not harder, by providing them with the tools and insights they need to optimize their processes and achieve their goals.

## Specifications

### Technologies

- Laravel: PHP framework for web development.
- AngularJS: JavaScript framework for dynamic web applications.
- MySQL: Open-source relational database management system.
- GitLab: DevOps platform for version and project management.
- Firebase: Google's platform for mobile and web app development.
- SonarQube: Open-source platform for continuous code quality management.
- bpmn.io: Web-based toolkit for modeling and executing BPMN (Business Process Model and Notation) workflows.
- Cloudflare: Service for managing web traffic, security, and accessibility, acting as a proxy between the website and users. Provides multi-layer DDoS attack protection, reduces server load, and increases the speed of delivering web content.

### Development Environment

- Visual Studio Code

### Workflow Tracking

- GitLab

### Work Method

As a team, we discuss what needs to be done and divide the work so that each person has approximately the same workload. Progress is recorded on GitLab, where we track the project's advancements. Throughout the project, if there are any issues, we work together to solve them.

## Features

- User Authentication: Secure account creation and login functionality for users.
- User Interface: Centralized place for users to monitor, interact, and manage various aspects of the application.
- Project Management: Users can create one or more projects, providing a centralized environment to manage all project-related activities (such as processes, versions, and activities).
- Workflow Design: Users can create workflows (BPMN) for their projects, including various activities and details for each activity. They can also customize and edit workflows to suit their needs.
- Process Improvement: Users can review and improve their existing workflows, create new optimized versions, and save them as separate versions for future use.
- Analytics: The application can offer users insights and analytics about their projects.
- Activity Log History: User activity log, also known as user history log, records actions or events performed by the user within the system or application. It captures and stores information about activities and interactions of individual users.

## Application Deployment (Online)

Our frontend and backend are live on the staging server and can only be accessed by registered users: [Optiflow Staging Server](https://optiflow.gpc-hosting.com)

## Application Deployment - Backend (Local)

To locally deploy the backend application, first, we need to clone the project from GitHub (https://gitlab.com/optiflow1/optiflow.git) to our computer. Then, install Composer (https://getcomposer.org/download/) and download the database. After that, open the backend folder and update the .env file with the appropriate database credentials. In the terminal, execute the command `composer install` and to run the backend, execute `php artisan serve` in the terminal.

## Application Deployment - Frontend (Local)

To locally deploy the frontend application, first, we need to clone the project from GitHub (https://gitlab.com/optiflow1/optiflow.git) to our computer. Then, install NodeJS (https://nodejs.org/en/download). In the terminal, execute the command `npm install` and to run the frontend, execute `ng serve` in the terminal.

## Authors

- Vlado Solakov (vlado.solakov@student.um.si)
- Olga Ivković (olga.ivkovic@student.um.si)
- Ivan Sergejev (ivan.sergejev@student.um.si)

## University

University of Maribor
Faculty of Electrical Engineering, Computer Science, and Informatics
Study Program: Computer Science and Communication Technologies

## Supervisor

Doc. Dr. Maja Pušnik

© 2023 All rights reserved.

Translated to English by Vanya



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
- Olga Ivković (olga.ivkovic@student.um.si)
- Ivan Sergejev  (ivan.sergejev@student.um.si)

**Univerza:** [Univerza v Mariboru](https://www.um.si/en/home-page/) </br>
**Fakulteta:** [Fakulteta za elektrotehniko, računalništvo in informatiko](https://feri.um.si/) </br>
**Smer:** Informatika in tehnologije komuniciranja </br>
**Skrbnik:** Doc. Dr. Maja Pušnik

&copy; 2023 Vse pravice pridržane.
