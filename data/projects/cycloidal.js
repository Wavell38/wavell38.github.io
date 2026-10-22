export default {
  id:"cycloidal", group:"mechanical", kind:"Mécanique / CAO",
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
};
