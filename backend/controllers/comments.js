//Stocker logique métier et implémentation des routes CRUD
const models = require("../models");
const fs = require("fs"); //Donne accès aux fonctions permettant de modifier voire supprimer le système de fichiers

//Création d'un commentaire
exports.createComment = async (req, res) => {
	try {
		let comments = req.body.comments;
		const newCom = await models.Comment.create({
			comments: comments,
			UserId: req.user.id,
			PostId: req.params.id
		});

		if (newCom) {
			res.status(201).json({ message: "Votre commentaire a été envoyé", newCom });
		} else {
			throw new Error("Une erreur est survenue. S'il vous plaît, veuillez réeessayer plus tard");
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//Récupération des commentaires
exports.getComments = async (req, res) => {
	try {
		const order = req.query.order;
		const comments = await models.Comment.findAll({
			attributes: [
				"id",
				"comments",
				"UserId",
				"PostId",
				"createdAt",
				"updatedAt"
			],
			order: [order != null ? order.split(":") : ["createdAt", "DESC"]],
			where: { postId: req.params.id },
			include: [{ model: models.User, attributes: ["username"] }]
		});
		if (comments) {
			res.status(200).send({ message: comments });
		} else {
			throw new Error("Il n'y a pas de commentaire");
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Futur projet
exports.deleteComment = async (req, res) => {
	try {
		const commentFound = await models.Comment.findOne({
			attributes: [
				"id",
				"comments",
				"UserId",
				"PostId",
				"createdAt",
				"updatedAt"
			],
			where: { id: req.params.id }
		});

		if (!commentFound) {
			throw new Error("Can't find your comment");
		}

		await models.Comment.destroy({
			where: { id: req.params.id }
		});
		res.status(200).json({ message: "Comment has been deleted " });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

