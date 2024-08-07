<template>
  <section class="k-alendar-wrapper-container">
    <header class="k-alendar-header-container">
      <div class="left-buttons">
        <div class="navegation-buttons">
          <button type="button" class="k-alendar-navegation-prev" @click="prevMonth">&larr;</button>
          <button type="button" class="k-alendar-navegation-left" @click="nextMonth">&rarr;</button>
        </div>
        <button type="button" class="k-alendar-today-button" @click="toToday">Ahora</button>
      </div>
      <div class="center-title">
        <h2>{{ title }}</h2>
      </div>
      <div class="right-buttons">
        <button type="button" class="k-alendar-today-button">Mes</button>
        <button type="button" class="k-alendar-today-button">Semana</button>
        <button type="button" class="k-alendar-today-button">Día</button>
      </div>
    </header>
    <div class="k-alendar-container">
      <div
        v-for="i in monthDays"
        :key="i.day.toString()"
        @click="selectThisDate(i.day)"
        :class="i.class"
        class="date"
        :ref="(el) => (dateRefs[i.day] = el)"
      >
        <div class="k-alendar-span-container">
          <span class="k-alendar-text">{{ i.text }}</span>
          <span class="point" v-if="i.events.length > 0" />
        </div>
        <div class="events" v-if="i.events.length > 0">
          <ul>
            <li
              v-for="event in howEventsShouldRender(i.day, i.events)"
              :key="event.id"
              @click="eventClicked(event)"
            >
              <h3>{{ event.title }}</h3>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import useRenderCalendar from '@/composables/useRenderCalendar'
import type { KEvent } from '@/types/Events'
import { ref } from 'vue'

const props = defineProps<{ events: KEvent[] }>()
const { nextMonth, prevMonth, toToday, title, monthDays } = useRenderCalendar(props.events)

const dateRefs = ref<Record<string, any>>({})

const eventClicked = (event: KEvent) => {
  console.log(event)
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
      date: '',
      description: ''
    })
  }

  return eventsToRender
}

const selectThisDate = (date: string) => {
  console.log(date)
}
</script>

<style scoped lang="postcss">
.k-alendar-wrapper-container {
  @apply space-y-4;
}
.k-alendar-container {
  @apply grid gap-1 auto-rows-auto border border-gray-200 rounded-md;
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.k-alendar-header-container {
  @apply flex justify-between items-center flex-col md:flex-row;
  .right-buttons,
  .left-buttons {
    @apply flex items-center space-x-2;
  }

  .k-alendar-navegation-prev {
    @apply p-2 border border-gray-500 rounded-l-md rounded-r-none w-16;
  }
  .k-alendar-navegation-left {
    @apply p-2 border border-gray-500 rounded-r-md w-16;
  }
}

.k-alendar-container > * {
  aspect-ratio: 1 / 1;
}

.k-alendar-span-container {
  @apply flex justify-between items-center w-full;
}

.date {
  @apply flex items-start justify-start p-2 cursor-pointer flex-col relative;
  @apply border border-gray-500;
}

.other-month-date {
  @apply text-gray-400;
}

.events {
  @apply w-full hidden md:block;
  ul {
    @apply list-none space-y-2;
    li {
      @apply bg-gray-700 px-2 py-1 text-white rounded-md line-clamp-1;
    }
  }
}

.point {
  /* @apply w-2 h-2 bg-gray-500 rounded-full absolute top-4 right-2 md:hidden; */
  @apply w-2 h-2 bg-gray-500 rounded-full md:hidden;
}

.selected {
  @apply bg-blue-500 text-white;
}
.k-alendar-today-button {
  @apply p-2 border border-gray-500 rounded-md;
}
</style>
