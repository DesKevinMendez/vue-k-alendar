import { DateTime, type DateTimeFormatOptions } from "luxon";
import { computed, ref } from "vue";
import useConfig from "./useConfig";
const timezone = ref()

export default function useDate() {
  const { lang } = useConfig()

  const formatDate = (date: string, formatStr: DateTimeFormatOptions) => {
    return DateTime.fromISO(date, { setZone: timezone.value })
      .setLocale(lang.value).toLocaleString(formatStr);
  }

  const today = computed(() => {
    return DateTime.now().toISODate();
  })

  return {
    formatDate,
    today,
    timezone
  }
}