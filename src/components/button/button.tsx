import { component$, Slot, useSignal, $, type QRL } from "@builder.io/qwik";
import type { HealthcareIntent, ComponentSize } from "../../design-system";

/**
 * Button Props Interface
 */
export interface ButtonProps {
  /** Semantic intent that drives styling automatically */
  intent?: HealthcareIntent;
  /** Button size */
  size?: ComponentSize;
  /** Button type attribute */
  type?: "button" | "submit" | "reset";
  /** Whether button takes full width */
  fullWidth?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Custom CSS classes */
  class?: string;
  /** Custom styles */
  style?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Click handler */
  onClick$?: QRL<() => void>;
  /** Emergency/critical button for medical contexts */
  emergency?: boolean;
  /** Medical device mode with enhanced accessibility */
  medicalDeviceMode?: boolean;
}

// Re-export types for convenience
export type ButtonIntent = HealthcareIntent;
export type ButtonSize = ComponentSize;

/**
 * Generate intent-based CSS classes using CSS custom properties
 * Maps to our design-tokens.css component classes
 */
function getIntentClasses(intent: HealthcareIntent): string {
  const intentClassMap: Record<HealthcareIntent, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary", 
    success: "btn-success",
    warning: "btn-warning",
    error: "btn-error",
    info: "btn-info"
  };

  return intentClassMap[intent];
}

/**
 * Generate size-based CSS classes
 */
function getSizeClasses(size: ComponentSize): string {
  const sizeClassMap: Record<ComponentSize, string> = {
    xs: "btn-xs",
    sm: "btn-sm", 
    md: "btn-md",
    lg: "btn-lg",
    xl: "btn-xl"
  };

  return sizeClassMap[size];
}

/**
 * Base button class - uses our CSS custom properties
 */
const baseButtonClass = "btn";

export const Button = component$<ButtonProps>((props) => {
  const {
    intent = "primary",
    size = "md",
    type = "button",
    fullWidth = false,
    loading = false,
    disabled = false,
    emergency = false,
    medicalDeviceMode = false,
    class: customClass,
    style,
    ariaLabel,
    onClick$,
    ...rest
  } = props;

  // Focus state for enhanced accessibility
  const isFocused = useSignal(false);

  // Handle focus events
  const handleFocus$ = $(() => {
    isFocused.value = true;
  });

  const handleBlur$ = $(() => {
    isFocused.value = false;
  });

  // Get size and intent classes from our CSS custom properties
  const sizeClasses = getSizeClasses(size);
  const intentClasses = getIntentClasses(intent);

  // Build complete class string using CSS custom properties approach
  const buttonClasses = [
    baseButtonClass,
    intentClasses,
    sizeClasses,
    fullWidth && "w-full",
    emergency && "btn-emergency",
    medicalDeviceMode && "btn-medical-device",
    // Critical action = medical device mode + emergency + warning intent
    (medicalDeviceMode && emergency && intent === "warning") && "btn-critical-action",
    loading && "cursor-wait",
    customClass
  ].filter(Boolean).join(" ");

  // Generate accessible label
  const accessibleLabel = ariaLabel || 
    (emergency ? "Emergency action button" : undefined);

  return (
    <button
      type={type}
      class={buttonClasses}
      style={style}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-label={accessibleLabel}
      data-emergency={emergency}
      data-medical-device={medicalDeviceMode}
      onClick$={onClick$}
      onFocus$={handleFocus$}
      onBlur$={handleBlur$}
      {...rest}
    >
      {/* Loading Spinner */}
      {loading && (
        <svg
          class="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {/* Button Content */}
      <span class={loading ? "opacity-75" : undefined}>
        <Slot />
      </span>
      
      {/* Loading state announcement for screen readers */}
      {loading && (
        <span class="sr-only" aria-live="polite">
          Loading, please wait
        </span>
      )}
      
      {/* Emergency indicator for screen readers */}
      {emergency && (
        <span class="sr-only">
          Emergency function - Handle with care
        </span>
      )}
    </button>
  );
});
