import { component$, Slot, $, type QRL } from "@builder.io/qwik";
import type { BaseProps, Color, ComponentSize } from "../../design-system/types";
import { mergeClasses } from "../../design-system/utils";

export interface BadgeProps extends BaseProps {
  /** Badge color */
  color?: Color;
  /** Badge size */
  size?: ComponentSize;
  /** Visual variant */
  variant?: "filled" | "outlined" | "soft";
  /** Whether badge is pill-shaped */
  pill?: boolean;
  /** Click handler for interactive badges */
  onClick$?: QRL<(event: MouseEvent) => void>;
}

const colorClasses: Record<Color, Record<string, string>> = {
  primary: {
    filled: "text-white",
    outlined: "bg-white border",
    soft: "bg-opacity-10"
  },
  secondary: {
    filled: "text-white",
    outlined: "bg-white border", 
    soft: "bg-opacity-10"
  },
  success: {
    filled: "text-white",
    outlined: "bg-white border",
    soft: "bg-opacity-10"
  },
  caution: {
    filled: "text-white",
    outlined: "bg-white border",
    soft: "bg-opacity-10"
  },
  danger: {
    filled: "text-white",
    outlined: "bg-white border",
    soft: "bg-opacity-10"
  },
  info: {
    filled: "text-white",
    outlined: "bg-white border",
    soft: "bg-opacity-10"
  }
};

// Size styles are now handled via CSS custom properties in sizeStyle()
// Border radius is automatically handled by --size-{size}-border-radius

export const Badge = component$<BadgeProps>((props) => {
  const {
    color = "primary",
    size = "sm",
    variant = "soft",
    pill = false,
    onClick$,
    class: qwikClass,
    className,
    style,
    ...rest
  } = props;

  // Size style function using consistent design tokens
  const sizeStyle = () => {
    return {
      paddingLeft: `var(--size-${size}-padding-x)`,
      paddingRight: `var(--size-${size}-padding-x)`,
      paddingTop: `var(--size-${size}-padding-y)`,
      paddingBottom: `var(--size-${size}-padding-y)`,
      fontSize: `var(--size-${size}-text)`,
      borderRadius: pill ? '9999px' : `var(--size-${size}-border-radius)`,
    };
  };

  const handleKeyDown = $((event: KeyboardEvent) => {
    if (!onClick$) return;
    
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const syntheticEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      });
      onClick$(syntheticEvent);
    }
  });

  const handleClick = $((event: MouseEvent) => {
    if (onClick$) {
      onClick$(event);
    }
  });

  const isInteractive = !!onClick$;
  
  // Create inline styles using CSS custom properties for colors
  const colorStyle = () => {
    if (variant === 'filled') {
      // Special handling for secondary color to use darker variant
      if (color === 'secondary') {
        return {
          backgroundColor: `var(--color-secondary-darker)`,
          color: 'white',
          borderColor: `var(--color-secondary-darker)`
        };
      }
      return {
        backgroundColor: `var(--color-${color})`,
        color: 'white',
        borderColor: `var(--color-${color})`
      };
    } else if (variant === 'outlined') {
      // Special handling for secondary color to use darker variant
      if (color === 'secondary') {
        return {
          backgroundColor: 'white',
          color: `var(--color-secondary-darker)`,
          borderColor: `var(--color-secondary-darker)`
        };
      }
      return {
        backgroundColor: 'white',
        color: `var(--color-${color})`,
        borderColor: `var(--color-${color})`
      };
    } else { // soft
      // Special handling for secondary color to use darker variant
      if (color === 'secondary') {
        return {
          backgroundColor: `var(--color-secondary-light)`,
          color: `#374151` // Use a very dark gray for maximum contrast
        };
      }
      return {
        backgroundColor: `var(--color-${color}-lighter)`,
        color: `var(--color-${color})`
      };
    }
  };
  
  const badgeClasses = mergeClasses(
    "inline-flex items-center font-medium select-none",
    colorClasses[color][variant],
    variant === 'outlined' ? "border" : "",
    isInteractive && [
      "cursor-pointer transition-all duration-200",
      "hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
    ],
    qwikClass,
    className
  );

  const combinedStyle = {
    ...sizeStyle(),
    ...colorStyle(),
    ...(typeof style === 'string' ? {} : style)
  };

  return (
    <span 
      class={badgeClasses}
      style={combinedStyle}
      tabIndex={isInteractive ? 0 : undefined}
      role={isInteractive ? "button" : undefined}
      onClick$={isInteractive ? handleClick : undefined}
      onKeyDown$={isInteractive ? handleKeyDown : undefined}
      {...rest}
    >
      <Slot />
    </span>
  );
});
