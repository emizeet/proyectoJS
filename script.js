// Referencias DOM
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginModal = document.getElementById("loginModal");
const closeLoginModalBtn = document.getElementById("closeLoginModal");
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");

const registerModal = document.getElementById("registerModal");
const closeRegisterModalBtn = document.getElementById("closeRegisterModal");
const registerForm = document.getElementById("registerForm");
const registerUsernameInput = document.getElementById("registerUsername");
const registerPasswordInput = document.getElementById("registerPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const fullNameInput = document.getElementById("fullName");
const sexInputs = document.getElementsByName("sex");
const locationInput = document.getElementById("location");

const registerUsernameError = document.getElementById("registerUsernameError");
const registerPasswordError = document.getElementById("registerPasswordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const fullNameError = document.getElementById("fullNameError");
const sexError = document.getElementById("sexError");
const locationError = document.getElementById("locationError");

const userProfileDiv = document.getElementById("userProfile");
const userMenuBtn = document.getElementById("userMenuBtn");
const userDropdown = document.getElementById("userDropdown");
const accountBtn = document.getElementById("accountBtn");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeUserSpan = document.getElementById("welcomeUser");

// Lista de países válidos (igual que el datalist)
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

// Función para validar ubicación
function isValidCountry(country) {
  return validCountries.includes(country.trim());
}

// Mostrar/Ocultar dropdown al click en usuario
userMenuBtn.addEventListener("click", () => {
  userDropdown.classList.toggle("hidden");
});

// Cerrar dropdown al click fuera
document.addEventListener("click", (e) => {
  if (!userProfileDiv.contains(e.target)) {
    userDropdown.classList.add("hidden");
  }
});

// Cerrar modales
closeRegisterModalBtn.addEventListener("click", () => {
  registerModal.classList.add("hidden");
  clearRegisterErrors();
  registerForm.reset();
});

if (closeLoginModalBtn) {
  closeLoginModalBtn.addEventListener("click", () => {
    loginModal.classList.add("hidden");
    clearLoginErrors();
    loginForm.reset();
  });
}

// Abrir modales
loginBtn.addEventListener("click", () => {
  loginModal.classList.remove("hidden");
});
registerBtn.addEventListener("click", () => {
  registerModal.classList.remove("hidden");
});

// Validaciones limpieza
function clearRegisterErrors() {
  registerUsernameError.classList.add("hidden");
  registerPasswordError.classList.add("hidden");
  confirmPasswordError.classList.add("hidden");
  fullNameError.classList.add("hidden");
  sexError.classList.add("hidden");
  locationError.classList.add("hidden");
}

function clearLoginErrors() {
  usernameError.classList.add("hidden");
  passwordError.classList.add("hidden");
}

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

  if (password.length < 6) {
    registerPasswordError.textContent =
      "La contraseña debe tener al menos 6 caracteres.";
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

// Al cargar la página, revisar si hay sesión activa
window.addEventListener("load", () => {
  if (localStorage.getItem("username")) {
    updateUserProfileUI();
  }
});
