<template>
  <section class="k-alendar-wrapper-container">
    <KCalendarHeader
      @handlePrevMonth="handlePrevMonth"
      @handleNextMonth="handleNextMonth"
      @handleToToday="handleToToday"
    />
    <KAlendar
      v-if="view === 'calendar'"
      @eventClicked="eventClicked"
      @plusEventCountClicked="plusEventCountClickedFromDialog"
    />

    <KListCalendar v-else :events="events" @eventClicked="eventClicked" />
    <KAlendarEventDetailDialog
      v-if="withDefaultModal"
      v-model="openEventsDetailDialog"
      :canDelete="canDelete"
      :canEdit="canEdit"
      @eventClicked="eventClicked"
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
import { useDialog } from '@/composables/useDialog'
import useRenderCalendar from '@/composables/useRenderCalendar'
import type { View } from '@/types/Calendar'
import type { KEvent } from '@/types/Events'
import { watch } from 'vue'
import KAlendar from '../components/Calendar/KCalendar.vue'
import KCalendarHeader from '../components/Calendar/KCalendarHeader.vue'
import KAlendarEventDetailDialog from '../components/KAlendarEventDetailDialog.vue'
import KListCalendar from '../components/List/KListCalendar.vue'

const emit = defineEmits([
  'delete',
  'edit',
  'eventClicked',
  'eventTitleClicked',
  'nextMonth',
  'prevMonth',
  'toToday',
  'plusEventCountClicked'
])

const props = defineProps<{
  events: KEvent[]
  lang?: string
  canEdit?: boolean
  canDelete?: boolean
  withDefaultModal?: boolean
  view?: View
}>()

const { setLang } = useConfig()
const { openEventsDetailDialog, dialogPositionToRender, closeDialog } = useDialog()
const { eventsToShowInCalendar, generateCalendar, monthDays, currentDate } = useRenderCalendar()

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
  monthDays.value = generateCalendar(currentDate.value.toFormat('yyyy-MM-dd'))
}

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

const eventClicked = (event: KEvent) => {
  emit('eventClicked', event)
}

const eventTitleClicked = (event: KEvent) => {
  emit('eventTitleClicked', { event, closeDialog })
}

const edit = (event: KEvent) => {
  emit('edit', { event, closeDialog })
}

const deleteEvent = (event: KEvent) => {
  emit('delete', { event, closeDialog })
}

const plusEventCountClickedFromDialog = ({ events }: { events: KEvent[] }) => {
  emit('plusEventCountClicked', { events, closeDialog })
}
</script>

<style scoped lang="postcss">
.k-alendar-wrapper-container {
  @apply space-y-4 dark:text-slate-100;
}

button {
  @apply hover:bg-[#ebeef5] transition-colors dark:hover:bg-slate-600;
}
</style>
