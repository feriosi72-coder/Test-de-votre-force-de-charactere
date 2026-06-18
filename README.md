# ForceVie - Évaluation des Forces de Caractère

Une application web moderne et interactive qui aide les utilisateurs à découvrir et évaluer leurs forces de caractère personnelles en utilisant le cadre VIA Character Strengths. Répondez à 72 questions soigneusement élaborées pour identifier vos principales forces de caractère et obtenir des informations sur votre potentiel.

## Fonctionnalités

- **Questionnaire Interactif** : 72 questions couvrant 24 forces de caractère à travers les dimensions cognitive, émotionnelle et sociale
- **Notation Intelligente** : Algorithme de notation avancé qui calcule les classements percentiles et valide les réponses
- **Tableau de Bord des Résultats** : Présentation visuelle de vos principales forces avec des descriptions détaillées et des insights
- **Persistance des Données** : Sauvegarde optionnelle du profil avec nom et email
- **Export des Résultats** : Téléchargez vos résultats d'évaluation en PDF ou JSON
- **Design Responsive** : Interface moderne et élégante qui fonctionne sur ordinateur et mobile
- **Support du Mode Sombre** : Esthétique épurée avec une hiérarchie visuelle réfléchie

## Forces de Caractère Évaluées

L'évaluation mesure 24 forces de caractère organisées en trois dimensions :

**Forces Cognitives :** Curiosité, Créativité, Jugement, Amour de l'Apprentissage, Perspective

**Forces Émotionnelles :** Bravoure, Persévérance, Honnêteté, Zest, Appreciation de la Beauté

**Forces Sociales :** Amour, Gentillesse, Intelligence Sociale, Travail d'Équipe, Équité, Leadership, Pardon, Humilité, Prudence, Auto-régulation, Gratitude, Espoir, Humour, Spiritualité

## Stack Technique

- React 18 + TypeScript
- Vite (outil de build)
- Tailwind CSS (styling)
- Lucide React (icônes)
- jsPDF (génération PDF)
- Supabase (base de données)

## Démarrage Rapide

### Installation

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Configuration de l'Environnement

Créez un fichier `.env` :
```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

## Utilisation

1. Cliquez sur "Commencer l'Évaluation" pour démarrer
2. Répondez aux 72 questions sur une échelle de 1 à 5
3. Enregistrez votre profil (optionnel)
4. Consultez vos principales forces de caractère avec des insights détaillés
5. Téléchargez vos résultats en PDF ou JSON
6. Recommencez pour refaire l'évaluation

## Structure du Projet

```
src/
├── components/          # Composants UI
├── data/               # Questions et définitions des forces
├── lib/                # Client Supabase
├── utils/              # Algorithme de notation
├── types/              # Interfaces TypeScript
└── App.tsx             # Composant principal

supabase/migrations/    # Schéma de base de données
```

## Base de Données

Les résultats sont stockés de manière sécurisée dans Supabase avec :
- Nom et email de l'utilisateur
- 72 réponses aux questions
- Scores de forces calculés
- Classements percentiles

## Fonctionnalité d'Export

Les utilisateurs peuvent télécharger leurs résultats d'évaluation en deux formats :

- **PDF** : Rapport professionnel avec les 5 principales forces, plans d'action et classement complet des forces
- **JSON** : Export des données brutes pour analyse approfondie ou archivage

## Scripts Disponibles

```bash
npm run dev        # Serveur de développement
npm run build      # Build de production
npm run preview    # Aperçu du build
npm run lint       # ESLint
npm run typecheck  # Vérification TypeScript
```

## Support des Navigateurs

Chrome/Edge 90+, Firefox 88+, Safari 14+, Navigateurs mobiles

## Licence

MIT
