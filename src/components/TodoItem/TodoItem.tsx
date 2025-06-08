import { useCallback, type Dispatch, type JSX, type SetStateAction } from 'react';
import type { TodoItemType } from 'src/types/todo';
import styles from './TodoItem.module.css';
import DoneIcon from 'src/components/Icons/DoneIcon';
import EditIcon from 'src/components/Icons/EditIcon';
import TrashIcon from 'src/components/Icons/TrashIcon';
import XIcon from 'src/components/Icons/XIcon';
import { useTodoContext } from '../hooks/useTodoContext';

interface TodoItemProps {
  todo: TodoItemType;
  setModalInfo: Dispatch<SetStateAction<TodoItemType | null>>;
}

/**
 * TodoItem renders a single todo item with actions to mark done/undone,
 * edit, and delete the todo.
 *
 * @param {TodoItemType} props.todo The todo being rendered.
 * @param {Dispatch<SetStateAction<TodoItemType | null>>} props.setModalInfo - Setter to open/close the edit modal.
 *
 * @returns {JSX.Element} A styled todo item with action buttons.
 */
export default function TodoItem({ todo, setModalInfo }: TodoItemProps): JSX.Element {
  const { dispatch } = useTodoContext();

  /**
   * Delete the to-do
   */
  const handleDeleteTodo = useCallback(() => {
    dispatch({ type: 'DELETE_TODO', payload: todo.title });
  }, [dispatch, todo.title]);

  /**
   * Toggles the 'done' status of a todo item identified by its title.
   */
  const handleCheckTodo = useCallback(() => {
    dispatch({ type: 'TOGGLE_TODO_STATUS', payload: todo.title });
  }, [dispatch, todo.title]);

  return (
    <article
      className={[styles.todoItem, todo.done && styles.todoItem__checked].filter(Boolean).join(' ')}
    >
      <h2 style={todo.done ? { textDecoration: 'line-through' } : {}}>{todo.title}</h2>
      <div className={styles.todoItem__actions}>
        <button
          type="button"
          className={styles[`todoItem__actions-done`]}
          onClick={handleCheckTodo}
        >
          {todo.done ? (
            <>
              <XIcon />
              <span>Mark as undone</span>
            </>
          ) : (
            <>
              <DoneIcon />
              <span>Mark as done</span>
            </>
          )}
        </button>
        <div className={styles[`todoItem__edit-delete`]}>
          <button
            type="button"
            className={styles[`todoItem__actions-button`]}
            onClick={() => setModalInfo(todo)}
          >
            <EditIcon />
          </button>
          <button
            type="button"
            onClick={handleDeleteTodo}
            className={styles[`todoItem__actions-button`]}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </article>
  );
}
