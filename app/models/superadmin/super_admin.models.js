
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
//Modifier les Mot de passe de L administrateur
Superadmin.majmodepassecompte = (telephone , motdepasse) => {
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE  admin SET  motdepasse = "${motdepasse}"    WHERE telephone = "${telephone}"  `, (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

//Mettre a jour les Informations du Compte
Superadmin.majinfocompte = (nom, telephone, email , idcompte) => {
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE  admin SET  nom = "${nom}", telephone  = "${telephone}",  email  = "${email}"    WHERE id = ${idcompte}  `, (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  module.exports = Superadmin;