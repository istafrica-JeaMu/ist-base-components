<template>
  <!--
    BaseTag component
    A styled tag component that extends PrimeVue's Tag, providing a consistent look and feel
    that aligns with the project's Figma design.

    Rationale: Extends PrimeVue's Tag component as it provides the necessary props (severity, icon, value)
    and the styling can be customized with :deep() selectors without significant conflicts.
  -->
  <Tag 
    :icon="icon" 
    :value="value" 
    :severity="severity" 
    :rounded="rounded"
    :aria-label="value ? `${severity || 'secondary'} tag: ${value}` : `${severity || 'secondary'} tag`"
    data-testid="base-tag"
  />
</template>

<script setup lang="ts">
import Tag, { type TagProps } from 'primevue/tag';

/**
 * @name Props
 * @description Defines the properties for the BaseTag component.
 */
export interface BaseTagProps extends /* @vue-ignore */ TagProps {
  /**
   * The text to display inside the tag.
   * @type {string}
   * @optional
   */
  value?: string;
  /**
   * The icon to display on the left side of the tag.
   * @type {string}
   * @optional
   */
  icon?: string;
  /**
   * The severity level which determines the tag's color scheme.
   * @type {'secondary' | 'success' | 'warning' | 'danger' | 'info'}
   * @optional
   */
  severity?: 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  /**
   * Whether the tag should be displayed as a pill.
   * @type {boolean}
   * @optional
   */
  rounded?: boolean
}

const props = withDefaults(defineProps<BaseTagProps>(), {
  severity: 'secondary',
  rounded: false,
});
</script>

<style scoped>
/* Base styles for all tags */
:deep(.p-tag) {
  @apply h-[22px] px-[5px] py-[1px] rounded-md text-xs font-medium inline-flex items-center gap-1;
}

/* Default/Basic Tag styles */
:deep(.p-tag) {
  @apply bg-light text-text;
}

/* Severity-based styles */
:deep(.p-tag-secondary) {
  @apply bg-secondary/10 text-secondary;
}

:deep(.p-tag-success) {
  @apply bg-success/10 text-success;
}

:deep(.p-tag-warning) {
  @apply bg-warning/10 text-warning;
}

:deep(.p-tag-danger) {
  @apply bg-danger/10 text-danger;
}

:deep(.p-tag-info) {
  @apply bg-info-light text-info;
}

/* Icon-only styles */
:deep(.p-tag-icon) {
 @apply text-base;
}
</style> 