<template>
  <dialog
    ref="dialog"
    id="k-alendar-dialog"
    modal-mode="mega"
    class="k-alendar-dialog"
    :open="openDialog"
    @click.self="close"
  >
    <slot name="header">
      <header></header>
    </slot>
    <article class="main">
      <slot />
    </article>
    <slot name="footer" />
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

<style>
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
  width: 400px;
  height: 400px;
  margin: 0;
  margin-top: 0 !important;
  outline: none;
  display: block;
  inset: 0;
  z-index: var(--layer-important);
  max-inline-size: min(90vw, var(--size-content-3));
  max-block-size: min(80vh, 100%);
  overflow: hidden;
  transition: opacity 0.5s;
  animation: var(--animation-scale-down) forwards;
  animation-timing-function: var(--ease-squish-3);
  border-radius: 0.5rem;
  padding: 0;
  border: solid 1px #ccc;
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.5);
}

dialog[open] {
  animation: var(--animation-slide-in-up) forwards;
}

dialog:not([open]) {
  pointer-events: none;
  opacity: 0;
}

dialog::backdrop {
  /* backdrop-filter: blur(0.25rem); */
}

dialog article {
  padding: 0 2rem;
}

dialog header {
  margin: 0;
  background-color: #f3f3f3;
  padding: 1rem 2rem;
}

dialog footer {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 2rem;
}

dialog header h3 {
  margin: 0;
}
</style>
