<!--
@component BaseCard
@description A flexible card container component with header, body, and footer sections. Provides consistent styling and layout structure for content organization with support for custom padding and multiple content slots.

@rationale Extends PrimeVue's Card component to leverage its structural foundation while applying custom Tailwind styling through PassThrough API. This approach maintains accessibility and semantic HTML structure while achieving pixel-perfect design system compliance.

@props
- title (string): Main heading text displayed in the card header
- subtitle (string): Secondary text displayed below the title in the header
- padding ('none' | 'small' | 'normal' | 'large'): Controls internal padding of the card body content

@events
- No custom events emitted (uses standard DOM events)

@slots
- header: Custom header content (overrides title/subtitle when used)
- default: Main card body content
- actions: Action buttons or controls displayed in the header
- footer: Footer content with pre-styled button container

@usage
<BaseCard title="Card Title" subtitle="Card description" padding="normal">
  <template #actions>
    <BaseButton size="small">Edit</BaseButton>
  </template>
  <p>Main card content goes here</p>
  <template #footer>
    <BaseButton variant="secondary">Cancel</BaseButton>
    <BaseButton variant="primary">Save</BaseButton>
  </template>
</BaseCard>
-->
<template>
  <Card 
    :pt="passThrough"
    role="region"
    :aria-label="ariaLabel || title || 'Card content'"
    data-testid="base-card"
  >
    <template #header>
      <div v-if="$slots.header || title" class="flex justify-between items-center w-full">
        <div>
          <slot name="header">
            <div v-if="title" class="text-xl font-semibold text-text m-0 leading-tight">
              {{ title }}
            </div>
            <div v-if="subtitle" class="text-sm text-muted mt-1 leading-relaxed">
              {{ subtitle }}
            </div>
          </slot>
        </div>
        <div v-if="$slots.actions">
          <slot name="actions" />
        </div>
      </div>
    </template>
    <template #content>
      <slot />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'

export interface BaseCardProps {
  title?: string
  subtitle?: string
  padding?: 'none' | 'small' | 'normal' | 'large'
  /** ARIA label for accessibility */
  ariaLabel?: string
}

export interface BaseCardEmits {
  // No custom events emitted - uses standard DOM events
}

export interface BaseCardSlots {
  /** Custom header content (overrides title/subtitle when used) */
  header?: () => any
  /** Main card body content */
  default?: () => any
  /** Action buttons or controls displayed in the header */
  actions?: () => any
  /** Footer content with pre-styled button container */
  footer?: () => any
}

const props = withDefaults(defineProps<BaseCardProps>(), {
  padding: 'normal',
})

const paddingClasses = {
  none: 'p-0',
  small: 'p-2',
  normal: 'p-4',
  large: 'p-6',
}

const passThrough = computed(() => ({
  root: {
    class: 'bg-white border border-border rounded-lg shadow-sm overflow-hidden',
  },
  header: {
    class: 'p-4 border-b border-border',
  },
  body: {
    class: paddingClasses[props.padding],
  },
  content: {
    class: 'text-text leading-relaxed',
  },
  footer: {
    class: 'p-4 bg-light border-t border-border flex justify-end gap-2',
  },
}))
</script>

<style scoped>
/* Minimal custom styles - using Tailwind for most styling */
</style> 