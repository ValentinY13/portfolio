# Extension Mux

**Type de projet** : Extension backend custom pour Directus — intégration de streaming vidéo via Mux.
**Contexte** : Directus ne proposait aucune solution native pour intégrer des vidéos sans les stocker directement sur le serveur, ce qui limitait notre capacité à proposer cette fonctionnalité aux clients. L'objectif était de permettre l'intégration de vidéos optimisées sur un site, sans surcharger l'infrastructure serveur. L'extension est en usage interne, actuellement en production sur le site Gintlemen, avec l'ambition de la déployer sur tous les projets futurs concernés.
**Mission** : J'ai géré la totalité du projet en autonomie complète, sans supervision. Je me suis formé sur la documentation Mux, rédigé un cahier des charges définissant un MVP, puis fait évoluer l'extension par itérations successives.

## Frontend
*   Module custom ajouté au menu Directus, avec deux vues type dashboard : formulaire d'upload (drag & drop ou sélection de fichier) et bibliothèque vidéo sous forme de tableau, cohérente avec les composants natifs de Directus.
*   Recherche par nom de vidéo, prévisualisation en lecture directe, suppression bloquée si la vidéo est liée à un bloc actif (avec lien vers son utilisation pour la débloquer).
*   Interface custom de lecture vidéo dans le backoffice à partir des métadonnées stockées (asset ID, playback ID).
*   Interface de paramétrage par vidéo : couleurs, mode loop, autoplay, résolution — appliqués selon le contexte d'intégration via le système de blocs.
## Backend / Directus
*   Endpoint d'upload : réception du formulaire, transmission à l'API Mux, réception des métadonnées (asset\_id, playback\_id, duration) via webhook custom, stockage dans Directus.
*   Endpoint de suppression : vérification des liaisons existantes avant suppression synchronisée côté Directus et Mux.
    **Défi principal** : Concevoir l'intégration Mux dans Directus sans documentation ni exemple existant, en structurant seul les données et la logique métier, tout en gérant l'asynchronisme entre l'envoi de la vidéo et la réception de la réponse Mux — à la fois en environnement de test et en production.
    **Résultat** : N'importe qui dans l'équipe peut désormais uploader et paramétrer une vidéo sans passer par un développeur, alors que l'optimisation vidéo nécessitait auparavant une intervention technique systématique. Aucune vidéo n'est stockée sur le serveur, éliminant toute surcharge d'infrastructure.
## Visuels à prioriser
Avec toutes les captures disponibles, voici les 4 à retenir en priorité, dans la même logique que Maison Rorive :

| # | Capture | Pourquoi |
| ---| ---| --- |
| 1 | Formulaire d'upload (drag & drop) | Point d'entrée UX, facile à comprendre visuellement |
| 2 | Bibliothèque vidéo (tableau) | Montre la cohérence avec l'interface Directus native |
| 3 | Interface de paramétrage par vidéo (loop, autoplay, résolution) | Preuve de la personnalisation contextuelle, ton point différenciant |
| 4 | Rendu final d'une vidéo intégrée via bloc sur le site Gintlemen | Boucle la démonstration : de l'upload backoffice au résultat frontend |