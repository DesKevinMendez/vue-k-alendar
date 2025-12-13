<template>
  <div class="k-alendar-days-container">
    <div 
      class="k-alendar-day"
      v-for="day in getWeekDays()" 
      @click="emitDateClicked(day.date)" 
      :key="day.date"
      :class="{ today: day.date === currentDay }"
    >
      {{ day.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import useConfig from '@/composables/useConfig'
import useKWeekDays from '@/composables/useKWeekDays'
import { DateTime } from 'luxon'

const { currentDay, setCurrentDay } = useKWeekDays()
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
  const start = DateTime.now().startOf('week')
  const end = DateTime.now().endOf('week')

  const days: WeekDay[] = []
  let currentDay = start

  while (currentDay <= end) {
    days.push({
      text: currentDay.setLocale(lang.value).toFormat('ccc'),
      date: currentDay.toISODate() || ''
    })
    currentDay = currentDay.plus({ days: 1 })
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
