<template>
  <div class="k-alendar-container">
    <div
      v-for="calendar in monthDays"
      :key="calendar.day.toString()"
      @click="selectThisDate(calendar)"
      :class="calendar.class"
      class="date"
      :ref="(el) => (dateRefs[calendar.day] = el)"
    >
      <div class="k-alendar-span-container">
        <span class="k-alendar-text">{{ calendar.text }}</span>
        <span class="point" v-if="calendar.events.length > 0" />
      </div>
      <div class="events" v-if="calendar.events.length > 0">
        <ul>
          <KEventItem
            v-for="event in howEventsShouldRender(calendar.day, calendar.events)"
            :key="event.id"
            :event="event"
            :calendar
            @eventClicked="eventClicked"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDialog } from '@/composables/useDialog'
import useEvent from '@/composables/useEvent'
import useRenderCalendar from '@/composables/useRenderCalendar'
import type { DayCalendar, KEvent, MonthDays } from '@/types'
import { ref } from 'vue'
import KEventItem from '../KEventItem.vue'

const { openEventsDetailDialog, dialogPositionToRender } = useDialog()
const { monthDays, calendarDaySelect } = useRenderCalendar()
const { eventSelected } = useEvent()
const { collision } = useDialog()
const emit = defineEmits(['eventClicked', 'plusEventCountClicked'])
const dateRefs = ref<Record<string, any>>({})

const selectThisDate = (calendar: MonthDays) => {
  const isMobile = window.innerWidth < 768

  if (isMobile) {
    const sizeOfDialog = 400
    const x = Math.floor((window.innerWidth - sizeOfDialog) / 2)
    dialogPositionToRender.value = { x, y: 16 }

    if (calendar.events.length > 0) {
      if (calendar.events.length === 1) {
        eventSelected.value = calendar.events[0]

        if (calendar.events[0].id != 'more') {
          emit('eventClicked', calendar.events[0])
        }
      } else {
        eventSelected.value = {
          id: 'more',
          title: '',
          start_date: '',
          description: ''
        }
      }

      calendarDaySelect.value = calendar
      openEventsDetailDialog.value = true
    }
  }
}

const eventClicked = ({
  mauseEvent,
  event,
  calendar
}: {
  mauseEvent: MouseEvent
  event: KEvent
  day: string
  calendar: DayCalendar
}) => {
  eventSelected.value = event
  calendarDaySelect.value = calendar

  if (calendar.events.length > 0) {
    let target = mauseEvent.target as HTMLElement

    if (target.tagName === 'H3') {
      target = target.parentElement as HTMLElement
    }

    dialogPositionToRender.value = collision(target)

    openEventsDetailDialog.value = true
  }

  if (event.id != 'more') {
    emit('eventClicked', event)
  } else {
    emit('plusEventCountClicked', { events: calendarDaySelect.value.events })
  }
}

const calculateEventsThatCanBeRender = (day: string) => {
  const dateDiv: HTMLDivElement | null = dateRefs.value[day]
  let heightOfEventParent = 0
  const heightOfLiElement = 32
  const paddingTopOfLiElement = 8
  const paddingOfDateDiv = 8

  let totalOfEventsThatCanRender = 0

  if (dateDiv) {
    heightOfEventParent = dateDiv.clientHeight - paddingOfDateDiv * 2

    const sizeOfSpan = (dateDiv.querySelector('span.k-alendar-text') as HTMLSpanElement)
      ?.offsetHeight
    heightOfEventParent -= sizeOfSpan || 0
    totalOfEventsThatCanRender = Math.floor(
      heightOfEventParent / (heightOfLiElement + paddingTopOfLiElement)
    )
  }

  return totalOfEventsThatCanRender
}

const howEventsShouldRender = (day: string, events: KEvent[]) => {
  const totalOfEventsThatCanRender = calculateEventsThatCanBeRender(day)

  const eventsToRender = events.slice(0, totalOfEventsThatCanRender)

  if (events.length - totalOfEventsThatCanRender > 0) {
    eventsToRender.splice(eventsToRender.length - 1, 1, {
      id: 'more',
      title: `+${events.length + 1 - totalOfEventsThatCanRender}`,
      start_date: '',
      description: ''
    })
  }

  return eventsToRender
}
</script>

<style lang="postcss" scoped>
.k-alendar-container {
  @apply grid gap-1 auto-rows-auto;
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.k-alendar-container > * {
  aspect-ratio: 1 / 1;
}

.k-alendar-span-container {
  @apply flex justify-between items-center w-full;
  .k-alendar-text {
    @apply font-bold;
  }
}

.date {
  @apply flex items-start justify-start p-2 cursor-pointer flex-col relative rounded-sm
  hover:bg-[#ebeef5] dark:hover:bg-slate-600;
  @apply border border-gray-200 dark:border-slate-600;
}

.events {
  @apply w-full hidden md:block;
  ul {
    @apply list-none space-y-2;
  }
}

.point {
  @apply w-2 h-2 bg-blue-500 rounded-full md:hidden;
}

.selected {
  @apply bg-[#ebeef5] text-inherit p-2
  dark:bg-slate-700;
}

.other-month-date {
  @apply text-gray-400;
}
</style>
