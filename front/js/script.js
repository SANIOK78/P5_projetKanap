// function permettant d'afficher les produits

function getProducts() {
    // requête HTTP type GET a l'@ du service web ou s'execute l'API
   fetch("http://localhost:3000/api/products")

  //récupération des données au format json
    .then((reponse) => {
        if(reponse.ok){
            return reponse.json();
        }    
    })

   //affichage des données récupérés
    .then((infoProduits) => {
        console.log(infoProduits);

        const html = infoProduits.map((product) => {
            
            // injection de l'ID du produit dans l'URL 
            return `<a href="./product.html?id=${product._id}"> 
                        <article>
                            <img src="${product.imageUrl}" alt="${product.altTxt}">
                            <h3 class="productName">${product.name}</h3>
                            <p class="productDescription">${product.description}</p> 
                            <p class="prix">${product.price} €</p>         
                        </article>
                    </a>`
        })
        // console.log(html);
        document.querySelector('#items').innerHTML = html.join("");
    })
    .catch((erreur) => {
        console.log(erreur);
        document.querySelector('#items').textContent = "Erreur serveur :( ";
    })
}
getProducts();