<!--
@component BaseIconButton
@description A compact button component designed specifically for icon-only actions. Provides consistent sizing, styling, and interaction patterns for toolbar buttons, action buttons, and navigation elements.

@rationale Custom implementation using native HTML button element to provide optimal sizing and styling for icon buttons while maintaining accessibility. Built from scratch rather than extending PrimeVue to avoid CSS conflicts and ensure precise control over icon button styling.

@props
- icon (string): PrimeIcon class name to display (e.g., 'pi pi-search')
- badge (boolean | string | number): Badge indicator - true for dot, string/number for content
- size ('small' | 'normal' | 'large'): Button size variant
- disabled (boolean): Whether the button is disabled
- loading (boolean): Whether the button shows loading spinner
- variant ('default' | 'primary' | 'secondary' | 'text'): Visual style variant

@events
- click (MouseEvent): Emitted when button is clicked (not emitted when disabled or loading)

@slots
- No slots (icon-only button)

@usage
<BaseIconButton 
  icon="pi pi-search" 
  size="normal"
  variant="primary"
  :disabled="false"
  @click="handleSearch" 
/>

<!-- With badge -->
<BaseIconButton 
  icon="pi pi-bell" 
  :badge="notificationCount > 0 ? notificationCount : true"
  @click="showNotifications" 
/>
-->
  <template>
    <button 
      :disabled="disabled || loading" 
      :class="buttonClass" 
      class="relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" 
      :aria-label="ariaLabel || `Icon button`"
      :tabindex="disabled ? -1 : tabindex"
      data-testid="base-icon-button"
      @click="handleClick"
    >
    <svg v-if="loading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <i v-if="icon && !loading" :class="icon"></i>
    <BaseBadge
      v-if="badge"
      :value="badge === true ? undefined : badge"
      :size="badge === true ? 'medium' : 'large'"
      severity="danger"
      :class="['absolute -top-1 -right-1', { 'border-2 border-white': badge !== true }]"
    />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseBadge from './BaseBadge.vue';

export interface BaseIconButtonProps {
  icon?: string;
  badge?: boolean | string | number;
  size?: 'small' | 'normal' | 'large';
  disabled?: boolean;
  loading?: boolean;
  variant?: 'default' | 'primary' | 'secondary' | 'text';
  /** ARIA label for accessibility (required for icon-only buttons) */
  ariaLabel?: string;
  /** Tab index for keyboard navigation */
  tabindex?: number;
}

const props = withDefaults(defineProps<BaseIconButtonProps>(), {
  size: 'normal',
  disabled: false,
  loading: false,
  variant: 'default',
  tabindex: 0,
});

export interface BaseIconButtonEmits {
  /** Emitted when button is clicked (not emitted when disabled or loading) */
  'click': [event: MouseEvent]
}

export interface BaseIconButtonSlots {
  // No slots - icon-only button
}

const emit = defineEmits<BaseIconButtonEmits>();

  const buttonClass = computed(() => {
    const baseClasses = 'p-button-unstyled inline-flex items-center justify-center rounded-lg transition-all duration-200 disabled:cursor-not-allowed';

  const variantClasses = {
    default: 'bg-white text-text border border-border hover:bg-accent/10 active:bg-accent/20 disabled:bg-light/30 disabled:text-muted',
    primary: 'bg-primary text-white border-primary border hover:bg-primary-dark active:bg-primary-darker disabled:bg-primary/50',
    secondary: 'bg-dark text-white border-dark border hover:brightness-125 active:brightness-150 disabled:bg-dark/50',
    text: 'bg-transparent text-text hover:bg-accent/10 active:bg-accent/20 disabled:text-muted',
  };
  
  const sizeClasses = {
    small: 'h-8 w-8 text-sm',
    normal: 'h-input w-input text-base',
    large: 'h-12 w-12 text-lg',
  };

  return [
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size]
  ].join(' ');
});

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script> 