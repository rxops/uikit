/**
 * Design System - Semantic Class Registry
 * 
 * This file ensures all semantic color classes are available for Tailwind CSS v4 detection.
 * It provides a centralized way to generate semantic classes that work across ALL components.
 */

import { type SemanticColorName, type SemanticColorAlias } from './tokens';

/**
 * All possible semantic color combinations that components might use
 * This ensures Tailwind CSS v4 includes them in the final bundle
 */
export const SEMANTIC_CLASSES = {
  // Background classes
  backgrounds: [
    'bg-blue-100', 'bg-blue-300', 'bg-blue-600', 'bg-blue-700', 'bg-blue-800',
    'bg-gray-100', 'bg-gray-300', 'bg-gray-600', 'bg-gray-700', 'bg-gray-800',
    'bg-green-100', 'bg-green-300', 'bg-green-600', 'bg-green-700', 'bg-green-800',
    'bg-amber-100', 'bg-amber-300', 'bg-amber-600', 'bg-amber-700', 'bg-amber-800',
    'bg-red-100', 'bg-red-300', 'bg-red-600', 'bg-red-700', 'bg-red-800',
    'bg-sky-100', 'bg-sky-300', 'bg-sky-600', 'bg-sky-700', 'bg-sky-800',
  ],
  
  // Hover background classes
  hoverBackgrounds: [
    'hover:bg-blue-100', 'hover:bg-blue-300', 'hover:bg-blue-600', 'hover:bg-blue-700', 'hover:bg-blue-800',
    'hover:bg-gray-100', 'hover:bg-gray-300', 'hover:bg-gray-600', 'hover:bg-gray-700', 'hover:bg-gray-800',
    'hover:bg-green-100', 'hover:bg-green-300', 'hover:bg-green-600', 'hover:bg-green-700', 'hover:bg-green-800',
    'hover:bg-amber-100', 'hover:bg-amber-300', 'hover:bg-amber-600', 'hover:bg-amber-700', 'hover:bg-amber-800',
    'hover:bg-red-100', 'hover:bg-red-300', 'hover:bg-red-600', 'hover:bg-red-700', 'hover:bg-red-800',
    'hover:bg-sky-100', 'hover:bg-sky-300', 'hover:bg-sky-600', 'hover:bg-sky-700', 'hover:bg-sky-800',
  ],
  
  // Text classes
  text: [
    'text-blue-100', 'text-blue-300', 'text-blue-600', 'text-blue-700', 'text-blue-800',
    'text-gray-100', 'text-gray-300', 'text-gray-600', 'text-gray-700', 'text-gray-800', 'text-gray-900',
    'text-green-100', 'text-green-300', 'text-green-600', 'text-green-700', 'text-green-800',
    'text-amber-100', 'text-amber-300', 'text-amber-600', 'text-amber-700', 'text-amber-800',
    'text-red-100', 'text-red-300', 'text-red-600', 'text-red-700', 'text-red-800',
    'text-sky-100', 'text-sky-300', 'text-sky-600', 'text-sky-700', 'text-sky-800',
    'text-white',
  ],
  
  // Border classes
  borders: [
    'border-blue-100', 'border-blue-300', 'border-blue-600', 'border-blue-700', 'border-blue-800',
    'border-gray-100', 'border-gray-300', 'border-gray-600', 'border-gray-700', 'border-gray-800',
    'border-green-100', 'border-green-300', 'border-green-600', 'border-green-700', 'border-green-800',
    'border-amber-100', 'border-amber-300', 'border-amber-600', 'border-amber-700', 'border-amber-800',
    'border-red-100', 'border-red-300', 'border-red-600', 'border-red-700', 'border-red-800',
    'border-sky-100', 'border-sky-300', 'border-sky-600', 'border-sky-700', 'border-sky-800',
  ],
  
  // Hover border classes
  hoverBorders: [
    'hover:border-blue-100', 'hover:border-blue-300', 'hover:border-blue-600', 'hover:border-blue-700', 'hover:border-blue-800',
    'hover:border-gray-100', 'hover:border-gray-300', 'hover:border-gray-600', 'hover:border-gray-700', 'hover:border-gray-800',
    'hover:border-green-100', 'hover:border-green-300', 'hover:border-green-600', 'hover:border-green-700', 'hover:border-green-800',
    'hover:border-amber-100', 'hover:border-amber-300', 'hover:border-amber-600', 'hover:border-amber-700', 'hover:border-amber-800',
    'hover:border-red-100', 'hover:border-red-300', 'hover:border-red-600', 'hover:border-red-700', 'hover:border-red-800',
    'hover:border-sky-100', 'hover:border-sky-300', 'hover:border-sky-600', 'hover:border-sky-700', 'hover:border-sky-800',
  ],
  
  // Focus ring classes
  focusRings: [
    'focus:ring-blue-500', 'focus:ring-gray-500', 'focus:ring-green-500', 
    'focus:ring-amber-500', 'focus:ring-red-500', 'focus:ring-sky-500',
  ],
  
  // Ring classes for emergency/medical
  rings: [
    'ring-amber-500', 'ring-amber-600', 'ring-red-500', 'ring-blue-500',
    'ring-2', 'ring-4', 'ring-offset-2', 'ring-offset-4',
  ],
} as const;

/**
 * Improved semantic color class generator that ensures Tailwind detection
 */
export function getSemanticColorClassSafe(
  colorName: SemanticColorName, 
  variant: SemanticColorAlias = 'DEFAULT', 
  type: 'bg' | 'text' | 'border' = 'bg'
): string {
  const colorMap: Record<SemanticColorName, string> = {
    primary: 'blue',
    secondary: 'neutral',
    base: 'neutral',
    text: 'neutral',
    success: 'green',
    caution: 'amber',
    danger: 'red',
    info: 'sky',
  };
  
  const variantMap: Record<SemanticColorAlias, string> = {
    lighter: '100',
    light: '300', 
    DEFAULT: '600',
    dark: '700',
    darker: '800',
  };
  
  const tailwindColor = colorMap[colorName];
  const tailwindShade = variantMap[variant];
  
  return `${type}-${tailwindColor}-${tailwindShade}`;
}

/**
 * Generate semantic button classes that map to our tokens
 */
export function getSemanticButtonClasses(intent: SemanticColorName | 'secondary'): {
  base: string;
  hover: string;
  focus: string;
} {
  // Secondary buttons have their own semantic styling (light background, dark text)
  if (intent === 'secondary') {
    return {
      base: 'bg-gray-100 text-gray-900 border-gray-300',
      hover: 'hover:bg-gray-200 hover:border-gray-400',
      focus: 'focus:ring-gray-500',
    };
  }
  
  // All semantic intents use the standard pattern
  const bgClass = getSemanticColorClassSafe(intent, 'DEFAULT', 'bg');
  const hoverBgClass = getSemanticColorClassSafe(intent, 'dark', 'bg');
  const borderClass = getSemanticColorClassSafe(intent, 'DEFAULT', 'border');
  const hoverBorderClass = getSemanticColorClassSafe(intent, 'dark', 'border');
   const colorMap: Record<SemanticColorName, string> = {
    primary: 'blue',
    secondary: 'gray',
    base: 'gray',
    text: 'gray',
    success: 'green',
    caution: 'amber',
    danger: 'red',
    info: 'sky',
  };
  
  const focusColor = colorMap[intent];
  
  return {
    base: `${bgClass} text-white ${borderClass}`,
    hover: `hover:${hoverBgClass} hover:${hoverBorderClass}`,
    focus: `focus:ring-${focusColor}-500`,
  };
}

/**
 * Export all semantic classes as a single string to ensure Tailwind CSS detection
 * This is used internally and should not be removed as it ensures class inclusion
 */
export const ALL_SEMANTIC_CLASSES = [
  ...SEMANTIC_CLASSES.backgrounds,
  ...SEMANTIC_CLASSES.hoverBackgrounds, 
  ...SEMANTIC_CLASSES.text,
  ...SEMANTIC_CLASSES.borders,
  ...SEMANTIC_CLASSES.hoverBorders,
  ...SEMANTIC_CLASSES.focusRings,
  ...SEMANTIC_CLASSES.rings,
].join(' ');

// This comment ensures Tailwind includes all our semantic classes:
// bg-blue-100 bg-blue-300 bg-blue-600 bg-blue-700 bg-blue-800 hover:bg-blue-100 hover:bg-blue-300 hover:bg-blue-600 hover:bg-blue-700 hover:bg-blue-800
// bg-gray-100 bg-gray-300 bg-gray-600 bg-gray-700 bg-gray-800 hover:bg-gray-100 hover:bg-gray-300 hover:bg-gray-600 hover:bg-gray-700 hover:bg-gray-800  
// bg-green-100 bg-green-300 bg-green-600 bg-green-700 bg-green-800 hover:bg-green-100 hover:bg-green-300 hover:bg-green-600 hover:bg-green-700 hover:bg-green-800
// bg-amber-100 bg-amber-300 bg-amber-600 bg-amber-700 bg-amber-800 hover:bg-amber-100 hover:bg-amber-300 hover:bg-amber-600 hover:bg-amber-700 hover:bg-amber-800
// bg-red-100 bg-red-300 bg-red-600 bg-red-700 bg-red-800 hover:bg-red-100 hover:bg-red-300 hover:bg-red-600 hover:bg-red-700 hover:bg-red-800
// bg-sky-100 bg-sky-300 bg-sky-600 bg-sky-700 bg-sky-800 hover:bg-sky-100 hover:bg-sky-300 hover:bg-sky-600 hover:bg-sky-700 hover:bg-sky-800
// border-blue-100 border-blue-300 border-blue-600 border-blue-700 border-blue-800 hover:border-blue-100 hover:border-blue-300 hover:border-blue-600 hover:border-blue-700 hover:border-blue-800
// border-gray-100 border-gray-300 border-gray-600 border-gray-700 border-gray-800 hover:border-gray-100 hover:border-gray-300 hover:border-gray-600 hover:border-gray-700 hover:border-gray-800
// border-green-100 border-green-300 border-green-600 border-green-700 border-green-800 hover:border-green-100 hover:border-green-300 hover:border-green-600 hover:border-green-700 hover:border-green-800
// border-amber-100 border-amber-300 border-amber-600 border-amber-700 border-amber-800 hover:border-amber-100 hover:border-amber-300 hover:border-amber-600 hover:border-amber-700 hover:border-amber-800
// border-red-100 border-red-300 border-red-600 border-red-700 border-red-800 hover:border-red-100 hover:border-red-300 hover:border-red-600 hover:border-red-700 hover:border-red-800
// border-sky-100 border-sky-300 border-sky-600 border-sky-700 border-sky-800 hover:border-sky-100 hover:border-sky-300 hover:border-sky-600 hover:border-sky-700 hover:border-sky-800
// text-blue-100 text-blue-300 text-blue-600 text-blue-700 text-blue-800 text-gray-100 text-gray-300 text-gray-600 text-gray-700 text-gray-800 text-gray-900 text-white
// text-green-100 text-green-300 text-green-600 text-green-700 text-green-800 text-amber-100 text-amber-300 text-amber-600 text-amber-700 text-amber-800 
// text-red-100 text-red-300 text-red-600 text-red-700 text-red-800 text-sky-100 text-sky-300 text-sky-600 text-sky-700 text-sky-800
// focus:ring-blue-500 focus:ring-gray-500 focus:ring-green-500 focus:ring-amber-500 focus:ring-red-500 focus:ring-sky-500
// ring-amber-500 ring-amber-600 ring-red-500 ring-blue-500 ring-2 ring-4 ring-offset-2 ring-offset-4

export default {
  SEMANTIC_CLASSES,
  getSemanticColorClassSafe,
  getSemanticButtonClasses,
  ALL_SEMANTIC_CLASSES,
};
