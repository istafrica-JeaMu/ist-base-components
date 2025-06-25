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

@events
- `click` (MouseEvent): Emitted when the button is clicked.

@slots
- `default`: The main content of the button, overrides the `label` prop.

@usage
<BaseButton variant="primary" @click="handleClick">
  Click Me
</BaseButton>
-->
  <template>
    <button 
      :disabled="disabled || loading" 
      :class="buttonClass" 
      :aria-label="ariaLabel || label || 'Button'"
      :aria-busy="loading"
      data-testid="base-button"
      @click="handleClick"
    >
    <i v-if="loading" class="absolute pi pi-spinner animate-spin text-lg"></i>
    <span class="inline-flex items-center justify-center" :class="{ 'opacity-0': loading }">
      <i v-if="leftIcon" :class="[leftIcon, 'text-base', { 'mr-2': $slots.default || badge || label }]"></i>
      <span v-if="$slots.default" class="flex-grow-0">
        <slot></slot>
      </span>
      <span v-else-if="label" class="flex-grow-0">
        {{ label }}
      </span>
      <BaseBadge
        v-if="badge"
        :value="badge"
        size="large"
        severity="danger"
        class="ml-2"
      />
      <i v-if="rightIcon" :class="[rightIcon, 'text-base', { 'ml-2': $slots.default || badge || label }]"></i>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseBadge from './BaseBadge.vue'

export interface BaseButtonProps {
  label?: string
  leftIcon?: string
  rightIcon?: string
  badge?: string | number
  size?: 'small' | 'normal' | 'large'
  disabled?: boolean
  loading?: boolean
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'hero'
  /** ARIA label for accessibility */
  ariaLabel?: string
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  size: 'normal',
  disabled: false,
  loading: false,
  variant: 'primary'
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const buttonClass = computed(() => {
  const baseClasses = 'relative inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200'
  
  const variantClasses = {
    default: 'bg-white text-text border-border border hover:bg-light/50 active:bg-border disabled:bg-light/30 disabled:text-muted disabled:cursor-not-allowed',
    primary: 'bg-primary text-white border-primary border hover:bg-primary-dark active:bg-primary-darker disabled:bg-primary/50 disabled:cursor-not-allowed',
    secondary: 'bg-secondary text-white border-secondary border hover:brightness-95 active:brightness-90 disabled:bg-secondary/50 disabled:cursor-not-allowed',
    success: 'bg-success text-white border-success border hover:brightness-95 active:brightness-90 disabled:bg-success/50 disabled:cursor-not-allowed',
    warning: 'bg-warning text-dark border-warning border hover:brightness-95 active:brightness-90 disabled:bg-warning/50 disabled:cursor-not-allowed',
    danger: 'bg-danger text-white border-danger border hover:brightness-95 active:brightness-90 disabled:bg-danger/50 disabled:cursor-not-allowed',
    hero: 'bg-hero text-white border-hero hover:bg-hero/90 disabled:bg-hero/70',
  }
  
  const sizeClasses = {
    small: 'h-8 px-3 text-sm rounded-md',
    normal: 'h-input px-3 text-sm rounded-lg',
    large: 'h-12 px-5 text-lg rounded-lg',
  }
  
  return [
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size]
  ].join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
/* Minimal custom styles - using Tailwind for most styling */
</style> 