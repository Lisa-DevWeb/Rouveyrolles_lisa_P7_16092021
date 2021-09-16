//Faciliter la gestion de fichier envoyé avec des requêtes http vers l'API
const multer = require('multer');
const fs = require('fs');

const MIME_TYPES = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/gif': 'gif',
};

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'images');
	}, //Fonction qui explique à multer dans quel dossier engistrer les fichiers
	filename: (req, file, callback) => {
		const name = file.originalname.split(' ').join('_');

		const extension = MIME_TYPES[file.mimetype];
		console.log(MIME_TYPES[file.mimetype]);
		callback(null, name + '.' + extension);
	}, //Indique à multer d'utiliser le nom d'origine et de remplacer les espaces par des underscores. La fonction utilise la constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée
}); //Objet de configuration pour multer. Fonction diskStorage pour enregistrer dans le disque 

module.exports = multer({ storage: storage }).single('attachment');
