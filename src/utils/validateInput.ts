import type { TodoItemType } from '../types/todo';

export interface ValidateError {
  valid: boolean;
  message: string;
}

function hasSpecialChars(str: string) {
  return !!str.match(/[^a-zA-Z0-9 ]/);
}

function isRepeatedTodo(str: string, todos: TodoItemType[]) {
  return todos.some((todo) => todo.title.toLowerCase() === str.toLowerCase());
}

export default function validateInput(input: string, todos: TodoItemType[]): ValidateError {
  if (input.length > 60 || input.length < 5) {
    return {
      valid: false,
      message: 'Invalid todo length. Valid length: 4-60 characters.',
    };
  }

  if (hasSpecialChars(input)) {
    return {
      valid: false,
      message: 'The text has special characters.',
    };
  }

  if (isRepeatedTodo(input, todos)) {
    return {
      valid: false,
      message: 'This todo already exists',
    };
  }

  return {
    valid: true,
    message: '',
  };
}
