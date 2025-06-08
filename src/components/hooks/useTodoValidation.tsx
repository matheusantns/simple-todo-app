import { useState } from 'react';
import type { TodoItemType } from 'src/types/todo';

/**
 * Represents the result of input validation.
 *
 * @interface ValidateError
 * @property {boolean} valid - Indicates if the input is valid.
 * @property {string} message - Error message if validation fails, empty if valid.
 */
export interface ValidateError {
  valid: boolean;
  message: string;
}

/**
 * Checks if a string contains any special characters (non-alphanumeric and non-space).
 *
 * @param {string} str - The string to check.
 * @returns {boolean} True if special characters are found, false otherwise.
 */
function hasSpecialChars(str: string): boolean {
  return !!str.match(/[^a-zA-Z0-9 ]/);
}

/**
 * Checks if the input string is a repeated todo title in the todos list.
 * Comparison is case-insensitive.
 *
 * @param {string} str - The string to check.
 * @param {TodoItemType[]} todos - The list of existing todos.
 * @returns {boolean} True if the todo already exists, false otherwise.
 */
function isRepeatedTodo(str: string, todos: TodoItemType[]): boolean {
  return todos.some((todo) => todo.title.toLowerCase() === str.toLowerCase());
}

/**
 * Custom React hook for validating todo input values.
 *
 * This hook provides a `validate` function to check a todo string
 * against business rules such as length, special characters, and duplication.
 * It also exposes an `error` object with validation state and an error message.
 *
 * @param {TodoItemType[]} todos - The current list of todos to check for duplicates.
 * @returns {{
 *   validate: (input: string) => boolean,
 *   error: ValidateError
 * }} An object containing the validate function and the current validation error state.
 */
export function useTodoValidation(todos: TodoItemType[]): {
  validate: (input: string) => boolean;
  error: ValidateError;
} {
  const [error, setError] = useState<ValidateError>({ valid: true, message: '' });

  const validate = (input: string): boolean => {
    if (input.length > 60 || input.length < 5) {
      setError({
        valid: false,
        message: 'Invalid todo length. Valid length: 4-60 characters.',
      });
      return false;
    }

    if (hasSpecialChars(input)) {
      setError({
        valid: false,
        message: 'The text has special characters.',
      });
      return false;
    }

    if (isRepeatedTodo(input, todos)) {
      setError({
        valid: false,
        message: 'This todo already exists',
      });
      return false;
    }

    setError({
      valid: true,
      message: '',
    });

    return true;
  };

  return { validate, error };
}
