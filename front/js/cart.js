/* Récupération du LocalStorage */
let recoveryCart = JSON.parse(localStorage.getItem("itemsProduct"));
console.log(recoveryCart);

/* Récupération des autres informations des articles et création des balises */
async function cart() {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then(function (itemsApi) {
      const itemsId = itemsApi.map((el) => el._id);

      for (let items of recoveryCart){
        let id = items["idChoice"];
        let indexId = itemsId.indexOf(id); /* Pour trouver l'occurence */
        let itemsPrice = itemsApi[indexId].price;
        let itemsColors = items["colorsChoice"];
        let itemsUrl = itemsApi[indexId].imageUrl;
        let itemsTxtAlt = itemsApi[indexId].altTxt;
        let itemsName = itemsApi[indexId].name;
        let itemsQuantity = items["quantiteChoice"];

        
/* Création des différentes balises */
        /* Création de l'article */
        const itemsCartArticle = document.createElement("article");
        const itemsCart = document.getElementById("cart__items")
        itemsCart.appendChild(itemsCartArticle);
        itemsCart.classList.add("cart__item");
        itemsCart.setAttribute("data-id", id);
        itemsCart.setAttribute("data-color", itemsColors);

        /* Création de l'image */
        const itemsCartPicture = document.createElement("div");
        const itemsPicture = itemsCart.appendChild(itemsCartPicture);
        itemsPicture.classList.add("cart__item__img");

        const picture = document.createElement("img");
        const pictureAttribut = itemsPicture.appendChild(picture);
        pictureAttribut.src = itemsUrl;
        pictureAttribut.alt = itemsTxtAlt;

        /* Création des détails de l'article */
        const itemsCartContentDiv = document.createElement("div");
        const itemsCartContent = itemsCart.appendChild(itemsCartContentDiv);
        itemsCartContent.classList.add("cart__item__content");

        /* Création de la description de l'article */
        const itemsCartContentDescriptionDiv = document.createElement("div");
        const itemsCartContentDescription = itemsPicture.nextElementSibling.appendChild(itemsCartContentDescriptionDiv);
        itemsCartContentDescription.classList.add("cart__item__content__description");

        const itemsCartContentDescriptionName = document.createElement("h2");
        const itemsCartContentDescriptionColor = document.createElement("p");
        const itemsCartContentDescriptionPrice = document.createElement("p");
        itemsCartContentDescription.appendChild(itemsCartContentDescriptionName).innerText = itemsName;
        itemsCartContentDescription.appendChild(itemsCartContentDescriptionColor).innerText = itemsColors;
        itemsCartContentDescription.appendChild(itemsCartContentDescriptionPrice).innerText = itemsPrice + " €";

        /* Création de la div permettant la modification */
        const itemsCartContentSettingsDiv = document.createElement("div");
        const itemsCartContentSettings = itemsCartContent.appendChild(itemsCartContentSettingsDiv);
        itemsCartContentSettings.classList.add("cart__item__content__settings");

        /* Création de la div permettant la modification des quantités */
        const itemsCartContentSettingsQuantityDiv = document.createElement("div");
        const itemsCartContentSettingsQuantity = itemsCartContentSettings.appendChild(itemsCartContentSettingsQuantityDiv);
        itemsCartContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");

        const itemsCartContentSettingsQuantityQtyDiv = document.createElement("div");
        const itemsCartContentSettingsQuantityQtyInput = document.createElement("input");
        itemsCartContentSettingsQuantity.appendChild(itemsCartContentSettingsQuantityQtyDiv).innerText = "Qté : ";
        const itemsChangeQuantity = itemsCartContentSettingsQuantity.appendChild(itemsCartContentSettingsQuantityQtyInput);
        itemsChangeQuantity.setAttribute("input", "number");
        itemsChangeQuantity.setAttribute("name", "itemQuantity");
        itemsChangeQuantity.setAttribute("min", 1);
        itemsChangeQuantity.setAttribute("max", 100);
        itemsChangeQuantity.setAttribute("value", itemsQuantity);
        itemsChangeQuantity.classList.add("itemQuantity");

        /* Création de la div permettant la suppression */
        const itemsCartContentSettingsDeleteDiv = document.createElement("div");
        const itemsCartContentSettingsDelete = itemsCartContentSettings.appendChild(itemsCartContentSettingsDeleteDiv);
        itemsCartContentSettingsDelete.classList.add("cart__item__content__settings__delete");

        const deleteItemP = document.createElement("p");
        const deleteItem = itemsCartContentSettingsDelete.appendChild(deleteItemP);
        deleteItem.classList.add("deleteItem");
        deleteItem.innerText = "supprimer";

      }
      itemsDelete();
      itemsChangeQuantity();
      itemsNumber();
      itemsTotalQuantity();
      itemsTotalPrice();
    })
}
cart();

/* Suppression de l'article */
function itemsDelete() {
  let buttonDelete = document.querySelectorAll(".deleteItem");

  for (let i = 0; i < buttonDelete.length; i++) {
    buttonDelete[i].addEventListener("click", (event) => {
      event.preventDefault();

    let deleteId = recoveryCart[i].idChoice;
    let deleteColors = recoveryCart[i].colorsChoice;

    recoveryCart = recoveryCart.filter( el => el.idChoice !== deleteId || el.colorsChoice !== deleteColors);
      
    localStorage.setItem('itemsProduct', JSON.stringify(recoveryCart));

    alert('Votre article a bien été supprimé.');
    window.location.href = "cart.html";
    });
  }
  itemsTotalQuantity();
  itemsTotalPrice();
}

/* Modification de la quantité des articles */
function itemsChangeQuantity() {
  let changeQuantity = document.getElementsByClassName("itemQuantity");

  for (let i = 0; i < changeQuantity.length; i++) {
    changeQuantity[i].addEventListener("change", function () {
      newQuantity = changeQuantity[i].value;
      recoveryCart[i].quantiteChoice = newQuantity;
      localStorage.setItem("itemsProduct", JSON.stringify(recoveryCart));
      itemsNumber();
      itemsTotalQuantity();
      itemsTotalPrice();
    });
  }
}

/* calcul du nombre total d'articles */
function itemsNumber() {
  let quantity = document.getElementsByClassName("itemQuantity");
  let totalQuantity = 0;

  for (let i = 0; i < quantity.length; i++) {
    q = quantity[i].value;
    quantityNumber = parseInt(q, 10);
    totalQuantity += quantityNumber;
  }
  return totalQuantity;
}

/* affichage du nombre total d'article */
function itemsTotalQuantity() {
  let totalQuantityDisplay = document.getElementById("totalQuantity");
  let totalQuantityCart = itemsNumber();
  totalQuantityDisplay.innerText = totalQuantityCart;
}

/* calcul du prix total */
function itemsTotalPrice() {
  let itemsTotalPrice = 0;

  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then(function (itemsApi) {
      let itemsId = itemsApi.map((el) => el._id);
      for (let items of recoveryCart) {
        let itemsQuantity = items["quantiteChoice"];
        let id = items["idChoice"];
        let indexId = itemsId.indexOf(id);
        let itemsPrice = itemsApi[indexId].price;
        let totalPriceCart = itemsQuantity * itemsPrice;
        itemsTotalPrice += totalPriceCart;
      }
      return itemsTotalPrice;
    })
    .then(function (itemsTotalPrice) {
      let totalPriceDisplay = document.getElementById("totalPrice");
      totalPriceDisplay.innerText = itemsTotalPrice;
    })
}


/* cCréation du formulaire */
function form() {

  /* Avec RegExp */
  let lettersRegExp = new RegExp("^[a-zA-ZÀ-ÿ_-]{2,60}$");
  let addressRegExp = new RegExp("[^A-Za-z0-9]");
  let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");

  /* Prénom */
  const inputFirstName = document.getElementById("firstName");
  const errorFirstName = document.getElementById("firstNameErrorMsg");
  const displayFirstName = function (surname) {
    let isValid = false;
    let testSurname = lettersRegExp.test(surname);
    if (testSurname) {
      errorFirstName.innerText = "";
      isValid = true;
    } else {
      errorFirstName.innerText = "Veuillez renseigner votre prénom";
      isValid = false;
    }
    return(isValid)
  };


  inputFirstName.addEventListener("click", function (event) {
    displayFirstName(event.target.value);
    console.log(displayFirstName(event.target.value));
  });

  /* Nom */
  const inputName = document.getElementById("lastName");
  const errorName = document.getElementById("lastNameErrorMsg");
  const displayName = function (name) {
    let isValid = false;
    let testName = lettersRegExp.test(name);
    if (testName) {
      errorName.innerText = "";
      isValid = true;
    } else {
      errorName.innerText = "Veuillez renseigner votre nom";
      isValid = false;
    }
    return(isValid)
  };

  inputName.addEventListener("input", function (event) {
    displayName(event.target.value);
  });

  /* Adresse */
  const inputAddress = document.getElementById("address");
  const errorAddress = document.getElementById("addressErrorMsg");
  const displayAdress = function (adress) {
    let isValid = false;
    let testAddress = addressRegExp.test(adress);
    if (testAddress) {
      errorAddress.innerText = "";
      isValid = true;
    } else {
      errorAddress.innerText = "Veuillez renseigner votre adresse";
      isValid = false; 
    }
  };

  inputAddress.addEventListener("input", function (event) {
    displayAdress(event.target.value);
  });

  /* Ville */
  const inputCity = document.getElementById("city");
  const errorCity = document.getElementById("cityErrorMsg");
  const displayCity = function (city) {
    let isValid= false;
    let testCity = lettersRegExp.test(city);
    if (testCity) {
      errorCity.innerText = "";
      isValid = true;
    } else {
      errorCity.innerText = "Veuillez renseigner votre ville";
      isValid = false;
    }
  };

  inputCity.addEventListener("input", function (event) {
    displayCity(event.target.value);
  });

  /* Mail */
  const inputEmail = document.getElementById("email");
  const errorEmail = document.getElementById("emailErrorMsg");
  const displayEmail = function (email) {
    let isValid = false;
    let testEmail = emailRegExp.test(email);
    if (testEmail) {
      errorEmail.innerText = "";
      isValid = true; 
    } else {
      errorEmail.innerText = "Veuillez renseigner votre email.";
      isValid = false; 
    }
  };

  inputEmail.addEventListener("input", function (event) {
    displayEmail(event.target.value);
  });
}
form();

/* Envoi du formulaire */
function sendForm() {
  let button = document.querySelector("form");

  button.addEventListener("submit", function (event) {
    event.preventDefault();

    let surname = document.getElementById("firstName");
    let name = document.getElementById("lastName");
    let adress = document.getElementById("address");
    let city = document.getElementById("city");
    let mail = document.getElementById("email");

    let products = [];
    for (let i = 0; i < recoveryCart.length; i++) {
      products.push(recoveryCart[i].idChoice);
    }

    const order = {
      contact: {
        firstName: surname.value,
        lastName: name.value,
        address: adress.value,
        city: city.value,
        email: mail.value,
      },
      products
    };

    const send = {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:3000/api/products/order", send)
      .then((response) => response.json())
      .then( (data) => {
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId);
        console.log(order);
        document.location.href = `confirmation.html`;
      })
      console.log(products);
  });
}
sendForm();