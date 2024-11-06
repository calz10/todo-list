import { createSelector } from "reselect";
import { selectTodosState } from "./selectTodosState";
import {  isBefore, isToday, parseISO } from 'date-fns'
import { TodoActionTypes } from "../interface";

export const selectAllTodos = createSelector(
  [
    selectTodosState, 
    (_, payload: TodoActionTypes | 'all') => payload,
  ],
  (state, payload) => {
    const currentTodos = payload  === 'all' ? state.todos: state.todos.filter(todo => +todo.status === +payload);
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
