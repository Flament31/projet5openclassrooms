let storedProduits = JSON.parse(localStorage.getItem('newArticle'));
console.log(storedProduits);

function deletElement(i){    
    storedProduits.splice(i, 1);
    console.log(storedProduits);

    localStorage.setItem('newArticle', JSON.stringify(storedProduits));
    JSON.parse(localStorage.getItem('newArticle')); 

    window.location = "confirmation.html";    
};

function panierPlein(){
    let i = 0;   
    for (storedProduit of storedProduits) {                
        document.getElementById('element_tableau').innerHTML +=`
        <tr>
            <td>${storedProduit.produitName}</td>
            <td>${storedProduit.produitColor}</td>
            <td>${storedProduit.produitPrice}€</td>
            <td><button class="btn-danger" type="button" onclick="deletElement(${i++})">Supprimer</button></td>            
        </tr>`;              
    };
};

function prixTotal(totalPrice) {
    document.getElementById('element_tableau').innerHTML +=`
    <tr>
        <th>Montant total =</th>
        <td></td>
        <th>${totalPrice + "€"}</th>
        <td></td>
    </tr>`;
};

function apiSend(order){
    const req = new Request('https://oc-p5-api.herokuapp.com/api/furniture/order', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(order)
    });

    fetch(req)
    .then(response => {
        if (response.status === 201) {           
        return response.json();
        } else {
            throw new Error('Something went wrong on api server!');
        }
    })
    
    .then(response => {
        console.debug(response);
        localStorage.setItem("responseOrder", response.orderId);
        window.location = "confirmation.html";
        localStorage.removeItem("newArticle");   
    }).catch(error => {
        console.error(error);
    });   
};

function sendFormulaire(orderId){
    document.getElementById('contact_form').addEventListener("submit", function (event){    
        event.preventDefault();

        let contact = {
            firstName: document.getElementById('nom').value,
            lastName: document.getElementById('prenom').value,
            address: document.getElementById('adresse').value,
            city: document.getElementById('ville').value,
            email: document.getElementById('email').value,
        };

        let products = [];
        for (storedProduit of storedProduits){
            let furniture = storedProduit.produitId;
            products.push(furniture)
        };

        let order = {contact, products};
        console.log(order);
       
        apiSend(order);      
    });
};

if(storedProduits == null || storedProduits.length === 0){         
    document.getElementById('main_panier').innerHTML +=`
    <div class="col-12 col-md-4 card">
        <div class="card-body">
            <p class="card-text">Votre panier est vide !</p>
        </div>
    </div>`;

    document.getElementById('main_panier').removeChild(document.getElementById('formulaire'));
    document.getElementById('produitPanier').removeChild(document.getElementById('table_head'));
} else {
    panierPlein();

    let totalPrice = 0;
    for (storedProduit of storedProduits) {
        totalPrice += storedProduit.produitPrice;
        console.log(totalPrice);
    };

    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    const storagePrice = localStorage.getItem('totalPrice');
    console.log(storagePrice);

    prixTotal(totalPrice);
    sendFormulaire();
};






