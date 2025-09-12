import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId; // example 880RR
        this.product = {};          // This serves as a placeholder for the product info
        this.dataSource = dataSource; // ProductData instance
    }

    async init() {
        // this get the product deatails into the page
        this.product = await this.dataSource.findProductById(this.productId);

        // this render product details into the page
        this.renderProductDetails();

        // add event listener for "Add to Cart"
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

    addProductToCart() {
        // get current cart or empty
        let cartItems = getLocalStorage("so-cart") || [];

        // add product
        cartItems.push(this.product);

        // save updated cart
        setLocalStorage("so-cart", cartItems);

        alert(`${this.product.Name} has been added to your cart!`);
    }

    renderProductDetails() {
        const productSection = document.querySelector(".product-detail");

        productSection.innerHTML = `
        <h3>${this.product.Brand?.Name || "Unknown Brand"}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand || "Unnamed Product"}</h2>
            <img
                id="productImage"
                class="divider"
                src="${this.product.Image || "../images/placeholder.png"}"
                alt="${this.product.NameWithoutBrand || "Product image"}"
                />
        <p id="productPrice" class="product-card__price">$${this.product.FinalPrice || "N/A"}</p>
        <p id="productColor" class="product__color">${this.product.Colors?.[0]?.ColorName || "N/A"}</p>
        <p id="productDesc" class="product__description">${this.product.DescriptionHtmlSimple || "No description available."}</p>
        <div class="product-details__add">
            <button id="addToCart" data-id="${this.productId}">Add to Cart</button>
        </div>
        `;
    }
}