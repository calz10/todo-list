import { createSelector } from "reselect";
import { selectTodosState } from "./selectTodosState";

// This selector is used to get the currently selected todo
export const selectCurrentTodo = createSelector(
    selectTodosState,
    (state) => state.selectedTodo
);
