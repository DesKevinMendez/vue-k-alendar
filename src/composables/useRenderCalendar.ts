import type { DayCalendar, MonthDays } from '@/types/Calendar';
import type { KEvent } from '@/types/Events';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfMonth,
  startOfWeek
} from 'date-fns';
import { es } from 'date-fns/locale';
import { computed, onMounted, ref } from "vue";

const monthDays = ref<MonthDays[]>([])
const currentDate = ref(new Date())

export default function useRenderCalendar(events: KEvent[]) {

  const getWeekDays = () => {
    const start = startOfWeek(new Date(), { locale: es });
    const end = endOfWeek(new Date(), { locale: es });

    const days = eachDayOfInterval({ start, end });

    return days.map(day => format(day, 'EEE', { locale: es }));
  };

  const todayInISO = () => {
    return new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0]
  }

  const generateDayOfTheMonth = (date: Date): DayCalendar[] => {
    return eachDayOfInterval({
      start: startOfWeek(startOfMonth(date)),
      end: endOfWeek(endOfMonth(date))
    }).map((day) => {
      const dayFormated = format(day, 'yyyy-MM-dd')
      const classToButton = []

      const fillEvents: KEvent[] = [];

      events.forEach(event => {
        if (event.end_date &&
          isWithinInterval(dayFormated, {
            start: event.start_date,
            end: event.end_date
          })) {
          fillEvents.push({ ...event, start_date: dayFormated });

        } else {
          fillEvents.push(event);
        }
      });

      const eventsToRender = fillEvents.filter((event) => {
        return isSameDay(dayFormated, event.start_date)
      })

      if (!isSameMonth(day, date)) {
        classToButton.push('other-month-date')
      }

      if (isSameDay(dayFormated, todayInISO())) {
        classToButton.push('selected')
      }

      const text = format(day, 'd')

      return {
        day: dayFormated,
        class: classToButton.join(' '),
        events: eventsToRender || [],
        text
      }
    })
  }

  onMounted(() => {
    monthDays.value = generateDayOfTheMonth(currentDate.value)
  })

  const title = computed(() => {
    return format(currentDate.value, 'MMMM yyyy', { locale: es })
  })

  const nextMonth = () => {
    currentDate.value = add(currentDate.value, { months: 1 })

    monthDays.value = generateDayOfTheMonth(currentDate.value)
  }

  const prevMonth = () => {
    currentDate.value = add(currentDate.value, { months: -1 })
    monthDays.value = generateDayOfTheMonth(currentDate.value)
  }

  const toToday = () => {
    currentDate.value = new Date()
    monthDays.value = generateDayOfTheMonth(currentDate.value)
  }

  return { nextMonth, prevMonth, toToday, title, monthDays, getWeekDays }
}