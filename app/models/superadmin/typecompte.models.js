
const sql = require("../db.js");

// constructor 
const TypeCompte = function(cpte) {
  this.libcpte = cpte.libcpte;
};
//selectionner Un Comptes Caissier
TypeCompte.Selectcompte = ( ) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM type_de_compte `, (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

module.exports = TypeCompte;