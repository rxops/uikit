import { component$, Slot, $, type QRL } from "@builder.io/qwik";
import type { ComponentSize, Color, TextWeight, TextAlign, TextTransform, BaseProps } from "../../design-system/types";
import { mergeClasses } from "../../design-system/utils";

export interface TextProps extends BaseProps {
  /** 
   * HTML element tag name to render.
   * This determines the semantic meaning and will automatically apply the appropriate default styling.
   */
  as?: keyof HTMLElementTagNameMap;
  
  /** Size override (takes precedence over element-inferred size) */
  size?: ComponentSize;
  
  /** Font weight */
  weight?: TextWeight;
  
  /** Text alignment */
  align?: TextAlign;
  
  /** Text transform */
  transform?: TextTransform;
  
  /** Color (design token or CSS color value) */
  color?: Color | string;
  
  /** Whether text should be italic */
  italic?: boolean;
  
  /** Whether text should be truncated with ellipsis */
  truncate?: boolean;
  
  /** Number of lines to clamp (requires truncate) */
  lineClamp?: number;
  
  /** Whether text should be selectable */
  selectable?: boolean;
  
  /** Whether the text is interactive (clickable/focusable) */
  interactive?: boolean;
  
  /** Click handler for interactive text */
  onClick$?: QRL<(event: MouseEvent) => void>;
  
  /** Medical device keyboard support with enhanced focus indicators */
  medicalDeviceMode?: boolean;
  
  /** Emergency mode for critical medical text */
  emergencyMode?: boolean;
  
  /** Healthcare workflow shortcuts */
  enableWorkflowShortcuts?: boolean;
  
  /** Text purpose for healthcare contexts */
  purpose?: 'heading' | 'body' | 'label' | 'caption' | 'error' | 'warning' | 'success' | 'emergency';
  
  /** Text content for screen readers when different from visual content */
  screenReaderText?: string;
}

// HTML element to style mapping
const elementSizeClasses: Record<string, string> = {
  h1: "text-2xl md:text-3xl lg:text-4xl",
  h2: "text-xl md:text-2xl",
  h3: "text-lg md:text-xl",
  h4: "text-base md:text-lg",
  h5: "text-base",
  h6: "text-sm md:text-base",
  p: "text-base",
  span: "text-base",
  small: "text-sm",
  label: "text-sm",
  div: "text-base"
};

// HTML element to weight mapping
const elementWeights: Record<string, TextWeight> = {
  h1: "bold",
  h2: "bold",
  h3: "semibold",
  h4: "semibold",
  h5: "medium",
  h6: "medium",
  p: "normal",
  span: "normal",
  small: "normal",
  label: "medium",
  div: "normal"
};

// Size override classes
const sizeClasses: Record<ComponentSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl"
};

// Font weight classes
const weightClasses: Record<TextWeight, string> = {
  thin: "font-thin",
  light: "font-light", 
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black"
};

// Text alignment classes
const alignClasses: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify"
};

// Text transform classes
const transformClasses: Record<TextTransform, string> = {
  none: "normal-case",
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize"
};

// Color classes for design tokens
const colorClasses: Record<Color | "default", string> = {
  default: "text-neutral-darker",
  primary: "text-primary-600",
  secondary: "text-neutral-normal",
  success: "text-success-normal",
  caution: "text-caution-600",
  danger: "text-danger-600",
  info: "text-info-600"
};

// Helper function to determine if a color is a design token
const isDesignToken = (color: string): color is Color => {
  return (Object.keys(colorClasses) as (Color | "default")[]).includes(color as Color | "default") && color !== "default";
};

// Helper function to determine if a color is a CSS color value
const isCssColor = (color: string): boolean => {
  return color.startsWith('#') || 
         color.startsWith('rgb') || 
         color.startsWith('hsl') || 
         ['red', 'blue', 'green', 'black', 'white', 'gray', 'transparent', 'inherit', 'currentColor'].includes(color);
};

// Helper function to get color styling
const getColorStyling = (color?: Color | string): { className?: string; style?: Record<string, string> } => {
  if (!color || color === "default") {
    return { className: colorClasses.default };
  }
  
  // Design token
  if (isDesignToken(color)) {
    return { className: colorClasses[color as Color] };
  }
  
  // Tailwind class (starts with text-)
  if (color.startsWith('text-')) {
    return { className: color };
  }
  
  // CSS color value
  if (isCssColor(color)) {
    return { style: { color } };
  }
  
  // Fallback: treat as arbitrary Tailwind value
  return { className: `text-[${color}]` };
};

// Purpose-based enhancements for healthcare contexts
const purposeEnhancements = {
  heading: { weight: 'semibold' as TextWeight, className: 'scroll-mt-20' },
  body: { weight: 'normal' as TextWeight, className: 'leading-relaxed' },
  label: { weight: 'medium' as TextWeight, className: 'leading-tight' },
  caption: { weight: 'normal' as TextWeight, className: 'text-sm text-neutral-normal' },
  error: { weight: 'medium' as TextWeight, className: 'leading-tight', color: 'danger' as Color },
  warning: { weight: 'medium' as TextWeight, className: 'leading-tight', color: 'caution' as Color },
  success: { weight: 'medium' as TextWeight, className: 'leading-tight', color: 'success' as Color },
  emergency: { weight: 'bold' as TextWeight, className: 'leading-tight bg-danger-lighter px-2 py-1 rounded border border-danger-light', color: 'danger' as Color }
};

/**
 * Text component with Medical Device Keyboard Accessibility.
 * 
 * Medical Device Keyboard Accessibility (for interactive text):
 * - Enter/Space: Activate text action (when interactive=true)
 * - Enhanced focus indicators for clinical environments
 * - Purpose-based styling for medical contexts
 * - WCAG 2.1 AA+ compliance with Section 508 support
 * - Screen reader optimization for medical workflows
 */
export const Text = component$<TextProps>((props) => {
  const {
    size,
    weight,
    align = "left",
    transform = "none",
    color,
    italic = false,
    truncate = false,
    lineClamp,
    selectable = true,
    interactive = false,
    onClick$,
    medicalDeviceMode = false,
    emergencyMode = false,
    enableWorkflowShortcuts = true,
    purpose,
    screenReaderText,
    as = "p",
    
    // Styling props
    class: qwikClass,
    className,
    style,
    
    // Forward all other HTML attributes
    ...rest
  } = props;

  // Enhanced keyboard navigation for medical devices
  const handleKeyDown = $((event: KeyboardEvent) => {
    if (!interactive || !enableWorkflowShortcuts) return;
    
    switch (event.key) {
      case 'Enter':
      case ' ':
        // Primary activation - Enter and Space both activate
        event.preventDefault();
        if (onClick$) {
          const syntheticEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            detail: 1,
            clientX: 0,
            clientY: 0
          });
          onClick$(syntheticEvent);
        }
        break;
    }
  });

  // Handle click events
  const handleClick = $((event: MouseEvent) => {
    if (interactive && onClick$) {
      onClick$(event);
    }
  });

  // Get element defaults
  const elementTag = as.toLowerCase();
  const defaultSize = elementSizeClasses[elementTag] || elementSizeClasses.p;
  const defaultWeight = elementWeights[elementTag] || elementWeights.p;

  // Apply purpose-based enhancements
  const enhancement = purpose ? purposeEnhancements[purpose] : null;
  const effectiveWeight = weight || enhancement?.weight || defaultWeight;
  const effectiveColor = color || (enhancement as {color?: Color})?.color;

  // Get color styling
  const colorStyling = getColorStyling(effectiveColor);
  
  // Build component classes with proper precedence
  const textClasses = mergeClasses(
    // Base size (element default or size override)
    size ? sizeClasses[size] : defaultSize,
    
    // Font weight (explicit or element default)
    weightClasses[effectiveWeight],
    
    // Alignment
    alignClasses[align],
    
    // Transform
    transformClasses[transform],
    
    // Color class (if using class-based coloring)
    colorStyling.className,
    
    // Purpose-based enhancements
    enhancement?.className,
    
    // State classes
    italic && "italic",
    truncate && (lineClamp ? `line-clamp-${lineClamp}` : "truncate"),
    !selectable && "select-none",
    (elementTag.startsWith('h')) && "leading-tight",
    
    // Interactive styling
    interactive && [
      'cursor-pointer transition-all duration-200',
      'hover:opacity-80',
      'focus:outline-none focus:ring-2 focus:ring-offset-2'
    ],
    
    // Medical device enhanced focus indicators
    interactive && medicalDeviceMode && [
      'focus:ring-4 focus:shadow-lg'
    ],
    
    // Emergency mode styling
    emergencyMode && [
      'ring-2 px-2 py-1 rounded'
    ],
    
    // Custom classes (highest priority)
    qwikClass,
    className
  );

  // Merge styles properly
  const textStyle = colorStyling.style ? Object.entries(colorStyling.style).map(([key, value]) => `${key}:${value}`).join(';') : undefined;
  
  // Add focus ring and emergency styling
  const focusRingStyle = interactive ? '--tw-ring-color:var(--color-primary);' : '';
  const emergencyRingStyle = emergencyMode ? '--tw-ring-color:var(--color-caution);background-color:var(--color-caution-lighter);color:var(--color-caution-darker);' : '';
  
  const mergedStyle = [textStyle, focusRingStyle, emergencyRingStyle, style].filter(Boolean).join(';');

  // Element props for forwarding
  const elementProps = {
    class: textClasses,
    style: mergedStyle || undefined,
    tabIndex: interactive ? 0 : undefined,
    role: interactive ? 'button' : undefined,
    onClick$: interactive ? handleClick : undefined,
    onKeyDown$: interactive ? handleKeyDown : undefined,
    'data-medical-device': medicalDeviceMode,
    'data-emergency-mode': emergencyMode,
    'data-purpose': purpose,
    'aria-label': interactive && medicalDeviceMode 
      ? `${screenReaderText || 'Interactive text'} - Use Enter or Space to activate`
      : screenReaderText,
    ...rest
  };

  // Render based on element type
  const renderTextElement = () => {
    const content = (
      <>
        <Slot />
        
        {/* Emergency mode indicator */}
        {emergencyMode && (
          <span class="inline-block ml-2 px-1 py-0.5 text-xs font-medium bg-caution-lighter text-caution-darker rounded">
            EMERGENCY
          </span>
        )}
        
        {/* Screen reader text */}
        {screenReaderText && <span class="sr-only">{screenReaderText}</span>}
      </>
    );

    switch (as) {
      case 'h1':
        return <h1 {...elementProps}>{content}</h1>;
      case 'h2':
        return <h2 {...elementProps}>{content}</h2>;
      case 'h3':
        return <h3 {...elementProps}>{content}</h3>;
      case 'h4':
        return <h4 {...elementProps}>{content}</h4>;
      case 'h5':
        return <h5 {...elementProps}>{content}</h5>;
      case 'h6':
        return <h6 {...elementProps}>{content}</h6>;
      case 'p':
        return <p {...elementProps}>{content}</p>;
      case 'span':
        return <span {...elementProps}>{content}</span>;
      case 'div':
        return <div {...elementProps}>{content}</div>;
      case 'small':
        return <small {...elementProps}>{content}</small>;
      case 'label':
        return <label {...elementProps}>{content}</label>;
      default:
        return <p {...elementProps}>{content}</p>;
    }
  };

  return renderTextElement();
});
