# ForceVie - Évaluation des Forces de Caractère

Une application web moderne et interactive qui aide les utilisateurs à découvrir et à évaluer leurs forces de caractère personnelles en utilisant le cadre VIA (Values in Action). Répondez à 72 questions soigneusement conçues pour identifier vos principales forces et débloquer des perspectives sur votre potentiel.

## Fonctionnalités

- **Questionnaire Interactif** : 72 questions couvrant 24 forces de caractère à travers des dimensions cognitives, émotionnelles et sociales.
- **Scoring Intelligent** : Algorithme de scoring avancé qui calcule les classements par centile et valide les réponses.
- **Tableau de Bord des Résultats** : Présentation visuelle de vos forces principales avec des descriptions détaillées et des conseils.
- **Persistance des Données** : Sauvegarde optionnelle du profil avec nom et email (mémorisation automatique de la progression).
- **Exportation des Résultats** : Téléchargez vos résultats sous format PDF enrichi ou JSON.
- **Design Réactif** : Interface magnifique et moderne qui fonctionne sur ordinateur et mobile.
- **Support Mode Sombre** : Esthétique épurée avec une hiérarchie visuelle réfléchie.

## Forces de Caractère Évaluées

L'évaluation analyse 24 forces de caractère organisées en trois dimensions :

**Forces Cognitives :** Curiosité, Créativité, Discernement, Amour d'apprendre, Perspective

**Forces Émotionnelles :** Bravoure, Persévérance, Honnêteté, Enthousiasme, Sens du beau

**Forces Sociales :** Amour, Bienveillance, Intelligence sociale, Travail d'équipe, Équité, Leadership, Pardon, Humilité, Prudence, Maîtrise de soi, Gratitude, Espoir, Humour, Sens de la vie

## Technologies Utilisées

- React 18 + TypeScript
- Vite (outil de build)
- Tailwind CSS (style)
- Lucide React (icônes)
- jsPDF (génération de PDF)
- Supabase (base de données)

## 🚀 Installation Rapide

Pour installer le projet sur un nouvel ordinateur, clonez le dépôt puis utilisez l'un des scripts d'automatisation fournis :

### Sur Windows (PowerShell)
1. Ouvrez PowerShell dans le dossier du projet.
2. Exécutez : `./setup.ps1` (ou double-cliquez sur `installer.bat`).

### Sur Linux / macOS (Bash)
1. Ouvrez un terminal dans le dossier du projet.
2. Exécutez : `chmod +x setup.sh && ./setup.sh`

Ces scripts s'occupent de :
1. Vérifier si Node.js est installé.
2. Installer toutes les dépendances (`npm install`).
3. Vous demander vos clés Supabase pour créer automatiquement le fichier `.env`.
4. Lancer le serveur et ouvrir l'application dans votre navigateur.

---

## Utilisation

1. Cliquez sur "Commencer le test gratuitement" pour démarrer.
2. Répondez aux 72 questions sur une échelle de 1 à 5.
3. Enregistrez votre profil (optionnel).
4. Consultez vos forces principales avec des conseils détaillés.
5. Téléchargez vos résultats en PDF ou JSON.
6. Recommencez pour passer à nouveau l'évaluation (bouton de réinitialisation disponible).

## Structure du Projet

```
src/
├── components/          # Composants UI
├── data/               # Définitions des questions et des forces
├── lib/                # Client Supabase
├── utils/              # Algorithme de scoring et export PDF
├── types/              # Interfaces TypeScript
└── App.tsx             # Composant principal

supabase/migrations/    # Schéma de la base de données
```

## Base de Données

Les résultats sont stockés de manière sécurisée dans Supabase avec :
- Nom et email de l'utilisateur
- Les 72 réponses aux questions
- Les scores de force calculés
- Les classements par centile

## Fonctionnalité d'Exportation

Les utilisateurs peuvent télécharger leurs résultats dans deux formats :

- **PDF** : Rapport professionnel avec les 5 forces signatures, des plans d'action (Travail/Vie) et le classement complet.
- **JSON** : Exportation des données brutes pour analyse ultérieure ou archivage.

## Scripts Disponibles

```bash
npm run dev        # Serveur de développement
npm run build      # Build pour la production
npm run preview    # Aperçu du build
npm run lint       # Analyse statique (ESLint)
npm run typecheck  # Vérification des types TypeScript
```

## Support Navigateur

Chrome/Edge 90+, Firefox 88+, Safari 14+, Navigateurs mobiles

## Licence

MIT
