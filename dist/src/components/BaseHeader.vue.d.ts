export interface BaseHeaderProps {
}
export interface BaseHeaderEmits {
}
export interface BaseHeaderSlots {
    /** Left-aligned content area (typically logo, menu toggle, or navigation) */
    left?: () => any;
    /** Center-aligned content area (typically search or main navigation) */
    center?: () => any;
    /** Right-aligned content area (typically user menu, notifications, or actions) */
    right?: () => any;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<BaseHeaderProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<BaseHeaderProps> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLElement>, {
    left?(_: {}): any;
    center?(_: {}): any;
    right?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
