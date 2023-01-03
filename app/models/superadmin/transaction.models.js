
const sql = require("../db.js");

// constructor
const Transaction = function(leclient) {
    this.Datetransaction = leclient.Datetransaction	;
    this.Datevalidation = leclient.Datevalidation;
    this.Statue = leclient.Statue;
    this.Agenceenvoieid	 = leclient.Agenceenvoieid;
    this.Sommeenvoie = leclient.Sommeenvoie;
    this.montantdevise = leclient.montantdevise;
    this.montantlocale = leclient.montantlocale;
    this.Agencevalideid = leclient.Agencevalideid;
    this.Codetransfert = leclient.Codetransfert;
    this.Paysidenvoie = leclient.Paysidenvoie;
    this.Frais = leclient.Frais;
    this.Fraisdepot = leclient.Fraisdepot;
    this.Fraisretrait = leclient.Fraisretrait;
    this.monaiepaysid = leclient.monaiepaysid;
    this.Fraisprincipale = leclient.Fraisprincipale;
    this.Clientid = leclient.Clientid;
    this.Caissierids = leclient.Caissierids;
  };


//Execution d 'une transaction

  Transaction.effectuer = (newClient) => {

    return new Promise((resolve, reject)=>{
      sql.query("INSERT INTO transaction SET ?", newClient,  (error, enregistre)=>{
          if(error){
              return reject(error);
          }
          return resolve(enregistre.insertId);
      });
  });
  };
  //Verification de code

  Transaction.codevalide = (lecode, idpays, idAgenceenvoie) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT * FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid  INNER JOIN pays ON pays.idpays = transaction.Paysidenvoie INNER JOIN lesmonaie ON lesmonaie.idmonaie = pays.devise WHERE transaction.Codetransfert = "${lecode}" AND client.paysdestionation =   ${idpays} AND  transaction.Agenceenvoieid != ${idAgenceenvoie} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Slectionner Les Transactions Effectuer par une Agence A Date les depots
  Transaction.transacadateagence = (  idAgenceenvoie) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT * FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid  INNER JOIN pays ON pays.idpays = transaction.Paysidenvoie INNER JOIN lesmonaie ON lesmonaie.idmonaie = pays.devise WHERE   transaction.Agenceenvoieid  = ${idAgenceenvoie} AND DATE(transaction.Datetransaction)= CURRENT_DATE   ORDER BY idtransac DESC `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner les Transactions effecruer par une Agence entre 2 Date les Depots
  Transaction.transacadeuxdateagence = (  idAgenceenvoie, debut, fin) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT * FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid  INNER JOIN pays ON pays.idpays = transaction.Paysidenvoie INNER JOIN lesmonaie ON lesmonaie.idmonaie = pays.devise WHERE   transaction.Agenceenvoieid  = ${idAgenceenvoie} AND   DATE(transaction.Datetransaction) BETWEEN '${debut}' AND '${fin}'  ORDER BY idtransac DESC `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner les Transactions de Retrait d une Agence Donner Jouraalierement
  Transaction.transacretraitadateagence = (  idagenceretrait) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT * FROM retraitargent INNER JOIN transaction ON transaction.idtransac = retraitargent.idtransactr INNER JOIN client ON client.idclient = transaction.Clientid INNER JOIN pays ON pays.idpays = transaction.Paysidenvoie INNER JOIN lesmonaie ON lesmonaie.idmonaie = pays.devise WHERE retraitargent.idagenceretrait  = ${idagenceretrait} AND DATE(transaction.Datevalidation)= CURRENT_DATE    ORDER BY idretrait DESC `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

  //Selection des Rapports des Transaction de Retraits entre Deux Dates
  Transaction.transacretraitdeuxdateagence = (  idagenceretrait, debut, fin) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT * FROM retraitargent INNER JOIN transaction ON transaction.idtransac = retraitargent.idtransactr INNER JOIN client ON client.idclient = transaction.Clientid INNER JOIN pays ON pays.idpays = transaction.Paysidenvoie INNER JOIN lesmonaie ON lesmonaie.idmonaie = pays.devise WHERE retraitargent.idagenceretrait  = ${idagenceretrait} AND DATE(transaction.Datevalidation)  BETWEEN '${debut}' AND '${fin}'   ORDER BY idretrait DESC `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner tout les transaction que xa depot ou retrait  d une Agence
  Transaction.transacagencetoutvalider = (  idagenceretrait) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT * FROM transaction LEFT JOIN retraitargent ON retraitargent.idtransactr = transaction.idtransac INNER JOIN client ON client.idclient = transaction.Clientid WHERE transaction.Statue = 1 AND transaction.Agenceenvoieid =  ${idagenceretrait} OR retraitargent.idagenceretrait  = ${idagenceretrait}   ORDER BY idtransac DESC `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner TOut les transaction que xa soit depot ou retrait valider journalierement
  Transaction.transacagencetoutjournaliervalider = (  idagenceretrait) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid RIGHT JOIN envoieargent ON envoieargent.transactionid = transaction.idtransac RIGHT JOIN retraitargent ON retraitargent.idtransactr = transaction.idtransac WHERE (transaction.Agenceenvoieid =   ${idagenceretrait} OR retraitargent.idagenceretrait =  ${idagenceretrait} ) AND  DATE(transaction.Datevalidation)= CURRENT_DATE  ORDER BY idtransac DESC `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner toutes
  Transaction.caissetransacagencetoutjournaliervalider = (  idagenceretrait, idcaissier) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT * FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid RIGHT JOIN envoieargent ON envoieargent.transactionid = transaction.idtransac RIGHT JOIN retraitargent ON retraitargent.idtransactr = transaction.idtransac WHERE (transaction.Agenceenvoieid =   ${idagenceretrait} OR retraitargent.idagenceretrait =  ${idagenceretrait} ) AND  DATE(transaction.Datevalidation)= CURRENT_DATE AND (retraitargent.caissierretraitid = ${idcaissier} OR envoieargent.caissierenvoieid =  ${idcaissier} )  ORDER BY idtransac DESC `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner Toute les Transaction Depot et Retrait entre Deux Date
  Transaction.transacagencetoutdeuxdatevalider = (  idagenceretrait, debut, fin) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT *, agence.numeroAgence AS numagenceretrait,  agence.nomagence AS nomageencerettrait  FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid RIGHT JOIN envoieargent ON envoieargent.transactionid = transaction.idtransac RIGHT JOIN retraitargent ON retraitargent.idtransactr = transaction.idtransac INNER JOIN agence ON agence.idagence = retraitargent.idagenceretrait WHERE (envoieargent.idagencenvoie = ${idagenceretrait} OR retraitargent.idagenceretrait  = ${idagenceretrait})   AND DATE(transaction.Datevalidation) BETWEEN '${debut}' AND '${fin}'    ORDER BY idtransac DESC `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner toute les Transactions d une Agence a compenser
  Transaction.transacagencecompenser = (  idagenceretrait) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT *, agence.numeroAgence AS numagenceretrait,  agence.nomagence AS nomageencerettrait  FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid RIGHT JOIN envoieargent ON envoieargent.transactionid = transaction.idtransac RIGHT JOIN retraitargent ON retraitargent.idtransactr = transaction.idtransac INNER JOIN agence ON agence.idagence = retraitargent.idagenceretrait WHERE (envoieargent.idagencenvoie = ${idagenceretrait} OR retraitargent.idagenceretrait  = ${idagenceretrait})  AND  transaction.Statue = 1 AND transaction.compensation = 0    ORDER BY idtransac DESC `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner toute les Transactions Depot retrait entre deux dates  d une Agence
  Transaction.touttransacagenceprincipale = (  idagenceretrait, debut, fin) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT transaction.Statue AS Statue, retraitargent.idretrait As idretrait, transaction.Frais AS Frais , transaction.Fraisdepot AS Fraisdepot , transaction.Fraisretrait AS Fraisretrait , transaction.Fraisprincipale AS Fraisprincipale, transaction.Sommeenvoie AS Sommeenvoie , transaction.Datetransaction AS Datetransaction , agenvw.nomagence AS nomagenvw, agenvw.numeroAgence AS numenvw, bg.nomagence AS nomagretrait, bg.numeroAgence AS numagretrait , client.Nomexpediteur AS Nomexpediteur, client.Contactexpediteur AS Contactexpediteur, client.Nomreceveur AS Nomreceveur, client.Contactreceveur AS Contactreceveur FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid INNER JOIN agence AS agenvw ON agenvw.idagence = transaction.Agenceenvoieid LEFT JOIN retraitargent ON retraitargent.idtransactr = transaction.idtransac LEFT JOIN agence AS bg ON bg.idagence = retraitargent.idagenceretrait WHERE (transaction.Agenceenvoieid = ${idagenceretrait} OR retraitargent.idagenceretrait = ${idagenceretrait}) AND DATE(transaction.Datetransaction) BETWEEN '${debut}' AND '${fin}'   ORDER BY idtransac DESC `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Toute les Transactions  effectuer entre deux date
  Transaction.lesagencetouttransacagenceprincipale = (  debut, fin) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT transaction.Statue AS Statue, retraitargent.idretrait As idretrait, transaction.Frais AS Frais , transaction.Fraisdepot AS Fraisdepot , transaction.Fraisretrait AS Fraisretrait , transaction.Fraisprincipale AS Fraisprincipale, transaction.Sommeenvoie AS Sommeenvoie , transaction.Datetransaction AS Datetransaction , agenvw.nomagence AS nomagenvw, agenvw.numeroAgence AS numenvw, bg.nomagence AS nomagretrait, bg.numeroAgence AS numagretrait , client.Nomexpediteur AS Nomexpediteur, client.Contactexpediteur AS Contactexpediteur, client.Nomreceveur AS Nomreceveur, client.Contactreceveur AS Contactreceveur FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid INNER JOIN agence AS agenvw ON agenvw.idagence = transaction.Agenceenvoieid LEFT JOIN retraitargent ON retraitargent.idtransactr = transaction.idtransac LEFT JOIN agence AS bg ON bg.idagence = retraitargent.idagenceretrait WHERE  DATE(transaction.Datetransaction) BETWEEN '${debut}' AND '${fin}'   ORDER BY idtransac DESC `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionnner Tout les Commission de l agence Principale entre deux dates
  Transaction.toutcomissionagenceprincipale = (  idagenceretrait, debut, fin) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(transaction.Fraisprincipale) AS totalcomissionprincipale FROM transaction  RIGHT JOIN envoieargent ON envoieargent.transactionid = transaction.idtransac RIGHT JOIN retraitargent ON retraitargent.idtransactr = transaction.idtransac WHERE (envoieargent.idagencenvoie =  ${idagenceretrait} OR retraitargent.idagenceretrait  =  ${idagenceretrait})     AND DATE(transaction.Datevalidation) BETWEEN '${debut}' AND '${fin}'    ORDER BY idtransac DESC `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//tout les Comissions engrager entre deux date
Transaction.toutcomissiondeuxdatesss = (   debut, fin) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(transaction.Fraisprincipale) AS totalcomissionprincipale FROM transaction  RIGHT JOIN envoieargent ON envoieargent.transactionid = transaction.idtransac RIGHT JOIN retraitargent ON retraitargent.idtransactr = transaction.idtransac WHERE  DATE(transaction.Datevalidation) BETWEEN '${debut}' AND '${fin}'    ORDER BY idtransac DESC `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

  //Validation du code de la transaction
  Transaction.validation = (idtransaction, datevalidation ) => {
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE  transaction SET transaction.Statue = 1, transaction.Datevalidation = NOW()  WHERE transaction.idtransac = ${idtransaction}`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Compensation
  //Modification de la valeur de compensation des Compensations
  Transaction.compensationmodif = (idtransaction, historiquecompid) => {
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE  transaction SET transaction.compensation = 1, transaction.compensationid = ${historiquecompid}  WHERE transaction.idtransac = ${idtransaction}`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Recuperations des frais de transaction
  Transaction.recupefrais = (idtransac) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT * FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid  INNER JOIN pays ON pays.idpays = transaction.Paysidenvoie INNER JOIN lesmonaie ON lesmonaie.idmonaie = pays.devise WHERE transaction.idtransac =  ${idtransac} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Rectification des Information de  la Transaction d une
Transaction.rectifetransactioninfo = (lecode,  idAgenceenvoie) => {
  return new Promise((resolve, reject)=>{
    sql.query(` SELECT * FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid  INNER JOIN pays ON pays.idpays = transaction.Paysidenvoie INNER JOIN lesmonaie ON lesmonaie.idmonaie = pays.devise WHERE transaction.Codetransfert = "${lecode}"  AND  transaction.Agenceenvoieid  = ${idAgenceenvoie}  AND transaction.Statue = 0 `,  (error, employees)=>{
        if(error){
            return reject(error);
        }
        return resolve(employees);
    });
});
};
//Modification d une Transaction
Transaction.modifiertransactioninfo = (lecode,  idAgenceenvoie) => {
  return new Promise((resolve, reject)=>{
    sql.query(`UPDATE  transaction SET V1 = ${V1} , V2 = ${V2}  WHERE idtaux = ${idtaux} `,  (error, employees)=>{
        if(error){
            return reject(error);
        }
        return resolve(employees);
    });
});
};

//SELECT SUM(transaction.montantlocale) AS toutretrait FROM `transaction` INNER JOIN retraitargent ON retraitargent.idtransactr = transaction.idtransac WHERE retraitargent.idagenceretrait  = 13
Transaction.toutlessommesretraitagence = (idagence) => {
  return new Promise((resolve, reject)=>{
    sql.query(`SELECT SUM(transaction.montantlocale) AS toutretrait FROM transaction INNER JOIN retraitargent ON retraitargent.idtransactr = transaction.idtransac WHERE retraitargent.idagenceretrait   = ${idagence} `,  (error, employees)=>{
        if(error){
            return reject(error);
        }
        return resolve(employees);
    });
});
};
//Selectionner tout les Sommes de Retrait Journalier d une Agence
Transaction.journalierlessommesretraitagence = (idagence) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(transaction.montantlocale) AS toutretrait FROM transaction INNER JOIN retraitargent ON retraitargent.idtransactr = transaction.idtransac WHERE retraitargent.idagenceretrait   = ${idagence} AND DATE(transaction.Datevalidation)= CURRENT_DATE  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner tout les Sommes de Retrait Journalier d une Agence
Transaction.caissejournalierlessommesretraitagence = (idagence, idcaiss) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(transaction.montantlocale) AS toutretrait FROM transaction INNER JOIN retraitargent ON retraitargent.idtransactr = transaction.idtransac WHERE retraitargent.idagenceretrait   = ${idagence}  AND retraitargent.caissierretraitid   = ${idcaiss} AND DATE(transaction.Datevalidation)= CURRENT_DATE  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner Tout les Sommmes  Retait d une Agence Entre Deux Date
  Transaction.deuxdateslessommesretraitagence = (idagence, debut , fin) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(transaction.montantlocale) AS toutretrait FROM transaction INNER JOIN retraitargent ON retraitargent.idtransactr = transaction.idtransac WHERE retraitargent.idagenceretrait   = ${idagence}  AND DATE(transaction.Datevalidation) BETWEEN '${debut}' AND '${fin}'  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner tout les sommes de retrait de tout les transaction entre deux date
  Transaction.deuxdateslessommesretraittoutagence = ( debut , fin) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(transaction.montantlocale) AS toutretrait FROM transaction INNER JOIN retraitargent ON retraitargent.idtransactr = transaction.idtransac WHERE  DATE(transaction.Datevalidation) BETWEEN '${debut}' AND '${fin}'  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Selectionner tout les Sommes de Depot d une Agence
Transaction.toutlessommesdepotagence = (idagence) => {
  return new Promise((resolve, reject)=>{
    sql.query(`SELECT SUM(transaction.Sommeenvoie) AS toutdepot FROM transaction INNER JOIN envoieargent ON envoieargent.transactionid = transaction.idtransac WHERE envoieargent.idagencenvoie    = ${idagence} `,  (error, employees)=>{
        if(error){
            return reject(error);
        }
        return resolve(employees);
    });
});
};
//Selectionner tout les Sommes de Depot d une Agence Journalierement
Transaction.journalierlessommesdepotagence = (idagence) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(transaction.Sommeenvoie) AS toutdepot FROM transaction INNER JOIN envoieargent ON envoieargent.transactionid = transaction.idtransac WHERE envoieargent.idagencenvoie    = ${idagence} AND DATE(transaction.Datevalidation)= CURRENT_DATE  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner tout les Sommes de Depot de la caisse d  une Agence Journalierement
Transaction.caissierjournalierlessommesdepotagence = (idagence , idcaiss) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(transaction.Sommeenvoie) AS toutdepot FROM transaction INNER JOIN envoieargent ON envoieargent.transactionid = transaction.idtransac WHERE envoieargent.idagencenvoie    = ${idagence} AND envoieargent.caissierenvoieid    = ${idcaiss} AND DATE(transaction.Datevalidation)= CURRENT_DATE  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionnner Tout les Sommes de Depots  d une Agence entre Deux Dates
  Transaction.deuxdatelessommesdepotagences = (idagence, debut , fin) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(transaction.Sommeenvoie) AS toutdepot FROM transaction INNER JOIN envoieargent ON envoieargent.transactionid = transaction.idtransac WHERE envoieargent.idagencenvoie    = ${idagence} AND DATE(transaction.Datevalidation) BETWEEN '${debut}' AND '${fin}'  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selection de tout les Sommes de Depot de tout les transaction entre deux
  Transaction.deuxdatelessommesdepottoutagence = ( debut , fin) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT SUM(transaction.Sommeenvoie) AS toutdepot FROM transaction INNER JOIN envoieargent ON envoieargent.transactionid = transaction.idtransac WHERE  DATE(transaction.Datevalidation) BETWEEN '${debut}' AND '${fin}'  `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  module.exports = Transaction;