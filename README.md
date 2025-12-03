# 🌍 Bars Backend (NestJS API)

Backend del aplikacije VSŠ Album, zgrajen z ogrodjem NestJS. Aplikacija omogoča upravljanje z lokacijami (dodajanje, urejanje, brisanje, pregledovanje), komentiranje, registracijo uporabnikov in nalaganje slik.

## 🚀 Funkcionalnosti

### Avtentikacija
- Registracija uporabnikov.
- Prijava z uporabo JWT (JSON Web Tokens).
- Zaščita endpointov z AuthGuard.

### Upravljanje Lokacij (CRUD)
- Dodajanje novih lokacij.
- Pregled vseh lokacij in posamezne lokacije (vključno s slikami).
- Urejanje in brisanje lokacij (dovoljeno samo lastniku).
- Kaskadno brisanje (izbris lokacije odstrani tudi pripadajoče slike in komentarje).

### Komentarji
- Dodajanje komentarjev na lokacije.
- Urejanje in brisanje komentarjev (dovoljeno samo avtorju).
- Pridobivanje komentarjev za specifično lokacijo.

### Nalaganje Slik
- Podpora za nalaganje več slik naenkrat (`multipart/form-data`) za določeno lokacijo.
- Validacija tipa datoteke (dovoljene samo slike: jpg, jpeg, png) in velikosti (max 5MB).
- Slike se shranjujejo lokalno v mapo `uploads` in so javno dostopne.

## 🛠️ Tehnologije
- **NestJS:** Progresivno Node.js ogrodje.
- **TypeORM:** ORM za delo s podatkovno bazo.
- **PostgreSQL:** Relacijska podatkovna baza.
- **Passport:** Middleware za avtentikacijo (uporabljen `passport-jwt` in `passport-local`).
- **Multer:** Middleware za nalaganje datotek.

## 📦 Namestitev in Zagon

### Predpogoji
- Node.js (priporočena verzija 16 ali novejša)
- PostgreSQL baza podatkov

### 1. Kloniranje repozitorija
```bash
git clone <URL_TVOJEGA_REPOZITORIJA>
cd bars-backend
```

### 2. Namestitev odvisnosti
```bash
npm install
```

### 3. Konfiguracija okolja (.env)
```bash
# Podatki za bazo
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tvoj_uporabnik
DB_PASSWORD=tvoje_geslo
DB_NAME=bars_db

# JWT Secret
JWT_SECRET=tvoj_skrivni_kljuc_123

```

### 4. Zagon aplikacije
```bash
npm run start:dev   # razvoj
npm run start:prod  # produkcija
```

Strežnik bo privzeto tekel na `http://localhost:3000`.

## 📂 Struktura API-ja (Endpoints)
Spodaj je seznam vseh razpoložljivih poti (endpoints), pridobljenih iz kontrolerjev.

### Avtentikacija (`/auth`)
- `POST /auth/login` - Prijava uporabnika (uporablja LocalGuard, vrne JWT token).
- `POST /auth/logout` - Odjava uporabnika.
- `GET /auth/profile` - Pridobi podatke o trenutno prijavljenem uporabniku (zahteva JWT).

### Uporabniki (`/users`)
- `POST /users` - Registracija novega uporabnika.
- `GET /users` - Seznam vseh uporabnikov.
- `GET /users/:id` - Podrobnosti uporabnika po ID-ju.
- `PATCH /users/:id` - Posodobi podatke uporabnika.
- `DELETE /users/:id` - Izbriši uporabnika.

### Lokacije (`/locations`)
- `GET /locations` - Seznam vseh lokacij.
- `GET /locations/:id` - Podrobnosti posamezne lokacije.
- `POST /locations` - Ustvari novo lokacijo (zahteva JWT).
- `PATCH /locations/:id` - Uredi lokacijo (zahteva JWT, samo lastnik).
- `DELETE /locations/:id` - Izbriši lokacijo (zahteva JWT, samo lastnik).
- `POST /locations/:id/images` - Naloži slike za lokacijo (zahteva JWT, `multipart/form-data`, ključ `files`, max 10 slik).

### Komentarji (`/comments`)
- `GET /comments/location/:id` - Pridobi vse komentarje za določeno lokacijo.
- `POST /comments` - Dodaj nov komentar (zahteva JWT).
- `PATCH /comments/:id` - Uredi komentar (zahteva JWT).
- `DELETE /comments/:id` - Izbriši komentar (zahteva JWT).

## 📝 Opombe
- **Slike:** Mapa `uploads` se samodejno uporablja za shranjevanje slik. Poskrbite, da ima aplikacija pravice za pisanje v to mapo.
- **Testiranje:** Za testiranje API klicev priporočam uporabo orodja Postman ali Insomnia.
- **Nalaganje slik v Postmanu:** Izberite metodo POST, zavihke **Body -> form-data**. Vnesite ključ `files`, izberite tip **File** in naložite eno ali več slik.