/**
 * Utility Functions for Optional-First Rendering
 * Safe operations for handling undefined/null values
 */

/**
 * Safely get a nested property with optional chaining
 */
export function get<T>(obj: unknown, path: string, defaultValue?: T): T | undefined {
  const keys = path.split('.');
  let result: unknown = obj;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return defaultValue;
    }
  }

  return result as T;
}

/**
 * Check if a value is empty (null, undefined, empty string, empty array, empty object)
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Safely map over an array that might be undefined
 */
export function safeMap<T, R>(
  items: T[] | undefined | null,
  callback: (item: T, index: number) => R
): R[] {
  if (!items || items.length === 0) return [];
  return items.map(callback);
}

/**
 * Filter out null/undefined values from an array
 */
export function compact<T>(items: (T | null | undefined)[]): T[] {
  return items.filter((item): item is T => item !== null && item !== undefined);
}

/**
 * Validate if a section has minimum required content to render
 */
export function hasMinimumContent(props: Record<string, unknown> | undefined): boolean {
  if (!props) return false;

  // Check for any truthy non-empty value
  return Object.values(props).some((value) => {
    if (isEmpty(value)) return false;
    if (Array.isArray(value)) return value.length > 0;
    return true;
  });
}

/**
 * Clean undefined properties from an object
 */
export function cleanConfig<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const cleaned: Partial<T> = {};

  for (const key in obj) {
    if (obj[key] !== undefined) {
      cleaned[key] = obj[key];
    }
  }

  return cleaned;
}

/**
 * Merge theme colors with defaults
 */
export function mergeTheme(theme?: { primary?: string; secondary?: string; accent?: string }) {
  return {
    primary: theme?.primary || '#000000',
    secondary: theme?.secondary || '#666666',
    accent: theme?.accent || '#0066cc',
  };
}

/**
 * Generate CSS variables from theme config
 */
export function generateThemeVars(theme?: {
  primary?: string;
  secondary?: string;
  accent?: string;
}): Record<string, string> {
  const merged = mergeTheme(theme);

  return {
    '--color-primary': merged.primary,
    '--color-secondary': merged.secondary,
    '--color-accent': merged.accent,
  };
}

/**
 * Safely extract array of specific type with validation
 */
export function extractArray<T>(value: unknown, validator?: (item: unknown) => item is T): T[] {
  if (!Array.isArray(value)) return [];
  if (!validator) return value as T[];
  return value.filter(validator);
}

/**
 * Type guard for checking if value is a non-empty string
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Type guard for checking if value is a valid number
 */
export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Safely parse a number from string or number input
 */
export function parseNumber(value: unknown, defaultValue: number = 0): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }
  return defaultValue;
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
