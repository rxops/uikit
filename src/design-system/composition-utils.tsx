/**
 * Component Composition Utilities for RxOps Design System
 * 
 * Higher-order components and utility functions for composing 
 * consistent component patterns across the healthcare UI kit.
 */

import { component$, Slot, type QRL, type JSXChildren } from "@builder.io/qwik";
import type { ComponentSize } from "./tokens";
import type { HealthcareIntent, InteractiveState } from "./types";

// Enhanced types from archive learnings
export type ClinicalPriority = 'critical' | 'urgent' | 'routine' | 'stable';
export type ThemeContext = 'clinical' | 'comfort' | 'high-contrast' | 'vibrant';
export type ComponentState = InteractiveState;

// ==================== ADVANCED VARIANT SYSTEM ====================

/**
 * Enhanced variant configuration with compound variants
 */
export interface VariantConfig<T extends string = string> {
  base: string;
  variants: Record<T, string>;
  compoundVariants?: Array<{
    conditions: Partial<Record<T | 'size' | 'disabled' | 'readonly', unknown>>;
    className: string;
  }>;
  defaultVariant?: T;
}

/**
 * Advanced variant class generator with compound variants and context awareness
 */
export function createVariantClass<T extends string>(
  config: VariantConfig<T>
) {
  return function getVariantClass(
    props: Partial<Record<T, unknown>> & { 
      size?: ComponentSize; 
      disabled?: boolean; 
      readonly?: boolean; 
      className?: string; 
    }
  ): string {
    const classes: string[] = [config.base];
    
    // Apply variant classes
    Object.entries(config.variants).forEach(([variant, className]) => {
      if (props[variant as T]) {
        classes.push(className as string);
      }
    });
    
    // Apply compound variants
    config.compoundVariants?.forEach(({ conditions, className }) => {
      const matches = Object.entries(conditions).every(([key, value]) => {
        return props[key as keyof typeof props] === value;
      });
      if (matches) {
        classes.push(className);
      }
    });
    
    // Add custom className
    if (props.className) {
      classes.push(props.className);
    }
    
    return classes.filter(Boolean).join(" ");
  };
}

// ==================== HEALTHCARE SIZE SYSTEM ====================

/**
 * Enhanced size configuration with consistent scaling
 */
export const sizeConfig = {
  xs: {
    height: "h-6",
    padding: "px-2 py-1",
    text: "text-xs",
    gap: "gap-1",
    radius: "rounded-md", // Enhanced from rounded-sm
    iconSize: "w-3 h-3",
  },
  sm: {
    height: "h-8",
    padding: "px-3 py-1.5",
    text: "text-sm",
    gap: "gap-1.5",
    radius: "rounded",
    iconSize: "w-4 h-4",
  },
  md: {
    height: "h-10",
    padding: "px-4 py-2",
    text: "text-base",
    gap: "gap-2",
    radius: "rounded-md",
    iconSize: "w-5 h-5",
  },
  lg: {
    height: "h-12",
    padding: "px-6 py-3",
    text: "text-lg",
    gap: "gap-2.5",
    radius: "rounded-lg",
    iconSize: "w-6 h-6",
  },
  xl: {
    height: "h-14",
    padding: "px-8 py-4",
    text: "text-xl",
    gap: "gap-3",
    radius: "rounded-xl",
    iconSize: "w-7 h-7",
  },
} as const;

// ==================== CLINICAL FOCUS SYSTEM ====================

/**
 * Enhanced focus system for medical device compatibility
 */
export const focusConfig = {
  base: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  primary: "focus-visible:ring-primary",
  success: "focus-visible:ring-success",
  caution: "focus-visible:ring-caution",
  danger: "focus-visible:ring-danger",
  info: "focus-visible:ring-info",
  // High contrast medical device support
  medical: "focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-4",
  emergency: "focus-visible:ring-4 focus-visible:ring-danger focus-visible:ring-offset-0",
} as const;

// ==================== WRAPPER COMPONENTS ====================

/**
 * Creates a loading wrapper component
 */
export const LoadingWrapper = component$<{
  loading?: boolean;
  children?: JSXChildren;
}>((props) => {
  if (props.loading) {
    return (
      <div class="relative">
        <div class="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-rx-color-primary"></div>
        </div>
        <div class="opacity-50 pointer-events-none">
          <Slot />
        </div>
      </div>
    );
  }
  return <Slot />;
});

/**
 * Creates an error boundary wrapper component
 */
export const ErrorBoundaryWrapper = component$<{
  error?: Error | null;
  onError$?: QRL<(error: Error) => void>;
}>((props) => {
  if (props.error) {
    return (
      <div class="card card-danger p-4">
        <h3 class="text-lg font-semibold text-danger mb-2">Something went wrong</h3>
        <p class="text-sm text-danger-dark">{props.error.message}</p>
        <button 
          class="btn btn-sm btn-outlined btn-danger mt-3"
          onClick$={() => window.location.reload()}
        >
          Reload Page
        </button>
      </div>
    );
  }
  
  return <Slot />;
});

/**
 * Creates a medical device accessibility wrapper
 */
export const MedicalDeviceWrapper = component$<{
  medicalDeviceMode?: boolean;
}>((props) => {
  const medicalClass = props.medicalDeviceMode ? 'focus-medical-device' : '';
  
  return (
    <div class={medicalClass}>
      <Slot />
    </div>
  );
});

/**
 * Creates an emergency state wrapper
 */
export const EmergencyWrapper = component$<{
  emergency?: boolean;
}>((props) => {
  const emergencyClass = props.emergency ? 'emergency-mode' : '';
  
  return (
    <div class={emergencyClass} data-emergency={props.emergency}>
      <Slot />
      {props.emergency && (
        <span class="sr-only" aria-live="assertive">
          Emergency mode activated. Handle with immediate attention.
        </span>
      )}
    </div>
  );
});

/**
 * Clinical Priority Wrapper - Advanced healthcare alert system
 */
export const ClinicalPriorityWrapper = component$<{
  priority: ClinicalPriority;
  message?: string;
  showIcon?: boolean;
}>((props) => {
  const priorityClass = `clinical-priority-${props.priority}`;
  const ariaLevel: 'assertive' | 'polite' = (props.priority === 'critical' || props.priority === 'urgent') 
    ? 'assertive' 
    : 'polite';
  
  return (
    <div 
      class={priorityClass} 
      data-priority={props.priority}
      aria-live={ariaLevel}
      role={props.priority === 'critical' || props.priority === 'urgent' ? 'alert' : undefined}
    >
      <Slot />
      {props.message && (
        <span class="sr-only">
          {props.priority.toUpperCase()}: {props.message}
        </span>
      )}
    </div>
  );
});

/**
 * Theme Context Wrapper - Applies clinical theme modifiers
 */
export const ThemeContextWrapper = component$<{
  context: ThemeContext;
  children?: JSXChildren;
}>((props) => {
  const themeClass = `theme-${props.context}`;
  
  return (
    <div class={themeClass}>
      <Slot />
    </div>
  );
});

// ==================== RESPONSIVE UTILITIES ====================

export const breakpoints = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export type Breakpoint = keyof typeof breakpoints;

export type ResponsiveProp<T> = T | {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};

/**
 * Resolves responsive prop values into CSS classes
 */
export function resolveResponsiveProp<T extends string>(
  prop: ResponsiveProp<T>,
  prefix: string = ''
): string {
  if (typeof prop !== 'object' || prop === null) {
    return prefix ? `${prefix}-${prop}` : String(prop);
  }
  
  const classes: string[] = [];
  
  if (prop.base) {
    classes.push(prefix ? `${prefix}-${prop.base}` : prop.base);
  }
  
  if (prop.sm) {
    classes.push(prefix ? `sm:${prefix}-${prop.sm}` : `sm:${prop.sm}`);
  }
  
  if (prop.md) {
    classes.push(prefix ? `md:${prefix}-${prop.md}` : `md:${prop.md}`);
  }
  
  if (prop.lg) {
    classes.push(prefix ? `lg:${prefix}-${prop.lg}` : `lg:${prop.lg}`);
  }
  
  if (prop.xl) {
    classes.push(prefix ? `xl:${prefix}-${prop.xl}` : `xl:${prop.xl}`);
  }
  
  if (prop['2xl']) {
    classes.push(prefix ? `2xl:${prefix}-${prop['2xl']}` : `2xl:${prop['2xl']}`);
  }
  
  return classes.join(' ');
}

// ==================== CLASS NAME UTILITIES ====================

/**
 * Generates intent-based CSS classes
 */
export function getIntentClasses(intent: HealthcareIntent, prefix: string = ''): string {
  const intentClassMap: Record<HealthcareIntent, string> = {
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    caution: 'caution',
    danger: 'danger',
    info: 'info'
  };

  const baseClass = intentClassMap[intent];
  return prefix ? `${prefix}-${baseClass}` : baseClass;
}

/**
 * Enhanced clinical priority class generator
 */
export function getClinicalPriorityClasses(priority: ClinicalPriority, prefix: string = ''): string {
  const priorityClassMap: Record<ClinicalPriority, string> = {
    critical: 'critical',
    urgent: 'urgent',
    routine: 'routine',
    stable: 'stable'
  };

  const baseClass = priorityClassMap[priority];
  return prefix ? `${prefix}-${baseClass}` : baseClass;
}

/**
 * Maps clinical priority to healthcare intent
 */
export function clinicalPriorityToIntent(priority: ClinicalPriority): HealthcareIntent {
  const priorityToIntentMap: Record<ClinicalPriority, HealthcareIntent> = {
    critical: 'danger',
    urgent: 'caution',
    routine: 'info',
    stable: 'success'
  };
  
  return priorityToIntentMap[priority];
}

/**
 * Gets theme-aware focus classes
 */
export function getFocusClasses(
  context: ThemeContext = 'clinical',
  medicalDevice: boolean = false
): string {
  if (medicalDevice) {
    return focusConfig.medical;
  }
  
  if (context === 'high-contrast') {
    return `${focusConfig.base} focus-visible:ring-4 focus-visible:ring-black`;
  }
  
  return focusConfig.base;
}

/**
 * Generates size-based CSS classes
 */
export function getSizeClasses(size: ComponentSize, prefix: string = ''): string {
  const sizeClassMap: Record<ComponentSize, string> = {
    xs: 'xs',
    sm: 'sm',
    md: 'md', 
    lg: 'lg',
    xl: 'xl'
  };

  const baseClass = sizeClassMap[size];
  return prefix ? `${prefix}-${baseClass}` : baseClass;
}

// ==================== ANIMATION UTILITIES ====================

/**
 * Common animation classes for healthcare UI
 */
export const animations = {
  // Fade animations
  fadeIn: 'animate-[fadeIn_0.2s_ease-in-out]',
  fadeOut: 'animate-[fadeOut_0.2s_ease-in-out]',
  
  // Slide animations
  slideUp: 'animate-[slideUp_0.3s_ease-out]',
  slideDown: 'animate-[slideDown_0.3s_ease-out]',
  slideLeft: 'animate-[slideLeft_0.3s_ease-out]',
  slideRight: 'animate-[slideRight_0.3s_ease-out]',
  
  // Scale animations
  scaleIn: 'animate-[scaleIn_0.2s_ease-out]',
  scaleOut: 'animate-[scaleOut_0.2s_ease-in]',
  
  // Medical-specific animations
  pulse: 'animate-pulse',
  emergencyPulse: 'animate-[emergencyPulse_1s_ease-in-out_infinite]',
  criticalBlink: 'animate-[criticalBlink_0.5s_ease-in-out_infinite_alternate]',
  
  // Loading animations
  spin: 'animate-spin',
  bounce: 'animate-bounce',
} as const;

/**
 * Gets animation class based on state
 */
export function getAnimationClass(
  state: 'normal' | 'emergency' | 'critical' | 'loading',
  type: 'subtle' | 'prominent' = 'subtle'
): string {
  const animationMap = {
    normal: type === 'prominent' ? animations.fadeIn : '',
    emergency: type === 'prominent' ? animations.emergencyPulse : animations.pulse,
    critical: type === 'prominent' ? animations.criticalBlink : animations.pulse,
    loading: animations.spin,
  };
  
  return animationMap[state];
}

// ==================== ACCESSIBILITY UTILITIES ====================

/**
 * Enhanced healthcare ARIA attributes generator
 */
export function getHealthcareAria(
  type: 'normal' | 'warning' | 'error' | 'emergency',
  message?: string,
  priority?: ClinicalPriority
) {
  const ariaMap = {
    normal: { 'aria-live': 'polite' as const },
    warning: { 'aria-live': 'assertive' as const, 'role': 'alert' },
    error: { 'aria-live': 'assertive' as const, 'role': 'alert', 'aria-invalid': 'true' },
    emergency: { 'aria-live': 'assertive' as const, 'role': 'alert', 'aria-atomic': 'true' },
  };
  
  const baseAttrs = ariaMap[type];
  
  // Add clinical priority context
  if (priority) {
    (baseAttrs as Record<string, unknown>)['data-clinical-priority'] = priority;
  }
  
  if (message) {
    return { ...baseAttrs, 'aria-label': message };
  }
  
  return baseAttrs;
}

/**
 * Enhanced medical announcements with clinical context
 */
export function getMedicalAnnouncement(
  severity: 'info' | 'warning' | 'error' | 'emergency',
  message: string,
  priority?: ClinicalPriority
): string {
  const prefixes = {
    info: 'Information:',
    warning: 'Warning:',
    error: 'Error:',
    emergency: 'EMERGENCY ALERT:',
  };
  
  let announcement = `${prefixes[severity]} ${message}`;
  
  // Add clinical priority context for screen readers
  if (priority) {
    const priorityText = priority.toUpperCase();
    announcement = `${priorityText} - ${announcement}`;
  }
  
  return announcement;
}

/**
 * Clinical safety validation for component props
 */
export function validateClinicalSafety(props: {
  emergency?: boolean;
  priority?: ClinicalPriority;
  disabled?: boolean;
  readonly?: boolean;
}): {
  safetyLevel: 'safe' | 'caution' | 'critical';
  warnings: string[];
  blockingIssues: string[];
} {
  const warnings: string[] = [];
  const blockingIssues: string[] = [];
  
  // Check for conflicting states
  if (props.emergency && props.disabled) {
    blockingIssues.push('Emergency components cannot be disabled - patient safety risk');
  }
  
  if (props.priority === 'critical' && props.readonly) {
    warnings.push('Critical priority components should allow interaction when possible');
  }
  
  if (props.emergency && !props.priority) {
    warnings.push('Emergency state should specify clinical priority for proper handling');
  }
  
  const safetyLevel = blockingIssues.length > 0 
    ? 'critical' 
    : warnings.length > 0 
      ? 'caution' 
      : 'safe';
      
  return { safetyLevel, warnings, blockingIssues };
}

// ==================== CLASS NAME UTILITIES ====================

/**
 * Merges class names with conditional logic
 */
export function mergeClasses(...classes: (string | undefined | null | boolean)[]): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export interface ComponentBaseProps {
  /** Custom CSS classes */
  class?: string;
  /** Custom inline styles */
  style?: string;
  /** Component size */
  size?: ComponentSize;
  /** Component intent/theme */
  intent?: HealthcareIntent;
  /** Responsive size configuration */
  responsiveSize?: ResponsiveProp<ComponentSize>;
  /** Healthcare-specific props */
  medicalDeviceMode?: boolean;
  emergency?: boolean;
  loading?: boolean;
}

export interface AnimationProps {
  /** Animation type */
  animation?: keyof typeof animations;
  /** Animation duration */
  duration?: 'fast' | 'normal' | 'slow';
  /** Animation timing */
  timing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

// ==================== ENHANCED PROP INTERFACES ====================

export interface AccessibilityProps {
  /** ARIA label for screen readers */
  ariaLabel?: string;
  /** ARIA description */
  ariaDescription?: string;
  /** ARIA live region type */
  ariaLive?: 'off' | 'polite' | 'assertive';
  /** Role attribute */
  role?: string;
}

export interface ClinicalProps {
  /** Clinical priority level */
  priority?: ClinicalPriority;
  /** Theme context for clinical environments */
  themeContext?: ThemeContext;
  /** Medical device compatibility mode */
  medicalDeviceMode?: boolean;
  /** Emergency state override */
  emergency?: boolean;
  /** Patient safety validation */
  safetyValidation?: boolean;
}

export interface EnhancedComponentBaseProps extends ComponentBaseProps, ClinicalProps {
  /** Advanced variant configuration */
  variants?: Record<string, unknown>;
  /** Compound variant conditions */
  compoundConditions?: Record<string, unknown>;
  /** Focus management for clinical workflows */
  focusManagement?: 'auto' | 'manual' | 'medical-device';
}

export type PolymorphicProps<T = Record<string, unknown>> = T & {
  /** HTML element to render as */
  as?: keyof HTMLElementTagNameMap;
};

// ==================== ADVANCED UTILITIES ====================

/**
 * Utility to merge component props with clinical safety validation
 */
export function mergePropsWithSafety<T extends Record<string, unknown>>(
  defaultProps: Partial<T>,
  userProps: Partial<T>,
  enableSafetyCheck: boolean = true
): T {
  const merged = {
    ...defaultProps,
    ...userProps,
    className: [
      (defaultProps as { className?: string }).className, 
      (userProps as { className?: string }).className
    ]
      .filter(Boolean)
      .join(" "),
  } as unknown as T;
  
  // Add safety validation if enabled
  if (enableSafetyCheck) {
    const safetyValidation = validateClinicalSafety(merged as {
      emergency?: boolean;
      priority?: ClinicalPriority;
      disabled?: boolean;
      readonly?: boolean;
    });
    
    // Log safety issues in development
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
      if (safetyValidation.blockingIssues.length > 0) {
        console.error('Clinical Safety Issues:', safetyValidation.blockingIssues);
      }
      if (safetyValidation.warnings.length > 0) {
        console.warn('Clinical Safety Warnings:', safetyValidation.warnings);
      }
    }
  }
  
  return merged;
}

/**
 * Advanced responsive value resolver with clinical context
 */
export function resolveResponsiveWithContext<T>(
  value: ResponsiveProp<T>,
  breakpoint: Breakpoint = "md",
  context: ThemeContext = 'clinical'
): T {
  let resolved: T;
  
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    resolved = (value as Record<string, T>)[breakpoint] || 
               (value as Record<string, T>).base ||
               (value as Record<string, T>).md || 
               Object.values(value)[0];
  } else {
    resolved = value as T;
  }
  
  // Apply context-specific adjustments for clinical environments
  if (context === 'high-contrast' && typeof resolved === 'string') {
    // This would typically involve size/spacing adjustments for high contrast
    // Implementation would depend on the specific type T
  }
  
  return resolved;
}

/**
 * Create compound component with clinical safety checks
 */
export function createClinicalCompoundComponent<T extends Record<string, unknown>>(
  mainComponent: unknown,
  subComponents: T,
  clinicalConfig?: {
    requiresPriority?: boolean;
    allowsEmergencyState?: boolean;
    medicalDeviceCompatible?: boolean;
  }
): typeof mainComponent & T {
  Object.keys(subComponents).forEach((key) => {
    (mainComponent as Record<string, unknown>)[key] = subComponents[key];
  });
  
  // Add clinical metadata
  if (clinicalConfig) {
    (mainComponent as Record<string, unknown>)._clinicalConfig = clinicalConfig;
  }
  
  return mainComponent as typeof mainComponent & T;
}
