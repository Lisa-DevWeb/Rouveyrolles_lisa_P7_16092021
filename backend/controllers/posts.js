
//Stocker logique métier et implémentation des routes CRUD
const models = require('../models');
const fs = require('fs'); //Donne accès aux fonctions permettant de modifier voire supprimer le système de fichiers

//Création d'une publication en renseignant: title, content et un fichier(facultatif)
exports.createPost = async (req, res) => {

	try {

		//Recherche d'un user spécifique avec la methode findOne
		const findUser = await models.User.findOne({
			attributes: ['username', 'role'],
			where: { id: req.user.id },
		});

		if (!findUser) {
			throw new Error("Sorry,we can't find your account");
		}

		//Publier un fichier
		let attachment = null;
		if ( req.file !== null && req.file !== undefined){
		attachment = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}

		const newPost = await models.Post.create({
			title: req.body.title,
			content: req.body.content,
			attachment: attachment,
			UserId: req.user.id,
			isModerate: 0,
		});
		if (!newPost) {
			throw new Error('Sorry, missing parameters');
		}

		res.status(200).json({ newPost });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//Renvoie toutes les publication avec le user spécifié
exports.getAllPosts = async (req, res) => {
	try {
		const fields = req.query.fields;
		const order = req.query.order;

		const posts = await models.Post.findAll({
			order: [order != null ? order.split(':') : ['createdAt', 'DESC']],
			attributes: fields != '*' && fields != null ? fields.split(',') : null,
			include: [
				{
					model: models.User,
					attributes: ['username', 'isAdmin'],
				},
			],
		});
		if (!posts) {
			throw new Error('Sorry , nothing to fetch');
		}
		res.status(200).send(posts);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//Récupérer une publication d'un user spécifique grâce à l'id
exports.getPostProfile = async (req, res) => {
	try {
		const order = req.query.order;
		const fields = req.query.fields;

		const postProfile = await models.Post.findAll({
			order: [order != null ? order.split(':') : ['createdAt', 'DESC']],
			attributes: fields != '*' && fields != null ? fields.split(',') : null,
			include: [
				{
					model: models.User,
					attributes: ['username'],
					where: { id: req.params.id },
				},
			],
		});
		if (!postProfile) {
			throw new Error('This user has posted nothing');
		}

		res.status(200).json(postProfile);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//Modérer une publication
exports.moderatePost = async (req, res) => {
	try {
		const postToModerate = await models.Post.findOne({
			where: { id: req.params.id },
		});

		if (!postToModerate) {
			throw new Error("Couldn't find your post");
		}

		const moderatedPost = (await postToModerate.isModerate)
			? postToModerate.update({
					isModerate: 0,
			  })
			: postToModerate.update({
					isModerate: 1,
			  });

		if (!moderatedPost) {
			throw new Error('Sorry,something gone wrong,please try again later');
		} else {
			res.status(200).json({
				message: 'This post is now moderate',
				postModerate: postToModerate,
			});
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//Suppression d'une publication
exports.deletePost = async (req, res) => {
	try {
		const post = await models.Post.findOne({
			where: { id: req.params.id },
		});

		// attachment
		if (post.attachment !== null) {
			const filename = post.attachment.split('/images')[1];
			fs.unlink(`images/${filename}`, (error) => {
				error ? console.log(error) : console.log('file has been deleted');
			});
		}

		if (!post) {
			throw new Error("Sorry,your post doesn't exist");
		}

		// Post 
		const destroyedPost = await models.Post.destroy({
			where: { id: req.params.id },
		});

		if (!destroyedPost) {
			throw new Error('Sorry,something gone wrong,please try again later');
		} else {
			res.status(200).json({ message: 'Post has been deleted' });
		}


	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

// Futur projet 
exports.modifPost = async (req, res) => {
	try {
		let post = await models.Post.findOne({
			where: { id: req.params.id },
		});

		if (!post) {
			throw new Error("Sorry,your post doesn't exist");
		}

		let attachment = null;
		if ( req.file !== null && req.file !== undefined){

		attachment = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}

		// Post 
		
		post.title = req.body.title;
		post.content = req.body.content;
		post.attachment = attachment;
		const updated = await post.save()

		if (!updated) {
			throw new Error('Sorry,something gone wrong,please try again later');
		} else {
			res.status(200).json({ message: 'Post has been modified ' });
		}

	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

