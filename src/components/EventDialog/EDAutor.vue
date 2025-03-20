<template>
  <div class="autor">
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="user"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        class=""
        fill="currentColor"
        d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
      ></path>
    </svg>
    <p>{{ autor }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  autor: String
}>()
</script>

<style scoped lang="postcss">
.autor {
  @apply mt-4 grid grid-cols-12 gap-2;
  svg {
    @apply h-5 w-5 text-gray-600 col-span-1 dark:text-gray-300;
  }
  p {
    @apply text-base max-h-60 overflow-x-scroll text-gray-600 col-span-11
    dark:text-gray-300;
  }
}
</style>
