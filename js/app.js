const agujeros = document.querySelectorAll('.agujero');
const agujerosArray = [...agujeros];
const boton = document.querySelector('#topos');
const tiempo = document.querySelector('#segundos');
const partida = document.querySelector('#partida');

let pulsado = '';
let contador = 0;
let GameOver = false;
let topo;
function dibujar() {
  topoT = setInterval(() => {
    let topo = Math.floor(Math.random() * 16);
    agujerosArray[topo].classList.add('topo');
    setTimeout(() => {
      agujerosArray[topo].classList.remove('topo');
    }, 2000);
  }, 2000);
}

function teclas(e) {
  pulsado += e.key;

  if (!GameOver) {
    if (agujerosArray[pulsado * 1 - 1]?.classList.contains('topo')) {
      agujerosArray[pulsado * 1 - 1].classList.remove('topo');
      contador++;
      boton.textContent = `TOPOS: ${contador}`;
      pulsado = '';
      document.body.style.backgroundColor = 'red';
      setTimeout(() => {
        document.body.style.backgroundColor = 'white';
      }, 20);
    } else if (pulsado.length >= 2) {
      pulsado = '';
    }
  }
}
function temporizador() {
  let contar = 30;
  let id = setInterval(() => {
    tiempo.value = --contar;
    if (contar == 0) {
      clearInterval(id);
      clearInterval(topoT);
      GameOver = true;
      boton.textContent = `ATRAPASTE ${contador} TOPOS!`;
      tiempo.value = 'El tiempo ha terminado';
    }
  }, 1000);
}
function inicio() {
  document.addEventListener('keydown', teclas);
  dibujar();
  temporizador();
}
partida.addEventListener('click', inicio);
