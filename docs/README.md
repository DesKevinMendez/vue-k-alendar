# Docs

## What is vue-k-alendar

The `@deskevinmendez/vue-k-alendar` is a simple calendar created without dependencies for printing events in a calendar.

## Installation

- Pnpm

```bash
pnpm install @deskevinmendez/vue-k-alendar
```

- Yarn

```bash
yarn add @deskevinmendez/vue-k-alendar
```

- NPM

```bash
npm  install @deskevinmendez/vue-k-alendar
```

## Usage

```vue
<template>
  <KAlendar
    :lang="'es'"
    :events="events"
    @nextMonth="handleNextMonth"
    @prevMonth="handlePrevMonth"
    @toToday="handleToToday"
    @edit="handleEdit"
    @delete="handleDelete"
    @eventClicked="handleEventClicked"
    @eventDialogClicked="handleEventDialogClicked"
  />
</template>

<script>
import { ref } from 'vue'
import KAlendar from '@deskevinmendez/vue-k-alendar'
import "@deskevinmendez/vue-k-alendar/style.css";

export default {
  components: {
    KAlendar
  },
  setup() {
    const events = ref([
      {
        id: '1',
        title: 'Event 1',
        start_date: '2024-08-16T00:35:00.000000Z',
        end_date: '2024-08-17T00:35:00.000000Z',
        description: 'Description of event 1',
        color: '#a02222',
        autor: 'Kevin Méndez'
      }
      // more events...
    ])

    const handleNextMonth = (date) => {
      console.log('Next month:', date)
    }

    const handlePrevMonth = (date) => {
      console.log('Previous month:', date)
    }

    const handleToToday = (date) => {
      console.log('To today:', date)
    }

    const handleEdit = (event) => {
      console.log('Edit event:', event)
    }

    const handleDelete = (event) => {
      console.log('Delete event:', event)
    }

    const handleEventClicked = (event) => {
      console.log('Event clicked:', event)
    }

    const handleEventDialogClicked = (event) => {
      console.log('Event dialog clicked:', event)
    }

    return {
      events,
      handleNextMonth,
      handlePrevMonth,
      handleToToday,
      handleEdit,
      handleDelete,
      handleEventClicked,
      handleEventDialogClicked
    }
  }
}
</script>
```


## Dark mode support

The calendar component has been created with tailwind, and support the dark mode of the tailwind by default

## Props

| Prop Name   | Type    | Default       | Description                                    |
| ----------- | ------- | ------------- | ---------------------------------------------- |
| `lang`      | String  | `'en'`        | Language for the calendar (e.g., 'en', 'es').  |
| `events`    | Array   | `[]`          | List of events to display in the calendar.     |
| `canEdit`   | Boolean | `'undefined'` | Show/hidden icon of the edit in event detail   |
| `canDelete` | Boolean | `'undefined'` | Show/hidden icon of the delete in event detail |

## Events

| Event Name          | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `nextMonth`         | Emitted when the user navigates to the next month.       |
| `prevMonth`         | Emitted when the user navigates to the previous month.   |
| `toToday`           | Emitted when the user navigates to the current month.    |
| `edit`              | Emitted when an event is edited.                         |
| `delete`            | Emitted when an event is deleted.                        |
| `eventClicked`      | Emitted when an event is clicked.                        |
| `eventTitleClicked` | Emitted when the name of the event in dialog is clicked. |

## Typescript

The events should be a type of
```ts
export type KEvent = {
  id: string
  title: string
  start_date: string
  end_date?: string | null
  description: string
  autor?: string
  color?: string
}
```

::: tip
 Use the import `import { type KEvent } from "@deskevinmendez/vue-k-alendar";`
:::

The emits returns a type `KEventDialogEmit`

```ts
export type KEventDialogEmit = {
  event: KEvent
  closeDialog: () => void
}
```
::: tip
and you can import as `import { type KEventDialogEmit } from "@deskevinmendez/vue-k-alendar";`
:::