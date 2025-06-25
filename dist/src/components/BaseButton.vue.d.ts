export interface BaseButtonProps {
    label?: string;
    leftIcon?: string;
    rightIcon?: string;
    badge?: string | number;
    size?: 'small' | 'normal' | 'large';
    disabled?: boolean;
    loading?: boolean;
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'hero';
    /** ARIA label for accessibility */
    ariaLabel?: string;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<BaseButtonProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    click: (event: MouseEvent) => any;
}, string, import('vue').PublicProps, Readonly<BaseButtonProps> & Readonly<{
    onClick?: ((event: MouseEvent) => any) | undefined;
}>, {
    variant: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "hero";
    size: "small" | "large" | "normal";
    disabled: boolean;
    loading: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLButtonElement>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
