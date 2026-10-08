# Plateforme de recherche quantitative — Backtest et exécution simulée

## Intitulé
**Développeur logiciel / architecture & performance — plateforme de recherche quantitative**

## Période
**Depuis juin 2026**

## Contexte
Projet personnel de R&D logicielle visant à construire un environnement permettant de rejouer des données de marché historiques, d’exécuter des stratégies dans un environnement simulé et de comparer leurs comportements dans des conditions reproductibles.

Une première implémentation en **Python** a servi à qualifier rapidement le domaine et les règles d’exécution. Les benchmarks ont ensuite montré que son coût devenait limitant pour les campagnes envisagées. Le projet a alors été repris autour d’un runtime **Rust**, avec une démarche plus systématique de qualification des dépendances, de mesure des performances et de contrôle de la mémoire.

## Objectif
Construire un environnement de backtest déterministe, reproductible et suffisamment performant pour des campagnes longues, avec modélisation explicite des données de marché, de l’exécution, du portefeuille et du risque.

La cible à long terme est une boucle automatisée de recherche et d’adaptation des stratégies aux conditions de marché courantes :

- Exécuter régulièrement des campagnes longues de backtest pour réévaluer les stratégies.
- Développer une évaluation graduée, au-delà d’une décision binaire d’acceptation ou de rejet : sélectionner les stratégies les plus adaptées, en conserver plusieurs et ajuster automatiquement leurs paramètres lorsque nécessaire.
- Faire coexister des stratégies en test simulé et des stratégies utilisées en réel après validation approfondie, avec une adaptation continue fondée sur ces réévaluations.

Cette automatisation adaptative et le passage en réel constituent des étapes futures du projet.

## Tâches effectuées

### Modélisation et replay de marché
- Représentation des données historiques.
- Prise en charge de carnet d’ordres L2, trades, prix de référence/index et événements de financement.
- Pipeline de replay reproductible.

### Exécution simulée et portefeuille
- Modélisation des ordres, fills, frais et positions.
- Gestion de l’état du portefeuille et de sa restauration.
- Qualification de règles d’exécution et contraintes de risque.
- Isolation de l’état entre plusieurs campagnes.

### Migration Python → Rust
- Première verticale fonctionnelle en Python.
- Benchmarks et identification de limites de temps d’exécution.
- Reprise du runtime en **Rust**.
- Qualification du moteur tiers par verticales expérimentales avant extension de l’architecture.

### Streaming et campagnes longues
- **Streaming borné** pour éviter le chargement intégral de longues périodes de données.
- Conservation de l’ordre des événements et des groupes de même timestamp.
- Séparation entre résolution du marché et cadence de décision de la stratégie.
- Campagnes réalisées sur des moteurs fraîchement instanciés pour vérifier la reproductibilité.

### Performance et mémoire
- Benchmarks temps d’exécution, mémoire et concurrence entre workers.
- Profilage de la croissance mémoire.
- Identification de la rétention de blocs de données encodés comme source importante de croissance mémoire.
- Définition de limites de concurrence adaptées à la machine de développement.

### Bibliothèque de stratégies
- Préparation d’une bibliothèque de stratégies paramétrables.
- Séparation des outils génériques des stratégies elles-mêmes.
- Préparation de campagnes de comparaison / optimisation.

## Résultats
- Première plateforme Python fonctionnelle pour qualifier le domaine.
- Runtime Rust qualifié progressivement.
- Replay reproductible avec vérification de l’état des ordres, positions et données de marché.
- Streaming borné validé sur des campagnes multi-jours.
- Profiling ayant permis d’identifier un goulot de rétention mémoire et d’adapter la concurrence.
- Base technique prête pour des stratégies paramétrables.

## Limites / état du projet
Projet de **recherche logicielle en cours**, non présenté comme une plateforme de trading prête pour production. Les campagnes automatiques récurrentes, la sélection adaptative, l’ajustement automatique des paramètres et le passage en réel restent des étapes futures. Les résultats techniques ne constituent pas une validation financière ni une preuve de rentabilité de stratégies.

## Environnement technique
**Rust · Cargo · Python · moteurs de backtest · données L2 / marché · tests automatisés · pytest · Ruff · Git · profiling temps/mémoire · architecture modulaire · agents IA**

## Version courte pour CV
- Plateforme de recherche quantitative pour replay historique, backtest, exécution simulée, portefeuille et risque.
- Prototype Python puis migration vers Rust après benchmark des limites de performance.
- Streaming borné et séparation entre résolution du marché et cadence des stratégies.
- Profiling temps/mémoire et adaptation de la concurrence à partir des goulots mesurés.
