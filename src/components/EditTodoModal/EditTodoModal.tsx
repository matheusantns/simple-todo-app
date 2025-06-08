import { useRef, type Dispatch, type JSX, type SetStateAction } from 'react';
import type { TodoItemType } from 'src/types/todo';
import styles from './EditTodoModal.module.css';
import XIcon from 'src/components/Icons/XIcon';
import Input from '../Input/Input';
import { useTodoContext } from '../hooks/useTodoContext';
import { useTodoValidation } from '../hooks/useTodoValidation';

interface EditTodoModal {
  todo: TodoItemType | null;
  setModalInfo: Dispatch<SetStateAction<TodoItemType | null>>;
}

/**
 * `EditTodoModal` is a React modal component used for editing an existing todo item.
 * It performs input validation and dispatches an update if the new title is valid.
 *
 * @component
 *
 * @param {TodoItemType | null} props.todo - The todo item currently being edited.
 * @param {Dispatch<SetStateAction<TodoItemType | null>>} props.setModalInfo - Function to close the modal.
 *
 * @returns {JSX.Element} A modal window for editing a todo item.
 */
export default function EditTodoModal({ todo, setModalInfo }: EditTodoModal): JSX.Element {
  const { state, dispatch } = useTodoContext();
  const newTodo = useRef<HTMLInputElement>(null);
  const clickedInsideModal = useRef(false);
  const { error, validate } = useTodoValidation(state.todos);

  /**
   * Handles clicks on the modal backdrop.
   * Closes the modal if the click is outside the modal body.
   * @function
   * @returns {void}
   */
  const handleBackdropClick = (): void => {
    if (!clickedInsideModal.current) {
      setModalInfo(null);
    }
    clickedInsideModal.current = false;
  };

  /**
   * Validates and updates the todo title.
   * Closes the modal on success or if the title is unchanged.
   *
   * @param {string | undefined} todoTitle - The current title of the todo being edited.
   * @returns {void}
   */
  const handleEditTodo = (todoTitle: string | undefined): void => {
    const newTitle = newTodo.current?.value;

    if (!newTitle || !newTitle.trim()) return;

    if (todoTitle === newTitle) {
      setModalInfo(null);
      return;
    }

    if (!validate(newTitle)) {
      return;
    }

    dispatch({ type: 'EDIT_TODO', payload: { oldName: todoTitle as string, newName: newTitle } });

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
        <Input
          mode="edit"
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
