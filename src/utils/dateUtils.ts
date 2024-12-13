import { format, isToday, isTomorrow, isPast, isThisWeek } from 'date-fns';

export function formatDueDate(date: Date | undefined): string {
  if (!date) return '';
  
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isPast(date)) return `Overdue - ${format(date, 'MMM d')}`;
  if (isThisWeek(date)) return format(date, 'EEEE');
  
  return format(date, 'MMM d');
}

export function getDueDateColor(date: Date | undefined): string {
  if (!date) return '';
  if (isPast(date)) return 'text-rose-600';
  if (isToday(date)) return 'text-amber-600';
  return 'text-slate-600';
}