/**
 * RxOps Design System - CSS Variables Export
 * 
 * This file demonstrates how to use our tokenized color system with CSS custom properties.
 * It can be imported into any project to get access to our semantic color tokens.
 */

import { designTokens } from './tokens';

/**
 * Generates a CSS string containing all design tokens as CSS custom properties.
 * This centralizes the token-to-CSS conversion, making the design system
 * more dynamic and easier to theme.
 */
export function generateDesignTokenCSS(): string {
  const cssVars: string[] = [':root {'];
  cssVars.push('  /* =============================================== */');
  cssVars.push('  /*    RxOps Design System - Global Tokens      */');
  cssVars.push('  /* =============================================== */\\n');

  // -------------------- Color System --------------------
  cssVars.push('  /* 1. Color System */');
  for (const [colorName, colorScale] of Object.entries(designTokens.colors)) {
    for (const [scaleName, colorValue] of Object.entries(colorScale)) {
      if (typeof colorValue === 'string') {
        const varName = `--rx-color-${colorName}-${scaleName.toLowerCase()}`.replace('-default', '');
        cssVars.push(`  ${varName}: ${colorValue};`);
      }
    }
  }
  cssVars.push(''); // Add a blank line for readability

  // -------------------- Spacing System --------------------
  cssVars.push('  /* 2. Spacing System */');
  for (const [spacingName, spacingValue] of Object.entries(designTokens.spacing)) {
    cssVars.push(`  --rx-spacing-${spacingName}: ${spacingValue};`);
  }
  cssVars.push('');

  // -------------------- Typography System --------------------
  cssVars.push('  /* 3. Typography System */');
  // Font Family
  for (const [fontName, fontValue] of Object.entries(designTokens.typography.fontFamily)) {
    cssVars.push(`  --rx-font-${fontName}: ${fontValue.join(', ')};`);
  }
  // Font Size
  for (const [sizeName, sizeValue] of Object.entries(designTokens.typography.fontSize)) {
    cssVars.push(`  --rx-text-${sizeName}: ${sizeValue[0]};`);
    cssVars.push(`  --rx-text-${sizeName}-line-height: ${sizeValue[1].lineHeight};`);
  }
  // Font Weight
  for (const [weightName, weightValue] of Object.entries(designTokens.typography.fontWeight)) {
    cssVars.push(`  --rx-font-${weightName}: ${weightValue};`);
  }
  cssVars.push('');

  // -------------------- Border Radius --------------------
  cssVars.push('  /* 4. Border Radius */');
  for (const [radiusName, radiusValue] of Object.entries(designTokens.borderRadius)) {
    const varName = `--rx-radius-${radiusName}`.replace('-default', '');
    cssVars.push(`  ${varName}: ${radiusValue};`);
  }
  cssVars.push('');

  // -------------------- Shadows --------------------
  cssVars.push('  /* 5. Shadows (Box Shadow) */');
  for (const [shadowName, shadowValue] of Object.entries(designTokens.boxShadow)) {
    const varName = `--rx-shadow-${shadowName}`.replace('-default', '');
    cssVars.push(`  ${varName}: ${shadowValue};`);
  }
  cssVars.push('');

  // -------------------- Animation & Transitions --------------------
  cssVars.push('  /* 6. Animation & Transitions */');
  for (const [transitionName, transitionValue] of Object.entries(designTokens.animation.transition)) {
      const varName = `--rx-transition-${transitionName}`.replace('-default', '');
      cssVars.push(`  ${varName}: all ${transitionValue};`);
  }
   for (const [easingName, easingValue] of Object.entries(designTokens.animation.easing)) {
      const varName = `--rx-easing-${easingName}`.replace('-default', '');
      cssVars.push(`  ${varName}: ${easingValue};`);
  }
  cssVars.push('');


  // -------------------- Healthcare-Specific Tokens --------------------
  cssVars.push('  /* 7. Healthcare-Specific Tokens */');
  // Focus Ring
  cssVars.push(`  --rx-focus-ring-width: ${designTokens.healthcare.accessibility.focusRing.width};`);
  cssVars.push(`  --rx-focus-ring-style: ${designTokens.healthcare.accessibility.focusRing.style};`);
  cssVars.push(`  --rx-focus-ring-offset: ${designTokens.healthcare.accessibility.focusRing.offset};`);

  // Medical Device Focus Ring
  cssVars.push(`  --rx-medical-device-focus-ring-width: ${designTokens.healthcare.accessibility.medicalDevice.focusRing.width};`);
  cssVars.push(`  --rx-medical-device-focus-ring-style: ${designTokens.healthcare.accessibility.medicalDevice.focusRing.style};`);
  cssVars.push(`  --rx-medical-device-focus-ring-offset: ${designTokens.healthcare.accessibility.medicalDevice.focusRing.offset};`);


  cssVars.push('}');
  return cssVars.join('\n');
}

/**
 * Export the CSS custom properties as a string that can be injected into stylesheets
 */
export const designTokenCSS = generateDesignTokenCSS();

// Legacy export for backward compatibility
export const semanticColorCSS = designTokenCSS;

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
  
  // Caution colors
  caution: {
    lighter: designTokens.colors.caution.lighter,
    light: designTokens.colors.caution.light,
    default: designTokens.colors.caution.DEFAULT,
    dark: designTokens.colors.caution.dark,
    darker: designTokens.colors.caution.darker,
  },
  
  // Danger colors
  danger: {
    lighter: designTokens.colors.danger.lighter,
    light: designTokens.colors.danger.light,
    default: designTokens.colors.danger.DEFAULT,
    dark: designTokens.colors.danger.dark,
    darker: designTokens.colors.danger.darker,
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
 * Utility to inject design token CSS variables into the document
 * Use this in your application's entry point to make design tokens available globally
 */
export function injectDesignTokens(): void {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = designTokenCSS;
    document.head.appendChild(style);
  }
}

// Legacy export for backward compatibility
export const injectSemanticColors = injectDesignTokens;
