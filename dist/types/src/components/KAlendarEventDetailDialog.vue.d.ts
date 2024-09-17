import { MonthDays } from '../types/Calendar';
import { KEvent } from '../types/Events';
declare let __VLS_typeProps: {
    event: KEvent | null;
    calendar: MonthDays | null;
    canEdit?: boolean;
    canDelete?: boolean;
};
type __VLS_PublicProps = {
    modelValue?: boolean;
} & typeof __VLS_typeProps;
declare const _default: import('vue').DefineComponent<__VLS_TypePropsToOption<__VLS_PublicProps>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (modelValue: boolean) => void;
    delete: (...args: any[]) => void;
    eventClicked: (...args: any[]) => void;
    edit: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_TypePropsToOption<__VLS_PublicProps>>> & {
    "onUpdate:modelValue"?: ((modelValue: boolean) => any) | undefined;
    onEventClicked?: ((...args: any[]) => any) | undefined;
    onDelete?: ((...args: any[]) => any) | undefined;
    onEdit?: ((...args: any[]) => any) | undefined;
}, {}, {}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
