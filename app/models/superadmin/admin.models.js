
const sql = require("../db.js");

// constructor


// constructor
const Client = function(leclient) {
    this.nom = leclient.nom;
    this.telephone = leclient.telephone;
    this.adresse = leclient.adresse;
    this.numero_boutique = leclient.numero_boutique;
    this.id_rateleurs = leclient.id_rateleurs;
    this.id_route = leclient.id_route;
    //
  };
//Selectionner les entreprises
  Client.recuperer = result => {
    return new Promise((resolve, reject)=>{
      sql.query("SELECT * FROM entreprise",  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  Client.rechercherClient = ( entrepriseid) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT client.nom, client.telephone , client.adresse ,client.numero_boutique , rateleurs.id_entreprise FROM client INNER JOIN rateleurs ON rateleurs.id_rateleurs = client.id_rateleurs  WHERE rateleurs.id_entreprise = ${entrepriseid} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Rechercher le nombre de clients
  Client.nbrclient = ( entrepriseid) => {
    return new Promise((resolve, reject)=>{
      sql.query(`  SELECT COUNT(id_client)   FROM client INNER JOIN rateleurs ON rateleurs.id_rateleurs = client.id_rateleurs  WHERE rateleurs.id_entreprise = ${entrepriseid} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  
  module.exports = Client;