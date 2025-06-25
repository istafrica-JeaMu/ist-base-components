<!--
@component BaseTextarea
@description A flexible textarea component with support for labels, validation, and character counting.

@rationale Built on PrimeVue's Textarea, this component is styled to ensure design consistency and maintainability. It shares a standardized API with other form controls in this library.

@props
- `modelValue` (string): The value of the textarea.
- `label` (string): The label to display above the textarea.
- `invalid` (boolean): Toggles the error state styling.
- `errorMessage` (string): The error message to display below the textarea.
- `helpText` (string): The help text to display below the textarea.
- `disabled` (boolean): Disables the textarea.
- `showCharCount` (boolean): Shows a character count against the `maxlength`.
-->
<template>
  <div class="flex flex-col gap-1 w-full">
    <label v-if="label" :for="textareaId" class="text-sm font-medium text-text">
      {{ label }}
      <span v-if="required" class="text-danger ml-1">*</span>
    </label>

    <Textarea
      :id="textareaId"
      v-model="textareaValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="textareaClass"
      :aria-invalid="invalid"
    />

    <div class="flex justify-between items-center mt-1 text-xs">
      <small v-if="errorMessage && invalid" class="text-danger">
        {{ errorMessage }}
      </small>
      <small v-else-if="helpText" class="text-muted">
        {{ helpText }}
      </small>
      <small v-if="showCharCount && maxlength" class="text-muted ml-auto">
        {{ charCount }}/{{ maxlength }}
      </small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Textarea from 'primevue/textarea'

export interface BaseTextareaProps {
  modelValue?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  rows?: number
  cols?: number
  maxlength?: number
  invalid?: boolean
  errorMessage?: string
  helpText?: string
  showCharCount?: boolean
}

const props = withDefaults(defineProps<BaseTextareaProps>(), {
  modelValue: '',
  disabled: false,
  required: false,
  rows: 4,
  invalid: false,
  showCharCount: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const textareaId = ref(`base-textarea-${Math.random().toString(36).substr(2, 9)}`)
const textareaValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
})

const charCount = computed(() => props.modelValue?.length || 0)

const textareaClass = computed(() => {
  const baseClasses =
    'w-full border rounded-lg p-3 text-sm font-inherit leading-relaxed transition-all duration-200 bg-white text-text resize-y min-h-[100px] focus:outline-none focus:ring-2'

  const stateClasses = props.invalid
    ? 'border-danger focus:ring-danger focus:border-danger'
    : 'border-border focus:ring-accent focus:border-accent'

  const disabledClasses = props.disabled ? 'bg-light text-muted cursor-not-allowed' : ''

  return [baseClasses, stateClasses, disabledClasses].filter(Boolean).join(' ')
})
</script>

<style scoped>
/* Minimal custom styles - using Tailwind for most styling */
</style> 