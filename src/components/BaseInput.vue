<!--
@component BaseInput
@description A versatile text input component with support for icons, labels, and validation states.

@rationale This component is built on PrimeVue's InputText and IconField. It standardizes the API for form inputs across the library, providing a consistent way to handle labels, validation, help text, and icons.

@props
- `modelValue` (string | number): The value of the input.
- `label` (string): The label to display above the input.
- `invalid` (boolean): Toggles the error state styling.
- `errorMessage` (string): The error message to display below the input.
- `helpText` (string): The help text to display below the input.
- `icon` (string): The PrimeIcon class for the icon.
- `iconPosition` ('left' | 'right'): The position of the icon.
- `disabled` (boolean): Disables the input.
-->
<template>
  <div class="flex flex-col gap-1 w-full">
    <label v-if="label" :for="inputId" class="text-sm font-medium text-text">
      {{ label }}
    </label>
    <IconField :iconPosition="iconPosition">
      <InputIcon v-if="icon" class="pi" :class="icon" @click="emit('icon-click')" />
      <InputText
        :id="inputId"
        v-model="inputValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="inputClass"
        :aria-invalid="invalid"
      />
    </IconField>
    <small v-if="errorMessage && invalid" class="text-danger text-xs">
      {{ errorMessage }}
    </small>
    <small v-else-if="helpText" class="text-muted text-xs">
      {{ helpText }}
    </small>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

export interface BaseInputProps {
  modelValue?: string | number
  label?: string
  placeholder?: string
  disabled?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  invalid?: boolean
  errorMessage?: string
  helpText?: string
}

const props = withDefaults(defineProps<BaseInputProps>(), {
  modelValue: '',
  disabled: false,
  invalid: false,
  iconPosition: 'left'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'icon-click'): void
}>()

const inputId = computed(() => `base-input-${Math.random().toString(36).substring(2, 9)}`)

const inputValue = computed({
  get: () => props.modelValue?.toString() || '',
  set: (value: string) => emit('update:modelValue', value),
})

const inputClass = computed(() => [
  'w-full h-input text-sm text-text placeholder:text-muted rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent',
  'border',
  {
    'border-border focus:border-accent': !props.invalid,
    'border-danger focus:border-danger': props.invalid,
    'bg-light cursor-not-allowed': props.disabled,
    'bg-white': !props.disabled,
  },
])
</script>

<style scoped>
/* PrimeVue overrides for unstyled look */
:deep(.p-inputtext) {
  padding: 0.5rem 0.75rem;
}
:deep(.p-icon-field-left .p-inputtext),
:deep(.p-icon-field-right .p-inputtext) {
  padding-left: 2.5rem;
}
:deep(.p-icon-field-right .p-inputtext) {
  padding-right: 2.5rem;
  padding-left: 0.75rem;
}
</style> 