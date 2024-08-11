<template>
  <KAlendarDialog v-model="openDetail">
    <template #header>
      <div v-if="!isSeeMore" class="flex justify-between space-x-3">
        <svg
          class="h-5 w-5 text-gray-600"
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="pen-to-square"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          @click="edit"
        >
          <path
            class=""
            fill="currentColor"
            d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
          ></path>
        </svg>
        <svg
          class="h-5 w-5 text-gray-600"
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="trash-can"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          @click="deleteEvent"
        >
          <path
            class=""
            fill="currentColor"
            d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
          ></path>
        </svg>
      </div>
      <div v-else>
        <span>
          <time :datetime="eventOf">{{ eventOf }}</time>
        </span>
      </div>
    </template>
    <template #default>
      <section v-if="!isSeeMore" class="k-alendar-event-detail-main-wrapper">
        <div class="title">
          <span
            class="circle"
            v-if="eventLocal?.color"
            :style="{ backgroundColor: eventLocal.color }"
          />
          <h2>{{ eventLocal?.title }}</h2>
        </div>
        <div class="dates">
          <time :datetime="dates">{{ dates }}</time>
        </div>
        <div class="autor" v-if="eventLocal?.autor">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="user"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            data-v-af0b188d=""
          >
            <path
              class=""
              fill="currentColor"
              d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
            ></path>
          </svg>
          <p>{{ eventLocal?.autor }}</p>
        </div>
        <div class="content">
          <svg
            class="h-5 w-5 text-gray-600 dark:text-gray-300"
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="comment"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              class=""
              fill="currentColor"
              d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"
            ></path>
          </svg>
          <p>{{ eventLocal?.description }}</p>
        </div>
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
import KAlendarDialog from './KAlendarDialog.vue'
import KEventItem from './KEventItem.vue'
import { DateTime } from 'luxon'

const { formatDate } = useDate()
const openDetail = defineModel<boolean>()
const eventLocal = ref<KEvent | null>(null)
const props = defineProps<{ event: KEvent | null; calendar: MonthDays | null }>()
const { event, calendar } = toRefs(props)
const emit = defineEmits(['edit', 'delete'])
const isSeeMore = computed(() => eventLocal.value?.id === 'more')
watchEffect(() => {
  eventLocal.value = event.value
})

const closeDialog = () => {
  openDetail.value = false
}

const edit = () => {
  emit('edit', { closeDialog, event: eventLocal.value })
}

const deleteEvent = () => {
  emit('delete', { closeDialog, event: eventLocal.value })
}

const allEvents = computed(() => calendar.value?.events)
const eventOf = computed(() => {
  const day = calendar.value?.day
  if (day) {
    return formatDate(day, DateTime.DATE_FULL)
  }
  return ''
})

const clickedEvent = ({ event: eventClck }: { event: KEvent }) => {
  eventLocal.value = eventClck
}

const hasTime = (date: string) => {
  const dateTime = DateTime.fromISO(date)
  return dateTime.isValid && (dateTime.hour !== 0 || dateTime.minute !== 0 || dateTime.second !== 0)
}

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
</script>

<style scoped lang="postcss">
.k-alendar-event-detail-main-wrapper {
  @apply flex flex-col min-h-full;
}
.title {
  @apply flex items-center gap-2;
  span.circle {
    @apply w-4 h-4 rounded-full;
  }
  h2 {
    @apply text-lg font-semibold;
  }
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

.content,
.autor {
  @apply mt-4 grid grid-cols-12 gap-2 flex-1;
  svg {
    @apply h-5 w-5 text-gray-600 col-span-1 dark:text-gray-300;
  }
  p {
    @apply text-base max-h-60 overflow-x-scroll text-gray-600 col-span-11
    dark:text-gray-300;
  }
}
</style>
