window.PORTFOLIO = {
  projects: [
    {
      id:"cards-analyzer", group:"featured", order:1, kind:"Projet personnel", status:"En cours",
      title:"Cards Analyzer", subtitle:"Banc d’acquisition optique multi-éclairage",
      period:"Depuis mai 2026",
      summary:"Un système complet d’acquisition haute résolution qui relie mécanique, optique, éclairage, ROS 2/C++, backend TypeScript et interface web.",
      tags:["ROS 2","C++20","Vision","TypeScript","FreeCAD"],
      facts:["Prototype V1 avancé","9 groupes lumineux","Arducam 64 MP"],
      context:"Projet de R&D systèmes & vision destiné à analyser des cartes de collection dans des conditions d’acquisition contrôlées. Une architecture initialement très automatisée a volontairement été réduite à une V1 permettant de qualifier d’abord la mécanique, l’optique, la synchronisation et le pipeline de traitement.",
      work:["Conception du banc mécanique sous FreeCAD et fabrication additive du prototype.","Architecture logicielle modulaire ROS 2/C++ + NestJS/TypeScript + React.","Backend libcamera persistant avec preview et captures analytiques haute résolution.","Pilotage de neuf groupes lumineux via PCA9685/I²C et profils YAML d’acquisition.","Pipeline RAW Bayer, corrections photométriques et premières étapes de localisation géométrique."],
      results:["Prototype mécanique et électronique construit.","Acquisition haute résolution pilotable et reproductible.","Orchestration complète entre ROS 2, backend et interface web.","Premiers traitements photométriques et géométriques opérationnels."],
      limits:"L’analyse finale automatisée des défauts de surface n’est pas encore qualifiée. La géométrie des bords et des coins reste expérimentale ; les étapes mécaniques plus ambitieuses sont différées jusqu’à validation suffisante de l’acquisition."
    },
    {
      id:"quant-platform", group:"featured", order:2, kind:"Projet personnel", status:"En cours",
      title:"Plateforme de recherche quantitative", subtitle:"Backtest, exécution simulée & performance",
      period:"Depuis juin 2026",
      summary:"Un projet software centré sur la reproductibilité, la performance et la modélisation explicite de l’exécution, du portefeuille et du risque.",
      tags:["Rust","Python","Architecture","Performance","Profiling"],
      facts:["Python → Rust","Streaming borné","Campagnes multi-jours"],
      context:"Projet de R&D logicielle visant à rejouer des données de marché historiques et exécuter des stratégies dans un environnement simulé reproductible. Une première verticale Python a servi à qualifier le domaine avant migration vers Rust après mesure des limites de performance.",
      work:["Replay de carnet L2, trades, prix de référence/index et financement.","Modélisation des ordres, fills, frais, positions et état du portefeuille.","Streaming borné et isolation de l’état entre campagnes.","Qualification expérimentale du moteur tiers avant extension de l’architecture.","Benchmarks temps/mémoire, profiling et adaptation de la concurrence entre workers."],
      results:["Prototype Python fonctionnel puis runtime Rust qualifié progressivement.","Replay reproductible et streaming borné validé sur des campagnes longues.","Identification d’une source majeure de rétention mémoire et adaptation de la capacité par worker.","Base technique prête pour une bibliothèque de stratégies paramétrables."],
      limits:"Projet de recherche logicielle en cours ; il ne s’agit pas d’une plateforme de trading prête pour production et aucun résultat technique n’est présenté comme une preuve de performance financière."
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
      period:"2025–2026",
      summary:"Double disque 22 lobes / 23 positions, rapport théorique 22:1, intégration de roulements et prototype PETG assemblé.",
      tags:["FreeCAD","Cycloïdal","PETG","Roulements","TechDraw"],
      facts:["22:1","Double disque","6 axes de sortie"],
      context:"Suite directe du bras V1 : passage de réductions simples et d’une modélisation Blender vers une architecture mécanique plus rigoureuse et paramétrique sous FreeCAD.",
      work:["Modélisation détaillée des disques, couronne, excentriques, flasques, axes et carter.","Architecture double disque, excentricité ≈±1,4 mm et sortie à six axes.","Intégration de roulements 6811RS et 6803RS.","Variantes adaptées à l’impression FDM et mises en plan techniques.","Impression PETG et assemblage complet de la V1."],
      results:["Réducteur entièrement modélisé, imprimé et assemblé.","Cinématique 22:1 cohérente avec la géométrie 22 lobes / 23 positions.","Fonctionnement mécanique à vide vérifié manuellement."],
      limits:"Aucun essai instrumenté de couple, rendement, endurance, précision ou backlash sous charge. Le prototype démontre la cinématique et l’assemblage, pas les performances d’un réducteur industriel."
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
      period:"2020",
      summary:"Développement full-stack et diagnostic d’une chaîne de données SEO multi-sources déjà engagée.",
      tags:["PHP","Symfony","MongoDB","PostgreSQL","Linux"],
      facts:["Pipeline multi-source","Debug transversal","Déploiement Linux"],
      context:"Outil interne destiné à centraliser des données SEO issues de plusieurs sources. Le projet comportait déjà une chaîne collecte Python → MongoDB → ETL Go → PostgreSQL, mais plusieurs briques restaient partiellement fonctionnelles.",
      work:["Backend Symfony et interface Twig/JavaScript.","Analyse/correction de problèmes de structure et transformation de données.","Debugging transversal entre collecte, MongoDB, ETL, PostgreSQL et application.","Déploiement Linux et restitution des limites techniques."],
      results:["Application de consultation développée et version exploitable en interne.","Plusieurs dysfonctionnements du pipeline identifiés/corrigés.","Restitution des travaux nécessaires pour une solution plus maintenable."],
      limits:"Projet livré partiellement, avec une version utilisable mais des limites structurelles restantes."
    }
  ]
};