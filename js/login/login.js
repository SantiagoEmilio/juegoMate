
import { validarLogin } from "./validarLogin.js";
document.getElementById("btnLogin").addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value;
  const codigo = document.getElementById("codigo").value;
  if (validarLogin(nombre, codigo)) {
    localStorage.setItem("usuario", nombre);
    window.location.href = "../../juego.html";
  } else {
    alert("Ingresa tu nombre y cualquier código.");
  }
});
        