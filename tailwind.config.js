/** @type {import('tailwindcss').Config} */
module.exports = {
  important: '#app',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./examples/**/*.{vue,js,ts,jsx,tsx}",
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