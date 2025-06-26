export interface BaseButtonProps {
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'hero';
    size?: 'small' | 'normal' | 'large';
    label?: string;
    leftIcon?: string;
    rightIcon?: string;
    badge?: string | number;
    disabled?: boolean;
    loading?: boolean;
    ariaLabel?: string;
    customClass?: string;
    customStyle?: Record<string, string | number>;
}
export interface BaseButtonEmits {
    click: [event: MouseEvent];
    focus: [event: FocusEvent];
    blur: [event: FocusEvent];
}
export interface BaseButtonSlots {
    default?: () => any;
    prefix?: () => any;
    suffix?: () => any;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<BaseButtonProps, {
    buttonClasses: import('vue').ComputedRef<string[]>;
    variantClasses: import('vue').ComputedRef<string>;
    sizeClasses: import('vue').ComputedRef<string>;
    stateClasses: import('vue').ComputedRef<"" | "opacity-50 disabled:cursor-not-allowed" | "cursor-wait">;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    blur: (event: FocusEvent) => any;
    click: (event: MouseEvent) => any;
    focus: (event: FocusEvent) => any;
}, string, import('vue').PublicProps, Readonly<BaseButtonProps> & Readonly<{
    onBlur?: ((event: FocusEvent) => any) | undefined;
    onClick?: ((event: MouseEvent) => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
}>, {
    variant: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "hero";
    label: string;
    size: "small" | "large" | "normal";
    leftIcon: string;
    rightIcon: string;
    badge: string | number;
    disabled: boolean;
    loading: boolean;
    ariaLabel: string;
    customClass: string;
    customStyle: Record<string, string | number>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLButtonElement>, {
    prefix?(_: {}): any;
    default?(_: {}): any;
    suffix?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
