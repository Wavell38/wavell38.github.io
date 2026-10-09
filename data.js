window.PORTFOLIO = {
  projects: [
    {
      id:"cards-analyzer", group:"featured", order:1, kind:"Projet personnel", status:"En cours",
      title:"Cards Analyzer", subtitle:"Banc d’acquisition optique multi-éclairage",
      titleAccent:"Analyzer",
      role:"Concepteur système / développeur logiciel & vision",
      period:"Depuis mai 2026",
      summary:"Un système complet d’acquisition haute résolution qui relie mécanique, optique, éclairage, ROS 2/C++, backend TypeScript et interface web.",
      tags:["ROS 2","C++20","Vision","TypeScript","FreeCAD"],
      facts:["Prototype V1 avancé","9 groupes lumineux","Arducam 64 MP"],
      labels:{objectives:"Objectif V1"},
      resultsIntro:"Ce que la V1 démontre aujourd’hui.",
      context:"Projet personnel de R&D systèmes & vision destiné à analyser visuellement des cartes de collection dans des conditions d’acquisition contrôlées et reproductibles. La réflexion initiale envisageait une station fortement automatisée — déplacement sur rails, acquisition par tuiles, retournement et alimentation depuis des racks — puis le périmètre a volontairement été réduit à une V1 permettant de qualifier d’abord la mécanique, l’optique, l’acquisition et le traitement.",
      objective:[
        "Maîtriser le positionnement de la carte et de la caméra.",
        "Contrôler les conditions lumineuses et synchroniser précisément lumière et acquisition.",
        "Produire des captures haute résolution reproductibles, traçables et configurables par profils.",
        "Construire progressivement les corrections photométriques et la localisation géométrique nécessaires à l’analyse de surface."
      ],
      sections:[
        {
          title:"Conception système & mécanique",
          text:"Le prototype est pensé comme un banc d’acquisition complet plutôt qu’une simple caméra montée au-dessus d’une carte.",
          bullets:[
            "Conception d’une enceinte optique, d’un support de carte, d’un positionnement réglable de la caméra et des interfaces d’assemblage.",
            "Architecture mécanique modulaire séparant coque optique, structure porteuse de caméra et électronique.",
            "Conception du support coulissant de carte, des supports électroniques et du cheminement des câbles.",
            "CAO sous FreeCAD, adaptation des grandes pièces aux contraintes d’impression et ajout de renforts.",
            "Fabrication additive du prototype et itérations d’assemblage."
          ],
          media:[
            {
              src:"./assets/cards-analyzer/cad-section.png",
              alt:"Card Analyzer — vue CAO interne montrant l’organisation des sous-ensembles mécaniques.",
              width:939, height:848
            },
            {
              src:"./assets/cards-analyzer/drawer-open.png",
              alt:"Prototype Card Analyzer — tiroir d’insertion de carte ouvert.",
              width:1254, height:1254
            }
          ]
        },
        {
          title:"Optique & éclairage",
          text:"Une photographie unique ne révèle pas correctement tous les défauts d’une carte brillante, texturée ou holographique. La V1 multiplie donc les conditions d’éclairage de manière contrôlée.",
          bullets:[
            "Arducam 64 MP sur Raspberry Pi 5 pour les captures analytiques haute résolution.",
            "Un éclairage global diffus complété par huit éclairages directionnels.",
            "Neuf groupes lumineux pilotables : un global et huit directions réparties sur deux angles.",
            "Travail sur les diffuseurs, les orientations de lumière et la reproductibilité des séquences."
          ]
        },
        {
          title:"Architecture logicielle",
          text:"La chaîne est découpée pour isoler la logique métier des adaptateurs matériels et permettre de qualifier séparément chaque sous-système.",
          bullets:[
            "Architecture modulaire associant ROS 2 / C++, NestJS / TypeScript et React / TypeScript.",
            "Composants dédiés à la caméra, l’éclairage, l’acquisition, la calibration, le traitement d’image, les workflows de scan et le bringup.",
            "Séparation entre logique métier testable et adaptateurs matériels ou ROS lorsque pertinent.",
            "Contrats versionnés pour les sessions d’acquisition, données RAW, artefacts de calibration et géométrie."
          ]
        },
        {
          title:"Caméra & acquisition",
          text:"L’acquisition doit garantir qu’une image correspond réellement à l’état lumineux et aux paramètres demandés, pas seulement qu’un fichier a été produit.",
          bullets:[
            "Backend libcamera persistant, avec gestion distincte de la preview et des captures analytiques.",
            "Contrôle de l’exposition, du gain, de la balance des blancs, du focus et des phases de warm-up.",
            "Garde-fous temporels vérifiant qu’une frame capturée a commencé son exposition après la commande lumineuse correspondante.",
            "Écritures asynchrones des images et synchronisation avant publication d’une session exploitable."
          ],
          media:[{
            src:"./assets/cards-analyzer/electronics-top.png",
            alt:"Prototype Card Analyzer — vue rapprochée de l’électronique et du support caméra.",
            width:1254, height:1254
          }]
        },
        {
          title:"Éclairage & orchestration",
          text:"Les séquences d’acquisition sont configurées plutôt que codées en dur, afin de pouvoir comparer et reproduire des conditions expérimentales.",
          bullets:[
            "Abstraction d’éclairage et backend PCA9685 / I²C testable sans matériel physique.",
            "Gestion des intensités, états complets ou partiels et délais de stabilisation.",
            "Profils YAML décrivant éclairages, intensités, exposition, temporisations et captures.",
            "Séquences asynchrones avec progression, annulation, gestion des erreurs et captures dark."
          ],
          media:[{
            src:"./assets/cards-analyzer/lighting-driver.png",
            alt:"Prototype Card Analyzer — gros plan sur le module de pilotage et le câblage d’éclairage.",
            width:1254, height:1254
          }]
        },
        {
          title:"Traitement d’image",
          text:"Le traitement progresse par étapes qualifiées, en conservant séparément méthodes établies, candidates et rejetées.",
          bullets:[
            "Pipeline RAW Bayer et traitements CFA.",
            "Mise en place progressive de corrections photométriques, notamment dark / flat.",
            "Premières étapes de localisation géométrique de la carte.",
            "Qualification séparée de méthodes candidates pour les bords et les coins afin d’éviter de figer prématurément une approche."
          ]
        },
        {
          title:"Backend & interface",
          text:"La couche applicative permet de piloter le banc, suivre l’état des acquisitions et exposer les fonctions ROS à une interface utilisateur.",
          bullets:[
            "API NestJS / Fastify avec intégration ROS via rclnodejs.",
            "WebSocket pour le suivi d’état et de progression.",
            "Interface React / Vite pour piloter les acquisitions et visualiser leur déroulement."
          ]
        }
      ],
      results:[
        "Prototype V1 mécanique et électronique construit, avec conception CAO, fabrication additive et intégration du banc.",
        "Caméra haute résolution et neuf groupes lumineux pilotés, avec contrôles temporels liant la capture à la condition lumineuse.",
        "Profils YAML, séquencement, annulation, captures RAW, métadonnées et publication de sessions implémentés.",
        "Chaîne RAW avec correction dark et application d’un flat-field compatible intégrée au chemin nominal.",
        "Orchestration ROS 2 / NestJS / React pour piloter les acquisitions, la preview et le suivi d’exécution.",
        "Repères géométriques, vue de localisation, localisateur grossier et raffineur pleine résolution développés."
      ],
      limits:"La V1 sait acquérir et préparer les données de manière traçable ; la qualification géométrique précise et l’analyse finale des défauts restent à aboutir.",
      limitsItems:[
        "Coins et CardBoundary complet non qualifiés ; géométrie encore hors du runner nominal et politique de distorsion ouverte.",
        "Le parcours Web reste centré sur l’acquisition ; la visualisation analytique complète n’est pas finalisée.",
        "Pas de qualification globale complète à HEAD : certaines suites dépendantes de l’environnement n’ont pas été rejouées intégralement."
      ],
      nextSteps:"Poursuivre la qualification progressive de la V1 avant d’engager une automatisation mécanique plus ambitieuse.",
      nextStepsItems:[
        "Rectification appliquée, registration multi-captures, cartes multi-lumières et détection finale des défauts encore prévues.",
        "Rails, capture par tuiles, retournement et alimentation automatique restent des pistes exploratoires hors V1."
      ],
      environment:["C++20","ROS 2 Jazzy","rclcpp","libcamera","OpenCV","RAW Bayer RGGB","Raspberry Pi 5","Arducam 64 MP","PCA9685","I²C","NestJS","TypeScript","Fastify","rclnodejs","WebSocket","React","Vite","JSON","YAML","FreeCAD","KiCad","PrusaSlicer","Impression 3D","Tests / qualification","Agents IA"],
      environmentGroups:[
        {title:"Cœur logiciel & robotique",items:["C++20","ROS 2 Jazzy","rclcpp","rclnodejs"]},
        {title:"Acquisition & vision",items:["libcamera","OpenCV","RAW Bayer RGGB","Raspberry Pi 5","Arducam 64 MP","PCA9685","I²C"]},
        {title:"Backend & interface",items:["NestJS","TypeScript","Fastify","WebSocket","React","Vite"]},
        {title:"Données & configuration",items:["JSON","YAML"]},
        {title:"CAO & prototypage",items:["FreeCAD","KiCad","PrusaSlicer","Impression 3D"]},
        {title:"Qualité & méthode",items:["Tests / qualification","Agents IA"]}
      ],
      media:{
        lead:{
          src:"./assets/cards-analyzer/prototype.png",
          alt:"Prototype V1 réel de Cards Analyzer : dôme optique, structure caméra, éclairages et câblage intégrés.",
          caption:"Prototype V1 — vue d’ensemble réelle",
          width:1254, height:1254
        }
      }
    },
    {
      id:"quant-platform", group:"featured", order:2, kind:"Projet personnel", status:"En cours",
      title:"Plateforme de recherche quantitative", subtitle:"Backtest, exécution simulée & performance",
      titleAccent:"quantitative",
      role:"Développeur logiciel / architecture & performance",
      period:"Depuis juin 2026",
      summary:"Un projet software centré sur la reproductibilité, la performance et la modélisation explicite de l’exécution, du portefeuille et du risque.",
      tags:["Rust","Python","Architecture","Performance","Profiling"],
      facts:["R&D en cours","Python → Rust","Streaming borné"],
      context:"Projet personnel de R&D logicielle visant à rejouer des données de marché historiques, exécuter des stratégies dans un environnement simulé et comparer leurs comportements dans des conditions reproductibles. Une première implémentation Python a permis de qualifier le domaine et les règles d’exécution. Les limites mesurées en benchmark ont ensuite conduit à reprendre le runtime en Rust, avec une qualification systématique des dépendances, des performances et de la mémoire.",
      objective:[
        "Construire un environnement de backtest déterministe et performant pour des campagnes longues, avec modélisation explicite des données de marché, de l’exécution, du portefeuille et du risque."
      ],
      sections:[
        {
          title:"Modélisation & replay de marché",
          bullets:[
            "Représentation des données historiques : carnet d’ordres L2, trades, prix de référence/index et événements de financement.",
            "Construction d’un pipeline de replay reproductible."
          ]
        },
        {
          title:"Exécution simulée & portefeuille",
          bullets:[
            "Modélisation des ordres, fills, frais et positions.",
            "Gestion de l’état du portefeuille et de sa restauration.",
            "Qualification des règles d’exécution et des contraintes de risque.",
            "Isolation de l’état entre plusieurs campagnes."
          ]
        },
        {
          title:"Migration Python → Rust",
          bullets:[
            "Première verticale fonctionnelle en Python pour qualifier le domaine.",
            "Benchmarks des limites de temps d’exécution, puis reprise du runtime en Rust.",
            "Qualification du moteur tiers par verticales expérimentales avant extension de l’architecture."
          ]
        },
        {
          title:"Streaming & campagnes longues",
          bullets:[
            "Streaming borné pour éviter le chargement intégral de longues périodes de données.",
            "Conservation de l’ordre des événements et des groupes de même timestamp.",
            "Séparation entre résolution du marché et cadence de décision de la stratégie.",
            "Campagnes sur des moteurs fraîchement instanciés pour vérifier la reproductibilité."
          ]
        },
        {
          title:"Performance & mémoire",
          bullets:[
            "Benchmarks du temps d’exécution, de la mémoire et de la concurrence entre workers.",
            "Profilage de la croissance mémoire et identification de la rétention de blocs de données encodés comme source importante de cette croissance.",
            "Définition de limites de concurrence adaptées à la machine de développement."
          ]
        },
        {
          title:"Bibliothèque de stratégies",
          bullets:[
            "Préparation d’une bibliothèque de stratégies paramétrables.",
            "Séparation des outils génériques des stratégies elles-mêmes.",
            "Préparation de campagnes de comparaison et d’optimisation."
          ]
        }
      ],
      results:[
        "Première plateforme Python fonctionnelle pour qualifier le domaine, puis runtime Rust qualifié progressivement.",
        "Replay reproductible avec vérification de l’état des ordres, des positions et des données de marché.",
        "Streaming borné validé sur des campagnes multi-jours.",
        "Profiling ayant identifié un goulot de rétention mémoire et permis d’adapter la concurrence.",
        "Base technique prête pour des stratégies paramétrables."
      ],
      limits:"Projet de recherche logicielle en cours, non présenté comme une plateforme de trading prête pour production. Les résultats techniques ne constituent pas une validation financière ni une preuve de rentabilité de stratégies.",
      nextSteps:"La cible à long terme est une boucle automatisée de recherche et d’adaptation des stratégies aux conditions de marché. Ces capacités restent des étapes futures du projet.",
      nextStepsItems:[
        "Automatiser à terme des campagnes régulières et reproductibles pour réévaluer les stratégies face aux conditions de marché courantes.",
        "Développer une évaluation graduée pour sélectionner les stratégies les plus adaptées, en conserver plusieurs et ajuster automatiquement leurs paramètres lorsque nécessaire.",
        "Faire coexister à terme des stratégies en test simulé et des stratégies utilisées en réel après validation approfondie, avec une adaptation continue fondée sur ces réévaluations."
      ],
      environmentGroups:[
        {title:"Langages & runtime",items:["Rust","Cargo","Python","Moteurs de backtest"]},
        {title:"Données & architecture",items:["Données L2 / marché","Architecture modulaire"]},
        {title:"Validation & mesure",items:["Tests automatisés","pytest","Ruff","Profiling temps/mémoire"]},
        {title:"Développement",items:["Git","Agents IA"]}
      ],
      media:{
        lead:{
          type:"illustration",
          src:"./assets/plateforme-quantitative/Pipeline-futuriste.png",
          alt:"Illustration conceptuelle d’un pipeline reliant données de marché, backtest, simulation et stratégies.",
          width:1448, height:1086
        }
      }
    },
    {
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
    },
    {
      id:"camera-mapper", group:"systems", kind:"Robotique / vision", status:"V1 fonctionnelle",
      title:"Camera Mapper", subtitle:"Perception globale de terrain",
      titleAccent:"Mapper",
      role:"Intégrateur robotique / développeur perception terrain",
      period:"Depuis mars 2026",
      summary:"Caméra sur mât fixe à côté du terrain, homographie, ArUco + mouvement et world model temporel des robots et objets sur Raspberry Pi 5.",
      tags:["ROS 2","C++","OpenCV","ArUco","Raspberry Pi 5"],
      facts:["V1 fonctionnelle","Terrain 3 × 2 m","Utilisation ponctuelle en compétition"],
      // Editorial source: assets/camera-mapper/camera-mapper-portfolio.md
      context:"Projet personnel conçu en autonomie dans le contexte collectif de la Coupe de France de Robotique. Une caméra sur un mât fixe d’environ 1,5 m, placé à côté du terrain, est associée à un Raspberry Pi 5 sous ROS 2. Le module transforme une vue oblique en positions métriques et fournit aux autres composants un état global des robots présents, des marqueurs identifiables et des objets / pièces de jeu détectables. Les interfaces de visualisation servent aux essais et au debug. La V1, utilisée ponctuellement en compétition, constitue une étape de validation ; ses limites de couverture et de cadence motivent une V2 à repenser.",
      labels:{objectives:"Objectif"},
      objective:[
        "Construire la chaîne Caméra → interprétation de scène → projection terrain → suivi temporel → world model.",
        "Fournir au robot un état exploitable des éléments présents et mobiles sur le terrain, notamment les robots suivis et les objets / pièces détectables.",
        "Adapter cette chaîne aux ressources d’un Raspberry Pi 5 et aux contraintes mécaniques de l’installation."
      ],
      sections:[
        {
          title:"Architecture ROS 2 & acquisition",
          text:"Une architecture C++ en composants composables, séparant acquisition caméra, interprétation de scène et world model.",
          bullets:[
            "Backend libcamera réel et backend synthétique.",
            "Profils de configuration, launch files, messages personnalisés et communications intra-process.",
            "Outils de visualisation et API HTTP / JSON / SSE pour les essais, le debug et l’observation du pipeline."
          ]
        },
        {
          title:"Calibration & projection terrain",
          text:"Conversion des coordonnées image en coordonnées métriques sur un terrain de 3 × 2 m par homographie.",
          bullets:[
            "Profils physiques gauche/droite avec persistance des correspondances.",
            "Prise en compte approximative de la hauteur des marqueurs.",
            "Contrôles géométriques et filtrage des positions hors terrain."
          ]
        },
        {
          title:"Perception & suivi multi-objets",
          text:"Détection ArUco des éléments portant un marqueur identifiable, complétée par MOG2 pour faire remonter des objets / pièces sans ArUco lorsque pertinent.",
          bullets:[
            "Stabilisation par corrélation de phase pour limiter l’effet des vibrations de la caméra.",
            "Suivi multi-objets avec prédiction simple, confirmation de pistes et gestion des pertes temporaires.",
            "Fusion avec les identités ArUco et garde-fous contre certaines associations ambiguës.",
            "Objectif : fournir un état exploitable des robots et objets présents sur le terrain, au-delà de la visualisation caméra."
          ]
        },
        {
          title:"World model temporel",
          text:"Un état temporel associant identifiant, classe, position, confiance et état de suivi.",
          bullets:[
            "Association des observations successives.",
            "Conservation temporaire, expiration et publication de deltas.",
            "Distinction entre robots suivis et marqueurs statiques.",
            "Mise à disposition d’une représentation globale destinée aux autres composants du système robotique."
          ]
        },
        {
          title:"Optimisation sur Raspberry Pi 5",
          bullets:[
            "Réduction de résolution sur certaines étapes.",
            "Cadences différenciées, régions d’intérêt (ROI) et traitement ArUco décimé.",
            "Utilisation de la dernière image disponible et communications intra-process.",
            "Analyse des limites de cadence ayant conduit à privilégier une future refonte plutôt que des micro-optimisations successives."
          ]
        },
        {
          title:"CAO & intégration mécanique",
          text:"Intégration d’un mât fixe d’environ 1,5 m en profilé 20 × 20 mm, placé à côté du terrain.",
          bullets:[
            "Conception sous CAO du support de caméra en tête de mât.",
            "Conception d’un support / boîtier pour le Raspberry Pi 5 et l’électronique associée.",
            "Travail sur le positionnement, la rigidité, l’encombrement et la fixation.",
            "Adaptation mécanique de la plaque support en acier pour l’installation du mât."
          ]
        },
        {
          title:"Atténuation des vibrations du mât",
          text:"Stabilisateurs mécaniques dédiés aux oscillations avant / arrière et gauche / droite, selon un principe proche d’un absorbeur vibratoire passif accordé.",
          bullets:[
            "Deux languettes flexibles en PETG, orientées selon les axes principaux de vibration et chargées par des masses, reprennent une partie du mouvement oscillatoire du mât.",
            "Longueur, épaisseur et masses choisies selon la flexibilité du PETG et un ordre de grandeur cible autour de 6–7 Hz pour les oscillations susceptibles de perturber la caméra.",
            "Dispositif inspiré de solutions d’atténuation employées sur des structures souples / câbles, puis adapté au prototype.",
            "Effet d’atténuation observé qualitativement sur le montage, sans campagne instrumentée complète pour caractériser le gain, la fréquence propre ou le facteur d’amortissement."
          ]
        }
      ],
      results:[
        "Chaîne Caméra → Perception → World Model fonctionnelle dans la V1.",
        "Projection dans le repère terrain par homographie, détection/fusion ArUco + mouvement et suivi temporel.",
        "Représentation globale destinée à fournir au robot des informations sur les robots et objets présents sur le terrain.",
        "Essais locaux documentés autour de 5–7 Hz sur Raspberry Pi 5 : valeur indicative, non issue d’un benchmark reproductible.",
        "CAO et intégration physique du support caméra, du boîtier Raspberry Pi 5 et du mât fixe.",
        "Stabilisateurs mécaniques PETG réalisés, avec une atténuation observée qualitativement des oscillations du mât dans la zone ciblée.",
        "Utilisation ponctuelle en compétition, à une occasion.",
        "Identification des limites de cadence et de couverture mono-caméra, conduisant à envisager une V2 plus performante."
      ],
      limits:"La V1 est un prototype fonctionnel expérimenté en conditions réelles. Elle n’est pas suffisamment rapide et couvrante pour constituer un système de perception critique fiable en match.",
      limitsItems:[
        "Cadence du pipeline trop faible pour en faire un composant central fiable pendant les matchs.",
        "Couverture du terrain insuffisante avec une seule caméra dans certaines situations.",
        "Atténuation mécanique observée qualitativement, sans caractérisation instrumentée complète. Les 6–7 Hz sont la zone visée lors de la conception des stabilisateurs, pas une qualification métrologique du mât."
      ],
      nextSteps:"Une prochaine version est envisagée pour le prochain cycle de Coupe de France de Robotique, avec pour priorités la couverture et la cadence.",
      nextStepsItems:[
        "Réévaluer une caméra versus deux caméras pour améliorer la couverture du terrain.",
        "Mesurer la charge réelle du pipeline pour déterminer si un Raspberry Pi 5 reste suffisant ou si un calculateur plus performant est nécessaire.",
        "Revoir le pipeline pour augmenter la cadence utile avant toute réintégration en compétition.",
        "Conserver le world model global et ne fournir une nouvelle version à l’équipe qu’après validation de performances et de fiabilité suffisantes."
      ],
      environmentGroups:[
        {title:"Architecture & logiciel",items:["C++","ROS 2 Jazzy","rclcpp","rclcpp_components","Python","rclpy","YAML"]},
        {title:"Vision & acquisition",items:["OpenCV","ArUco","MOG2","libcamera","Homographie","Suivi multi-objets","World model"]},
        {title:"Matériel & système",items:["Raspberry Pi 5","Camera Module 3 Wide / IMX708","Linux / Ubuntu 24.04"]},
        {title:"CAO & intégration",items:["FreeCAD / CAO","Profilé 20 × 20 mm","PETG","Impression 3D","Prototypage mécanique"]},
        {title:"Interfaces & outils",items:["HTTP / JSON / SSE","Git"]}
      ],
      media:{
        lead:{
          type:"illustration",
          src:"./assets/camera-mapper/illustration.png",
          alt:"Illustration conceptuelle d’une caméra sur mât observant un terrain de 3 × 2 m et de la chaîne de perception jusqu’au world model temporel.",
          caption:"Illustration conceptuelle de la chaîne de perception",
          width:1254, height:1254
        }
      }
    },
    {
      id:"lidar-2d-3d", group:"systems", kind:"Systèmes / embarqué", status:"POC arrêté",
      title:"LiDAR 2D → reconstruction 3D", subtitle:"Prototype motorisé RP2040 / ROS 2",
      period:"2026",
      summary:"Transformer un LD19 2D en acquisition 3D via rotation motorisée, encodeur absolu, firmware RP2040/PIO et pipeline PointCloud2.",
      tags:["RP2040","PIO","ROS 2","C++","FreeCAD"],
      facts:["POC fonctionnel","PointCloud2","micro-ROS Windows"],
      context:"Exploration d’une reconstruction 3D à partir d’un LiDAR 2D monté verticalement sur un mécanisme tournant, afin d’évaluer l’intérêt du concept pour une future perception robotique.",
      work:["Mécanisme motorisé FreeCAD, impression 3D, A4988 et encodeur MT6701.","Firmware RP2040 : UART LD19, I²C, génération moteur PIO et protocole USB binaire avec CRC.","Orchestrateur C++/ROS 2 : décodage, validation, assemblage et PointCloud2.","Transformation géométrique 2D→3D tenant compte de l’angle externe et de l’offset optique.","Adaptation de micro-ROS/PlatformIO sous Windows : chemins longs, toolchains host/ARM et conflit atomique."],
      results:["Chaîne complète de prototype réalisée.","Reconstruction 3D et scène reconnaissable dans RViz2 rapportées lors des essais.","Compilation micro-ROS Windows attestée par logs et artefacts."],
      limits:"Projet arrêté après démonstration du concept : densité, précision et coût de calibration insuffisants pour l’usage robotique visé. L’audit ultérieur a aussi révélé des défauts firmware résiduels, confirmant l’état POC non qualifié."
    },
    {
      id:"imu-glove", group:"systems", kind:"Embarqué / électronique", status:"En pause",
      title:"Gant IMU", subtitle:"Interface gestuelle et architecture multi-capteurs",
      titleAccent:"IMU",
      role:"Concepteur système embarqué / développeur électronique & logiciel",
      period:"2025 – janvier 2026",
      summary:"Du prototype à quatre MPU6050 vers des modules IMU miniaturisés et un hub RP2040 4 couches.",
      tags:["RP2040","KiCad","SPI","USB","IMU"],
      facts:["En pause · PCB non qualifiés","8 positions IMU logiques","Jusqu’à 10 ports IMU physiques"],
      context:"Projet personnel visant à créer une interface gestuelle portable, initialement pensée pour commander rapidement un système semi-autonome sans interface vocale ni contrôleur tenu en main. Le projet a évolué d’un prototype basé sur des IMU du commerce vers une architecture personnalisée : modules inertiels miniaturisés, hub RP2040, transport vers l’hôte, calibration, orientation et reconnaissance de gestes.",
      objective:[
        "Acquérir les mouvements de plusieurs segments de la main et centraliser les données de plusieurs IMU.",
        "Transmettre les données vers un hôte pour transformer certains gestes en commandes.",
        "Réduire progressivement l’encombrement et améliorer l’intégration au gant."
      ],
      sections:[
        {
          title:"Prototypes logiciels & premières détections",
          bullets:[
            "Première génération autour de quatre MPU6050 sur deux bus I²C sous Linux / ROS 2.",
            "Acquisition et traitement de données inertiales.",
            "Détection expérimentale de gestes, avec traces historiques de déclenchements START / STOP.",
            "Chaîne hôte ultérieure organisée autour de 8 positions IMU logiques, avec transport sérialisé et traitements de calibration / orientation."
          ]
        },
        {
          title:"Architecture système multi-capteurs",
          text:"L’architecture sépare les modules IMU, le hub, le transport et le logiciel hôte.",
          bullets:[
            "Étude du positionnement des capteurs sur les doigts et le dos de la main.",
            "Distinction entre les 8 positions IMU logiques définies côté logiciel hôte et la capacité physique prévue du hub, jusqu’à 10 ports IMU."
          ]
        },
        {
          title:"Modules IMU miniaturisés sous KiCad",
          bullets:[
            "Conception de modules personnalisés autour de l’ICM-42688-P, puis de l’ICM-45686.",
            "Alimentations locales, découplages, connectique et routage SPI.",
            "Module actuel d’environ 10,5 × 12,65 mm dans la CAO / PCB auditée.",
            "Préparation des exports de fabrication, de la BOM et des fichiers de placement.",
            "PCB IMU reçus physiquement, mais non assemblés ni soudés et non testés électriquement avant la mise en pause."
          ]
        },
        {
          title:"Hub RP2040 4 couches",
          text:"Hub conçu pour agréger jusqu’à 10 connexions IMU physiques ; la carte n’a pas été assemblée ni qualifiée.",
          bullets:[
            "Bus SPI partagé SCLK / MOSI / MISO avec chip-select individuel.",
            "Flash QSPI, quartz, USB natif, distribution d’alimentation et protections.",
            "Schématique, routage, exports de production et vérifications ERC / DRC."
          ]
        },
        {
          title:"Transport, calibration & orientation",
          bullets:[
            "Chaîne de transport série utilisant COBS et CRC32C.",
            "Calibration et reconstruction d’orientations côté hôte.",
            "Architecture prévue pour centraliser les données avant interprétation gestuelle.",
            "Expérimentation d’un classifieur RTrees restée non qualifiée, faute de jeu de données et de modèle final."
          ]
        },
        {
          title:"CAO & intégration au gant",
          bullets:[
            "Modélisation de boîtiers autour des PCB et de supports imprimés en 3D.",
            "Essais d’intégration au textile et itérations pour réduire l’encombrement et améliorer la fixation.",
            "Travail exploratoire sur les joints et matériaux de protection contre l’humidité, sans certification IP."
          ]
        }
      ],
      results:[
        "Plusieurs générations d’architecture, du prototype MPU6050 aux cartes personnalisées.",
        "Acquisition multi-IMU et premières reconnaissances gestuelles démontrées sur les prototypes logiciels historiques.",
        "Modules IMU miniaturisés conçus, fichiers de fabrication préparés et PCB reçus.",
        "Hub RP2040 4 couches conçu pour agréger jusqu’à 10 connexions IMU physiques.",
        "Architecture de transport, calibration et orientation structurée."
      ],
      limits:"Projet mis en pause avant intégration complète de l’électronique personnalisée.",
      limitsItems:[
        "Les PCB IMU reçus n’ont pas été soudés ni testés électriquement.",
        "Le hub RP2040 n’a pas été assemblé ni qualifié.",
        "L’audit électronique a identifié des points à corriger ou vérifier avant fabrication / usage.",
        "Le classifieur RTrees reste non qualifié, faute de jeu de données et de modèle final.",
        "Aucune certification d’étanchéité ou IP n’a été réalisée."
      ],
      environmentGroups:[
        {title:"Logiciel & transport",items:["C++","ROS 2","Linux","COBS","CRC32C","Calibration / orientation"]},
        {title:"Électronique & capteurs",items:["RP2040","SPI","I²C","USB","MPU6050","ICM-42688-P","ICM-45686","KiCad","PCB 4 couches"]},
        {title:"CAO & intégration",items:["FreeCAD","Impression 3D","Textile / prototypage mécanique"]}
      ],
      media:{
        lead:{
          type:"illustration",
          src:"./assets/gant-IMU/illustration.png",
          alt:"Illustration conceptuelle de modules IMU reliés à un hub central, avec acquisition inertielle et reconstruction d’orientation.",
          caption:"Illustration conceptuelle de l’architecture multi-capteurs",
          width:1254, height:1254
        }
      }
    },
    {
      id:"drone", group:"systems", kind:"Robotique / communications", status:"Prototype expérimental",
      title:"Drone semi-autonome", subtitle:"ArduPilot, MAVLink, ROS 2 et réseau mesh",
      period:"2024–2025",
      summary:"Drone assemblé pièce par pièce, architecture Pi 4 embarqué / Pi 5 au sol et passerelle MAVLink ↔ ROS 2 bidirectionnelle.",
      tags:["ArduPilot","MAVLink","ROS 2","C++","Mesh"],
      facts:["Pi 4 embarqué","Pi 5 au sol","Bridge bidirectionnel"],
      context:"Première exploration approfondie de l’intégration robotique : choix matériel, autopilote, calcul embarqué, commandes de haut niveau, communications et simulation.",
      work:["Sélection et assemblage de la plateforme physique.","Passerelle directe MAVLink ↔ ROS 2 en C++.","Premières actions de haut niveau et interface de commande à la manette.","Validation principalement logicielle avec Mission Planner après arrêt des essais physiques précoces.","Réseau ad hoc puis mesh et prototype d’antenne biquad."],
      results:["Drone physique assemblé et architecture sol/embarqué structurée.","Chaîne de commande bidirectionnelle développée et utilisée.","Réseau mesh expérimenté et prototype d’antenne fabriqué."],
      limits:"Aucun vol autonome complet n’a été validé en conditions réelles. Après un premier essai non concluant, le développement a été recentré sur le banc, la simulation et une stratégie de validation plus prudente."
    },
    {
      id:"robot-arm", group:"mechanical", kind:"Mécanique / prototypage", status:"Prototype mécanique",
      title:"Bras robotique V1", subtitle:"Prototype low-cost conçu en un mois",
      period:"2025",
      summary:"Un bras d’environ 70 cm, 5 axes + pince, conçu sous Blender et fabriqué en PETG autour de servomoteurs à fort couple.",
      tags:["Blender","PETG","Servos","PCA9685","Mécanique"],
      facts:["≈70 cm","5 axes + pince","≈1 mois"],
      context:"Challenge personnel de conception complète d’un bras robotique low-cost en partant de zéro, avec une contrainte de délai courte.",
      work:["Modélisation intégrale sous Blender et impression PETG.","Épaule, coude et flexion du poignet sur axe acier trempé et doubles roulements.","Réductions par engrenages calculées selon couple, débattement et contraintes d’impression.","Servos placés sous les articulations pour limiter la masse portée.","Câblage intégré et architecture Raspberry Pi → PCA9685 préparée."],
      results:["Prototype mécanique complet assemblé.","Cinq axes de positionnement et une pince symétrique motorisable.","Passage physique du câblage et électronique de commande préparés."],
      limits:"Aucun actionnement électrique complet ni logiciel de contrôle n’a été réalisé. Masse, jeu de base, modularité et architecture de transmission ont motivé une V2 plus rigoureuse."
    },
    {
      id:"cycloidal", group:"mechanical", kind:"Mécanique / CAO", status:"Prototype assemblé",
      title:"Réducteur cycloïdal", subtitle:"Transmission expérimentale pour bras robotique V2",
      titleAccent:"cycloïdal",
      role:"Concepteur mécanique / CAO — réducteur cycloïdal imprimé 3D",
      period:"2025–2026",
      summary:"Double disque 22 lobes / 23 positions, rapport théorique 22:1, intégration de roulements et prototype PETG assemblé.",
      tags:["FreeCAD","Cycloïdal","PETG","Roulements","TechDraw"],
      facts:["Prototype PETG assemblé","22:1 théorique · double disque","Cinématique vérifiée à vide"],
      // Editorial source: assets/cycloidal-reducer/reducteur-cycloidal-portfolio.md
      context:"Projet personnel de R&D mécanique né des limites du bras robotique V1, qui associait servomoteurs RC et réductions par engrenages imprimés. Le poids, le jeu et le couple ont motivé une réflexion sur une V2 : meilleurs roulements, motorisations plus importantes, réduction du jeu et transmission plus compacte. Le réducteur cycloïdal a été étudié comme solution possible pour cette nouvelle génération. Ce projet marque aussi le passage d’une modélisation principalement sous Blender à une CAO paramétrique sous FreeCAD.",
      labels:{objectives:"Objectif"},
      objective:[
        "Concevoir un réducteur cycloïdal double disque offrant une réduction importante dans un volume compact.",
        "Intégrer les roulements et une sortie mécanique adaptée à une future articulation robotique.",
        "Imprimer et assembler un prototype physique pour évaluer le principe.",
        "Vérifier la cinématique à vide avant motorisation définitive."
      ],
      sections:[
        {
          title:"Conception FreeCAD & architecture mécanique",
          text:"Une architecture double disque entièrement modélisée sous FreeCAD, pensée pour répartir les efforts et limiter les déséquilibres.",
          bullets:[
            "Modélisation détaillée des disques cycloïdaux, de la couronne périphérique, des excentriques, des flasques, des axes de sortie et du carter.",
            "Travail sur les interfaces d’assemblage, les portées de roulements, les retenues axiales et le chemin de charge.",
            "Document CAO audité comprenant environ 1 778 objets, 60 Body, 261 sketches et plusieurs mises en plan techniques.",
            "Déclinaison de variantes spécifiques à l’impression FDM."
          ]
        },
        {
          title:"Géométrie cycloïdale & excentriques",
          text:"Le rapport de réduction découle de la géométrie des disques et des positions périphériques : 22 lobes / 23 positions correspondent à un rapport théorique de 22:1, et non 23:1.",
          bullets:[
            "Deux disques cycloïdaux de 22 lobes chacun, associés à 23 positions périphériques pour les rouleaux / axes.",
            "Réduction théorique 22:1 avec inversion du sens de rotation.",
            "Excentricité d’environ ±1,4 mm, documentée par la mise en plan des moyeux / excentriques.",
            "Six axes de sortie communs aux flasques."
          ],
          media:[
            {
              type:"document", src:"./assets/cycloidal-reducer/drawing-cycloidal-disc.png",
              alt:"Plan technique du disque cycloïdal et de ses paramètres géométriques.",
              width:2339, height:1653,
              caption:"Mise en plan du disque et de ses paramètres géométriques."
            },
            {
              type:"document", src:"./assets/cycloidal-reducer/drawing-eccentric-hubs.png",
              alt:"Plan technique des moyeux et excentriques avec le décalage de 1,4 mm.",
              width:2339, height:1653,
              caption:"Document complémentaire sur les excentriques et le décalage de 1,4 mm."
            }
          ]
        },
        {
          title:"Roulements, guidages & chemin de charge",
          text:"L’architecture a été conçue dans une logique de rigidité, sans qualification chiffrée de capacité de charge.",
          bullets:[
            "Deux roulements principaux 6811RS pour guider les flasques et limiter leur basculement.",
            "Quatre roulements 6803RS pour les excentriques et les guidages centraux.",
            "Répartition du chemin de charge entre profil cycloïdal, rouleaux, carter, sortie à six axes et flasques.",
            "Travail approfondi sur les portées et retenues axiales des roulements."
          ],
          media:[{
            type:"document", src:"./assets/cycloidal-reducer/drawing-ring-center.png",
            alt:"Plan technique de la couronne centrale, des rouleaux et de la géométrie associée.",
            width:2339, height:1653,
            caption:"Mise en plan de la couronne centrale et de la géométrie associée."
          }]
        },
        {
          title:"Fabrication additive & assemblage",
          text:"Le modèle a été décliné pour la fabrication additive, puis matérialisé par un prototype PETG complet.",
          bullets:[
            "Adaptation des pièces aux contraintes de l’impression 3D FDM.",
            "Ajustements dimensionnels entre la CAO et les versions destinées à la fabrication.",
            "Impression du prototype en PETG et assemblage complet d’une V1 physique.",
            "Intégration des disques, excentriques, roulements, axes de sortie et flasques."
          ]
        },
        {
          title:"Validation mécanique",
          text:"La vérification porte sur l’assemblage et la cinématique du prototype, sans mesure instrumentée sous charge.",
          bullets:[
            "Vérification manuelle de la cinématique du réducteur assemblé.",
            "Fonctionnement mécanique à vide constaté sur le prototype physique.",
            "Cohérence du rapport théorique 22:1 avec la géométrie 22 lobes / 23 positions.",
            "Appréciation empirique du jeu uniquement ; aucun backlash mesuré sous charge."
          ]
        }
      ],
      resultsIntro:"Un prototype qui démontre la cinématique et l’assemblage.",
      results:[
        "Réducteur cycloïdal double disque entièrement modélisé, imprimé en PETG et assemblé.",
        "Cinématique théorique 22:1 cohérente avec la géométrie 22 lobes / 23 positions et l’inversion du sens de rotation.",
        "Fonctionnement mécanique vérifié manuellement à vide, sans charge instrumentée.",
        "Travail approfondi sur les roulements, guidages, portées et retenues.",
        "Variantes FDM et mises en plan techniques réalisées."
      ],
      limits:"Le prototype démontre la cinématique et l’assemblage, mais pas les performances d’un réducteur industriel qualifié.",
      limitsItems:[
        "Aucun essai instrumenté de couple ni rendement mesuré.",
        "Aucun essai d’endurance réalisé.",
        "Répétabilité et précision non qualifiées.",
        "Backlash non mesuré sous charge ; jeu seulement apprécié de manière empirique.",
        "Pressions de contact, flexions et précharges non complètement dimensionnées.",
        "Comportement du PETG sous charge non qualifié."
      ],
      nextSteps:"Base envisagée pour une future V2 du bras robotique.",
      environmentGroups:[
        {title:"CAO & conception",items:["FreeCAD","CAO paramétrique","Mises en plan techniques"]},
        {title:"Architecture mécanique",items:["Réducteur cycloïdal","22 lobes / 23 positions","Roulements 6811RS / 6803RS"]},
        {title:"Prototypage",items:["Impression 3D FDM","PETG","PrusaSlicer","Assemblage mécanique"]},
        {title:"Validation",items:["Vérification cinématique","Vérification manuelle à vide"]}
      ],
      links:[["Origine du projet : bras robotique V1","./project.html?id=robot-arm"]],
      media:{
        lead:{
          src:"./assets/cycloidal-reducer/assembly-cad.png",
          alt:"Vue d’ensemble CAO du réducteur cycloïdal double disque sous FreeCAD.",
          caption:"Assemblage CAO — vue générale du réducteur cycloïdal.",
          width:1623, height:1080
        }
      }
    },
    {
      id:"matrice", group:"experience", kind:"Expérience professionnelle", status:"Pré-V1 fonctionnelle",
      title:"Agence Matrice", subtitle:"Outil de collecte et supervision de données sociales",
      titleAccent:"Matrice",
      role:"Développeur full-stack / automatisation & supervision de collecte",
      period:"2021–2022",
      summary:"Automatisation de campagnes de collecte de données publiques sur les réseaux sociaux pour environ 150 stations de ski.",
      tags:["TypeScript","NestJS","Electron","React","Puppeteer"],
      facts:["POC avancé / pré-V1","≈150 stations de ski","Campagnes & export CSV"],
      // Editorial source: assets/agence-matrice/agence-matrice-portfolio.md
      context:"Agence Matrice est une agence de communication travaillant notamment sur la visibilité et l’attractivité de stations de ski. Elle réalisait périodiquement des relevés largement manuels de données publiques, principalement sur Facebook et Instagram, pour environ 150 stations de ski françaises. Ces données alimentaient un scoring interne, calculé séparément par une autre personne à partir des exports : l’application ne réalisait pas ce scoring. Le développement principal a été mené en autonomie pendant environ trois mois, en parallèle d’un autre projet professionnel.",
      labels:{objectives:"Objectif"},
      objective:[
        "Automatiser la collecte de métriques publiques sur plusieurs réseaux sociaux.",
        "Gérer un catalogue de stations indépendant des campagnes et composer des collectes sur tout ou partie de ce catalogue.",
        "Lancer, superviser, interrompre et reprendre les campagnes, identifier les erreurs et relancer uniquement les éléments nécessaires.",
        "Exporter les données en CSV selon le format attendu par le traitement de scoring existant, réalisé hors de l’application."
      ],
      sections:[
        {
          title:"Automatisation de la collecte",
          text:"Des collecteurs Puppeteer / Chromium pour automatiser les relevés de métriques publiques, principalement sur Facebook et Instagram.",
          bullets:[
            "Collecte des publications récentes, likes, commentaires, activité des comptes et autres indicateurs nécessaires au traitement aval.",
            "Expérimentations plus limitées sur d’autres plateformes.",
            "Diagnostic et adaptation des collecteurs aux évolutions fréquentes des interfaces et structures des réseaux sociaux.",
            "Étude et expérimentation de proxies résidentiels et de rotation d’IP pour améliorer la continuité des collectes face aux limitations d’accès."
          ]
        },
        {
          title:"Du prototype web à l’application Electron",
          text:"Une première version web a servi de preuve de concept, puis l’outil a été refondu en application desktop pour faciliter le pilotage des campagnes récurrentes.",
          bullets:[
            "Développement des interfaces React puis intégration dans Electron.",
            "Ajout et organisation des stations de ski dans un catalogue indépendant des campagnes.",
            "Création de groupes et campagnes réutilisables à partir du catalogue existant.",
            "Ordonnancement de plusieurs campagnes et choix de leur séquence d’exécution."
          ]
        },
        {
          title:"Gestion & supervision des campagnes",
          text:"Le suivi d’exécution permettait d’identifier les échecs et de préparer des relances partielles sans ressaisir les cibles.",
          bullets:[
            "Commandes de lancement, pause, reprise et arrêt.",
            "Affichage en temps réel de l’avancement et des données récupérées.",
            "Signalement visuel des collectes réussies ou en erreur.",
            "Recomposition rapide d’une campagne limitée aux stations en échec, puis relance ciblée."
          ]
        },
        {
          title:"Données & restitution CSV",
          text:"La restitution était conçue pour alimenter le traitement métier existant ; le calcul des scores restait séparé de l’application.",
          bullets:[
            "Structuration des métriques selon les besoins du traitement de scoring.",
            "Génération d’exports CSV directement exploitables par la personne chargée du calcul des scores.",
            "Utilisation de PostgreSQL pour certaines données applicatives, sans stockage historique complet des métriques dans cette version."
          ]
        },
        {
          title:"Architecture & backend",
          bullets:[
            "Développement du backend avec NestJS / Node.js et TypeScript.",
            "Articulation du backend, des collecteurs Puppeteer / Chromium et de l’interface React intégrée dans Electron.",
            "Évolution de l’architecture au fil du passage du proof of concept à une pré-V1 fonctionnelle."
          ]
        }
      ],
      results:[
        "Passage de relevés manuels à une collecte largement automatisée, sur un périmètre d’environ 150 stations de ski françaises suivies par l’agence.",
        "Application desktop permettant de préparer, lancer et superviser des campagnes récurrentes.",
        "Gestion opérationnelle des erreurs et relances partielles sans recommencer systématiquement une campagne complète.",
        "Exports CSV utilisés pour alimenter le traitement de scoring externe à l’application.",
        "Utilisation réelle pendant le développement : campagnes exécutées avec la version en cours et résultats transmis à l’agence."
      ],
      limits:"POC avancé / pré-V1 fonctionnelle, utilisé réellement pendant le développement, sans industrialisation complète ni commercialisation finalisée.",
      limitsItems:[
        "Maintenance régulière des collecteurs nécessaire face aux évolutions des interfaces et protections des plateformes.",
        "Gestion des proxies et résilience aux limitations d’accès encore perfectibles.",
        "Stockage historique limité dans cette version.",
        "Scoring métier volontairement séparé, réalisé par une autre personne à partir des données exportées."
      ],
      nextSteps:"Piste d’évolution identifiée à l’époque : le stockage historique et l’exploitation analytique des données auraient pu être approfondis dans une version ultérieure.",
      environmentGroups:[
        {title:"Backend & application",items:["TypeScript","Node.js","NestJS","React","Electron"]},
        {title:"Collecte & supervision",items:["Puppeteer","Chromium","Automatisation de collecte","Supervision de campagnes"]},
        {title:"Données & restitution",items:["PostgreSQL","CSV"]},
        {title:"Expérimentations réseau",items:["Proxies résidentiels","Rotation d’IP"]}
      ],
      media:{
        lead:{
          type:"illustration",
          src:"./assets/agence-matrice/illustration.png",
          alt:"Illustration de la collecte de données sociales des stations de ski : supervision des campagnes, états de collecte et exports de données.",
          width:1448, height:1086
        }
      }
    },
    {
      id:"itfs73", group:"experience", kind:"Expérience professionnelle", status:"Prototype avancé",
      title:"ITFS73", subtitle:"Plateforme pédagogique multi-écrans",
      titleAccent:"73",
      role:"Architecte applicatif / développeur full-stack",
      period:"2020–janvier 2021",
      summary:"Architecture web + locale pour créer des cours interactifs et les exécuter de manière coordonnée sur six écrans tactiles indépendants.",
      tags:["NestJS","React","Electron","PostgreSQL","Streaming"],
      facts:["Projet arrêté","6 PC / 6 écrans","Streaming multi-écrans"],
      context:"Conception et développement en autonomie d’une plateforme pédagogique destinée à une installation expérimentale composée de six grands écrans tactiles, chacun piloté par un PC Windows distinct. Les enseignants devaient pouvoir préparer des cours à distance, intégrer PDF et vidéos, puis définir des interactions entre les différents écrans.",
      objective:[
        "Concevoir une architecture couvrant création web des cours, distribution locale, exécution coordonnée sur six machines et diffusion multimédia."
      ],
      sections:[
        {
          title:"Architecture applicative",
          bullets:[
            "Définition de l’architecture et choix des technologies.",
            "Séparation entre plateforme web, backend distant, serveur local et applications d’affichage.",
            "Fonctionnement distribué sur six PC indépendants."
          ]
        },
        {
          title:"Éditeur de cours",
          bullets:[
            "Interface React de construction de cours.",
            "Import et découpage des PDF en pages manipulables individuellement.",
            "Placement sur différents écrans, drag-and-drop et timeline.",
            "Zones interactives et liaison à des actions sur d’autres écrans."
          ]
        },
        {
          title:"Runtime multi-écrans",
          bullets:[
            "Application Electron plein écran sur chaque PC.",
            "Clients en arrière-plan en attente des commandes.",
            "Désignation d’un poste principal.",
            "Lancement coordonné et distribution des changements d’état."
          ]
        },
        {
          title:"Distribution et streaming",
          bullets:[
            "Serveur local récupérant les cours et ressources.",
            "Téléchargement préalable pour limiter la dépendance au réseau externe.",
            "Microservice de streaming vidéo depuis notamment YouTube ou des fichiers locaux.",
            "Distribution du flux aux postes abonnés."
          ]
        },
        {
          title:"Backend et tests",
          bullets:[
            "Services principalement avec NestJS.",
            "PostgreSQL pour la persistance.",
            "Tests réels sur six PC et six écrans distincts.",
            "Validation du lancement coordonné, des contrôles de PDF et du streaming vidéo multi-écrans."
          ]
        }
      ],
      results:[
        "Architecture distribuée complète pour une installation à six postes.",
        "Éditeur V1 fonctionnel : PDF page par page, timeline et interactions inter-écrans.",
        "Pilotage coordonné d’instances Electron validé sur six machines physiques.",
        "Streaming vidéo multi-écrans fonctionnel dans l’environnement de test.",
        "Téléchargement et distribution locale des contenus mis en place."
      ],
      limits:"Projet arrêté avant qualification complète sur l’installation finale et avant industrialisation de l’éditeur. Avec le recul, le modèle de l’éditeur aurait bénéficié d’un cadrage plus poussé, notamment autour de la séparation interaction → action → résultat.",
      environment:["TypeScript","Node.js","NestJS","React","Electron","PostgreSQL","JavaScript","HTML/CSS","WebSocket / communications réseau","Streaming vidéo","Windows","Réseau local"],
      media:{
        lead:{
          type:"illustration",
          src:"./assets/itfs73/illustration.png",
          alt:"Illustration de la plateforme pédagogique : édition de cours avec PDF et vidéos, serveur local et écrans connectés.",
          width:1254, height:1254
        }
      }
    },
    {
      id:"pure-illusion", group:"experience", kind:"Expérience professionnelle", status:"Livraison partielle",
      title:"Pure Illusion", subtitle:"Agrégateur de données SEO",
      titleAccent:"Illusion",
      role:"Développeur full-stack / intégration data SEO",
      period:"2020 — mission de fin d’études prolongée brièvement en freelance",
      summary:"Développement full-stack et diagnostic d’une chaîne de données SEO multi-sources déjà engagée.",
      tags:["PHP","Symfony","MongoDB","PostgreSQL","Linux"],
      facts:["Pipeline multi-source","Debug transversal","Déploiement Linux"],
      context:"Pure Illusion est une agence web qui disposait à l’époque d’une activité SEO. Le projet visait à construire un outil interne capable de centraliser et exploiter des données SEO provenant de plusieurs sources. J’ai rejoint un projet déjà engagé comprenant collecte de données, stockage MongoDB, transformation vers PostgreSQL et application web à construire/stabiliser.",
      objective:[
        "Rendre exploitable la chaîne de données et construire l’application web de consultation, tout en diagnostiquant les dysfonctionnements du pipeline existant."
      ],
      sections:[
        {
          title:"Application web de consultation",
          bullets:[
            "Backend sous PHP / Symfony.",
            "Interface avec Twig, HTML/CSS et JavaScript.",
            "Vues de consultation de métriques et données SEO."
          ]
        },
        {
          title:"Intégration & diagnostic de la chaîne de données",
          bullets:[
            "Travail avec PostgreSQL et MongoDB.",
            "Intervention sur une chaîne comprenant collecte Python, MongoDB, ETL Go et PostgreSQL.",
            "Analyse/correction de problèmes de structure et transformation de données.",
            "Debugging transversal entre collecte, transformation et application."
          ]
        },
        {
          title:"Déploiement & restitution",
          bullets:[
            "Intervention sur l’environnement Linux et déploiement.",
            "Échanges avec l’équipe technique et le référent SEO.",
            "Restitution des limites techniques restant à traiter."
          ]
        }
      ],
      results:[
        "Application web de consultation des données SEO centralisées.",
        "Remise en fonctionnement de plusieurs éléments d’une chaîne partiellement opérationnelle.",
        "Identification de problèmes de cohérence/transformation des données.",
        "Version exploitable en interne par le référent SEO.",
        "Formalisation des limites techniques restantes."
      ],
      limits:"Projet livré partiellement, avec une version utilisable mais encore des limites structurelles dans la chaîne existante.",
      environment:["PHP","Symfony","Twig","JavaScript","HTML/CSS","PostgreSQL","MongoDB","Python","ETL Go","Linux","Git"],
      media:{
        lead:{
          type:"illustration",
          src:"./assets/pure-illusion/illustration.png",
          alt:"Chaîne de données SEO : sources multiples, collecte Python, MongoDB, ETL Go, PostgreSQL et application web de consultation.",
          width:1254, height:1254
        }
      }
    }
  ]
};
