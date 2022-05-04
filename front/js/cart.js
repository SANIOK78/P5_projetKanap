// Récuperation des donées dans localStorage
let panier = JSON.parse(localStorage.getItem("produit"));

// console.log(panier);

// ********** Gestion du panier ************

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
// afficherPanier();

// fonction permettant de modifier dynamiquement un produit directement dans le Panier
function modifierQuantite() {
    const inputs = document.querySelectorAll("input[name='itemQuantity']");
       
    inputs.forEach((input, index) => {
       
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
    // console.log(supprimProdiut);
    // console.log(panier);

    supprimProdiut.forEach((input, index) => {

        input.addEventListener("click", () => {
            console.log(input)
            confirm("Voulez-vous vraiment supprimer ce produit ?"),
            panier.splice(index, 1);   

            localStorage.setItem("produit", JSON.stringify(panier));            
            initPanier();
            // document.location.reload(); 
            // console.log(panier);                          
        });                
    }); 

    if(panier === null || panier.length === 0 ) {
        // console.log("Panier vide")       
        localStorage.removeItem("produit");
        document.querySelector("h1").textContent = "Votre panier est vide !"
                    
    }       
} 

// fonction permetant d'initier le panier
function initPanier() {
    afficherPanier();
    modifierQuantite();
    suppressionProduit();
}
initPanier();

// ---------- FIN Gestion du panier ----------

// *********** Gestion Validation du formulaire *********
let prenom = document.querySelector("#firstName");
let nom = document.querySelector("#lastName");
let adresse = document.querySelector("#address");
let ville = document.querySelector("#city");
let email = document.querySelector("#email");
// let formSubmit = document.querySelector("#order");


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
    prenom.addEventListener('change', () => {

        //tester si la valeur de 'prenom' contient que des lettres, 
        // la taille de 3 - 20 caractères, pas des chiffres et syboles speciaux
        if(verifNomPrenomVille(prenom.value)){
            // console.log('ok');
            return true;            
        } else {
            let prenomResultat = document.querySelector("#firstNameErrorMsg");
            prenomResultat.innerHTML = "Chiffre et symbole non autorisé, entre 3 - 20 lettres";
            return false;
        }
    });

    // validation champ 'nom'
    nom.addEventListener('change', () => {

        if(verifNomPrenomVille(nom.value)){
            // console.log('ok');  
            return true;             
        } else {
            let nomResultat = document.querySelector("#lastNameErrorMsg");
            nomResultat.innerHTML = "Chiffre et symbole non autorisé, entre 3 - 20 lettres";
            return false;
        }
    });

    // validation champ 'adresse'
    adresse.addEventListener("change", () => {
        let adresseResultat = document.querySelector("#addressErrorMsg");

        if(verifAdresse(adresse.value)){
            // console.log('ok'); 
            return true;
        } else {           
            adresseResultat.innerHTML = "L'adresse doit contenir que des lettres et des chiffres, sans ponctuation";
            console.log('pas bonne'); 
            return false;      
        }
    });

    // validation champ 'ville'
    ville.addEventListener('change', () => {

        if(verifNomPrenomVille(ville.value)){
            // console.log('ok');
            return true;               
        } else {
            let villeResultat = document.querySelector("#cityErrorMsg");
           villeResultat.innerHTML = "Chiffre et symbole non autorisé, entre 3 - 20 lettres";
            return false;
        }
    });

    // validation champ 'email'
    email.addEventListener("change", () => {
        if(verifMail(email.value)){
            // console.log('ok'); 
            return true;              
        } else {
            let mailResultat = document.querySelector("#emailErrorMsg");
            mailResultat.innerHTML = "Email format non valide";
            return false;
        } 
    })
}
formVerify();

// --------- fin Gestion Validation du formulaire -----------

// *********** Soumition du formulaire ***********
let formSubmit = document.querySelector("#order");

formSubmit.addEventListener('click', () =>{

  //Création d'un objet a partir des valeurs du formulaire
    let valeursForm = {
        prenom : document.querySelector("#firstName").value,
        nom : document.querySelector("#lastName").value,
        adresse : document.querySelector("#address").value,
        ville : document.querySelector("#city").value,
        email : document.querySelector("#email").value
    }
    // console.log(valeursForm);
 
  //Mettre l'objet "valeurForm" dans local Storage
    localStorage.setItem('valeursForm', JSON.stringify(valeursForm));
    
  // Mettre les produits séléctionnés et les valeur du formulaire dans un objet à
  //envoyer vers le serveur
    const contact = {
        panier,
        valeursForm
    }
    console.log(contact);
});

//  ---------------- FIN Soumition du formulaire ----------------
 
// *********** Mettre le contenu du Local Storage dans les champs du formulaire ********
// Récupérer la clé de LocalStorage dans une variable

const dataLocalStorage = JSON.parse(localStorage.getItem("valeursForm"));
console.log(dataLocalStorage);

// Mettre les valeurs du localStorage dans les champs du formulaire
document.querySelector("#firstName").setAttribute('value', dataLocalStorage.prenom);
document.querySelector("#lastName").setAttribute('value', dataLocalStorage.nom);
document.querySelector("#address").value = dataLocalStorage.adresse;
document.querySelector("#city").value = dataLocalStorage.ville;
document.querySelector("#email").value = dataLocalStorage.email;