<script setup lang="ts">
import { onMounted, ref } from 'vue'
import VueKAlendar from '@/views/VueKAlendar.vue'
import KDarkModeButton from './components/KDarkModeButton.vue'
import KLanguageSelector from './components/KLanguageSelector.vue'
import type { KEvent, KEventDialogEmit } from './types/Events'
import { v4 as uuidv4 } from 'uuid'
import type { View } from './types/Calendar'

const lang = ref<string>('en')
const view = ref<View>('calendar')
const events = ref<KEvent[]>([])

const duplicateRandomEvent = (event = events.value.length + 1) => {
  let randomDay: string = (Math.floor(Math.random() * 30) + 1).toString().padStart(2, '0')
  let month: string = (new Date().getMonth() + 1).toString().padStart(2, '0')
  const year = new Date().getFullYear()
  const randomColor = `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`

  const randomEvent = {
    title: `Event ${event}`,
    start_date: `${year}-${month}-${randomDay}`,
    end_date: '',
    description: 'Description of random event',
    color: randomColor,
    autor: 'Kevin Méndez'
  }

  events.value.push({ ...randomEvent, id: uuidv4() })
}

const prevMonth = (date: string) => {
  console.log('prevMonth', date)
}

const nextMonth = (date: string) => {
  console.log('nextMonth', date)
}

const toToday = (date: string) => {
  console.log('toToday', date)
}

const eventClicked = (event: KEventDialogEmit) => {
  console.log('event', event)
}

const eventsReceived = (events: KEvent[]) => {
  console.log('events', events)
}

const dateReceived = ({ day, events }: { day: string, events: KEvent[] }) => {
  console.log('date', day, events)
}

onMounted(() => {
  for (let i = 0; i < 30; i++) {
    duplicateRandomEvent(i + 1)
  }
})
</script>

<template>
  <header>
    <div class="flex justify-between p-4">
      <h1>vue-K-alendar</h1>
      <KDarkModeButton />
    </div>
    <div class="space-x-2">
      <button
        class="px-2 py-1 border rounded-md border-gray-200 dark:border-slate-600"
        @click="duplicateRandomEvent()"
      >
        Generate random event
      </button>
      <KLanguageSelector v-model="lang" />
    </div>
  </header>

  <main class="p-4">
    <VueKAlendar
      :lang
      :events="events"
      @toToday="toToday"
      @event="eventClicked"
      @events="eventsReceived"
      @prevMonth="prevMonth"
      @nextMonth="nextMonth"
      @date="dateReceived"
      :view="view"
    />
  </main>
</template>

<style>
#app {
  @apply dark:bg-slate-900 dark:text-slate-100;
}
</style>
