<template>
  <section class="k-alendar-wrapper-container">
    <header class="k-alendar-header-container">
      <div class="left-buttons">
        <div class="navegation-buttons">
          <ButtonPrevMonth @click="prevMonth" />
          <ButtonNextMonth @click="nextMonth" />
        </div>
        <ButtonTodayMonth @click="toToday" />
      </div>
      <div class="center-title">
        <h2>{{ title }}</h2>
      </div>
    </header>
    <CDays />
    <div class="k-alendar-container">
      <div
        v-for="calendar in monthDays"
        :key="calendar.day.toString()"
        @click="selectThisDate(calendar)"
        :class="calendar.class"
        class="date"
        :ref="(el) => (dateRefs[calendar.day] = el)"
      >
        <div class="k-alendar-span-container">
          <span class="k-alendar-text">{{ calendar.text }}</span>
          <span class="point" v-if="calendar.events.length > 0" />
        </div>
        <div class="events" v-if="calendar.events.length > 0">
          <ul>
            <KEventItem
              v-for="event in howEventsShouldRender(calendar.day, calendar.events)"
              :key="event.id"
              :event="event"
              :calendar
              @eventClicked="eventClicked"
            />
          </ul>
        </div>
      </div>
    </div>
    <KAlendarEventDetailDialog
      v-model="openEventsDetailDialog"
      :event="eventSelected"
      :calendar="calendarDaySelect"
      :canDelete="canDelete"
      :canEdit="canEdit"
      @eventClicked="eventClickedFromDialog"
      @eventTitleClicked="eventTitleClicked"
      @edit="edit"
      @delete="deleteEvent"
      :style="{
        top: `${dialogPositionToRender.y}px`,
        left: `${dialogPositionToRender.x}px`
      }"
    />
  </section>
</template>

<script setup lang="ts">
import useDate from '@/composables/useDate'
import useRenderCalendar from '@/composables/useRenderCalendar'
import type { DayCalendar, MonthDays } from '@/types/Calendar'
import type { KEvent, KEventDialogEmit } from '@/types/Events'
import { ref, watch } from 'vue'
import KAlendarEventDetailDialog from './KAlendarEventDetailDialog.vue'
import KEventItem from '@/components/KEventItem.vue'
import useConfig from '@/composables/useConfig'
import { useDialog } from '@/composables/useDialog'
import ButtonPrevMonth from './Buttons/ButtonPrevMonth.vue'
import ButtonNextMonth from './Buttons/ButtonNextMonth.vue'
import ButtonTodayMonth from './Buttons/ButtonTodayMonth.vue'
import CDays from './Calendar/CDays.vue'

const emit = defineEmits([
  'nextMonth',
  'prevMonth',
  'toToday',
  'edit',
  'delete',
  'eventClicked',
  'eventDialogClicked',
  'eventTitleClicked'
])

const props = defineProps<{
  events: KEvent[]
  tz?: string
  lang?: string
  canEdit?: boolean
  canDelete?: boolean
}>()

const { timezone } = useDate()
const { setLang } = useConfig()
const { collision } = useDialog()

const {
  nextMonth,
  prevMonth,
  eventsToShowInCalendar,
  toToday,
  title,
  generateCalendar,
  monthDays,
  currentDate
} = useRenderCalendar(emit)

const eventSelected = ref<KEvent>({
  id: '',
  title: '',
  start_date: '',
  description: ''
})
const calendarDaySelect = ref<MonthDays | null>(null)
const dateRefs = ref<Record<string, any>>({})
const openEventsDetailDialog = ref(false)
const dialogPositionToRender = ref({ x: 0, y: 0 })

const regenerateCalendar = () => {
  eventsToShowInCalendar.value = props.events
  let currentDt = ''

  if (timezone.value === 'utc') {
    currentDt = currentDate.value.toFormat('yyyy-MM-dd', { locale: timezone.value })
  } else {
    currentDt = currentDate.value.toFormat('yyyy-MM-dd')
  }
  monthDays.value = generateCalendar(currentDt)
}

watch(
  () => props.tz,
  (tz) => {
    if (tz) {
      timezone.value = tz
    }
  },
  { immediate: true }
)

watch(
  () => props.lang,
  (lang) => {
    if (lang) {
      setLang(lang)
    }
  },
  { immediate: true }
)

watch(
  props,
  ({ events }) => {
    if (events) {
      regenerateCalendar()
    }
  },
  { immediate: true, deep: true }
)

const eventClickedFromDialog = ({ event, closeDialog }: KEventDialogEmit) => {
  emit('eventDialogClicked', { event: props.events.find((e) => (e.id = event.id)), closeDialog })
}
const eventTitleClicked = ({ event, closeDialog }: KEventDialogEmit) => {
  emit('eventTitleClicked', { event: props.events.find((e) => (e.id = event.id)), closeDialog })
}

const eventClicked = ({
  mauseEvent,
  event,
  calendar
}: {
  mauseEvent: MouseEvent
  event: KEvent
  day: string
  calendar: DayCalendar
}) => {
  eventSelected.value = event
  calendarDaySelect.value = calendar

  if (calendar.events.length > 0) {
    let target = mauseEvent.target as HTMLElement

    if (target.tagName === 'H3') {
      target = target.parentElement as HTMLElement
    }

    dialogPositionToRender.value = collision(target)

    openEventsDetailDialog.value = true
  }

  emit('eventClicked', {
    event: props.events.find((e) => (e.id = event.id)),
    calendar,
    mauseEvent
  })
}

const edit = ({ closeDialog, event }: KEventDialogEmit) => {
  emit('edit', { closeDialog, event })
}

const deleteEvent = ({ closeDialog, event }: KEventDialogEmit) => {
  emit('delete', { closeDialog, event })
}

const calculateEventsThatCanBeRender = (day: string) => {
  const dateDiv: HTMLDivElement | null = dateRefs.value[day]
  let heightOfEventParent = 0
  const heightOfLiElement = 32
  const paddingTopOfLiElement = 8
  const paddingOfDateDiv = 8

  let totalOfEventsThatCanRender = 0

  if (dateDiv) {
    heightOfEventParent = dateDiv.clientHeight - paddingOfDateDiv * 2

    const sizeOfSpan = (dateDiv.querySelector('span.k-alendar-text') as HTMLSpanElement)
      ?.offsetHeight
    heightOfEventParent -= sizeOfSpan || 0
    totalOfEventsThatCanRender = Math.floor(
      heightOfEventParent / (heightOfLiElement + paddingTopOfLiElement)
    )
  }

  return totalOfEventsThatCanRender
}

const howEventsShouldRender = (day: string, events: KEvent[]) => {
  const totalOfEventsThatCanRender = calculateEventsThatCanBeRender(day)

  const eventsToRender = events.slice(0, totalOfEventsThatCanRender)

  if (events.length - totalOfEventsThatCanRender > 0) {
    eventsToRender.splice(eventsToRender.length - 1, 1, {
      id: 'more',
      title: `+${events.length + 1 - totalOfEventsThatCanRender}`,
      start_date: '',
      description: ''
    })
  }

  return eventsToRender
}

const selectThisDate = (calendar: MonthDays) => {
  const isMobile = window.innerWidth < 768

  if (isMobile) {
    const sizeOfDialog = 400
    const x = Math.floor((window.innerWidth - sizeOfDialog) / 2)
    dialogPositionToRender.value = { x, y: 16 }

    if (calendar.events.length > 0) {
      if (calendar.events.length === 1) {
        eventSelected.value = calendar.events[0]

        emit('eventClicked', {
          event: eventSelected.value,
          calendar,
          mauseEvent: null
        })

      } else {
        eventSelected.value = {
          id: 'more',
          title: `+${calendar.events.length} eventos`,
          start_date: '',
          description: ''
        }
      }

      calendarDaySelect.value = calendar
      openEventsDetailDialog.value = true
    }
  }
}
</script>

<style scoped lang="postcss">
.k-alendar-wrapper-container {
  @apply space-y-4 dark:text-slate-100;
}

button {
  @apply hover:bg-[#ebeef5] transition-colors dark:hover:bg-slate-600;
}

.k-alendar-container {
  @apply grid gap-1 auto-rows-auto;
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.k-alendar-header-container {
  @apply flex justify-between space-y-2 items-center sm:space-y-0;
  .center-title > h2 {
    @apply capitalize;
  }
  .left-buttons {
    @apply flex items-center space-x-2;
  }
}

.k-alendar-container > * {
  aspect-ratio: 1 / 1;
}

.k-alendar-span-container {
  @apply flex justify-between items-center w-full;
  .k-alendar-text {
    @apply font-bold;
  }
}

.date {
  @apply flex items-start justify-start p-2 cursor-pointer flex-col relative rounded-sm
  hover:bg-[#ebeef5] dark:hover:bg-slate-600;
  @apply border border-gray-200 dark:border-slate-600;
}

.other-month-date {
  @apply text-gray-400;
}

.events {
  @apply w-full hidden md:block;
  ul {
    @apply list-none space-y-2;
  }
}

.point {
  @apply w-2 h-2 bg-blue-500 rounded-full md:hidden;
}

.selected {
  @apply bg-[#ebeef5] text-inherit p-2
  dark:bg-slate-700;
}
</style>
