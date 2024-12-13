import { useState, useEffect } from 'react';
import { Todo, Priority, Category } from '../types/todo';
import { loadTodos, saveTodos } from '../utils/storage';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (title: string, priority: Priority, category: Category, dueDate?: Date) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
      category,
      createdAt: new Date(),
      dueDate,
      order: todos.length,
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  };

  const reorderTodos = (oldIndex: number, newIndex: number) => {
    setTodos(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(oldIndex, 1);
      result.splice(newIndex, 0, removed);
      return result.map((todo, index) => ({ ...todo, order: index }));
    });
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    reorderTodos,
  };
}