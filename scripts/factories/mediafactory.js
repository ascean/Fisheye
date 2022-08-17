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
                    <p class="photo-title" aria-hidden="true">${title}</p>
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
            article = document.createElement('div')
            article.setAttribute("id", `item-${imageNumber}`)
            article.classList.add("carrousel-item")
            //images autres que la 1ère invisible
            if (imageNumber > 0) {
                article.classList.add("display-none")
                //article.setAttribute("aria-hidden", "true")
            }

            //media = image
            if (image) {
                altParam = image.split('.')[0]
                picture = 
                    `
                    <div role="button" aria-label = ${altParam} tabindex="-1">
                        <img src = ./assets/images/${photographerId}/${image} alt=${altParam}   class="carrousel-img" tabindex="3">
                    </div>
                        `
            //media = video
            } else {
                altParam = video.split('.')[0]
                picture =
                    `
                        <div role="button" aria-label = ${altParam} tabindex="-1">
                        <video controls controlslist="nofullscreen" class="carrousel-img" tabindex="2">
                            <source src = ./assets/images/${photographerId}/${video} type="video/mp4" alt=${altParam}>
                        </video>
                        </div>
                    `
            }

            article.innerHTML = `
                    <div class="left-part">

                        <button class="controls controls-left" aria-label="Média précédent" onclick="changeCarrousel('prev')" tabindex="2"> 
                            <svg width="42" height="42" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75
                                0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5
                                12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z">
                                </path>
                            </svg>
                        </button>
                    </div>

                    <div class="right-part">
                        <button class="carrousel-close-button" aria-label="Fermer la fenêtre" onclick="closeCarrousel()" tabindex="1">
                            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77
                                    42L42 37.77L25.23 21L42 4.23Z" fill="white">
                                </path>
                            </svg>
                        </button>

                        <button class="controls controls-right" aria-label="Média suivant" onclick="changeCarrousel('next')" tabindex="4"> 
                            <svg width="42" height="42" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75
                                    0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5
                                    45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z">
                                </path>
                            </svg>
                        </button>

                    </div>
                    <div class="center-part">
                        <article>
                            
                            ${picture}
                            <h2 class="photo-title">${title}</h2>

                        </article>
                    </div>
                </div>`

                imageNumber = imageNumber + 1

        }

        return (article);
    }

    return { getMediaCardDOM }
}