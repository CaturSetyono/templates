/**
 * Safe Access Utilities for Dynamic Config
 * Provides type-safe accessors that handle missing fields gracefully
 */

/**
 * Safely get a nested property from an object
 * Returns undefined if any part of the path is missing
 */
export function safeGet<T = any>(obj: any, path: string, defaultValue?: T): T | undefined {
  if (!obj) return defaultValue;

  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue;
    }
    result = result[key];
  }

  return result !== undefined ? result : defaultValue;
}

/**
 * Check if an object has any meaningful content
 * Useful for conditional rendering
 */
export function hasContent(obj: any): boolean {
  if (!obj) return false;
  if (typeof obj === 'string') return obj.trim().length > 0;
  if (typeof obj === 'number') return true;
  if (typeof obj === 'boolean') return true;
  if (Array.isArray(obj)) return obj.length > 0;
  if (typeof obj === 'object') return Object.keys(obj).length > 0;
  return false;
}

/**
 * Get array safely, returns empty array if not valid
 */
export function safeArray<T = any>(value: any): T[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [];
}

/**
 * Get string safely with fallback
 */
export function safeString(value: any, fallback: string = ''): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  return fallback;
}

/**
 * Get boolean safely
 */
export function safeBoolean(value: any, fallback: boolean = false): boolean {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return fallback;
}

/**
 * Check if section has minimum required content to render
 */
export function canRenderSection(section: any): boolean {
  if (!section) return false;
  if (!section.type) return false;

  const props = section.props;
  if (!props) return false;

  // Check if props has any meaningful content
  return hasContent(props);
}

/**
 * Filter valid items from array based on required fields
 */
export function filterValidItems<T extends Record<string, any>>(
  items: any[],
  requiredFields: (keyof T)[]
): T[] {
  return safeArray(items).filter((item) => {
    if (!item) return false;
    return requiredFields.every((field) => hasContent(item[field]));
  });
}

/**
 * Merge default props with actual props safely
 */
export function mergeProps<T extends Record<string, any>>(defaults: T, actual: Partial<T> = {}): T {
  const result = { ...defaults };

  for (const key in actual) {
    if (hasContent(actual[key])) {
      result[key] = actual[key] as T[Extract<keyof T, string>];
    }
  }

  return result;
}

/**
 * Extract CSS class names safely
 */
export function safeClassName(...classes: any[]): string {
  return classes.filter((cls) => typeof cls === 'string' && cls.trim().length > 0).join(' ');
}
