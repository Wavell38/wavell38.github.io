# Bras robotique V1 — Prototype mécanique low-cost

## Intitulé
**Concepteur / prototypage mécanique — bras robotique articulé low-cost**

## Contexte
Projet personnel réalisé en **2025**, sur une période d’environ **un mois** de conception et fabrication effective.

L’objectif était de partir de zéro et de concevoir un bras robotique complet, principalement avec des composants accessibles et des pièces imprimées en 3D, capable à terme de manipuler des objets ou de servir de base à de petites tâches automatisées.

Cette première version a été conçue avant l’utilisation de FreeCAD dans les projets suivants : la modélisation mécanique a été réalisée sous **Blender**, puis les pièces ont été imprimées, assemblées et intégrées autour de servomoteurs à fort couple.

Le prototype mécanique a été terminé et assemblé, mais le projet a été arrêté avant la phase d’actionnement électrique et de développement logiciel.

## Objectif
Concevoir une architecture de bras robotique à coût réduit comprenant :

- une base rotative ;
- trois articulations principales ;
- un poignet orientable ;
- une pince motorisée ;
- des réductions mécaniques adaptées aux servomoteurs disponibles ;
- un câblage intégré à la structure ;
- une électronique de commande basée sur Raspberry Pi et PCA9685.

La contrainte principale était de construire un ensemble mécaniquement cohérent en utilisant des servomoteurs relativement peu coûteux et limités en angle, tout en conservant suffisamment de couple aux différentes articulations.

## Architecture mécanique

Le bras comporte **5 axes de positionnement + une pince** :

1. rotation de la base ;
2. épaule ;
3. coude ;
4. flexion du poignet ;
5. rotation du poignet ;
6. ouverture / fermeture de la pince.

Déployé, le prototype mesure environ **70 cm depuis la base**.

### Articulations principales
Les trois articulations principales — **épaule, coude et flexion du poignet** — utilisent chacune :

- un axe en **acier trempé** ;
- deux roulements, un de chaque côté de l’articulation ;
- un engrenage principal solidaire de l’axe ;
- un servomoteur placé dans le segment inférieur ;
- un petit engrenage moteur entraînant le grand engrenage de l’articulation.

Le choix d’un acier trempé plus précis est intervenu après constat que des tiges d’acier ordinaires n’offraient pas une géométrie suffisamment régulière pour les assemblages sur roulements.

Les axes ont été découpés et ajustés manuellement avant montage.

### Positionnement des servomoteurs
Les servomoteurs sont placés **sous l’articulation qu’ils entraînent**, à l’intérieur ou au plus près du segment inférieur.

Cette disposition permet de réduire la masse portée par les articulations situées plus bas dans la chaîne cinématique.

La transmission reste volontairement simple :

**petit engrenage sur le servo → grand engrenage sur l’axe de l’articulation**

Les rapports de réduction ont été calculés en tenant compte simultanément :

- du couple nécessaire ;
- de l’angle maximal des servomoteurs, généralement limité à environ 180° ou 270° ;
- de la réduction supplémentaire de débattement induite par le rapport d’engrenage ;
- de l’encombrement disponible ;
- des dimensions minimales raisonnablement imprimables pour les dents d’engrenage.

Les moteurs utilisés sont des servomoteurs RC à fort couple, avec plusieurs niveaux de puissance suivant la position dans le bras, de l’ordre de **25 à 35 kg·cm annoncés**.

### Base rotative
La base utilise un plateau tournant du commerce de type **lazy Susan** comme support mécanique.

La rotation est assurée par un servomoteur installé sous la plateforme, entraînant une grande couronne interne par engrenage.

Cette solution permettait de construire rapidement une V1, mais présentait un jeu mécanique important et faisait partie des éléments identifiés comme prioritaires à remplacer dans une version suivante.

### Poignet
La flexion du poignet reprend l’architecture axe acier + deux roulements + réduction par engrenages.

La **rotation du poignet** constitue une exception : elle est réalisée directement sur l’axe du servomoteur, sans palier séparé ni transmission supplémentaire. Cette articulation porte moins de masse, mais cette architecture restait une simplification de prototype.

### Pince
La pince utilise **un seul servomoteur**.

Le mécanisme repose sur trois engrenages :

- un engrenage moteur ;
- deux engrenages solidaires des deux doigts.

Les deux doigts engrènent entre eux et se déplacent donc symétriquement lors de l’ouverture ou de la fermeture.

La géométrie de la pince et son mécanisme ont été conçus spécifiquement pour le prototype à partir de l’étude de mécanismes existants.

## Fabrication et intégration
- Modélisation 3D complète sous **Blender**.
- Fabrication de la structure principalement en **PETG imprimé en 3D**.
- Conception des logements de moteurs, axes, roulements, engrenages et passages de câbles directement dans les segments du bras.
- Acheminement du câblage au plus près de la structure afin de limiter les éléments libres à l’extérieur.
- Utilisation d’une alimentation principale distribuée le long du bras afin d’éviter de multiplier les lignes de puissance individuelles.

Le prototype photographié correspond à un assemblage mécanique complet de la V1.

## Électronique préparée
L’architecture électrique prévue était basée sur :

**Raspberry Pi → PCA9685 → servomoteurs**

avec une alimentation de puissance séparée ou dérivée spécifiquement pour les moteurs.

Le **PCA9685** était déjà intégré dans la base.

Le câblage des moteurs avait été préparé, avec :

- alimentation principale distribuée dans le bras ;
- lignes de commande PWM ;
- condensateurs placés à proximité des moteurs ;
- diodes Schottky prévues pour la protection de l’alimentation ;
- ajout prévu de condensateurs de forte capacité près de l’entrée d’alimentation.

## Résultats
- Conception complète d’un bras robotique à partir d’une feuille blanche.
- Modélisation, impression et assemblage physique d’un prototype d’environ 70 cm.
- Réalisation de cinq axes de positionnement et d’une pince.
- Intégration de servomoteurs, réductions par engrenages, axes acier trempé et roulements.
- Rapports de réduction dimensionnés en fonction du couple, du débattement disponible et des contraintes d’impression.
- Câblage intégré à la structure et électronique de commande préparée.

Le prototype a été **mécaniquement terminé**, mais aucun actionnement électrique complet ni logiciel de contrôle n’a été réalisé sur cette version.

## Limites identifiées
Avant la phase de test motorisé, plusieurs limites avaient déjà été identifiées :

- masse globale élevée ;
- architecture encore peu optimisée pour limiter les efforts en bout de chaîne ;
- jeu important au niveau de la base rotative ;
- servomoteurs limités en angle et en vitesse ;
- rotation du poignet directement portée par l’axe moteur ;
- absence de modularité, notamment pour la pince ;
- câblage interne non conçu pour une rotation continue ;
- absence de validation de charge, rigidité, répétabilité ou backlash du système complet.

Ces constats ont conduit à ne pas poursuivre l’industrialisation de cette V1 et à envisager directement une architecture plus ambitieuse.

## Évolution envisagée — V2
La V2 devait évoluer vers une conception mécanique plus rigoureuse :

- passage de Blender à **FreeCAD** ;
- utilisation de roulements plus adaptés à la robotique, notamment des roulements croisés de type **RU106 / équivalent CRBF35-15AT** ;
- motorisations plus importantes ;
- réduction de la masse portée par les articulations ;
- possibilité de déporter davantage les moteurs via courroies ou autres transmissions ;
- architecture plus modulaire ;
- amélioration du passage des câbles et éventuellement recours à des slip rings ;
- qualification séparée de chaque articulation avant assemblage complet ;
- mesures de couple, jeu, rigidité et répétabilité.

Cette V1 a servi de première itération d’apprentissage : concevoir, fabriquer et assembler le bras a permis de comprendre les mécanismes et d’identifier les limites à reprendre dans une V2 plus ambitieuse.

Cette réflexion a directement conduit au projet de **réducteur cycloïdal**. Développé comme un projet indépendant, il étudie une solution de transmission destinée au futur bras V2, plus robuste.

## Environnement technique
**Blender · impression 3D PETG · servomoteurs RC fort couple · engrenages imprimés · axes acier trempé · roulements · Raspberry Pi · PCA9685 · PWM · électronique de puissance préparée**

## Version courte pour CV
- Conception et fabrication en ~1 mois d’un prototype de bras robotique low-cost d’environ 70 cm, modélisé sous Blender et imprimé en PETG.
- Architecture 5 axes + pince, avec réductions par engrenages calculées, axes acier trempé et doubles roulements sur les articulations principales.
- Intégration mécanique et câblage complet des servomoteurs ; électronique Raspberry Pi / PCA9685 préparée, sans validation motorisée finale.
- Identification des limites de masse, jeu et modularité ayant conduit à une V2 orientée FreeCAD, roulements croisés et réducteurs cycloïdaux.
