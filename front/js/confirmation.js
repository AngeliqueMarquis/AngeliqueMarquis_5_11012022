function confirmation(){
    const id = document.getElementById("orderId");
    id.innerText = localStorage.getItem("orderId");
    localStorage.clear();
}

confirmation();