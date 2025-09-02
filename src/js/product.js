import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  //setLocalStorage("so-cart", product); This is incorrect, it overwrites the cart
  let cartItems = getLocalStorage("so-cart") || []; // get existing cart items or initialize as empty array or get cart array from local storage if null set to empty array
  if (!Array.isArray(cartItems)) {
    console.error("Cart data is corrupted. Resetting cart.");
    cartItems = []; // reset to empty array if corrupted
  }

  cartItems.push(product); // add new product to cart array
  setLocalStorage("so-cart", cartItems); // save updated cart array back to local storage
  alert(`${product.Name} has been added to your cart!`); // notify user what has been added to the Cart
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart") // assuming button has id of addToCart
  .addEventListener("click", addToCartHandler); // attach event listener to button
