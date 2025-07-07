/**
 * RxOps Design System - Tokenized Color System Implementation
 * 
 * This file demonstrates how our Button component now uses the tokenized semantic color system
 * instead of hardcoded Tailwind classes.
 */

// BEFORE (Hardcoded approach):
// const intentStyles = {
//   primary: "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700 focus:ring-blue-500",
//   success: "bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700 focus:ring-green-500",
//   // ... more hardcoded styles
// };

// AFTER (Tokenized approach):
// Uses semantic color functions:
// - getSemanticColorClass('primary', 'DEFAULT', 'bg')   → bg-blue-600
// - getSemanticColorClass('primary', 'dark', 'bg')      → bg-blue-700
// - getSemanticColorClass('success', 'DEFAULT', 'bg')   → bg-green-600
// - getSemanticColorClass('success', 'dark', 'bg')      → bg-green-700

import { 
  semanticColors, 
  getSemanticColorClass, 
  generateSemanticColorCSS 
} from '../design-system';

// ==================== TOKENIZED COLOR USAGE EXAMPLES ====================

/**
 * Example 1: Programmatic color access
 */
export const colorExamples = {
  // Direct semantic color values
  primaryDefault: semanticColors.primary.default,    // #3b82f6
  primaryDark: semanticColors.primary.dark,          // #2563eb
  successLight: semanticColors.success.light,        // #86efac
  cautionDefault: semanticColors.caution.default,    // #f59e0b
  
  // Generated Tailwind classes
  primaryBg: getSemanticColorClass('primary', 'DEFAULT', 'bg'),     // "bg-blue-600"
  primaryHoverBg: getSemanticColorClass('primary', 'dark', 'bg'),   // "bg-blue-700"
  secondaryBg: getSemanticColorClass('secondary', 'DEFAULT', 'bg'), // "bg-gray-300"
  successText: getSemanticColorClass('success', 'DEFAULT', 'text'), // "text-green-600"
  errorBorder: getSemanticColorClass('danger', 'DEFAULT', 'border'), // "border-red-600"
};

/**
 * Example 2: CSS Custom Properties Generation
 */
export const cssVariables = generateSemanticColorCSS();
// Output:
// :root {
//   --color-primary-lighter: #dbeafe;
//   --color-primary-light: #93c5fd;
//   --color-primary: #3b82f6;
//   --color-primary-dark: #2563eb;
//   --color-primary-darker: #1d4ed8;
//   ... (all semantic colors)
// }

/**
 * Example 3: Button Component Implementation
 * 
 * The Button component now uses this pattern:
 */
export function getButtonIntentExample(intent: 'primary' | 'success' | 'caution' | 'danger') {
  return {
    // Instead of hardcoded "bg-blue-600", we use:
    background: getSemanticColorClass(intent, 'DEFAULT', 'bg'),
    
    // Instead of hardcoded "hover:bg-blue-700", we use:
    hoverBackground: `hover:${getSemanticColorClass(intent, 'dark', 'bg')}`,
    
    // Instead of hardcoded "border-blue-600", we use:
    border: getSemanticColorClass(intent, 'DEFAULT', 'border'),
    
    // Instead of hardcoded "hover:border-blue-700", we use:
    hoverBorder: `hover:${getSemanticColorClass(intent, 'dark', 'border')}`,
  };
}

// ==================== BENEFITS OF TOKENIZED APPROACH ====================

/**
 * Benefits:
 * 
 * 1. CONSISTENCY: All components use the same semantic color tokens
 * 2. MAINTAINABILITY: Change a color in tokens.ts, it updates everywhere
 * 3. FLEXIBILITY: Easy to switch between light/dark themes
 * 4. SCALABILITY: Add new semantic colors without touching components
 * 5. TYPE SAFETY: TypeScript ensures valid color combinations
 * 6. CSS VARIABLES: Can export to CSS custom properties for external use
 * 7. HEALTHCARE FOCUS: Semantic colors designed for medical contexts
 */

// ==================== HEALTHCARE-SPECIFIC USAGE ====================

/**
 * Healthcare semantic color usage examples:
 */
export const healthcareColorUsage = {
  // Patient status indicators
  patientStable: getSemanticColorClass('success', 'DEFAULT', 'bg'),    // Green
  patientCritical: getSemanticColorClass('danger', 'DEFAULT', 'bg'),    // Red
  patientMonitoring: getSemanticColorClass('caution', 'DEFAULT', 'bg'), // Amber
  
  // Medical device interface
  deviceNormal: getSemanticColorClass('primary', 'DEFAULT', 'bg'),     // Blue
  deviceAlert: getSemanticColorClass('caution', 'dark', 'bg'),         // Darker amber
  deviceEmergency: getSemanticColorClass('danger', 'darker', 'bg'),     // Darker red
  
  // Information hierarchy
  primaryInfo: getSemanticColorClass('info', 'DEFAULT', 'text'),       // Sky blue text
  secondaryInfo: getSemanticColorClass('secondary', 'dark', 'text'),   // Gray text for secondary info
  actionRequired: getSemanticColorClass('caution', 'DEFAULT', 'text'), // Amber text
};

export default {
  colorExamples,
  cssVariables,
  healthcareColorUsage,
};
