let storedProduits = JSON.parse(localStorage.getItem('newArticle'));
console.log(storedProduits);    

if(storedProduits == null || storedProduits.length === 0){ 
    let panierVide = document.getElementById('produitPanier');
    
    panierVide.innerHTML +=`
    <div class="col-12 col-md-4 card">
        <div class="card-body">
            <p class="card-text">Votre panier est vide !</p>
        </div>
    </div>`;
} else {
    let i = 0;
    for (storedProduit of storedProduits) {
        let produitPanier = document.getElementById('produitPanier');
        
        produitPanier.innerHTML +=`
        <div class="col-12 col-md-4 card">
            <p class="card-text">${storedProduit.quantity + " " + storedProduit.produitName + " , " + storedProduit.produitColor}</p>
            <div class="card-body" id="${i++}">
                <p class="card-text">${storedProduit.produitPrice}€</p>
            </div>
        </div>`;
    };
};