import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// Import all needed stores
import session from "./session";
import products from "./products";
import categories from "./categories";
import targetUser from "./targetUser";
import employees from "./employees";
import timecard from "./timecard";
import orders from "./orders";
import wishlist from "./wishlist";
import favorites from "./favorites";
import reviews from "./reviews";
import complaints from "./complaints";

const rootReducer = combineReducers({
  session,
  products,
  categories,
  targetUser,
  employees,
  timecard,
  orders,
  wishlist,
  favorites,
  reviews,
  complaints,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
