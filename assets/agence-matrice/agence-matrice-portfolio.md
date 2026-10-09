# Agence Matrice — Outil de collecte et supervision de données sociales

## Intitulé
**Développeur full-stack / automatisation & supervision de collecte**

## Contexte
Agence Matrice est une agence de communication travaillant notamment sur la visibilité et l’attractivité de stations de ski.

L’agence réalisait périodiquement, de manière largement manuelle, des relevés de données publiques issues de réseaux sociaux afin d’alimenter un système de scoring interne. L’objectif du projet était d’automatiser cette collecte sur un ordre de grandeur d’environ **150 stations de ski françaises**, principalement sur Facebook et Instagram, puis de restituer les données dans un format directement exploitable par la personne chargée du calcul des scores.

Le développement principal a été réalisé en autonomie sur une période d’environ **trois mois**, en parallèle d’un autre projet professionnel.

## Objectif
Concevoir un outil permettant de :

- automatiser la collecte de métriques publiques sur plusieurs réseaux sociaux ;
- gérer un catalogue de stations de ski indépendamment des campagnes de collecte ;
- composer et lancer des campagnes sur tout ou partie de ce catalogue ;
- superviser leur exécution, les interrompre, les reprendre ou relancer uniquement les éléments nécessaires ;
- identifier visuellement les échecs de collecte ;
- produire un export CSV structuré selon le format attendu par le traitement de scoring existant.

Le calcul du scoring lui-même n’était pas réalisé par l’application : il était pris en charge séparément par une autre personne à partir des données exportées.

## Tâches effectuées

### Automatisation de la collecte
- Développement de collecteurs automatisés avec **Puppeteer / Chromium**.
- Collecte de métriques publiques telles que publications récentes, likes, commentaires, activité des comptes et autres indicateurs nécessaires au traitement aval.
- Travail principalement sur **Facebook** et **Instagram**, avec des expérimentations plus limitées sur d’autres plateformes.
- Gestion des évolutions fréquentes des interfaces et structures des réseaux sociaux.
- Étude et expérimentation de mécanismes de rotation d’adresses IP / proxies résidentiels afin d’améliorer la continuité des collectes face aux limitations d’accès.

### Évolution du prototype vers une application desktop
- Réalisation d’une première version web servant de preuve de concept.
- Refonte en application **Electron** afin de disposer d’un outil de pilotage plus pratique pour les campagnes récurrentes.
- Développement d’une interface permettant d’ajouter et organiser les stations de ski indépendamment des campagnes.
- Création de groupes / campagnes réutilisables à partir du catalogue existant.
- Possibilité d’ordonner plusieurs campagnes et de choisir leur séquence d’exécution.

### Supervision des campagnes
- Commandes de lancement, pause, reprise et arrêt.
- Affichage en temps réel de l’avancement et des données récupérées.
- Signalement visuel des collectes réussies ou en erreur.
- Possibilité de recomposer rapidement une campagne limitée aux stations ayant échoué puis de la relancer.
- Organisation des campagnes de manière indépendante du référentiel des stations, afin d’éviter de ressaisir les mêmes cibles.

### Données et restitution
- Structuration des données collectées selon les besoins du traitement de scoring existant.
- Génération d’exports **CSV** directement exploitables par la personne responsable du calcul des scores.
- Utilisation de **PostgreSQL** pour certaines données applicatives ; le stockage historique complet des métriques collectées n’était pas encore l’objectif principal de cette version.

### Architecture et backend
- Développement du backend avec **NestJS / Node.js**.
- Développement des interfaces avec **React**, puis intégration dans une application desktop **Electron**.
- Conception et évolution de l’architecture au fil du passage du proof of concept à une version proche d’une V1 exploitable.
- Diagnostic et adaptation régulière des collecteurs lorsque les sources externes évoluaient.

## Résultats
- Passage d’un processus de relevé manuel à une **collecte largement automatisée** sur un volume couvrant l’ordre de grandeur des stations de ski françaises suivies par l’agence.
- Mise en place d’une application desktop permettant de préparer, lancer et superviser des campagnes de collecte récurrentes.
- Gestion opérationnelle des erreurs et relances partielles sans devoir recommencer systématiquement une campagne complète.
- Production de fichiers CSV utilisés pour alimenter le traitement de scoring existant.
- Utilisation réelle de l’outil pendant son développement : les campagnes étaient exécutées avec la version en cours puis les résultats transmis à l’agence.
- Projet arrivé à un stade de **POC avancé / pré-V1 fonctionnelle**, sans industrialisation complète ni commercialisation finalisée.

## Limites / état du projet
- Les réseaux sociaux modifiant régulièrement leurs interfaces et protections, les collecteurs demandaient encore de la maintenance.
- La gestion des proxies et de la résilience aux limitations d’accès restait perfectible.
- Le stockage historique et l’exploitation analytique des données auraient pu être approfondis dans une version ultérieure.
- Le scoring métier restait volontairement séparé de l’outil de collecte.

## Environnement technique
**TypeScript · Node.js · NestJS · React · Electron · Puppeteer · Chromium · PostgreSQL · CSV · automatisation de collecte · supervision de campagnes · proxies résidentiels / rotation d’IP**
