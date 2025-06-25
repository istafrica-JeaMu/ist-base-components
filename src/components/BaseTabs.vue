<template>
  <div>
    <!-- Tab Headers -->
    <div class="flex border-b border-border">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.title"
        :class="[
          'flex items-center gap-2 px-4 py-[14px] border-b-2 transition-all duration-200 ease-in-out',
          {
            'border-accent bg-[#FEF3C7] text-[#334155] font-medium': activeTabIndex === index,
            'border-transparent text-[#64748B] hover:text-[#334155]': activeTabIndex !== index,
          },
        ]"
        @click="activeTabIndex = index"
      >
        <i :class="tab.icon"></i>
        <span>{{ tab.title }}</span>
      </button>
    </div>

    <!-- Tab Panels -->
    <div class="p-4 bg-white">
      <template v-for="(tab, index) in tabs">
        <div v-if="index === activeTabIndex">
          <slot :name="`panel-${index}`" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Note: This component is a custom implementation and does not use PrimeVue's TabView
// to ensure full styling control and avoid CSS conflicts.

/**
 * @name Tab
 * @description Defines the structure for a single tab item.
 */
export interface Tab {
  title: string;
  icon: string;
}

/**
 * @name Props
 * @description Defines the properties for the BaseTabs component.
 */
export interface BaseTabsProps {
  /**
   * An array of tab objects to display.
   * @type {Tab[]}
   * @required
   */
  tabs: Tab[];
  /**
   * The index of the currently active tab.
   * @type {number}
   * @default 0
   */
  modelValue: number;
}

/**
 * @name Emits
 * @description Defines the custom events emitted by the BaseTabs component.
 */
export interface BaseTabsEmits {
  /**
   * Emitted when the active tab changes.
   * @param {number} value The new active tab index.
   */
  (e: 'update:modelValue', value: number): void;
}

const props = withDefaults(defineProps<BaseTabsProps>(), {
  modelValue: 0,
});
const emit = defineEmits<BaseTabsEmits>();

const activeTabIndex = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script> 