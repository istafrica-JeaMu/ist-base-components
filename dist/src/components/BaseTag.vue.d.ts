import { TagProps } from 'primevue/tag';
/**
 * @name Props
 * @description Defines the properties for the BaseTag component.
 */
export interface BaseTagProps extends /* @vue-ignore */ TagProps {
    /**
     * The text to display inside the tag.
     * @type {string}
     * @optional
     */
    value?: string;
    /**
     * The icon to display on the left side of the tag.
     * @type {string}
     * @optional
     */
    icon?: string;
    /**
     * The severity level which determines the tag's color scheme.
     * @type {'secondary' | 'success' | 'warning' | 'danger' | 'info'}
     * @optional
     */
    severity?: 'secondary' | 'success' | 'warning' | 'danger' | 'info';
    /**
     * Whether the tag should be displayed as a pill.
     * @type {boolean}
     * @optional
     */
    rounded?: boolean;
}
declare const _default: import('vue').DefineComponent<BaseTagProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<BaseTagProps> & Readonly<{}>, {
    severity: "secondary" | "success" | "warning" | "danger" | "info";
    rounded: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
