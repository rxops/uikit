/**
 * RxOps Design System
 * 
 * Complete design system package for healthcare applications
 */

// Export design tokens
export { 
  designTokens, 
  getColorClass, 
  getSemanticColor,
  getSemanticColorClass,
  getSpacingClass, 
  getComponentSizeClasses,
  generateSemanticColorCSS,
} from './tokens';
export type { 
  ColorScale,
  SemanticColorAlias,
  SemanticColorName,
  ComponentSize, 
  SpacingKey, 
  FontSize, 
  FontWeight, 
  BorderRadius, 
  BoxShadow 
} from './tokens';

// Export semantic registry for consistent component styling
export { 
  getSemanticColorClassSafe,
  getSemanticButtonClasses,
  SEMANTIC_CLASSES,
  ALL_SEMANTIC_CLASSES 
} from './semantic-registry';

// Export CSS variables utilities
export {
  semanticColorCSS,
  semanticColors,
  injectSemanticColors,
} from './css-variables';

// Export utilities
export {
  mergeClasses,
  type BaseComponentProps
} from './utils';

// Export composition utilities
export {
  LoadingWrapper,
  ErrorBoundaryWrapper,
  MedicalDeviceWrapper,
  EmergencyWrapper,
  breakpoints,
  resolveResponsiveProp,
  mergeClasses as mergeClassNames,
  getIntentClasses,
  getSizeClasses,
  animations,
  getAnimationClass,
  getHealthcareAria,
  getMedicalAnnouncement,
} from './composition-utils';

// Export advanced healthcare utilities
export {
  createVariantClass,
  sizeConfig,
  focusConfig,
  getClinicalPriorityClasses,
  clinicalPriorityToIntent,
  getFocusClasses,
  validateClinicalSafety,
  type ClinicalPriority,
  type ThemeContext,
  type ComponentState,
  type VariantConfig,
  type ClinicalProps,
  type EnhancedComponentBaseProps,
  type PolymorphicProps,
} from './healthcare-utils';

// Export type definitions
export type {
  // Base types
  Size,
  Spacing,
  Alignment,
  Justify,
  State,
  Position,
  
  // Visual types
  Variant,
  Color,
  TextStyle,
  TextWeight,
  TextAlign,
  TextTransform,
  Shade,
  
  // Specialized types
  Gap,
  FormVariant,
  ValidationState,
  LoadingState,
  InteractiveState,
  FocusState,
  
  // Healthcare types
  MedicalPriority,
  HealthcareIntent,
  MedicalContext,
  AppointmentStatus,
  MedicalRecordStatus,
  
  // Component prop interfaces
  BaseProps,
  LayoutProps,
  VisualProps,
  FormFieldProps,
  InteractiveProps,
  HealthcareProps,
  AccessibilityProps,
  
  // Composite interfaces
  StandardComponentProps,
  InteractiveComponentProps,
  FormComponentProps,
  HealthcareComponentProps,
  LayoutComponentProps,
  
  // Utility types
  PartialBy,
  RequiredBy,
  
  // Backward compatibility
  ButtonVariant,
  ButtonColor,
  ButtonSize,
  ButtonIntent,
  InputVariant,
  StackAlign,
  StackJustify,
  GridGap,
} from './types';
