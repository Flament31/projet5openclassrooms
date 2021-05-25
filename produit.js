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
}

const urlApi = "https://oc-p5-api.herokuapp.com/api/furniture/";
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');
const urlApiId = urlApi + "/"+id;
console.log(id);

makeRequest('GET', 'https://oc-p5-api.herokuapp.com/api/furniture/5be9cc611c9d440000c1421e')
.then(function (datums) {
    let produit = datums;
    const getProduits = async function() {
        try {
            let response = await fetch('https://oc-p5-api.herokuapp.com/api/furniture/' + id);        
            if (response.ok) {
                let produit = await response.json();
                console.log(produit);

                let idProduit = document.getElementById("produit");            
                let colors = produit.varnish;
            

                idProduit.innerHTML +=`
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
                                <option value="">Choisir la couleur</option>
                                
                            </select>
                        </div>

                        <button id="btn-pannier" type="button" class="btn btn-primary">
                            Ajouter au pannier
                        </button>
                    </div>                
                </div>`;
                                                 
                let optionColor = document.querySelector("select");
                for (i = 0; i < colors.length; i++){
                    optionColor.innerHTML +=`
                        <option value="${colors[i]}">${colors[i]}</option>`;
                };
                 
             
                let select = document.querySelector("select");
                let value = document.querySelector("option");


                let addProduit = document.querySelector(".btn-primary");
                console.log(addProduit);       

                addProduit.addEventListener("click", function (event) {
                    event.preventDefault();

                    let produitsChoosen = {
                        produitproduitproduitName: produit.name,
                        produitproduitId: produit._id,
                        produitColor: select.value,
                        quantity: 1,
                        produitPrice: produit.price / 100,
                    };
                    console.log(produitsChoosen);

                    let storedProduits = JSON.parse(localStorage.getItem('newArticle'));
                    const produitColor = select.value;
                    if(storedProduits) {
                        storedProduits.push(produitsChoosen);
                        localStorage.setItem('newArticle', JSON.stringify(storedProduits));
                        console.log(storedProduits);
                        if (window.confirm(produit.name + " " + produitColor + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
                            window.location.href = "panier.html";
                        } else {
                            window.location.href = "index.html";
                        }
                    } 
                });
            } else {
                console.error('Retour du serveur : ', response.status);
                alert('Erreur rencontrée : ' + response.status);
            } 
        }
        catch (error) {
            alert("Erreur : " + error);
        }
    };
    getProduits();
});