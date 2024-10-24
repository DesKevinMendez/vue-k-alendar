import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { description } from '../../package.json'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    repo: 'deskevinmendez/vue-k-alendar',
  }),
  base: 'vue-k-alendar',
  lang: 'en-US',
  title: 'Vue Kalendar',
  description,
})