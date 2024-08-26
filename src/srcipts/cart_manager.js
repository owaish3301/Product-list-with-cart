import { cartItems, fetchDataFromJson } from "./items_loader.js";
import { addToCart } from "./add_to_cart.js";

function updateCartButton(cartButton) {
    cartButton.classList.remove("border-rose-300", "border-2", "bg-white", "hover:cursor-pointer");
    cartButton.classList.add("bg-red");

    cartButton.innerHTML = `
        <img src="./assets/images/icon-decrement-quantity.svg" class="decrease-cart-quantity hover:cursor-pointer border-2 rounded-full p-1">
        <p class="text-white">${cartItems[cartButton.id].quantity}</p>
        <img src="./assets/images/icon-increment-quantity.svg" class="increase-cart-quantity hover:cursor-pointer border-2 rounded-full p-1">
    `;

    const decreaseButton = cartButton.querySelector('.decrease-cart-quantity');
    const increaseButton = cartButton.querySelector('.increase-cart-quantity');

    decreaseButton.addEventListener('click', (e) => {
        e.stopPropagation();
        decrementHandler(cartButton);
    });

    increaseButton.addEventListener('click', (e) => {
        e.stopPropagation();
        incrementHandler(cartButton);
    });
}

function addToCartHandler(cartButton) {
    cartItems[cartButton.id].quantity++;
    updateCartButton(cartButton);
}

function decrementHandler(cartButton) {
    if (cartItems[cartButton.id].quantity === 1){
        cartItems[cartButton.id].quantity--;

        cartButton.classList.add("border-rose-300", "border-2", "bg-white", "hover:cursor-pointer");
        cartButton.classList.remove("bg-red");
        cartButton.innerHTML = `
                <img src="./assets/images/icon-add-to-cart.svg">
                <p>Add to cart</p>
              `;

        initializeCartEventListeners(cartButton);
    }
    else if (cartItems[cartButton.id].quantity > 1) {
        cartItems[cartButton.id].quantity--;
        updateCartButton(cartButton);
    }
    addToCart(cartButton.id)
}

function incrementHandler(cartButton) {
    cartItems[cartButton.id].quantity++;
    updateCartButton(cartButton);
    addToCart(cartButton.id)
}

export function initializeCartEventListeners(cartButton) {
    cartButton.addEventListener("click", () => {
        addToCartHandler(cartButton); 
        addToCart(cartButton.id);
    }, { once: true });
}

// Main initialization function
async function initialize() {
    const dataLoaded = await fetchDataFromJson();
    if (dataLoaded) {
        const addToCartButtons = document.querySelectorAll(".add-to-cart");
        addToCartButtons.forEach((cartButton)=>{
            initializeCartEventListeners(cartButton);
        })
        
    } else {
        console.error("Failed to load product data");
    }
}

// Wait for DOM to be fully loaded, then initialize
document.addEventListener('DOMContentLoaded', initialize);