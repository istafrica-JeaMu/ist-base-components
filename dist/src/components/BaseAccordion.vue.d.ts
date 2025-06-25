export interface AccordionItem {
    label: string;
    path: string;
}
export interface BaseAccordionProps {
    title: string;
    items: AccordionItem[];
    variant?: 'card' | 'transparent';
    headerClass?: string;
    titleClass?: string;
    iconClass?: string;
}
export interface BaseAccordionSlots {
    header?: (props: {
        title: string;
        active: boolean;
    }) => any;
    item?: (props: {
        item: AccordionItem;
    }) => any;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<BaseAccordionProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<BaseAccordionProps> & Readonly<{}>, {
    variant: "card" | "transparent";
    headerClass: string;
    titleClass: string;
    iconClass: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>, {
    header?(_: {
        title: string;
        active: boolean;
    }): any;
    item?(_: {
        item: AccordionItem;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
