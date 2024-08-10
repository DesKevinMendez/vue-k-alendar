<template>
  <li
    :style="{
      'background-color': event.id === 'more' ? 'gray' : event.color ? event.color : '#374151'
    }"
    @click="eventClicked"
  >
    <h3>{{ event.title }}</h3>
  </li>
</template>

<script setup lang="ts">
import type { MonthDays } from '@/types/Calendar'
import type { KEvent } from '@/types/Events'
const emit = defineEmits(['eventClicked'])

const props = defineProps<{
  event: KEvent
  calendar: MonthDays | null
}>()

const eventClicked = (mauseEvent: MouseEvent) => {
  emit('eventClicked', { mauseEvent, event: props.event, calendar: props.calendar })
}
</script>

<style scoped>
li {
  @apply bg-gray-700 px-2 py-1 text-white rounded-md line-clamp-1 relative z-50;
}
</style>
