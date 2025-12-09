import { KEvent } from '../types/Events';
type __VLS_Props = {
    events: KEvent[];
    lang?: string;
    canEdit?: boolean;
    canDelete?: boolean;
    withDefaultModal?: boolean;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    delete: (...args: any[]) => void;
    eventClicked: (...args: any[]) => void;
    plusEventCountClicked: (...args: any[]) => void;
    edit: (...args: any[]) => void;
    eventTitleClicked: (...args: any[]) => void;
    nextMonth: (...args: any[]) => void;
    prevMonth: (...args: any[]) => void;
    toToday: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onDelete?: ((...args: any[]) => any) | undefined;
    onEventClicked?: ((...args: any[]) => any) | undefined;
    onPlusEventCountClicked?: ((...args: any[]) => any) | undefined;
    onEdit?: ((...args: any[]) => any) | undefined;
    onEventTitleClicked?: ((...args: any[]) => any) | undefined;
    onNextMonth?: ((...args: any[]) => any) | undefined;
    onPrevMonth?: ((...args: any[]) => any) | undefined;
    onToToday?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLElement>;
export default _default;
