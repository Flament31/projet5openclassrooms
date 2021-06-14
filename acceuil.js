makeRequest('GET', 'https://oc-p5-api.herokuapp.com/api/furniture')
.then(function (datums) {   
  console.log(datums.forEach((table) => {
    console.log(datums);

    let listeProduit = document.getElementById("listeProduit");

    listeProduit.innerHTML +=`
    <div class="col-12 col-md-4 card">
        <img src="${table.imageUrl}" class=”card-img-top” >
        <a href="produit.html?id=${table._id}" class="stretched-link"></a>
        <div class="card-body">
            <h2 class="card-title">${table.name}</h2>
            <p class="card-text" >${table.price / 100 + "€"}</p>
        </div>
    </div>  `;
  }));
})

.catch(function (err) {
  console.error('Augh, there was an error!', err.statusText);
});