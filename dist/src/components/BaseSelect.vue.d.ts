export interface BaseSelectProps {
    /** The selected value for v-model binding */
    modelValue?: any;
    /** Array of options to select from */
    options?: any[];
    /** Property name to use as the label of an option */
    optionLabel?: string;
    /** Property name to use as the value of an option */
    optionValue?: string;
    /** Placeholder text when no option is selected */
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
    /** Visual variant of the component */
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    /** Size variant of the component */
    size?: 'small' | 'normal' | 'large';
}
export interface BaseSelectEmits {
    /** Emitted when the selected value changes */
    'update:modelValue': [value: any];
    /** Emitted when selection changes with the new value */
    'change': [event: {
        originalEvent: Event;
        value: any;
    }];
    /** Emitted when the component gains focus */
    'focus': [event: Event];
    /** Emitted when the component loses focus */
    'blur': [event: Event];
}
export interface BaseSelectSlots {
    /** Custom template for dropdown options */
    option?: (props: {
        option: any;
        selected: boolean;
    }) => any;
    /** Custom template for selected value display */
    selected?: (props: {
        value: any;
        option: any;
    }) => any;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<BaseSelectProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    blur: (event: Event) => any;
    change: (event: {
        originalEvent: Event;
        value: any;
    }) => any;
    focus: (event: Event) => any;
    "update:modelValue": (value: any) => any;
}, string, import('vue').PublicProps, Readonly<BaseSelectProps> & Readonly<{
    onBlur?: ((event: Event) => any) | undefined;
    onChange?: ((event: {
        originalEvent: Event;
        value: any;
    }) => any) | undefined;
    onFocus?: ((event: Event) => any) | undefined;
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}>, {
    variant: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    invalid: boolean;
    label: string;
    size: "small" | "large" | "normal";
    disabled: boolean;
    modelValue: any;
    errorMessage: string;
    helpText: string;
    options: any[];
    placeholder: string;
    optionLabel: string;
    optionValue: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    container: HTMLDivElement;
}, HTMLDivElement>, {
    selected?(_: {
        value: any;
        option: any;
    }): any;
    option?(_: {
        option: any;
        selected: boolean;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
