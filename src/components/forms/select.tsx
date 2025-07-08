import { component$, useSignal, $, type QRL } from "@builder.io/qwik";
import type { ComponentSize } from "../../design-system";
import { mergeClasses } from "../../design-system/utils";
import { Icon } from "../feedback/icon";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
  description?: string;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

export type SelectVariant = 'default' | 'filled' | 'outlined';
export type SelectPurpose = 
  | 'general'
  | 'medical-data'
  | 'medication'
  | 'patient-info'
  | 'vital-signs'
  | 'diagnosis'
  | 'treatment';

export interface SelectProps {
  /** Purpose-driven enhancement for healthcare contexts */
  purpose?: SelectPurpose;
  /** Label for the select */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Selected value */
  value?: string;
  /** Array of options or option groups */
  options: SelectOption[] | SelectOptionGroup[];
  /** Component size */
  size?: ComponentSize;
  /** Visual variant */
  variant?: SelectVariant;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Full width styling */
  fullWidth?: boolean;
  /** HTML id attribute */
  id?: string;
  /** HTML name attribute */
  name?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Change handler */
  onChange$?: QRL<(value: string) => void>;
  /** Medical device keyboard support */
  medicalDeviceMode?: boolean;
  /** Enable healthcare workflow shortcuts */
  enableWorkflowShortcuts?: boolean;
  /** Allow search/filter in dropdown */
  searchable?: boolean;
  /** Custom CSS class */
  class?: string;
  /** Custom styles */
  style?: Record<string, string | number>;
}

/**
 * Healthcare-optimized Select Component
 * 
 * Purpose-driven select dropdown with medical device accessibility, clinical workflow
 * shortcuts, and healthcare-specific option management.
 */
export const Select = component$<SelectProps>((props) => {
  const {
    purpose = 'general',
    label,
    placeholder = 'Select an option...',
    value = '',
    options,
    size = 'md',
    variant = 'default',
    disabled = false,
    required = false,
    error,
    helperText,
    fullWidth = true,
    id,
    // name,
    ariaLabel,
    onChange$,
    medicalDeviceMode = false,
    enableWorkflowShortcuts = true,
    searchable = false,
    class: customClass,
    style,
    ...rest
  } = props;

  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const isOpen = useSignal(false);
  const selectedValue = useSignal(value);
  const searchTerm = useSignal('');
  const focusedIndex = useSignal(-1);
  const hasError = !!error;

  // Medical device keyboard state
  const keyboardState = useSignal({
    hasFocus: false,
    shortcutPressed: false,
    instructionsId: `${selectId}-instructions`
  });

  // Purpose-based enhancements
  const getPurposeEnhancements = (purpose: SelectPurpose) => {
    const enhancements = {
      general: {
        className: "",
        searchable: false
      },
      'medical-data': {
        className: "medical-data-select",
        searchable: true
      },
      medication: {
        className: "medication-select",
        searchable: true
      },
      'patient-info': {
        className: "patient-info-select",
        searchable: false
      },
      'vital-signs': {
        className: "vital-signs-select",
        searchable: false
      },
      diagnosis: {
        className: "diagnosis-select",
        searchable: true
      },
      treatment: {
        className: "treatment-select",
        searchable: true
      }
    };

    return enhancements[purpose] || enhancements.general;
  };

  const enhancements = getPurposeEnhancements(purpose);
  const isSearchable = searchable || enhancements.searchable;

  // Flatten options if grouped
  const flatOptions: SelectOption[] = options.reduce((acc: SelectOption[], item) => {
    if ('options' in item) {
      return acc.concat(item.options);
    }
    return acc.concat(item);
  }, []);

  // Filter options based on search
  const filteredOptions = isSearchable 
    ? flatOptions.filter(option => 
        option.label.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        option.value.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    : flatOptions;

  // Get selected option
  const getSelectedOption = () => {
    return flatOptions.find(option => option.value === selectedValue.value);
  };

  // Handle option selection
  const handleSelect = $((optionValue: string) => {
    selectedValue.value = optionValue;
    isOpen.value = false;
    searchTerm.value = '';
    focusedIndex.value = -1;
    onChange$?.(optionValue);
  });

  // Handle keyboard navigation
  const handleKeyDown = $((event: KeyboardEvent) => {
    if (disabled) return;

    keyboardState.value.shortcutPressed = false;

    // Medical device shortcuts
    if (medicalDeviceMode && event.ctrlKey) {
      if (event.key === 'o') {
        event.preventDefault();
        isOpen.value = !isOpen.value;
        keyboardState.value.shortcutPressed = true;
      }
      
      if (event.key === 'c' && isOpen.value) {
        event.preventDefault();
        isOpen.value = false;
        searchTerm.value = '';
      }
    }

    // Standard navigation
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!isOpen.value) {
          isOpen.value = true;
        } else if (focusedIndex.value >= 0) {
          handleSelect(filteredOptions[focusedIndex.value].value);
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen.value) {
          isOpen.value = true;
        } else {
          focusedIndex.value = Math.min(focusedIndex.value + 1, filteredOptions.length - 1);
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (isOpen.value) {
          focusedIndex.value = Math.max(focusedIndex.value - 1, -1);
        }
        break;

      case 'Escape':
        event.preventDefault();
        isOpen.value = false;
        searchTerm.value = '';
        focusedIndex.value = -1;
        break;

      case 'Home':
        if (isOpen.value) {
          event.preventDefault();
          focusedIndex.value = 0;
        }
        break;

      case 'End':
        if (isOpen.value) {
          event.preventDefault();
          focusedIndex.value = filteredOptions.length - 1;
        }
        break;

      default:
        // Type-ahead search
        if (isSearchable && isOpen.value && event.key.length === 1) {
          searchTerm.value += event.key;
          focusedIndex.value = 0;
        }
        break;
    }
  });

  const handleFocus = $(() => {
    keyboardState.value.hasFocus = true;
  });

  const handleBlur = $(() => {
    keyboardState.value.hasFocus = false;
    // Close dropdown after a short delay to allow for option selection
    setTimeout(() => {
      isOpen.value = false;
      searchTerm.value = '';
      focusedIndex.value = -1;
    }, 150);
  });

  // Style classes
  const getTriggerClasses = () => {
    const base = [
      'relative flex items-center justify-between w-full px-3 py-2',
      'border rounded-lg cursor-pointer transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'text-left bg-white'
    ];

    // Size variations
    const sizeClasses = {
      xs: 'text-xs px-2 py-1',
      sm: 'text-sm px-2 py-1.5',
      md: 'text-base px-3 py-2',
      lg: 'text-lg px-4 py-3',
      xl: 'text-xl px-5 py-4'
    };

    // Variant styles
    const variantClasses = {
      default: 'border-base-300 focus:border-primary focus:ring-primary/20',
      filled: 'border-transparent bg-base-100 focus:bg-white focus:border-primary focus:ring-primary/20',
      outlined: 'border-2 border-base-300 focus:border-primary focus:ring-primary/20'
    };

    // Error state
    if (hasError) {
      base.push('border-danger focus:border-danger focus:ring-danger/20');
    } else {
      base.push(variantClasses[variant]);
    }

    base.push(sizeClasses[size]);

    // Medical device enhancements
    if (medicalDeviceMode) {
      base.push('focus:ring-4 focus:ring-offset-2 focus:shadow-lg');
    }

    // Disabled state
    if (disabled) {
      base.push('opacity-50 cursor-not-allowed bg-base-100');
    }

    // Open state
    if (isOpen.value) {
      base.push('ring-2 ring-primary/20 border-primary');
    }

    return base.join(' ');
  };

  const getDropdownClasses = () => {
    return [
      'absolute z-50 w-full mt-1 bg-white border border-base-300 rounded-lg shadow-lg',
      'max-h-60 overflow-auto'
    ].join(' ');
  };

  const getOptionClasses = (option: SelectOption, index: number) => {
    const base = [
      'px-3 py-2 cursor-pointer transition-colors duration-150',
      'text-base-dark hover:bg-primary/5 hover:text-primary'
    ];

    if (option.disabled) {
      base.push('opacity-50 cursor-not-allowed');
    }

    if (option.value === selectedValue.value) {
      base.push('bg-primary text-white');
    } else if (index === focusedIndex.value) {
      base.push('bg-primary/10 text-primary');
    }

    return base.join(' ');
  };

  const getLabelClasses = () => {
    const base = ['block text-sm font-medium mb-2'];
    
    if (hasError) {
      base.push('text-danger');
    } else {
      base.push('text-base-dark');
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

  const triggerClasses = mergeClasses(
    getTriggerClasses(),
    enhancements.className,
    customClass
  );

  const wrapperClasses = mergeClasses(
    'select-wrapper relative',
    fullWidth ? 'w-full' : 'w-auto'
  );

  const selectedOption = getSelectedOption();

  return (
    <div class="themed-content">
      <div class={wrapperClasses} style={style} {...rest}>
        {/* Label */}
        {label && (
          <label for={selectId} class={getLabelClasses()}>
            {label}
            {required && <span class="text-danger ml-1" aria-label="required">*</span>}
          </label>
        )}

        {/* Medical device instructions */}
        {medicalDeviceMode && (
          <div class="mb-2 text-xs text-primary">
            Press Ctrl+O to open/close, Ctrl+C to cancel
            {enableWorkflowShortcuts && `, Arrow keys to navigate`}
          </div>
        )}

        {/* Select trigger */}
        <div class="relative">
          <button
            type="button"
            id={selectId}
            class={triggerClasses}
            disabled={disabled}
            aria-expanded={isOpen.value}
            aria-haspopup="listbox"
            aria-label={ariaLabel || label || 'Select option'}
            aria-describedby={[
              `${selectId}-helper`,
              medicalDeviceMode ? keyboardState.value.instructionsId : undefined,
              hasError ? `${selectId}-error` : undefined
            ].filter(Boolean).join(' ') || undefined}
            aria-invalid={hasError}
            onFocus$={handleFocus}
            onBlur$={handleBlur}
            onKeyDown$={handleKeyDown}
            onClick$={() => {
              if (!disabled) {
                isOpen.value = !isOpen.value;
              }
            }}
          >
            <span class={selectedOption ? 'text-base-dark' : 'text-base-light'}>
              {selectedOption?.label || placeholder}
            </span>
            
            <Icon 
              name={isOpen.value ? "chevron-up" : "chevron-down"} 
              size="sm" 
              class="transition-transform duration-200" 
            />
          </button>

          {/* Shortcut indicator */}
          {medicalDeviceMode && keyboardState.value.shortcutPressed && (
            <div class="absolute top-2 right-8 bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
              Action
            </div>
          )}

          {/* Dropdown */}
          {isOpen.value && (
            <div class={getDropdownClasses()}>
              {/* Search input for searchable selects */}
              {isSearchable && (
                <div class="p-2 border-b border-base-200">
                  <input
                    type="text"
                    class="w-full px-2 py-1 text-sm border border-base-300 rounded focus:outline-none focus:border-primary"
                    placeholder="Search options..."
                    value={searchTerm.value}
                    onInput$={(e) => {
                      searchTerm.value = (e.target as HTMLInputElement).value;
                      focusedIndex.value = 0;
                    }}
                  />
                </div>
              )}

              {/* Options list */}
              <div role="listbox">
                {filteredOptions.length === 0 ? (
                  <div class="px-3 py-2 text-base-light text-center">
                    No options found
                  </div>
                ) : (
                  filteredOptions.map((option, index) => (
                    <div
                      key={option.value}
                      role="option"
                      class={getOptionClasses(option, index)}
                      aria-selected={option.value === selectedValue.value}
                      onClick$={() => {
                        if (!option.disabled) {
                          handleSelect(option.value);
                        }
                      }}
                    >
                      <div class="flex flex-col">
                        <span class="font-medium">{option.label}</span>
                        {option.description && (
                          <span class="text-xs text-base-light mt-1">
                            {option.description}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p id={`${selectId}-error`} class={getHelperClasses()} role="alert" aria-live="polite">
            {error}
          </p>
        )}
        
        {/* Helper text */}
        {!error && helperText && (
          <p id={`${selectId}-helper`} class={getHelperClasses()}>
            {helperText}
          </p>
        )}

        {/* Medical device screen reader instructions */}
        {medicalDeviceMode && (
          <div id={keyboardState.value.instructionsId} class="sr-only">
            Medical select field: Use arrow keys to navigate options, Enter to select.
            {` Ctrl+O to open/close dropdown, Ctrl+C to cancel selection.`}
            {enableWorkflowShortcuts && ` Healthcare shortcuts enabled for ${purpose} context.`}
            {isSearchable && ` Type to search available options.`}
          </div>
        )}
      </div>
    </div>
  );
});
