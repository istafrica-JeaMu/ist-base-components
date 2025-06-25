import { MenuItem } from './BaseSideMenu.vue';
export interface SideMenuItemProps {
    item: MenuItem;
    level: number;
    collapsed: boolean;
    activeItemId: string | null;
    expandedItems: string[];
}
export interface SideMenuItemEmits {
    /** Emitted when a menu item is clicked */
    'item-click': [item: MenuItem];
}
export interface SideMenuItemSlots {
    /** Custom template for menu item rendering with item data and state */
    item?: (props: {
        item: MenuItem;
        active: boolean;
        expanded: boolean;
        level: number;
    }) => any;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<SideMenuItemProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "item-click": (item: MenuItem) => any;
}, string, import('vue').PublicProps, Readonly<SideMenuItemProps> & Readonly<{
    "onItem-click"?: ((item: MenuItem) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLLIElement>, {
    item?(_: {
        item: MenuItem;
        active: boolean;
        expanded: boolean | undefined;
        level: number;
    }): any;
    item?(_: any): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
