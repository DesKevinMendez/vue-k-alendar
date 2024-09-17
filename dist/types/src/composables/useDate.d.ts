import { DateTimeFormatOptions } from 'luxon';
export default function useDate(): {
    formatDate: (date: string, formatStr: DateTimeFormatOptions) => string;
    today: import('vue').ComputedRef<string>;
    timezone: import('vue').Ref<any, any>;
};
