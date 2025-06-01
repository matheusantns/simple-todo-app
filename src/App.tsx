import { useEffect, useState } from 'react';
import styles from './App.module.css';
import AddTodoInput from './components/AddTodoInput/AddTodoInput';
import MainContainer from './components/MainContainer/MainContainer';
import type { TodoItemType } from './types/todo';
import TodoItem from './components/TodoItem/TodoItem';
import { createPortal } from 'react-dom';
import EditTodoModal from './components/EditTodoModal/EditTodoModal';
import type { ValidateError } from './utils/validateInput';

function App() {
  const [todos, setTodos] = useState<TodoItemType[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [modalInfo, setModalInfo] = useState<TodoItemType | null>(null);
  const [error, setError] = useState<ValidateError>({} as ValidateError);

  useEffect(() => {
    if (todos.length === 0) {
      return;
    }

    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <MainContainer>
        <AddTodoInput todos={todos} setTodos={setTodos} setError={setError} />
        {error && <span className={styles.todoContainer__error}>{error.message}</span>}
        <section className={styles.todoContainer}>
          {todos.map((item, index) => (
            <TodoItem
              key={`${item.title}-${index}`}
              todo={item}
              setTodos={setTodos}
              setModalInfo={setModalInfo}
            />
          ))}
        </section>
      </MainContainer>
      {modalInfo &&
        createPortal(
          <EditTodoModal
            todos={todos}
            todo={modalInfo}
            setTodos={setTodos}
            setModalInfo={setModalInfo}
            setError={setError}
          />,
          document.body
        )}
    </>
  );
}

export default App;
