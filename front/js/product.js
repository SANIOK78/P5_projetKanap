
// récupération de l'ID depuis le URL
const urlParams = new URLSearchParams(window.location.search);
const paramID = urlParams.get("id");

//récupération de la couleur et quantité du produit choisi
let selectCouleur = document.querySelector('#colors');
let selectQuantite = document.querySelector('#quantity');

let tabInfoProduit = [];

// appel API(requête HTTP) pour récupérer les donnes de l'article choisi 
function afficherProduit() {
    fetch(`http://localhost:3000/api/products/${paramID}`)
    .then((reponse) => {
        if(reponse.ok){
            return reponse.json();
        }    
    })

    // affichage des informations du produit récupéré
    .then((infoProduct) => {      
        //récupération dans le tableau les infos retournées par l'API
        tabInfoProduit = infoProduct;
        // console.log(tabInfoProduit);

        // Affichage du prodiut choisi
        const divImage = document.querySelector(".item__img");
        divImage.innerHTML = `<img src=${tabInfoProduit.imageUrl} alt=${tabInfoProduit.description}>`;
        document.querySelector('#title').textContent = `${tabInfoProduit.name}`;
        document.querySelector('#price').textContent = `${tabInfoProduit.price}`;
        document.querySelector('#description').textContent = `${tabInfoProduit.description}`;

        const optionsCouleur = tabInfoProduit.colors.map((couleur) => {

            return `<option value="${couleur}">${couleur}</option>`;
        });

        let selectCouleur = document.querySelector('#colors');
        selectCouleur.innerHTML = '<option value="">--SVP, choisissez une couleur --</option>' + optionsCouleur.join("");
    })
    .catch((erreur) => {
        console.log(erreur);
        document.querySelector('.item').innerHTML = 'Erreur serveur :(';
    });
}
afficherProduit();

// function enregistrant le panier dans localStorage
function savePanier(panier){
    localStorage.setItem("produit", JSON.stringify(panier));
}

// function permettant de récupérer le panier
function getPanier(){
    let panier = localStorage.getItem("produit");
    if(panier === null) {
        return [];
    } else {
        return JSON.parse(panier);
    }
}

// function permettant d'ajouter un produit dans LocalStorage/panier
function ajoutProduit() {

   //Rajout des propriétés (clé: valeur) a l'objet éxistant(tabInfoProduit)
    const choixProduit = Object.assign({}, tabInfoProduit, {
        couleur: `${selectCouleur.value}`,
        quantite: `${selectQuantite.value}`
    });
   
    //Récuperation du panier (local Storage)    
    let articlesPanier = getPanier();

    // Propriétés du produit qu'on va envoyer dans Local Storage
    const choixProprietes = {
        _id : choixProduit._id,
        couleur : choixProduit.couleur,
        quantite : parseInt(choixProduit.quantite)
    }

    // Verification s'il y a des produits dans localStorage
    if (articlesPanier == null || articlesPanier.length == 0) {
        articlesPanier.push(choixProprietes);

      //Mise a jour de LocalStorage 
        savePanier(articlesPanier);
        console.log(articlesPanier);

    } else {          
        for (i = 0; i < articlesPanier.length; i++) {   
         //1 - on va comparer si le produit de LocalStorage est le même que le produit
         // récupéré depuis l'API et on verifie l'ID et la couleur
            if (articlesPanier[i]._id === tabInfoProduit._id &&
                articlesPanier[i].couleur === selectCouleur.value) {

                return (           
                    articlesPanier[i].quantite += parseInt(choixProprietes.quantite),                       
                   //Mise a jour de LocalStorage 
                    savePanier(articlesPanier),
                    //et on récupère le nouveau tableau mit a jour 
                    articlesPanier = getPanier()
                );
            }
        }
        
        //2- test si même produit (ID), mais d'une autre couleur ou un autre produit  
        for (i = 0; i < articlesPanier.length; i++) {

            if (articlesPanier[i]._id === tabInfoProduit._id &&
                articlesPanier[i].couleur != selectCouleur.value ||
                articlesPanier[i]._id != tabInfoProduit._id) {

                return (                  
                    //on va rajouter le nouveau produit, d'une autre couleur, dans la liste
                    articlesPanier.push(choixProprietes),                   
                    savePanier(articlesPanier),                
                    articlesPanier = getPanier()
                );
            }
        }
    }
    
  //retun le tableau contenant les produit choisis, stokés dans LocalStorage 
    return articlesPanier = getPanier(); 
}
 
// Récupération du bouton permettant d'ajouter le produit dans le panier
let btnAjout = document.querySelector("#addToCart");

btnAjout.addEventListener('click', () => {
    
    if( selectCouleur.value == "") {

        if(selectQuantite.value == 0 ){
            alert("Veuillez sélectionner la couleur et la quantité de votre produit !");
        } else {
            alert("Veuillez sélectionner la couleur de votre produit !");
        }
        
    } else {
        if(selectQuantite.value == 0 ){
            alert("Veuillez sélectionner la quantité !");
        } else {
            ajoutProduit(); 
        }
    } 
});
