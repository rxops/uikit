import { component$, Slot } from '@builder.io/qwik';
import type { Spacing, Alignment, Justify } from '../../design-system/types';
import { mergeClasses, type BaseComponentProps } from '../../design-system/utils';

export interface RowProps extends BaseComponentProps {
  /** Gap between items using design system spacing tokens */
  gap?: Spacing;
  /** Cross-axis alignment (vertical alignment) */
  alignItems?: Alignment;
  /** Main-axis alignment (horizontal alignment) */
  justifyContent?: Justify;
  /** Whether items should wrap to next line */
  wrap?: boolean;
}

const gapClasses: Record<Spacing, string> = {
  "0": 'gap-0',
  "1": 'gap-1',
  "2": 'gap-2',
  "3": 'gap-3',
  "4": 'gap-4',
  "6": 'gap-6',
  "8": 'gap-8',
  "12": 'gap-12',
  "16": 'gap-16',
  "20": 'gap-20',
  "24": 'gap-24',
};

const alignClasses: Record<Alignment, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyClasses: Record<Justify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

/**
 * Row component for horizontal layout of child elements.
 * Uses tokenized spacing, alignment, and justify types from the design system.
 * 
 * @example
 * ```tsx
 * <Row gap="4" alignItems="center" justifyContent="between">
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 * </Row>
 * ```
 */
export const Row = component$<RowProps>((props) => {
  const {
    gap = "4",
    alignItems = "center",
    justifyContent = "start",
    wrap = false,
    class: qwikClass,
    className,
    style,
    ...rest
  } = props;

  const classes = mergeClasses(
    'flex flex-row',
    gapClasses[gap],
    alignClasses[alignItems],
    justifyClasses[justifyContent],
    wrap ? 'flex-wrap' : 'flex-nowrap',
    qwikClass,
    className
  );

  return (
    <div class={classes} style={style} {...rest}>
      <Slot />
    </div>
  );
});
