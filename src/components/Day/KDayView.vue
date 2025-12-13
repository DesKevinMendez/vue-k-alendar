<template>
  
  <div class="k-day-view-container">
    <KWeekDays />
    <section class="k-day-view-events">
      <div class="k-day-view-hour">
        <div class="k-day-view-hour-slot" v-for="hour in hours" :key="hour">
          <h2>{{ hour }}</h2>
        </div>
      </div>
      <div class="k-day-view-events-container">
        <div class="k-day-view-event-slot" v-for="(hour, index) in hours" :key="hour" :calendar-hour-container="hour">
          <div
            v-for="(event, eventIndex) in eventsByHour[index]"
            :key="event.id"
            class="k-day-view-event-item"
            :style="{
              backgroundColor: event.color || '#3b82f6',
              top: `${getEventTopPosition(event)}%`,
              left: `${getEventLeftOffset(event, index, eventIndex)}px`,
              width: `calc(100% - ${getEventLeftOffset(event, index, eventIndex)}px)`,
              height: `${getEventHeightInSlot(event, index)}%`,
              zIndex: 10 + eventIndex
            }"
            @click="eventClicked(event)"
          >
            <h3 class="k-day-view-event-title">{{ event.title }}</h3>
            <p class="k-day-view-event-time">{{ formatEventTime(event) }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import useKWeekDays from '@/composables/useKWeekDays'
import type { KEvent } from '@/types'
import { DateTime } from 'luxon'
import { computed } from 'vue'
import KWeekDays from '../Calendar/KWeekDays.vue'

const props = defineProps<{
  events: KEvent[]
}>()

const emit = defineEmits(['eventClicked'])
const { currentDay } = useKWeekDays()

const events = computed(() => {
  return props.events
})

const orderEventsByHour = computed(() => {
  return events.value.slice().sort((a: KEvent, b: KEvent) => {
    return new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  })
})

const eventsForCurrentDay = computed(() => {
  return orderEventsByHour.value.filter((event) => {
    const eventDate = DateTime.fromISO(event.start_date).toFormat('yyyy-MM-dd')
    return eventDate === currentDay.value
  })
})

const eventsByHour = computed(() => {
  const eventsMap: { [key: number]: KEvent[] } = {}
  
  for (let i = 0; i < 24; i++) {
    eventsMap[i] = []
  }
  
  eventsForCurrentDay.value.forEach((event) => {
    const eventDateTime = DateTime.fromISO(event.start_date)
    if (eventDateTime.isValid) {
      const hour = eventDateTime.hour
      eventsMap[hour].push(event)
    }
  })
  
  // Sort events within each hour by start time
  Object.keys(eventsMap).forEach((hourKey) => {
    const hour = parseInt(hourKey)
    eventsMap[hour].sort((a, b) => {
      const dateA = DateTime.fromISO(a.start_date)
      const dateB = DateTime.fromISO(b.start_date)
      return dateA.toMillis() - dateB.toMillis()
    })
  })
  
  return Array.from({ length: 24 }, (_, index) => eventsMap[index])
})

const getEventLeftOffset = (event: KEvent, slotHourIndex: number, eventIndex: number) => {
  const startDate = DateTime.fromISO(event.start_date)
  if (!startDate.isValid || startDate.hour !== slotHourIndex) return 0
  
  const eventStart = startDate.toMillis()
  const eventEnd = event.end_date 
    ? DateTime.fromISO(event.end_date).toMillis() 
    : startDate.plus({ hours: 1 }).toMillis()
  
  // Get all events in the same hour slot
  const eventsInSlot = eventsByHour.value[slotHourIndex]
  
  let overlappingCount = 0
  for (let i = 0; i < eventIndex; i++) {
    const otherEvent = eventsInSlot[i]
    const otherStart = DateTime.fromISO(otherEvent.start_date).toMillis()
    const otherEnd = otherEvent.end_date 
      ? DateTime.fromISO(otherEvent.end_date).toMillis()
      : DateTime.fromISO(otherEvent.start_date).plus({ hours: 1 }).toMillis()
    
    // Check if events overlap in time
    if (eventStart < otherEnd && eventEnd > otherStart) {
      overlappingCount++
    }
  }
  
  return overlappingCount * 70
}

const getEventTopPosition = (event: KEvent) => {
  const eventDateTime = DateTime.fromISO(event.start_date)
  if (!eventDateTime.isValid) return 0
  
  // 0 minutes = 0%, 60 minutes = 100%
  const minutes = eventDateTime.minute + (eventDateTime.second / 60)
  return (minutes / 60) * 100
}

const getEventHeightInSlot = (event: KEvent, slotHourIndex: number) => {
  const startDate = DateTime.fromISO(event.start_date)
  const defaultHeight = 100
  if (!startDate.isValid) return defaultHeight
  
  const eventStartHour = startDate.hour
  const eventStartMinutes = startDate.minute + (startDate.second / 60)
  
  if (eventStartHour !== slotHourIndex) {
    return 0
  }
  
  if (event.end_date) {
    const endDate = DateTime.fromISO(event.end_date)
    if (endDate.isValid) {
      const endHasTime = endDate.hour !== 0 || endDate.minute !== 0 || endDate.second !== 0
      if (endHasTime) {
        const eventEndHour = endDate.hour
        const eventEndMinutesInHour = endDate.minute + (endDate.second / 60)
        const startTotalMinutes = eventStartHour * 60 + eventStartMinutes
        const endTotalMinutes = eventEndHour * 60 + eventEndMinutesInHour
        const durationMinutes = Math.max(endTotalMinutes - startTotalMinutes, 15)
        
        return (durationMinutes / 60) * 100
      }
    }
  }
  
  return defaultHeight
}

const formatEventTime = (event: KEvent) => {
  const startDate = DateTime.fromISO(event.start_date)
  if (!startDate.isValid) return ''
  
  const hasTime = startDate.hour !== 0 || startDate.minute !== 0 || startDate.second !== 0
  if (!hasTime) return 'All day'
  
  if (event.end_date) {
    const endDate = DateTime.fromISO(event.end_date)
    if (endDate.isValid) {
      const endHasTime = endDate.hour !== 0 || endDate.minute !== 0 || endDate.second !== 0
      if (endHasTime) {
        return `${startDate.toFormat('hh:mm a')} - ${endDate.toFormat('hh:mm a')}`
      }
    }
  }
  
  return startDate.toFormat('hh:mm a')
}

const hours = computed(() => {
  return Array.from({ length: 24 }, (_, index) => {
    const hour24 = index
    if (hour24 === 0) return '12:00 AM'
    if (hour24 < 12) return `${hour24.toString().padStart(2, '0')}:00 AM`
    if (hour24 === 12) return '12:00 PM'
    return `${(hour24 - 12).toString().padStart(2, '0')}:00 PM`
  })
})

const eventClicked = (event: KEvent) => {
  emit('eventClicked', event)
}
</script>
<style scoped lang="postcss">
.k-day-view-container {
  .k-day-view-events {
    @apply grid grid-cols-12;
  }
  .k-day-view-hour {
    @apply col-span-2 border-gray-200 dark:border-slate-600 flex flex-col;
  }
  .k-day-view-event {
    @apply col-span-10;
  }
  .k-day-view-hour-slot {
    @apply border-gray-200 dark:border-slate-600 border-r flex-1 min-h-0 flex items-center;
  }
  .k-day-view-hour-slot, .k-day-view-event-slot {
    @apply border-gray-200 dark:border-slate-600 border-b px-2 py-4 min-h-0 flex-1;
  }
  .k-day-view-events-container {
    @apply col-span-10 flex flex-col;
  }
  .k-day-view-event-slot {
    @apply relative overflow-visible;
  }
  .k-day-view-event-item {
    @apply rounded-md p-2 text-white cursor-pointer absolute border border-solid border-gray-400 dark:border-slate-600 min-h-10 box-border;
  }
  .k-day-view-event-title {
    @apply font-semibold text-sm;
  }
  .k-day-view-event-time {
    @apply text-xs opacity-90 mt-1;
  }
}
</style>
