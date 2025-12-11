<script setup lang="ts">
import useConfig from '@/composables/useConfig';
import type { KEvent } from '@/types/Events'
import { DateTime } from 'luxon'
import { computed } from 'vue'
import { translations } from '@/locales/traductions'
const { lang } = useConfig()

const props = defineProps<{
  events: KEvent[]
}>()

const events = computed(() => {
  return props.events
})
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
  return DateTime.fromISO(date).setLocale(lang.value).toFormat('EEEE, dd MMMM yyyy')
}

const hasTime = (date: string) => {
  return DateTime.fromISO(date).hour !== 0 || DateTime.fromISO(date).minute !== 0 || DateTime.fromISO(date).second !== 0
}

const time = (event: KEvent) => {
  const date = event.start_date
  const dateIsValid = DateTime.fromISO(date).isValid
  if (!dateIsValid) {
    return '-'
  }
  
  const dateHasTime = hasTime(date)
  
  if (!dateHasTime) {
    return translations[lang.value]?.allDay || 'All day'
  }

  if (event.end_date) {
    const endDate = event.end_date
    const endDateIsValid = DateTime.fromISO(endDate).isValid
    const endDateHasTime = hasTime(endDate)
    if (endDateIsValid && endDateHasTime) {
      return `${DateTime.fromISO(date).toFormat('hh:mm a')} - ${DateTime.fromISO(endDate).toFormat('hh:mm a')}`;
    }
  }
  return DateTime.fromISO(date).toFormat('hh:mm a');
}

const formatDay = (date: string) => {
  return DateTime.fromISO(date).toFormat('yyyy-MM-dd')
}

const eventClicked = (event: KEvent) => {
  emit('eventClicked', event)
}
</script>
<template>
  <div class="k-list-calendar-container">
    <div v-for="[day, events] in Object.entries(orderEventsByStartAt)" :key="day">
      <div class="day-header">
        <p class="day-header-full-date">{{ formatDate(day) }}</p>
        <h3 class="day-header-simple-date">{{ formatDay(day) }}</h3>
      </div>
      <div v-for="event in events" :key="event.id" class="k-list-calendar-event" @click="eventClicked(event)">
        <h4 class="k-list-calendar-event-time">{{ time(event) }}</h4>
        <div class="k-list-calendar-event-title">
          <div class="k-list-calendar-event-title-container">
            <span
              v-if="event.color"
              :style="{ backgroundColor: event.color }"
              class="k-list-calendar-event-title-color"
            />
            <h2 class="k-list-calendar-event-title-text">{{ event.title }}</h2>
          </div>
          <p class="k-list-calendar-event-description">{{ event.description }}</p>
        </div>
      </div>
    </div>
    <div v-if="events.length === 0" class="nothing-to-show-message">
      {{ translations[lang]?.nothingToShow || 'No events found' }}
    </div>
  </div>
</template>

<style scoped lang="postcss">
.day-header {
  @apply flex justify-between items-center  p-2 bg-[#ebeef5] transition-colors dark:bg-slate-600;
  .day-header-full-date {
    @apply capitalize;
  }
  .day-header-simple-date {
    @apply font-bold;
  }
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
.nothing-to-show-message {
  @apply p-4 text-center text-gray-500 dark:text-gray-400 text-lg border-b border-gray-200 dark:border-slate-600 border-t;
}
 </style>
