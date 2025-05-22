import { getCart, clearCart, removeFromCart } from "./cart.js";

// Referencias que se usan para actualizar la UI al loguear/desloguear
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const userProfileDiv = document.getElementById("userProfile");
const welcomeUserSpan = document.getElementById("welcomeUser");
const userDropdown = document.getElementById("userDropdown");

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

// carrito

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
  const cart = getCart();
  // Mostrar el contenedor
  cartContainer.classList.remove("hidden");

  // Limpiar lista actual
  cartItems.innerHTML = "";

  // Variable para sumar el total
  let total = 0;

  // Recorrer carrito y crear elementos li
  cart.forEach((product, index) => {
    total += product.price;

    const li = document.createElement("li");
    li.className = "py-2 flex justify-between items-center";

    li.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button class="remove-btn text-red-600 hover:text-red-800" data-index="${index}" aria-label="Eliminar ${
      product.name
    } del carrito">X</button>
    `;

    cartItems.appendChild(li);
  });

  // Mostrar total
  cartTotal.textContent = `$${total.toFixed(2)}`;

  // Agregar event listeners para botones de eliminar
  const removeButtons = cartItems.querySelectorAll(".remove-btn");

  removeButtons.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const idx = parseInt(e.target.dataset.index);
      removeFromCart(idx);
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
    confirmButtonColor: "#22c55e", // Verde
  }).then(() => {
    clearCart(); // Vaciar carrito
    document.getElementById("cartContainer").classList.add("hidden");
    renderCart(); // Volver a renderizar (vacío)
  });
}
