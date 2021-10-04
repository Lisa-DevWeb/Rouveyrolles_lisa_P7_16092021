//Déportation de la logique routing sur le Router
const express = require("express");
const router = express.Router(); //Implémenter des routes
const usersCtrl = require("../controllers/users"); //Associer les fonctions aux différentes routes
const auth = require("../middleware/auth");

//Fonctions importées et appliquées aux routes depuis le dossier Controllers
router.post("/signup", usersCtrl.signup); //Enregistre un nouveau user dans la BDD
router.post("/login", usersCtrl.login); //Connexion de l'user 
router.delete("/delete", auth, usersCtrl.deleteProfil); //Suppression d'un compte
router.get("/myprofile", auth, usersCtrl.userProfil); //profil user

//Projet d'amélioration
router.put("/update", auth, usersCtrl.updateProfile); //Editer les informations du profil user

module.exports = router;
