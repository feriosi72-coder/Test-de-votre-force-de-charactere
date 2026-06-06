@echo off
TITLE Installation de ForceVie
echo ===========================================
echo   Lancement de l'installation ForceVie
echo ===========================================
echo.

:: Vérification des droits ou de l'existence du fichier
if not exist "setup.ps1" (
    echo Erreur : Le fichier setup.ps1 est introuvable dans ce dossier.
    pause
    exit /b
)

:: Exécution du script PowerShell avec contournement de la politique d'exécution pour cette session
powershell -NoProfile -ExecutionPolicy Bypass -File ".\setup.ps1"

echo.
echo ===========================================
echo   Processus termine.
echo ===========================================
pause
