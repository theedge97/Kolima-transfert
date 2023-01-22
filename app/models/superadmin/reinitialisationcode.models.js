
const sql = require("../db.js");

// constructor de la table code activation

const Reinitiallisationcode = function(code) {
  this.codereinitialisation = code.codereinitialisation;
  this.agencelier = code.agencelier;
};

Reinitiallisationcode.verifier =  ( ) => {
  return new Promise((resolve, reject)=>{
    sql.query(`SELECT * FROM codereinitialisation `,  (error, employees)=>{
        if(error){
            return reject(error);
        }
        return resolve(employees);
    });
});
};
//Ajout Code
Reinitiallisationcode.ajoutcode = (newPays) => {

  return new Promise((resolve, reject)=>{
    sql.query("INSERT INTO codereinitialisation  SET ?", newPays,  (error, enregistre)=>{
        if(error){
            return reject(error);
        }
        return resolve(enregistre);
    });
});
};
//Supprimer le Code De Reinitiallisation

Reinitiallisationcode.supprimercode = (code) => {
  return new Promise((resolve, reject)=>{
    sql.query(`DELETE FROM codereinitialisation WHERE codereinitialisation = "${code}" `,  (error, employees)=>{
        if(error){
            return reject(error);
        }
        return resolve(employees);
    });
});
};

module.exports = Reinitiallisationcode;