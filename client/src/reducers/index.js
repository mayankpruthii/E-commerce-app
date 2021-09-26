import { combineReducers } from "redux";

import auth from "./auth";
import products from "./product";

export default combineReducers({ auth, products });