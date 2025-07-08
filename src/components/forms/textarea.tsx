import { component$, useSignal, $, type QRL } from "@builder.io/qwik";
import type { ComponentSize } from "../../design-system";
import { mergeClasses } from "../../design-system/utils";

export type TextareaPurpose = 
  | 'general'
  | 'notes' 
  | 'symptoms'
  | 'medication'
  | 'emergency'
  | 'history'
  | 'diagnosis'
  | 'treatment'
  | 'documentation';

export type TextareaVariant = 'default' | 'filled' | 'outlined';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export interface TextareaProps {
  /** Purpose-driven enhancement for healthcare contexts */
  purpose?: TextareaPurpose;
  /** Label for the textarea */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Number of visible text rows */
  rows?: number;
  /** Number of visible text columns */
  cols?: number;
  /** Component size */
  size?: ComponentSize;
  /** Visual variant */
  variant?: TextareaVariant;
  /** Resize behavior */
  resize?: TextareaResize;
  /** Maximum character length */
  maxLength?: number;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Auto-resize based on content */
  autoResize?: boolean;
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
  /** Emergency mode for critical data entry */
  emergencyMode?: boolean;
  /** Enable healthcare workflow shortcuts */
  enableWorkflowShortcuts?: boolean;
  /** Auto-save interval in milliseconds */
  autoSaveInterval?: number;
  /** Auto-save callback */
  onAutoSave$?: QRL<(value: string) => void>;
  /** Custom CSS class */
  class?: string;
  /** Custom styles */
  style?: Record<string, string | number>;
}

/**
 * Healthcare-optimized Textarea Component
 * 
 * Purpose-driven textarea with medical device accessibility, clinical workflow
 * shortcuts, and healthcare-specific enhancements for documentation.
 */
export const Textarea = component$<TextareaProps>((props) => {
  const {
    purpose = 'general',
    label,
    placeholder,
    value = '',
    rows,
    cols,
    size = 'md',
    variant = 'default',
    resize = 'vertical',
    maxLength,
    disabled = false,
    required = false,
    error,
    helperText,
    autoResize = false,
    fullWidth = true,
    id,
    name,
    ariaLabel,
    onChange$,
    medicalDeviceMode = false,
    emergencyMode = false,
    enableWorkflowShortcuts = true,
    // autoSaveInterval = 30000, // 30 seconds for medical data
    onAutoSave$,
    class: customClass,
    style,
    ...rest
  } = props;

  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const inputValue = useSignal(value);
  const characterCount = useSignal(value.length);
  const hasError = !!error;
  const isFocused = useSignal(false);

  // Medical device keyboard state
  const keyboardState = useSignal({
    hasFocus: false,
    emergencyHighlight: false,
    shortcutPressed: false,
    hasUnsavedChanges: false,
    instructionsId: `${textareaId}-instructions`
  });

  // Purpose-based enhancements
  const getPurposeEnhancements = (purpose: TextareaPurpose) => {
    const enhancements = {
      general: {
        rows: 3,
        placeholder: "Enter text...",
        className: "",
        maxLength: 1000
      },
      notes: {
        rows: 6,
        placeholder: "Enter clinical notes and observations...",
        className: "clinical-notes",
        maxLength: 5000
      },
      symptoms: {
        rows: 4,
        placeholder: "Describe patient symptoms, onset, duration, and severity...",
        className: "symptom-documentation",
        maxLength: 2000
      },
      medication: {
        rows: 3,
        placeholder: "Enter medication instructions, dosage, and administration notes...",
        className: "medication-notes",
        maxLength: 1500
      },
      emergency: {
        rows: 5,
        placeholder: "EMERGENCY: Document critical details, timeline, and immediate actions taken...",
        className: "emergency-documentation",
        maxLength: 3000
      },
      history: {
        rows: 8,
        placeholder: "Document patient medical history, previous conditions, and relevant background...",
        className: "medical-history",
        maxLength: 10000
      },
      diagnosis: {
        rows: 4,
        placeholder: "Enter assessment, differential diagnosis, and clinical reasoning...",
        className: "diagnosis-notes",
        maxLength: 3000
      },
      treatment: {
        rows: 6,
        placeholder: "Document treatment plan, procedures, and care instructions...",
        className: "treatment-plan",
        maxLength: 4000
      },
      documentation: {
        rows: 5,
        placeholder: "Enter clinical documentation and patient records...",
        className: "clinical-documentation",
        maxLength: 6000
      }
    };

    return enhancements[purpose] || enhancements.general;
  };

  const enhancements = getPurposeEnhancements(purpose);
  const effectiveRows = rows || enhancements.rows;
  const effectiveMaxLength = maxLength || enhancements.maxLength;
  const effectivePlaceholder = placeholder || enhancements.placeholder;

  // Handle input changes
  const handleInput = $((event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    const newValue = target.value;
    
    inputValue.value = newValue;
    characterCount.value = newValue.length;
    keyboardState.value.hasUnsavedChanges = true;
    
    // Auto-resize if enabled
    if (autoResize) {
      target.style.height = 'auto';
      target.style.height = target.scrollHeight + 'px';
    }
    
    onChange$?.(newValue);
  });

  // Medical device keyboard shortcuts
  const handleKeyDown = $((event: KeyboardEvent) => {
    keyboardState.value.shortcutPressed = false;

    if (medicalDeviceMode || emergencyMode) {
      // Emergency clear
      if (event.key === 'Escape') {
        event.preventDefault();
        const target = event.target as HTMLTextAreaElement;
        target.value = '';
        inputValue.value = '';
        characterCount.value = 0;
        onChange$?.('');
        keyboardState.value.hasUnsavedChanges = false;
      }

      // Quick save shortcut
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        keyboardState.value.shortcutPressed = true;
        if (onAutoSave$) {
          onAutoSave$(inputValue.value);
        }
      }

      // Emergency mode toggle
      if (event.ctrlKey && event.key === 'e' && enableWorkflowShortcuts) {
        event.preventDefault();
        keyboardState.value.emergencyHighlight = !keyboardState.value.emergencyHighlight;
      }
    }

    // Healthcare workflow shortcuts
    if (enableWorkflowShortcuts && event.ctrlKey) {
      switch (purpose) {
        case 'medication':
          if (event.key === 'd') {
            event.preventDefault();
            console.log('Open dosage calculator');
          }
          break;
        case 'symptoms':
          if (event.key === 'h') {
            event.preventDefault();
            console.log('Show symptom history');
          }
          break;
        case 'emergency':
          if (event.key === 't') {
            event.preventDefault();
            console.log('Insert timestamp');
          }
          break;
      }
    }
  });

  const handleFocus = $(() => {
    isFocused.value = true;
    keyboardState.value.hasFocus = true;

    // Auto-select for emergency contexts
    if (emergencyMode && inputValue.value) {
      setTimeout(() => {
        const textarea = document.getElementById(textareaId) as HTMLTextAreaElement;
        if (textarea) {
          textarea.select();
        }
      }, 50);
    }
  });

  const handleBlur = $(() => {
    isFocused.value = false;
    keyboardState.value.hasFocus = false;
    
    // Auto-save on blur
    if (keyboardState.value.hasUnsavedChanges && onAutoSave$) {
      onAutoSave$(inputValue.value);
      keyboardState.value.hasUnsavedChanges = false;
    }
  });

  // Style classes
  const getBaseClasses = () => {
    const base = [
      'block w-full px-3 py-2 border rounded-lg transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'placeholder:text-base-light'
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
      default: 'border-base-300 bg-white focus:border-primary focus:ring-primary/20',
      filled: 'border-transparent bg-base-100 focus:bg-white focus:border-primary focus:ring-primary/20',
      outlined: 'border-2 border-base-300 bg-transparent focus:border-primary focus:ring-primary/20'
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

    // Emergency mode styling
    if (emergencyMode || keyboardState.value.emergencyHighlight) {
      base.push('ring-2 ring-danger animate-pulse');
    }

    // Purpose-based styling
    base.push(enhancements.className);

    // Resize behavior
    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize'
    };
    base.push(resizeClasses[resize]);

    // Disabled state
    if (disabled) {
      base.push('opacity-50 cursor-not-allowed bg-base-100');
    }

    return base.join(' ');
  };

  const getLabelClasses = () => {
    const base = ['block text-sm font-medium mb-2'];
    
    if (hasError) {
      base.push('text-danger');
    } else if (purpose === 'emergency' || emergencyMode) {
      base.push('text-danger font-semibold');
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

  const getCounterClasses = () => {
    const base = ['text-xs'];
    const isAtLimit = characterCount.value >= effectiveMaxLength;
    
    if (isAtLimit) {
      base.push('text-danger font-medium');
    } else {
      base.push('text-base');
    }
    
    return base.join(' ');
  };

  const textareaClasses = mergeClasses(
    getBaseClasses(),
    customClass
  );

  const wrapperClasses = mergeClasses(
    'textarea-wrapper',
    fullWidth ? 'w-full' : 'w-auto'
  );

  return (
    <div class="themed-content">
      <div class={wrapperClasses} style={style} {...rest}>
        {/* Label */}
        {label && (
          <label for={textareaId} class={getLabelClasses()}>
            {label}
            {required && <span class="text-danger ml-1" aria-label="required">*</span>}
            {(purpose === 'emergency' || emergencyMode) && (
              <span class="ml-2 text-xs font-normal text-danger">(Emergency)</span>
            )}
          </label>
        )}

        {/* Medical device instructions */}
        {medicalDeviceMode && (
          <div class="mb-2 text-xs text-primary">
            Press Ctrl+S to save, Escape to clear
            {enableWorkflowShortcuts && `, Ctrl+E for emergency mode`}
          </div>
        )}

        {/* Textarea */}
        <div class="relative">
          <textarea
            id={textareaId}
            name={name}
            class={textareaClasses}
            rows={effectiveRows}
            cols={cols}
            maxLength={effectiveMaxLength}
            placeholder={effectivePlaceholder}
            disabled={disabled}
            required={required}
            aria-label={ariaLabel || label || `${purpose} textarea`}
            aria-describedby={[
              `${textareaId}-helper`,
              medicalDeviceMode ? keyboardState.value.instructionsId : undefined,
              hasError ? `${textareaId}-error` : undefined
            ].filter(Boolean).join(' ') || undefined}
            aria-invalid={hasError}
            value={inputValue.value}
            onInput$={handleInput}
            onKeyDown$={handleKeyDown}
            onFocus$={handleFocus}
            onBlur$={handleBlur}
          />
          
          {/* Shortcut indicator */}
          {medicalDeviceMode && keyboardState.value.shortcutPressed && (
            <div class="absolute top-2 right-2 bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
              Saved
            </div>
          )}
        </div>

        {/* Footer with counter and help */}
        <div class="flex justify-between items-center mt-1">
          <div>
            {/* Error message */}
            {error && (
              <p id={`${textareaId}-error`} class={getHelperClasses()} role="alert" aria-live="polite">
                {error}
              </p>
            )}
            
            {/* Helper text */}
            {!error && helperText && (
              <p id={`${textareaId}-helper`} class={getHelperClasses()}>
                {helperText}
              </p>
            )}
          </div>
          
          {/* Character counter */}
          {effectiveMaxLength && (
            <div class={getCounterClasses()}>
              {characterCount.value}/{effectiveMaxLength}
            </div>
          )}
        </div>

        {/* Medical device screen reader instructions */}
        {medicalDeviceMode && (
          <div id={keyboardState.value.instructionsId} class="sr-only">
            Medical textarea field: Enter clinical data and press Tab to continue.
            {` Ctrl+S to save, Escape to clear field.`}
            {enableWorkflowShortcuts && ` Healthcare shortcuts enabled for ${purpose} context.`}
            {emergencyMode && ` Emergency mode active.`}
          </div>
        )}
      </div>
    </div>
  );
});
