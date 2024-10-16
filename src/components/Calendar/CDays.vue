<template>
  <div class="k-alendar-days-container">
    <div v-for="day in getWeekDays()" :key="day">{{ day }}</div>
  </div>
</template>

<script setup lang="ts">
import useConfig from '@/composables/useConfig'
import { DateTime } from 'luxon'

const { lang } = useConfig()

const getWeekDays = () => {
  const start = DateTime.now().startOf('week')
  const end = DateTime.now().endOf('week')

  const days = []
  let currentDay = start

  while (currentDay <= end) {
    days.push(currentDay.setLocale(lang.value).toFormat('ccc'))
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
}
</style>
