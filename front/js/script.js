// appel de l'API

function getProducts() {
    fetch("http://localhost:3000/api/products")

  //conversion des données en json
    .then((reponse) => {
        return reponse.json();
    })
   //affichage des données récupérés
    .then((valeur) => {
        console.log(valeur);
        const nosProduits = document.querySelector("#items");
    })
}
getProducts();