/**
 * Traitement des données photographes
 * @param {object} data 
 * @returns 
 */
function photographerFactory(data) {

    //const { name, id, city, country, tagline, price, portrait } = data 
    //équivaut à:

    const name      = data.name
    const id        = data.id
    const city      = data.city
    const country   = data.country
    const tagline   = data.tagline
    const price     = data.price
    const portrait  = data.portrait

    const picture   = `./assets/photographers/${portrait}`

    /**
     * Création du code HTML correspondant aux photographes
     * @param {boolean} allPhotographers 
     * @returns élément du DOM
     */
    var getUserCardDOM = function (allPhotographers) {

        const ARTICLE = document.createElement('article');

        if (allPhotographers) {
            //affichage de l'ensemble des photographes sur la page index.html

            ARTICLE.innerHTML =
                `<a href=photographer.html?id=${id} aria-label="${name}">
                    <img src=${picture} class="img-photographer" alt="${name}">
                    <h2>${name}</h2>
                </a>
                <div class="infos">
                    <p class="localisation">${city}, ${country}</p>
                    <p>${tagline}</p>
                    <p class="price">${price}€/jour</p>
                </div>`

        } else {
            //affichage du photographe sélectionné sur la page photographer.html
            ARTICLE.innerHTML = 
                `<div class="photograph-infos">
                    <h1>${name}</h1>
                    <p class="localisation">${city}, ${country}</p>
                    <p class="tagline">${tagline}</p>
                </div>
                <button id="contact-button" class="contact-button" onclick="displayModal('${name}')">Contactez-moi</button>
                <img src="${picture}" class="img-photographer" alt=${name}>`
                
        }

        return (ARTICLE);
    }

    return {getUserCardDOM }
}