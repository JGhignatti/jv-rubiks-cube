import { createSquare } from "./square.js";

/**
 * @typedef {import('./square.js').Square} Square
 * @typedef {import('./square.js').Color} Color
 *
 * @typedef {Object} Side
 * @property {Square[]} squares
 * @property {(row: number) => Square[]} getRow
 * @property {(col: number) => Square[]} getCol
 * @property {(replace: Square[], row: number, reverse = false) => Square[]} replaceRow
 * @property {(replace: Square[], col: number, reverse = false) => Square[]} replaceCol
 * @property {(clockwise = true) => Square[]} rotate
 */

/**
 * @param {Color} color
 *
 * @returns {Side}
 */
export function createSide(color) {
  let _squares = Array(9)
    .fill(0)
    .map(() => {
      return createSquare(color);
    });

  return {
    get squares() {
      return _squares;
    },
    getRow: function (row) {
      return _squares.slice(3 * row, 3 * row + 3);
    },
    getCol: function (col) {
      return Array.from({ length: 3 }, () => _squares.splice(0, 3))
        .map((chunk) => chunk.filter((_, index) => index === col))
        .flat();
    },
    replaceRow: function (replace, row, reverse = false) {
      replace = reverse ? replace.reverse() : replace;

      return _squares.map((square, index) => {
        if (index >= 3 * row && index <= 3 * row + 2) {
          return replace[Math.floor(index / 3)];
        }

        return square;
      });
    },
    replaceCol: function (replace, col, reverse = false) {
      replace = reverse ? replace.reverse() : replace;

      return _squares.map((square, index) => {
        if (index % 3 === col) {
          return replace[Math.floor(index / 3)];
        }

        return square;
      });
    },
    rotate: function (clockwise = true) {
      const groupedSquares = Array.from({ length: 3 }, () =>
        _squares.splice(0, 3)
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

      return result;
    },
  };
}
