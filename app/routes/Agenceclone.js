var express = require('express');

const cookieParser = require('cookie-parser');

const bodyParser = require("body-parser");
//setup express app
const app = express()

// let’s you use the cookieParser in your application
app.use(cookieParser());

app.use(bodyParser.json());

module.exports = app => {
    const agence = require("../controllers/agence.controller.js")
  // Connexion au compte d'une agence
  app.get("/Agence/connection", (req, res) => {
    //Verifions la langues
    //agencelangue
    var langue = req.cookies.agencelangue;

    if (req.cookies.agencelangue == "En") {

    res.render('Agence/loginEn', {langue: langue})
    }else{

    res.render('Agence/login')
    }
  });
  //Accueil
  app.get("/Agence/Acceuil", agence.Acceuil);
  //
  app.post("/Agence/connection", agence.Connection);
  //Page envoie d'argent
  app.get("/Agence/EnvoieArgent", agence.PageEnvoieargent);
  //Envoie d 'argent
  app.post("/Agence/envoie", agence.EnvoieArgent);
  //Page De retrait argent
  app.get("/Agence/RetraitArgent", agence.PageRetraitargent);
  //Page de Rapport des Transaction A Date
  app.get("/Agence/RapportTransactionJournalier", agence.RapportTransactionADate );
  //Page de Rapports des Transaction Entre Deux Date
  app.get("/Agence/RapportTransactionDeuxDate", agence.RapportTransactionDeuxDate);
 //Page De Rapport de Retrait des Transactions Entre Deux Date d une Agence
 app.get("/Agence/RapportTransactionRetraitDeuxDate", agence.RapportTransactionRetraitDeuxDate);
 //Historique des Compensations
 ///Agence/historiquecompensation
 app.get("/Agence/historiquecompensation", agence.Historitoutcompenser);
 //Afficher les transaction compenser lors d une Date
 app.get("/Agence/FactureCompensationAgence/:idcompensation", agence.FactureCompensationsAgenceshistorie);
 //Recuperer les Informations du Client
 ///Agence/InfoClient
 app.get("/Agence/InfoClient/:telephoneenvoyeur", agence.ClientInforRecupe);

 //La Liste des Taux d echanges de la Monaie
 ///Agence/tauxechanges
 app.get("/Agence/tauxechanges", agence.Tauxechanges);
 //Convertion des Monaies  Taux d echanges
 app.get("/Agence/convertirtaux/:somme/:devise1/:devise2", agence.ConvertionMonaies);
//Changement de la langue de l 'utilisateur
app.get("/Agence/changelangue/:lang", agence.ChangeLanguage);
//Changement de la langue dans la page
app.get("/Agence/changelanguepage/:lang", agence.ChangeLanguagePage);
 //Deconnection du Compte de L agence
app.get("/Agence/Deconnecter", agence.Deconnecter)
 //Page des Rapport des Transaction de Retaits
  app.get("/Agence/RapportTransactionRetraitJournalier", agence.RapportTransactionDeRetraitAdate);
  //Recherche des transacrion entre deux 2 dates
  app.post("/Agence/RapportTransactionDeuxDatesrech", agence.RechRapportTrDeuxDate);
//Recherche des TRansacion de Retrait entre Deux Date
  app.post("/Agence/RapportTransactionRetraitDeuxDatesrech", agence.RechRapportTrRetraitDeuxDate);
  //Rechercher Tout les Transaction Depot et Retrait entre Deux Date
  app.post("/Agence/RechercheToutTransacEntreDeuxDates", agence.RechToutTransacEntreDeuxDate);
 //Selection Tout les Transactions depot et Retrait
 app.get("/Agence/ToutTransactionvalider", agence.ToutTransactionRetraitDepot);
  //Selection de tout les Tranaction depot et retrait journalierement
 app.get("/Agence/ToutTransactionvaliderJournalierement", agence.JournalierTransactionRetraitDepot);
 //Page Pour selectionner tout les Transaction Retrait et Depot ENtre 2 Date
 app.get("/Agence/ToutTransactionvaliderDeuxDate", agence.ToutTransactionEntreDeuxDateRetraitDepot);
 //Parametrage de L agence
 app.get("/Agence/parametre", agence.Parametrage);

 //La Liste des caissier  /Agence/Lescaissiers
  app.get("/Agence/Lescaissiers", agence.LesCaissiers);
  //creation dun compte de caissier
  app.post("/Agence/CreationCaisse", agence.CreationCaisse);
  //Voir details d un Agent de  La Caisse
  app.get("/Agence/CaissierDetails/:idcaiss", agence.DetailsAgentCaisses);
 //Changement du Statue d un Agent Caissier
 app.get("/Agent/ChangerStatue/:idcaiss/:idtype", agence.ChangementStatueCaissier);
  //vertion
 app.post("/Agence/retrait", agence.RetraitArgent);
 //Mettre a jour les Informations du Caissier
 app.post("/Agence/MajCaissier", agence.MajCaissier);
  //Valider le code
  app.post("/Agence/code", agence.Validationcode);
  //Modifier le Mot de passe d un Caissier
  app.post("/Agent/ModifierMotdepasseCaissier", agence.MajMotdepasse);
//Rectification  dune transaction
  app.get("/Agence/Rectification", agence.Rectification);
  //Recuperer une ville
  app.get("/Agence/:idpays", agence.Uneville);
  //Recuperer une monaie sans frais
  app.get("/Agence/monaiesans/:lasomme/:paysid", agence.Unemonaie);
  //Les Informations de Rectication d une Transaction /Agence/RectificationTransaction
  app.post("/Agence/RectificationTransaction", agence.RectifTransactionCode);
  //Rectification des Transactions
  app.post("/Agence/RectificationTransactionInfo", agence.InformationTransacModifier);

};