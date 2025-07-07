import { component$, Slot } from "@builder.io/qwik";
import type { BaseProps, Spacing, Alignment, Justify } from "../../design-system/types";
import { mergeClasses } from "../../design-system/utils";

export interface GridProps extends BaseProps {
  /** Number of columns (responsive object or single value) */
  cols?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  
  /** Number of rows */
  rows?: number | 'auto' | 'min-content' | 'max-content';
  
  /** Gap between grid items */
  gap?: Spacing;
  
  /** Gap between columns only */
  gapX?: Spacing;
  
  /** Gap between rows only */
  gapY?: Spacing;
  
  /** Align items within grid cells */
  alignItems?: Alignment;
  
  /** Justify items within grid cells */
  justifyItems?: Alignment;
  
  /** Align content of the grid */
  alignContent?: Alignment;
  
  /** Justify content of the grid */
  justifyContent?: Justify;
  
  /** Auto-sizing behavior for columns */
  autoFlow?: 'row' | 'col' | 'row-dense' | 'col-dense';
  
  /** Medical device keyboard navigation support */
  medicalDeviceMode?: boolean;
  
  /** Healthcare grid context */
  gridContext?: 'dashboard' | 'vital-signs' | 'patient-list' | 'data-display' | 'default';
}

export interface GridItemProps extends BaseProps {
  /** Column span */
  colSpan?: number | 'auto' | 'full';
  
  /** Row span */
  rowSpan?: number | 'auto' | 'full';
  
  /** Column start position */
  colStart?: number | 'auto';
  
  /** Column end position */
  colEnd?: number | 'auto';
  
  /** Row start position */
  rowStart?: number | 'auto';
  
  /** Row end position */
  rowEnd?: number | 'auto';
  
  /** Align this item within its grid cell */
  alignSelf?: Alignment;
  
  /** Justify this item within its grid cell */
  justifySelf?: Alignment;
}

// Column classes for responsive grid
const colClasses: Record<number | string, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2", 
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
  'auto-fit': "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
  'auto-fill': "grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"
};

// Responsive column classes
const responsiveColClasses = (cols: { sm?: number; md?: number; lg?: number; xl?: number }): string[] => {
  const classes: string[] = [];
  
  if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
  if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
  if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
  if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
  
  return classes;
};

// Gap classes
const gapClasses: Record<Spacing, string> = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2", 
  "3": "gap-3",
  "4": "gap-4",
  "6": "gap-6",
  "8": "gap-8",
  "12": "gap-12",
  "16": "gap-16",
  "20": "gap-20",
  "24": "gap-24"
};

const gapXClasses: Record<Spacing, string> = {
  "0": "gap-x-0",
  "1": "gap-x-1",
  "2": "gap-x-2",
  "3": "gap-x-3", 
  "4": "gap-x-4",
  "6": "gap-x-6",
  "8": "gap-x-8",
  "12": "gap-x-12",
  "16": "gap-x-16",
  "20": "gap-x-20",
  "24": "gap-x-24"
};

const gapYClasses: Record<Spacing, string> = {
  "0": "gap-y-0",
  "1": "gap-y-1",
  "2": "gap-y-2",
  "3": "gap-y-3",
  "4": "gap-y-4", 
  "6": "gap-y-6",
  "8": "gap-y-8",
  "12": "gap-y-12",
  "16": "gap-y-16",
  "20": "gap-y-20",
  "24": "gap-y-24"
};

// Alignment classes
const alignItemsClasses: Record<Alignment, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline"
};

const justifyItemsClasses: Record<Alignment, string> = {
  start: "justify-items-start",
  center: "justify-items-center", 
  end: "justify-items-end",
  stretch: "justify-items-stretch",
  baseline: "justify-items-baseline"
};

const alignContentClasses: Record<Alignment, string> = {
  start: "content-start",
  center: "content-center",
  end: "content-end",
  stretch: "content-stretch",
  baseline: "content-baseline"
};

const justifyContentClasses: Record<Justify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly"
};

// Auto flow classes
const autoFlowClasses: Record<string, string> = {
  'row': "grid-flow-row",
  'col': "grid-flow-col",
  'row-dense': "grid-flow-row-dense",
  'col-dense': "grid-flow-col-dense"
};

// Grid item span classes
const colSpanClasses: Record<number | string, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
  'auto': "col-auto",
  'full': "col-span-full"
};

const rowSpanClasses: Record<number | string, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
  5: "row-span-5",
  6: "row-span-6",
  'auto': "row-auto",
  'full': "row-span-full"
};

/**
 * Grid Component - CSS Grid layout with responsive support
 * 
 * Features:
 * - Responsive column definitions
 * - Auto-sizing with auto-fit and auto-fill
 * - Comprehensive gap control
 * - Medical device keyboard navigation
 * - Healthcare-specific grid contexts
 */
export const Grid = component$<GridProps>((props) => {
  const {
    cols = 1,
    rows,
    gap,
    gapX,
    gapY,
    alignItems,
    justifyItems,
    alignContent,
    justifyContent,
    autoFlow = 'row',
    medicalDeviceMode = false,
    gridContext = 'default',
    class: qwikClass,
    className,
    style,
    ...rest
  } = props;

  // Build grid classes
  const gridClasses = mergeClasses(
    'grid',
    
    // Column configuration
    typeof cols === 'number' ? colClasses[cols] : responsiveColClasses(cols),
    
    // Row configuration
    typeof rows === 'number' && `grid-rows-${rows}`,
    rows === 'auto' && 'grid-rows-none',
    rows === 'min-content' && 'grid-rows-min',
    rows === 'max-content' && 'grid-rows-max',
    
    // Gap configuration (gap takes precedence over gapX/gapY)
    gap ? gapClasses[gap] : [
      gapX && gapXClasses[gapX],
      gapY && gapYClasses[gapY]
    ],
    
    // Alignment
    alignItems && alignItemsClasses[alignItems],
    justifyItems && justifyItemsClasses[justifyItems],
    alignContent && alignContentClasses[alignContent],
    justifyContent && justifyContentClasses[justifyContent],
    
    // Auto flow
    autoFlowClasses[autoFlow],
    
    // Medical device mode
    medicalDeviceMode && 'medical-device-grid',
    
    // Grid context
    gridContext !== 'default' && `grid-context-${gridContext}`,
    
    // Custom classes
    qwikClass,
    className
  );

  // Medical device attributes
  const enhancedProps = {
    'data-grid-context': gridContext,
    'data-medical-device': medicalDeviceMode,
    'role': 'grid',
    ...rest
  };

  return (
    <div 
      class={gridClasses} 
      style={style}
      {...enhancedProps}
    >
      <Slot />
    </div>
  );
});

/**
 * GridItem Component - Individual grid cell with positioning control
 */
export const GridItem = component$<GridItemProps>((props) => {
  const {
    colSpan,
    rowSpan,
    colStart,
    colEnd,
    rowStart,
    rowEnd,
    alignSelf,
    justifySelf,
    class: qwikClass,
    className,
    style,
    ...rest
  } = props;

  // Build grid item classes
  const itemClasses = mergeClasses(
    // Column spanning
    colSpan ? (colSpanClasses[colSpan as keyof typeof colSpanClasses] || '') : '',
    
    // Row spanning  
    rowSpan ? (rowSpanClasses[rowSpan as keyof typeof rowSpanClasses] || '') : '',
    
    // Column positioning
    colStart === 'auto' ? 'col-start-auto' : (colStart ? `col-start-${colStart}` : ''),
    colEnd === 'auto' ? 'col-end-auto' : (colEnd ? `col-end-${colEnd}` : ''),
    
    // Row positioning
    rowStart === 'auto' ? 'row-start-auto' : (rowStart ? `row-start-${rowStart}` : ''),
    rowEnd === 'auto' ? 'row-end-auto' : (rowEnd ? `row-end-${rowEnd}` : ''),
    
    // Self alignment
    alignSelf ? `self-${alignSelf}` : '',
    justifySelf ? `justify-self-${justifySelf}` : '',
    
    // Custom classes
    qwikClass || '',
    className || ''
  );

  return (
    <div 
      class={itemClasses} 
      style={style}
      role="gridcell"
      {...rest}
    >
      <Slot />
    </div>
  );
});
