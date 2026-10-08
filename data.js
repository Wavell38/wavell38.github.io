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
        "Rectification appliquée, registration multi-captures, cartes multi-lumières et détection finale des défauts encore prévues.",
        "Le parcours Web reste centré sur l’acquisition ; la visualisation analytique complète n’est pas finalisée.",
        "Rails, capture par tuiles, retournement et alimentation automatique restent des pistes exploratoires hors V1.",
        "Pas de qualification globale complète à HEAD : certaines suites dépendantes de l’environnement n’ont pas été rejouées intégralement."
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
        "Construire un environnement de backtest déterministe et performant pour des campagnes longues, avec modélisation explicite des données de marché, de l’exécution, du portefeuille et du risque.",
        "Automatiser à terme des campagnes régulières et reproductibles pour réévaluer les stratégies face aux conditions de marché courantes.",
        "Développer une évaluation graduée pour sélectionner les stratégies les plus adaptées, en conserver plusieurs et ajuster automatiquement leurs paramètres lorsque nécessaire.",
        "Faire coexister à terme des stratégies en test simulé et des stratégies utilisées en réel après validation approfondie, avec une adaptation continue fondée sur ces réévaluations."
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
      limits:"Projet de recherche logicielle en cours, non présenté comme une plateforme de trading prête pour production. Les campagnes automatiques récurrentes, la sélection adaptative, l’ajustement automatique des paramètres et le passage en réel restent des étapes futures. Les résultats techniques ne constituent pas une validation financière ni une preuve de rentabilité de stratégies.",
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
      title:"Workflow de développement assisté par agents IA", subtitle:"Cadrage, exécution bornée, review et qualification",
      period:"Depuis janvier 2026",
      summary:"Un cadre d’ingénierie pour déléguer une grande partie de l’implémentation sans abandonner le pilotage humain des décisions structurantes.",
      tags:["Agentic Engineering","Git","Reviews","Qualification","Prompt Archiver"],
      facts:["2 skills","5 reviewers","Spec-driven"],
      context:"Le workflow est né du passage d’un usage ponctuel des assistants IA à la délégation de tâches d’ingénierie plus autonomes. Il structure le contexte, les contrats d’exécution, les preuves, les reviews et les points de recadrage.",
      work:["Hiérarchie Projet → Roadmap → Phase → Tranche → Prompt d’exécution.","Autorité principale par information normative et chargement progressif du contexte.","Reviews indépendantes proportionnées au risque, exécutées en contextes frais.","Mécanismes PASSED/BLOCKED, qualification expérimentale et checkpoint anti-dérive.","Développement de Prompt Archiver pour conserver prompt, rapport et métadonnées des runs."],
      results:["Workflow réutilisé sur plusieurs projets logiciels et systèmes.","Cycle formalisé préparation → exécution → validation → review → remédiation → décision suivante.","Corpus versionné de guides/templates, deux skills et cinq profils de reviewers dans la version auditée.","Prompt Archiver publié en open source."],
      limits:"Aucun gain chiffré de productivité ou de qualité n’est revendiqué sans campagne de mesure dédiée.",
      links:[["Workflow GitHub","https://github.com/Wavell38/ai-assisted-software-engineering-workflow"],["Prompt Archiver","https://github.com/Wavell38/prompts_archiver"]]
    },
    {
      id:"camera-mapper", group:"systems", kind:"Robotique / vision", status:"V1 testée",
      title:"Camera Mapper", subtitle:"Perception globale pour la Coupe de France de Robotique",
      period:"Depuis mars 2026",
      summary:"Caméra en hauteur, homographie, ArUco + mouvement, suivi multi-objets et world model sur Raspberry Pi 5.",
      tags:["ROS 2","C++","OpenCV","ArUco","Raspberry Pi 5"],
      facts:["Terrain 3 × 2 m","≈5–7 Hz observés","1 usage en compétition"],
      context:"Module conçu en autonomie dans le contexte d’un projet collectif de robotique, avec l’objectif de produire un état global du terrain à partir d’une caméra placée sur un mât.",
      work:["Architecture ROS 2 composable : acquisition → scène → world model.","Projection image→terrain par homographie.","Détection ArUco complétée par MOG2 et stabilisation par corrélation de phase.","Suivi temporel, fusion d’identités et publication d’un état persistant.","Intégration mécanique d’une caméra sur un mât d’environ 1,5 m."],
      results:["Chaîne Caméra → Perception → World Model fonctionnelle.","Utilisation ponctuelle en compétition.","Identification claire des limites de cadence et de couverture d’une architecture mono-caméra."],
      limits:"Prototype fonctionnel mais insuffisamment rapide et couvrant pour devenir un composant critique en match. Une V2 demanderait une reprise d’architecture, pas seulement des micro-optimisations."
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
      title:"Gant IMU", subtitle:"Interface gestuelle multi-capteurs",
      period:"2025 – janvier 2026",
      summary:"Du prototype à quatre MPU6050 vers des modules IMU miniaturisés et un hub RP2040 4 couches.",
      tags:["RP2040","KiCad","SPI","USB","IMU"],
      facts:["8 positions logiques","10 ports physiques prévus","PCB IMU reçus"],
      context:"Interface gestuelle portable initialement pensée pour commander rapidement un système semi-autonome, sans monopoliser les mains par une interface classique.",
      work:["Premiers prototypes multi-MPU6050 et détection expérimentale de gestes.","Modules IMU personnalisés autour de l’ICM-42688-P puis ICM-45686.","Hub RP2040 quatre couches, bus SPI partagé et chip-select individuel.","Transport série COBS/CRC32C, calibration et reconstruction d’orientations côté hôte.","Itérations textile, supports imprimés et intégration mécanique."],
      results:["Plusieurs générations d’architecture réalisées.","Premières reconnaissances gestuelles sur les prototypes logiciels.","Modules IMU miniaturisés conçus, fichiers de fabrication préparés et PCB reçus.","Hub 4 couches conçu pour jusqu’à 10 connexions physiques."],
      limits:"Projet mis en pause avant assemblage et qualification complète de l’électronique personnalisée. Les PCB reçus n’ont pas été soudés/testés et aucune certification d’étanchéité n’est revendiquée."
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
        "Variantes FDM et mises en plan techniques réalisées.",
        "Base envisagée pour une future V2 du bras robotique."
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
      title:"Agence Matrice", subtitle:"Automatisation & supervision de collecte",
      period:"2021–2022",
      summary:"Automatisation de campagnes de collecte de données publiques sur les réseaux sociaux pour environ 150 stations de ski.",
      tags:["TypeScript","NestJS","Electron","React","Puppeteer"],
      facts:["≈150 stations","Facebook / Instagram","CSV métier"],
      context:"L’agence réalisait manuellement des relevés destinés à alimenter un scoring interne. L’objectif était d’automatiser la collecte et de fournir un outil de préparation/supervision des campagnes.",
      work:["Collecteurs Puppeteer/Chromium sur données publiques.","Première version web puis refonte Electron.","Catalogue de stations indépendant des campagnes.","Lancement, pause, reprise, suivi live et relances ciblées.","Export CSV structuré pour le traitement de scoring existant."],
      results:["Processus largement automatisé.","Application desktop utilisée pendant son développement pour produire les campagnes et transmettre les CSV.","Stade POC avancé / pré-V1 fonctionnelle."],
      limits:"Les collecteurs demandaient encore de la maintenance face aux changements des plateformes ; la résilience réseau et le stockage historique restaient perfectibles."
    },
    {
      id:"itfs73", group:"experience", kind:"Expérience professionnelle", status:"Prototype avancé",
      title:"ITFS73", subtitle:"Plateforme pédagogique multi-écrans",
      period:"2020–janvier 2021",
      summary:"Architecture web + locale pour créer des cours interactifs et les exécuter de manière coordonnée sur six écrans tactiles indépendants.",
      tags:["NestJS","React","Electron","PostgreSQL","Streaming"],
      facts:["6 PC / écrans","Runtime distribué","Streaming multi-écrans"],
      context:"Installation expérimentale de six grands écrans tactiles, chacun piloté par un PC Windows distinct. Les enseignants devaient préparer les cours à distance puis les exécuter localement sous forme d’expériences interactives.",
      work:["Architecture globale : plateforme web, backend distant, serveur local et clients Electron.","Éditeur React : PDF page par page, timeline, drag-and-drop et interactions inter-écrans.","Lancement coordonné des clients et désignation d’un poste principal.","Téléchargement local des ressources.","Microservice de streaming vidéo vers les postes abonnés."],
      results:["Architecture distribuée développée en autonomie.","Éditeur V1 fonctionnel.","Lancement coordonné, contrôles PDF et streaming validés sur six machines physiques."],
      limits:"Projet arrêté avant qualification complète sur l’installation finale et industrialisation de l’éditeur."
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
