/***********************************GESTION DU TRI DU PORTFOLIO****************************************************** */
let navbar      = document.getElementById("navbar")
const ssnavbar  = document.getElementById("ssnavbar")

let allLi
let tabOrder = {}

/**
 * Tri du tableau des médias en fonction du critère choisi
 * @param {string} type 1 = "popularité", 2 = "date" ou 3 = "titre"
 */
function orderbyArray(type) {
    
    switch (type) {
        case "1"://"popularite":
            photographersArray[idPhotographer][1].sort((a,b) => {
            return a.likes - b.likes
        })
        break;
        case "2": //"date":
            photographersArray[idPhotographer][1].sort((a,b) => {
            return a.date.localeCompare(b.date)
        })
        break;
        case "3": //"titre":
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

    //récup de l'identifiant et màj de l'ordre du menu de tri
    let choice = ev.target.parentNode.id;
    let num = choice.substring(7,8)
        switch (num) {
            case "1":
                tabOrder = [ {"orderby1":"Popularité"}, {"orderby2":"Date"}, {"orderby3":"Titre"} ]
                break;
            case "2":
                tabOrder = [ {"orderby2":"Date"}, {"orderby1":"Popularité"}, {"orderby3":"Titre"} ]
                break;
            case "3":
                tabOrder = [ {"orderby3":"Titre"}, {"orderby1":"Popularité"}, {"orderby2":"Date"} ]
                break;
            default:
                tabOrder = [ {"orderby1":"Popularité"}, {"orderby2":"Date"}, {"orderby3":"Titre"} ]
                break;
        }
    
    //màj du DOM du menu de tri
    const navbarContainer = document.getElementById("navbar-container")
    navbarContainer.innerHTML = ""

    const orderDOM = `
                    <ul id="navbar">
                        <li id="${Object.keys(tabOrder[0])}">
                            <span>${Object.values(tabOrder[0])}</span>
                            <ul id="ssnavbar">
                                <li id="${Object.keys(tabOrder[1])}"><span>${Object.values(tabOrder[1])}</span></li>
                                <li id="${Object.keys(tabOrder[2])}"><span>${Object.values(tabOrder[2])}</span></li>
                            </ul>
                        </li>
                    </ul>`
                            
    navbarContainer.innerHTML = orderDOM
                     
    //màj des fonctions d'écoute pour prise en compte du nouveau DOM
    setupListenersFunctions()
    
    //tri du tableau de données
    orderbyArray(num)
        
    //affichage des médias en fonction du critère de tri
    displayPortfolio(photographersArray[idPhotographer][1])
}

//ouverture du menu de tri
function openNavbarOrderby() {    
    ssnavbar.style.display="block"
}

//fermeture du menu de tri
function closeNavbarorderby() {
    ssnavbar.style.display="none"
}

//*************************************GESTION DES LISTENERS*************************************
function setupListenersFunctions () {
    
    let navbar  = document.getElementById("navbar")
    allLi       = navbar.getElementsByTagName("li")
    navbarSpan  = allLi[0].getElementsByTagName("span")

    for (let i = 0; i < allLi.length; i++) {
        const element = allLi[i];
        //écoute du clic -> selection
        element.addEventListener("click", selectOrderBy) 
        //écoute du mouveleave -> fermeture
        element.addEventListener("mouseleave", closeNavbarorderby)
        //écoute du mouseover -> ouverture
        element.addEventListener("mouseover", openNavbarOrderby)
    }
}

//Lancement des listeners
setupListenersFunctions()