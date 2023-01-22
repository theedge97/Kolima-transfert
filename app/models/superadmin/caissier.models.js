
const sql = require("../db.js");

// constructor


// constructor de la table code activation

const Caissiers = function(caisse) {
  this.nomcaissier = caisse.nomcaissier;
  this.prenomcaissier = caisse.prenomcaissier;
  this.telephonecaissier = caisse.telephonecaissier;
  this.genre = caisse.genre;
  this.motdepasse = caisse.motdepasse;
  this.agencelier = caisse.agencelier;
  this.statue = caisse.statue;
  this.blockage = caisse.blockage;
};
//selectionner Un Comptes Caissier
  Caissiers.Trouvercomptecaisse = (telephone ) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM caissier  INNER JOIN agence ON agence.idagence = caissier.agencelier LEFT JOIN pays on pays.idpays = agence.paysid LEFT JOIN ville ON ville.idville = agence.villeid LEFT JOIN lesmonaie ON lesmonaie.idmonaie = pays.devise WHERE telephonecaissier = "${telephone}"  `, (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Page
Caissiers.lescaissierdunagence =  ( id) => {
  return new Promise((resolve, reject)=>{
    sql.query(`SELECT * FROM caissier WHERE agencelier  = ${id} `,  (error, employees)=>{
        if(error){
            return reject(error);
        }
        return resolve(employees);
    });
});
};
//Selectionner la liste des Caissier Blockers
Caissiers.lescaissierblocker =  (id) => {
  return new Promise((resolve, reject)=>{
    sql.query(`SELECT * FROM caissier LEFT JOIN caissiercodereinitiallisation ON caissiercodereinitiallisation.caisseid = caissier.idcaiss  WHERE agencelier  = ${id} AND caissier.blockage = 1 `,  (error, employees)=>{
        if(error){
            return reject(error);
        }
        return resolve(employees);
    });
});
};
//Creation d une Caisses
Caissiers.ajoutcaisse = (newFrais) => {
    return new Promise((resolve, reject)=>{
      sql.query("INSERT INTO caissier SET ?", newFrais,  (error, enregistre)=>{
          if(error){
              return reject(error);
          }
          return resolve(enregistre);
      });
  });
  };
  //Selectionner les Inforamtions d un caissier
  Caissiers.selectlecaissier =  ( id) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM caissier WHERE idcaiss  = ${id} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Mettre a jour les informations du caissier
  Caissiers.majinfocaissier =  (idcaisse, 	nomcaissier, prenomcaissier, telephonecaissier ,  genre ) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE  caissier SET  	nomcaissier = "${nomcaissier}" , prenomcaissier = "${prenomcaissier}", telephonecaissier = "${telephonecaissier}"  , genre = "${genre}"   WHERE idcaiss = ${idcaisse}  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Blocker la page d un Caissier
  Caissiers.blockcompte =  (telephonecaissier) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE  caissier SET  	blockage = 1      WHERE telephonecaissier = "${telephonecaissier}"  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Mettre a jour le Mot de passe du Caissier
  Caissiers.majmotpasse =  (idcaisse, 	motdepasse) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE  caissier SET  	motdepasse = "${motdepasse}"   WHERE idcaiss = ${idcaisse}  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Changement de Statue d un Compte de Caissiee
  Caissiers.changestatue =  (idcaisse, 	idtype) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE  caissier SET  	statue = ${idtype}   WHERE idcaiss = ${idcaisse}  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Modifier le mot de passe du caissier
  Caissiers.blockermodepassemaj =  (telephone, 	motdepasse) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE  caissier SET  	motdepasse = "${motdepasse} ", blockage = 0   WHERE telephonecaissier = "${telephone}"  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };



module.exports = Caissiers;