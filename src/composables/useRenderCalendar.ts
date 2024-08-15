import type { DayCalendar, MonthDays } from '@/types/Calendar';
import type { KEvent, KEventCalendarRender } from '@/types/Events';
import { DateTime, Interval } from 'luxon';
import { computed, ref } from "vue";
import useConfig from './useConfig';
import useDate from './useDate';
const monthDays = ref<MonthDays[]>([])
const eventsToShowInCalendar = ref<KEvent[]>([])
const currentDate = ref(DateTime.utc())

export default function useRenderCalendar(emit: (event: "nextMonth" | "prevMonth" | "toToday", ...args: any) => void) {
  const { today, timezone } = useDate()
  const { lang } = useConfig();

  const getWeekDays = () => {
    const start = DateTime.utc().startOf('week');
    const end = DateTime.utc().endOf('week');

    const days = [];
    let currentDay = start;

    while (currentDay <= end) {
      days.push(currentDay.setLocale(lang.value).toFormat('ccc'));
      currentDay = currentDay.plus({ days: 1 });
    }

    return days;
  };

  const eventsToShowInCalendarMutated = computed(() => {
    return eventsToShowInCalendar.value.map((event) => {
      return {
        ...event,
        date_calendar_to_render: event.start_date
      }
    })
  })

  const generateDayOfTheMonth = (date: string) => {
    const [year, month, day] = date.split('-').map(Number);
    const generateCalendarFromDate = DateTime.utc().set({ year, month, day });
    const startOfMonth = generateCalendarFromDate.startOf('month');
    const endOfMonth = generateCalendarFromDate.endOf('month');
    const startOfWeek = startOfMonth.startOf('week');
    const endOfWeek = endOfMonth.endOf('week');

    const days = [];
    let currentDay = startOfWeek;

    while (currentDay <= endOfWeek) {
      days.push(currentDay.toISODate());
      currentDay = currentDay.plus({ days: 1 });
    }

    return days;
  }

  const isWithinInterval = (date: string, {
    startDate,
    endDate
  }: { startDate: string, endDate: string }): boolean => {

    const dateToCheck = DateTime.fromISO(date, { zone: timezone.value });
    const start = DateTime.fromISO(startDate, { zone: timezone.value });
    const end = DateTime.fromISO(endDate, { zone: timezone.value });

    const interval = Interval.fromDateTimes(start, end);
    return interval.contains(dateToCheck);
  };

  const generateCalendar = (date: string): DayCalendar[] => {
    return generateDayOfTheMonth(date).map((day) => {
      const classToButton = []

      const fillEvents: KEventCalendarRender[] = [];

      const currentDay = DateTime.fromISO(day, { zone: timezone.value });
      const targetDate = DateTime.fromISO(date, { zone: timezone.value });

      eventsToShowInCalendarMutated.value.forEach(event => {
        if (event.end_date &&
          isWithinInterval(day, {
            startDate: event.start_date,
            endDate: event.end_date
          })) {

          fillEvents.push({ ...event, date_calendar_to_render: day });
        } else {
          fillEvents.push(event);
        }
      });

      const eventsToRender = fillEvents.filter((event) => {
        return currentDay.hasSame(DateTime.fromISO(event.date_calendar_to_render), 'day')
      })

      if (!currentDay.hasSame(targetDate, 'month')) {
        classToButton.push('other-month-date');
      }

      if (currentDay.hasSame(DateTime.fromISO(today.value), 'day')) {
        classToButton.push('selected')
      }

      return {
        day: day,
        class: classToButton.join(' '),
        events: eventsToRender || [],
        text: DateTime.fromISO(day).day.toString()
      }
    });

  }

  const title = computed(() => {
    return DateTime.fromJSDate(currentDate.value.toJSDate())
      .setLocale(lang.value)
      .toFormat('MMMM yyyy');
  })

  const nextMonth = () => {
    currentDate.value = currentDate.value.plus({ months: 1 })

    const next = DateTime.fromJSDate(currentDate.value.toJSDate()).toFormat('yyyy-MM-dd');
    monthDays.value = generateCalendar(next)

    emit('nextMonth', next)
  }

  const prevMonth = () => {
    currentDate.value = currentDate.value.minus({ months: 1 })
    const prev = DateTime.fromJSDate(currentDate.value.toJSDate()).toFormat('yyyy-MM-dd');

    monthDays.value = generateCalendar(prev)

    emit('prevMonth', prev)
  }

  const toToday = () => {
    currentDate.value = DateTime.utc()

    monthDays.value = generateCalendar(today.value)

    emit('toToday', today.value)
  }

  return {
    nextMonth, prevMonth,
    eventsToShowInCalendar,
    toToday, title, monthDays,
    getWeekDays, generateCalendar,
    currentDate
  }
}