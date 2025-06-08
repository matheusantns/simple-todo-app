import { useContext } from 'react';
import { TodoContext, type TodoContextType } from 'src/context/TodoContext';

/**
 * Custom React Hook that ensure that the context is being used inside the provider.
 * @returns { TodoContextType } TodoContextType
 */
export function useTodoContext(): TodoContextType {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error('useTodoContext must be used with a TodoContext');
  }

  return context;
}
