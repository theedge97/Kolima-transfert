var express = require('express');
var router = express.Router();

const admin = require("../controllers/admin.controller.js");
  // Acces a la page de Creation de Compte
  router.get("/Superadmin/creationcompte", admin.PageCreationCompte);
  router.get("/Superadmin/Acceuil", admin.Acceuil);
  router.get("/Superadmin/Acceuilhebdo", admin.Acceuilhebdo);
  router.get('/Superadmin/Acceuilmois', admin.Acceuilmois)
  router.get("/Superadmin/Login", admin.PageLogin);
  router.post("/Superadmin/creation", admin.Creation)
  router.post("/Superadmin/connection", admin.Connection)
  //Deconnecter le Compte de L administrateur
  router.get("/Superadmin/Deconnecter", admin.Deconnecter);
  //Parametrage
  router.get("/Superadmin/Parametre", admin.Parametrage);
  //Modification du Mote de passe
  ///Superadmin/ModifierMotdepasseCompte
  router.post("/Superadmin/ModifierMotdepasseCompte", admin.MajMotdepasse);
  //Modification des Information du Compte de L administrateur
  router.post("/Superadmin/MajCompteAdmin", admin.MajCompteAdmin);
  //Creation d un Compte Admin
  router.post("/Superadmin/creationcompte", admin.Creation);

  //Creation d'une agence
  router.post("/Superadmin/creationagence", admin.CreationAgence)
  router.get("/Superadmin/AjoutAgence", admin.Ajoutagence);
  router.get("/Superadmin/ListeAgence", admin.Listeagence);
  router.get("/Superadmin/AgenceDetails/:idagence", admin.Detailsagence);
  router.get("/Superadmin/AgenceActive/:idagence/:valeur", admin.Activeagence);
  //rechargement d'une agence
  router.post("/Superadmin/Rechargement", admin.Rechargementagence)
  //Suppression d'une Agence
  router.get("/Superadmin/AgenceSupprimer/:idagence", admin.Supprimeragence);
  //Les monaie
  router.get("/Superadmin/Lesmonaies", admin.Lesmonaie);
  //Suppression du Pourcentage d'envoie de la Monaie
  router.get("/Superadmin/PourcentageTauxEnvoieSupprimer/:idpourcent", admin.SupprimerPourcentageTaux);
  //Page pour voir la Liste des Pays et leur informations
  router.get("/Superadmin/Lespaysliste", admin.LesPaysSelect);
  //Modifier les Informations d un Pays
  router.post("/Superadmin/PaysModidifierinfo", admin.ModifierPaysInfo);
  //Ajout d un Pays
  router.post("/Superadmin/PaysAjoutInfo", admin.AjoutPaysInfo);
  //Suppression de la monaie
  router.get("/Superadmin/MonaieSupprimer/:idmonaie", admin.Supprimermonaie);
  //Modification du nom de la monaie
  router.post("/Superadmin/MonaieModidifier", admin.Modifiermonaie);
  //ajout d'une monaie /Superadmin/MonaieAjout
  router.post("/Superadmin/MonaieAjout", admin.Ajoutmonaie);
  //Modification des Taux de Frais d envoie
  ///Superadmin/TauxFraisEnvoieModidifier
  router.post("/Superadmin/TauxFraisEnvoieModidifier", admin.ModifierTauxFrais);
  //Liste des taux d'echanges
  router.get("/Superadmin/Configurationtaux", admin.Configurationtaux);
  //Liste des Taux Frais d echanges
  router.get("/Superadmin/Lestauxfraisechange", admin.LesTauxfraisenvoie);
 //Ajout des Listes des Taux echanges
 ///Superadmin/ajouttauxfraisechange
 router.post("/Superadmin/ajouttauxfraisechange", admin.Ajouttauxfraisechange);
  //Ajout des taux d'echanges
  router.post("/Superadmin/ajouttaux", admin.Ajouttaux);
  //Suppression un taux d'echanges
  router.get("/Superadmin/TauxSupprimer/:idtaux", admin.Supprimertaux);
  //Modification du taux d'echanges
  router.post("/Superadmin/TauxModidifier", admin.Modifiertaux);
  //Modifier Une Ecriture
  router.get("/Superadmin/ModifieEcriture", admin.ModifierEcriture);
  //Page Pour Voir les Balance Periodique entre Deux dates
  router.get("/Superadmin/BalancePeriodique", admin.BalancePeriodique);
  //Recherche Sur la Balance Periodique entre deux Date
  router.post("/Superadmin/BalancePeriodiqueRecherche", admin.BalancePeriodiqueRecherche);
  ///Superadmin/Bilan
  router.get("/Superadmin/Bilan", admin.Bilan);
  //Modification des Informations d une Ecriture
  router.post("/Superadmin/ModificationInfoEcriture", admin.ModifiecationEcriture);
  //Page pour la Recherche De la Balance A Date
  router.get("/Superadmin/BalanceaDate", admin.BalanceAdate);
  //Recherche des Balances A date
  router.post("/Superadmin/BalanceDateRech", admin.BalanceAdateRecherche);
  //Compte Resultats
  router.get("/Superadmin/CompteResultats", admin.CompteResultat);
  //Les frais d'envoie
  router.get("/Superadmin/Lesfrais", admin.Lesfrais);
  //Pages Pour voir les Etats Financiers
  router.get("/Superadmin/Lesetatsfinancier", admin.PageEtatsFinancier);
  //Recherche des Etat financier d un compte entre Deux Dates
  ///Superadmin/Etatcompte
  router.post("/Superadmin/Etatcompte", admin.Etatcompteadaterecherche);
  //Les Comptes Types de comptes
  router.get("/Superadmin/Lestypescomptes", admin.LestypeComptes);
  //Recuperation des Information d une Ecriture
  router.post("/Superadmin/EcrituresmodifierInfo", admin.InfoEcriture);
  //Lescomptefinances
  router.get("/Superadmin/Lescomptefinances", admin.ListeCompteFinance);
  //Modifier les Informations du compte Finance
  router.post("/Superadmin/Modifierinfocompte", admin.ModifierInfoCpteFinance);
  //Suppression d un Compte Finance
  router.get("/Superadmin/SupprimerCompteFinance/:idcpte", admin.Supprimercomptefinance);
  //Ajoutcomptefinances
  router.post("/Superadmin/Ajoutcomptefinances", admin.CompteFinanceajout);
  //Page de Saissie des Operation Comptable
  router.get("/Superadmin/SaissieComptables", admin.SaissieComptable);
  //Ajout d un Operation Comptables
  router.post("/Superadmin/AjoutOperationComptable", admin.AjoutOperationComptable);
  //Page pour afficher le Brouillard de Compte
router.get("/Superadmin/BrouillardeCompte", admin.PageBrouillardeCompte);
  //Compte des Resultats
//La liste des Monaies en fonction des Pays
router.get("/Superadmin/ListedesTransfertPays", admin.ListeMonaieTransfert);
//Ajout de la liste des monaies de transfert du pays
router.post("/Superadmin/TransfertMonaieAjout", admin.AjoutListedesMonaiesTransfert);
//Suppression dune Monaie de transfert argent
router.get("/Superadmin/SupprimerMonaieListe/:idlistemonai", admin.SupprimerListeMonaietransfert);
//Modifier la liste des  Monaie de Transfert
router.post("/Superadmin/ModifierListedesTransfertPays", admin.TransListeModifierMonaie )

///Superadmin/BrouillardeCompteEntredeuxDate
router.post("/Superadmin/BrouillardeCompteEntredeuxDate", admin.BrouillardcpteentreDeuxdate);
  //Ajout d'un frais
router.post("/Superadmin/ajoutfrais", admin.Ajoutfrais);
  //suppression d'un frais
router.get("/Superadmin/FraisSupprimer/:idfrais", admin.Supprimerfrais);
  //Page des gain sur les frais
router.get("/Superadmin/Gainfrais", admin.Lesgains);
  //Modifier le gain du superagence
router.get("/Gain/superagence/:valeur", admin.Gainsuperagence);
  //Modifier le gain de l'agence de depot /Gain/agencedepot/
router.get("/Gain/agencedepot/:valeur", admin.Gainagencedepot);
 //Modifier le gain de l'agence de retrait
router.get("/Gain/agenceretrait/:valeur", admin.Gainagenceretrait);
 //Page Pour afficher les Transaction valider par une Agence entre deux date
router.get("/Superadmin/ToutTransactionvalider", admin.Toutransactionvalider);
 ///Superadmin/RechercheToutTransacEntreDeuxDates
//Rechercher tout les Transactions entre deux Dates D une Agence
router.post("/Superadmin/RechercheToutTransacEntreDeuxDates", admin.RechToutTransacEntreDeuxDateAgence);
//Page pour Retrouver toutes les Transaction d une Agence
///Superadmin/LesTransactionTouts
router.get("/Superadmin/LesTransactionTouts", admin.Toutlestransactions);
//Recherche de toute les Transactions entre deux dates
///Superadmin/LesTransactionEntredeuxDates
router.post("/Superadmin/LesTransactionEntredeuxDates", admin.PrincipaleRechToutTransacEntreDeuxDate);
 //Page de Compensation d une agence /Superadmin/Compensation
router.get("/Superadmin/Compensation", admin.Compensation);
//Recherche des Transactions A compenser d une Agence
router.post("/Superadmin/CompensationRecherche", admin.CompensationTransactionAgence);
//La liste des Agences Qui ont effectuer des Compensation
///Superadmin/HistoriqueCompensation
router.get("/Superadmin/HistoriqueCompensation", admin.LesAgenceCompensers);
//Compensation des Transaction d une Agence
router.post("/Superadmin/CompensationTransaction", admin.CompenserLesTransaction);
//Selectionner  l Historique de compensation d une agence
router.get("/Superadmin/HistoriqueCompensationAgence/:idagence", admin.HistoriqueCompensersAgences);
//Facture de Compensation d une Agence lors d une Date
router.get("/Superadmin/FactureCompensationAgence/:idcompensation/:idagence", admin.FactureCompensationsAgences);
//Page pour Afficher la Liste des Agences blocker
router.get("/Superadmin/LesagenceBlocker", admin.AgenceBlocker)
//Generation du code de reinitiallisation
router.get("/Superadmin/GenerationCodeReinitialisation/:idagence", admin.GenerationCode)

module.exports = router;