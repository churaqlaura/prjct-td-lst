import React, { useState } from 'react';
import { PlusCircle, Calendar } from 'lucide-react';
import { Priority, Category } from '../types/todo';

interface AddTodoFormProps {
  onAdd: (title: string, priority: Priority, category: Category, dueDate?: Date) => void;
}

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('personal');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(
        title,
        priority,
        category,
        dueDate ? new Date(dueDate) : undefined
      );
      setTitle('');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full px-4 py-2 text-lg border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <div className="flex gap-4 flex-wrap">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
          </select>

          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-slate-400" />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <PlusCircle className="w-5 h-5" />
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}