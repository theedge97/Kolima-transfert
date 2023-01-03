
const sql = require("../db.js");

// constructor


// constructor
const Mouvement = function(mvt) {
    this.ecritureid = mvt.ecritureid;
    this.compteid = mvt.compteid;
    this.debit = mvt.debit;
    this.credit = mvt.credit;
    this.regroupement = mvt.regroupement;
    //
  };
//Selectionner les Pays

Mouvement.selectyp = ( ) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT * FROM mouvement WHERE regroupement = 0 `,  (error, payss)=>{
          if(error){
              return reject(error);
          }
          return resolve(payss);
      });
  });
  };

  //Ajout d'un mvt
  Mouvement.ajoutmvt = (newecrit) => {

    return new Promise((resolve, reject)=>{
      sql.query("INSERT INTO mouvement SET ?", newecrit,  (error, enregistre)=>{
          if(error){
              return reject(error);
          }
          return resolve(enregistre.insertId);
      });
  });
  };
  //selectionner
    Mouvement.uncompteetat = (debut, fin, numcpte ) =>{
        return new Promise((resolve, reject)=>{
          sql.query(`SELECT * FROM mouvement INNER JOIN ecriture ON ecriture.idec = mouvement.ecritureid INNER JOIN compte ON compte.idcpte = mouvement.compteid  WHERE regroupement = 0 AND DATE(ecriture.dateecri) BETWEEN  '${debut}' AND  '${fin}'  AND compte.numcpte =    ${numcpte} ORDER BY ecriture.idec ASC` ,  (error, employees)=>{
              if(error){
                  return reject(error);
              }
              return resolve(employees);
          });
      });
      };

      //SELECTION L'ETAT D 1 COMPTE A DATE
      Mouvement.uncompteadate = (date, numcpte, ambaid ) =>{
        return new Promise((resolve, reject)=>{
          sql.query(`SELECT * FROM mouvement INNER JOIN ecriture ON ecriture.idec = mouvement.ecriture INNER JOIN compte ON compte.idcompte = mouvement.compteid WHERE DATE(ecriture.datecr) <=  '${date}' AND compte.numcpte = ${numcpte} AND ecriture.ambassade = ${ambaid} AND regroupement = 0 ORDER BY ecriture.idec ASC  ` ,  (error, employees)=>{
              if(error){
                  return reject(error);
              }
              return resolve(employees);
          });
      });
      };
      //Selectionner les mouvement d 'un ecriture
      Mouvement.lesmvts = (ecriture) =>{
        return new Promise((resolve, reject)=>{
          sql.query(`SELECT * FROM mouvement INNER JOIN compte ON compte.idcpte = mouvement.compteid  WHERE ecritureid = ${ecriture} AND regroupement = 0 ORDER BY mouvement.idmvt DESC  ` ,  (error, employees)=>{
              if(error){
                  return reject(error);
              }
              return resolve(employees);
          });
      });
      };
      //Modifier les Mvts
      Mouvement.modifiermvt = (idmvt, credit, debit, compteid) => {
        return new Promise((resolve, reject)=>{
          sql.query(` UPDATE mouvement INNER JOIN compte ON compte.idcpte = mouvement.compteid SET credit= ${credit} , debit = ${debit}, compteid = ${compteid}  WHERE idmvt = ${idmvt}   `,  (error, employees)=>{
              if(error){
                  return reject(error);
              }
              return resolve(employees);
          });
      });
      };
      //Selectionner Le toto de chaque compte de type Charge
      /**
       * SELECT SUM(credit) as toto,numcpte,ambassade.idamb as ambassades from mouvement INNER join compte on mouvement.compteid=compte.idcompte
INNER join ecriture on ecriture.idec=mouvement.ecriture
inner join ambassade on ambassade.idamb=ecriture.ambassade
GROUP BY idcompte, ambassades
       */
Mouvement.lescomptechargestoto = ( ) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(debit) as toto,numcpte, compte.intcompte As intutile from mouvement INNER join compte on mouvement.compteid=compte.idcpte INNER join ecriture on ecriture.idec=mouvement.ecritureid  WHERE  regroupement = 0 AND   compte.typecompte = 3 GROUP BY idcpte` ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Selectionner Le toto de chaque compte de type Produits
Mouvement.lescompteproduitstoto = ( idamba) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(credit) as toto,numcpte, compte.intcompte As intutile from mouvement INNER join compte on mouvement.compteid = compte.idcpte INNER join ecriture on ecriture.idec=mouvement.ecritureid  WHERE regroupement = 0 AND  compte.typecompte = 4 GROUP BY idcpte` ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });

  };
  //Sommes  de toto de chaque compte de type Actifs
  Mouvement.lescompteactifstoto = ( ) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(debit) as toto, numcpte, compte.intcompte As intutile from mouvement INNER join compte on mouvement.compteid=compte.idcpte INNER join ecriture on ecriture.idec = mouvement.ecritureid  WHERE  regroupement = 0 AND  compte.typecompte = 1 GROUP BY idcpte` ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
    //Sommes  de toto de chaque compte de type Passifs
    Mouvement.lescomptepassiftoto = ( ) =>{
        return new Promise((resolve, reject)=>{
          sql.query(`SELECT SUM(credit) as toto,numcpte, compte.intcompte As intutile from mouvement INNER join compte on mouvement.compteid=compte.idcpte INNER join ecriture on ecriture.idec=mouvement.ecritureid  WHERE  regroupement = 0 AND  compte.typecompte = 2 GROUP BY idcpte` ,  (error, employees)=>{
              if(error){
                  return reject(error);
              }
              return resolve(employees);
          });
      });
      };
//Balance A date
Mouvement.balanceadate = ( date) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(debit) as sommedebit , SUM(credit) as sommecredit, numcpte, compte.intcompte As intutile from mouvement INNER join compte on mouvement.compteid=compte.idcpte INNER join ecriture on ecriture.idec=mouvement.ecritureid WHERE  regroupement = 0 AND DATE(ecriture.dateecri) <=  '${date}' GROUP BY idcpte
      ` ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Balance periodique
  Mouvement.balanceperiodique = (  debut, fin) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(debit) as sommedebit , SUM(credit) as sommecredit, numcpte, compte.intcompte As intutile from mouvement INNER join compte on mouvement.compteid=compte.idcpte INNER join ecriture on ecriture.idec=mouvement.ecritureid  WHERE regroupement = 0 AND DATE(ecriture.dateecri) BETWEEN '${debut}' AND '${fin}' GROUP BY idcpte   ` ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Toto des charges
  Mouvement.totocharges = ( idamba) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(debit - credit) AS totocharge  from mouvement INNER join compte on mouvement.compteid=compte.idcompte INNER join ecriture on ecriture.idec=mouvement.ecriture inner join ambassade on ambassade.idamb=ecriture.ambassade  WHERE ambassade.idamb = ${idamba} AND compte.typcompte = 3  AND regroupement = 0  ` ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Toto des Produits
  Mouvement.totoproduits = ( idamba) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(credit- debit) AS totoproduit  from mouvement INNER join compte on mouvement.compteid=compte.idcompte INNER join ecriture on ecriture.idec=mouvement.ecriture inner join ambassade on ambassade.idamb=ecriture.ambassade  WHERE ambassade.idamb = ${idamba} AND compte.typcompte = 4  AND regroupement = 0  ` ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Toto Passifs
  Mouvement.totoPassif = ( idamba) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(debit - credit) AS totopassif  from mouvement INNER join compte on mouvement.compteid=compte.idcompte INNER join ecriture on ecriture.idec=mouvement.ecriture inner join ambassade on ambassade.idamb=ecriture.ambassade  WHERE ambassade.idamb = ${idamba} AND compte.typcompte = 2  AND regroupement = 0  ` ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Toto Actifs
  Mouvement.totoActifs = ( idamba) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(credit - debit) AS totoactifs  from mouvement INNER join compte on mouvement.compteid=compte.idcompte INNER join ecriture on ecriture.idec=mouvement.ecriture inner join ambassade on ambassade.idamb=ecriture.ambassade  WHERE ambassade.idamb = ${idamba} AND compte.typcompte = 1   AND regroupement = 0  ` ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Desactiver tout les comptes
Mouvement.desactiver = (idamba) => {
    return new Promise((resolve, reject)=>{
      sql.query(` UPDATE mouvement INNER join compte on mouvement.compteid=compte.idcompte INNER join ecriture on ecriture.idec=mouvement.ecriture inner join ambassade on ambassade.idamb=ecriture.ambassade   SET regroupement=  1 WHERE ambassade.idamb = ${idamba}   `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Recuperer tout les mouvements du compte
Mouvement.toutmvtannee = ( idamba) =>{
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT idcompte , SUM(debit) as sommedebit , SUM(credit) as sommecredit, numcpte, compte.intcompte As intutile from mouvement INNER join compte on mouvement.compteid=compte.idcompte INNER join ecriture on ecriture.idec=mouvement.ecriture inner join ambassade on ambassade.idamb=ecriture.ambassade WHERE ambassade.idamb = ${idamba}  AND YEAR(ecriture.datecr) =  YEAR(NOW()) GROUP BY idcompte   ` ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  module.exports = Mouvement;
