/**
 * @typedef {Object} Cube
 * @property {_State} state
 * @property {(action: Move) => void} move
 * @property {() => void} destroy
 * @property {(newOptions: Partial<CubeOptions>) => void} updateOptions
 */

/**
 * @typedef {Object} _State
 * @property {Side} front
 * @property {Side} up
 * @property {Side} right
 * @property {Side} left
 * @property {Side} down
 * @property {Side} back
 */

/**
 * @typedef {_Move | `${_Move}_PRIME`} Move
 * @typedef {'F' | 'U' | 'R' | 'L' | 'D' | 'B' | 'M' | 'E' | 'S'} _Move
 */

/**
 * @typedef {Object} CubeOptions
 * @property {number} speed
 */

/**
 * @typedef {Object} Consts
 * @property {number} SIDE
 * @property {number} PADDING
 * @property {number} SQUARE_DIAMETER
 * @property {number} SPEED
 */

/**
 * @typedef {Object} Planes
 * @property {Guideline[]} top
 * @property {Guideline[]} right
 * @property {Guideline[]} left
 */

/**
 * @typedef {Object} Guideline
 * @property {number} x
 * @property {number} y
 * @property {number} r
 * @property {number} d
 * @property {0 | 1 | 2} ring
 * @property {number} top
 * @property {number} left
 */

/**
 * @param {HTMLDivElement} container
 * @param {_State} [initialState]
 * @param {CubeOptions} [options]
 *
 * @returns {Cube}
 */
export function createCube(canvasEl, initialState, options) {
  let CONSTS = buildConsts();

  const planes = getPlanes(canvasEl.clientWidth);
  drawPlanes(canvasEl, planes);
  const intersections = getIntersections(planes);

  let _state = {
    front: createSide(
      initialState?.front?.squares.map((square) => square.color) || 'green',
      CONSTS.SQUARE_DIAMETER,
    ),
    up: createSide(
      initialState?.up?.squares.map((square) => square.color) || 'white',
      CONSTS.SQUARE_DIAMETER,
    ),
    right: createSide(
      initialState?.right?.squares.map((square) => square.color) || 'red',
      CONSTS.SQUARE_DIAMETER,
    ),
    left: createSide(
      initialState?.left?.squares.map((square) => square.color) || 'orange',
      CONSTS.SQUARE_DIAMETER,
    ),
    down: createSide(
      initialState?.down?.squares.map((square) => square.color) || 'yellow',
      CONSTS.SQUARE_DIAMETER,
    ),
    back: createSide(
      initialState?.back?.squares.map((square) => square.color) || 'blue',
      CONSTS.SQUARE_DIAMETER,
    ),
  };

  Object.entries(_state).forEach(([side, value]) => {
    value.squares.forEach((square, index) => {
      const intersection = intersections[side][index];

      square.moveTo(intersection.x, intersection.y);

      canvasEl.appendChild(square.el);
    });
  });

  let _moving = false;

  /**
   * @param {_State} state
   * @param {Move} action
   *
   * @returns {_State}
   */
  function reducer(state, action) {
    switch (action) {
      case 'F': {
        const tmp = state.up.getRow(2);

        state.up.replaceRow(state.left.getCol(2), 2, true);
        state.left.replaceCol(state.down.getRow(0), 2);
        state.down.replaceRow(state.right.getCol(0), 0, true);
        state.right.replaceCol(tmp, 0);
        state.front.rotate();

        return state;
      }
      case 'U': {
        const tmp = state.front.getRow(0);

        state.front.replaceRow(state.right.getRow(0), 0);
        state.right.replaceRow(state.back.getRow(0), 0);
        state.back.replaceRow(state.left.getRow(0), 0);
        state.left.replaceRow(tmp, 0);
        state.up.rotate();

        return state;
      }
      case 'R': {
        const tmp = state.front.getCol(2);

        state.front.replaceCol(state.down.getCol(2), 2);
        state.down.replaceCol(state.back.getCol(0), 2, true);
        state.back.replaceCol(state.up.getCol(2), 0, true);
        state.up.replaceCol(tmp, 2);
        state.right.rotate();

        return state;
      }
      case 'L': {
        const tmp = state.front.getCol(0);

        state.front.replaceCol(state.up.getCol(0), 0);
        state.up.replaceCol(state.back.getCol(2), 0, true);
        state.back.replaceCol(state.down.getCol(0), 2, true);
        state.down.replaceCol(tmp, 0);
        state.left.rotate();

        return state;
      }
      case 'D': {
        const tmp = state.front.getRow(2);

        state.front.replaceRow(state.left.getRow(2), 2);
        state.left.replaceRow(state.back.getRow(2), 2);
        state.back.replaceRow(state.right.getRow(2), 2);
        state.right.replaceRow(tmp, 2);
        state.down.rotate();

        return state;
      }
      case 'B': {
        const tmp = state.up.getRow(0);

        state.up.replaceRow(state.right.getCol(2), 0);
        state.right.replaceCol(state.down.getRow(2), 2, true);
        state.down.replaceRow(state.left.getCol(0), 2);
        state.left.replaceCol(tmp, 0, true);
        state.back.rotate();

        return state;
      }
      case 'M': {
        const tmp = state.front.getCol(1);

        state.front.replaceCol(state.up.getCol(1), 1);
        state.up.replaceCol(state.back.getCol(1), 1, true);
        state.back.replaceCol(state.down.getCol(1), 1, true);
        state.down.replaceCol(tmp, 1);

        return state;
      }
      case 'E': {
        const tmp = state.front.getRow(1);

        state.front.replaceRow(state.left.getRow(1), 1);
        state.left.replaceRow(state.back.getRow(1), 1);
        state.back.replaceRow(state.right.getRow(1), 1);
        state.right.replaceRow(tmp, 1);

        return state;
      }
      case 'S': {
        const tmp = state.up.getRow(1);

        state.up.replaceRow(state.left.getCol(1), 1, true);
        state.left.replaceCol(state.down.getRow(1), 1);
        state.down.replaceRow(state.right.getCol(1), 1, true);
        state.right.replaceCol(tmp, 1);

        return state;
      }
      case 'F_PRIME': {
        const tmp = state.up.getRow(2);

        state.up.replaceRow(state.right.getCol(0), 2);
        state.right.replaceCol(state.down.getRow(0), 0, true);
        state.down.replaceRow(state.left.getCol(2), 0);
        state.left.replaceCol(tmp, 2, true);
        state.front.rotate(false);

        return state;
      }
      case 'U_PRIME': {
        const tmp = state.front.getRow(0);

        state.front.replaceRow(state.left.getRow(0), 0);
        state.left.replaceRow(state.back.getRow(0), 0);
        state.back.replaceRow(state.right.getRow(0), 0);
        state.right.replaceRow(tmp, 0);
        state.up.rotate(false);

        return state;
      }
      case 'R_PRIME': {
        const tmp = state.front.getCol(2);

        state.front.replaceCol(state.up.getCol(2), 2);
        state.up.replaceCol(state.back.getCol(0), 2, true);
        state.back.replaceCol(state.down.getCol(2), 0, true);
        state.down.replaceCol(tmp, 2);
        state.right.rotate(false);

        return state;
      }
      case 'L_PRIME': {
        const tmp = state.front.getCol(0);

        state.front.replaceCol(state.down.getCol(0), 0);
        state.down.replaceCol(state.back.getCol(2), 0, true);
        state.back.replaceCol(state.up.getCol(0), 2, true);
        state.up.replaceCol(tmp, 0);
        state.left.rotate(false);

        return state;
      }
      case 'D_PRIME': {
        const tmp = state.front.getRow(2);

        state.front.replaceRow(state.right.getRow(2), 2);
        state.right.replaceRow(state.back.getRow(2), 2);
        state.back.replaceRow(state.left.getRow(2), 2);
        state.left.replaceRow(tmp, 2);
        state.down.rotate(false);

        return state;
      }
      case 'B_PRIME': {
        const tmp = state.up.getRow(0);

        state.up.replaceRow(state.left.getCol(0), 0, true);
        state.left.replaceCol(state.down.getRow(2), 0);
        state.down.replaceRow(state.right.getCol(2), 2, true);
        state.right.replaceCol(tmp, 2);
        state.back.rotate(false);

        return state;
      }
      case 'M_PRIME': {
        const tmp = state.front.getCol(1);

        state.front.replaceCol(state.down.getCol(1), 1);
        state.down.replaceCol(state.back.getCol(1), 1, true);
        state.back.replaceCol(state.up.getCol(1), 1, true);
        state.up.replaceCol(tmp, 1);

        return state;
      }
      case 'E_PRIME': {
        const tmp = state.front.getRow(1);

        state.front.replaceRow(state.right.getRow(1), 1);
        state.right.replaceRow(state.back.getRow(1), 1);
        state.back.replaceRow(state.left.getRow(1), 1);
        state.left.replaceRow(tmp, 1);

        return state;
      }
      case 'S_PRIME': {
        const tmp = state.up.getRow(1);

        state.up.replaceRow(state.right.getCol(1), 1);
        state.right.replaceCol(state.down.getRow(1), 1, true);
        state.down.replaceRow(state.left.getCol(1), 1);
        state.left.replaceCol(tmp, 1, true);

        return state;
      }
      default:
        return state;
    }
  }

  /**
   * @param {_State} state
   */
  function tween(state) {
    const modified = [];

    Object.entries(state).forEach(([side, value]) => {
      value.squares.forEach((square, index) => {
        const intersection = intersections[side][index];
        const squareComputedStyleMap = square.el.computedStyleMap();
        const squareRadius = CONSTS.SQUARE_DIAMETER / 2;

        if (
          Math.abs(
            squareComputedStyleMap.get('left').value +
              squareRadius -
              intersection.x,
          ) >= 0.5
        ) {
          const fromPoint = {
            x: squareComputedStyleMap.get('left').value + squareRadius,
            y: squareComputedStyleMap.get('top').value + squareRadius,
          };
          const toPoint = {
            x: intersection.x,
            y: intersection.y,
          };

          const fromSide = Object.entries(intersections).find(([_, value]) => {
            return value.some((int) => {
              return (
                Math.abs(fromPoint.x - int.x) <= 0.5 &&
                Math.abs(fromPoint.y - int.y) <= 0.5
              );
            });
          })?.[0];

          const [planeKey, arc] = fromToSideToPlaneAndArc(fromSide, side);

          modified.push({
            square,
            planeKey,
            arc,
            point: {
              from: fromPoint,
              to: toPoint,
            },
          });
        }
      });
    });

    const stepsSize = CONSTS.SPEED === 0 ? 0 : 20;
    const steps = modified.map(({ square, planeKey, arc, point }) => {
      if (!planeKey) {
        const deltaX = point.to.x - point.from.x;
        const deltaY = point.to.y - point.from.y;

        const stepX = deltaX / stepsSize;
        const stepY = deltaY / stepsSize;

        return {
          square,
          steps: [
            ...Array(stepsSize)
              .fill(0)
              .map((_, index) => {
                return {
                  x: point.from.x + stepX * index,
                  y: point.from.y + stepY * index,
                };
              }),
            point.to,
          ],
        };
      }

      const plane = planes[planeKey];

      const center = {
        x: plane[0].x,
        y: plane[0].y,
      };
      const r = Math.hypot(point.to.x - center.x, point.to.y - center.y);
      const theta1 = Math.atan2(
        point.from.y - center.y,
        point.from.x - center.x,
      );
      const theta2 = Math.atan2(point.to.y - center.y, point.to.x - center.x);

      const deltaThetaShort = Math.atan2(
        Math.sin(theta2 - theta1),
        Math.cos(theta2 - theta1),
      );
      const deltaThetaLong =
        deltaThetaShort - 2 * Math.PI * Math.sign(deltaThetaShort);

      return {
        square,
        steps: [
          ...Array(stepsSize)
            .fill(0)
            .map((_, index, arr) => {
              const total = arr.length;

              const t = index / total;

              const deltaTheta =
                arc === 'short' ? deltaThetaShort : deltaThetaLong;

              return {
                x: center.x + r * Math.cos(theta1 + t * deltaTheta),
                y: center.y + r * Math.sin(theta1 + t * deltaTheta),
              };
            }),
          point.to,
        ],
      };
    });

    _moving = true;

    let stepCounter = 0;
    const interval = setInterval(() => {
      if (stepCounter < stepsSize + 1) {
        steps.forEach(({ square, steps }) => {
          square.moveTo(steps[stepCounter].x, steps[stepCounter].y);
        });

        stepCounter++;
      } else {
        _moving = false;

        clearInterval(interval);
      }
    }, CONSTS.SPEED * 5);
  }

  /**
   * @returns {Consts}
   */
  function buildConsts() {
    const sideSize = canvasEl.clientWidth;

    let squareDiameter = 8;
    if (sideSize >= 350) {
      squareDiameter = 10;
    }
    if (sideSize >= 400) {
      squareDiameter = 12;
    }
    if (sideSize >= 450) {
      squareDiameter = 14;
    }
    if (sideSize >= 500) {
      squareDiameter = 16;
    }
    if (sideSize >= 580) {
      squareDiameter = 18;
    }
    if (sideSize >= 630) {
      squareDiameter = 20;
    }
    if (sideSize >= 700) {
      squareDiameter = 22;
    }
    if (sideSize >= 750) {
      squareDiameter = 24;
    }

    return {
      SIDE: sideSize,
      PADDING: 1.5 * squareDiameter,
      SQUARE_DIAMETER: squareDiameter,
      SPEED: options?.speed ?? 3,
    };
  }

  /**
   * @returns {Planes}
   */
  function getPlanes() {
    const CLIENT_SIDE = CONSTS.SIDE - 2 * CONSTS.PADDING;
    const PLANE_DIAMETER = (CLIENT_SIDE * 2) / 3;
    const PLANE_RADIUS = PLANE_DIAMETER / 2;
    const DELTA_RING = 1.5 * CONSTS.SQUARE_DIAMETER;

    /**
     * @param {number} x
     * @param {number} y
     *
     * @returns {Guideline[]}
     */
    function getGuidelines(x, y) {
      return [0, 1, 2].map((ring) => {
        const r = PLANE_RADIUS - ring * DELTA_RING;

        return {
          x,
          y,
          r,
          d: 2 * r,
          ring,
          top: y - r,
          left: x - r,
        };
      });
    }

    return {
      top: getGuidelines(CONSTS.SIDE / 2, CONSTS.PADDING + PLANE_RADIUS),
      right: getGuidelines(
        CONSTS.PADDING + PLANE_DIAMETER,
        CONSTS.PADDING + PLANE_DIAMETER,
      ),
      left: getGuidelines(
        CONSTS.PADDING + PLANE_RADIUS,
        CONSTS.PADDING + PLANE_DIAMETER,
      ),
    };
  }

  function drawPlanes() {
    [planes.top, planes.right, planes.left].flat().forEach((guideline) => {
      const guidelineEl = document.createElement('div');

      guidelineEl.style.top = `${guideline.top}px`;
      guidelineEl.style.left = `${guideline.left}px`;
      guidelineEl.style.width = `${guideline.d}px`;
      guidelineEl.style.height = `${guideline.d}px`;

      guidelineEl.classList.add('guideline');

      canvasEl.appendChild(guidelineEl);
    });
  }

  return {
    get state() {
      return _state;
    },
    move(action) {
      if (_moving) {
        return;
      }

      const futureState = reducer(_state, action);

      tween(futureState);

      _state = futureState;
    },
    destroy() {
      canvasEl.innerHTML = '';
    },
    updateOptions(newOptions) {
      options = {
        ...(options || {}),
        ...newOptions,
      };

      CONSTS = buildConsts();
    },
  };
}

/**
 * @typedef {Object} Side
 * @property {Square[]} squares
 * @property {(row: number) => Square[]} getRow
 * @property {(col: number) => Square[]} getCol
 * @property {(replace: Square[], row: number, reverse = false) => Side} replaceRow
 * @property {(replace: Square[], col: number, reverse = false) => Side} replaceCol
 * @property {(clockwise = true) => Side} rotate
 */

/**
 * @param {Color | ([Color, Color, Color, Color, Color, Color, Color, Color, Color])} color
 * @param {number} squareSize
 *
 * @returns {Side}
 */
function createSide(color, squareSize) {
  let _squares = (Array.isArray(color) ? color : Array(9).fill(0)).map((c) => {
    return createSquare(c || color, squareSize);
  });

  return {
    get squares() {
      return _squares;
    },
    getRow(row) {
      return this.squares.slice(3 * row, 3 * row + 3);
    },
    getCol(col) {
      return this.squares.filter((_, index) => {
        return index % 3 === col;
      });
    },
    replaceRow(replace, row, reverse = false) {
      if (reverse) {
        replace.reverse();
      }

      _squares = this.squares.map((square, index) => {
        if (index >= 3 * row && index <= 3 * row + 2) {
          return replace[index % 3];
        }

        return square;
      });

      return this;
    },
    replaceCol(replace, col, reverse = false) {
      if (reverse) {
        replace.reverse();
      }

      _squares = this.squares.map((square, index) => {
        if (index % 3 === col) {
          return replace[Math.floor(index / 3)];
        }

        return square;
      });

      return this;
    },
    rotate(clockwise = true) {
      const groupedSquares = Array.from({ length: 3 }, () =>
        this.squares.splice(0, 3),
      );
      const result = Array(3)
        .fill(0)
        .map(() => Array(3).fill(0));

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (clockwise) {
            result[i][j] = groupedSquares[3 - j - 1][i];
          } else {
            result[i][j] = groupedSquares[j][3 - i - 1];
          }
        }
      }

      _squares = result.flat();

      return this;
    },
  };
}

/**
 * @typedef {Object} Square
 * @property {Color} color
 * @property {HTMLDivElement} el
 * @property {(x: number, y: number) => void} moveTo
 */

/**
 * @typedef {'green' | 'white' | 'red' | 'orange' | 'yellow' | 'blue'} Color
 */

/**
 * @param {Color} color
 * @param {number} size
 *
 * @returns {Square}
 */
function createSquare(color, size) {
  const el = document.createElement('div');

  el.style.width = `${size}px`;
  el.style.height = `${size}px`;

  el.classList.add('square');
  el.classList.add(color);

  return {
    color,
    el,
    moveTo: function (x, y) {
      el.style.left = `${x - size / 2}px`;
      el.style.top = `${y - size / 2}px`;
    },
  };
}

/**
 * @typedef {Object} Intersections
 * @property {Intersection[]} front
 * @property {Intersection[]} up
 * @property {Intersection[]} right
 * @property {Intersection[]} left
 * @property {Intersection[]} down
 * @property {Intersection[]} back
 */

/**
 * @typedef {Object} Intersection
 * @property {number} x
 * @property {number} y
 * @property {number} index
 */

/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

/**
 * @param {Planes} planes
 *
 * @returns {Intersections}
 */
function getIntersections(planes) {
  /**
   * @type {Intersections}
   */
  const intersections = {
    front: [],
    up: [],
    right: [],
    left: [],
    down: [],
    back: [],
  };

  /**
   * @param {number} x0
   * @param {number} y0
   * @param {number} r0
   * @param {number} x1
   * @param {number} y1
   * @param {number} r1
   *
   * @returns {[Point, Point]}
   */
  function findCirclesIntersections(x0, y0, r0, x1, y1, r1) {
    const deltaCenters = [x1 - x0, y1 - y0];
    const deltaCentersMod = Math.sqrt(
      deltaCenters[1] * deltaCenters[1] + deltaCenters[0] * deltaCenters[0],
    );

    if (deltaCentersMod > r0 + r1 || deltaCentersMod < Math.abs(r0 - r1)) {
      return null;
    }

    const point0ToMidwayPointDistance =
      (r0 * r0 - r1 * r1 + deltaCentersMod * deltaCentersMod) /
      (2.0 * deltaCentersMod);

    const midwayPoint = [
      x0 + (deltaCenters[0] * point0ToMidwayPointDistance) / deltaCentersMod,
      y0 + (deltaCenters[1] * point0ToMidwayPointDistance) / deltaCentersMod,
    ];

    const midwayPointToIntersectionPointDistance = Math.sqrt(
      r0 * r0 - point0ToMidwayPointDistance * point0ToMidwayPointDistance,
    );

    const midwayPointToIntersectionPoint = [
      -deltaCenters[1] *
        (midwayPointToIntersectionPointDistance / deltaCentersMod),
      deltaCenters[0] *
        (midwayPointToIntersectionPointDistance / deltaCentersMod),
    ];

    return [
      {
        x: midwayPoint[0] + midwayPointToIntersectionPoint[0],
        y: midwayPoint[1] + midwayPointToIntersectionPoint[1],
      },
      {
        x: midwayPoint[0] - midwayPointToIntersectionPoint[0],
        y: midwayPoint[1] - midwayPointToIntersectionPoint[1],
      },
    ];
  }

  planes.top.forEach((top) => {
    planes.right.forEach((right) => {
      const [point1, point2] = findCirclesIntersections(
        top.x,
        top.y,
        top.r,
        right.x,
        right.y,
        right.r,
      );

      const point1IsFront = point1.x < point2.x;

      const indexFront = 8 - 3 * top.ring - (2 - right.ring);
      const indexBack = 8 - 3 * top.ring - right.ring;

      intersections.front.push({
        x: (point1IsFront ? point1 : point2).x,
        y: (point1IsFront ? point1 : point2).y,
        index: indexFront,
      });
      intersections.back.push({
        x: (point1IsFront ? point2 : point1).x,
        y: (point1IsFront ? point2 : point1).y,
        index: indexBack,
      });
    });
  });

  planes.top.forEach((top) => {
    planes.left.forEach((left) => {
      const [point1, point2] = findCirclesIntersections(
        top.x,
        top.y,
        top.r,
        left.x,
        left.y,
        left.r,
      );

      const point1IsLeft = point1.x < point2.x;

      const indexLeft = 8 - 3 * top.ring - (2 - left.ring);
      const indexRight = 8 - 3 * top.ring - left.ring;

      intersections.left.push({
        x: (point1IsLeft ? point1 : point2).x,
        y: (point1IsLeft ? point1 : point2).y,
        index: indexLeft,
      });
      intersections.right.push({
        x: (point1IsLeft ? point2 : point1).x,
        y: (point1IsLeft ? point2 : point1).y,
        index: indexRight,
      });
    });
  });

  planes.right.forEach((right) => {
    planes.left.forEach((left) => {
      const [point1, point2] = findCirclesIntersections(
        right.x,
        right.y,
        right.r,
        left.x,
        left.y,
        left.r,
      );

      const point1IsUp = point1.y < point2.y;

      const indexUp = 3 * left.ring + right.ring;
      const indexDown = 3 * (2 - left.ring) + right.ring;

      intersections.up.push({
        x: (point1IsUp ? point1 : point2).x,
        y: (point1IsUp ? point1 : point2).y,
        index: indexUp,
      });
      intersections.down.push({
        x: (point1IsUp ? point2 : point1).x,
        y: (point1IsUp ? point2 : point1).y,
        index: indexDown,
      });
    });
  });

  intersections.front = intersections.front.sort((a, b) => a.index - b.index);
  intersections.back = intersections.back.sort((a, b) => a.index - b.index);
  intersections.right = intersections.right.sort((a, b) => a.index - b.index);
  intersections.left = intersections.left.sort((a, b) => a.index - b.index);
  intersections.up = intersections.up.sort((a, b) => a.index - b.index);
  intersections.down = intersections.down.sort((a, b) => a.index - b.index);

  return intersections;
}

/**
 *
 * @param {keyof _State} from
 * @param {keyof _State} to
 *
 * @returns {([keyof Planes, 'short' | 'long']) | [undefined, undefined]}
 */
function fromToSideToPlaneAndArc(from, to) {
  switch (from) {
    case 'front':
      switch (to) {
        case 'up':
        case 'down':
          return ['right', 'short'];
        case 'right':
        case 'left':
          return ['top', 'short'];
        default:
          return [undefined, undefined];
      }
    case 'up':
      switch (to) {
        case 'front':
        case 'back':
          return ['right', 'short'];
        case 'right':
        case 'left':
          return ['left', 'short'];
        default:
          return [undefined, undefined];
      }
    case 'right':
      switch (to) {
        case 'front':
        case 'back':
          return ['top', 'short'];
        case 'up':
        case 'down':
          return ['left', 'short'];
        default:
          return [undefined, undefined];
      }
    case 'left':
      switch (to) {
        case 'front':
          return ['top', 'short'];
        case 'back':
          return ['top', 'long'];
        case 'up':
          return ['left', 'short'];
        case 'down':
          return ['left', 'long'];
        default:
          return [undefined, undefined];
      }
    case 'down':
      switch (to) {
        case 'front':
          return ['right', 'short'];
        case 'back':
          return ['right', 'long'];
        case 'right':
          return ['left', 'short'];
        case 'left':
          return ['left', 'long'];
        default:
          return [undefined, undefined];
      }
    case 'back':
      switch (to) {
        case 'up':
          return ['right', 'short'];
        case 'down':
          return ['right', 'long'];
        case 'right':
          return ['top', 'short'];
        case 'left':
          return ['top', 'long'];
        default:
          return [undefined, undefined];
      }
    default:
      return [undefined, undefined];
  }
}
