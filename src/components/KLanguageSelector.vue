<script setup lang="ts">
import { translations } from '@/locales/traductions'

const lang = defineModel<string>({ required: true })

const languageNames: Record<string, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  de: 'Deutsch',
  pt: 'Português',
  nl: 'Nederlands',
  ru: 'Русский',
  ja: '日本語',
  zh: '中文',
  ko: '한국어',
  ar: 'العربية',
  he: 'עברית',
  id: 'Bahasa Indonesia',
  tr: 'Türkçe',
  vi: 'Tiếng Việt',
  th: 'ไทย',
  pl: 'Polski',
  hu: 'Magyar',
  cs: 'Čeština',
  sk: 'Slovenčina',
  hr: 'Hrvatski',
  ro: 'Română',
  bg: 'Български',
  sl: 'Slovenščina',
  et: 'Eesti',
}

const availableLanguages = Object.keys(translations)
</script>

<template>
  <select
    v-model="lang"
    class="px-2 py-1 border rounded-md border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"
  >
    <option
      v-for="langCode in availableLanguages"
      :key="langCode"
      :value="langCode"
    >
      {{ languageNames[langCode] || langCode }}
    </option>
  </select>
</template>

