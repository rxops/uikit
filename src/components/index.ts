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
