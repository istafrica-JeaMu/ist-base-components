import type { Meta, StoryObj } from '@storybook/vue3'
import BaseButton from './BaseButton.vue'

const meta: Meta<typeof BaseButton> = {
  title: 'Components/BaseButton',
  component: BaseButton,
  parameters: {
    docs: {
      description: {
        component: `
# BaseButton

A versatile and customizable button component for primary, secondary, and other actions.

## Rationale
This component is a custom implementation built with a native \`<button>\` element rather than extending PrimeVue's \`Button\`. According to our "Build vs. Extend Decision Framework," this was a conscious choice because the styling complexity and the need for pixel-perfect control over variants, sizes, and loading states outweighed the low functional complexity of a button.

## Features
- Multiple variants (default, primary, secondary, success, warning, danger, hero)
- Three sizes (small, normal, large)
- Loading states with spinner animation
- Icon support (left and right)
- Badge support
- Full accessibility compliance
- Keyboard navigation support
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'hero'],
      description: 'The stylistic variant of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'normal', 'large'],
      description: 'The size of the button',
    },
    label: {
      control: 'text',
      description: 'The text to display inside the button',
    },
    leftIcon: {
      control: 'text',
      description: 'PrimeVue icon class for left icon',
    },
    rightIcon: {
      control: 'text',
      description: 'PrimeVue icon class for right icon',
    },
    badge: {
      control: 'text',
      description: 'Badge to display on the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner',
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA label for accessibility',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    label: 'Button',
    variant: 'default',
    size: 'normal',
  },
}

// All variants
export const AllVariants: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="flex flex-wrap gap-4 p-4">
        <BaseButton label="Default" variant="default" />
        <BaseButton label="Primary" variant="primary" />
        <BaseButton label="Secondary" variant="secondary" />
        <BaseButton label="Success" variant="success" />
        <BaseButton label="Warning" variant="warning" />
        <BaseButton label="Danger" variant="danger" />
        <BaseButton label="Hero" variant="hero" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants with their semantic colors.',
      },
    },
  },
}

// All sizes
export const AllSizes: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="flex items-center gap-4 p-4">
        <BaseButton label="Small" variant="primary" size="small" />
        <BaseButton label="Normal" variant="primary" size="normal" />
        <BaseButton label="Large" variant="primary" size="large" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'All available button sizes: small, normal, and large.',
      },
    },
  },
}

// With icons
export const WithIcons: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="flex flex-wrap gap-4 p-4">
        <BaseButton label="Left Icon" variant="primary" leftIcon="pi pi-home" />
        <BaseButton label="Right Icon" variant="primary" rightIcon="pi pi-arrow-right" />
        <BaseButton label="Both Icons" variant="primary" leftIcon="pi pi-home" rightIcon="pi pi-arrow-right" />
        <BaseButton variant="primary" leftIcon="pi pi-plus" ariaLabel="Add new item" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with left icons, right icons, both icons, or icon-only buttons.',
      },
    },
  },
}

// With badges
export const WithBadges: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="flex flex-wrap gap-4 p-4">
        <BaseButton label="Messages" variant="primary" badge="3" />
        <BaseButton label="Notifications" variant="secondary" badge="12" />
        <BaseButton label="Cart" variant="success" leftIcon="pi pi-shopping-cart" badge="5" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with badges for notifications or counts.',
      },
    },
  },
}

// Loading states
export const LoadingStates: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="flex flex-wrap gap-4 p-4">
        <BaseButton label="Normal" variant="primary" />
        <BaseButton label="Loading" variant="primary" :loading="true" />
        <BaseButton label="Disabled" variant="primary" :disabled="true" />
        <BaseButton label="Loading Small" variant="primary" size="small" :loading="true" />
        <BaseButton label="Loading Large" variant="primary" size="large" :loading="true" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Buttons in different states: normal, loading, and disabled.',
      },
    },
  },
}

// Interactive example
export const Interactive: Story = {
  args: {
    label: 'Click me',
    variant: 'primary',
    size: 'normal',
    disabled: false,
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive button example. Try changing the controls to see different states.',
      },
    },
  },
}

// Accessibility example
export const Accessibility: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="space-y-4 p-4">
        <div>
          <h3 class="text-lg font-semibold mb-2">Keyboard Navigation</h3>
          <p class="text-sm text-muted mb-4">Use Tab to navigate, Enter or Space to activate</p>
          <div class="flex gap-4">
            <BaseButton label="First" variant="primary" />
            <BaseButton label="Second" variant="secondary" />
            <BaseButton label="Third" variant="success" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-2">ARIA Labels</h3>
          <div class="flex gap-4">
            <BaseButton leftIcon="pi pi-plus" ariaLabel="Add new item" variant="primary" />
            <BaseButton leftIcon="pi pi-edit" ariaLabel="Edit selected item" variant="secondary" />
            <BaseButton leftIcon="pi pi-trash" ariaLabel="Delete selected item" variant="danger" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-2">Loading States</h3>
          <p class="text-sm text-muted mb-4">Screen readers will announce "busy" state</p>
          <div class="flex gap-4">
            <BaseButton label="Saving..." variant="primary" :loading="true" />
            <BaseButton label="Processing..." variant="secondary" :loading="true" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features including keyboard navigation, ARIA labels, and screen reader support.',
      },
    },
  },
} 