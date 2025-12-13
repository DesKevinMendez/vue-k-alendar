<template>
  <header class="k-alendar-header-container">
    <div class="left-buttons">
      <div class="navigation-buttons-group">
        <ButtonPrevMonth @handle="handlePrevMonth" />
        <ButtonNextMonth @handle="handleNextMonth" />
      </div>
      <ButtonTodayMonth @handle="handleToToday" />
    </div>
    <div class="center-title">
      <h2>{{ title }}</h2>
    </div>
    <div class="right-controls">
      <KViewSelector />
    </div>
  </header>
</template>

<script setup lang="ts">
import useRenderCalendar from '@/composables/useRenderCalendar';
import ButtonNextMonth from '../Buttons/ButtonNextMonth.vue';
import ButtonPrevMonth from '../Buttons/ButtonPrevMonth.vue';
import ButtonTodayMonth from '../Buttons/ButtonTodayMonth.vue';
import KViewSelector from '../KViewSelector.vue';

const { title } = useRenderCalendar()

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
  @apply flex justify-between space-y-2 items-center sm:space-y-0;
  .center-title > h2 {
    @apply capitalize;
  }
  .left-buttons {
    @apply flex items-center gap-2;
  }
  .navigation-buttons-group {
    @apply flex items-center;
  }
  .right-controls {
    @apply flex items-center;
  }
}
</style>
