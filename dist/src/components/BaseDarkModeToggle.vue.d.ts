export interface BaseDarkModeToggleProps {
    size?: 'small' | 'normal' | 'large';
    variant?: 'default' | 'icon-only';
}
export interface BaseDarkModeToggleEmits {
    toggle: [isDark: boolean];
}
declare const _default: import('vue').DefineComponent<BaseDarkModeToggleProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    toggle: (isDark: boolean) => any;
}, string, import('vue').PublicProps, Readonly<BaseDarkModeToggleProps> & Readonly<{
    onToggle?: ((isDark: boolean) => any) | undefined;
}>, {
    variant: "default" | "icon-only";
    size: "small" | "large" | "normal";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLButtonElement>;
export default _default;
