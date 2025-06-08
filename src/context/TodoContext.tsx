import { createContext, useReducer, type Dispatch, type JSX, type ReactNode } from 'react';
import type { Action, TodoState } from 'src/types/todo';

export type TodoContextType = {
  state: TodoState;
  dispatch: Dispatch<Action>;
};

/**
 * Initializes the todo state from localStorage, or returns an empty list if not found.
 *
 * @returns {TodoState} Initial todo state.
 */
const initState = (): TodoState => {
  const saved = localStorage.getItem('todos');
  return saved ? { todos: JSON.parse(saved) } : { todos: [] };
};

/**
 * Reducer function to handle todo actions and update the state.
 *
 * @param {TodoState} state - Current todo state.
 * @param {Action} action - Action to apply to the state.
 * @returns {TodoState} Updated state.
 */
function todoReducer(state: TodoState, action: Action): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo = { title: action.payload, done: false };
      return { todos: [newTodo, ...state.todos] };
    case 'DELETE_TODO':
      return { todos: [...state.todos.filter((todo) => todo.title !== action.payload)] };
    case 'EDIT_TODO':
      return {
        todos: state.todos.map((todo) =>
          todo.title === action.payload.oldName
            ? { title: action.payload.newName, done: todo.done }
            : todo
        ),
      };
    case 'REMOVE_COMPLETED_TODOS':
      return { todos: state.todos.filter((todo) => !todo.done) };
    case 'TOGGLE_TODO_STATUS':
      return {
        todos: state.todos.map((todo) =>
          todo.title === action.payload ? { title: todo.title, done: !todo.done } : todo
        ),
      };
  }
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

/**
 * Provides the TodoContext to its children.
 *
 * @component
 * @param {ReactNode} props.children - The components that need access to the todo context.
 * @returns {JSX.Element} The provider wrapping its children.
 */
export const TodoProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [state, dispatch] = useReducer(todoReducer, undefined, initState);

  return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
};
