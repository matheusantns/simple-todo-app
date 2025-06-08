export type TodoItemType = {
  title: string;
  done: boolean;
};

export type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'EDIT_TODO'; payload: { oldName: string; newName: string } }
  | { type: 'REMOVE_COMPLETED_TODOS' }
  | { type: 'TOGGLE_TODO_STATUS'; payload: string };

export type TodoState = { todos: TodoItemType[] };
