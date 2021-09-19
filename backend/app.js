const express = require('express'); //Express est un framework reposant sur Node, qui facilite la création et la gestion des serveurs Node,
const helmet = require('helmet'); //Helmet est une collection de plusieurs middleware qui définissent des en-têtes HTTP liés à la sécurité
const bodyParser = require('body-parser'); //Gérer la demande POST provenant de l'application front-end, permet l'extraction de l'objet JSON de la demande(rendre le corps de la reqûete exploitable)
const app = express(); //Création d'une application express

//Importation du Router
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');

const path = require('path'); //Donne acccès au chemin du système de fichier

// dotenv
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

//Middleware sont des fonctions qui capturent et traitent les reqûetes envoyées vers le serveur

//Middleware appliqué à toutes les routes, permettant l'envoie de requête et d'accéder à l'API 
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*"); //Accès à l'API depuis n'importe quelle origine
	res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"); //Ajout des headers mentionnés vers l'API
	res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS"); //Envoie de requête avec les méthodes mentionnées
	next();
  });
  
/* BODY PARSER */ //Transformer le corps de la requête en objet JS utilisable
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet()); //Helmet est une collection de plusieurs middleware qui définissent des en-têtes HTTP liés à la sécurité

/*MULTER*/
app.use('/images', express.static(path.join(__dirname, 'images'))); //Sert le dossier statique image

//La racine de toutes les routes liées à l'authentification et enregistrement du routeur pour toutes les demandes effectuées vers ces routes
app.use('/api/users/', usersRoutes);
app.use('/api/posts/', postsRoutes);
app.use('/api/posts/', commentsRoutes);

module.exports = app; //Permet l'accès depuis les autres fichiers, notamment le serveur Node 
