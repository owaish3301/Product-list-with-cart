import { cartItems } from "./items_loader";


export const addToCart = (id) => {
    let totalCartItems = 0;
    for (let i = 0; i< cartItems.length; i++){
        const cartQuantity = cartItems[i].quantity;

        if (cartQuantity !== 0){
            totalCartItems = totalCartItems + cartQuantity;
        }
    }

    document.querySelector("#total-cart-items").innerText = totalCartItems;
}