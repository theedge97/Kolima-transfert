
const sql = require("../db.js");

//Les Taux de Frais d envoie 
const Tauxfraisenvoie = function(taux) {
    this.letaux = taux.letaux;
    this.lamonaieid = taux.lamonaieid;
    
  };
  

//Select  
 
Tauxfraisenvoie.ajoutfraistaux = (newClient) => {
    
    return new Promise((resolve, reject)=>{
      sql.query("INSERT INTO tauxfraisenvoie SET ?", newClient,  (error, enregistre)=>{
          if(error){
              return reject(error);
          }
          return resolve(enregistre.insertId);
      });
  });
  };
  //Modificattion des Informations du Client lors d úne Transaction 
  
  Tauxfraisenvoie.ModifierTauxFraisEnvoie = (	letaux, lamonaieid, 	idtauenvw) => {
    
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE tauxfraisenvoie SET  	letaux= ${letaux}, lamonaieid = ${lamonaieid} WHERE 	idtauenvw = ${idtauenvw}  `,  (error, enregistre)=>{
          if(error){
              return reject(error);
          }
          return resolve(enregistre.insertId);
      });
  });
  };
  //Recuperation des Information de L envoyeur 
  Tauxfraisenvoie.recupererInfo =  ( telephoneenvoyeur) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM tauxfraisenvoie `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectioner les Taux de Frais d envoie 
  Tauxfraisenvoie.SelectFraisEnvoie = ( ) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM tauxfraisenvoie INNER JOIN lesmonaie ON lesmonaie.idmonaie = tauxfraisenvoie.lamonaieid `, (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionnner les Monaies qui ne sont pas Encore enregistrer 
  Tauxfraisenvoie.SelectMonaiesnoenregistrer = ( ) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM tauxfraisenvoie RIGHT OUTER JOIN lesmonaie ON lesmonaie.idmonaie = tauxfraisenvoie.lamonaieid WHERE tauxfraisenvoie.lamonaieid is null`, (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Suppression du Taux D envoie 
  Tauxfraisenvoie.supprimerpourcentagetaux = (idtauenvw) => {
    return new Promise((resolve, reject)=>{
      sql.query(`DELETE FROM tauxfraisenvoie WHERE idtauenvw = ${idtauenvw} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  }; 
  //Selectionner le Taux D envoie  d une Monaie 
  Tauxfraisenvoie.SelectTaux = (lamonaieid) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT letaux FROM tauxfraisenvoie WHERE  lamonaieid = ${lamonaieid}`, (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  module.exports = Tauxfraisenvoie;