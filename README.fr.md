# Schmierpapier

[Deutsch](README.md) · [English](README.en.md) · **Français**

Modifications : [Journal des modifications](CHANGELOG.fr.md).

**Essayer maintenant :** [Démo en ligne dans le navigateur](https://schmierpapier.org/schmierpapier.html) – sans téléchargement. Pour une utilisation hors connexion, télécharger le fichier HTML comme indiqué ci-dessous.

**Téléchargement direct :** [Télécharger le fichier HTML](https://schmierpapier.org/download.php).

**Du papier de calcul numérique pour les personnes qui ne peuvent pas utiliser de papier ordinaire en cours de mathématiques.**

**Important : Schmierpapier n’est pas une calculatrice et ne fait aucun calcul à la place des élèves.** Il ne calcule pas de résultats et ne résout pas automatiquement les exercices. Les élèves élaborent eux-mêmes leurs démarches, étapes intermédiaires et solutions ; l’application fournit du papier numérique et des outils pour écrire et dessiner.

Schmierpapier offre un espace pour calculer, essayer et dessiner directement dans le navigateur. Il s’adresse notamment aux élèves pour qui écrire ou dessiner sur papier est impossible ou difficile en raison de limitations motrices, de mouvements involontaires ou d’autres besoins individuels.

L’application vise à favoriser le travail autonome en cours de mathématiques : le clavier et la souris permettent d’écrire les calculs dans des cases, de disposer clairement les fractions et de réaliser des constructions géométriques avec des outils numériques. De nombreuses fonctions sont accessibles par des boutons, sans devoir utiliser une combinaison de touches pour chaque action.

Version **0.5 (développement)**

Site du projet : [schmierpapier.org](https://schmierpapier.org). Le logo dans l’en-tête de l’application l’ouvre dans un nouvel onglet.

## Nouveautés de v0.5 (développement)

- Les virgules et points apparaissent en bas à droite de leur carreau associé, laissant le carreau suivant libre pour le prochain chiffre. Les signes occupant un carreau sont disponibles dans Symboles divers.
- Les libellés d’exercice tels que 1a) tiennent dans deux carreaux horizontaux, avec hauteur double en option ; les textes longs sont réduits automatiquement. Maintenir A ouvre le choix de taille.
- Les paramètres (roue dentée ou maintenir F) proposent une durée de maintien de 200–3000 ms et l’écriture manuscrite ou une police de console intégrée. L’aide et le tutoriel affichent la durée choisie. Les deux polices fonctionnent hors ligne, y compris en PDF et à l’impression.
- Les fichiers et sauvegardes locales conservent la version de l’application et les réglages de police/maintien. L’ouverture d’anciens documents affiche les résumés des versions suivantes ; les fichiers sans version restent lisibles. Le stockage local nécessite toujours une autorisation.
- L’équerre agrandit les graduations de début et de fin : au clavier lors du déplacement sur le bord, à la souris près du bord. Elle ne calcule pas la longueur du trait.
- v0.5 reste locale pour le moment ; la version publiée reste v0.4.4. Aucun envoi avant autorisation.

## Nouveautés de la v0.4.4

- Ajout au tutoriel de 2 1/2 + 1/2 = 3 : entiers, plus et égal de double hauteur avec U ou le bouton ; numérateurs/dénominateurs normaux et barres à la souris ou au clavier. Navigation et pavé à l’écran restent disponibles.
- Le mode U agrandit désormais aussi les signes de calcul, comparaison, pourcentage et pour mille. Cela fonctionne au clavier, au pavé et avec les boutons ; Ctrl/Maj+Entrée conserve l’égalité pour fractions.
- Le menu Symboles divers (maintenir Z) propose aussi ‰ (pour mille) et ± (plus ou moins, plus au-dessus de moins).
- Écrire un grand caractère remplace le texte ordinaire dans ses deux cases. Une saisie ordinaire ou Espace dans l’une des cases remplace ou efface le grand caractère entier. Annuler restaure le contenu précédent.
- Les menus des racines et intégrales proposent les cinq lignes des parenthèses : hauteur libre vers le haut, double vers le haut, normale (présélectionnée), double vers le bas et hauteur libre vers le bas. Maintenir Q pour les racines, I pour les intégrales, ou cliquer sur leur flèche. À gauche : racines carrées/intégrales indéfinies ; à droite : racines avec indice/intégrales définies. Les flèches choisissent la case ; Entrée valide.
- Pour une hauteur libre, l’indice de racine ou les bornes inférieure et supérieure sont demandés en premier. Annuler ne change rien. La case active reste ensuite le départ : Haut/Bas choisit la ligne cible, Entrée fixe le signe, ou cliquer sur la ligne cible. La colonne reste fixe ; Échap annule l’aperçu rouge en pointillés. Indice et bornes sont prévisualisés puis fixés aux extrémités finales. Les noms grecs des bornes restent remplacés, par exemple 2pi → 2π. La racine finit au coin supérieur droit sans crochet pour prolonger par un trait. Enregistrement/chargement, copie du signe entier, annulation, PDF/impression et effacement depuis toute case occupée respectent la hauteur complète. Les aperçus ne sont ni enregistrés ni exportés.
- Le nouveau bouton Écriture de double hauteur, ou un appui sur U d’environ 0,6 seconde, active/désactive un mode permanent. Un cadre horaire montre l’attente ; le bouton actif pulse, ou reste entouré si les animations sont réduites. Un appui court écrit toujours u. Chiffres et lettres, grecques comprises, occupent deux cases vers le bas depuis la case active, une colonne par caractère. La saisie avance à droite ; Entrée et le retour automatique avancent de deux lignes dans ce mode. Maintenir U de nouveau ou cliquer sur le bouton pour l’arrêter. Pour un nombre fractionnaire, écrire le grand 1 entier, arrêter le mode, puis ajouter la fraction ordinaire à côté.
- Les signes de calcul et comparaison comme +, −, ·, :, /, =, ≠, <, >, ≤, ≥, ≈, ≡, ∝, ±, ∓, % et ‰ sont aussi de double hauteur ; la ponctuation garde sa hauteur normale. Les modes permanents indice/exposant et double hauteur s’excluent ; Ctrl/Maj avec un chiffre permet toujours une petite annotation ponctuelle. Aucun demi-caractère n’est écrit au bord inférieur : choisir une case plus haute. Les grandes lettres/chiffres s’effacent depuis chacune des cases, se copient/coupent en entier, s’annulent et restent dans .schmier, PDF et impressions. U remplace l’ancien raccourci direct de l’esperluette ; & reste dans Symboles divers (maintenir Z). Noms, recherches et graduations gardent leur saisie normale. Le tutoriel désactive temporairement le mode puis le restaure.
- Les menus proposent cinq lignes de taille : hauteur libre vers le haut, double vers le haut, normale (présélectionnée), double vers le bas et hauteur libre vers le bas. Chaque ligne contient les formes rondes, carrées, accolades et chevrons. Ouvrir par la flèche ou maintenir 8/9 ; les flèches choisissent forme et ligne, Entrée valide. Pour le calcul du tutoriel, garder la forme ronde normale au milieu.
- Pour la hauteur libre, la case active au début du choix reste le point de départ. Haut/Bas déplace l’extrémité par cases entières dans la direction choisie, d’une case jusqu’au bord de la page. Une parenthèse rouge en pointillés montre l’aperçu ; Entrée la fixe. On peut aussi cliquer sur la ligne cible de la même page ; la forme reste dans la colonne de départ. Le déplacement de la souris sur le papier montre la hauteur avant le clic. Échap, un clic hors du papier ou la sortie de la fenêtre annule sans modifier le document. La saisie reprend à droite de la case de départ. Le mode indice/exposant actif ne change pas la hauteur choisie.
- La forme entière appartient à toutes les cases occupées et s’efface depuis chacune avec Suppr ou Retour arrière. Annuler/rétablir et les fichiers .schmier conservent la hauteur. Pour copier ou couper, sélectionner toute la hauteur ; une zone partielle n’inclut pas la forme. PDF et impression n’incluent que les formes validées, pas les aperçus. Les anciens documents à signes doubles restent lisibles ; les anciennes versions de l’application ne représentent pas fiablement les hauteurs libres.

## Nouveautés de la v0.4.3

- Tous les raccourcis par appui prolongé affichent un cadre de progression horaire sur leur bouton ; les appuis courts restent inchangés.
- Intégrales définies avec saisie des bornes, nouveaux menus de logique, ensembles et symboles divers, et cadre de progression visible en maintenant Maj/Ctrl.
- Sources par fonction sous `src/` au lieu de modifier directement le HTML final.
- Un assemblage Python local avec surveillance/vérification produit toujours un seul fichier hors ligne, avec langues, polices et logos intégrés.

## Nouveautés de la v0.4.2

- Tutoriel adapté aux menus de parenthèses actuels : présélection normale au centre, lignes de taille et flèches expliquées. Bouton principal, flèche et 8/9 prolongés sont équivalents ; formes, tailles ou modificateurs incorrects sont bloqués avant saisie avec explication précise. L’aide des touches optionnelle est présentée tôt.

- Les boutons doubles partagent une seule indication de touche centrée sur le groupe. Le menu des racines est indiqué par Q.

- Maintenir 5/6/7 pour les zones rose/jaune fluo/vert fluo ; S pour barrer. Les flèches sélectionnent, le même appui prolongé confirme, Échap annule. Ctrl+N/O ajoutés si transmis ; B/O prolongés offrent Nouveau/Ouvrir. F11 et les nouvelles indications de touches ajoutés.

- Aide des touches avant Aide : cliquer le clavier ou maintenir T affiche/masque les raccourcis rouges discrets au-dessus des boutons. Les indications suivent la mise en page, préservent le focus et restent hors des fichiers, PDF et impressions. Disponibles aussi pendant les tracés au clavier et le tutoriel.

- Maintenir G contrôle l’équerre au clavier : valider position et rotation, guider un crayon bien visible sur le bord, valider début/fin. Gauche/Droite avancent par 1 mm, Haut/Bas changent de côté ; aperçu rouge avant tracé. Pendant le choix du rayon, G prolongé active/désactive la mesure sans quitter le compas. La souris reste disponible.

- Maintenir K démarre le compas au clavier dans la case sélectionnée. K ou Entrée valide centre, rayon (Gauche/Droite par 1 mm), début et fin de l’arc. Les flèches tournent le compas ; aperçu rouge pointillé avant tracé, Échap annule. L’arc terminé reste un trait effaçable en entier. Le bouton souris conserve son fonctionnement.

- Le raccourci pour cent suit la lettre Z reconnue plutôt que la position physique américaine. Maintenir Z fonctionne donc aussi avec Y/Z inversés ; Y reste une saisie de texte normale.

- Maintenir I ouvre les tailles d’intégrale (grande vers le haut, normale présélectionnée au centre, grande vers le bas), aussi accessibles par la nouvelle flèche. Maintenir U insère &, Z insère %. Les lettres courtes et Ctrl+Z sont conservés.

- Les boutons doubles sont joints sans espace ni coins intérieurs arrondis. La nouvelle flèche près de √ ouvre le même menu que Q prolongé ; le bouton principal insère toujours directement une racine carrée.

- Le menu Q ajoute ⁿ√ : choisir une autre racine dans trois tailles puis saisir son indice (2–9999, p. ex. 3). L’indice en haut à gauche est conservé dans les fichiers, copies, PDF et impressions.
- Grandes racines sans conflit navigateur : maintenir Q (Quadratwurzel en allemand) ouvre les tailles, racine carrée normale à gauche de la ligne centrale présélectionnée, grandes variantes au-dessus et en dessous, racines avec indice à droite. Haut/Bas choisissent la taille, Gauche/Droite le type ; Entrée valide, Échap annule. W prolongé conserve la racine normale ; Maj+W la grande vers le haut. Ctrl+W reste entièrement réservé au navigateur.
- Les menus proposent trois lignes de taille : double vers le haut, normale (présélectionnée), double vers le bas. Gauche/Droite choisissent la forme, Haut/Bas la taille, Entrée valide. Les grandes formes restent accessibles sans combinaison même en mode indice/exposant.
- Maintenir N attend désormais la première flèche pour choisir orientation et sens. La pointe de l’aperçu est pleine et nette. Maintenir W insère une racine ; un W court reste une saisie de texte.
- Axes gradués au clavier : maintenir N affiche un aperçu fléché ; les flèches règlent longueur/bord, Gauche+Droite ou Haut+Bas choisissent ou valident la direction. Maintenir N de nouveau valide aussi ; Échap annule. Les graduations restent manuelles.

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
- Intégrales indéfinies et définies de hauteur normale ou double. Maintenir I ouvre le menu ; les intégrales définies sont à droite. Saisir la borne inférieure puis supérieure (1–16 caractères chacune, sans espaces). Les bornes restent dans les fichiers `.schmier`, copies, PDF et impressions. Aucun calcul n’est effectué.
- Les noms grecs dans les bornes d’intégration sont remplacés automatiquement : pi, omega, alpha, beta, phi, theta, psi, tau, lambda, rho, sigma, xi et zeta. La première lettre détermine la casse, indépendamment des suivantes : omega → ω, Omega → Ω, 2pi → 2π, -Pi/2 → -Π/2. Les noms complets sont reconnus à côté des nombres et opérateurs ; les autres mots restent inchangés. La limite de 16 caractères s’applique après remplacement.
- Menus de logique (maintenir L, défaut ∧), ensembles (maintenir M, défaut ∈) et symboles divers (maintenir Z, défaut %, avec &, ∀, ∃, ∄). Le bouton principal écrit le signe par défaut ; sa flèche ouvre le menu, flèches/Entrée ou clic choisissent, Échap ferme. Maintenir U active désormais la double hauteur ; & reste dans le menu.
- Lettres grecques : le bouton π insère Pi ; sa flèche ou un appui prolongé sur P dans une case ouvre le menu grec. Flèches et Entrée choisissent, Échap ferme ; un appui court sur P écrit toujours p. Ctrl/Maj insèrent un indice/exposant.
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
| Maintenir I | Menu des intégrales : Haut/Bas pour la taille, Gauche/Droite pour indéfinie/définie ; saisir les bornes dans l’ordre |
| Maintenir U | Activer/désactiver chiffres et lettres de double hauteur |
| Maintenir L / M / Z | Choisir logique / ensembles / symboles divers |
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

**Maintenir** signifie environ 0,6 seconde dans une case active, sans touche de modification. Les saisies courtes de chiffres et lettres sont conservées ; Suppr court efface la case. Ctrl/Maj ne bascule le mode qu’au relâchement, sans autre touche ni clic. Ces raccourcis ne concernent pas les noms, recherches ou graduations. Pendant un trait au clavier, les flèches règlent sa longueur et son bord ; Échap annule l’aperçu. Un cadre se remplit dans le sens horaire sur le bouton correspondant pendant l’appui sur Maj/Ctrl ; un cadre complet indique que le mode est prêt. Relâcher trop tôt, une autre touche, un clic ou la perte du focus annule l’appui.

L’aide intégrée, avec recherche, contient les instructions complètes. Le tutoriel utilise un document d’exercice séparé puis restaure le document personnel.

## Tutoriel

Le tutoriel utilise un document d’exercice séparé et préserve ton travail. La ligne 1, colonne 1 est active au départ ; la première cible est la ligne 6, colonne 5. Il présente tôt le pavé numérique déplaçable ; son utilisation reste ensuite facultative.

Il fait pratiquer `(12 + 8) · 3 = 60`, le soulignement, `2/4 = 1/2`, `2¹² = 4096`, `3 ≠ π`, copie, déplacement, affichage, enregistrement et PDF. Surligneurs et gomme restent disponibles dans l’application, mais ne font pas partie des exercices.

Clique sur les cases dorées ou rejoins-les avec les flèches, Tab et Début/Fin. Le tutoriel continue automatiquement à l’arrivée, sans Entrée. Les exercices de copie/déplacement collent aussi automatiquement à la bonne destination ; hors tutoriel, la confirmation manuelle reste nécessaire. Le tutoriel présente les alternatives souris/clavier pour stylos, parenthèses, exposants, traits, copie et déplacement. Les actions incorrectes sont bloquées et expliquées.

L’exercice d’enregistrement accepte Ctrl+S, ou ⌘+S sur Mac. Maintiens E pour exporter le PDF, ou D pour changer l’affichage dans l’exercice correspondant. Les téléchargements contiennent seulement les pages d’exercice. Échap termine le tutoriel et restaure ton document, même depuis l’écran final.

## Développement et assemblage

**Modifier les sources sous `src/`, pas le fichier généré `schmierpapier.html`.** Pour utiliser l’application, seul le fichier HTML final est nécessaire ; seul le développement exige un assemblage. Prérequis : **Python 3.10 ou plus récent**, sans paquet supplémentaire, Node.js ni accès Internet.

Depuis la racine du projet :

```sh
python3 build.py
python3 build.py --watch
python3 build.py --check
python3 -m unittest discover -s src/tests -v
```

- `python3 build.py` génère le fichier `schmierpapier.html` actuel.
- `--watch` reconstruit automatiquement après l’enregistrement des sources. Arrêter avec Ctrl+C ; recharger le fichier final dans le navigateur.
- `--check` vérifie sans écrire que la sortie correspond aux sources. Une sortie périmée renvoie un statut d’échec.
- La dernière commande teste la reproductibilité, les sources/traductions manquantes, les ressources intégrées et la reconstruction automatique.

Sous Windows, utiliser `py -3` au lieu de `python3` si nécessaire. Une autre sortie est possible avec `python3 build.py --output /tmp/schmierpapier-test.html`.

| Source | Rôle |
|---|---|
| `src/index.html`, `src/styles.css` | Structure HTML et présentation |
| `src/js/*.js` | Fichiers par fonction ; toutes les parenthèses ensemble dans `brackets.js` |
| `src/js/file-io.js`, `src/js/export.js` | Lecture/enregistrement et PDF/impression |
| `src/js/basics.js`, `src/js/keyboard.js`, `src/js/regions.js` | Fondations communes, clavier et sélection de zones |
| `src/i18n/de.js`, `en.js`, `fr.js` | Interface, aide, tutoriel et messages de chaque langue |
| `src/i18n/consent-eu.js` | Autres langues de l’UE pour l’avis de stockage |
| `src/assets/` | Polices et logos intégrés lors de l’assemblage |
| `src/version.txt`, `src/build.json` | Version de développement, sources et ordre d’assemblage |

Une fonction peut comporter plusieurs sections `// @part`. Le manifeste les assemble dans l’ordre existant en un seul script classique à portée partagée. Les nouveaux fichiers JS doivent y figurer. Les langues ont les mêmes clés d’interface ; les traductions ou articles manquants sont signalés. La sortie n’est remplacée qu’après validation ; en cas d’erreur, le dernier HTML valide est conservé. `--check` ne remplace pas les tests fonctionnels dans le navigateur.

Détails sur sections, langues et ressources : [Guide des sources et de l’assemblage](src/README.md) (allemand). `src/index.html` contient des paramètres d’assemblage et n’est pas un aperçu exécutable. Le fichier final intègre tout le CSS, JavaScript, les polices et logos et reste utilisable hors ligne. **Ni l’assemblage ni la surveillance n’envoient de fichiers.** Le dossier du site reste indépendant.

Les changements importants gardent les trois README, journaux et textes d’aide/tutoriel concernés alignés. Les licences indépendantes des polices restent dans les métadonnées et avis. Le quadrillage utilise toujours une couche SVG continue pour un rendu régulier dans Firefox.

## Licence

Le code de l’application est distribué sous la **GNU General Public License, version 3 (GPL-3.0-only)**. Le texte intégral figure dans [LICENSE](LICENSE).

Les polices intégrées conservent leurs propres licences : la version modifiée de [Caveat](https://github.com/googlefonts/caveat) sous SIL Open Font License 1.1, et la [police DejaVu](https://dejavu-fonts.github.io/) selon ses conditions de licence applicables. Les mentions de copyright et de licence sont conservées dans les métadonnées des polices intégrées.
