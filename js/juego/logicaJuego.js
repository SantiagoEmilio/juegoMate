export function iniciarLogicaJuego(cartas, onNivelCompleto, agregarPuntaje) {
  let seleccionadas = [];
  let parejasEncontradas = 0;

  cartas.forEach(c => {
    c.elemento.addEventListener("click", () => {
      if (seleccionadas.includes(c) || seleccionadas.length === 2) return;

      c.elemento.style.backgroundColor = "#ffd700";
      seleccionadas.push(c);

      if (seleccionadas.length === 2) {
        const [a, b] = seleccionadas;
        const match = (
          a.operacion === b.operacion &&
          a.tipo !== b.tipo
        );

        setTimeout(() => {
          if (match) {
            a.elemento.style.visibility = "hidden";
            b.elemento.style.visibility = "hidden";
            parejasEncontradas++;
            agregarPuntaje(10); // 👈 Agregamos puntos

            if (parejasEncontradas === 8) {
              onNivelCompleto();
            }
          } else {
            a.elemento.style.backgroundColor = "#ffe0f0";
            b.elemento.style.backgroundColor = "#ffe0f0";
          }

          seleccionadas = [];
        }, 700);
      }
    });
  });
}

        