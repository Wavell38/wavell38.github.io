export default {
  id:"drone", group:"systems", kind:"Robotique / communications", status:"Prototype expérimental",
  title:"Drone semi-autonome", subtitle:"ArduPilot, MAVLink, ROS 2 et réseau mesh",
  titleAccent:"semi-autonome",
  role:"Concepteur / développeur systèmes & robotique",
  period:"2024–2025",
  summary:"Drone assemblé pièce par pièce, architecture Pi 4 embarqué / Pi 5 au sol et passerelle MAVLink ↔ ROS 2 bidirectionnelle.",
  tags:["ArduPilot","MAVLink","ROS 2","C++","Mesh"],
  facts:["Prototype expérimental","Pi 4 / Pi 5","Bridge bidirectionnel"],
  context:"Projet personnel de R&D visant à concevoir une plateforme aérienne semi-autonome capable d’exécuter des actions de haut niveau et, à terme, d’assister un opérateur par des fonctions de déplacement, d’observation et de reconnaissance. Première exploration approfondie de l’intégration robotique : choix et assemblage du matériel, autopilote, calcul embarqué, communication avec ROS 2, commandes de haut niveau, réseau sans fil et simulation. Une réflexion parallèle sur l’interface opérateur a ensuite conduit au projet de gant IMU, pour transmettre rapidement des commandes gestuelles sans monopoliser les mains par une interface classique.",
  objective:[
    "Construire une plateforme expérimentale complète à partir de composants sélectionnés individuellement, avec une architecture sol / embarqué.",
    "Communiquer bidirectionnellement avec l’autopilote et remonter les informations du drone vers ROS 2.",
    "Envoyer des commandes et actions de haut niveau depuis ROS 2 et préparer des scénarios de déplacement semi-autonomes.",
    "Étudier des communications sans fil adaptées à une portée étendue et à une architecture multi-nœuds."
  ],
  sections:[
    {
      title:"Conception et intégration matérielle",
      bullets:[
        "Recherche et sélection des composants selon le format du drone, le coût et les contraintes d’intégration, puis achat séparé et assemblage de la plateforme physique.",
        "Intégration d’un Raspberry Pi 4 embarqué en complément du contrôleur de vol et utilisation d’un Raspberry Pi 5 côté station au sol.",
        "Intégration du GPS et du matériel de communication nécessaire au projet.",
        "Réalisation d’un banc de test pour poursuivre les essais sans dépendre d’un vol réel."
      ]
    },
    {
      title:"ArduPilot, MAVLink et ROS 2",
      bullets:[
        "Utilisation d’ArduPilot comme autopilote et de MAVLink pour les échanges avec le contrôleur de vol.",
        "Développement en C++ / ROS 2 d’une passerelle directe bidirectionnelle MAVLink ↔ ROS 2, afin d’éviter la chaîne intermédiaire ROS 1 alors couramment utilisée.",
        "Centralisation des commandes dans ROS 2 et premières actions de haut niveau déclenchant des séquences de déplacement prédéfinies.",
        "Développement d’une petite interface de commande et intégration d’une manette Xbox pour faciliter le pilotage et disposer d’un moyen de reprise de contrôle manuel."
      ]
    },
    {
      title:"Simulation et validation progressive",
      bullets:[
        "Premier essai physique d’une séquence automatique de décollage, déplacement vers un point puis retour, interrompu avant décollage : le drone s’est incliné au démarrage.",
        "La plateforme n’étant pas suffisamment qualifiée pour poursuivre les essais autonomes en extérieur, réorientation vers le banc, la simulation et la préparation de mécanismes de reprise de contrôle avant tout nouveau vol réel.",
        "Utilisation de Mission Planner comme environnement de supervision et de simulation autour d’ArduPilot.",
        "Vérification des commandes en observant directement les échanges MAVLink et les actions générées depuis ROS 2.",
        "Validation principalement logicielle de la chaîne bidirectionnelle et des premières actions de haut niveau ; les fonctions avancées d’autonomie n’ont pas été qualifiées en vol réel."
      ]
    },
    {
      title:"Communications sans fil",
      bullets:[
        "Expérimentation initiale d’un réseau ad hoc, puis mise en place d’un réseau mesh après sélection de matériel compatible.",
        "Étude de solutions pour étendre la portée entre la station au sol et la plateforme embarquée.",
        "Étude d’une architecture d’antenne directive reposant sur une parabole et une antenne biquad placée au foyer.",
        "Fabrication d’une antenne biquad à partir d’un design existant documenté : réalisation mécanique, soudure et raccordement coaxial."
      ]
    }
  ],
  results:[
    "Drone physique assemblé à partir de composants choisis individuellement.",
    "Architecture expérimentale réunissant calcul embarqué, station au sol, autopilote ArduPilot et couche ROS 2.",
    "Passerelle MAVLink ↔ ROS 2 bidirectionnelle développée et utilisée pour les commandes du système.",
    "Premières actions de haut niveau implémentées et utilisées dans les essais logiciels.",
    "Réseau ad hoc puis mesh expérimenté avec du matériel dédié.",
    "Prototype d’antenne biquad fabriqué et interface de commande à la manette mise en place."
  ],
  labels:{limits:"Enseignements / limites"},
  limits:"Aucun vol autonome complet n’a été validé en conditions réelles. Après le premier essai non concluant, le développement a été recentré sur la simulation et la qualification progressive. Le projet a conduit à approfondir ROS 2, l’intégration logiciel / matériel et les interfaces opérateur, notamment à travers le projet ultérieur de gant IMU.",
  limitsItems:[
    "Les fonctions avancées de perception et de vision sont restées hors du périmètre effectivement réalisé ; l’objectif n’était pas de développer immédiatement un système autonome complet.",
    "L’antenne biquad n’a pas fait l’objet d’une caractérisation RF instrumentée et reste un prototype matériel.",
    "Nécessité de séparer les étapes de qualification : validation du matériel et du contrôleur de vol, pilotage manuel et reprise de contrôle, validation sur banc, simulation des actions autonomes, puis seulement essais autonomes en environnement réel."
  ],
  environmentGroups:[
    {title:"Logiciel & autopilote",items:["C++","ROS 2","ArduPilot","MAVLink","Linux"]},
    {title:"Matériel & navigation",items:["Raspberry Pi 4","Raspberry Pi 5","GPS / GNSS"]},
    {title:"Commande & validation",items:["Mission Planner","Interface de commande","Manette Xbox","Simulation logicielle","Banc de test"]},
    {title:"Communications & RF",items:["Réseau ad hoc","Réseau mesh","Prototypage RF / antenne biquad"]}
  ],
  media:{
    lead:{
      type:"illustration",
      src:"./assets/drone-semi-autonome/illustration.png",
      alt:"Illustration conceptuelle d’un drone relié à une station au sol, avec navigation par points GPS et communications en réseau.",
      width:1254, height:1254
    }
  }
};
