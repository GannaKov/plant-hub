import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return date.toISOString().split('T')[0]; // => '2025-04-09'
}

export const getInitials = (name: string): string =>
  name.slice(0, 2).toUpperCase(); // => 'AB'
