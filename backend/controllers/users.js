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
			throw new Error("Missing parameters");
		}

		if (!email_regex.test(email)) {
			throw new Error("Wrong email format");
		}

		if (!password_regex.test(password)) {
			throw new Error(
				"-At least 8 characters long - Include at least 1 lowercase letter - 1 capital letter - 1 number - 1 special character = !@#$%^&*"
			);
		}

		//Recherche d'un user specifique avec la methode findOne
		const oldUser = await models.User.findOne({
			attributes: ["email"],
			where: { email: email }
		});
		if (oldUser) {
			throw new Error("Already have an account");
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
			throw new Error("Sorry,something gone wrong,please try again later");
		}

		const token =
			"Bearer " +
			jwt.sign({ id: newUser.id }, process.env.TOKEN_SECRET_KEY, { expiresIn: "2H" });

		if (!token) {
			throw new Error("Sorry,something gone wrong,please try again later");
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
			throw new Error("Sorry,can't find your account");
		}

		//comparaison du mot de passe entré par l'user avec le hash enregistré dans la base de données
		const isMatch = await bcrypt.compare(req.body.password, user.password);

		if (!isMatch) {
			throw new Error("Incorrect password");
		}

		const token =
			"Bearer " + jwt.sign({ id: user.id }, process.env.TOKEN_SECRET_KEY, { expiresIn: "2h" });
		res.status(200).json({
			user: user,
			token
		});

		if (!token) {
			throw new Error("Something gone wrong try again later");
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
			throw new Error("Sorry,can't find your account");
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
			throw new Error("Sorry,can't find your account");
		}

		const notLatent = userToFind.update({
			latent: 0
		});

		if (!notLatent) {
			throw new Error("Sorry,something gone wrong , please try again later");
		}

		res.status(200).json({
			message: "Your account has been successfully deleted"
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
			throw new Error("Sorry,we can't find your account");
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
			throw new Error("Sorry,something gone wrong,please try again later");
		}
		res.status(200).json({
			user: userToUpdate.isAdmin,
			message: "Your account has been update"
		});

		if (!userToUpdate) {
			throw new Error("Sorry,we can't update your account");
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
