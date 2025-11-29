type __VLS_Props = {
    canEdit?: boolean;
    canDelete?: boolean;
};
type __VLS_PublicProps = {
    modelValue?: boolean;
} & __VLS_Props;
declare const _default: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    delete: (...args: any[]) => void;
    eventClicked: (...args: any[]) => void;
    edit: (...args: any[]) => void;
    eventTitleClicked: (...args: any[]) => void;
    "update:modelValue": (value: boolean) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onDelete?: ((...args: any[]) => any) | undefined;
    onEventClicked?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onEdit?: ((...args: any[]) => any) | undefined;
    onEventTitleClicked?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDialogElement>;
export default _default;
