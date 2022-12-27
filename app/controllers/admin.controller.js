//Mia
let express = require('express')
let app = express()
let bodyParser = require('body-parser') //permet de parser les donner envoyer par posts
//let session = require("express-session") //permet d'appeler la session
const validator = require('express-validator');
const { body ,validationResult  } = require('express-validator');
const bcrypt = require("bcryptjs")//permet de hacher le mot de passe
const saltRounds = 10;

//const cookieParser = require('cookie-parser')

//const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const { toLower, isEmpty, isArray, toInteger  } = require('lodash');
//nos middelware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(cookieParser());
const Codeactivation = require("../models/superadmin/activationcode.models.js");
const Superadmin = require("../models/superadmin/super_admin.models.js");
const Lespays = require("../models/superadmin/pays.models.js") 
const Lesville = require("../models/superadmin/ville.models.js");
const Agence = require("../models/superadmin/agence.models.js");
const Monaies = require("../models/superadmin/monaie.models.js");
const Taux = require("../models/superadmin/tauxechange.models.js");
const Frais = require("../models/superadmin/frais.models.js")
const Gain = require("../models/superadmin/gains.models.js");
const Transaction = require("../models/superadmin/transaction.models.js");
const Solderecharche = require("../models/superadmin/solderecharche.models.js");
const LesDepots = require("../models/superadmin/envoieargent.models.js");
const LesRetaits = require("../models/superadmin/retraitargents.models.js");
const ComissionAgPrincipale = require("../models/superadmin/commissionprincipale.models.js");
const Compensationns = require("../models/superadmin/historiquecompensation.models.js")
const TypeCompte = require("../models/superadmin/typecompte.models.js");
const CompteFinance = require("../models/superadmin/comptefinance.models.js")
const  Ecriture = require('../models/superadmin/ecriture.models.js');
const  Mvt = require('../models/superadmin/mouvement.models.js');
const Tauxfraisenvoie = require('../models/superadmin/tauxfraisenvoie.models.js');
const ListeTransfPays = require('../models/superadmin/listetransfertpays.models.js');

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
     res.render('Super_admin/register', { erreur: erreur})
     
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
      

      var connect = await Superadmin.Trouvercompte(telephone)
     
    
      if (connect !== "" && !isEmpty(connect) ) {
      var vrai = bcrypt.compareSync(req.body.motdepasse, connect[0]['motdepasse']);
      console.log(vrai) 
      if (vrai == true) {
        console.log('mioiooi')
        
res.cookie('adminnom', connect[0]['nom'], {maxAge: 86400000});

res.cookie('admintelephone', connect[0]['telephone'], {maxAge: 86400000});

res.cookie('adminemail', connect[0]['email'], {maxAge: 86400000});
      res.redirect("/Superadmin/Acceuil");
      }else{
        res.render('Super_admin/login', {erreurmotpasse: "Votre mot de passe ne correspond pas"})
     
      } 
     
    }else{
      res.render('Super_admin/login', {erreurnumero: "Votre numero ne correspond pas"})
     
      }
     
       } catch(e) {
           console.log(e);
           res.sendStatus(500);
       }
    //verifier si le matricule existe dans la base de donner

 
   } 
 }
]
 //Creation de compte de l'administrateur
 exports.Creation =  [
  /*
ce middelware permet de creer un compte
  */

 body('nom').isLength({ min: 3}).withMessage('Veuilez bien saisir un nom long').trim(),
 body('code').isNumeric().withMessage('Veuilez saisir un code de type nombre').trim(),
 body('telephone').isNumeric().withMessage('Veuilez saisir un numéro téléphone').trim(),
 body('email').isEmail().withMessage('Veuilez bien saisir un email').normalizeEmail(),
 body('motdepasse', 'Veuillez saisir un mot de passe de plus de quatre caractère').isLength({ min: 4 }).trim(),
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
     console.log(erreur)
     res.render('Super_admin/register', {erreur: erreur})
      
     return;
   }
   else {
     
      var nom = req.body.nom
      var email = req.body.email
      var motsdepasse = req.body.motsdepasse
      var telephone = req.body.telephone;
      
      var code = req.body.code
    
      try {  
        var codeverifie  = await Codeactivation.VerifionsCode(code);
        console.log(codeverifie)
        //Verification si le code est vraie
      if (codeverifie == "") {
        res.render('Super_admin/register', {codeerreur: "veuillez bien saisir le code d'activation"})
      
      } else{
        // Creation de professeurs
    await Codeactivation.SuppresionCode(codeverifie[0].idcode)
    var hasher =  await  bcrypt.hashSync(req.body.motdepasse, 10, (err, hash) => {
          if (err) {
            console.error(err)
            return
          }
        })
const admin = new Superadmin({
  nom : req.body.nom,
  telephone : req.body.telephone,
  email : req.body.email,
  motdepasse : hasher
});

res.cookie('adminnom', req.body.nom);

res.cookie('admintelephone', req.body.telephone);

res.cookie('adminemail', req.body.email);


await Superadmin.inscription(admin);
        res.redirect("/Superadmin/Acceuil");
        console.log("c'est activer")
      }
       
         } catch(e) {
             console.log(e);
             res.sendStatus(500);
         }
 
   }
 }
]
//La Page de Creation d un Compte Administrateur
exports.PageCreationCompte  =  [
  async (req, res) => {

   try {  
    
    res.render('Super_admin/register')
     } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ]
 //Page de Connection de L administrateur
 exports.PageLogin  =  [
  async (req, res) => {

   try {  
    
  res.render('Super_admin/login')
     } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ]

 //Deconnection de la Page de l administrateur
    //Deconnection du compte de l agence 
    exports.Deconnecter =  [
      async (req, res) => {
    
       try {  
         res.clearCookie("adminnom");
         res.clearCookie("admintelephone");
         res.clearCookie("adminemail");
         
             
         res.redirect("/Superadmin/Login");
  
        } catch(e) {
             console.log(e);
             res.sendStatus(500);
         }
     
         }
     ]
  
     //Page pour acceder aux Parametre de L administrateur
      //Parametrage d une Agence 
 exports.Parametrage  =  [
  async (req, res) => {
    
    if (req.cookies.admintelephone != null ) {
   try {  
    var nom = req.cookies.adminnom;
    var telephone = req.cookies.admintelephone
    var email = req.cookies.adminemail
    
    //Recuperons les Informations du Compte de L administrateur 
    var compteadmininfo = await Superadmin.Trouvercompte(telephone);
    
    res.render('Super_admin/parametre', { nom: nom, telephone: telephone, email: email ,  compteadmininfo :  compteadmininfo[0]})
     } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }


    }else{
      res.redirect("/Superadmin/Login")
    }
 
     }
 ]

 //Modification du Mot de passe de L Administrateur
 exports.MajMotdepasse =  [
  async (req, res, next) => {
  
    if (req.cookies.admintelephone != null ) {
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
       res.render('Super_admin/ToutTransacDeuxdate', { erreur: erreur})
       return;
     }
     else {
      try{
        var motdepassemaj = req.body.motdepassemaj;
        var telephone = req.cookies.admintelephone;
        var hasher =  await  bcrypt.hashSync(motdepassemaj , 10, (err, hash) => {
          if (err) {
            console.error(err)
            return
          }
        })
        await Superadmin.majmodepassecompte(telephone, hasher)
        
        
      res.redirect("/Superadmin/parametre")
  
      } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
     }

    }else{
      res.redirect("/Superadmin/Login")
    }
    
   }
  ]

   //Mise a jour des Informations du Compte admin 
 exports.MajCompteAdmin =  [
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
       res.render('Super_admin/ToutTransacDeuxdate', { erreur: erreur})
       
       return;
     }
     else {
      try{
        var nom = req.body.nom;
        var email = req.body.email;
        var telephone = req.body.telephone;
        var idcompte = req.body.idcompte;
        await Superadmin.majinfocompte(nom, telephone, email, idcompte)
        res.cookie('adminnom', req.body.nom);

        res.cookie('admintelephone', req.body.telephone);
        
        res.cookie('adminemail', req.body.email);
        
        res.redirect("/Superadmin/parametre")
      } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
     }
   }
  ]

//Page d'acceuuil de  l'administrateur
exports.Acceuil  =  [
  async (req, res) => {
if(req.cookies.admintelephone != null){
  try {  
    var nom = req.cookies.adminnom;
    var telephone = req.cookies.admintelephone
    var email = req.cookies.adminemail
   res.render('Super_admin/acceuil', {nom: nom, telephone: telephone})
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}else{
  res.redirect("/Superadmin/Login")
}
  
 
     }
 ]


 //Lien pour afficher le formulaire d'ajout d'agence
 exports.Ajoutagence  =  [
  async (req, res) => {

    if(req.cookies.admintelephone != null){
      try {  
        var nom = req.cookies.adminnom;
        var telephone = req.cookies.admintelephone
        var email = req.cookies.adminemail
       console.log(req.cookies.adminnom)
       var pays = await Lespays.selectpays();
       var ville = await Lesville.selectville();
       console.log(pays)
        
       res.render('Super_admin/ajoutagence', {lespays: pays, lesville: ville,  nom: nom, telephone: telephone, email: email})
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
    }else{

      res.redirect("/Superadmin/Login")
    }
 
     }
 ]

 //Ajout d'une agence 
exports.CreationAgence =  [
  /*
ce middelware permet de creer un compte
  */
 // verifie si le matricule est un nombre.
 body('nomagence').isLength({ min: 3}).withMessage('Veuilez bien saisir un nom d agence long').trim(),
 body('numeroagence').isLength({ min: 3}).withMessage('Veuilez bien saisir un numero d agence long').trim(),
 body('telephoneagence').isNumeric().withMessage('Veuilez saisir un numéro téléphone').trim(),
 body('telephoneagence').matches(/^6[1,2,5,6]{1}[0-9]{7}$/).withMessage('Veuilez bien saisir un numéro de téléphone  valide').trim(),
 body('emailagence').isEmail().withMessage('Veuilez bien saisir un email').normalizeEmail(),
 body('motdepasseagence', 'Veuillez saisir un mot de passe de plus de quatre caractère').isLength({ min: 4 }).trim(),
async (req, res, next) => {

   // Extract the validation errors from a request.
   const errors = validator.validationResult(req);
   //les erreurs 
   // Create a genre object with escaped and trimmed data
   if (errors.isEmpty()) {
     // There are errors. Render the form again with sanitized values/error messages.
     var erreur = errors.array();
     res.render('user/inscription', { erreur: erreur});
     
     return;
   }
   else {
    
    var nomagence = req.body.nomagence
    var numeroagence = req.body.numeroagence
    var telephoneagence = req.body.telephoneagence
    var emailagence = req.body.emailagence
    var motdepasseagence = req.body.motdepasseagence
    var paysagence  = req.body.paysagence
    var villeagence  = req.body.villeagence
    var zoneagence  = req.body.zoneagence
    
    try {  
      var hasher =  await  bcrypt.hashSync(motdepasseagence, 10, (err, hash) => {
        if (err) {
          console.error(err)
          return
        }
      })
      const newagence = new Agence({
        nomagence : nomagence,
        numeroAgence : numeroagence,
        telephoneagence : telephoneagence,
        emailagence : emailagence,
        solde : 0,
        paysid: paysagence,
        villeid : villeagence,
        zone : zoneagence,
        statue : 0,
        motdepasse : hasher
      });
    await Agence.inscription(newagence);  
    res.send({ newagence: newagence });
 
       } catch(e) {
           console.log(e);
           res.sendStatus(500);
       }
    //verifier si le matricule existe dans la base de donner
 
 
   } 
 }
]
//la Liste des agence
exports.Listeagence  =  [
  async (req, res) => {

    if(req.cookies.admintelephone != null){ 
      try {  
        var nom = req.cookies.adminnom;
        var telephone = req.cookies.admintelephone
        var email = req.cookies.adminemail
        var lesagences = await Agence.lesagences(); 
        console.log(lesagences)
        
       res.render('Super_admin/listeagence', {lesagences: lesagences, nom: nom, telephone: telephone, email: email})
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
    }else{
      res.redirect("/Superadmin/Login")
    }
 
     }
 ]
 //La Liste des Transfert des Pays 
 exports.ListeMonaieTransfert  =  [
  async (req, res) => {

    if(req.cookies.admintelephone != null){  
      try {  
        var nom = req.cookies.adminnom;
        var telephone = req.cookies.admintelephone
        var email = req.cookies.adminemail
        var listetransferttout = await ListeTransfPays.listetouttransfert()
        var lespays = await Lespays.selectpays()
       res.render('Super_admin/listetransfertpays', {lespays : lespays ,listetransferttout: listetransferttout, nom: nom, telephone: telephone, email: email})
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    }else{

      res.redirect("/Superadmin/Login")
    }
   
 
     }
 ]
 //Ajout des Listes des Transferts 
  exports.AjoutListedesMonaiesTransfert  =  [
    async (req, res) => {
      if(req.cookies.admintelephone){  

        try {  
     
          var nomonnaie = req.body.nomonnaie;
          var paysid = req.body.paysid
      
          const lamonnaie = new ListeTransfPays({
            nomtransfert : nomonnaie,
            paysdestination : paysid
          }); 
          await ListeTransfPays.ajoutlistemonaie(lamonnaie)
          res.redirect("/Superadmin/ListedesTransfertPays");
          } catch(e) {
               console.log(e);
               res.sendStatus(500);
           }
       
       }
       }
   ]
   //Supprimer une monaie de transfert d'argent d un Pays 
    //Suppresion d'une Agence
 exports.SupprimerListeMonaietransfert  =  [
  async (req, res) => {

   try {  
     
    var idlistemonai = req.params.idlistemonai;

      await ListeTransfPays.supprimermonaie(idlistemonai)
      res.redirect("/Superadmin/ListedesTransfertPays");
    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ] 
 //Modifier la Liste des Transfert 
  exports.TransListeModifierMonaie  =  [
    async (req, res) => {
  
     try {  
     
      var idliste = req.body.idliste;
      var modifiernommonaie = req.body.modifiernommonaie;
      var paysid = req.body.paysid
      await ListeTransfPays.modifierlistetransfertmonaie(modifiernommonaie, paysid, idliste) 
      res.redirect("/Superadmin/ListedesTransfertPays");
   
    
     
  
      } catch(e) {
           console.log(e);
           res.sendStatus(500);
       }
   
       }
   ]
 //Details d'une Agence
 exports.Detailsagence  =  [
  async (req, res) => {

   try {  
     var  idagence = req.params.idagence;
     var nom = req.cookies.adminnom;
     var telephone = req.cookies.admintelephone;
     var email = req.cookies.adminemail;
     var unagence = await Agence.recupereunagence(idagence)
     var historiquerecharge = await Solderecharche.historiquerecharge(idagence);
     var toutlesdepots = await LesDepots.toutdepotdunagence(idagence);
     var nbreretraittout = await LesRetaits.nbreretraitunagence(idagence);
     var sommetoutcommissionretrait = await LesRetaits.sommetoutcommission(idagence);
      var sommetoutcommissiondepot = await LesDepots.toutlescommissiondepot(idagence)
      var jourcommissiondepot = await LesDepots.jourcommissiondepot(idagence);
    var semainecommissiondepot = await LesDepots.semainecommissiondepot(idagence);
    var mensuelcommissiondepot = await LesDepots.mensuelcommissiondepot(idagence);
    var nbredepotjour = await LesDepots.nbredepotjour(idagence);
    var nbredepotsemaine = await LesDepots.nbredepotsemaine(idagence);
    var nbredepotmensuel  = await LesDepots.nbredepotmensuel(idagence);
    var nbreretraitjour = await LesRetaits.nbreretraitjour(idagence);
    var nbreretraithebdommadaire = await LesRetaits.nbreretraithebdommadaire(idagence)
     var nbreretraitmensuel = await LesRetaits.nbreretraitmensuel(idagence); 
    var commissionjourtretrait = await LesRetaits.commissionjourtretrait(idagence);
    var commissionsemainetretrait = await LesRetaits.commissionsemainetretrait(idagence);
    var commissionmensuelretrait = await LesRetaits.commissionmensuelretrait(idagence)
    var lescomptes = await CompteFinance.Selectcomptefinance();
  
     res.render('Super_admin/agencedetails', {lescomptes: lescomptes, commissionmensuelretrait : commissionmensuelretrait[0], commissionsemainetretrait : commissionsemainetretrait[0], commissionjourtretrait: commissionjourtretrait[0] ,nbreretraitmensuel : nbreretraitmensuel[0], nbreretraithebdommadaire : nbreretraithebdommadaire[0],nbreretraitjour : nbreretraitjour[0], nbredepotmensuel : nbredepotmensuel[0]  ,nbredepotsemaine : nbredepotsemaine[0] ,nbredepotjour : nbredepotjour[0] ,mensuelcommissiondepot : mensuelcommissiondepot[0], semainecommissiondepot : semainecommissiondepot[0] ,jourcommissiondepot: jourcommissiondepot[0],  sommetoutcommissiondepot : sommetoutcommissiondepot[0] , sommetoutcommissionretrait : sommetoutcommissionretrait[0] ,nbreretraittout: nbreretraittout[0], toutlesdepots: toutlesdepots[0], historiquerecharge :  historiquerecharge, unagence: unagence, nom: nom, telephone: telephone, email: email})
     } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ]

 //Activation d'une agence
 exports.Activeagence  =  [
  async (req, res) => {

   try {  
     var  idagence = req.params.idagence;
     var  valeur = req.params.valeur;
     var nom = req.cookies.adminnom;
     var telephone = req.cookies.admintelephone
     var email = req.cookies.adminemail
      await Agence.statuechange(idagence, valeur)
    
     res.redirect("/Superadmin/ListeAgence");
    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ]
 //Rechargement du compte
 exports.Rechargementagence  =  [
  async (req, res) => {

   try {  
     

     //Rechargement d une Agence 
     var libecriture = req.body.libecriture;
    var datecriture = req.body.datecriture;
    var numcpte = req.body.numcpte;
    var debit = req.body.debit;
    var credit = req.body.credit;
    var reference = req.body.reference;
    var lesdebit = 0;
    var lescredit = 0;
    var nb = 0;
    if (!isEmpty(debit) && isArray(credit) &&  isArray(debit) && !isEmpty(credit) && !isEmpty(numcpte)) {
     debit.forEach(element => {
       nb += 1;
     var el =  toInteger(element)
       lesdebit +=  el;
     });
     credit.forEach(ele => {
      var cr =  toInteger(ele)
      lescredit += cr;
     });
     if (lesdebit !== lescredit) {
      res.send( {erreurdeoperation: "Votre Operation ne peut pas etre effectuer"})
      
     }
     if (lesdebit == lescredit ) {
       //insertion des ecritures 

       const newecrit = new Ecriture({
        dateecri:  new Date(),
        libeecri: libecriture,
        reference: reference
      })
var idecritt =   await Ecriture.ajoutecrit(newecrit);
 
  
    for (var  i = 0; i < nb ; i++) {
      var cra = credit[i];
      var dra = debit[i]; 
      var  crd = toInteger(cra);
      var dbit = toInteger(dra);
      console.log(crd)
      console.log(dbit)

     
//On recuperer l'id du numero de compte 
var bd =  await CompteFinance.uncompte(numcpte[i])
var idcpt = bd[0].idcpte;
//On creer les mvt 
const newmvt = new Mvt({
  ecritureid:  idecritt,
  compteid: idcpt,
  debit : dbit,
  credit : crd,
  regroupement : 0

})
//Ajout de mvt 
await Mvt.ajoutmvt(newmvt);

    }
    
    var somme = req.body.somme;
    var idagence = req.body.idagence;
    var date = new Date();
    const recharge = new Solderecharche({
      agenceid : idagence,
      daterecharge : date,
      somme: somme
    });
    await Solderecharche.rechargeagence(recharge);
    await Agence.rechargement(idagence, somme)
    
     res.send({ idagence: idagence });
//Operation reussi
    }}
    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ] 
 //Suppresion d'une Agence
 exports.Supprimeragence  =  [
  async (req, res) => {

   try {  
     
    var idagence = req.params.idagence;

      await Agence.supprimeragence(idagence)
      res.redirect("/Superadmin/ListeAgence");
    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ] 
  //Liste des monaies
  exports.Lesmonaie  =  [
    async (req, res) => {
  
      if(req.cookies.admintelephone != null){  
        try {  
          var lesmonaie = await Monaies.lesmonaies();
   
          var  idagence = req.params.idagence;
          var nom = req.cookies.adminnom;
          var telephone = req.cookies.admintelephone
          var email = req.cookies.adminemail
        
         res.render('Super_admin/monaie', {lesmonaie: lesmonaie, nom: nom, telephone: telephone, email: email})
         
        
         } catch(e) {
              console.log(e);
              res.sendStatus(500);
          }
      
      }else{

        res.redirect("/Superadmin/Login")
      }
   
       }
   ] 
   //Page pour Afficher  les Taux de Frais D envoie
   //Tauxfraisenvoie
   exports.LesTauxfraisenvoie  =  [
    async (req, res) => {
  
      if(req.cookies.admintelephone != null){ 

        try {  
          var lesmonaies = await Tauxfraisenvoie.SelectMonaiesnoenregistrer();
          var lesfraistaux = await Tauxfraisenvoie.SelectFraisEnvoie()
          var monaie = await Monaies.lesmonaies();
   
          var nom = req.cookies.adminnom;
          var telephone = req.cookies.admintelephone
          var email = req.cookies.adminemail
        
         res.render('Super_admin/lestauxfraisechange', {monaie: monaie, lesfraistaux : lesfraistaux, lesmonaies: lesmonaies, nom: nom, telephone: telephone, email: email})
         
        
         } catch(e) {
              console.log(e);
              res.sendStatus(500);
          }
       }else{

        res.redirect("/Superadmin/Login")
      }
   
       }
   ] 
   //Suppression du Pourcentage du taux d envoie
   exports.SupprimerPourcentageTaux  =  [
    async (req, res) => {
  
     try {  
       
      var idpourcent = req.params.idpourcent;
  
      await Tauxfraisenvoie.supprimerpourcentagetaux(idpourcent)
      res.redirect("/Superadmin/Lestauxfraisechange");
      } catch(e) {
           console.log(e);
           res.sendStatus(500);
       }
   
       }
   ] 
   //Ajout des Taux des Frais d echanges 
   exports.Ajouttauxfraisechange  =  [
    async (req, res) => {
  
     try {  
     
      var ladevise = req.body.ladevise;
      var pourcentage = req.body.pourcentage;
      
    if (ladevise !== " " && pourcentage !== " ") {
      const untaux = new Tauxfraisenvoie({
        letaux: pourcentage,
        lamonaieid: ladevise
      }); 
      await Tauxfraisenvoie.ajoutfraistaux(untaux);

      res.redirect("/Superadmin/Lestauxfraisechange");
   
    }
     
  
      } catch(e) {
           console.log(e);
           res.sendStatus(500);
       }
   
       }
   ] 
   //Modification du taux de Frais d envoie 
   exports.ModifierTauxFrais  =  [
    async (req, res) => {
  
     try {  
       
      var moladevise = req.body.moladevise;
      var motauxfrais = req.body.motauxfrais;
      var idtaux = req.body.idtaux;

  await Tauxfraisenvoie.ModifierTauxFraisEnvoie(motauxfrais, moladevise, idtaux)
      
  res.redirect("/Superadmin/Lestauxfraisechange");
      } catch(e) {
           console.log(e);
           res.sendStatus(500);
       }
   
       }
   ] 

   //Suppression d'une Momaie 
 exports.Supprimermonaie  =  [
  async (req, res) => {

   try {  
     
    var idmonaie = req.params.idmonaie;

      await Monaies.supprimermonaie(idmonaie);
      res.redirect("/Superadmin/Lesmonaies");
    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ] 
//Modifier la monaie 
exports.Modifiermonaie  =  [
  async (req, res) => {

   try {  
     
    var modifiermonaie = req.body.modifiermonaie;
    var idmonaie = req.body.idmonaie;
await Monaies.modifiermonaie(modifiermonaie, idmonaie);
    
res.redirect("/Superadmin/Lesmonaies");
    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ] 

 //Ajout d'une Monaie  
 exports.Ajoutmonaie  =  [
  async (req, res) => {

   try {  
   
    var lamonaie = req.body.lamonaie;
  if (lamonaie !== " ") {
    const UneMONAIE = new Monaies({
      monaie : lamonaie
    }); 
    await Monaies.ajoutmonaie(UneMONAIE);
    res.redirect("/Superadmin/Lesmonaies");
 
  }
   

    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ] 
//Configuration de taux de convertion 
exports.Configurationtaux  =  [
  async (req, res) => {

    if(req.cookies.admintelephone != null){  

      try {  
        var lestaux = await Taux.lestaux();
       var lesmonaies = await Monaies.lesmonaies();
        var  idagence = req.params.idagence;
        var nom = req.cookies.adminnom;
        var telephone = req.cookies.admintelephone;
        var email = req.cookies.adminemail;
        res.render('Super_admin/tauxechange', {lestaux: lestaux, nom: nom, telephone: telephone, email: email, lesmonaies: lesmonaies})
       
       } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
    }else{
      res.redirect("/Superadmin/Login")
    }
     }
 ] 
//Ajout d'un taux d'echanges 
 exports.Ajouttaux  =  [
  async (req, res) => {

   try {  
     
    var ladevise1 = req.body.ladevise1;
    var ladevise2 = req.body.ladevise2;
    var devise1 = req.body.devise1;
    var devise2 = req.body.devise2;
    const newtaux = new Taux({
      X1 : ladevise1,
      X2 : ladevise2,
      V1 : devise1,
      V2 : devise2
    });
   await Taux.ajouttaux(newtaux);   
   res.redirect("/Superadmin/Configurationtaux");
    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
     
 ] 
   //Suppression d'une Taux d'echanges 
   exports.Supprimertaux  =  [
    async (req, res) => {
  
     try {  
       
      var idtaux = req.params.idtaux;
  
        await Taux.supprimertaux(idtaux)
        res.redirect("/Superadmin/Configurationtaux");
      } catch(e) {
           console.log(e);
           res.sendStatus(500);
       }
   
       }
   ] 
  //Modifier taux d'echanges 
 exports.Modifiertaux  =  [
  async (req, res) => {

   try {  
     
    var monaie1 = req.body.monaie1;
    var monaie2 = req.body.monaie2;
    var idtaux = req.body.idtaux;
    console.log(monaie1)
   await Taux.modifiertaux(monaie1, monaie2, idtaux);   
   res.redirect("/Superadmin/Configurationtaux");
    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ] 
 //Liste des frais d'envoie 
 exports.Lesfrais  =  [
  async (req, res) => {

    if(req.cookies.admintelephone != null){   

      try {  
        var lesfrais = await Frais.lesfrais()
       var lesmonaies = await Monaies.lesmonaies();
        console.log(lesfrais)
        var nom = req.cookies.adminnom;
        var telephone = req.cookies.admintelephone;
        var email = req.cookies.adminemail;
        res.render('Super_admin/lesfrais', {lesfrais: lesfrais, nom: nom, telephone: telephone, email: email, lesmonaies: lesmonaies})
       
       } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    }else{
      res.redirect("/Superadmin/Login")
    }
 
     }
 ] 
 //Ajout d'un frais 
 exports.Ajoutfrais  =  [
  async (req, res) => {

   try {  
     
    var ladevise = req.body.ladevise;
    var montant1= req.body.montant1;
    var montant2 = req.body.montant2;
    var frais = req.body.frais;
    const newfrais = new Frais({
      monaieid : ladevise,
      valeur1 : montant1,
      valeur2: montant2,
      frais : frais
    });
   await Frais.ajoutfrais(newfrais);   
   res.redirect("/Superadmin/Lesfrais");
    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
     
 ] 
  //Suppression d'un frais 
  exports.Supprimerfrais  =  [
    async (req, res) => {
  
     try {  
       
      var idfrais = req.params.idfrais;
  
        await Frais.supprimerfrais(idfrais)
        res.redirect("/Superadmin/Lesfrais");
      } catch(e) {
           console.log(e);
           res.sendStatus(500);
       }
   
       }
   ] 
   //Les gains des frais d'envoie
   //Liste des frais d'envoie 
 exports.Lesgains  =  [
  async (req, res) => {

    if(req.cookies.admintelephone != null){   

      try {  
        var lesgain = await Gain.lesgains();
        console.log(lesgain[0])
         var nom = req.cookies.adminnom;
         var telephone = req.cookies.admintelephone;
         var email = req.cookies.adminemail;
         res.render('Super_admin/lesgains', {lesgain: lesgain[0], nom: nom, telephone: telephone, email: email})
        
        } catch(e) {
             console.log(e);
             res.sendStatus(500);
         }
     
    }else{

      res.redirect("/Superadmin/Login")
    }
     }
 ] 
 //Modification du gain de l' Agence Principale 
 exports.Gainsuperagence  =  [
  async (req, res) => {

   try {  
  var  valeur = req.params.valeur;
  await Gain.modifiersuperagence(valeur);
  console.log(valeur)
res.send({success: 'Modification '})
    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ]
 //Modification du gain de l' Agence de Depot 
 exports.Gainagencedepot  =  [
  async (req, res) => {

   try {  
  var  valeur = req.params.valeur;
  await Gain.modifieragencedepot(valeur);
  console.log(valeur)
res.send({success: 'Modification '})
    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ]
 //Modification du gain de l'Agence de retrait
 exports.Gainagenceretrait  =  [
  async (req, res) => {

   try {  
  var  valeur = req.params.valeur;
  await Gain.modifieragenceretrait(valeur);

res.send({success: 'Modification '})
    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ]
//Page de Tout les Transactions Validés
exports.Toutransactionvalider  =  [
  async (req, res) => {

    if(req.cookies.admintelephone != null){  

      try {  
        var nom = req.cookies.adminnom;
        var telephone = req.cookies.admintelephone
        var email = req.cookies.adminemail;
       
        var lesagences = await Agence.lesagences(); 
        
       res.render('Super_admin/transactionvalide', { lesagences : lesagences , nom: nom, telephone: telephone, email: email})
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
    }else{

      res.redirect("/Superadmin/Login")
    }
     }
 ]
 //Rechercher tout les Transaction d une agence entre deux Dates 
 exports.RechToutTransacEntreDeuxDateAgence =  [
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
     res.render('Super_admin/ToutTransacDeuxdate', { erreur: erreur})
     
     return;
   }
   else {
     
      var datedebut = req.body.datedebut
      var datefin = req.body.datefin
      
     var agenceid =  req.body.agenceid;
     agenceid = parseInt(agenceid);
     
      
   var transactdatedeux = await Transaction.transacagencetoutdeuxdatevalider(agenceid, datedebut, datefin);
   var deuxdatetoutcommissiondedepot = await LesDepots.deuxdateslescommissiondepot(agenceid, datedebut, datefin);
   var deuxdatelessommesdepotagence = await Transaction.deuxdatelessommesdepotagences(agenceid, datedebut, datefin);
   var deuxdateslessommesretraitagence = await Transaction.deuxdateslessommesretraitagence(agenceid, datedebut, datefin)
   var commissiondeuxdateretrait = await LesRetaits.commissiondeuxdateretrait(agenceid, datedebut , datefin)  
   var agprinicipalecomission = await Transaction.toutcomissionagenceprincipale(agenceid, datedebut, datefin);
  
   res.send({agprinicipalecomission : agprinicipalecomission[0], commissiondeuxdateretrait : commissiondeuxdateretrait[0], deuxdateslessommesretraitagence : deuxdateslessommesretraitagence[0], deuxdatelessommesdepotagence : deuxdatelessommesdepotagence[0] , deuxdatetoutcommissiondedepot : deuxdatetoutcommissiondedepot[0], agenceid : agenceid , transactdatedeux : transactdatedeux, debut: datedebut, fin: datefin})

   }
 }
]
//touttransacagenceprincipale
//Page pour Retrouver toutes les Transactions realiser par une agence entre deux dates
exports.Toutlestransactions  =  [
  async (req, res) => {

    if(req.cookies.admintelephone != null){  
      try {  
        var nom = req.cookies.adminnom;
        var telephone = req.cookies.admintelephone
        var email = req.cookies.adminemail;
       
        var lesagences = await Agence.lesagences(); 
        
       res.render('Super_admin/touttransaction', { lesagences : lesagences , nom: nom, telephone: telephone, email: email})
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
   
    }else{
      res.redirect("/Superadmin/Login")
    }
     }
 ]

 //Rechercher tout les Transaction entre deux date  d une agence 
 exports.PrincipaleRechToutTransacEntreDeuxDate =  [
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
     res.render('Super_admin/ToutTransacDeuxdate', { erreur: erreur})
     
     return;
   }
   else {
     
      var datedebut = req.body.datedebut
      var datefin = req.body.datefin
      
     var agenceid =  req.body.agenceid;
     var transactdatedeux  = null;
     var deuxdatetoutcommissiondedepot = null;
     var deuxdatelessommesdepotagence  = null;
     var deuxdateslessommesretraitagence = null;
     var commissiondeuxdateretrait = null;
     var agprinicipalecomission = null;
     console.log(agenceid)
     if (agenceid == 'tout') {
      
    transactdatedeux = await Transaction.lesagencetouttransacagenceprincipale( datedebut, datefin);
    deuxdatetoutcommissiondedepot = await LesDepots.toutlescommissiondepot(datedebut, datefin);
    commissiondeuxdateretrait = await LesRetaits.toutcommissiondeuxdateretrait( datedebut , datefin)  
    agprinicipalecomission = await Transaction.toutcomissiondeuxdatesss( datedebut, datefin);
    deuxdatelessommesdepotagence = await Transaction.deuxdatelessommesdepottoutagence( datedebut, datefin);
     deuxdateslessommesretraitagence = await Transaction.deuxdateslessommesretraittoutagence ( datedebut, datefin);
  }else{
      agenceid = parseInt(agenceid);
      
    transactdatedeux = await Transaction.touttransacagenceprincipale(agenceid, datedebut, datefin);
    deuxdatetoutcommissiondedepot = await LesDepots.deuxdateslescommissiondepot(agenceid, datedebut, datefin);
    deuxdatelessommesdepotagence = await Transaction.deuxdatelessommesdepotagences(agenceid, datedebut, datefin);
    deuxdateslessommesretraitagence = await Transaction.deuxdateslessommesretraitagence(agenceid, datedebut, datefin)
    commissiondeuxdateretrait = await LesRetaits.commissiondeuxdateretrait(agenceid, datedebut , datefin)  
    agprinicipalecomission = await Transaction.toutcomissionagenceprincipale(agenceid, datedebut, datefin);
      
  }
  
   res.send({agprinicipalecomission : agprinicipalecomission[0], commissiondeuxdateretrait : commissiondeuxdateretrait[0], deuxdateslessommesretraitagence : deuxdateslessommesretraitagence[0], deuxdatelessommesdepotagence : deuxdatelessommesdepotagence[0] , deuxdatetoutcommissiondedepot : deuxdatetoutcommissiondedepot[0] , debut: datedebut, fin: datefin, agenceid : agenceid , transactdatedeux : transactdatedeux, debut: datedebut, fin: datefin})

   }
 }
]
//page de compensation
exports.Compensation  =  [
  async (req, res) => {

    if(req.cookies.admintelephone != null){   

      try {  
        var nom = req.cookies.adminnom;
        var telephone = req.cookies.admintelephone
        var email = req.cookies.adminemail;
       
        var lesagences = await Agence.lesagences(); 
        
       res.render('Super_admin/compensation', { lesagences : lesagences , nom: nom, telephone: telephone, email: email})
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
    }else{

      res.redirect("/Superadmin/Login")
    }
     }
 ]
 //Recherche des Transactions a Compenser pour une Agence
 exports.CompensationTransactionAgence =  [
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
     res.render('Super_admin/ToutTransacDeuxdate', { erreur: erreur})
     
     return;
   }
   else {
     
      
     var agenceid =  req.body.agenceid;
     
     agenceid = parseInt(agenceid);
     var agence = await Agence.recupereunagence(agenceid);
     var idderniercompense = await Compensationns.derniercompenser(agenceid)
     var repportsolde = await Compensationns.repportanouveau(idderniercompense[0].idmaxcomp)
     console.log(idderniercompense)
     
     var retraitnomcompenser = await LesRetaits.retraitnomcompenser(agenceid)
      var depotnoncompenser = await LesDepots.lestransactiondepotnoncompenser(agenceid);
   
   res.send({ agence : agence[0], agenceid : agenceid , retraitnomcompenser: retraitnomcompenser, depotnoncompenser: depotnoncompenser , repportsoldedernier : repportsolde[0]})

   }
 }
]
//Toutes les Pays 

exports.LesPaysSelect   =  [
  async (req, res) => {

    if(req.cookies.admintelephone != null){    

      try {  
        var lespayssel =  await Lespays.toutpays();
        var monaie = await Monaies.lesmonaies();
    
      
         var nom = req.cookies.adminnom;
         var telephone = req.cookies.admintelephone;
         var email = req.cookies.adminemail;
         res.render('Super_admin/toutlespays', { monaie: monaie, lespayssel : lespayssel, nom: nom, telephone: telephone,})
        
        } catch(e) {
             console.log(e);
             res.sendStatus(500);
         }
     
    }else{

      res.redirect("/Superadmin/Login")
    }
     }
 ] 
 //Modification des Information du pays 
 
exports.ModifierPaysInfo =  [
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
     res.render('Super_admin/ToutTransacDeuxdate', { erreur: erreur})
     
     return;
   }
   else {
     
      
     var monompays =  req.body.monompays;
     var idpays = req.body.idpays;
     var moindicatifs  = req.body.moindicatifs ;
     var mocodeiso = req.body.mocodeiso;
     var moladevise = req.body.moladevise;
  
    try {  

    await Lespays.modifierinfopays(monompays, moindicatifs, mocodeiso, moladevise, idpays);
    res.redirect("/Superadmin/Lespaysliste");
          } catch(e) {
            
            console.log(e);
               res.sendStatus(500);
           }
  
   }
 }
]

//Ajout d 'un Pays et ces Informtions 
 
exports.AjoutPaysInfo =  [
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
     res.render('Super_admin/ToutTransacDeuxdate', { erreur: erreur})
     
     return;
   }
   else {
     
      
     var nompays =  req.body.nompays;
     var indicatif  = req.body.indicatif ;
     var codeiso = req.body.codeiso;
     var ladevise = req.body.ladevise;
  
    try {  
      const newpays = new Lespays({
        pays : nompays,
        indicatif : indicatif,
        codeiso : codeiso,
        devise : ladevise
      });
      
   
   await Lespays.ajoutpays(newpays)  ;
    res.redirect("/Superadmin/Lespaysliste");
          } catch(e) {
            
            console.log(e);
               res.sendStatus(500);
           }
  
   }
 }
]

//Compensention des Transaction d une Agence 

exports.CompenserLesTransaction =  [
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
     res.render('Super_admin/ToutTransacDeuxdate', { erreur: erreur})
     
     return;
   }
   else {
     
      
     var retraitidss=  req.body.retraitidss;
     var soldeagence = req.body.soldeagence;
     var agenceid  = req.body.agenceid ;
     var depotidss = req.body.depotidss;
  
    try {  
      const newcomp = new  Compensationns({
        agenceidcomp : agenceid,
        datecompensation : new Date(),
        repportsolde : soldeagence,
      });     
   var idcomp = await Compensationns.ajoutcompensation(newcomp);
  
      
      if (isArray(depotidss) ) {
        depotidss.forEach(element => {
          var el =  toInteger(element) 
          LesDepots.compenserlatransacdepot(el, idcomp)
       
          });
      } else {
        if (!isEmpty(depotidss)) {
          
          LesDepots.compenserlatransacdepot(depotidss, idcomp)
        }
       
    
      }
      if (isArray(retraitidss)) {
        retraitidss.forEach(element => {
          var el =  toInteger(element) 
          LesRetaits.compensertransacretrait(el, idcomp)
           
          });
      } else {
        if (!isEmpty(retraitidss)) {
          
          LesRetaits.compensertransacretrait(retraitidss, idcomp)
          }
      }
         res.send({success: "Compenser deja "})
          } catch(e) {
            
            console.log(e);
               res.sendStatus(500);
           }
    
   //lesagencetouttransacagenceprincipale  
  
  // res.send({ agence : agence[0], agenceid : agenceid , transactdatedeux : transactdatedeux})

   }
 }
]
//La Liste des Agences Compencer 
exports.LesAgenceCompensers =  [
  async (req, res) => {

    if(req.cookies.admintelephone != null){ 

      try {  
        var nom = req.cookies.adminnom;
        var telephone = req.cookies.admintelephone
        var email = req.cookies.adminemail;
       
        var lesagencecompenser = await  Compensationns.lesagencecompenser(); 
        
       res.render('Super_admin/agencescompenser', { lesagencecompenser : lesagencecompenser , nom: nom, telephone: telephone, email: email})
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
    }else{

      res.redirect("/Superadmin/Login")
    }
     }
 ]
 //Selectionner l historique de Compensation d une Agence 
 
 exports.HistoriqueCompensersAgences =  [
   async (req, res) => {
    if(req.cookies.admintelephone != null){ 
    
      try {  
        var nom = req.cookies.adminnom;
        var telephone = req.cookies.admintelephone
        var email = req.cookies.adminemail;
        
        var idagence = req.params.idagence;
        var agence = await Agence.recupereunagence(idagence);
       
       
        var compensehistorik = await  Compensationns.historiqueagencecompenser(idagence); 
       
       res.render('Super_admin/historiqueagencecompenser', { agence :  agence[0], compensehistorik : compensehistorik, nom: nom, telephone: telephone, email: email})
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
    }else{

      res.redirect("/Superadmin/Login")
    }
      }
  ]
  //Facture de Compensation d une Agence 
  exports.FactureCompensationsAgences =  [
    async (req, res) => {
  
     try {  
       var nom = req.cookies.adminnom;
       var telephone = req.cookies.admintelephone
       var email = req.cookies.adminemail;
       
       var idagence = req.params.idagence;
       var idcompensation = req.params.idcompensation
       var lesdepotcomp = await LesDepots.historiquecompeseragence(idcompensation , idagence)
     var agence = await Agence.recupereunagence(idagence);
     var lesretraits = await LesRetaits.historiretraitcompenser(idcompensation, idagence)
      var unecompensation = await Compensationns.infohistocomp(idcompensation)
      res.render('Super_admin/facturecompensation', {unecompensation : unecompensation[0], lesretraits : lesretraits,  lesdepotcomp : lesdepotcomp, agence :  agence[0], nom: nom, telephone: telephone, email: email})
       } catch(e) {
           console.log(e);
           res.sendStatus(500);
       }
   
       }
   ]
//Les types de comptes 
exports.LestypeComptes  =  [
  async (req, res) => {
    if(req.cookies.admintelephone != null){ 
   
      try {  
        var typedecompte = await TypeCompte.Selectcompte();
         var nom = req.cookies.adminnom;
         var telephone = req.cookies.admintelephone;
         var email = req.cookies.adminemail;
         res.render('Super_admin/typescomptes', {typedecompte : typedecompte, nom: nom, telephone: telephone,})
        
        } catch(e) {
             console.log(e);
             res.sendStatus(500);
         }
     
    }else{

      res.redirect("/Superadmin/Login")
    }
   
     }
 ] 
 //La list des Comptes Finances 
 
exports.ListeCompteFinance  =  [
  async (req, res) => {

    if(req.cookies.admintelephone != null){ 

      try {  
        var typedecompte = await TypeCompte.Selectcompte();
        var comptefinances = await CompteFinance.Selectcomptefinance();
        var nom = req.cookies.adminnom;
         var telephone = req.cookies.admintelephone;
         var email = req.cookies.adminemail;
         res.render('Super_admin/comptefinance', {comptefinances : comptefinances, typedecompte : typedecompte, nom: nom, telephone: telephone})
        
        } catch(e) {
             console.log(e);
             res.sendStatus(500);
         }
     
     }else{
      res.redirect("/Superadmin/Login")
    }
     }
 ]
 //Ajout d un compte Finance 
exports.CompteFinanceajout =  [
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
     res.render('Super_admin/ToutTransacDeuxdate', { erreur: erreur})
     
     return;
   }
   else {
     

    try{

      var intitule = req.body.intitule;
      var numcpte = req.body.numcpte;
      var typecompte = req.body.typecompte;
      
      
      const AjoutCompte =  new CompteFinance({
        numcpte : numcpte,
        intcompte : intitule,
        typecompte  : typecompte
      })

      await CompteFinance.ajoutcptfinance(AjoutCompte)
      

      res.send({ success: "Enregister"})

    } catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
            
 
   }
 }
]
//Suppression d un Compte 
exports.Supprimercomptefinance  =  [
  async (req, res) => {

   try {  
     
    var idcpte = req.params.idcpte;
    await CompteFinance.supprimercompte(idcpte)
      res.redirect("/Superadmin/Lescomptefinances");
    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ] 
 //Modifier les Informations des Comptes de Finances 
 exports.ModifierInfoCpteFinance  =  [
  async (req, res) => {

   try {  
     
    var modifienumcpte = req.body.modifienumcpte;
    var modifierintitulecpte = req.body.modifierintitulecpte;
    var typecomptemo = req.body.typecomptemo;
    var idcptes = req.body.idcptes;
    await CompteFinance.infomodifier(idcptes, modifienumcpte, modifierintitulecpte, typecomptemo)
     
    
    res.send({success : 'hello'});
    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ] 
 //Page de Saisssie des Operation comptable
 exports.SaissieComptable  =  [
  async (req, res) => {

    if(req.cookies.admintelephone != null){ 
      try {  
        var typedecompte = await TypeCompte.Selectcompte();
        var lescomptes = await CompteFinance.Selectcomptefinance();
        var nom = req.cookies.adminnom;
         var telephone = req.cookies.admintelephone;
         var email = req.cookies.adminemail;
         
         res.render('Super_admin/saissiecomptable', {lescomptes : lescomptes, nom: nom, telephone: telephone})
        
        } catch(e) {
             console.log(e);
             res.sendStatus(500);
         }
     
     }else{

      res.redirect("/Superadmin/Login")
    }
   
     }
 ]
 //Ajout  d un saissie Comptables
 exports.AjoutOperationComptable  =  [
  async (req, res) => { 

   try {  
     
    var libecriture = req.body.libecriture;
    var datecriture = req.body.datecriture;
    var numcpte = req.body.numcpte;
    var debit = req.body.debit;
    var credit = req.body.credit;
    var reference = req.body.reference;
    var lesdebit = 0;
    var lescredit = 0;
    var nb = 0;
    if (!isEmpty(debit) && isArray(credit) &&  isArray(debit) && !isEmpty(credit) && !isEmpty(numcpte)) {
     debit.forEach(element => {
       nb += 1;
     var el =  toInteger(element)
       lesdebit +=  el;
     });
     credit.forEach(ele => {
      var cr =  toInteger(ele)
      lescredit += cr;
     });
     if (lesdebit !== lescredit) {
      res.send( {erreurdeoperation: "Votre Operation ne peut pas etre effectuer"})
      
     }
     if (lesdebit == lescredit ) {
       //insertion des ecritures 

       const newecrit = new Ecriture({
        dateecri:  new Date(),
        libeecri: libecriture,
        reference: reference
      })
var idecritt =   await Ecriture.ajoutecrit(newecrit);
    console.log(idecritt);
 
  
    for (var  i = 0; i < nb ; i++) {
      var  crd = credit[i];
      var dbit = debit[i];
     
//On recuperer l'id du numero de compte 
var bd =  await CompteFinance.uncompte(numcpte[i])
var idcpt = bd[0].idcpte;
//On creer les mvt 
const newmvt = new Mvt({
  ecritureid:  idecritt,
  compteid: idcpt,
  debit : dbit,
  credit : crd,
  regroupement : 0

})
//Ajout de mvt 
await Mvt.ajoutmvt(newmvt);

    }
//Operation reussi
res.send( {sucessoperation: "Votre Operation  a effectuer avec success"})
  
    }
    }
   
    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ]
 //Page pour voir les Etats Financier 
  //Page de Saisssie des Operation comptable
  exports.PageEtatsFinancier  =  [
    async (req, res) => {
  
      if(req.cookies.admintelephone != null){ 
        try {  
          var typedecompte = await TypeCompte.Selectcompte();
          var lescomptes = await CompteFinance.Selectcomptefinance();
          var nom = req.cookies.adminnom;
           var telephone = req.cookies.admintelephone;
           var email = req.cookies.adminemail;
           
           res.render('Super_admin/etatsfinancier', {lescomptes : lescomptes, nom: nom, telephone: telephone})
          
          } catch(e) {
               console.log(e);
               res.sendStatus(500);
           }
       
      }else{
        res.redirect("/Superadmin/Login")
      }
     
       }
   ]

    //Selection L'etat d un Compte entre Deux Dates 
    exports.Etatcompteadaterecherche  =    [
      async (req, res, next) => {
      var datedebut = req.body.datedebut; 
      var datefin = req.body.datefin;
      var numdecompte = req.body.numdecompte;
       try {  
      var letat = await Mvt.uncompteetat(datedebut, datefin, numdecompte)
      console.log(letat) 
      if(letat == ""){
        console.log("Veuillez inserer un etat")
        res.send({erreurdeoperation: "veuillez bien saisir les operations "})
      }else{
      
        res.send({letat: letat, datedebut: datedebut, datefin: datefin})  
      }
        } catch(e) {
             console.log(e);
             res.sendStatus(500);
         }
     
         }
     ]

  //Page Pour Afficher le Brouillard de Compte 
     exports.PageBrouillardeCompte  =  [
      async (req, res) => {
    
        if(req.cookies.admintelephone != null){  
          try {  
            var nom = req.cookies.adminnom;
             var telephone = req.cookies.admintelephone;
             var email = req.cookies.adminemail;
             
             res.render('Super_admin/brouillardcompte', {nom: nom, telephone: telephone})
            
            } catch(e) {
                 console.log(e);
                 res.sendStatus(500);
             }
         
        }else{
          res.redirect("/Superadmin/Login")
        }
      
         }
     ]
//Recherche du Brouillard de Compte entre Deux Date
exports.BrouillardcpteentreDeuxdate  =  [
  async (req, res, next) => {
  var datedebut = req.body.datedebut; 
  var datefin = req.body.datefin;
  var numdecompte = req.body.numdecompte;
   try {  

  var letat = await Mvt.uncompteetat(datedebut, datefin, numdecompte)
 
  if(letat == ""){
    console.log("Veuillez inserer un etat")
    res.send({erreurdeoperation: "veuillez bien saisir les operations "})
  }else{
  console.log(letat)
    res.send({letat: letat, datedebut: datedebut, datefin: datefin})  
  }
    } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
 
     }
 ]
 //Page Des Comptes de Resultats (Difference entre les Passif et les Actifs)
 
 //Affichage des comptes des resultats 
 exports.CompteResultat  =  [
  async (req, res) => {
    
    if(req.cookies.admintelephone != null){  

      try {  
        var nom = req.cookies.adminnom;
         var telephone = req.cookies.admintelephone;
         var email = req.cookies.adminemail;
         
        
        var lescharges = await Mvt.lescomptechargestoto();
        var lesproduits = await Mvt.lescompteproduitstoto();
      
         res.render('Super_admin/compteresultats', {lescharges: lescharges, lesproduits: lesproduits, nom: nom, telephone: telephone})
        
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }

     }else{

      res.redirect("/Superadmin/Login")
    }
    
 
 
     }
 ]
 //Page pour Modiifer les Informations D une Transaction
 exports.ModifierEcriture  =  [
  async (req, res) => {
     try {  
        var nom = req.cookies.adminnom;
         var telephone = req.cookies.admintelephone;
         var email = req.cookies.adminemail;
         
        
      var lescomptes = await CompteFinance.Selectcomptefinance();
         res.render('Super_admin/modifierecriture', { lescomptes: lescomptes, nom: nom, telephone: telephone})
        
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }

    
 
 
     }
 ]
 //Recherche les Informations De la 
 exports.InfoEcriture  =  [
  async (req, res, next) => {
    var numecrit = req.body.numecrit;  
     try {  
   var unereference = await Ecriture.unereference(numecrit); 
 
   var lescomptes = await CompteFinance.Selectcomptefinance();
  
   if(unereference == ""){
      console.log("Veuillez inserer un etat")
      res.send({erreureference: "veuillez bien saisir les refernce "})
    }else{
      var idecrit  = unereference[0].idec;
      var lesmvt = await Mvt.lesmvts(idecrit);
   
      
    res.send({lescomptes: lescomptes, lesmvt: lesmvt, unereference: unereference[0]})  
    }
      } catch(e) {
        
        console.log(e);
           res.sendStatus(500);
       }
       }
 ]
 
//Operation de modification des informations d'une ecriture une ecriture 
exports.ModifiecationEcriture  =  [
  async (req, res, next) => {

    var libelecrit = req.body.libelecrit;
    var datecriture = req.body.datecriture;
    var ecritureid = req.body.ecritureid;
    var refpiece = req.body.refpiece;
    var idmvt = req.body.idmvt;
    var credit = req.body.credit;
    var debit = req.body.debit;
    var numcpte = req.body.numcpte;
    var datedif = req.body.datedif;
    var mocredit = req.body.mocredit;
    var modebit = req.body.modebit;
    var monumcpte = req.body.monumcpte;
 

     try {  
   
    if (datedif <= 90) {
//la modification  peut  s'effectuer

//Modification des mvt 
var lesdebit = 0;
var lescredit = 0;
var nb = 0;//Le nombre d'incrementation des elements credits 
var tn = 0; //le nombre d incrementation des elements de modifcredit
//verifions dabord l existance des variables
var lesmodifcredit = null;
var lesmodifdebit = null;
var lesmodifnumcpte = null;
if (typeof modebit !== "undefined") {

if(typeof(mocredit) == "string"){
/**
* On verifie d abord si les mouvement a etre rajouter son pas des string
* si son en string on convertie en array  en suite on parcourt le tableau en ajoute tout les nouveau elements 
*/
lesmodifcredit = new Array(mocredit);
lesmodifdebit = new Array(modebit);
lesmodifnumcpte = new Array(monumcpte);
console.log(lesmodifcredit);
}else{
lesmodifcredit = mocredit;
lesmodifdebit = modebit;
lesmodifnumcpte = monumcpte;
}

}

if (  !isEmpty(debit)  && isArray(credit) &&  isArray(debit) && !isEmpty(credit) && !isEmpty(numcpte)) {
debit.forEach(element => {
nb += 1;
var el =  toInteger(element)
lesdebit +=  el;
});
credit.forEach(ele => {
var cr =  toInteger(ele)
lescredit += cr;
});
  if (typeof modebit !== "undefined") {

lesmodifcredit.forEach(elecr => {
var cr =  toInteger(elecr)
lescredit += cr;
});

lesmodifdebit.forEach(eledb => {
tn += 1;
var cr =  toInteger(eledb)
lesdebit += cr;
});


}



console.log(lescredit)
console.log(lesdebit)
if (lesdebit !== lescredit) {
res.send( {erreurbalance: "La somme des Debits ne corresponds pas la somme des credits "})

}
if (lesdebit == lescredit ) {
console.log("I love you")
//insertion des ecritures 

var verifier = null;
var erreurcompte = null;


for (var  i = 0; i < nb ; i++) {
var  crd = credit[i];
var dbit = debit[i];

//On recuperer l'id du numero de compte 
var bd =  await CompteFinance.uncompte(numcpte[i])

//Verifions si le numero de compte existes 
if (!isEmpty(bd) ) {
verifier = "Yes i did it";
console.log("Elle existe ")
console.log(bd[0].idcompte)
await Ecriture.modifierecrit(datecriture, ecritureid, libelecrit, refpiece, req.cookies.agentambassadeid );
await Mvt.modifiermvt(idmvt[i], crd, dbit, bd[0].idcpte) 
//Opeation reussi
}else{
//si un numero de compte ne correspond pas envoyer un message d'erreur 
erreurcompte = "Veuillez bien selectionner le numero de compte"

}

}

if (typeof modebit !== "undefined") {
//Ajout d un nouveau mouvement 
for (var  j = 0; j < tn ; j++) {
//On creer les mvt 
var  crd =  lesmodifcredit[j];
var dbit = lesmodifdebit[j];

//On recuperer l'id du numero de compte 
var bds =  await CompteFinance.uncompte(lesmodifnumcpte[j])

var idcpt = bds[0].idcpte;
//On creer les mvt 
const newmvt = new Mvt({
ecritureid:  ecritureid,
compteid: idcpt,
debit : dbit,
credit : crd,
regroupement : 0
})
//Ajout de mvt 
await Mvt.ajoutmvt(newmvt);
}
}
if (!isEmpty(verifier)) {
res.send( {sucessoperation: "Votre Operation  a effectuer avec success"})

}
if (!isEmpty(erreurcompte) ) {
res.send( {erreurcompte: erreurcompte})

}

}
} 
}else{
     //La modification ne peut pas s'effectuer
     res.send({dateinvalide: "Vous pouvez pas modifier"})  
  
    }
      } catch(e) {
        
        console.log(e);
           res.sendStatus(500);
       }
       }
 ]
//Page Pour rechercher la Balance a Date 
exports.BalanceAdate =  [
  async (req, res) => {
    
    if(req.cookies.admintelephone != null){  
      try {  
        var nom = req.cookies.adminnom;
         var telephone = req.cookies.admintelephone;
         var email = req.cookies.adminemail;
         
        
         res.render('Super_admin/balanceadate', { nom: nom, telephone: telephone})
        
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }

    
     }else{

      res.redirect("/Superadmin/Login")
    }
    
 
 
     }
 ]
  //Recherhce Balance A date 
  exports.BalanceAdateRecherche  =  [
    async (req, res, next) => {
      var datedebut = req.body.datedebut;  
      
       try { 
         var balance = await Mvt.balanceadate(datedebut);
          res.send({balance: balance, datedebut: datedebut })
      } catch(e) {
          
          console.log(e);
             res.sendStatus(500);
         }
         }
   ]
   //Page Pour recherhcher la Balance entre 2 date 
exports.BalancePeriodique =  [
  async (req, res) => {
    
    if(req.cookies.admintelephone != null){  

      try {  
        var nom = req.cookies.adminnom;
         var telephone = req.cookies.admintelephone;
         var email = req.cookies.adminemail;
         
        
         res.render('Super_admin/balanceperiodique', { nom: nom, telephone: telephone})
        
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }

    }else{
      res.redirect("/Superadmin/Login")
    }
    
 
 
     }
 ]
//Rechercher la balance Periodique 
  exports.BalancePeriodiqueRecherche  =  [
    async (req, res, next) => {
      var datedebut = req.body.datedebut;  
      
      var datefin = req.body.datefin;
       try { 
  
         var balance = await Mvt.balanceperiodique( datedebut, datefin);
          console.log(balance)
          res.send({balance: balance, datedebut: datedebut, datefin: datefin})
  
      } catch(e) {
          
          console.log(e);
             res.sendStatus(500);
         }
         }
   ]
   //Bilan
   
 exports.Bilan  =  [
  async (req, res) => {
    
    if(req.cookies.admintelephone != null){ 
      try {  
        var nom = req.cookies.adminnom;
         var telephone = req.cookies.admintelephone;
         var email = req.cookies.adminemail;
         
        var lesactifs = await Mvt.lescompteactifstoto();
        var lespassifs = await Mvt.lescomptepassiftoto();
      
       
   
         res.render('Super_admin/bilan', {nom: nom, lesactifs: lesactifs, lespassifs: lespassifs,   })
     
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    
     }else{
      res.redirect("/")
    }
    
 
 
     }
 ]