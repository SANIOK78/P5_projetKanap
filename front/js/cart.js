// Récuperation des donées dans localStorage
let panier = JSON.parse(localStorage.getItem("produit"));

// console.log(panier);

function afficherPanier() {

    if(panier){       
        console.log(panier); 

     //variable stockant les modifications du tableau de localStorage
        let produitPanier = document.querySelector("#cart__items");
        let nbProduit = 0;
        let totalPrix = 0;

        produitPanier.innerHTML = panier.map((product) => {
            nbProduit = nbProduit + parseInt(product.quantite);
            totalPrix = totalPrix + (parseInt(product.quantite) * parseInt(product.price));

            return `<article class="cart__item" data-id="${product._id}" data-color="${product.colors}">
                <div class="cart__item__img">
                    <img src="${product.imageUrl}" alt="${product.description}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${product.name}</h2>
                        <p>${product.couleur}</p>
                        <p>Prix : ${product.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantite}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>   
            </article>`  
                    
        }).join("");

        document.querySelector("#totalQuantity").innerHTML = nbProduit;
        document.querySelector("#totalPrice").innerHTML = totalPrix;              
    }  
}
afficherPanier();


// fonction permettant de modifier dynamiquement un produit directement dans le Panier
function modifierQuantite() {
    const inputs = document.querySelectorAll("input[name='itemQuantity']");
       
    inputs.forEach((input, index) => {
       
        input.addEventListener("change", function(event) {     
               
            panier[index].quantite = event.target.value;
            localStorage.setItem("produit", JSON.stringify(panier));
           
            // console.log(index); 
            afficherPanier(); 
            modifierQuantite();                                     
        });  
    });     
}
modifierQuantite();

// fonction permetant la suppression d'un produit
function suppressionProduit(meuble) {
    let supprimProdiut = document.querySelectorAll(".deleteItem");
    // console.log(supprimProdiut);
    console.log(panier.length);

    supprimProdiut.forEach((input, index) => {

        input.addEventListener("click", () => {
            // console.log(input)
            confirm("Voulez-vous vraiment supprimer ce produit ?"),
            panier.splice(index, 1);            
            localStorage.setItem("produit", JSON.stringify(panier));            
            afficherPanier();
            document.location.reload(); 
            // console.log(panier);                          
        });                
    }); 

    if(panier.length === 0 ) {
        // console.log("Panier vide")
        return (
            localStorage.clear(),
            document.querySelector("h1").textContent = "Votre panier est vide !"
        )              
    }         
} 
suppressionProduit();