import { component$, useSignal, $, type QRL } from "@builder.io/qwik";
import { mergeClasses } from "../../design-system/utils";
import { Icon } from "../feedback/icon";

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxVariant = 'default' | 'outlined' | 'filled';
export type CheckboxContext = 
  | 'default'
  | 'patient-consent'
  | 'medication-confirmation'
  | 'symptom-checklist'
  | 'procedure-checklist'
  | 'safety-protocol';

export interface CheckboxProps {
  /** Label text */
  label?: string;
  /** Additional description text */
  description?: string;
  /** Component size */
  size?: CheckboxSize;
  /** Visual variant */
  variant?: CheckboxVariant;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Checked state */
  checked?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** HTML name attribute */
  name?: string;
  /** HTML value attribute */
  value?: string;
  /** HTML id attribute */
  id?: string;
  /** Change handler */
  onChange$?: QRL<(checked: boolean, event: Event) => void>;
  /** Medical device keyboard support */
  medicalDeviceMode?: boolean;
  /** Enable healthcare workflow shortcuts */
  enableWorkflowShortcuts?: boolean;
  /** Checkbox context for healthcare applications */
  checkboxContext?: CheckboxContext;
  /** Require confirmation for critical medical checkboxes */
  requireConfirmation?: boolean;
  /** Custom CSS class */
  class?: string;
  /** Custom styles */
  style?: Record<string, string | number>;
}

/**
 * Healthcare-optimized Checkbox Component
 * 
 * Medical device accessible checkbox with confirmation workflows,
 * healthcare-specific contexts, and clinical safety features.
 */
export const Checkbox = component$<CheckboxProps>((props) => {
  const {
    label,
    description,
    size = 'md',
    error,
    helperText,
    indeterminate = false,
    checked = false,
    disabled = false,
    required = false,
    name,
    value,
    id,
    onChange$,
    medicalDeviceMode = false,
    enableWorkflowShortcuts = true,
    checkboxContext = 'default',
    requireConfirmation = false,
    class: customClass,
    style,
    ...rest
  } = props;

  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const isChecked = useSignal(checked);
  const hasError = !!error;

  // Medical device keyboard state
  const keyboardState = useSignal({
    hasFocus: false,
    confirmationPending: false,
    shortcutPressed: false,
    instructionsId: `${checkboxId}-instructions`
  });

  // Context-based enhancements
  const getContextEnhancements = (context: CheckboxContext) => {
    const enhancements = {
      default: {
        className: "",
        requiresConfirmation: false,
        priority: 'normal'
      },
      'patient-consent': {
        className: "patient-consent-checkbox",
        requiresConfirmation: true,
        priority: 'high'
      },
      'medication-confirmation': {
        className: "medication-checkbox",
        requiresConfirmation: true,
        priority: 'critical'
      },
      'symptom-checklist': {
        className: "symptom-checkbox",
        requiresConfirmation: false,
        priority: 'normal'
      },
      'procedure-checklist': {
        className: "procedure-checkbox",
        requiresConfirmation: false,
        priority: 'normal'
      },
      'safety-protocol': {
        className: "safety-checkbox",
        requiresConfirmation: true,
        priority: 'critical'
      }
    };

    return enhancements[context] || enhancements.default;
  };

  const enhancements = getContextEnhancements(checkboxContext);
  const needsConfirmation = requireConfirmation || enhancements.requiresConfirmation;

  // Handle checkbox change
  const handleChange = $((event: Event) => {
    const target = event.target as HTMLInputElement;
    const newChecked = target.checked;

    if (needsConfirmation && newChecked && checkboxContext !== 'default') {
      keyboardState.value.confirmationPending = true;
      // Don't update checked state yet, wait for confirmation
      return;
    }

    isChecked.value = newChecked;
    onChange$?.(newChecked, event);
  });

  // Handle confirmation
  const handleConfirmation = $((confirmed: boolean) => {
    keyboardState.value.confirmationPending = false;
    
    if (confirmed) {
      isChecked.value = true;
      // Create synthetic event for consistency
      const syntheticEvent = new Event('change', { bubbles: true });
      onChange$?.(true, syntheticEvent);
    } else {
      // Reset checkbox to unchecked
      const checkbox = document.getElementById(checkboxId) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = false;
      }
    }
  });

  // Medical device keyboard shortcuts
  const handleKeyDown = $((event: KeyboardEvent) => {
    keyboardState.value.shortcutPressed = false;

    if (medicalDeviceMode || checkboxContext !== 'default') {
      // Quick confirmation for critical contexts
      if (event.key === 'Enter' && keyboardState.value.confirmationPending) {
        event.preventDefault();
        handleConfirmation(true);
        keyboardState.value.shortcutPressed = true;
      }

      // Cancel confirmation
      if (event.key === 'Escape' && keyboardState.value.confirmationPending) {
        event.preventDefault();
        handleConfirmation(false);
      }
    }

    // Healthcare workflow shortcuts
    if (enableWorkflowShortcuts && event.ctrlKey) {
      switch (checkboxContext) {
        case 'medication-confirmation':
          if (event.key === 'm') {
            event.preventDefault();
            console.log('Show medication details');
          }
          break;
        case 'patient-consent':
          if (event.key === 'c') {
            event.preventDefault();
            console.log('View consent details');
          }
          break;
        case 'procedure-checklist':
          if (event.key === 'p') {
            event.preventDefault();
            console.log('View procedure details');
          }
          break;
      }
    }
  });

  const handleFocus = $(() => {
    keyboardState.value.hasFocus = true;
  });

  const handleBlur = $(() => {
    keyboardState.value.hasFocus = false;
  });

  // Style classes
  const getWrapperClasses = () => {
    const base = [
      'checkbox relative flex items-start gap-3 cursor-pointer select-none',
      'transition-all duration-200'
    ];

    if (disabled) {
      base.push('opacity-50 cursor-not-allowed');
    }

    // Medical device focus enhancement
    if (medicalDeviceMode && keyboardState.value.hasFocus) {
      base.push('focus-within:ring-4 focus-within:ring-offset-2 focus-within:ring-primary/20');
    }

    // Confirmation pending state
    if (keyboardState.value.confirmationPending) {
      base.push('ring-2 ring-caution animate-pulse');
    }

    return base.join(' ');
  };

  const getCheckboxClasses = () => {
    const base = [
      'checkbox-input sr-only'
    ];

    return base.join(' ');
  };

  const getBoxClasses = () => {
    const base = [
      'checkbox-box relative flex items-center justify-center',
      'border-2 rounded transition-all duration-200',
      'focus:outline-none'
    ];

    // Size variations
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    base.push(sizeClasses[size]);

    // Variant and state styling
    if (hasError) {
      base.push('border-danger');
    } else if (isChecked.value || indeterminate) {
      base.push('border-primary bg-primary');
    } else {
      base.push('border-base-300 bg-white hover:border-primary/50');
    }

    // Medical device enhanced focus
    if (medicalDeviceMode) {
      base.push('focus:ring-4 focus:ring-primary/20 focus:ring-offset-1');
    } else {
      base.push('focus:ring-2 focus:ring-primary/20');
    }

    // Critical context styling
    if (enhancements.priority === 'critical') {
      base.push('ring-1 ring-caution/30');
    }

    return base.join(' ');
  };

  const getLabelClasses = () => {
    const base = ['checkbox-label text-sm font-medium'];

    if (hasError) {
      base.push('text-danger');
    } else if (enhancements.priority === 'critical') {
      base.push('text-caution-dark font-semibold');
    } else {
      base.push('text-base-dark');
    }

    return base.join(' ');
  };

  const getDescriptionClasses = () => {
    const base = ['text-xs mt-1'];

    if (hasError) {
      base.push('text-danger');
    } else {
      base.push('text-base');
    }

    return base.join(' ');
  };

  const getHelperClasses = () => {
    const base = ['mt-1 text-xs'];
    
    if (hasError) {
      base.push('text-danger');
    } else {
      base.push('text-base');
    }
    
    return base.join(' ');
  };

  const wrapperClasses = mergeClasses(
    getWrapperClasses(),
    enhancements.className,
    customClass
  );

  return (
    <div class="themed-content">
      <div class={wrapperClasses} style={style} {...rest}>
        <div class="flex items-start gap-3 flex-1">
          {/* Checkbox input and visual box */}
          <div class="relative flex-shrink-0">
            <input
              type="checkbox"
              id={checkboxId}
              name={name}
              value={value}
              checked={isChecked.value}
              disabled={disabled}
              required={required}
              class={getCheckboxClasses()}
              aria-describedby={[
                `${checkboxId}-helper`,
                medicalDeviceMode ? keyboardState.value.instructionsId : undefined,
                hasError ? `${checkboxId}-error` : undefined
              ].filter(Boolean).join(' ') || undefined}
              aria-invalid={hasError}
              onChange$={handleChange}
              onFocus$={handleFocus}
              onBlur$={handleBlur}
              onKeyDown$={handleKeyDown}
            />
            
            <div class={getBoxClasses()}>
              {/* Check icon */}
              {isChecked.value && !indeterminate && (
                <Icon 
                  name="check" 
                  size="xs" 
                  class="text-white" 
                />
              )}
              
              {/* Indeterminate icon */}
              {indeterminate && (
                <div class="w-2 h-0.5 bg-white rounded"></div>
              )}
            </div>

            {/* Shortcut indicator */}
            {medicalDeviceMode && keyboardState.value.shortcutPressed && (
              <div class="absolute -top-1 -right-1 bg-primary/10 text-primary px-1 py-0.5 rounded text-xs font-medium">
                ✓
              </div>
            )}
          </div>

          {/* Label and content */}
          <div class="flex-1 min-w-0">
            {label && (
              <label for={checkboxId} class={getLabelClasses()}>
                {label}
                {required && <span class="text-danger ml-1" aria-label="required">*</span>}
                {enhancements.priority === 'critical' && (
                  <span class="ml-2 text-xs font-normal text-caution">(Critical)</span>
                )}
              </label>
            )}
            
            {description && (
              <div class={getDescriptionClasses()}>
                {description}
              </div>
            )}
          </div>
        </div>

        {/* Medical device instructions */}
        {medicalDeviceMode && (
          <div class="text-xs text-primary mt-1">
            Press Space to toggle
            {needsConfirmation && ', Enter to confirm, Escape to cancel'}
          </div>
        )}

        {/* Error message */}
        {error && (
          <p id={`${checkboxId}-error`} class={getHelperClasses()} role="alert" aria-live="polite">
            {error}
          </p>
        )}
        
        {/* Helper text */}
        {!error && helperText && (
          <p id={`${checkboxId}-helper`} class={getHelperClasses()}>
            {helperText}
          </p>
        )}

        {/* Confirmation dialog */}
        {keyboardState.value.confirmationPending && (
          <div class="mt-4 p-3 bg-caution/5 border border-caution/20 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-2 h-2 bg-caution rounded-full animate-pulse"></div>
              <span class="text-sm font-medium text-caution-dark">
                Confirmation Required
              </span>
            </div>
            <p class="text-xs text-caution-dark mb-3">
              Are you sure you want to confirm this {checkboxContext.replace('-', ' ')}?
            </p>
            <div class="flex gap-2">
              <button
                type="button"
                class="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                onClick$={() => handleConfirmation(true)}
              >
                Confirm
              </button>
              <button
                type="button"
                class="px-3 py-1 text-xs bg-base-200 text-base-dark rounded hover:bg-base-300 transition-colors"
                onClick$={() => handleConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Medical device screen reader instructions */}
        {medicalDeviceMode && (
          <div id={keyboardState.value.instructionsId} class="sr-only">
            Medical checkbox field: Use spacebar to toggle selection.
            {needsConfirmation && ` Enter to confirm critical actions, Escape to cancel.`}
            {enableWorkflowShortcuts && ` Healthcare shortcuts enabled for ${checkboxContext} context.`}
          </div>
        )}
      </div>
    </div>
  );
});
