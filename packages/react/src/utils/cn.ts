import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with clsx
 * Handles conditional classes and resolves Tailwind conflicts
 *
 * @example
 * ```ts
 * cn('px-2 py-1', isActive && 'bg-blue-500', 'px-4')
 * // Results in: 'py-1 bg-blue-500 px-4' (px-4 overrides px-2)
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

