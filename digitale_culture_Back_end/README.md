# Projet Laravel - Digital-Culture-backend


## Liens des autres projets 

**Pour un fonctionnement complet, il est impératif d'installer et lancer également ces deux projets :**

- Frontend React : [Digital-Culture-frontend](https://github.com/Ellouzati-Mohammed/Digital-Culture-frontend)  
- Serveur Rasa : 

**Important** : Avant d’exécuter des commandes comme `php artisan migrate` ou `php artisan serve`, vous devez d'abord démarrer votre serveur de base de données (ex. : **WampServer**, **XAMPP**), afin que Laravel puisse se connecter correctement à MySQL.

## Description

Digital-Culture-backend est le service API REST développé avec Laravel.  
Il expose les endpoints nécessaires au frontend React pour gérer les utilisateurs, contenus et interactions.

---

## Prérequis

- PHP 8.0+  
- Composer  
- Base de données (MySQL)  

---

## Installation

1. **Cloner le dépôt :**  
   ```bash
   git clone https://github.com/Ellouzati-Mohammed/Digital-Culture-backend
   cd Digital-Culture-backend
   ```

 2. **Installer les dépendances Composer :** 
 ```bash
  composer install
 ```

 3. **Créer et configurer le fichier .env :** 
 **🔔 Important**  
Dans le fichier `.env`, assurez-vous de bien définir le **nom de votre base de données** ainsi que les informations de connexion nécessaires pour MySQL 

 ```bash
  cp .env.example .env
 ```

4. **Générer la clé d’application :** 
 ```bash
  php artisan key:generate
 ```

5. **Exécuter les migrations et seeders :** 
 **Important** vous devez d'abord démarrer votre serveur de base de données
 ```bash
  php artisan migrate --seed
 ```

6. **Lancer le serveur :** 
 ```bash
  php artisan serve
 ```


