'use strict';
// 1. CAMBIAR EL CONTENIDO: perfil.html
const botonContenido = document.querySelector('#contenido');
if (botonContenido) {
  botonContenido.addEventListener('click', () => {
    const resumen = document.querySelector('#resumen');
    resumen.textContent = 'Creo sitios con HTML, CSS y JavaScript, y uso el DOM para hacerlos interactivos.';
  });
}

// 2. MODIFICAR ESTILOS CSS: perfil.html
const color = document.querySelector('#color');
if (color) {
  color.addEventListener('input', (evento) => {
    document.querySelector('#resumen').style.color = evento.target.value;
  });
  document.querySelector('#tamano').addEventListener('input', (evento) => {
    document.querySelector('#resumen').style.fontSize = evento.target.value + 'px';
  });
}

// 3. AGREGAR Y QUITAR CLASES: experiencia.html
const destacar = document.querySelector('#destacar');
if (destacar) {
  const tabla = document.querySelector('table');
  destacar.addEventListener('click', () => {
    tabla.classList.add('destacado');
    destacar.setAttribute('aria-pressed', 'true');
  });
  document.querySelector('#quitar-destacado').addEventListener('click', () => {
    tabla.classList.remove('destacado');
    destacar.setAttribute('aria-pressed', 'false');
  });
}

// 4. CONSULTAR Y MODIFICAR ATRIBUTOS: index.html
const atributos = document.querySelector('#atributos');
if (atributos) {
  atributos.addEventListener('click', () => {
    const foto = document.querySelector('#foto');
    const anterior = foto.getAttribute('alt');
    const nuevo = 'Fotografía de stock usada en el perfil ficticio de Alex Mendoza';
    foto.setAttribute('alt', nuevo);
    document.querySelector('#estado-atributo').textContent =
      'Alt anterior: ' + anterior + '. Nuevo alt: ' + foto.getAttribute('alt');
  });
}

// 5. EVENTOS: input y keydown; también usamos click y submit
const mensaje = document.querySelector('#mensaje');
if (mensaje) {
  mensaje.addEventListener('input', () => {
    document.querySelector('#contador').textContent = mensaje.value.length + ' caracteres';
  });
  mensaje.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
      mensaje.value = '';
      document.querySelector('#contador').textContent = '0 caracteres';
    }
  });
}

// 6. CREAR, INSERTAR Y ELIMINAR ELEMENTOS: proyectos.html
const formulario = document.querySelector('#form-proyecto');
if (formulario) {
  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const campo = document.querySelector('#nombre-proyecto');
    const nombre = campo.value.trim();
    if (!nombre) {
      campo.setCustomValidity('Escribe un nombre, no solo espacios.');
      campo.reportValidity();
      return;
    }
    const tarjeta = document.createElement('article');
    tarjeta.classList.add('card', 'proyecto', 'p-4');
    const titulo = document.createElement('h2');
    titulo.textContent = nombre;
    const detalle = document.createElement('p');
    detalle.textContent = 'Proyecto agregado durante la demostración del DOM.';
    const eliminar = document.createElement('button');
    eliminar.type = 'button';
    eliminar.classList.add('btn', 'btn-outline-danger');
    eliminar.textContent = 'Eliminar este proyecto';
    eliminar.addEventListener('click', () => {
      tarjeta.remove();
      filtrarProyectos();
      document.querySelector('#aviso-proyecto').textContent = 'Proyecto eliminado.';
    });
    tarjeta.append(titulo, detalle, eliminar);
    document.querySelector('#lista-proyectos').appendChild(tarjeta);
    formulario.reset();
    filtrarProyectos();
    document.querySelector('#aviso-proyecto').textContent = 'Proyecto creado e insertado.';
    campo.focus();
  });
  document.querySelector('#nombre-proyecto').addEventListener('input', (evento) => {
    evento.target.setCustomValidity('');
  });
}

// Filtro de proyectos: evento input y atributo hidden
function filtrarProyectos() {
  const filtro = document.querySelector('#buscar').value.trim().toLocaleLowerCase('es');
  let visibles = 0;
  document.querySelectorAll('.proyecto').forEach((tarjeta) => {
    tarjeta.hidden = !tarjeta.querySelector('h2').textContent.toLocaleLowerCase('es').includes(filtro);
    if (!tarjeta.hidden) visibles++;
  });
  document.querySelector('#resultado-busqueda').textContent = visibles + ' proyectos encontrados';
}
const buscar = document.querySelector('#buscar');
if (buscar) {
  buscar.addEventListener('input', filtrarProyectos);
  filtrarProyectos();
}
