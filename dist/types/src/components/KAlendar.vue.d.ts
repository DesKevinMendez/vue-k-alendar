import { KEvent } from '../types/Events';
declare const _default: import('vue').DefineComponent<__VLS_TypePropsToOption<{
    events: KEvent[];
    tz?: string | undefined;
    lang?: string | undefined;
    canEdit?: boolean | undefined;
    canDelete?: boolean | undefined;
}>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    delete: (...args: any[]) => void;
    nextMonth: (...args: any[]) => void;
    prevMonth: (...args: any[]) => void;
    toToday: (...args: any[]) => void;
    eventClicked: (...args: any[]) => void;
    edit: (...args: any[]) => void;
    eventTitleClicked: (...args: any[]) => void;
    eventDialogClicked: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_TypePropsToOption<{
    events: KEvent[];
    tz?: string | undefined;
    lang?: string | undefined;
    canEdit?: boolean | undefined;
    canDelete?: boolean | undefined;
}>>> & {
    onEventClicked?: ((...args: any[]) => any) | undefined;
    onDelete?: ((...args: any[]) => any) | undefined;
    onEdit?: ((...args: any[]) => any) | undefined;
    onEventTitleClicked?: ((...args: any[]) => any) | undefined;
    onNextMonth?: ((...args: any[]) => any) | undefined;
    onPrevMonth?: ((...args: any[]) => any) | undefined;
    onToToday?: ((...args: any[]) => any) | undefined;
    onEventDialogClicked?: ((...args: any[]) => any) | undefined;
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
