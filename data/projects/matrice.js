export default {
  id:"matrice", group:"experience", kind:"Collaboration technique", status:"Collaboration achevée",
  title:"Outil de collecte et de supervision de données sociales", subtitle:"Campagnes automatisées de collecte et pilotage métier",
  company:"Agence Matrice",
  titleAccent:"données sociales",
  role:"Développeur full-stack / automatisation & supervision de collecte",
  period:"2021–2022",
  summary:"Automatisation de campagnes de collecte de données publiques sur les réseaux sociaux pour environ 150 stations de ski.",
  tags:["TypeScript","NestJS","Electron","React","Puppeteer"],
  facts:["POC avancé / pré-V1 fonctionnelle","≈150 stations de ski","Campagnes & export CSV"],
  // Editorial source: assets/agence-matrice/agence-matrice-portfolio.md
  context:"Collaboration technique avec l’agence Matrice autour de la conception autonome d’une application métier, avec une perspective de vente de l’application et de partenariat économique et de développement continu qui n’a pas abouti. L’agence de communication réalisait périodiquement des relevés largement manuels de données publiques, principalement sur Facebook et Instagram, pour environ 150 stations de ski françaises. Ces données alimentaient un scoring interne calculé séparément par une autre personne à partir des exports : l’application ne réalisait pas ce scoring. Le développement principal a été mené pendant environ trois mois, en parallèle d’un autre projet professionnel.",
  labels:{objectives:"Objectif"},
  objective:[
    "Automatiser la collecte de métriques publiques sur plusieurs réseaux sociaux.",
    "Gérer un catalogue de stations indépendant des campagnes et composer des collectes sur tout ou partie de ce catalogue.",
    "Lancer, superviser, interrompre et reprendre les campagnes, identifier les erreurs et relancer uniquement les éléments nécessaires.",
    "Exporter les données en CSV selon le format attendu par le traitement de scoring existant, réalisé hors de l’application."
  ],
  sections:[
    {
      title:"Automatisation de la collecte",
      text:"Des collecteurs Puppeteer / Chromium pour automatiser les relevés de métriques publiques, principalement sur Facebook et Instagram.",
      bullets:[
        "Collecte des publications récentes, likes, commentaires, activité des comptes et autres indicateurs nécessaires au traitement aval.",
        "Expérimentations plus limitées sur d’autres plateformes.",
        "Diagnostic et adaptation des collecteurs aux évolutions fréquentes des interfaces et structures des réseaux sociaux.",
        "Étude et expérimentation de proxies résidentiels et de rotation d’IP pour améliorer la continuité des collectes face aux limitations d’accès."
      ]
    },
    {
      title:"Du prototype web à l’application Electron",
      text:"Une première version web a servi de preuve de concept, puis l’outil a été refondu en application desktop pour faciliter le pilotage des campagnes récurrentes.",
      bullets:[
        "Développement des interfaces React puis intégration dans Electron.",
        "Ajout et organisation des stations de ski dans un catalogue indépendant des campagnes.",
        "Création de groupes et campagnes réutilisables à partir du catalogue existant.",
        "Ordonnancement de plusieurs campagnes et choix de leur séquence d’exécution."
      ]
    },
    {
      title:"Gestion & supervision des campagnes",
      text:"Le suivi d’exécution permettait d’identifier les échecs et de préparer des relances partielles sans ressaisir les cibles.",
      bullets:[
        "Commandes de lancement, pause, reprise et arrêt.",
        "Affichage en temps réel de l’avancement et des données récupérées.",
        "Signalement visuel des collectes réussies ou en erreur.",
        "Recomposition rapide d’une campagne limitée aux stations en échec, puis relance ciblée."
      ]
    },
    {
      title:"Données & restitution CSV",
      text:"La restitution était conçue pour alimenter le traitement métier existant ; le calcul des scores restait séparé de l’application.",
      bullets:[
        "Structuration des métriques selon les besoins du traitement de scoring.",
        "Génération d’exports CSV directement exploitables par la personne chargée du calcul des scores.",
        "Utilisation de PostgreSQL pour certaines données applicatives, sans stockage historique complet des métriques dans cette version."
      ]
    },
    {
      title:"Architecture & backend",
      bullets:[
        "Développement du backend avec NestJS / Node.js et TypeScript.",
        "Articulation du backend, des collecteurs Puppeteer / Chromium et de l’interface React intégrée dans Electron.",
        "Évolution de l’architecture au fil du passage du proof of concept à une pré-V1 fonctionnelle."
      ]
    }
  ],
  results:[
    "Passage de relevés manuels à une collecte largement automatisée, sur un périmètre d’environ 150 stations de ski françaises suivies par l’agence.",
    "Application desktop permettant de préparer, lancer et superviser des campagnes récurrentes.",
    "Gestion opérationnelle des erreurs et relances partielles sans recommencer systématiquement une campagne complète.",
    "Exports CSV utilisés pour alimenter le traitement de scoring externe à l’application.",
    "Utilisation réelle pendant le développement : campagnes exécutées avec la version en cours et résultats transmis à l’agence."
  ],
  limits:"POC avancé / pré-V1 fonctionnelle, utilisé réellement pendant le développement, sans industrialisation complète ni commercialisation finalisée.",
  limitsItems:[
    "Maintenance régulière des collecteurs nécessaire face aux évolutions des interfaces et protections des plateformes.",
    "Gestion des proxies et résilience aux limitations d’accès encore perfectibles.",
    "Stockage historique limité dans cette version.",
    "Scoring métier volontairement séparé, réalisé par une autre personne à partir des données exportées."
  ],
  nextSteps:"Piste d’évolution identifiée à l’époque : le stockage historique et l’exploitation analytique des données auraient pu être approfondis dans une version ultérieure.",
  environmentGroups:[
    {title:"Backend & application",items:["TypeScript","Node.js","NestJS","React","Electron"]},
    {title:"Collecte & supervision",items:["Puppeteer","Chromium","Automatisation de collecte","Supervision de campagnes"]},
    {title:"Données & restitution",items:["PostgreSQL","CSV"]},
    {title:"Expérimentations réseau",items:["Proxies résidentiels","Rotation d’IP"]}
  ],
  media:{
    lead:{
      type:"illustration",
      src:"./assets/agence-matrice/illustration.png",
      alt:"Illustration de la collecte de données sociales des stations de ski : supervision des campagnes, états de collecte et exports de données.",
      width:1448, height:1086
    }
  }
};
