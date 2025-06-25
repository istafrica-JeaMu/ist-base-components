import { DataTablePageEvent, DataTableSortEvent, DataTableFilterEvent } from 'primevue/datatable';
export interface TableColumn {
    field: string;
    header: string;
    sortable?: boolean;
}
export interface BaseDataTableProps {
    value: any[];
    columns?: TableColumn[];
    title?: string;
    paginator?: boolean;
    rows?: number;
    rowsPerPageOptions?: number[];
    loading?: boolean;
    variant?: 'default' | 'striped';
}
export interface BaseDataTableEmits {
    /** Emitted when page changes */
    'page': [event: DataTablePageEvent];
    /** Emitted when column sorting changes */
    'sort': [event: DataTableSortEvent];
    /** Emitted when filters are applied */
    'filter': [event: DataTableFilterEvent];
}
export interface BaseDataTableSlots {
    /** Custom table header content (overrides title prop) */
    header?: () => any;
    /** Column definitions using PrimeVue Column components */
    default?: () => any;
    /** Custom content when no data is available */
    empty?: () => any;
    /** Custom table footer content */
    footer?: () => any;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<BaseDataTableProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    sort: (event: DataTableSortEvent) => any;
    filter: (event: DataTableFilterEvent) => any;
    page: (event: DataTablePageEvent) => any;
}, string, import('vue').PublicProps, Readonly<BaseDataTableProps> & Readonly<{
    onSort?: ((event: DataTableSortEvent) => any) | undefined;
    onFilter?: ((event: DataTableFilterEvent) => any) | undefined;
    onPage?: ((event: DataTablePageEvent) => any) | undefined;
}>, {
    variant: "default" | "striped";
    loading: boolean;
    paginator: boolean;
    rows: number;
    rowsPerPageOptions: number[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>, {
    header?(_: {}): any;
    empty?(_: {}): any;
    default?(_: {}): any;
    footer?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
