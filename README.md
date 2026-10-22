# wavell38.github.io

Portfolio technique de Vincent Grange.

Site statique sans dépendance ni build : HTML, CSS et JavaScript.

## Structure

- index.html : page d’accueil et hiérarchie du portfolio
- project.html : vue détaillée d’un projet
- main.js : chargement des données puis du rendu via des modules ES natifs
- data/index.js : assemblage des projets dans leur ordre d’affichage
- data/projects/*.js : un fichier par projet ou expérience (voir [le schéma](data/README.md))
- app.js : rendu des cartes et pages projet
- styles.css : design responsive

Le site est conçu pour être publié directement avec GitHub Pages depuis la branche main, à la racine du dépôt.

## Aperçu local

Sous Windows, double-cliquer sur `preview.cmd` (Python 3 requis, sans paquet à installer).
Le lanceur ouvre le portfolio dans le navigateur et sert le dépôt sur une adresse locale
`http://127.0.0.1:…`. Garder sa fenêtre ouverte pendant la consultation ; `Ctrl+C` arrête le serveur.
Depuis un terminal, `python preview.py` fait la même chose.

L’ouverture directe de `index.html` en `file://` bloque les modules ES dans le navigateur :
les cartes et la navigation latérale restent alors vides. Utiliser l’aperçu HTTP ci-dessus.

## Template détaillé des projets

Dans `data/projects/*.js`, la présence de `sections` sélectionne le template détaillé (`[]` est accepté).
Les projets sans cette propriété conservent leur template simple.

Les intitulés peuvent être personnalisés avec `labels` ; une valeur absente ou vide utilise le défaut :

| Clé | Intitulé par défaut |
| --- | --- |
| `context` | Contexte |
| `objectives` | Objectifs |
| `work` | Travaux réalisés (Travaux dans la navigation) |
| `results` | Résultats |
| `limits` | Limites / état actuel (Limites dans la navigation) |
| `nextSteps` | Suite envisagée |
| `environment` | Stack & outils |

`resultsIntro` ajoute un texte facultatif sous le titre des résultats. Par exemple, Card Analyzer conserve
`labels: { objectives: "Objectif V1" }` et `resultsIntro: "Ce que la V1 démontre aujourd’hui."`.

Les blocs sans contenu sont omis, ainsi que leurs liens de navigation :

- `context`, `objective` et `media.lead` sont indépendants ; leur conteneur disparaît si les trois sont vides.
- `sections` ignore les entrées sans texte, puces ni média ; un titre seul ne suffit pas. Chaque section accepte
  `media: [{ src, alt, width, height, caption? }]`, avec au plus deux médias affichés dans l’ordre du tableau.
  Pour un plan exporté en image, ajouter `type: "document"` : l’image conserve ses couleurs d’origine
  et un clic ouvre le fichier en taille originale dans le même onglet.
- `media.leadPlacement: "before-context"` place le visuel principal après le hero, avant Contexte / Objectif.
  Sans cette option, il reste à côté du contexte. Il est indépendant des deux médias autorisés par section.
- `results` doit contenir au moins un résultat ; un intitulé ou `resultsIntro` seul ne crée pas de bloc.
- Les limites apparaissent si `limits` ou `limitsItems` contient du texte.
- La suite envisagée apparaît après les limites et avant la stack si `nextSteps` (texte de présentation)
  ou `nextStepsItems` (liste de pistes) contient du texte. Les deux champs sont facultatifs et indépendants ;
  un intitulé `labels.nextSteps` seul ne crée ni section ni lien de navigation. Le titre reste indépendant
  du numéro de version et les repères bleu-violet distinguent ces pistes des limites actuelles.
- Les groupes `environmentGroups` sans éléments sont ignorés. En l’absence de groupe rempli, `environment`
  sert de liste de repli ; si les deux sont vides, le bloc technique disparaît.
  Le lien « Stack & outils » ferme la navigation lorsqu’un bloc technique est affiché ; il devient actif
  en bas de page même si la section est trop courte pour atteindre le seuil habituel du suivi de défilement.

Les chaînes vides ou composées uniquement d’espaces sont ignorées dans ces contenus.

Vérification du template, sans dépendance : `node --test tests/project-template.test.cjs`.

Pour la séparation cycle de vie / maturité, l’origine des médias et la réconciliation entre
Markdown éditoriaux et données JS affichées, suivre la [convention éditoriale](data/README.md#convention-éditoriale).
