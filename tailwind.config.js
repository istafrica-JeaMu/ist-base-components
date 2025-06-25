/** @type {import('tailwindcss').Config} */
module.exports = {
  important: '#app',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./examples/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    // Only include specific utilities that are actually used in the project
    // Basic color utilities
    'bg-primary', 'text-primary', 'border-primary', 'ring-primary',
    'bg-primary-dark', 'bg-primary-darker', 'text-primary-dark', 'border-primary-dark',
    'bg-secondary', 'text-secondary', 'border-secondary', 'ring-secondary',
    'bg-success', 'text-success', 'border-success', 'ring-success',
    'bg-warning', 'text-warning', 'border-warning', 'ring-warning',
    'bg-danger', 'text-danger', 'border-danger', 'ring-danger',
    'bg-hero', 'text-hero', 'border-hero', 'ring-hero',
    'bg-light', 'text-light', 'border-light',
    'bg-dark', 'text-dark', 'border-dark',
    'bg-accent', 'text-accent', 'border-accent', 'ring-accent',
    'bg-info', 'text-info', 'border-info', 'ring-info',
    'bg-info-light', 'text-info-light',
    'text-text', 'text-muted', 'border-border',
    
    // State variants - only the ones actually used
    'hover:bg-primary-dark', 'hover:bg-primary-darker', 'hover:text-primary',
    'hover:bg-secondary', 'hover:text-secondary',
    'hover:bg-success', 'hover:text-success',
    'hover:bg-warning', 'hover:text-warning',
    'hover:bg-danger', 'hover:text-danger',
    'hover:bg-hero', 'hover:text-hero',
    'hover:bg-light', 'hover:text-light', 'hover:bg-light/50',
    'hover:bg-dark', 'hover:text-dark',
    'hover:bg-accent', 'hover:text-accent', 'hover:bg-accent/5', 'hover:bg-accent/20',
    'hover:border-accent', 'hover:border-accent/20',
    'hover:brightness-95', 'hover:brightness-90',
    'hover:shadow-sm', 'hover:shadow-md', 'hover:shadow-lg', 'hover:shadow-xl',
    'hover:scale-105',
    
    // Focus states - only the ones actually used
    'focus:bg-primary', 'focus:border-primary', 'focus:ring-primary',
    'focus:bg-secondary', 'focus:border-secondary', 'focus:ring-secondary',
    'focus:bg-success', 'focus:border-success', 'focus:ring-success',
    'focus:bg-warning', 'focus:border-warning', 'focus:ring-warning',
    'focus:bg-danger', 'focus:border-danger', 'focus:ring-danger',
    'focus:bg-accent', 'focus:border-accent', 'focus:ring-accent',
    'focus:outline-none', 'focus:ring-2',
    'focus-visible:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-accent',
    'focus-visible:ring-primary', 'focus-visible:ring-secondary', 'focus-visible:ring-success',
    'focus-visible:ring-warning', 'focus-visible:ring-danger',
    
    // Active and disabled states
    'active:bg-primary-darker', 'active:bg-border', 'active:brightness-90',
    'disabled:text-muted', 'disabled:bg-light/30', 'disabled:cursor-not-allowed',
    'disabled:bg-primary/50', 'disabled:bg-secondary/50', 'disabled:bg-success/50',
    'disabled:bg-warning/50', 'disabled:bg-danger/50',
    
    // Opacity variants
    'bg-primary/50', 'bg-primary/90', 'text-primary/80',
    'bg-secondary/50', 'bg-secondary/90', 'text-secondary/80',
    'bg-success/50', 'bg-success/90', 'text-success/80',
    'bg-warning/50', 'bg-warning/90', 'text-warning/80',
    'bg-danger/50', 'bg-danger/90', 'text-danger/80',
    'bg-hero/70', 'bg-hero/90', 'text-hero/80',
    'bg-light/30', 'bg-light/50', 'bg-light/60',
    'bg-dark/80', 'bg-dark/60', 'text-dark/80', 'text-dark/60',
    'bg-accent/5', 'bg-accent/10', 'bg-accent/20', 'text-accent/80',
    'border-accent/20', 'ring-primary/20', 'ring-secondary/20', 'ring-success/20',
    'ring-warning/20', 'ring-danger/20', 'ring-accent/50',
    
    // Message colors
    'bg-message-success-light', 'text-message-success-dark', 'border-message-success-border',
    'bg-message-info-light', 'text-message-info-dark', 'border-message-info-border',
    'bg-message-warning-light', 'text-message-warning-dark', 'border-message-warning-border',
    'bg-message-danger-light', 'text-message-danger-dark', 'border-message-danger-border',
    
    // Component dimensions
    'h-input', 'h-header', 'h-6', 'h-7', 'h-8', 'h-10', 'h-12', 'h-16', 'h-full', 'min-h-[100px]',
    'w-6', 'w-7', 'w-8', 'w-full', 'w-[64px]', 'w-70',
    
    // Spacing utilities
    'py-[7px]', 'py-[14px]', 'px-[10.5px]', 'mt-[7px]', 'mr-1.5', 'gap-2.5',
    'space-y-0.5', 'space-y-3', 'space-y-6',
    
    // Typography utilities
    'text-[10px]', 'text-[23px]', 'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl',
    'font-medium', 'font-semibold', 'font-bold',
    
    // Layout utilities
    'flex', 'inline-flex', 'items-center', 'justify-center', 'justify-between', 'justify-end',
    'space-x-1', 'space-x-2', 'space-x-3', 'gap-1', 'gap-2', 'gap-3', 'gap-4',
    
    // Border utilities
    'border', 'border-2', 'border-l-4', 'border-b-2', 'border-r-2', 'border-b-0', 'border-t-0',
    'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-full', 'rounded-t-xl', 'rounded-b-xl',
    
    // Shadow utilities
    'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-dialog',
    'shadow-[0_4px_8px_0_rgba(1,8,4,0.04)]',
    
    // Position utilities
    'absolute', 'relative', 'fixed', 'top-1/2', 'right-3', '-right-3', '-translate-y-1/2', '-translate-x-1/2',
    '!absolute', '!top-2.5', '!right-2.5',
    
    // Background utilities
    'bg-white', 'bg-gray-50', 'bg-transparent', '!bg-transparent',
    
    // Border utilities with important
    '!border-none', '!border-t-0', '!p-0',
    'border-transparent',
    
    // Animation utilities
    'animate-spin', 'transition-all', 'transition-colors', 'transition-transform',
    'duration-200', 'duration-300', 'ease-in', 'ease-out', 'ease-in-out',
    
    // Cursor utilities
    'cursor-pointer', 'cursor-not-allowed', 'cursor-wait',
    
    // Overflow utilities
    'overflow-hidden', 'overflow-auto', 'overflow-y-auto',
    
    // Opacity utilities
    'opacity-50', 'opacity-0',
    
    // Z-index utilities
    'z-50',
    
    // Miscellaneous utilities
    'leading-relaxed', 'leading-tight', 'resize-y'
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        // Design system colors from repository rules
        primary: '#667eea',
        'primary-dark': '#5a67d8',
        'primary-darker': '#4c51bf',
        secondary: '#6c757d',
        success: '#28a745',
        warning: '#ffc107',
        danger: '#dc3545',
        info: '#0369a1', // For info text and icons
        'info-light': '#E0F2FE', // For info background
        hero: '#4E33D9',
        light: '#f8f9fa',
        dark: '#212529',
        border: '#e9ecef',
        text: '#495057',
        muted: '#6c757d',
        accent: '#FCD34D',
        'input': '#E5E7EB',
        'hero': '#4F46E5',
        'message': {
          'body': '#334155',
          'success-light': '#F0FDF4',
          'success-dark': '#16A34A',
          'success-border': '#86EFAC',
          'info-light': '#F0F9FF',
          'info-dark': '#0284C7',
          'info-border': '#7DD3FC',
          'warning-light': '#FFFBEB',
          'warning-dark': '#D97706',
          'warning-border': '#FDBA74',
          'danger-light': '#FEF2F2',
          'danger-dark': '#DC2626',
          'danger-border': '#FCA5A5',
        }
      },
      spacing: {
        // Spacing system from repository rules
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
      },
      borderRadius: {
        // Border radius system from repository rules
        '4': '4px',
        '6': '6px',
        '8': '8px',
        'lg': 'var(--border-radius)',
      },
      fontSize: {
        // Font size system from repository rules
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
      },
      boxShadow: {
        // Shadow system from repository rules
        sm: '0 1px 2px 0 rgba(18, 18, 23, 0.05)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'xl': '0 4px 12px rgba(0, 0, 0, 0.15)',
        '2xl': '0 8px 25px rgba(0, 0, 0, 0.15)',
        dialog:
          '0 8px 10px -6px rgba(0,0,0,0.1), 0 20px 25px -5px rgba(0,0,0,0.1)',
      },
      transitionDuration: {
        // Transition system from repository rules
        '200': '0.2s',
        '300': '0.3s',
      },
      height: {
        // Component dimensions from repository rules
        'header': '64px',
        'input': '34px',
        'button-sm': '32px',
        'button-normal': '40px',
        'button-large': '48px',
      },
      width: {
        'sidemenu-expanded': '280px',
        'sidemenu-collapsed': '64px',
        'input': '34px',
      },
      gridTemplateColumns: {
        // Grid columns for side menu layout
        'sidemenu-expanded': '280px 1fr',
        'sidemenu-collapsed': '64px 1fr',
      },
      screens: {
        // Responsive breakpoints from repository rules
        'sm': '576px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [],
} 