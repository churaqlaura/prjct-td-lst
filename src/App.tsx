import React from 'react';
import { ListTodo } from 'lucide-react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { useTodos } from './hooks/useTodos';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo, reorderTodos } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ListTodo className="w-8 h-8 text-amber-600" />
          <h1 className="text-3xl font-semibold text-slate-800">To-do List</h1>
        </div>

        <AddTodoForm onAdd={addTodo} />

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={updateTodo}
          onReorder={reorderTodos}
        />

        {todos.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p>No tasks yet. Add some tasks to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;