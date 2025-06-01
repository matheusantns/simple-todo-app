import type { Dispatch, SetStateAction } from 'react';
import type { TodoItemType } from '../../types/todo';
import styles from './TodoItem.module.css';
import DoneIcon from './components/DoneIcon';
import EditIcon from './components/EditIcon';
import TrashIcon from './components/TrashIcon';
import XIcon from './components/XIcon';

interface TodoItemProps {
  todo: TodoItemType;
  setTodos: Dispatch<SetStateAction<TodoItemType[]>>;
  setModalInfo: Dispatch<SetStateAction<TodoItemType | null>>;
}

export default function TodoItem({ todo, setTodos, setModalInfo }: TodoItemProps) {
  const handleDeleteTodo = (todoTitle: typeof todo.title) => {
    setTodos((todos) => todos.filter((todo) => todo.title !== todoTitle));
  };

  const handleCheckTodo = (todoTitle: typeof todo.title) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.title === todoTitle) {
          return {
            title: todo.title,
            done: !todo.done,
          };
        }

        return todo;
      })
    );
  };

  return (
    <article
      className={[styles.todoItem, todo.done && styles.todoItem__checked].filter(Boolean).join(' ')}
    >
      <h2 style={todo.done ? { textDecoration: 'line-through' } : {}}>{todo.title}</h2>
      <div className={styles.todoItem__actions}>
        <button
          type="button"
          className={styles[`todoItem__actions-done`]}
          onClick={() => handleCheckTodo(todo.title)}
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
            onClick={() => handleDeleteTodo(todo.title)}
            className={styles[`todoItem__actions-button`]}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </article>
  );
}
