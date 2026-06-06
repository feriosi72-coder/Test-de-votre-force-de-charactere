# Projet : ForceVie - Test de Force de Caractère

Ce projet est une application web interactive permettant aux utilisateurs d'évaluer leurs forces de caractère basées sur le cadre VIA (Values in Action).

## Architecture Technique
- **Frontend** : React 18 avec TypeScript.
- **Build Tool** : Vite.
- **Styling** : Tailwind CSS.
- **Backend/Base de données** : Supabase.
- **Icônes** : Lucide React.
- **Export** : jsPDF pour la génération de rapports PDF.

## Conventions de Développement
- **Composants** : Utiliser des composants fonctionnels React avec des Hooks.
- **Types** : Typage strict avec TypeScript. Éviter l'utilisation de `any`.
- **Styling** : Utiliser exclusivement Tailwind CSS pour le design. Favoriser le responsive design.
- **État** : Gérer l'état local avec `useState`/`useContext` ou Supabase pour la persistance.
- **Qualité** : Respecter les règles ESLint définies dans le projet.

## Structure du Code
- `src/components/` : Composants UI réutilisables.
- `src/data/` : Définitions des questions et des forces.
- `src/lib/` : Configuration des services externes (ex: Supabase).
- `src/utils/` : Logique métier (calcul des scores, formatage).
- `src/types/` : Définitions d'interfaces et de types TypeScript.

## Flux de Travail
1. Rechercher la logique existante avant toute modification.
2. S'assurer que les nouveaux types sont documentés.
3. Vérifier la compatibilité mobile des changements d'interface.
4. Tester l'export PDF après modification des données de résultat.
