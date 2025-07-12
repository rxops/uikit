import { component$, Slot } from '@builder.io/qwik';
import { mergeClasses } from '../../design-system';
import type { BaseProps } from '../../design-system';

export interface HeaderProps extends BaseProps {
  /** Header variant for different contexts */
  variant?: 'main' | 'compact' | 'emergency';
  /** Whether header has border */
  bordered?: boolean;
  /** Header background opacity */
  backdrop?: boolean;
}

/**
 * Header - Healthcare application header
 * 
 * Features:
 * - Responsive design for medical devices
 * - Emergency mode for critical situations
 * - HIPAA-compliant design considerations
 * - Accessibility optimized for healthcare workers
 */
export const Header = component$<HeaderProps>((props) => {
  const { variant = 'main', bordered = true, backdrop = true } = props;

  const baseClasses = [
    // Base header styling
    'w-full flex items-center justify-between',
    
    // Height variants
    variant === 'compact' ? 'h-12' : variant === 'emergency' ? 'h-16' : 'h-16',
    
    // Background and backdrop
    backdrop ? 'bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60' : 'bg-card',
    
    // Border
    bordered ? 'border-b border-border' : '',
    
    // Emergency styling
    variant === 'emergency' ? 'bg-destructive text-destructive-foreground' : '',
    
    // Accessibility
    'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'
  ];

  const classes = mergeClasses(baseClasses, props.class);

  return (
    <header 
      class={classes}
      role="banner"
      data-header-variant={variant}
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
        <Slot />
      </div>
    </header>
  );
});

export interface NavLinkProps extends BaseProps {
  /** Navigation link href */
  href: string;
  /** Whether link is active */
  active?: boolean;
  /** Link variant */
  variant?: 'default' | 'emergency' | 'subtle';
}

/**
 * NavLink - Healthcare navigation link
 */
export const NavLink = component$<NavLinkProps>((props) => {
  const { href, active = false, variant = 'default' } = props;

  const baseClasses = [
    // Base link styling
    'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md',
    'transition-colors duration-200',
    
    // Accessibility
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    
    // Active state
    active 
      ? 'bg-accent text-accent-foreground' 
      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
    
    // Variant styling
    variant === 'emergency' 
      ? 'text-destructive hover:text-destructive hover:bg-destructive/10'
      : variant === 'subtle'
      ? 'text-muted-foreground/70 hover:text-muted-foreground'
      : '',
    
    // Healthcare-specific touches
    'touch-manipulation min-touch-44'
  ];

  const classes = mergeClasses(baseClasses, props.class);

  return (
    <a 
      href={href} 
      class={classes}
      aria-current={active ? 'page' : undefined}
    >
      <Slot />
    </a>
  );
});

export interface NavigationProps extends BaseProps {
  /** Navigation items */
  items?: Array<{
    href: string;
    label: string;
    active?: boolean;
    variant?: 'default' | 'emergency' | 'subtle';
  }>;
  /** Navigation layout */
  layout?: 'horizontal' | 'vertical';
}

/**
 * Navigation - Healthcare application navigation
 */
export const Navigation = component$<NavigationProps>((props) => {
  const { items = [], layout = 'horizontal' } = props;

  const baseClasses = [
    // Base navigation styling
    'flex items-center',
    
    // Layout
    layout === 'vertical' ? 'flex-col space-y-1' : 'space-x-1',
    
    // Accessibility
    'focus-within:ring-2 focus-within:ring-ring'
  ];

  const classes = mergeClasses(baseClasses, props.class);

  return (
    <nav 
      class={classes}
      role="navigation"
      aria-label="Main navigation"
    >
      {items.map((item, index) => (
        <NavLink
          key={`nav-item-${index}`}
          href={item.href}
          active={item.active}
          variant={item.variant}
        >
          {item.label}
        </NavLink>
      ))}
      <Slot />
    </nav>
  );
});
