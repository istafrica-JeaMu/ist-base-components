/**
 * @name Tab
 * @description Defines the structure for a single tab item.
 */
export interface Tab {
    title: string;
    icon: string;
}
/**
 * @name Props
 * @description Defines the properties for the BaseTabs component.
 */
export interface BaseTabsProps {
    /**
     * An array of tab objects to display.
     * @type {Tab[]}
     * @required
     */
    tabs: Tab[];
    /**
     * The index of the currently active tab.
     * @type {number}
     * @default 0
     */
    modelValue: number;
}
/**
 * @name Emits
 * @description Defines the custom events emitted by the BaseTabs component.
 */
export interface BaseTabsEmits {
    /**
     * Emitted when the active tab changes.
     * @param {number} value The new active tab index.
     */
    (e: 'update:modelValue', value: number): void;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<BaseTabsProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (value: number) => any;
}, string, import('vue').PublicProps, Readonly<BaseTabsProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
}>, {
    modelValue: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>, Partial<Record<`panel-${number}`, (_: {}) => any>>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
