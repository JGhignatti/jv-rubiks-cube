import { createCube } from './cube.js';

const containerEl = document.getElementById('container');

containerEl.style.width = '800px';
containerEl.style.height = '800px';

const cube = createCube(containerEl);

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
