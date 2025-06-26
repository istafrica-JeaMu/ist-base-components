<!--
@component BaseButton
@description A versatile and customizable button component for primary, secondary, and other actions.

@rationale This component is a custom implementation built with a native `<button>` element rather than extending PrimeVue's `Button`. According to our "Build vs. Extend Decision Framework," this was a conscious choice because the styling complexity and the need for pixel-perfect control over variants, sizes, and loading states outweighed the low functional complexity of a button. This approach gives us maximum design flexibility with Tailwind CSS and avoids potential CSS specificity conflicts with PrimeVue's default styles.

@props
- `label` (string): The text to display inside the button.
- `leftIcon` (string): The PrimeVue icon class to display to the left of the label.
- `rightIcon` (string): The PrimeVue icon class to display to the right of the label.
- `badge` (string | number): A badge to display on the button, typically a number.
- `size` ('small' | 'normal' | 'large'): The size of the button.
- `disabled` (boolean): Disables the button and its click events.
- `loading` (boolean): Shows a loading spinner and disables the button.
- `variant` ('default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'hero'): The stylistic variant of the button.
- `ariaLabel` (string): The ARIA label for accessibility.
- `customClass` (string): Additional CSS classes for the button.
- `customStyle` (object): Inline styles for the button.

@events
- `click` (MouseEvent): Emitted when the button is clicked.
- `focus` (FocusEvent): Emitted when the button receives focus.
- `blur` (FocusEvent): Emitted when the button loses focus.

@slots
- `default`: The main content of the button, overrides the `label` prop.
- `prefix`: Content before the main element.
- `suffix`: Content after the main element.

@usage
<BaseButton variant="primary" @click="handleClick">
  Click Me
</BaseButton>
-->
<template>
  <button
    :class="buttonClasses"
    :disabled="(disabled || loading) || undefined"
    :aria-label="computedAriaLabel"
    :aria-busy="loading || undefined"
    data-testid="base-button"
    :style="customStyle"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
    type="button"
  >
    <!-- Loading spinner (absolute positioned) -->
    <i
      v-if="loading"
      class="absolute pi pi-spinner animate-spin text-lg"
      aria-hidden="true"
    />
    
    <!-- Prefix slot -->
    <slot name="prefix" />
    
    <!-- Left icon -->
    <i
      v-if="leftIcon && !loading"
      :class="[leftIcon, leftIconClasses]"
      aria-hidden="true"
    />
    
    <!-- Button content (hidden when loading) -->
    <span :class="{ 'opacity-0': loading }">
      <!-- Default slot or label -->
      <slot>{{ label }}</slot>
    </span>
    
    <!-- Right icon -->
    <i
      v-if="rightIcon && !loading"
      :class="[rightIcon, rightIconClasses]"
      aria-hidden="true"
    />
    
    <!-- Badge -->
    <BaseBadge
      v-if="badge && !loading"
      :value="badge"
      :class="badgeClasses"
      :aria-label="`${badge} notifications`"
    />
    
    <!-- Suffix slot -->
    <slot name="suffix" />
  </button>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import BaseBadge from './BaseBadge.vue'

// TypeScript interfaces
export interface BaseButtonProps {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'hero'
  size?: 'small' | 'normal' | 'large'
  label?: string
  leftIcon?: string
  rightIcon?: string
  badge?: string | number
  disabled?: boolean
  loading?: boolean
  ariaLabel?: string
  customClass?: string
  customStyle?: Record<string, string | number>
}

export interface BaseButtonEmits {
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}

export interface BaseButtonSlots {
  default?: () => any
  prefix?: () => any
  suffix?: () => any
}

// Props with defaults
const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'default',
  size: 'normal',
  label: '',
  leftIcon: '',
  rightIcon: '',
  badge: '',
  disabled: false,
  loading: false,
  ariaLabel: '',
  customClass: '',
  customStyle: () => ({})
})

// Emits
const emit = defineEmits<BaseButtonEmits>()

// Slots
const slots = useSlots()

// Computed classes for button variants
const variantClasses = computed(() => {
  const variants = {
    default: 'bg-white text-text border-border border hover:bg-light/50',
    primary: 'bg-primary text-white border-primary border hover:bg-primary-dark',
    secondary: 'bg-secondary text-white border-secondary border hover:brightness-95',
    success: 'bg-success text-white border-success border hover:brightness-95',
    warning: 'bg-warning text-dark border-warning border hover:brightness-95',
    danger: 'bg-danger text-white border-danger border hover:brightness-95',
    hero: 'bg-hero text-white border-transparent shadow-lg hover:shadow-xl hover:scale-105'
  }
  return variants[props.variant]
})

// Computed classes for button sizes
const sizeClasses = computed(() => {
  const sizes = {
    small: 'h-8 px-3 text-sm rounded-md',
    normal: 'h-input px-3 text-sm rounded-lg',
    large: 'h-12 px-5 text-lg rounded-lg'
  }
  return sizes[props.size]
})

// Computed classes for disabled/loading states
const stateClasses = computed(() => {
  if (props.disabled && !props.loading) {
    return 'opacity-50 disabled:cursor-not-allowed'
  }
  if (props.loading) {
    return 'cursor-wait'
  }
  return ''
})

// Main button classes
const buttonClasses = computed(() => [
  // Base classes
  'relative inline-flex items-center justify-center font-semibold',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
  'transition-all duration-200',
  // Variant classes
  variantClasses.value,
  // Size classes
  sizeClasses.value,
  // State classes
  stateClasses.value,
  // Custom classes
  props.customClass
])

// Icon classes
const leftIconClasses = computed(() => [
  'text-base',
  props.label || slots.default ? 'mr-2' : ''
])

const rightIconClasses = computed(() => [
  'text-base',
  props.label || slots.default ? 'ml-2' : ''
])

// Badge classes
const badgeClasses = computed(() => [
  'absolute -top-2 -right-2 min-w-[1.25rem] h-5 px-1.5',
  'bg-danger text-white text-xs font-semibold',
  'rounded-full flex items-center justify-center',
  'border-2 border-white'
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
  buttonClasses,
  variantClasses,
  sizeClasses,
  stateClasses
})

// Computed aria label
const computedAriaLabel = computed(() => {
  if (props.ariaLabel) {
    return props.ariaLabel
  }
  if (props.label) {
    return props.label
  }
  if (slots.default) {
    // For slots, we can't easily extract text content, so use a default
    return 'Button'
  }
  return 'Button'
})
</script>

<style scoped>
/* Animation for spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Focus ring enhancement for better accessibility */
.focus-visible\:ring-2:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

/* Ensure proper contrast for focus ring */
.focus-visible\:ring-accent:focus-visible {
  --tw-ring-color: #FCD34D;
}

/* Hero variant specific styles */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.from-primary {
  --tw-gradient-from: #667eea;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(102, 126, 234, 0));
}

.to-purple-600 {
  --tw-gradient-to: #9333ea;
}

/* Hover effects for hero variant */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style> 