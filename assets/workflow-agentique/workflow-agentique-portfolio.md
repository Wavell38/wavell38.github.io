# Workflow de développement assisté par agents IA

## Intitulé
**Concepteur d’un workflow de développement assisté par agents IA — ingénierie logicielle assistée par IA**

## Période
**Depuis janvier 2026**

## Contexte
Projet transverse de R&D personnelle consacré à la conception, l’expérimentation et l’amélioration continue d’un workflow d’ingénierie logicielle reposant largement sur des agents IA.

Le point de départ est le passage d’un usage ponctuel d’assistants IA à la délégation de tâches d’ingénierie plus autonomes. Cette évolution impose de mieux contrôler le périmètre confié aux agents, le contexte chargé, les décisions structurantes, les critères d’acceptation et les preuves produites.

Le workflow est utilisé sur plusieurs projets logiciels et systèmes. Il s’inscrit dans une logique de **Spec-Driven Development au sens large**, avec séparation entre raisonnement, autorités documentaires et exécution.

## Objectif
Concevoir un cadre réutilisable permettant de déléguer des travaux logiciels cohérents à des agents IA tout en conservant sous responsabilité humaine les objectifs, les arbitrages structurants, l’architecture acceptée, l’interprétation des résultats et la trajectoire globale du projet.

## Tâches effectuées

### Structuration du travail
- Formalisation d’une hiérarchie **Projet → Roadmap → Phase → Tranche → Prompt d’exécution**.
- Définition des tranches comme unités de travail bornées, cohérentes, validables et compatibles avec un rollback pratique.
- Définition du périmètre, des exclusions, invariants, critères d’acceptation et preuves attendues.
- Formalisation du prompt comme **contrat d’exécution borné**.
- Règles de sélection du modèle et du niveau de raisonnement selon la difficulté et le risque.

### Gestion du contexte et des autorités
- Définition d’une **autorité principale par information normative**.
- Séparation des rôles entre règles de travail, architecture, codebase maps, ADR, contrats, roadmap, plans de phase et rapports de qualification.
- **Chargement progressif du contexte** : seules les autorités et portions de code pertinentes pour la tranche courante sont fournies.
- Distinction entre documents vivants et documents historiques de décision/preuve.

### Répartition humain / agents
- Maintien du cadrage, des hypothèses, alternatives et arbitrages structurants au niveau humain, avec l’appui de ChatGPT.
- Délégation à l’agent principal de l’exploration, de l’implémentation, des validations, de la coordination des reviewers et de la remédiation dans le périmètre accepté.
- Escalade vers une décision humaine lorsqu’un changement dépasse le cadre accepté.

### Reviews indépendantes et remédiation
- Stratégie de **review proportionnée au risque et à la portée du changement**.
- Reviewers spécialisés : contrat, correction fonctionnelle, tests, architecture et documentation.
- Reviews exécutées dans des **contextes frais**.
- Constats structurés avec verdict, confiance, localisation, preuve, impact et remédiation minimale.
- Consolidation des constats : accepté/corrigé, accepté/différé, rejeté avec preuve ou décision humaine requise.

### Gestion des échecs et anti-dérive
- États distincts pour runs, roadmap, qualifications et reviews.
- Utilisation de `PASSED` / `BLOCKED` pour les runs.
- **Checkpoint anti-dérive** lorsque les corrections s’accumulent, que l’architecture grossit sans progrès comparable, que les mesures invalident les projections ou que l’investissement passé devient la justification principale pour continuer.
- Possibilité de revenir à une investigation, une qualification supplémentaire, une nouvelle découpe ou un redesign.

### Qualité, validation et qualification
- Tests, lint, analyse de types et builds adaptés au projet et à la tranche.
- SonarQube et analyses statiques lorsque disponibles et pertinentes.
- Méthodologie de qualification expérimentale : baseline, conditions, reproduction, mesures, artefacts, verdict et limites.
- Benchmarks et profiling lorsque les performances constituent un risque.

### Traçabilité et outillage
- Versionnement des décisions structurantes et de la documentation d’architecture avec Git.
- Conservation de rapports d’agents et de qualification.
- Conception et développement de **Prompt Archiver / `prompts_archiver`**, outil open source conservant pour les runs activés prompt, rapport final et métadonnées.
- Chaîne de provenance entre besoin/décision, autorités, tranche, prompt, exécution, rapport et modifications Git, sans revendiquer une traçabilité automatique exhaustive.

## Résultats
- Workflow réutilisable appliqué à plusieurs projets logiciels et systèmes.
- Cycle formalisé : **préparation → exécution bornée → validation → review proportionnée → remédiation → décision suivante**.
- Corpus versionné de guides, templates et politiques documentaires.
- Deux skills opérationnels et cinq profils de reviewers spécialisés dans la version auditée.
- Développement et publication de Prompt Archiver.

Aucun gain chiffré de productivité, coût ou qualité n’est revendiqué sans mesure dédiée.

## Liens
- Workflow : https://github.com/Wavell38/ai-assisted-software-engineering-workflow
- Prompt Archiver : https://github.com/Wavell38/prompts_archiver

## Environnement technique
**ChatGPT · OpenAI Codex · Git / GitHub · Markdown · Mermaid · TOML · ADR · tests automatisés · qualification expérimentale · benchmarking / profiling · SonarQube lorsque disponible · Python · uv · Prompt Archiver**

## Version courte pour CV
- Conception d’un workflow de développement assisté par agents IA, structuré en tranches bornées avec contrats d’exécution et critères d’acceptation explicites.
- Modèle documentaire et chargement progressif du contexte pour préserver architecture, décisions et périmètre.
- Reviews indépendantes spécialisées et remédiation proportionnée au risque.
- Pilotage humain des arbitrages structurants, avec mécanismes de blocage et de réévaluation.
