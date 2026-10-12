export default {
  id:"agentic-workflow", group:"featured", order:3, kind:"R&D transverse", status:"En évolution",
  title:"Workflow de développement assisté par agents IA", subtitle:"Ingénierie logicielle assistée par IA, sous pilotage humain",
  titleAccent:"agents IA",
  role:"Concepteur du workflow / développement & expérimentation",
  period:"Depuis janvier 2026",
  summary:"Un cadre réutilisable pour déléguer des tranches de développement bornées à des agents IA, avec pilotage humain, validation par les preuves et reviews proportionnées au risque.",
  tags:["Agents IA","Git","Reviews","Qualification","Prompt Archiver"],
  facts:["R&D en évolution","Tranches bornées","Pilotage humain"],
  context:"Projet transverse de R&D personnelle consacré à la conception, à l’expérimentation et à l’amélioration continue d’un workflow d’ingénierie logicielle assistée par agents IA. Le passage d’un usage ponctuel d’assistants à la délégation de tâches d’ingénierie plus autonomes impose de contrôler le périmètre confié, le contexte, les décisions structurantes, les critères d’acceptation et les preuves produites. Utilisé sur plusieurs projets logiciels et systèmes, ce cadre s’inscrit dans une logique de Spec-Driven Development au sens large, avec séparation entre raisonnement, autorités documentaires et exécution.",
  objective:[
    "Concevoir un cadre réutilisable pour déléguer des travaux logiciels cohérents à des agents IA tout en conservant sous responsabilité humaine les objectifs, les arbitrages structurants, l’architecture acceptée, l’interprétation des résultats et la trajectoire globale du projet."
  ],
  sections:[
    {
      title:"Pilotage humain & exécution assistée",
      text:"L’humain conserve le cadrage et les décisions structurantes ; les agents exécutent dans le périmètre accepté.",
      bullets:[
        "Cadrage des objectifs, formulation des hypothèses, examen des alternatives et arbitrages structurants au niveau humain, avec l’appui de ChatGPT.",
        "Délégation à l’agent principal de l’exploration, de l’implémentation, des validations, de la coordination des reviewers et de la remédiation.",
        "Escalade vers une décision humaine lorsqu’un changement dépasse le cadre accepté."
      ]
    },
    {
      title:"Tranches bornées & contrats d’exécution",
      text:"Hiérarchie de travail : Projet → Roadmap → Phase → Tranche → Prompt d’exécution.",
      bullets:[
        "Tranches définies comme des unités de travail bornées, cohérentes, validables et compatibles avec un rollback pratique.",
        "Prompts servant de contrats d’exécution bornés : périmètre, exclusions, invariants, critères d’acceptation et preuves attendues.",
        "Sélection du modèle et du niveau de raisonnement selon la difficulté et le risque."
      ]
    },
    {
      title:"Documentation faisant autorité & contexte progressif",
      text:"Une autorité principale par information normative, avec chargement progressif du contexte utile à la tranche courante.",
      bullets:[
        "Rôles distincts pour les règles de travail, l’architecture, les codebase maps, les ADR, les contrats, la roadmap, les plans de phase et les rapports de qualification.",
        "Chargement des seules autorités et portions de code pertinentes pour le travail délégué.",
        "Distinction entre documents vivants et documents historiques de décision ou de preuve."
      ]
    },
    {
      title:"Validation fondée sur des preuves",
      text:"Les validations sont adaptées au projet et à la tranche ; les résultats sont interprétés avec leurs conditions et leurs limites.",
      bullets:[
        "Tests, lint, analyse de types et builds adaptés au périmètre ; SonarQube et analyses statiques lorsque disponibles et pertinents.",
        "Qualification expérimentale documentant baseline, conditions, reproduction, mesures, artefacts, verdict et limites.",
        "Benchmarks et profiling lorsque les performances constituent un risque."
      ]
    },
    {
      title:"Reviews indépendantes & remédiation",
      text:"La review est proportionnée au risque et à la portée du changement, avec des reviewers spécialisés travaillant dans des contextes frais.",
      bullets:[
        "Cinq profils de review : contrat, correction fonctionnelle, tests, architecture et documentation.",
        "Constats structurés : verdict, confiance, localisation, preuve, impact et remédiation minimale.",
        "Consolidation de chaque constat : accepté et corrigé, accepté et différé, rejeté avec preuve ou décision humaine requise."
      ]
    },
    {
      title:"Gestion des échecs & checkpoint anti-dérive",
      text:"Le checkpoint anti-dérive permet de recadrer ou d’arrêter une direction lorsque les preuves ne justifient plus de poursuivre.",
      bullets:[
        "États distincts pour les runs, la roadmap, les qualifications et les reviews ; statuts PASSED / BLOCKED pour les runs.",
        "Réévaluation lorsque les corrections s’accumulent, que l’architecture grossit sans progrès comparable, que les mesures invalident les projections ou que l’investissement passé devient la justification principale pour continuer.",
        "Retour possible à une investigation, à une qualification supplémentaire, à une nouvelle découpe ou à un redesign, sous pilotage humain."
      ]
    },
    {
      title:"Traçabilité & Prompt Archiver",
      text:"Conception et développement de Prompt Archiver / prompts_archiver, outil open source conservant le prompt, le rapport final et les métadonnées des runs activés.",
      bullets:[
        "Versionnement des décisions structurantes et de la documentation d’architecture avec Git ; conservation des rapports d’agents et de qualification.",
        "Chaîne de provenance entre besoin ou décision, autorités, tranche, prompt, exécution, rapport et modifications Git.",
        "Traçabilité limitée aux éléments conservés, sans revendication d’archivage automatique exhaustif."
      ]
    }
  ],
  resultsIntro:"Cycle formalisé : préparation → exécution bornée → validation → review proportionnée → remédiation → décision suivante.",
  results:[
    "Workflow réutilisable appliqué à plusieurs projets logiciels et systèmes.",
    "Corpus versionné de guides, templates et politiques documentaires.",
    "Deux skills opérationnels et cinq profils de reviewers spécialisés dans la version auditée.",
    "Prompt Archiver développé et publié en open source."
  ],
  resultsLinks:[["Prompt Archiver","https://github.com/Wavell38/prompts_archiver"]],
  limits:"Cadre de R&D en amélioration continue, sous pilotage humain. Les validations et reviews apportent des preuves dans le périmètre évalué, sans garantir la qualité.",
  limitsItems:[
    "Les objectifs, les arbitrages structurants, l’architecture acceptée et l’interprétation des résultats restent sous responsabilité humaine.",
    "Aucun gain chiffré de productivité, de coût ou de qualité n’est revendiqué sans mesure dédiée.",
    "Prompt Archiver conserve les éléments des runs activés ; la traçabilité automatique exhaustive n’est pas revendiquée."
  ],
  environmentGroups:[
    {title:"Assistance & exécution",items:["ChatGPT","OpenAI Codex"]},
    {title:"Documentation & versionnement",items:["Git / GitHub","Markdown","Mermaid","TOML","ADR"]},
    {title:"Validation & qualification",items:["Tests automatisés","Qualification expérimentale","Benchmarking / profiling","SonarQube lorsque disponible"]},
    {title:"Traçabilité & outillage",items:["Python","uv","Prompt Archiver"]}
  ],
  links:[["Workflow GitHub","https://github.com/Wavell38/ai-assisted-software-engineering-workflow"],["Prompt Archiver","https://github.com/Wavell38/prompts_archiver"]],
  media:{
    lead:{
      type:"illustration",
      src:"./assets/workflow-agentique/illustration.png",
      alt:"Illustration du développement assisté par IA : éditeur de code, assistant et étapes de planification, tests et review.",
      width:1448, height:1086
    }
  }
};
