export interface BaseMultiSelectProps {
    /** The selected values array for v-model binding */
    modelValue?: any[];
    /** Array of options to select from */
    options?: any[];
    /** Property name to use as the label of an option */
    optionLabel?: string;
    /** Property name to use as the value of an option */
    optionValue?: string;
    /** Placeholder text when no items are selected */
    placeholder?: string;
    /** Label text displayed above the component */
    label?: string;
    /** Whether the component is disabled */
    disabled?: boolean;
    /** Whether the component has validation errors */
    invalid?: boolean;
    /** Error message to display when invalid */
    errorMessage?: string;
    /** Helper text displayed below the component */
    helpText?: string;
    /** Whether to show a filter input in the dropdown */
    filter?: boolean;
    /** Placeholder for the filter input */
    filterPlaceholder?: string;
    /** Maximum number of selected labels to show before displaying count */
    maxSelectedLabels?: number;
    /** Maximum number of items that can be selected */
    selectionLimit?: number;
    /** Width of the component - can be Tailwind width class or 'full' for 100% */
    width?: string;
    /** Minimum width of the component */
    minWidth?: string;
    /** Maximum width of the component */
    maxWidth?: string;
}
export interface BaseMultiSelectEmits {
    /** Emitted when the selected values change */
    'update:modelValue': [value: any[]];
    /** Emitted when selection changes with the new value */
    'change': [event: {
        originalEvent: Event;
        value: any[];
    }];
    /** Emitted when the component gains focus */
    'focus': [event: Event];
    /** Emitted when the component loses focus */
    'blur': [event: Event];
    /** Emitted when the filter text changes */
    'filter': [event: {
        originalEvent: Event;
        value: string;
    }];
}
export interface BaseMultiSelectSlots {
    /** Custom template for dropdown options */
    option?: (props: {
        option: any;
        selected: boolean;
    }) => any;
    /** Custom template for selected value chips */
    chip?: (props: {
        value: any;
        index: number;
        remove: () => void;
    }) => any;
    /** Custom header content in dropdown */
    header?: (props: {
        value: any[];
        options: any[];
    }) => any;
    /** Custom footer content in dropdown */
    footer?: (props: {
        value: any[];
        options: any[];
    }) => any;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<BaseMultiSelectProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    blur: (event: Event) => any;
    change: (event: {
        originalEvent: Event;
        value: any[];
    }) => any;
    focus: (event: Event) => any;
    filter: (event: {
        originalEvent: Event;
        value: string;
    }) => any;
    "update:modelValue": (value: any[]) => any;
}, string, import('vue').PublicProps, Readonly<BaseMultiSelectProps> & Readonly<{
    onBlur?: ((event: Event) => any) | undefined;
    onChange?: ((event: {
        originalEvent: Event;
        value: any[];
    }) => any) | undefined;
    onFocus?: ((event: Event) => any) | undefined;
    onFilter?: ((event: {
        originalEvent: Event;
        value: string;
    }) => any) | undefined;
    "onUpdate:modelValue"?: ((value: any[]) => any) | undefined;
}>, {
    invalid: boolean;
    filter: boolean;
    label: string;
    disabled: boolean;
    modelValue: any[];
    errorMessage: string;
    helpText: string;
    options: any[];
    placeholder: string;
    optionLabel: string;
    optionValue: string;
    filterPlaceholder: string;
    maxSelectedLabels: number;
    selectionLimit: number;
    width: string;
    minWidth: string;
    maxWidth: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    container: HTMLDivElement;
    filterInput: HTMLInputElement;
}, HTMLDivElement>, {
    chip?(_: {
        value: any;
        index: number;
        remove: () => void;
    }): any;
    header?(_: {
        value: any[];
        options: any[];
    }): any;
    option?(_: {
        option: any;
        selected: boolean;
    }): any;
    footer?(_: {
        value: any[];
        options: any[];
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
