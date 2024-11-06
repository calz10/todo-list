

export enum TodoActionTypes {
  PENDING = 1,
  INPROGRESS = 2,
  COMPLETED = 3,
}

export type TodoItem = {
  id: string
  status: TodoActionTypes
  title: string
  description: string
  dueDate: string
}

export interface TodoState {
  todos: TodoItem[];
  selectedTodo?: TodoItem | null;
}