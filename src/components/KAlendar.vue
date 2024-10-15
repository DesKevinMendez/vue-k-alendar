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
import { useDialog } from '@/composables/useDialog'
import useRenderCalendar from '@/composables/useRenderCalendar'
import type { KEvent } from '@/types/Events'
import { watch } from 'vue'
import CDays from './Calendar/CDays.vue'
import CHeader from './Calendar/CHeader.vue'
import CIndex from './Calendar/CIndex.vue'
import KAlendarEventDetailDialog from './KAlendarEventDetailDialog.vue'

const emit = defineEmits([
  'delete',
  'edit',
  'eventClicked',
  'eventTitleClicked',
  'nextMonth',
  'prevMonth',
  'toToday'
])

const props = defineProps<{
  events: KEvent[]
  lang?: string
  canEdit?: boolean
  canDelete?: boolean
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

const eventClickedFromDialog = (event: KEvent) => {
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
