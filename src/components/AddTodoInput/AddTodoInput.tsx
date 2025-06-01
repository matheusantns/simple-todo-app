import { useState, type Dispatch, type SetStateAction } from 'react';
import styles from './AddTodoInput.module.css';
import type { TodoItemType } from '../../types/todo';
import validateInput, { type ValidateError } from '../../utils/validateInput';

interface AddTodoInputProps {
  todos: TodoItemType[];
  setTodos: Dispatch<SetStateAction<TodoItemType[]>>;
  setError: Dispatch<SetStateAction<ValidateError>>;
}

export default function AddTodoInput({ todos, setTodos, setError }: AddTodoInputProps) {
  const [inputText, setInputText] = useState<string>('');

  const handleAddNewTodo = () => {
    if (!inputText) return;

    const validatedInput = validateInput(inputText, todos);

    if (!validatedInput.valid) {
      setError(validatedInput);
      return;
    }

    setTodos((todos) => [{ title: inputText, done: false }, ...todos]);
    setInputText('');
    setError({} as ValidateError);
  };

  return (
    <div className={styles.addTodoInput}>
      <input
        type="text"
        name="todo-input"
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
        className={styles.addTodoInput__input}
      />
      <button type="button" className={styles.addTodoInput__button} onClick={handleAddNewTodo}>
        Add
      </button>
    </div>
  );
}
