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
      >
        {{ i.text }}

        <div class="events" v-if="i.events.length > 0">
          <ul>
            <li v-for="event in i.events" :key="event.id" @click="eventClicked(event)">
              <h3>{{ event.title }}</h3>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek
} from 'date-fns'
import { computed, ref } from 'vue'

const currentDate = ref(new Date())

export type KEvent = {
  id: string
  title: string
  date: string
  description: string
}

const props = defineProps<{ events: KEvent[] }>()

const todayInISO = () => {
  return new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0]
}

const eventClicked = (event: KEvent) => {
  console.log(event)
}

const generateDaysCalendar = (date: Date) => {
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(date)),
    end: endOfWeek(endOfMonth(date))
  }).map((day) => {
    const dayFormated = format(day, 'yyyy-MM-dd')
    const classToButton = []
    const events = props.events.filter((event) => {
      return isSameDay(dayFormated, event.date)
    })

    if (!isSameMonth(day, date)) {
      classToButton.push('other-month-date')
    }

    if (isSameDay(dayFormated, todayInISO())) {
      classToButton.push('selected')
    }

    const text = format(day, 'd')

    return {
      day: dayFormated,
      class: classToButton.join(' '),
      events,
      text
    }
  })

  return days
}

const title = computed(() => {
  return format(currentDate.value, 'MMMM yyyy')
})

const selectThisDate = (date: string) => {
  console.log(date)
}

let monthDays = ref(generateDaysCalendar(new Date()))

const nextMonth = () => {
  currentDate.value = add(currentDate.value, { months: 1 })

  monthDays.value = generateDaysCalendar(currentDate.value)
}

const prevMonth = () => {
  currentDate.value = add(currentDate.value, { months: -1 })
  monthDays.value = generateDaysCalendar(currentDate.value)
}

const toToday = () => {
  currentDate.value = new Date()
  monthDays.value = generateDaysCalendar(currentDate.value)
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

.date {
  @apply flex items-start justify-start p-2 cursor-pointer flex-col;
  @apply border border-gray-500;
}

.other-month-date {
  @apply text-gray-400;
}

.events {
  @apply w-full;
  ul {
    @apply list-none space-y-2;
    li {
      @apply bg-gray-700 px-2 py-1 text-white rounded-md line-clamp-1;
    }
  }
}

.selected {
  @apply bg-blue-500 text-white;
}
.k-alendar-today-button {
  @apply p-2 border border-gray-500 rounded-md;
}
</style>
