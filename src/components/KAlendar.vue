<template>
  <section class="k-alendar-wrapper-container">
    <CHeader
      @handlePrevMonth="handlePrevMonth"
      @handleNextMonth="handleNextMonth"
      @handleToToday="handleToToday"
    />
    <CDays />
    <CIndex />
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
import useConfig from '@/composables/useConfig'
import useDate from '@/composables/useDate'
import { useDialog } from '@/composables/useDialog'
import useEvent from '@/composables/useEvent'
import useRenderCalendar from '@/composables/useRenderCalendar'
import type { KEvent, KEventDialogEmit } from '@/types/Events'
import { watch } from 'vue'
import CDays from './Calendar/CDays.vue'
import CHeader from './Calendar/CHeader.vue'
import CIndex from './Calendar/CIndex.vue'
import KAlendarEventDetailDialog from './KAlendarEventDetailDialog.vue'

const emit = defineEmits([
  'delete',
  'edit',
  'eventClicked',
  'eventDialogClicked',
  'eventTitleClicked',
  'nextMonth',
  'prevMonth',
  'toToday'
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
const { eventSelected } = useEvent()
const { openEventsDetailDialog, dialogPositionToRender } = useDialog()
const { eventsToShowInCalendar, generateCalendar, monthDays, currentDate, calendarDaySelect } =
  useRenderCalendar()

const handlePrevMonth = (date: string) => {
  emit('prevMonth', date)
}

const handleNextMonth = (date: string) => {
  emit('nextMonth', date)
}

const handleToToday = (date: string) => {
  emit('toToday', date)
}

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

const edit = ({ closeDialog, event }: KEventDialogEmit) => {
  emit('edit', { closeDialog, event })
}

const deleteEvent = ({ closeDialog, event }: KEventDialogEmit) => {
  emit('delete', { closeDialog, event })
}
</script>

<style scoped lang="postcss">
.k-alendar-wrapper-container {
  @apply space-y-4 dark:text-slate-100;
}

button {
  @apply hover:bg-[#ebeef5] transition-colors dark:hover:bg-slate-600;
}

.other-month-date {
  @apply text-gray-400;
}

.selected {
  @apply bg-[#ebeef5] text-inherit p-2
  dark:bg-slate-700;
}
</style>
