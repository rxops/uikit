import { designTokens } from './src/design-system/tokens';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    // Ensure our color variants are included
    {
      pattern: /^(bg|text|border)-(primary|secondary|success|caution|danger|info)-(50|100|200|300|400|500|600|700|800|900|lighter|light|dark|darker)$/
    },
    {
      pattern: /^(bg|text|border)-(primary|secondary|success|caution|danger|info)$/
    },
    // Add specific classes we use
    'bg-primary', 'text-primary', 'border-primary',
    'bg-secondary', 'text-secondary', 'border-secondary', 
    'bg-success', 'text-success', 'border-success',
    'bg-caution', 'text-caution', 'border-caution',
    'bg-danger', 'text-danger', 'border-danger',
    'bg-info', 'text-info', 'border-info',
    'bg-opacity-10', 'border-opacity-30'
  ],
  theme: {
    extend: {
      colors: {
        // Map our design tokens to Tailwind colors
        primary: designTokens.colors.primary,
        secondary: designTokens.colors.secondary,
        success: designTokens.colors.success,
        caution: designTokens.colors.caution,
        danger: designTokens.colors.danger,
        info: designTokens.colors.info,
        // Map base colors to neutral for backward compatibility
        neutral: designTokens.colors.base,
        // Also include the base colors
        base: designTokens.colors.base,
      },
      fontFamily: {
        sans: designTokens.typography.fontFamily.sans,
        mono: designTokens.typography.fontFamily.mono,
      },
      fontSize: designTokens.typography.fontSize,
      fontWeight: designTokens.typography.fontWeight,
      borderRadius: designTokens.borderRadius,
      boxShadow: designTokens.boxShadow,
      spacing: designTokens.spacing,
    },
  },
  plugins: [],
};
