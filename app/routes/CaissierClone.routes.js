var express = require('express');

const cookieParser = require('cookie-parser');

const bodyParser = require("body-parser");
//setup express app
const app = express()

// let’s you use the cookieParser in your application
app.use(cookieParser());

app.use(bodyParser.json());

module.exports = app => {
    const caissier  = require("../controllers/caissier.controller.js")
  // Create a new Customer 
  app.get("/Caissier/connection", (req, res) => {
    res.render('Caissier/login')
  });

 
 //Validation de la transaction par code 
  app.post("/Caissier/code", caissier.Validationcode);
  //Page De retrait argent 
  app.get("/Caissier/Retraitargent", caissier.Pageretraitargent);
  //Page D acceuil
  ///Agence/Acceuil
  app.get("/Caissier/Acceuil", caissier.Acceuil);
   //Deconnection d un Caissier 
  app.get("/Caissier/Deconnecter", caissier.Deconnecter)

  //Page pour afficher la page de validation de la transaction 
  app.post("/Caissier/retrait", caissier.RetraitArgent); 
  //Toute les Transactions Journalierement par une Caisse
  app.get("/Caissier/Transactionjournalier", caissier.JournalierTransaction);
  //Connection au compte  
  app.post("/Caissier/Connectioncompte", caissier.Connection);
  //Page D envoie par la Caisse
  ///Caissier/EnvoieArgent
  app.get("/Caissier/EnvoieArgent", caissier.PageEnvoieargent);
  //Recuperer la ville 
  app.get("/Caissier/:idpays", caissier.Uneville);
  //Recuperer une monaie sans frais
  app.get("/Caissier/monaiesans/:lasomme/:paysid", caissier.Unemonaie);
  //Envoie D argent
  app.post("/Caissier/envoie", caissier.EnvoieArgent);  

};