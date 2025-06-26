export interface BaseMessageProps {
    severity?: 'success' | 'info' | 'warn' | 'danger';
    title: string;
    icon?: string;
    closable?: boolean;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<BaseMessageProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    close: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<BaseMessageProps> & Readonly<{
    onClose?: ((...args: any[]) => any) | undefined;
}>, {
    severity: "success" | "danger" | "info" | "warn";
    closable: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
