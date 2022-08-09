/**********************************GESTION DU CARROUSEL******************************************** */
const BODY = document.getElementById('body')
const MAIN = document.getElementById('main')

let nbImages = 0 //nombre d'images contenues dans le portfolio
let currentImg = 0  //numéro de l'image actuelle affichée dans le carrousel

const carrousel = document.getElementById("carrousel");

/**
 * Affichage du carrousel en fonction de l'image sélectionnée dans le portfolio
 * @param {string} idMedia : identifiant du média cliqué dans le portfolio
 */
function displayCarrousel(idMedia) {

    //tableau contenant les données du photographe ([0]) et de ses médias ([1])
    let mediasPhotographer = photographersArray[idPhotographer]

    //création de l'élément carrousel-container
    const carrouselContainer = document.createElement("ul")
    carrouselContainer.setAttribute("id","carrousel-container")
    //ajout du nom du photographe dans aria-label du carrousel
    let name = mediasPhotographer[0].name
    carrouselContainer.setAttribute("aria-label",`Images et vidéos de ${name}`)
    //ajout des éléments au DOM
    carrousel.appendChild(carrouselContainer)
    
    //on traite les médias du photographe concerné
    mediasPhotographer[1].forEach((media) => {
        
        //récup des infos concernant les médias
        const mediaModel = mediaFactory(media);

        //construction du contenu à ajouter au DOM
        const carrouselDOM = mediaModel.getMediaCardDOM("carrousel")
        
        //Ajout au DOM
        carrouselContainer.appendChild(carrouselDOM)
    });

    const carrouselItems = document.querySelectorAll(".carrousel-item")
    
    //mise en place du carrousel pour affichage de l'image sélectionnée idMedia
    //l'identifiant de l'image est l'id de l'article dans le portfolio
    //gestion display + TA
    const portfolio = document.getElementById("portfolio");
    const portfolioItems = portfolio.getElementsByTagName('article')
    for (let i = 0; i < portfolioItems.length; i++) {
        
        //média sélectionné depuis le portofolio : affiché dans le carrousel + gestion TA
        if (portfolioItems[i].id == idMedia) {
            carrouselItems[i].classList.remove("display-none")
            carrouselItems[i].setAttribute("aria-hidden", "true")
            currentImg = i
            
            //tous les autres médias : masqués dans le carrousel + gestion TA
        }else{
            carrouselItems[i].classList.add("display-none")
            carrouselItems[i].setAttribute("aria-hidden", "false")
        } 
    }
    
    //affichage du carrousel (pleine page) + gestion TA
    carrouselContainer.style.display = "flex";
    carrouselContainer.style.height = "100vh";
    carrouselContainer.style.width = "100vw";
    carrouselContainer.setAttribute('aria-hidden', 'false')

    //on masque le reste de la page pour les TA et on empêche le scroll
    MAIN.setAttribute('aria-hidden', 'true')
    BODY.classList.add('no-scroll')

    //prise de focus par le bouton de fermeture
    let currentCarrousel = carrouselItems[currentImg]
    const carrouselButton = currentCarrousel.querySelector('.carrousel-close-button')
    carrouselButton.addEventListener("click",closeCarrousel)
    carrouselButton.focus()
    
}

/**
 * Fermeture du carrousel
 */
function closeCarrousel() {
    
    //suppression du contenu du carrousel dans le DOM
    carrousel.innerHTML = ""
      
    //réaffichage de MAIN pour les TA + scroll
    MAIN.setAttribute('aria-hidden', 'false')
    BODY.classList.remove('no-scroll')
    
    //récup du focus par le bouton Contactez-moi
    document.getElementById('contact-button').focus()
}

/**
 * gestion du changement d'image affichée dans le carrousel
 * @param {string} direction = "next" ou "prev"
 */
function changeCarrousel (direction)  {
    
    const carrouselItems = document.querySelectorAll(".carrousel-item")
    
    //numéro de la prochaine image à afficher
    let nextImg 

    //1er lancement, on initialise le nombre d'images du carrousel à partir du nombre total d'éléménts dans le DOM
    if (nbImages == 0) {
        nbImages = carrouselItems.length
    }
    
    //image suivante : fonction de l'image courante + gestion si dernière image
    if (direction=="next") {
        if (currentImg == nbImages-1){
            nextImg = 0
        }else{
            nextImg = currentImg+1
        }
    //image précédente : fonction de l'image courante + gestion si première image
    }else{
        if (currentImg == 0) {
            nextImg = nbImages - 1
        }else{
            nextImg = currentImg-1
        } 
    }

    //on affiche l'image nextImg + TA
    carrouselItems[nextImg].classList.remove("display-none")
    carrouselItems[nextImg].setAttribute("aria-hidden", "true")
    
    //on cache l'image courante currentImg + TA
    carrouselItems[currentImg].classList.add ("display-none")
    carrouselItems[currentImg].setAttribute("aria-hidden", "false")

    //maj du numéro de l'image courante
    currentImg = nextImg
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