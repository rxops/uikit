/**
 * Design System Type Tokens
 * 
 * Centralized type definitions for consistent component APIs across the RxOps library.
 * These tokens ensure all components follow the same patterns for variants, colors, sizes, etc.
 */

// ==================== BASE TOKENS ====================

// Size scale (used across all components)
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

// Spacing scale (follows Tailwind spacing)
export type Spacing = "0" | "1" | "2" | "3" | "4" | "6" | "8" | "12" | "16" | "20" | "24";

// Alignment options (used in flex/grid layouts)
export type Alignment = "start" | "center" | "end" | "stretch" | "baseline";

// Justification options (used in flex layouts)
export type Justify = "start" | "center" | "end" | "between" | "around" | "evenly";

// State options (used for form states, component states)
export type State = "default" | "success" | "caution" | "danger";

// Position options (used for tooltips, dropdowns, popovers)
export type Position = "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end";

// ==================== CORE VISUAL TOKENS ====================

// Core variant types for visual styling approach
export type Variant = "filled" | "outlined" | "ghost" | "link";

// Semantic color types for meaning and context
export type Color = "primary" | "secondary" | "success" | "caution" | "danger" | "info";

// Typography style tokens
export type TextStyle = "display" | "headline" | "title" | "body" | "label" | "caption";

// Text weight options
export type TextWeight = "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";

// Text alignment options  
export type TextAlign = "left" | "center" | "right" | "justify";

// Text transform options
export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";

// Color shade intensities
export type Shade = "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";

// ==================== SPECIALIZED TOKENS ====================

// Component-specific size type
export type ComponentSize = Size;

// Gap spacing (subset of spacing)
export type Gap = Spacing;

// Form-specific variants
export type FormVariant = "default" | "filled" | "outlined" | "flat";

// Validation states for form components
export type ValidationState = "valid" | "invalid" | "pending";

// Loading states for async components
export type LoadingState = "idle" | "loading" | "success" | "danger";

// Interactive states
export type InteractiveState = State | "hover" | "focus" | "active" | "disabled";

// Focus visible states for keyboard navigation
export type FocusState = "none" | "visible" | "within";

// ==================== HEALTHCARE DOMAIN TOKENS ====================

// Priority levels for medical contexts
export type MedicalPriority = "low" | "normal" | "high" | "urgent" | "critical";

// Healthcare button intents
export type HealthcareIntent = 
  | "primary"      // Main call-to-action
  | "secondary"    // Secondary actions  
  | "success"      // Positive actions (save, confirm)
  | "caution"      // Caution actions (delete, warning)
  | "danger"       // Destructive actions (delete permanently)
  | "info";        // Informational actions

// Medical device contexts
export type MedicalContext = 
  | "emergency" 
  | "medication" 
  | "patient-action" 
  | "data-entry" 
  | "navigation" 
  | "default";

// Appointment status types
export type AppointmentStatus = "scheduled" | "confirmed" | "in-progress" | "completed" | "cancelled" | "no-show";

// Medical record status
export type MedicalRecordStatus = "draft" | "pending" | "approved" | "archived";

// ==================== COMPONENT PROP INTERFACES ====================

/**
 * Base props that most components should support
 */
export interface BaseProps {
  /** Component ID for DOM targeting */
  id?: string;
  /** CSS class names */
  class?: string;
  /** Additional CSS class names (React compatibility) */
  className?: string;
  /** Inline styles */
  style?: string;
  /** Test ID for automated testing */
  testId?: string;
  /** Component size */
  size?: ComponentSize;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readonly?: boolean;
}

/**
 * Layout props for spacing and positioning
 */
export interface LayoutProps {
  /** Gap between child elements */
  gap?: Gap;
  /** Internal padding */
  padding?: Spacing;
  /** Alignment of content */
  align?: Alignment;
  /** Justification of content */
  justify?: Justify;
}

/**
 * Visual styling props
 */
export interface VisualProps {
  /** Visual variant */
  variant?: Variant;
  /** Semantic color */
  color?: Color;
  /** Color shade intensity */
  shade?: Shade;
}

/**
 * Form field props for validation and interaction
 */
export interface FormFieldProps {
  /** Field label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Required field indicator */
  required?: boolean;
  /** Validation state */
  validationState?: ValidationState;
}

/**
 * Interactive props for clickable components
 */
export interface InteractiveProps {
  /** Loading state */
  loading?: boolean;
  /** Loading state type */
  loadingState?: LoadingState;
  /** Hover state */
  hover?: boolean;
  /** Focus state */
  focus?: FocusState;
}

/**
 * Healthcare-specific props
 */
export interface HealthcareProps {
  /** Medical priority level */
  medicalPriority?: MedicalPriority;
  /** Healthcare intent */
  healthcareIntent?: HealthcareIntent;
  /** Medical device context */
  medicalContext?: MedicalContext;
  /** Emergency state */
  emergency?: boolean;
  /** Medical device mode with enhanced accessibility */
  medicalDeviceMode?: boolean;
  /** Requires confirmation for destructive actions */
  requireConfirmation?: boolean;
}

/**
 * Accessibility props
 */
export interface AccessibilityProps {
  /** ARIA label */
  ariaLabel?: string;
  /** ARIA described by */
  ariaDescribedBy?: string;
  /** ARIA expanded state */
  ariaExpanded?: boolean;
  /** ARIA selected state */
  ariaSelected?: boolean;
  /** ARIA disabled state */
  ariaDisabled?: boolean;
  /** Tab index */
  tabIndex?: number;
  /** Role attribute */
  role?: string;
}

// ==================== COMPOSITE PROP INTERFACES ====================

/**
 * Standard component props combining common interfaces
 */
export interface StandardComponentProps extends 
  BaseProps, 
  VisualProps, 
  AccessibilityProps {
}

/**
 * Interactive component props
 */
export interface InteractiveComponentProps extends 
  StandardComponentProps, 
  InteractiveProps {
}

/**
 * Form component props
 */
export interface FormComponentProps extends 
  StandardComponentProps, 
  FormFieldProps, 
  InteractiveProps {
}

/**
 * Healthcare component props
 */
export interface HealthcareComponentProps extends 
  InteractiveComponentProps, 
  HealthcareProps {
}

/**
 * Layout component props
 */
export interface LayoutComponentProps extends 
  BaseProps, 
  LayoutProps {
}

// ==================== BACKWARD COMPATIBILITY EXPORTS ====================

/**
 * Re-export commonly used combinations for backward compatibility
 */
export type {
  Variant as ButtonVariant,
  Color as ButtonColor,
  ComponentSize as ButtonSize,
  HealthcareIntent as ButtonIntent,
  FormVariant as InputVariant,
  Alignment as StackAlign,
  Justify as StackJustify,
  Spacing as GridGap
};

// ==================== UTILITY TYPES ====================

/**
 * Make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
