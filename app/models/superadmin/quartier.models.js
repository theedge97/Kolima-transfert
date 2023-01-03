
const sql = require("../db.js");

// constructor


// Loko
const Quartier = function(lequartier) {
    this.quartier = lequartier.quartier;
   //
  };
//Selectionner les entreprises
  Quartier.lesquartiers = result => {
    return new Promise((resolve, reject)=>{
      sql.query("SELECT * FROM quartier",  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };


  module.exports = Quartier;