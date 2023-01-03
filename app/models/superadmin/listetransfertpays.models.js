
const sql = require("../db.js");
//lISTE des Transfert  du Pays
const ListeTransfPays = function(liste) {
    this.nomtransfert = liste.nomtransfert;
    this.paysdestination = liste.paysdestination;
  };
//Selectionner la liste des Transfert de tous les Pays
ListeTransfPays.listetouttransfert = result => {
    return new Promise((resolve, reject)=>{
      sql.query("SELECT listetransfertpays.idlistetransf  AS idlistetransf , listetransfertpays.nomtransfert AS nomtransfert , pays.pays AS pays , pays.idpays AS idpays  FROM `listetransfertpays` INNER JOIN pays ON pays.idpays = listetransfertpays.paysdestination",  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selctionner la monaie du Pays
ListeTransfPays.selectlisteuntransfert = (paysid) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT listetransfertpays.idlistetransf  AS idlistetransf , listetransfertpays.nomtransfert AS nomtransfert , pays.pays AS pays , pays.idpays AS idpays  FROM listetransfertpays INNER JOIN pays ON pays.idpays = listetransfertpays.paysdestination WHERE listetransfertpays.paysdestination = ${paysid} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  ListeTransfPays.modifierlistetransfertmonaie = ( nomtransfert, 	paysdestination, idlistetransf) => {
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE listetransfertpays SET nomtransfert = "${nomtransfert}", 	paysdestination = ${paysdestination}  WHERE idlistetransf = ${idlistetransf}`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  ListeTransfPays.modifieragencedepot = ( valeur) => {
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE gain SET agencedepot = ${valeur} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Ajout des Listes des Transferts
  ListeTransfPays.ajoutlistemonaie = (newFrais) => {

    return new Promise((resolve, reject)=>{
      sql.query("INSERT INTO listetransfertpays SET ?", newFrais,  (error, enregistre)=>{
          if(error){
              return reject(error);
          }
          return resolve(enregistre);
      });
  });
  };
  //Supprimer une Liste de Monaie
  ListeTransfPays.supprimermonaie = (id) => {
    return new Promise((resolve, reject)=>{
      sql.query(`DELETE FROM listetransfertpays WHERE idlistetransf = ${id} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };


  module.exports =  ListeTransfPays;