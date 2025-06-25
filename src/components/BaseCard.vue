<template>
  <Card :pt="passThrough">
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