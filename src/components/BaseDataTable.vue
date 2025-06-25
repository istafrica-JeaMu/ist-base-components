<template>
  <DataTable
    :value="value"
    :paginator="paginator"
    :rows="rows"
    :rowsPerPageOptions="rowsPerPageOptions"
    :loading="loading"
    :pt="passThrough"
    @page="handlePage"
    @sort="handleSort"
    @filter="handleFilter"
  >
    <template #header v-if="$slots.header || title">
      <slot name="header">
        <h3 class="m-0 text-xl font-semibold text-text">{{ title }}</h3>
      </slot>
    </template>

    <template #empty>
      <slot name="empty">
        <div class="p-8 text-center text-muted">No data found.</div>
      </slot>
    </template>

    <!-- Allow slot-based column definition -->
    <slot>
      <!-- Fallback to props-based column rendering -->
      <Column
        v-if="!$slots.default && columns"
        v-for="column in columns"
        :key="column.field"
        :field="column.field"
        :header="column.header"
        :sortable="column.sortable"
      />
    </slot>

    <template #footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DataTable, { type DataTablePageEvent, type DataTableSortEvent, type DataTableFilterEvent } from 'primevue/datatable'
import Column from 'primevue/column'

export interface TableColumn {
  field: string
  header: string
  sortable?: boolean
}

export interface BaseDataTableProps {
  value: any[]
  columns?: TableColumn[]
  title?: string
  paginator?: boolean
  rows?: number
  rowsPerPageOptions?: number[]
  loading?: boolean
  variant?: 'default' | 'striped'
}

const props = withDefaults(defineProps<BaseDataTableProps>(), {
  paginator: false,
  rows: 10,
  rowsPerPageOptions: () => [10, 25, 50],
  loading: false,
  variant: 'default',
})

const emit = defineEmits<{
  (e: 'page', event: DataTablePageEvent): void
  (e: 'sort', event: DataTableSortEvent): void
  (e: 'filter', event: DataTableFilterEvent): void
}>()

const handlePage = (event: DataTablePageEvent) => emit('page', event)
const handleSort = (event: DataTableSortEvent) => emit('sort', event)
const handleFilter = (event: DataTableFilterEvent) => emit('filter', event)

const passThrough = computed(() => ({
  root: {
    class: 'bg-white border border-border rounded-lg shadow-sm overflow-hidden',
  },
  header: {
    class: 'p-4 bg-gradient-to-r from-light to-border/50 border-b border-border',
  },
  table: {
    class: 'w-full',
  },
  thead: ({ props }: { props: any }) => ({
    class: [
      'bg-light',
      props.showGridlines ? 'border-b border-border' : '',
    ],
  }),
  tbody: ({ props }: { props: any }) => ({
    class: [
      {
        'divide-y divide-border': props.showGridlines,
        'striped': props.stripedRows,
      },
      props.variant === 'striped' ? 'striped' : '',
    ],
  }),
  column: {
    headercell: {
      class: 'p-4 text-left text-sm font-semibold text-text',
    },
    bodycell: {
      class: 'p-4 text-sm text-text',
    },
  },
  paginator: {
    root: {
      class: 'bg-light border-t border-border p-4 flex items-center justify-between',
    },
    pageButton: ({ context }: { context: any }) => ({
      class: [
        'w-8 h-8 rounded-md mx-0.5 transition-colors duration-200',
        context.active ? 'bg-primary text-white' : 'hover:bg-border',
      ],
    }),
  },
}))
</script>

<style scoped>
:deep(.striped .p-datatable-tbody > tr:nth-child(even)) {
  @apply bg-light/60;
}
</style> 