import "./global.css";

// Export components
export { Logo } from "./components/logo/logo";
export { Button } from "./components/button/button";
export type { ButtonProps, ButtonIntent, ButtonSize } from "./components/button/button";

// Export layout components
export { 
  Stack, 
  Row, 
  Column, 
  Container, 
  Grid, 
  GridItem 
} from "./components/layout";
export type { 
  StackProps, 
  StackDirection, 
  FlexWrap,
  RowProps, 
  ColumnProps, 
  ResponsiveSize,
  ContainerProps,
  ContainerSize,
  GridProps,
  GridItemProps
} from "./components/layout";

// Export typography components
export { Text } from "./components/typography";
export type { TextProps } from "./components/typography";

// Export feedback components
export { Alert, Badge, Icon } from "./components/feedback";
export type { AlertProps, BadgeProps, IconProps, IconName } from "./components/feedback";

// Export form components
export { Input } from "./components/forms";
export type { InputProps, InputType } from "./components/forms";

// Export structure components
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
} from "./components/structure";
export type { 
  CardProps, 
  CardHeaderProps, 
  CardBodyProps, 
  CardFooterProps 
} from "./components/structure";

// Export design system
export * from "./design-system";
