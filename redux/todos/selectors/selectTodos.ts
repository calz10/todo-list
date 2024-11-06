import { createSelector } from "reselect";
import { selectTodosState } from "./selectTodosState";
import {  isBefore, isToday, parseISO } from 'date-fns'

export const selectAllTodos = createSelector(
  selectTodosState,
  (state) => {
    const currentTodos = state.todos;
    return currentTodos.map(todo => {
      const dueDate = parseISO(todo.dueDate);
      const isDue = isBefore(dueDate, new Date()) && !isToday(dueDate);

      return {
        ...todo,
        isDue
      }
    })
  }
);
