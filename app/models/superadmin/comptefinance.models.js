
const sql = require("../db.js");
// constructor
const CompteFinance = function(cpte) {
  this.numcpte = cpte.numcpte;
  this.intcompte = cpte.intcompte;
  this.typecompte = cpte.typecompte;
};

//selectionner Un Comptes Caissier
CompteFinance.Selectcomptefinance = ( ) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM compte INNER JOIN type_de_compte ON type_de_compte.idtypecpte = compte.typecompte `, (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Ajout d un Compte Finance
  CompteFinance.ajoutcptfinance = (newCompte) => {

    return new Promise((resolve, reject)=>{
      sql.query("INSERT INTO compte SET ?", newCompte,  (error, enregistre)=>{
          if(error){
              return reject(error);
          }
          return resolve(enregistre.insertId);
      });
  });
  };
  //Supprier un Compte Finance
   //Suppression d'un Ambassade
 CompteFinance.supprimercompte = (idcpte) => {
    return new Promise((resolve, reject)=>{
      sql.query(`DELETE FROM compte  WHERE idcpte = ${idcpte} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Modifier les Informations des Compte Finance
  CompteFinance.infomodifier = ( idcpte, 	numcpte, intcompte, typecompte) => {
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE  compte SET 	numcpte = ${numcpte}, intcompte = '${intcompte}', typecompte = '${typecompte}'  WHERE  idcpte = ${ idcpte} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
    //Selectionner un numero l'id de compte dont l id
    CompteFinance.uncompte = (ncpte) => {
        return new Promise((resolve, reject)=>{
          sql.query(`SELECT idcpte FROM compte WHERE numcpte = ${ncpte} `,  (error, employees)=>{
              if(error){
                  return reject(error);
              }
              return resolve(employees);
          });
      });
      };
module.exports = CompteFinance;