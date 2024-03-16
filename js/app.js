const botonInicioPausa = document.querySelector("#boton-inicio-pausa");
const botonReiniciar = document.querySelector("#boton-reiniciar");

let segundos = 0;
let minutos = 0;
let horas = 0;

let intervaloDeTiempo;
let estadoCronometro = "pausado"; // Dos estados posibles: 'pausado' o 'andando'.

function actualizarCronometro() {
  segundos++;

  if (segundos / 60 === 1) {
    segundos = 0;
    minutos++;

    if (minutos / 60 === 1) {
      minutos = 0;
      horas++;
    }
  }

  const segundosConFormato = asignarFormato(segundos);
  const minutosConFormato = asignarFormato(minutos);
  const horasConFormato = asignarFormato(horas);

  // Actualizar el contenido del cronometro.
  const cronometro = document.getElementById("cronometro");
  cronometro.innerText = `${horasConFormato}:${minutosConFormato}:${segundosConFormato}`;
}

// Agregar un cero a la izquierda si se necesita.
function asignarFormato(unidadDeTiempo) {
  return unidadDeTiempo < 10 ? "0" + unidadDeTiempo : unidadDeTiempo;
}

botonInicioPausa.addEventListener("click", function () {
  if (estadoCronometro === "pausado") {
    intervaloDeTiempo = window.setInterval(actualizarCronometro, 1000);
    document.getElementById(
      "boton-inicio-pausa"
    ).innerHTML = `<i class="bi bi-pause" id="boton-inicio-pausa"></i>`;
    botonInicioPausa.classList.remove("iniciar");
    botonInicioPausa.classList.add("pausar");
    // Actualizar el estado del cronometro.
    estadoCronometro = "iniciado";
  } else {
    window.clearInterval(intervaloDeTiempo);

    document.getElementById(
      "boton-inicio-pausa"
    ).innerHTML = `<i class="bi bi-play-fill" id="boton-inicio-pausa"></i>`;
    botonInicioPausa.classList.remove("pausar");
    botonInicioPausa.classList.add("iniciar");
    estadoCronometro = "pausado";
  }
});

botonReiniciar.addEventListener("click", function () {
  // Eliminar el intervalo.
  window.clearInterval(intervaloDeTiempo);

  segundos = 0;
  minutos = 0;
  horas = 0;
  document.getElementById("cronometro").innerHTML = "00:00:00";

  // Botones.
  document.getElementById(
    "boton-inicio-pausa"
  ).innerHTML = `<i class="bi bi-play-fill" id="inicio"></i>`;
  botonInicioPausa.classList.remove("pausar");
  botonInicioPausa.classList.add("iniciar");

  // Estado.
  estadoCronometro = "pausado";
});
