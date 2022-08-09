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
    
    const id                =   data.id
    const photographerId    =   data.photographerId
    const title             =   data.title
    const image             =   data.image
    const video             =   data.video 
    const likes             =   data.likes
    const noClicable        =   data.clicable
    
    /**
     * construction de l'élément du DOM
     * @param {string} type     //portofolio ou carrousel 
     * @returns 
     */
    var getMediaCardDOM = function(type) {

        let article; let picture;
        
        //DOM pourle portfolio + maj du nombre de likes
        if (type == "portfolio") {
            //media = image
            if (image) {
                picture = `
                    <a href="#">
                    <img src = ./assets/images/${photographerId}/${image} alt=${image} onclick="displayCarrousel(${id})">
                    </a>
                    `
            //media = video
            }else{
                picture = `
                    <i class="fa-solid fa-circle-play"></i>
                    <a href="#" onclick="displayCarrousel(${id})" >
                        <video>
                            <source src = ./assets/images/${photographerId}/${video} type="video/mp4" alt=${video} >
                        </video>
                    </a>
                    ` 
            }

            article = document.createElement( 'article' );
            article.setAttribute("id",`${id}`)
            article.innerHTML = 
                `${picture} 
                <div class="photo-infos">
                    <p class="photo-title">${title}</p>
                    <div id=like${id} class="likes" aria-label="likes" onClick="addLike(${id})">
                        ${likes}
                        <span class="fa fa-heart ${noClicable}"></span>
                    </div>
                </div>`
            
            mediaLikes = mediaLikes + likes
        
            //DOM pour le carrousel
        }else if (type=="carrousel") {

            if (!document.getElementById("item-0")) {
                imageNumber = 0
            }
            article = document.createElement('li')
            article.setAttribute("id",`item-${imageNumber}`)
            article.classList.add ("carrousel-item")
            if (imageNumber > 0) {
                article.classList.add("display-none")
                article.setAttribute("aria-hidden", "true")
            }

            //media = image
            if (image) {
                picture = `
                    <a href="#">
                        <img src = ./assets/images/${photographerId}/${image} alt=${image} class="carrousel-img">
                    </a>
                    `
            //media = video
            }else{
                
                picture = 
                    `<a href="#">
                        <video controls>
                            <source src = ./assets/images/${photographerId}/${video} type="video/mp4" alt=${video} 
                                class="carrousel-img">
                        </video>
                    </a>` 
            }

            article.innerHTML = 
                `<button class="carrousel-close-button" aria-label="Fermer la fenêtre">
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="white"/>
                    </svg>
                </button>
                <div role="button" class="controls controls-left">
                    <span class="img prev-image" onclick=changeCarrousel("prev")>
                        <i aria-hidden="true" class="fa fa-chevron-left"></i>
                    </span>
                    <p class="sr-only">Previous</p>
                </div>
                
                <article>
                    ${picture}
                    <h2 class="photo-title">${title}</h2>
                </article>

                <div role="button" class="controls controls-right">
                    <span class="img next-image" onclick=changeCarrousel("next")>
                        <i aria-hidden="true" class="fa fa-chevron-right"></i>
                    </span>
                    <p class="sr-only">Next</p>
                </div>`
            imageNumber = imageNumber+1

        }

        return (article);
    }
    
    return { getMediaCardDOM }
}