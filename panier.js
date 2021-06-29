let storedProduits = JSON.parse(localStorage.getItem('newArticle'));
console.log(storedProduits);

function deletElement(){
    for (let i = 0 ; i < document.getElementsByClassName('garbage_button').length; i++) {        
        let id = document.getElementById('produit_detaille');

        storedProduits.splice(id, 1);
        console.log(storedProduits);

        localStorage.setItem('newArticle', JSON.stringify(storedProduits));
        JSON.parse(localStorage.getItem('newArticle'));   
    };      
};


if(storedProduits == null || storedProduits.length === 0){
         
document.getElementById('produitPanier').innerHTML +=`
<div class="col-12 col-md-4 card">
    <div class="card-body">
        <p class="card-text">Votre panier est vide !</p>
    </div>
</div>`;
} else {
    let i = 0;
    for (storedProduit of storedProduits) {                
        document.getElementById('element_tableau').innerHTML +=`
        <tr>
            <td>${storedProduit.produitName}</td>
            <td>${storedProduit.produitColor}</td>
            <td>${storedProduit.produitPrice}€</td>
            <td class="garbage_button"><button  class="btn-danger"  id="produit_detaille" id="${i++}" type="button" onclick="deletElement()">Supprimer</button></td>            
        </tr>`;              
    };
};

function validMail(value){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
};

document.getElementById('formulaire').innerHTML +=`
    <form id="contact_form" class="form-group">
        <h3>Pour valider votre commande merci de bien vouloir remplir le formulaire ci-dessous :</h3>
        <div class="div_name">
            <label for="prénom">Prénom</label> : <input type="text" name="prénom" id="prenom" required="true">           
        </div>
        <div class="div_name">
            <label for="nom">Nom</label> : <input type="text" name="Nom" id="nom" required="true">            
        </div>
        <div class="div_name">
            <label for="adresse">Adresse</label> : 
            <textarea type="text" name="adresse" id="adresse" required="true"></textarea>
        </div>
        <div class="div_name">
            <label for="ville">Ville</label> : <input type="text" name="ville" id="ville" required="true">
        </div>
        <div class="div_name">
            <label for="email">email</label> : <input type="email" name="email" id="email" required="true">
        </div>
        <div class="div_name">
            <button id="submit" type="submit" name="add" id="valid" class="btn-secondary" >Valider votre commande</button>
        </div>
    </form>`;

let calculPrice = []
for (storedProduit of storedProduits) {
    let article = storedProduit.produitPrice;
    calculPrice.push(article);
};
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = calculPrice.reduce(reducer, 0);
console.log(totalPrice);

document.getElementById('produitPanier').innerHTML +=`
<div class="col-12 col-md-4 card" class="total">
    <p class="card-text">${"Montant total = " + totalPrice + " €"}</p>
</div>`

let mail = document.getElementById('email');

mail.addEventListener("change", function (event) {
    if (validMail(mail.value), div_name = true){
    } else {
        event.preventDefault()
        alert("Veuillez saisir une adresse mail valide (exemple : abcd@mail.com).");
    }
});

window.addEventListener("click", function (event) {
    if(validMail(mail.value)){
        event.preventDefault();

        localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
        const storagePrice = localStorage.getItem('totalPrice');
        console.log(storagePrice);
 
        let products = [];
        for (storedProduit of storedProduits) {
            let productsId = storedProduit.produitId;
            products.push((productsId));
        }
        console.log(products);

        localStorage.setItem('idProduit', JSON.stringify(products));
        const storageId = localStorage.getItem('idProduit');
        console.log(products);
        
        var XHR = new XMLHttpRequest();
        var FD = new FormData(form);

        XHR.addEventListener("click", function(event) {
            alert(event.target.responseText);
        });

        XHR.addEventListener("error", function(event) {
            alert('Oups! Quelque chose s\'est mal passé.');
        });

        XHR.open("POST", "https://oc-p5-api.herokuapp.com/api/furniture");
        XHR.send(FD);

        var form = document.getElementById("contact_form");

        form.addEventListener("submit", function (event) {
            event.preventDefault();
        });
            
        window.location = "confirmation.html";
        localStorage.removeItem("newArticle");
    };
});


