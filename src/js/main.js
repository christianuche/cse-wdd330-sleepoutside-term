import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";

// Creating an instance of ProductData for tents data
const dataSource = new ProductData("tents");

// Get refrence to the target list element in the DOM
const listElement = document.querySelector(".product-list");

// Create and make an initialization product list
const productList = new ProductList("tents", dataSource, listElement);
productList.init();
