var express = require('express');
var router = express.Router();

const { toLower, isEmpty, upperCase, isArray, toInteger } = require('lodash');


const caissier  = require("../controllers/caissier.controller.js")
  // Create a new Customer
router.get("/connection", (req, res) => {

    if (req.cookies.tentativecaissier !== null ) {
      var tentative = req.cookies.tentativecaissier;
      tentative =  toInteger(tentative)

      if (tentative > 3) {
        res.redirect("/Caissier/Blockpage");


      } else {
        res.render('Caissier/login')
      }
    }
  });
  //block page
router.get('/Blockpage',  (req, res) => {
    res.render('Caissier/blockpage')
  })
//page de reinitiallisation du mot de passe

 //Validation de la transaction par code
router.post("/code", caissier.Validationcode);
  //Page De retrait argent
router.get("/Retraitargent", caissier.Pageretraitargent);

  ///Agence/Acceuil
router.get("/Acceuil", caissier.Acceuil);
   //Deconnection d un Caissier
router.get("/Deconnecter", caissier.Deconnecter)
//Envoie du code de reinitiallisation
router.post("/Reinitialisation", caissier.Reinitialisation);
//Page pour afficher la page de validation de la transaction
router.post("/retrait", caissier.RetraitArgent);
  //Toute les Transactions Journalierement par une Caisse
router.get("/Transactionjournalier", caissier.JournalierTransaction);
//Page de reinitialisation du mot de passe
router.get('/Reinitialisationmodepasse',  (req, res) => {
  res.render('Caissier/reinitiallisation')
})
//Changement du mot de passe du caissier
router.post('/ChangementMotdepasse', caissier.Reinitialisation)
//Changement de Mot de passe du
router.post('/Modifiermotdepassecaissier', caissier.ModifierMotdepasse)
  //Connection au compte
router.post("/Connectioncompte", caissier.Connection);
///Caissier/EnvoieArgent
router.get("/EnvoieArgent", caissier.PageEnvoieargent);
//Recuperer la ville
router.get("/:idpays", caissier.Uneville);
//Recuperer une monaie sans frais
router.get("/monaiesans/:lasomme/:paysid", caissier.Unemonaie);
//Envoie D argent
router.post("/envoie", caissier.EnvoieArgent);
//Page blockage de caissier
module.exports = router;
