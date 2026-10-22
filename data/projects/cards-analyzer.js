export default {
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
        "Composants dédiés à la caméra, l’éclairage, l’acquisition, la calibration, le traitement d’image, les séquences de scan et le démarrage coordonné du système.",
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
        "Correction dark et application d’un flat-field compatible intégrées au chemin nominal pour corriger le signal de fond et les variations de réponse lumineuse.",
        "Localisateur grossier, raffinement pleine résolution, repères géométriques et vue de localisation développés, encore hors du scénario nominal d’acquisition.",
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
    "Coins et contour complet de la carte non qualifiés ; traitements géométriques encore hors du scénario nominal d’acquisition et choix de correction de la distorsion non arrêté.",
    "Le parcours Web reste centré sur l’acquisition ; la visualisation analytique complète n’est pas finalisée.",
    "Certaines validations intégrées, dépendantes du matériel ou de l’environnement, restent à compléter."
  ],
  nextSteps:"Poursuivre la qualification progressive de la V1 avant d’engager une automatisation mécanique plus ambitieuse.",
  nextStepsItems:[
    "Rectification des images, recalage entre captures, cartes multi-éclairages et détection finale des défauts restent à intégrer et à qualifier.",
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
      caption:"Prototype V1 — photographie du banc réel assemblé",
      width:1254, height:1254
    }
  }
};
