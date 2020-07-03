import { combineReducers } from "redux";

import { bookReducer } from "./BookReducer";
import { userReducer } from "./userReducer";
import { GlobalReducer } from "./GlobalReducer";

export const rootReducer = combineReducers({
  authUser: userReducer,
  books: bookReducer,
  global: GlobalReducer
});
