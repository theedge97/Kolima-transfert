const sql = require("../db.js");

// constructor de la table code activation

const Caissiercodereinitiallisation = function(code) {
  this.codereinitialisation	 = code.codereinitialisation;
  this.caisseid = code.caisseid;
};

Caissiercodereinitiallisation.verifier =  ( ) => {
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
Caissiercodereinitiallisation.ajoutcode = (newPays) => {

  return new Promise((resolve, reject)=>{
    sql.query("INSERT INTO caissiercodereinitiallisation  SET ?", newPays,  (error, enregistre)=>{
        if(error){
            return reject(error);
        }
        return resolve(enregistre);
    });
});
};
//Supprimer le Code De Reinitiallisation
Caissiercodereinitiallisation.supprimercode = (codereinitialisation) => {
  return new Promise((resolve, reject)=>{
    sql.query(`DELETE FROM caissiercodereinitiallisation WHERE codereinitialisation = "${codereinitialisation}" `,  (error, employees)=>{
        if(error){
            return reject(error);
        }
        return resolve(employees);
    });
});
};

module.exports = Caissiercodereinitiallisation;