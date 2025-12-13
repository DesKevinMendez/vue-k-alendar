import { computed, readonly, ref } from 'vue';
import { DateTime } from 'luxon';
import useConfig from '@/composables/useConfig';

const currentDay = ref<string>(DateTime.now().toISODate() || '')

export default function () {
  const { lang } = useConfig()
  const setCurrentDay = (date: string) => {
    currentDay.value = date
  }

  const currentDayWithFormat = computed(() => {
    return DateTime.fromISO(currentDay.value).setLocale(lang.value).toFormat('dd MMMM yyyy')
  })

  return {
    currentDay: readonly(currentDay),
    currentDayWithFormat,
    setCurrentDay,
  }
}