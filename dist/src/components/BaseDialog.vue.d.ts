import { BaseButtonProps } from './BaseButton.vue';
export interface BaseDialogProps {
    visible: boolean;
    modal?: boolean;
    header?: string;
    closable?: boolean;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmVariant?: BaseButtonProps['variant'];
    loading?: boolean;
    size?: 'small' | 'normal' | 'large';
}
export interface BaseDialogEmits {
    (e: 'update:visible', value: boolean): void;
    (e: 'confirm'): void;
    (e: 'cancel'): void;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<BaseDialogProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    cancel: () => any;
    "update:visible": (value: boolean) => any;
    confirm: () => any;
}, string, import('vue').PublicProps, Readonly<BaseDialogProps> & Readonly<{
    onCancel?: (() => any) | undefined;
    "onUpdate:visible"?: ((value: boolean) => any) | undefined;
    onConfirm?: (() => any) | undefined;
}>, {
    header: string;
    size: "small" | "large" | "normal";
    loading: boolean;
    modal: boolean;
    closable: boolean;
    confirmLabel: string;
    cancelLabel: string;
    confirmVariant: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "hero";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>, {
    header?(_: {}): any;
    default?(_: {}): any;
    actions?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
