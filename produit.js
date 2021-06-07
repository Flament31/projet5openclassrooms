new Promise(function (resolve, reject) {
});

function makeRequest (method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function() {
            if (this.status == 200) {
                var response = JSON.parse(this.responseText);
                resolve(response);
            } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };   
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
};

function color(colors){
    let html = '<option value="">Choisir la couleur</option>'
        for (i = 0; i < colors.length; i++){
            html+=`            
                <option value="${colors[i]}">${colors[i]}</option>`;
        };
    return html;
};

function produitHtml(produit){
        
        document.getElementById("produit").innerHTML +=`
        <div class="col-12 col-md-6 card">
            <img class=”card-img-top” src="${produit.imageUrl}">
            <div class="card-body">
                <h2 class="card-title">${produit.name}</h2>
                <p class="card-text">${produit.price / 100 + "€"}</p>
            </div>
        </div> 

        <div class="col-12 col-md-6 card">
            <div class="card-body">
                <p class="card-text">
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
        </div>`;
}; 

function pushProduit(produitColor, produit,){
    if (window.confirm(produit.name + " " + produitColor + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
        window.location.href = "panier.html";
    } else {
        window.location.href = "index.html";
    }
};

function choosen(produit, storedProduits, produitsChoosen){
    document.querySelector(".btn-primary").addEventListener("click", function (event) {
        event.preventDefault();

        if(storedProduits) {
            pushProduit(produit, produitsChoosen);
        } else {
            storedProduits = [];
            pushProduit(produit, produitsChoosen);
        } 
    });
};

makeRequest('GET', `https://oc-p5-api.herokuapp.com/api/furniture/${new URLSearchParams(window.location.search).get('id')}`)
.then(function (produit) {
   
    produitHtml(produit);

    let select = document.querySelector("select");
    let value = document.querySelector("option");
    let produitColor = select.value;
    let produitsChoosen = {
            produitName: produit.name,
            produitId: produit._id,
            produitColor: select.value,
            quantity: 1,
            produitPrice: produit.price / 100,
        };
    console.log(produitsChoosen);

    let storedProduits = JSON.parse(localStorage.getItem('newArticle'));
    storedProduits.push(produitsChoosen);
    localStorage.setItem('newArticle', JSON.stringify(storedProduits));
    console.log(storedProduits);

    choosen(produit, produitColor, produitsChoosen, storedProduits);
});


