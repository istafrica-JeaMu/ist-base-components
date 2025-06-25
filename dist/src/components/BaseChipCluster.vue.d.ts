/**
 * @name Props
 * @description Defines the properties for the BaseChipCluster component.
 */
export interface BaseChipClusterProps {
    /**
     * The currently selected chip values.
     * @type {string[]}
     * @required
     */
    modelValue: string[];
    /**
     * An array of strings to display as chips.
     * @type {string[]}
     * @required
     */
    options: string[];
}
/**
 * @name Emits
 * @description Defines the custom events emitted by the BaseChipCluster component.
 */
export interface BaseChipClusterEmits {
    /**
     * Emitted when a chip is selected or deselected.
     * @param {string[]} value The new array of selected values.
     */
    (e: 'update:modelValue', value: string[]): void;
}
declare const _default: import('vue').DefineComponent<BaseChipClusterProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (value: string[]) => any;
}, string, import('vue').PublicProps, Readonly<BaseChipClusterProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
