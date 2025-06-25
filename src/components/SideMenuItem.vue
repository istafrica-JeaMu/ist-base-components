<!--
  SideMenuItem Component
  A recursive component for rendering menu items in a hierarchical menu structure.
  It is designed to be used internally by BaseSideMenu.
-->
<template>
  <li>
    <div
      class="side-menu-item-content"
      @click.prevent="handleClick"
    >
      <slot
        name="item"
        :item="item"
        :active="isActive"
        :expanded="isExpanded"
        :level="level"
      >
        <!-- Default item rendering if no slot is provided -->
        <a :href="item.path || '#'" class="flex items-center w-full h-full">
          <i v-if="item.icon" :class="[item.icon, 'mr-2.5']" />
          <span v-if="!collapsed" class="whitespace-nowrap">{{ item.label }}</span>
          <i
            v-if="hasChildren && !collapsed"
            class="pi pi-chevron-down ml-auto transition-transform duration-200"
            :class="{ 'rotate-180': isExpanded }"
          />
        </a>
      </slot>
    </div>
    <ul v-if="hasChildren && isExpanded" class="pl-4">
      <SideMenuItem
        v-for="child in item.children"
        :key="child.id"
        :item="child"
        :level="level + 1"
        :collapsed="collapsed"
        :active-item-id="activeItemId"
        :expanded-items="expandedItems"
        @item-click="(clickedItem) => $emit('item-click', clickedItem)"
      >
        <template #item="slotProps">
          <slot name="item" v-bind="(slotProps as any)" />
        </template>
      </SideMenuItem>
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MenuItem } from './BaseSideMenu.vue'

// Define component props and emits
export interface SideMenuItemProps {
  item: MenuItem;
  level: number;
  collapsed: boolean;
  activeItemId: string | null;
  expandedItems: string[];
}
export interface SideMenuItemEmits {
  (e: 'item-click', item: MenuItem): void;
}

const props = defineProps<SideMenuItemProps>()
const emit = defineEmits<SideMenuItemEmits>()

// Computed properties
const hasChildren = computed(() => props.item.children && props.item.children.length > 0)
const isActive = computed(() => props.item.id === props.activeItemId)
const isExpanded = computed(() => hasChildren.value && props.expandedItems.includes(props.item.id))

// Methods
function handleClick() {
  emit('item-click', props.item)
}
</script>

<style scoped>
/* All styling is now handled by utility classes in the template */
</style> 