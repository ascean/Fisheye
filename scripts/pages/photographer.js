var photographersArray = []
/**
 * Création du tableau de données : élément 0 = photographe, élément 1: médias du photographe
 * Affichage des infos sur la page
 *  [ 
 *  0: {name: 'Tracy Galindo', id: 82, city: 'Montreal', country: 'Canada', tagline: 'Photographe freelance', …},
    1: [ 
        0: {id: 342550, photographerId: 82, title: 'Fashion Yellow Beach', image: 'Fashion_Yellow_Beach.jpg', likes: 62, …}
        1: {id: 8520927, photographerId: 82, title: 'Fashion Urban Jungle', image: 'Fashion_Urban_Jungle.jpg', likes: 11, …}
        2: {id: 9025895, photographerId: 82, title: 'Fashion Pattern on a Pattern', image: 'Fashion_Pattern_on_Pattern.jpg', likes: 72, …}
        3: {id: 9275938, photographerId: 82, title: 'Wedding Gazebo', image: 'Event_WeddingGazebo.jpg', likes: 69, …}
        4: {id: 2053494, photographerId: 82, title: 'Sparkles', image: 'Event_Sparklers.jpg', likes: 2, …}
        5: {id: 7324238, photographerId: 82, title: '18th Anniversary', image: 'Event_18thAnniversary.jpg', likes: 33, …}
        6: {id: 8328953, photographerId: 82, title: 'Wooden sculpture of a horse', video: 'Art_Wooden_Horse_Sculpture.mp4', likes: 24, …}
        7: {id: 7502053, photographerId: 82, title: 'Triangle Man', image: 'Art_Triangle_Man.jpg', likes: 88, …}
        8: {id: 8523492, photographerId: 82, title: 'Purple Tunnel', image: 'Art_Purple_light.jpg', likes: 24, …}
        9: {id: 75902334, photographerId: 82, title: 'Art Mine', image: 'Art_Mine.jpg', likes: 75, …}
        ]
    ]
 */

// récup de l'identifiant du photographe
let params = (new URL(document.location)).searchParams;
const idPhotographer = params.get('id');

//nombres de likes + prix
var totalLikes = 0
var price = 0

//récupération des données du fichier JSON
var getDatas = async () => {

    var request = './data/photographers.json'
    let response = await fetch(request)
    let datas = await response.json()
    return datas

}

/**
 * traitement des données concernant le photographe passé en paramètre
 * @param {object} photographer 
 */
var displayPhotographer = async (photographer) => {

    //sélection de l'élément du DOM dans lequel on va ajouter les infos
    const photographersSection = document.getElementById("photograph-header");

    //récup des infos concernant le photographe passé en paramètre
    //exemple de retour {name: 'Mimi Keel', picture: 'assets/photographers/MimiKeel.jpg', getUserCardDOM: ƒ}
    const photographerModel = photographerFactory(photographer);

    //construction du contenu à ajouter au DOM
    const userCardDOM = photographerModel.getUserCardDOM(false);

    //ajout au DOM
    photographersSection.appendChild(userCardDOM);
};


/**
 * Affichage du portfolio + likes en bas de page
 * @param {object} medias 
 */
var displayPortfolio = async (medias) => {
    
    const portfolioContainer = document.getElementById("portfolio-container");
    
    //si le portfolio n'existe pas, on le crée
    let portfolio = document.getElementById("portfolio")
    if (!portfolio) {
        portfolio = document.createElement("div");
        portfolio.setAttribute("id","portfolio")
        portfolioContainer.appendChild(portfolio)
    //si le portfolio existe, on supprimer son contenu (nécessaire suite au tri)
    }else{
        portfolio.innerHTML=""
    }
    
    //on traite les médias du photographe concerné
    medias.forEach((media) => {

        //incrémentation du total de likes à partir du nb de likes de chaque média
        totalLikes = totalLikes + media.likes
        //recup tarif photographe
        price = media.price

        //récup des infos concernant les médias
        const mediaModel = mediaFactory(media);

        //construction du contenu à ajouter au DOM
        const mediaCardDOM = mediaModel.getMediaCardDOM("portfolio");

        //Ajout au DOM
        portfolio.appendChild(mediaCardDOM);
    });

    //zone de likes de bas de page
    if (!document.getElementById("bottom-likes")) {

        const bottomLikes = document.createElement("div")
        bottomLikes.setAttribute('id', "bottom-likes")
        bottomLikes.innerHTML =
            `<div class="likes">
                <p id="likes-number">${totalLikes}</p>
                <span class="fa fa-heart"></span>
            </div>
            <div class="price">${price}€ / jour</div>`
        
        //Ajout au DOM
        portfolioContainer.appendChild(bottomLikes);
    }

};


var init = async () => {

    //récupération des données du fichier JSON
    const datas = await getDatas();

    //traitement de toutes les entrées photographers
    datas.photographers.forEach((dataPhotographer) => {
     
        //ajout du photographe dans le tableau photographersArray
        photographersArray[dataPhotographer.id] = [dataPhotographer]

        //ajout des éléments médias dans le tableau arrayMedias
        //arrayMedias permet d'ajouter une key "clicable" pour chaque média du photographe concerné dans photographersArray
        //clicable = true si le media a été cliqué et empêcher un nouveau clic (utilisé dans addLike())
        let arrayMedias = []
        datas.medias.forEach((dataMedia) => {
            if (dataMedia.photographerId == dataPhotographer.id) {
                var clicable = {clicable: "true"};
                dataMedia = {...dataMedia, ...clicable};
                arrayMedias.push(dataMedia)
            }
        })
        photographersArray[dataPhotographer.id].push(arrayMedias)
    })

    //affichage des données photographe
    displayPhotographer(photographersArray[idPhotographer][0])

    //appelé dans orderby.js 
    //tri du tableau photographersArray selon l'ordre par défaut = popularité
    orderbyArray("1")

    //affichage des données médias du photographe concerné dans le portfolio
    displayPortfolio(photographersArray[idPhotographer][1])

}


/**
 * gestion du clic sur le nombre de likes
 * +1 au clic puis blocage par suppression de l'identifiant + modif champ clicable (utile quand on recharge les médias suite au tri)
 *      
 * @param {string} idMedia 
 */
var addLike = (idMedia) => {

    //vérification de l'existence de l'identifiant sur le média
    //si identifiant, média pas encore liké
    //idLike = "likexxxxxx" (xxxxx : identifiant du média)
    const idLike = document.getElementById(`like${idMedia}`)

    if (idLike) {
        
        //mediasPhotographers contient l'ensemble des médias du photographe idPhotographer
        let mediasPhotographers = photographersArray[idPhotographer][1]
        
        for (let i = 0; i < mediasPhotographers.length; i++) {

            //on recheche le média cliqué dans l'ensemble des médias + on vérifie qu'il est clicable
            if (idMedia == mediasPhotographers[i].id && mediasPhotographers[i].clicable === "true") {
                
                //méj du nombre de likes
                mediasPhotographers[i].likes = mediasPhotographers[i].likes +1;
                //màj du champ "clicable" -> false
                mediasPhotographers[i].clicable = "noClicable";  
                
                //suppression de l'identifiant sur le média
                idLike.removeAttribute('id');

                //màj du nombre de likes dans le DOM
                //class noClicable change la couleur du coeur
                let nb = parseInt(idLike.innerText) + 1
                idLike.innerHTML = nb + `<span class="fa fa-heart noClicable"></span>`
                
                //maj du nombre total de likes pour le photographe
                const bottomLikes = document.getElementById("likes-number")
                bottomLikes.innerText = parseInt(bottomLikes.innerText) + 1
            }
            
        }
    }
}

init();
