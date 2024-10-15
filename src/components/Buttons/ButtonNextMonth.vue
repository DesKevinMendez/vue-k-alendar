<template>
  <button type="button" class="k-alendar-navegation-left">&rarr;</button>
</template>

<script setup lang="ts"></script>


<style scoped lang="postcss">
.k-alendar-navegation-left {
    @apply px-2 py-1 border border-gray-200 rounded-r-md w-16 transition-colors duration-200
    lg:p-2
    dark:border-slate-500;
  }
</style>