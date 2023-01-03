
const sql = require("../db.js");

// constructor


// constructor de la table code activation

const Codentreprise = function(lecode) {
  this.codeactivation = lecode.codeactivation;
};

Codentreprise.verifier =  ( codeid) => {
  return new Promise((resolve, reject)=>{
    sql.query(`SELECT * FROM codeactivation WHERE code = ${codeid} `,  (error, employees)=>{
        if(error){
            return reject(error);
        }
        return resolve(employees);
    });
});
};


module.exports = Codentreprise;