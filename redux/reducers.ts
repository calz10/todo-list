import { combineReducers } from "redux";
import { reducer as todos } from "./todos";

// this way we can add more slices or entity slices, them here
export const rootReducer = combineReducers({
  todos
});
