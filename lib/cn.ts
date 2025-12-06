/**
 * Tailwind CSS utility for merging class names with clsx
 */
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
