import { component$, useSignal, $ } from '@builder.io/qwik';
import { mergeClasses } from '../../design-system';
import type { BaseProps } from '../../design-system';

export interface ThemeToggleProps extends BaseProps {
  /** Initial theme state */
  defaultTheme?: 'light' | 'dark';
  /** Callback when theme changes */
  onThemeChange$?: (theme: 'light' | 'dark') => void;
}

/**
 * ThemeToggle - Healthcare-optimized theme switcher
 * 
 * Features:
 * - Accessibility optimized for medical environments
 * - High contrast support for clinical settings
 * - ARIA labels for screen readers
 * - Keyboard navigation support
 */
export const ThemeToggle = component$<ThemeToggleProps>((props) => {
  const isDark = useSignal(props.defaultTheme === 'dark');

  const toggleTheme = $(() => {
    isDark.value = !isDark.value;
    const newTheme = isDark.value ? 'dark' : 'light';
    
    // Update DOM
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDark.value);
      localStorage.setItem('theme', newTheme);
    }
    
    // Call callback if provided
    if (props.onThemeChange$) {
      props.onThemeChange$(newTheme);
    }
  });

  const baseClasses = [
    // Base button styling
    'inline-flex items-center justify-center rounded-md text-sm font-medium',
    'ring-offset-background transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    
    // Healthcare-specific styling
    'h-10 w-10 border border-input bg-background',
    'hover:bg-accent hover:text-accent-foreground',
    
    // High contrast support for medical devices
    'contrast-more:border-2 contrast-more:border-foreground',
    
    // Touch-friendly for mobile medical devices
    'touch-manipulation min-touch-44'
  ];

  const classes = mergeClasses(baseClasses, props.class);

  return (
    <button
      onClick$={toggleTheme}
      class={classes}
      type="button"
      aria-label={`Switch to ${isDark.value ? 'light' : 'dark'} theme`}
      aria-pressed={isDark.value}
      data-theme-toggle
    >
      {isDark.value ? (
        // Sun icon for switching to light mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      ) : (
        // Moon icon for switching to dark mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
});
