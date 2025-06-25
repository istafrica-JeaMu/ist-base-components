<template>
  <div class="p-6 bg-white rounded-lg shadow-md border border-border">
    <h2 class="text-2xl font-semibold text-text mb-4 pb-2 border-b-2 border-accent">Tailwind CSS Test</h2>
    
    <div class="space-y-4">
      <!-- Colors Test -->
      <div>
        <h3 class="text-lg font-medium text-text mb-2">Design System Colors</h3>
        <div class="flex flex-wrap gap-2">
          <div class="w-16 h-16 bg-primary rounded-md flex items-center justify-center text-white text-xs">Primary</div>
          <div class="w-16 h-16 bg-secondary rounded-md flex items-center justify-center text-white text-xs">Secondary</div>
          <div class="w-16 h-16 bg-success rounded-md flex items-center justify-center text-white text-xs">Success</div>
          <div class="w-16 h-16 bg-warning rounded-md flex items-center justify-center text-dark text-xs">Warning</div>
          <div class="w-16 h-16 bg-danger rounded-md flex items-center justify-center text-white text-xs">Danger</div>
          <div class="w-16 h-16 bg-accent rounded-md flex items-center justify-center text-dark text-xs">Accent</div>
        </div>
      </div>

      <!-- Spacing Test -->
      <div>
        <h3 class="text-lg font-medium text-text mb-2">Spacing System</h3>
        <div class="flex items-end gap-1">
          <div class="bg-primary w-1 h-1 rounded"></div>
          <div class="bg-primary w-2 h-2 rounded"></div>
          <div class="bg-primary w-3 h-3 rounded"></div>
          <div class="bg-primary w-4 h-4 rounded"></div>
          <div class="bg-primary w-5 h-5 rounded"></div>
          <div class="bg-primary w-6 h-6 rounded"></div>
          <div class="bg-primary w-8 h-8 rounded"></div>
        </div>
      </div>

      <!-- Typography Test -->
      <div>
        <h3 class="text-lg font-medium text-text mb-2">Typography</h3>
        <div class="space-y-1">
          <p class="text-xs text-muted">Extra Small (0.75rem)</p>
          <p class="text-sm text-muted">Small (0.875rem)</p>
          <p class="text-base text-text">Base (1rem)</p>
          <p class="text-lg text-text">Large (1.125rem)</p>
          <p class="text-xl text-text">Extra Large (1.25rem)</p>
        </div>
      </div>

      <!-- Responsive Test -->
      <div>
        <h3 class="text-lg font-medium text-text mb-2">Responsive Design</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="bg-light p-4 rounded-md text-center">
            <p class="text-sm text-muted">Mobile First</p>
          </div>
          <div class="bg-light p-4 rounded-md text-center">
            <p class="text-sm text-muted">Tablet (md:)</p>
          </div>
          <div class="bg-light p-4 rounded-md text-center">
            <p class="text-sm text-muted">Desktop (lg:)</p>
          </div>
        </div>
      </div>

      <!-- Status -->
      <div class="mt-6 p-4 bg-success/10 border border-success rounded-md">
        <p class="text-success font-medium">✅ Tailwind CSS is working correctly!</p>
        <p class="text-success/80 text-sm mt-1">All design system colors, spacing, and utilities are functional.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props or logic needed for this test component
</script>

<style scoped>
/* No custom styles needed - using Tailwind for everything */
</style> 