var express = require('express');

const cookieParser = require('cookie-parser');

const bodyParser = require("body-parser");
//setup express app
const app = express()

// let’s you use the cookieParser in your application
app.use(cookieParser());

app.use(bodyParser.json());

module.exports = app => {
    const admin = require("../controllers/admin.controller.js")
  // Create a new Customer 
  app.get("/AdminEntreprise/connection", (req, res) => {
    res.render('Admin Entreprise/connection')
  });

  app.get("/Acceuil", admin.Acceuil);
  app.post("/Superadmin/creation", admin.Creation)
  app.post("/Superadmin/connection", admin.Connection)
  //Creation d'une agence
  app.post("/Superadmin/creationagence", admin.CreationAgence)
  app.get("/Superadmin/AjoutAgence", admin.Ajoutagence);
  app.get("/Superadmin/ListeAgence", admin.Listeagence);
  app.get("/Superadmin/AgenceDetails/:idagence", admin.Detailsagence);
  app.get("/Superadmin/AgenceActive/:idagence/:valeur", admin.Activeagence);
  //rechargement d'une agence
  app.post("/Superadmin/Rechargement", admin.Rechargementagence)
  //Suppression d'une Agence
  app.get("/Superadmin/AgenceSupprimer/:idagence", admin.Supprimeragence);
  //Les monaie 
  app.get("/Superadmin/Lesmonaies", admin.Lesmonaie);
  //Suppression du Pourcentage d'envoie de la Monaie  
  app.get("/Superadmin/PourcentageTauxEnvoieSupprimer/:idpourcent", admin.SupprimerPourcentageTaux);
  //Suppression de la monaie 
  app.get("/Superadmin/MonaieSupprimer/:idmonaie", admin.Supprimermonaie);
  //Modification du nom de la monaie
  app.post("/Superadmin/MonaieModidifier", admin.Modifiermonaie);
  //ajout d'une monaie /Superadmin/MonaieAjout
  app.post("/Superadmin/MonaieAjout", admin.Ajoutmonaie);
  //Modification des Taux de Frais d envoie 
  ///Superadmin/TauxFraisEnvoieModidifier
  app.post("/Superadmin/TauxFraisEnvoieModidifier", admin.ModifierTauxFrais);
  //Liste des taux d'echanges 
  app.get("/Superadmin/Configurationtaux", admin.Configurationtaux);
  //Liste des Taux Frais d echanges
  app.get("/Superadmin/Lestauxfraisechange", admin.LesTauxfraisenvoie);
 //Ajout des Listes des Taux echanges
 ///Superadmin/ajouttauxfraisechange
 app.post("/Superadmin/ajouttauxfraisechange", admin.Ajouttauxfraisechange);
  //Ajout des taux d'echanges 
  app.post("/Superadmin/ajouttaux", admin.Ajouttaux);
  //Suppression un taux d'echanges 
  app.get("/Superadmin/TauxSupprimer/:idtaux", admin.Supprimertaux);
  //Modification du taux d'echanges 
  app.post("/Superadmin/TauxModidifier", admin.Modifiertaux);
  //Modifier Une Ecriture 
  app.get("/Superadmin/ModifieEcriture", admin.ModifierEcriture);
  //Page Pour Voir les Balance Periodique entre Deux dates 
  app.get("/Superadmin/BalancePeriodique", admin.BalancePeriodique);
  //Recherche Sur la Balance Periodique entre deux Date
  app.post("/Superadmin/BalancePeriodiqueRecherche", admin.BalancePeriodiqueRecherche);
  ///Superadmin/Bilan
  app.get("/Superadmin/Bilan", admin.Bilan);
  //Modification des Informations d une Ecriture 
  app.post("/Superadmin/ModificationInfoEcriture", admin.ModifiecationEcriture);
  //Page pour la Recherche De la Balance A Date 
  app.get("/Superadmin/BalanceaDate", admin.BalanceAdate); 
  //Recherche des Balances A date
  app.post("/Superadmin/BalanceDateRech", admin.BalanceAdateRecherche); 
  //Compte Resultats
  app.get("/Superadmin/CompteResultats", admin.CompteResultat);
  //Les frais d'envoie 
  app.get("/Superadmin/Lesfrais", admin.Lesfrais);
  //Pages Pour voir les Etats Financiers
  app.get("/Superadmin/Lesetatsfinancier", admin.PageEtatsFinancier);
  //Recherche des Etat financier d un compte entre Deux Dates 
  ///Superadmin/Etatcompte
  app.post("/Superadmin/Etatcompte", admin.Etatcompteadaterecherche);
  //Les Comptes Types de comptes 
  app.get("/Superadmin/Lestypescomptes", admin.LestypeComptes);
  //Recuperation des Information d une Ecriture
  app.post("/Superadmin/EcrituresmodifierInfo", admin.InfoEcriture);
  //Lescomptefinances
  app.get("/Superadmin/Lescomptefinances", admin.ListeCompteFinance);
  //Modifier les Informations du compte Finance
  app.post("/Superadmin/Modifierinfocompte", admin.ModifierInfoCpteFinance);
  //Suppression d un Compte Finance 
  app.get("/Superadmin/SupprimerCompteFinance/:idcpte", admin.Supprimercomptefinance);
  //Ajoutcomptefinances
  app.post("/Superadmin/Ajoutcomptefinances", admin.CompteFinanceajout);
  //Page de Saissie des Operation Comptable
  app.get("/Superadmin/SaissieComptables", admin.SaissieComptable);
  //Ajout d un Operation Comptables
  app.post("/Superadmin/AjoutOperationComptable", admin.AjoutOperationComptable);
  //Page pour afficher le Brouillard de Compte 
  app.get("/Superadmin/BrouillardeCompte", admin.PageBrouillardeCompte);
  //Compte des Resultats 
  //CompteResultats
  

  ///Superadmin/BrouillardeCompteEntredeuxDate
  app.post("/Superadmin/BrouillardeCompteEntredeuxDate", admin.BrouillardcpteentreDeuxdate);
  //Ajout d'un frais 
  app.post("/Superadmin/ajoutfrais", admin.Ajoutfrais);
  //suppression d'un frais 
  app.get("/Superadmin/FraisSupprimer/:idfrais", admin.Supprimerfrais);
  //Page des gain sur les frais 
  app.get("/Superadmin/Gainfrais", admin.Lesgains);
  //Modifier le gain du superagence 
  app.get("/Gain/superagence/:valeur", admin.Gainsuperagence);
  //Modifier le gain de l'agence de depot /Gain/agencedepot/
  app.get("/Gain/agencedepot/:valeur", admin.Gainagencedepot);
 //Modifier le gain de l'agence de retrait 
 app.get("/Gain/agenceretrait/:valeur", admin.Gainagenceretrait);
 //Page Pour afficher les Transaction valider par une Agence entre deux date
 app.get("/Superadmin/ToutTransactionvalider", admin.Toutransactionvalider);
 ///Superadmin/RechercheToutTransacEntreDeuxDates
//Rechercher tout les Transactions entre deux Dates D une Agence 
app.post("/Superadmin/RechercheToutTransacEntreDeuxDates", admin.RechToutTransacEntreDeuxDateAgence);
//Page pour Retrouver toutes les Transaction d une Agence 
///Superadmin/LesTransactionTouts
app.get("/Superadmin/LesTransactionTouts", admin.Toutlestransactions);
//Recherche de toute les Transactions entre deux dates
///Superadmin/LesTransactionEntredeuxDates
app.post("/Superadmin/LesTransactionEntredeuxDates", admin.PrincipaleRechToutTransacEntreDeuxDate);
 //Page de Compensation d une agence /Superadmin/Compensation
app.get("/Superadmin/Compensation", admin.Compensation);
//Recherche des Transactions A compenser d une Agence 
app.post("/Superadmin/CompensationRecherche", admin.CompensationTransactionAgence);
//La liste des Agences Qui ont effectuer des Compensation
///Superadmin/HistoriqueCompensation
app.get("/Superadmin/HistoriqueCompensation", admin.LesAgenceCompensers);
//Compensation des Transaction d une Agence 
app.post("/Superadmin/CompensationTransaction", admin.CompenserLesTransaction);
//Selectionner  l Historique de compensation d une agence 
app.get("/Superadmin/HistoriqueCompensationAgence/:idagence", admin.HistoriqueCompensersAgences);
//Facture de Compensation d une Agence lors d une Date
app.get("/Superadmin/FactureCompensationAgence/:idcompensation/:idagence", admin.FactureCompensationsAgences);

};