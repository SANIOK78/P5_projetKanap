
// récupération de l'ID depuis le URL
const urlParams = new URLSearchParams(window.location.search);
const paramID = urlParams.get("id");
// console.log(paramID);

let tabInfoProduit = [];

// appel API pour récupérer les donnes du produit choisi 
function afficherProduit(){
    fetch(`http://localhost:3000/api/products/${paramID}`)
    .then((reponse) => {
        return reponse.json();
    })

    // affichage des informations du produit récupéré
    .then((infoProduct)=> { 
        
      //récupération dans le tableau les infos retournés par l'API
        tabInfoProduit = infoProduct;      

        let divImage = document.querySelector(".item__img");
        divImage.innerHTML = `<img src="${tabInfoProduit.imageUrl}" alt="${tabInfoProduit.description}">`;
        document.querySelector('#title').textContent = `${tabInfoProduit.name}`;
        document.querySelector('#price').textContent = `${tabInfoProduit.price}`;
        document.querySelector('#description').textContent = `${tabInfoProduit.description}`;
        
        // console.log(tabInfoProduit.colors);

        let optionsCouleur = tabInfoProduit.colors.map((couleur) => {
            // console.log(couleur);
            return `<option value="${couleur}">${couleur}</option>`;   
        })
        
        let selectCouleur = document.querySelector('#colors');

        selectCouleur.innerHTML = '<option value="">--SVP, choisissez une couleur --</option>' + optionsCouleur.join("");
    })
    .catch((erreur) => {
        console.log(erreur);
        document.querySelector('.item').innerHTML = 'Erreur serveur :(';       
    });
}
afficherProduit();

// function permettant d'ajouter un produit das LocalStorage/panier
function ajoutProduit() {

    let btnAjout = document.querySelector("#addToCart");

    btnAjout.addEventListener('click', () => {

     //récupération de la couleur du produit choisi
        let selectCouleur = document.querySelector('#colors');
        let selectQuantite = document.querySelector('#quantity');
        // console.log(selectCouleur);

      //variable qui va récupérer le contenu du 'localStorage' 
        let tabProduitsChoisis = JSON.parse(localStorage.getItem("produit"));

     //Rajout des propriétés (clé: valeur) a l'objet éxistant(tabInfoProduit)
        const choixProduit = Object.assign({}, tabInfoProduit, {
            couleur: `${selectCouleur.value}`,
            quantite: `${selectQuantite.value}`
        });
        // console.log(choixProduit);

        if(tabProduitsChoisis === null){
            tabProduitsChoisis = []; 
            tabProduitsChoisis.push(choixProduit);
            
         //stockage en local du nouveau tableau (avec 2 valeurs en plus)
            localStorage.setItem("produit", JSON.stringify(tabProduitsChoisis));
            console.log(tabProduitsChoisis); 
        
        } else if (tabProduitsChoisis != null) {                //s'il y a des produits
            for( i = 0; i < tabProduitsChoisis.length; i++){   //on parcours le tableau
                console.log("test");
              //1 - on va comparer si le produit de LocalStorage est le même que le produit
              // récupéré depuis l'API et on verifie l'ID et la couleur
                if(tabProduitsChoisis[i]._id === tabInfoProduit._id && 
                    tabProduitsChoisis[i].couleur === selectCouleur.value ) {                   
                               
                    return(
                     //on increment la quantité, vu que c'est le même produit
                        tabProduitsChoisis[i].quantite++,  
                        console.log("quantite ++"),
                      // on va rajouter la modification dans LocalStorage
                        localStorage.setItem("produit", JSON.stringify(tabProduitsChoisis)),
                      //et on récupère le nouveau tableau mis a jour 
                        tabProduitsChoisis = JSON.parse(localStorage.getItem("produit"))
                    );
                } 
            }

          //2- on va verifier si c'est le même produit, mais d'une autre couleur ou un autre produit  
            for( i = 0; i < tabProduitsChoisis.length; i++){ 
                
                if(tabProduitsChoisis[i]._id === tabInfoProduit._id &&         
                    tabProduitsChoisis[i].couleur != selectCouleur.value ||
                    tabProduitsChoisis[i]._id != tabInfoProduit._id) {                  
                
                    return (
                        console.log("nouveau"),
                      //on va rajouter le nouveau produit, d'une autre couleur, dans la liste
                        tabProduitsChoisis.push(choixProduit),
                      //et on va mettre a jour le Local Storage 
                        localStorage.setItem("produit", JSON.stringify(tabProduitsChoisis)),
                      //et on récupère le nouveau tableau mis a jour 
                        tabProduitsChoisis = JSON.parse(localStorage.getItem("produit"))
                    );
                }        
            }
        } 
    });
  //retun le tableau contenant les produit choisis, stokés dans LocalStorage 
    return (tabProduitsChoisis = JSON.parse(localStorage.getItem("produit")));
}
console.log(ajoutProduit());   