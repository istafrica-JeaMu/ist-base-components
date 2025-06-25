<!--
@component BaseBreadcrumbs
@description A component to display a breadcrumb navigation trail.
-->
<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex items-center gap-1">
      <li v-for="(item, index) in items" :key="index" class="flex items-center">
        <slot name="item" :item="item" :index="index" :active="index === items.length - 1">
          <!-- Default rendering if no slot is provided -->
          <component
            :is="index < items.length - 1 ? 'a' : 'span'"
            :href="index < items.length - 1 ? item.path : undefined"
            :class="[
              'flex items-center text-sm',
              index < items.length - 1
                ? 'font-normal text-dark/70 transition-colors duration-200 hover:text-dark'
                : 'font-semibold text-dark',
            ]"
            :aria-current="index === items.length - 1 ? 'page' : undefined"
          >
            <i v-if="homeIcon && index === 0" :class="[homeIcon, 'mr-1 text-sm']" />
            {{ item.label }}
          </component>
        </slot>

        <!-- Separator -->
        <i
          v-if="index < items.length - 1 && separatorIcon"
          :class="[separatorIcon, 'mx-1 text-[10px] text-dark/70']"
        />
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
/**
 * @interface BreadcrumbItem
 * @description Defines the structure for a single breadcrumb item.
 * @property {string} label - The text to display for the breadcrumb.
 * @property {string} path - The URL path for the breadcrumb link.
 * @property {string} [icon] - Optional icon for each item
 */
export interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: string;
}

/**
 * @interface BaseBreadcrumbsProps
 * @description Props for the BaseBreadcrumbs component.
 * @property {BreadcrumbItem[]} items - An array of breadcrumb items to display.
 * @property {string} [homeIcon] - The icon to display for the first breadcrumb item (e.g., 'pi pi-home').
 * @property {string} [separatorIcon='pi pi-angle-right'] - The icon to use as a separator between items.
 */
export interface BaseBreadcrumbsProps {
  items: BreadcrumbItem[];
  homeIcon?: string;
  separatorIcon?: string;
}

withDefaults(defineProps<BaseBreadcrumbsProps>(), {
  homeIcon: 'pi pi-home',
  separatorIcon: 'pi pi-angle-right',
});
</script> 