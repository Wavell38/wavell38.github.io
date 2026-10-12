export default {
  id:"robot-arm", group:"mechanical", kind:"Mécanique / prototypage", status:"Prototype mécanique",
  title:"Bras robotique V1", subtitle:"Prototype mécanique low-cost",
  titleAccent:"V1",
  role:"Concepteur / prototypage mécanique — bras robotique articulé low-cost",
  period:"2025",
  summary:"Un bras d’environ 70 cm, 5 axes + pince, conçu sous Blender et fabriqué en PETG autour de servomoteurs à fort couple.",
  tags:["Blender","PETG","Servos","PCA9685","Mécanique"],
  facts:["Mécanique assemblée","≈70 cm · 5 axes + pince","≈1 mois de réalisation"],
  // Editorial source: assets/bras-robotique/bras-robotique-v1-portfolio.md
  context:"Projet personnel réalisé en 2025, sur environ un mois de conception et fabrication effective. L’objectif était de partir de zéro pour concevoir un bras robotique complet avec des composants accessibles et des pièces imprimées en 3D, destiné à terme à manipuler des objets ou à servir de base à de petites tâches automatisées. Cette V1 a été modélisée sous Blender, avant l’utilisation de FreeCAD dans les projets suivants. Le prototype mécanique a été terminé et assemblé, mais le projet a été arrêté avant la phase d’actionnement électrique et de développement logiciel.",
  labels:{objectives:"Objectif", nextSteps:"Évolution envisagée — V2"},
  objective:[
    "Concevoir un bras low-cost avec une base rotative, trois articulations principales, un poignet orientable et une pince motorisée.",
    "Adapter les réductions mécaniques aux servomoteurs disponibles, limités en angle, tout en conservant suffisamment de couple aux articulations.",
    "Intégrer le câblage à la structure et préparer une commande basée sur Raspberry Pi et PCA9685."
  ],
  sections:[
    {
      title:"Architecture mécanique",
      text:"Déployé, le prototype mesure environ 70 cm depuis la base et comporte cinq axes de positionnement, auxquels s’ajoute l’ouverture / fermeture de la pince.",
      bullets:[
        "Cinq axes : rotation de la base, épaule, coude, flexion du poignet et rotation du poignet.",
        "Servomoteurs RC à fort couple, de l’ordre de 25 à 35 kg·cm annoncés, selon leur position dans le bras.",
        "Servos placés sous l’articulation entraînée, dans ou au plus près du segment inférieur, pour limiter la masse portée."
      ]
    },
    {
      title:"Articulations principales & transmissions mécaniques",
      text:"L’épaule, le coude et la flexion du poignet utilisent chacun un axe en acier trempé et deux roulements, un de chaque côté de l’articulation. La transmission suit le principe : petit engrenage sur le servo → grand engrenage solidaire de l’axe.",
      bullets:[
        "Axes découpés et ajustés manuellement ; l’acier trempé a remplacé des tiges ordinaires dont la géométrie était trop irrégulière pour les assemblages sur roulements.",
        "Rapports de réduction calculés selon le couple nécessaire et l’angle maximal des servos, généralement limité à environ 180° ou 270°.",
        "Prise en compte de la perte de débattement due à la réduction, de l’encombrement disponible et des dimensions minimales imprimables des dents."
      ],
      media:[{
        src:"./assets/bras-robotique/gear-reduction.png",
        alt:"Transmission d’une articulation du bras : petit engrenage du servo et grand engrenage sur l’axe.",
        width:1254, height:1254,
        caption:"Réduction mécanique : petit engrenage servo → grand engrenage sur l’axe."
      }]
    },
    {
      title:"Base rotative & poignet",
      text:"La base et la rotation du poignet reposent sur des solutions simplifiées pour cette première version.",
      bullets:[
        "Base supportée par un plateau tournant du commerce de type lazy Susan, avec un servo sous la plateforme entraînant une grande couronne interne.",
        "Jeu mécanique important de la base, identifiée comme un élément prioritaire à remplacer.",
        "Flexion du poignet sur axe acier, doubles roulements et réduction par engrenages.",
        "Rotation du poignet directement portée par l’axe du servo, sans palier séparé ni transmission supplémentaire."
      ]
    },
    {
      title:"Pince",
      text:"La pince utilise un seul servomoteur et trois engrenages : un engrenage moteur et deux engrenages solidaires des doigts.",
      bullets:[
        "Les deux doigts engrènent entre eux pour une ouverture et une fermeture symétriques.",
        "Géométrie et mécanisme conçus spécifiquement pour le prototype à partir de l’étude de mécanismes existants."
      ],
      media:[{
        src:"./assets/bras-robotique/gripper.png",
        alt:"Pince du prototype avec ses deux doigts et les engrenages qui les relient.",
        width:1254, height:1254,
        caption:"Mécanisme de préhension et liaison entre les deux doigts."
      }]
    },
    {
      title:"Fabrication & intégration",
      text:"La structure a été entièrement modélisée sous Blender, puis principalement imprimée en PETG et assemblée.",
      bullets:[
        "Logements des moteurs, axes, roulements, engrenages et passages de câbles intégrés aux segments du bras.",
        "Câblage acheminé au plus près de la structure pour limiter les éléments libres à l’extérieur.",
        "Alimentation principale distribuée le long du bras pour éviter de multiplier les lignes de puissance individuelles."
      ]
    },
    {
      title:"Électronique préparée",
      text:"La chaîne de commande prévue était Raspberry Pi → PCA9685 → servomoteurs, avec une alimentation de puissance séparée ou dérivée pour les moteurs. Le PCA9685 était déjà intégré dans la base ; la commande complète n’a pas été mise en service.",
      bullets:[
        "Câblage moteur préparé : alimentation principale distribuée, lignes de commande PWM et condensateurs à proximité des moteurs.",
        "Diodes Schottky prévues pour la protection de l’alimentation.",
        "Ajout prévu de condensateurs de forte capacité près de l’entrée d’alimentation."
      ],
      media:[{
        src:"./assets/bras-robotique/electronics-base.png",
        alt:"Électronique dans la base du bras robotique, avec le PCA9685 et le câblage préparé.",
        width:1254, height:1254,
        caption:"PCA9685 intégré et câblage préparé dans la base."
      }]
    }
  ],
  resultsIntro:"Un prototype mécaniquement terminé, sans actionnement électrique complet ni logiciel de contrôle réalisé sur cette version.",
  results:[
    "Conception complète, modélisation, impression et assemblage physique d’un bras d’environ 70 cm.",
    "Réalisation de cinq axes de positionnement et d’une pince.",
    "Intégration de servomoteurs, engrenages, axes acier trempé et doubles roulements sur les articulations principales.",
    "Réductions dimensionnées selon le couple, le débattement, l’encombrement et les contraintes d’impression.",
    "Câblage intégré à la structure et électronique de commande préparée."
  ],
  limits:"Le projet a été arrêté avant les tests motorisés. Les limites identifiées ont motivé une nouvelle architecture ; les performances du système complet restent non validées.",
  limitsItems:[
    "Masse globale élevée et architecture encore peu optimisée pour limiter les efforts en bout de chaîne.",
    "Jeu important au niveau de la base rotative.",
    "Servomoteurs limités en angle et en vitesse.",
    "Rotation du poignet directement portée par l’axe moteur.",
    "Absence de modularité, notamment pour la pince.",
    "Câblage interne non conçu pour une rotation continue.",
    "Aucune validation de charge, de rigidité, de répétabilité ou de backlash du système complet.",
    "Aucun actionnement électrique complet ni logiciel de contrôle final réalisé."
  ],
  nextSteps:"Cette V1 a servi de première itération d’apprentissage : concevoir, fabriquer et assembler le bras a permis de comprendre les mécanismes et d’identifier les limites à reprendre dans une V2 plus ambitieuse. Le réducteur cycloïdal est né de cette réflexion. Développé comme un projet indépendant, il étudie une solution de transmission destinée au futur bras V2, plus robuste.",
  nextStepsItems:[
    "Passer de Blender à FreeCAD et utiliser des roulements plus adaptés, notamment des roulements croisés de type RU106 / équivalent CRBF35-15AT.",
    "Étudier des motorisations plus importantes et plus adaptées, ainsi que des réducteurs cycloïdaux.",
    "Réduire la masse portée et envisager de déporter davantage les moteurs via courroies ou autres transmissions.",
    "Rendre l’architecture plus modulaire et améliorer le passage des câbles, avec un éventuel recours à des slip rings.",
    "Qualifier séparément chaque articulation avant assemblage et mesurer couple, jeu, rigidité et répétabilité."
  ],
  nextStepsLinks:[["Découvrir le réducteur cycloïdal pour le bras V2","./project.html?id=cycloidal"]],
  links:[["Vers la V2 : réducteur cycloïdal","./project.html?id=cycloidal"]],
  environmentGroups:[
    {title:"Conception & fabrication", items:["Blender","Impression 3D PETG"]},
    {title:"Mécanique", items:["Servomoteurs RC fort couple","Engrenages imprimés","Axes acier trempé","Roulements"]},
    {title:"Commande préparée", items:["Raspberry Pi","PCA9685","PWM","Électronique de puissance préparée"]}
  ],
  media:{
    lead:{
      type:"illustration", src:"./assets/bras-robotique/illustration.png",
      alt:"Vue d’ensemble du prototype mécanique assemblé du bras robotique V1.",
      width:1254, height:1254,
      caption:"Prototype V1 assemblé — environ 70 cm, 5 axes de positionnement + pince."
    }
  }
};
