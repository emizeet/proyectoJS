export function showSuccessRegister(username) {
  Swal.fire({
    icon: "success",
    title: "Registro exitoso",
    text: `¡Bienvenido, ${username}! Ahora puede iniciar sesión.`,
    timer: 2500,
    timerProgressBar: true,
    showConfirmButton: false,
  });
}

export function showLoginSuccess(username) {
  Swal.fire({
    icon: "success",
    title: `¡Bienvenido, ${username}!`,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
}

export function showAccountInfo({ username, fullName, sex, location }) {
  Swal.fire({
    title: `Cuenta de ${username}`,
    html: `
      <p><strong>Nombre completo:</strong> ${fullName}</p>
      <p><strong>Sexo:</strong> ${sex}</p>
      <p><strong>Ubicación:</strong> ${location}</p>
    `,
    icon: "info",
  });
}

export function showLogoutMessage() {
  Swal.fire("Sesión cerrada", "Hasta pronto!", "info");
}
