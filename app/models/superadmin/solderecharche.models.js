//Historique des Rechargement des Agences solderecharche

const sql = require("../db.js");

// constructor


// constructor
const Solderecharche = function(solde) {
    this.agenceid = solde.agenceid;
    this.daterecharge = solde.daterecharge;
    this.somme = solde.somme;
    //
  };

  //Rechargement d un Agence
Solderecharche.rechargeagence = (newRecharge) => {

    return new Promise((resolve, reject)=>{
      sql.query("INSERT INTO solderecharche SET ?", newRecharge,  (error, enregistre)=>{
          if(error){
              return reject(error);
          }

          return resolve(enregistre);
      });
  });
  };
//Selection les historiques de rechargements
  Solderecharche.historiquerecharge  = ( agenceid) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT * FROM solderecharche INNER JOIN agence ON agence.idagence = solderecharche.agenceid  WHERE agenceid =   ${agenceid} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };





  module.exports = Solderecharche;