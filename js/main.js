// Funciones importadas

import {
  loginBtn,
  registerBtn,
  loginModal,
  closeLoginModalBtn,
  loginForm,
  usernameInput,
  passwordInput,
  usernameError,
  passwordError,
  registerModal,
  closeRegisterModalBtn,
  registerForm,
  registerUsernameInput,
  registerPasswordInput,
  confirmPasswordInput,
  fullNameInput,
  sexInputs,
  locationInput,
  registerUsernameError,
  registerPasswordError,
  confirmPasswordError,
  fullNameError,
  sexError,
  locationError,
  userProfileDiv,
  userMenuBtn,
  userDropdown,
  accountBtn,
  logoutBtn,
  welcomeUserSpan,
  productsContainer,
} from "./dom.js";

import { validatePassword } from "./validation.js";
import { addToCart, updateCartCount } from "./cart.js";
import { setupCartCloseButton, renderCart, confirmPurchase } from "./ui.js";
import { products } from "./products.js";

// Validación países (para validar ubicación)
const validCountries = [
  "Argentina",
  "Brasil",
  "Chile",
  "México",
  "Uruguay",
  "Colombia",
  "Perú",
  "Paraguay",
  "Ecuador",
  "Bolivia",
  "Venezuela",
  "Estados Unidos",
  "Canadá",
  "España",
  "Francia",
  "Alemania",
  "Italia",
  "Portugal",
];

function isValidCountry(country) {
  return validCountries.includes(country.trim());
}

// Limpieza de errores en registro
function clearRegisterErrors() {
  registerUsernameError.classList.add("hidden");
  registerPasswordError.classList.add("hidden");
  confirmPasswordError.classList.add("hidden");
  fullNameError.classList.add("hidden");
  sexError.classList.add("hidden");
  locationError.classList.add("hidden");
}

// Limpieza de errores en login
function clearLoginErrors() {
  usernameError.classList.add("hidden");
  passwordError.classList.add("hidden");
}

// Abrir modales
loginBtn.addEventListener("click", () => {
  loginModal.classList.remove("hidden");
});

registerBtn.addEventListener("click", () => {
  registerModal.classList.remove("hidden");
});

// Cerrar modales
closeLoginModalBtn.addEventListener("click", () => {
  loginModal.classList.add("hidden");
  clearLoginErrors();
  loginForm.reset();
});

closeRegisterModalBtn.addEventListener("click", () => {
  registerModal.classList.add("hidden");
  clearRegisterErrors();
  registerForm.reset();
});

// Registro
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearRegisterErrors();

  const username = registerUsernameInput.value.trim();
  const password = registerPasswordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  const fullName = fullNameInput.value.trim();
  let sex = "";
  for (const s of sexInputs) {
    if (s.checked) sex = s.value;
  }
  const location = locationInput.value.trim();

  let hasError = false;

  if (username.length < 3) {
    registerUsernameError.textContent =
      "El usuario debe tener al menos 3 caracteres.";
    registerUsernameError.classList.remove("hidden");
    hasError = true;
  }

  const passwordErrorMsg = validatePassword(password);
  if (passwordErrorMsg) {
    registerPasswordError.textContent = passwordErrorMsg;
    registerPasswordError.classList.remove("hidden");
    hasError = true;
  }

  if (password !== confirmPassword) {
    confirmPasswordError.textContent = "Las contraseñas no coinciden.";
    confirmPasswordError.classList.remove("hidden");
    hasError = true;
  }

  if (fullName.length < 3) {
    fullNameError.textContent = "El nombre completo es obligatorio.";
    fullNameError.classList.remove("hidden");
    hasError = true;
  }

  if (!sex) {
    sexError.textContent = "Seleccione su sexo.";
    sexError.classList.remove("hidden");
    hasError = true;
  }

  if (!isValidCountry(location)) {
    locationError.textContent = "Seleccione un país válido de la lista.";
    locationError.classList.remove("hidden");
    hasError = true;
  }

  if (hasError) return;

  // Guardar datos en localStorage
  localStorage.setItem("username", username);
  localStorage.setItem("password", password);
  localStorage.setItem("fullName", fullName);
  localStorage.setItem("sex", sex);
  localStorage.setItem("location", location);

  Swal.fire({
    icon: "success",
    title: "Registro exitoso",
    text: `¡Bienvenido, ${username}! Ahora puede iniciar sesión.`,
    timer: 2500,
    timerProgressBar: true,
    showConfirmButton: false,
  });

  registerModal.classList.add("hidden");
  registerForm.reset();
});

// Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearLoginErrors();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");

  if (username === storedUsername && password === storedPassword) {
    loginModal.classList.add("hidden");
    Swal.fire({
      icon: "success",
      title: `¡Bienvenido, ${username}!`,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    updateUserProfileUI();
  } else {
    passwordError.textContent = "Usuario o contraseña incorrectos.";
    passwordError.classList.remove("hidden");
  }
});

// Actualizar UI cuando el usuario esté logueado
function updateUserProfileUI() {
  const username = localStorage.getItem("username");
  if (!username) return;

  loginBtn.classList.add("hidden");
  registerBtn.classList.add("hidden");
  userProfileDiv.classList.remove("hidden");
  welcomeUserSpan.textContent = username;
  userDropdown.classList.add("hidden");
}

// Dropdown usuario
userMenuBtn.addEventListener("click", () => {
  userDropdown.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (!userProfileDiv.contains(e.target)) {
    userDropdown.classList.add("hidden");
  }
});

// Botón Cuenta muestra SweetAlert con datos completos
accountBtn.addEventListener("click", () => {
  const fullName = localStorage.getItem("fullName") || "";
  const sex = localStorage.getItem("sex") || "";
  const location = localStorage.getItem("location") || "";
  const username = localStorage.getItem("username") || "";

  Swal.fire({
    title: `Cuenta de ${username}`,
    html: `
      <p><strong>Nombre completo:</strong> ${fullName}</p>
      <p><strong>Sexo:</strong> ${sex}</p>
      <p><strong>Ubicación:</strong> ${location}</p>
    `,
    icon: "info",
  });

  userDropdown.classList.add("hidden");
});

// Botón Salir
logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  userProfileDiv.classList.add("hidden");
  loginBtn.classList.remove("hidden");
  registerBtn.classList.remove("hidden");
  userDropdown.classList.add("hidden");
  Swal.fire("Sesión cerrada", "Hasta pronto!", "info");
});

// Revisar sesión activa al cargar la página
window.addEventListener("load", () => {
  if (localStorage.getItem("username")) {
    updateUserProfileUI();
  }
});

// Agregar productos y mostrar carrito

document.addEventListener("DOMContentLoaded", () => {
  // Agregar listeners a botones de "Agregar al carrito"
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      const image = button.dataset.image; // <-- nuevo
      const product = { id, name, price, image }; // <-- incluí image
      addToCart(product);
    });
  });

  // Botón para abrir carrito
  const cartBtn = document.getElementById("cartBtn");
  cartBtn.addEventListener("click", renderCart);

  // Botón para cerrar carrito
  setupCartCloseButton();

  // Botón para finalizar compra (requiere login)
  const checkoutBtn = document.getElementById("checkoutBtn");
  checkoutBtn.addEventListener("click", () => {
    const username = localStorage.getItem("username");
    if (!username) {
      Swal.fire({
        icon: "warning",
        title: "Debes iniciar sesión",
        text: "Por favor, inicia sesión para finalizar la compra.",
      });
      return;
    }

    confirmPurchase();
  });
});

// Renderizado de productos

function renderProducts() {
  productsContainer.innerHTML = ""; // Limpiar antes de renderizar
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-lg shadow-md overflow-hidden flex flex-col";

    card.innerHTML = `
      <img src="${product.image}" alt="${
      product.name
    }" class="w-full h-48 object-contain" />
      <div class="p-4 flex flex-col flex-grow">
        <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
        <p class="text-gray-600 flex-grow">${product.description}</p>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-xl font-bold text-blue-600">$${product.price.toFixed(
            2
          )}</span>
          <button
            class="add-to-cart-btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            aria-label="Agregar ${product.name} al carrito"
            data-id="${product.id}"
            data-name="${product.name}"
            data-price="${product.price}"
            data-image="${product.image}"  <!-- agregado aquí -->
          >
            Agregar
          </button>
        </div>
      </div>
    `;

    productsContainer.appendChild(card);
    updateCartCount();
  });
}

renderProducts();
