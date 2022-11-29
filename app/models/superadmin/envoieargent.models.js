//Envoie d argents 
const sql = require("../db.js");

// Envoie du 
const Envoieargenttrans = function(envoie) {
    this.transactionid = envoie.transactionid;
    this.idagencenvoie = envoie.idagencenvoie;
    this.caissierenvoieid = envoie.caissierenvoieid;
    this.commission = envoie.commission;
    this.compensation = envoie.compensation;
    this.compenshistorique = envoie.compenshistorique;   
  };
//Selectionner les Envoies d argents 
Envoieargenttrans.lesenvoies = result => {
    return new Promise((resolve, reject)=>{
      sql.query("SELECT * FROM `envoieargent` INNER JOIN lesmonaie ON lesmonaie.idmonaie = frais.monaieid   ",  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Tout les Comissions de Depots
  
Envoieargenttrans.toutlescommissiondepot = (idagence)  => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(commission) AS tout FROM envoieargent WHERE idagencenvoie   =  ${idagence} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

  //Selection de tout les Commission  Journalier  d une Agence 
  Envoieargenttrans.journalierlescommissiondepot = (idagence)  => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(commission) AS tout FROM envoieargent INNER JOIN transaction ON transaction.idtransac = envoieargent.transactionid WHERE idagencenvoie =   ${idagence} AND DATE(transaction.Datevalidation)= CURRENT_DATE   `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selection tout les commission de Depot d une caisse 
  Envoieargenttrans.caissejournalierlescommissiondepot = (idagence, idcaisse)  => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(commission) AS tout FROM envoieargent INNER JOIN transaction ON transaction.idtransac = envoieargent.transactionid WHERE idagencenvoie =   ${idagence} AND DATE(transaction.Datevalidation)= CURRENT_DATE AND envoieargent.caissierenvoieid =  ${idcaisse} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
 //Selection de tout les Commission  ENtre Deux Date   d une Agence
 Envoieargenttrans.deuxdateslescommissiondepot = (idagence, debut, fin)  => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(commission) AS tout FROM envoieargent INNER JOIN transaction ON transaction.idtransac = envoieargent.transactionid WHERE idagencenvoie =   ${idagence} AND DATE(transaction.Datevalidation) BETWEEN '${debut}' AND '${fin}' `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Tout les commission depot entre deux date 
  Envoieargenttrans.toutlescommissiondepot = ( debut, fin)  => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(commission) AS tout FROM envoieargent INNER JOIN transaction ON transaction.idtransac = envoieargent.transactionid WHERE  DATE(transaction.Datevalidation) BETWEEN '${debut}' AND '${fin}' `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

 //Nombre de de depots Journaliers
  
Envoieargenttrans.nbredepotjour = (idagence)  => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idenvoie) AS nbre FROM envoieargent INNER JOIN transaction ON transaction.idtransac = envoieargent.transactionid WHERE idagencenvoie = ${idagence} AND DATE(transaction.Datevalidation)= CURRENT_DATE   `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Nombre de Depot Hebdomadaire

Envoieargenttrans.nbredepotsemaine = (idagence)  => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idenvoie) AS nbre FROM envoieargent INNER JOIN transaction ON transaction.idtransac = envoieargent.transactionid WHERE idagencenvoie = ${idagence} AND  WEEK(transaction.Datevalidation) = WEEK(NOW())   `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre De Depot Mensuel
  
Envoieargenttrans.nbredepotmensuel = (idagence)  => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idenvoie) AS nbre FROM envoieargent INNER JOIN transaction ON transaction.idtransac = envoieargent.transactionid WHERE idagencenvoie = ${idagence} AND   MONTH(transaction.Datevalidation)= MONTH(NOW())   `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Tout les Commission de Depot Jourmaliers

Envoieargenttrans.jourcommissiondepot = (idagence)  => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(commission) AS tout FROM envoieargent INNER JOIN transaction ON transaction.idtransac = envoieargent.transactionid WHERE idagencenvoie = ${idagence} AND DATE(transaction.Datevalidation)= CURRENT_DATE  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Tout les Commission de Depot Hebdomamadaire
Envoieargenttrans.semainecommissiondepot = (idagence)  => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(commission) AS tout FROM envoieargent INNER JOIN transaction ON transaction.idtransac = envoieargent.transactionid WHERE idagencenvoie = ${idagence} AND    WEEK(transaction.Datevalidation) = WEEK(NOW())   `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Tout les Commission de depot Mensuel
Envoieargenttrans.mensuelcommissiondepot = (idagence)  => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(commission) AS tout FROM envoieargent INNER JOIN transaction ON transaction.idtransac = envoieargent.transactionid WHERE idagencenvoie = ${idagence} AND    MONTH(transaction.Datevalidation)= MONTH(NOW())  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Tout les Commission de Depot Annuel
Envoieargenttrans.annuelcommissiondepot = (idagence)  => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(commission) AS tout FROM envoieargent INNER JOIN transaction ON transaction.idtransac = envoieargent.transactionid WHERE idagencenvoie = ${idagence} AND     YEAR(transaction.Datevalidation) = YEAR(NOW())`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Selectionner tout les depots  d un Agence  
Envoieargenttrans.toutdepotdunagence = (idagence)  => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idenvoie) AS nbre  FROM envoieargent WHERE idagencenvoie =  ${idagence} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
      //Ajout  d un  Envoie d argent 
Envoieargenttrans.ajoutenvoieargent = (newFrais) => {
    
        return new Promise((resolve, reject)=>{
          sql.query("INSERT INTO envoieargent SET ?", newFrais,  (error, enregistre)=>{
              if(error){
                  return reject(error);
              }
              return resolve(enregistre);
          });
      });
      }; 
 //Suppression d'un Envoie  d argent
Envoieargenttrans.supprimerenvoieargent = (idfrais) => {
        return new Promise((resolve, reject)=>{
          sql.query(`DELETE FROM envoieargent WHERE idfrais = ${idfrais} `,  (error, employees)=>{
              if(error){
                  return reject(error);
              }
              return resolve(employees);
          });
      });
      }; 
//Selectionnez un Envoie d argent 
Envoieargenttrans.unenvoie = (somme, devise ) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM envoieargent INNER JOIN lesmonaie ON lesmonaie.idmonaie = frais.monaieid   WHERE valeur1 <=   ${somme} AND valeur2 >=  ${somme} AND monaieid =  ${devise}  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner toute les transactions qui sont pas encore compenser
 
Envoieargenttrans.lestransactiondepotnoncompenser =  (agenceidenvoie ) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT envoieargent.idenvoie  AS idenvoie, envoieargent.commission AS commissiondepot , transaction.Sommeenvoie, client.Nomexpediteur AS Nomexpediteur, client.Nomreceveur AS Nomreceveur , transaction.Datetransaction AS Datetransaction FROM envoieargent INNER JOIN transaction ON transaction.idtransac = envoieargent.transactionid INNER JOIN client ON client.idclient = transaction.Clientid  WHERE  envoieargent.idagencenvoie = ${agenceidenvoie} AND envoieargent.compensation = 0   `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Compenser toute les transactions depot 
Envoieargenttrans.compenserlatransacdepot =  (idenvoie, comhist ) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE  envoieargent SET  compensation = 1 , compenshistorique = ${comhist}   WHERE idenvoie = ${idenvoie}  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner toute les Transactions compenser en fonction de l historique
  
Envoieargenttrans.historiquecompeseragence =  (historikcompid ,agenceidenvoie ) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT envoieargent.idenvoie  AS idenvoie, envoieargent.commission AS commissiondepot , transaction.Sommeenvoie, client.Nomexpediteur AS Nomexpediteur, client.Nomreceveur AS Nomreceveur , transaction.Datetransaction AS Datetransaction FROM envoieargent INNER JOIN transaction ON transaction.idtransac = envoieargent.transactionid INNER JOIN client ON client.idclient = transaction.Clientid  WHERE   envoieargent.compenshistorique = ${historikcompid}  AND  envoieargent.idagencenvoie = ${agenceidenvoie} AND envoieargent.compensation = 1   `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  
  module.exports = Envoieargenttrans;