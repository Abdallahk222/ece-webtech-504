# Projet - ECE Webtech groupe 504

Ceci est notre projet de site web, intitulé WhatFilm dont la thématique centrale est le cinéma. Celui-ci offre une plateforme pour rechercher ses films préférés, créer des posts selon son envie, et permettre d’échanger à travers des commentaires. La plateforme permet plus particulièrement aux utilisateurs connectés d’avoir accès à toutes ses fonctionnalités.

## Installation

[Installer NodeJS](https://nodejs.org/en/download/)

## Utilisation

Une fois le repository cloné, lancer l’application avec : 

```
npm start
```

## Livrables

- Vercel URL: https://ece-webtech-504.vercel.app/
- supabase project url: https://supabase.com/dashboard/project/pexotckimhxyoekypkjc

## Auteurs

- Abdallah Kadir Abdallah <abdallahkadir222@gmail.com>
- Ryan Bagot <bagot.ryan26@gmail.com>
- Hamed Bamba <medyybamba@gmail.com>
- Taryll Mohamed <taryll.mohamed78250@gmail.com>
- Gregoire Petiet <gregoire.petiet@edu.ece.fr>
  
## Evaluation

### Tâches obligatoires

* **Naming convention**
  * Note: 2/2
  * Commentaire: Nous avons respecté le conventional commit, pour l’ajout d’une feature nous utilisons le mot feat, pour une modification d’une fonctionnalité, nous avons utilisé le mot fix. Par la suite, nous ajoutons la description du changement fait. 
  * Retour sur tâche: Tâche facile
* **Structure du projet**
  * Note: 1/2
  * Commentaire: Certains composants se situent dans le dossier pages et nos dans le dossier composant.
  * Retour sur tâche: Tâche facile
* **Git usage**
  * Note: 2/2
  * Commentaire: Nous avons respecté le conventional commit, pour l’ajout d’une feature nous utilisons le mot feat, pour une modification d’une fonctionnalité, nous avons utilisé le mot fix. Par la suite, nous ajoutons la description du changement fait.
  * Retour sur tâche: Cette tâche est facile.
* **Qualité du code**
  * Note: 3/4
  * Commentaire: L’indentation et les espaces sont corrects, cependant il nous manque des commentaires dans notre code. 
  * Retour sur la tâche: La difficulté de cette tâche est moyenne.
* **Design, UX, and content**
  * Note: 4/4
  * Commentaire: Nous avons pensé à l'expérience utilisateur, nous avons mis les affiches des films et les informations dans des boîtes, pour éviter que les affiches prennent l’ensemble de l'écran. Le mode sombre est par défaut pour éviter que l’utilisateur soit ébloui dès l’ouverture de l’application. 
  * Retour sur la tâche: La tâche est moyenne 

* **Home page**
  * Grade: 1.5/2
  * Comments: nous avons placé une barre de recherche qui permet de rechercher le film qu'on souhaite regarder, avec un léger texte pour acceuillir l'utilisateur 
  * Task feedback: Assez simple, le probleme vient surtout du design qui est diffiile à imaginer 
* **Navigation**
  * Note: 2/2
  * Commentaires: Nous avons intégré une barre de navigation sur le fichier app.jsx, on a pu indiquer les différents éléments de notre site comme Home, les posts, contact us et about us.
  * Retour sur la tâche: L’exercice est plutôt facile
* **Login and profile page**
  * Note: 4/4
  * Commentaires: La page login a été implémentée grâce au pre-build Composant React Auth-UI fournit par Supabase. Cette page s'affiche dans le header uniquement lorsque l’utilisateur n’est pas connecté, entre autres lorsque celui-ci n’est pas identifié dans une session au sein du fichier template _app.jsx. Ce même fichier permet ainsi de savoir si un utilisateur est connecté et fait en sorte que la connexion soit persistante à travers les différentes pages du site. Lorsqu’un utilisateur se connecte, le fichier _app.jsx affiche les boutons “Log out” et “Profile” permettant respectivement de se déconnecter et d’accéder à la page Profile. Cette page permettant de configurer le compte de l’utilisateur connecté..
  * Retour sur la tâche: La tâche est assez simple à mettre en place mais est fondamentale dans toutes les fonctionnalités importantes du site afin d’avoir un contrôle d’accès aux ressources.
* **Création et affichage de posts**
  * Note : 6/6
  * Commentaires : Nous avons procédé en premier par la création d’une page “post” sur laquelle s’affiche une barre de recherche( pour retrouver un post précis) et  les différents posts qui ont été publiés par les utilisateurs. Pour afficher les données sur la page “post” il a fallu récupérer les données de la table “post” sur Supabase. A partir de cette page post, dans le cas où nous sommes des utilisateurs certifiés, on peut soit ajouter un nouveau post grâce à la page “addpost” ou soit éditer ou supprimer un post déjà existant(qui a été créé par nous).Dans le cas où nous ne sommes pas des utilisateurs certifiés, nous pouvons seulement lire et commenter les différents posts de la  plateforme. ensuite nous avons procédé à la création d’une page “postcomplet” où chaque post peut être lu en entier et commenté par la suite par tous les utilisateurs de la plateforme. Toutes les fonctionnalités pour cette tâche ont été implémentées.
  * Retour sur la tâche : difficile et longue car il y a plusieurs fonctionnalités à implémenter.
* **Création et affichage de commentaires**
  * Note : 4/4
  * Commentaires :  Sur la page “postcomplet” qui permet de lire un post en entier, tous les utilisateurs ont la possibilité de laisser des commentaires en dessous de la publication. ces commentaires sont ensuite enregistrés dans la table “comments” sur Supabase. Les commentaires sont récupérés depuis une base de données Supabase via la requête effectuée dans la fonction useEffect et sont ensuite affichés sur la page “postcomplet” en dessous du post et de l’espace pour commenter. Toutes les fonctionnalités pour cette tâche ont été implémentées.
  * Retour sur la tâche : difficulté moyenne, il est assez simple d’afficher le contenu du post mais un peu plus complexe de s’occuper des commentaires.

* **Post modification and removal**
  * Note: 4/4
  * Commentaires: Nous avons dû intégrer sur le fichier post la fonction supprimer et éditer, après avoir intégrer ces fonctionnalités, nous devions définir les registres RLS “update” et “delete” de la table post  sur Supabase. Les utilisateurs ont donc le pouvoir de modifier ou supprimer leurs commentaires.
  * Retour sur la tâche: La difficulté de la tâche était plutôt moyenne
* **Search**
  * Note: 6/6
  * Commentaires: Nous avons utilisé le hook useState pour créer une variable qui stock la valeur, par la suite la fonction handleSearch se déclenche lors de la soumission du formulaire et appelle ensuite la fonction onSearch.
* **Use an external API**
  * Note: 1/2
  * Commentaires: Nous avons trouvé l’API de moviedb, cette API est utilisé pour renvoyer le résultat d’une recherche de film
  * Retour sur la tâche : tâche moyenne, cependant nous avons essayé à plusieurs reprises de mettre notre clé API dans un fichier .env, mais cela ne permet pas à l’application de fonctionner correctement. 
* **Contrôle d'accès aux ressources**
  * Note : 6/6
  * Commentaires : Pour mettre en œuvre cette tâche, nous avons créé de nouvelle politique de sécurité en utilisant la fonction RLS de supabase qui nous permet d’éviter tous les événements inattendus. Quelques exemples, pour ajouter un post, seul un utilisateur déjà existant est en mesure de réaliser cette tâche car la politique “INSERT Enable insert for authenticated users only” s’occupe de vérifier si l’utilisateur est certifié ou pas. Dans le cas où il ne l’est pas, il ne verra pas la fonctionnalité pour ajouter un nouveau post. Autre exemple pour éditer un post il faut que  l’utilisateur soit le créateur de ce post auquel cas il ne verra pas la fonction éditer.
  * Retour sur la tâche : difficulté moyenne
* **Account settings**
  * Note: 4/4
  * Commentaires: La page profile permet de changer les paramètres du compte à savoir : le nom, le pseudo et l’avatar (la langue choisie n’est pas fonctionnelle). Le pseudo et le nom sont récupérés dans la table “profile“ sur supabase et peuvent être modifiés dans cette page. (Concernant l’avatar, voir la partie sur Gravatar Integration)
  * Retour sur la tâche: Exercice assez simple.
* **WYSIWYG integration**
  * Note: 0/2
  * Commentaires: On a essayé d'utiliser la librairie draft-js pour permettre d’éditer le contenu d’un post. On a stocké cette donnée sur Supabase au format JSON, mais nous n’avons pas réussi à la reconvertir pour son affichage.
  * Retour sur la tâche: Exercice difficile, en plus des problématiques expliquées, draft-js ne propose pas le même rendering que Next, on aurait dû utiliser de l’importation dynamique pour cette librairie.
* **Gravatar integration**
  * Note: 2/2
  * Commentaires: On utilise gravatar qui permet d’avoir une photo de profil associé à son adresse email. Un lien fournit par gravatar nous permet en l’associant à l’email transformée grâce à la fonction SHA-256 (fonction permettant un hachage sécurisé) d’obtenir la photo de profil de l’utilisateur connectée. Une photo de profil par défaut est attribuée aux utilisateurs n’ayant pas de compte gravatar. La photo de profil de l’utilisateur connecté apparaît de plus sur le header.
  * Retour sur la tâche: Exercice facile.
* **Light/dark mode**
  * Note: 2/2
  * Commentaire: Nous avons utilisé le hook useState dans le fichier _app.jsx pour stocker l'état du mode sombre, nous avons par la suite créer un bouton mode sombre.

## Miscellaneous

### Course Feedback

Le cours était intéressant, la répartition des modules a été faite de manière optimale. C’est un domaine qui intéressent plusieurs personnes du groupe. Le principal défaut du cours aura été sa répartition hebdomadaire qui, à notre avis, ne laissait pas assez de temps pour avancer sur les labs en cours.

### Project Reuse

- [ ] We authorize the professors to use our project as an example for the next year students (facultative).



