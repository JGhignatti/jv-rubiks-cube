import { intersections } from "./intersection.js";
import { containerEl } from "./screen-manager.js";

/**
 * @typedef {import('./side.js').Side} Side
 *
 * @typedef {Object} Action
 * @property {string} type
 * @property {Object} [props]
 *
 * @typedef {Object} _State
 * @property {Side} front
 * @property {Side} up
 * @property {Side} right
 * @property {Side} left
 * @property {Side} down
 * @property {Side} back
 *
 * @typedef {Object} State
 * @property {_State} state
 * @property {(action: Action) => void} dispatch
 */

export const ACTIONS = {
  /**
   * @returns {Action}
   */
  INIT: function () {
    return {
      type: "INIT",
    };
  },
};

/**
 * @param {_State} initialState
 *
 * @returns {State}
 */
export function createStore(initialState) {
  let _state = initialState;

  return {
    get state() {
      return _state;
    },
    dispatch(action) {
      _state = reducer(_state, action);
    },
  };
}

/**
 * @param {_State} state
 * @param {Action} action
 *
 * @returns {_State}
 */
function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      intersections();

      state.front.squares.forEach((square, index) => {
        const intersection = intersections().front[index];

        square.moveTo(intersection.x, intersection.y);
      });
      state.up.squares.forEach((square, index) => {
        const intersection = intersections().up[index];

        square.moveTo(intersection.x, intersection.y);
      });
      state.right.squares.forEach((square, index) => {
        const intersection = intersections().right[index];

        square.moveTo(intersection.x, intersection.y);
      });
      state.left.squares.forEach((square, index) => {
        const intersection = intersections().left[index];

        square.moveTo(intersection.x, intersection.y);
      });
      state.down.squares.forEach((square, index) => {
        const intersection = intersections().down[index];

        square.moveTo(intersection.x, intersection.y);
      });
      state.back.squares.forEach((square, index) => {
        const intersection = intersections().back[index];

        square.moveTo(intersection.x, intersection.y);
      });

      Object.values(state)
        .map((side) => side.squares)
        .flat()
        .forEach((square) => {
          containerEl.appendChild(square.el);
        });

      return state;
    }
    default:
      return state;
  }
}
