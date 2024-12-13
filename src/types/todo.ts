export type Priority = 'low' | 'medium' | 'high';
export type Category = 'personal' | 'work' | 'shopping' | 'health';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  createdAt: Date;
  dueDate?: Date;
  order: number;
}