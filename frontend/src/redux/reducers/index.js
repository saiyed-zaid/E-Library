import { combineReducers } from "redux";

import { bookReducer } from "./BookReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  authUser: userReducer,
  books: bookReducer,
});
