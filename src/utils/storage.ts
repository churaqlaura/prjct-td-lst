import { Todo } from '../types/todo';

export function loadTodos(): Todo[] {
  const saved = localStorage.getItem('todos');
  if (saved) {
    return JSON.parse(saved, (key, value) => {
      if (key === 'createdAt' || key === 'dueDate') {
        return value ? new Date(value) : null;
      }
      return value;
    });
  }
  return [];
}

export function saveTodos(todos: Todo[]) {
  localStorage.setItem('todos', JSON.stringify(todos));
}