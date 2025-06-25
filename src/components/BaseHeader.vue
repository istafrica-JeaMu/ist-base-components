<template>
  <header class="bg-white border-b border-border shadow-sm h-16 flex items-center justify-between px-6">
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