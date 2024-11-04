import { createSelector } from "reselect";
import { selectTodosState } from "./selectTodosState";

export const selectCurrentTodo = createSelector(
    selectTodosState,
    (state) => state.selectedTodo
);
