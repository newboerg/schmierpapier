# Schmierpapier

[Deutsch](README.md) · [English](README.en.md) · **Français**

**Essayer maintenant :** [Démo en ligne dans le navigateur](https://htmlpreview.github.io/?https://github.com/newboerg/schmierpapier/blob/main/schmierpapier.html) – sans téléchargement. Pour une utilisation hors connexion, télécharger le fichier HTML comme indiqué ci-dessous.

**Du papier de calcul numérique pour les personnes qui ne peuvent pas utiliser de papier ordinaire en cours de mathématiques.**

Schmierpapier offre un espace pour calculer, essayer et dessiner directement dans le navigateur. Il s’adresse notamment aux élèves pour qui écrire ou dessiner sur papier est impossible ou difficile en raison de limitations motrices, de mouvements involontaires ou d’autres besoins individuels.

L’application vise à favoriser le travail autonome en cours de mathématiques : le clavier et la souris permettent d’écrire les calculs dans des cases, de disposer clairement les fractions et de réaliser des constructions géométriques avec des outils numériques. De nombreuses fonctions sont accessibles par des boutons, sans devoir utiliser une combinaison de touches pour chaque action.

Par **M. Neuberg de Tech-IT** · Version **0.3**

## Pour commencer

1. Télécharger [schmierpapier.html](schmierpapier.html). Sur GitHub, ouvrir le fichier et choisir **« Download raw file »**.
2. Ouvrir le fichier HTML téléchargé dans un navigateur récent, par exemple par un double-clic.
3. Cliquer sur une case et commencer à écrire. L’**Aide** intégrée décrit toutes les fonctions et tous les raccourcis. Le **Tutoriel** présente les principaux outils à travers des exercices pratiques.

Aucune installation, aucun compte ni serveur n’est nécessaire. L’application tient dans un seul fichier HTML. JavaScript, polices, traductions, aide et tutoriel sont intégrés ; tout fonctionne hors connexion.

## Les possibilités de Schmierpapier

### Calculer dans des cases

- Papier quadrillé A4 avec des cases de 5 mm et des lignes de marge.
- Un caractère normal par case ; navigation avec les flèches ou la souris.
- Saisie des chiffres avec les touches numériques du haut ou le pavé numérique, et des lettres avec le clavier.
- Police manuscrite intégrée et quatre couleurs de stylo : noir, bleu, vert et rouge.
- Exposants, puissances à plusieurs chiffres, indices et retenues, avec des modes d’écriture persistants.
- Parenthèses, crochets et accolades, également en double hauteur sur deux cases.
- Signes égal spéciaux entre deux cases superposées pour les calculs de fractions.
- Boutons pour les intégrales, les lettres grecques, `&` et `%`.
- Signes de calcul utilisant `·` pour la multiplication et `:` pour la division.

### Dessiner et surligner

- Traits horizontaux et verticaux sur papier quadrillé.
- Traits obliques également possibles sur papier millimétré, avec alignement tous les 1 mm.
- Prolonger des traits sans créer de portions en double ; effacer une portion en repassant exactement dessus.
- Surligneurs rose, jaune fluo et vert fluo.
- Gomme pour le surlignage et les traits dessinés. Suppr ou Retour arrière efface les caractères écrits.
- Copier des zones contenant des caractères, couleurs et dessins, ou les déplacer avec les ciseaux.
- Annuler et rétablir.

### Outils de géométrie

- **Équerre :** transparente et à l’échelle du papier. Saisir le zéro pour la déplacer, un sommet pour la tourner, et maintenir le bouton droit pour tracer le long de ses bords. Un aperçu rouge pointillé rend le trait courant visible. En vue Double page, l’équerre peut être déplacée directement sur l’autre page.
- **Compas :** placer le centre, choisir librement le rayon et maintenir le bouton droit pour tracer des cercles ou des arcs. Un arc réalisé en un geste continu peut être effacé en entier.
- **Axes gradués et axes de coordonnées :** tracer horizontalement ou verticalement avec une flèche et des graduations. Lorsque des axes se croisent à angle droit, les graduations s’alignent sur l’origine commune. Les valeurs sont saisies à la main ; aucun nombre n’est inséré automatiquement. Après deux axes tracés, l’application revient à l’outil précédent.

### Pages et affichage

- Plusieurs pages dans un document, affichées seules ou en double page.
- Ajouter directement des pages quadrillées ; choisir le papier millimétré avec la petite flèche voisine.
- Le type de papier est fixé à la création de chaque page. Les deux types peuvent coexister dans un document.
- Sur papier millimétré, les outils concernés s’alignent tous les 1 mm. Les cases d’écriture restent de 5 mm.
- Zoom, adaptation automatique à la largeur de la fenêtre et plein écran.
- Interface, infobulles, aide et tutoriel en **allemand, anglais et français**. Au premier démarrage, une langue du navigateur est choisie si elle est prise en charge ; un choix manuel est mémorisé dans le navigateur si le stockage est autorisé.

## Enregistrer et partager

- **Enregistrer .schmier** télécharge un fichier modifiable contenant toutes les pages et leur contenu. **Charger un fichier** permet de le rouvrir plus tard.
- **Exporter en PDF** produit un document A4 avec toutes les pages existantes. Les pages du PDF sont des images ; leur texte n’est pas sélectionnable comme du texte PDF ordinaire.
- **Imprimer** ouvre la boîte de dialogue du navigateur. Pour des dessins aux mesures exactes, choisir A4 et la taille réelle ou 100 %.
- Après accord, l’application essaie de sauvegarder automatiquement dans le stockage local du navigateur. Sa disponibilité pour un fichier HTML local dépend du navigateur et de ses paramètres. Télécharger un fichier `.schmier` permet de conserver une sauvegarde indépendante.

L’application ne transmet pas les calculs à un serveur. Changer de langue ne modifie ni les textes saisis, ni les valeurs des graduations, ni les dessins.

## Stockage du navigateur et consentement

Au premier démarrage, l’application demande si les documents et préférences (langue, affichage et zoom) peuvent être enregistrés localement dans le navigateur. Elle ne crée aucun cookie. Ces données et l’accord lui-même sont enregistrés uniquement après consentement.

Avec **« Ne pas enregistrer »**, tout reste seulement en mémoire jusqu’à la fermeture ou au rechargement de la page. Les anciennes données de cette application sont supprimées du navigateur. Le refus n’est pas enregistré ; la question revient donc au prochain démarrage. Le **bouton de stockage en forme de bouclier dans l’en-tête** permet de changer de décision à tout moment. Les téléchargements `.schmier` et PDF explicitement demandés ainsi que l’impression restent possibles.

La demande de consentement utilise la langue préférée prise en charge du navigateur, indépendamment de la langue de l’application. Elle comprend les **24 langues officielles de l’UE**, avec l’anglais par défaut. Le reste de l’application reste disponible en allemand, anglais et français.

## Quelques raccourcis utiles

| Saisie | Fonction |
| --- | --- |
| Flèches | Se déplacer d’une case |
| Entrée | Aller au début de la ligne suivante |
| Entrée du pavé numérique | Écrire `=` |
| Maj + chiffre | Écrire un chiffre en exposant |
| Ctrl + chiffre | Écrire un indice ou une retenue |
| Ctrl + Entrée / Maj + Entrée | Signe égal sur la limite inférieure / supérieure de la case |
| Ctrl + Z | Annuler |
| Ctrl + Y | Rétablir |
| Ctrl + S | Télécharger un fichier `.schmier` |
| F1 | Ouvrir l’aide |

L’aide intégrée, avec recherche, contient les instructions complètes. Le tutoriel utilise un document d’exercice séparé puis restaure le document personnel.

## Développement

L’application reste volontairement dans un seul fichier HTML. HTML, CSS et JavaScript sont mis en forme pour faciliter la lecture ; des commentaires de section expliquent la structure du document, les coordonnées, les outils, le stockage et les traductions. Les polices intégrées restent des données Base64 compactes. Aucune compilation n’est nécessaire. Les changements importants sont répercutés ensemble dans les trois README et les textes d’aide concernés.

Le quadrillage à l’écran utilise une couche SVG continue afin que les lignes restent régulières aux différents niveaux de zoom dans Firefox.

## Licence

Le code de l’application est distribué sous la **GNU General Public License, version 3 (GPL-3.0-only)**. Le texte intégral figure dans [LICENSE](LICENSE).

Les polices intégrées conservent leurs propres licences : la version modifiée de [Caveat](https://github.com/googlefonts/caveat) sous SIL Open Font License 1.1, et la [police DejaVu](https://dejavu-fonts.github.io/) selon ses conditions de licence applicables. Les mentions de copyright et de licence sont conservées dans les métadonnées des polices intégrées.
