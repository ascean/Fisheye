/****************************************GESTION DU DOM PHOTOGRAPHE******************************************************** */
/**
 * Création du DOM concernant le ou les photographe(s) pour alimenter les pages index.htmp ou photographers.html
 * fonction appelée dans photographer.js et index.js
 * @param {object} data : ensemble des données phtographe contenues dans le tableau photographersArray[0]
 * @returns contenu du DOM à implémenter
 */
//eslint-disable-next-line no-unused-vars
var photographerFactory = (data) => {

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
                    <img src=${picture} class="img-photographer" alt="">
                    <h2>${name}</h2>
                </a>
                <div class="infos">
                    <p class="localisation" tabindex="0">${city}, ${country}</p>
                    <p tabindex="0">${tagline}</p>
                    <p class="price" tabindex="0">${price}€/jour</p>
                </div>`

        } else {
            //affichage du photographe sélectionné sur la page photographer.html
            ARTICLE.innerHTML = 
                `<div class="photograph-infos">
                    <h1 tabindex="0">${name}</h1>
                    <p class="localisation" tabindex="0">${city}, ${country}</p>
                    <p class="tagline" tabindex="0">${tagline}</p>
                </div>
                <button id="contact-button" class="contact-button" onclick="displayModal('${name}')">Contactez-moi</button>
                <img src="${picture}" class="img-photographer" alt="Photo de ${name}" tabindex="0">`
                
        }

        return (ARTICLE);
    }

    return {getUserCardDOM }
}