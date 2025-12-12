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
        <div class="k-day-view-event-slot" v-for="event in hours" :key="event">
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import useRenderCalendar from '@/composables/useRenderCalendar'
import type { KEvent } from '@/types'
import { DateTime } from 'luxon'
import { computed, ref } from 'vue'
import KWeekDays from '../Calendar/KWeekDays.vue'
import useConfig from '@/composables/useConfig'
const { currentDate } = useRenderCalendar()
const { lang } = useConfig()
const props = defineProps<{
  events: KEvent[]
}>()

const events = computed(() => {
  return props.events
})

const orderEventsByHour = computed(() => {
  return events.value.slice().sort((a: KEvent, b: KEvent) => {
    return new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  })
})

const hours = computed(() => {
  return Array.from({ length: 24 }, (_, index) => {
    const hour24 = index
    if (hour24 === 0) return '12:00 AM'
    if (hour24 < 12) return `${hour24.toString().padStart(2, '0')}:00 AM`
    if (hour24 === 12) return '12:00 PM'
    return `${(hour24 - 12).toString().padStart(2, '0')}:00 PM`
  })
})
</script>
<style scoped lang="postcss">
.k-day-view-container {
  .k-day-view-events {
    /* @apply flex flex-col; */
    @apply grid grid-cols-12;
  }
  .k-day-view-hour {
    @apply col-span-2 border-gray-200 dark:border-slate-600;
  }
  .k-day-view-event {
    @apply col-span-10;
  }
  .k-day-view-hour {
    @apply flex flex-col;
  }
  .k-day-view-hour-slot {
    @apply border-gray-200 dark:border-slate-600 border-r flex-1;
  }
  .k-day-view-hour-slot, .k-day-view-event-slot {
    @apply border-gray-200 dark:border-slate-600 border-b px-2 py-4;
  }
  .k-day-view-events-container {
    @apply col-span-10 flex flex-col;
  }
  .k-day-view-event-slot {
    @apply flex-1;
  }
}
</style>
