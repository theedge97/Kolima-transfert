
const sql = require("../db.js");

// constructor


// Les Monaies
const Monaies = function(lamonaie) {
    this.monaie = lamonaie.monaie;

  };
//Selectionner les Monaies
Monaies.lesmonaies = result => {
    return new Promise((resolve, reject)=>{
      sql.query("SELECT * FROM lesmonaie",  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Selectioner les monaies en fonction du pays
//SELECT * FROM `lesmonaie` INNER JOIN pays ON pays.devise = lesmonaie.idmonaie
Monaies.unemonaiepays = (idpays ) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM lesmonaie INNER JOIN pays ON pays.devise = lesmonaie.idmonaie  WHERE pays.idpays =   ${idpays} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Suppression d'une monaie
    Monaies.supprimermonaie = (idmonaie) => {
        return new Promise((resolve, reject)=>{
          sql.query(`DELETE FROM lesmonaie WHERE lesmonaie.idmonaie = ${idmonaie} `,  (error, employees)=>{
              if(error){
                  return reject(error);
              }
              return resolve(employees);
          });
      });
      };
      //Modification du nom de la monaie
      Monaies.modifiermonaie = (nom, idmonaie) => {
        return new Promise((resolve, reject)=>{
          sql.query(`UPDATE  lesmonaie SET monaie = "${nom}"  WHERE lesmonaie.idmonaie = ${idmonaie} `,  (error, employees)=>{
              if(error){
                  return reject(error);
              }
              return resolve(employees);
          });
      });
      };
      //Ajout  d une monaie
      Monaies.ajoutmonaie = (newMonaie) => {

        return new Promise((resolve, reject)=>{
          sql.query("INSERT INTO lesmonaie SET ?", newMonaie,  (error, enregistre)=>{
              if(error){
                  return reject(error);
              }
              return resolve(enregistre);
          });
      });
      };
      //recuperer la valeur d'une   monaie

      //Selectionner la monaie




  module.exports = Monaies;