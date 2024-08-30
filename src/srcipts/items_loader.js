export let cartItems = [];

export async function fetchDataFromJson() {
    try {
        const API_URL = process.env.REACT_APP_API_URL || "https://product-list-with-cart-backend.vercel.app/api";
        console.log("Fetching from:", API_URL);

        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        
        console.log("Response:", response);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const productData = await response.json();
        console.log("Product Data:", productData);
        
        if (!Array.isArray(productData) || productData.length === 0) {
            throw new Error("Data is not in the expected format");
        }
        
        layoutContent(productData);
        return true;
    } catch (error) {
        console.error("Error in fetching data:", error);
        return false;
    }
}


function layoutContent(productData) {
    const productContainer = document.querySelector(".product-container");
    productContainer.innerHTML = ''; // Clear existing content
    
    for (let i = 0; i < productData.length; i++) {
        let productImage;
        window.innerWidth > 768 ? productImage = productData[i].image.desktop : productImage = productData[i].image.mobile;

        const { name: productName, price: productPrice, category: productCategory } = productData[i];
        const productThumbnail = productData[i].image.thumbnail;

        cartItems.push({
            name: productName,
            price: productPrice,
            category: productCategory,
            thumbnail: productThumbnail,
            quantity: 0
        });

        const productCard = document.createElement("div");
        productCard.classList.add("w-full", "md:w-[47%]", "lg:w-[30%]");
        productCard.innerHTML = `
            <div class="img-container m-auto max-w-[300px] relative">
                <img src=${productImage} alt="" class="rounded-md">
                <div id="${i}" class="add-to-cart w-[140px] pt-2 pb-2 pr-4 pl-4 border-rose-300 border-2 rounded-full bg-white flex flex-nowrap justify-between gap-1 absolute bottom-[-10%] left-[50%] translate-x-[-50%] hover:cursor-pointer">
                    <img src="./assets/images/icon-add-to-cart.svg">
                    <p>Add to cart</p>
                </div>
            </div>
            <div class="product-info max-w-[300px] m-auto mt-8 mb-8">
                <p class="product-category font-red-hat text-rose-400">${productCategory}</p>
                <p class="product-name font-red-hat font-semibold">${productName}</p>
                <p class="product-price text-red font-red-hat font-semibold">$${productPrice}</p>
            </div>
        `;
        productContainer.appendChild(productCard);
    }
}
