#!/bin/bash

# Script d'installation automatique pour ForceVie (Linux/macOS)

echo -e "\033[0;36m--- Installation de ForceVie ---\033[0m"

# 1. Vérification de Node.js
if ! command -v node &> /dev/null
then
    echo -e "\033[0;31mErreur : Node.js n'est pas installé. Veuillez l'installer sur https://nodejs.org/\033[0m"
    exit
fi

# 2. Installation des dépendances
echo -e "\033[0;33m1. Installation des dépendances npm...\033[0m"
npm install

# 3. Configuration de l'environnement
if [ ! -f .env ]; then
    echo -e "\033[0;33m2. Création du fichier .env...\033[0m"
    read -p "Entrez votre VITE_SUPABASE_URL: " url
    read -p "Entrez votre VITE_SUPABASE_ANON_KEY: " key
    echo "VITE_SUPABASE_URL=$url" > .env
    echo "VITE_SUPABASE_ANON_KEY=$key" >> .env
else
    echo -e "\033[0;90m2. Le fichier .env existe déjà. Passage à l'étape suivante.\033[0m"
fi

# 4. Finalisation
echo -e "\033[0;32m--- Installation terminee ! ---\033[0m"
echo -e "\033[0;36mL'application va s'ouvrir sur http://localhost:5173\033[0m"

read -p "Voulez-vous lancer le serveur et ouvrir la page maintenant ? (o/n): " start
if [ "$start" == "o" ]; then
    echo -e "\033[0;90mDemarrage du serveur... Veuillez patienter quelques secondes.\033[0m"
    # Tentative d'ouverture du navigateur selon l'OS
    if command -v xdg-open &> /dev/null; then
        xdg-open "http://localhost:5173"
    elif command -v open &> /dev/null; then
        open "http://localhost:5173"
    fi
    # Lance le serveur
    npm run dev
fi
