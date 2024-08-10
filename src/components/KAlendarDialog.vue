<template>
  <dialog
    ref="dialog"
    id="k-alendar-dialog"
    modal-mode="mega"
    class="k-alendar-dialog"
    :open="openDialog"
    @click.self="close"
  >
    <header>
      <slot name="header"> </slot>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="xmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        @click="close"
      >
        <path
          class=""
          fill="currentColor"
          d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
        ></path>
      </svg>
    </header>
    <article class="k-alendar-dialog-main">
      <slot />
    </article>
    <footer>
      <slot name="footer" />
    </footer>
  </dialog>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

const openDialog = defineModel<boolean>()
const dialog = ref<HTMLDialogElement | null>(null)

watch(openDialog, (value) => {
  if (dialog.value && value) {
    dialog.value.showModal()
  } else if (dialog.value) {
    dialog.value.close()
  }
})

onMounted(() => {
  if (dialog.value) {
    dialog.value.addEventListener('close', () => {
      close()
    })
  }
})

onUnmounted(() => {
  if (dialog.value) {
    dialog.value.removeEventListener('close', () => {
      close()
    })
  }
})

const close = () => {
  openDialog.value = false
}
</script>

<style lang="postcss">
:where(html) {
  --layer-important: 2147483647;
  --size-content-3: 60ch;
  --ease-3: cubic-bezier(0.25, 0, 0.3, 1);
  --animation-scale-down: scale-down 0.5s var(--ease-3);
  --ease-elastic-in-out-3: cubic-bezier(0.5, -0.5, 0.1, 1.5);
  --ease-squish-3: var(--ease-elastic-in-out-3);
  --animation-slide-in-up: slide-in-up 0.5s var(--ease-3);
}

@keyframes slide-in-up {
  0% {
    transform: translateY(100%);
  }
}

.k-alendar-dialog {
  @apply p-4 space-y-4 flex flex-col  outline-none inset-0
  overflow-hidden bg-white text-gray-800 rounded-md
  transition-opacity duration-500 m-0 mt-0
  dark:bg-slate-900 dark:text-white;
  width: 400px;
  height: 400px;
  z-index: var(--layer-important);
  max-inline-size: min(90vw, var(--size-content-3));
  max-block-size: min(80vh, 100%);
  animation: var(--animation-scale-down) forwards;
  animation-timing-function: var(--ease-squish-3);
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.5);
}

.k-alendar-dialog-main {
  flex: 1;
  overflow-y: auto;
}

dialog[open] {
  animation: var(--animation-slide-in-up) forwards;
}

dialog:not([open]) {
  @apply pointer-events-none opacity-0;
}

dialog::backdrop {
  /* backdrop-filter: blur(0.25rem); */
}

dialog header {
  @apply p-4 flex border-b justify-between dark:border-gray-600;
  svg {
    @apply cursor-pointer h-5 w-5 text-gray-600 dark:text-gray-300;
  }
}

dialog footer {
  @apply flex justify-end;
}

dialog header h3 {
  @apply m-0;
}
</style>
