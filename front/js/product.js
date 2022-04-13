
// récupération de l'ID depuis le URL
const urlParams = new URLSearchParams(window.location.search);
const paramID = urlParams.get("id");
// console.log(paramID);

// appel API pour récupérer les donnes du produit choisi 
async function affichProduit(){
    await fetch(`http://localhost:3000/api/products/${paramID}`)
    .then((reponse) => {
        return reponse.json();
    })
    // affichage des informations du produit récupéré
    .then((infoProduct)=> {         
        console.log(infoProduct);
        
        let divImage = document.querySelector(".item__img");
        divImage.innerHTML = `<img src="${infoProduct.imageUrl}" alt="${infoProduct.description}">`;
        document.querySelector('#title').textContent = `${infoProduct.name}`;
        document.querySelector('#price').textContent = `${infoProduct.price}`;
        document.querySelector('#description').textContent = `${infoProduct.description}`;
        
        // console.log(infoProduct.colors);

        let optionCouleur = infoProduct.colors.map((couleur) => {
            // console.log(couleur);
            return `<option value="${couleur}">${couleur}</option>`;   
        })
                
        document.querySelector('#colors').innerHTML = optionCouleur;
    })
    .catch((erreur) => {
        console.log(erreur);
        var erreur = document.querySelector('.item').innerHTML = "Erreur serveur :(";       
    })
}
affichProduit();

// ajout des produits ans le panier
let btnPanier = document.querySelector("#addToCart");

btnPanier.addEventListener("click", function() {

});