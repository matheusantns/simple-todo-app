import { useMemo, useState } from 'react';
import styles from './App.module.css';
import AddTodoInput from './components/AddTodoForm/AddTodoForm';
import MainContainer from './components/MainContainer/MainContainer';
import type { TodoItemType } from './types/todo';
import TodoItem from './components/TodoItem/TodoItem';
import { createPortal } from 'react-dom';
import EditTodoModal from './components/EditTodoModal/EditTodoModal';
import { useTodoContext } from './components/hooks/useTodoContext';
import { useTodoValidation } from './components/hooks/useTodoValidation';
import useLocalStorage from './components/hooks/useLocalStorage';

function App() {
  const { state } = useTodoContext();
  const [modalInfo, setModalInfo] = useState<TodoItemType | null>(null);
  const { error, validate } = useTodoValidation(state.todos);
  useLocalStorage<TodoItemType[]>('todos', state.todos);

  const renderedTodos = useMemo(() => {
    return state.todos.map((item, index) => (
      <TodoItem key={`${item.title}-${index}`} todo={item} setModalInfo={setModalInfo} />
    ));
  }, [state.todos]);

  return (
    <>
      <MainContainer>
        <h1 id={styles.mainTitle}>Simple To-do App</h1>
        <AddTodoInput validate={validate} />
        {error && <span className={styles.todoContainer__error}>{error.message}</span>}
        <section className={styles.todoContainer}>{renderedTodos}</section>
      </MainContainer>
      {modalInfo &&
        createPortal(<EditTodoModal todo={modalInfo} setModalInfo={setModalInfo} />, document.body)}
    </>
  );
}

export default App;
