<script setup lang="ts">
import { ref } from 'vue'
import KAlendar from './components/KAlendar.vue'
import KDarkModeButton from './components/KDarkModeButton.vue'
import type { KEvent, KEventDialogEmit } from './types/Events'

const lang = ref<string>('en')
const events = ref<KEvent[]>([
  // {
  //   id: '16',
  //   title: 'Event 16',
  //   start_date: '2024-08-15',
  //   autor: 'John Doe',
  //   description:
  //     'Lorem ipsun standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
  // },
  // {
  //   id: '20',
  //   title: 'Event 20',
  //   start_date: '2024-08-29T09:35:00.000000Z',
  //   end_date: '2024-08-31T20:00:45.000000Z',
  //   color: '#dc2626',
  //   description: 'Evento con fecha y hora'
  // },
  {
    id: '45',
    title: 'Event 45',
    start_date: '2024-08-06T21:35:55.000000Z',
    end_date: '2024-08-06T23:35:55.000000Z',
    color: '#92400e',
    description: 'Evento con fecha y hora'
  },
  {
    id: '9cc69d03-7215-41e2-966a-9c787b690223',
    title: 'Dto',
    description: 'Das',
    color: '#a02222',
    start_date: '2024-08-16T00:35:00.000000Z',
    end_date: '2024-08-17T00:35:00.000000Z'
  }
])

const deleteEvent = ({ closeDialog, event }: KEventDialogEmit) => {
  events.value = events.value.filter((e) => e.id !== event.id)
  closeDialog()
}

const editEvent = ({ closeDialog, event }: KEventDialogEmit) => {
  console.log(event)
  closeDialog()
}

const duplicateRandomEvent = () => {
  let randomDay: string | number = Math.floor(Math.random() * 30) + 1
  let month: string | number = new Date().getMonth() + 1
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
  if (randomDay < 10) {
    randomDay = `0${randomDay}`
  }

  if (month < 10) {
    month = `0${month}`
  }

  const titles = ['Event 1', 'Event 2', 'Event 3', 'Event 4', 'Event 5']

  const randomEvent = {
    title: titles[Math.floor(Math.random() * titles.length)],
    start_date: `2024-${month}-${randomDay}`,
    description: 'Description of random event',
    color: randomColor
  }

  events.value.push({ ...randomEvent, id: String(Math.random()) })
}
</script>

<template>
  <header>
    <div class="flex justify-between p-4">
      <h1>K-alendar</h1>
      <KDarkModeButton />
    </div>
    <button
      class="px-2 py-1 border rounded-md border-gray-200 dark:border-slate-600"
      @click="duplicateRandomEvent"
    >
      Generate random event
    </button>
    <button
      class="px-2 py-1 border rounded-md border-gray-200 dark:border-slate-600"
      @click="lang = lang === 'es' ? 'en' : 'es'"
    >
      Switch to {{ lang === 'es' ? 'English' : 'Spanish' }}
    </button>
  </header>

  <main class="p-4">
    <k-alendar :lang :events @delete="deleteEvent" @edit="editEvent" />
  </main>
</template>

<style>
#app {
  @apply dark:bg-slate-900 dark:text-slate-100;
}
</style>
