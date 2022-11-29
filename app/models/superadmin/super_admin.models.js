
const sql = require("../db.js");
// constructeur  de la table admin
const Superadmin = function(admin) {
    this.nom = admin.nom;
    this.telephone = admin.telephone;
    this.email = admin.email;
    this.motdepasse = admin.motdepasse;
  };

  Superadmin.inscription = (newAdmin) => {
    
    return new Promise((resolve, reject)=>{
      sql.query("INSERT INTO admin SET ?", newAdmin,  (error, enregistre)=>{
          if(error){
              return reject(error);
          }
          return resolve(enregistre);
      });
  });
  };
 
  //selectionner les elements d'un compte
Superadmin.Trouvercompte = (telephone) => {
   
    
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM admin WHERE telephone = "${telephone}"  `, (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  
  
  module.exports = Superadmin;