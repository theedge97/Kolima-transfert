
const sql = require("../db.js");

// constructor


// Loko
const Taux = function(echanges) {
    this.X1 = echanges.X1;
    this.X2 = echanges.X2;
    this.V1 = echanges.V1;
    this.V2 = echanges.V2;

  };
//Selectionner les taux d'echanges
Taux.lestaux = result => {
    return new Promise((resolve, reject)=>{
      sql.query("SELECT idtaux,  m.monaie AS monaie1 , V1 , n.monaie AS monaie2 ,  V2 FROM `tauxechanges` INNER JOIN lesmonaie AS m  ON m.idmonaie = tauxechanges.X1 INNER JOIN lesmonaie AS n  ON n.idmonaie = tauxechanges.X2  ",  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
      //Ajout  d un taux d'echanges
Taux.ajouttaux = (newTaux) => {

        return new Promise((resolve, reject)=>{
          sql.query("INSERT INTO tauxechanges SET ?", newTaux,  (error, enregistre)=>{
              if(error){
                  return reject(error);
              }
              return resolve(enregistre);
          });
      });
      };
    //Suppression d'un taux
    Taux.supprimertaux = (idtaux) => {
        return new Promise((resolve, reject)=>{
          sql.query(`DELETE FROM tauxechanges WHERE idtaux = ${idtaux} `,  (error, employees)=>{
              if(error){
                  return reject(error);
              }
              return resolve(employees);
          });
      });
      };
      //Modification du nom de la monaie
      Taux.modifiertaux = (V1, V2, idtaux) => {
        return new Promise((resolve, reject)=>{
          sql.query(`UPDATE  tauxechanges SET V1 = ${V1} , V2 = ${V2}  WHERE idtaux = ${idtaux} `,  (error, employees)=>{
              if(error){
                  return reject(error);
              }
              return resolve(employees);
          });
      });
      };
   //Selectionner un taux d'echanges
   Taux.untaux = (monaie1, monaie2) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT idtaux,  m.monaie AS monaie1 , V1 , n.monaie AS monaie2 ,  V2 FROM tauxechanges INNER JOIN lesmonaie AS m  ON m.idmonaie = tauxechanges.X1 INNER JOIN lesmonaie AS n  ON n.idmonaie = tauxechanges.X2   WHERE m.monaie =  "${monaie1}" AND  n.monaie = "${monaie2}" `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionnner les Taux  d echange entre deux monaie
  Taux.lestauxechanges = (monaie1, monaie2) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT idtaux,  m.monaie AS monaie1 , V1 , n.monaie AS monaie2 ,  V2 FROM tauxechanges INNER JOIN lesmonaie AS m  ON m.idmonaie = tauxechanges.X1 INNER JOIN lesmonaie AS n  ON n.idmonaie = tauxechanges.X2   WHERE X1 = ${monaie1} AND  X2 = ${monaie2} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

  module.exports = Taux;