import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers.js";

const logger = createLogger({
  predicate: (getState, action) => action.type === "set"
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
  //  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
