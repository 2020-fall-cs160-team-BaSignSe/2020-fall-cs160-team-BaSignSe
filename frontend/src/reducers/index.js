// we have multiple reducers, wanna combine reducers

import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import courseReducer from "./courseReducer";

export default combineReducers({ alert, auth , courseReducer});
