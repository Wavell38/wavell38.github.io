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
| `kind`, `title` | Catégorie du projet et titre ; `kind` ne décrit ni le cycle de vie ni la maturité. |
| `company?` | Nom de l’entreprise cliente ou partenaire, distinct du titre du projet. Affiché sous le titre sur les cartes et dans les deux templates, avec le libellé « Entreprise » et une icône décorative. Absent, `null`, vide ou composé d’espaces : aucun élément ni espace réservé. |
| `status?` | Cycle de vie ou situation établie : « En cours », « En pause », « Projet arrêté », « Mission terminée », etc. Omettre si inconnu. |
| `titleAccent?` | Texte ou tableau de textes à accentuer dans le titre détaillé. |
| `subtitle`, `role?`, `period`, `summary` | Sous-titre, rôle, période et résumé de la carte. |
| `tags` | Tableau de technologies ou thèmes pertinents. |
| `facts` | Trois textes non vides : **Maturité**, **Repère**, **Point clé**, dans cet ordre. Le premier décrit la réalisation atteinte ; les deux suivants sont des caractéristiques techniques ou résultats utiles, sans répétition du statut. |
| `labels?` | Surcharges des intitulés : `context`, `objectives`, `work`, `results`, `limits`, `nextSteps`, `environment`. |
| `context`, `objective?` | Texte de contexte et tableau d’objectifs. |
| `sections?` | Tableau de `{ title?, text?, bullets?, media? }` ; `bullets` est un tableau de textes. Sa présence, même `[]`, sélectionne le template détaillé. |
| `work?` | Tableau de travaux pour le template simple, utilisé en l’absence de `sections`. |
| `results`, `resultsIntro?` | Tableau de résultats et texte introductif facultatif du template détaillé. |
| `resultsLinks?` | Paires `[libellé, URL]` affichées sous les résultats du template détaillé, uniquement si `results` contient du texte. |
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
Le champ `type` règle le rendu, pas l’origine de l’image : une photo retouchée peut conserver
le traitement `illustration`. Décrire l’origine dans `alt` et, si elle mérite d’être visible,
dans `caption` : photo du prototype réel, photo retouchée, vue CAO, illustration conceptuelle
ou document technique. Ne pas déduire une qualification du système à partir d’un visuel.

- `media.lead` affiche au plus un visuel principal, indépendamment des médias de section.
- Dans le template détaillé, ce visuel accompagne le contexte par défaut ;
  `media.leadPlacement: "before-context"` le place après le hero et avant le contexte.
- Chaque `sections[].media` est un tableau facultatif : seuls les **deux premiers médias
  avec un `src` non vide** sont affichés, dans leur ordre. Une section peut ne contenir que des médias.
- Un projet peut ne comporter aucun média.

## Convention éditoriale

Pour les expériences professionnelles, `title` désigne la réalisation et `company` nomme
l’entreprise. `subtitle` apporte un complément fonctionnel sans répéter le titre ; `summary`
résume le périmètre sur la carte. Les projets personnels conservent leurs titres et n’ont pas
de champ `company` artificiel. Un `titleAccent` doit cibler un extrait du titre actuel.
Le nom de l’entreprise est du texte échappé, sans lien implicite ; il ne qualifie pas à lui
seul la nature contractuelle de l’intervention, qui reste précisée dans le contexte.

`status` apparaît sur la carte et dans l’en-tête détaillé. S’il est absent, vide ou composé
d’espaces, le rendu omet le badge sans texte de remplacement. Le drone et le réducteur
cycloïdal n’ont ainsi aucun cycle de vie inventé. La maturité apparaît uniquement parmi les
repères de l’en-tête, sous « Maturité » : un POC peut être fonctionnel et son projet arrêté.

Les trois repères sont distincts et ne recopient pas `status`. Une itération de conception
(par exemple V4 du gant) ne signifie pas que cette génération a été assemblée ou qualifiée.
Les résultats précisent les conditions et le niveau de preuve ; les limites et perspectives
séparent ce qui manque de ce qui pourrait être entrepris. Les rubriques restent facultatives.

Les Markdown `assets/*/*portfolio*.md` sont des références éditoriales historiques ; les
fichiers `projects/*.js` sont la représentation affichée. Aucune des deux formes n’est
systématiquement plus récente ou plus fiable. Comparer chaque information, conserver la
version la plus récente et étayée, puis corriger l’autre représentation lorsqu’un écart
matériel est avéré. Une différence de granularité est acceptable si elle préserve le sens,
la maturité, les limites essentielles et le statut des preuves. Ne pas déduire un nouvel
avancement technique de cette réconciliation ni ajouter artificiellement des dates.

Les tests de [template et de corpus](../tests/project-template.test.cjs) vérifient cette
convention, les douze fiches, les liens locaux et les dimensions déclarées des images.

Pour les règles détaillées de rendu et les tests, voir le [README principal](../README.md).
Servir le dépôt en HTTP (par exemple `python -m http.server 8000`) pour vérifier les modules
localement ; ouvrir ensuite `http://localhost:8000`. GitHub Pages les sert directement.
