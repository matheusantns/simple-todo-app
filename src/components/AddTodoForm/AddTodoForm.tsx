import { useRef, useState, type JSX } from 'react';
import styles from './AddTodoForm.module.css';
import Input from '../Input/Input';
import { useTodoContext } from '../hooks/useTodoContext';

interface AddTodoFormProps {
  validate: (input: string) => boolean;
}

/**
 * `AddTodoForm` is a component that renders an input field and two buttons:
 * one to add a new to-do item and another to remove all completed items.
 *
 * It uses validation logic before adding a new item and automatically focuses the input after adding.
 *
 * @component
 * @param {AddTodoFormProps} props - The props for the component.
 * @param {(input: string) => boolean} props.validate - A function to validate the input string before adding a new todo.
 * @returns {JSX.Element} A form with input and control buttons to manage todo items.
 */
export default function AddTodoForm({ validate }: AddTodoFormProps): JSX.Element {
  const [inputText, setInputText] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useTodoContext();

  /**
   * Handles the addition of a new todo item.
   * If the input passes validation, it dispatches the action, resets the input, and refocuses the input field.
   *
   * @function
   * @returns {void}
   */
  const handleAddNewTodo = (): void => {
    if (!validate(inputText)) {
      return;
    }

    dispatch({ type: 'ADD_TODO', payload: inputText });
    setInputText('');

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  /**
   * Dispatches an action to remove all completed todo items.
   *
   * @function
   * @returns {void}
   */
  const handleRemoveCompletedTodos = (): void => {
    dispatch({ type: 'REMOVE_COMPLETED_TODOS' });
  };

  return (
    <div className={styles.addTodoInput}>
      <Input
        mode="add"
        name="todo-input"
        ref={inputRef}
        id="todo-input"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        aria-label="Create Todo-Task"
        placeholder="Create Todo-Task"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddNewTodo();
          }
        }}
      />
      <button type="button" className={styles.addTodoInput__button} onClick={handleAddNewTodo}>
        Add
      </button>
      <button
        type="button"
        onClick={handleRemoveCompletedTodos}
        className={`${styles['addTodoInput__button--clear']} ${styles['addTodoInput__button']}`}
      >
        Clear completed to-dos
      </button>
    </div>
  );
}
