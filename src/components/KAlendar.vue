<template>
  <section class="k-alendar-wrapper-container">
    <header class="k-alendar-header-container">
      <div class="left-buttons">
        <div class="navegation-buttons">
          <button type="button" class="k-alendar-navegation-prev" @click="prevMonth">&larr;</button>
          <button type="button" class="k-alendar-navegation-left" @click="nextMonth">&rarr;</button>
        </div>
        <button type="button" class="k-alendar-today-button" @click="toToday">Ahora</button>
        <div class="center-title">
          <h2>{{ title }}</h2>
        </div>
      </div>
      <!-- <div class="center-title">
        <h2>{{ title }}</h2>
      </div> -->
      <div class="right-buttons">
        <!-- <button type="button" class="k-alendar-today-button">Mes</button>
        <button type="button" class="k-alendar-today-button">Semana</button>
        <button type="button" class="k-alendar-today-button">Día</button> -->
      </div>
    </header>
    <div class="k-alendar-days-container">
      <div v-for="day in getWeekDays()" :key="day">{{ day }}</div>
    </div>
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
    <KAlendarEventDetailDialog
      v-model="openEventsDetailDialog"
      :event="eventSelected"
      :calendar="calendarDaySelect"
      :style="{
        top: `${dialogPositionToRender.y}px`,
        left: `${dialogPositionToRender.x}px`
      }"
    />
  </section>
</template>

<script setup lang="ts">
import useRenderCalendar from '@/composables/useRenderCalendar'
import type { DayCalendar, MonthDays } from '@/types/Calendar'
import type { KEvent } from '@/types/Events'
import { ref } from 'vue'
import KAlendarEventDetailDialog from './KAlendarEventDetailDialog.vue'
import KEventItem from './KEventItem.vue'

const props = defineProps<{ events: KEvent[] }>()
const { nextMonth, prevMonth, toToday, title, monthDays, getWeekDays } = useRenderCalendar(
  props.events
)

const eventSelected = ref<KEvent>({
  id: '',
  title: '',
  start_date: '',
  description: ''
})
const calendarDaySelect = ref<MonthDays | null>(null)
const dateRefs = ref<Record<string, any>>({})
const openEventsDetailDialog = ref(false)
const dialogPositionToRender = ref({ x: 0, y: 0 })

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

  const sizeOfDialog = 400
  if (calendar.events.length > 0) {
    let target = mauseEvent.target as HTMLElement

    if (target.tagName === 'H3') {
      target = target.parentElement as HTMLElement
    }

    const targetPosition = target.getBoundingClientRect()
    const positionBottomRight = {
      x: targetPosition.right,
      y: targetPosition.bottom
    }
    const positionBottomLeft = {
      x: targetPosition.left - sizeOfDialog,
      y: targetPosition.bottom
    }

    const positionTopRight = {
      x: targetPosition.right,
      y: targetPosition.top - sizeOfDialog
    }

    const positionTopLeft = {
      x: targetPosition.left - sizeOfDialog,
      y: targetPosition.top - sizeOfDialog
    }

    const { left, bottom, right, top } = calculateTheDistanceToScreen(target)
    // console.log({ left, bottom, right, top })

    /**
     * Evaluar si no cabe en la izquierda, sino, lo renderiza en la parte inferior derecha
     */
    if (left < sizeOfDialog) {
      dialogPositionToRender.value = { x: positionBottomRight.x, y: positionBottomRight.y }
    }

    /**
     * Evaluar si no cabe en la derecha, sino, lo renderiza en la parte inferior izquierda
     */
    if (right < sizeOfDialog) {
      dialogPositionToRender.value = { x: positionBottomLeft.x, y: positionBottomLeft.y }
    }

    /**
     * Cuando no cabe abajo, se renderiza en la parte superior izquierda
     */
    if (bottom < sizeOfDialog) {
      dialogPositionToRender.value = { x: positionTopLeft.x, y: positionTopLeft.y }
    }

    /**
     * Cuando no cabe arriba, pero si abajo
     */
    if (top < sizeOfDialog) {
      dialogPositionToRender.value = { x: positionBottomRight.x, y: positionBottomRight.y }
    }

    /**
     * Cuando no cabe arriba, ni a la derecha
     */
    if (top < sizeOfDialog && right < sizeOfDialog) {
      dialogPositionToRender.value = { x: positionBottomLeft.x, y: positionBottomLeft.y }
    }

    /**
     * Cuando no cabe ni abajo, ni a la izquierda, se renderiza en la parte superior derecha
     */
    if (left < sizeOfDialog && bottom < sizeOfDialog) {
      dialogPositionToRender.value = { x: positionTopRight.x, y: positionTopRight.y }
    }

    /**
     * Cuando no cabe ni abajo, ni arriba a la izquierda, ni tampoco arriba a la derecha,
     * se saca la diferencia y se renderiza en la parte superior izquierda
     */
    if (left < sizeOfDialog && bottom < sizeOfDialog && right < sizeOfDialog) {
      const diff = sizeOfDialog - right + 16
      dialogPositionToRender.value = { x: positionBottomLeft.x + diff, y: positionTopLeft.y }
    }

    /**
     * Cuando no cabe ni arriba, ni abajo, ni a la izquierda, pero si a la derecha
     */
    if (
      left < sizeOfDialog &&
      top < sizeOfDialog &&
      bottom < sizeOfDialog &&
      right > sizeOfDialog
    ) {
      const diff = sizeOfDialog - top + 16
      dialogPositionToRender.value = {
        x: positionBottomRight.x,
        y: positionTopLeft.y + diff
      }
    }

    /**
     * Cuando no cabe ni arriba, ni abajo, pero si a la izquierda y derecha
     */
    if (top < sizeOfDialog && bottom < sizeOfDialog) {
      const diff = sizeOfDialog - top + 16
      dialogPositionToRender.value = {
        x: positionBottomRight.x,
        y: positionTopLeft.y + diff
      }
    }

    /**
     * cuando no cabe ni abajo, ni arriba, ni a la izquierda, pero si a la derecha
     */
    if (
      top < sizeOfDialog &&
      bottom < sizeOfDialog &&
      right < sizeOfDialog &&
      left > sizeOfDialog
    ) {
      const diff = sizeOfDialog - top + 16
      dialogPositionToRender.value = {
        x: positionBottomLeft.x,
        y: positionTopLeft.y + diff
      }
    }

    /**
     * Cuando cabe en todos lados
     */
    if (
      left > sizeOfDialog &&
      right > sizeOfDialog &&
      top > sizeOfDialog &&
      bottom > sizeOfDialog
    ) {
      dialogPositionToRender.value = { x: positionBottomRight.x, y: positionBottomRight.y }
    }

    openEventsDetailDialog.value = true
  }
}

const calculateTheDistanceToScreen = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  const distance = {
    top: rect.top,
    bottom: window.innerHeight - rect.bottom,
    left: rect.left,
    right: window.innerWidth - rect.right
  }
  return distance
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

const selectThisDate = (calendar: MonthDays) => {
  /**
   * cuando es mobile < 768px
   */
  if (window.innerWidth < 768) {
    const sizeOfDialog = 400
    const x = Math.floor((window.innerWidth - sizeOfDialog) / 2)
    dialogPositionToRender.value = { x, y: 16 }
  }

  if (calendar.events.length > 0) {
    if (calendar.events.length === 1) {
      eventSelected.value = calendar.events[0]
    } else {
      eventSelected.value = {
        id: 'more',
        title: `+${calendar.events.length} eventos`,
        start_date: '',
        description: ''
      }
    }
    calendarDaySelect.value = calendar
    openEventsDetailDialog.value = true
  }
}
</script>

<style scoped lang="postcss">
.k-alendar-wrapper-container {
  @apply space-y-4 dark:text-slate-100;
}

button {
  @apply hover:bg-[#ebeef5] transition-colors dark:hover:bg-slate-600;
}

.k-alendar-days-container {
  @apply grid gap-1 auto-rows-auto border border-gray-200 rounded-sm text-center capitalize
  dark:border-gray-600;
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.k-alendar-container {
  @apply grid gap-1 auto-rows-auto;
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.k-alendar-header-container {
  @apply flex justify-between space-y-2 items-center sm:space-y-0;
  .center-title > h2 {
    @apply capitalize;
  }
  .right-buttons,
  .left-buttons {
    @apply flex items-center space-x-2;
  }

  .k-alendar-navegation-prev {
    @apply px-2 py-1 border border-gray-200 rounded-l-md rounded-r-none w-16
    lg:p-2
    dark:border-slate-600;
  }
  .k-alendar-navegation-left {
    @apply px-2 py-1 border border-gray-200 rounded-r-md w-16 transition-colors duration-200
    lg:p-2
    dark:border-slate-500;
  }
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

.other-month-date {
  @apply text-gray-400;
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
.k-alendar-today-button {
  @apply px-2 py-1 border border-gray-200 rounded-md
  lg:p-2
  dark:border-slate-600;
}
</style>
