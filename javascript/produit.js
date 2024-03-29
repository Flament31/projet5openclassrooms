//Création du choix de couleur//
function color(colors){
    let html = 0;
        for (i = 0; i < colors.length; i++){
            html+=`<option value="${colors[i]}">${colors[i]}</option>`;
        };    
    return html;   
};

//Ajout du code html//
function produitHtml(produit){        
    document.getElementById("produit").innerHTML +=`
    <div class="col-md-6 my-3">
        <div class="card">
            <img class=”card-img-top” src="${produit.imageUrl}">
            <div class="card-body">
                <h2 class="card-title">${produit.name}</h2>
                <p class="card-text font-weight-bold">${produit.price / 100 + "€"}</p>
            </div>
        </div>        
    </div> 

    <div class="col-md-6 my-3">
        <div class="card">
            <div class="card-body">
                <p class="card-text text-justify">
                    ${produit.description}
                </p>
                
                <div class="form-group">
                    <select id="selection" class="form-control">
                        ${color(produit.varnish)}
                    </select>
                </div>

                <button id="btn-pannier" type="button" class="btn btn-primary">
                    Ajouter au pannier
                </button>
            </div>     
        </div>                  
    </div>`;
};

//Ajout du produit au panier//
function pushProduit(produit, produitsChoosen, produitColor, storedProduits){
    storedProduits.push(produitsChoosen);
    localStorage.setItem('newArticle', JSON.stringify(storedProduits));
    console.log(storedProduits);
    if (window.confirm(produit.name + " " + produitColor + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
        window.location.href = "panier.html";
    } else {
        window.location.href = "index.html";
    }
};

//Création d'un objet contenant les différentes informations du produit choisi et ajout de celui-ci au localStorage 
//et application de la fonction précédente//
function choosen(produit){
    let select = document.querySelector("select");
    let value = document.querySelector("option");

    document.querySelector(".btn-primary").addEventListener("click", function (event) {
        event.preventDefault();
        
        let produitsChoosen = {
                produitName: produit.name,
                produitId: produit._id,
                produitColor: select.value,
                quantity: 1,
                produitPrice: produit.price / 100,
                imageUrl: produit.imageUrl
            };
            console.log(produitsChoosen);

        const produitColor = select.value;

        let storedProduits = JSON.parse(localStorage.getItem('newArticle'));

        if(storedProduits){
            pushProduit(produit, produitsChoosen, produitColor, storedProduits);
        } else{            
            storedProduits = [];
           pushProduit(produit, produitsChoosen, produitColor, storedProduits); 
        }                     
    });
};

//Récupération des données du produit selectionné par son id et application des dernières fontions ci-dessus//
makeRequest('GET', `https://oc-p5-api.herokuapp.com/api/furniture/${new URLSearchParams(window.location.search).get('id')}`)
.then(function (produit) {   
    produitHtml(produit);
    choosen(produit);
});


