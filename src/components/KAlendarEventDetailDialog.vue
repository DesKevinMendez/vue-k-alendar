<template>
  <KDialog v-model="openDetail">
    <template #header>
      <div v-if="!isSeeMore" class="flex justify-between">
        <ButtonEdit v-if="canEdit" @click="edit" />
        <ButtonDelete v-if="canDelete" @click="deleteEvent" />
      </div>
      <div v-else>
        <span>
          <time :datetime="eventOf">{{ eventOf }}</time>
        </span>
      </div>
    </template>
    <template #default>
      <section v-if="!isSeeMore" class="k-alendar-event-detail-main-wrapper">
        <EDTitle v-if="eventSelected?.title" :event="eventSelected" @click="eventTitleClicked" />
        <div class="dates">
          <time :datetime="dates">{{ dates }}</time>
        </div>
        <EDAutor v-if="eventSelected?.autor" :autor="eventSelected.autor" />
        <EDContent v-if="eventSelected?.description" :content="eventSelected.description" />
      </section>
      <section v-else>
        <div class="events">
          <ul>
            <KEventItem
              v-for="event in allEvents"
              :key="event.id"
              :event="event"
              :calendar="calendarDaySelect"
              @eventClicked="clickedEvent"
            />
          </ul>
        </div>
      </section>
    </template>
  </KDialog>
</template>

<script setup lang="ts">
import KEventItem from '@/components/KEventItem.vue'
import KDialog from '@/components/Reusable/KDialog.vue'
import useDate from '@/composables/useDate'
import useEvent from '@/composables/useEvent'
import useRenderCalendar from '@/composables/useRenderCalendar'
import type { KEvent } from '@/types/Events'
import { DateTime } from 'luxon'
import { computed } from 'vue'
import ButtonDelete from './Buttons/ButtonDelete.vue'
import ButtonEdit from './Buttons/ButtonEdit.vue'
import EDAutor from './EventDialog/EDAutor.vue'
import EDContent from './EventDialog/EDContent.vue'
import EDTitle from './EventDialog/EDTitle.vue'

const { formatDate } = useDate()
const { eventSelected } = useEvent()
const { calendarDaySelect } = useRenderCalendar()
const openDetail = defineModel<boolean>()

defineProps<{
  canEdit?: boolean
  canDelete?: boolean
}>()

const emit = defineEmits(['edit', 'delete', 'eventClicked', 'eventTitleClicked'])

const hasTime = (date: string) => {
  const dateTime = DateTime.fromISO(date)
  return dateTime.isValid && (dateTime.hour !== 0 || dateTime.minute !== 0 || dateTime.second !== 0)
}

const isSeeMore = computed(() => eventSelected.value?.id === 'more')
const allEvents = computed(() => calendarDaySelect.value?.events)
const eventOf = computed(() => {
  const day = calendarDaySelect.value?.day
  if (day) {
    return formatDate(day, DateTime.DATE_FULL)
  }
  return ''
})

const dates = computed(() => {
  if (!eventSelected.value || !eventSelected.value.start_date) return ''

  const startFormat = hasTime(eventSelected.value.start_date)
    ? DateTime.DATETIME_MED
    : DateTime.DATE_FULL

  if (eventSelected.value.end_date) {
    const endFormat = hasTime(eventSelected.value.end_date)
      ? DateTime.DATETIME_MED
      : DateTime.DATE_FULL

    const start = formatDate(eventSelected.value.start_date, startFormat)
    const end = formatDate(eventSelected.value.end_date, endFormat)

    return `${start} - ${end}`
  }

  return `${formatDate(eventSelected.value.start_date, startFormat)}`
})

const eventTitleClicked = () => {
  emit('eventTitleClicked', eventSelected.value)
}

const edit = () => {
  emit('edit', eventSelected.value)
}

const deleteEvent = () => {
  emit('delete', eventSelected.value)
}

const clickedEvent = ({ event }: { event: KEvent }) => {
  eventSelected.value = event
  emit('eventClicked', event)
}
</script>

<style scoped lang="postcss">
.k-alendar-event-detail-main-wrapper {
  @apply flex flex-col min-h-full;
}

.dates {
  @apply text-sm text-gray-500 mb-4 dark:text-gray-400;
}

.events {
  @apply w-full;
  ul {
    @apply list-none space-y-2;
    li {
      @apply cursor-pointer;
    }
  }
}
</style>
