<template>
  <div class="flex h-screen bg-gray-100 font-sans">
    <!-- Side Menu -->
    <BaseSideMenu
      class="flex-shrink-0"
      :menu-items="sideMenuItems"
      :collapsed="isMenuCollapsed"
      :is-mobile="isMobile"
      @update:collapsed="isMenuCollapsed = $event"
    >
      <template #logo>
        <div class="w-8 h-8 flex-shrink-0 flex items-center justify-center">
          <img src="/ist-logo.jpeg" alt="IST Logo" class="w-full h-full rounded-md" />
        </div>
      </template>
      <template #item="{ item, active, expanded, level }">
        <div
          class="flex items-center w-full h-[35px] transition-all duration-200 text-dark/70 hover:bg-accent/10 hover:text-dark group"
          :class="{ 'bg-accent/10 !text-dark font-medium': active }"
          :style="{ paddingLeft: `${16 + level * 16}px` }"
        >
          <i v-if="item.icon" :class="[item.icon, 'text-sm opacity-80 group-hover:opacity-100 mr-2.5']" />
          <span v-if="!isMenuCollapsed" class="text-sm whitespace-nowrap">{{ item.label }}</span>
          <i
            v-if="item.children && item.children.length > 0 && !isMenuCollapsed"
            class="pi pi-chevron-down text-[10px] transition-transform duration-200 opacity-60 ml-auto mr-4"
            :class="{ 'rotate-180': expanded }"
          />
        </div>
      </template>
      <template #footer>
        <BaseAccordion
          title="Support / Documentation"
          :items="supportMenuItems"
          variant="transparent"
          header-class="flex items-center w-full h-[35px] transition-all duration-200 text-dark/70 hover:bg-accent/10 hover:text-dark group px-4"
          title-class="text-sm font-medium whitespace-nowrap"
          icon-class="text-[10px] opacity-60 ml-auto"
        />
      </template>
    </BaseSideMenu>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Header -->
      <BaseHeader>
        <template #left>
          <BaseBreadcrumbs :items="currentBreadcrumbs" />
        </template>
        <template #center>
          <div class="flex items-center gap-4">
            <BaseInput
              placeholder="Search anything..."
              icon="pi pi-search"
              iconPosition="left"
              class="w-full max-w-xs"
            />
            <BaseHierarchicalSelect
              v-model="selectedUnit"
              :options="unitOptions"
              placeholder="Select a unit"
              class="w-full max-w-xs"
            />
          </div>
        </template>
        <template #right>
          <BaseIconButton icon="pi pi-comment" :badge="true" />
          <BaseIconButton icon="pi pi-bell" :badge="notificationCount" />
          <img :src="currentUser.avatar" alt="User Avatar" class="w-9 h-9 rounded-full">
        </template>
      </BaseHeader>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto">
        <ComponentGallery />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BaseSideMenu, { type MenuItem } from './components/BaseSideMenu.vue'
import BaseHeader from './components/BaseHeader.vue'
import BaseBreadcrumbs from './components/BaseBreadcrumbs.vue'
import BaseInput from './components/BaseInput.vue'
import BaseIconButton from './components/BaseIconButton.vue'
import BaseHierarchicalSelect, { type HierarchicalOptions, type SelectedHierarchicalValue } from './components/BaseHierarchicalSelect.vue'
import BaseAccordion, { type AccordionItem } from './components/BaseAccordion.vue'
import ComponentGallery from './views/ComponentGallery.vue'
import type { BreadcrumbItem } from './components/BaseBreadcrumbs.vue'
// Reactive state
const isMenuCollapsed = ref(false)
const isMobile = ref(window.innerWidth < 1024)
const notificationCount = ref(8)
const selectedUnit = ref<SelectedHierarchicalValue | null>(null)

// Sample User Data
const currentUser = {
  name: 'Jane Doe',
  avatar: '/src/assets/avatars/14.png'
}

// Sample Breadcrumbs
const currentBreadcrumbs = ref<BreadcrumbItem[]>([
  { label: 'Home', path: '#', icon: 'pi pi-home' },
  { label: 'Components', path: '#' },
  { label: 'Breadcrumbs', path: '#' },
])

// Sample Menu Items
const sideMenuItems = ref<MenuItem[]>([
  { id: 'dashboard', label: 'Dashboard', icon: 'pi pi-th-large', path: '/dashboard' },
  {
    id: 'admin',
    label: 'Administration',
    icon: 'pi pi-cog',
    children: [
      { id: 'admin-plans', label: 'Activity Plans', path: '/admin/plans' },
      { id: 'admin-meetings', label: 'Parent Teacher Meeting', path: '/admin/meetings' },
      { id: 'admin-org', label: 'Organization', path: '/admin/org' },
    ],
  },
  {
    id: 'admissions',
    label: 'Admissions',
    icon: 'pi pi-file',
    children: [
      { id: 'admissions-apps', label: 'Applications', path: '/admissions/apps' },
      { id: 'admissions-list', label: 'Admission List', path: '/admissions/list' },
    ],
  },
  { id: 'register', label: 'Person Register', icon: 'pi pi-user', path: '/register' },
])

// Support Menu Items
const supportMenuItems = ref<AccordionItem[]>([
  { label: 'Support Oslo kommun', path: '#' },
  { label: 'Support IST', path: '#' },
  { label: 'Documentation', path: '#' },
  { label: 'Accessibility statement', path: '#' },
])

// Sample hierarchical data for demonstration
const unitOptions = ref<HierarchicalOptions>({
  'Administrator': [
    { id: 'adm-1', name: 'Ekoxens Grundskola' },
    { id: 'adm-2', name: 'External Admin Element' },
    { id: 'adm-3', name: 'Insektskommunen' },
  ],
  'School Admin': [
    { id: 'sa-1', name: 'Ekoxens Grundskola' },
    { id: 'sa-2', name: 'Getingens Gymnasieskola' },
    { id: 'sa-3', name: 'Katedralskolan' },
  ],
  'Unit Admin': [
    { id: 'ua-1', name: 'Lågstadiesskolan' },
    { id: 'ua-2', name: 'Mellanstadieskolan' },
  ],
})

// Methods
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1024
  if (isMobile.value) {
    isMenuCollapsed.value = true
  }
}

// Lifecycle Hooks
onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style>
/* Global styles if needed, e.g., for scrollbar */
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style> 