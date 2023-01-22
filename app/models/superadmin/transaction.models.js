
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
    this.Supprimer = leclient.Supprimer;
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
      sql.query(` SELECT * FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid  INNER JOIN pays ON pays.idpays = transaction.Paysidenvoie INNER JOIN lesmonaie ON lesmonaie.idmonaie = pays.devise WHERE   transaction.Agenceenvoieid  = ${idAgenceenvoie} AND DATE(transaction.Datetransaction)= CURRENT_DATE  AND transaction.Supprimer = 0  ORDER BY idtransac DESC `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner tout les Transactions de depot d une agence non valider
  Transaction.transatoutdepotnonvalide = (  idAgenceenvoie) => {
    return new Promise((resolve, reject)=>{
      sql.query(` SELECT * FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid  INNER JOIN pays ON pays.idpays = transaction.Paysidenvoie INNER JOIN lesmonaie ON lesmonaie.idmonaie = pays.devise WHERE   transaction.Agenceenvoieid  = ${idAgenceenvoie}  AND transaction.Supprimer = 0 AND transaction.Statue = 0  ORDER BY idtransac DESC `,  (error, employees)=>{
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
      sql.query(` SELECT * FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid  INNER JOIN pays ON pays.idpays = transaction.Paysidenvoie INNER JOIN lesmonaie ON lesmonaie.idmonaie = pays.devise WHERE   transaction.Agenceenvoieid  = ${idAgenceenvoie} AND   DATE(transaction.Datetransaction) BETWEEN '${debut}' AND '${fin}'  AND transaction.Supprimer = 0  ORDER BY idtransac DESC `,  (error, employees)=>{
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

  //Suppression dune transaction
  Transaction.suppressiontransaction = (idtransaction ) => {
    return new Promise((resolve, reject)=>{
      sql.query(`UPDATE  transaction SET transaction.Supprimer = 1  WHERE transaction.idtransac = ${idtransaction} AND transaction.Statue = 0`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Selectionner les informations de la transaction
 Transaction.unetransacinfos = (idtransac) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT Sommeenvoie AS somme FROM transaction  WHERE 	idtransac = ${idtransac}   `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Statistique
//Nombre de transaction realiser journalierement
Transaction.nbretransactionjournalier = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE DATE(transaction.Datetransaction)= CURRENT_DATE`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre de transaction du jour precedent
  Transaction.nbretransactionjourprecedent = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE DATE(transaction.Datetransaction)= CURRENT_DATE - 1` ,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre de transaction valider journalierement
  Transaction.nbrevalidertransactionjournalier = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE DATE(transaction.Datetransaction)= CURRENT_DATE AND transaction.Statue = 1`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Nombre de transaction non valider journalierement
Transaction.nbrenonvalidertransactionjournalier = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE DATE(transaction.Datetransaction)= CURRENT_DATE AND transaction.Statue = 0 AND transaction.Supprimer = 0`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre de transaction  suspendus journalierement
  Transaction.nbresuspendustransactionjournalier = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE DATE(transaction.Datetransaction)= CURRENT_DATE AND transaction.Supprimer = 1`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre de transaction realiser  hebdomadaires
  Transaction.nbretransactionhebdo = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE WEEK(transaction.Datetransaction)= WEEK(NOW())`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre de transaction reealiser par une agence Journalierement
  Transaction.agencenbretransactionjourdepot = (idagence) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE DATE(transaction.Datetransaction)= CURRENT_DATE AND  transaction.Agenceenvoieid =${idagence} `,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Selectioner le nombre de transaction en fonction des jours
  //Nombre de transaction realiser  hebdomadaires
  Transaction.nbretransactionenfctionjour = (id) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE WEEK(transaction.Datetransaction)= WEEK(NOW()) AND  DAYOFWEEK(transaction.Datetransaction) = ${id}`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //mombre de transac en foction dea mois
  Transaction.nbretransactionenfctionmois = (id) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE YEAR(transaction.Datetransaction) = YEAR(NOW()) AND MONTH(transaction.Datetransaction)=  ${id}`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre de transaction valider hebdomandaire
  Transaction.nbrevalidertransactionhebdo = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE WEEK(transaction.Datetransaction)= WEEK(NOW()) AND transaction.Statue = 1`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Les Transactionds valider en fonction des jours
Transaction.nbrevalidertransactionfonctionjour = (id) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE WEEK(transaction.Datetransaction)= WEEK(NOW()) AND  DAYOFWEEK(transaction.Datetransaction) = ${id} AND transaction.Statue = 1`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Les Transactionds valider en fonction des mois
  Transaction.nbrevalidertransactionfonctionmois = (id) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE YEAR(transaction.Datetransaction) = YEAR(NOW()) AND MONTH(transaction.Datetransaction) = ${id} AND transaction.Statue = 1`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

  //Nombre de transaction non valider Hebdomadaire
  Transaction.nbrenonvalidertransactionhebdo = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE WEEK(transaction.Datetransaction)= WEEK(NOW()) AND transaction.Statue = 0 AND transaction.Supprimer = 0`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre de transaction non valider en fonction des jour
  Transaction.nbrenonvalidertransacenfctiondesjour = (id) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE WEEK(transaction.Datetransaction)= WEEK(NOW()) AND  DAYOFWEEK(transaction.Datetransaction) = ${id} AND transaction.Statue = 0 AND transaction.Supprimer = 0`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre   transaction non valider en fonction des mois
  Transaction.nbrenonvalidertransacenfctiondesmois = (id) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE YEAR(transaction.Datetransaction) = YEAR(NOW()) AND MONTH(transaction.Datetransaction) = ${id} AND transaction.Statue = 0 AND transaction.Supprimer = 0`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre de transaction suspendus hebdomaire
  Transaction.nbresuspendustransactionhebdo = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE YEAR(transaction.Datetransaction) = YEAR(NOW()) AND WEEK(transaction.Datetransaction)= WEEK(NOW()) AND transaction.Supprimer = 1`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Nombre de transaction suspendus mensuellement
Transaction.nbresuspendustransactionmois = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE YEAR(transaction.Datetransaction) = YEAR(NOW()) AND MONTH(transaction.Datetransaction)= MONTH(NOW()) AND transaction.Supprimer = 1`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre de transaction supprimer en fction jour
  Transaction.nbresuspendustransacenfctindesjour = (id) => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE YEAR(transaction.Datetransaction) = YEAR(NOW()) AND WEEK(transaction.Datetransaction)= WEEK(NOW()) AND  DAYOFWEEK(transaction.Datetransaction) = ${id} AND transaction.Supprimer = 1`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Nombre de transaction supprimer en fction des mois
Transaction.nbresuspendustransacenfctindesmois = (id) => {
        return new Promise((resolve, reject)=>{
          sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE YEAR(transaction.Datetransaction) = YEAR(NOW()) AND MONTH(transaction.Datetransaction) = ${id} AND transaction.Supprimer = 1`,  (error, employees)=>{
              if(error){
                  return reject(error);
              }
              return resolve(employees);
          });
      });
      };
//nombre de transac  en fonctions mois

//Nombre de transaction realiser mensuellement
Transaction.nbretransactionmois = () => {
        return new Promise((resolve, reject)=>{
          sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE YEAR(transaction.Datetransaction) = YEAR(NOW()) AND MONTH(transaction.Datetransaction)=  MONTH(NOW())`,  (error, employees)=>{
              if(error){
                  return reject(error);
              }
              return resolve(employees);
          });
      });
      };
//Nombre de transaction valider Mensuellement
  Transaction.nbrevalidertransactionmois = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE YEAR(transaction.Datetransaction) = YEAR(NOW()) AND MONTH(transaction.Datetransaction)= MONTH(NOW()) AND transaction.Statue = 1`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre de Transaction non valider Mensuellement
  Transaction.nbrenonvalidertransactionmois = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE YEAR(transaction.Datetransaction) = YEAR(NOW()) AND MONTH(transaction.Datetransaction)= MONTH(NOW()) AND transaction.Statue = 0 AND transaction.Supprimer = 0`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre de Transaction  suspendus par mois
  Transaction.nbresuspendustransactionmois = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT COUNT(idtransac) AS nbtransac FROM transaction WHERE YEAR(transaction.Datetransaction) = YEAR(NOW()) AND MONTH(transaction.Datetransaction)= MONTH(NOW()) AND transaction.Supprimer = 1`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre de transaction de Depot par Pays
  Transaction.depotnbretransacpays = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT pays.pays as nompays, COUNT(transaction.idtransac) as nbre FROM pays INNER JOIN transaction ON transaction.Paysidenvoie = pays.idpays WHERE transaction.Statue = 1 GROUP BY pays.idpays`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Nombre de depot par pays en fonction du jour
//DATE(transaction.Datetransaction)= CURRENT_DATE
Transaction.depotnbretransacpaysjour = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT pays.pays as nompays, COUNT(transaction.idtransac) as nbre FROM pays INNER JOIN transaction ON transaction.Paysidenvoie = pays.idpays WHERE transaction.Statue = 1 AND YEAR(transaction.Datetransaction) = YEAR(NOW()) AND DATE(transaction.Datetransaction)= CURRENT_DATE GROUP BY pays.idpays`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Nombre de depot par pays en fonction de la semaine
Transaction.depotnbretransacpayshebdo = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT pays.pays as nompays, COUNT(transaction.idtransac) as nbre FROM pays INNER JOIN transaction ON transaction.Paysidenvoie = pays.idpays WHERE transaction.Statue = 1 AND YEAR(transaction.Datetransaction) = YEAR(NOW()) AND WEEK(transaction.Datetransaction) = WEEK(NOW())  GROUP BY pays.idpays`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Nombre de depot par pays en fonction du mois
Transaction.depotnbretransacpaysmois = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT pays.pays as nompays, COUNT(transaction.idtransac) as nbre FROM pays INNER JOIN transaction ON transaction.Paysidenvoie = pays.idpays WHERE transaction.Statue = 1 AND YEAR(transaction.Datetransaction) = YEAR(NOW()) AND MONTH(transaction.Datetransaction) = MONTH(NOW())  GROUP BY pays.idpays`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };

//Nombre de transaction retrait par pays
//SELECT pays.pays as nomapays, COUNT(transaction.idtransac) as nbre FROM `transaction` INNER JOIN client ON client.idclient = transaction.Clientid INNER JOIN pays ON pays.idpays = client.paysdestionation WHERE transaction.Statue = 1 GROUP BY pays.idpays
Transaction.retraitnbretransparpays = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT pays.pays as nompays, COUNT(transaction.idtransac) as nbre FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid INNER JOIN pays ON pays.idpays = client.paysdestionation WHERE transaction.Statue = 1 AND YEAR(transaction.Datetransaction) = YEAR(NOW()) GROUP BY pays.idpays`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Nombre de tramsactiom journalierrement    retrait en fonction du pays
Transaction.retraitnbretransparpaysjour = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT pays.pays as nompays, COUNT(transaction.idtransac) as nbre FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid INNER JOIN pays ON pays.idpays = client.paysdestionation WHERE transaction.Statue = 1 AND YEAR(transaction.Datetransaction) = YEAR(NOW())  AND DATE(transaction.Datetransaction)= CURRENT_DATE  GROUP BY pays.idpays`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre de retrait par pays  Hebdomandaire
  Transaction.retraitnbretransparpayshebdo = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT pays.pays as nompays, COUNT(transaction.idtransac) as nbre FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid INNER JOIN pays ON pays.idpays = client.paysdestionation WHERE transaction.Statue = 1 AND YEAR(transaction.Datetransaction) = YEAR(NOW()) AND WEEK(transaction.Datetransaction) = WEEK(NOW()) GROUP BY pays.idpays`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Nombre de retrait  par pays  Mois
  Transaction.retraitnbretransparpaysmois = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT pays.pays as nompays, COUNT(transaction.idtransac) as nbre FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid INNER JOIN pays ON pays.idpays = client.paysdestionation WHERE transaction.Statue = 1 AND YEAR(transaction.Datetransaction) = YEAR(NOW()) AND MONTH(transaction.Datetransaction) = MONTH(NOW()) GROUP BY pays.idpays`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner les  somme de tout les de retrait par pays
  Transaction.retraitsommetransparpays = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT pays.pays as nompays, SUM(transaction.montantlocale) as sommeretrait FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid INNER JOIN pays ON pays.idpays = client.paysdestionation WHERE transaction.Statue = 1 GROUP BY pays.idpays`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Selectionner les Sommmes de retraits par jour et par pays
Transaction.retraitsommetransparpaysjour = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT pays.pays as nompays, SUM(transaction.montantlocale) as sommeretrait FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid INNER JOIN pays ON pays.idpays = client.paysdestionation WHERE transaction.Statue = 1 AND DATE(transaction.Datetransaction)= CURRENT_DATE AND YEAR(transaction.Datetransaction) = YEAR(NOW()) GROUP BY pays.idpays`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Selectionner la somme de retrait par semaine et par pays
Transaction.retraitsommetransparpayshebdo = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT pays.pays as nompays, SUM(transaction.montantlocale) as sommeretrait FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid INNER JOIN pays ON pays.idpays = client.paysdestionation WHERE transaction.Statue = 1 AND YEAR(transaction.Datetransaction) = YEAR(NOW()) AND WEEK(transaction.Datetransaction) = WEEK(NOW()) GROUP BY pays.idpays`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner la somme de retrait par mois et par pays
Transaction.retraitsommetransparpaysmois = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT pays.pays as nompays, SUM(transaction.montantlocale) as sommeretrait FROM transaction INNER JOIN client ON client.idclient = transaction.Clientid INNER JOIN pays ON pays.idpays = client.paysdestionation WHERE transaction.Statue = 1 AND YEAR(transaction.Datetransaction) = YEAR(NOW()) AND MONTH(transaction.Datetransaction) = MONTH(NOW()) GROUP BY pays.idpays`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Selctionner les Sommes de Depot en Fonction des Pays
//SELECT pays.pays as nompays, SUM(transaction.Sommeenvoie) as sommeenvoyer FROM pays INNER JOIN transaction ON transaction.Paysidenvoie = pays.idpays WHERE transaction.Statue = 1 GROUP BY pays.idpays
Transaction.depotsommetransparpays = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT pays.pays as nompays, SUM(transaction.Sommeenvoie) as sommeenvoyer FROM pays INNER JOIN transaction ON transaction.Paysidenvoie = pays.idpays WHERE transaction.Statue = 1 GROUP BY pays.idpays`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
//Selectionner les sommes de depot
Transaction.depotsommetransparpaysjour = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT pays.pays as nompays, SUM(transaction.Sommeenvoie) as sommeenvoyer FROM pays INNER JOIN transaction ON transaction.Paysidenvoie = pays.idpays WHERE transaction.Statue = 1  AND DATE(transaction.Datetransaction)= CURRENT_DATE GROUP BY pays.idpays`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner les sommes de depot par semmaine
  Transaction.depotsommetransparpayshebdo = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT pays.pays as nompays, SUM(transaction.Sommeenvoie) as sommeenvoyer FROM pays INNER JOIN transaction ON transaction.Paysidenvoie = pays.idpays WHERE transaction.Statue = 1  AND YEAR(transaction.Datetransaction) = YEAR(NOW()) AND WEEK(transaction.Datetransaction) = WEEK(NOW()) GROUP BY pays.idpays`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
  //Selectionner les sommes de depot par mois
  Transaction.depotsommetransparpaysmois = () => {
    return new Promise((resolve, reject)=>{
      sql.query(`SELECT pays.pays as nompays, SUM(transaction.Sommeenvoie) as sommeenvoyer FROM pays INNER JOIN transaction ON transaction.Paysidenvoie = pays.idpays WHERE transaction.Statue = 1  AND YEAR(transaction.Datetransaction) = YEAR(NOW()) AND MONTH(transaction.Datetransaction) = MONTH(NOW()) GROUP BY pays.idpays`,  (error, employees)=>{
          if(error){
              return reject(error);
          }
          return resolve(employees);
      });
  });
  };
module.exports = Transaction;