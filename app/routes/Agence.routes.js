var express = require('express');
var router = express.Router();
const agence = require("../controllers/agence.controller.js")
  // Connexion au compte d'une agence
  router.get("/connection", (req, res) => {
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
  router.get("/Acceuil", agence.Acceuil);
  //
  router.post("/connection", agence.Connection);
  //Page envoie d'argent
  router.get("/EnvoieArgent", agence.PageEnvoieargent);
  //Envoie d 'argent
  router.post("/envoie", agence.EnvoieArgent);
  //Page De retrait argent
  router.get("/RetraitArgent", agence.PageRetraitargent);
  //Page de Rapport des Transaction A Date 
  router.get("/RapportTransactionJournalier", agence.RapportTransactionADate );
  //Page de Rapports des Transaction Entre Deux Date 
  router.get("/RapportTransactionDeuxDate", agence.RapportTransactionDeuxDate);
 //Page De Rapport de Retrait des Transactions Entre Deux Date d une Agence 
 router.get("/RapportTransactionRetraitDeuxDate", agence.RapportTransactionRetraitDeuxDate);
 //Historique des Compensations 
 ///Agence/historiquecompensation
 router.get("/historiquecompensation", agence.Historitoutcompenser);
 //Afficher les transaction compenser lors d une Date 
 router.get("/FactureCompensationAgence/:idcompensation", agence.FactureCompensationsAgenceshistorie);
 //Recuperer les Informations du Client 
 ///Agence/InfoClient
 router.get("/InfoClient/:telephoneenvoyeur", agence.ClientInforRecupe);

 //La Liste des Taux d echanges de la Monaie 
 ///Agence/tauxechanges
 router.get("/tauxechanges", agence.Tauxechanges);
 //Convertion des Monaies  Taux d echanges 
 router.get("/convertirtaux/:somme/:devise1/:devise2", agence.ConvertionMonaies);
 //convertion des Monaies de Taux d'echange plus le Frais d envoie
 
 router.get("/convertirtauxplusfrais/:somme/:devise1/:devise2", agence.ConvertionMonaiesPlusFrais);
//Changement de la langue de l 'utilisateur
router.get("/changelangue/:lang", agence.ChangeLanguage);
//Changement de la langue dans la page
router.get("/changelanguepage/:lang", agence.ChangeLanguagePage);
 //Deconnection du Compte de L agence 
 router.get("/Deconnecter", agence.Deconnecter)
 //Page des Rapport des Transaction de Retaits 
 router.get("/RapportTransactionRetraitJournalier", agence.RapportTransactionDeRetraitAdate);
  //Recherche des transacrion entre deux 2 dates
  router.post("/RapportTransactionDeuxDatesrech", agence.RechRapportTrDeuxDate);
//Recherche des TRansacion de Retrait entre Deux Date 
router.post("/RapportTransactionRetraitDeuxDatesrech", agence.RechRapportTrRetraitDeuxDate);
  //Rechercher Tout les Transaction Depot et Retrait entre Deux Date
  router.post("/RechercheToutTransacEntreDeuxDates", agence.RechToutTransacEntreDeuxDate);
 //Selection Tout les Transactions depot et Retrait 
 router.get("/ToutTransactionvalider", agence.ToutTransactionRetraitDepot);
  //Selection de tout les Tranaction depot et retrait journalierement 
  router.get("/ToutTransactionvaliderJournalierement", agence.JournalierTransactionRetraitDepot);
 //Page Pour selectionner tout les Transaction Retrait et Depot ENtre 2 Date  
 router.get("/ToutTransactionvaliderDeuxDate", agence.ToutTransactionEntreDeuxDateRetraitDepot);
 //Parametrage de L agence 
 router.get("/parametre", agence.Parametrage);

 //La Liste des caissier  /Agence/Lescaissiers
 router.get("/Lescaissiers", agence.LesCaissiers);
  //creation dun compte de caissier 
  router.post("/CreationCaisse", agence.CreationCaisse);
  //Voir details d un Agent de  La Caisse 
  router.get("/CaissierDetails/:idcaiss", agence.DetailsAgentCaisses);
 //Changement du Statue d un Agent Caissier
 router.get("/ChangerStatue/:idcaiss/:idtype", agence.ChangementStatueCaissier);
  //vertion 
  router.post("/retrait", agence.RetraitArgent);
 //Mettre a jour les Informations du Caissier
 router.post("/MajCaissier", agence.MajCaissier);
  //Valider le code 
  router.post("/code", agence.Validationcode);
  //Modifier le Mot de passe d un Caissier
  router.post("/ModifierMotdepasseCaissier", agence.MajMotdepasse);
  //Rectification  dune transaction
  router.get("/Rectification", agence.Rectification);
  //Recuperer une ville 
  router.get("/:idpays", agence.Uneville);
  //Recuperer les monaie de Transfert d 'un Pays 
  router.get("/lesmonaietransfert/:idpays", agence.MonaiedunPays);
  //Recuperer une monaie sans frais
  router.get("/monaiesans/:lasomme/:paysid", agence.Unemonaie);
  //Les Informations de Rectication d une Transaction /Agence/RectificationTransaction
  router.post("/RectificationTransaction", agence.RectifTransactionCode);
  //Rectification des Transactions 
  router.post("/RectificationTransactionInfo", agence.InformationTransacModifier);
  
  module.exports = router;