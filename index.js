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

// import { createSide } from "./side.js";
// import { ACTIONS, createStore } from "./store.js";

// const store = createStore({
//   front: createSide("green"),
//   up: createSide("white"),
//   right: createSide("red"),
//   left: createSide("orange"),
//   down: createSide("yellow"),
//   back: createSide("blue"),
// });

// store.dispatch(ACTIONS.INIT());

// const SIDE = 800;
// const PADDING = 32;
// const CLIENT_SIDE = SIDE - 2 * PADDING;

// const containerEl = document.getElementById("container");

// containerEl.style.width = `${SIDE}px`;
// containerEl.style.height = `${SIDE}px`;

// const SECTION_DIAMETER = (CLIENT_SIDE * 2) / 3;
// const SECTION_RADIUS = SECTION_DIAMETER / 2;
// const DELTA_RADIUS = 40;

// const INTERSECTION_DIAMETER = 8;
// const INTERSECTION_RADIUS = INTERSECTION_DIAMETER / 2;

// const SQUARE_DIAMETER = 24;
// const SQUARE_RADIUS = SQUARE_DIAMETER / 2;

// const STORE = store();

// const ACTIONS = {
//   F: 0,
//   F_PRIME: 1,
//   U: 2,
//   U_PRIME: 3,
//   R: 4,
//   R_PRIME: 5,
//   L: 6,
//   L_PRIME: 7,
//   D: 8,
//   D_PRIME: 9,
//   B: 10,
//   B_PRIME: 11,
// };

// const sectionsGuidelines = initSectionsGuidelines();
// const intersectionPoints = initIntersectionPoints();

// drawState();

// /**
//  * @typedef {Object} Guideline
//  * @property {number} x - The circle center's X coordinate
//  * @property {number} y - The circle center's Y coordinate
//  * @property {number} r - The circle's radius
//  * @property {number} d - The circle's diameter
//  * @property {0 | 1 | 2} ring - The circle's ring number
//  * @property {number} top - The circle's distance from top
//  * @property {number} right - The circle's distance from right
//  * @property {number} bottom - The circle's distance from bottom
//  * @property {number} left - The circle's distance from left
//  *
//  * @typedef {Object} SectionsGuidelines
//  * @property {[Guideline, Guideline, Guideline]} top - The top section guidelines
//  * @property {[Guideline, Guideline, Guideline]} right - The right section guidelines
//  * @property {[Guideline, Guideline, Guideline]} left - The left section guidelines
//  *
//  * @returns {SectionsGuidelines}
//  */
// function initSectionsGuidelines() {
//   function getSectionGuidelines(x, y) {
//     return [0, 1, 2].map((ring) => {
//       const r = SECTION_RADIUS - ring * DELTA_RADIUS;

//       return {
//         x,
//         y,
//         r,
//         d: 2 * r,
//         ring,
//         top: y - r,
//         right: SIDE - x - r,
//         bottom: SIDE - y - r,
//         left: x - r,
//       };
//     });
//   }

//   const sectionsGuidelines = {
//     top: getSectionGuidelines(SIDE / 2, PADDING + SECTION_RADIUS),
//     right: getSectionGuidelines(
//       PADDING + SECTION_DIAMETER,
//       PADDING + SECTION_DIAMETER
//     ),
//     left: getSectionGuidelines(
//       PADDING + SECTION_RADIUS,
//       PADDING + SECTION_DIAMETER
//     ),
//   };

//   [sectionsGuidelines.top, sectionsGuidelines.right, sectionsGuidelines.left]
//     .flat()
//     .forEach((guideline) => {
//       const guidelineEl = document.createElement("div");

//       guidelineEl.style.position = "absolute";
//       guidelineEl.style.top = `${guideline.top}px`;
//       guidelineEl.style.left = `${guideline.left}px`;
//       guidelineEl.style.width = `${guideline.d}px`;
//       guidelineEl.style.height = `${guideline.d}px`;

//       guidelineEl.style.border = "1px solid var(--slate-700)";
//       guidelineEl.style.borderRadius = "100%";
//       guidelineEl.style.boxSizing = "border-box";

//       containerEl.appendChild(guidelineEl);
//     });

//   return sectionsGuidelines;
// }

// /**
//  * @typedef {Object} Intersection
//  * @property {number} x - The intersection's X coordinate
//  * @property {number} y - The intersection's Y coordinate
//  * @property {number} index - The intersection index according to a cube's face
//  *
//  * @typedef {Object} FacesIntersections
//  * @property {Intersection[]} front - Intersection points for the front face
//  * @property {Intersection[]} up - Intersection points for the up face
//  * @property {Intersection[]} right - Intersection points for the right face
//  * @property {Intersection[]} left - Intersection points for the left face
//  * @property {Intersection[]} down - Intersection points for the down face
//  * @property {Intersection[]} back - Intersection points for the back face
//  *
//  * @returns {FacesIntersections}
//  */
// function initIntersectionPoints() {
//   /**
//    * @type {FacesIntersections}
//    */
//   const intersections = {
//     front: [],
//     up: [],
//     right: [],
//     left: [],
//     down: [],
//     back: [],
//   };

//   sectionsGuidelines.top.forEach((top) => {
//     sectionsGuidelines.right.forEach((right) => {
//       const [point1, point2] = findCirclesIntersections(
//         top.x,
//         top.y,
//         top.r,
//         right.x,
//         right.y,
//         right.r
//       );

//       const point1IsFront = point1.x < point2.x;

//       const indexFront = 8 - 3 * top.ring - (2 - right.ring);
//       const indexBack = 8 - 3 * top.ring - right.ring;

//       intersections.front.push({
//         x: (point1IsFront ? point1 : point2).x,
//         y: (point1IsFront ? point1 : point2).y,
//         index: indexFront,
//       });
//       intersections.back.push({
//         x: (point1IsFront ? point2 : point1).x,
//         y: (point1IsFront ? point2 : point1).y,
//         index: indexBack,
//       });
//     });
//   });

//   sectionsGuidelines.top.forEach((top) => {
//     sectionsGuidelines.left.forEach((left) => {
//       const [point1, point2] = findCirclesIntersections(
//         top.x,
//         top.y,
//         top.r,
//         left.x,
//         left.y,
//         left.r
//       );

//       const point1IsLeft = point1.x < point2.x;

//       const indexLeft = 8 - 3 * top.ring - (2 - left.ring);
//       const indexRight = 8 - 3 * top.ring - left.ring;

//       intersections.left.push({
//         x: (point1IsLeft ? point1 : point2).x,
//         y: (point1IsLeft ? point1 : point2).y,
//         index: indexLeft,
//       });
//       intersections.right.push({
//         x: (point1IsLeft ? point2 : point1).x,
//         y: (point1IsLeft ? point2 : point1).y,
//         index: indexRight,
//       });
//     });
//   });

//   sectionsGuidelines.right.forEach((right) => {
//     sectionsGuidelines.left.forEach((left) => {
//       const [point1, point2] = findCirclesIntersections(
//         right.x,
//         right.y,
//         right.r,
//         left.x,
//         left.y,
//         left.r
//       );

//       const point1IsUp = point1.y < point2.y;

//       const indexUp = 3 * left.ring + right.ring;
//       const indexDown = 3 * (2 - left.ring) + right.ring;

//       intersections.up.push({
//         x: (point1IsUp ? point1 : point2).x,
//         y: (point1IsUp ? point1 : point2).y,
//         index: indexUp,
//       });
//       intersections.down.push({
//         x: (point1IsUp ? point2 : point1).x,
//         y: (point1IsUp ? point2 : point1).y,
//         index: indexDown,
//       });
//     });
//   });

//   intersections.front = intersections.front.sort((a, b) => a.index - b.index);
//   intersections.back = intersections.back.sort((a, b) => a.index - b.index);
//   intersections.right = intersections.right.sort((a, b) => a.index - b.index);
//   intersections.left = intersections.left.sort((a, b) => a.index - b.index);
//   intersections.up = intersections.up.sort((a, b) => a.index - b.index);
//   intersections.down = intersections.down.sort((a, b) => a.index - b.index);

//   return intersections;
// }

// /**
//  * @typedef {Object} Point
//  * @property {number} x - The X coordinate
//  * @property {number} y - The Y coordinate
//  *
//  * @param {number} x0 - The first circle center's X coordinate
//  * @param {number} y0 - The first circle center's Y coordinate
//  * @param {number} r0 - The first circle's radius
//  * @param {number} x1 - The second circle center's X coordinate
//  * @param {number} y1 - The second circle center's Y coordinate
//  * @param {number} r1 - The second circle's radius
//  *
//  * @returns {[Point, Point]} A tuple with the intersection points
//  */
// function findCirclesIntersections(x0, y0, r0, x1, y1, r1) {
//   const deltaCenters = [x1 - x0, y1 - y0];
//   const deltaCentersMod = Math.sqrt(
//     deltaCenters[1] * deltaCenters[1] + deltaCenters[0] * deltaCenters[0]
//   );

//   if (deltaCentersMod > r0 + r1 || deltaCentersMod < Math.abs(r0 - r1)) {
//     return null;
//   }

//   const point0ToMidwayPointDistance =
//     (r0 * r0 - r1 * r1 + deltaCentersMod * deltaCentersMod) /
//     (2.0 * deltaCentersMod);

//   const midwayPoint = [
//     x0 + (deltaCenters[0] * point0ToMidwayPointDistance) / deltaCentersMod,
//     y0 + (deltaCenters[1] * point0ToMidwayPointDistance) / deltaCentersMod,
//   ];

//   const midwayPointToIntersectionPointDistance = Math.sqrt(
//     r0 * r0 - point0ToMidwayPointDistance * point0ToMidwayPointDistance
//   );

//   const midwayPointToIntersectionPoint = [
//     -deltaCenters[1] *
//       (midwayPointToIntersectionPointDistance / deltaCentersMod),
//     deltaCenters[0] *
//       (midwayPointToIntersectionPointDistance / deltaCentersMod),
//   ];

//   return [
//     {
//       x: midwayPoint[0] + midwayPointToIntersectionPoint[0],
//       y: midwayPoint[1] + midwayPointToIntersectionPoint[1],
//     },
//     {
//       x: midwayPoint[0] - midwayPointToIntersectionPoint[0],
//       y: midwayPoint[1] - midwayPointToIntersectionPoint[1],
//     },
//   ];
// }

// function drawState() {
//   STORE.state.front.forEach((square, index) => {
//     const intersection = intersectionPoints.front[index];

//     square.el.style.top = `${intersection.y - SQUARE_RADIUS}px`;
//     square.el.style.left = `${intersection.x - SQUARE_RADIUS}px`;
//   });
//   STORE.state.up.forEach((square, index) => {
//     const intersection = intersectionPoints.up[index];

//     square.el.style.top = `${intersection.y - SQUARE_RADIUS}px`;
//     square.el.style.left = `${intersection.x - SQUARE_RADIUS}px`;
//   });
//   STORE.state.right.forEach((square, index) => {
//     const intersection = intersectionPoints.right[index];

//     square.el.style.top = `${intersection.y - SQUARE_RADIUS}px`;
//     square.el.style.left = `${intersection.x - SQUARE_RADIUS}px`;
//   });
//   STORE.state.left.forEach((square, index) => {
//     const intersection = intersectionPoints.left[index];

//     square.el.style.top = `${intersection.y - SQUARE_RADIUS}px`;
//     square.el.style.left = `${intersection.x - SQUARE_RADIUS}px`;
//   });
//   STORE.state.down.forEach((square, index) => {
//     const intersection = intersectionPoints.down[index];

//     square.el.style.top = `${intersection.y - SQUARE_RADIUS}px`;
//     square.el.style.left = `${intersection.x - SQUARE_RADIUS}px`;
//   });
//   STORE.state.back.forEach((square, index) => {
//     const intersection = intersectionPoints.back[index];

//     square.el.style.top = `${intersection.y - SQUARE_RADIUS}px`;
//     square.el.style.left = `${intersection.x - SQUARE_RADIUS}px`;
//   });
// }

// /**
//  * @typedef {Object} Square
//  * @property {'green' | 'white' | 'red' | 'orange' | 'yellow' | 'blue'} color - The square color name
//  * @property {string} colorCSSVariable - The square color CSS variable
//  * @property {HTMLDivElement} el - The square element
//  *
//  * @typedef {Object} _State
//  * @property {Square[]} front - The front side
//  * @property {Square[]} up - The up side
//  * @property {Square[]} right - The right side
//  * @property {Square[]} left - The left side
//  * @property {Square[]} down - The down side
//  * @property {Square[]} back - The back side
//  *
//  * @typedef {Object} State
//  * @property {_State} state - The state object
//  * @property {(action: number) => void} dispatch - The action dispatcher function
//  *
//  * @returns {State}
//  */
// function store() {
//   let _state = {
//     front: buildSide("green"),
//     up: buildSide("white"),
//     right: buildSide("red"),
//     left: buildSide("orange"),
//     down: buildSide("yellow"),
//     back: buildSide("blue"),
//   };

//   /**
//    * @param {'green' | 'white' | 'red' | 'orange' | 'yellow' | 'blue'} color - The face color
//    *
//    * @returns {Square[]}
//    */
//   function buildSide(color) {
//     return Array(9)
//       .fill({
//         color,
//         colorCSSVariable: getColorAsCSSVariable(color),
//       })
//       .map((square) => {
//         const squareEl = document.createElement("div");

//         squareEl.style.position = "absolute";
//         squareEl.style.width = `${SQUARE_DIAMETER}px`;
//         squareEl.style.height = `${SQUARE_DIAMETER}px`;

//         squareEl.style.backgroundColor = square.colorCSSVariable;
//         squareEl.style.outline = "1px solid var(--slate-300)";
//         squareEl.style.outlineOffset = "2px";
//         squareEl.style.borderRadius = "100%";

//         squareEl.style.zIndex = 1;

//         containerEl.appendChild(squareEl);

//         return {
//           ...square,
//           el: squareEl,
//         };
//       });
//   }

//   function getColorAsCSSVariable(color) {
//     switch (color) {
//       case "green":
//         return `var(--${color}-500)`;
//       case "white":
//         return `var(--${color})`;
//       case "red":
//         return `var(--${color}-500)`;
//       case "orange":
//         return `var(--${color}-500)`;
//       case "yellow":
//         return `var(--${color}-400)`;
//       case "blue":
//         return `var(--${color}-500)`;
//     }
//   }

//   /**
//    * @param {Square[]} squares - The side to query from
//    * @param {number} row - The target row
//    *
//    * @returns {Square[]}
//    */
//   function getSideRow(squares, row) {
//     return squares.slice(3 * row, 3 * row + 3);
//   }

//   /**
//    * @param {Square[]} squares - The side to query from
//    * @param {number} col - The target column
//    *
//    * @returns {Square[]}
//    */
//   function getSideCol(squares, col) {
//     switch (col) {
//       case 0:
//         return [squares[0], squares[3], squares[6]];
//       case 1:
//         return [squares[1], squares[4], squares[7]];
//       case 2:
//         return [squares[2], squares[5], squares[8]];
//     }
//   }

//   function replaceSideRow(squares, replace, row) {
//     switch (row) {
//       case 0:
//         return [...replace, ...squares.slice(3)];
//       case 1:
//         return [...squares.slice(0, 3), ...replace, ...squares.slice(6)];
//       case 2:
//         return [...squares.slice(0, 6), ...replace];
//     }
//   }

//   function replaceSideCol(squares, replace, col) {
//     switch (col) {
//       case 0:
//         return [
//           [replace[0], squares[1], squares[2]],
//           [replace[1], squares[4], squares[5]],
//           [replace[2], squares[7], squares[8]],
//         ].flat();
//       case 1:
//         return [
//           [squares[0], replace[0], squares[2]],
//           [squares[3], replace[1], squares[5]],
//           [squares[6], replace[2], squares[8]],
//         ].flat();
//       case 2:
//         return [
//           [squares[0], squares[1], replace[0]],
//           [squares[3], squares[4], replace[1]],
//           [squares[6], squares[7], replace[2]],
//         ].flat();
//     }
//   }

//   function rotateSide(squares, clockwise = true) {
//     if (clockwise) {
//       return [
//         [squares[6], squares[3], squares[0]],
//         [squares[7], squares[4], squares[1]],
//         [squares[8], squares[5], squares[2]],
//       ].flat();
//     } else {
//       return [
//         [squares[2], squares[5], squares[8]],
//         [squares[1], squares[4], squares[7]],
//         [squares[0], squares[3], squares[6]],
//       ].flat();
//     }
//   }

//   /**
//    * @param {_State} s - The current state
//    * @param {number} action - The action
//    *
//    * @returns {_State}
//    */
//   function reducer(s, action) {
//     switch (action) {
//       case ACTIONS.F: {
//         const tmp = getSideRow(s.up, 2);

//         return {
//           ...s,
//           up: replaceSideRow(s.up, getSideCol(s.left, 2).reverse(), 2),
//           left: replaceSideCol(s.left, getSideRow(s.down, 0), 2),
//           down: replaceSideRow(s.down, getSideCol(s.right, 0).reverse(), 0),
//           right: replaceSideCol(s.right, tmp, 0),
//           front: rotateSide(s.front),
//         };
//       }
//       case ACTIONS.F_PRIME:
//         break;
//       case ACTIONS.U: {
//         const tmp = getSideRow(s.front, 0);

//         return {
//           ...s,
//           front: replaceSideRow(s.front, getSideRow(s.right, 0), 0),
//           right: replaceSideRow(s.right, getSideRow(s.back, 0), 0),
//           back: replaceSideRow(s.back, getSideRow(s.left, 0), 0),
//           left: replaceSideRow(s.left, tmp, 0),
//           up: rotateSide(s.up),
//         };
//       }
//       case ACTIONS.U_PRIME:
//         break;
//       case ACTIONS.R: {
//         const tmp = getSideCol(s.front, 2);

//         return {
//           ...s,
//           front: replaceSideCol(s.front, getSideCol(s.down, 2), 2),
//           down: replaceSideCol(s.down, getSideCol(s.back, 0).reverse(), 2),
//           back: replaceSideCol(s.back, getSideCol(s.up, 2).reverse(), 0),
//           up: replaceSideCol(s.up, tmp, 2),
//           right: rotateSide(s.right),
//         };
//       }
//       case ACTIONS.R_PRIME:
//         break;
//       case ACTIONS.L: {
//         const tmp = getSideCol(s.front, 0);

//         return {
//           ...s,
//           front: replaceSideCol(s.front, getSideCol(s.up, 0), 0),
//           up: replaceSideCol(s.up, getSideCol(s.back, 2).reverse(), 0),
//           back: replaceSideCol(s.back, getSideCol(s.down, 0).reverse(), 2),
//           down: replaceSideCol(s.down, tmp, 0),
//           left: rotateSide(s.left),
//         };
//       }
//       case ACTIONS.L_PRIME:
//         break;
//       case ACTIONS.D: {
//         const tmp = getSideRow(s.front, 2);

//         return {
//           ...s,
//           front: replaceSideRow(s.front, getSideRow(s.left, 2), 2),
//           left: replaceSideRow(s.left, getSideRow(s.back, 2), 2),
//           back: replaceSideRow(s.back, getSideRow(s.right, 2), 2),
//           right: replaceSideRow(s.right, tmp, 2),
//           down: rotateSide(s.down),
//         };
//       }
//       case ACTIONS.D_PRIME:
//         break;
//       case ACTIONS.B: {
//         const tmp = getSideRow(s.up, 0);

//         return {
//           ...s,
//           up: replaceSideRow(s.up, getSideCol(s.right, 2), 0),
//           right: replaceSideCol(s.right, getSideRow(s.down, 2).reverse(), 2),
//           down: replaceSideRow(s.down, getSideCol(s.left, 0), 2),
//           left: replaceSideCol(s.left, tmp, 0),
//           back: rotateSide(s.back),
//         };
//       }
//       case ACTIONS.B_PRIME:
//         break;
//     }
//   }

//   return {
//     get state() {
//       return _state;
//     },
//     dispatch(action) {
//       _state = reducer(_state, action);
//     },
//   };
// }

// const frontButton = document.getElementById("button-front");
// const frontPrimeButton = document.getElementById("button-front-prime");
// const upButton = document.getElementById("button-up");
// const upPrimeButton = document.getElementById("button-up-prime");
// const rightButton = document.getElementById("button-right");
// const rightPrimeButton = document.getElementById("button-right-prime");
// const leftButton = document.getElementById("button-left");
// const leftPrimeButton = document.getElementById("button-left-prime");
// const downButton = document.getElementById("button-down");
// const downPrimeButton = document.getElementById("button-down-prime");
// const backButton = document.getElementById("button-back");
// const backPrimeButton = document.getElementById("button-back-prime");

// frontButton.addEventListener("click", () => {
//   STORE.dispatch(ACTIONS.F);
//   drawState();
// });

// frontPrimeButton.addEventListener("click", () => {
//   STORE.dispatch(ACTIONS.F);
//   STORE.dispatch(ACTIONS.F);
//   STORE.dispatch(ACTIONS.F);
//   drawState();
// });

// upButton.addEventListener("click", () => {
//   STORE.dispatch(ACTIONS.U);
//   drawState();
// });

// upPrimeButton.addEventListener("click", () => {
//   STORE.dispatch(ACTIONS.U);
//   STORE.dispatch(ACTIONS.U);
//   STORE.dispatch(ACTIONS.U);
//   drawState();
// });

// rightButton.addEventListener("click", () => {
//   STORE.dispatch(ACTIONS.R);
//   drawState();
// });

// rightPrimeButton.addEventListener("click", () => {
//   STORE.dispatch(ACTIONS.R);
//   STORE.dispatch(ACTIONS.R);
//   STORE.dispatch(ACTIONS.R);
//   drawState();
// });

// leftButton.addEventListener("click", () => {
//   STORE.dispatch(ACTIONS.L);
//   drawState();
// });

// leftPrimeButton.addEventListener("click", () => {
//   STORE.dispatch(ACTIONS.L);
//   STORE.dispatch(ACTIONS.L);
//   STORE.dispatch(ACTIONS.L);
//   drawState();
// });

// downButton.addEventListener("click", () => {
//   STORE.dispatch(ACTIONS.D);
//   drawState();
// });

// downPrimeButton.addEventListener("click", () => {
//   STORE.dispatch(ACTIONS.D);
//   STORE.dispatch(ACTIONS.D);
//   STORE.dispatch(ACTIONS.D);
//   drawState();
// });

// backButton.addEventListener("click", () => {
//   STORE.dispatch(ACTIONS.B);
//   drawState();
// });

// backPrimeButton.addEventListener("click", () => {
//   STORE.dispatch(ACTIONS.B);
//   STORE.dispatch(ACTIONS.B);
//   STORE.dispatch(ACTIONS.B);
//   drawState();
// });
