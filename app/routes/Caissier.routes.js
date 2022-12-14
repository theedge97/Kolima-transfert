var express = require('express');
var router = express.Router();

    const caissier  = require("../controllers/caissier.controller.js")
  // Create a new Customer 
  router.get("/connection", (req, res) => {
    res.render('Caissier/login')
  });

 
 //Validation de la transaction par code 
 router.post("/code", caissier.Validationcode);
  //Page De retrait argent 
  router.get("/Retraitargent", caissier.Pageretraitargent);
  //Page D acceuil
  ///Agence/Acceuil
  router.get("/Acceuil", caissier.Acceuil);
   //Deconnection d un Caissier 
   router.get("/Deconnecter", caissier.Deconnecter)

  //Page pour afficher la page de validation de la transaction 
  router.post("/retrait", caissier.RetraitArgent); 
  //Toute les Transactions Journalierement par une Caisse
  router.get("/Transactionjournalier", caissier.JournalierTransaction);
  //Connection au compte  
  router.post("/Connectioncompte", caissier.Connection);
  //Page D envoie par la Caisse
  ///Caissier/EnvoieArgent
  router.get("/EnvoieArgent", caissier.PageEnvoieargent);
  //Recuperer la ville 
  router.get("/:idpays", caissier.Uneville);
  //Recuperer une monaie sans frais
  router.get("/monaiesans/:lasomme/:paysid", caissier.Unemonaie);
  //Envoie D argent
  router.post("/envoie", caissier.EnvoieArgent);  
 
  module.exports = router;
