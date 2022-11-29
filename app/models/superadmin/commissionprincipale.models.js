//Tables des commission de l agence principale
//commissionprincipale
const sql = require("../db.js");

// Envoie du 
const Comissionprincipale = function(com) {
    this.idtransactioncom = com.idtransactioncom;
    this.comission = com.comission;
   
  };
//Selectionner les Commission
Comissionprincipale.lescommission = result => {
    return new Promise((resolve, reject)=>{
      sql.query("SELECT * FROM `commissionprincipale` INNER JOIN lesmonaie ON lesmonaie.idmonaie = frais.monaieid   ",  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selection les Commissions de l'Agence Principale entre deux Dates Donnner
  Comissionprincipale.toutcommissiondeuxdates = (debut, fin) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(comission) AS toutcomission FROM commissionprincipale INNER JOIN transaction ON transaction.idtransac = commissionprincipale.idtransactioncom WHERE  DATE(transaction.Datevalidation) BETWEEN '${debut}' AND '${fin}'  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  
      //Ajout  d un  Envoie d argent 
Comissionprincipale.ajoutcomi = (newFrais) => {
    
        return new Promise((resolve, reject)=>{
          sql.query("INSERT INTO commissionprincipale SET ?", newFrais,  (error, enregistre)=>{
              if(error){
                  return reject(error);
              }
              return resolve(enregistre);
          });
      });
      }; 
 //Suppression d'un Envoie  d argent
 Comissionprincipale.supprimerenvoieargent = (idfrais) => {
        return new Promise((resolve, reject)=>{
          sql.query(`DELETE FROM commissionprincipale WHERE idfrais = ${idfrais} `,  (error, employees)=>{
              if(error){
                  return reject(error);
              }
              return resolve(employees);
          });
      });
      }; 
//Selectionnez un Envoie d argent 
Comissionprincipale.unenvoie = (somme, devise ) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM commissionprincipale INNER JOIN lesmonaie ON lesmonaie.idmonaie = frais.monaieid   WHERE valeur1 <=   ${somme} AND valeur2 >=  ${somme} AND monaieid =  ${devise}  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
    
  
  module.exports = Comissionprincipale;