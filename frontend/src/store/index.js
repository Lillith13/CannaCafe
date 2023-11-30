import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// Import all needed stores
import session from "./session";

const rootReducer = combineReducers({
  session,
});
