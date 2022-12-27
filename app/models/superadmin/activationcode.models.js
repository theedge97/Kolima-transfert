const sql = require("../db.js");
// constructor de la table code activation
const CodeActivation = function(code) {
  this.lecode = code.lecode;
};
//Ajout  d un Code Activation 
CodeActivation.ajoutcode = (newAgence) => {
    
    return new Promise((resolve, reject)=>{
      sql.query("INSERT INTO activationcode SET ?", newAgence,  (error, enregistre)=>{
          if(error){
              return reject(error);
          }
          return resolve(enregistre);
      });
  });
  };
  //Verifion si le code d'activation existe 
  CodeActivation.VerifionsCode = (lecode) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM activationcode  WHERE lecode = "${lecode}"  `, (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Suppression du Code d activation 
CodeActivation.SuppresionCode = (idcode) => {
    return new Promise((resolve, reject)=>{
      sql.query(`DELETE  FROM activationcode  WHERE idcode = ${idcode}  `, (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

  
  module.exports = CodeActivation;