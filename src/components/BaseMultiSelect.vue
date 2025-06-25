<!--
@component BaseMultiSelect
@description A professional multi-select dropdown component with custom styling that matches the side menu font properties exactly, displaying selected items as removable chips with perfect font consistency.

@rationale Uses custom HTML implementation with Tailwind classes to achieve perfect font consistency with the side menu, avoiding PrimeVue's CSS inheritance issues while maintaining accessibility, keyboard navigation, and chip-based selection display.

@props
- `modelValue` (Array): The selected values array for v-model binding
- `options` (Array): Array of options to select from
- `optionLabel` (string): Property name to use as the label of an option
- `optionValue` (string): Property name to use as the value of an option
- `placeholder` (string): Placeholder text when no items are selected
- `label` (string): Label text displayed above the component
- `disabled` (boolean): Whether the component is disabled
- `invalid` (boolean): Whether the component has validation errors
- `errorMessage` (string): Error message to display when invalid
- `helpText` (string): Helper text displayed below the component
- `filter` (boolean): Whether to show a filter input in the dropdown
- `filterPlaceholder` (string): Placeholder for the filter input
- `maxSelectedLabels` (number): Maximum number of selected labels to show before displaying count
- `width` (string): Width of the component - can be Tailwind width class or 'full' for 100%
- `minWidth` (string): Minimum width of the component
- `maxWidth` (string): Maximum width of the component

@events
- `update:modelValue`: Emitted when the selected values change
- `change`: Emitted when selection changes with the new value
- `focus`: Emitted when the component gains focus
- `blur`: Emitted when the component loses focus
- `filter`: Emitted when the filter text changes

@slots
- `option`: Custom template for dropdown options
- `chip`: Custom template for selected value chips
- `header`: Custom header content in dropdown
- `footer`: Custom footer content in dropdown

@usage
<!-- String Array -->
<BaseMultiSelect
  v-model="selectedFruits"
  :options="['Apple', 'Banana', 'Orange']"
  placeholder="Select fruits"
  label="Favorite Fruits"
  :filter="true"
  width="w-80"
/>

<!-- Object Array -->
<BaseMultiSelect
  v-model="selectedCountries"
  :options="countries"
  option-label="name"
  option-value="code"
  placeholder="Select countries"
  label="Countries"
  :filter="true"
  max-width="max-w-md"
/>
-->
<template>
  <div class="flex flex-col gap-1" :class="widthClasses">
    <!-- Label -->
    <label 
      v-if="label"
      :for="inputId"
      class="text-sm font-semibold text-text leading-tight tracking-normal"
    >
      {{ label }}
    </label>

    <!-- Custom MultiSelect Container -->
    <div class="relative w-full" ref="container">
      <div
        :id="inputId"
        @click="toggleDropdown"
        @keydown="handleKeyDown"
        :aria-expanded="isOpen"
        :aria-haspopup="true"
        :aria-label="label || placeholder"
        :aria-describedby="helpText ? `${inputId}-help` : undefined"
        :aria-invalid="invalid"
        :data-testid="`multiselect-${inputId}`"
        class="w-full flex items-center bg-white border rounded-lg px-3 py-2 min-h-[40px] focus:outline-none focus:ring-2 transition-all duration-200 cursor-pointer"
        :class="{
          'border-border focus:border-accent focus:ring-accent/20 hover:border-accent/60': !invalid && !disabled,
          'border-danger focus:border-danger focus:ring-danger/20': invalid && !disabled,
          'border-accent': isOpen && !invalid,
          'border-danger': isOpen && invalid,
          'bg-light/30 cursor-not-allowed': disabled
        }"
        tabindex="0"
      >
        <!-- Selected Items / Placeholder -->
        <div class="flex items-center flex-wrap gap-1 flex-1 min-w-0">
          <!-- Selected Chips -->
          <div
            v-for="(value, index) in selectedValues"
            :key="getChipKey(value, index)"
            class="inline-flex items-center gap-1 px-2 py-0.5 bg-light border border-border text-dark/60 rounded text-xs font-medium leading-tight tracking-normal transition-all duration-200 hover:bg-border/50"
          >
            <slot name="chip" :value="value" :index="index" :remove="() => removeValue(value)">
              <span class="truncate max-w-32">{{ getDisplayLabel(value) }}</span>
              <button
                @click.stop="removeValue(value)"
                class="w-3 h-3 text-muted hover:text-dark/80 cursor-pointer transition-colors duration-200"
                :aria-label="`Remove ${getDisplayLabel(value)}`"
              >
                <i class="pi pi-times text-[10px]"></i>
              </button>
            </slot>
          </div>

          <!-- Placeholder or count display -->
          <span
            v-if="selectedValues.length === 0"
            class="text-sm text-muted"
          >
            {{ placeholder }}
          </span>
          <span
            v-else-if="maxSelectedLabels && selectedValues.length > maxSelectedLabels"
            class="text-sm text-dark/60"
          >
            {{ selectedValues.length }} items selected
          </span>
        </div>

        <!-- Dropdown Arrow -->
        <div class="flex items-center gap-2 flex-shrink-0 ml-2">
          <i
            class="pi pi-chevron-down text-muted text-xs transition-transform duration-200"
            :class="{ 'rotate-180': isOpen }"
          />
        </div>
      </div>

      <!-- Custom Dropdown Panel -->
      <div
        v-if="isOpen"
        class="absolute z-50 top-full mt-1 w-full bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-hidden"
        role="listbox"
        :aria-labelledby="inputId"
        :aria-multiselectable="true"
      >
        <!-- Filter Input -->
        <div v-if="filter" class="p-3 border-b border-border/50 bg-light/30">
          <div class="relative">
            <i class="pi pi-search absolute top-1/2 left-3 -translate-y-1/2 text-muted text-sm transition-colors duration-200" />
            <input
              ref="filterInput"
              type="text"
              v-model="filterQuery"
              :placeholder="filterPlaceholder"
              class="w-full h-8 pl-9 pr-3 border border-border rounded-md focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 hover:border-accent/60 transition-all duration-200 text-sm font-normal leading-normal tracking-normal placeholder:text-muted placeholder:font-normal placeholder:italic"
              @input="handleFilter"
              @keydown.stop
            />
          </div>
        </div>

        <!-- Header Slot -->
        <div v-if="$slots.header" class="p-3 border-b border-border">
          <slot name="header" :value="selectedValues" :options="filteredOptions" />
        </div>

        <!-- Options List -->
        <div class="max-h-48 overflow-y-auto py-1">
          <div
            v-for="(option, index) in filteredOptions"
            :key="getOptionValue(option)"
            @click="toggleOption(option)"
            @keydown="handleOptionKeyDown($event, option)"
            :role="'option'"
            :aria-selected="isOptionSelected(option)"
            :tabindex="isOptionSelected(option) ? 0 : -1"
            class="flex items-center gap-2 px-3 py-2 text-sm text-dark/60 cursor-pointer transition-colors duration-200 hover:bg-accent/10 hover:text-dark/80 mx-1 my-0.5 rounded-md"
            :class="{
              'bg-accent/10 text-dark/80 font-medium': isOptionSelected(option)
            }"
          >
            <!-- Checkbox -->
            <div class="flex items-center flex-shrink-0">
              <div
                class="w-4 h-4 rounded border border-border transition-all duration-200 flex items-center justify-center"
                :class="{
                  'bg-accent border-accent': isOptionSelected(option),
                  'hover:border-accent/60': !isOptionSelected(option)
                }"
              >
                <i
                  v-if="isOptionSelected(option)"
                  class="pi pi-check text-dark/80 text-[10px]"
                />
              </div>
            </div>

            <!-- Option Content -->
            <slot name="option" :option="option" :selected="isOptionSelected(option)">
              <span class="truncate flex-1 text-sm font-normal leading-relaxed">{{ getOptionLabel(option) }}</span>
            </slot>
          </div>
          
          <!-- Empty state -->
          <div v-if="filteredOptions.length === 0" class="px-3 py-2 text-sm text-muted text-center italic">
            {{ filter && filterQuery ? 'No matching options' : 'No options available' }}
          </div>
        </div>

        <!-- Footer Slot -->
        <div v-if="$slots.footer" class="p-3 border-t border-border">
          <slot name="footer" :value="selectedValues" :options="filteredOptions" />
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

export interface BaseMultiSelectProps {
  /** The selected values array for v-model binding */
  modelValue?: any[]
  /** Array of options to select from */
  options?: any[]
  /** Property name to use as the label of an option */
  optionLabel?: string
  /** Property name to use as the value of an option */
  optionValue?: string
  /** Placeholder text when no items are selected */
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
  /** Whether to show a filter input in the dropdown */
  filter?: boolean
  /** Placeholder for the filter input */
  filterPlaceholder?: string
  /** Maximum number of selected labels to show before displaying count */
  maxSelectedLabels?: number
  /** Maximum number of items that can be selected */
  selectionLimit?: number
  /** Width of the component - can be Tailwind width class or 'full' for 100% */
  width?: string
  /** Minimum width of the component */
  minWidth?: string
  /** Maximum width of the component */
  maxWidth?: string
}

export interface BaseMultiSelectEmits {
  /** Emitted when the selected values change */
  'update:modelValue': [value: any[]]
  /** Emitted when selection changes with the new value */
  'change': [event: { originalEvent: Event; value: any[] }]
  /** Emitted when the component gains focus */
  'focus': [event: Event]
  /** Emitted when the component loses focus */
  'blur': [event: Event]
  /** Emitted when the filter text changes */
  'filter': [event: { originalEvent: Event; value: string }]
}

export interface BaseMultiSelectSlots {
  /** Custom template for dropdown options */
  option?: (props: { option: any; selected: boolean }) => any
  /** Custom template for selected value chips */
  chip?: (props: { value: any; index: number; remove: () => void }) => any
  /** Custom header content in dropdown */
  header?: (props: { value: any[]; options: any[] }) => any
  /** Custom footer content in dropdown */
  footer?: (props: { value: any[]; options: any[] }) => any
}

const props = withDefaults(defineProps<BaseMultiSelectProps>(), {
  modelValue: () => [],
  options: () => [],
  optionLabel: '',
  optionValue: '',
  placeholder: 'Select options',
  label: '',
  disabled: false,
  invalid: false,
  errorMessage: '',
  helpText: '',
  filter: false,
  filterPlaceholder: 'Search...',
  maxSelectedLabels: 3,
  selectionLimit: undefined,
  width: '',
  minWidth: '',
  maxWidth: ''
})

const emit = defineEmits<BaseMultiSelectEmits>()

// Generate unique input ID
const inputId = ref(`multiselect-${Math.random().toString(36).substr(2, 9)}`)

// Component state
const isOpen = ref(false)
const filterQuery = ref('')
const container = ref<HTMLElement | null>(null)
const filterInput = ref<HTMLInputElement | null>(null)

// Local value computed property for v-model
const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

/**
 * Computed width classes based on props
 */
const widthClasses = computed(() => {
  const classes = []
  
  if (props.width) {
    if (props.width === 'full') {
      classes.push('w-full')
    } else {
      classes.push(props.width.startsWith('w-') ? props.width : `w-${props.width}`)
    }
  } else {
    classes.push('w-full') // Default to full width
  }
  
  if (props.minWidth) {
    classes.push(props.minWidth.startsWith('min-w-') ? props.minWidth : `min-w-${props.minWidth}`)
  }
  
  if (props.maxWidth) {
    classes.push(props.maxWidth.startsWith('max-w-') ? props.maxWidth : `max-w-${props.maxWidth}`)
  }
  
  return classes.join(' ')
})

/**
 * Get selected values array
 */
const selectedValues = computed(() => {
  return Array.isArray(localValue.value) ? localValue.value : []
})

/**
 * Filter options based on search query
 */
const filteredOptions = computed(() => {
  if (!props.filter || !filterQuery.value) {
    return props.options
  }
  
  const query = filterQuery.value.toLowerCase()
  return props.options.filter(option => {
    const label = getOptionLabel(option).toLowerCase()
    return label.includes(query)
  })
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
 * Get display label for selected value
 */
const getDisplayLabel = (value: any): string => {
  const option = props.options.find(opt => getOptionValue(opt) === value)
  return option ? getOptionLabel(option) : String(value)
}

/**
 * Get unique key for chip
 */
const getChipKey = (value: any, index: number): string => {
  return `${getOptionValue(value)}-${index}`
}

/**
 * Check if option is selected
 */
const isOptionSelected = (option: any): boolean => {
  const value = getOptionValue(option)
  return selectedValues.value.includes(value)
}

/**
 * Toggle dropdown visibility
 */
const toggleDropdown = (): void => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  
  if (isOpen.value && props.filter) {
    nextTick(() => {
      filterInput.value?.focus()
    })
  }
}

/**
 * Toggle option selection
 */
const toggleOption = (option: any): void => {
  const value = getOptionValue(option)
  const currentValues = [...selectedValues.value]
  const index = currentValues.indexOf(value)
  
  if (index > -1) {
    currentValues.splice(index, 1)
  } else {
    if (props.selectionLimit && currentValues.length >= props.selectionLimit) {
      return // Don't add if limit reached
    }
    currentValues.push(value)
  }
  
  localValue.value = currentValues
  emit('change', { originalEvent: new Event('change'), value: currentValues })
}

/**
 * Remove a selected value
 */
const removeValue = (value: any): void => {
  const currentValues = [...selectedValues.value]
  const index = currentValues.indexOf(value)
  
  if (index > -1) {
    currentValues.splice(index, 1)
    localValue.value = currentValues
    emit('change', { originalEvent: new Event('change'), value: currentValues })
  }
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
      toggleOption(option)
      break
    case 'Escape':
      isOpen.value = false
      break
  }
}

/**
 * Handle filter input
 */
const handleFilter = (): void => {
  emit('filter', { originalEvent: new Event('input'), value: filterQuery.value })
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