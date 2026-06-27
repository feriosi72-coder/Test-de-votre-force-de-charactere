# Script d'installation automatique pour ForceVie (Windows)

Write-Host "--- Installation de ForceVie ---" -ForegroundColor Cyan

# 1. Vérification de Node.js
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Erreur : Node.js n'est pas installé. Veuillez l'installer sur https://nodejs.org/" -ForegroundColor Red
    exit
}

# 2. Installation des dépendances
Write-Host "1. Installation des dépendances npm..." -ForegroundColor Yellow
npm install

# 3. Configuration de l'environnement
if (!(Test-Path .env)) {
    Write-Host "2. Création du fichier .env..." -ForegroundColor Yellow
    $url = Read-Host "Entrez votre VITE_SUPABASE_URL"
    $key = Read-Host "Entrez votre VITE_SUPABASE_ANON_KEY"
    "VITE_SUPABASE_URL=$url`nVITE_SUPABASE_ANON_KEY=$key" | Out-File -FilePath .env -Encoding utf8
} else {
    Write-Host "2. Le fichier .env existe déjà. Passage à l'étape suivante." -ForegroundColor Gray
}

# 4. Finalisation
Write-Host "--- Installation terminee ! ---" -ForegroundColor Green
Write-Host "L'application va s'ouvrir sur http://localhost:5173" -ForegroundColor Cyan

$start = Read-Host "Voulez-vous lancer le serveur et ouvrir la page maintenant ? (o/n)"
if ($start -eq "o") {
    Write-Host "Demarrage du serveur... Veuillez patienter quelques secondes." -ForegroundColor Gray
    # Ouvre le navigateur par defaut
    Start-Process "http://localhost:5173"
    # Lance le serveur
    npm run dev
}
