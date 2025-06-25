<!--
@component BaseBadge
@description A small notification badge component for displaying counts, status indicators, or simple notifications. Supports various sizes, colors, and can display icons or text content.

@rationale Custom implementation using Tailwind CSS to provide precise control over badge styling and positioning. Built from scratch to ensure consistent design system compliance and optimal performance for small UI elements.

@props
- value (number | string): The content to display in the badge (numbers >99 show as "99+")
- icon (string): PrimeIcon class name to display instead of text content
- size ('small' | 'medium' | 'large'): Size variant of the badge
- pill (boolean): Whether to use pill-shaped (fully rounded) styling
- severity ('primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'accent'): Color scheme

@events
- No custom events emitted (display-only component)

@slots
- default: Custom content (used for large size when no icon is provided)

@usage
<!-- Number badge -->
<BaseBadge :value="42" severity="danger" size="large" />

<!-- Icon badge -->
<BaseBadge icon="pi pi-check" severity="success" size="medium" />

<!-- Dot indicator -->
<BaseBadge severity="primary" size="small" />
-->
  <template>
    <span 
      :class="badgeClass"
      data-testid="base-badge"
      :aria-label="value ? `Badge with value ${value}` : 'Badge indicator'"
    >
    <i v-if="icon" :class="icon" />
    <slot v-else-if="props.size === 'large'">{{ displayValue }}</slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface BaseBadgeProps {
  value?: number | string;
  icon?: string;
  size?: 'small' | 'medium' | 'large';
  pill?: boolean;
  severity?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'accent';
}

export interface BaseBadgeEmits {
  // No custom events emitted - display-only component
}

export interface BaseBadgeSlots {
  /** Custom content (used for large size when no icon is provided) */
  default?: () => any
}

const props = withDefaults(defineProps<BaseBadgeProps>(), {
  size: 'large',
  pill: true,
  severity: 'danger',
});

const displayValue = computed(() => {
  if (typeof props.value === 'number' && props.value > 99) {
    return '99+';
  }
  return props.value;
});

const badgeClass = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center font-bold leading-none';

  const sizeClasses = {
    small: 'w-2 h-2',
    medium: 'w-2.5 h-2.5',
    large: 'min-w-[1rem] h-4 px-1 text-xs',
  };

  const iconSizeClasses = {
    small: 'text-[8px]',
    medium: 'text-[10px]',
    large: 'text-xs',
  };

  const shapeClasses = props.pill ? 'rounded-full' : 'rounded-md';

  const severityClasses = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-dark',
    danger: 'bg-danger text-white',
    info: 'bg-info text-white',
    accent: 'bg-accent text-dark',
  };
  
  const classes = [
    baseClasses,
    sizeClasses[props.size],
    shapeClasses,
    severityClasses[props.severity],
  ];
  
  // Add icon-specific classes
  if (props.icon) {
    classes.push('flex items-center justify-center');
    classes.push(iconSizeClasses[props.size]);
    if (props.size === 'small') classes.push('w-3 h-3');
    if (props.size === 'medium') classes.push('w-4 h-4');
    if (props.size === 'large') classes.push('w-5 h-5');
  }

  // Add w-4 if the badge is large and has a single character value
  if (props.size === 'large' && props.value && String(props.value).length === 1) {
    classes.push('w-4');
  }

  return classes.join(' ');
});
</script> 