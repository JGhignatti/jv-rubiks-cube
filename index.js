import { createCube } from './cube.js';

window.addEventListener(
  'resize',
  debounce(() => {
    init(cube.state);
  }, 300),
  true,
);

const canvasEl = document.getElementById('canvas-container');

/**
 * @type {import('./cube.js').Cube}
 */
let cube;

/**
 * @param {import('./cube.js')._State} initialState
 */
function init(initialState) {
  if (!!cube) {
    cube.destroy();
  }

  cube = createCube(canvasEl, initialState, {
    speed: getSpeed(document.getElementById('speed-range').value),
  });
}

init();

document.getElementById('button-front').addEventListener('click', () => {
  cube.move('F');
});
document.getElementById('button-front-prime').addEventListener('click', () => {
  cube.move('F_PRIME');
});
document.getElementById('button-up').addEventListener('click', () => {
  cube.move('U');
});
document.getElementById('button-up-prime').addEventListener('click', () => {
  cube.move('U_PRIME');
});
document.getElementById('button-right').addEventListener('click', () => {
  cube.move('R');
});
document.getElementById('button-right-prime').addEventListener('click', () => {
  cube.move('R_PRIME');
});
document.getElementById('button-left').addEventListener('click', () => {
  cube.move('L');
});
document.getElementById('button-left-prime').addEventListener('click', () => {
  cube.move('L_PRIME');
});
document.getElementById('button-down').addEventListener('click', () => {
  cube.move('D');
});
document.getElementById('button-down-prime').addEventListener('click', () => {
  cube.move('D_PRIME');
});
document.getElementById('button-back').addEventListener('click', () => {
  cube.move('B');
});
document.getElementById('button-back-prime').addEventListener('click', () => {
  cube.move('B_PRIME');
});
document.getElementById('button-m').addEventListener('click', () => {
  cube.move('M');
});
document.getElementById('button-m-prime').addEventListener('click', () => {
  cube.move('M_PRIME');
});
document.getElementById('button-e').addEventListener('click', () => {
  cube.move('E');
});
document.getElementById('button-e-prime').addEventListener('click', () => {
  cube.move('E_PRIME');
});
document.getElementById('button-s').addEventListener('click', () => {
  cube.move('S');
});
document.getElementById('button-s-prime').addEventListener('click', () => {
  cube.move('S_PRIME');
});

document.getElementById('speed-range').addEventListener('input', (event) => {
  const value = event.target.value;

  document.getElementById('speed-range-value').innerText = value;

  cube.updateOptions({
    speed: getSpeed(value),
  });
});

document.getElementById('play-moves').addEventListener('input', (event) => {
  const value = event.target.value;
  const button = document.getElementById('button-play-moves');

  if (!value) {
    button.classList.add('btn');
    button.classList.remove('btn-confirm');
    button.classList.remove('btn-cancel');
  } else if (!/^(?:[FUDBLRMESfudblrmes]'?|\s|\n)*$/.test(event.target.value)) {
    button.classList.remove('btn');
    button.classList.remove('btn-confirm');
    button.classList.add('btn-cancel');
  } else {
    button.classList.remove('btn');
    button.classList.add('btn-confirm');
    button.classList.remove('btn-cancel');
  }
});

document
  .getElementById('button-play-moves')
  .addEventListener('click', function () {
    if (this.classList.contains('btn-confirm')) {
      const moves = parseMoves(document.getElementById('play-moves').value);

      let index = 0;
      const interval = setInterval(() => {
        if (index < moves.length) {
          cube.move(moves[index]);

          index += 1;
        } else {
          clearInterval(interval);
        }
      }, 3 * 5 * 20 + 100);
    }
  });

/**
 * @param {(...args: any[]) => void} callback
 * @param {number} wait
 *
 * @returns {(...args: any[]) => void}
 */
function debounce(callback, wait) {
  let timeoutId = null;

  return (...args) => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

/**
 * @param {number} value
 *
 * @returns {number}
 */
function getSpeed(value) {
  return 10 - (value ?? 7);
}

/**
 * @param {string} input
 *
 * @returns {import('./cube.js').Move[]}
 */
function parseMoves(input) {
  return input
    .split(/\s+/)
    .filter(Boolean)
    .map((value) => {
      return value.toUpperCase();
    })
    .map((move) => {
      switch (move) {
        case 'F':
          return 'F';
        case "F'":
          return 'F_PRIME';
        case 'U':
          return 'U';
        case "U'":
          return 'U_PRIME';
        case 'R':
          return 'R';
        case "R'":
          return 'R_PRIME';
        case 'L':
          return 'L';
        case "L'":
          return 'L_PRIME';
        case 'D':
          return 'D';
        case "D'":
          return 'D_PRIME';
        case 'B':
          return 'B';
        case "B'":
          return 'B_PRIME';
        case 'M':
          return 'M';
        case "M'":
          return 'M_PRIME';
        case 'E':
          return 'E';
        case "E'":
          return 'E_PRIME';
        case 'S':
          return 'S';
        case "S'":
          return 'S_PRIME';
        default:
          return undefined;
      }
    })
    .filter(Boolean);
}
