export default {
  id:"drone", group:"systems", kind:"Robotique / communications", status:"Prototype expérimental",
  title:"Drone semi-autonome", subtitle:"ArduPilot, MAVLink, ROS 2 et réseau mesh",
  period:"2024–2025",
  summary:"Drone assemblé pièce par pièce, architecture Pi 4 embarqué / Pi 5 au sol et passerelle MAVLink ↔ ROS 2 bidirectionnelle.",
  tags:["ArduPilot","MAVLink","ROS 2","C++","Mesh"],
  facts:["Pi 4 embarqué","Pi 5 au sol","Bridge bidirectionnel"],
  context:"Première exploration approfondie de l’intégration robotique : choix matériel, autopilote, calcul embarqué, commandes de haut niveau, communications et simulation.",
  work:["Sélection et assemblage de la plateforme physique.","Passerelle directe MAVLink ↔ ROS 2 en C++.","Premières actions de haut niveau et interface de commande à la manette.","Validation principalement logicielle avec Mission Planner après arrêt des essais physiques précoces.","Réseau ad hoc puis mesh et prototype d’antenne biquad."],
  results:["Drone physique assemblé et architecture sol/embarqué structurée.","Chaîne de commande bidirectionnelle développée et utilisée.","Réseau mesh expérimenté et prototype d’antenne fabriqué."],
  limits:"Aucun vol autonome complet n’a été validé en conditions réelles. Après un premier essai non concluant, le développement a été recentré sur le banc, la simulation et une stratégie de validation plus prudente."
};
