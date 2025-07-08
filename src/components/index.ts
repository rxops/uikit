/**
 * RxOps UIKit Components
 * 
 * Comprehensive component library for healthcare applications with medical device
 * accessibility support and atomic design principles.
 */

// =============================================================================
// LAYOUT COMPONENTS (Foundation Layer)
// =============================================================================

export {
  Container,
  Grid,
  GridItem,
  Stack,
  Row,
  Column
} from "./layout";

export type {
  ContainerProps,
  ContainerSize,
  GridProps,
  GridItemProps,
  StackProps,
  StackDirection,
  FlexWrap,
  RowProps,
  ColumnProps,
  ResponsiveSize
} from "./layout";

// =============================================================================
// TYPOGRAPHY COMPONENTS (Content Layer)
// =============================================================================

export {
  Text
} from "./typography";

export type {
  TextProps
} from "./typography";

// =============================================================================
// FEEDBACK COMPONENTS (Atoms)
// =============================================================================

export {
  Alert,
  Badge,
  Icon
} from "./feedback";

export type {
  AlertProps,
  BadgeProps,
  IconProps,
  IconName
} from "./feedback";

// =============================================================================
// FORM COMPONENTS (Atoms)
// =============================================================================

export {
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  FormField
} from "./forms";

export type {
  InputProps,
  InputType,
  TextareaProps,
  TextareaPurpose,
  TextareaVariant,
  TextareaResize,
  SelectProps,
  SelectOption,
  SelectOptionGroup,
  SelectVariant,
  SelectPurpose,
  CheckboxProps,
  CheckboxSize,
  CheckboxVariant,
  CheckboxContext,
  RadioGroupProps,
  RadioOption,
  RadioSize,
  RadioVariant,
  RadioContext,
  FormFieldProps,
  FormFieldSize,
  FormFieldLayout,
  FormFieldStatus,
  FormFieldContext
} from "./forms";

// =============================================================================
// STRUCTURE COMPONENTS (Container Layer)
// =============================================================================

export {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  PatientCard,
  VitalSignsCard,
  MedicationCard,
  EmergencyCard,
  AppointmentCard
} from "./structure";

export type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps
} from "./structure";

// =============================================================================
// INTERACTION COMPONENTS (Existing)
// =============================================================================

export { Button } from "./button/button";
export type { ButtonProps, ButtonSize, ButtonIntent } from "./button/button";

export { Logo } from "./logo/logo";

// =============================================================================
// DESIGN SYSTEM UTILITIES
// =============================================================================

export { mergeClasses } from "../design-system/utils";
export type { BaseProps } from "../design-system/types";
