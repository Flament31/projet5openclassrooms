//Affichage des produits
makeRequest('GET', 'https://oc-p5-api.herokuapp.com/api/furniture')
.then(function (datums) {   
datums.forEach((produit) => {
    console.log(datums);

    let listeProduit = document.getElementById("listeProduit");

    listeProduit.innerHTML +=`
    <div class="col-5 mt-3">
        <div class="card shadow">
            <img src="${produit.imageUrl}" class=”card-img-top” >
            <a href="produit.html?id=${produit._id}" class="stretched-link"></a>
            <div class="card-body">
                <h2 class="card-title">${produit.name}</h2>
                <p class="card-text" >${produit.price / 100 + "€"}</p>
            </div>
        </div>       
    </div>  `;
  });
})

.catch(function (err) {
  console.error('Augh, there was an error!', err.statusText);
});