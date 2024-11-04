import { createSelector } from "reselect";
import { selectTodosState } from "./selectTodosState";

export const selectAllTodos = createSelector(
    selectTodosState,
    (state) => state.todos
);
