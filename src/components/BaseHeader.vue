<!--
@component BaseHeader
@description A flexible application header component with left, center, and right content areas. Provides consistent height, styling, and layout structure for application navigation and branding.

@rationale Custom implementation using semantic HTML and Tailwind CSS to provide maximum flexibility for header content while maintaining consistent design system compliance. No PrimeVue component needed as this is a pure layout component.

@props
- No props required (purely slot-driven layout component)

@events
- No custom events emitted (content-specific events handled by slotted components)

@slots
- left: Left-aligned content area (typically logo, menu toggle, or navigation)
- center: Center-aligned content area (typically search or main navigation)
- right: Right-aligned content area (typically user menu, notifications, or actions)

@usage
<BaseHeader>
  <template #left>
    <img src="/logo.png" alt="Company Logo" class="h-8" />
    <BaseButton icon="pi-bars" @click="toggleMenu" />
  </template>
  <template #center>
    <BaseInput placeholder="Search..." icon="pi-search" />
  </template>
  <template #right>
    <BaseIconButton icon="pi-bell" aria-label="Notifications" />
    <BaseButton>Profile</BaseButton>
  </template>
</BaseHeader>
-->
  <template>
    <header 
      class="bg-white border-b border-border shadow-sm h-16 flex items-center justify-between px-6"
      role="banner"
      aria-label="Application header"
      data-testid="base-header"
    >
    <!-- Left Section -->
    <div class="flex items-center gap-4">
      <slot name="left" />
    </div>

    <!-- Right Aligned Section -->
    <div class="flex items-center gap-6">
      <slot name="center" />
      <slot name="right" />
    </div>
  </header>
</template>

<script setup lang="ts">
// This component is now a pure layout component.
// All content and logic should be provided via slots from the parent.

export interface BaseHeaderProps {
  // No props are needed for this purely layout-driven component.
}

export interface BaseHeaderEmits {
  // No custom events emitted - content-specific events handled by slotted components
}

export interface BaseHeaderSlots {
  /** Left-aligned content area (typically logo, menu toggle, or navigation) */
  left?: () => any
  /** Center-aligned content area (typically search or main navigation) */
  center?: () => any
  /** Right-aligned content area (typically user menu, notifications, or actions) */
  right?: () => any
}

defineProps<BaseHeaderProps>();
</script>

<style scoped>
/* Custom scrollbar for notifications */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(252, 211, 77, 0.3);
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(252, 211, 77, 0.5);
}
</style> 