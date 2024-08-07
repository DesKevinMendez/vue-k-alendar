<script setup lang="ts">
import KAlendar from './components/KAlendar.vue'
import type { KEvent } from './types/Events'

const events: KEvent[] = [
  {
    id: '1',
    title: 'Event 1',
    date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '2',
    title: 'Event 2',
    date: '2024-09-02',
    description: 'Description of event 2'
  },
  {
    id: '3',
    title: 'Event 3',
    date: '2024-08-03',
    description: 'Description of event 3'
  },
  {
    id: '4',
    title: 'Event con mucho texto',
    date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '5',
    title: 'Veamos que tal se muestra así',
    date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '6',
    title: 'Event 6',
    date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '7',
    title: 'Event 7',
    date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '8',
    title: 'Event 8',
    date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '9',
    title: 'Event 9',
    date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '10',
    title: 'Event 10',
    date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '11',
    title: 'Event 11',
    date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '12',
    title: 'Event 12',
    date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '13',
    title: 'Event 13',
    date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '14',
    title: 'Event 14',
    date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '15',
    title: 'Event 15',
    date: '2024-08-08',
    description: 'Description of event 1'
  }
]
</script>

<template>
  <header>
    <div class="text-center">
      <h1>K-alendar</h1>
    </div>
  </header>

  <main class="p-4">
    <k-alendar :events />
  </main>
</template>

<style scoped></style>
