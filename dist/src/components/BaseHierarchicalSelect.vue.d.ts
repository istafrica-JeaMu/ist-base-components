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
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<BaseHierarchicalSelectProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    search: (query: string) => any;
    change: (value: SelectedHierarchicalValue | null) => any;
    "update:modelValue": (value: SelectedHierarchicalValue | null) => any;
}, string, import('vue').PublicProps, Readonly<BaseHierarchicalSelectProps> & Readonly<{
    onSearch?: ((query: string) => any) | undefined;
    onChange?: ((value: SelectedHierarchicalValue | null) => any) | undefined;
    "onUpdate:modelValue"?: ((value: SelectedHierarchicalValue | null) => any) | undefined;
}>, {
    disabled: boolean;
    loading: boolean;
    placeholder: string;
    searchPlaceholder: string;
    emptyMessage: string;
    optionLabel: (option: HierarchicalOption) => string;
    optionValue: (option: HierarchicalOption) => string | number;
    optionIcon: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    container: HTMLDivElement;
    searchInput: HTMLInputElement;
}, HTMLDivElement>, {
    loading?(_: {}): any;
    empty?(_: {}): any;
    option?(_: {
        item: HierarchicalOption;
        selected: boolean;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
