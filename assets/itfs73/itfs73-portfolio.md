# ITFS73 — Plateforme pédagogique multi-écrans

## Intitulé
**Architecte applicatif / développeur full-stack**

## Période
**2020 – janvier 2021**

## Contexte
Conception et développement en autonomie d’une plateforme pédagogique destinée à une installation expérimentale composée de **six grands écrans tactiles**, chacun piloté par un PC Windows distinct.

Les enseignants devaient pouvoir préparer des cours à distance, intégrer PDF et vidéos, puis définir des interactions entre les différents écrans.

## Objectif
Concevoir une architecture couvrant création web des cours, distribution locale, exécution coordonnée sur six machines et diffusion multimédia.

## Tâches effectuées

### Architecture applicative
- Définition de l’architecture et choix des technologies.
- Séparation entre plateforme web, backend distant, serveur local et applications d’affichage.
- Fonctionnement distribué sur six PC indépendants.

### Éditeur de cours
- Interface React de construction de cours.
- Import/découpage des PDF en pages manipulables individuellement.
- Placement sur différents écrans, drag-and-drop et timeline.
- Zones interactives et liaison à des actions sur d’autres écrans.

### Runtime multi-écrans
- Application **Electron** plein écran sur chaque PC.
- Clients en arrière-plan en attente des commandes.
- Désignation d’un poste principal.
- Lancement coordonné et distribution des changements d’état.

### Distribution et streaming
- Serveur local récupérant les cours et ressources.
- Téléchargement préalable pour limiter la dépendance au réseau externe.
- Microservice de streaming vidéo depuis notamment YouTube ou des fichiers locaux.
- Distribution du flux aux postes abonnés.

### Backend et tests
- Services principalement avec **NestJS**.
- PostgreSQL pour la persistance.
- Tests réels sur **six PC et six écrans distincts**.
- Validation du lancement coordonné, des contrôles de PDF et du streaming vidéo multi-écrans.

## Résultats
- Architecture distribuée complète pour une installation à six postes.
- Éditeur V1 fonctionnel : PDF page par page, timeline et interactions inter-écrans.
- Pilotage coordonné d’instances Electron validé sur six machines physiques.
- Streaming vidéo multi-écrans fonctionnel dans l’environnement de test.
- Téléchargement et distribution locale des contenus mis en place.

## Limites / état
Projet arrêté avant qualification complète sur l’installation finale et avant industrialisation de l’éditeur. Avec le recul, le modèle de l’éditeur aurait bénéficié d’un cadrage plus poussé, notamment autour de la séparation **interaction → action → résultat**.

## Environnement technique
**TypeScript · Node.js · NestJS · React · Electron · PostgreSQL · JavaScript · HTML/CSS · WebSocket / communications réseau · streaming vidéo · Windows · réseau local**

## Version courte pour CV
- Architecture et développement en autonomie d’une plateforme pédagogique web + locale pour six écrans tactiles.
- Éditeur React avec PDF page par page, timeline et actions inter-écrans.
- Runtime Electron multi-PC, serveur local et lancement coordonné.
- Streaming vidéo validé sur six machines physiques.
