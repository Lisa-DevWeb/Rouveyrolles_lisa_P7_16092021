"use strict";

const fs = require("fs");
const path = require("path");
const { getMaxListeners } = require("process");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();

const db = {};

//Replacez les informations suivantes par les vôtres, afin de vous connecter à la Base de données et créer un modérateur
const configs = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASS,
		database: process.env.DB_NAMEDATA,
		host: process.env.DB_HOST,
		dialect: "mysql"
	},
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASS,
		database: process.env.DB_NAMEDATA,
		host: process.env.DB_HOST,
		dialect: "mysql"
	},
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASS,
		database: process.env.DB_NAMEDATA,
		host: process.env.DB_HOST,
		dialect: "mysql"
	}
}[env];

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

//Création d'un modérateur
// Décommenter le code ci-dessous pour créer un compte modérateur.
// Remplacez les valeurs par celles souhaitées
//_________________________________________________________________________________________//

// const password = pw => bcrypt.hashSync(pw, 10);
// const privilegedUser = sequelize.query(
// 	`INSERT INTO Users (id,email,username,password,role,isAdmin,latent,createdAt,updatedAt)
// 	VALUES (DEFAULT,"admin@hotmail.fr","Admin","${password( "Exemple@123")}","Développeur",1,1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`
// );
//_________________________________________________________________________________________//

fs.readdirSync(__dirname)
	.filter(file => {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
		);
	})
	.forEach(file => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
