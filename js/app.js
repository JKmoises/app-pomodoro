const $btnAgregar = document.querySelector('#btn-agregar-tarea');
const $tareas = document.querySelector('#tareas');
const $entradaTarea = document.querySelector('#entrada-agregar');
const $temporizador = document.querySelector('#temporizador');
const $tiempo = document.querySelector('#tiempo');

document.addEventListener('DOMContentLoaded', iniciarApp());

let tareas = [];

function iniciarApp(){
  agregarTarea();
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

function iniciarTemporizador() {
  const minIniciales = 25;
  const segIniciales = 0;
  
  const temporizador = setInterval(() => {
    
    
    console.log(`${minutos}:${segundos}`);
      
  }, 1000);
}

function añadirNombreTarea(e) {
  const nombreTarea = e.target.nextElementSibling.textContent;
  // console.log(nombreTarea);

  const $tituloTarea = document.querySelector('#titulo-tarea');
  $tituloTarea.innerHTML = /*html*/`<p class="titulo-tarea">${nombreTarea}</p>`;

}

function botonModoProgreso(e){
  e.target.textContent = 'En Progreso...';
  e.target.classList.add('btn-progreso');
}

function iniciarTarea() {
  limpiarInput();

  const $botonesIniciar = document.querySelectorAll('.btn-iniciar');

  $botonesIniciar.forEach($btnIniciar => {
    $btnIniciar.addEventListener('click', e => {
      añadirNombreTarea(e);
      botonModoProgreso(e);
      // iniciarTemporizador();
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