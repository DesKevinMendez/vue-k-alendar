<script setup lang="ts">
import { onMounted, ref } from 'vue'
import KAlendar from '@/views/VueKAlendar.vue'
import KDarkModeButton from './components/KDarkModeButton.vue'
import type { KEvent, KEventDialogEmit } from './types/Events'
import { v4 as uuidv4 } from 'uuid'
const lang = ref<string>('en')
const canEdit = ref<boolean>(true)
const canDelete = ref<boolean>(true)
const withDefaultModal = ref<boolean>(true)

const events = ref<KEvent[]>([])

const deleteEvent = ({ closeDialog, event }: KEventDialogEmit) => {
  console.log('delete', event)
  events.value = events.value.filter((e) => e.id !== event.id)
  closeDialog()
}

const editEvent = ({ closeDialog, event }: KEventDialogEmit) => {
  console.log('edit', event)
  closeDialog()
}

const duplicateRandomEvent = (event = events.value.length + 1) => {
  let randomDay: string | number = Math.floor(Math.random() * 30) + 1
  let month: string | number = new Date().getMonth() + 1
  const year = new Date().getFullYear()
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
  if (randomDay < 10) {
    randomDay = `0${randomDay}`
  }

  if (month < 10) {
    month = `0${month}`
  }

  const randomEvent = {
    title: `Event ${event}`,
    start_date: `${year}-${month}-${randomDay}`,
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
  console.log('eventClicked', event)
}

const eventTitleClicked = (event: KEventDialogEmit) => {
  console.log('eventTitleClicked', event)

  event.closeDialog()
}

const plusEventCountClickedFromDialog = (events: KEvent[]) => {
  console.log('plusEventCountClickedFromDialog', events)
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
      <button
        class="px-2 py-1 border rounded-md border-gray-200 dark:border-slate-600"
        @click="withDefaultModal = !withDefaultModal"
      >
        With default modal: {{ withDefaultModal ? 'Yes' : 'No' }}
      </button>
    </div>
  </header>

  <main class="p-4">
    <k-alendar
      :can-edit="canEdit"
      :can-delete="canDelete"
      :with-default-modal="withDefaultModal"
      :lang
      :events
      @toToday="toToday"
      @eventClicked="eventClicked"
      @eventTitleClicked="eventTitleClicked"
      @plusEventCountClicked="plusEventCountClickedFromDialog"
      @prevMonth="prevMonth"
      @nextMonth="nextMonth"
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
