// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// ✅ Get cart from sessionStorage (SAFE)
function getCart() {
  const data = sessionStorage.getItem("cart");
  try {
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

// ✅ Save cart
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// ✅ Render products
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">
        Add to Cart
      </button>
    `;

    productList.appendChild(li);
  });
}

// ✅ Render cart
function renderCart() {
  const cart = getCart();

  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// ✅ Add to cart (APPEND, don't overwrite)
function addToCart(productId) {
  const cart = getCart(); // always latest

  const product = products.find((p) => p.id === productId);

  const updatedCart = [...cart, product]; // 🔥 important

  saveCart(updatedCart);
  renderCart();
}

// ❌ Optional (not required)
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
  renderCart();
}

// ✅ Clear cart
function clearCart() {
  sessionStorage.setItem("cart", JSON.stringify([])); // 🔥 important (NOT removeItem)
  renderCart();
}

// ✅ Event delegation
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const id = parseInt(e.target.dataset.id);
    addToCart(id);
  }
});

// ✅ Clear button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();