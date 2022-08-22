/**********************************GESTION DU CARROUSEL******************************************** */
let nbImages = 0 //nombre d'images contenues dans le portfolio
let currentImg = 0  //numéro de l'image actuelle affichée dans le carrousel
let calledMedia

const carrouselContainer = document.getElementById("carrousel-container");

/**
 * Affichage du média sélectionné, masquage des autres / gestion TA avec aria-hidden
 * @param {string} idMedia identifiant du média sélectionné dans le portfolio
 */
var displayMedia = (idMedia) => {

    calledMedia = idMedia;
    const carrouselItems = document.querySelectorAll(".carrousel-item")
    const portfolio = document.getElementById("portfolio");
    const portfolioItems = portfolio.getElementsByTagName('article')
    for (let i = 0; i < portfolioItems.length; i++) {
        
        //média sélectionné depuis le portofolio : affiché dans le carrousel + gestion TA
        if (portfolioItems[i].id == idMedia) {
            carrouselItems[i].classList.remove("display-none")
            currentImg = i

            //tous les autres médias : masqués dans le carrousel + gestion TA
        } else {
            carrouselItems[i].classList.add("display-none")
        }
    }

}

/**
 * Affichage du carrousel en fonction de l'image sélectionnée dans le portfolio
 * @param {string} idMedia : identifiant du média cliqué dans le portfolio
 */
//eslint-disable-next-line no-unused-vars
var displayCarrousel = (idMedia) => {

    //tableau contenant les données du photographe ([0]) et de ses médias ([1])
    // eslint-disable-next-line no-undef
    let mediasPhotographer = photographersArray[idPhotographer]
        
    let h2Name = document.createElement('h2')
    let name = mediasPhotographer[0].name
    h2Name.innerText = `Images et vidéos de ${name}`
    h2Name.classList.add("sr-only")
    h2Name.setAttribute("aria-hidden","false")
    carrouselContainer.appendChild(h2Name)

    //création de l'élément carrousel-container
    const carrouselItems = document.createElement("div")
    carrouselItems.setAttribute("id", "carrousel-items")

    //ajout des éléments au DOM
    carrouselContainer.appendChild(carrouselItems)


    //on traite les médias du photographe concerné
    mediasPhotographer[1].forEach((media) => {

        //récup des infos concernant les médias
        // eslint-disable-next-line no-undef
        const mediaModel = mediaFactory(media);

        //construction du contenu à ajouter au DOM
        const carrouselDOM = mediaModel.getMediaCardDOM("carrousel")

        //Ajout au DOM
        carrouselItems.appendChild(carrouselDOM)
    });

    //affichage du média sélectionné dans le portfolio (idMedia)
    displayMedia(idMedia)
    
    //affichage du carrousel (pleine page)
    carrouselContainer.style.display = "flex";
    carrouselContainer.style.height = "100vh";
    carrouselContainer.style.width = "100vw";
    
    //on empêche le scroll
    // eslint-disable-next-line no-undef
    BODY.classList.add('no-scroll')

    //sections non lisibles par les TA
    const photographHeader = document.getElementById("photograph-header");
    if (photographHeader) photographHeader.setAttribute('aria-hidden','true')
    const portfolioContainer = document.getElementById("portfolio-container");
    if (portfolioContainer) portfolioContainer.setAttribute('aria-hidden','true')

    //appel des fonctions d'écoute du clic sur les boutons du carrousel
    setupListenersCarrousel()

    //prise de focus -> image
    const carrouselImg = document.querySelectorAll(".carrousel-img")[currentImg]
    if (carrouselImg) carrouselImg.focus()
    
}

/**
 * gestion du changement d'image affichée dans le carrousel
 * @param {string} direction = "next" ou "prev"
 */
var changeCarrousel = (direction) => {
    const carrouselItems =  document.querySelectorAll(".carrousel-item")
    
    //numéro de la prochaine image à afficher
    let nextImg
    
    //1er lancement, on initialise le nombre d'images du carrousel à partir du nombre total d'éléménts dans le DOM
    if (nbImages == 0) {
        nbImages = carrouselItems.length
    }
    
    //image suivante : fonction de l'image courante + gestion si dernière image
    if (direction == "next") {
        if (currentImg == nbImages - 1) {
            nextImg = 0
        } else {
            nextImg = currentImg + 1
        }
        //image précédente : fonction de l'image courante + gestion si première image
    } else {
        if (currentImg == 0) {
            nextImg = nbImages - 1
        } else {
            nextImg = currentImg - 1
        }
    }
    
    //on affiche l'image nextImg + TA
    carrouselItems[nextImg].classList.remove("display-none")
    carrouselItems[nextImg].setAttribute("aria-hidden", "false")

    //on cache l'image courante currentImg + TA
    carrouselItems[currentImg].classList.add("display-none")
    carrouselItems[currentImg].setAttribute("aria-hidden", "true")
    
    //maj du numéro de l'image courante
    currentImg = nextImg

    const carrouselImg = document.querySelectorAll(".carrousel-img")[currentImg]
    carrouselImg.focus()
}

/**
 * Fermeture du carrousel
 */
var closeCarrousel = () => {

    //suppression du contenu du carrousel dans le DOM
    carrouselContainer.innerHTML = ""
    carrouselContainer.style.display="none"

    //réaffichage des sections pour les TA + scroll BODY
    // eslint-disable-next-line no-undef
    BODY.classList.remove('no-scroll')

    //sections non lisibles par les TA
    const photographHeader = document.getElementById("photograph-header");
    if (photographHeader) photographHeader.setAttribute('aria-hidden','true')
    const portfolioContainer = document.getElementById("portfolio-container");
    if (portfolioContainer) portfolioContainer.setAttribute('aria-hidden','true')

    //récup du focus par le bouton Contactez-moi
    document.getElementById(calledMedia).children[0].focus()
}


//Gestion des interactions au clavier
document.addEventListener('keydown', e => {
    const carrouselContainer = document.getElementById('carrousel-container')
    //on interagit uniquement si le carrousel est affiché
    if (carrouselContainer && carrouselContainer.style.display == "flex") {

        switch (e.key) {
            //ESC -> fermeture du carrousel
            case "Escape":
                closeCarrousel()
                break;
                //flèche droite : image suivante
            case "ArrowRight":
                changeCarrousel("next")
                break;
                //flèche gauche : image précédente
                case "ArrowLeft":
                    changeCarrousel("prev")
                break;
            default:
                break;
            }
    }
})

//écoute du clic sur les boutons du carrousel
var setupListenersCarrousel = () => {

    const torightButtons = document.querySelectorAll(".controls-right")
    for (let i = 0; i < torightButtons.length; i++) {
        torightButtons[i].addEventListener("click", () => {
            changeCarrousel("next")
        })
    }
    const toleftButtons = document.querySelectorAll(".controls-left")
    for (let i = 0; i < toleftButtons.length; i++) {
        toleftButtons[i].addEventListener("click", () => {
            changeCarrousel("prev")
        })
    }
    const closeButtons = document.querySelectorAll(".carrousel-close-button")
    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener("click", () => {
            closeCarrousel()
        })
    }
}
