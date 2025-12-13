<template>
  <section class="k-alendar-wrapper-container">
    <KCalendarHeader
      :view="currentView"
      @handlePrevMonth="handlePrevMonth"
      @handleNextMonth="handleNextMonth"
      @handleToToday="handleToToday"
    />
    <KAlendar
      v-if="currentView === 'calendar'"
      @event="eventClicked"
      @events="eventsReceived"
    />
    <KListCalendar
      v-else-if="currentView === 'list'"
      :events="eventsRecieved"
      @event="eventClicked"
    />
    <KDayViewVue
      :events="eventsRecieved"
      v-if="currentView === 'day'"
      @event="eventClicked"
    />
  </section>
</template>

<script setup lang="ts">
import KDayViewVue from '@/components/Day/KDayView.vue'
import useConfig from '@/composables/useConfig'
import useKWeekDays from '@/composables/useKWeekDays'
import useRenderCalendar from '@/composables/useRenderCalendar'
import useView from '@/composables/useView'
import type { View } from '@/types/Calendar'
import type { KEvent } from '@/types/Events'
import { computed, watch } from 'vue'
import KAlendar from '../components/Calendar/KCalendar.vue'
import KCalendarHeader from '../components/Calendar/KCalendarHeader.vue'
import KListCalendar from '../components/List/KListCalendar.vue'

const emit = defineEmits([
  'event',
  'nextMonth',
  'prevMonth',
  'toToday',
  'events',
])

const props = defineProps<{
  events: KEvent[]
  lang?: string
  view?: View
}>()

const { currentView, setCurrentView } = useView()

setCurrentView(props.view || 'calendar')

const eventsRecieved = computed(() => {
  return props.events
})

const { setLang } = useConfig()
const { eventsToShowInCalendar, generateCalendar, monthDays, currentDate } = useRenderCalendar()
const { setCurrentDay } = useKWeekDays()

const handlePrevMonth = (date: string) => {
  emit('prevMonth', date)
}

const handleNextMonth = (date: string) => {
  emit('nextMonth', date)
}

const handleToToday = (date: string) => {
  setCurrentDay(date)
  emit('toToday', date)
}

const regenerateCalendar = () => {
  eventsToShowInCalendar.value = props.events
  monthDays.value = generateCalendar(currentDate.value.toFormat('yyyy-MM-dd'))
}

watch(
  () => props.lang,
  (lang) => {
    if (lang) {
      setLang(lang)
    }
  },
  { immediate: true }
)

watch(
  props,
  ({ events }) => {
    if (events) {
      regenerateCalendar()
    }
  },
  { immediate: true, deep: true }
)

const eventClicked = (event: KEvent) => {
  emit('event', event)
}

const eventsReceived = ({ events }: { events: KEvent[] }) => {
  emit('events', events)
}
</script>

<style scoped lang="postcss">
.k-alendar-wrapper-container {
  @apply space-y-4 dark:text-slate-100;
}

button {
  @apply hover:bg-[#ebeef5] transition-colors dark:hover:bg-slate-600;
}
</style>
