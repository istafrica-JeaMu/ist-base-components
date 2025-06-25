#!/usr/bin/env node

/**
 * Component Generation Script
 * Generates new components following cursorrules architecture standards
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const COMPONENTS_DIR = path.join(__dirname, '../src/components')
const TESTS_DIR = path.join(__dirname, '../tests/components')
const STORIES_DIR = path.join(__dirname, '../src/components')

function generateComponent(name, options = {}) {
  const componentName = name.startsWith('Base') ? name : `Base${name}`
  const fileName = `${componentName}.vue`
  const testFileName = `${componentName}.test.ts`
  const storyFileName = `${componentName}.stories.ts`
  
  const {
    description = `A ${name.toLowerCase()} component`,
    hasIcon = false,
    hasSlots = true,
    customProps = []
  } = options

  // Component template
  const componentTemplate = `<!-- Component description -->
<!-- ${componentName}: ${description} -->
<!-- Rationale: Custom implementation following cursorrules architecture standards -->

<!-- Props: -->
<!-- - variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' -->
<!-- - size: 'small' | 'normal' | 'large' -->
<!-- - disabled: boolean -->
<!-- - loading: boolean -->
<!-- - customClass: string (additional CSS classes) -->
<!-- - customStyle: object (inline styles) -->
${customProps.map(prop => `<!-- - ${prop.name}: ${prop.type} (${prop.description}) -->`).join('\n')}

<!-- Events: -->
<!-- - click: fired when component is clicked -->
<!-- - focus: fired when component receives focus -->
<!-- - blur: fired when component loses focus -->

<!-- Slots: -->
${hasSlots ? `<!-- - default: main content -->
<!-- - prefix: content before main element -->
<!-- - suffix: content after main element -->` : '<!-- - default: main content -->'}

<!-- Usage: -->
<!-- <${componentName} variant="primary" size="normal" @click="handleClick" /> -->

<template>
  <div
    :class="componentClasses"
    :style="customStyle"
    :data-testid="\`${name.toLowerCase()}-\${variant}-\${size}\`"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    ${hasSlots ? `<!-- Prefix slot -->
    <slot name="prefix" />
    
    <!-- Loading spinner -->
    <i
      v-if="loading"
      class="pi pi-spinner animate-spin"
      aria-hidden="true"
    />
    
    <!-- Main content -->
    <div :class="{ 'opacity-50': loading }">
      <slot>{{ label }}</slot>
    </div>
    
    <!-- Suffix slot -->
    <slot name="suffix" />` : `<!-- Main content -->
    <slot>{{ label }}</slot>`}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// TypeScript interfaces
export interface ${componentName}Props {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'small' | 'normal' | 'large'
  label?: string
  disabled?: boolean
  loading?: boolean
  customClass?: string
  customStyle?: Record<string, string | number>
${customProps.map(prop => `  ${prop.name}?: ${prop.type}`).join('\n')}
}

export interface ${componentName}Emits {
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}

export interface ${componentName}Slots {
  default?: () => any
${hasSlots ? `  prefix?: () => any
  suffix?: () => any` : ''}
}

// Props with defaults
const props = withDefaults(defineProps<${componentName}Props>(), {
  variant: 'default',
  size: 'normal',
  label: '',
  disabled: false,
  loading: false,
  customClass: '',
  customStyle: () => ({})
})

// Emits
const emit = defineEmits<${componentName}Emits>()

// Computed classes
const variantClasses = computed(() => {
  const variants = {
    default: 'bg-white text-text border-border border',
    primary: 'bg-primary text-white border-primary',
    secondary: 'bg-secondary text-white border-secondary',
    success: 'bg-success text-white border-success',
    warning: 'bg-warning text-dark border-warning',
    danger: 'bg-danger text-white border-danger'
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    small: 'text-sm p-2',
    normal: 'text-base p-3',
    large: 'text-lg p-4'
  }
  return sizes[props.size]
})

const componentClasses = computed(() => [
  // Base classes
  'inline-flex items-center justify-center font-semibold',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
  'transition-all duration-200 rounded-lg',
  // Variant classes
  variantClasses.value,
  // Size classes
  sizeClasses.value,
  // State classes
  {
    'opacity-50 cursor-not-allowed': props.disabled,
    'cursor-wait': props.loading
  },
  // Custom classes
  props.customClass
])

// Event handlers
const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

const handleFocus = (event: FocusEvent) => {
  if (!props.disabled) {
    emit('focus', event)
  }
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

// Expose for testing
defineExpose({
  componentClasses,
  variantClasses,
  sizeClasses
})
</script>

<style scoped>
/* Component-specific styles using Tailwind utilities */
.focus-visible\\:ring-2:focus-visible {
  --tw-ring-color: #FCD34D;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>`

  // Test template
  const testTemplate = `import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ${componentName} from './${componentName}.vue'

describe('${componentName}', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      const wrapper = mount(${componentName})
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.attributes('data-testid')).toBe('${name.toLowerCase()}-default-normal')
    })

    it('should render with custom label', () => {
      const wrapper = mount(${componentName}, {
        props: { label: 'Test Label' }
      })
      expect(wrapper.text()).toContain('Test Label')
    })

    it('should render slot content', () => {
      const wrapper = mount(${componentName}, {
        slots: { default: 'Slot Content' }
      })
      expect(wrapper.text()).toContain('Slot Content')
    })
  })

  describe('Props', () => {
    it('should apply variant classes', () => {
      const wrapper = mount(${componentName}, {
        props: { variant: 'primary' }
      })
      expect(wrapper.classes()).toContain('bg-primary')
    })

    it('should apply size classes', () => {
      const wrapper = mount(${componentName}, {
        props: { size: 'large' }
      })
      expect(wrapper.classes()).toContain('text-lg')
    })

    it('should handle disabled state', () => {
      const wrapper = mount(${componentName}, {
        props: { disabled: true }
      })
      expect(wrapper.classes()).toContain('opacity-50')
      expect(wrapper.classes()).toContain('cursor-not-allowed')
    })

    it('should handle loading state', () => {
      const wrapper = mount(${componentName}, {
        props: { loading: true }
      })
      expect(wrapper.classes()).toContain('cursor-wait')
      expect(wrapper.find('.pi-spinner').exists()).toBe(true)
    })

    it('should apply custom classes', () => {
      const wrapper = mount(${componentName}, {
        props: { customClass: 'custom-class' }
      })
      expect(wrapper.classes()).toContain('custom-class')
    })
  })

  describe('Events', () => {
    it('should emit click event when clicked', async () => {
      const wrapper = mount(${componentName})
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('should not emit click when disabled', async () => {
      const wrapper = mount(${componentName}, {
        props: { disabled: true }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('should emit focus and blur events', async () => {
      const wrapper = mount(${componentName})
      await wrapper.trigger('focus')
      await wrapper.trigger('blur')
      expect(wrapper.emitted('focus')).toBeTruthy()
      expect(wrapper.emitted('blur')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should have proper data-testid', () => {
      const wrapper = mount(${componentName}, {
        props: { variant: 'primary', size: 'large' }
      })
      expect(wrapper.attributes('data-testid')).toBe('${name.toLowerCase()}-primary-large')
    })

    it('should handle focus properly', async () => {
      const wrapper = mount(${componentName})
      await wrapper.trigger('focus')
      expect(wrapper.emitted('focus')).toBeTruthy()
    })
  })
})`

  // Story template
  const storyTemplate = `import type { Meta, StoryObj } from '@storybook/vue3'
import ${componentName} from './${componentName}.vue'

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    docs: {
      description: {
        component: \`
# ${componentName}

${description}

## Features
- Multiple variants (default, primary, secondary, success, warning, danger)
- Three sizes (small, normal, large)
- Loading states
- Full accessibility compliance
- Keyboard navigation support
        \`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'The stylistic variant',
    },
    size: {
      control: 'select',
      options: ['small', 'normal', 'large'],
      description: 'The size',
    },
    label: {
      control: 'text',
      description: 'The text to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the component',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading state',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: '${componentName}',
    variant: 'default',
    size: 'normal',
  },
}

export const AllVariants: Story = {
  render: () => ({
    components: { ${componentName} },
    template: \`
      <div class="flex flex-wrap gap-4 p-4">
        <${componentName} label="Default" variant="default" />
        <${componentName} label="Primary" variant="primary" />
        <${componentName} label="Secondary" variant="secondary" />
        <${componentName} label="Success" variant="success" />
        <${componentName} label="Warning" variant="warning" />
        <${componentName} label="Danger" variant="danger" />
      </div>
    \`,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { ${componentName} },
    template: \`
      <div class="flex items-center gap-4 p-4">
        <${componentName} label="Small" variant="primary" size="small" />
        <${componentName} label="Normal" variant="primary" size="normal" />
        <${componentName} label="Large" variant="primary" size="large" />
      </div>
    \`,
  }),
}

export const LoadingStates: Story = {
  render: () => ({
    components: { ${componentName} },
    template: \`
      <div class="flex gap-4 p-4">
        <${componentName} label="Normal" variant="primary" />
        <${componentName} label="Loading" variant="primary" :loading="true" />
        <${componentName} label="Disabled" variant="primary" :disabled="true" />
      </div>
    \`,
  }),
}`

  // Write files
  const componentPath = path.join(COMPONENTS_DIR, fileName)
  const testPath = path.join(TESTS_DIR, testFileName)
  const storyPath = path.join(STORIES_DIR, storyFileName)

  try {
    // Check if component already exists
    if (fs.existsSync(componentPath)) {
      console.log(`❌ Component ${componentName} already exists!`)
      process.exit(1)
    }

    // Create directories if they don't exist
    fs.mkdirSync(COMPONENTS_DIR, { recursive: true })
    fs.mkdirSync(TESTS_DIR, { recursive: true })

    // Write component file
    fs.writeFileSync(componentPath, componentTemplate)
    console.log(`✅ Created component: ${componentPath}`)

    // Write test file
    fs.writeFileSync(testPath, testTemplate)
    console.log(`✅ Created test: ${testPath}`)

    // Write story file
    fs.writeFileSync(storyPath, storyTemplate)
    console.log(`✅ Created story: ${storyPath}`)

    console.log(`\n🎉 ${componentName} generated successfully!`)
    console.log('\nNext steps:')
    console.log('1. Update src/index.ts to export the new component')
    console.log('2. Run tests: npm run test')
    console.log('3. View in Storybook: npm run storybook')
    console.log('4. Validate component: npm run validate:components')

  } catch (error) {
    console.error('❌ Error generating component:', error.message)
    process.exit(1)
  }
}

// CLI interface
const args = process.argv.slice(2)
const componentName = args[0]

if (!componentName) {
  console.log('Usage: npm run generate:component <ComponentName>')
  console.log('Example: npm run generate:component Modal')
  process.exit(1)
}

// Parse additional options
const options = {}
if (args.includes('--no-slots')) {
  options.hasSlots = false
}
if (args.includes('--with-icon')) {
  options.hasIcon = true
}

generateComponent(componentName, options) 