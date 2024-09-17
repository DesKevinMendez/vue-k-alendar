import { MonthDays } from '../types/Calendar';
import { KEvent } from '../types/Events';
declare const _default: import('vue').DefineComponent<__VLS_TypePropsToOption<{
    event: KEvent;
    calendar: MonthDays | null;
}>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    eventClicked: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_TypePropsToOption<{
    event: KEvent;
    calendar: MonthDays | null;
}>>> & {
    onEventClicked?: ((...args: any[]) => any) | undefined;
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
