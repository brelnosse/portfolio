# Portfolio — Brel NOSSE

Portfolio d'élève ingénieur à 3iL : développement logiciel, data et Machine Learning.
Design néo-brutaliste, galerie mobile, easter egg caché et hall of fame branché sur le jeu [SEVUX](https://github.com/brelnosse/sevux).

## Stack

- **React 19 + TypeScript** (Create React App)
- CSS sur mesure, sans framework : système néo-brutaliste (palette, bordures, ombres décalées), polices Archivo Black, Space Grotesk et JetBrains Mono
- Font Awesome pour les icônes, EmailJS pour le formulaire de contact

## Ce qu'on y trouve

- Hero animé, sections À propos, compétences (infobulles), parcours, expériences et projets
- Projets : cube 3D sur ordinateur, galerie à faire défiler au doigt sur mobile
- **Easter egg** : un œuf à fissurer, un indice… et une page 404 qui se transforme en révélation animée (confettis, jeu jouable dans la page)
- **Hall of fame** : classement des joueurs de SEVUX, lu depuis l'API du jeu, dans le pied de page et sur la page de découverte

## Lancer en local

```bash
npm install
cp .env.example .env.local   # puis remplir les valeurs utiles
npm start                    # http://localhost:3000
```

```bash
npm run build                # build de production dans build/
```

## Configuration

Tout ce qui est propre à mon déploiement passe par des variables d'environnement (voir [.env.example](.env.example)). Aucune n'est obligatoire pour lancer le site :

| Variable | Sans elle |
|---|---|
| `REACT_APP_EMAILJS_SERVICE`, `REACT_APP_EMAILJS_TEMPLATE`, `REACT_APP_EMAILJS_PUBLIC_KEY` | le formulaire de contact affiche une erreur à l'envoi |
| `REACT_APP_CV_URL` | le bouton « Télécharger mon CV » est masqué |
| `REACT_APP_GA_ID` | aucun suivi Google Analytics |
| `REACT_APP_GAME_URL`, `REACT_APP_SCORES_API` | le jeu et le classement publics de SEVUX sont utilisés |

Les variables `REACT_APP_*` sont intégrées au JavaScript au moment du build : elles ne doivent jamais contenir de secret côté serveur.

## Le CV

Le CV contient mes coordonnées : il n'est **pas** dans ce dépôt. Il est généré localement puis déposé sur le serveur :

```bash
cp cv/contact.example.json cv/contact.local.json   # coordonnées, ignoré par git
python cv/generate_cv.py                           # → cv/out/CV_Brel_NOSSE.pdf (ignoré par git)
```

L'URL publique du fichier se renseigne ensuite dans `REACT_APP_CV_URL`.

## Déploiement (Coolify)

- Site statique : commande de build `npm run build`, dossier publié `build/`
- Cocher l'option **SPA** : toute adresse inconnue doit renvoyer `index.html`, sinon la page 404 animée (l'easter egg) ne s'affiche pas quand on tape une mauvaise URL
- Déclarer les variables d'environnement ci-dessus comme variables de build

## Crédits

Conçu et développé par **Brel NOSSE** avec React.
