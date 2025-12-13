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

const eventsForDay = ref<KEvent[]>([
  {
    id: '019b0aba-cc6c-736a-9503-0b1c8e7a6bf5',
    title: 'Pizza Hut (IGG-3519)',
    start_date: '2025-12-10T05:59:59.999Z',
    end_date: '',
    description:
      'Vehículo: IGG-3519\nDestino: Pizza Hut\nCoordenadas: 13.7014537, -89.22279309999999',
    color: '#fbbf24'
  },
  {
    id: '019b0aae-b5d3-70d2-9f0e-88c579168ee7',
    title: 'Parque central de La Palma, Chalatenango. (IGG-3519)',
    start_date: '2025-12-11T08:30:00.999Z',
    end_date: '',
    description:
      'Vehículo: IGG-3519\nDestino: Parque central de La Palma, Chalatenango.\nCoordenadas: 14.3170912, -89.1706838',
    color: '#fbbf24'
  },
  {
    id: '019afbc3-a702-7173-945e-af576a73803b',
    title: 'MRHQ+G9 Soyapango, El Salvador (IGG-3519)',
    start_date: '2025-12-11T11:00:00.999Z',
    end_date: '',
    description:
      'Vehículo: IGG-3519\nDestino: MRHQ+G9 Soyapango, El Salvador\nCoordenadas: 13.67884722049237, -89.16160583496094',
    color: '#fbbf24'
  },
  {
    id: '019afbc3-a702-7173-945e-af576a73803b',
    title: 'MRHQ+G9 Soyapango, El Salvador (IGG-3519)',
    start_date: '2025-12-11T11:30:00.999Z',
    end_date: '',
    description:
      'Vehículo: IGG-3519\nDestino: MRHQ+G9 Soyapango, El Salvador\nCoordenadas: 13.67884722049237, -89.16160583496094',
    color: '#807900'
  },
  {
    id: '019afbc3-a702-7173-945e-af576a73803c',
    title: 'Soyapango, El Salvador',
    start_date: '2025-12-11T11:45:00.999Z',
    end_date: '2025-12-11T14:45:00.999Z',
    description:
      'Vehículo: IGG-3519\nDestino: MRHQ+G9 Soyapango, El Salvador\nCoordenadas: 13.67884722049237, -89.16160583496094',
    color: '#175000'
  },
  {
    id: '019afbc3-a702-7173-945e-af576a73803c',
    title: 'Aereopuerto, El Salvador',
    start_date: '2025-12-11T12:00:00.999Z',
    end_date: '',
    description:
      'Vehículo: IGG-3519\nDestino: MRHQ+G9 Soyapango, El Salvador\nCoordenadas: 13.67884722049237, -89.16160583496094',
    color: '#008080'
  },
  {
    id: '019afbc3-a702-7173-945e-af576a73803d',
    title: 'Parque central de La Palma, Chalatenango.',
    start_date: '2025-12-11T20:00:00.999Z',
    end_date: '2025-12-12T02:15:00.999Z',
    description:
      'Vehículo: IGG-3519\nDestino: MRHQ+G9 Soyapango, El Salvador\nCoordenadas: 13.67884722049237, -89.16160583496094',
    color: '#008080'
  },
  {
    id: '019afbc3-a702-7173-945e-af576a73803d',
    title: 'Event all day',
    start_date: '2025-12-11',
    end_date: '',
    description:
      'All Day Event',
    color: '#890000'
  },
  {
    id: '019afbc3-a702-7173-945e-af576a73803d',
    title: 'Event all day 2 ',
    start_date: '2025-12-11',
    end_date: '',
    description:
      'All Day Event',
    color: '#008080'
  },
])
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
      :events="eventsForDay"
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
