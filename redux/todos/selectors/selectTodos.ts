import { createSelector } from "reselect";
import { selectTodosState } from "./selectTodosState";
import {  isBefore, isToday, parseISO } from 'date-fns'
import { TodoActionTypes } from "../interface";

/**
 * This selector is used to get all todos or todos based on the status
 * @param state
 * @param payload
 * @returns
 * @example
 * const todos = useSelector((state) => slices.todos.selectors.selectAllTodos(state, status))
 * 
 * const todos = useSelector((state) => slices.todos.selectors.selectAllTodos(state, 'all'))
 * 
 */
export const selectAllTodos = createSelector(
  [
    selectTodosState, 
    (_, payload: TodoActionTypes | 'all') => payload,
  ],
  (state, payload) => {
    // as of now this is a workaround as i have not implement well  the status but it supposed to access null or undefined
    // this will filter the todos based on the status if not all will be added
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
