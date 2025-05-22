// Lista de países válidos
export const validCountries = [
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

// Verifica si el país es válido
export function isValidCountry(country) {
  return validCountries.includes(country.trim());
}

// Contraseña con caracteres especiales y un minimo de 6

export function validatePassword(password) {
  const minLength = 6;
  const hasNumber = /\d/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  if (password.length < minLength) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }

  if (!hasNumber.test(password)) {
    return "La contraseña debe contener al menos un número.";
  }

  if (!hasSpecialChar.test(password)) {
    return "La contraseña debe contener al menos un carácter especial.";
  }

  return ""; // sin errores
}
