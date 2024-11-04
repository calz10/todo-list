import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoState } from "./interface";

const initialState: TodoState = {
  todos: [],
  selectedTodo: null,
};

const slice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    resetState: () => initialState,
    clearSelectedTodo: (state) => {
      state.selectedTodo = null;
    },
    addTodo: (state, {
      payload
    }: PayloadAction<TodoState['todos'][0]>) => {
      state.todos.push(payload);
    },
    updateTodo: (state, {
      payload
    }: PayloadAction<{
      id: string;
      todo: Partial<TodoState['todos'][0]>;
    }>) => {
      const existingTodoIndex = state.todos.findIndex(todo => todo.id === payload.id);
      if(existingTodoIndex > -1) {
        state.todos[existingTodoIndex] = {
          ...state.todos[existingTodoIndex],
          ...payload.todo,
        };
        state.selectedTodo = null
      }
    },
    selectTodo: (state, {
      payload
    }: PayloadAction<string>) => {
      state.selectedTodo = state.todos.find(todo => todo.id === payload) || null;
    },
    removeTodo: (state, {
      payload
    }: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== payload);
    },
  },
});

export const reducer = slice.reducer;
export const actions = {
  ...slice.actions,
};
