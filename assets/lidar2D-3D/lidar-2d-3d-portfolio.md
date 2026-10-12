# LiDAR 2D → reconstruction 3D — Prototype motorisé RP2040 / ROS 2

## Intitulé
**Concepteur / développeur systèmes & robotique — prototype LiDAR 3D**

## Contexte
Projet personnel de R&D visant à évaluer la possibilité de produire des données tridimensionnelles à partir d’un **LiDAR 2D LD19** monté verticalement sur un mécanisme tournant.

L’idée était d’ajouter un second axe de balayage au LiDAR : le capteur fournit son scan 2D, tandis qu’un mécanisme motorisé fait tourner l’ensemble autour d’un axe externe. La position réelle du mécanisme est mesurée par un encodeur absolu puis associée aux mesures LiDAR afin de reconstruire des points 3D sur un Raspberry Pi 5 et de les visualiser sous ROS 2 / RViz2.

Le projet a été mené jusqu’à un **POC fonctionnel**, puis arrêté après évaluation : la densité de points, la précision géométrique et les contraintes de calibration ne justifiaient pas la complexité de la solution pour l’usage robotique envisagé.

## Objectif
Concevoir une chaîne complète permettant de :

- motoriser la rotation externe d’un LiDAR 2D ;
- mesurer la position angulaire réelle du mécanisme ;
- synchroniser les données LiDAR avec cette position ;
- transmettre les mesures vers un ordinateur / Raspberry Pi ;
- transformer les mesures polaires 2D en coordonnées 3D ;
- publier les résultats dans ROS 2 ;
- visualiser qualitativement l’environnement dans RViz2 ;
- évaluer si cette architecture pouvait servir de base à une perception 3D embarquée.

## Tâches effectuées

### Mécanique, CAO et fabrication additive
- Conception sous **FreeCAD** du mécanisme de rotation : axes, supports, logements, engrenages, fixation du LiDAR et intégration des éléments mécaniques.
- Conception d’une transmission à engrenages **1:1** entre le moteur et l’axe de la plateforme.
- Intégration mécanique d’un roulement et représentation d’un collecteur tournant pour accompagner la rotation du capteur.
- Préparation de nombreuses pièces pour fabrication additive sous **PrusaSlicer**.
- Export de variantes STL et préparation de G-code pour **Prusa MK4S**, principalement en PETG.
- Impression et assemblage de pièces de prototype rapportés pendant le développement.

### Motorisation et retour de position
- Pilotage d’un moteur pas à pas via **A4988**.
- Intégration d’un encodeur absolu magnétique **MT6701** en I²C afin de mesurer la position réelle de l’axe indépendamment du nombre de commandes moteur envoyées.
- Commande de la vitesse en boucle ouverte, complétée par une surveillance de cohérence entre position prédite et position mesurée.
- Mise en place de premiers mécanismes de détection d’écart et de blocage.

### Firmware RP2040
- Développement en **C++** sur RP2040 avec PlatformIO / Arduino-Pico.
- Acquisition des trames du **LD19** par UART à 230 400 bauds.
- Lecture de l’encodeur MT6701 par I²C.
- Génération des impulsions STEP du moteur via les **PIO du RP2040** afin de retirer le timing moteur de la boucle CPU.
- Utilisation d’un second programme PIO pour suivre les impulsions de commande.
- Développement d’une enveloppe USB binaire propre au projet associant :
  - trame LiDAR ;
  - angle encodeur ;
  - compteur moteur ;
  - timestamp MCU ;
  - numéro de séquence ;
  - CRC16.
- Mise en place de commandes micro-ROS pour démarrer, arrêter et modifier la période du mouvement.

### Transport et orchestration ROS 2
- Développement d’un orchestrateur **C++ / ROS 2** sur l’hôte.
- Lecture directe du flux USB, décodage de l’enveloppe propriétaire et validation des CRC.
- Décodage des paquets LD19 et interpolation des douze angles internes d’une trame.
- Assemblage des mesures en sous-trames en fonction de l’angle externe accumulé.
- Publication des résultats sous forme de **`sensor_msgs/msg/PointCloud2`**.
- Organisation du pipeline en modules distincts : transport, protocole, validation, assemblage, transformation géométrique et publication ROS.

### Transformation 2D → 3D
- Définition d’un modèle géométrique prenant en compte :
  - l’angle interne du LiDAR ;
  - l’angle externe mesuré du mécanisme ;
  - le décalage radial entre l’axe mécanique et le centre optique ;
  - les conventions de signe et offsets de calibration.
- Transformation des mesures polaires en coordonnées cartésiennes `x / y / z`.
- Filtrage des points selon la distance et la confiance retournée par le LiDAR.
- Gestion du passage angulaire 359° → 0°.
- Publication de sous-nuages 3D visualisables dans RViz2.

## Problème technique notable — micro-ROS sous Windows
Le projet a nécessité une adaptation spécifique de la chaîne **micro-ROS / PlatformIO sous Windows**.

Les builds initiaux échouaient notamment à cause :

- de chemins générés dépassant la limite Windows ;
- de la coexistence entre compilation native des outils hôtes et cross-compilation ARM ;
- d’un conflit de symboles atomiques entre micro-ROS et Arduino-Pico.

Les adaptations mises en place comprennent :

- réduction et contrôle des chemins de build ;
- séparation des environnements de compilation hôte et MCU ;
- génération des headers PIO avant compilation ;
- création d’un script de correction local de `libmicroros.a` supprimant l’objet à l’origine du conflit `__atomic_load_8` avant l’édition de liens.

Les logs conservés attestent ensuite d’un build réussi des dépendances hôtes et MCU ainsi que de la génération d’un firmware ELF/UF2.

## Résultats
- Prototype mécanique complet conçu et assemblé autour d’un LiDAR LD19 motorisé.
- Firmware RP2040 réunissant acquisition LiDAR, lecture d’encodeur, génération moteur PIO et transport USB.
- Protocole binaire personnalisé permettant d’associer les mesures LiDAR à la position externe du mécanisme.
- Pipeline C++ / ROS 2 complet de décodage, transformation géométrique et publication de nuages de points.
- Reconstruction 3D fonctionnelle rapportée pendant les essais, avec une scène reconnaissable dans **RViz2**.
- Publication de sous-nuages autour de **10 Hz** lors des essais rapportés.
- Chaîne micro-ROS / PlatformIO adaptée à Windows et compilation réussie attestée par les artefacts conservés.

## Limites et état du projet
Le système est resté un **POC fonctionnel non qualifié**.

Les principales limites observées étaient :

- densité du nuage insuffisante pour l’usage robotique envisagé ;
- précision géométrique limitée ;
- calibration extrinsèque délicate ;
- synchronisation temporelle imparfaite entre angle externe et mesures LiDAR ;
- même angle externe appliqué aux douze points d’un paquet LD19 ;
- absence de compensation du mouvement du robot porteur ;
- absence de SLAM, de recalage de scans ou de fusion inertielle ;
- plusieurs mécanismes firmware encore perfectibles.

L’audit ultérieur du code a notamment mis en évidence un défaut résiduel de comptage dans le programme PIO et des limites dans la détection de blocage. Ces points confirment que la solution ne devait pas être présentée comme une chaîne finalisée ou qualifiée.

Le projet a été arrêté après démonstration du concept : le rapport complexité / densité / précision ne paraissait pas suffisamment favorable pour poursuivre cette architecture vers un système de perception robotique opérationnel.

## Environnement technique
**C++ · ROS 2 · RViz2 · RP2040 · PIO · LD19 · MT6701 · A4988 · Raspberry Pi 5 · PlatformIO · Arduino-Pico · TinyUSB · micro-ROS Jazzy · USB CDC · UART · I²C · CMake · Ninja · MSVC · GCC ARM · FreeCAD · KiCad · PrusaSlicer · impression 3D PETG**

## Version courte pour CV
- Conception et prototypage d’un mécanisme motorisé sous FreeCAD pour reconstruire des données 3D à partir d’un LiDAR 2D LD19.
- Développement du firmware RP2040 : génération moteur PIO, encodeur absolu I²C, acquisition UART et transport USB binaire avec CRC.
- Développement d’un pipeline C++ / ROS 2 de décodage et transformation géométrique, avec visualisation qualitative des sous-nuages dans RViz2.
- Adaptation de micro-ROS / PlatformIO sous Windows : gestion de la chaîne native/ARM, chemins longs et correction locale d’un conflit de symboles atomiques.
