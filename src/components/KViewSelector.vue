<template>
  <div class="k-view-selector-container">
    <button
      v-for="option in viewOptions"
      :key="option.value"
      @click="handleViewChange(option.value)"
      :class="[
        'k-view-selector-button',
        { 'k-view-selector-button-active': currentView === option.value }
      ]"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { View } from '@/types/Calendar'
import useConfig from '@/composables/useConfig'
import { translations } from '@/locales/traductions'
import { computed } from 'vue'
import useKWeekDays from '@/composables/useKWeekDays'
import useDate from '@/composables/useDate'
import useView from '@/composables/useView'

const { lang } = useConfig()
const { setCurrentDay } = useKWeekDays()
const { today } = useDate()

const { currentView, setCurrentView } = useView()

const viewOptions = computed(() => {
  const t = translations[lang.value] || translations.en
  return [
    { label: t.monthView, value: 'calendar' as View },
    { label: t.dayView, value: 'day' as View },
    { label: t.listView, value: 'list' as View }
  ]
})

const handleViewChange = (view: View) => {
  setCurrentView(view)
  setCurrentDay(today.value)
}
</script>

<style scoped lang="postcss">
.k-view-selector-container {
  @apply flex;
}

.k-view-selector-button {
  @apply px-2 py-1 border border-gray-200 transition-colors duration-200;
  @apply lg:p-2;
  @apply dark:border-slate-600;
  @apply focus:outline-none;
}

.k-view-selector-button:first-child {
  @apply rounded-l-md rounded-r-none;
}

.k-view-selector-button:not(:first-child):not(:last-child) {
  @apply rounded-none border-l-0;
}

.k-view-selector-button:last-child {
  @apply rounded-r-md rounded-l-none border-l-0;
}

.k-view-selector-button-active {
  @apply bg-gray-100 dark:bg-slate-700;
}
</style>

