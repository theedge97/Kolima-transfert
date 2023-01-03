
const sql = require("../db.js");

// constructor


// constructor
const Entreprise = function(entre) {
    this.nom = entre.nom;
    this.adresse = entre.adresse;
    this.telephone = entre.telephone;
    this.mot_passe = entre.mot_passe;
    this.logo = entre.logo;
    this.dateabonnement = entre.dateabonnement;
    //
  };
//Selectionner les entreprises
  Entreprise.recuperer = result => {
    return new Promise((resolve, reject)=>{
      sql.query("SELECT * FROM entreprise",  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  Entreprise.recupereID = ( entrepriseid) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT * FROM entreprise WHERE id_entreprise = ${entrepriseid} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Rechercher le nombre d'entreprise
  Entreprise.nbrentreprise = result => {
    return new Promise((resolve, reject)=>{
      sql.query("SELECT COUNT(id_entreprise)  FROM `entreprise` ",  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

  module.exports = Entreprise;