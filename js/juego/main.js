// ✅ Archivo: main.js con TEMPORIZADOR + REGLAS DE TIEMPO

import { generarNivel } from "./niveles.js";
import { iniciarLogicaJuego } from "./logicaJuego.js";

const nombre = localStorage.getItem("usuario");
const tablero = document.getElementById("tablero");
const bienvenida = document.getElementById("bienvenida");
const nivelTexto = document.getElementById("nivel");
const puntajeTexto = document.getElementById("puntaje");
const temporizadorTexto = document.getElementById("temporizador");

let nivelActual = 1;
let puntaje = 0;

let tiempoInicioNivel;
let intervaloTemporizador;
const tiemposRecientes = [];

bienvenida.textContent = `¡Bienvenido, ${nombre}!`;
puntajeTexto.textContent = `Puntaje: ${puntaje}`;
temporizadorTexto.textContent = `Tiempo: 0s`;

function actualizarPuntaje(cantidad) {
  puntaje += cantidad;
  if (puntaje < 0) puntaje = 0;
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

function iniciarTemporizador() {
  let tiempo = 0;
  temporizadorTexto.textContent = `Tiempo: 0s`;
  intervaloTemporizador = setInterval(() => {
    tiempo++;
    temporizadorTexto.textContent = `Tiempo: ${tiempo}s`;
  }, 1000);
}

function detenerTemporizador() {
  clearInterval(intervaloTemporizador);
}

function cargarNivel(nivel) {
  tablero.innerHTML = "";
  const cartas = generarNivel(nivel);
  cartas.forEach(carta => tablero.appendChild(carta.elemento));
  nivelTexto.textContent = `Nivel ${nivel}`;

  tiempoInicioNivel = Date.now();
  iniciarTemporizador();

  iniciarLogicaJuego(cartas, () => {
    detenerTemporizador();
    const duracion = (Date.now() - tiempoInicioNivel) / 1000;
    console.log(`Nivel ${nivel} completado en ${duracion.toFixed(2)} segundos`);

    if (duracion > 30) {
      alert("Tardaste mucho. Se restan 2 puntos.");
      actualizarPuntaje(-2);
    }

    if (duracion < 15) {
      tiemposRecientes.push(true);
    } else {
      tiemposRecientes.push(false);
    }

    if (tiemposRecientes.length > 3) {
      tiemposRecientes.shift();
    }

    if (tiemposRecientes.length === 3 && tiemposRecientes.every(t => t)) {
      alert("¡Has sido muy rápido! Ganas 2 puntos extra.");
      actualizarPuntaje(2);
      tiemposRecientes.length = 0;
    }

    if (nivel < 10) {
      alert("¡Nivel completado!");
      cargarNivel(nivel + 1);
    } else {
      guardarPuntajeEnBackend(nombre, puntaje);
    }
  }, actualizarPuntaje);
}

cargarNivel(nivelActual);
