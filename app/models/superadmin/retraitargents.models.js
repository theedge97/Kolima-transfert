
const sql = require("../db.js");

// constructor

const Retraitargenttrans = function(retrait) {
    this.idtransactr = retrait.idtransactr;
    this.idagenceretrait = retrait.idagenceretrait;
    this.caissierretraitid = retrait.caissierretraitid;
    this.commission = retrait.commission;
    this.compensationr = retrait.compensationr;
    this.historiquercompensr = retrait.historiquercompensr;
  };

//Selectionner les Retrait d argents
Retraitargenttrans.lesretraits = result => {
    return new Promise((resolve, reject)=>{
      sql.query("SELECT * FROM `retraitargent` INNER JOIN lesmonaie ON lesmonaie.idmonaie = frais.monaieid   ",  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

  //Selectionnner toute les transaction de retrait des Transaction non Compenser
  Retraitargenttrans.retraitnomcompenser = (idagenceretrait)  => {
    return new Promise((resolve, reject)=>{
      sql.query( `SELECT  retraitargent.idretrait AS idretrait, retraitargent.commission AS commissionretrait , transaction.montantlocale AS montantlocale , client.Nomexpediteur AS Nomexpediteur, client.Nomreceveur AS Nomreceveur , transaction.Datetransaction AS Datetransaction FROM retraitargent INNER JOIN transaction ON transaction.idtransac = retraitargent.idtransactr INNER JOIN client ON client.idclient = transaction.Clientid WHERE retraitargent.idagenceretrait =  ${idagenceretrait} AND retraitargent.compensationr = 0`  ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner toute les transactions de Retrait
  Retraitargenttrans.historiretraitcompenser = (comphistorik , idagenceretrait)  => {
    return new Promise((resolve, reject)=>{
      sql.query( `SELECT  retraitargent.idretrait AS idretrait, retraitargent.commission AS commissionretrait , transaction.montantlocale AS montantlocale , client.Nomexpediteur AS Nomexpediteur, client.Nomreceveur AS Nomreceveur , transaction.Datetransaction AS Datetransaction FROM retraitargent INNER JOIN transaction ON transaction.idtransac = retraitargent.idtransactr INNER JOIN client ON client.idclient = transaction.Clientid WHERE retraitargent.historiquercompensr =  ${comphistorik} AND retraitargent.idagenceretrait =  ${idagenceretrait} AND retraitargent.compensationr = 1`  ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };


  //Compenser la transaction retrait d une agence
  Retraitargenttrans.compensertransacretrait  = (idretrait, comhist)  => {
    return new Promise((resolve, reject)=>{
      sql.query( `UPDATE  retraitargent SET  compensationr = 1 , historiquercompensr =  ${comhist}  WHERE idretrait = ${idretrait} `  ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

  //Selectionner le Tout les nombre de retraits  d'un agence
Retraitargenttrans.nbreretraitunagence = (idagenceretrait)  => {
    return new Promise((resolve, reject)=>{
      sql.query( `SELECT COUNT(idretrait) AS nbre FROM retraitargent WHERE idagenceretrait = ${idagenceretrait} `  ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre de Retrait journalier d un Agence
  Retraitargenttrans.nbreretraitjour = (idagenceretrait)  => {
    return new Promise((resolve, reject)=>{
      sql.query( `SELECT COUNT(idretrait) AS nbre FROM retraitargent INNER JOIN transaction ON transaction.idtransac = retraitargent.idtransactr WHERE idagenceretrait = ${idagenceretrait}  AND DATE(transaction.Datevalidation)= CURRENT_DATE  `  ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre De Retrait Hebdomadaire
  Retraitargenttrans.nbreretraithebdommadaire = (idagenceretrait)  => {
    return new Promise((resolve, reject)=>{
      sql.query( `SELECT COUNT(idretrait) AS nbre FROM retraitargent INNER JOIN transaction ON transaction.idtransac = retraitargent.idtransactr WHERE idagenceretrait = ${idagenceretrait}  AND WEEK(transaction.Datevalidation) = WEEK(NOW())    `  ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre de retrait Mensuel
  Retraitargenttrans.nbreretraitmensuel = (idagenceretrait)  => {
    return new Promise((resolve, reject)=>{
      sql.query( `SELECT COUNT(idretrait) AS nbre FROM retraitargent INNER JOIN transaction ON transaction.idtransac = retraitargent.idtransactr WHERE idagenceretrait = ${idagenceretrait}  AND  MONTH(transaction.Datevalidation)= MONTH(NOW())      `  ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre De Retrait Anneul
  Retraitargenttrans.nbreretraitannuel = (idagenceretrait)  => {
    return new Promise((resolve, reject)=>{
      sql.query( `SELECT COUNT(idretrait) AS nbre FROM retraitargent INNER JOIN transaction ON transaction.idtransac = retraitargent.idtransactr WHERE idagenceretrait = ${idagenceretrait}  AND   YEAR(transaction.Datevalidation) = YEAR(NOW())  `  ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

  //Somme des Commission des Retrait
  Retraitargenttrans.sommetoutcommission = (idagenceretrait)  => {
    return new Promise((resolve, reject)=>{
      sql.query( `SELECT SUM(commission) AS toutcommssion FROM retraitargent WHERE idagenceretrait  = ${idagenceretrait} `  ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

  //Sommes des Commissions des retraits journalier d une Agence
  Retraitargenttrans.commissionjourtretrait = (idagenceretrait)  => {
    return new Promise((resolve, reject)=>{
      sql.query( `SELECT SUM(commission) AS toutcommssion FROM retraitargent INNER JOIN transaction ON transaction.idtransac = retraitargent.idtransactr WHERE idagenceretrait = ${idagenceretrait}  AND DATE(transaction.Datevalidation)= CURRENT_DATE  `  ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Sommes des Commissions des retraits journalier d une Agence
   Retraitargenttrans.caissecommissionjourtretrait = (idagenceretrait, caisseid)  => {
    return new Promise((resolve, reject)=>{
      sql.query( `SELECT SUM(commission) AS toutcommssion FROM retraitargent INNER JOIN transaction ON transaction.idtransac = retraitargent.idtransactr WHERE idagenceretrait = ${idagenceretrait}  AND DATE(transaction.Datevalidation)= CURRENT_DATE  AND caissierretraitid = ${caisseid} `  ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Sommes des
  //Sommes des Comission des Retrait hebdomandaire3 d une agence
  Retraitargenttrans.commissionsemainetretrait = (idagenceretrait)  => {
    return new Promise((resolve, reject)=>{
      sql.query( `SELECT SUM(commission) AS toutcommssion FROM retraitargent INNER JOIN transaction ON transaction.idtransac = retraitargent.idtransactr WHERE idagenceretrait = ${idagenceretrait}  AND  WEEK(transaction.Datevalidation) = WEEK(NOW())  `  ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Sommmes des Commission de Retrait Mensuel
  Retraitargenttrans.commissionmensuelretrait = (idagenceretrait)  => {
    return new Promise((resolve, reject)=>{
      sql.query( `SELECT SUM(commission) AS toutcommssion FROM retraitargent INNER JOIN transaction ON transaction.idtransac = retraitargent.idtransactr WHERE idagenceretrait = ${idagenceretrait}  AND MONTH(transaction.Datevalidation)= MONTH(NOW())  `  ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

  //Sommes des Commissions de retrait d une agence entre deux Deux Date
  Retraitargenttrans.commissiondeuxdateretrait = (idagenceretrait, debut, fin)  => {
    return new Promise((resolve, reject)=>{
      sql.query( `SELECT SUM(retraitargent.commission) AS toutcommssion FROM retraitargent INNER JOIN transaction ON transaction.idtransac = retraitargent.idtransactr WHERE idagenceretrait = ${idagenceretrait}  AND DATE(transaction.Datevalidation) BETWEEN '${debut}' AND '${fin}'  `  ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Sommes de Tout les Comissions de retrait entre deux date de tous les Transactions
  Retraitargenttrans.toutcommissiondeuxdateretrait = ( debut, fin)  => {
    return new Promise((resolve, reject)=>{
      sql.query( `SELECT SUM(commission) AS toutcommssion FROM retraitargent INNER JOIN transaction ON transaction.idtransac = retraitargent.idtransactr WHERE DATE(transaction.Datevalidation) BETWEEN '${debut}' AND '${fin}'  `  ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
      //Ajout  d un  Frais
Retraitargenttrans.ajoutretraitargent = (newFrais) => {

        return new Promise((resolve, reject)=>{
          sql.query("INSERT INTO retraitargent SET ?", newFrais,  (error, enregistre)=>{
              if(error){
                  return reject(error);
              }
              return resolve(enregistre);
          });
      });
      };
 //Suppression d'un frais
 Retraitargenttrans.supprimerretraitargent = (idfrais) => {
        return new Promise((resolve, reject)=>{
          sql.query(`DELETE FROM retraitargent WHERE idfrais = ${idfrais} `,  (error, employees)=>{
              if(error){
                  return reject(error);
              }
              return resolve(employees);
          });
      });
      };
//Selectionnez un Retrait
Retraitargenttrans.unretrait = (somme, devise ) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM retraitargent INNER JOIN lesmonaie ON lesmonaie.idmonaie = frais.monaieid   WHERE valeur1 <=   ${somme} AND valeur2 >=  ${somme} AND monaieid =  ${devise}  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };


  module.exports = Retraitargenttrans;