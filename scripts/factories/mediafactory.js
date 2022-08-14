/**********************************GESTION DU DOM MEDIAS******************************************** */
var mediaLikes = 0;
var imageNumber = 0
/**
 * Création du DOM concernant les médias pour alimenter le portfolio et le carrousel
 * fonction appelée dans photographer.js et carrousel.js
 * @param {object} data : ensemble des données médias contenues dans le tableau photographersArray[1]
 * @returns contenu du DOM à implémenter
 */
//eslint-disable-next-line no-unused-vars
var mediaFactory = (data) => {

    const id = data.id
    const photographerId = data.photographerId
    const title = data.title
    const image = data.image
    const video = data.video
    const likes = data.likes
    const noClicable = data.clicable

    /**
     * construction de l'élément article du DOM
     * @param {string} type     //portofolio ou carrousel 
     * @returns 
     */
    var getMediaCardDOM = function (type) {

        let article; let picture;
        let altParam = ""

        //DOM pourle portfolio + maj du nombre de likes
        if (type == "portfolio") {
            //media = image
            if (image) {
                altParam = image.split('.')[0]
                picture = 
                    `
                        <a href="javascript:displayCarrousel(${id})" tabindex="0" class="media-portfolio">
                            <img src = ./assets/images/${photographerId}/${image} alt=${altParam} >
                        </a>
                    `
                //media = video
            } else {
                altParam = video.split('.')[0]
                picture = `
                    <i class="fa-solid fa-circle-play"></i>
                    <a href="javascript:displayCarrousel(${id})" tabindex="0" class="media-portfolio">
                        <video>
                            <source src = ./assets/images/${photographerId}/${video} type="video/mp4" alt=${altParam} >
                        </video>
                    </a>
                    `
            }

            article = document.createElement('article');
            article.setAttribute("id", `${id}`)
            article.innerHTML =
                `${picture} 
                <div class="photo-infos">
                    <p class="photo-title" tabindex="0">${title}</p>
                    <a href="#like${id}" id=like${id} class="likes" aria-label="likes" onClick="addLike(${id})" tabindex="0">
                        <span aria-label="Nombre de likes ${likes}" tabindex="0">${likes}</span>
                        <span class="fa fa-heart ${noClicable}"></span>
                    </a>
                </div>`

            mediaLikes = mediaLikes + likes
        //DOM pour le carrousel
        } else if (type == "carrousel") {

            //initialisation du numéro de l'image
            if (!document.getElementById("item-0")) {
                imageNumber = 0
            }

            //création de la balise article
            article = document.createElement('li')
            article.setAttribute("id", `item-${imageNumber}`)
            article.classList.add("carrousel-item")
            //images autres que la 1ère invisible
            if (imageNumber > 0) {
                article.classList.add("display-none")
                article.setAttribute("aria-hidden", "true")
            }

            //media = image
            if (image) {
                altParam = image.split('.')[0]
                picture = 
                    `
                    <div role="button" aria-label = ${altParam} tabindex="-1">
                        <img src = ./assets/images/${photographerId}/${image} alt=${altParam}   class="carrousel-img" tabindex="0">
                    </div>
                        `
            //media = video
            } else {
                altParam = video.split('.')[0]
                picture =
                    `
                        <div role="button" aria-label = ${altParam} tabindex="-1">
                        <video controls controlslist="nofullscreen">
                            <source src = ./assets/images/${photographerId}/${video} type="video/mp4" alt=${altParam} 
                                class="carrousel-img">
                        </video>
                        </div>
                    `
            }

            article.innerHTML =
                `<button class="carrousel-close-button" aria-label="Fermer la fenêtre" onclick=closeCarrousel()>
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="white"/>
                    </svg>
                </button>
                <div onclick=changeCarrousel("prev") role="button" class="controls controls-left" aria-label="Média précédent" tabindex="0">
                    <i onclick=changeCarrousel("prev") class="fa fa-chevron-left" tabindex="-1" aria-label="Média précédent"></i>
                </div>
                
                <article>
                ${picture}
                <h2 class="photo-title">${title}</h2>
                </article>
                
                <div onclick=changeCarrousel("next") role="button" class="controls controls-right" aria-label="Média suivant" tabindex="0">
                    <i onclick=changeCarrousel("next") class="fa fa-chevron-right" tabindex="-1" aria-label="Média suivant"></i>
                </div>
                `
            imageNumber = imageNumber + 1

        }

        return (article);
    }

    return { getMediaCardDOM }
}