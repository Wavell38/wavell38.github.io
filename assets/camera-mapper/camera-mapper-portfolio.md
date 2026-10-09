# Camera Mapper — Perception globale de terrain

## Intitulé
**Intégrateur robotique / développeur perception terrain — Camera Mapper**

## Période
**Depuis mars 2026 — projet personnel réalisé dans le contexte de la Coupe de France de Robotique**

## Contexte
Conception en autonomie d’un module d’observation globale du terrain pour la Coupe de France de Robotique.

Le système repose sur une caméra placée en hauteur sur un **mât fixe d’environ 1,5 m positionné à côté du terrain**, associée à un Raspberry Pi 5 sous ROS 2. L’objectif principal n’était pas l’interface de visualisation, mais de fournir au système robotique un état exploitable de ce qui se passe sur le terrain : robots présents, marqueurs identifiables et objets / pièces de jeu détectables, afin que les autres composants puissent raisonner à partir d’une représentation globale de la scène.

Une interface et des outils de visualisation ont également été prévus pour les essais, le debug et l’observation du pipeline, mais ils restent secondaires par rapport au besoin principal de perception.

Une première version a été utilisée ponctuellement en compétition. Cette utilisation réelle a mis en évidence deux limites majeures : couverture insuffisante avec une caméra unique et cadence du pipeline trop faible pour en faire un composant central fiable pendant les matchs. La V1 est donc considérée comme une étape de validation, avec une V2 à repenser autour d’une meilleure couverture et d’un dimensionnement plus adapté du calculateur.

## Objectif
Construire une chaîne :

**Caméra → interprétation de scène → projection terrain → suivi temporel → world model**

capable de fournir au robot des informations sur les éléments présents et mobiles sur le terrain, notamment les robots suivis et les objets / pièces détectables, tout en restant compatible avec les ressources d’un Raspberry Pi 5 et les contraintes mécaniques de l’installation.

## Tâches effectuées

### Architecture ROS 2 et acquisition
- Architecture en composants composables C++.
- Séparation entre acquisition caméra, interprétation de scène et world model.
- Backend libcamera réel et backend synthétique.
- Profils de configuration, launch files, messages personnalisés et communications intra-process.
- Outils de visualisation et API HTTP / JSON / SSE pour les essais, le debug et l’observation du pipeline.

### Calibration, géométrie et homographie
- Modélisation du terrain de **3 × 2 m**.
- Conversion des coordonnées image en coordonnées terrain par homographie.
- Profils physiques gauche / droite avec persistance des correspondances.
- Prise en compte approximative de la hauteur des marqueurs.
- Contrôles géométriques et filtrage des positions hors terrain.

### Perception et suivi d’objets
- Détection **ArUco** pour les éléments disposant d’un marqueur identifiable.
- Détection complémentaire par soustraction de fond **MOG2** pour faire remonter des objets / pièces sans ArUco lorsque pertinent.
- Stabilisation par corrélation de phase pour limiter l’effet des vibrations de la caméra.
- Suivi multi-objets avec prédiction simple, confirmation de pistes et gestion des pertes temporaires.
- Fusion avec les identités ArUco et garde-fous contre certaines associations ambiguës.
- Objectif de fournir un état exploitable des robots et objets présents sur le terrain plutôt qu’une simple visualisation caméra.

### World model
- État temporel avec identifiant, classe, position, confiance et état de suivi.
- Association des observations successives.
- Conservation temporaire, expiration et publication de deltas.
- Distinction entre robots suivis et marqueurs statiques.
- Mise à disposition d’une représentation globale destinée aux autres composants du système robotique.

### Optimisation Raspberry Pi
- Réduction de résolution sur certaines étapes.
- Cadences différenciées, ROI et traitement ArUco décimé.
- Utilisation de la dernière image disponible.
- Communications intra-process.
- Analyse des limites de cadence ayant conduit à privilégier une future refonte plutôt que des micro-optimisations successives.

### CAO et intégration mécanique
- Conception sous CAO du support de caméra en tête de mât.
- Conception d’un support / boîtier pour le Raspberry Pi 5 et l’électronique associée.
- Intégration d’un mât fixe d’environ **1,5 m** en profilé 20 × 20 mm, placé à côté du terrain, avec travail sur positionnement, rigidité, encombrement et fixation.
- Adaptation mécanique de la plaque support en acier pour l’installation du mât.

### Atténuation des vibrations du mât
- Conception de stabilisateurs mécaniques dédiés aux oscillations du mât dans deux directions principales : avant / arrière et gauche / droite.
- Principe proche d’un **absorbeur vibratoire passif accordé** : deux languettes flexibles en **PETG**, orientées selon les axes principaux de vibration, sont chargées par des masses afin de reprendre une partie du mouvement oscillatoire du mât.
- Choix de la longueur, de l’épaisseur des languettes et des masses en fonction de la flexibilité du PETG et d’un **ordre de grandeur cible autour de 6–7 Hz** pour les oscillations jugées susceptibles de perturber la caméra.
- Dispositif inspiré de solutions d’atténuation employées sur des structures souples / câbles, puis adapté au prototype.
- Effet d’atténuation observé qualitativement sur le montage ; aucune campagne instrumentée complète n’a été menée pour caractériser précisément le gain, la fréquence propre ou le facteur d’amortissement.

## Résultats
- Chaîne **Caméra → Perception → World Model** fonctionnelle dans la V1.
- Projection dans le repère terrain par homographie.
- Détection / fusion ArUco + mouvement et suivi temporel.
- Représentation globale destinée à fournir au robot des informations sur les robots et objets présents sur le terrain.
- Essais locaux documentés autour de **5–7 Hz** sur Raspberry Pi 5, valeur indicative et non benchmark reproductible.
- CAO et intégration physique du support caméra, du boîtier Raspberry Pi 5 et du mât fixe.
- Stabilisateurs mécaniques PETG réalisés pour atténuer qualitativement les oscillations du mât autour de la zone de vibration ciblée.
- Utilisation en compétition une fois.
- Identification claire des limites de cadence et de couverture mono-caméra, conduisant à envisager une V2 plus performante.

## Limites / état du projet
La V1 est un **prototype fonctionnel expérimenté en conditions réelles**, mais pas un système de perception suffisamment rapide et couvrant pour devenir un composant critique en match.

La couverture mono-caméra reste insuffisante pour certaines situations et la cadence du pipeline ne permettait pas une exploitation centrale fiable pendant toute la durée d’un match. Le système d’atténuation mécanique a montré un effet qualitatif, mais n’a pas fait l’objet d’une caractérisation instrumentée complète. Les valeurs autour de 6–7 Hz correspondent à la zone visée lors de la conception des stabilisateurs, pas à une qualification métrologique du comportement du mât.

## Suite envisagée — V2
Une **V2 est envisagée pour le prochain cycle de Coupe de France de Robotique**, avec comme priorité de corriger les deux limites principales de la V1 : couverture et cadence.

Les pistes prévues incluent :
- réévaluer l’architecture mono-caméra versus **deux caméras** afin d’améliorer la couverture du terrain ;
- mesurer la charge réelle du pipeline pour déterminer si un **Raspberry Pi 5** reste suffisant ou si un calculateur plus performant est nécessaire ;
- revoir le pipeline de perception pour augmenter la cadence utile avant toute réintégration en compétition ;
- conserver le principe de world model global, mais ne fournir une nouvelle version à l’équipe qu’après validation de performances et de fiabilité suffisantes.

## Environnement technique
**C++ · ROS 2 Jazzy · rclcpp · rclcpp_components · OpenCV · ArUco · MOG2 · libcamera · Raspberry Pi 5 · Camera Module 3 Wide / IMX708 · homographie · suivi multi-objets · world model · YAML · Python · rclpy · HTTP / JSON / SSE · FreeCAD / CAO · profilé 20 × 20 mm · PETG · impression 3D · prototypage mécanique · Git · Linux / Ubuntu 24.04**

## Version courte pour CV
- Module ROS 2 de perception globale conçu en autonomie pour la Coupe de France de Robotique afin de fournir au robot un état global des robots et objets présents sur un terrain 3 × 2 m.
- Homographie, ArUco + mouvement, suivi multi-objets et world model temporel sur Raspberry Pi 5.
- CAO et intégration mécanique d’une caméra sur mât fixe d’environ 1,5 m, avec absorbeurs vibratoires PETG ciblant qualitativement une zone autour de 6–7 Hz.
- V1 utilisée ponctuellement en compétition ; limites de cadence et de couverture mono-caméra identifiées, V2 envisagée pour le prochain cycle avec étude bi-caméra / dimensionnement calculateur.
