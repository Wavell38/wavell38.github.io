export default {
  id:"pure-illusion", group:"experience", kind:"Expérience professionnelle", status:"Mission terminée",
  title:"Pure Illusion", subtitle:"Agrégateur de données SEO",
  titleAccent:"Illusion",
  role:"Développeur full-stack / intégration data SEO",
  period:"2020 — mission de fin d’études prolongée brièvement en freelance",
  summary:"Développement full-stack et diagnostic d’une chaîne de données SEO multi-sources déjà engagée.",
  tags:["PHP","Symfony","MongoDB","PostgreSQL","Linux"],
  facts:["Version interne exploitable · livraison partielle","Pipeline multi-sources","Diagnostic transversal & déploiement Linux"],
  context:"Pure Illusion est une agence web qui disposait à l’époque d’une activité SEO. Le projet visait à construire un outil interne capable de centraliser et exploiter des données SEO provenant de plusieurs sources. J’ai rejoint un projet déjà engagé comprenant collecte de données, stockage MongoDB, transformation vers PostgreSQL et application web à construire/stabiliser.",
  objective:[
    "Rendre exploitable la chaîne de données et construire l’application web de consultation, tout en diagnostiquant les dysfonctionnements du pipeline existant."
  ],
  sections:[
    {
      title:"Application web de consultation",
      bullets:[
        "Backend sous PHP / Symfony.",
        "Interface avec Twig, HTML/CSS et JavaScript.",
        "Vues de consultation de métriques et données SEO."
      ]
    },
    {
      title:"Intégration & diagnostic de la chaîne de données",
      bullets:[
        "Travail avec PostgreSQL et MongoDB.",
        "Intervention sur une chaîne comprenant collecte Python, MongoDB, ETL Go et PostgreSQL.",
        "Analyse/correction de problèmes de structure et transformation de données.",
        "Debugging transversal entre collecte, transformation et application."
      ]
    },
    {
      title:"Déploiement & restitution",
      bullets:[
        "Intervention sur l’environnement Linux et déploiement.",
        "Échanges avec l’équipe technique et le référent SEO.",
        "Restitution des limites techniques restant à traiter."
      ]
    }
  ],
  results:[
    "Application web de consultation des données SEO centralisées.",
    "Remise en fonctionnement de plusieurs éléments d’une chaîne partiellement opérationnelle.",
    "Identification de problèmes de cohérence/transformation des données.",
    "Version exploitable en interne par le référent SEO.",
    "Formalisation des limites techniques restantes."
  ],
  limits:"Projet livré partiellement, avec une version utilisable mais encore des limites structurelles dans la chaîne existante.",
  environment:["PHP","Symfony","Twig","JavaScript","HTML/CSS","PostgreSQL","MongoDB","Python","ETL Go","Linux","Git"],
  media:{
    lead:{
      type:"illustration",
      src:"./assets/pure-illusion/illustration.png",
      alt:"Illustration de la chaîne de données SEO : sources multiples, collecte Python, MongoDB, ETL Go, PostgreSQL et application web de consultation.",
      caption:"Illustration de la chaîne de données SEO",
      width:1254, height:1254
    }
  }
};
