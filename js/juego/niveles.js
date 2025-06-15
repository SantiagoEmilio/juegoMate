export function generarNivel(nivel) {
  const operaciones = [];
  const max = 5 + nivel * 2;
  while (operaciones.length < 8) {
    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * max) + 1;
    const tipo = ["+", "-", "*", "/"][Math.floor(Math.random() * 4)];
    let resultado;
    switch (tipo) {
      case "+": resultado = a + b; break;
      case "-": resultado = a - b; break;
      case "*": resultado = a * b; break;
      case "/":
        if (a % b !== 0) continue;
        resultado = a / b;
        break;
    }
    const operacion = `${a} ${tipo} ${b}`;
    if (!operaciones.find(o => o.operacion === operacion)) {
      operaciones.push({ operacion, resultado });
    }
  }
  const cartas = [];
  operaciones.forEach(({ operacion, resultado }) => {
    cartas.push(crearCarta(operacion, resultado, "operacion"));
    cartas.push(crearCarta(operacion, resultado, "resultado"));
  });
  return mezclarArray(cartas);
}
function crearCarta(operacion, resultado, tipo) {
  const elemento = document.createElement("div");
  elemento.classList.add("carta");
  elemento.dataset.operacion = operacion;
  elemento.dataset.resultado = resultado;
  elemento.dataset.tipo = tipo;
  elemento.textContent = tipo === "operacion" ? operacion : resultado;
  return { elemento, operacion, resultado, tipo };
}
function mezclarArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
        