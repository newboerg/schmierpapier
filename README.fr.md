# Schmierpapier

[Deutsch](README.md) · [English](README.en.md) · **Français**

Modifications : [Journal des modifications](CHANGELOG.fr.md).

**Essayer maintenant :** [Démo en ligne dans le navigateur](https://htmlpreview.github.io/?https://github.com/newboerg/schmierpapier/blob/main/schmierpapier.html) – sans téléchargement. Pour une utilisation hors connexion, télécharger le fichier HTML comme indiqué ci-dessous.

**Du papier de calcul numérique pour les personnes qui ne peuvent pas utiliser de papier ordinaire en cours de mathématiques.**

**Important : Schmierpapier n’est pas une calculatrice et ne fait aucun calcul à la place des élèves.** Il ne calcule pas de résultats et ne résout pas automatiquement les exercices. Les élèves élaborent eux-mêmes leurs démarches, étapes intermédiaires et solutions ; l’application fournit du papier numérique et des outils pour écrire et dessiner.

Schmierpapier offre un espace pour calculer, essayer et dessiner directement dans le navigateur. Il s’adresse notamment aux élèves pour qui écrire ou dessiner sur papier est impossible ou difficile en raison de limitations motrices, de mouvements involontaires ou d’autres besoins individuels.

L’application vise à favoriser le travail autonome en cours de mathématiques : le clavier et la souris permettent d’écrire les calculs dans des cases, de disposer clairement les fractions et de réaliser des constructions géométriques avec des outils numériques. De nombreuses fonctions sont accessibles par des boutons, sans devoir utiliser une combinaison de touches pour chaque action.

Par **M. Neuberg de Tech-IT** · Version **0.4**

Site du projet : [schmierpapier.org](https://schmierpapier.org). Le logo dans l’en-tête de l’application l’ouvre dans un nouvel onglet.

## Nouveautés de la v0.4

- Racines avec une barre prolongeable exactement et menu de comparaison à côté de `=` ; Ctrl/Maj produisent des formes de double hauteur.
- Lettres grecques par le bouton π et son menu. Maintenir 8/9 ouvre les menus de parenthèses, P les lettres grecques et Entrée les comparaisons.
- Traits au clavier avec aperçu rouge en pointillés : Gauche+Droite pour l’horizontale, Haut+Bas pour la verticale. La case actuelle reste incluse ; les traits horizontaux commencent en bas.
- Appuis prolongés pour stylos, exposants/indices, gomme de zone, copie, découpe, pages, affichage et PDF. Les modes actifs pulsent ; Ctrl/Maj affiche immédiatement un aperçu jaune.
- Entrée reprend à la colonne choisie par navigation ou clic. La détection des coins suit le zoom du papier et du navigateur.
- Tutoriel révisé avec alternatives souris/clavier et « 3 ≠ π », sans exercices de surligneur ni gomme. Il explique Ctrl+S, PDF avec E, affichage avec D et sortie avec Échap.
- Signature « Par Benni ♥ Kirstin » en pied de page, avec `&` dans le cœur.

## Pour commencer

1. Télécharger [schmierpapier.html](schmierpapier.html). Sur GitHub, ouvrir le fichier et choisir **« Download raw file »**.
2. Ouvrir le fichier HTML téléchargé dans un navigateur récent, par exemple par un double-clic.
3. Cliquer sur une case et commencer à écrire. L’**Aide** intégrée décrit toutes les fonctions et tous les raccourcis. Le **Tutoriel** présente les principaux outils à travers des exercices pratiques.

Aucune installation, aucun compte ni serveur n’est nécessaire. L’application tient dans un seul fichier HTML. JavaScript, polices, traductions, aide et tutoriel sont intégrés ; tout fonctionne hors connexion.

**Conseil matériel :** Un clavier de portable sans pavé numérique complet peut être plus difficile à utiliser si certaines fonctions nécessitent des combinaisons avec Fn. Un clavier complet avec pavé numérique séparé est recommandé ; un clavier externe peut être branché sur le portable.

Le tutoriel présente le pavé numérique à l’écran dès le début ; son utilisation reste ensuite facultative. Appuie sur **N** pour passer son ouverture ; ce raccourci concerne uniquement le tutoriel.

Un pavé numérique déplaçable est accessible dans l’en-tête. Il reste au-dessus du papier et conserve le focus dans le champ actif lors des clics ; le reste de la zone de travail reste utilisable.

## Les possibilités de Schmierpapier

### Calculer dans des cases

- Barrer des facteurs : sélectionner une zone avec un aperçu rouge en pointillés et la barrer en diagonale dans la couleur du stylo ; Échap annule.
- Papier quadrillé A4 avec des cases de 5 mm et des lignes de marge.
- Un caractère normal par case ; navigation avec les flèches ou la souris.
- Saisie des chiffres avec les touches numériques du haut ou le pavé numérique, et des lettres avec le clavier.
- Police manuscrite intégrée et quatre couleurs de stylo : noir, bleu, vert et rouge.
- Exposants, puissances à plusieurs chiffres, indices et retenues, avec des modes d’écriture persistants. Les modes actifs pulsent ; les animations réduites utilisent un contour fixe.
- Parenthèses, crochets, accolades et chevrons par boutons principaux et menus, aussi en double hauteur sur deux cases.
- Racines et signes de comparaison comme `=`, `≠`, `<`, `>`, `≤`, `≥` et `≈`, aussi en double hauteur.
- Signes égal spéciaux entre deux cases superposées pour les calculs de fractions.
- Boutons pour les intégrales, les lettres grecques, `&` et `%`. Le bouton π insère Pi ; sa flèche ou un appui prolongé sur P dans une case ouvre le menu grec. Flèches et Entrée choisissent, Échap ferme ; un appui court sur P écrit toujours p. Ctrl/Maj insèrent un indice/exposant.
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
- **Compas :** placer le centre, choisir librement le rayon et maintenir le bouton droit pour tracer des cercles ou des arcs. Un arc réalisé en un geste continu peut être effacé en entier. Pendant le choix du rayon, l’équerre peut être affichée au centre : le bouton de l’équerre pulse pour signaler ce guide. Celui-ci tourne avec le pointeur et disparaît lorsque le rayon est confirmé.
- **Axes gradués et axes de coordonnées :** tracer horizontalement ou verticalement avec une flèche et des graduations. Lorsque des axes se croisent à angle droit, les graduations s’alignent sur l’origine commune. Les valeurs sont saisies à la main ; aucun nombre n’est inséré automatiquement. Après deux axes tracés, l’application revient à l’outil précédent.

### Pages et affichage

- Plusieurs pages dans un document, affichées seules ou en double page. Un léger contour lumineux bleu indique la page active en vue Double page.
- Ajouter directement des pages quadrillées ; choisir le papier millimétré avec la petite flèche voisine.
- Le type de papier est fixé à la création de chaque page. Les deux types peuvent coexister dans un document.
- Sur papier millimétré, les outils concernés s’alignent tous les 1 mm. Les cases d’écriture restent de 5 mm.
- Zoom, adaptation automatique à la largeur de la fenêtre et plein écran. Le zoom avant centre la case sélectionnée. Maintenir + ou - change le zoom de dix points de pourcentage ; les appuis courts écrivent toujours les signes.
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
| Entrée | Ligne suivante dans la dernière colonne choisie par navigation ou clic |
| Entrée du pavé numérique | Écrire `=` |
| Maj + chiffre | Écrire un chiffre en exposant |
| Ctrl + chiffre | Écrire un indice ou une retenue |
| Ctrl + Entrée / Maj + Entrée | Signe égal sur la limite inférieure / supérieure de la case |
| Ctrl + Z | Annuler |
| Ctrl + Y | Rétablir |
| Ctrl + S | Télécharger un fichier `.schmier` |
| F1 | Ouvrir l’aide |
| Maintenir + / - | Agrandir/réduire de dix points de pourcentage ; le zoom avant centre la case sélectionnée |
| Maintenir 1–4 | Choisir le stylo : noir, bleu, vert, rouge |
| Maintenir 8 / 9 | Menu des formes ouvrantes / fermantes |
| Maintenir P | Menu grec, π présélectionné |
| Maintenir Entrée | Menu des signes de comparaison |
| Maintenir Maj seule puis relâcher | Activer/désactiver exposant |
| Maintenir Ctrl seule puis relâcher | Activer/désactiver indice |
| Gauche+Droite ensemble | Démarrer/confirmer un trait horizontal |
| Haut+Bas ensemble | Démarrer/confirmer un trait vertical |
| Maintenir R | Démarrer une zone de gomme ; maintenir à nouveau pour confirmer |
| Maintenir C / X | Sélectionner et confirmer la source à copier/couper ; Entrée ou un nouvel appui prolongé colle à destination |
| Maintenir Page précédente / suivante | Page précédente / suivante |
| Maintenir Inser | Choix du papier : quadrillé par défaut, ou millimétré |
| Maintenir Suppr | Supprimer la page après confirmation ; la dernière reste |
| Maintenir D | Alterner page simple/double |
| Maintenir E | Exporter toutes les pages en PDF |
| Échap | Annuler aperçu, sélection ou menu ; quitter le tutoriel |

**Maintenir** signifie environ 0,6 seconde dans une case active, sans touche de modification. Les saisies courtes de chiffres et lettres sont conservées ; Suppr court efface la case. Ctrl/Maj ne bascule le mode qu’au relâchement, sans autre touche ni clic. Ces raccourcis ne concernent pas les noms, recherches ou graduations. Pendant un trait au clavier, les flèches règlent sa longueur et son bord ; Échap annule l’aperçu.

L’aide intégrée, avec recherche, contient les instructions complètes. Le tutoriel utilise un document d’exercice séparé puis restaure le document personnel.

## Tutoriel

Le tutoriel utilise un document d’exercice séparé et préserve ton travail. La ligne 1, colonne 1 est active au départ ; la première cible est la ligne 6, colonne 5. Il présente tôt le pavé numérique déplaçable ; son utilisation reste ensuite facultative.

Il fait pratiquer `(12 + 8) · 3 = 60`, le soulignement, `2/4 = 1/2`, `2¹² = 4096`, `3 ≠ π`, copie, déplacement, affichage, enregistrement et PDF. Surligneurs et gomme restent disponibles dans l’application, mais ne font pas partie des exercices.

Clique sur les cases dorées ou rejoins-les avec les flèches, Tab et Début/Fin. Le tutoriel continue automatiquement à l’arrivée, sans Entrée. Les exercices de copie/déplacement collent aussi automatiquement à la bonne destination ; hors tutoriel, la confirmation manuelle reste nécessaire. Le tutoriel présente les alternatives souris/clavier pour stylos, parenthèses, exposants, traits, copie et déplacement. Les actions incorrectes sont bloquées et expliquées.

L’exercice d’enregistrement accepte Ctrl+S, ou ⌘+S sur Mac. Maintiens E pour exporter le PDF, ou D pour changer l’affichage dans l’exercice correspondant. Les téléchargements contiennent seulement les pages d’exercice. Échap termine le tutoriel et restaure ton document, même depuis l’écran final.

## Développement

L’application reste volontairement dans un seul fichier HTML. HTML, CSS et JavaScript sont mis en forme pour faciliter la lecture ; des commentaires de section expliquent la structure du document, les coordonnées, les outils, le stockage et les traductions. Les polices intégrées restent des données Base64 compactes. Aucune compilation n’est nécessaire. Les changements importants sont répercutés ensemble dans les trois README, les trois journaux des modifications et les textes d’aide et de tutoriel concernés.

Le quadrillage à l’écran utilise une couche SVG continue afin que les lignes restent régulières aux différents niveaux de zoom dans Firefox.

## Licence

Le code de l’application est distribué sous la **GNU General Public License, version 3 (GPL-3.0-only)**. Le texte intégral figure dans [LICENSE](LICENSE).

Les polices intégrées conservent leurs propres licences : la version modifiée de [Caveat](https://github.com/googlefonts/caveat) sous SIL Open Font License 1.1, et la [police DejaVu](https://dejavu-fonts.github.io/) selon ses conditions de licence applicables. Les mentions de copyright et de licence sont conservées dans les métadonnées des polices intégrées.
