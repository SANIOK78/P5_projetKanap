// Récuperation des donées dans localStorage
let panier = JSON.parse(localStorage.getItem("produit"));

console.log(panier);

// ********** Gestion du panier ************
let totalQuantity = document.querySelector("#totalQuantity");
let totalPrice = document.querySelector("#totalPrice");
let produitPanier = document.querySelector("#cart__items");

function afficherPanier() {

    if(panier){       
        //Déclaration des variables permettant de mettre a jour la quantité et le prix total   
        let nbProduit = 0;
        let totalPrix = 0;

        const html = panier.map(product => {
            
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
                                    <p class="deleteItem">Supprimer<p>
                                </div>
                            </div>
                        </div>   
                    </article>`  
                    
        });
        produitPanier.innerHTML = html.join("");
        totalQuantity.textContent = nbProduit;
        totalPrice.textContent = totalPrix;              
    } 
}
// afficherPanier();

// fonction permettant de modifier dynamiquement un produit directement dans le Panier
function modifierQuantite() {
    const quantites = document.querySelectorAll("input[name='itemQuantity']");
    console.log(quantites);

    quantites.forEach((input, index) => {
       
        input.addEventListener("change", function(event) { 

            panier[index].quantite = event.target.value;
            localStorage.setItem("produit", JSON.stringify(panier));
           
            initPanier();                              
        });  
    });     
}

// fonction permetant la suppression d'un produit
function suppressionProduit() {
    let supprimProdiut = document.querySelectorAll(".deleteItem");
    // console.log(panier);
    console.log(supprimProdiut);

    supprimProdiut.forEach((input, index) => {

        input.addEventListener("click", () => { 
            panier.splice(index, 1); 

            if(panier.length != 0) {                
                localStorage.setItem("produit", JSON.stringify(panier));            
                initPanier(); 
            } else {
                localStorage.removeItem("produit");
                initPanier(); 
                document.querySelector("h1").innerHTML = "Votre panier est vide !"
            }                                                                                          
        });                
    });     
} 

// fonction permetant de mettre a jour le panier 
function initPanier() {
    afficherPanier();
    modifierQuantite();
    suppressionProduit();
}
initPanier();

// ---------- FIN Gestion du panier ----------

// *********** Gestion Validation du formulaire *********

let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let address = document.querySelector("#address");
let city = document.querySelector("#city");
let email = document.querySelector("#email");


// function permettant verifier Prenom, Nom, Ville
function verifNomPrenomVille(valeur) {
    return /^[A-Za-z-\s]{3,30}$/.test(valeur);
};

// function permettant verifier l'email
function verifMail(mail){
    return /^[a-z0-9._-]+[@]{1}[a-z0-9._-]+[.]{1}[a-z]{2,4}$/.test(mail);
};

// function permettant verifier l'addresse
function verifAdresse(adresse) {
    return /^[A-Za-z0-9-\s]{5,50}$/.test(adresse);
};

function formVerify(){
    // validation champ 'prenom'
    firstName.addEventListener('change', () => {
        const prenomResultat = document.querySelector("#firstNameErrorMsg");
        //tester si la valeur de 'prenom' contient que des lettres, 
        // la taille de 3 - 20 caractères, pas des chiffres et syboles speciaux
        if(verifNomPrenomVille(firstName.value)){
            prenomResultat.innerHTML = "";
            return true; 
        } else {            
            prenomResultat.innerHTML = "Chiffre et symbole non autorisé, entre 3 - 20 lettres";
            return false;
        }      
    });

    // validation champ 'nom'
    lastName.addEventListener('change', () => {
        const nomResultat = document.querySelector("#lastNameErrorMsg");
        if(verifNomPrenomVille(lastName.value)){
            nomResultat.innerHTML = "";  
            return true;             
        } else {            
            nomResultat.innerHTML = "Chiffre et symbole non autorisé, entre 3 - 20 lettres";
            return false;
        }
    });

    // validation champ 'adresse'
    address.addEventListener("change", () => {
        const adresseResultat = document.querySelector("#addressErrorMsg");

        if(verifAdresse(address.value)){
            adresseResultat.innerHTML = "";
            return true;
        } else {           
            adresseResultat.innerHTML = "L'adresse doit contenir que des lettres et des chiffres, sans ponctuation et caractères spéciaux";
            return false;      
        }
    });

    // validation champ 'ville'
    city.addEventListener('change', () => {
       const villeResultat = document.querySelector("#cityErrorMsg");

        if(verifNomPrenomVille(city.value)){
            villeResultat.innerHTML = "";
            return true;               
        } else {            
            villeResultat.innerHTML = "Chiffre et symbole non autorisé, entre 3 - 20 lettres";
            return false;
        }
    });

    // validation champ 'email'
    email.addEventListener("change", () => {
        const mailResultat = document.querySelector("#emailErrorMsg");

        if(verifMail(email.value)){
            mailResultat.innerHTML = "";
            return true;              
        } else {            
            mailResultat.innerHTML = "Email format non valide (ex: toto@mail.dev)";
            return false;
        } 
    });
}
formVerify();

// function permetant de verifier si le formulaire est rempli avant la soumission
function checkForm() {
  
    if(!verifNomPrenomVille(firstName.value) || 
        !verifNomPrenomVille(lastName.value) || 
        !verifNomPrenomVille(city.value)){

        return "Renseignez les champs: 'Prénom', 'Nom' et 'Ville' !";
    }
   
    if(!verifAdresse(address.value)){
        return  "Renseignez le champ 'Adresse' !";
    }

    if(!verifMail(email.value)){
        return "Renseignez le champ 'Email' ! ";
    } 

    return true;
}
// --------- fin Gestion Validation du formulaire -----------

// *********** VALIDATION DE LA COMMANDE ***********

// Création d'un tableau contenant que les 'id' des produits commandés
let produitsPanierId = [];

function creationCommandeId() {
    for(produit of panier){
        produitsPanierId.push(produit._id)
    }
    return produitsPanierId;
}

// Création d'un objet contenat les produits séléctionnés et les valeurs 
// du formulaire pour les envoyer au serveur
function infosVersServer() {
    let infosOrder = {
        //Création objet a partir des valeurs du formulaire
        contact : {
            firstName : firstName.value,
            lastName : lastName.value,
            address : address.value,
            city : city.value,
            email : email.value
        },
        products : produitsPanierId      
    } 
    return infosOrder;   
}

//*********  Soumission du formulaire ********* 
let formSubmit = document.querySelector("#order");

formSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    const listeProduitsId = creationCommandeId();
    const infosServer = infosVersServer();
    const formulaireValid = checkForm();
    console.log(listeProduitsId);
    console.log(infosServer);
    
 //Envoie des informatios à l'API 
    if(formulaireValid != true) {
        alert(formulaireValid);

    } else if(panier === null || panier.length === 0){
        alert("Vous ne pouvez pas passer une commande si votre panier est vide ! ");
        document.location.href = 'index.html';
    
    } else {
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify(infosServer),
            headers: {
                // "Accept" :  "application/json",
                "Content-Type": "application/json"
            },
        })  
        .then( response => {
            if(response.ok) {
                return response.json()
            }
        })
        // Reinitialiser localStorage et rediriger vers confirmation.html
        .then( data => {  
            document.location.href = `confirmation.html?orderId=${data.orderId}`;                                   
            localStorage.clear();                                                 
        })
        .catch( error => {
            console.log(error.message);
        })
    }  
});

//  ---------------- FIN Soumition du formulaire ----------------
 


