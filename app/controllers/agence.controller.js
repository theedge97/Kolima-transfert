let express = require('express')
let app = express()

let bodyParser = require('body-parser') //permet de parser les donner envoyer par posts
//let session = require("express-session") //permet d'appeler la session
const validator = require('express-validator');
const { body ,validationResult  } = require('express-validator');
const bcrypt = require("bcryptjs")//permet de hacher le mot de passe
const saltRounds = 10;
const codeargent = require("uuid");

const { toLower, isEmpty, upperCase, isArray, toInteger } = require('lodash');
const path = require("path");



//const cookieParser = require('cookie-parser')
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
const Caissiers = require("../models/superadmin/caissier.models.js");
const Compensationns = require("../models/superadmin/historiquecompensation.models.js");
const Tauxfraisenvoie = require("../models/superadmin/tauxfraisenvoie.models.js")
const Solderecharche = require("../models/superadmin/solderecharche.models.js");
const ListeTransfPays = require("../models/superadmin/listetransfertpays.models.js");
const e = require('express');
//Inscription d'un administrateur
 exports.Inscription =  [
  /*
ce middelware permet de creer un compte adminiatrateur
  */

 body('nom').isLength({ min: 3}).withMessage('Veuilez bien saisir un nom long').trim(),
 body('telephone').isNumeric().withMessage('Veuilez bien saisir un nombre').trim(),
 body('telephone').matches(/^6[1,2,5,6]{1}[0-9]{7}$/).withMessage('Veuilez bien saisir un numero valide').trim(),
 body('email').isEmail().withMessage('Veuilez bien saisir un email').normalizeEmail(),
 body('motdepasse', 'Veuillez saisir un mot de passe de plus de quatre caractere').isLength({ min: 4 }).trim(),
 body('motdepasse').custom((value, { req }) => {
  if (value !== req.body.motdepasse1) {
    throw new Error('les mots de passe ne sont pas identique');
  }
  
  // Indicates the success of this synchronous custom validator
  return true;
}),
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
     
      var nom = req.body.nom
      var email = req.body.email
      var motsdepasse = req.body.motsdepasse
      var telephone = req.body.telephone;
      
      try {  
        
       
         } catch(e) {
             console.log(e);
             res.sendStatus(500);
         }
      //verifier si le matricule existe dans la base de donner
 
 
   }
 }
]
//Connection de l'admin 
exports.Connection =  [
  /*
ce middelware permet de creer un compte
  */
 // verifie si le matricule est un nombre.
 body('telephone').isNumeric().withMessage('Veuilez bien saisir un numero valide').trim(),
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
      

      var connect = await Agence.Trouveragence(telephone)
     
    
      if (connect !== "" && !isEmpty(connect) ) {
    
      var vrai = await bcrypt.compareSync(req.body.motdepasse, connect[0]['motdepasse']);
      console.log(vrai) 
    
      if (vrai == true) {
        console.log(connect)
        if (connect[0]['statue'] == 1) {
            res.cookie('agencenom', connect[0]['nomagence'], {maxAge: 900000});
            res.cookie('agencenumero', connect[0]['numeroAgence'], {maxAge: 900000});
            res.cookie('agencetelephone', connect[0]['telephoneagence'], {maxAge: 900000});
            
            res.cookie('agenceid', connect[0]['idagence'], {maxAge: 900000});
            res.cookie('agenceville', connect[0]['ville'], {maxAge: 900000});
            res.cookie('agencepays', connect[0]['pays'], {maxAge: 900000});
            res.cookie('agenceidpays', connect[0]['idpays'], {maxAge: 900000});
            res.cookie('agencedevise', connect[0]['monaie'], {maxAge: 900000}); 
            
            res.cookie('agenceemail', connect[0]['emailagence'], {maxAge: 900000});
                  res.redirect("/Agence/Acceuil"); 
        }else{

            if (req.cookies.agencelangue == "En") {
      
              res.render('Agence/loginEn', {agencesuspense: "Votre agence est suspendue veuillez contacter l'administrateur"})
              }else{
                
              res.render('Agence/login', {agencesuspense: "Votre agence est suspendue veuillez contacter l'administrateur"})
              }
        }

      }else{
        if (req.cookies.agencelangue == "En") {
          var langue = req.cookies.agencelangue;
       
          res.render('Agence/loginEn',  {erreurmotpasse: "Votre mot de passe ne correspond pas", langue: langue})
          }else{
            
          res.render('Agence/login',   {erreurmotpasse: "Votre mot de passe ne correspond pas"})
          }
        
      } 
     
    }else{
      if (req.cookies.agencelangue == "En") {
        var langue = req.cookies.agencelangue;
        res.render('Agence/loginEn',  {erreurnumero: "Votre numero n'existe pas", langue : langue})
        }else{
          
        res.render('Agence/login',  {erreurnumero: "Votre numero n'existe pas"})
        }
      }
     
       } catch(e) {
           console.log(e);
           res.sendStatus(500);
       }
    //verifier si le matricule existe dans la base de donner

 
   } 
 }
]
//Page d'acceuuil de  l'agence
exports.Acceuil  =  [
    async (req, res) => {
  
      if (req.cookies.agencenom != null ) {

        try {  
          var nom = req.cookies.agencenom;
          var telephone = req.cookies.agencetelephone
          var email = req.cookies.agenceemail
         var langue = req.cookies.agencelangue;
   
        
         if (req.cookies.agencelangue == "En") {
      
          res.render('Agence/AcceuilEn', {nom: nom, telephone: telephone, email: email , langue : langue})
        }else{
            
          res.render('Agence/acceuil', {nom: nom, telephone: telephone, email: email, langue: langue})
        }
        } catch(e) {
              console.log(e);
              res.sendStatus(500);
          }
      }else{

        res.redirect("/Agence/connection")
      }
   
       }
   ]
   //Page Envoie d'argent
exports.PageEnvoieargent  =  [

  async (req, res) => {

    if (req.cookies.agencenom != null ) {
      
   try {  
    var nom = req.cookies.agencenom;
    var telephone = req.cookies.agencetelephone
    var agenceid = req.cookies.agenceid;
   var pays = await Lespays.selectpays();
   var ville = await Lesville.selectville();
   var lesclients = await Client.SelectClientAgenceid(agenceid)
   var langue = req.cookies.agencelangue;
   
   var email = req.cookies.agenceemail
   var lesmonaies = await Monaie.lesmonaies();
   if (req.cookies.agencelangue == "En") {
    var nombrealeatoir =Math.random();
    var code1 = codeargent.v4();
    const MY_NAMESPACE = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b';
      
    var krypt  = nom + nombrealeatoir + code1 + telephone;
    var code = codeargent.v5(krypt, MY_NAMESPACE);    
    var codeargents = code.slice(0, 8) ;
    res.render('Agence/EnvoieargentEn', {langue: langue, lesclients: lesclients, lesmonaies: lesmonaies, lespays: pays, code: codeargents, lesville: ville, nom: nom, telephone: telephone, email: email})

  }else{
    var nombrealeatoir =Math.random();
    var code1 = codeargent.v4();
    const MY_NAMESPACE = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b';
      
    var krypt  = nom + nombrealeatoir + code1 + telephone;
      var code = codeargent.v5(krypt, MY_NAMESPACE);
      
    var codeargents = code.slice(0, 8) ;
    res.render('Agence/Envoieargent', {langue: langue, lesclients : lesclients, lesmonaies: lesmonaies, lespays: pays, code: codeargents, lesville: ville, nom: nom, telephone: telephone, email: email})
 }
  
 } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }


    }else{

      res.redirect("/Agence/connection")
    }
     }
 ]
 //Requette pour effectuer une transaction
 exports.EnvoieArgent =  [
  /*
ce middelware permet de creer un compte adminiatrateur
  */

 body('expediteurnom').isLength({ min: 3}).withMessage('Veuilez bien saisir le nom de l expediteur long').trim(),
 body('receveurnom').isLength({ min: 3}).withMessage('Veuilez bien saisir le nom du receveur long').trim(),
 body('expediteurcontact').isNumeric().withMessage('Veuilez bien saisir le telephone de l expediteur').trim(),
 body('receveurcontact').isNumeric().withMessage('Veuilez bien saisir le telephone du receveur').trim(),
 body('monaieenvoie').isLength({ min: 1}).withMessage('Veuilez entrez la somme a envoyer').trim(),
 body('monaierecevoir').isLength({ min: 1}).withMessage('Veuilez Mentionner la somme a envoyer').trim(),
 body('fraisdepot').isLength({ min: 1}).withMessage('Veuilez Mentionner la somme a envoyer').trim(),
 body('fraisretrait').isLength({ min: 1}).withMessage('Veuilez Mentionner la somme a envoyer').trim(),
 body('fraisprincipale').isLength({ min: 1}).withMessage('Veuilez Mentionner la somme a envoyer').trim(),
 body('code').isLength({ min: 1}).withMessage('Veuilez Mentionner la somme a envoyer').trim(),
 body('piece').isLength({ min: 1}).withMessage('Veuilez Mentionner la somme a envoyer').trim(),


async (req, res, next) => {

   // Extract the validation errors from a request.
   const errors = validator.validationResult(req);
   //les erreurs 
   var erreurauth = []
   var nomerreur = '';
   var matriculerreur = '';
   // Create a genre object with escaped and trimmed data
   if (!errors.isEmpty()) {
    console.log(errors)
     // There are errors. Render the form again with sanitized values/error messages.
     var erreur = errors.array();
     res.render('Super_admin/register', { erreur: erreur})
     
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
      var paysdenvoie  = req.cookies.agenceidpays;
      var villedestination = req.body.villedestination;
      var paysdestination = req.body.paysdestination;
      var lesfrais = req.body.lesfrais;
      var montantdevise = req.body.monaieenvoie;
      var  montantlocale = req.body.monaierecevoir;
      var fraisprincipale = req.body.fraisprincipale;
      var fraisretrait = req.body.fraisretrait;
      var fraisdepot = req.body.fraisdepot;
      var agenceid = req.cookies.agenceid;
      var monaiepaysid = req.body.monaietransfertpays;
      //Verifions si l agence a du solde pour envoyer l argent
      //Recuperons le solde de L'agence 
      var soldeagence = await Agence.recupereunagence(agenceid);
      var agencesolde = soldeagence[0].solde ;
if (agencesolde >= montant) {
   var 	idclient = null;
   //Verifions si le client n  a jamais ete enregistrer dans la bdd
   var verifieclientid = await Client.Recupereridduclient(agenceid, expediteurcontact, receveurcontact);
  var  idinsert  = null;
  
  const leclient = new Client({
    Nomexpediteur : expediteurnom,
    Contactexpediteur: expediteurcontact,
    Nomreceveur : receveurnom,
    Contactreceveur : receveurcontact,
    Carteidentite: piece,
    Numerocarte: numerocarte,
    Agenceidlier : 	agenceid,
    paysdestionation: paysdestination,
    villedestination : villedestination
  });

   if (verifieclientid == null || verifieclientid == "") {
    
   idinsert = await Client.inscription(leclient);
    
  }else{
     idinsert = verifieclientid[0].idclient;
    
  }
   

  try {  
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
      monaiepaysid : monaiepaysid,
      Fraisprincipale : fraisprincipale,
      compensation : null
    })
    await Transaction.effectuer(transac)
    var soldediminuer = montant - fraisdepot;
    await Agence.diminutionsolde(agenceid, soldediminuer) 
    var nom = req.cookies.agencenom;
    var telephone = req.cookies.agencetelephone;
    var email = req.cookies.agenceemail;
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
//Page retrait d'Argent 
exports.PageRetraitargent  =  [

  async (req, res) => {

    if (req.cookies.agencenom != null ) {
      
   try {  
  
    var nom = req.cookies.agencenom;
    var telephone = req.cookies.agencetelephone
    var email = req.cookies.agenceemail
    var paysid = req.cookies.agenceidpays
    var langue = req.cookies.agencelangue;
   
   if (req.cookies.agencelangue == "En") {
      
    res.render('Agence/RetraitSommeEn', {langue: langue, paysid: paysid, nom: nom, telephone: telephone, email: email})
  
  }else{
      
    res.render('Agence/RetraitSomme', {langue: langue, paysid: paysid, nom: nom, telephone: telephone, email: email})
  
  } 
  
  } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }


    }else{
      

      res.redirect("/Agence/connection")

    }
     }
 ]

// Validation de code 


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
      var idpays = req.cookies.agenceidpays
      var nom = req.cookies.agencenom;
      var monaie1 = req.cookies.agencedevise;
      var idAgenceenvoie = req.cookies.agenceid;
      var agencedevise = req.cookies.agencedevise;
      var agencepays = req.cookies.agencepays;
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
//mien 
//retrait
exports.Validationcode  = [
  /*
ce middelware permet de creer un compte adminiatrateur
  */
async (req, res, next) => {

  try {  
    var nom = req.cookies.agencenom;
    var telephone = req.cookies.agencetelephone
    var email = req.cookies.agenceemail
    var idtransaction = req.body.idtransaction;
    var datevalidation = new Date();
    var idagenceretrait = req.cookies.agenceid;
    //Recuperons dabord les frais de transaction et partageons la entre les agences
  var infotransaction =  await Transaction.recupefrais(idtransaction);
  //Envoies Argent com
           
  const Envoieatrans = new Envoieargenttrans({
    transactionid : infotransaction[0].idtransac,
    idagencenvoie: infotransaction[0].Agenceenvoieid,
    commission : infotransaction[0].Fraisdepot,
    compensation : 0,
    compenshistorique : null
         });
    //les  Retrait Argent com
  const Retraitcom = new RetraitArgentcom({
      idtransactr : infotransaction[0].idtransac,
      idagenceretrait: idagenceretrait,
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
  //Ajout de La commission de L agence Principale 
  await Comissionprincipale.ajoutcomi(Comission)
  //Diminution et augmentation des Solde de l Agence d envoie 
  //var soldediminuer = infotransaction[0].Sommeenvoie - infotransaction[0].Fraisdepot;
 // await Agence.diminutionsolde(infotransaction[0].Agenceenvoieid , soldediminuer) 
  //augmentation du solde de l agence de retrait 
  var soldeaugmente = infotransaction[0].montantlocale + infotransaction[0].Fraisretrait;
  await Agence.augmentationsolde(idagenceretrait, soldeaugmente);
  
  await Transaction.validation(idtransaction, datevalidation)
 
  res.send({success : "Validation de code"})
 
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
 }
]
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
 //Recuperer les Monaie d un Pays 
 exports.MonaiedunPays   =  [
  async (req, res) => {

   try {  
     var  paysid = req.params.idpays;
     var lesmonaiedupays = await ListeTransfPays.selectlisteuntransfert(paysid);
console.log(lesmonaiedupays)
res.send({lesmonaiedupays: lesmonaiedupays})
    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ]
 //recuperation de la somme sans frais d'envoie 
 //Recuperer la somme sans  frais 
exports.Unemonaie  =  [
  async (req, res) => {

   try {  
     var  lasomme = req.params.lasomme; //La Somme a Convertir 
     var  paysid = req.params.paysid; //l id Du Pays Receveur
     var idpays = req.cookies.agenceidpays // l Id du Pays Envoyeurs
     var monaies = await Lespays.unpays(idpays) //Recuperation de la devise du Pays ENvoyeur
     var frais =  null;
     
     var agenceid = req.cookies.agenceid;
     //Verifions si l agence a du solde pour envoyer l argent
     //Recuperons le solde de L'agence 
     var soldeagence = await Agence.recupereunagence(agenceid);
     var agencesolde = soldeagence[0].solde ;

     //verifions si l argent peut etre envoyer 


      if ( paysid !==  'null'  ) {
      
       
     //Recuperation du Frais  d envoie du Pays envoyeurs
    //Recuperont le Pourcentage de Frais D envoies d une Monaies
    var letaux = await Tauxfraisenvoie.SelectTaux(monaies[0].devise)
   var t = letaux[0].letaux;
   console.log(t)
    var lefrais = (lasomme* parseInt(t))/100; 

    if (letaux!== "" && !isEmpty(letaux) ) {
    var  frais =   lefrais;
     var fr = lefrais;
     fr = parseInt(fr);
     lasomme = parseInt(lasomme)
     var rt = lasomme - fr;
     console.log(lefrais)
   
     //Verfions si les devises ne corresponde pas
     //unemonaiepays
     var monaierecevoir = rt;
     var monaieenvie = await Monaie.unemonaiepays(idpays)
     var monaiereceveur = await Monaie.unemonaiepays(paysid);
    var untaux = null;
    var ladevise = monaieenvie[0].monaie; 

    //Recuperons le montant a envoyer plus frais

    var montantplusfrais = lasomme + lefrais;

    //Verifions si l agence peut envoyer la sommme 
    if (agencesolde >= montantplusfrais) {
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
    if (monaieenvie[0].monaie !== "GNF") {
      var toprincipale = await Taux.untaux(monaieenvie[0].monaie, "GNF");
       
      fraisprincipale = convertion(monaieenvie[0].monaie, toprincipale[0].V1, "GNF", toprincipale[0].V2, fraisprincipale);
   
    }
   
    monaierecevoir = sommes;
    res.send({fraisdepot : fraisdepot, fraisretrait : fraisretrait, fraisprincipale : fraisprincipale, lasomme: rt, ladevise: ladevise, devisereveur: m2, monaierecevoir: monaierecevoir, frais: frais})
  
    }else{
      //Inexistance du Taux de Convertion 
    
      res.send({erreurtaux: "Le taux de convertion n existes pas"})
     
    }
     }else{
      
      //SI c'est la meme monaie 
      res.send({fraisdepot : fraisdepot, fraisretrait : fraisretrait, fraisprincipale : fraisprincipale, lasomme: rt, ladevise: ladevise, devisereveur: ladevise, monaierecevoir: monaierecevoir, frais: frais})
  
     }
      
    }else{
      res.send({ soldeinsuffissant: "solde Insuffissant"  });

    }
    
    
  
      } if (letaux== "" &&  isEmpty(letaux) ){
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
//Page de Rectification d une Transaction
exports.Rectification  =  [

  async (req, res) => {

    if (req.cookies.agencenom != null ) {
      
   try {  
  
    var nom = req.cookies.agencenom;
    var telephone = req.cookies.agencetelephone
    var email = req.cookies.agenceemail
    var paysid = req.cookies.agenceidpays;
    var langue = req.cookies.agencelangue;
   
   if (req.cookies.agencelangue == "En") {
      
    res.render('Agence/RectificationEn', {langue: langue, paysid: paysid, nom: nom, telephone: telephone, email: email})
    
  }else{
    res.render('Agence/Rectification', {langue: langue, paysid: paysid, nom: nom, telephone: telephone, email: email})
  
  }   
  } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }


     }
    else{
      
      res.redirect("/Agence/connection")

    }
     }
 ]
 //Reccuperation des Informations Du Client
exports.ClientInforRecupe  =  [

  async (req, res) => {

    if (req.cookies.agencenom != null ) {
      
   try {  
  
    var nom = req.cookies.agencenom;
    var telephone = req.cookies.agencetelephone
    var email = req.cookies.agenceemail
    var paysid = req.cookies.agenceidpays
    var agenceid = req.cookies.agenceid;
    var telephoneenvoyeur = req.params.telephoneenvoyeur;
    var InfoClient = await Client.recupererInfo(telephoneenvoyeur , agenceid)
  if (InfoClient !== "" && !isEmpty(InfoClient) ) {
    if (req.cookies.agencelangue == "En") {
      res.send({InfoClient: InfoClient[0]}) 
     }else{
      res.send({InfoClient: InfoClient[0]}) 
     }  
  }
    
  } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }


     }
    else{
      
      res.redirect("/Agence/connection")

    }
     }
 ]

// Rectification des Informations d 'une transaction
exports.RectifTransactionCode =  [
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
      var idpays = req.cookies.agenceidpays
      var nom = req.cookies.agencenom;
      var monaie1 = req.cookies.agencedevise;
      var idAgenceenvoie = req.cookies.agenceid;
      var agencedevise = req.cookies.agencedevise;
      var agencepays = req.cookies.agencepays;
      try {  
   
        var validecode = await Transaction.rectifetransactioninfo(code,  idAgenceenvoie);
        //Code valide 
        if (validecode !== "" && !isEmpty(validecode) ) {
         
            console.log(validecode[0])
            var sommes = validecode[0].Sommeenvoie;
            //Recuperation de la valeur de la monaie de l'expediteur 
            var monaie2 = validecode[0].monaie;
            //Recuperation de la valeur de la monaie du receveur
            res.send({ agencedevise: agencedevise, paysagence : agencepays, transaction : validecode[0], nomagence: nom, sommes: sommes, devise: monaie1 });
          
         
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
//Rectification des Information d une Transaction

exports.InformationTransacModifier =  [
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
      var numerocarte = req.body.numerocarte;
      var idclient = req.body.idclient;
   await   Client.ModifierInfoClient(expediteurnom, expediteurcontact, receveurnom, receveurcontact, numerocarte, idclient);
     console.log("Modification effectuer ")
     res.send({valide : "Information Modifier "})   
   }
 }
]
//Page De Rapport de Transaction  de Depot 

exports.RapportTransactionADate  =  [

  async (req, res) => {

    if (req.cookies.agencenom != null ) {
      
   try {  
  
    var nom = req.cookies.agencenom;
    var telephone = req.cookies.agencetelephone
    var email = req.cookies.agenceemail
    var paysid = req.cookies.agenceidpays;
    var agenceid =  req.cookies.agenceid;
    var langue = req.cookies.agencelangue;
   
    var lestransactions = await Transaction.transacadateagence(agenceid);
  console.log(lestransactions)
  if (req.cookies.agencelangue == "En") {
 
    res.render('Agence/RapportTradateEn', {langue: langue, lestransactions : lestransactions ,paysid: paysid, nom: nom, telephone: telephone, email: email})
      
  }else{
  
    res.render('Agence/RapportTradate', {langue: langue, lestransactions : lestransactions ,paysid: paysid, nom: nom, telephone: telephone, email: email})
   
  }   
   } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }


     }else{

      res.redirect("/Agence/connection")
    }
     }
 ]
 //Page des Rapports des Transactions de Depot Entre Deux Dates
 exports.RapportTransactionDeuxDate  =  [

  async (req, res) => {

    if (req.cookies.agencenom != null ) {

      try {  
  
        var nom = req.cookies.agencenom;
        var telephone = req.cookies.agencetelephone
        var email = req.cookies.agenceemail
        var paysid = req.cookies.agenceidpays;
        var agenceid =  req.cookies.agenceid;
        var langue = req.cookies.agencelangue;
   
        var lestransactions = await Transaction.transacadateagence(agenceid);
       if (req.cookies.agencelangue == "En") {
 
        res.render('Agence/RapportTrdeuxdateEn', {langue: langue, lestransactions : lestransactions ,paysid: paysid, nom: nom, telephone: telephone, email: email})
         
        }else{
        
          res.render('Agence/RapportTrdeuxdate', {langue: langue, lestransactions : lestransactions ,paysid: paysid, nom: nom, telephone: telephone, email: email})
        }  
      } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
     }else{

      res.redirect("/Agence/connection")
    }
     }
 ]

 //Rapports Recherches  des Teansactions de Depot entre deux dates 
exports.RechRapportTrDeuxDate =  [
  /*
ce middelware permet de creer un compte adminiatrateur
  */


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
     res.render('Super admin/RapportTrdeuxdate', { erreur: erreur})
     
     return;
   }
   else {
     
      var datedebut = req.body.datedebut
      var datefin = req.body.datefin
      
     var agenceid =  req.cookies.agenceid;
     var transactdatedeux = await Transaction.transacadeuxdateagence(agenceid, datedebut, datefin);
     console.log(transactdatedeux)

     res.send({transactdatedeux : transactdatedeux, debut: datedebut, fin: datefin})

      
 
   }
 }
]
//Transaction de Retrait  d une Agence Journalier 
exports.RapportTransactionDeRetraitAdate  =  [

  async (req, res) => {

    if (req.cookies.agencenom != null ) { 

      try {  
  
        var nom = req.cookies.agencenom;
        var telephone = req.cookies.agencetelephone
        var email = req.cookies.agenceemail
        var paysid = req.cookies.agenceidpays;
        var agenceid =  req.cookies.agenceid;
        var langue = req.cookies.agencelangue;
   
        var lesretraits = await Transaction.transacretraitadateagence(agenceid)
        if (req.cookies.agencelangue == "En") {
 
          res.render('Agence/RapportRetraitTradateEn', {langue: langue, lesretraits : lesretraits ,paysid: paysid, nom: nom, telephone: telephone, email: email})
         
          }else{
          
            res.render('Agence/RapportRetraitTradate', {langue: langue, lesretraits : lesretraits ,paysid: paysid, nom: nom, telephone: telephone, email: email})
       
          }  
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
    }else{
      
      res.redirect("/Agence/connection")

    }
     }
 ]

 //Page des Rapports des Transactions de Retrait  Entre Deux Dates
 exports.RapportTransactionRetraitDeuxDate  =  [

  async (req, res) => {

    if (req.cookies.agencenom != null ) { 

      try {  
  
        var nom = req.cookies.agencenom;
        var telephone = req.cookies.agencetelephone
        var email = req.cookies.agenceemail
        var paysid = req.cookies.agenceidpays;
        var agenceid =  req.cookies.agenceid;
        var langue = req.cookies.agencelangue;
   
        var lestransactions = await Transaction.transacadateagence(agenceid);
      console.log(lestransactions)
        if (req.cookies.agencelangue == "En") {
 
          res.render('Agence/RapportTrRetraitdeuxdateEn', {langue: langue, lestransactions : lestransactions ,paysid: paysid, nom: nom, telephone: telephone, email: email})
        
          }else{
          
            res.render('Agence/RapportTrRetraitdeuxdate', {langue: langue, lestransactions : lestransactions ,paysid: paysid, nom: nom, telephone: telephone, email: email})
       
          }    
      } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
     }else{

      res.redirect("/Agence/connection")
    }
     }
 ]
 //Rapports Recherches  des Teansactions de Retraits  entre deux dates 
 exports.RechRapportTrRetraitDeuxDate =  [
  /*
ce middelware permet de creer un compte adminiatrateur
  */


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
     res.render('Super admin/RapportTrdeuxdate', { erreur: erreur})
     
     return;
   }
   else {
     
      var datedebut = req.body.datedebut
      var datefin = req.body.datefin
      
     var agenceid =  req.cookies.agenceid;
     var transactdatedeux = await Transaction.transacretraitdeuxdateagence(agenceid, datedebut, datefin);
     console.log(transactdatedeux)

     res.send({transactdatedeux : transactdatedeux, debut: datedebut, fin: datefin})

      
 
   }
 }
]
//Selectionner toout les Tranasaction que xa soit depot ou retrait 

exports.ToutTransactionRetraitDepot  =  [

  async (req, res) => {

    if (req.cookies.agencenom != null ) { 

      try {  
  
        var nom = req.cookies.agencenom;
        var telephone = req.cookies.agencetelephone
        var email = req.cookies.agenceemail
        var paysid = req.cookies.agenceidpays;
        var agenceid =  req.cookies.agenceid;
        var langue = req.cookies.agencelangue;
   
        var lestransactions = await Transaction.transacagencetoutvalider(agenceid)
        var toutcommissionretrait = await RetraitArgentcom.sommetoutcommission(agenceid);
        var toutcommissiondedepot = await Envoieargenttrans.toutlescommissiondepot(agenceid);
        var toutretraitagencetotal = await Transaction.toutlessommesretraitagence(agenceid)
        var toutdepotagencetotal = await Transaction.toutlessommesdepotagence(agenceid)
        if (req.cookies.agencelangue == "En") {
          res.render('Agence/ToutTransactionEn', {langue: langue, toutdepotagencetotal : toutdepotagencetotal[0] , toutretraitagencetotal: toutretraitagencetotal[0]  ,toutcommissiondedepot : toutcommissiondedepot[0],  toutcommissionretrait : toutcommissionretrait[0], agenceid : agenceid, lestransactions : lestransactions ,paysid: paysid, nom: nom, telephone: telephone, email: email})
       
        }else{
          res.render('Agence/ToutTransaction', {langue: langue, toutdepotagencetotal : toutdepotagencetotal[0] , toutretraitagencetotal: toutretraitagencetotal[0]  ,toutcommissiondedepot : toutcommissiondedepot[0],  toutcommissionretrait : toutcommissionretrait[0], agenceid : agenceid, lestransactions : lestransactions ,paysid: paysid, nom: nom, telephone: telephone, email: email})
      
        } 
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
    }else{

      res.redirect("/Agence/connection")
    }
     }
 ]
 //Selectioner Tout les Transaction Depot et Retrait Journalier d une Agence 
 exports.JournalierTransactionRetraitDepot  =  [

  async (req, res) => {

    if (req.cookies.agencenom != null ) { 

      try {  
  
        var nom = req.cookies.agencenom;
        var telephone = req.cookies.agencetelephone
        var email = req.cookies.agenceemail
        var paysid = req.cookies.agenceidpays;
        var agenceid =  req.cookies.agenceid;
        var langue = req.cookies.agencelangue;
   
        var lestransactions = await Transaction.transacagencetoutjournaliervalider(agenceid)
        var toutcommissionretrait = await RetraitArgentcom.commissionjourtretrait(agenceid);
        var toutcommissiondedepot = await Envoieargenttrans.journalierlescommissiondepot(agenceid);
        var toutretraitagencetotal = await Transaction.journalierlessommesretraitagence(agenceid)
        var toutdepotagencetotal = await Transaction.journalierlessommesdepotagence(agenceid)
        if (req.cookies.agencelangue == "En") {
          res.render('Agence/ToutTransactionJournalierEn', {langue: langue, toutdepotagencetotal : toutdepotagencetotal[0] , toutretraitagencetotal: toutretraitagencetotal[0]  ,toutcommissiondedepot : toutcommissiondedepot[0],  toutcommissionretrait : toutcommissionretrait[0], agenceid : agenceid, lestransactions : lestransactions ,paysid: paysid, nom: nom, telephone: telephone, email: email})
           
        }else{
          res.render('Agence/ToutTransactionJournalier', {langue: langue, toutdepotagencetotal : toutdepotagencetotal[0] , toutretraitagencetotal: toutretraitagencetotal[0]  ,toutcommissiondedepot : toutcommissiondedepot[0],  toutcommissionretrait : toutcommissionretrait[0], agenceid : agenceid, lestransactions : lestransactions ,paysid: paysid, nom: nom, telephone: telephone, email: email})
       
        } 
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
    }else{

      res.redirect("/Agence/connection")
    }
     }
 ]
 //Page Pour Selectionner les Transaction Depot et Retrait entre Deux Date 
 
exports.ToutTransactionEntreDeuxDateRetraitDepot  =  [

  async (req, res) => {

    if (req.cookies.agencenom != null ) { 
      
   try {  
  
    var nom = req.cookies.agencenom;
    var telephone = req.cookies.agencetelephone
    var email = req.cookies.agenceemail
    var paysid = req.cookies.agenceidpays;
    var agenceid =  req.cookies.agenceid;
    var langue = req.cookies.agencelangue;
   
    var lestransactions = await Transaction.transacadateagence(agenceid);
    if (req.cookies.agencelangue == "En") {
      res.render('Agence/ToutTransacDeuxdateEn', {langue: langue, lestransactions : lestransactions ,paysid: paysid, nom: nom, telephone: telephone, email: email})
   
    }else{
      res.render('Agence/ToutTransacDeuxdate', {langue: langue, lestransactions : lestransactions ,paysid: paysid, nom: nom, telephone: telephone, email: email})
   
    } 
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }


    }else{

      res.redirect("/Agence/connection")
    }
     }
 ]
 //Selection tout les Transactions Depot et Retrait entre Deux Dates 
 exports.RechToutTransacEntreDeuxDate =  [
  /*
ce middelware permet de creer un compte adminiatrateur
  */


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
     res.render('Super admin/ToutTransacDeuxdate', { erreur: erreur})
     
     return;
   }
   else {
     
      var datedebut = req.body.datedebut
      var datefin = req.body.datefin
      
     var agenceid =  req.cookies.agenceid;
     var transactdatedeux = await Transaction.transacagencetoutdeuxdatevalider(agenceid, datedebut, datefin);
     var deuxdatetoutcommissiondedepot = await Envoieargenttrans.deuxdateslescommissiondepot(agenceid, datedebut, datefin);
   var deuxdatelessommesdepotagence = await Transaction.deuxdatelessommesdepotagences(agenceid, datedebut, datefin);
   var deuxdateslessommesretraitagence = await Transaction.deuxdateslessommesretraitagence(agenceid, datedebut, datefin)
   var commissiondeuxdateretrait = await RetraitArgentcom.commissiondeuxdateretrait(agenceid, datedebut , datefin)  
   console.log(commissiondeuxdateretrait)
     res.send({commissiondeuxdateretrait : commissiondeuxdateretrait[0], deuxdateslessommesretraitagence : deuxdateslessommesretraitagence[0], deuxdatelessommesdepotagence : deuxdatelessommesdepotagence[0] , deuxdatetoutcommissiondedepot : deuxdatetoutcommissiondedepot[0], agenceid : agenceid , transactdatedeux : transactdatedeux, debut: datedebut, fin: datefin})

      
 
   }
 }
]
//La Liste des Caissiers 
exports.LesCaissiers  =  [

  async (req, res) => {

    if (req.cookies.agencenom != null ) {  

      try {  
  
        var nom = req.cookies.agencenom;
        var telephone = req.cookies.agencetelephone
        var email = req.cookies.agenceemail
        var paysid = req.cookies.agenceidpays;
        var agenceid =  req.cookies.agenceid;
        var langue = req.cookies.agencelangue;
   
        var lescaissier = await Caissiers.lescaissierdunagence(agenceid);
        console.log(lescaissier)
        if (req.cookies.agencelangue == "En") {
          res.render('Agence/LescaissierEn', {langue: langue, lescaissier : lescaissier, nom: nom, telephone: telephone, email: email})
       
        }else{
          res.render('Agence/Lescaissier', {langue: langue, lescaissier : lescaissier, nom: nom, telephone: telephone, email: email})
       
        } 
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
    }else{

      res.redirect("/Agence/connection")
    }
     }
 ]
 //Creation d un Compte de Caissier 
 exports.CreationCaisse =  [
  /*
ce middelware permet de creer un compte adminiatrateur
  */


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
     res.render('Super admin/ToutTransacDeuxdate', { erreur: erreur})
     
     return;
   }
   else {
     

    try{

      var nom = req.body.nom;
      var prenom = req.body.prenom;
      var telephone = req.body.telephone;
      var genre = req.body.genre;
      var motdepasse = req.body.motdepasse;
      var hasher =  await  bcrypt.hashSync(motdepasse, 10, (err, hash) => {
        if (err) {
          console.error(err)
          return
        }
      })
      
     var agenceid =  req.cookies.agenceid;
      const Lacaisse =  new Caissiers({
        nomcaissier : nom,
        prenomcaissier : prenom,
        telephonecaissier  : telephone,
        genre : genre,
        motdepasse : hasher,
        agencelier : agenceid,
        statue: 1
      })

      await Caissiers.ajoutcaisse(Lacaisse);
      

      res.send({ success: "Enregister"})

    } catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
      
     

        
 
   }
 }
]
//Voir les Details d un Compte d un Agent Caisse 

exports.DetailsAgentCaisses =  [
  async (req, res) => {

    if (req.cookies.agencenom != null ) {  
      try {  
        var nom = req.cookies.adminnom;
        var telephone = req.cookies.admintelephone
        var email = req.cookies.adminemail;
        var langue = req.cookies.agencelangue;
   
        var idcaiss = req.params.idcaiss;
        var lecaissier = await Caissiers.selectlecaissier(idcaiss);
        if (req.cookies.agencelangue == "En") {
          res.render('Agence/DetailscaissierEn', {langue: langue, lecaissier: lecaissier[0], nom: nom, telephone: telephone, email: email})
       
        }else{
          res.render('Agence/Detailscaissier', {langue: langue, lecaissier: lecaissier[0], nom: nom, telephone: telephone, email: email})
       
        } 
       
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
    }else{

      res.redirect("/Agence/connection")
    }
 
     }
 ]

 //Mise a jour des Informations du Caisssier
 exports.MajCaissier =  [



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
     res.render('Super admin/ToutTransacDeuxdate', { erreur: erreur})
     
     return;
   }
   else {
     

    try{

      var nom = req.body.nom;
      var prenom = req.body.prenom;
      var telephone = req.body.telephone;
      var genre = req.body.genre;
      var idcaisse = req.body.idcaisse;
    

      await Caissiers.majinfocaissier(idcaisse, nom, prenom, telephone, genre)

      

      res.send({ success: "Enregister"})

    } catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
        
 
   }
 }
]
//Modification du Mot de passe d un Caissier
exports.MajMotdepasse =  [



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
       res.render('Super admin/ToutTransacDeuxdate', { erreur: erreur})
       
       return;
     }
     else {
       
  
      try{
  
        var motdepassemaj = req.body.motdepassemaj;
       
        var idcaisse = req.body.idcaisse;
        var hasher =  await  bcrypt.hashSync(motdepassemaj , 10, (err, hash) => {
          if (err) {
            console.error(err)
            return
          }
        })
  
        await Caissiers.majmotpasse(idcaisse, hasher)
  
        
  
        res.send({ success: "Enregister"})
  
      } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
        
       
  
          
   
     }
   }
  ]
 //Changement du Statue d un Compte de  Caissier
exports.ChangementStatueCaissier =  [
  async (req, res) => {

   try {  
     var idtype = req.params.idtype;
     var idcaiss = req.params.idcaiss;
     await Caissiers.changestatue(idcaiss, idtype)
  
        
    
    res.redirect('/Agence/Lescaissiers')
     } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ]
 
   //Deconnection du compte de l agence 
   exports.Deconnecter =  [
    async (req, res) => {
  
     try {  
       res.clearCookie("agencenom");
       res.clearCookie("agencenumero");
       res.clearCookie("agencetelephone");
       res.clearCookie("agenceid");
       res.clearCookie("agenceville");
       res.clearCookie("agencepays");
       
       res.clearCookie("agencedevise");
       res.clearCookie("agenceidpays");
       
       res.clearCookie("agenceemail");
           
       res.redirect("/Agence/connection");

      } catch(e) {
           console.log(e);
           res.sendStatus(500);
       }
   
       }
   ]

//Historique de Compensation  d une Agence 
exports.Historitoutcompenser  =  [

  async (req, res) => {

    if (req.cookies.agencenom != null ) {
      
   try {  
  
    var nom = req.cookies.agencenom;
    var telephone = req.cookies.agencetelephone
    var email = req.cookies.agenceemail
    var paysid = req.cookies.agenceidpays
    var agenceid = req.cookies.agenceid
    var langue = req.cookies.agencelangue;
   
    var compensehistorik = await  Compensationns.historiqueagencecompenser(agenceid); 
    if (req.cookies.agencelangue == "En") {
      res.render('Agence/historiquecompensationEn', {langue: langue, agenceid: agenceid, compensehistorik :  compensehistorik, paysid: paysid, nom: nom, telephone: telephone, email: email})
   
    }else{
      res.render('Agence/historiquecompensation', {langue: langue, agenceid: agenceid, compensehistorik :  compensehistorik, paysid: paysid, nom: nom, telephone: telephone, email: email})
   
    } 
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }


    }else{
      

      res.redirect("/Agence/connection")

    }
     }
 ]
//Facure de Compensatin d une Agence 
exports.FactureCompensationsAgenceshistorie =  [
  async (req, res) => {

    if (req.cookies.agencenom != null ) {
      try {  
        var nom = req.cookies.agencenom;
    var telephone = req.cookies.agencetelephone
    var email = req.cookies.agenceemail
    var paysid = req.cookies.agenceidpays
    var agenceid = req.cookies.agenceid;
    var langue = req.cookies.agencelangue;
   
        var idcompensation = req.params.idcompensation
        var lesdepotcomp = await Envoieargenttrans.historiquecompeseragence(idcompensation ,  agenceid)
     
      var lesretraits = await  RetraitArgentcom.historiretraitcompenser(idcompensation,  agenceid)
       var unecompensation = await Compensationns.infohistocomp(idcompensation)
       if (req.cookies.agencelangue == "En") {
     
        res.render('Agence/facturecompensationEn', {langue: langue, unecompensation : unecompensation[0], lesretraits : lesretraits,  lesdepotcomp : lesdepotcomp,  nom: nom, telephone: telephone, email: email})
      }else{
     
        res.render('Agence/facturecompensation', {langue: langue, unecompensation : unecompensation[0], lesretraits : lesretraits,  lesdepotcomp : lesdepotcomp,  nom: nom, telephone: telephone, email: email})
        
      } } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
    }else{

      res.redirect("/Agence/connection")
    }
   
     }
 ]
 //Parametrage d une Agence 
 exports.Parametrage  =  [
  async (req, res) => {
    
    if (req.cookies.agencenom != null ) {
      
   try {  
    
    var nom = req.cookies.agencenom;
    var telephone = req.cookies.agencetelephone
    var email = req.cookies.agenceemail
    var paysid = req.cookies.agenceidpays
    var agenceid = req.cookies.agenceid
    var unagence = await Agence.recupereunagence(agenceid)
    var langue = req.cookies.agencelangue;
   
     var historiquerecharge = await Solderecharche.historiquerecharge(agenceid);
     var toutlesdepots = await  Envoieargenttrans.toutdepotdunagence(agenceid);
     var nbreretraittout = await RetraitArgentcom.nbreretraitunagence(agenceid);
      var sommetoutcommissionretrait = await RetraitArgentcom.sommetoutcommission(agenceid);
      var sommetoutcommissiondepot = await  Envoieargenttrans.toutlescommissiondepot(agenceid)
      var jourcommissiondepot = await  Envoieargenttrans.jourcommissiondepot(agenceid);
    var semainecommissiondepot = await  Envoieargenttrans.semainecommissiondepot(agenceid);
    var mensuelcommissiondepot = await  Envoieargenttrans.mensuelcommissiondepot(agenceid);
    var nbredepotjour = await  Envoieargenttrans.nbredepotjour(agenceid);
    var nbredepotsemaine = await  Envoieargenttrans.nbredepotsemaine(agenceid);
    var nbredepotmensuel  = await  Envoieargenttrans.nbredepotmensuel(agenceid);
    var nbreretraitjour = await RetraitArgentcom.nbreretraitjour(agenceid);
    var nbreretraithebdommadaire = await RetraitArgentcom.nbreretraithebdommadaire(agenceid)
     var nbreretraitmensuel = await RetraitArgentcom.nbreretraitmensuel(agenceid); 
    var commissionjourtretrait = await RetraitArgentcom.commissionjourtretrait(agenceid);
    var commissionsemainetretrait = await RetraitArgentcom.commissionsemainetretrait(agenceid);
    var commissionmensuelretrait = await RetraitArgentcom.commissionmensuelretrait(agenceid)
    if (req.cookies.agencelangue == "En") {
      res.render('Agence/parametreEn', {langue: langue, unagence: unagence, commissionmensuelretrait : commissionmensuelretrait[0], commissionsemainetretrait : commissionsemainetretrait[0], commissionjourtretrait: commissionjourtretrait[0] ,nbreretraitmensuel : nbreretraitmensuel[0], nbreretraithebdommadaire : nbreretraithebdommadaire[0],nbreretraitjour : nbreretraitjour[0], nbredepotmensuel : nbredepotmensuel[0]  ,nbredepotsemaine : nbredepotsemaine[0] ,nbredepotjour : nbredepotjour[0] ,mensuelcommissiondepot : mensuelcommissiondepot[0], semainecommissiondepot : semainecommissiondepot[0] ,jourcommissiondepot: jourcommissiondepot[0],  sommetoutcommissiondepot : sommetoutcommissiondepot[0] , sommetoutcommissionretrait : sommetoutcommissionretrait[0] ,nbreretraittout: nbreretraittout[0], toutlesdepots: toutlesdepots[0], historiquerecharge :  historiquerecharge, nom: nom, telephone: telephone, email: email})
    }else{
      res.render('Agence/parametre', {langue: langue, unagence: unagence, commissionmensuelretrait : commissionmensuelretrait[0], commissionsemainetretrait : commissionsemainetretrait[0], commissionjourtretrait: commissionjourtretrait[0] ,nbreretraitmensuel : nbreretraitmensuel[0], nbreretraithebdommadaire : nbreretraithebdommadaire[0],nbreretraitjour : nbreretraitjour[0], nbredepotmensuel : nbredepotmensuel[0]  ,nbredepotsemaine : nbredepotsemaine[0] ,nbredepotjour : nbredepotjour[0] ,mensuelcommissiondepot : mensuelcommissiondepot[0], semainecommissiondepot : semainecommissiondepot[0] ,jourcommissiondepot: jourcommissiondepot[0],  sommetoutcommissiondepot : sommetoutcommissiondepot[0] , sommetoutcommissionretrait : sommetoutcommissionretrait[0] ,nbreretraittout: nbreretraittout[0], toutlesdepots: toutlesdepots[0], historiquerecharge :  historiquerecharge, nom: nom, telephone: telephone, email: email})
   
    }
     } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }


    }else{

      res.redirect("/Agence/connection")
    }
 
     }
 ]
 //La liste des Taux d echanges des monaies  
 exports.Tauxechanges  =  [
  async (req, res) => {
    
    if (req.cookies.agencenom != null ) {
      
   try {  
    
    var nom = req.cookies.agencenom;
    var telephone = req.cookies.agencetelephone
    var email = req.cookies.agenceemail
    var lestaux = await Taux.lestaux();
    var lesmonaies = await Monaie.lesmonaies();
    var langue = req.cookies.agencelangue;
   
    if (req.cookies.agencelangue == "En") {
     
      res.render('Agence/tauxechangesEn', { langue: langue,  lestaux :  lestaux, nom: nom, telephone: telephone, email: email})
     }else{
      res.render('Agence/tauxechanges', { langue: langue,  lestaux :  lestaux, nom: nom, telephone: telephone, email: email})
     
    }

     } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }


    }else{

      res.redirect("/Agence/connection")
    }
 
     }
 ] 
 //Convertion  dune monaie vers un autre 
 //La liste des Taux d echanges des monaies  
 exports.ConvertionMonaies  =  [
  async (req, res) => {
    
    if (req.cookies.agencenom != null ) {
      
   try {  
    
    var somme = req.params.somme;
    var devise1 = req.params.devise1;
    var devise2 = req.params.devise2;
   var untaux = await Taux.lestauxechanges(devise1, devise2);
      console.log(devise1)
    if ( !isEmpty(untaux)) {
      var m1 =  devise1
       var v1 =  untaux[0].V1;
       var m2 =  devise2
       var v2 = untaux[0].V2;
       var sommeconverti =   convertion(m1, v1, m2, v2, somme);
       res.send({sommeconverti : sommeconverti})
    }else{
      console.log("inexistence")
res.send({convertioninexiste : "La Convertion est  inexistant"})
    }


     } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }


    }else{

      res.redirect("/Agence/connection")
    }
 
     }
 ]  
 //Convertion d une monanaie vers une autre monaie plus frais
 exports.ConvertionMonaiesPlusFrais  =  [
  async (req, res) => {
    
    if (req.cookies.agencenom != null ) {
      
   try {  
    
    var somme = req.params.somme;
    var devise1 = req.params.devise1;
    var devise2 = req.params.devise2;
   var untaux = await Taux.lestauxechanges(devise1, devise2);
     
    if ( !isEmpty(untaux)) {
      var m1 =  devise1
       var v1 =  untaux[0].V1;
       var m2 =  devise2
       var v2 = untaux[0].V2;
        //Recuperont le Pourcentage de Frais D envoies d une Monaies
    var letaux = await Tauxfraisenvoie.SelectTaux(m1)
    var t = letaux[0].letaux;
    
     var lefrais = (somme * parseInt(t))/100;
     //la somme a envoyer moin les frais
     var sommemoinfrais = somme - lefrais;
       var sommeconverti =   convertion(m1, v1, m2, v2, sommemoinfrais);
     
     console.log(lefrais)
      
       res.send({sommeconverti : sommeconverti})
    }else{
      console.log("inexistence")
res.send({convertioninexiste : "La Convertion est  inexistant"})
    }


     } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }


    }else{

      res.redirect("/Agence/connection")
    }
 
     }
 ]  
//Changement de la Langue de  l utilisateur 
exports.ChangeLanguage =  [
  async (req, res) => {

   try {  
     var lang = req.params.lang;
     
     res.cookie('agencelangue', lang); 
            
        
    
    res.send({success: "Langue echanger"})
     } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ]
 //Changement de la Langue dans la Page 
 exports.ChangeLanguagePage =  [
  async (req, res) => {

   try {  
     var lang = req.params.lang;
     
     res.cookie('agencelangue', lang); 
            
        
      res.redirect("/Agence/Acceuil")
     } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ]