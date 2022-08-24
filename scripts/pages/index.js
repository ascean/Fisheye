/**
 * Traitement des données JSON et affichage dans le DOM
 * @param {object} photographers 
 */
var displayPhotographers = async (photographers) => {

    //sélection de l'élément du DOM dans lequel on va ajouter les infos
    const photographersSection = document.getElementById("photographer-section");

    //pour chaque photographe
    photographers.forEach((photographer) => {

        //récup des infos concernant un photographe
        // eslint-disable-next-line no-undef
        const photographerModel = photographerFactory(photographer);
        //exemple de retour {name: 'Mimi Keel', picture: 'assets/photographers/MimiKeel.jpg', getUserCardDOM: ƒ}

        //construction du contenu à ajouter au DOM
        const userCardDOM = photographerModel.getUserCardDOM(true);

        //ajout au DOM
        photographersSection.appendChild(userCardDOM);
    });
};

var init = async () => {

    // Récupère les datas JSON
    // eslint-disable-next-line no-undef
    const datas = await getDatas()
    const photographers = datas.photographers

    displayPhotographers(photographers);
};

init();
