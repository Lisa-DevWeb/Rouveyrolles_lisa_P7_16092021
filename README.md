# Rouveyrolles_lisa_P7_16092021
Description : 
Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

Processus de déploiement : 

1 - Clonez le repository : git clone https://github.com/Lisa-DevWeb/Rouveyrolles_lisa_P7_16092021.git
2 - Accédez au dossier du repository : cd Rouveyrolles_lisa_P7_16092021 
3 - Accédez au dossier backend : cd backend 
4 - Exécutez la commande npm install 

La Base de données :

D'autre part, assurez-vous d'avoir MySQL. 
Dans le dossier backend => config => config.json , renseignez le username, password et le nom de votre base de données(les informations renseignées lors du processus de création de votre base de données).

Créez localement la base de donnée « nom_devotrebase ».

Dans l'invite de commande déplacez vous dans le dossier backend : cd backend , tapez sequelize db:create , puis sequelize db:migrate , (assurez vous que sequelize-cli est bien installé)

Dans le dossier backend => models => index.js , suivez les instructions pour créer un compte modérateur , enregistrez les modifications , puis lancez nodemon / node server.

5 - Exécutez la commande nodemon server ou node server

6 - Accédez au dossier frontend : cd ../frontend 
7 - Exécutez la commande npm install 
8 - Exécutez la commande npm run serve


