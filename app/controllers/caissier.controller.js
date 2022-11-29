//Mia
let express = require('express')
let app = express()
let bodyParser = require('body-parser') //permet de parser les donner envoyer par posts
//let session = require("express-session") //permet d'appeler la session
const validator = require('express-validator');
const { body ,validationResult  } = require('express-validator');
const bcrypt = require("bcryptjs")//permet de hacher le mot de passe
const saltRounds = 10;
const { toLower, isEmpty, upperCase, isArray, toInteger } = require('lodash');
const path = require("path");


const codeargent = require("uuid");
  //fonctiomn
function convertion(x1, v1, x2, v2, y) {
    /** la fonction qui premet de faire la convertion de la monaie
     * Convertion du franc cfa en gnf
     * */
    var valeur = null;
    var donner1 = upperCase(x1)
    var donner2 = upperCase(x2)
    // fornule pour convertir les taux D echanges 
    
    valeur = (y*v2)/v1 ;
 return valeur; 
  }

//const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
//nos middelware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(cookieParser());
const Agence = require("../models/superadmin/agence.models.js");
const Lespays = require("../models/superadmin/pays.models.js") 
const Lesville = require("../models/superadmin/ville.models.js");
const Client = require("../models/superadmin/client.models.js");
const Transaction = require("../models/superadmin/transaction.models.js");
const Taux = require('../models/superadmin/tauxechange.models.js');
const Frais  = require("../models/superadmin/frais.models.js");
const Monaie = require("../models/superadmin/monaie.models.js");
const Gain = require("../models/superadmin/gains.models.js");
const RetraitArgentcom = require("../models/superadmin/retraitargents.models.js");
const Comissionprincipale = require("../models/superadmin/commissionprincipale.models.js");
const Envoieargenttrans = require("../models/superadmin/envoieargent.models.js");

const Caissier = require("../models/superadmin/caissier.models.js");


//Connection de la Caisse 
exports.Connection =  [
  /*
ce middelware permet de creer un compte
  */
 // verifie si le matricule est un nombre.
 body('telephone').matches(/^6[1,2,5,6]{1}[0-9]{7}$/).withMessage('Veuilez bien saisir un numero valide').trim(),
 body('motdepasse', 'Veuillez saisir un mot de passe de plus de quatre caractere').isLength({ min: 4 }).trim(),
async (req, res, next) => {

   // Extract the validation errors from a request.
   const errors = validator.validationResult(req);
   //les erreurs 
   // Create a genre object with escaped and trimmed data
   if (!errors.isEmpty()) {
     // There are errors. Render the form again with sanitized values/error messages.
     var erreur = errors.array();
     res.render('user/inscription', { erreur: erreur});
     
     return;
   }
   else {
    
    var telephone = req.body.telephone
    var motdepasse = req.body.motdepasse
    
    try {  
      

      var connect = await Caissier.Trouvercomptecaisse(telephone)
     
    
      if (connect !== "" && !isEmpty(connect) ) {
      var vrai = bcrypt.compareSync(motdepasse, connect[0]['motdepasse']);
      console.log(vrai) 
      if (vrai == true) {
        if (connect[0]['statue'] == 1) {
          
res.cookie('cassiernom', connect[0]['nomcaissier']);

res.cookie('cassierprenom', connect[0]['prenomcaissier']);

res.cookie('cassiertelephone', connect[0]['telephonecaissier']);
res.cookie("caissieragencelier",  connect[0]['agencelier'])
res.cookie("caissieridcaiss",  connect[0]['idcaiss'])
res.cookie("caissierville",  connect[0]['ville'])
res.cookie("caissierpays",  connect[0]['pays'])
res.cookie("caissieridpays",  connect[0]['idpays'])
res.cookie("caissierdevise",  connect[0]['monaie'])

      res.redirect("/Caissier/Acceuil");
          
        } else {
          //Si le Compte est Desactiver 
          res.render('Caissier/login', {desactivecompte: "Votre Compte est Désactivé"})
          
        }
        
      }else{
        res.render('Caissier/login', {erreurmotpasse: "Votre mot de passe ne correspond pas"})
     
      } 
     
    }else{
      res.render('Caissier/login', {erreurnumero: "Votre numero ne correspond pas"})
     
      }
     
       } catch(e) {
           console.log(e);
           res.sendStatus(500);
       }
       
   } 
 }
]

//Page d'acceuuil de  La Caisse
exports.Acceuil  =  [
  async (req, res) => {

    if (req.cookies.cassiernom != null ) {
      try {  
        var nom = req.cookies.cassiernom;
        var telephone = req.cookies.agencetelephone
        var email = req.cookies.agenceemail
       console.log(req.cookies.cassiernom)
       res.render('Caissier/acceuil', {nom: nom, telephone: telephone, email: email})
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
    }else{
      
      res.redirect("/Caissier/connection")
    }
 
     }
 ]

 //Page d 'Envoie de L argent par le Caissier 
 
exports.PageEnvoieargent  =  [

  async (req, res) => {
    
    if (req.cookies.cassiernom != null ) {

      try {  
        var code = codeargent.v4();
        var codeargents = code.slice(0, 5) ;
        
       var pays = await Lespays.selectpays();
       var ville = await Lesville.selectville();
       var nom = req.cookies.cassiernom;
       var telephone = req.cookies.agencetelephone;
       
       res.render('Caissier/Envoieargent', {lespays: pays, code: codeargents, lesville: ville, nom: nom, telephone: telephone})
      
     } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
    }else{
      res.redirect("/Caissier/connection")
    }

     }
 ]
//Recuperation d une Ville d un Pays
//Recuperer des ville 
exports.Uneville  =  [
  async (req, res) => {

   try {  
     var  paysid = req.params.idpays;
     var lesvilles = await Lesville.lesvilles(paysid)
console.log(lesvilles)
res.send({lesvilles: lesvilles})
    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ]
  //Recuperer la somme sans  frais 
exports.Unemonaie  =  [
  async (req, res) => {

   try {  
     var  lasomme = req.params.lasomme; //La Somme a Convertir 
     var  paysid = req.params.paysid; //l id Du Pays Receveur
     var idpays = req.cookies.caissieridpays // l Id du Pays Envoyeurs
     var monaies = await Lespays.unpays(idpays) //Recuperation de la devise du Pays ENvoyeur
     var frais =  null;
     
     var agenceid = req.cookies.caissieragencelier;
     //Verifions si l agence a du solde pour envoyer l argent
     //Recuperons le solde de L'agence 
     var soldeagence = await Agence.recupereunagence(agenceid);
     var agencesolde = soldeagence[0].solde ;

     //verifions si l argent peut etre envoyer 


      if ( paysid!== "" && !isEmpty(paysid) ) {
      
       
     //Recuperation du Frais  d envoie du Pays envoyeurs
      var lefrais = await Frais.unfrais(lasomme, monaies[0].devise ) 
      if (lefrais!== "" && !isEmpty(lefrais) ) {
      frais =   lefrais[0].frais;
     var fr = lefrais[0].frais;
     var ladevise = lefrais[0].monaie;
     fr = parseInt(fr);
     lasomme = parseInt(lasomme)
     var rt = lasomme - fr;
    // res.send({ soldeinsuffissant: "solde Insuffissant"  });
     //Veuillez 55
     //Verfions si les devises ne corresponde pas
     //unemonaiepays
     var monaierecevoir = rt;
     var monaieenvie = await Monaie.unemonaiepays(idpays)
     var monaiereceveur = await Monaie.unemonaiepays(paysid);
    var untaux = null;
    //Recuperons le montant a envoyer plus frais

    var montantplusfrais = lasomme + fr;
    console.log(montantplusfrais)

    //Verifions si l agence peut envoyer la sommme 
    if (agencesolde > montantplusfrais) {
      var gain = await Gain.lesgains();
    var gainprincipale = gain[0].super_agence;
    var gainretarait = gain[0].agenceretrait;
    var gaindepot = gain[0].agencedepot;
  
    var toto = gaindepot + gainprincipale + gainretarait;
    //departage des frais pour chaque Compartiment
    var fraisprincipale = ((frais * gainprincipale)/toto);
    var fraisdepot = ((frais * gaindepot)/toto);
    var fraisretrait = ((frais * gainretarait)/toto);
  
    
     if (monaieenvie[0].monaie != monaiereceveur[0].monaie ) {
       //Si les devise ne correspond pas on convertie la somme 
       //Recupperons le taux d'echanges 
        untaux = await Taux.untaux(monaieenvie[0].monaie, monaiereceveur[0].monaie);
       
    if ( !isEmpty(untaux)) {
      var m1 =  monaieenvie[0].monaie
       var v1 =  untaux[0].V1;
       var m2 =  monaiereceveur[0].monaie
       var v2 = untaux[0].V2;
       //SI Les Taux d
    var sommes =   convertion(m1, v1, m2, v2, rt);
    fraisretrait = convertion(m1, v1, m2, v2, fraisretrait );
  
    console.log(fraisretrait)
    
    console.log(fraisprincipale);
    monaierecevoir = sommes;
    res.send({fraisdepot : fraisdepot, fraisretrait : fraisretrait, fraisprincipale : fraisprincipale, lasomme: rt, ladevise: ladevise, devisereveur: m2, monaierecevoir: monaierecevoir, frais: frais})
  
    }else{
      //Inexistance du Taux de Convertion 
    
      res.send({erreurtaux: "Le taux de convertion n existes pas"})
     
    }
     }else{
      
    console.log(fraisdepot)  
    console.log(fraisretrait)
    console.log(fraisprincipale);
      //SI c'est la meme monaie 
      res.send({fraisdepot : fraisdepot, fraisretrait : fraisretrait, fraisprincipale : fraisprincipale, lasomme: rt, ladevise: ladevise, devisereveur: ladevise, monaierecevoir: monaierecevoir, frais: frais})
  
     }
      
    }else{
      res.send({ soldeinsuffissant: "solde Insuffissant"  });

    }
    
    
  
      } if (lefrais== "" &&  isEmpty(lefrais) ){
        //frais d envois de cette Somme N existe pas 
        res.send({erreurfrais: "Cette  somme ne peut pas etre envoyer car elle ne figure pas dans l'intervalle des sommes envoyer"})
      }
    }else {
      //le pays n'est pas selectionner
      console.log("veuillez selectionner un pays ");
      res.send({erreurpays: "Veuillez selctionnner un   pays"})
     
    }
      

   
    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ]
 //Requette pour envoyer  l argent 
  //Requette pour effectuer une transaction
  exports.EnvoieArgent =  [
    /*
  ce middelware permet de creer un compte adminiatrateur
    */
  
   body('expediteurnom').isLength({ min: 3}).withMessage('Veuilez bien saisir le nom de l expediteur long').trim(),
   body('receveurnom').isLength({ min: 3}).withMessage('Veuilez bien saisir le nom du receveur long').trim(),
   body('expediteurcontact').isNumeric().withMessage('Veuilez bien saisir le telephone de l expediteur').trim(),
   body('receveurcontact').isNumeric().withMessage('Veuilez bien saisir le telephone du receveur').trim(),
  
  async (req, res, next) => {
  
     // Extract the validation errors from a request.
     const errors = validator.validationResult(req);
     //les erreurs 
     var erreurauth = []
     var nomerreur = '';
     var matriculerreur = '';
     // Create a genre object with escaped and trimmed data
     if (!errors.isEmpty()) {
       // There are errors. Render the form again with sanitized values/error messages.
       var erreur = errors.array();
       res.render('Super admin/register', { erreur: erreur})
       
       return;
     }
     else {
       
        var expediteurnom = req.body.expediteurnom
        var receveurnom = req.body.receveurnom
        var expediteurcontact = req.body.expediteurcontact
        var receveurcontact = req.body.receveurcontact;
        var montant = req.body.montant;
        var code  = req.body.code;
        var piece = req.body.piece;
        var numerocarte = req.body.numerocarte;
        var paysdenvoie  = req.cookies.caissieridpays;
        var villedestination = req.body.villedestination;
        var paysdestination = req.body.paysdestination;
        var lesfrais = req.body.lesfrais;
        var montantdevise = req.body.monaieenvoie;
        var  montantlocale = req.body.monaierecevoir;
        var fraisprincipale = req.body.fraisprincipale;
        var fraisretrait = req.body.fraisretrait;
        var fraisdepot = req.body.fraisdepot;
        var agenceid = req.cookies.caissieragencelier; 
        var caissieridcaiss = req.cookies.caissieridcaiss;
        //Verifions si l agence a du solde pour envoyer l argent
        //Recuperons le solde de L'agence 
        var soldeagence = await Agence.recupereunagence(agenceid);
        var agencesolde = soldeagence[0].solde ;
  if (agencesolde >= montant) {
    const leclient = new Client({
      Nomexpediteur : expediteurnom,
      Contactexpediteur: expediteurcontact,
      Nomreceveur : receveurnom,
      Contactreceveur : receveurcontact,
      Carteidentite: piece,
      Numerocarte: numerocarte,
      paysdestionation: paysdestination,
      villedestination : villedestination
    });
  
    
    try {  
      var idinsert = await Client.inscription(leclient);
      var envoiepays = await Lespays.unpays(paysdenvoie);
      var destinationpays = await Lespays.unpays(paysdestination);
      var destinationville = await Lesville.uneville(villedestination);
       
      const transac = new Transaction({
        Datetransaction:  new Date(),
        Statue : 0,
        Agenceenvoieid : agenceid ,
        Sommeenvoie : montant,
        montantdevise: montantdevise,
        montantlocale : montantlocale,
        Codetransfert : code,
        Paysidenvoie : paysdenvoie,
        Clientid : idinsert,
        Frais : lesfrais,
        Fraisdepot : fraisdepot,
        Fraisretrait : fraisretrait,
        Fraisprincipale : fraisprincipale,
        Caissierids : caissieridcaiss
      })
      await Transaction.effectuer(transac)
      var nom = req.cookies.cassiernom;
      var telephone = req.cookies.cassiertelephone;
      
      //recuperer la devise du pays d'envoie 
      var devisedestination =  paysdestination
  
      res.send({ nomagence : nom, montantdevise : montantdevise, montantlocale: montantlocale, nomagence: nom, transac: transac, destinationville : destinationville[0]['ville'], destinationpays : destinationpays[0]['pays'],  envoiepays : envoiepays[0]['pays'], transac: transac, client: leclient });
       } catch(e) {
           console.log(e);
           res.sendStatus(500);
       }
    
  }else{
    //soldeinsuffissant
    res.send({ soldeinsuffissant: "solde Insuffissant",  });
    
  
  }
  
        
        
        //verifier si le matricule existe dans la base de donner
   
   
     }
   }
  ]
//PAge de Retrait d argent 
//Page retrait d'Argent 
exports.Pageretraitargent  =  [


  async (req, res) => {
    if (req.cookies.cassiernom != null ) {
      try {  
  
        var nom = req.cookies.cassiernom;
        var telephone = req.cookies.cassiertelephone; 
        var paysid = req.cookies.caissieridpays
       res.render('Caissier/Retraitargent', {paysid: paysid, nom: nom, telephone: telephone})
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    }else{
      
      res.redirect("/Caissier/connection")
    }

  
 
     }
 ]
 
// Validation de code 
exports.RetraitArgent =  [
  /*
ce middelware permet de creer un compte adminiatrateur
  */

 body('code').isLength({ min: 3}).withMessage("Veuillez entrez  un code égale à 5 caractéres ").trim(),
async (req, res, next) => {

   // Extract the validation errors from a request.
   const errors = validator.validationResult(req);
   //les erreurs 
   var erreurauth = []
   var nomerreur = '';
   var matriculerreur = '';
   // Create a genre object with escaped and trimmed data
   if (!errors.isEmpty()) {
     // There are errors. Render the form again with sanitized values/error messages.
     var erreur = errors.array();
     res.render('Agence/Retraitargent', { erreur: erreur})
     
     return;
   }
   else {
     
      var code = req.body.code
      var idpays = req.cookies.caissieridpays;
      var nom = req.cookies.cassiernom;
      var monaie1 = req.cookies.caissierdevise;
      var idAgenceenvoie = req.cookies.caissieragencelier;
      var agencedevise = req.cookies.caissierdevise;
      var agencepays = req.cookies.caissierpays;
      try {  
   
        var validecode = await Transaction.codevalide(code, idpays, idAgenceenvoie);
        //Code valide 
        console.log(validecode);
        if (validecode !== "" && !isEmpty(validecode) ) {
          if(validecode[0].Statue == 0){
            console.log(validecode[0])
            var sommes = validecode[0].Sommeenvoie;
            //Recuperation de la valeur de la monaie de l'expediteur 
            var monaie2 = validecode[0].monaie;
            //Recuperation de la valeur de la monaie du receveur
            
            //Si la moniae 1 et diferent de la monaie 2 on fait la convertion
            
           
       
            res.send({ agencedevise: agencedevise, paysagence : agencepays, transaction : validecode[0], nomagence: nom, sommes: sommes, devise: monaie1 });
          } 
          if (validecode[0].Statue == 1) {
            res.send({ invalidecode : "Le code est expiré  " });
          }
        }else{
          res.send({ codeerreurs : "Votre code ne correspond pas " });
        }
         } catch(e) {
             console.log(e);
             res.sendStatus(500);
         }
      //verifier si le matricule existe dans la base de donner
 
   }
 }
]
//Validation de code de Transaction

exports.Validationcode  = [
  /*
ce middelware permet de creer un compte adminiatrateur
  */

 
async (req, res, next) => {

  try {  
    var nom = req.cookies.cassiernom;
    var telephone = req.cookies.cassiertelephone
   
    var idtransaction = req.body.idtransaction;
    var datevalidation = new Date();
    var idagenceretrait = req.cookies.caissieragencelier;
    
    var caissieridcaiss = req.cookies.caissieridcaiss;
    //Recuperons dabord les frais de transaction et partageons la entre les agences
  var infotransaction =  await Transaction.recupefrais(idtransaction);
  //Envoies Argent com
           
  const Envoieatrans = new Envoieargenttrans({
    transactionid : infotransaction[0].idtransac,
    idagencenvoie: infotransaction[0].Agenceenvoieid,
    caissierenvoieid : infotransaction[0].Caissierids,
    commission : infotransaction[0].Fraisdepot, 
    compensation : 0,
    compenshistorique : null
         });
    //les  Retrait Argent com
  const Retraitcom = new RetraitArgentcom({
      idtransactr : infotransaction[0].idtransac,
      idagenceretrait: idagenceretrait,
      caissierretraitid : caissieridcaiss,
      commission: infotransaction[0].Fraisretrait,
      compensationr : 0,
      historiquercompensr : null 
           });
    // Les Comission principale
  const Comission = new Comissionprincipale({
        idtransactioncom : infotransaction[0].idtransac,
        comission: infotransaction[0].Fraisprincipale
             });
  await Envoieargenttrans.ajoutenvoieargent(Envoieatrans)
  await RetraitArgentcom.ajoutretraitargent(Retraitcom);
  //Ajout de La commission de L 'agence Principale 
  await Comissionprincipale.ajoutcomi(Comission)
  //Diminution et augmentation des Solde de l Agence d envoie 
  var soldediminuer = infotransaction[0].Sommeenvoie - infotransaction[0].Fraisdepot;
  await Agence.diminutionsolde(infotransaction[0].Agenceenvoieid , soldediminuer) 
  //augmentation du solde de l agence de retrait 
  var soldeaugmente = infotransaction[0].montantlocale + infotransaction[0].Fraisretrait;
  await Agence.augmentationsolde(idagenceretrait, soldeaugmente);
  
  await Transaction.validation(idtransaction, datevalidation);

   res.send({ success : "Validation" });   

    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
 }
]
//Tout les Transactions Journalier realiser 
exports.JournalierTransaction  =  [

  async (req, res) => {

    if (req.cookies.cassiernom != null ) { 

      try {  

        var nom = req.cookies.cassiernom;
        var telephone = req.cookies.cassiertelephone; 
        var paysid = req.cookies.caissieridpays
        var caissieridcaiss = req.cookies.caissieridcaiss;
        var agenceid = req.cookies.caissieragencelier;
        console.log(caissieridcaiss)

        var lestransactions = await Transaction.caissetransacagencetoutjournaliervalider(agenceid, caissieridcaiss)
        var toutcommissionretrait = await RetraitArgentcom.caissecommissionjourtretrait(agenceid, caissieridcaiss);
        var toutcommissiondedepot = await Envoieargenttrans.caissejournalierlescommissiondepot(agenceid, caissieridcaiss);
        var toutretraitagencetotal = await Transaction.caissejournalierlessommesretraitagence(agenceid , caissieridcaiss)
        var toutdepotagencetotal = await Transaction.caissierjournalierlessommesdepotagence(agenceid, caissieridcaiss)
   
        res.render('Caissier/transactionjournalier', {toutdepotagencetotal : toutdepotagencetotal[0] , toutretraitagencetotal: toutretraitagencetotal[0]  ,toutcommissiondedepot : toutcommissiondedepot[0],  toutcommissionretrait : toutcommissionretrait[0], agenceid : agenceid, lestransactions : lestransactions ,paysid: paysid, nom: nom})
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
    }else{

      res.redirect("/Caissier/connection")
    }
     }
 ]
 //Deconnection des Caissiers 
 
exports.Deconnecter =  [
    async (req, res) => {
  
     try {  
       res.clearCookie("cassiernom");
       res.clearCookie("cassierprenom");
       res.clearCookie("caissieragencelier");
       res.clearCookie("caissieridcaiss");
       res.clearCookie("caissierville");
       res.clearCookie("caissierpays");
       
       res.clearCookie("caissieridpays");
       res.clearCookie("caissierdevise");
          
       res.redirect("/Caissier/connection");

      } catch(e) {
           console.log(e);
           res.sendStatus(500);
       }
   
       }
   ]
