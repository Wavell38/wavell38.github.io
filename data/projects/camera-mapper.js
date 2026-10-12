export default {
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
};
