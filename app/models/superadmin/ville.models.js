
const sql = require("../db.js");

// constructor


// constructor
const Lesville = function(uneville) {
    this.idville = uneville.idville;
    this.ville = uneville.pays;
    //
  };
//Selectionner les Ville

  Lesville.selectville = ( ) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT * FROM ville `,  (error, villes)=>{
          if(error){
              return reject(error);
          }
          return resolve(villes);
      });
  });
  };
  //Selectionner la ville en fonction de l id envoyer
  Lesville.lesvilles  = ( idpays) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT * FROM ville  WHERE idpays =   ${idpays} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

  //Selctionner une ville
  Lesville.uneville  = ( idville) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT * FROM ville  WHERE idville =   ${idville} `,  (error, employees)=>{
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


  module.exports = Lesville;