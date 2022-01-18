/* Récupération de ID des articles */
const str = window.location.href;
var url = new URL(str);
const id = url.searchParams.get("id");
console.log(id);

/* Récupération des données des articles */
const urlProduct = fetch (`http://localhost:3000/api/products/${id}`);

urlProduct
    .then((response) => response.json())
    .then ((itemsData)=> {
    const picture = document.querySelector(".item__img");
    const itemsPicture = document.createElement("img");
    itemsPicture.src = itemsData.imageUrl;
    picture.appendChild(itemsPicture);

    
    
    });