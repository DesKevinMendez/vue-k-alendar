<script setup lang="ts">
import { onMounted, ref } from 'vue'
import KAlendar from '@/components/KAlendar.vue'
import KDarkModeButton from './components/KDarkModeButton.vue'
import type { KEvent, KEventDialogEmit } from './types/Events'

const lang = ref<string>('en')
const canEdit = ref<boolean>(true)
const canDelete = ref<boolean>(true)

const events = ref<KEvent[]>([
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
  console.log('delete', event);
  events.value = events.value.filter((e) => e.id !== event.id)
  closeDialog()
}

const editEvent = ({ closeDialog, event }: KEventDialogEmit) => {
  console.log('edit', event)
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
    color: randomColor,
    autor: 'Kevin Méndez'
  }

  events.value.push({ ...randomEvent, id: String(Math.random()) })
}

onMounted(() => {
  for (let i = 0; i < 15; i++) {
    duplicateRandomEvent()
  }
})
</script>

<template>
  <header>
    <div class="flex justify-between p-4">
      <h1>K-alendar</h1>
      <KDarkModeButton />
    </div>
    <div class="space-x-2">
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

      <button
        class="px-2 py-1 border rounded-md border-gray-200 dark:border-slate-600"
        @click="canEdit = !canEdit"
      >
        Can edit: {{ canEdit ? 'Yes' : 'No' }}
      </button>

      <button
        class="px-2 py-1 border rounded-md border-gray-200 dark:border-slate-600"
        @click="canDelete = !canDelete"
      >
        Can delete: {{ canDelete ? 'Yes' : 'No' }}
      </button>
    </div>
  </header>

  <main class="p-4">
    <k-alendar
      :can-edit="canEdit"
      :can-delete="canDelete"
      :lang
      :events
      @delete="deleteEvent"
      @edit="editEvent"
    />
  </main>
</template>

<style>
#app {
  @apply dark:bg-slate-900 dark:text-slate-100;
}
</style>
