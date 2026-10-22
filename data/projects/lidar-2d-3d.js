export default {
  id:"lidar-2d-3d", group:"systems", kind:"Systèmes / embarqué", status:"Projet arrêté",
  title:"LiDAR 2D → reconstruction 3D", subtitle:"Prototype motorisé RP2040 / ROS 2",
  titleAccent:["2D","3D"],
  role:"Concepteur système / développeur embarqué & robotique",
  period:"2026",
  summary:"Transformer un LD19 2D en acquisition 3D via rotation motorisée, encodeur absolu, firmware RP2040/PIO et pipeline PointCloud2.",
  tags:["RP2040","PIO","ROS 2","C++","FreeCAD"],
  facts:["POC fonctionnel expérimental","PointCloud2","micro-ROS Windows"],
  context:"Projet personnel conçu et réalisé seul pour explorer la reconstruction 3D à partir d’un LiDAR 2D monté verticalement sur un mécanisme tournant. Le but était d’évaluer ce principe pour la perception robotique embarquée. Le prototype a permis une reconstruction qualitative de l’environnement, mais sa cadence utile, sa densité et sa précision ne répondaient pas au besoin initial.",
  objective:[
    "Motoriser la rotation externe d’un LiDAR 2D LD19 pour ajouter un axe de balayage.",
    "Mesurer l’angle réel de rotation du mécanisme avec un encodeur absolu.",
    "Synchroniser cet angle avec les mesures LiDAR et transmettre les données associées vers l’hôte / Raspberry Pi.",
    "Transformer les scans 2D en coordonnées 3D et publier les nuages de points sous ROS 2.",
    "Permettre une visualisation qualitative de l’environnement dans RViz2.",
    "Évaluer si cette architecture peut satisfaire les contraintes d’une perception 3D embarquée : cadence utile, densité, précision, calibration, encombrement et complexité."
  ],
  sections:[
    {
      title:"Mécanique, CAO et fabrication additive",
      bullets:[
        "Conception sous FreeCAD du mécanisme de rotation : axes, supports, logements, engrenages et fixation du LiDAR.",
        "Transmission à engrenages 1:1 entre le moteur et l’axe de la plateforme, intégration d’un roulement et représentation d’un collecteur tournant.",
        "Préparation sous PrusaSlicer pour une Prusa MK4S, principalement en PETG, puis impression et assemblage des pièces du prototype."
      ],
      media:[{
        type:"document",
        src:"./assets/lidar2D-3D/vue-cao-interne.png",
        alt:"Vue FreeCAD en transparence de l’architecture interne du prototype LiDAR, avec support, transmission et base motorisée.",
        caption:"Conception interne du mécanisme sous FreeCAD",
        width:880, height:853
      }]
    },
    {
      title:"Motorisation et retour de position",
      bullets:[
        "Pilotage d’un moteur pas à pas via A4988 et intégration d’un encodeur absolu magnétique MT6701 en I²C pour mesurer la position réelle de l’axe.",
        "Commande de vitesse en boucle ouverte, avec surveillance de cohérence entre position prédite et position mesurée.",
        "Premiers mécanismes de détection d’écart et de blocage."
      ],
      media:[{
        src:"./assets/lidar2D-3D/mecanisme-rotation.png",
        alt:"Détail du prototype LiDAR montrant les engrenages de transmission, le moteur pas à pas et la base câblée.",
        caption:"Transmission à engrenages et base motorisée du prototype",
        width:1254, height:1254
      }]
    },
    {
      title:"Firmware RP2040",
      bullets:[
        "Développement C++ avec PlatformIO / Arduino-Pico : acquisition UART du LD19 à 230 400 bauds et lecture I²C du MT6701.",
        "Génération des impulsions moteur STEP via les PIO du RP2040 et suivi des impulsions de commande par un second programme PIO.",
        "Enveloppe USB binaire associant trame LiDAR, angle encodeur, compteur moteur, timestamp MCU, numéro de séquence et CRC16.",
        "Commandes micro-ROS pour démarrer, arrêter et modifier la période du mouvement."
      ]
    },
    {
      title:"Transport et orchestration ROS 2",
      bullets:[
        "Orchestrateur C++ / ROS 2 : lecture du flux USB, décodage de l’enveloppe propriétaire et validation des CRC.",
        "Décodage des paquets LD19, interpolation des douze angles internes et assemblage en sous-trames selon l’angle externe accumulé.",
        "Pipeline séparant transport, protocole, validation, assemblage, transformation géométrique et publication sensor_msgs/msg/PointCloud2."
      ]
    },
    {
      title:"Transformation 2D → 3D",
      bullets:[
        "Modèle géométrique tenant compte des angles interne et externe, du décalage radial du centre optique, des conventions de signe et des offsets de calibration.",
        "Transformation des mesures polaires en coordonnées x / y / z, filtrage selon la distance et la confiance, et gestion du passage 359° → 0°.",
        "Publication de sous-nuages 3D visualisables dans RViz2."
      ]
    },
    {
      title:"Adaptation de micro-ROS sous Windows",
      bullets:[
        "Réduction des chemins de build, séparation des environnements de compilation hôte et ARM, et génération des headers PIO avant compilation.",
        "Script local de correction de libmicroros.a supprimant l’objet à l’origine du conflit __atomic_load_8 avec Arduino-Pico.",
        "Compilation réussie des dépendances hôtes et MCU, avec génération d’un firmware ELF/UF2 attestée par les logs conservés."
      ]
    }
  ],
  results:["Prototype mécanique assemblé, firmware RP2040 et chaîne C++ / ROS 2 de reconstruction intégrés.","Reconstruction qualitative de l’environnement et pièce reconnaissable dans RViz2 rapportées lors des essais : faisabilité du principe démontrée, sans qualification pour l’usage robotique visé.","Compilation micro-ROS / PlatformIO sous Windows attestée par les logs et les artefacts ELF/UF2 conservés."],
  resultsLinks:[["Compilation micro-ROS sous Windows","https://github.com/Wavell38/micro_ros_platformio_windows"]],
  limits:"Le POC était fonctionnel, mais la cadence utile de reconstruction était trop faible et la densité, la précision et la calibration insuffisantes pour l’objectif robotique initial. Ces limites concernent autant l’intégration et le logiciel que le matériel.",
  limitsItems:[
    "Synchronisation imparfaite entre angle externe et mesures LiDAR : le même angle externe est appliqué aux douze points d’un paquet LD19, malgré l’interpolation de leurs angles internes.",
    "Défaut résiduel de comptage dans le programme PIO et détection de blocage perfectible, relevés lors de l’audit ultérieur du code.",
    "Absence de compensation du mouvement, de SLAM intégré, de recalage de scans et de fusion inertielle.",
    "Une reconstruction ou détection lente restait envisageable en théorie, sous réserve de calibration ; son adéquation à un usage concret n’a pas été démontrée."
  ],
  labels:{nextSteps:"Décision d’arrêt & enseignements"},
  nextSteps:"Le projet a été arrêté : poursuivre aurait demandé davantage de matériel et de budget, avec un coût, un volume, un poids et une complexité jugés disproportionnés au bénéfice attendu. Les ressources ont été consacrées à d’autres projets. Aucune V2 LiDAR n’est actuellement planifiée.",
  nextStepsItems:["Une étude préalable de faisabilité, notamment du temps nécessaire pour couvrir une scène, aurait permis d’identifier plus tôt les limites de vitesse : un enseignement pour dimensionner les projets suivants."],
  environmentGroups:[
    {title:"Logiciel & visualisation",items:["C++","ROS 2","RViz2","micro-ROS Jazzy"]},
    {title:"Matériel & embarqué",items:["RP2040","PIO","LD19","MT6701","A4988","Raspberry Pi 5"]},
    {title:"Interfaces & transport",items:["TinyUSB","USB CDC","UART","I²C"]},
    {title:"Développement & compilation",items:["PlatformIO","Arduino-Pico","CMake","Ninja","MSVC","GCC ARM"]},
    {title:"CAO & prototypage",items:["FreeCAD","KiCad","PrusaSlicer","Impression 3D PETG"]}
  ],
  media:{
    lead:{
      type:"illustration",
      src:"./assets/lidar2D-3D/illustration.png",
      alt:"Photographie du prototype réel LiDAR LD19 sur son mécanisme motorisé, avec éclairage et ombres retravaillés par IA.",
      caption:"Prototype réel assemblé — photographie retravaillée par IA sur l’éclairage et les ombres",
      width:1254, height:1254
    }
  }
};
