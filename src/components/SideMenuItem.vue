<!--
@component SideMenuItem
@description A recursive component for rendering individual menu items in a hierarchical navigation structure. Handles nested menu items, expansion states, and active item highlighting. Designed to be used internally by BaseSideMenu.

@rationale Custom implementation using recursive Vue components to handle complex nested menu structures with proper state management for expansion and active states. Built with Tailwind CSS for consistent styling and smooth animations.

@props
- item (MenuItem): The menu item object containing id, label, icon, path, and optional children
- level (number): The nesting level for proper indentation and styling
- collapsed (boolean): Whether the parent menu is in collapsed state
- activeItemId (string | null): The ID of the currently active menu item
- expandedItems (string[]): Array of menu item IDs that are currently expanded

@events
- item-click (MenuItem): Emitted when a menu item is clicked, bubbles up to parent menu

@slots
- item: Custom template for menu item rendering with item data and state

@usage
<!-- Used internally by BaseSideMenu - not typically used directly -->
<SideMenuItem
  :item="menuItem"
  :level="0"
  :collapsed="false"
  :active-item-id="activeId"
  :expanded-items="expandedIds"
  @item-click="handleItemClick"
/>
-->
  <template>
    <li>
      <div
        class="side-menu-item-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        role="menuitem"
        :aria-label="item.label"
        :aria-expanded="hasChildren ? isExpanded : undefined"
        :aria-current="isActive ? 'page' : undefined"
        :data-testid="`side-menu-item-${item.id}`"
        tabindex="0"
        @click.prevent="handleClick"
        @keydown.enter.prevent="handleClick"
        @keydown.space.prevent="handleClick"
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
          <ul 
        v-if="hasChildren && isExpanded" 
        class="pl-4"
        role="menu"
        :aria-label="`${item.label} submenu`"
      >
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
        <template #item="slotProps: any">
          <slot name="item" v-bind="slotProps" />
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
  /** Emitted when a menu item is clicked */
  'item-click': [item: MenuItem]
}

export interface SideMenuItemSlots {
  /** Custom template for menu item rendering with item data and state */
  item?: (props: { item: MenuItem; active: boolean; expanded: boolean; level: number }) => any
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