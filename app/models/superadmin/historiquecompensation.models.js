
const sql = require("../db.js");

// constructor


// Loko
const Compensationns = function(comp ) {
    this.agenceidcomp = comp.agenceidcomp;
    this.datecompensation = comp.datecompensation;
    this.repportsolde = comp.repportsolde;
    this.derniersolde = comp.derniersolde;

  };
//Selectionner les Agences qui ont compenser
Compensationns.lesagencecompenser = result => {
    return new Promise((resolve, reject)=>{
      sql.query("SELECT DISTINCT agenceidcomp , historiquecompensation.agenceidcomp,  agence.nomagence, agence.numeroAgence, agence.telephoneagence , pays.pays FROM `historiquecompensation` INNER JOIN agence ON agence.idagence = historiquecompensation.agenceidcomp INNER JOIN pays ON pays.idpays = agence.paysid ",  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
      //Ajout  d une Compensations
 Compensationns.ajoutcompensation = (newComp) => {

      return new Promise((resolve, reject)=>{
        sql.query("INSERT INTO historiquecompensation SET ?", newComp,  (error, enregistre)=>{
            if(error){
                return reject(error);
            }
            return resolve(enregistre.insertId);
        });
    });
      };
 //Selectionner l historique des Compensations d une Agence donner
 Compensationns.historiqueagencecompenser = (agenceidcomp ) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM historiquecompensation    WHERE agenceidcomp =   ${agenceidcomp}  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner les Information d un Historique d une Transaction
  Compensationns.infohistocomp = ( idcompense  ) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM historiquecompensation    WHERE  idcompense  =   ${ idcompense }  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Recuperer l'id de la Dernierere compensation
  Compensationns.derniercompenser = ( agenceidcomp  ) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT MAX(idcompense) AS idmaxcomp  FROM historiquecompensation    WHERE  agenceidcomp =${agenceidcomp}  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

  //Selectionner le repport a nouveau de la dernier compensation
  Compensationns.repportanouveau = ( idcompense  ) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT repportsolde FROM historiquecompensation    WHERE idcompense =${idcompense}  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  module.exports =  Compensationns;