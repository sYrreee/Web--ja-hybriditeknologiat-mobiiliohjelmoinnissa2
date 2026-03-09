import { useReducer } from 'react';


type Todo = { id: number; text: string; done: boolean };


type Action = 
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: number }
  | { type: 'TOGGLE'; id: number }; 


function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.text, done: false }]; 
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    case 'TOGGLE':
      
      return state.map(todo => 
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    default:
      return state;
  }
}


export function useTodos() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = (text: string) => dispatch({ type: 'ADD', text });
  const removeTodo = (id: number) => dispatch({ type: 'REMOVE', id });
 
  const toggleTodo = (id: number) => dispatch({ type: 'TOGGLE', id });

  return { todos, addTodo, removeTodo, toggleTodo };
}