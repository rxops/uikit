import { component$, Slot, useSignal } from "@builder.io/qwik";
import { mergeClasses } from "../../design-system/utils";
import { Icon, type IconName } from "../feedback/icon";

export type FormFieldSize = 'sm' | 'md' | 'lg';
export type FormFieldLayout = 'vertical' | 'horizontal' | 'inline';
export type FormFieldStatus = 'default' | 'success' | 'warning' | 'error';
export type FormFieldContext = 
  | 'default'
  | 'patient-information'
  | 'medical-history'
  | 'medication-details'
  | 'emergency-contact'
  | 'clinical-notes'
  | 'diagnostic-data';

export interface FormFieldProps {
  /** Field label */
  label?: string;
  /** Additional description text */
  description?: string;
  /** Error message */
  error?: string;
  /** Success message */
  success?: string;
  /** Warning message */
  warning?: string;
  /** Helper text */
  helperText?: string;
  /** Component size */
  size?: FormFieldSize;
  /** Layout arrangement */
  layout?: FormFieldLayout;
  /** Field status */
  status?: FormFieldStatus;
  /** Required field */
  required?: boolean;
  /** Optional field indicator */
  optional?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** HTML for attribute */
  for?: string;
  /** HTML id attribute */
  id?: string;
  /** Medical device mode for enhanced accessibility */
  medicalDeviceMode?: boolean;
  /** Enable healthcare workflow shortcuts */
  enableWorkflowShortcuts?: boolean;
  /** Form field context for healthcare applications */
  fieldContext?: FormFieldContext;
  /** Show character counter for text inputs */
  showCharacterCount?: boolean;
  /** Maximum character count */
  maxLength?: number;
  /** Current character count */
  currentLength?: number;
  /** Enable auto-save indication */
  autoSave?: boolean;
  /** Show validation icon */
  showValidationIcon?: boolean;
  /** Custom CSS class */
  class?: string;
  /** Custom styles */
  style?: Record<string, string | number>;
}

/**
 * Healthcare-optimized Form Field Wrapper Component
 * 
 * Comprehensive form field wrapper with medical device accessibility,
 * healthcare-specific contexts, and clinical workflow optimization.
 */
export const FormField = component$<FormFieldProps>((props) => {
  const {
    label,
    description,
    error,
    success,
    warning,
    helperText,
    size = 'md',
    layout = 'vertical',
    status = 'default',
    required = false,
    optional = false,
    // disabled = false,
    for: htmlFor,
    // id,
    medicalDeviceMode = false,
    enableWorkflowShortcuts = true,
    fieldContext = 'default',
    showCharacterCount = false,
    maxLength,
    currentLength = 0,
    autoSave = false,
    showValidationIcon = true,
    class: customClass,
    style,
    ...rest
  } = props;

  // const fieldId = id || htmlFor || `form-field-${Math.random().toString(36).substr(2, 9)}`;
  
  // Auto-save state management
  const autoSaveState = useSignal({
    isActive: false,
    lastSaved: null as Date | null,
    saveIndicator: false
  });

  // Context-based enhancements
  const getContextEnhancements = (context: FormFieldContext) => {
    const enhancements = {
      default: {
        className: "",
        priority: 'normal',
        requiresValidation: false
      },
      'patient-information': {
        className: "patient-info-field",
        priority: 'high',
        requiresValidation: true
      },
      'medical-history': {
        className: "medical-history-field",
        priority: 'high',
        requiresValidation: true
      },
      'medication-details': {
        className: "medication-field",
        priority: 'critical',
        requiresValidation: true
      },
      'emergency-contact': {
        className: "emergency-field",
        priority: 'critical',
        requiresValidation: true
      },
      'clinical-notes': {
        className: "clinical-notes-field",
        priority: 'normal',
        requiresValidation: false
      },
      'diagnostic-data': {
        className: "diagnostic-field",
        priority: 'high',
        requiresValidation: true
      }
    };

    return enhancements[context] || enhancements.default;
  };

  const enhancements = getContextEnhancements(fieldContext);

  // Determine current status based on props
  const getCurrentStatus = (): FormFieldStatus => {
    if (error) return 'error';
    if (warning) return 'warning';
    if (success) return 'success';
    return status;
  };

  const currentStatus = getCurrentStatus();

  // Auto-save simulation
  // const triggerAutoSave = $(() => {
  //   if (autoSave) {
  //     autoSaveState.value = {
  //       ...autoSaveState.value,
  //       isActive: true,
  //       saveIndicator: true
  //     };

  //     // Simulate save delay
  //     setTimeout(() => {
  //       autoSaveState.value = {
  //         ...autoSaveState.value,
  //         isActive: false,
  //         lastSaved: new Date(),
  //         saveIndicator: false
  //       };
  //     }, 1000);
  //   }
  // });

  // Style classes
  const getWrapperClasses = () => {
    const base = [
      'form-field flex gap-4 transition-all duration-200'
    ];

    // Layout classes
    const layoutClasses = {
      vertical: 'flex-col',
      horizontal: 'flex-row items-start',
      inline: 'flex-row items-center'
    };

    base.push(layoutClasses[layout]);

    // Size classes
    const sizeClasses = {
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4'
    };

    base.push(sizeClasses[size]);

    // Medical device enhanced styling
    if (medicalDeviceMode) {
      base.push('focus-within:ring-2 focus-within:ring-primary/20 focus-within:ring-offset-2 rounded-lg p-2');
    }

    // Critical context styling
    if (enhancements.priority === 'critical') {
      base.push('ring-1 ring-caution/20 bg-caution/5 p-4 rounded-lg');
    }

    // Status styling
    if (currentStatus === 'error') {
      base.push('ring-1 ring-danger/20');
    }

    return base.join(' ');
  };

  const getLabelClasses = () => {
    const base = ['form-field-label font-medium'];

    // Size classes
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base'
    };

    base.push(sizeClasses[size]);

    // Layout classes
    if (layout === 'horizontal') {
      base.push('min-w-0 flex-shrink-0 w-32');
    } else if (layout === 'inline') {
      base.push('flex-shrink-0');
    }

    // Status styling
    if (currentStatus === 'error') {
      base.push('text-danger');
    } else if (enhancements.priority === 'critical') {
      base.push('text-caution-dark');
    } else {
      base.push('text-base-dark');
    }

    return base.join(' ');
  };

  const getDescriptionClasses = () => {
    const base = ['form-field-description'];

    // Size classes
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm'
    };

    base.push(sizeClasses[size]);

    // Status styling
    if (currentStatus === 'error') {
      base.push('text-danger');
    } else {
      base.push('text-base');
    }

    return base.join(' ');
  };

  const getMessageClasses = () => {
    const base = ['form-field-message flex items-center gap-2 mt-1'];

    // Size classes
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm'
    };

    base.push(sizeClasses[size]);

    // Status styling
    const statusClasses = {
      error: 'text-danger',
      warning: 'text-caution-dark',
      success: 'text-success',
      default: 'text-base'
    };

    base.push(statusClasses[currentStatus]);

    return base.join(' ');
  };

  const getContentClasses = () => {
    const base = ['form-field-content flex-1 min-w-0'];

    return base.join(' ');
  };

  // Get status icon
  const getStatusIcon = (): IconName | null => {
    const iconMap: Record<FormFieldStatus, IconName | null> = {
      error: 'alert-circle',
      warning: 'alert-triangle', 
      success: 'check-circle',
      default: null
    };

    return iconMap[currentStatus];
  };

  // Get current message
  const getCurrentMessage = () => {
    if (error) return error;
    if (warning) return warning;
    if (success) return success;
    return helperText;
  };

  const wrapperClasses = mergeClasses(
    getWrapperClasses(),
    enhancements.className,
    customClass
  );

  return (
    <div class="themed-content">
      <div class={wrapperClasses} style={style} {...rest}>
        {/* Label section */}
        {label && (
          <div class="form-field-label-section">
            <label for={htmlFor} class={getLabelClasses()}>
              <span class="flex items-center gap-2">
                {label}
                
                {/* Required indicator */}
                {required && (
                  <span class="text-danger" aria-label="required">*</span>
                )}
                
                {/* Optional indicator */}
                {optional && !required && (
                  <span class="text-base-400 text-xs font-normal">(optional)</span>
                )}
                
                {/* Critical indicator */}
                {enhancements.priority === 'critical' && (
                  <span class="text-xs font-normal text-caution">(Critical)</span>
                )}

                {/* Auto-save indicator */}
                {autoSave && autoSaveState.value.saveIndicator && (
                  <span class="flex items-center gap-1 text-primary text-xs">
                    <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    Saving...
                  </span>
                )}

                {/* Last saved timestamp */}
                {autoSave && autoSaveState.value.lastSaved && !autoSaveState.value.saveIndicator && (
                  <span class="text-xs text-success">
                    ✓ Saved {autoSaveState.value.lastSaved.toLocaleTimeString()}
                  </span>
                )}
              </span>
            </label>
            
            {description && (
              <div class={getDescriptionClasses()}>
                {description}
              </div>
            )}
          </div>
        )}

        {/* Content section */}
        <div class={getContentClasses()}>
          {/* Field content slot */}
          <div class="relative">
            <Slot />
            
            {/* Character counter */}
            {showCharacterCount && maxLength && (
              <div class="absolute bottom-2 right-3 text-xs text-base-400">
                {currentLength}/{maxLength}
              </div>
            )}
          </div>

          {/* Message section */}
          {getCurrentMessage() && (
            <div class={getMessageClasses()} role="alert" aria-live="polite">
              {/* Status icon */}
              {showValidationIcon && getStatusIcon() && (
                <Icon 
                  name={getStatusIcon()!} 
                  size="xs" 
                  class="flex-shrink-0" 
                />
              )}
              
              <span class="flex-1">{getCurrentMessage()}</span>
            </div>
          )}

          {/* Medical device instructions */}
          {medicalDeviceMode && (
            <div class="mt-2 text-xs text-primary bg-primary/5 p-2 rounded">
              Medical device mode active
              {enableWorkflowShortcuts && ` • Healthcare shortcuts enabled for ${fieldContext} context`}
              {autoSave && ' • Auto-save enabled'}
            </div>
          )}

          {/* Healthcare workflow shortcuts info */}
          {enableWorkflowShortcuts && fieldContext !== 'default' && (
            <div class="mt-1 text-xs text-base-400">
              Healthcare context: {fieldContext.replace('-', ' ')}
              {enhancements.requiresValidation && ' • Validation required'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
