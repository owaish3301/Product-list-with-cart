import { cartItems } from "./items_loader";
import { currentCartDisplay } from "./add_to_cart";

const orderConfirmationButton = document.querySelector("#confirm-order");
let totalPrice = 0;

const confirmationHandler = () => {
    const orderConfirmed = document.querySelector("#orderConfirmationOverlay");
    getOrderItemsInfo();
    document.querySelector("#confirm-order-sum-total").innerText = totalPrice;
    orderConfirmed.classList.remove("hidden");
};


function getOrderItemsInfo() {
  for (let index of currentCartDisplay){
    const quantity = cartItems[index].quantity;
    if (quantity !== 0){
      const thumbnail = cartItems[index].thumbnail;
      const name = cartItems[index].name;
      const price = cartItems[index].price;

      addItemsToConfirmationLists(thumbnail, name, quantity, price);
      totalPrice = totalPrice + (price*quantity);
    };
  };
};


export function addItemsToConfirmationLists(thumbnail, name, quantity, price){
    const confirmedOrderList = document.querySelector("#confirmedOrderList");
    const confirmedItem = document.createElement("div");
    confirmedItem.classList.add("flex", "justify-between", "items-center");
    confirmedItem.innerHTML = `
            <div class="flex items-center">
              <img src=${thumbnail} alt="" class="w-12 h-12 object-cover rounded-md mr-3">
              <div>
                <p class="font-semibold text-gray-800 truncate w-min max-w-[160px] md:max-w-[180px] lg:max-w-[190px]">${name}</p>
                <p class="text-sm text-red w-max inline">${quantity}x</p>
                <p class="text-sm text-rose-400 w-max inline ml-2">@$${price}</p>
              </div>
            </div>
            <p class="font-semibold text-gray-800">$${price * quantity}</p>
    `;
    confirmedOrderList.append(confirmedItem);
    const line = document.createElement("hr");
    confirmedItem.after(line);
}; 




orderConfirmationButton.addEventListener("click", confirmationHandler);
