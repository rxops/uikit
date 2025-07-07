/**
 * RxOps Design System - CSS Variables Export
 * 
 * This file demonstrates how to use our tokenized color system with CSS custom properties.
 * It can be imported into any project to get access to our semantic color tokens.
 */

import { generateSemanticColorCSS, designTokens } from './tokens';

/**
 * Export the CSS custom properties as a string that can be injected into stylesheets
 */
export const semanticColorCSS = generateSemanticColorCSS();

/**
 * Export individual semantic color values for programmatic use
 */
export const semanticColors = {
  // Primary colors
  primary: {
    lighter: designTokens.colors.primary.lighter,
    light: designTokens.colors.primary.light,
    default: designTokens.colors.primary.DEFAULT,
    dark: designTokens.colors.primary.dark,
    darker: designTokens.colors.primary.darker,
  },
  
  // Success colors  
  success: {
    lighter: designTokens.colors.success.lighter,
    light: designTokens.colors.success.light,
    default: designTokens.colors.success.DEFAULT,
    dark: designTokens.colors.success.dark,
    darker: designTokens.colors.success.darker,
  },
  
  // Warning colors
  warning: {
    lighter: designTokens.colors.warning.lighter,
    light: designTokens.colors.warning.light,
    default: designTokens.colors.warning.DEFAULT,
    dark: designTokens.colors.warning.dark,
    darker: designTokens.colors.warning.darker,
  },
  
  // Error colors
  error: {
    lighter: designTokens.colors.error.lighter,
    light: designTokens.colors.error.light,
    default: designTokens.colors.error.DEFAULT,
    dark: designTokens.colors.error.dark,
    darker: designTokens.colors.error.darker,
  },
  
  // Info colors
  info: {
    lighter: designTokens.colors.info.lighter,
    light: designTokens.colors.info.light,
    default: designTokens.colors.info.DEFAULT,
    dark: designTokens.colors.info.dark,
    darker: designTokens.colors.info.darker,
  },

  // Secondary colors
  secondary: {
    lighter: designTokens.colors.secondary.lighter,
    light: designTokens.colors.secondary.light,
    default: designTokens.colors.secondary.DEFAULT,
    dark: designTokens.colors.secondary.dark,
    darker: designTokens.colors.secondary.darker,
  },
} as const;

/**
 * Utility to inject semantic color CSS variables into the document
 * Use this in your application's entry point to make semantic colors available globally
 */
export function injectSemanticColors(): void {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = semanticColorCSS;
    document.head.appendChild(style);
  }
}

export default semanticColors;
