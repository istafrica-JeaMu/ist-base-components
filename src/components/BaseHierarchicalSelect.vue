<!--
@component BaseHierarchicalSelect
@description A flexible hierarchical dropdown component for selecting items from nested data structures.
@rationale: Custom implementation due to complex hierarchical data handling and search functionality that would be difficult to achieve with PrimeVue's standard dropdown components.
@props: modelValue, options, placeholder, searchPlaceholder, emptyMessage, disabled, loading, optionLabel, optionValue, optionIcon
@events: update:modelValue, change, search
@slots: option, empty, loading
@usage: <BaseHierarchicalSelect v-model="selected" :options="hierarchicalData" />
-->
<template>
  <div class="relative w-full" ref="container">
    <button
      @click="toggleDropdown"
      :disabled="disabled || loading"
      class="w-full flex items-center justify-between bg-white border border-border rounded-md px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-200 disabled:bg-light/30 disabled:text-muted disabled:cursor-not-allowed"
      :class="{ 'border-accent': isOpen, 'hover:border-accent/50': !disabled && !loading }"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      :aria-label="placeholder"
    >
      <div class="flex items-center gap-2 text-dark min-w-0 flex-1">
        <i v-if="optionIcon" :class="[optionIcon, 'text-muted flex-shrink-0']" />
        <span class="truncate">{{ displayValue }}</span>
      </div>
      <div class="flex items-center gap-2 flex-shrink-0">
        <div v-if="loading" class="w-4 h-4">
          <svg class="animate-spin h-4 w-4 text-muted" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <i
          v-else
          class="pi pi-chevron-down text-muted text-xs transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
        />
      </div>
    </button>

    <div
      v-if="isOpen"
      class="absolute z-50 top-full mt-1 w-full bg-white border border-border rounded-md shadow-lg max-h-80 overflow-hidden"
    >
      <!-- Search Input -->
      <div class="p-2 border-b border-border">
        <div class="relative">
          <i class="pi pi-search absolute top-1/2 left-3 -translate-y-1/2 text-muted text-sm" />
          <input
            ref="searchInput"
            type="text"
            v-model="searchQuery"
            :placeholder="searchPlaceholder"
            class="w-full h-8 pl-9 pr-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-accent/50 text-sm"
            @input="handleSearch"
          />
        </div>
      </div>

      <!-- Options List -->
      <div class="max-h-64 overflow-y-auto">
        <slot name="loading" v-if="loading">
          <div class="p-4 text-center text-muted text-sm">
            <i class="pi pi-spinner animate-spin mr-2" />
            Loading...
          </div>
        </slot>
        
        <slot name="empty" v-else-if="!hasOptions">
          <div class="p-4 text-center text-muted text-sm">
            {{ emptyMessage }}
          </div>
        </slot>
        
        <ul v-else class="py-1">
          <li v-for="(children, parent) in filteredOptions" :key="parent">
            <button
              @click="toggleParent(parent)"
              class="w-full flex items-center justify-between px-4 h-8 text-sm text-left text-dark/80 hover:bg-accent/10 transition-colors duration-200"
              :class="{ 'font-medium text-dark': expandedParent === parent }"
            >
              <span class="truncate">{{ parent }}</span>
              <i
                class="pi pi-chevron-down text-muted text-xs transition-transform duration-200 flex-shrink-0"
                :class="{ 'rotate-180': expandedParent === parent }"
              />
            </button>
            <ul v-if="expandedParent === parent" class="bg-light/30">
              <li v-for="child in children" :key="getOptionValue(child)">
                <button
                  @click="selectItem(parent, child)"
                  class="w-full text-left flex items-center gap-2 pl-8 pr-4 h-8 text-sm text-dark hover:bg-accent/10 transition-colors duration-200"
                  :class="{ 'bg-accent/10 font-medium': isSelected(child) }"
                >
                  <div class="w-4 flex items-center justify-center flex-shrink-0">
                    <slot name="option" :item="child" :selected="isSelected(child)">
                      <i
                        class="pi text-sm"
                        :class="[isSelected(child) ? 'pi-check text-dark' : 'pi-circle text-muted']"
                      />
                    </slot>
                  </div>
                  <span class="truncate">{{ getOptionLabel(child) }}</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';

export interface HierarchicalOption {
  [key: string]: any;
}

export interface HierarchicalOptions {
  [parent: string]: HierarchicalOption[];
}

export interface SelectedHierarchicalValue {
  parent: string;
  child: HierarchicalOption;
}

export interface BaseHierarchicalSelectProps {
  modelValue: SelectedHierarchicalValue | null;
  options: HierarchicalOptions;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  loading?: boolean;
  optionLabel?: (option: HierarchicalOption) => string;
  optionValue?: (option: HierarchicalOption) => string | number;
  optionIcon?: string;
}

const props = withDefaults(defineProps<BaseHierarchicalSelectProps>(), {
  placeholder: 'Select an option',
  searchPlaceholder: 'Search options...',
  emptyMessage: 'No options available',
  disabled: false,
  loading: false,
  optionLabel: (option: HierarchicalOption) => option.name || option.label || String(option),
  optionValue: (option: HierarchicalOption) => option.id || option.value || String(option),
  optionIcon: 'pi pi-building',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: SelectedHierarchicalValue | null): void;
  (e: 'change', value: SelectedHierarchicalValue | null): void;
  (e: 'search', query: string): void;
}>();

const isOpen = ref(false);
const searchQuery = ref('');
const expandedParent = ref<string | null>(null);
const container = ref<HTMLElement | null>(null);
const searchInput = ref<HTMLInputElement | null>(null);

const filteredOptions = computed(() => {
  if (!searchQuery.value) {
    return props.options;
  }
  
  const lowerCaseQuery = searchQuery.value.toLowerCase();
  const result: HierarchicalOptions = {};

  for (const parent in props.options) {
    const filteredChildren = props.options[parent].filter(child =>
      props.optionLabel(child).toLowerCase().includes(lowerCaseQuery) ||
      parent.toLowerCase().includes(lowerCaseQuery)
    );
    if (filteredChildren.length > 0) {
      result[parent] = filteredChildren;
    }
  }
  return result;
});

const hasOptions = computed(() => {
  return Object.keys(filteredOptions.value).length > 0;
});

const displayValue = computed(() => {
  if (props.modelValue) {
    return `${props.modelValue.parent} - ${props.optionLabel(props.modelValue.child)}`;
  }
  return props.placeholder;
});

const getOptionLabel = (option: HierarchicalOption): string => {
  return props.optionLabel(option);
};

const getOptionValue = (option: HierarchicalOption): string | number => {
  return props.optionValue(option);
};

const isSelected = (child: HierarchicalOption): boolean => {
  return Boolean(props.modelValue?.child && getOptionValue(props.modelValue.child) === getOptionValue(child));
};

const toggleDropdown = () => {
  if (props.disabled || props.loading) return;
  
  isOpen.value = !isOpen.value;
  
  if (isOpen.value) {
    nextTick(() => {
      searchInput.value?.focus();
    });
  }
};

const closeDropdown = () => {
  isOpen.value = false;
  searchQuery.value = '';
  expandedParent.value = null;
};

const toggleParent = (parent: string | number) => {
  const parentStr = String(parent);
  if (expandedParent.value === parentStr) {
    expandedParent.value = null;
  } else {
    expandedParent.value = parentStr;
  }
};

const selectItem = (parent: string, child: HierarchicalOption) => {
  const value = { parent, child };
  emit('update:modelValue', value);
  emit('change', value);
  closeDropdown();
};

const handleSearch = () => {
  emit('search', searchQuery.value);
};

const handleClickOutside = (event: MouseEvent) => {
  if (container.value && !container.value.contains(event.target as Node)) {
    closeDropdown();
  }
};

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) {
    closeDropdown();
  }
};

onMounted(() => {
  if (props.modelValue?.parent) {
    expandedParent.value = props.modelValue.parent;
  }
  document.addEventListener('click', handleClickOutside, true);
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true);
  document.removeEventListener('keydown', handleEscape);
});

watch(() => props.modelValue, (newValue) => {
  if (newValue?.parent) {
    expandedParent.value = newValue.parent;
  }
});
</script> 