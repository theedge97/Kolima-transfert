
const sql = require("../db.js");

// constructor


// constructor
const Manager = function(manage) {
    this.nom = manage.nom;
    this.telephone = manage.telephone;
    this.adresse_email = manage.adresse_email;
    this.photo = manage.photo;
    this.mot_passe = manage.mot_passe;
    this.id_entreprise = manage.id_entreprise;
    //
  };
//Selectionner les entreprises

  Manager.listemanager = ( entrepriseid) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT * FROM manager WHERE id_entreprise = ${entrepriseid} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

   Manager.nbremanager = ( entrepriseid) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT COUNT(id_manager)  FROM manager WHERE id_entreprise = ${entrepriseid} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

  module.exports = Manager;