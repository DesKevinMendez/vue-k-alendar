import { DayCalendar, MonthDays } from '../types/Calendar';
import { KEvent } from '../types/Events';
import { DateTime, Interval } from 'luxon';
export default function useRenderCalendar(emit: (event: "nextMonth" | "prevMonth" | "toToday", ...args: any) => void): {
    nextMonth: () => void;
    prevMonth: () => void;
    eventsToShowInCalendar: import('vue').Ref<{
        id: string;
        title: string;
        start_date: string;
        end_date?: string | null | undefined;
        description: string;
        autor?: string | undefined;
        color?: string | undefined;
    }[], KEvent[] | {
        id: string;
        title: string;
        start_date: string;
        end_date?: string | null | undefined;
        description: string;
        autor?: string | undefined;
        color?: string | undefined;
    }[]>;
    toToday: () => void;
    title: import('vue').ComputedRef<string>;
    monthDays: import('vue').Ref<{
        day: string;
        class: string;
        events: {
            id: string;
            title: string;
            start_date: string;
            end_date?: string | null | undefined;
            description: string;
            autor?: string | undefined;
            color?: string | undefined;
        }[];
        text: string;
    }[], MonthDays[] | {
        day: string;
        class: string;
        events: {
            id: string;
            title: string;
            start_date: string;
            end_date?: string | null | undefined;
            description: string;
            autor?: string | undefined;
            color?: string | undefined;
        }[];
        text: string;
    }[]>;
    getWeekDays: () => string[];
    generateCalendar: (date: string) => DayCalendar[];
    currentDate: import('vue').Ref<{
        get: (unit: keyof DateTime<boolean>) => number;
        getPossibleOffsets: () => DateTime<true>[];
        readonly isValid: true;
        readonly invalidReason: null;
        readonly invalidExplanation: null;
        readonly locale: string;
        readonly numberingSystem: string;
        readonly outputCalendar: string;
        readonly zone: {
            readonly type: string;
            readonly name: string;
            readonly isUniversal: boolean;
            offsetName: (ts: number, options: import('luxon').ZoneOffsetOptions) => string;
            formatOffset: (ts: number, format: import('luxon').ZoneOffsetFormat) => string;
            offset: (ts: number) => number;
            equals: (other: import('luxon').Zone<boolean>) => boolean;
            readonly isValid: true;
        };
        readonly zoneName: string;
        readonly year: number;
        readonly quarter: import('luxon').QuarterNumbers;
        readonly month: import('luxon').MonthNumbers;
        readonly day: import('luxon').DayNumbers;
        readonly hour: import('luxon').HourNumbers;
        readonly minute: import('luxon').SecondNumbers;
        readonly second: import('luxon').SecondNumbers;
        readonly millisecond: number;
        readonly weekYear: number;
        readonly weekNumber: import('luxon').WeekNumbers;
        readonly weekday: import('luxon').WeekdayNumbers;
        readonly isWeekend: boolean;
        readonly localWeekday: import('luxon').WeekdayNumbers;
        readonly localWeekNumber: number;
        readonly localWeekYear: number;
        readonly ordinal: number;
        readonly monthShort: string;
        readonly monthLong: string;
        readonly weekdayShort: string;
        readonly weekdayLong: string;
        readonly offset: number;
        readonly offsetNameShort: string;
        readonly offsetNameLong: string;
        readonly isOffsetFixed: boolean;
        readonly isInDST: boolean;
        readonly isInLeapYear: boolean;
        readonly daysInMonth: import('luxon').PossibleDaysInMonth;
        readonly daysInYear: import('luxon').PossibleDaysInYear;
        readonly weeksInWeekYear: import('luxon').PossibleWeeksInYear;
        readonly weeksInLocalWeekYear: import('luxon').PossibleWeeksInYear;
        resolvedLocaleOptions: (opts?: Intl.DateTimeFormatOptions | import('luxon').LocaleOptions | undefined) => Required<import('luxon').LocaleOptions>;
        toUTC: (offset?: number | undefined, opts?: import('luxon').ZoneOptions | undefined) => DateTime<true>;
        toLocal: () => DateTime<true>;
        setZone: (zone?: string | import('luxon').Zone<boolean> | undefined, opts?: import('luxon').ZoneOptions | undefined) => DateTime<true> | DateTime<false>;
        reconfigure: (properties: import('luxon').LocaleOptions) => DateTime<true>;
        setLocale: (locale: string) => DateTime<true>;
        set: (values: import('luxon').DateObjectUnits) => DateTime<true>;
        plus: (duration: import('luxon').DurationLike) => DateTime<true>;
        minus: (duration: import('luxon').DurationLike) => DateTime<true>;
        startOf: (unit: import('luxon').DateTimeUnit, opts?: import('luxon')._UseLocaleWeekOption | undefined) => DateTime<true>;
        endOf: (unit: import('luxon').DateTimeUnit, opts?: import('luxon')._UseLocaleWeekOption | undefined) => DateTime<true>;
        toFormat: (fmt: string, opts?: import('luxon').LocaleOptions | undefined) => string;
        toLocaleString: (formatOpts?: Intl.DateTimeFormatOptions | undefined, opts?: import('luxon').LocaleOptions | undefined) => string;
        toLocaleParts: (opts?: Intl.DateTimeFormatOptions | undefined) => Intl.DateTimeFormatPart[];
        toISO: (opts?: import('luxon').ToISOTimeOptions | undefined) => string;
        toISODate: (opts?: import('luxon').ToISODateOptions | undefined) => string;
        toISOWeekDate: () => string;
        toISOTime: (opts?: import('luxon').ToISOTimeOptions | undefined) => string;
        toRFC2822: () => string;
        toHTTP: () => string;
        toSQLDate: () => string;
        toSQLTime: (opts?: import('luxon').ToSQLOptions | undefined) => string;
        toSQL: (opts?: import('luxon').ToSQLOptions | undefined) => string;
        toString: () => string;
        valueOf: () => number;
        toMillis: () => number;
        toSeconds: () => number;
        toUnixInteger: () => number;
        toJSON: () => string;
        toBSON: () => Date;
        toObject: <IncludeConfig extends boolean | undefined>(opts?: {
            includeConfig?: IncludeConfig | undefined;
        } | undefined) => import('luxon')._ToObjectOutput<IncludeConfig>;
        toJSDate: () => Date;
        diff: (otherDateTime: DateTime<boolean>, unit?: import('luxon').DurationUnits | undefined, opts?: import('luxon').DiffOptions | undefined) => import('luxon').Duration<true>;
        diffNow: (unit?: import('luxon').DurationUnits | undefined, opts?: import('luxon').DiffOptions | undefined) => import('luxon').Duration<true>;
        until: (otherDateTime: DateTime<boolean>) => Interval<true>;
        hasSame: (otherDateTime: DateTime<boolean>, unit: import('luxon').DateTimeUnit, opts?: import('luxon')._UseLocaleWeekOption | undefined) => boolean;
        equals: (other: DateTime<boolean>) => boolean;
        toRelative: (options?: import('luxon').ToRelativeOptions | undefined) => string;
        toRelativeCalendar: (options?: import('luxon').ToRelativeCalendarOptions | undefined) => string;
    }, DateTime<true> | {
        get: (unit: keyof DateTime<boolean>) => number;
        getPossibleOffsets: () => DateTime<true>[];
        readonly isValid: true;
        readonly invalidReason: null;
        readonly invalidExplanation: null;
        readonly locale: string;
        readonly numberingSystem: string;
        readonly outputCalendar: string;
        readonly zone: {
            readonly type: string;
            readonly name: string;
            readonly isUniversal: boolean;
            offsetName: (ts: number, options: import('luxon').ZoneOffsetOptions) => string;
            formatOffset: (ts: number, format: import('luxon').ZoneOffsetFormat) => string;
            offset: (ts: number) => number;
            equals: (other: import('luxon').Zone<boolean>) => boolean;
            readonly isValid: true;
        };
        readonly zoneName: string;
        readonly year: number;
        readonly quarter: import('luxon').QuarterNumbers;
        readonly month: import('luxon').MonthNumbers;
        readonly day: import('luxon').DayNumbers;
        readonly hour: import('luxon').HourNumbers;
        readonly minute: import('luxon').SecondNumbers;
        readonly second: import('luxon').SecondNumbers;
        readonly millisecond: number;
        readonly weekYear: number;
        readonly weekNumber: import('luxon').WeekNumbers;
        readonly weekday: import('luxon').WeekdayNumbers;
        readonly isWeekend: boolean;
        readonly localWeekday: import('luxon').WeekdayNumbers;
        readonly localWeekNumber: number;
        readonly localWeekYear: number;
        readonly ordinal: number;
        readonly monthShort: string;
        readonly monthLong: string;
        readonly weekdayShort: string;
        readonly weekdayLong: string;
        readonly offset: number;
        readonly offsetNameShort: string;
        readonly offsetNameLong: string;
        readonly isOffsetFixed: boolean;
        readonly isInDST: boolean;
        readonly isInLeapYear: boolean;
        readonly daysInMonth: import('luxon').PossibleDaysInMonth;
        readonly daysInYear: import('luxon').PossibleDaysInYear;
        readonly weeksInWeekYear: import('luxon').PossibleWeeksInYear;
        readonly weeksInLocalWeekYear: import('luxon').PossibleWeeksInYear;
        resolvedLocaleOptions: (opts?: Intl.DateTimeFormatOptions | import('luxon').LocaleOptions | undefined) => Required<import('luxon').LocaleOptions>;
        toUTC: (offset?: number | undefined, opts?: import('luxon').ZoneOptions | undefined) => DateTime<true>;
        toLocal: () => DateTime<true>;
        setZone: (zone?: string | import('luxon').Zone<boolean> | undefined, opts?: import('luxon').ZoneOptions | undefined) => DateTime<true> | DateTime<false>;
        reconfigure: (properties: import('luxon').LocaleOptions) => DateTime<true>;
        setLocale: (locale: string) => DateTime<true>;
        set: (values: import('luxon').DateObjectUnits) => DateTime<true>;
        plus: (duration: import('luxon').DurationLike) => DateTime<true>;
        minus: (duration: import('luxon').DurationLike) => DateTime<true>;
        startOf: (unit: import('luxon').DateTimeUnit, opts?: import('luxon')._UseLocaleWeekOption | undefined) => DateTime<true>;
        endOf: (unit: import('luxon').DateTimeUnit, opts?: import('luxon')._UseLocaleWeekOption | undefined) => DateTime<true>;
        toFormat: (fmt: string, opts?: import('luxon').LocaleOptions | undefined) => string;
        toLocaleString: (formatOpts?: Intl.DateTimeFormatOptions | undefined, opts?: import('luxon').LocaleOptions | undefined) => string;
        toLocaleParts: (opts?: Intl.DateTimeFormatOptions | undefined) => Intl.DateTimeFormatPart[];
        toISO: (opts?: import('luxon').ToISOTimeOptions | undefined) => string;
        toISODate: (opts?: import('luxon').ToISODateOptions | undefined) => string;
        toISOWeekDate: () => string;
        toISOTime: (opts?: import('luxon').ToISOTimeOptions | undefined) => string;
        toRFC2822: () => string;
        toHTTP: () => string;
        toSQLDate: () => string;
        toSQLTime: (opts?: import('luxon').ToSQLOptions | undefined) => string;
        toSQL: (opts?: import('luxon').ToSQLOptions | undefined) => string;
        toString: () => string;
        valueOf: () => number;
        toMillis: () => number;
        toSeconds: () => number;
        toUnixInteger: () => number;
        toJSON: () => string;
        toBSON: () => Date;
        toObject: <IncludeConfig extends boolean | undefined>(opts?: {
            includeConfig?: IncludeConfig | undefined;
        } | undefined) => import('luxon')._ToObjectOutput<IncludeConfig>;
        toJSDate: () => Date;
        diff: (otherDateTime: DateTime<boolean>, unit?: import('luxon').DurationUnits | undefined, opts?: import('luxon').DiffOptions | undefined) => import('luxon').Duration<true>;
        diffNow: (unit?: import('luxon').DurationUnits | undefined, opts?: import('luxon').DiffOptions | undefined) => import('luxon').Duration<true>;
        until: (otherDateTime: DateTime<boolean>) => Interval<true>;
        hasSame: (otherDateTime: DateTime<boolean>, unit: import('luxon').DateTimeUnit, opts?: import('luxon')._UseLocaleWeekOption | undefined) => boolean;
        equals: (other: DateTime<boolean>) => boolean;
        toRelative: (options?: import('luxon').ToRelativeOptions | undefined) => string;
        toRelativeCalendar: (options?: import('luxon').ToRelativeCalendarOptions | undefined) => string;
    }>;
};
