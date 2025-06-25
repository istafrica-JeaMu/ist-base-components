export interface BaseInputProps {
    modelValue?: string | number;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    icon?: string;
    iconPosition?: 'left' | 'right';
    invalid?: boolean;
    errorMessage?: string;
    helpText?: string;
    /** ARIA label for accessibility */
    ariaLabel?: string;
    /** Required field indicator */
    required?: boolean;
}
declare const _default: import('vue').DefineComponent<BaseInputProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (value: string | number) => any;
    "icon-click": () => any;
}, string, import('vue').PublicProps, Readonly<BaseInputProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
    "onIcon-click"?: (() => any) | undefined;
}>, {
    invalid: boolean;
    disabled: boolean;
    modelValue: string | number;
    iconPosition: "left" | "right";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
