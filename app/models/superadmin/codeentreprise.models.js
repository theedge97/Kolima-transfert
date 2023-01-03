
const sql = require("../db.js");

// constructor


// constructor
const Codentreprise = function(lecode) {
    this.code = lecode.code;
  };

  Codentreprise.verifier =  ( codeid) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM codeentreprise WHERE code = ${codeid} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

  module.exports = Codentreprise;