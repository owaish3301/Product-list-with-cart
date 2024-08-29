const startNewOrderBtn = document.getElementById("startNewOrderBtn");

const startNewOrder = () => {
    location.reload()
}

startNewOrderBtn.addEventListener("click", startNewOrder);