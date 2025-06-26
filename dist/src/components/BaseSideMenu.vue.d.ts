import { MenuItem } from 'primevue/menuitem';
export interface FooterItem {
    label: string;
    url: string;
    icon?: string;
}
export interface BaseSideMenuProps {
    menuItems: MenuItem[];
    collapsed?: boolean;
    isMobile?: boolean;
    logoSrc?: string;
    logoAlt?: string;
    logoClass?: string;
    title?: string;
    subtitle?: string;
    footerItems?: FooterItem[];
    footerTitle?: string;
    footerShowTitle?: boolean;
    footerExpandable?: boolean;
    footerDefaultExpanded?: boolean;
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    size?: 'small' | 'normal' | 'large';
}
export interface BaseSideMenuEmits {
    'update:collapsed': [value: boolean];
    'footer-toggle': [expanded: boolean];
}
export interface BaseSideMenuSlots {
    logo?: () => any;
    title?: () => any;
    footer?: () => any;
    item?: (props: {
        item: MenuItem;
        props: any;
        hasSubmenu: boolean;
        root: boolean;
        collapsed: boolean;
    }) => any;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<BaseSideMenuProps, {
    toggleCollapse: () => void;
    toggleFooter: () => void;
    isCollapsed: import('vue').ComputedRef<boolean>;
    isFooterExpanded: import('vue').ComputedRef<boolean>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:collapsed": (value: boolean) => any;
    "footer-toggle": (expanded: boolean) => any;
}, string, import('vue').PublicProps, Readonly<BaseSideMenuProps> & Readonly<{
    "onUpdate:collapsed"?: ((value: boolean) => any) | undefined;
    "onFooter-toggle"?: ((expanded: boolean) => any) | undefined;
}>, {
    title: string;
    variant: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    size: "small" | "large" | "normal";
    subtitle: string;
    collapsed: boolean;
    isMobile: boolean;
    logoAlt: string;
    logoClass: string;
    footerTitle: string;
    footerShowTitle: boolean;
    footerExpandable: boolean;
    footerDefaultExpanded: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLElement>, {
    logo?(_: {}): any;
    title?(_: {}): any;
    footer?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
