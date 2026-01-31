# FixIt - System Zarządzania Zgłoszeniami Serwisowymi

**FixIt** to nowoczesna aplikacja webowa typu Fullstack zaprojektowana do efektywnego zarządzania usterkami, zgłoszeniami serwisowymi i komunikacją między użytkownikami a działem technicznym. Projekt wyróżnia się wysoką dbałością o estetykę (Deep Dark Mode) oraz solidnymi fundamentami architektonicznymi.

## Główne Założenia projektu
Aplikacja została stworzona, aby uprościć proces raportowania problemów technicznych. Zapewnia przejrzysty wgląd w status zgłoszeń, priorytetyzację zadań oraz responsywny interfejs, który pozwala na pracę zarówno na urządzeniach stacjonarnych, jak i mobilnych.

## 🛠 Stack Technologiczny

### Frontend
* **React 19** - UI zbudowany w oparciu o komponenty funkcyjne i nowoczesne hooki.
* **Mantine UI v8** - Wykorzystanie zaawansowanego systemu motywów do stworzenia unikalnego, głębokiego interfejsu Dark Mode (OLED-friendly).
* **Redux Toolkit & RTK Query** - Centralne zarządzanie stanem aplikacji oraz zoptymalizowana komunikacja z API.
* **TypeScript** - Statyczne typowanie w celu zapewnienia najwyższej jakości kodu i łatwego utrzymania.
* **React Router** - Deklaratywne podejście do nawigacji wewnątrz aplikacji.

### Backend
* **.NET 8/9** - Wydajna i bezpieczna platforma serwerowa.
* **Clean Architecture** - Separacja logiki biznesowej od szczegółów implementacyjnych (Domain, Application, Infrastructure, API).
* **Entity Framework Core** - Zaawansowane mapowanie obiektowo-relacyjne (ORM).
* **PostgreSQL** - Niezawodna relacyjna baza danych.

## System Projektowy (Theming)
Kluczowym elementem warstwy wizualnej jest autorski motyw **Midnight Dark**, zdefiniowany wewnątrz Mantine Providera. 

* **Elevation System:** Wykorzystanie warstwowości (różne odcienie ciemnego grafitu) zamiast płaskiej czerni, co poprawia czytelność i hierarchię elementów.
* **Branded Colors:** Dedykowana paleta `fixit-blue` pełniąca rolę koloru przewodniego.
* **Semantic Feedback:** Wyraźne kolory statusów (Success, Error, Warning) zoptymalizowane pod kątem wysokiego kontrastu w ciemnym otoczeniu.

---

## 💻 Uruchomienie Projektu

### Wymagania wstępne
* **Node.js** (v18 lub nowszy)
* **.NET SDK** (v8 lub nowszy)

### Instalacja i start (Frontend)
1. Wejdź do katalogu frontendu:

```bash
cd FixIt-frontend
```
Zainstaluj biblioteki:

```bash
npm install
```
Uruchom serwer deweloperski:

```bash
npm run dev
```
Instalacja i start (Backend)
Wejdź do katalogu backendu:

```bash
cd FixIt-backend
```
Przywróć paczki NuGet:

```bash
dotnet restore
```
Uruchom projekt:

```bash
dotnet run --project src/FixIt.Api
```
Projekt rozwijany z pasją do czystego kodu i nowoczesnego designu.
