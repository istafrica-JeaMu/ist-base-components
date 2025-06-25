<!--
@component BaseMessage
@description An inline component to display important messages for different severity levels.

@rationale Extends PrimeVue's `Message` component to leverage its accessibility (ARIA roles) and event handling. The `passThrough` (`pt`) property is used to gain full, pixel-perfect control over the styling with Tailwind CSS, ensuring the component matches the Figma design exactly while maintaining a robust functional foundation.

@props
- `severity` ('success' | 'info' | 'warn' | 'danger'): The severity level, which dictates the color scheme and default icon.
- `title` (string): The main heading text of the message.
- `icon` (string): A custom PrimeVue icon class to override the default severity icon.
- `closable` (boolean): If set to true, displays a close button. Defaults to `false`.

@events
- `close` (Event): Emitted when the close button is clicked.

@slots
- `default`: The main body content of the message.

@usage
<BaseMessage severity="success" title="Success">
  <p>Your profile has been updated successfully.</p>
</BaseMessage>
-->
<template>
  <Message :severity="severity" :closable="closable" :pt="passThrough" @close="$emit('close', $event)">
    <template #messageicon>
      <i :class="[iconClass, severityClasses.icon, 'text-[23px]']"></i>
    </template>
    <div class="ml-3 flex-grow">
      <div class="font-medium" :class="severityClasses.title">{{ title }}</div>
      <div class="text-[#334155] mt-[7px]">
        <slot />
      </div>
    </div>
  </Message>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Message from 'primevue/message'

export interface BaseMessageProps {
  severity?: 'success' | 'info' | 'warn' | 'danger'
  title: string
  icon?: string
  closable?: boolean
}

const props = withDefaults(defineProps<BaseMessageProps>(), {
  severity: 'info',
  closable: false,
})

defineEmits(['close'])

const defaultIcons = {
  success: 'pi pi-check-circle',
  info: 'pi pi-info-circle',
  warn: 'pi pi-exclamation-triangle',
  danger: 'pi pi-times-circle',
}

const iconClass = computed(() => props.icon || defaultIcons[props.severity])

const severityClasses = computed(() => {
  const severityMap = {
    success: {
      root: 'bg-message-success-light border-message-success-border',
      icon: 'text-message-success-dark',
      title: 'text-message-success-dark',
    },
    info: {
      root: 'bg-message-info-light border-message-info-border',
      icon: 'text-message-info-dark',
      title: 'text-message-info-dark',
    },
    warn: {
      root: 'bg-message-warning-light border-message-warning-border',
      icon: 'text-message-warning-dark',
      title: 'text-message-warning-dark',
    },
    danger: {
      root: 'bg-message-danger-light border-message-danger-border',
      icon: 'text-message-danger-dark',
      title: 'text-message-danger-dark',
    },
  }
  return severityMap[props.severity]
})

const passThrough = computed(() => ({
  root: {
    class: [
      'relative',
      'py-[7px] px-[10.5px] rounded-md border',
      'shadow-[0_4px_8px_0_rgba(1,8,4,0.04)]',
      'inline-flex',
      severityClasses.value.root,
    ],
  },
  wrapper: 'flex items-start',
  icon: '',
  text: 'text-sm',
  closeButton: 'w-7 h-7 rounded-full bg-transparent text-[#334155]/50 hover:bg-black/10 transition-colors duration-200 flex items-center justify-center !absolute !top-2.5 !right-2.5',
  closeIcon: 'pi pi-times text-sm text-[#334155]',
}))
</script> 