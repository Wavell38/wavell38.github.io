# Données du portfolio

## Structure

- `index.js` importe les projets et expose `window.PORTFOLIO.projects` dans l’ordre conservé du portfolio.
- `projects/*.js` contient les objets projet, chacun avec un `export default`.
- `../main.js` charge les données puis `../app.js`, sans dépendance ni build.

**Un projet = un fichier**, nommé d’après son `id`. Pour ajouter un projet, créer son fichier,
puis ajouter son import et son entrée dans le tableau de `index.js` à la position souhaitée.
Les chemins des médias et liens restent relatifs aux pages HTML à la racine, pas au module.

## Schéma actuel d’un projet

Tous les champs ne sont pas obligatoires. Conserver les champs utiles au projet ; les blocs
vides du template détaillé sont omis. `?` signale un champ facultatif ; d’autres champs de
contenu peuvent aussi être absents selon le template.

| Champs | Format et usage |
| --- | --- |
| `id`, `group` | Identifiant unique utilisé dans `project.html?id=…` ; groupe `featured`, `systems`, `mechanical` ou `experience`. |
| `order?` | Nombre utilisé pour trier les projets `featured`. Les autres groupes suivent l’ordre du tableau. |
| `kind`, `status`, `title` | Textes du type de projet, de son état et de son titre. |
| `titleAccent?` | Texte ou tableau de textes à accentuer dans le titre détaillé. |
| `subtitle`, `role?`, `period`, `summary` | Sous-titre, rôle, période et résumé de la carte. |
| `tags`, `facts` | Tableaux de textes ; les trois repères de `facts` correspondent à État, Repère et Point clé. |
| `labels?` | Surcharges des intitulés : `context`, `objectives`, `work`, `results`, `limits`, `nextSteps`, `environment`. |
| `context`, `objective?` | Texte de contexte et tableau d’objectifs. |
| `sections?` | Tableau de `{ title?, text?, bullets?, media? }` ; `bullets` est un tableau de textes. Sa présence, même `[]`, sélectionne le template détaillé. |
| `work?` | Tableau de travaux pour le template simple, utilisé en l’absence de `sections`. |
| `results`, `resultsIntro?` | Tableau de résultats et texte introductif facultatif du template détaillé. |
| `limits`, `limitsItems?` | Texte de limites et liste facultative de précisions. |
| `nextSteps?`, `nextStepsItems?` | Texte de perspectives et liste facultative de pistes. |
| `links?`, `nextStepsLinks?` | Tableaux de paires `[libellé, URL]` ; liens généraux ou liens des perspectives. |
| `environmentGroups?` | Tableau de `{ title?, items: [...] }` regroupant les outils et technologies. |
| `environment?` | Tableau de textes utilisé si aucun groupe technique rempli n’est disponible. |
| `media?` | Objet avec `lead?` (visuel principal) et `leadPlacement?` (placement dans le template détaillé). |

## Médias

Un média est une image `{ src, alt, width?, height?, caption?, type? }`. Fournir ses dimensions
réelles quand elles sont connues. `type: "illustration"` applique le traitement illustratif ;
`type: "document"` préserve les couleurs et rend l’image cliquable vers son fichier original.

- `media.lead` affiche au plus un visuel principal, indépendamment des médias de section.
- Dans le template détaillé, ce visuel accompagne le contexte par défaut ;
  `media.leadPlacement: "before-context"` le place après le hero et avant le contexte.
- Chaque `sections[].media` est un tableau facultatif : seuls les **deux premiers médias
  avec un `src` non vide** sont affichés, dans leur ordre. Une section peut ne contenir que des médias.
- Un projet peut ne comporter aucun média.

Pour les règles détaillées de rendu et les tests, voir le [README principal](../README.md).
Servir le dépôt en HTTP (par exemple `python -m http.server 8000`) pour vérifier les modules
localement ; ouvrir ensuite `http://localhost:8000`. GitHub Pages les sert directement.
