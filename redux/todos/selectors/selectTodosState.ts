import { RootState } from "../../store";

export const selectTodosState = (state: RootState) => state.todos;