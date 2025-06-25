export interface BaseIconButtonProps {
    icon?: string;
    badge?: boolean | string | number;
    size?: 'small' | 'normal' | 'large';
    disabled?: boolean;
    loading?: boolean;
    variant?: 'default' | 'primary' | 'secondary' | 'text';
    /** ARIA label for accessibility (required for icon-only buttons) */
    ariaLabel?: string;
    /** Tab index for keyboard navigation */
    tabindex?: number;
}
export interface BaseIconButtonEmits {
    /** Emitted when button is clicked (not emitted when disabled or loading) */
    'click': [event: MouseEvent];
}
export interface BaseIconButtonSlots {
}
declare const _default: import('vue').DefineComponent<BaseIconButtonProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    click: (event: MouseEvent) => any;
}, string, import('vue').PublicProps, Readonly<BaseIconButtonProps> & Readonly<{
    onClick?: ((event: MouseEvent) => any) | undefined;
}>, {
    variant: "default" | "text" | "primary" | "secondary";
    size: "small" | "large" | "normal";
    disabled: boolean;
    loading: boolean;
    tabindex: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLButtonElement>;
export default _default;
