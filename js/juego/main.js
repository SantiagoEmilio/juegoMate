// ✅ Archivo: main.js del juego matemático

import { generarNivel } from "./niveles.js";
import { iniciarLogicaJuego } from "./logicaJuego.js";

const nombre = localStorage.getItem("usuario");
const tablero = document.getElementById("tablero");
const bienvenida = document.getElementById("bienvenida");
const nivelTexto = document.getElementById("nivel");
const puntajeTexto = document.getElementById("puntaje");

let nivelActual = 1;
let puntaje = 0;

bienvenida.textContent = `¡Bienvenido, ${nombre}!`;
puntajeTexto.textContent = `Puntaje: ${puntaje}`;

function actualizarPuntaje(cantidad) {
  puntaje += cantidad;
  puntajeTexto.textContent = `Puntaje: ${puntaje}`;
}

function guardarPuntajeEnBackend(nombre, puntaje) {
  fetch("http://localhost:3000/api/usuarios/puntaje", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nombre, puntaje })
  })
    .then(res => res.json())
    .then(data => {
      alert(`¡Felicidades! Completaste todos los niveles. Puntaje final: ${puntaje}`);
      location.href = "index.html";
    })
    .catch(err => {
      console.error("Error al guardar puntaje:", err);
      alert("Ocurrió un error al guardar tu puntaje.");
      location.href = "index.html";
    });
}

function cargarNivel(nivel) {
  tablero.innerHTML = "";
  const cartas = generarNivel(nivel);
  cartas.forEach(carta => tablero.appendChild(carta.elemento));
  nivelTexto.textContent = `Nivel ${nivel}`;

  iniciarLogicaJuego(cartas, () => {
    if (nivel < 10) {
      alert("\u00a1Nivel completado!");
      cargarNivel(nivel + 1);
    } else {
      guardarPuntajeEnBackend(nombre, puntaje);
    }
  }, actualizarPuntaje);
}

cargarNivel(nivelActual);
