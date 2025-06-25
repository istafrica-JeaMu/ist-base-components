/** @type {import('tailwindcss').Config} */
module.exports = {
  important: '#app',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./examples/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    // Pattern-based safelist to include all variants of custom colors
    { pattern: /^(bg|text|border|ring)-(primary|secondary|success|warning|danger|hero|light|dark|accent|info|muted)/ },
    { pattern: /^(bg|text|border)-(message|info-light|border)/ },
    { pattern: /^(hover|focus|active|disabled):(bg|text|border|ring)-(primary|secondary|success|warning|danger|hero|light|dark|accent|info|muted)/ },
    { pattern: /^(h|w|min-h|max-h|min-w|max-w)-(input|header|\d+|\[\d+px\])/ },
    { pattern: /^(p|px|py|m|mx|my|mt|mb|ml|mr|gap)-(1|2|3|4|5|6|8|\[[\d.]+px\])/ },
    { pattern: /^(text|font)-(xs|sm|base|lg|xl|medium|semibold|bold|\[\d+px\])/ },
    { pattern: /^(rounded|border)-(none|sm|md|lg|xl|full|t-xl|b-xl)/ },
    { pattern: /^(flex|items|justify|space)-(center|start|end|between|around|evenly|col|1|grow|shrink)/ },
    { pattern: /^(transition|duration|ease)-(all|colors|transform|200|300|in|out|in-out)/ },
    { pattern: /^(shadow|hover:shadow)-(sm|md|lg|xl|dialog)/ },
    { pattern: /^(focus|focus-visible):(outline|ring)-(none|2|accent)/ },
    { pattern: /^(cursor|overflow|opacity|z|resize|leading)-(pointer|not-allowed|hidden|auto|0|50|50|y|relaxed|tight)/ },
    // Specific utilities that need to be included
    'bg-primary', 'text-primary', 'border-primary', 'bg-primary-dark', 'bg-primary-darker',
    'bg-secondary', 'text-secondary', 'border-secondary',
    'bg-success', 'text-success', 'border-success',
    'bg-warning', 'text-warning', 'border-warning',
    'bg-danger', 'text-danger', 'border-danger',
    'bg-hero', 'text-hero', 'border-hero',
    'bg-light', 'text-light', 'border-light',
    'bg-dark', 'text-dark', 'border-dark',
    'bg-accent', 'text-accent', 'border-accent', 'ring-accent',
    'text-text', 'text-muted', 'border-border',
    'bg-info-light', 'text-info',
    // Message colors
    'bg-message-success-light', 'text-message-success-dark', 'border-message-success-border',
    'bg-message-info-light', 'text-message-info-dark', 'border-message-info-border',
    'bg-message-warning-light', 'text-message-warning-dark', 'border-message-warning-border',
    'bg-message-danger-light', 'text-message-danger-dark', 'border-message-danger-border',
    // Opacity variants
    'bg-primary/50', 'bg-primary/90', 'bg-secondary/50', 'bg-success/50', 'bg-warning/50', 'bg-danger/50',
    'bg-hero/70', 'bg-hero/90', 'bg-light/30', 'bg-light/50', 'bg-accent/5', 'bg-accent/10', 'bg-accent/20',
    'text-dark/80', 'text-dark/60', 'border-accent/20',
    // State variants
    'hover:bg-primary-dark', 'hover:bg-hero/90', 'hover:bg-light/50', 'hover:bg-accent/5', 'hover:border-accent/20', 'hover:text-primary', 'hover:text-dark',
    'focus:ring-primary/50', 'focus:ring-secondary/50', 'focus:ring-success/50', 'focus:ring-warning/50', 'focus:ring-danger/50',
    'focus:border-primary', 'focus:border-danger', 'focus:outline-none', 'focus:ring-2',
    'focus-visible:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-accent',
    'active:bg-primary-darker', 'active:bg-border', 'active:brightness-90',
    'disabled:text-muted', 'disabled:bg-light/30', 'disabled:cursor-not-allowed',
    // Component dimensions
    'h-input', 'h-header', 'h-6', 'h-7', 'h-8', 'h-10', 'h-12', 'h-16', 'h-full', 'min-h-[100px]',
    'w-6', 'w-7', 'w-8', 'w-full', 'w-[64px]', 'w-70',
    // Specific spacing
    'py-[7px]', 'py-[14px]', 'px-[10.5px]', 'mt-[7px]', 'mr-1.5', 'gap-2.5',
    // Complex utilities
    'shadow-[0_4px_8px_0_rgba(1,8,4,0.04)]', 'text-[10px]', 'text-[23px]',
    '!absolute', '!top-2.5', '!right-2.5', '!bg-transparent', '!border-none', '!border-t-0', '!p-0',
    '-right-3', 'top-1/2', '-translate-y-1/2', '-translate-x-1/2',
    'space-y-0.5', 'space-y-3', 'space-y-6',
    'hover:brightness-95', 'hover:shadow-md', 'hover:shadow-sm', 'hover:bg-black/10',
    'border-l-4', 'border-b-2', 'border-r-2', 'border-b-0',
    'animate-spin', 'bg-white', 'bg-gray-50', 'border-transparent'
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