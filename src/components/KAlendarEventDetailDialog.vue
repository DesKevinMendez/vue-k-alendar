<template>
  <KAlendarDialog v-model="openDetail">
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
        <EDTitle v-if="eventLocal?.title" :event="eventLocal" @click="eventTitleClicked" />
        <div class="dates">
          <time :datetime="dates">{{ dates }}</time>
        </div>
        <EDAutor v-if="eventLocal?.autor" :autor="eventLocal.autor" />
        <EDContent v-if="eventLocal?.description" :content="eventLocal.description" />
      </section>
      <section v-else>
        <div class="events">
          <ul>
            <KEventItem
              v-for="event in allEvents"
              :key="event.id"
              :event="event"
              :calendar="calendar"
              @eventClicked="clickedEvent"
            />
          </ul>
        </div>
      </section>
    </template>
  </KAlendarDialog>
</template>

<script setup lang="ts">
import useDate from '@/composables/useDate'
import type { MonthDays } from '@/types/Calendar'
import type { KEvent } from '@/types/Events'
import { computed, ref, toRefs, watchEffect } from 'vue'
import KAlendarDialog from '@/components/KAlendarDialog.vue'
import KEventItem from '@/components/KEventItem.vue'
import { DateTime } from 'luxon'
import ButtonEdit from './Buttons/ButtonEdit.vue'
import ButtonDelete from './Buttons/ButtonDelete.vue'
import EDAutor from './EventDialog/EDAutor.vue'
import EDContent from './EventDialog/EDContent.vue'
import EDTitle from './EventDialog/EDTitle.vue'

const { formatDate, timezone } = useDate()
const openDetail = defineModel<boolean>()
const eventLocal = ref<KEvent | null>(null)
const props = defineProps<{
  event: KEvent | null
  calendar: MonthDays | null
  canEdit?: boolean
  canDelete?: boolean
}>()

const { event, calendar } = toRefs(props)
const emit = defineEmits(['edit', 'delete', 'eventClicked', 'eventTitleClicked'])

const hasTime = (date: string) => {
  const dateTime = DateTime.fromISO(date, { zone: timezone.value })
  return dateTime.isValid && (dateTime.hour !== 0 || dateTime.minute !== 0 || dateTime.second !== 0)
}

const isSeeMore = computed(() => eventLocal.value?.id === 'more')
const allEvents = computed(() => calendar.value?.events)
const eventOf = computed(() => {
  const day = calendar.value?.day
  if (day) {
    return formatDate(day, DateTime.DATE_FULL)
  }
  return ''
})

const dates = computed(() => {
  if (!eventLocal.value || !eventLocal.value.start_date) return ''

  const startFormat = hasTime(eventLocal.value.start_date)
    ? DateTime.DATETIME_MED
    : DateTime.DATE_FULL

  if (eventLocal.value.end_date) {
    const endFormat = hasTime(eventLocal.value.end_date)
      ? DateTime.DATETIME_MED
      : DateTime.DATE_FULL

    const start = formatDate(eventLocal.value.start_date, startFormat)
    const end = formatDate(eventLocal.value.end_date, endFormat)

    return `${start} - ${end}`
  }

  return `${formatDate(eventLocal.value.start_date, startFormat)}`
})

watchEffect(() => {
  eventLocal.value = event.value
})


const closeDialog = () => {
  openDetail.value = false
}

const eventTitleClicked = () => {
  emit('eventTitleClicked', { closeDialog, event: eventLocal.value })
}

const edit = () => {
  emit('edit', { closeDialog, event: eventLocal.value })
}

const deleteEvent = () => {
  emit('delete', { closeDialog, event: eventLocal.value })
}

const clickedEvent = ({ event: eventClck }: { event: KEvent }) => {
  eventLocal.value = eventClck
  emit('eventClicked', { closeDialog, event: eventLocal.value })
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
