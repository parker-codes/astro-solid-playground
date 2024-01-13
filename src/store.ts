import { createStore } from "solid-js/store";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const [todos, setTodos] = createStore<Todo[]>([]);

export { todos, setTodos };

export function addTodo(title: string): Todo {
  const newTodo = {
    id: Date.now(),
    title,
    completed: false,
  };

  setTodos((todos) => [...todos, newTodo]);

  return newTodo;
}

export function removeTodo(id: number) {
  setTodos((todos) => todos.filter((todo) => todo.id !== id));
}

export function toggleTodoCompletion(id: number) {
  setTodos(
    (todo) => todo.id === id,
    "completed",
    (completed) => !completed
  );
}
