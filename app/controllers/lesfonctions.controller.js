const { upperCase } = require("lodash");

 function convertion(x1, v1, x2, v2, y) {
    /** la fonction qui premet de faire la convertion de la monaie
     * Convertion du franc cfa en gnf
     * */
    var donner1 = upperCase(x1)
    var donner2 = upperCase(x2)

    if (donner1 == "GNF" || donner1 == "GNF" || donner2 == "GNF" || donner2 == "CFA") {
        if (donner1 == "GNF") {
            //convertion de franc guineen en cfa 
            valeur = (y*v1)/v2 ;
            return valeur;
        }
        if (donner1 == "CFA") {
            //convertion de  cfa en franc guineen  
            valeur = (y*v2)/v1 ;
            return valeur;
        }
    } 
}
