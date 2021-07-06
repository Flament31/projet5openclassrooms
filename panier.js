let storedProduits = JSON.parse(localStorage.getItem('newArticle'));
console.log(storedProduits);

function deletElement(i){
    let pos = i;

    storedProduits.splice(pos, 1);
    console.log(storedProduits);

    localStorage.setItem('newArticle', JSON.stringify(storedProduits));
    JSON.parse(localStorage.getItem('newArticle'));

    window.location = "panier.html"; 
};

if(storedProduits == null || storedProduits.length === 0){
         
document.getElementById('produitPanier').innerHTML +=`
<div class="col-12 col-md-4 card">
    <div class="card-body">
        <p class="card-text">Votre panier est vide !</p>
    </div>
</div>`;

document.getElementById('main_panier').removeChild(document.getElementById('formulaire'));
document.getElementById('produitPanier').removeChild(document.getElementById('table_head'));

} else {
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

function VerifForm(){ 
    var AllIsOk=0;
 
    if(document.forms['contact_form'].elements['nom'].value==''){AllIsOk++;}
    if(document.forms['contact_form'].elements['prenom'].value==''){AllIsOk++;}
    if(document.forms['contact_form'].elements['ville'].value==''){AllIsOk++;}
    if(document.forms['contact_form'].elements['adresse'].value==''){AllIsOk++;}
    if(document.forms['contact_form'].elements['email'].value==''){AllIsOk++;}

    return (AllIsOk==0);
};

document.getElementById('valid').addEventListener("click", function (event, data){
    if (VerifForm()) {
        event.preventDefault();
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
        const storagePrice = localStorage.getItem('totalPrice');
        console.log(storagePrice);
 
        let products = [];
        for (storedProduit of storedProduits) {
            let productsId = storedProduit.produitId;
            products.push((productsId));
        };

        localStorage.setItem('idProduit', JSON.stringify(products));
        const storageId = localStorage.getItem('idProduit');
        console.log(products);
        
        var XHR = new XMLHttpRequest();
        var urlEncodedData = "";
        var urlEncodedDataPairs = [];
        var name;

        for(name in data) {
            urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        };

        urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

        XHR.addEventListener('load', function(event) {
            alert('Ouais ! Données envoyées et réponse chargée.');
        });

        XHR.addEventListener('error', function(event) {
            alert('Oups! Quelque chose s\'est mal passé.');
        });

        XHR.open('POST', 'https://oc-p5-api.herokuapp.com/api/furniture/');
        XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        XHR.send(urlEncodedData);
            
        window.location = "confirmation.html";
        localStorage.removeItem("newArticle");
    };
});


