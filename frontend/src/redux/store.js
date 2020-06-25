import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userReducer";

const store = createStore(userReducer, applyMiddleware(logger, thunk));

export default store;
