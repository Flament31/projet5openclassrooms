let storedProduits = JSON.parse(localStorage.getItem('newArticle'));
console.log(storedProduits);


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
        document.getElementById('produitPanier').innerHTML +=`
        <tbody id="${i++}" class="produit_detaille">
            <tr>
                <td>${storedProduit.produitName}</td>
                <td>${storedProduit.produitColor}</td>
                <td>${storedProduit.produitPrice}€</td>
                <td><button class="btn-danger garbage_button" type="button">Supprimer</button></td>
            </tr>           
        </tbody>`;
               
    };   
};

let garbageButton = document.getElementsByClassName('garbage_button');
for (let i = 0 ; i < garbageButton.length; i++) {       
    garbageButton[i].addEventListener('click' , function (event) { 
        event.preventDefault();
        let id = this.closest('.produit_detaille');

        storedProduits.splice(id, 1);
        console.log(storedProduits);

        localStorage.setItem('newArticle', JSON.stringify(storedProduits));
        JSON.parse(localStorage.getItem('newArticle'));

        alert('Cet article a bien été supprimé !');
        window.location.href = "panier.html";   
    });      
};

function isValid(value) {
    return /^[A-Z-a-z\s]{3,40}$/.test(value);
};

// création fonctions de validité adresse
function validAddress(value) {
    return /^[A-Z-a-z-0-9\s]{5,80}$/.test(value)
};

// création fonctions de validité mail
function validMail(value){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
};

document.getElementById('formulaire').innerHTML +=`
    <form class="form-group" class="contact_form">
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

let firstName = document.getElementById('prenom');

firstName.addEventListener("change", function(event) {
    if (isValid(firstName.value)) {
    } else {
        alert( "Aucun chiffre ou symbole n'est autorisé.")
        event.preventDefault()
    }
});

let lastName = document.getElementById('nom');

lastName.addEventListener("change", function (event) {
    if (isValid(lastName.value)) {
    } else {
        alert("Aucun chiffre ou symbole n'est autorisé.")
        event.preventDefault()
    }
});

let address = document.getElementById('adresse');

address.addEventListener("change", function (event) {
    if (validAddress(address.value)){
    } else {
        event.preventDefault()
        alert("Aucun symbole n'est autorisé.");
    }
});

let city = document.getElementById('ville');

city.addEventListener("change", function (event) {
    if (isValid(city.value)) {
    } else {
        alert("Aucun chiffre ou symbole n'est autorisé.")
        event.preventDefault()
    }
});

let mail = document.getElementById('email');

mail.addEventListener("change", function (event) {
    if (validMail(mail.value)){
    } else {
        event.preventDefault()
        alert("Veuillez saisir une adresse mail valide (exemple : abcd@mail.com).");
    }
});

document.getElementById('submit').addEventListener("click", function (event) {
    if(isValid(firstName.value) && isValid(lastName.value) && validAddress(address.value) && isValid(city.value) && validMail(mail.value)){
        event.preventDefault();

        // envoie du prix total au localStorage
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
        const storagePrice = localStorage.getItem('totalPrice');
        console.log(storagePrice);

        //Création de l'objet "contact"
        let contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: mail.value,
        }
        console.log(contact);

        // création du tableau products 
        let products = [];
        for (storedProduit of storedProduits) {
            let productsId = storedProduit.produitId;
            products.push((productsId));
        }
        console.log(products);

        // création d'un objet regroupant contact et produits
        let send = {
            contact,
            products,
        }
        console.log(send);

        localStorage.setItem('idProduit', JSON.stringify(products));
        const storageId = localStorage.getItem('idProduit');
        console.log(products);

        window.location = "confirmation.html";
        localStorage.removeItem("newArticle");
    };
});