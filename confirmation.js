let products = JSON.parse(localStorage.getItem('idProduit'));
console.log(products);

let totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
console.log(totalPrice);

document.getElementById('confirmation').innerHTML+= `
    <div class="row">	
		<div class="col">
		    <h2>Orinico vous remercis de votre commande !</h2>
		    <p>
			    Nous avons le plaisir de vous informer que votre commande à bien été enregistré !</br>
			    Vos meubles arriverons bientôt chez vous ! </br>
			    Vous trouverez ci-contre le récapitulatif de votre commande.
			</p>
		</div>
	    <div class="recapitulatif" class="col">
	        <h3>Récapitulatif de votre commande :</h3>
	        <p>
		        Numéro de commande : ${products}</br>
		        Montant total de votre commande : ${totalPrice} €
	        </p>       
	    </div>
    </div>`;

localStorage.clear();