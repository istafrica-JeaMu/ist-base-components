export type ChipVariant = 'default' | 'accent';
/**
 * @name Props
 * @description Defines the properties for the BaseChip component.
 */
export interface BaseChipProps {
    /**
     * The text to display inside the chip.
     * @type {string}
     * @required
     */
    label: string;
    /**
     * The icon to display on the left side of the chip.
     * Uses PrimeIcons (e.g., 'pi pi-user').
     * @type {string}
     * @optional
     */
    icon?: string;
    /**
     * Whether the chip can be removed (displays a remove icon).
     * @type {boolean}
     * @default false
     */
    removable?: boolean;
    /**
     * The visual style of the chip.
     * @type {'default' | 'accent'}
     * @default 'accent'
     */
    variant?: ChipVariant;
}
/**
 * @name Emits
 * @description Defines the custom events emitted by the BaseChip component.
 */
export interface BaseChipEmits {
    /**
     * Emitted when the remove icon is clicked.
     */
    (e: 'remove'): void;
}
declare const _default: import('vue').DefineComponent<BaseChipProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    remove: () => any;
}, string, import('vue').PublicProps, Readonly<BaseChipProps> & Readonly<{
    onRemove?: (() => any) | undefined;
}>, {
    variant: ChipVariant;
    removable: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
