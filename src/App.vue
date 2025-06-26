<template>
  <div class="flex h-screen bg-gray-100 font-sans">
    <!-- Side Menu: Enhanced with props-first approach -->
    <BaseSideMenu
      class="flex-shrink-0"
      :menu-items="sideMenuItems"
      :collapsed="isMenuCollapsed"
      :is-mobile="isMobile"
      logo-src="/ist-logo.jpeg"
      logo-alt="IST Logo"
      title="IST"
      subtitle="Childcare"
      :footer-items="supportMenuItems"
      footer-title="Support / Documentation"
      :footer-show-title="false"
      :footer-expandable="true"
      :footer-default-expanded="false"
      variant="default"
      size="normal"
      @update:collapsed="isMenuCollapsed = $event"
      @footer-toggle="onFooterToggle"
    />

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
      <main class="flex-1 overflow-y-auto ist-scrollbar">
        <ComponentGallery />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BaseSideMenu, { type FooterItem } from './components/BaseSideMenu.vue'
import type { MenuItem } from 'primevue/menuitem'
import BaseHeader from './components/BaseHeader.vue'
import BaseBreadcrumbs from './components/BaseBreadcrumbs.vue'
import BaseInput from './components/BaseInput.vue'
import BaseIconButton from './components/BaseIconButton.vue'
import BaseHierarchicalSelect, { type HierarchicalOptions, type SelectedHierarchicalValue } from './components/BaseHierarchicalSelect.vue'
// BaseAccordion import removed - no longer needed for simple footer
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

// Sample Menu Items - PrimeVue MenuItem format with submenu icons
const sideMenuItems = ref<MenuItem[]>([
  { 
    label: 'Dashboard', 
    icon: 'pi pi-th-large', 
    route: '/dashboard' 
  },
  {
    label: 'Administration',
    icon: 'pi pi-cog',
    items: [
      { label: 'Activity Plans', icon: 'pi pi-calendar', route: '/admin/plans' },
      { label: 'Parent Teacher Meeting', icon: 'pi pi-users', route: '/admin/meetings' },
      { label: 'Organization', icon: 'pi pi-building', route: '/admin/org' },
    ],
  },
  {
    label: 'Admissions',
    icon: 'pi pi-file',
    items: [
      { label: 'Applications', icon: 'pi pi-file-edit', route: '/admissions/apps' },
      { label: 'Admission List', icon: 'pi pi-list', route: '/admissions/list' },
    ],
  },
  { 
    label: 'Person Register', 
    icon: 'pi pi-user', 
    route: '/register' 
  },
])

// Support Menu Items - simplified footer links (no accordion needed)
const supportMenuItems = ref<FooterItem[]>([
  { label: 'Support Oslo kommun', url: 'https://oslo.kommune.no/support', icon: 'pi pi-headphones' },
  { label: 'Support IST', url: 'https://ist.no/support', icon: 'pi pi-question-circle' },
  { label: 'Documentation', url: 'https://docs.ist.no', icon: 'pi pi-book' },
  { label: 'Accessibility', url: 'https://ist.no/accessibility', icon: 'pi pi-eye' },
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

const onFooterToggle = (expanded: boolean) => {
  console.log('Footer toggled:', expanded)
  // Handle footer toggle state if needed
  // This could be used to store user preference or track analytics
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
/* Global styles for app */
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Use IST-BEM scrollbar utility for conflict-free styling */
/* The .ist-scrollbar class is defined in ist-bem-utilities.css */
/* Apply to main content area */
main.ist-scrollbar::-webkit-scrollbar {
  width: 6px;
}

main.ist-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

main.ist-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

main.ist-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style> 