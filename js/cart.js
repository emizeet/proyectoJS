let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function getCart() {
  return cart;
}

export function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function updateCartCount() {
  // Acá podés agregar lógica de contador visual si querés más adelante
}

export function addToCart(product) {
  cart.push(product);
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
