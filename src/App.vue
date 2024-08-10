<script setup lang="ts">
import KAlendar from './components/KAlendar.vue'
import KDarkModeButton from './components/KDarkModeButton.vue'
import type { KEvent } from './types/Events'

const events: KEvent[] = [
  {
    id: '16',
    title: 'Event 16',
    start_date: '2024-08-15',
    autor: 'John Doe',
    description:
      'Lorem ipsun standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
  },
  {
    id: '17',
    title: 'Event 17',
    start_date: '2024-08-15',
    description: 'Description of event 17',
    color: '#797979'
  },
  {
    id: '18',
    title: 'Event 18',
    start_date: '2024-08-15',
    description: 'Description of event 17',
    color: '#797979'
  },
  {
    id: '1',
    title: 'Event 1',
    start_date: '2024-08-08',
    end_date: '2024-08-31',
    description: 'Description of event 1',
    color: '#ff0000'
  },
  {
    id: '2',
    title: 'Event 2',
    start_date: '2024-09-02',
    description: 'Description of event 2',
    color: '#00ff00'
  },
  {
    id: '3',
    title: 'Event 3',
    start_date: '2024-08-03',
    end_date: '2024-08-05',
    description: 'Description of event 3',
    color: '#0000ff'
  },
  {
    id: '4',
    title: 'Event con mucho texto',
    start_date: '2024-08-08',
    description: 'Description of event 1',
    color: '#ff00ff'
  },
  {
    id: '5',
    title: 'Veamos que tal se muestra así',
    start_date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '6',
    title: 'Event 6',
    start_date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '7',
    title: 'Event 7',
    start_date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '8',
    title: 'Event 8',
    start_date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '9',
    title: 'Event 9',
    start_date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '10',
    title: 'Event 10',
    start_date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '11',
    title: 'Event 11',
    start_date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '12',
    title: 'Event 12',
    start_date: '2024-08-08',
    end_date: '2024-08-10',
    description: 'Description of event 1'
  },
  {
    id: '13',
    title: 'Event 13',
    start_date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '14',
    title: 'Event 14',
    start_date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '15',
    title: 'Event 15',
    start_date: '2024-08-08',
    description: 'Description of event 1'
  },
  {
    id: '17',
    title: 'Event 17',
    start_date: '2024-08-29T20:35:00',
    end_date: '2024-08-31T08:00:00',
    color: '#dc2626',
    description: 'Evento con fecha y hora'
  },
  {
    id: '19',
    title: 'Event 19',
    start_date: '2024-08-06T21:35:55.000000Z',
    end_date: '2024-08-06T23:35:55.000000Z',
    color: '#92400e',
    description: 'Evento con fecha y hora'
  }
]
</script>

<template>
  <header>
    <div class="flex justify-between p-4">
      <h1>K-alendar</h1>
      <KDarkModeButton />
    </div>
  </header>

  <main class="p-4">
    <k-alendar :events />
  </main>
</template>

<style>
#app {
  @apply dark:bg-slate-900 dark:text-slate-100;
}
</style>
