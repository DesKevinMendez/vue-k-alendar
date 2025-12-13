<template>
  <button type="button" class="k-alendar-navegation-prev" @click="handleClick">&larr;</button>
</template>

<script setup lang="ts">
import useKWeekDays from '@/composables/useKWeekDays'
import useRenderCalendar from '@/composables/useRenderCalendar'
import useView from '@/composables/useView'
import { DateTime } from 'luxon'
const emit = defineEmits(['handle'])
const { currentDate, monthDays, generateCalendar } = useRenderCalendar()
const { currentView } = useView()
const { currentDay, setCurrentDay } = useKWeekDays()

const handleClick = () => {
  if (currentView.value === 'day') {
    setCurrentDay(DateTime.fromISO(currentDay.value).minus({ days: 1 }).toISODate() || '')
    return;
  }
  currentDate.value = currentDate.value.minus({ months: 1 })
  const prev = DateTime.fromJSDate(currentDate.value.toJSDate()).toFormat('yyyy-MM-dd')

  monthDays.value = generateCalendar(prev)
  emit('handle', prev)
}
</script>

<style scoped lang="postcss">
.k-alendar-navegation-prev {
  @apply px-2 py-1 border border-gray-200 rounded-l-md rounded-r-none w-16
    lg:p-2
    dark:border-slate-600;
}
</style>
