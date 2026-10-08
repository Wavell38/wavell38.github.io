# Cards Analyzer — Banc d’acquisition optique multi-éclairage

## Intitulé
**Concepteur système / développeur logiciel & vision — Cards Analyzer**

## Période
**Depuis mai 2026**

## Contexte
Projet personnel de R&D systèmes & vision destiné à analyser visuellement des cartes de collection dans des conditions d’acquisition contrôlées et reproductibles.

La réflexion initiale envisageait une station fortement automatisée : déplacement de la carte sur rails, acquisition détaillée par tuiles, retournement automatique et alimentation depuis des racks. Cette architecture a volontairement été réduite à une **V1 de validation** afin de confronter au réel les choix de mécanique, optique, acquisition et traitement avant d’engager une automatisation plus ambitieuse.

La V1 combine mécanique imprimée en 3D, caméra haute résolution, éclairages diffus et directionnels, électronique de commande, orchestration ROS 2/C++, API web et interface utilisateur.

## Objectif
Concevoir une chaîne reproductible couvrant :

- positionnement de la carte et de la caméra ;
- contrôle des conditions lumineuses ;
- captures haute résolution ;
- profils d’acquisition versionnés ;
- provenance des données ;
- corrections photométriques ;
- localisation géométrique de la carte ;
- préparation des futurs traitements d’analyse de surface.

L’analyse finale automatisée des défauts n’est pas considérée comme qualifiée à ce stade.

## Tâches effectuées

### Conception système et mécanique
- Conception d’un banc d’acquisition avec enceinte optique, support de carte, caméra réglable, éclairages multi-directions et électronique intégrée.
- Architecture mécanique modulaire séparant coque optique, structure porteuse de caméra et électronique.
- Conception du support coulissant de carte, interfaces d’assemblage, supports électroniques et cheminement des câbles.
- CAO sous **FreeCAD**, adaptation des grandes pièces aux contraintes d’impression et ajout de renforts.
- Fabrication additive du prototype et itérations d’assemblage.

### Optique et éclairage
- Utilisation d’une **Arducam 64 MP** sur Raspberry Pi 5.
- Conception d’un éclairage global diffus complété par huit éclairages directionnels.
- Neuf groupes lumineux pilotables : un global et huit directions réparties sur deux angles.
- Recherche d’une acquisition multi-éclairage permettant de révéler rayures, reliefs, micro-déformations ou effets holographiques difficiles à observer sur une seule photographie.
- Intégration de diffuseurs et travail sur les angles d’éclairage.

### Architecture logicielle
- Architecture modulaire associant **ROS 2 / C++**, **NestJS / TypeScript** et **React / TypeScript**.
- Découpage en composants dédiés à la caméra, l’éclairage, l’acquisition, la calibration, le traitement d’image, les workflows de scan et le bringup.
- Séparation entre logique métier testable et adaptateurs matériels/ROS lorsque pertinent.
- Contrats versionnés pour sessions d’acquisition, données RAW, artefacts de calibration et géométrie.

### Caméra et acquisition
- Intégration d’un backend **libcamera** persistant.
- Gestion distincte de la preview et des captures analytiques haute résolution.
- Contrôle de l’exposition, gain, balance des blancs, focus et phases de warm-up.
- Garde-fous temporels pour éviter qu’une capture analytique réutilise une frame exposée sous l’état lumineux précédent.
- Écritures asynchrones et synchronisation avant publication d’une session exploitable.

### Éclairage et orchestration
- Backend PCA9685 / I²C avec abstraction testable sans matériel.
- Gestion des intensités, états complets/partiels et délais de stabilisation.
- Profils YAML décrivant éclairages, intensités, exposition, temporisations et captures.
- Séquences asynchrones avec progression, annulation, gestion des erreurs et captures dark.

### Traitement d’image
- Pipeline de données RAW Bayer et traitements CFA.
- Mise en place progressive de corrections photométriques, notamment dark/flat.
- Premières étapes de localisation géométrique de la carte.
- Qualification séparée de méthodes candidates pour les bords et coins afin de ne pas considérer prématurément une approche comme acquise.

### Backend et interface
- API NestJS / Fastify avec intégration ROS via rclnodejs.
- WebSocket pour le suivi d’état.
- Interface React / Vite pour piloter l’acquisition et visualiser la progression.

## Résultats
- Prototype V1 mécanique et électronique construit autour d’un dôme d’acquisition.
- Chaîne multi-éclairage à neuf groupes intégrée.
- Acquisition haute résolution pilotable et reproductible.
- Orchestration logicielle complète entre ROS 2, backend et interface web.
- Gestion de profils d’acquisition, captures dark et provenance des sessions.
- Premiers traitements photométriques et géométriques opérationnels.

## Limites / état du projet
Le projet est un **prototype V1 avancé en cours**.

La détection finale et la qualification automatisée des défauts de surface ne sont pas encore établies. La géométrie des bords et des coins reste expérimentale, et certaines décisions de la future automatisation mécanique sont volontairement différées.

## Environnement technique
**C++20 · ROS 2 Jazzy · rclcpp · libcamera · OpenCV · RAW Bayer RGGB · Raspberry Pi 5 · Arducam 64 MP · PCA9685 · I²C · NestJS · TypeScript · Fastify · rclnodejs · WebSocket · React · Vite · JSON · YAML · FreeCAD · KiCad · PrusaSlicer · impression 3D · tests/qualification · agents IA**

## Version courte pour CV
- Banc automatisé d’acquisition de cartes combinant mécanique imprimée 3D, caméra 64 MP et neuf groupes d’éclairage contrôlés.
- Architecture ROS 2/C++ + NestJS/React avec profils d’acquisition versionnés et synchronisation caméra/lumière.
- Pipeline RAW et corrections photométriques, avec premières étapes de localisation géométrique.
- Qualification expérimentale progressive avant automatisation mécanique plus ambitieuse.
