export interface BaseCardProps {
    title?: string;
    subtitle?: string;
    padding?: 'none' | 'small' | 'normal' | 'large';
    /** ARIA label for accessibility */
    ariaLabel?: string;
}
export interface BaseCardEmits {
}
export interface BaseCardSlots {
    /** Custom header content (overrides title/subtitle when used) */
    header?: () => any;
    /** Main card body content */
    default?: () => any;
    /** Action buttons or controls displayed in the header */
    actions?: () => any;
    /** Footer content with pre-styled button container */
    footer?: () => any;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<BaseCardProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<BaseCardProps> & Readonly<{}>, {
    padding: "small" | "large" | "normal" | "none";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>, {
    header?(_: {}): any;
    actions?(_: {}): any;
    default?(_: {}): any;
    footer?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
