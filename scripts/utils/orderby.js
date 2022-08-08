/***********************************GESTION DU TRI DU PORTFOLIO****************************************************** */

const liPopularite  = document.getElementById("popularite")
const navbarSpan    = liPopularite.getElementsByTagName("span")
const liNavbar      = document.getElementsByTagName("li")
const ssnavbar      = document.getElementById("ssnavbar")

/**
 * Tri du tableau des médias en fonction du critère choisi
 * @param {string} type "popularité", "date" ou"titre"
 */
function orderbyArray(type) {

    switch (type) {
    case "popularite":
        photographersArray[idPhotographer][1].sort((a,b) => {
            return a.likes - b.likes
        })
        break;
    case "date":
        photographersArray[idPhotographer][1].sort((a,b) => {
            return a.date.localeCompare(b.date)
        })
        break;
    case "titre":
        photographersArray[idPhotographer][1].sort((a,b) => {
            return a.title.localeCompare(b.title)
        })
        break;
    default:
    }

}

/**
 * prise en compte du critère de tri dans l'affichage des médias : tri du tableau photographersArray
 * @param {object} ev 
 */
function selectOrderBy(ev) {

    let choice = ev.target.parentNode.id;

    //Toutes les options de tri ont un background de la couleur d'origine
    for (let i = 0; i < liNavbar.length; i++) {
        const element = liNavbar[i];
        element.style.backgroundColor = "#901C1C"
    }
    
    //on change la couleur du background, uniquement pour la 1ère option
    if (choice != "popularite") {
        ev.target.parentNode.style.backgroundColor = "black";
    }
    
    //Choix différent du choix précédemment affiché
    if (choice != navbarSpan[0].innerHTML) {
        
        //màj du sélecteur : repli + texte de la 1ère option de menu (visible)= option de tri choisie
        ssnavbar.style.display="none"
        navbarSpan[0].innerHTML = choice.charAt(0).toUpperCase() + choice.substring(1).toLowerCase();
        
        //tri du tableau de données
        orderbyArray(choice)
        
        //affichage des médias en fonction du critère de tri
        displayPortfolio(photographersArray[idPhotographer][1])
    }
}

//ouverture du menu de tri
function openNavbarOrderby() {

    //la 1ère option du menu ouvert est celle d'origine
    navbarSpan[0].innerHTML = "Popularité";
    ssnavbar.style.display="block"
}

//fermeture du menu de tri
function closeNavbarorderby() {
    ssnavbar.style.display="none"
}


//*************************************GESTION DES LISTENERS*************************************
//écoute du clic sur les 3 options
for (let i = 0; i < liNavbar.length; i++) {
    const element = liNavbar[i];
    element.addEventListener("click", selectOrderBy) 
}
//ouverture du menuau survol
liPopularite.addEventListener("mouseover", openNavbarOrderby)
//fermeture quand survol terminé
liPopularite.addEventListener("mouseleave", closeNavbarorderby)