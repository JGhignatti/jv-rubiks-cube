import { CLIENT_SIDE, PADDING, SIDE } from "./consts.js";
import { containerEl } from "./screen-manager.js";

const SECTION_DIAMETER = (CLIENT_SIDE * 2) / 3;
const SECTION_RADIUS = SECTION_DIAMETER / 2;
const SECTION_DELTA_RADIUS = 40;

/**
 * @typedef {Object} Intersection
 * @property {number} x
 * @property {number} y
 * @property {number} index
 *
 * @typedef {Object} Intersections
 * @property {Intersection[]} front
 * @property {Intersection[]} up
 * @property {Intersection[]} right
 * @property {Intersection[]} left
 * @property {Intersection[]} down
 * @property {Intersection[]} back
 */

/**
 * @type {Intersections}
 */
let _intersections;

/**
 * @returns {Intersections}
 */
export function intersections() {
  if (!_intersections) {
    _intersections = initIntersections();
  }

  return _intersections;
}

/**
 * @returns {Intersections}
 */
function initIntersections() {
  const sections = drawSections();

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

  sections.top.forEach((top) => {
    sections.right.forEach((right) => {
      const [point1, point2] = findCirclesIntersections(
        top.x,
        top.y,
        top.r,
        right.x,
        right.y,
        right.r
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

  sections.top.forEach((top) => {
    sections.left.forEach((left) => {
      const [point1, point2] = findCirclesIntersections(
        top.x,
        top.y,
        top.r,
        left.x,
        left.y,
        left.r
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

  sections.right.forEach((right) => {
    sections.left.forEach((left) => {
      const [point1, point2] = findCirclesIntersections(
        right.x,
        right.y,
        right.r,
        left.x,
        left.y,
        left.r
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
 * @typedef {Object} Guideline
 * @property {number} x
 * @property {number} y
 * @property {number} r
 * @property {number} d
 * @property {number} ring
 * @property {number} top
 * @property {number} left
 *
 * @typedef {Object} Sections
 * @property {Guideline[]} top
 * @property {Guideline[]} right
 * @property {Guideline[]} left
 *
 * @returns {Sections}
 */
function drawSections() {
  /**
   * @param {number} x
   * @param {number} y
   *
   * @returns {Guideline[]}
   */
  function getGuidelines(x, y) {
    return [0, 1, 2].map((ring) => {
      const r = SECTION_RADIUS - ring * SECTION_DELTA_RADIUS;

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

  const sections = {
    top: getGuidelines(SIDE / 2, PADDING + SECTION_RADIUS),
    right: getGuidelines(
      PADDING + SECTION_DIAMETER,
      PADDING + SECTION_DIAMETER
    ),
    left: getGuidelines(PADDING + SECTION_RADIUS, PADDING + SECTION_DIAMETER),
  };

  [sections.top, sections.right, sections.left].flat().forEach((guideline) => {
    const guidelineEl = document.createElement("div");

    guidelineEl.style.position = "absolute";
    guidelineEl.style.top = `${guideline.top}px`;
    guidelineEl.style.left = `${guideline.left}px`;
    guidelineEl.style.width = `${guideline.d}px`;
    guidelineEl.style.height = `${guideline.d}px`;

    guidelineEl.style.border = "1px solid var(--slate-700)";
    guidelineEl.style.borderRadius = "100%";
    guidelineEl.style.boxSizing = "border-box";

    containerEl.appendChild(guidelineEl);
  });

  return sections;
}

/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 *
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
    deltaCenters[1] * deltaCenters[1] + deltaCenters[0] * deltaCenters[0]
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
    r0 * r0 - point0ToMidwayPointDistance * point0ToMidwayPointDistance
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
