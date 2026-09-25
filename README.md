# Site du Dr Stéphan Houyoux — Centre de Liposculpture de Vich

Site statique (HTML, CSS, JavaScript), sans dépendance ni étape de build. Prêt pour GitHub Pages.

## Pages

| Fichier | Page |
|---|---|
| `index.html` | Accueil (vidéo du Léman en fond) |
| `presentation.html` | Le docteur |
| `lipoedeme.html` | Lipœdème |
| `liposculpture.html` | Liposculpture N.I.L. |
| `cellulite.html` | Cellulite |
| `formations.html` | Formations pour médecins |
| `clinique.html` | Clinique et locaux à louer |
| `belgique.html` | Consultations en Belgique |
| `contact.html` | Contact et demande de rendez-vous |
| `confidentialite.html` | Confidentialité et cookies |

## Mettre en ligne sur GitHub Pages

1. Créer un dépôt sur GitHub (ex. `dr-houyoux-site`).
2. Glisser tout le contenu de ce dossier dans le dépôt (bouton « Add file » > « Upload files »), puis valider.
3. Dans le dépôt : Settings > Pages > Source : « Deploy from a branch », branche `main`, dossier `/ (root)`.
4. Le site est en ligne après une minute à l'adresse indiquée.
5. Domaine : ajouter `dr-houyoux.ch` dans Settings > Pages > Custom domain, puis configurer le DNS chez le registrar (enregistrements A vers GitHub Pages).

## Formulaires

Les formulaires (séance d'information et contact) sont prêts pour Formspree :

1. Créer un compte sur formspree.io et un formulaire.
2. Remplacer `VOTRE_ID` par l'identifiant du formulaire dans `index.html`, `lipoedeme.html` et `contact.html` (rechercher `formspree.io/f/VOTRE_ID`).
3. Tant que `VOTRE_ID` est présent, un envoi affiche un message « Formulaire en démonstration ».

L'envoi de photos par le formulaire de contact nécessite une offre payante de Formspree. Sinon, retirer le champ photos et inviter à les envoyer par e-mail.

## Contenus à compléter

Les passages sur fond jaune (`class="todo"`) et les pastilles « À valider » (`class="chip-todo"`) sont à remplacer par le texte exact de l'ancien site ou à faire valider par le Dr Houyoux. Les rechercher dans les fichiers avec `todo`.

Photos à fournir : portrait du docteur, bloc opératoire, salle de consultation, visuels des interventions, formation au bloc. Les emplacements sont des blocs `media-box` et `visual`.

## Vidéo

- `assets/video/leman-1080.mp4` (ordinateur) et `leman-720.mp4` (mobile), compressées depuis l'original 4K.
- `assets/img/leman-poster.jpg` s'affiche avant le chargement, et à la place de la vidéo si le visiteur a activé la réduction des animations ou l'économie de données.
- La vidéo montre Lavaux. Vérifier que la licence Canva couvre l'usage sur un site web.

## Couleurs

Définies dans `assets/css/style.css` (`:root`) : vert profond `#173A33`, vert `#2F7A68`, menthe `#7CCBA9`, menthe clair `#E7F4EE`.
