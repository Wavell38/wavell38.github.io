export default {
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
      ],
      media:[
        {
          type:"document",
          src:"./assets/gant-IMU/imu-schematic.png",
          alt:"Schéma électronique du module IMU sous KiCad.",
          caption:"Schéma du module IMU",
          width:1628, height:1119
        },
        {
          type:"document",
          src:"./assets/gant-IMU/hub-schematic.png",
          alt:"Schéma électronique du hub RP2040 et de ses connexions IMU.",
          caption:"Schéma du hub RP2040",
          width:1663, height:1153
        }
      ]
    },
    {
      title:"Architecture système multi-capteurs",
      text:"L’architecture sépare les modules IMU, le hub, le transport et le logiciel hôte.",
      bullets:[
        "Étude du positionnement des capteurs sur les doigts et le dos de la main.",
        "Distinction entre les 8 positions IMU logiques définies côté logiciel hôte et la capacité physique prévue du hub, jusqu’à 10 ports IMU."
      ],
      media:[
        {
          type:"document",
          src:"./assets/gant-IMU/imu-pcb-layout.png",
          alt:"Implantation et routage du PCB du module IMU sous KiCad.",
          caption:"Routage du module IMU",
          width:656, height:827
        },
        {
          type:"document",
          src:"./assets/gant-IMU/hub-pcb-layout.png",
          alt:"Implantation et routage du PCB du hub RP2040 à quatre couches.",
          caption:"Routage du hub RP2040",
          width:1045, height:822
        }
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
      ],
      media:[{
        src:"./assets/gant-IMU/imu-board-photo.png",
        alt:"Module IMU photographié à côté d’une pièce d’un centime pour donner l’échelle.",
        caption:"Module IMU — repère d’échelle",
        width:1254, height:1254
      }]
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
      width:1226, height:1283
    }
  }
};
