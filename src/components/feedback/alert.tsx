import { component$, Slot, $, type QRL } from "@builder.io/qwik";
import type { BaseProps, Color, ComponentSize } from "../../design-system/types";
import { mergeClasses } from "../../design-system/utils";

export interface AlertProps extends BaseProps {
  /** Alert color/severity */
  color?: Color;
  /** Visual variant */
  variant?: "filled" | "outlined" | "soft";
  /** Alert size */
  size?: ComponentSize;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Dismiss handler */
  onDismiss$?: QRL<() => void>;
  /** Emergency mode for critical medical alerts */
  emergency?: boolean;
  /** Patient ID for medical context */
  patientId?: string;
  /** Timestamp for medical alerts */
  timestamp?: Date;
}

const colorClasses: Record<Color, Record<string, string>> = {
  primary: {
    filled: "text-white border",
    outlined: "border",
    soft: "border"
  },
  secondary: {
    filled: "text-white border", 
    outlined: "border",
    soft: "border"
  },
  success: {
    filled: "text-white border",
    outlined: "border", 
    soft: "border"
  },
  caution: {
    filled: "text-white border",
    outlined: "border",
    soft: "border"
  },
  danger: {
    filled: "text-white border",
    outlined: "border",
    soft: "border"
  },
  info: {
    filled: "text-white border",
    outlined: "border",
    soft: "border"
  }
};

const sizeClasses: Record<ComponentSize, string> = {
  xs: "text-xs p-2",
  sm: "text-sm p-3", 
  md: "text-base p-4",
  lg: "text-lg p-5",
  xl: "text-xl p-6"
};

export const Alert = component$<AlertProps>((props) => {
  const {
    color = "info",
    variant = "soft", 
    size = "md",
    dismissible = false,
    onDismiss$,
    emergency = false,
    patientId,
    timestamp,
    class: qwikClass,
    className,
    style,
    ...rest
  } = props;

  const handleClose = $(() => {
    if (onDismiss$) {
      onDismiss$();
    }
  });

  const colorStyle = () => {
    const styles: Record<string, string | undefined> = {};
    
    switch (variant) {
      case 'filled':
        styles.backgroundColor = `var(--color-${color})`;
        styles.borderColor = `var(--color-${color})`;
        break;
      case 'outlined':
        styles.color = `var(--color-${color})`;
        styles.borderColor = `var(--color-${color})`;
        break;
      case 'soft':
        styles.backgroundColor = `var(--color-${color}-lighter)`;
        styles.color = `var(--color-${color})`;
        styles.borderColor = `var(--color-${color}-light)`;
        break;
    }
    
    return styles;
  };

  const alertClasses = mergeClasses(
    "alert flex items-start gap-3 border rounded-lg transition-all duration-200 relative",
    colorClasses[color][variant],
    sizeClasses[size],
    emergency && "ring-2 shadow-lg",
    dismissible && "pr-12",
    qwikClass,
    className
  );

  const iconColor = variant === "filled" ? "text-white" : `text-${color}-600`;

  const renderIcon = () => {
    const iconClass = `w-5 h-5 flex-shrink-0 ${iconColor}`;
    
    switch (color) {
      case "success":
        return (
          <svg class={iconClass} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.53a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
          </svg>
        );
      case "caution":
        return (
          <svg class={iconClass} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
          </svg>
        );
      case "danger":
        return (
          <svg class={iconClass} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
          </svg>
        );
      default: // info, primary, secondary
        return (
          <svg class={iconClass} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
          </svg>
        );
    }
  };

  const combinedStyle = Object.assign(
    {},
    style || {},
    colorStyle(),
    emergency && { '--tw-ring-color': 'var(--color-danger)' }
  );

  return (
    <div
      class={alertClasses}
      style={combinedStyle}
      role={emergency ? "alert" : "status"}
      aria-live={emergency ? "assertive" : "polite"}
      data-emergency={emergency}
      data-patient-id={patientId}
      {...rest}
    >
      {/* Icon */}
      <div class="alert-icon">
        {renderIcon()}
      </div>

      {/* Content */}
      <div class="alert-content flex-1">
        {/* Emergency/Patient header */}
        {(emergency || patientId) && (
          <div class="alert-header flex items-center gap-2 mb-2 text-sm">
            {emergency && (
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-danger-100 text-danger-800">
                EMERGENCY
              </span>
            )}
            {patientId && (
              <span class="font-medium">
                Patient: {patientId}
              </span>
            )}
            {timestamp && (
              <span class="text-neutral-500">
                {timestamp.toLocaleTimeString()}
              </span>
            )}
          </div>
        )}
        
        {/* Main content */}
        <div class="alert-body">
          <Slot />
        </div>
      </div>

      {/* Close button */}
      {dismissible && (
        <button
          class="alert-close absolute top-3 right-3 p-1.5 rounded-md text-current opacity-70 hover:opacity-100 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current transition-all duration-200"
          onClick$={handleClose}
          aria-label={emergency ? "Acknowledge emergency alert" : "Close alert"}
          type="button"
        >
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      )}
    </div>
  );
});
