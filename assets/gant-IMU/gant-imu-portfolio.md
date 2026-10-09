# Gant IMU — Interface gestuelle et architecture multi-capteurs

## Intitulé
**Concepteur système embarqué / développeur électronique & logiciel — Gant IMU**

## Période
**2025 – janvier 2026**

## Contexte
Projet personnel visant à créer une interface gestuelle portable, initialement pensée pour commander rapidement un système semi-autonome sans interface vocale ni contrôleur tenu en main.

Le projet a évolué d’un premier prototype basé sur plusieurs IMU du commerce vers une architecture personnalisée comprenant modules inertiels miniaturisés, hub RP2040, transport vers l’hôte, calibration, orientation et reconnaissance de gestes.

## Objectif
Concevoir une interface portable capable d’acquérir les mouvements de plusieurs segments de la main, centraliser plusieurs IMU, transmettre les données vers un hôte et transformer certains gestes en commandes, tout en réduisant progressivement l’encombrement.

## Tâches effectuées

### Prototypes logiciels
- Première génération autour de **quatre MPU6050** sur deux bus I²C sous Linux / ROS 2.
- Acquisition et traitement de données inertiales.
- Détection expérimentale de gestes, avec traces historiques de déclenchements START / STOP.
- Chaîne hôte ultérieure avec **8 positions IMU logiques**, transport sérialisé et traitements de calibration/orientation.

### Architecture système
- Séparation entre modules IMU, hub, transport et logiciel hôte.
- Étude du positionnement des capteurs sur les doigts et le dos de la main.
- Itérations d’intégration physique : supports imprimés 3D, textile, fixation et protection contre l’humidité.
- Travail exploratoire sur joints/matériaux de protection, sans certification IP.

### Modules IMU personnalisés
- Conception sous **KiCad** de modules IMU miniaturisés.
- Itérations autour de l’ICM-42688-P puis de l’**ICM-45686**.
- Alimentations locales, découplages, connectique et routage SPI.
- Module actuel d’environ **10,5 × 12,65 mm** dans la CAO/PCB auditée.
- Préparation des exports de fabrication, BOM et fichiers de placement.
- PCB IMU reçus physiquement, mais non assemblés/soudés et non testés électriquement avant mise en pause.

### Hub RP2040
- Conception d’un hub **4 couches** autour d’un RP2040.
- Capacité physique prévue jusqu’à **10 ports IMU**.
- Bus SPI partagé SCLK/MOSI/MISO avec chip-select individuel.
- Flash QSPI, quartz, USB natif, distribution d’alimentation et protections.
- Schématique, routage, exports de production et vérifications ERC/DRC.

Le logiciel hôte audité définit **8 positions IMU logiques** ; cette organisation ne doit pas être confondue avec la capacité physique de 10 ports du hub.

### Transport et logiciel hôte
- Chaîne de transport série utilisant notamment **COBS** et **CRC32C**.
- Calibration et reconstruction d’orientations côté hôte.
- Architecture prévue pour centraliser les données avant interprétation gestuelle.
- Expérimentation d’un classifieur RTrees restée non qualifiée faute de jeu de données/modèle final.

### CAO et intégration
- Modélisation de boîtiers autour des PCB.
- Supports et essais d’intégration au gant.
- Itérations visant à diminuer l’encombrement et améliorer la fixation/protection.

## Résultats
- Plusieurs générations d’architecture, depuis le prototype MPU6050 jusqu’aux cartes personnalisées.
- Acquisition multi-IMU et premières reconnaissances gestuelles démontrées sur prototypes logiciels historiques.
- Modules IMU miniaturisés conçus, fichiers de fabrication préparés et PCB reçus.
- Hub RP2040 4 couches conçu pour agréger jusqu’à 10 connexions IMU physiques.
- Architecture de transport, calibration et orientation structurée.

## Limites / état du projet
Projet **mis en pause avant intégration complète de l’électronique personnalisée**.

Les PCB IMU reçus n’ont pas été soudés ni testés. Le hub n’est pas présenté comme une carte assemblée/qualifiée. L’audit électronique a également identifié des points à corriger ou vérifier avant fabrication/usage. Aucune certification d’étanchéité ou IP n’a été réalisée.

## Environnement technique
**C++ · ROS 2 · RP2040 · SPI · I²C · USB · MPU6050 · ICM-42688-P · ICM-45686 · KiCad · PCB 4 couches · COBS · CRC32C · FreeCAD · impression 3D · textile / prototypage mécanique**

## Version courte pour CV
- Interface gestuelle multi-IMU, du prototype MPU6050 jusqu’à des modules inertiels miniaturisés personnalisés.
- Hub RP2040 4 couches à 10 ports physiques et modules ICM-45686 conçus sous KiCad.
- Architecture de transport, calibration et orientation ; premières détections gestuelles sur prototypes.
- PCB IMU reçus, projet mis en pause avant assemblage et qualification complète de l’électronique personnalisée.
