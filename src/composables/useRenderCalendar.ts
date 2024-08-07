import type { MonthDays } from '@/types/Calendar'
import type { KEvent } from '@/types/Events'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek
} from 'date-fns'
import { computed, onMounted, ref } from "vue"

const monthDays = ref<MonthDays[]>([])
const currentDate = ref(new Date())

export default function useRenderCalendar(events: KEvent[]) {

  const todayInISO = () => {
    return new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0]
  }

  const generateDaysCalendar = (date: Date) => {
    const days = eachDayOfInterval({
      start: startOfWeek(startOfMonth(date)),
      end: endOfWeek(endOfMonth(date))
    }).map((day) => {
      const dayFormated = format(day, 'yyyy-MM-dd')
      const classToButton = []
      const eventsToRender = events.filter((event) => {
        return isSameDay(dayFormated, event.date)
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
        events: eventsToRender,
        text
      }
    })

    return days
  }

  onMounted(() => {
    monthDays.value = generateDaysCalendar(currentDate.value)
  })

  const title = computed(() => {
    return format(currentDate.value, 'MMMM yyyy')
  })

  const nextMonth = () => {
    currentDate.value = add(currentDate.value, { months: 1 })

    monthDays.value = generateDaysCalendar(currentDate.value)
  }

  const prevMonth = () => {
    currentDate.value = add(currentDate.value, { months: -1 })
    monthDays.value = generateDaysCalendar(currentDate.value)
  }

  const toToday = () => {
    currentDate.value = new Date()
    monthDays.value = generateDaysCalendar(currentDate.value)
  }

  return { nextMonth, prevMonth, toToday, title, monthDays }
}