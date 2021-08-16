import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducer from "../reducers";

let store;

export function configureStore() {
  store = createStore(reducer, applyMiddleware(thunk, logger));

  return store;
}