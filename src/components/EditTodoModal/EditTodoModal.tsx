import { useRef, useState, type Dispatch, type SetStateAction } from 'react';
import type { TodoItemType } from '../../types/todo';
import styles from './EditTodoModal.module.css';
import XIcon from '../TodoItem/components/XIcon';
import type { ValidateError } from '../../utils/validateInput';
import validateInput from '../../utils/validateInput';

interface EditTodoModal {
  todo: TodoItemType | null;
  todos: TodoItemType[];
  setTodos: Dispatch<SetStateAction<TodoItemType[]>>;
  setModalInfo: Dispatch<SetStateAction<TodoItemType | null>>;
  setError: Dispatch<SetStateAction<ValidateError>>;
}

export default function EditTodoModal({ todo, todos, setTodos, setModalInfo }: EditTodoModal) {
  const newTodo = useRef<HTMLInputElement>(null);
  const clickedInsideModal = useRef(false);
  const [error, setError] = useState<ValidateError>({} as ValidateError);

  const handleBackdropClick = () => {
    if (!clickedInsideModal.current) {
      setModalInfo(null);
    }
    clickedInsideModal.current = false;
  };

  const handleEditTodo = (todoTitle: string | undefined) => {
    const newTitle = newTodo.current?.value;

    if (!newTitle) return;

    if (todoTitle === newTitle) {
      setModalInfo(null);
      return;
    }

    const validatedInput = validateInput(newTitle, todos);

    if (!validatedInput.valid) {
      setError(validatedInput);
      return;
    }

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.title === todoTitle) {
          return {
            title: newTitle,
            done: todo.done,
          };
        }

        return todo;
      })
    );

    setModalInfo(null);
  };

  return (
    <div className={styles.modal__backdrop} onMouseUp={handleBackdropClick}>
      <div className={styles.modal__body} onMouseDown={() => (clickedInsideModal.current = true)}>
        <div className={styles.modal__header}>
          <span>Edit todo</span>
          <button type="button" className={styles.modal__close} onClick={() => setModalInfo(null)}>
            <XIcon />
          </button>
        </div>
        <label htmlFor="edit-todo-input">Title</label>
        <input
          type="text"
          name="edit-todo-input"
          id="edit-todo-input"
          ref={newTodo}
          defaultValue={todo?.title}
          aria-label="Edit Todo-Task"
          placeholder="Edit Todo-Task"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleEditTodo(todo?.title);
            }

            if (e.key === 'Escape') {
              setModalInfo(null);
            }
          }}
          className={styles.modal__input}
        />
        {error && <span className={styles[`modal__error-message`]}>{error.message}</span>}
        <div className={styles.modal__actionButtons}>
          <button type="button" onClick={() => setModalInfo(null)}>
            Cancel
          </button>
          <button
            type="button"
            className={styles[`modal__actionButtons--confirm`]}
            onClick={() => handleEditTodo(todo?.title)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
