
const sql = require("../db.js");


// constructore 
const Client = function(leclient) {
    this.Nomexpediteur = leclient.Nomexpediteur;
    this.Contactexpediteur = leclient.Contactexpediteur;
    this.Nomreceveur = leclient.Nomreceveur;
    this.Contactreceveur = leclient.Contactreceveur;
    this.Carteidentite = leclient.Carteidentite;
    this.Numerocarte = leclient.Numerocarte;
    this.Agenceidlier = leclient.Agenceidlier;
    this.paysdestionation = leclient.paysdestionation;
    this.villedestination = leclient.villedestination;
    
  }; 
  

//Inscription du client
 
  Client.inscription = (newClient) => {
    
    return new Promise((resolve, reject)=>{
      sql.query("INSERT INTO client SET ?", newClient,  (error, enregistre)=>{
          if(error){
              return reject(error);
          }
          return resolve(enregistre.insertId);
      });
  });
  };
  //Modificattion des Informations du Client lors d úne Transaction 
  
  Client.ModifierInfoClient = (nomexpediteur, contactexpediteur, nomreceveur, contactreceveur, numcarte , idclient ) => {
    
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE client SET  Nomexpediteur= "${nomexpediteur}", Contactexpediteur = "${contactexpediteur}", Nomreceveur = "${nomreceveur}", Contactreceveur= "${contactreceveur}", Carteidentite= 1, Numerocarte="${numcarte}" WHERE idclient = ${idclient}  `,  (error, enregistre)=>{
          if(error){
              return reject(error);
          }
          return resolve(enregistre.insertId);
      });
  });
  };
  //Recuperation des Information de L envoyeur 
  Client.recupererInfo =  ( telephoneenvoyeur , idagence) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT Nomexpediteur, Contactexpediteur ,Nomreceveur , Contactreceveur , Numerocarte FROM client WHERE Contactexpediteur = "${telephoneenvoyeur}"  AND Agenceidlier =${idagence}`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectioner les Numero des Clients  dun Pays 
  Client.SelectClientAgenceid = (idagence) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM client  WHERE Agenceidlier = ${idagence} `, (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Recuperer les informations du client et son id 
  Client.Recupereridduclient = (idagence , expediteur , receveur ) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT 	idclient FROM client  WHERE Agenceidlier = ${idagence} AND 	Contactexpediteur = "${expediteur}" AND Contactreceveur = "${receveur}" `, (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  
  module.exports = Client;