# Drone semi-autonome — Plateforme aérienne expérimentale

## Intitulé
**Concepteur / développeur systèmes & robotique — drone semi-autonome**

## Contexte
Projet personnel de R&D visant à concevoir une plateforme aérienne semi-autonome capable d’exécuter des actions de haut niveau et, à terme, d’assister un opérateur par des fonctions de déplacement, d’observation et de reconnaissance.

Le projet a servi de première exploration approfondie de l’intégration robotique : choix et assemblage du matériel, autopilote, calcul embarqué, communication avec ROS 2, commandes de haut niveau, réseau sans fil et simulation.

Une réflexion parallèle sur l’interface opérateur a ensuite conduit au projet de gant IMU : l’objectif était de pouvoir transmettre rapidement des commandes gestuelles sans monopoliser les mains par une interface classique.

## Objectif
Construire une plateforme expérimentale complète autour d’un drone assemblé à partir de composants sélectionnés individuellement, puis développer une couche logicielle permettant :

- de communiquer bidirectionnellement avec l’autopilote ;
- de remonter les informations du drone vers ROS 2 ;
- d’envoyer des commandes et actions de haut niveau depuis ROS 2 ;
- de préparer des scénarios de déplacement semi-autonomes ;
- d’expérimenter une architecture sol / embarqué ;
- d’étudier des communications sans fil plus adaptées à une portée étendue et à une architecture multi-nœuds.

L’objectif n’était pas de développer immédiatement un système autonome complet : les fonctions avancées de perception et de vision sont restées hors du périmètre effectivement réalisé.

## Tâches effectuées

### Conception et intégration matérielle
- Recherche et sélection des composants en fonction du format du drone, du coût et des contraintes d’intégration.
- Achat des éléments séparément puis assemblage de la plateforme physique.
- Intégration d’un **Raspberry Pi 4 embarqué** en complément du contrôleur de vol.
- Utilisation d’un **Raspberry Pi 5 côté station au sol** dans l’architecture expérimentale.
- Intégration du GPS et du matériel de communication nécessaire au projet.
- Réalisation d’un banc de test afin de poursuivre les essais sans dépendre d’un vol réel.

### ArduPilot, MAVLink et ROS 2
- Utilisation d’**ArduPilot** comme autopilote et de **MAVLink** pour les échanges avec le contrôleur de vol.
- Développement en **C++ / ROS 2** d’une passerelle directe bidirectionnelle entre MAVLink et ROS 2, afin d’éviter la chaîne intermédiaire ROS 1 alors couramment utilisée.
- Centralisation des commandes du drone dans ROS 2.
- Mise en place de premières actions de haut niveau permettant de déclencher des séquences de déplacement prédéfinies.
- Développement d’une petite interface de commande et intégration d’une **manette Xbox** pour faciliter le pilotage et disposer d’un moyen de reprise de contrôle manuel.

### Simulation et validation progressive
- Premier essai physique d’une séquence automatique de décollage, déplacement vers un point puis retour.
- L’essai a été interrompu avant décollage : le drone s’est incliné au démarrage, révélant que la plateforme n’était pas suffisamment qualifiée pour poursuivre des essais autonomes en extérieur.
- Réorientation du développement vers une approche plus prudente : banc de test, simulation et préparation de mécanismes de reprise de contrôle avant tout nouveau vol réel.
- Utilisation de **Mission Planner** comme environnement de supervision et de simulation autour d’ArduPilot.
- Vérification du comportement des commandes en observant directement les échanges **MAVLink** et les actions générées depuis la couche **ROS 2**.
- Validation principalement logicielle de la chaîne de commande bidirectionnelle et des premières actions de haut niveau avant toute reprise envisagée des essais physiques.
- Les fonctions avancées d’autonomie n’ont pas été qualifiées sur un drone en vol réel.

### Communications sans fil
- Expérimentation initiale d’un réseau **ad hoc**, puis mise en place d’un **réseau mesh** après sélection de matériel compatible.
- Étude de solutions permettant d’étendre la portée de communication entre la station au sol et la plateforme embarquée.
- Étude d’une architecture d’antenne directive reposant sur une parabole et une antenne biquad placée au foyer.
- Fabrication d’une **antenne biquad** à partir d’un design existant documenté : réalisation mécanique, soudure et raccordement coaxial.
- L’antenne fabriquée n’a pas fait l’objet d’une caractérisation RF instrumentée ; elle reste un prototype matériel.

## Résultats
- Drone physique assemblé à partir de composants choisis individuellement.
- Architecture expérimentale comprenant calcul embarqué, station au sol, autopilote ArduPilot et couche ROS 2.
- Passerelle **MAVLink ↔ ROS 2 bidirectionnelle** développée et utilisée pour les commandes du système.
- Premières actions de haut niveau implémentées et utilisées dans les essais logiciels.
- Réseau ad hoc puis mesh expérimenté avec du matériel dédié.
- Prototype d’antenne biquad fabriqué.
- Interface de commande à la manette mise en place.
- Aucun vol autonome complet validé en conditions réelles ; après un premier essai non concluant, le développement a été recentré sur la simulation et la qualification progressive.

## Enseignements / limites
Le projet a mis en évidence la nécessité de séparer plus strictement :

1. validation du matériel et du contrôleur de vol ;
2. pilotage manuel et reprise de contrôle ;
3. validation sur banc ;
4. simulation des actions autonomes ;
5. seulement ensuite, essais autonomes en environnement réel.

Il constitue également l’un des projets ayant conduit à approfondir ROS 2, l’intégration logiciel / matériel et la conception d’interfaces opérateur, notamment à travers le projet ultérieur de gant IMU.

## Environnement technique
**C++ · ROS 2 · ArduPilot · MAVLink · Mission Planner · Raspberry Pi 4 · Raspberry Pi 5 · Linux · GPS / GNSS · réseau ad hoc · réseau mesh · interface de commande · manette Xbox · simulation logicielle · prototypage RF / antenne biquad**
