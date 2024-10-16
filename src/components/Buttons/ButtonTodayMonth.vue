<template>
  <button type="button" class="k-alendar-today-button" @click="handleClick">Ahora</button>
</template>

<script setup lang="ts">
import useDate from '@/composables/useDate'
import useRenderCalendar from '@/composables/useRenderCalendar'
import { DateTime } from 'luxon'
const emit = defineEmits(['handle'])
const { currentDate, monthDays, generateCalendar } = useRenderCalendar()
const { today } = useDate()

const handleClick = () => {
  currentDate.value = DateTime.now()

  monthDays.value = generateCalendar(today.value)

  emit('handle', today.value)
}
</script>

<style scoped lang="postcss">
.k-alendar-today-button {
  @apply px-2 py-1 border border-gray-200 rounded-md
  lg:p-2
  dark:border-slate-600;
}
</style>
