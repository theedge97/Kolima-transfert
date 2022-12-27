
const sql = require("../db.js");



// constructeur  de la table Agence

const Agence = function(agence) {
    this.nomagence = agence.nomagence;
    this.numeroAgence = agence.numeroAgence;
    this.telephoneagence = agence.telephoneagence;
    this.emailagence = agence.emailagence;
    this.solde = agence.solde;
    this.paysid = agence.paysid;
    this.villeid = agence.villeid;
    this.zone = agence.zone;
    this.statue = agence.statue;
    this.motdepasse = agence.motdepasse;
  };

//insertion d'une Agence
  Agence.inscription = (newAgence) => {
    
    return new Promise((resolve, reject)=>{
      sql.query("INSERT INTO agence SET ?", newAgence,  (error, enregistre)=>{
          if(error){
              return reject(error);
          }
          return resolve(enregistre);
      });
  });
  };


  //recuperation de la liste de tout les agences
Agence.lesagences = result => {
    return new Promise((resolve, reject)=>{
      sql.query("SELECT * FROM agence INNER JOIN pays on pays.idpays = agence.paysid INNER JOIN ville ON ville.idville = agence.villeid ",  (error, agences)=>{
          if(error){
              return reject(error);
          }
          return resolve(agences);
      });
  });
  };
  //Recuperer un Agence en fonction de son id 
  Agence.recupereunagence = (agenceid) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM agence INNER JOIN pays on pays.idpays = agence.paysid INNER JOIN ville ON ville.idville = agence.villeid INNER JOIN lesmonaie ON lesmonaie.idmonaie = pays.devise   WHERE agence.idagence = ${agenceid} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

  //Changement du statue de l'agence
  Agence.statuechange = (agenceid, valeur) => {
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE  agence SET statue= ${valeur}  WHERE agence.idagence = ${agenceid} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //rechargement de l'Agence
  Agence.rechargement = (agenceid, somme) => {
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE  agence SET  solde = solde +  ${somme}  WHERE agence.idagence = ${agenceid} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Suppression d'une agence 
  Agence.supprimeragence = (agenceid) => {
    return new Promise((resolve, reject)=>{
      sql.query(`DELETE FROM   agence  WHERE agence.idagence = ${agenceid} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  }; 
//Connection d'une agence 
//selectionner les elements d'une agence
Agence.Trouveragence = (telephone) => {
   
    
  return new Promise((resolve, reject)=>{
    sql.query(`SELECT * FROM agence INNER JOIN pays on pays.idpays = agence.paysid INNER JOIN ville ON ville.idville = agence.villeid INNER JOIN lesmonaie ON lesmonaie.idmonaie = pays.devise  WHERE telephoneagence = "${telephone}"  `, (error, employees)=>{
        if(error){
            return reject(error);
        }
        return resolve(employees);
    });
});
};
//Diminution du Solde lorsque il ya un Depot 
Agence.diminutionsolde = (agenceid, somme) => {
  return new Promise((resolve, reject)=>{
    sql.query(`UPDATE  agence SET  solde = solde -  ${somme}  WHERE agence.idagence = ${agenceid} `,  (error, employees)=>{
        if(error){
            return reject(error);
        }
        return resolve(employees);
    });
});
};
//Augmentation du Solde lorsque il ya un Retrait 
Agence.augmentationsolde = (agenceid, somme) => {
  return new Promise((resolve, reject)=>{
    sql.query(`UPDATE  agence SET  solde = solde +  ${somme}  WHERE agence.idagence = ${agenceid} `,  (error, employees)=>{
        if(error){
            return reject(error);
        }
        return resolve(employees);
    });
});
};
  
  module.exports = Agence;