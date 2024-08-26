import { cartItems } from "./items_loader";

const currentCartDisplay = [];

export const addToCart = (id) => {
    let totalCartItems = 0;
    for (let i = 0; i< cartItems.length; i++){
        const cartQuantity = cartItems[i].quantity;
        totalCartItems = totalCartItems + cartQuantity;
    };


    const emptyCartContainer = document.querySelector(".empty-cart-items");
    const orderConfirmationSection = document.querySelector(".order-total-container");
    if (totalCartItems !== 0) {
        if(emptyCartContainer.checkVisibility()){
            emptyCartContainer.classList.add("hidden");
        };
        if(!orderConfirmationSection.checkVisibility()){
            orderConfirmationSection.classList.remove("hidden");
        };
    } else{
        emptyCartContainer.classList.remove("hidden");
        orderConfirmationSection.classList.add("hidden");
    };
    
    document.querySelector("#total-cart-items").innerText = totalCartItems;

    //only add a new item in the cart display if it does not exist already
    if(currentCartDisplay.indexOf(id) === -1){
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("item-container", "flex", "justify-between", "mt-2", "mb-2");
        itemContainer.setAttribute("id",`cartItem-display-${id}`);
        itemContainer.innerHTML = `
            <div class="item-info-container">
              <div class="item-name-container">
                <p class="font-red-hat font-semibold" id="cart-name-${id}"> ${cartItems[id].name} </p>
              </div>
              <div class="item-quantity-and-price-container flex gap-4">
                <p class="item-quantity text-red font-semibold font-red-hat" id="cart-quantity-${id}"> ${cartItems[id].quantity}x </p>
                <p class="item-rate text-rose-400 font-red-hat" id="cart-price-${id}"> @ $${cartItems[id].price} </p>
                <p class="final-price text-rose-400 font-red-hat" id="cart-final-price-${id}"> $${cartItems[id].quantity * cartItems[id].price} </p>
              </div>
            </div>
            <div class="cross-button-container h-max w-max self-center">
              <img src="./assets/images/icon-remove-item.svg" alt="" class="remove-all p-1 border-2 border-rose-400 rounded-full">
            </div>
        `;
        document.querySelector(".cart-items-nonempty").append(itemContainer);

        const lineElem = document.createElement("hr");
        itemContainer.after(lineElem);
        currentCartDisplay.push(id);
    } else{
        if(cartItems[id].quantity === 0) {
            const elemToRemove = document.querySelector(`#cartItem-display-${id}`);
            elemToRemove.nextElementSibling.remove();
            elemToRemove.remove();
            const indx = currentCartDisplay.indexOf(id);
            currentCartDisplay.splice(indx,1);
        } else{
            //if the item is already in display in the cart update its values like prices and quantity
            const itemQuantityDisplay = document.querySelector(`#cart-quantity-${id}`);
            itemQuantityDisplay.innerText = cartItems[id].quantity + "x";

            const finalPriceDisplay = document.querySelector(`#cart-final-price-${id}`);
            finalPriceDisplay.innerText = `$${cartItems[id].quantity * cartItems[id].price}`;
        };
    };
}