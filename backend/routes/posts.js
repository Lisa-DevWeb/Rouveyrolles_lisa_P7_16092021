//Déportation de la logique routing sur le Router
const express = require("express");
const postsCtrl = require("../controllers/posts"); //Associer les fonctions aux différentes routes
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const router = express.Router(); //Implémenter des routes

//Fonctions importées et appliquées aux routes depuis le dossier Controllers
router.post("/new", auth, multer, postsCtrl.createPost); //Creation d'une nouvelle publication
router.get("/getPosts", auth, multer, postsCtrl.getAllPosts); //Renvoie toutes les publications
router.get("/user/:id", auth, multer, postsCtrl.getPostProfile); //Récupérer une publication d'un user spécifique
router.delete("/:id", auth, multer, postsCtrl.deletePost); //supprimer une publication spécifique
router.put("/:id/moderate", postsCtrl.moderatePost); //Modérer d'une publication

module.exports = router;


