
const sql = require("../db.js");

// constructor
const Lespays = function(unpays) {
    this.idpays = unpays.idpays;
    this.pays = unpays.pays;
    this.indicatif = unpays.indicatif;
    this.codeiso = unpays.codeiso;
    this.devise = unpays.devise;
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
  //Selectionnner tout les Pays et leur monaies
  Lespays.toutpays = ( ) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT * FROM pays INNER JOIN lesmonaie ON lesmonaie.idmonaie = pays.devise`,  (error, payss)=>{
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

  //Ajouter une Ville
  Lespays.ajoutpays = (newPays) => {

    return new Promise((resolve, reject)=>{
      sql.query("INSERT INTO pays SET ?", newPays,  (error, enregistre)=>{
          if(error){
              return reject(error);
          }
          return resolve(enregistre);
      });
  });
  };
  //Modifier les Informations du pays
  Lespays.modifierinfopays = ( nompays , indicatif, codeiso , devise, idpays ) => {
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE pays SET pays = '${nompays}' , indicatif = '${indicatif}' , codeiso = '${codeiso}', devise = ${devise}  WHERE idpays = ${idpays}`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

  module.exports = Lespays;