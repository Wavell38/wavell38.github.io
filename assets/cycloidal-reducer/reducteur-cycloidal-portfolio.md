# Réducteur cycloïdal — Prototype mécanique pour bras robotique V2

## Intitulé
**Concepteur mécanique / CAO — réducteur cycloïdal imprimé 3D**

## Contexte
Projet personnel de R&D mécanique né directement des limites identifiées sur une première version de bras robotique utilisant servomoteurs RC et réductions par engrenages imprimés.

L’objectif d’une V2 était de passer vers une architecture plus rigoureuse : meilleurs roulements, motorisations plus importantes, réduction du jeu et transmission plus compacte. L’étude d’un **réducteur cycloïdal** a été engagée comme solution possible pour cette nouvelle génération.

Le projet marque aussi le passage d’une modélisation principalement sous Blender à une approche de CAO paramétrique sous **FreeCAD**.

## Objectif
Concevoir, imprimer et assembler un réducteur cycloïdal double disque permettant d’obtenir une réduction importante dans un volume compact, d’intégrer des roulements et une sortie mécanique adaptée à une future articulation robotique, puis d’évaluer le principe avant motorisation définitive.

## Architecture mécanique
Le prototype final audité utilise :

- deux disques cycloïdaux ;
- **22 lobes** par disque ;
- **23 positions périphériques** pour les rouleaux/axes ;
- réduction théorique **22:1**, avec inversion du sens de rotation ;
- excentricité d’environ **±1,4 mm** ;
- **six axes de sortie** communs aux flasques ;
- deux roulements principaux **6811RS** ;
- quatre roulements **6803RS** pour excentriques et guidages centraux.

La configuration 22 lobes / 23 positions implique bien un rapport **22:1**, et non 23:1.

## Tâches effectuées

### Conception FreeCAD
- Modélisation détaillée des disques, couronne périphérique, excentriques, flasques, axes de sortie et carter.
- Travail sur les portées de roulements, retenues axiales, interfaces d’assemblage et chemin de charge.
- Architecture double disque destinée à répartir les efforts et limiter les déséquilibres.
- Variantes spécifiques à l’impression FDM.
- Document CAO audité particulièrement dense : environ **1 778 objets**, **60 Body**, **261 sketches** et plusieurs mises en plan techniques.

### Roulements et guidages
- Grands roulements périphériques pour guider les flasques et limiter leur basculement.
- Roulements plus petits pour les excentriques et guidages centraux.
- Répartition du chemin de charge entre profil cycloïdal, rouleaux, carter, sortie à six axes et flasques.

Cette architecture a été conçue dans une logique de rigidité, sans qualification chiffrée de capacité de charge.

### Fabrication additive
- Variantes adaptées à l’impression FDM.
- Impression du prototype en **PETG**.
- Assemblage complet d’une V1 physique.
- Ajustements dimensionnels entre CAO et versions destinées à la fabrication.

### Validation mécanique
- Assemblage des disques, excentriques, roulements, axes et flasques.
- Vérification manuelle de la cinématique.
- Fonctionnement mécanique à vide du prototype assemblé.

## Résultats
- Réducteur cycloïdal double disque entièrement modélisé, imprimé et assemblé.
- Cinématique 22:1 cohérente avec la géométrie 22 lobes / 23 positions.
- Prototype mécanique fonctionnel **à vide / sans charge instrumentée**.
- Travail approfondi sur roulements, guidages, portées et retenues.
- Variantes FDM et mises en plan techniques.
- Base envisagée pour une future V2 du bras robotique.

## Limites / état du projet
Le prototype démontre la **cinématique et l’assemblage**, mais pas les performances d’un réducteur industriel.

Aucun essai instrumenté de couple, rendement, endurance, répétabilité, précision ou backlash sous charge n’a été réalisé. Le jeu a seulement fait l’objet d’une appréciation empirique. Les pressions de contact, flexions, précharges et comportement du PETG sous charge n’ont pas été dimensionnés complètement.

## Lien avec le bras robotique V1
Suite directe de la réflexion du bras V1 :

**engrenages simples + servomoteurs RC → limites de poids, jeu et couple → architecture V2 → réducteur cycloïdal + roulements plus adaptés + CAO paramétrique FreeCAD.**

Le projet est donc séparé dans le portfolio, tout en étant relié explicitement au bras V1.

## Environnement technique
**FreeCAD · CAO paramétrique · réducteur cycloïdal · roulements 6811RS / 6803RS · impression 3D FDM · PETG · PrusaSlicer · assemblage mécanique · mises en plan techniques**

## Version courte pour CV
- Réducteur cycloïdal double disque conçu sous FreeCAD pour une future articulation de bras robotique.
- Architecture 22 lobes / 23 positions, réduction théorique 22:1, six axes de sortie et plusieurs niveaux de roulements.
- Prototype PETG imprimé et assemblé, cinématique validée manuellement à vide.
- Projet orienté montée en rigueur mécanique après identification des limites du bras V1.
