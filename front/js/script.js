// appel de l'API

function getProducts() {
   fetch("http://localhost:3000/api/products")

  //récupération des données en json
    .then((reponse) => {
        if(reponse.ok){
            return reponse.json();
        }    
    })

   //affichage des données récupérés
    .then((infoProduits) => {
        // console.log(infoProduits);

        const html = infoProduits.map((product) => {
            
            // injection de l'ID du produit dans la URL => product.html?id=${product._id}
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
        document.querySelector('#items').innerHTML = "Erreur serveur :( ";
    })
}
getProducts();