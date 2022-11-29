//SELECT * FROM `frais` INNER JOIN lesmonaie ON lesmonaie.idmonaie = frais.monaieid WHERE valeur1 <= 400000 AND valeur2 >= 400000

const sql = require("../db.js");

// constructor


// Loko
const Frais = function(lesfrais) {
    this.monaieid = lesfrais.monaieid;
    this.valeur1 = lesfrais.valeur1;
    this.valeur2 = lesfrais.valeur2;
    this.frais = lesfrais.frais;
   
  };
//Selectionner les frais 
Frais.lesfrais = result => {
    return new Promise((resolve, reject)=>{
      sql.query("SELECT * FROM `frais` INNER JOIN lesmonaie ON lesmonaie.idmonaie = frais.monaieid   ",  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
      //Ajout  d un  Frais
Frais.ajoutfrais = (newFrais) => {
    
        return new Promise((resolve, reject)=>{
          sql.query("INSERT INTO frais SET ?", newFrais,  (error, enregistre)=>{
              if(error){
                  return reject(error);
              }
              return resolve(enregistre);
          });
      });
      }; 
 //Suppression d'un frais
Frais.supprimerfrais = (idfrais) => {
        return new Promise((resolve, reject)=>{
          sql.query(`DELETE FROM frais WHERE idfrais = ${idfrais} `,  (error, employees)=>{
              if(error){
                  return reject(error);
              }
              return resolve(employees);
          });
      });
      }; 
//Selectionnez un frais
Frais.unfrais = (somme, devise ) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM frais INNER JOIN lesmonaie ON lesmonaie.idmonaie = frais.monaieid   WHERE valeur1 <=   ${somme} AND valeur2 >=  ${somme} AND monaieid =  ${devise}  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
    
  
  module.exports = Frais;