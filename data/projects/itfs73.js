export default {
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
};
