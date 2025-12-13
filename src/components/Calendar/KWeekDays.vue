<template>
  <div class="k-alendar-days-container">
    <div
      v-for="day in getWeekDays()"
      @click="emitDateClicked(day.date)"
      :key="day.date"
      :class="{
        today: day.date === currentDay && currentView === 'day',
        'k-alendar-day': currentView === 'day'
      }"
    >
      {{ day.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import useConfig from '@/composables/useConfig'
import useKWeekDays from '@/composables/useKWeekDays'
import useView from '@/composables/useView'
import { DateTime } from 'luxon'

const { currentDay, setCurrentDay } = useKWeekDays()
const { currentView } = useView()
const { lang } = useConfig()
const emit = defineEmits(['dateClicked'])

interface WeekDay {
  text: string
  date: string
}

const emitDateClicked = (date: string) => {
  setCurrentDay(date)
  emit('dateClicked', date)
}

const getWeekDays = (): WeekDay[] => {
  const start = DateTime.fromISO(currentDay.value).startOf('week')
  const end = DateTime.fromISO(currentDay.value).endOf('week')

  const days: WeekDay[] = []
  let day = start

  while (day <= end) {
    days.push({
      text: day.setLocale(lang.value).toFormat('ccc'),
      date: day.toISODate() || ''
    })
    day = day.plus({ days: 1 })
  }

  return days
}
</script>

<style scoped lang="postcss">
.k-alendar-days-container {
  @apply grid gap-1 auto-rows-auto border border-gray-200 rounded-sm text-center capitalize
  dark:border-gray-600;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  .k-alendar-day {
    @apply cursor-pointer;
    &:hover {
      @apply bg-[#ebeef5] text-inherit
        dark:bg-slate-700;
    }
  }
}

.today {
  @apply bg-[#ebeef5] text-inherit
    dark:bg-slate-700;
}
</style>
