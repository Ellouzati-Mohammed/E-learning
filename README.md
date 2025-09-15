

# Digital Culture - Projet regroupé

Ce projet regroupe trois parties principales :

## 1. Back-end API (Laravel)
Digital-Culture-backend est le service API REST développé avec Laravel. Il expose les endpoints nécessaires au frontend React pour gérer les utilisateurs, contenus et interactions. Il gère l’authentification, la gestion des cours, quiz, vidéos, PDF et activités.

### Prérequis
- PHP 8.0+
- Composer
- Base de données MySQL

### Installation
```bash
cd digitale_culture_Back_end
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

---

## 2. Front-end (React)
Digital-Culture-frontend est une application web moderne développée avec React. Elle permet aux utilisateurs d’accéder aux contenus, de s’authentifier, d’interagir avec le chatbot et de naviguer dans l’univers numérique proposé par le back-end. Elle utilise React Router pour la navigation et intègre le chatbot Rasa.

### Prérequis
- Node.js & npm
- Back-end Laravel lancé
- Serveur Rasa lancé

### Installation
```bash
cd digitale_culture_Front-end
npm install
npm start
```

---

## 3. Serveur Rasa (Chatbot)
Le serveur Rasa permet d’intégrer un chatbot intelligent pour assister les utilisateurs, répondre à leurs questions et enrichir l’expérience sur la plateforme. Il utilise le traitement du langage naturel (NLP) pour comprendre et dialoguer avec les utilisateurs.

### Prérequis
- Python 3.8+
- pip
- Rasa

### Installation
```bash
cd rasa
pip install rasa
rasa train
rasa run
```

---

## Notes d’intégration
- Lancer d’abord la base de données (MySQL)
- Démarrer le back-end Laravel
- Démarrer le serveur Rasa
- Démarrer le front-end React

Chaque partie doit être installée et lancée pour un fonctionnement complet.

