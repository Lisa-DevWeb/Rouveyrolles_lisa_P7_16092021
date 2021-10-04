//Déportation de la logique routing sur le Router
const express = require("express");
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comments"); //Associer les fonctions aux différentes routes
const router = express.Router();

// Routes
router.post("/:id/comment", auth, commentCtrl.createComment); //Publier un commentaire
router.get("/:id/comments", auth, commentCtrl.getComments); //Récupérer des commentaires
router.delete("/:id/comment/:id", auth, commentCtrl.deleteComment); //Supprimer un commentaire 

module.exports = router;
