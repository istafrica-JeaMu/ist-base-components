<!--
@component BaseAccordion
@description A flexible, styleable accordion component for collapsible content.

@rationale The `BaseAccordion` extends PrimeVue's `Accordion` to leverage its robust accessibility and state management. Customization is achieved primarily through props (`headerClass`, `titleClass`, `iconClass`) which allows for flexible, context-aware styling using Tailwind CSS. The `#header` slot is retained for cases requiring a completely different DOM structure, but prop-based styling is the preferred approach for consistency.

@props
- `title` (string): The title to display in the accordion header.
- `items` (AccordionItem[]): An array of items with `label` and `path` to display in the accordion body.
- `variant` ('card' | 'transparent'): The container style. 'card' has a border and shadow, 'transparent' is flush. Defaults to 'card'.
- `headerClass` (string): Custom CSS classes for the header container element.
- `titleClass` (string): Custom CSS classes for the title text element.
- `iconClass` (string): Custom CSS classes for the chevron icon element.

@slots
- `header` (scope: { title: string, active: boolean }): For overriding the header with custom DOM structure.
- `item` (scope: { item: AccordionItem }): Custom rendering for each item in the body.

@usage
<BaseAccordion
  title="Support"
  :items="supportItems"
  variant="transparent"
  headerClass="flex items-center h-[35px] px-4 group"
  titleClass="text-sm font-medium"
  iconClass="pi-chevron-down text-[10px] ml-auto"
/>
-->
<template>
  <Accordion :pt="passThrough" :lazy="true">
    <AccordionTab :pt="passThroughTab">
      <template #header>
        <slot name="header" :title="title" :active="false">
          <!-- Default header, styleable via props -->
          <div :class="headerClass">
            <span :class="titleClass">{{ title }}</span>
            <i
              class="pi pi-chevron-down transition-transform duration-200"
              :class="iconClass"
            />
          </div>
        </slot>
      </template>
      <ul class="space-y-3">
        <li v-for="(item, index) in items" :key="index">
          <slot name="item" :item="item">
            <a
              :href="item.path"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2.5 text-sm text-dark/80 hover:text-primary transition-colors duration-200"
            >
              <i class="pi pi-external-link text-xs text-muted" />
              <span>{{ item.label }}</span>
            </a>
          </slot>
        </li>
      </ul>
    </AccordionTab>
  </Accordion>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'

export interface AccordionItem {
  label: string;
  path: string;
}

export interface BaseAccordionProps {
  title: string;
  items: AccordionItem[];
  variant?: 'card' | 'transparent';
  headerClass?: string;
  titleClass?: string;
  iconClass?: string;
}

export interface BaseAccordionSlots {
  header?: (props: { title: string; active: boolean }) => any;
  item?: (props: { item: AccordionItem }) => any;
}

const props = withDefaults(defineProps<BaseAccordionProps>(), {
  variant: 'card',
  headerClass: 'flex items-center justify-between w-full p-3', // Default fallback style
  titleClass: '',
  iconClass: '',
})

// Main component styling
const passThrough = computed(() => ({
  root: {
    class: {
      'border border-border rounded-md shadow-sm bg-white': props.variant === 'card',
      'bg-transparent': props.variant === 'transparent',
    },
  },
}))

// Tab styling to remove all default PrimeVue header styling
const passThroughTab = {
  root: 'overflow-hidden',
  header: 'border-b-0', // Remove border from header container
  headerAction: {
    class: '!p-0 !border-none !bg-transparent', // Remove all padding, border, and background
  },
  headerIcon: {
    class: 'hidden', // Hide PrimeVue's default icon
  },
  content: {
    class: 'p-3 text-dark/80 !border-t-0', // Remove top border from content
  },
}
</script>

<style scoped>
/* Styling is handled via props or slots. */
</style> 