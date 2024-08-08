<template>
  <KAlendarDialog v-model="openDetail"> hola </KAlendarDialog>
</template>

<script setup lang="ts">
import KAlendarDialog from './KAlendarDialog.vue'

const openDetail = defineModel<boolean>()
</script>

<style scoped></style>
