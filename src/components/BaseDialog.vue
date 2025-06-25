<!--
@component BaseDialog
@description A customizable, accessible modal dialog component.

@rationale Extending PrimeVue's Dialog is the optimal strategy. It provides a robust foundation for accessibility (focus trapping, ARIA roles) and state management, which are complex to build from scratch. The PassThrough (pt) property allows for deep, granular styling with Tailwind CSS, enabling us to match the Figma design precisely without fighting CSS specificity, which aligns with our 'Build vs. Extend Decision Framework'.

@props
- `visible` (boolean, required): Controls the visibility of the dialog. Use with `v-model:visible`.
- `modal` (boolean): Determines if the dialog is modal. Defaults to `true`.
- `header` (string): The title text displayed in the dialog's header.
- `closable` (boolean): Determines if the dialog can be closed by clicking the close icon. Defaults to `false` as per the design.
- `confirmLabel` (string): The label for the confirm button. Defaults to 'Confirm'.
- `cancelLabel` (string): The label for the cancel button. Defaults to 'Cancel'.
- `confirmVariant` (string): The variant for the confirm button. Defaults to 'hero'.
- `loading` (boolean): Shows a loading spinner on the confirm button and disables all interactions.
- `size` ('small' | 'normal' | 'large'): The width of the dialog. Defaults to 'small'.

@events
- `update:visible` (boolean): Emitted when the dialog's visibility changes.
- `confirm`: Emitted when the confirm button is clicked.
- `cancel`: Emitted when the cancel button is clicked or the dialog is closed.

@slots
- `default`: The main content of the dialog body.
- `header`: Custom content for the header, overrides the `header` prop.
- `footer`: Custom content for the footer, overrides the default buttons.
- `actions`: Custom content for the action area, overrides the default buttons.

@usage
<BaseDialog
  v-model:visible="isDialogVisible"
  header="Dialog Title"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <p>Your dialog content goes here.</p>
</BaseDialog>
-->
<template>
  <Dialog
    :visible="props.visible"
    :modal="props.modal"
    :closable="!loading && props.closable"
    :pt="passThrough"
    role="dialog"
    :aria-label="header || 'Dialog'"
    :aria-modal="modal"
    data-testid="base-dialog"
    @update:visible="!loading && emit('update:visible', $event)"
  >
    <template #header>
      <slot name="header">
        <span 
          class="font-bold text-lg"
          data-testid="dialog-header"
        >
          {{ props.header }}
        </span>
      </slot>
    </template>

    <div 
      class="px-6 py-4"
      data-testid="dialog-content"
    >
      <slot />
    </div>

    <template #footer>
      <slot name="actions">
        <BaseButton
          :label="props.cancelLabel"
          variant="default"
          size="small"
          :disabled="loading"
          @click="onCancel"
        />
        <BaseButton
          :label="props.confirmLabel"
          :variant="confirmVariant"
          size="small"
          :loading="loading"
          @click="onConfirm"
        />
      </slot>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Dialog from 'primevue/dialog'
import BaseButton, { type BaseButtonProps } from './BaseButton.vue'

export interface BaseDialogProps {
  visible: boolean
  modal?: boolean
  header?: string
  closable?: boolean
  confirmLabel?: string
  cancelLabel?: string
  confirmVariant?: BaseButtonProps['variant']
  loading?: boolean
  size?: 'small' | 'normal' | 'large'
}

export interface BaseDialogEmits {
  (e: 'update:visible', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<BaseDialogProps>(), {
  modal: true,
  header: 'Confirmation',
  closable: false,
  confirmLabel: 'Continue',
  cancelLabel: 'Cancel',
  confirmVariant: 'primary',
  loading: false,
  size: 'small',
})

const emit = defineEmits<BaseDialogEmits>()

const onConfirm = () => {
  emit('confirm')
}

const onCancel = () => {
  emit('cancel')
  emit('update:visible', false)
}

const sizeClasses = {
  small: 'w-[350px]',
  normal: 'w-[500px]',
  large: 'w-[800px]',
}

const passThrough = computed(() => ({
  root: {
    class: [
      'rounded-xl border border-border shadow-dialog bg-white',
      sizeClasses[props.size],
    ],
  },
  mask: {
    class: '!bg-black/40',
  },
  header: {
    class: 'px-6 pt-6 pb-4 border-b-0 rounded-t-xl',
  },
  title: {
    class: 'font-bold text-lg text-text',
  },
  headerIcons: {
    class: 'hidden',
  },
  content: {
    class: 'p-0 text-sm text-muted',
  },
  footer: {
    class: 'px-6 py-4 flex justify-end gap-2 border-t border-border bg-gray-50 rounded-b-xl',
  },
}))
</script>

<style scoped>
:deep(.p-dialog-content > p + p) {
  @apply mt-4;
}
</style> 