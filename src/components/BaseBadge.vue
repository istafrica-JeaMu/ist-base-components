<template>
  <span :class="badgeClass">
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