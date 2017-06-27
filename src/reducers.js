import { Map } from "immutable";
import { combineReducers } from "redux-immutable";
import { reducer as form } from "redux-form/immutable";
import Fraction from "fraction.js";
import { matrix as createMatrix } from "./vector.js";

const matrix = createMatrix([
  [new Fraction(1), new Fraction(2), new Fraction(3)],
  [new Fraction(1 / 2), new Fraction(2 / 3), new Fraction(3 / 4)],
  [new Fraction(0), new Fraction(0), new Fraction(0)]
]);

const app = (state = Map({ matrix }), action) => {
  switch (action.type) {
    case "set":
      const { key, value } = action.payload;
      return state.set(key, value);
    default:
      return state;
  }
};
export const rootReducer = combineReducers({ app, form });
