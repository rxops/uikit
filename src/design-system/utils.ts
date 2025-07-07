/**
 * Design System Utilities
 * 
 * Common utility functions for component development
 */

// Type for class values that supports reasonable nesting depth
type ClassValue = 
  | string 
  | undefined 
  | null 
  | false
  | ClassValue[];

/**
 * Enhanced utility to merge class names with comprehensive edge case handling
 * Handles Qwik's class and React's className for maximum compatibility
 * 
 * Features:
 * - Handles undefined/null/false class values
 * - Maintains proper precedence order (base → variant → custom)
 * - Supports conditional classes and nested arrays
 * - Performance optimized with deduplication for large class lists
 * - Maintains order for CSS cascade correctness
 */
export function mergeClasses(...classLists: ClassValue[]): string {
  const flatten = (arr: ClassValue[]): string[] => {
    const result: string[] = [];
    
    for (const item of arr) {
      if (!item) continue; // Skip falsy values
      
      if (typeof item === 'string') {
        // Split by whitespace and filter out empty strings
        const classes = item.split(/\s+/).filter(Boolean);
        result.push(...classes);
      } else if (Array.isArray(item)) {
        // Recursively flatten nested arrays
        result.push(...flatten(item));
      }
    }
    
    return result;
  };

  const classes = flatten(classLists);
  
  // Remove duplicates while preserving order (last occurrence wins)
  const seen = new Set<string>();
  const deduped: string[] = [];
  
  // Process in reverse to maintain CSS cascade order
  for (let i = classes.length - 1; i >= 0; i--) {
    const cls = classes[i];
    if (!seen.has(cls)) {
      seen.add(cls);
      deduped.unshift(cls);
    }
  }
  
  return deduped.join(' ');
}

/**
 * Base component props interface for all UI components
 */
export interface BaseComponentProps {
  /** Component ID for DOM targeting */
  id?: string;
  /** CSS class names (Qwik) */
  class?: string;
  /** CSS class names (React compatibility) */
  className?: string;
  /** Inline styles */
  style?: string;
  /** Test ID for automated testing */
  testId?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}
