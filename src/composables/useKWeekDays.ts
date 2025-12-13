import { readonly, ref } from 'vue';
import { DateTime } from 'luxon';

const currentDay = ref<string>(DateTime.now().toISODate() || '')

export default function () {
  const setCurrentDay = (date: string) => {
    currentDay.value = date
  }
  return {
    currentDay: readonly(currentDay),
    setCurrentDay,
  }
}