export const SQUARE_DIAMETER = 24;
export const SQUARE_RADIUS = SQUARE_DIAMETER / 2;

/**
 * @typedef {'green' | 'white' | 'red' | 'orange' | 'yellow' | 'blue'} Color
 *
 * @typedef {'var(--green-500)' | 'var(--white)' | 'var(--red-500)' | 'var(--orange-500)' | 'var(--yellow-400)' | 'var(--blue-500)' | } ColorValue
 *
 * @typedef {Object} Square
 * @property {Color} color
 * @property {ColorValue} colorValue
 * @property {HTMLDivElement} el
 * @property {(x: number, y: number) => void} moveTo
 */

/**
 * @param {Color} color
 *
 * @returns {Square}
 */
export function createSquare(color) {
  const colorValue = getColorValue(color);

  const el = document.createElement("div");

  el.style.position = "absolute";
  el.style.width = `${SQUARE_DIAMETER}px`;
  el.style.height = `${SQUARE_DIAMETER}px`;

  el.style.backgroundColor = colorValue;
  el.style.outline = "1px solid var(--slate-300)";
  el.style.outlineOffset = "2px";
  el.style.borderRadius = "100%";

  return {
    color,
    colorValue,
    el,
    moveTo: function (x, y) {
      el.style.left = `${x - SQUARE_RADIUS}px`;
      el.style.top = `${y - SQUARE_RADIUS}px`;
    },
  };
}

/**
 * @param {Color} color
 *
 * @returns {ColorValue}
 */
function getColorValue(color) {
  switch (color) {
    case "green":
      return "var(--green-500)";
    case "white":
      return "var(--white)";
    case "red":
      return "var(--red-500)";
    case "orange":
      return "var(--orange-500)";
    case "yellow":
      return "var(--yellow-400)";
    case "blue":
      return "var(--blue-500)";
  }
}
