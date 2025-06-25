export interface MenuItem {
    id: string;
    label: string;
    icon?: string;
    path?: string;
    children?: MenuItem[];
}
export interface BaseSideMenuProps {
    menuItems: MenuItem[];
    collapsed?: boolean;
    defaultActiveId?: string;
    defaultExpandedIds?: string[];
    isMobile?: boolean;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<BaseSideMenuProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:collapsed": (...args: any[]) => void;
    navigate: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<BaseSideMenuProps> & Readonly<{
    "onUpdate:collapsed"?: ((...args: any[]) => any) | undefined;
    onNavigate?: ((...args: any[]) => any) | undefined;
}>, {
    collapsed: boolean;
    defaultExpandedIds: string[];
    isMobile: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLElement>, {
    logo?(_: {}): any;
    title?(_: {}): any;
    item?(_: any): any;
    footer?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
