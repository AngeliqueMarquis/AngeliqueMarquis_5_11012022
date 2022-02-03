function confirmation() {
    const confirmationNumber = document.getElementById("orderId");
    confirmationNumber.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"));
    localStorage.clear();
  }
  confirmation();