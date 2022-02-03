/* Récupération de ID des articles */
const str = window.location.href;
var url = new URL(str);
const id = url.searchParams.get("id");

/* Récupération des données des articles */
const urlProduct = fetch (`http://localhost:3000/api/products/${id}`);

urlProduct
    .then((response) => response.json())
    .then ((itemsData)=> {
    const picture = document.querySelector(".item__img");
    const itemsPicture = document.createElement("img");
    itemsPicture.src = itemsData.imageUrl;
    itemsPicture.alt = itemsData.altTxt;
    picture.appendChild(itemsPicture);

    const itemsTitle = document.querySelector("#title");
    itemsTitle.innerText = itemsData.name;

    const itemsPrice = document.querySelector("#price");
    itemsPrice.innerText = itemsData.price;

    const itemsDescription = document.querySelector ("#description")
    itemsDescription.innerText = itemsData.description;

    const itemsColors = document.querySelector("#colors");
    for (i = 0; i < itemsData.colors.length; i++) {      
      let itemsColorsChoice = document.createElement("option");
      itemsColorsChoice.setAttribute("value", itemsData.colors[i]); 
      itemsColorsChoice.innerText = itemsData.colors[i]; 
      itemsColors.appendChild(itemsColorsChoice); 
    }

/*****  Ajouts des produits au panier *****/

    // Récupération des données sélectionnées par l'utilisateur //

    const addToCart = document.querySelector("#addToCart");
    addToCart.addEventListener("click", function () {

        let itemsOptions = {
            idChoice: itemsData._id,
            colorsChoice: document.querySelector("#colors").value,
            quantiteChoice: document.querySelector("#quantity").value,
            };
            console.log(itemsOptions);

    // Alerte sur les manquants (couleurs + quantités) //    
        let itemsLocalStorage = [];

        if (itemsOptions.colorsChoice <1) {
            alert ("Veuillez choisir une couleur."); 
        }
            else {
                if (itemsOptions.quantiteChoice <1) {
                    alert ("Veuillez choisir une quantité entre 1 et 100."); 
                }
                    else {
                        if (itemsOptions.quantiteChoice >100) {
                            alert ("Veuillez choisir une quantité enntre 1 et 100."); 
                        }
                            else {
                            if (localStorage.getItem("itemsProduct")) {
                                itemsLocalStorage = JSON.parse(localStorage.getItem("itemsProduct")
                                );

                                const itemsCart = itemsLocalStorage.filter((product) =>
                                    product.colorsChoice === itemsOptions.colorsChoice && product.idChoice === itemsOptions.idChoice 
                                );

                                if (itemsCart.length) {
                                    const itemsTotal = parseInt(itemsOptions.quantiteChoice + itemsCart[0].quantiteChoice);
                                    alert("Ce produit est déjà dans votre panier, la quantité est maintenant de " + itemsTotal);
                      
                                      const itemsPresentCart  = itemsLocalStorage.indexOf(itemsCart[0] );
                      
                                      itemsLocalStorage[itemsPresentCart].quantiteChoice = itemsTotal;
                                    } else {
                                        itemsLocalStorage.push(itemsOptions);
                                    }
                                    localStorage.setItem("itemsProduct",JSON.stringify(itemsLocalStorage));
                                  } else {
                                    itemsLocalStorage.push(itemsOptions); // On envoie les elements voulu dans le localStorage
                                    localStorage.setItem("itemsProduct",JSON.stringify(itemsLocalStorage)); 
                                  }
                                  alert("Votre produit est ajouté au panier.");
                                  
                                }
                              }
                            }
                          });
                        });