# wavell38.github.io

Portfolio technique de Vincent Grange.

Site statique sans dépendance ni build : HTML, CSS et JavaScript.

## Structure

- index.html : page d’accueil et hiérarchie du portfolio
- project.html : vue détaillée d’un projet
- data.js : contenu structuré des projets et expériences
- app.js : rendu des cartes et pages projet
- styles.css : design responsive

Le site est conçu pour être publié directement avec GitHub Pages depuis la branche main, à la racine du dépôt.

## Template détaillé des projets

Dans `data.js`, la présence de `sections` sélectionne le template détaillé (`[]` est accepté).
Les projets sans cette propriété conservent leur template simple.

Les intitulés peuvent être personnalisés avec `labels` ; une valeur absente ou vide utilise le défaut :

| Clé | Intitulé par défaut |
| --- | --- |
| `context` | Contexte |
| `objectives` | Objectifs |
| `work` | Travaux réalisés (Travaux dans la navigation) |
| `results` | Résultats |
| `limits` | Limites / état actuel (Limites dans la navigation) |
| `environment` | Stack & outils |

`resultsIntro` ajoute un texte facultatif sous le titre des résultats. Par exemple, Card Analyzer conserve
`labels: { objectives: "Objectif V1" }` et `resultsIntro: "Ce que la V1 démontre aujourd’hui."`.

Les blocs sans contenu sont omis, ainsi que leurs liens de navigation :

- `context`, `objective` et `media.lead` sont indépendants ; leur conteneur disparaît si les trois sont vides.
- `sections` ignore les entrées sans texte, puces ni média ; un titre seul ne suffit pas. Chaque section accepte
  `media: [{ src, alt, width, height, caption? }]`, avec au plus deux images affichées dans l’ordre du tableau.
- `results` doit contenir au moins un résultat ; un intitulé ou `resultsIntro` seul ne crée pas de bloc.
- Les limites apparaissent si `limits` ou `limitsItems` contient du texte.
- Les groupes `environmentGroups` sans éléments sont ignorés. En l’absence de groupe rempli, `environment`
  sert de liste de repli ; si les deux sont vides, le bloc technique disparaît.

Les chaînes vides ou composées uniquement d’espaces sont ignorées dans ces contenus.

Vérification du template, sans dépendance : `node --test tests/project-template.test.cjs`.
