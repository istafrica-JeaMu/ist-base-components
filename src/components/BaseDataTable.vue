<!--
@component BaseDataTable
@description A comprehensive data table component with pagination, sorting, filtering, and customizable columns. Built on PrimeVue's DataTable with custom styling and enhanced functionality.

@rationale Extends PrimeVue's DataTable component to leverage its robust data handling, accessibility features, and complex functionality (pagination, sorting, filtering) while applying custom Tailwind styling through PassThrough API for design system compliance.

@props
- value (any[]): Array of data objects to display in the table
- columns (TableColumn[]): Column configuration array (optional, can use slot-based columns)
- title (string): Optional title displayed in the table header
- paginator (boolean): Whether to enable pagination controls
- rows (number): Number of rows per page when pagination is enabled
- rowsPerPageOptions (number[]): Available rows per page options
- loading (boolean): Whether to show loading state
- variant ('default' | 'striped'): Visual style variant

@events
- page (DataTablePageEvent): Emitted when page changes
- sort (DataTableSortEvent): Emitted when column sorting changes  
- filter (DataTableFilterEvent): Emitted when filters are applied

@slots
- header: Custom table header content (overrides title prop)
- default: Column definitions using PrimeVue Column components
- empty: Custom content when no data is available
- footer: Custom table footer content

@usage
<BaseDataTable 
  :value="tableData" 
  :columns="columnConfig"
  title="User Management"
  :paginator="true"
  :rows="10"
  @page="handlePageChange"
>
  <template #empty>
    <div class="text-center py-8">No users found</div>
  </template>
</BaseDataTable>
-->
  <template>
    <DataTable
      :value="value"
      :paginator="paginator"
      :rows="rows"
      :rowsPerPageOptions="rowsPerPageOptions"
      :loading="loading"
      :pt="passThrough"
      role="table"
      :aria-label="title || 'Data table'"
      :aria-busy="loading"
      data-testid="base-data-table"
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

export interface BaseDataTableEmits {
  /** Emitted when page changes */
  'page': [event: DataTablePageEvent]
  /** Emitted when column sorting changes */
  'sort': [event: DataTableSortEvent]
  /** Emitted when filters are applied */
  'filter': [event: DataTableFilterEvent]
}

export interface BaseDataTableSlots {
  /** Custom table header content (overrides title prop) */
  header?: () => any
  /** Column definitions using PrimeVue Column components */
  default?: () => any
  /** Custom content when no data is available */
  empty?: () => any
  /** Custom table footer content */
  footer?: () => any
}

const emit = defineEmits<BaseDataTableEmits>()

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