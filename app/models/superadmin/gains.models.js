
const sql = require("../db.js");

// constructor


// Loko
const Gain = function(legain) {
    this.super_agence = legain.super_agence;
    this.agencedepot = legain.agencedepot;
    this.agenceretrait = legain.agenceretrait;
   //
  };
//Selectionner les gains
  Gain.lesgains = result => {
    return new Promise((resolve, reject)=>{
      sql.query("SELECT * FROM gain",  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  Gain.modifiersuperagence = ( valeur) => {
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE gain SET super_agence = ${valeur} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  }; 
  Gain.modifieragencedepot = ( valeur) => {
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE gain SET agencedepot = ${valeur} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  Gain.modifieragenceretrait = ( valeur) => {
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE gain SET agenceretrait = ${valeur} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  
  
  module.exports = Gain;