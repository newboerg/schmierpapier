# Journal des modifications

[Deutsch](CHANGELOG.md) · [English](CHANGELOG.en.md) · **Français**

## v0.4.3

- Boutons indice et exposant déplacés juste avant le signe égal dans la barre de symboles.
- Barre de symboles réorganisée : après l’équerre, un séparateur, puis comparaisons, parenthèses ouvrantes/fermantes, racines, intégrales, symboles divers, ensembles et logique. Les lettres grecques suivent.
- Tous les raccourcis par appui prolongé affichent leur attente par un cadre se remplissant dans le sens horaire sur le bouton correspondant : couleurs de stylo, surligneurs, parenthèses et menus de symboles, outils géométriques, zones, pages, zoom, fichiers, PDF et indications de touches. Après environ 0,6 seconde, l’action se déclenche et le cadre disparaît. Un relâchement anticipé ou une annulation le retire ; les appuis courts gardent leur fonction. Pour Maj/Ctrl, le cadre complet reste jusqu’au relâchement qui change le mode. Les clics directs ne demandent aucune attente. L’indicateur fonctionne aussi dans le tutoriel et reste exclu des documents, PDF et impressions.
- Les noms grecs dans les bornes d’intégration sont remplacés automatiquement : pi, omega, alpha, beta, phi, theta, psi, tau, lambda, rho, sigma, xi et zeta. La première lettre détermine la casse, indépendamment des suivantes : omega → ω, Omega → Ω, 2pi → 2π, -Pi/2 → -Π/2. Les noms complets sont reconnus à côté des nombres et opérateurs ; les autres mots restent inchangés. La limite de 16 caractères s’applique après remplacement.
- Ajout des intégrales définies au menu à trois lignes : indéfinies à gauche, définies à droite ; normales au milieu, doubles vers le haut/bas. Saisie successive des bornes inférieure et supérieure comme pour l’indice d’une racine. Annuler ne change rien ; les bornes restent dans l’enregistrement/chargement, la copie, l’annulation, le PDF et l’impression et sont effacées avec l’intégrale.
- Nouveaux menus : maintenir L pour la logique (défaut ∧), M pour les ensembles (∈), Z pour les symboles divers (%). & et % regroupés ; ∀, ∃ et ∄ ajoutés. Flèche/clic ou flèches/Entrée choisissent, Échap annule ; lettres courtes et Ctrl+Z préservés. Maintenir U reste un raccourci direct pour &. Police de symboles hors connexion étendue avec conservation de sa licence indépendante.
- Maintenir Maj/Ctrl affiche un cadre de progression horaire jusqu’à l’activation possible. Le changement reste au relâchement ; autre saisie ou perte du focus annule. Indications de touches, aide intégrée et README actualisés dans les trois langues. Aucun envoi.

- Sources de développement séparées sous `src/` : modèle HTML, CSS, JavaScript par fonction, bases communes et un fichier de langue pour allemand, anglais et français. Les parenthèses restent ensemble ; lecture/enregistrement et PDF/impression ont leurs fichiers.
- Polices et logos deviennent des ressources sources intégrées sans modification ; le HTML généré reste un seul fichier hors ligne. Un manifeste préserve l’ordre des événements et du démarrage.
- Ajout d’un assemblage Python reproductible sans paquets : génération simple, reconstruction automatique avec `--watch` et contrôle avec `--check`. Les sources, sections et traductions manquantes sont signalées ; les erreurs conservent la dernière sortie valide.
- Structure et assemblage documentés dans les trois README ; tests automatiques ajoutés. La version vient de `src/version.txt`, fixée à 0.4.3. Aucune publication ni aucun envoi lors de cette migration.

## v0.4.2

- Les exposants commencent un peu plus à droite et les plus longs dépassent le bord vers la droite. Ils restent liés à leur case d’origine, avec le même alignement en PDF et à l’impression.

- Nouveau logo avec nom et favicons assortis ajoutés à l’application et au site. Les images sont intégrées directement dans l’application, qui reste un seul fichier HTML hors ligne.

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
- Axes gradués au clavier : maintenir N démarre un aperçu fléché rouge. Les flèches et leurs combinaisons règlent et valident l’axe ; maintenir N de nouveau valide aussi. Graduations manuelles, origine commune et retour après deux axes sont conservés.

## v0.4

- Bouton racine après les parenthèses : son tracé se termine exactement au coin supérieur droit de la case et peut être prolongé par un trait de stylo.
- Bouton égal avec menu de comparaison (=, ≠, <, >, ≤, ≥, ≈, ≡, ∝). Maintenir Entrée ouvre le menu ; les appuis courts conservent leur fonction.
- Racines et comparaisons acceptent Ctrl/Maj pour les formes de double hauteur, la suppression depuis les deux cases, l’enregistrement, la copie, le PDF et l’impression.
- Deux boutons principaux ( / ) avec menus pour parenthèses, crochets, accolades et chevrons. Maintenir 8/9 ouvre les formes ouvrantes/fermantes. Les chiffres du haut et du pavé fonctionnent ; les appuis courts et Ctrl/Maj pour indices/exposants sont conservés.
- Les lettres grecques utilisent un bouton π et un menu en cases comme celui du signe égal. Maintenir P ouvre la sélection ; un appui court reste une saisie. Ctrl/Maj et les modes exposant/indice sont conservés.
- Traits au clavier avec aperçu rouge en pointillés : Gauche+Droite pour l’horizontale, Haut+Bas pour la verticale. Les flèches règlent longueur et bord ; la même paire confirme, Échap annule. La case actuelle reste entièrement incluse dans toutes les directions. Les traits horizontaux commencent en bas.
- La zone de détection des coins est calculée selon la taille des cases et suit le zoom du papier et du navigateur.
- Entrée principale passe à la ligne suivante dans la dernière colonne choisie par navigation ou clic. Le déplacement automatique pendant la saisie ne modifie pas cette colonne.
- Maintenir 1–4 dans une case choisit noir, bleu, vert ou rouge. Les chiffres courts et Ctrl/Maj sont conservés ; les deux rangées de chiffres fonctionnent.
- Maintenir Maj/Ctrl seule puis relâcher active ou désactive exposant/indice. Les combinaisons restent inchangées ; la validation se fait au relâchement.
- Appuyer sur Ctrl/Maj seule illumine immédiatement le bouton en jaune ; le contour se renforce après le délai. Relâcher, combiner une touche, cliquer ou perdre le focus retire l’aperçu. Le mode actif pulse, ou affiche un contour fixe si les animations sont réduites.
- Maintenir R démarre la sélection d’une zone pour gommer surlignages et traits. Les flèches sélectionnent, un nouvel appui prolongé confirme ; l’écriture reste.
- Maintenir C/X sélectionne une zone à copier/couper. Un nouvel appui confirme la source, les flèches choisissent la destination, Entrée ou un autre appui prolongé colle. Échap annule.
- Maintenir Page précédente/suivante change de page. Maintenir Inser ouvre le choix du papier avec le quadrillé par défaut ; maintenir Suppr supprime une page après confirmation.
- Maintenir E exporte le PDF, D alterne entre page simple et double. Les saisies courtes e/d sont conservées.
- Tutoriel : alternatives souris/clavier pour traits, stylos, exposants, parenthèses, copie et déplacement. Le nouvel exercice « 3 ≠ π » explique les menus, y compris les appuis prolongés sur Entrée/P. Les erreurs sont bloquées et expliquées.
- Tutoriel simplifié : exercices de surligneur et gomme retirés. Les cases cibles sont accessibles au clavier et le tutoriel continue à l’arrivée, sans Entrée. Ctrl/⌘+S est autorisé pour enregistrer ; E et D fonctionnent dans les exercices correspondants. Échap quitte aussi quand le bouton final a le focus.
- Signature « Par Benni ♥ Kirstin » en pied de page, avec & dans le cœur.
- Aide, tutoriel et README actualisés en allemand, anglais et français. Le journal des modifications est également disponible dans les trois langues.
- N permet de passer l’ouverture du pavé à l’écran dans le tutoriel ; son fonctionnement reste inchangé hors du tutoriel.
- Le tutoriel démarre avec la case 1,1 active ; le premier exercice rejoint le début du calcul, ligne 6, colonne 5.
- Les étapes de case cible avancent au clic ou à l’arrivée au clavier. Les exercices de copie/déplacement collent aussi à l’arrivée ; la confirmation hors tutoriel reste inchangée.
- Le zoom avant centre la case sélectionnée. Maintenir + / - agrandit/réduit de dix points de pourcentage ; les appuis courts restent des signes de calcul.
- README et site précisent clairement que Schmierpapier n’est pas une calculatrice et ne fait aucun calcul à la place des élèves.
