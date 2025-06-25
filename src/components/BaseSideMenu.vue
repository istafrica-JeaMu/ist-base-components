<!--
  BaseSideMenu Component
  A responsive and collapsible side navigation menu.

  Props:
  - menuItems: MenuItem[] - The array of menu items to display.
  - collapsed: boolean - Controls the collapsed state of the menu.
  - defaultActiveId: string - The ID of the initially active menu item.
  - defaultExpandedIds: string[] - An array of IDs for initially expanded menu items.
  - isMobile: boolean - Toggles mobile-specific behavior (e.g., fixed position).

  Events:
  - update:collapsed - Emitted when the collapsed state changes.
  - navigate - Emitted when a leaf menu item is clicked.

  Slots:
  - logo - Custom content for the logo area.
  - title - Custom content for the title area next to the logo.
  - footer - Custom content for the footer area.
  - item - Custom rendering for each menu item.
-->
<template>
  <aside
    class="bg-white border-r border-border flex flex-col h-full transition-all duration-300"
    :class="{
      'w-70': !isCollapsed,
      'w-[64px]': isCollapsed,
      'fixed z-50': isMobile
    }"
    role="navigation"
    aria-label="Main navigation"
    data-testid="base-side-menu"
  >
    <!-- Logo Section -->
    <div class="h-16 px-4 shadow-sm flex items-center justify-between relative">
      <div class="flex items-center gap-3 overflow-hidden">
        <slot name="logo">
          <div class="w-8 h-8 flex-shrink-0 flex items-center justify-center">
            <img src="/ist-logo.jpeg" alt="IST Logo" class="w-full h-full rounded-md" />
          </div>
        </slot>
        <div v-if="!isCollapsed" class="flex flex-col flex-shrink-0">
          <slot name="title">
            <span class="text-dark font-semibold text-base leading-tight">IST</span>
            <span class="text-dark/60 text-xs">Childcare</span>
          </slot>
        </div>
      </div>

      <!-- Toggle Button -->
      <button
        class="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-border rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:bg-accent/5 hover:border-accent/20 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        @click="toggleCollapse"
        :title="isCollapsed ? 'Expand menu' : 'Collapse menu'"
        :aria-label="isCollapsed ? 'Expand menu' : 'Collapse menu'"
        :aria-expanded="!isCollapsed"
        data-testid="menu-toggle-button"
      >
        <i
          class="pi text-dark/60 text-xs transition-transform duration-200 group-hover:text-dark"
          :class="isCollapsed ? 'pi-angle-right' : 'pi-angle-left'"
        />
      </button>
    </div>

    <!-- Navigation Menu -->
    <nav 
      class="flex-1 overflow-y-auto py-2 px-2"
      aria-label="Navigation menu items"
    >
      <ul 
        class="space-y-0.5"
        role="menu"
        data-testid="navigation-menu"
      >
        <SideMenuItem
          v-for="item in menuItems"
          :key="item.id"
          :item="item"
          :collapsed="isCollapsed"
          :active-item-id="activeItemId"
          :expanded-items="expandedItems"
          :level="0"
          @item-click="handleItemClick"
        >
          <template #item="slotProps">
            <slot name="item" v-bind="slotProps" />
          </template>
        </SideMenuItem>
      </ul>
    </nav>

    <!-- Footer Section -->
    <div v-if="!isCollapsed && $slots.footer" class="p-4 border-t border-border">
      <slot name="footer" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import SideMenuItem from './SideMenuItem.vue'

// TypeScript Interfaces
export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
}

export interface BaseSideMenuProps {
  menuItems: MenuItem[];
  collapsed?: boolean;
  defaultActiveId?: string;
  defaultExpandedIds?: string[];
  isMobile?: boolean;
}

// Component Props and Emits
const props = withDefaults(defineProps<BaseSideMenuProps>(), {
  collapsed: false,
  defaultExpandedIds: () => [],
  isMobile: false
})
const emit = defineEmits(['update:collapsed', 'navigate'])

// Component State
const isCollapsed = ref(props.collapsed)
const expandedItems = ref<string[]>(props.defaultExpandedIds)
const activeItemId = ref<string | null>(props.defaultActiveId ?? null)

// Event Handlers
const handleItemClick = (item: MenuItem) => {
  if (item.children && item.children.length > 0) {
    // It's a parent item, toggle expansion
    const index = expandedItems.value.indexOf(item.id)
    if (index > -1) {
      expandedItems.value.splice(index, 1)
    } else {
      expandedItems.value.push(item.id)
    }
  } else {
    // It's a leaf item, set as active and emit navigate event
    activeItemId.value = item.id
    if (item.path) {
      emit('navigate', item)
    }
  }
}

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  emit('update:collapsed', isCollapsed.value)
}

// Watchers and Lifecycle Hooks
watch(() => props.collapsed, (newVal) => {
  isCollapsed.value = newVal
})

watch(() => props.isMobile, (newVal) => {
  if (newVal) {
    isCollapsed.value = true
  }
})

onMounted(() => {
  if (props.isMobile) {
    isCollapsed.value = true
  }
})
</script>

<style scoped>
/* Scoped styles can be added here if needed, but we prefer Tailwind utilities */
</style> 