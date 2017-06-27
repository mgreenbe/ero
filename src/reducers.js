import { Map } from "immutable";
import { combineReducers } from "redux-immutable";
import { reducer as form } from "redux-form/immutable";
//import Fraction from "fraction.js";
//import { matrix as createMatrix } from "./vector.js";

/*const matrix = createMatrix([
  [new Fraction(1), new Fraction(2), new Fraction(3)],
  [new Fraction(1 / 2), new Fraction(2 / 3), new Fraction(3 / 4)],
  [new Fraction(0), new Fraction(0), new Fraction(0)]
]);*/

const app = (state = Map({}), action) => {
  const { type, payload } = action;
  switch (type) {
    case "set":
      return state.set(payload.key, payload.value);
    case "swap":
      return state.set(
        "matrix",
        state.get("matrix").swap(payload.i, payload.j)
      );
    case "multiply":
      return state.set("matrix", state.get("matrix").mul(payload.k, payload.i));
    case "transvect":
      return state.set(
        "matrix",
        state.get("matrix").transvect(payload.k, payload.i, payload.j)
      );

    default:
      return state;
  }
};

export const rootReducer = combineReducers({ app, form });
