//récupération des données du fichier JSON
// eslint-disable-next-line no-unused-vars
var getDatas = async () => {
    var request = './data/photographers.json'
    let response = await fetch(request)
    let datas = await response.json()
    return datas

}