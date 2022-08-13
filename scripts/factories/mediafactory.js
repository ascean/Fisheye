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
                picture = `
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

            //création de la ballise article
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
                    `<a href="#">
                        <img src = ./assets/images/${photographerId}/${image} alt=${altParam} class="carrousel-img">
                    </a>`
            //media = video
            } else {
                altParam = video.split('.')[0]
                picture =
                    `<a href="#">
                        <video controls controlslist="nofullscreen">
                            <source src = ./assets/images/${photographerId}/${video} type="video/mp4" alt=${altParam} 
                                class="carrousel-img">
                        </video>
                    </a>`
            }

            article.innerHTML =
                `<button class="carrousel-close-button" aria-label="Fermer la fenêtre" onclick=closeCarrousel()>
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="white"/>
                    </svg>
                </button>
                <button class="controls controls-left" onclick=changeCarrousel("prev")>
                    <span class="img prev-image">
                        <i aria-hidden="true" class="fa fa-chevron-left"></i>
                    </span>
                    <p class="sr-only">Média précédent</p>
                </button>
                
                <article>
                    ${picture}
                    <h2 class="photo-title">${title}</h2>
                </article>

                <button class="controls controls-right" onclick=changeCarrousel("next")>
                    <span class="img next-image" >
                        <i aria-hidden="true" class="fa fa-chevron-right"></i>
                    </span>
                    <p class="sr-only">Média suivant</p>
                </button>`
            imageNumber = imageNumber + 1

        }

        return (article);
    }

    return { getMediaCardDOM }
}