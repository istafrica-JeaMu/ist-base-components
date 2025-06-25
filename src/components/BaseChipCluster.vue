<template>
  <div class="flex flex-wrap gap-2">
    <BaseChip
      v-for="option in options"
      :key="option"
      :label="option"
      :variant="isSelected(option) ? 'accent' : 'default'"
      @click="handleClick(option)"
    />
  </div>
</template>

<script setup lang="ts">
import BaseChip from './BaseChip.vue';

/**
 * @name Props
 * @description Defines the properties for the BaseChipCluster component.
 */
export interface BaseChipClusterProps {
  /**
   * The currently selected chip values.
   * @type {string[]}
   * @required
   */
  modelValue: string[];
  /**
   * An array of strings to display as chips.
   * @type {string[]}
   * @required
   */
  options: string[];
}

/**
 * @name Emits
 * @description Defines the custom events emitted by the BaseChipCluster component.
 */
export interface BaseChipClusterEmits {
  /**
   * Emitted when a chip is selected or deselected.
   * @param {string[]} value The new array of selected values.
   */
  (e: 'update:modelValue', value: string[]): void;
}

const props = defineProps<BaseChipClusterProps>();
const emit = defineEmits<BaseChipClusterEmits>();

/**
 * Checks if a given option is currently selected.
 * @param {string} option The option to check.
 * @returns {boolean} True if the option is selected, false otherwise.
 */
const isSelected = (option: string): boolean => {
  return props.modelValue.includes(option);
};

/**
 * Handles the click event on a chip, toggling its selection state.
 * @param {string} option The value of the clicked chip.
 */
const handleClick = (option: string) => {
  const newModelValue = [...props.modelValue];
  const index = newModelValue.indexOf(option);

  if (index > -1) {
    // Already selected, so remove it
    newModelValue.splice(index, 1);
  } else {
    // Not selected, so add it
    newModelValue.push(option);
  }
  
  emit('update:modelValue', newModelValue);
};
</script> 