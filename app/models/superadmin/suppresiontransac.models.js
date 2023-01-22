
const sql = require("../db.js");

//Historique desTransaction
const Suppresiontransac = function(transa) {
  this.transactionids = transa.transactionids;
  this.datesuppression = transa.datesuppression;
};
//Ajout d une transaction supprimer
Suppresiontransac.AjoutSuppresion = (newAdmin) => {
    return new Promise((resolve, reject)=>{
        sql.query("INSERT INTO suppresiontransac SET ?", newAdmin,  (error, enregistre)=>{
            if(error){
                return reject(error);
            }
            return resolve(enregistre);
        });
    });
  };

module.exports = Suppresiontransac;