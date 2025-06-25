<template>
  <button :disabled="disabled || loading" :class="buttonClass" class="relative" @click="handleClick">
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
}

const props = withDefaults(defineProps<BaseIconButtonProps>(), {
  size: 'normal',
  disabled: false,
  loading: false,
  variant: 'default',
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const buttonClass = computed(() => {
  const baseClasses = 'p-button-unstyled inline-flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-200 disabled:cursor-not-allowed';

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