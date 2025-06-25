export interface BaseBadgeProps {
    value?: number | string;
    icon?: string;
    size?: 'small' | 'medium' | 'large';
    pill?: boolean;
    severity?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'accent';
}
export interface BaseBadgeEmits {
}
export interface BaseBadgeSlots {
    /** Custom content (used for large size when no icon is provided) */
    default?: () => any;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<BaseBadgeProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<BaseBadgeProps> & Readonly<{}>, {
    size: "small" | "medium" | "large";
    pill: boolean;
    severity: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "accent";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLSpanElement>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
