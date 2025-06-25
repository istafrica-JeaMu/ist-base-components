<template>
  <!--
    BaseChip component
    A customizable chip component that extends PrimeVue's Chip, designed to match the project's Figma specifications.
    It can display a label, an optional icon, and can be removable.
  -->
  <Chip
    :label="label"
    :icon="icon"
    :removable="removable"
    :class="chipClass"
    @remove="$emit('remove')"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Chip from 'primevue/chip';

export type ChipVariant = 'default' | 'accent';

/**
 * @name Props
 * @description Defines the properties for the BaseChip component.
 */
export interface BaseChipProps {
  /**
   * The text to display inside the chip.
   * @type {string}
   * @required
   */
  label: string;
  /**
   * The icon to display on the left side of the chip.
   * Uses PrimeIcons (e.g., 'pi pi-user').
   * @type {string}
   * @optional
   */
  icon?: string;
  /**
   * Whether the chip can be removed (displays a remove icon).
   * @type {boolean}
   * @default false
   */
  removable?: boolean;
  /**
   * The visual style of the chip.
   * @type {'default' | 'accent'}
   * @default 'accent'
   */
  variant?: ChipVariant;
}

/**
 * @name Emits
 * @description Defines the custom events emitted by the BaseChip component.
 */
export interface BaseChipEmits {
  /**
   * Emitted when the remove icon is clicked.
   */
  (e: 'remove'): void;
}

const props = withDefaults(defineProps<BaseChipProps>(), {
  removable: false,
  variant: 'accent',
});

defineEmits<BaseChipEmits>();

const variantClasses: Record<ChipVariant, string> = {
  default: 'bg-light text-text hover:shadow-sm',
  accent: 'bg-accent text-dark',
};

const chipClass = computed(() => {
  return variantClasses[props.variant];
});
</script>

<style scoped>
/*
  The following styles use @apply with :deep() to override PrimeVue's default
  Chip component styling, ensuring it aligns with the Figma design system.
  We use arbitrary values for padding and height to achieve a pixel-perfect match.
*/
:deep(.p-chip) {
  @apply h-[35px] rounded-full py-[7px] px-3 inline-flex items-center font-medium text-sm transition-all duration-200 ease-in-out;
}

/* Make non-removable chips interactive */
:deep(.p-chip:not(.p-chip-removable)) {
    @apply cursor-pointer;
}

/* Adjusts the margin for the icon to match the 7px gap from the Figma spec. */
:deep(.p-chip-icon.p-chip-icon-left) {
  @apply mr-1.5 text-base;
}

/* Styles the remove icon for better usability and consistency. */
:deep(.p-chip-remove-icon) {
  @apply ml-1.5 cursor-pointer text-base;
}
</style> 