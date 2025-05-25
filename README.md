# Proyecto Final - Ecommerce Simulado

Este es un proyecto construido por Emi Gorosito, hecho con JS puro como presentación final de la comisión 86620 a cargo de Julio Avantt como profe, muchas gracias!. 
Consiste en un Ecommerce simulado que permite a los usuarios registrarse, iniciar sesión, agregar productos al carrito y simular una compra.

---

## Funcionalidades

- ✅ Registro de usuario (nombre, contraseña, sexo y ubicación)
- ✅ Inicio de sesión con validaciones
- ✅ Dropdown de "Cuenta" con información del usuario
- ✅ Catálogo de productos renderizado dinámicamente
- ✅ Carrito de compras funcional:
  - Agregar y eliminar productos
  - Visualizar total a pagar
  - Confirmar compra con SweetAlert
  - Guardado en `localStorage`
- ✅ Mensajes personalizados con SweetAlert2

---

## Tecnologías Utilizadas

- HTML5
- CSS3
- [Tailwind CSS](https://tailwindcss.com/)
- JavaScript (ES6+)
- [SweetAlert2](https://sweetalert2.github.io/)
- localStorage

---

## Estructura de Archivos

📦 proyecto-ecommerce/
├── index.html
├── style.css
├── js/
│ ├── main.js
│ ├── alerts.js
│ ├── dom.js
│ ├── dropdown.js
│ ├── ui.js
│ └── validation.js
└── README.md

---

## Cómo ejecutar

1. Cloná o descargá este repositorio.
2. Abrí el archivo `index.html` en tu navegador.
3. ¡Listo! Probá el registro, login, navegación y carrito de compras.

---

## 📝 Notas

- El proyecto no utiliza frameworks ni back-end.
- Todos los datos se manejan desde el front y se guardan en `localStorage`.
