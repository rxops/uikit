/**
 * Advanced Healthcare Utilities for RxOps Design System
 * 
 * Clinical priority management, theme contexts, and healthcare-specific
 * utility functions (no JSX components to avoid compilation issues).
 */

import type { ComponentSize } from "./tokens";
import type { HealthcareIntent, InteractiveState } from "./types";

// Healthcare-specific types
export type ClinicalPriority = 'critical' | 'urgent' | 'routine' | 'stable';
export type ThemeContext = 'clinical' | 'comfort' | 'high-contrast' | 'vibrant';
export type ComponentState = InteractiveState;

// Variant configuration interface
export interface VariantConfig<T extends string = string> {
  base: string;
  variants: Record<T, string>;
  compoundVariants?: Array<{
    conditions: Partial<Record<T | string, boolean>>;
    className: string;
  }>;
  defaultVariant?: T;
}

/**
 * Creates a variant class generator function
 */
export function createVariantClass<T extends string>(
  config: VariantConfig<T>
): (variants: Partial<Record<T, boolean>>) => string {
  return (variants) => {
    const classes = [config.base];
    
    // Add variant classes
    Object.entries(variants).forEach(([key, value]) => {
      if (value && config.variants[key as T]) {
        classes.push(config.variants[key as T]);
      }
    });
    
    // Add compound variant classes
    if (config.compoundVariants) {
      config.compoundVariants.forEach(({ conditions, className }) => {
        const shouldApply = Object.entries(conditions).every(([key, expectedValue]) => 
          variants[key as T] === expectedValue
        );
        if (shouldApply) {
          classes.push(className);
        }
      });
    }
    
    return classes.filter(Boolean).join(' ');
  };
}

/**
 * Size configuration for healthcare components
 */
export const sizeConfig = {
  xs: {
    height: 'h-6',
    padding: 'px-2 py-1',
    text: 'text-xs',
    radius: 'rounded',
  },
  sm: {
    height: 'h-8',
    padding: 'px-3 py-1.5',
    text: 'text-sm',
    radius: 'rounded',
  },
  md: {
    height: 'h-10',
    padding: 'px-4 py-2',
    text: 'text-base',
    radius: 'rounded-md',
  },
  lg: {
    height: 'h-12',
    padding: 'px-6 py-3',
    text: 'text-lg',
    radius: 'rounded-lg',
  },
  xl: {
    height: 'h-14',
    padding: 'px-8 py-4',
    text: 'text-xl',
    radius: 'rounded-xl',
  },
} as const;

/**
 * Focus configuration for medical device compatibility
 */
export const focusConfig = {
  default: 'focus:outline-none focus:ring-2 focus:ring-rx-color-primary focus:ring-offset-2',
  medical: 'focus:outline-none focus:ring-4 focus:ring-rx-color-primary focus:ring-offset-4 focus:border-rx-color-primary',
  'high-contrast': 'focus:outline-4 focus:outline-white focus:bg-black focus:text-white',
} as const;

/**
 * Get clinical priority classes
 */
export function getClinicalPriorityClasses(priority: ClinicalPriority, prefix: string = ''): string {
  const priorityClasses = {
    critical: 'bg-red-50 border-red-500 text-red-900',
    urgent: 'bg-orange-50 border-orange-500 text-orange-900',
    routine: 'bg-blue-50 border-blue-500 text-blue-900',
    stable: 'bg-green-50 border-green-500 text-green-900',
  };

  const baseClass = priorityClasses[priority];
  return prefix ? `${prefix}-${baseClass}` : baseClass;
}

/**
 * Convert clinical priority to healthcare intent
 */
export function clinicalPriorityToIntent(priority: ClinicalPriority): HealthcareIntent {
  const mapping: Record<ClinicalPriority, HealthcareIntent> = {
    critical: 'danger',
    urgent: 'caution', 
    routine: 'info',
    stable: 'success',
  };
  return mapping[priority];
}

/**
 * Get focus classes for medical device compatibility
 */
export function getFocusClasses(
  deviceMode: 'default' | 'medical' | 'high-contrast' = 'default'
): string {
  return focusConfig[deviceMode];
}

/**
 * Validate clinical safety requirements
 */
export function validateClinicalSafety(props: {
  priority?: ClinicalPriority;
  emergency?: boolean;
  patientId?: string;
  requiresConfirmation?: boolean;
}): {
  isValid: boolean;
  warnings: string[];
  errors: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];
  
  // Check for critical priority without proper emergency handling
  if (props.priority === 'critical' && !props.emergency) {
    warnings.push('Critical priority should typically include emergency state');
  }
  
  // Check for patient context in clinical operations
  if ((props.priority === 'critical' || props.priority === 'urgent') && !props.patientId) {
    warnings.push('High priority actions should include patient context');
  }
  
  // Check for confirmation requirements
  if (props.priority === 'critical' && !props.requiresConfirmation) {
    errors.push('Critical actions must require confirmation');
  }
  
  return {
    isValid: errors.length === 0,
    warnings,
    errors,
  };
}

/**
 * Interface for clinical component props
 */
export interface ClinicalProps {
  priority?: ClinicalPriority;
  themeContext?: ThemeContext;
  medicalDeviceMode?: boolean;
  patientId?: string;
  clinicalContext?: string;
  emergency?: boolean;
}

/**
 * Interface for enhanced component base props
 */
export interface EnhancedComponentBaseProps {
  size?: ComponentSize;
  state?: ComponentState;
  disabled?: boolean;
  loading?: boolean;
  variant?: string;
}

/**
 * Polymorphic component props helper
 */
export type PolymorphicProps<T = Record<string, unknown>> = T & {
  as?: string;
  className?: string;
};
