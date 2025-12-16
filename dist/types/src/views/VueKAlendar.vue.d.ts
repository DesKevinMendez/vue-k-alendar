import { View } from '../types/Calendar';
import { KEvent } from '../types/Events';
type __VLS_Props = {
    events: KEvent[];
    lang?: string;
    view?: View;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    day: (...args: any[]) => void;
    events: (...args: any[]) => void;
    event: (...args: any[]) => void;
    date: (...args: any[]) => void;
    nextMonth: (...args: any[]) => void;
    prevMonth: (...args: any[]) => void;
    toToday: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onDay?: ((...args: any[]) => any) | undefined;
    onEvents?: ((...args: any[]) => any) | undefined;
    onEvent?: ((...args: any[]) => any) | undefined;
    onDate?: ((...args: any[]) => any) | undefined;
    onNextMonth?: ((...args: any[]) => any) | undefined;
    onPrevMonth?: ((...args: any[]) => any) | undefined;
    onToToday?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLElement>;
export default _default;
