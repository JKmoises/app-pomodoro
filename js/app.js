const $btnAgregar = document.querySelector('#btn-agregar-tarea');
const $tareas = document.querySelector('#tareas');
const $entradaTarea = document.querySelector('#entrada-agregar');
const $temporizador = document.querySelector('#temporizador');
const $tiempo = document.querySelector('#tiempo');

let tareas = [];
let minutos = 0,
  segundos = 0,
  minDescanso = 0,
  segDescanso = 0;

document.addEventListener('DOMContentLoaded', iniciarApp());


function iniciarApp(){
  agregarTarea();
  mostrarTiempo();
}


function mostrarTarea(e) {
  tareas = [];
  desactivarBoton($btnAgregar,'desactivado');
  
  if ($entradaTarea.value !== '') {
    limpiarHTML($tareas);

    tareas = [...tareas, $entradaTarea.value];
    // console.log(tareas);
    // console.log($tareas);


    tareas.forEach(tarea => {
      $tareas.innerHTML += /*html*/`
        <div class="tarea">
          <button class="btn btn-iniciar">Empezar</button>
          <span class="nombre-tarea text-lg-left text-center">${tarea}</span>
        </div>
        <hr>
    `;

    });
    iniciarTarea();

  }
}

function desactivarBoton($elemento = null,clase,modo = true){
  $elemento.disabled = modo;

  $elemento.classList.add(clase);
}

function agregarTarea() {

  $btnAgregar.addEventListener('click', mostrarTarea);
  
  $entradaTarea.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;

    mostrarTarea();

  });
  
}

function mostrarTiempoDescanso(){
  minDescanso = minDescanso < 10 ? `0${minDescanso}` : minDescanso;
  segDescanso = segDescanso < 10 ? `0${segDescanso}` : segDescanso;

  $tiempo.innerHTML = `${minDescanso}:${segDescanso}`;

  minDescanso = parseInt(minDescanso);
  segDescanso = parseInt(segDescanso);
  console.log(minDescanso, segDescanso);
}


function iniciarDescanso() {
  const $tituloTarea = document.querySelector('#titulo-tarea > p');
  $tituloTarea.textContent = 'Descanso';

  minDescanso = 5;
  segDescanso = 60;
  
  const temporizadorDescanso = setInterval(() => {
    segDescanso--;

    mostrarTiempoDescanso();

    if (segDescanso === 0 && minDescanso === 0) {
      $tituloTarea.textContent = null;
      desactivarBoton($btnAgregar,'activado',false);
      clearInterval(temporizadorDescanso);
    }

    if (segDescanso === 0) {
      segDescanso = 5;
      minDescanso--;
    }
  },1000);


  

}

function mostrarTiempo() {
  minutos = minutos < 10 ? `0${minutos}` : minutos;
  segundos = segundos < 10 ? `0${segundos}` : segundos;


  $tiempo.innerHTML = `${minutos}:${segundos}`;

  minutos = parseInt(minutos);
  segundos = parseInt(segundos);
  console.log(minutos,segundos);
}

function iniciarTemporizador(e) {
  minutos = 24;
  segundos = 60;

  
  const temporizador = setInterval(() => {
    segundos--;

    mostrarTiempo();
    
    
    if (segundos === 0 && minutos === 0) {
      tareaModoTerminada(e);
      clearInterval(temporizador);
      iniciarDescanso();

    }

    if (segundos === 0) {
      segundos = 5;
      minutos--;
    }

    
      
  }, 1000);
}

function iniciarTarea() {
  limpiarInput();

  const $botonesIniciar = document.querySelectorAll('.btn-iniciar');

  $botonesIniciar.forEach($btnIniciar => {
    $btnIniciar.addEventListener('click', e => {
      añadirNombreTarea(e);
      tareaModoProgreso(e);
      iniciarTemporizador(e);
    });
  });

}

function añadirNombreTarea(e) {
  const nombreTarea = e.target.nextElementSibling.textContent;
  // console.log(nombreTarea);

  const $tituloTarea = document.querySelector('#titulo-tarea');
  $tituloTarea.innerHTML = /*html*/`<p>${nombreTarea}</p>`;

}

function tareaModoTerminada(e){
  e.target.textContent = 'Tarea Terminada';
  e.target.classList.add('btn-terminado');
}

function tareaModoProgreso(e){
  e.target.textContent = 'En Progreso...';
  e.target.classList.add('btn-progreso');
}



function limpiarInput(){
  $entradaTarea.value = '';
}

function limpiarHTML($elemento){
  while ($elemento.firstElementChild) {
    $elemento.firstElementChild.remove();
  }
}