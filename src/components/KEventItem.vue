<template>
  <li
    :style="{
      'background-color': eventReceived.id === 'more' ? 'gray' : eventReceived.color ? eventReceived.color : '#374151'
    }"
    @click="eventClicked"
  >
    <h3>{{ eventReceived.title }}</h3>
  </li>
</template>

<script setup lang="ts">
import type { MonthDays } from '@/types/Calendar'
import type { KEvent } from '@/types/Events'
import { computed } from 'vue';
const emit = defineEmits(['event'])

const props = defineProps<{
  event: KEvent
  calendar: MonthDays | null
}>()

const eventReceived = computed(() => {
  return props.event
})

const eventClicked = (mauseEvent: MouseEvent) => {
  emit('event', { mauseEvent, event: props.event, calendar: props.calendar })
}
</script>

<style scoped>
li {
  @apply bg-gray-700 px-2 py-1 text-white rounded-md line-clamp-1 relative z-50;
}
</style>
