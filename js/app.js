const $btnAgregar = document.querySelector('#btn-agregar-tarea');
const $tareas = document.querySelector('#tareas');
const $entradaTarea = document.querySelector('#entrada-agregar');
const $temporizador = document.querySelector('#temporizador');
const $tiempo = document.querySelector('#tiempo');

let tareas = [];
let minutos = 0,
  segundos = 0;

document.addEventListener('DOMContentLoaded', iniciarApp());


function iniciarApp(){
  agregarTarea();
  mostrarTiempo();
}


function mostrarTarea(e) {
  
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

function agregarTarea() {

  $btnAgregar.addEventListener('click', mostrarTarea);
  
  $entradaTarea.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;

    mostrarTarea();

  });
  
}

function mostrarTiempo() {
  minutos = minutos < 10 ? `0${minutos}` : minutos;
  segundos = segundos < 10 ? `0${segundos}` : segundos;
  // console.log(minutos,segundos);


  $tiempo.innerHTML = `${minutos}:${segundos}`;
}

function iniciarDescanso() {
  const $tituloTarea = document.querySelector('#titulo-tarea > p');
  $tituloTarea.textContent = 'Descanso';

  let minDescanso = 3,
    segDescanso = 5;
  
  const temporizadorDescanso = setInterval(() => {
    segDescanso--;

    minDescanso = minDescanso < 10 ? `0${minDescanso}` : minDescanso;
    segDescanso = segDescanso < 10 ? `0${segDescanso}` : segDescanso;

    $tiempo.innerHTML = `${minDescanso}:${segDescanso}`;

    minDescanso = parseInt(minDescanso);
    segDescanso = parseInt(segDescanso);

    console.log(minDescanso, segDescanso);

    if (segDescanso === 0 && minDescanso === 0) {
      clearInterval(temporizadorDescanso);
    }

    if (segDescanso === 0) {
      segDescanso = 5;
      minDescanso--;
    }
  },1000);


  

}

function iniciarTemporizador(e) {
  minutos = 1;
  segundos = 5;

  
  const temporizador = setInterval(() => {
    segundos--;

    mostrarTiempo();
    minutos = parseInt(minutos);
    segundos = parseInt(segundos);
    // console.log(minutos,segundos);
    
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

function limpiarInput(){
  $entradaTarea.value = '';
}

function limpiarHTML($elemento){
  while ($elemento.firstElementChild) {
    $elemento.firstElementChild.remove();
  }
}