export interface BaseTextareaProps {
    modelValue?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    rows?: number;
    cols?: number;
    maxlength?: number;
    invalid?: boolean;
    errorMessage?: string;
    helpText?: string;
    showCharCount?: boolean;
    /** ARIA label for accessibility */
    ariaLabel?: string;
}
declare const _default: import('vue').DefineComponent<BaseTextareaProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: string) => any;
}, string, import('vue').PublicProps, Readonly<BaseTextareaProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {
    invalid: boolean;
    required: boolean;
    disabled: boolean;
    modelValue: string;
    rows: number;
    showCharCount: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
