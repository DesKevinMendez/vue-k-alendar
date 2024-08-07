<script setup lang="ts">
import KAlendar, { type KEvent } from './components/KAlendar.vue'

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
