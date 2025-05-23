import { getCart, clearCart, removeFromCart } from "./cart.js";
import {
  loginBtn,
  registerBtn,
  userProfileDiv,
  welcomeUserSpan,
  userDropdown,
} from "./dom.js";

export function updateUserProfileUI() {
  const username = localStorage.getItem("username");
  if (!username) return;

  loginBtn.classList.add("hidden");
  registerBtn.classList.add("hidden");
  userProfileDiv.classList.remove("hidden");
  welcomeUserSpan.textContent = username;
  userDropdown.classList.add("hidden");
}

export function resetUIOnLogout() {
  userProfileDiv.classList.add("hidden");
  loginBtn.classList.remove("hidden");
  registerBtn.classList.remove("hidden");
  userDropdown.classList.add("hidden");
}

// Carrito

export function setupCartCloseButton() {
  const closeBtn = document.getElementById("closeCartBtn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.getElementById("cartContainer").classList.add("hidden");
    });
  }
}

export function renderCart() {
  const cartContainer = document.getElementById("cartContainer");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  let cart = getCart();

  cartContainer.classList.remove("hidden");
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((product, index) => {
    const subtotal = product.price * product.quantity;
    total += subtotal;

    const li = document.createElement("li");
    li.className = "py-2 flex justify-between items-center gap-2";

    li.innerHTML = `
      <div class="flex items-center gap-3 flex-1">
        <img src="${product.image || "ruta/a/imagen-default.jpg"}" alt="${
      product.name
    }" class="w-12 h-12 object-cover rounded" />
        <span>${product.name} - $${product.price.toFixed(2)}</span>
      </div>
      <input type="number" min="1" value="${
        product.quantity
      }" data-index="${index}" class="quantity-input w-16 text-center border rounded" />
      <span class="w-20 text-right">$${subtotal.toFixed(2)}</span>
      <button class="remove-btn text-red-600 hover:text-red-800" data-index="${index}" aria-label="Eliminar ${
      product.name
    }">X</button>
    `;

    cartItems.appendChild(li);
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;

  // Botones para eliminar
  cartItems.querySelectorAll(".remove-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const idx = parseInt(e.target.dataset.index);
      removeFromCart(idx);
      renderCart();
    })
  );

  // Inputs para cambiar cantidad
  cartItems.querySelectorAll(".quantity-input").forEach((input) =>
    input.addEventListener("change", (e) => {
      const idx = parseInt(e.target.dataset.index);
      let newQuantity = parseInt(e.target.value);

      if (isNaN(newQuantity) || newQuantity < 1) newQuantity = 1;

      cart[idx].quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    })
  );
}

// Confirmar compra

export function confirmPurchase() {
  if (getCart().length === 0) {
    Swal.fire({
      icon: "info",
      title: "Tu carrito está vacío",
      text: "Agregá productos antes de confirmar la compra.",
    });
    return;
  }

  Swal.fire({
    icon: "success",
    title: "¡Compra realizada!",
    text: "Gracias por tu compra.",
    confirmButtonColor: "#22c55e",
  }).then(() => {
    clearCart();
    document.getElementById("cartContainer").classList.add("hidden");
    renderCart();
  });
}
