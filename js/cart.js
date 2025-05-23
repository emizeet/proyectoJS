let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function getCart() {
  return cart;
}

export function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById("cartCount");
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

export function addToCart(product) {
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartCount();
  console.log(`Agregado al carrito: ${product.name} - $${product.price}`);
}

export function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
}

export function clearCart() {
  cart.length = 0;
  saveCart();
  updateCartCount();
}
