# Guide d'Installation et de Démarrage

Ce document détaille les étapes pour installer, configurer et lancer l'application.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

*   **Git** : Pour cloner le dépôt.
*   **Node.js** (v18 ou supérieur) et **npm** : Pour l'exécution locale.
*   **Docker** et **Docker Compose** : Pour l'exécution conteneurisée (optionnel).

## Configuration de l'Environnement

L'application nécessite une clé API pour le Chatbot (DeepSeek).

1.  Naviguez dans le dossier du code source :
    ```bash
    cd code
    ```

2.  **Configuration API** :
    Le fichier `.env` est fourni avec le projet et contient déjà la clé API nécessaire.
    > **Note** : Assurez-vous simplement que ce fichier est bien présent à la racine du dossier `code/`.

## Option 1 : Installation et Exécution Locale

1.  **Installation des dépendances** :
    Assurez-vous d'être dans le dossier `code/`.
    ```bash
    npm install
    ```

2.  **Lancement du serveur de développement** :
    ```bash
    npm run dev
    ```

3.  **Accès à l'application** :
    Ouvrez votre navigateur à l'adresse : [http://localhost:5173](http://localhost:5173)

## Option 2 : Exécution avec Docker

Cette méthode garantit un environnement isolé et identique pour tous les développeurs.

1.  **Lancement via Docker Compose** :
    Revenez à la racine du projet (où se trouve `docker-compose.yml`) et lancez :
    ```bash
    docker-compose up dev
    ```
    *Cela va construire l'image de développement et lancer le conteneur.*

2.  **Accès à l'application** :
    L'application sera accessible sur : [http://localhost:5173](http://localhost:5173)

3.  **Version de Production** :
    Pour tester la version de production (build optimisé servi par Nginx) :
    ```bash
    docker-compose up build
    ```
    Accessible sur : [http://localhost:8080](http://localhost:8080)

## Structure du Projet

*   `code/` : Contient tout le code source de l'application React.
    *   `src/` : Composants, pages, logique.
    *   `public/` : Assets statiques (modèles 3D, images).
*   `docker-compose.yml` : Orchestration des conteneurs Docker.

## Commandes Utiles

*   `npm run build` : Compile l'application pour la production (dans `code/dist`).
*   `npm run lint` : Vérifie la qualité du code avec ESLint.
*   `npm run preview` : Prévisualise le build de production localement.
