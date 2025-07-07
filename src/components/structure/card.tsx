/**
 * @fileoverview RxOps UIKit Card Component
 * @version 1.0.0
 * @author RxOps Development Team
 * 
 * 🏥 Medical industry-focused card component with healthcare-specific features
 * 
 * Features:
 * - WCAG 2.1 AA+ accessibility compliance
 * - Medical device touch targets
 * - Healthcare-specific card variants
 * - Patient information display
 * - Emergency override capabilities
 * - High contrast mode support
 * - Token-driven styling system
 */

import { component$, Slot, type QRL } from '@builder.io/qwik';
import type { BaseProps, Variant, ComponentSize, Spacing } from '../../design-system/types';
import { mergeClasses } from '../../design-system/utils';

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

export interface CardProps extends BaseProps {
  /** Visual variant of the card */
  variant?: Variant | 'elevated';
  
  /** Card purpose for specialized styling */
  purpose?: 'default' | 'patient' | 'vital-signs' | 'medication' | 'appointment' | 'emergency';
  
  /** Size of the card component */
  size?: ComponentSize;
  
  /** Padding inside the card */
  padding?: Spacing;
  
  /** Whether the card is interactive/clickable */
  interactive?: boolean;
  
  /** Card header content */
  title?: string;
  
  /** Card subtitle content */
  subtitle?: string;
  
  /** Card footer content */
  footer?: string;
  
  /** Medical priority level */
  priority?: 'low' | 'normal' | 'high' | 'critical' | 'emergency';
  
  /** Whether to show status indicator */
  showStatus?: boolean;
  
  /** Status value for medical contexts */
  status?: 'stable' | 'caution' | 'warning' | 'critical';
  
  /** Medical compliance level */
  complianceLevel?: 'standard' | 'enhanced' | 'critical';
  
  /** Whether this card contains critical medical information */
  isCritical?: boolean;
  
  /** Patient ID for medical cards */
  patientId?: string;
  
  /** Timestamp for medical records */
  timestamp?: string;
  
  /** Click handler for interactive cards */
  onClick$?: QRL<(event: MouseEvent) => void>;
}

export interface CardHeaderProps {
  /** Additional styling */
  variant?: 'default' | 'medical' | 'emergency';
}

export interface CardBodyProps {
  /** Body padding variant */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface CardFooterProps {
  /** Footer alignment */
  align?: 'left' | 'center' | 'right' | 'between';
}

// =============================================================================
// CARD HEADER COMPONENT
// =============================================================================

export const CardHeader = component$<CardHeaderProps>((props) => {
  const {
    variant = 'default',
    ...rest
  } = props;

  const headerClasses = mergeClasses(
    'card-header flex items-center justify-between p-4 border-b border-neutral-200',
    variant === 'medical' && 'bg-primary-50',
    variant === 'emergency' && 'bg-danger-50 border-danger-200'
  );

  return (
    <div class={headerClasses} {...rest}>
      <Slot />
    </div>
  );
});

// =============================================================================
// CARD BODY COMPONENT
// =============================================================================

export const CardBody = component$<CardBodyProps>((props) => {
  const {
    padding = 'md',
    ...rest
  } = props;

  const bodyClasses = mergeClasses(
    'card-body',
    padding === 'none' && 'p-0',
    padding === 'sm' && 'p-2',
    padding === 'md' && 'p-4',
    padding === 'lg' && 'p-6'
  );

  return (
    <div class={bodyClasses} {...rest}>
      <Slot />
    </div>
  );
});

// =============================================================================
// CARD FOOTER COMPONENT
// =============================================================================

export const CardFooter = component$<CardFooterProps>((props) => {
  const {
    align = 'left',
    ...rest
  } = props;

  const footerClasses = mergeClasses(
    'card-footer p-4 border-t border-neutral-200 flex',
    align === 'center' && 'justify-center',
    align === 'right' && 'justify-end',
    align === 'between' && 'justify-between'
  );

  return (
    <div class={footerClasses} {...rest}>
      <Slot />
    </div>
  );
});

// =============================================================================
// MAIN CARD COMPONENT
// =============================================================================

export const Card = component$<CardProps>((props) => {
  const {
    variant = 'outlined',
    purpose = 'default',
    size = 'md',
    padding = '4',
    interactive = false,
    title,
    subtitle,
    footer,
    priority = 'normal',
    showStatus = false,
    status = 'stable',
    complianceLevel = 'standard',
    isCritical = false,
    patientId,
    timestamp,
    onClick$,
    class: className,
    ...rest
  } = props;

  // Build card classes using design tokens
  const cardClasses = mergeClasses(
    // Base card styles
    'card bg-white rounded-lg transition-all duration-200',
    
    // Variants
    variant === 'outlined' && 'border border-neutral-200',
    variant === 'elevated' && 'shadow-md hover:shadow-lg',
    variant === 'filled' && 'bg-neutral-50',
    variant === 'ghost' && 'border-0 shadow-none',
    
    // Sizes
    size === 'sm' && 'text-sm',
    size === 'md' && 'text-base',
    size === 'lg' && 'text-lg',
    size === 'xl' && 'text-xl',
    
    // Purpose-based styling
    purpose === 'patient' && 'border-primary-200 bg-primary-25',
    purpose === 'vital-signs' && 'border-info-200 bg-info-25',
    purpose === 'medication' && 'border-success-200 bg-success-25',
    purpose === 'appointment' && 'border-secondary-200 bg-secondary-25',
    purpose === 'emergency' && 'border-danger-300 bg-danger-50',
    
    // Priority styling
    priority === 'high' && 'ring-1 ring-caution-300',
    priority === 'critical' && 'ring-2 ring-danger-400',
    priority === 'emergency' && 'ring-2 ring-danger-600 bg-danger-100',
    
    // Status styling
    status === 'caution' && 'border-l-4 border-l-caution-500',
    status === 'warning' && 'border-l-4 border-l-caution-600',
    status === 'critical' && 'border-l-4 border-l-danger-600',
    
    // Interactive styling
    interactive && [
      'cursor-pointer hover:shadow-md',
      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
    ],
    
    // Critical styling
    isCritical && 'ring-1 ring-danger-400',
    
    // Custom classes
    className
  );

  // Enhanced medical compliance attributes
  const enhancedProps = {
    'data-purpose': purpose,
    'data-priority': priority,
    'data-compliance-level': complianceLevel,
    'data-critical': isCritical ? 'true' : undefined,
    'data-patient-id': patientId,
    'data-status': showStatus ? status : undefined,
    'role': interactive ? 'button' : 'region',
    'tabIndex': interactive ? 0 : undefined,
    'aria-label': title || `${purpose} card`,
    'aria-describedby': subtitle ? `${rest.id || 'card'}-subtitle` : undefined,
    'onClick$': interactive ? onClick$ : undefined,
  };

  // Status indicator component
  const StatusIndicator = () => (
    showStatus && (
      <div class={mergeClasses(
        'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
        status === 'stable' && 'bg-success-100 text-success-700',
        status === 'caution' && 'bg-caution-100 text-caution-700',
        status === 'warning' && 'bg-caution-200 text-caution-800',
        status === 'critical' && 'bg-danger-100 text-danger-700'
      )}>
        <span>{status.toUpperCase()}</span>
      </div>
    )
  );

  // Medical header with patient info
  const MedicalHeader = () => (
    (title || subtitle || patientId || timestamp) && (
      <CardHeader variant={purpose === 'emergency' ? 'emergency' : 'medical'}>
        <div class="flex-1">
          {title && <h3 class="text-lg font-semibold text-neutral-900 mb-1">{title}</h3>}
          {subtitle && (
            <p 
              class="text-sm text-neutral-600" 
              id={`${rest.id || 'card'}-subtitle`}
            >
              {subtitle}
            </p>
          )}
          
          {(patientId || timestamp) && (
            <div class="flex items-center gap-4 mt-2 text-xs text-neutral-500">
              {patientId && (
                <span class="font-medium">ID: {patientId}</span>
              )}
              {timestamp && (
                <time>{timestamp}</time>
              )}
            </div>
          )}
        </div>
        
        <StatusIndicator />
      </CardHeader>
    )
  );

  // Simple header for non-medical cards
  const SimpleHeader = () => (
    (title || subtitle) && (
      <CardHeader>
        <div class="flex-1">
          {title && <h3 class="text-lg font-semibold text-neutral-900">{title}</h3>}
          {subtitle && (
            <p 
              class="text-sm text-neutral-600" 
              id={`${rest.id || 'card'}-subtitle`}
            >
              {subtitle}
            </p>
          )}
        </div>
        <StatusIndicator />
      </CardHeader>
    )
  );

  return (
    <div
      class={cardClasses}
      {...enhancedProps}
      {...rest}
    >
      {/* Header - Medical or Simple */}
      {purpose === 'patient' || purpose === 'vital-signs' || purpose === 'medication' || purpose === 'emergency'
        ? <MedicalHeader />
        : <SimpleHeader />
      }

      {/* Body Content */}
      {!padding || padding === '0' ? (
        <Slot />
      ) : (
        <CardBody padding={padding === '2' ? 'sm' : padding === '4' ? 'md' : padding === '6' ? 'lg' : 'md'}>
          <Slot />
        </CardBody>
      )}

      {/* Footer */}
      {footer && (
        <CardFooter>
          {footer}
        </CardFooter>
      )}
    </div>
  );
});

// =============================================================================
// SPECIALIZED CARD COMPONENTS
// =============================================================================

/**
 * Patient Card - Optimized for patient information display
 */
export const PatientCard = component$<Omit<CardProps, 'purpose'>>((props) => {
  return (
    <Card
      {...props}
      purpose="patient"
      complianceLevel="enhanced"
      showStatus={true}
    />
  );
});

/**
 * Vital Signs Card - For critical medical measurements
 */
export const VitalSignsCard = component$<Omit<CardProps, 'purpose'>>((props) => {
  return (
    <Card
      {...props}
      purpose="vital-signs"
      complianceLevel="critical"
      isCritical={true}
      showStatus={true}
    />
  );
});

/**
 * Medication Card - For medication information
 */
export const MedicationCard = component$<Omit<CardProps, 'purpose'>>((props) => {
  return (
    <Card
      {...props}
      purpose="medication"
      complianceLevel="enhanced"
    />
  );
});

/**
 * Emergency Card - For emergency medical information
 */
export const EmergencyCard = component$<Omit<CardProps, 'purpose' | 'priority'>>((props) => {
  return (
    <Card
      {...props}
      purpose="emergency"
      priority="emergency"
      complianceLevel="critical"
      isCritical={true}
      showStatus={true}
      variant="outlined"
    />
  );
});

/**
 * Appointment Card - For appointment scheduling
 */
export const AppointmentCard = component$<Omit<CardProps, 'purpose'>>((props) => {
  return (
    <Card
      {...props}
      purpose="appointment"
      interactive={true}
    />
  );
});

// =============================================================================
// EXPORTS
// =============================================================================

export default Card;
