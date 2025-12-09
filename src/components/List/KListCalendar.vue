<script setup lang="ts">
import type { KEvent } from '@/types/Events'
import { DateTime } from 'luxon'
import { computed, toRef } from 'vue'

const props = defineProps<{
  events: KEvent[]
}>()

const events = toRef(props.events)
const emit = defineEmits(['eventClicked'])
const orderEventsByDate = computed(() => {
  return events.value.slice().sort((a: KEvent, b: KEvent) => {
    return new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  })
})

const orderEventsByStartAt = computed(() => {
  return orderEventsByDate.value.reduce((acc: { [key: string]: KEvent[] }, event: KEvent) => {
    acc[event.start_date] = [...(acc[event.start_date] || []), event]
    return acc
  }, {})
})

const formatDate = (date: string) => {
  return DateTime.fromISO(date).toFormat('EEEE, dd MMMM yyyy')
}

const time = (date: string) => {
  return DateTime.fromISO(date).toFormat('HH:mm')
}

const eventClicked = (event: KEvent) => {
  emit('eventClicked', event)
}
</script>
<template>
  <div class="k-list-calendar-container">
    <div v-for="[day, events] in Object.entries(orderEventsByStartAt)" :key="day">
      <div class="day-header">
        <p>{{ formatDate(day) }}</p>
        <h3>{{ day }}</h3>
      </div>
      <div v-for="event in events" :key="event.id" class="k-list-calendar-event" @click="eventClicked(event)">
        <h4>{{ time(event.start_date) }}</h4>
        <div class="k-list-calendar-event-title">
          <div class="k-list-calendar-event-title-container">
            <span
              v-if="event.color"
              :style="{ backgroundColor: event.color }"
              class="k-list-calendar-event-title-color"
            />
            <h2>{{ event.title }}</h2>
          </div>
          <p>{{ event.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.day-header {
  @apply flex justify-between items-center  p-2 bg-[#ebeef5] transition-colors dark:bg-slate-600;
}
.k-list-calendar-event {
  @apply border-gray-200 border-t dark:border-slate-600 p-2 flex gap-x-4 hover:bg-[#f5f7fb] transition-colors hover:dark:bg-slate-700 hover:cursor-pointer;
}
.k-list-calendar-event-title {
  @apply flex items-start flex-col;
  .k-list-calendar-event-title-container {
    @apply flex items-center gap-2;
    .k-list-calendar-event-title-color {
      @apply w-3 h-3 rounded-full block border border-solid border-gray-200 dark:border-slate-600;
    }
  }
  h2 {
    @apply text-base font-semibold; 
  }
  p {
    @apply text-sm text-gray-500 dark:text-gray-400 line-clamp-1;
  }
}
</style>
