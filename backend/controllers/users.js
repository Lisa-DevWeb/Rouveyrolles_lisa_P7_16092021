//Stocker logique métier et implémentation des routes CRUD
const bcrypt = require("bcrypt"); //Le package bcrpyt permet un cryptage sécurisé avec un algorithme unidirectionnel
const jwt = require("jsonwebtoken"); //Créer et vérifier les tokens d'authentification
const models = require("../models");

//Création et recherche d'un user dans la base de données
exports.signup = async (req, res) => {
	
	//Configuration des paramètres envoyés dans la requête
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	const role = req.body.role;

	//Regex : effectue une recherche dans les chaînes de caractère
	const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const password_regex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
	const username_regex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

	//Recherche de l'utilisateur dans la base de données
	try {
		if (!email || !username || !password || !role) {
			throw new Error("Certains paramètres sont manquants");
		}

		if (!email_regex.test(email)) {
			throw new Error("Format d'email incorrect");
		}

		if (!password_regex.test(password)) {
			throw new Error(
				"Mot de passe requis : 8 caractères minimun. -Inclure au moins 1 lettre minuscule - 1 lettre majuscule - 1 chiffre - 1 caractère spécial = !@#$%^&*"
			);
		}

		//Recherche d'un user specifique avec la methode findOne
		const oldUser = await models.User.findOne({
			attributes: ["email"],
			where: { email: email }
		});
		if (oldUser) {
			throw new Error("Utilisteur déjà existant");
		}

		//Création d'un nouvel utilisateur avec le mot de passe salé
		const newUser = await models.User.create({
			email: email,
			username: username,
			password: await bcrypt.hash(password, 10),
			role: role,
			isAdmin: 0,
			latent: 1
		});

		if (!newUser) {
			throw new Error("Une erreur est survenue. Veuillez réessayer plus tard");
		}

		const token =
			"Bearer " +
			jwt.sign({ id: newUser.id }, process.env.TOKEN_SECRET_KEY, { expiresIn: "2H" });

		if (!token) {
			throw new Error("Une erreur est survenue. S'il vous plaît, veuillez ressayer plus tard");
		}

		res.status(201).json({
			user_id: newUser.id,
			email: newUser.email,
			username: newUser.username,
			isAdmin: newUser.isAdmin,
			role: newUser.role,
			latent: newUser.latent,
			token
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//Connexion avec les paramètres suivants : email, username, password, role
exports.login = async (req, res) => {
	try {
		const user = await models.User.findOne({
			where: {
				email: req.body.email,
				latent: 1
			}
		});

		if (!user) {
			throw new Error("Désolé, compte introuvable");
		}

		//comparaison du mot de passe entré par l'user avec le hash enregistré dans la base de données
		const isMatch = await bcrypt.compare(req.body.password, user.password);

		if (!isMatch) {
			throw new Error("Mot de passe incorrect");
		}

		const token =
			"Bearer " + jwt.sign({ id: user.id }, process.env.TOKEN_SECRET_KEY, { expiresIn: "2h" });
		res.status(200).json({
			user: user,
			token
		});

		if (!token) {
			throw new Error("Désolé, une erreur s'est produite, veuillez réessayer plus tard");
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//Accès au profil avec les Headers renseignés dans Postman ainsi que les mêmes paramètres envoyés dans la requête
exports.userProfil = async (req, res) => {
	try {
		const user = await models.User.findOne({
			attributes: ["id", "email", "username", "role", "isAdmin", "latent"],
			where: {
				id: req.user.id
			}
		});

		if (!user) {
			throw new Error("Compte introuvable");
		}
		res.status(200).json({ user });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//Suppresion du compte
exports.deleteProfil = async (req, res) => {
	try {
		const userToFind = await models.User.findOne({
			where: { id: req.user.id }
		});
		if (!userToFind) {
			throw new Error("Désolé, compte introuvable");
		}

		const notLatent = userToFind.update({
			latent: 0
		});

		if (!notLatent) {
			throw new Error("Une erreur s'est produite, veuillez réessayer plus tard");
		}

		res.status(200).json({
			message: "Votre compte a été supprimé avec succès"
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//Editer le profil user avec les Headers renseignés dans Postman ainsi que les mêmes paramètres envoyés dans la requête
exports.updateProfile = async (req, res) => {
	try {
		const userToFind = await models.User.findOne({
			attributes: ["role", "id", "isAdmin", "username"],
			where: { id: req.user.id }
		});

		if (!userToFind) {
			throw new Error("Compte introuvable");
		}

		const userToUpdate = await models.User.update(
			{
				username: req.body.username,
				role: req.body.role,
				isAdmin: req.body.isAdmin
			},
			{
				where: { id: req.user.id }
			}
		);

		if (!userToUpdate) {
			throw new Error("Désolé, une erreur s'est produite, veuillez réessayer plus tard");
		}
		res.status(200).json({
			user: userToUpdate.isAdmin,
			message: "Votre compte a bien été mis à jour"
		});

		if (!userToUpdate) {
			throw new Error("Désolé, nous ne pouvons pas mettre à jour votre compte");
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
