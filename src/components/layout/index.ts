/**
 * Layout Components
 * 
 * Foundational layout components for organizing content and building layouts.
 * All components use design system tokens for consistent spacing and alignment.
 */

// Core layout components
export { Container } from "./container";
export type { ContainerProps, ContainerSize } from "./container";

export { Grid, GridItem } from "./grid";
export type { GridProps, GridItemProps } from "./grid";

export { Stack } from "./stack";
export type { StackProps, StackDirection, FlexWrap } from "./stack";

export { Row } from "./row";
export type { RowProps } from "./row";

export { Column } from "./column";
export type { ColumnProps, ResponsiveSize } from "./column";

// Layout utilities
export { mergeClasses } from "../../design-system/utils";
export type { BaseProps } from "../../design-system/types";
