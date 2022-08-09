    //async function getPhotographers() {
    /**
     * 
     * @returns 
     */
    var getPhotographers = async ()=> {

        var request = './data/photographers.json'
        let response = await fetch(request)
        let photographers = await response.json()
        return photographers    //ensemble du fichier JSON

    }

    //async function displayData(photographers) { 
    var displayPhotographers  = async (photographers) => {    
        
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

    //async function init() {
    var init = async() => { 

        // Récupère les datas du tableau photographers du JSON
        /*const { photographers } = await getPhotographers();
                    équivaut à : 
        const datas = await getPhotographers()
        const photographers = datas.photographers
        */
       
        const datas = await getPhotographers()
        const photographers = datas.photographers

        displayPhotographers(photographers);
    };
    
    init();
    