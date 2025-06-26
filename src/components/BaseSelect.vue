<!--
@component BaseSelect
@description A professional single-select dropdown component with custom styling that matches the side menu font properties exactly, while maintaining PrimeVue's accessibility and functionality through headless composition.

@rationale Uses custom HTML implementation with Tailwind classes to achieve perfect font consistency with the side menu, avoiding PrimeVue's CSS inheritance issues while maintaining accessibility and keyboard navigation.

@props
- `modelValue` (any): The selected value for v-model binding
- `options` (Array): Array of options to select from
- `optionLabel` (string): Property name to use as the label of an option
- `optionValue` (string): Property name to use as the value of an option
- `placeholder` (string): Placeholder text when no option is selected
- `label` (string): Label text displayed above the component
- `disabled` (boolean): Whether the component is disabled
- `invalid` (boolean): Whether the component has validation errors
- `errorMessage` (string): Error message to display when invalid
- `helpText` (string): Helper text displayed below the component
- `variant` (string): Visual variant of the component
- `size` (string): Size variant of the component

@events
- `update:modelValue`: Emitted when the selected value changes
- `change`: Emitted when selection changes with the new value
- `focus`: Emitted when the component gains focus
- `blur`: Emitted when the component loses focus

@slots
- `option`: Custom template for dropdown options
- `selected`: Custom template for selected value display

@usage
<!-- String Array -->
<BaseSelect
  v-model="selectedFruit"
  :options="['Apple', 'Banana', 'Orange']"
  placeholder="Select a fruit"
  label="Favorite Fruit"
/>

<!-- Object Array -->
<BaseSelect
  v-model="selectedCountry"
  :options="countries"
  option-label="name"
  option-value="code"
  placeholder="Select a country"
  label="Country"
/>
-->
<template>
  <div class="flex flex-col gap-1">
    <!-- Label -->
    <label 
      v-if="label"
      :for="inputId"
      class="text-sm font-semibold text-text leading-tight tracking-normal"
    >
      {{ label }}
    </label>

    <!-- Custom Select Container -->
    <div class="relative w-full" ref="container">
      <button
        :id="inputId"
        @click="toggleDropdown"
        @keydown="handleKeyDown"
        :disabled="disabled"
        :aria-expanded="isOpen"
        :aria-haspopup="true"
        :aria-label="label || placeholder"
        :aria-describedby="helpText ? `${inputId}-help` : undefined"
        :aria-invalid="invalid"
        :data-testid="`select-${inputId}`"
        class="w-full flex items-center justify-between bg-white border rounded-lg px-3 h-input text-sm focus:outline-none focus:ring-2 transition-all duration-200 disabled:bg-light/30 disabled:text-muted disabled:cursor-not-allowed"
        :class="{
          'border-border focus:border-accent focus:ring-accent/20 hover:border-accent/60': !invalid && !disabled,
          'border-danger focus:border-danger focus:ring-danger/20': invalid && !disabled,
          'border-accent': isOpen && !invalid,
          'border-danger': isOpen && invalid
        }"
      >
        <div class="flex items-center gap-2 text-dark/60 min-w-0 flex-1">
          <slot name="selected" :value="localValue" :option="selectedOption">
            <span class="truncate text-sm" :class="{ 'text-muted': !selectedOption }">
              {{ displayValue }}
            </span>
          </slot>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <i
            class="pi pi-chevron-down text-muted text-xs transition-transform duration-200"
            :class="{ 'rotate-180': isOpen }"
          />
        </div>
      </button>

      <!-- Custom Dropdown Panel -->
      <div
        v-if="isOpen"
        class="absolute z-50 top-full mt-1 w-full bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-hidden"
        role="listbox"
        :aria-labelledby="inputId"
      >
        <div class="max-h-60 overflow-y-auto py-1">
          <div
            v-for="(option, index) in options"
            :key="getOptionValue(option)"
            @click="selectOption(option)"
            @keydown="handleOptionKeyDown($event, option)"
            :role="'option'"
            :aria-selected="isSelected(option)"
            :tabindex="isSelected(option) ? 0 : -1"
            class="flex items-center px-3 py-2 text-sm text-dark/60 cursor-pointer transition-colors duration-200 hover:bg-accent/10 hover:text-dark/80 mx-1 my-0.5 rounded-md"
            :class="{
              'bg-accent/10 text-dark/80 font-medium': isSelected(option)
            }"
          >
            <slot name="option" :option="option" :selected="isSelected(option)">
              <span class="truncate">{{ getOptionLabel(option) }}</span>
            </slot>
          </div>
          
          <!-- Empty state -->
          <div v-if="(options || []).length === 0" class="px-3 py-2 text-sm text-muted text-center italic">
            No options available
          </div>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <small 
      v-if="errorMessage && invalid" 
      class="text-danger text-xs font-normal leading-tight"
      :id="`${inputId}-error`"
      role="alert"
    >
      {{ errorMessage }}
    </small>

    <!-- Help Text -->
    <small 
      v-else-if="helpText"
      class="text-muted text-xs font-normal leading-tight"
      :id="`${inputId}-help`"
    >
      {{ helpText }}
    </small>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'

export interface BaseSelectProps {
  /** The selected value for v-model binding */
  modelValue?: any
  /** Array of options to select from */
  options?: any[]
  /** Property name to use as the label of an option */
  optionLabel?: string
  /** Property name to use as the value of an option */
  optionValue?: string
  /** Placeholder text when no option is selected */
  placeholder?: string
  /** Label text displayed above the component */
  label?: string
  /** Whether the component is disabled */
  disabled?: boolean
  /** Whether the component has validation errors */
  invalid?: boolean
  /** Error message to display when invalid */
  errorMessage?: string
  /** Helper text displayed below the component */
  helpText?: string
  /** Visual variant of the component */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  /** Size variant of the component */
  size?: 'small' | 'normal' | 'large'
}

export interface BaseSelectEmits {
  /** Emitted when the selected value changes */
  'update:modelValue': [value: any]
  /** Emitted when selection changes with the new value */
  'change': [event: { originalEvent: Event; value: any }]
  /** Emitted when the component gains focus */
  'focus': [event: Event]
  /** Emitted when the component loses focus */
  'blur': [event: Event]
}

export interface BaseSelectSlots {
  /** Custom template for dropdown options */
  option?: (props: { option: any; selected: boolean }) => any
  /** Custom template for selected value display */
  selected?: (props: { value: any; option: any }) => any
}

const props = withDefaults(defineProps<BaseSelectProps>(), {
  modelValue: undefined,
  options: () => [],
  optionLabel: '',
  optionValue: '',
  placeholder: 'Select an option',
  label: '',
  disabled: false,
  invalid: false,
  errorMessage: '',
  helpText: '',
  variant: 'default',
  size: 'normal'
})

const emit = defineEmits<BaseSelectEmits>()

// Generate unique input ID
const inputId = ref(`select-${Math.random().toString(36).substr(2, 9)}`)

// Component state
const isOpen = ref(false)
const container = ref<HTMLElement | null>(null)

// Local value computed property for v-model
const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

/**
 * Get the selected option object
 */
const selectedOption = computed(() => {
  if (props.modelValue === undefined || props.modelValue === null) return null
  
  return (props.options || []).find(option => {
    const optionVal = getOptionValue(option)
    return optionVal === props.modelValue
  }) || null
})

/**
 * Get the display value for the selected option
 */
const displayValue = computed(() => {
  if (selectedOption.value) {
    return getOptionLabel(selectedOption.value)
  }
  return props.placeholder
})

/**
 * Get option label
 */
const getOptionLabel = (option: any): string => {
  if (props.optionLabel && typeof option === 'object' && option !== null) {
    return String(option[props.optionLabel] || option)
  }
  return String(option)
}

/**
 * Get option value
 */
const getOptionValue = (option: any): any => {
  if (props.optionValue && typeof option === 'object' && option !== null) {
    return option[props.optionValue]
  }
  return option
}

/**
 * Check if option is selected
 */
const isSelected = (option: any): boolean => {
  return getOptionValue(option) === props.modelValue
}

/**
 * Toggle dropdown visibility
 */
const toggleDropdown = (): void => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

/**
 * Select an option
 */
const selectOption = (option: any): void => {
  const value = getOptionValue(option)
  localValue.value = value
  emit('change', { originalEvent: new Event('change'), value })
  isOpen.value = false
}

/**
 * Handle keyboard navigation
 */
const handleKeyDown = (event: KeyboardEvent): void => {
  switch (event.code) {
    case 'Enter':
    case 'Space':
      event.preventDefault()
      toggleDropdown()
      break
    case 'Escape':
      isOpen.value = false
      break
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        isOpen.value = true
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (!isOpen.value) {
        isOpen.value = true
      }
      break
  }
}

/**
 * Handle option keyboard navigation
 */
const handleOptionKeyDown = (event: KeyboardEvent, option: any): void => {
  switch (event.code) {
    case 'Enter':
    case 'Space':
      event.preventDefault()
      selectOption(option)
      break
    case 'Escape':
      isOpen.value = false
      break
  }
}

/**
 * Handle clicks outside the component
 */
const handleClickOutside = (event: Event): void => {
  if (container.value && !container.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

/**
 * Handle focus events
 */
const handleFocus = (event: Event): void => {
  emit('focus', event)
}

/**
 * Handle blur events
 */
const handleBlur = (event: Event): void => {
  emit('blur', event)
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* All styling handled by Tailwind utility classes */
</style> 