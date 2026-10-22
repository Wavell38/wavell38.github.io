export default {
  id:"quant-platform", group:"featured", order:2, kind:"Projet personnel", status:"R&D en cours",
  title:"Plateforme de recherche quantitative", subtitle:"Backtest, exécution simulée & performance",
  titleAccent:"quantitative",
  role:"Développeur logiciel / architecture & performance",
  period:"Depuis juin 2026",
  summary:"Un projet software centré sur la reproductibilité, la performance et la modélisation explicite de l’exécution, du portefeuille et du risque.",
  tags:["Rust","Python","Architecture","Performance","Profiling"],
  facts:["Python fonctionnel · Rust en qualification","Replay reproductible","Streaming borné"],
  context:"Projet personnel de R&D logicielle visant à rejouer des données de marché historiques, exécuter des stratégies dans un environnement simulé et comparer leurs comportements dans des conditions reproductibles. Une première implémentation Python a permis de qualifier le domaine et les règles d’exécution. Les limites mesurées en benchmark ont ensuite conduit à reprendre le runtime en Rust, avec une qualification systématique des dépendances, des performances et de la mémoire.",
  objective:[
    "Construire un environnement de backtest déterministe et performant pour des campagnes longues, avec modélisation explicite des données de marché, de l’exécution, du portefeuille et du risque."
  ],
  sections:[
    {
      title:"Modélisation & replay de marché",
      bullets:[
        "Représentation des données historiques : carnet d’ordres L2, trades, prix de référence/index et événements de financement.",
        "Construction d’un pipeline de replay reproductible."
      ]
    },
    {
      title:"Exécution simulée & portefeuille",
      bullets:[
        "Modélisation des ordres, fills, frais et positions.",
        "Gestion de l’état du portefeuille et de sa restauration.",
        "Qualification des règles d’exécution et des contraintes de risque.",
        "Isolation de l’état entre plusieurs campagnes."
      ]
    },
    {
      title:"Migration Python → Rust",
      bullets:[
        "Première verticale fonctionnelle en Python pour qualifier le domaine.",
        "Benchmarks des limites de temps d’exécution, puis reprise du runtime en Rust.",
        "Qualification du moteur tiers par verticales expérimentales avant extension de l’architecture."
      ]
    },
    {
      title:"Streaming & campagnes longues",
      bullets:[
        "Streaming borné pour éviter le chargement intégral de longues périodes de données.",
        "Conservation de l’ordre des événements et des groupes de même timestamp.",
        "Séparation entre résolution du marché et cadence de décision de la stratégie.",
        "Campagnes sur des moteurs fraîchement instanciés pour vérifier la reproductibilité."
      ]
    },
    {
      title:"Performance & mémoire",
      bullets:[
        "Benchmarks du temps d’exécution, de la mémoire et de la concurrence entre workers.",
        "Profilage de la croissance mémoire et identification de la rétention de blocs de données encodés comme source importante de cette croissance.",
        "Définition de limites de concurrence adaptées à la machine de développement."
      ]
    },
    {
      title:"Bibliothèque de stratégies",
      bullets:[
        "Préparation d’une bibliothèque de stratégies paramétrables.",
        "Séparation des outils génériques des stratégies elles-mêmes.",
        "Préparation de campagnes de comparaison et d’optimisation."
      ]
    }
  ],
  results:[
    "Première plateforme Python fonctionnelle pour qualifier le domaine, puis runtime Rust qualifié progressivement.",
    "Replay reproductible avec vérification de l’état des ordres, des positions et des données de marché.",
    "Streaming borné validé sur des campagnes multi-jours.",
    "Profiling ayant identifié un goulot de rétention mémoire et permis d’adapter la concurrence.",
    "Socle technique préparé pour accueillir des stratégies paramétrables."
  ],
  limits:"Projet de recherche logicielle en cours, non présenté comme une plateforme de trading prête pour production. Les résultats techniques ne constituent pas une validation financière ni une preuve de rentabilité de stratégies.",
  nextSteps:"La cible à long terme est une boucle automatisée de recherche et d’adaptation des stratégies aux conditions de marché. Ces capacités restent des étapes futures du projet.",
  nextStepsItems:[
    "Automatiser à terme des campagnes régulières et reproductibles pour réévaluer les stratégies face aux conditions de marché courantes.",
    "Développer une évaluation graduée pour sélectionner les stratégies les plus adaptées, en conserver plusieurs et ajuster automatiquement leurs paramètres lorsque nécessaire.",
    "Faire coexister à terme des stratégies en test simulé et des stratégies utilisées en réel après validation approfondie, avec une adaptation continue fondée sur ces réévaluations."
  ],
  environmentGroups:[
    {title:"Langages & runtime",items:["Rust","Cargo","Python","Moteurs de backtest"]},
    {title:"Données & architecture",items:["Données L2 / marché","Architecture modulaire"]},
    {title:"Validation & mesure",items:["Tests automatisés","pytest","Ruff","Profiling temps/mémoire"]},
    {title:"Développement",items:["Git","Agents IA"]}
  ],
  media:{
    lead:{
      type:"illustration",
      src:"./assets/plateforme-quantitative/Pipeline-futuriste.png",
      alt:"Illustration conceptuelle d’un pipeline reliant données de marché, backtest, simulation et stratégies.",
      caption:"Illustration conceptuelle du pipeline de recherche",
      width:1448, height:1086
    }
  }
};
