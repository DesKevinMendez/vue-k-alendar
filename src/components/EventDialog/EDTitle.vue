<template>
  <div class="title" >
    <span class="circle" v-if="event?.color" :style="{ backgroundColor: event.color }" />
    <h2>{{ event?.title }}</h2>
  </div>
</template>

<script setup lang="ts">
import type { KEvent } from '@/types';
defineProps<{
  event: KEvent | null
}>()
</script>

<style scoped lang="postcss">
.title {
  @apply flex items-center gap-2 cursor-pointer;
  span.circle {
    @apply w-4 h-4 rounded-full;
  }
  h2 {
    @apply text-lg font-semibold;
  }
}
</style>
