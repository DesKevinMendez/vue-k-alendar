<template>
  <header class="k-alendar-header-container">
    <div class="left-buttons">
      <div class="navigation-buttons-group">
        <ButtonPrevMonth @handle="handlePrevMonth" />
        <ButtonNextMonth @handle="handleNextMonth" />
      </div>
      <ButtonTodayMonth @handle="handleToToday" />
    </div>
    <div class="title-and-controls">
      <div class="center-title">
        <h2>{{ date }}</h2>
      </div>
      <div class="right-controls">
        <KViewSelector />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import useRenderCalendar from '@/composables/useRenderCalendar';
import ButtonNextMonth from '../Buttons/ButtonNextMonth.vue';
import ButtonPrevMonth from '../Buttons/ButtonPrevMonth.vue';
import ButtonTodayMonth from '../Buttons/ButtonTodayMonth.vue';
import KViewSelector from '../KViewSelector.vue';
import useKWeekDays from '@/composables/useKWeekDays';
import useView from '@/composables/useView';
import { computed } from 'vue';

const { title } = useRenderCalendar()
const { currentView } = useView()
const { currentDayWithFormat } = useKWeekDays()

const date = computed(() => {
  return currentView.value === 'day' ? currentDayWithFormat.value : title.value
})

const emit = defineEmits(['handlePrevMonth', 'handleNextMonth', 'handleToToday'])

const handlePrevMonth = (date: string) => {
  emit('handlePrevMonth', date)
}
const handleNextMonth = (date: string) => {
  emit('handleNextMonth', date)
}
const handleToToday = (date: string) => {
  emit('handleToToday', date)
}
</script>

<style scoped lang="postcss">
.k-alendar-header-container {
  @apply flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0;
  .title-and-controls {
    @apply flex items-center justify-between w-full sm:contents gap-2;
  }
  .center-title {
    @apply flex-1 sm:flex-1 sm:text-center;
  }
  .center-title > h2 {
    @apply capitalize;
  }
  .left-buttons {
    @apply flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start;
  }
  .navigation-buttons-group {
    @apply flex items-center;
  }
  .right-controls {
    @apply flex items-center flex-shrink-0;
  }
}
</style>
