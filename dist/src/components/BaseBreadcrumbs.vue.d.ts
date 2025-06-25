/**
 * @interface BreadcrumbItem
 * @description Defines the structure for a single breadcrumb item.
 * @property {string} label - The text to display for the breadcrumb.
 * @property {string} path - The URL path for the breadcrumb link.
 * @property {string} [icon] - Optional icon for each item
 */
export interface BreadcrumbItem {
    label: string;
    path: string;
    icon?: string;
}
/**
 * @interface BaseBreadcrumbsProps
 * @description Props for the BaseBreadcrumbs component.
 * @property {BreadcrumbItem[]} items - An array of breadcrumb items to display.
 * @property {string} [homeIcon] - The icon to display for the first breadcrumb item (e.g., 'pi pi-home').
 * @property {string} [separatorIcon='pi pi-angle-right'] - The icon to use as a separator between items.
 */
export interface BaseBreadcrumbsProps {
    items: BreadcrumbItem[];
    homeIcon?: string;
    separatorIcon?: string;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<BaseBreadcrumbsProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<BaseBreadcrumbsProps> & Readonly<{}>, {
    homeIcon: string;
    separatorIcon: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLElement>, {
    item?(_: {
        item: BreadcrumbItem;
        index: number;
        active: boolean;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
