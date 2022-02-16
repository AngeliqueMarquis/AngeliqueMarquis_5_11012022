/* Récupération des articles de l'API */

const Url = fetch ('http://localhost:3000/api/products');

Url
    .then((response) => response.json())
    .then((itemsData) => {
        const itemsInformation = document.createElement("section");
        itemsInformation .classList.add("items");
        itemsInformation .id = "items";
        const selectDivLimitedWidthBlock = document.querySelector("main .limitedWidthBlock");
        selectDivLimitedWidthBlock.appendChild(itemsInformation);

        for (eachItems of itemsData) { /* Chaque article du tableau */

        /* Creation des Balises */
        const itemsLink = document.createElement("a");
        itemsInformation.appendChild(itemsLink);
        itemsLink.href = `./product.html?id=${eachItems._id}`;

        const itemsArticle = document.createElement("article");
        itemsLink.appendChild(itemsArticle);

        const itemsPicture = document.createElement("img");
        itemsPicture.src = eachItems.imageUrl;
        itemsPicture.alt = eachItems.altTxt;
        itemsArticle.appendChild(itemsPicture);

        const itemsTitle = document.createElement("h3");
        itemsTitle.classList.add("productName");
        itemsArticle.appendChild(itemsTitle);
        itemsTitle.innerText = eachItems.name;

        const itemsDescription = document.createElement("p");
        itemsDescription.classList.add("productDescription");
        itemsArticle.appendChild(itemsDescription);
        itemsDescription.innerText = eachItems.description;
        }
    })

    .catch(function(error) {
        return error;
    });