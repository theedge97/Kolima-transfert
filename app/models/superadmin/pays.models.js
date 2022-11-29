
const sql = require("../db.js");

// constructor


// constructor
const Lespays = function(unpays) {
    this.idpays = unpays.idpays;
    this.pays = unpays.pays;

  };
//Selectionner les Pays
 
  Lespays.selectpays = ( ) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT * FROM pays `,  (error, payss)=>{
          if(error){
              return reject(error);
          }
          return resolve(payss);
      });
  });
  };
  
  //Selectionner un pays 
   Lespays.unpays = (idpays ) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM pays  WHERE idpays =   ${idpays} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //selectionner la devise d'une monaie 
  Lespays.unemonaie = (idpays ) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM pays  INNER JOIN lesmonaie ON lesmonaie.idmonaie = pays.devise  WHERE idpays =   ${idpays} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  }; 
  //Selectionner le nombre de distributeur
 /*

 Distributeur.nbrdistrib = (entrepriseid) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT COUNT(id_rateleurs)  FROM rateleurs WHERE 	id_entreprise = ${entrepriseid} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
 */
  
  
  module.exports = Lespays;