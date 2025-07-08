/**
 * RxOps Design System - Design Tokens
 * Healthcare-focused design system tokens optimized for Tailwind CSS
 */

export const designTokens = {
    // ==================== COLOR SYSTEM ====================
    colors: {
        // Primary brand colors - Healthcare blue (maps to Tailwind blue)
        primary: {
            50: '#eff6ff',   // blue-50
            100: '#dbeafe',  // blue-100
            200: '#bfdbfe',  // blue-200
            300: '#93c5fd',  // blue-300
            400: '#60a5fa',  // blue-400
            500: '#3b82f6',  // blue-500 - Main brand
            600: '#2563eb',  // blue-600
            700: '#1d4ed8',  // blue-700
            800: '#1e40af',  // blue-800
            900: '#1e3a8a',  // blue-900
            // Semantic aliases - Updated for proper button styling
            lighter: '#dbeafe',  // 100
            light: '#93c5fd',    // 300
            DEFAULT: '#2563eb',  // 600 - Better for buttons
            dark: '#1d4ed8',     // 700 - Better for hover
            darker: '#1e40af',   // 800 - Darker variant
        },

        // Secondary colors - For secondary actions (lighter neutral)
        secondary: {
            0: '#ffffff',    // white
            50: '#f9fafb',   // gray-50 -> change to neutral
            100: '#f3f4f6',  // gray-100
            200: '#e5e7eb',  // gray-200
            300: '#d1d5db',  // gray-300
            400: '#9ca3af',  // gray-400
            500: '#6b7280',  // gray-500
            600: '#4b5563',  // gray-600
            700: '#374151',  // gray-700
            800: '#1f2937',  // gray-800
            900: '#111827',  // gray-900
            // Semantic aliases - Updated for proper button styling
            lighter: '#f3f4f6',  // 100
            light: '#d1d5db',    // 300
            DEFAULT: '#4b5563',  // 600 - Better for buttons
            dark: '#374151',     // 700 - Better for hover
            darker: '#1f2937',   // 800 - Darker variant
        },

        // Base colors (maps to Tailwind gray - for text, borders, neutral elements)
        base: {
            50: '#fafafa',   // neutral-50
            100: '#f5f5f5',  // neutral-100
            200: '#e5e5e5',  // neutral-200
            300: '#d4d4d4',  // neutral-300
            400: '#a3a3a3',  // neutral-400
            500: '#737373',  // neutral-500
            600: '#525252',  // neutral-600
            700: '#404040',  // neutral-700
            800: '#262626',  // neutral-800
            900: '#171717',  // neutral-900
            // Semantic aliases - Designed for secondary actions
            lighter: '#f5f5f5',  // 100 - light background
            light: '#e5e5e5',    // 200 - slightly darker
            DEFAULT: '#d4d4d4',  // 300 - main secondary color (light for secondary actions)
            dark: '#a3a3a3',     // 400 - darker for hover
            darker: '#737373',   // 500 - darkest variant
        },

        // Text colors - Optimized hierarchy for readability
        text: {
            50: '#f9fafb',   // neutral-50 - very light text (on dark backgrounds)
            100: '#f3f4f6',  // neutral-100 - light text
            200: '#e5e7eb',  // neutral-200 - muted text
            300: '#d1d5db',  // neutral-300 - subtle text
            400: '#9ca3af',  // neutral-400 - placeholder text
            500: '#6b7280',  // neutral-500 - secondary text
            600: '#4b5563',  // neutral-600 - body text
            700: '#374151',  // neutral-700 - primary text
            800: '#1f2937',  // neutral-800 - heading text
            900: '#111827',  // neutral-900 - high contrast text
            // Semantic aliases - Optimized for text readability
            lighter: '#9ca3af',  // 400 - placeholder/disabled text
            light: '#6b7280',    // 500 - secondary/helper text
            DEFAULT: '#4b5563',  // 600 - default body text
            dark: '#374151',     // 700 - primary text/labels
            darker: '#1f2937',   // 800 - headings/emphasis
        },

        // Semantic colors
        success: {
            50: '#f0fdf4',   // green-50
            100: '#dcfce7',  // green-100
            200: '#bbf7d0',  // green-200
            300: '#86efac',  // green-300
            400: '#4ade80',  // green-400
            500: '#22c55e',  // green-500
            600: '#16a34a',  // green-600
            700: '#15803d',  // green-700
            800: '#166534',  // green-800
            900: '#14532d',  // green-900
            // Semantic aliases - Updated for proper button styling
            lighter: '#dcfce7',  // 100
            light: '#86efac',    // 300
            DEFAULT: '#16a34a',  // 600 - Better for buttons
            dark: '#15803d',     // 700 - Better for hover
            darker: '#166534',   // 800 - Darker variant
        },

        caution: {
            50: '#fffbeb',   // amber-50
            100: '#fefce8',  // amber-100 (softer for healthcare)
            200: '#fef3c7',  // amber-200
            300: '#fde68a',  // amber-300
            400: '#fbbf24',  // amber-400
            500: '#f59e0b',  // amber-500
            600: '#d97706',  // amber-600
            700: '#b45309',  // amber-700
            800: '#92400e',  // amber-800
            900: '#78350f',  // amber-900
            // Semantic aliases - Updated for better visibility
            lighter: '#fde68a',  // 300 - More visible than 200
            light: '#f59e0b',    // 500 - Stronger for better contrast
            DEFAULT: '#d97706',  // 600 - Better for buttons
            dark: '#b45309',     // 700 - Better for hover
            darker: '#92400e',   // 800 - Darker variant
        },

        danger: {
            50: '#fef2f2',   // red-50
            100: '#fee2e2',  // red-100
            200: '#fecaca',  // red-200
            300: '#fca5a5',  // red-300
            400: '#f87171',  // red-400
            500: '#ef4444',  // red-500
            600: '#dc2626',  // red-600
            700: '#b91c1c',  // red-700
            800: '#991b1b',  // red-800
            900: '#7f1d1d',  // red-900
            // Semantic aliases - Updated for proper button styling
            lighter: '#fee2e2',  // 100
            light: '#fca5a5',    // 300
            DEFAULT: '#dc2626',  // 600 - Better for buttons
            dark: '#b91c1c',     // 700 - Better for hover
            darker: '#991b1b',   // 800 - Darker variant
        },

        info: {
            50: '#ecfeff',   // cyan-50
            100: '#e0f2fe',  // sky-100 (better for healthcare info)
            200: '#bae6fd',  // sky-200
            300: '#7dd3fc',  // sky-300
            400: '#38bdf8',  // sky-400
            500: '#0ea5e9',  // sky-500
            600: '#0284c7',  // sky-600
            700: '#0369a1',  // sky-700
            800: '#075985',  // sky-800
            900: '#0c4a6e',  // sky-900
            // Semantic aliases - Updated for proper button styling
            lighter: '#e0f2fe',  // 100
            light: '#7dd3fc',    // 300
            DEFAULT: '#0284c7',  // 600 - Better for buttons
            dark: '#0369a1',     // 700 - Better for hover
            darker: '#075985',   // 800 - Darker variant
        },
    },

    // ==================== SPACING SYSTEM ====================
    spacing: {
        0: '0px',      // space-0
        1: '0.25rem',  // space-1 (4px)
        2: '0.5rem',   // space-2 (8px)
        3: '0.75rem',  // space-3 (12px)
        4: '1rem',     // space-4 (16px)
        5: '1.25rem',  // space-5 (20px)
        6: '1.5rem',   // space-6 (24px)
        8: '2rem',     // space-8 (32px)
        10: '2.5rem',  // space-10 (40px)
        12: '3rem',    // space-12 (48px)
        16: '4rem',    // space-16 (64px)
        20: '5rem',    // space-20 (80px)
        24: '6rem',    // space-24 (96px)
    },

    // ==================== TYPOGRAPHY SYSTEM ====================
    typography: {
        fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            mono: ['Monaco', 'Consolas', 'monospace'],
        },
        fontSize: {
            xs: ['0.75rem', { lineHeight: '1rem' }],     // text-xs
            sm: ['0.875rem', { lineHeight: '1.25rem' }], // text-sm
            base: ['1rem', { lineHeight: '1.5rem' }],    // text-base
            lg: ['1.125rem', { lineHeight: '1.75rem' }], // text-lg
            xl: ['1.25rem', { lineHeight: '1.75rem' }],  // text-xl
            '2xl': ['1.5rem', { lineHeight: '2rem' }],   // text-2xl
            '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // text-3xl
            '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // text-4xl
            '5xl': ['3rem', { lineHeight: '1' }],           // text-5xl
        },
        fontWeight: {
            thin: '100',       // font-thin
            light: '300',      // font-light
            normal: '400',     // font-normal
            medium: '500',     // font-medium
            semibold: '600',   // font-semibold
            bold: '700',       // font-bold
            extrabold: '800',  // font-extrabold
            black: '900',      // font-black
        },
    },

    // ==================== COMPONENT SIZES ====================
    componentSizes: {
        xs: {
            padding: { x: 2, y: 1 },    // px-2 py-1
            text: 'xs',                 // text-xs
            height: '1.75rem',          // h-7
            borderRadius: '0.125rem',   // rounded-sm (2px)
        },
        sm: {
            padding: { x: 3, y: 1.5 }, // px-3 py-1.5
            text: 'sm',                 // text-sm
            height: '2rem',             // h-8
            borderRadius: '0.25rem',    // rounded (4px)
        },
        md: {
            padding: { x: 4, y: 2 },   // px-4 py-2
            text: 'base',               // text-base
            height: '2.5rem',           // h-10
            borderRadius: '0.375rem',   // rounded-md (6px)
        },
        lg: {
            padding: { x: 6, y: 3 },   // px-6 py-3
            text: 'lg',                 // text-lg
            height: '3rem',             // h-12
            borderRadius: '0.5rem',     // rounded-lg (8px)
        },
        xl: {
            padding: { x: 8, y: 4 },   // px-8 py-4
            text: 'xl',                 // text-xl
            height: '3.5rem',           // h-14
            borderRadius: '0.75rem',    // rounded-xl (12px)
        },
    },

    // ==================== BORDER RADIUS ====================
    borderRadius: {
        none: '0px',        // rounded-none
        sm: '0.125rem',     // rounded-sm
        DEFAULT: '0.25rem', // rounded
        md: '0.375rem',     // rounded-md
        lg: '0.5rem',       // rounded-lg
        xl: '0.75rem',      // rounded-xl
        '2xl': '1rem',      // rounded-2xl
        full: '9999px',     // rounded-full
    },

    // ==================== SHADOWS ====================
    boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },

    // ==================== ANIMATION & TRANSITIONS ====================
    animation: {
        transition: {
            fast: '150ms ease-in-out',
            DEFAULT: '200ms ease-in-out',
            slow: '300ms ease-in-out',
        },
        easing: {
            DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
            in: 'cubic-bezier(0.4, 0, 1, 1)',
            out: 'cubic-bezier(0, 0, 0.2, 1)',
            inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
    },

    // ==================== HEALTHCARE-SPECIFIC TOKENS ====================
    healthcare: {
        priorities: {
            low: { color: 'success', intensity: 600 },
            normal: { color: 'primary', intensity: 600 },
            high: { color: 'caution', intensity: 600 },
            urgent: { color: 'danger', intensity: 600 },
            critical: { color: 'danger', intensity: 700 },
        },
        accessibility: {
            focusRing: {
                width: '2px',
                style: 'solid',
                offset: '2px',
            },
            medicalDevice: {
                focusRing: {
                    width: '4px',
                    style: 'solid',
                    offset: '4px',
                },
            },
        },
    },
} as const;

// ==================== TYPE DEFINITIONS ====================
export type ColorScale = keyof typeof designTokens.colors.primary;
export type SemanticColorAlias = 'lighter' | 'light' | 'DEFAULT' | 'dark' | 'darker';
export type ComponentSize = keyof typeof designTokens.componentSizes;
export type SpacingKey = keyof typeof designTokens.spacing;
export type FontSize = keyof typeof designTokens.typography.fontSize;
export type FontWeight = keyof typeof designTokens.typography.fontWeight;
export type BorderRadius = keyof typeof designTokens.borderRadius;
export type BoxShadow = keyof typeof designTokens.boxShadow;
export type SemanticColorName = 'primary' | 'secondary' | 'base' | 'text' | 'success' | 'caution' | 'danger' | 'info';
export type HealthcareIntent = 'primary' | 'secondary' | 'success' | 'caution' | 'danger' | 'info';

// ==================== UTILITY FUNCTIONS ====================

/**
 * Generate CSS custom properties for semantic colors
 */
export function generateSemanticColorCSS(): string {
    const cssVars: string[] = [':root {'];
    cssVars.push('  /* Color System - Semantic color palettes for Tailwind CSS v4 */');

    // Primary Colors
    cssVars.push('  /* Primary Colors */');
    cssVars.push(`  --color-primary-lighter: ${designTokens.colors.primary.lighter};`);
    cssVars.push(`  --color-primary-light: ${designTokens.colors.primary.light};`);
    cssVars.push(`  --color-primary: ${designTokens.colors.primary.DEFAULT};`);
    cssVars.push(`  --color-primary-dark: ${designTokens.colors.primary.dark};`);
    cssVars.push(`  --color-primary-darker: ${designTokens.colors.primary.darker};`);

    // Success Colors
    cssVars.push('  ');
    cssVars.push('  /* Success Colors */');
    cssVars.push(`  --color-success-lighter: ${designTokens.colors.success.lighter};`);
    cssVars.push(`  --color-success-light: ${designTokens.colors.success.light};`);
    cssVars.push(`  --color-success: ${designTokens.colors.success.DEFAULT};`);
    cssVars.push(`  --color-success-dark: ${designTokens.colors.success.dark};`);
    cssVars.push(`  --color-success-darker: ${designTokens.colors.success.darker};`);

    // Caution Colors
    cssVars.push('  ');
    cssVars.push('  /* Caution Colors - Softer amber palette for healthcare */');
    cssVars.push(`  --color-caution-lighter: ${designTokens.colors.caution.lighter};`);
    cssVars.push(`  --color-caution-light: ${designTokens.colors.caution.light};`);
    cssVars.push(`  --color-caution: ${designTokens.colors.caution.DEFAULT};`);
    cssVars.push(`  --color-caution-dark: ${designTokens.colors.caution.dark};`);
    cssVars.push(`  --color-caution-darker: ${designTokens.colors.caution.darker};`);

    // Danger Colors
    cssVars.push('  ');
    cssVars.push('  /* Danger Colors */');
    cssVars.push(`  --color-danger-lighter: ${designTokens.colors.danger.lighter};`);
    cssVars.push(`  --color-danger-light: ${designTokens.colors.danger.light};`);
    cssVars.push(`  --color-danger: ${designTokens.colors.danger.DEFAULT};`);
    cssVars.push(`  --color-danger-dark: ${designTokens.colors.danger.dark};`);
    cssVars.push(`  --color-danger-darker: ${designTokens.colors.danger.darker};`);

    // Info Colors
    cssVars.push('  ');
    cssVars.push('  /* Info Colors */');
    cssVars.push(`  --color-info-lighter: ${designTokens.colors.info.lighter};`);
    cssVars.push(`  --color-info-light: ${designTokens.colors.info.light};`);
    cssVars.push(`  --color-info: ${designTokens.colors.info.DEFAULT};`);
    cssVars.push(`  --color-info-dark: ${designTokens.colors.info.dark};`);
    cssVars.push(`  --color-info-darker: ${designTokens.colors.info.darker};`);

    // Secondary Colors
    cssVars.push('  ');
    cssVars.push('  /* Secondary Colors */');
    cssVars.push(`  --color-secondary-lighter: ${designTokens.colors.secondary.lighter};`);
    cssVars.push(`  --color-secondary-light: ${designTokens.colors.secondary.light};`);
    cssVars.push(`  --color-secondary: ${designTokens.colors.secondary.DEFAULT};`);
    cssVars.push(`  --color-secondary-dark: ${designTokens.colors.secondary.dark};`);
    cssVars.push(`  --color-secondary-darker: ${designTokens.colors.secondary.darker};`);

    // Base Colors (for backgrounds/borders)
    cssVars.push('  ');
    cssVars.push('  /* Base Colors */');
    cssVars.push(`  --color-base-lighter: ${designTokens.colors.base.lighter};`);
    cssVars.push(`  --color-base-light: ${designTokens.colors.base.light};`);
    cssVars.push(`  --color-base: ${designTokens.colors.base.DEFAULT};`);
    cssVars.push(`  --color-base-dark: ${designTokens.colors.base.dark};`);
    cssVars.push(`  --color-base-darker: ${designTokens.colors.base.darker};`);

    // Text Colors (optimized hierarchy)
    cssVars.push('  ');
    cssVars.push('  /* Text Colors */');
    cssVars.push(`  --color-text-lighter: ${designTokens.colors.text.lighter};`);
    cssVars.push(`  --color-text-light: ${designTokens.colors.text.light};`);
    cssVars.push(`  --color-text: ${designTokens.colors.text.DEFAULT};`);
    cssVars.push(`  --color-text-dark: ${designTokens.colors.text.dark};`);
    cssVars.push(`  --color-text-darker: ${designTokens.colors.text.darker};`);

    cssVars.push('}');
    return cssVars.join('\n');
}

/**
 * Get semantic color value by name and variant
 */
export function getSemanticColor(colorName: SemanticColorName, variant: SemanticColorAlias = 'DEFAULT'): string {
    return designTokens.colors[colorName][variant];
}

/**
 * Get Tailwind class for a color and shade
 */
export function getColorClass(colorName: string, shade: ColorScale, type: 'bg' | 'text' | 'border' = 'bg'): string {
    const colorMap: Record<string, string> = {
        primary: 'blue',
        secondary: 'gray',
        base: 'gray',
        text: 'gray',
        success: 'green',
        caution: 'amber',
        danger: 'red',
        info: 'sky',
    };

    const tailwindColor = colorMap[colorName] || colorName;
    return `${type}-${tailwindColor}-${shade}`;
}

/**
 * Get semantic Tailwind class for color and variant
 */
export function getSemanticColorClass(colorName: SemanticColorName, variant: SemanticColorAlias = 'DEFAULT', type: 'bg' | 'text' | 'border' = 'bg'): string {
    const colorMap: Record<string, string> = {
        primary: 'blue',
        secondary: 'gray',
        base: 'gray',
        text: 'gray',
        success: 'green',
        caution: 'amber',
        danger: 'red',
        info: 'sky',
    };

    const variantMap: Record<SemanticColorAlias, string> = {
        lighter: '100',
        light: '300',
        DEFAULT: '600',  // Changed from 500 to 600 for proper button styling
        dark: '700',     // Changed from 600 to 700 for proper hover states
        darker: '800',   // Changed from 700 to 800 for darker variants
    };

    const tailwindColor = colorMap[colorName];
    const tailwindShade = variantMap[variant];

    return `${type}-${tailwindColor}-${tailwindShade}`;
}

/**
 * Get spacing class for Tailwind
 */
export function getSpacingClass(property: 'p' | 'm' | 'px' | 'py' | 'mx' | 'my', value: SpacingKey): string {
    return `${property}-${value}`;
}

/**
 * Get component size classes
 */
export function getComponentSizeClasses(size: ComponentSize): {
    padding: string;
    text: string;
    height?: string;
    borderRadius: string;
} {
    const sizeConfig = designTokens.componentSizes[size];
    return {
        padding: `px-${sizeConfig.padding.x} py-${sizeConfig.padding.y}`,
        text: `text-${sizeConfig.text}`,
        height: sizeConfig.height ? `h-${sizeConfig.height.replace('rem', '').replace('px', '')}` : undefined,
        borderRadius: sizeConfig.borderRadius,
    };
}

export default designTokens;
