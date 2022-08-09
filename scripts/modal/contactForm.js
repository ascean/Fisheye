/**********************************GESTION DE LA MODALE DE CONTACT ******************************************** */
window.onload = () => {
    setupListeners()
}

const BODY = document.getElementById('body')
const MAIN = document.getElementById('main')

const modalContainer = document.getElementById('modal-container')
const modalTitle = document.getElementById('modal-title')
const modalButton = document.getElementById("modal-button")

//tableau contenant les infos saisies dans le formulaire
let checkList = [];

//DOM Elements - form
const formContact = document.forms['formContact']; //formulaire
const first = formContact[0];   //prénom
const last = formContact[1];   //nom
const email = formContact[2];   //email
const message = formContact[3];   //date de naissance
const formDatas = document.querySelectorAll(".formData");   //éléments de la modale
const textError = document.querySelectorAll(".textError")

//class Object : nom du champ + contenu
class FormData {
    constructor(fieldName, fieldContent) {
        this.fieldName = fieldName;
        this.fieldContent = fieldContent;
    }
}


/**
* initialisation des éléments de formulaire
*/
function initFields() {
    for (let i = 0; i < 4; i++) {
        formContact[i].value = "";
    }
}

/**
 * initialisation des messages d'erreur
 */
function initErrors() {

    for (let i = 0; i < textError.length; i++) {
        switch (i) {
            case 0:
                textError[i].innerText= "Veuillez entrer au moins 2 caractères alphanumériques.";
                break;
            case 1:
                textError[i].innerText= "Veuillez entrer au moins 2 caractères alphanumériques.";
                break;
            case 2:
                textError[i].innerText= "Veuillez entrer une adresse mail valide.";
                break;
            case 3:
                textError[i].innerText = "Veuillez saisir votre message.";
                break;
            default:
                break;
        }

    }
}

/**
 * initialisation du tableau contenant les éléments du formulaire
 */
function initCheckList() {

    checkList = [
        new FormData("first", ""), 		//élément 0
        new FormData("last", ""),		//élément 1
        new FormData("email", ""),		//élément 2
        new FormData("message", "")	    //élément 3
    ];

}

//
/**
 * gestion de l'affichage des messages d'erreur en fonction du contenu du tableau checkList
 * @returns true si erreur, false sinon
 */
function displayErrorField() {

    let fieldError = false;

    for (let i = 0; i < 4; i++) {
        const element = checkList[i];
        let ariaVisibility;
        let opacity;

        if (element.fieldContent == "") {
            fieldError = true
            ariaVisibility = true;
            opacity = 1;
        } else {
            ariaVisibility = false;
            opacity = 0;
        }

        textError[i].setAttribute("aria-hidden", ariaVisibility);
        textError[i].style.opacity = opacity;

    }
    return fieldError;
}


/**
 * Fonctions d'écoute
 */
var listenerFunction = {

    /**
     * controle first name and last name
     * @param {object} ev firstName ou lastName 
     */
    checkText: (ev) => {

        let fieldContent = ev.target.value.trim();	//valeur saisie
        let ariaVisibility = false;		//visibilité message erreur
        let opacity = 0;
        let visible = false
        let input = ev.target.name; //'first' ou 'last'
        
        //numéro de l'élément checkList. 0 correspond à la valeur par défaut input="first"
        let numField = 0 
        if (input == "last") { numField = 1 }
        if (input == "message") { numField = 3 }

        //REGEX autorisant caractères alphanumérique et - et '
        let regexModel
        if (numField == 3) {
            regexModel = /^[0-9a-zàâäãçéèêëìïîòôöõùûüñ'-]+$/i
        }else{
            regexModel = /^[0-9a-zàâäãçéèêëìïîòôöõùûüñ'-.!]+$/i
        } 

        //test si saisie + nb de caractères saisis >= 2 + REGEX
        if (!fieldContent || fieldContent.length < 2 || (!regexModel.test(fieldContent))) {
            //affichage du message d'alerte
            ariaVisibility = false; opacity = 1; visible = true
            fieldContent = "";
        } else {
            ariaVisibility = true; opacity = 0; visible=false
            
        }
        
        //màj des attributs et style du message d'erreur
        formDatas[numField].setAttribute("data-error-visible", visible)
        formDatas[numField].setAttribute("aria-hidden", ariaVisibility);
        formDatas[numField].childNodes[5].style.opacity = opacity;
        
        //màj de l'élément dans checkList
        checkList[numField].fieldContent = fieldContent
    },

    /**
     * controle email
     * @param {object} ev email 
     */
    checkEmail: (ev) => {

        let fieldContent = ev.target.value.trim();	//valeur saisie
        let ariaVisibility = false;	//visibilité message erreur
        let opacity = 0;
        let visible = false;
        let numField = 2;		//numéro de l'élément de checkList

        //test si email valide
        let emailModel = /^[a-zA-Z0-9._-]+@[a-zA-F0-9._-]+\.[a-zA-Z]{2,6}$/;
        if (!fieldContent || (!emailModel.test(fieldContent))) {
            //affichage du message d'alerte
            ariaVisibility = false; opacity = 1; visible = true;
            fieldContent = "";
        } else {
            ariaVisibility = true; opacity = 0; visible = false;
        }

        //màj des attributs et style du message d'erreur
        formDatas[numField].setAttribute("data-error-visible", visible)
        formDatas[numField].setAttribute("aria-hidden", ariaVisibility);
        formDatas[numField].childNodes[5].style.opacity = opacity;
        //màj de l'élément dans checkList
        checkList[numField].fieldContent = fieldContent

    }
}


/**
 * Affichage de la modale
 * @param {string} name 
 */
function displayModal(name) {

    initErrors()
    //affichage de la modale
    modalContainer.style.display = "flex";
    modalContainer.setAttribute('aria-hidden', 'true')

    //on masque le reste de la mage pour les TA
    MAIN.setAttribute('aria-hidden', 'true')
    BODY.classList.add('no-scroll')

    //màj du titre de la modale avec le nom du protographe
    modalTitle.innerHTML = `Contactez-moi<br>` + name

    //prise de focus par le bouton de fermeture
    document.getElementById('modal-close-button').focus()

}

/**
 * Fermeture de la modale
 */
function closeModal() {

    initFields()
    initErrors()
    initCheckList()

    //on masque la modale
    modalContainer.style.display = "none";
    modalContainer.setAttribute('aria-hidden', 'false')

    //réaffichage de main pour les TA
    MAIN.setAttribute('aria-hidden', 'false')
    BODY.classList.remove('no-scroll')

    //récup du focus par le bouton Contactez-moi
    document.getElementById('contact-button').focus() 
}

/**
 * Validation du formulaire
 * @param {object} event 
 */
function validModal(event) {

    //on empêche le comportement par défaut du formulaire
    event.preventDefault()

    //contrôle des saisies
    if (!displayErrorField()) {


        //sélection des éléments du DOM
        const FIELDS = document.querySelectorAll(".text-control")

        let saisieUser = "";

        //récupération et affichage des éléments saisis dans la console
        FIELDS.forEach(field => {
            if (!saisieUser) {
                saisieUser = field.labels[0].outerText + ": " + field.value
            } else {
                saisieUser += "," + field.labels[0].outerText + ": " + field.value
            }
        });

        //log pour contrôle saisie
        console.log(saisieUser);

        closeModal()
    }
}

/**
 * Liste des abonnements
 */
var setupListeners = () => {

    first.addEventListener("input", listenerFunction.checkText);
    last.addEventListener("input", listenerFunction.checkText);
    email.addEventListener("input", listenerFunction.checkEmail);
    message.addEventListener("input", listenerFunction.checkText);
    modalButton.addEventListener("click", validModal);

}

// Touche ESC pressée -> on ferme la modale
document.addEventListener('keydown', e => {
    if (modalContainer.getAttribute('aria-hidden') == 'true' && e.key === "Escape") {
        closeModal()
    }
})

//initialisation des champs de saisie du formulaire
initFields()

//initialisation de la checkList contenant les informations saisies par l'utilisateur
initCheckList()