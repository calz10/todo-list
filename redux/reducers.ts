import { combineReducers } from "redux";
import { reducer as todos } from "./todos";

export const rootReducer = combineReducers({
  todos
});
