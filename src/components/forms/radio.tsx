import { component$, useSignal, $, type QRL } from "@builder.io/qwik";
import { mergeClasses } from "../../design-system/utils";

export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioVariant = 'default' | 'outlined' | 'filled';
export type RadioContext = 
  | 'default'
  | 'diagnosis-selection'
  | 'treatment-option'
  | 'urgency-level'
  | 'medication-dosage'
  | 'patient-response'
  | 'severity-rating';

export interface RadioOption {
  /** Option value */
  value: string;
  /** Option label */
  label: string;
  /** Option description */
  description?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Critical option requiring confirmation */
  critical?: boolean;
  /** Icon name for visual indication */
  icon?: string;
}

export interface RadioGroupProps {
  /** Radio group label */
  label?: string;
  /** Additional description text */
  description?: string;
  /** Radio options */
  options: RadioOption[];
  /** Component size */
  size?: RadioSize;
  /** Visual variant */
  variant?: RadioVariant;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Selected value */
  value?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** HTML name attribute */
  name?: string;
  /** HTML id attribute */
  id?: string;
  /** Change handler */
  onChange$?: QRL<(value: string, event: Event) => void>;
  /** Medical device keyboard support */
  medicalDeviceMode?: boolean;
  /** Enable healthcare workflow shortcuts */
  enableWorkflowShortcuts?: boolean;
  /** Radio context for healthcare applications */
  radioContext?: RadioContext;
  /** Allow keyboard quick selection (1-9 keys) */
  enableQuickSelect?: boolean;
  /** Custom CSS class */
  class?: string;
  /** Custom styles */
  style?: Record<string, string | number>;
}

/**
 * Healthcare-optimized Radio Group Component
 * 
 * Medical device accessible radio group with confirmation workflows,
 * healthcare-specific contexts, and clinical safety features.
 */
export const RadioGroup = component$<RadioGroupProps>((props) => {
  const {
    label,
    description,
    options,
    size = 'md',
    error,
    helperText,
    value,
    disabled = false,
    required = false,
    name = `radio-group-${Math.random().toString(36).substr(2, 9)}`,
    id,
    onChange$,
    medicalDeviceMode = false,
    enableWorkflowShortcuts = true,
    radioContext = 'default',
    enableQuickSelect = false,
    class: customClass,
    style,
    ...rest
  } = props;

  const groupId = id || `radio-group-${Math.random().toString(36).substr(2, 9)}`;
  const selectedValue = useSignal(value || '');
  const hasError = !!error;

  // Medical device keyboard state
  const keyboardState = useSignal({
    focusedIndex: -1,
    confirmationPending: '',
    criticalSelection: false,
    instructionsId: `${groupId}-instructions`
  });

  // Context-based enhancements
  const getContextEnhancements = (context: RadioContext) => {
    const enhancements = {
      default: {
        className: "",
        requiresConfirmation: false,
        priority: 'normal'
      },
      'diagnosis-selection': {
        className: "diagnosis-radio-group",
        requiresConfirmation: true,
        priority: 'high'
      },
      'treatment-option': {
        className: "treatment-radio-group",
        requiresConfirmation: true,
        priority: 'critical'
      },
      'urgency-level': {
        className: "urgency-radio-group",
        requiresConfirmation: false,
        priority: 'high'
      },
      'medication-dosage': {
        className: "medication-radio-group",
        requiresConfirmation: true,
        priority: 'critical'
      },
      'patient-response': {
        className: "response-radio-group",
        requiresConfirmation: false,
        priority: 'normal'
      },
      'severity-rating': {
        className: "severity-radio-group",
        requiresConfirmation: false,
        priority: 'normal'
      }
    };

    return enhancements[context] || enhancements.default;
  };

  const enhancements = getContextEnhancements(radioContext);

  // Handle radio change
  const handleChange = $((event: Event) => {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    const selectedOption = options.find(opt => opt.value === newValue);

    // Check if confirmation is needed
    const needsConfirmation = enhancements.requiresConfirmation || selectedOption?.critical;

    if (needsConfirmation && radioContext !== 'default') {
      keyboardState.value.confirmationPending = newValue;
      keyboardState.value.criticalSelection = true;
      return;
    }

    selectedValue.value = newValue;
    onChange$?.(newValue, event);
  });

  // Handle confirmation
  const handleConfirmation = $((confirmed: boolean) => {
    const pendingValue = keyboardState.value.confirmationPending;
    keyboardState.value.confirmationPending = '';
    keyboardState.value.criticalSelection = false;
    
    if (confirmed && pendingValue) {
      selectedValue.value = pendingValue;
      // Create synthetic event for consistency
      const syntheticEvent = new Event('change', { bubbles: true });
      onChange$?.(pendingValue, syntheticEvent);
    } else {
      // Reset radio selection
      const selectedRadio = document.querySelector(`input[name="${name}"]:checked`) as HTMLInputElement;
      if (selectedRadio) {
        selectedRadio.checked = false;
      }
    }
  });

  // Medical device keyboard shortcuts
  const handleKeyDown = $((event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement;
    const currentIndex = options.findIndex(opt => `${groupId}-${opt.value}` === target.id);

    // Handle confirmation workflow
    if (keyboardState.value.confirmationPending) {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleConfirmation(true);
        return;
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        handleConfirmation(false);
        return;
      }
    }

    // Quick select with number keys (1-9)
    if (enableQuickSelect && /^[1-9]$/.test(event.key)) {
      const index = parseInt(event.key) - 1;
      if (index < options.length && !options[index].disabled) {
        event.preventDefault();
        const radio = document.getElementById(`${groupId}-${options[index].value}`) as HTMLInputElement;
        if (radio) {
          radio.focus();
          radio.click();
        }
      }
    }

    // Healthcare workflow shortcuts
    if (enableWorkflowShortcuts && event.ctrlKey) {
      switch (radioContext) {
        case 'diagnosis-selection':
          if (event.key === 'd') {
            event.preventDefault();
            console.log('Show diagnosis details');
          }
          break;
        case 'treatment-option':
          if (event.key === 't') {
            event.preventDefault();
            console.log('View treatment protocols');
          }
          break;
        case 'medication-dosage':
          if (event.key === 'm') {
            event.preventDefault();
            console.log('Show medication guidelines');
          }
          break;
      }
    }

    // Arrow key navigation enhancement for medical devices
    if (medicalDeviceMode) {
      let nextIndex = currentIndex;
      
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        do {
          nextIndex = (nextIndex + 1) % options.length;
        } while (options[nextIndex].disabled && nextIndex !== currentIndex);
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        do {
          nextIndex = nextIndex <= 0 ? options.length - 1 : nextIndex - 1;
        } while (options[nextIndex].disabled && nextIndex !== currentIndex);
      }

      if (nextIndex !== currentIndex) {
        const nextRadio = document.getElementById(`${groupId}-${options[nextIndex].value}`) as HTMLInputElement;
        nextRadio?.focus();
        keyboardState.value.focusedIndex = nextIndex;
      }
    }
  });

  const handleFocus = $((event: Event) => {
    const target = event.target as HTMLInputElement;
    const index = options.findIndex(opt => `${groupId}-${opt.value}` === target.id);
    keyboardState.value.focusedIndex = index;
  });

  // Style classes
  const getGroupClasses = () => {
    const base = [
      'radio-group flex flex-col gap-3'
    ];

    if (disabled) {
      base.push('opacity-50 cursor-not-allowed');
    }

    // Critical context styling
    if (enhancements.priority === 'critical') {
      base.push('ring-1 ring-caution/20 p-4 rounded-lg bg-caution/5');
    }

    return base.join(' ');
  };

  const getRadioClasses = (option: RadioOption, index: number) => {
    const base = [
      'radio-option relative flex items-start gap-3 cursor-pointer select-none',
      'transition-all duration-200 p-2 rounded-lg hover:bg-base-50'
    ];

    if (option.disabled || disabled) {
      base.push('opacity-50 cursor-not-allowed hover:bg-transparent');
    }

    // Medical device focus enhancement
    if (medicalDeviceMode && keyboardState.value.focusedIndex === index) {
      base.push('ring-2 ring-primary/50 bg-primary/5');
    }

    // Critical option styling
    if (option.critical) {
      base.push('border border-caution/30 bg-caution/5');
    }

    // Quick select indication
    if (enableQuickSelect && index < 9) {
      base.push('relative');
    }

    return base.join(' ');
  };

  const getRadioInputClasses = () => {
    const base = [
      'radio-input sr-only'
    ];

    return base.join(' ');
  };

  const getRadioBoxClasses = (isSelected: boolean) => {
    const base = [
      'radio-box relative flex items-center justify-center',
      'border-2 rounded-full transition-all duration-200',
      'focus:outline-none'
    ];

    // Size variations
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    base.push(sizeClasses[size]);

    // State styling
    if (hasError) {
      base.push('border-danger');
    } else if (isSelected) {
      base.push('border-primary bg-white');
    } else {
      base.push('border-base-300 bg-white hover:border-primary/50');
    }

    // Medical device enhanced focus
    if (medicalDeviceMode) {
      base.push('focus:ring-4 focus:ring-primary/20 focus:ring-offset-1');
    } else {
      base.push('focus:ring-2 focus:ring-primary/20');
    }

    return base.join(' ');
  };

  const getLabelClasses = () => {
    const base = ['radio-label text-sm font-medium'];

    if (hasError) {
      base.push('text-danger');
    } else if (enhancements.priority === 'critical') {
      base.push('text-caution-dark');
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
    const base = ['mt-2 text-xs'];
    
    if (hasError) {
      base.push('text-danger');
    } else {
      base.push('text-base');
    }
    
    return base.join(' ');
  };

  const groupClasses = mergeClasses(
    getGroupClasses(),
    enhancements.className,
    customClass
  );

  return (
    <div class="themed-content">
      <fieldset class={groupClasses} style={style} {...rest}>
        {/* Group label and description */}
        {label && (
          <legend class="text-sm font-semibold text-base-dark mb-2">
            {label}
            {required && <span class="text-danger ml-1" aria-label="required">*</span>}
            {enhancements.priority === 'critical' && (
              <span class="ml-2 text-xs font-normal text-caution">(Critical Selection)</span>
            )}
          </legend>
        )}
        
        {description && (
          <div class="text-sm text-base mb-4">
            {description}
          </div>
        )}

        {/* Radio options */}
        <div class="space-y-2" role="radiogroup" aria-labelledby={label ? `${groupId}-label` : undefined}>
          {options.map((option, index) => {
            const radioId = `${groupId}-${option.value}`;
            const isSelected = selectedValue.value === option.value;
            
            return (
              <div key={option.value} class={getRadioClasses(option, index)}>
                {/* Quick select number indicator */}
                {enableQuickSelect && index < 9 && (
                  <div class="absolute -top-1 -left-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                )}

                <div class="flex items-start gap-3 flex-1">
                  {/* Radio input and visual indicator */}
                  <div class="relative flex-shrink-0 mt-0.5">
                    <input
                      type="radio"
                      id={radioId}
                      name={name}
                      value={option.value}
                      checked={isSelected}
                      disabled={option.disabled || disabled}
                      required={required}
                      class={getRadioInputClasses()}
                      aria-describedby={[
                        `${radioId}-desc`,
                        medicalDeviceMode ? keyboardState.value.instructionsId : undefined,
                        hasError ? `${groupId}-error` : undefined
                      ].filter(Boolean).join(' ') || undefined}
                      onChange$={handleChange}
                      onFocus$={handleFocus}
                      onKeyDown$={handleKeyDown}
                    />
                    
                    <div class={getRadioBoxClasses(isSelected)}>
                      {/* Selected indicator */}
                      {isSelected && (
                        <div class="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>

                    {/* Critical indicator */}
                    {option.critical && (
                      <div class="absolute -top-1 -right-1 w-3 h-3 bg-caution rounded-full flex items-center justify-center">
                        <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>

                  {/* Label and content */}
                  <div class="flex-1 min-w-0">
                    <label for={radioId} class={getLabelClasses()}>
                      {option.label}
                      {option.critical && (
                        <span class="ml-2 text-xs font-normal text-caution">(Requires Confirmation)</span>
                      )}
                    </label>
                    
                    {option.description && (
                      <div id={`${radioId}-desc`} class={getDescriptionClasses()}>
                        {option.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Medical device instructions */}
        {medicalDeviceMode && (
          <div class="text-xs text-primary mt-3 p-2 bg-primary/5 rounded">
            Use arrow keys to navigate
            {enableQuickSelect && ', number keys 1-9 for quick selection'}
            {enhancements.requiresConfirmation && ', Enter to confirm, Escape to cancel'}
          </div>
        )}

        {/* Error message */}
        {error && (
          <p id={`${groupId}-error`} class={getHelperClasses()} role="alert" aria-live="polite">
            {error}
          </p>
        )}
        
        {/* Helper text */}
        {!error && helperText && (
          <p class={getHelperClasses()}>
            {helperText}
          </p>
        )}

        {/* Confirmation dialog */}
        {keyboardState.value.confirmationPending && (
          <div class="mt-4 p-4 bg-caution/5 border border-caution/20 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-2 h-2 bg-caution rounded-full animate-pulse"></div>
              <span class="text-sm font-medium text-caution-dark">
                Critical Selection Confirmation
              </span>
            </div>
            <p class="text-sm text-caution-dark mb-3">
              You have selected: <strong>{options.find(opt => opt.value === keyboardState.value.confirmationPending)?.label}</strong>
            </p>
            <p class="text-xs text-caution-dark mb-3">
              Are you sure you want to proceed with this {radioContext.replace('-', ' ')}?
            </p>
            <div class="flex gap-2">
              <button
                type="button"
                class="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                onClick$={() => handleConfirmation(true)}
              >
                Confirm Selection
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
            Medical radio group: Use arrow keys to navigate between options, spacebar to select.
            {enableQuickSelect && ` Press number keys 1 through ${Math.min(9, options.length)} for quick selection.`}
            {enhancements.requiresConfirmation && ` Critical selections require confirmation with Enter key, or cancel with Escape.`}
            {enableWorkflowShortcuts && ` Healthcare shortcuts enabled for ${radioContext} context.`}
          </div>
        )}
      </fieldset>
    </div>
  );
});
