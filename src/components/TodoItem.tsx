import React from 'react';
import { CheckCircle2, Circle, Trash2, Edit, Calendar } from 'lucide-react';
import { Todo } from '../types/todo';
import { formatDueDate, getDueDateColor } from '../utils/dateUtils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Todo>) => void;
}

const priorityColors = {
  low: 'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  high: 'bg-rose-100 text-rose-800',
};

const categoryColors = {
  personal: 'bg-violet-100 text-violet-800',
  work: 'bg-blue-100 text-blue-800',
  shopping: 'bg-teal-100 text-teal-800',
  health: 'bg-orange-100 text-orange-800',
};

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const handleEditClick = () => {
    const newDueDate = prompt('Enter due date (YYYY-MM-DD):', 
      todo.dueDate ? todo.dueDate.toISOString().split('T')[0] : '');
    
    if (newDueDate) {
      onEdit(todo.id, { dueDate: new Date(newDueDate) });
    }
  };

  return (
    <div
      className={`flex items-center p-4 mb-3 bg-white rounded-lg shadow-sm border-l-4 
        ${todo.completed ? 'border-l-green-400 opacity-75' : 'border-l-amber-400'}`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className="flex-shrink-0 mr-3 text-slate-400 hover:text-slate-600"
      >
        {todo.completed ? (
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        ) : (
          <Circle className="w-6 h-6" />
        )}
      </button>

      <div className="flex-grow">
        <h3
          className={`text-lg ${
            todo.completed ? 'line-through text-slate-500' : 'text-slate-700'
          }`}
        >
          {todo.title}
        </h3>
        <div className="flex gap-2 mt-2 items-center">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              priorityColors[todo.priority]
            }`}
          >
            {todo.priority}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              categoryColors[todo.category]
            }`}
          >
            {todo.category}
          </span>
          {todo.dueDate && (
            <span className={`text-xs flex items-center gap-1 ${getDueDateColor(todo.dueDate)}`}>
              <Calendar className="w-3 h-3" />
              {formatDueDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={handleEditClick}
          className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
        >
          <Edit className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-slate-400 hover:text-rose-600 rounded-full hover:bg-rose-50"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}