/***********************************GESTION DU TRI DU PORTFOLIO****************************************************** */
const navbarContainer = document.getElementById("navbar-container")

let tabOrder = [{ "orderby1": "Popularité" }, { "orderby2": "Date" }, { "orderby3": "Titre" }]

/**
 * Tri du tableau des médias en fonction du critère choisi
 * @param {string} type 1 = "popularité", 2 = "date" ou 3 = "titre"
 */
var orderbyArray = (type) => {

    switch (type) {
        case "1"://"popularite":
            // eslint-disable-next-line no-undef
            photographersArray[idPhotographer][1].sort((a, b) => {
                return a.likes - b.likes
            })
            break;
        case "2": //"date":
            // eslint-disable-next-line no-undef
            photographersArray[idPhotographer][1].sort((a, b) => {
                return a.date.localeCompare(b.date)
            })
            break;
        case "3": //"titre":
            // eslint-disable-next-line no-undef
            photographersArray[idPhotographer][1].sort((a, b) => {
                return a.title.localeCompare(b.title)
            })
            break;
        default:
    }

}



/**
 * prise en compte du critère de tri dans l'affichage des médias : tri du tableau photographersArray
 * est appelé sur clic des différentes options du menu navbar
 * @param {object} ev 
*/
// eslint-disable-next-line no-unused-vars
var selectOrderBy = (id) => {

    //récup de l'identifiant et màj de l'ordre du menu de tri    
    switch (id) {
        case "1":
            tabOrder = [{ "orderby1": "Popularité" }, { "orderby2": "Date" }, { "orderby3": "Titre" }]
            break;
        case "2":
            tabOrder = [{ "orderby2": "Date" }, { "orderby1": "Popularité" }, { "orderby3": "Titre" }]
            break;
        case "3":
            tabOrder = [{ "orderby3": "Titre" }, { "orderby1": "Popularité" }, { "orderby2": "Date" }]
            break;
        default:
            tabOrder = [{ "orderby1": "Popularité" }, { "orderby2": "Date" }, { "orderby3": "Titre" }]
            break;
    }

    //màj du DOM du menu de tri : navbarcontainer
    const orderDOM = 
        ` <ul id="navbar" role="menubar" aria-label="Tri par ${Object.values(tabOrder[0])}">
            <li id="${Object.keys(tabOrder[0])}">
                <a href="#menu-link1" id="menu-link1" class="menu-link" 
                    onclick="selectOrderBy('${Object.keys(tabOrder[0])[0].substring(7, 8)}')" 
                    role="menuitem" tabindex="0" aria-labelleby="navbar">${Object.values(tabOrder[0])}</a>
                <ul id="ssnavbar" role="menu" aria-label="Autres tris">
                    <li id="${Object.keys(tabOrder[1])}">
                        <a href="#menu-link2" id="menu-link2" class="menu-link" 
                        onclick="selectOrderBy('${Object.keys(tabOrder[1])[0].substring(7, 8)}')" 
                        role="menuitem" aria-haspopup="false" tabindex="0">${Object.values(tabOrder[1])}</a>
                    </li>
                    <li id="${Object.keys(tabOrder[2])}">
                        <a href="#menu-link3" id="menu-link3" class="menu-link" 
                        onclick="selectOrderBy('${Object.keys(tabOrder[2])[0].substring(7, 8)}')" 
                        role="menuitem" aria-haspopup="false" tabindex="0">${Object.values(tabOrder[2])}</a>
                    </li>
                </ul>
            </li>
        </ul>`
        
    navbarContainer.innerHTML = orderDOM

    //tri du tableau de données
    orderbyArray(id)

    //affichage des médias en fonction du critère de tri
    // eslint-disable-next-line no-undef
    displayPortfolio(photographersArray[idPhotographer][1])


    //récup du focus par le bouton Contactez-moi
    const mediaPortfolio = document.querySelectorAll(".media-portfolio")
    mediaPortfolio[0].focus()

}


//*************************************GESTION DES LISTENERS*************************************
var setupListenersFunctions = () => {

    window.addEventListener('focus', function (e) {
        //ouverture du menu s'il a le focus
        console.log(e.target.id);
        let idFocus  = e.target.id
        if ((idFocus === "menu-link1") || (idFocus === "menu-link2") || (idFocus === "menu-link3")) {
            let ssnavbar =      document.getElementById("ssnavbar")
            if (ssnavbar.style.display != "block") {
                ssnavbar.style.display = "block"
            }
        }else{
            let ssnavbar = document.getElementById("ssnavbar")
                if (ssnavbar.style.display === "block") {
                    ssnavbar.style.display = "none"
                }
             
        }
        //fermeture du menu de tri quand le focus est sur un autre élément
        // if (e.target.role != "menuitem") {
        //     let ssnavbar = document.getElementById("ssnavbar")
        //     if (ssnavbar.style.display === "block") {
        //         ssnavbar.style.display = "none"
        //     }
        // }

    }, true);

}

//Lancement des listeners
setupListenersFunctions()