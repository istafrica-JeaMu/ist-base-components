export interface BaseCheckboxProps {
    /** The value for v-model binding */
    modelValue?: boolean | any[];
    /** The value to be used in checkbox group */
    value?: any;
    /** The label text displayed next to the checkbox */
    label?: string;
    /** Whether the checkbox is disabled */
    disabled?: boolean;
    /** Whether the checkbox is readonly */
    readonly?: boolean;
    /** Whether the checkbox is required for form validation */
    required?: boolean;
    /** Whether the checkbox has validation errors */
    invalid?: boolean;
    /** Error message to display when invalid */
    errorMessage?: string;
    /** Helper text displayed below the checkbox */
    helpText?: string;
    /** Visual variant of the checkbox */
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    /** Size variant of the checkbox */
    size?: 'small' | 'normal' | 'large';
    /** Whether the checkbox is in indeterminate state */
    indeterminate?: boolean;
    /** Name attribute for form integration */
    name?: string;
    /** Tab index for keyboard navigation */
    tabindex?: number;
    /** ARIA label for accessibility */
    ariaLabel?: string;
    /** ARIA described by for accessibility */
    ariaDescribedby?: string;
}
export interface BaseCheckboxEmits {
    /** Emitted when the checkbox value changes */
    'update:modelValue': [value: boolean | any[]];
    /** Emitted when the checkbox state changes */
    'change': [event: {
        originalEvent: Event;
        value: any;
        checked: boolean;
    }];
    /** Emitted when the checkbox gains focus */
    'focus': [event: Event];
    /** Emitted when the checkbox loses focus */
    'blur': [event: Event];
}
export interface BaseCheckboxSlots {
    /** Custom template for the checkbox label */
    label?: () => any;
    /** Custom template for help text */
    help?: () => any;
    /** Custom template for error message */
    error?: () => any;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<BaseCheckboxProps, {
    focus: () => void;
    blur: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    blur: (event: Event) => any;
    change: (event: {
        originalEvent: Event;
        value: any;
        checked: boolean;
    }) => any;
    focus: (event: Event) => any;
    "update:modelValue": (value: boolean | any[]) => any;
}, string, import('vue').PublicProps, Readonly<BaseCheckboxProps> & Readonly<{
    onBlur?: ((event: Event) => any) | undefined;
    onChange?: ((event: {
        originalEvent: Event;
        value: any;
        checked: boolean;
    }) => any) | undefined;
    onFocus?: ((event: Event) => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean | any[]) => any) | undefined;
}>, {
    variant: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    invalid: boolean;
    required: boolean;
    tabindex: number;
    size: "small" | "large" | "normal";
    disabled: boolean;
    modelValue: boolean | any[];
    readonly: boolean;
    indeterminate: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>, {
    label?(_: {}): any;
    help?(_: {}): any;
    error?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
