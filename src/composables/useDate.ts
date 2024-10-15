import { DateTime, type DateTimeFormatOptions } from "luxon";
import { computed } from "vue";
import useConfig from "./useConfig";

export default function useDate() {
  const { lang } = useConfig()

  const formatDate = (date: string, formatStr: DateTimeFormatOptions) => {
    return DateTime.fromISO(date)
      .setLocale(lang.value).toLocaleString(formatStr);
  }

  const today = computed(() => {
    return DateTime.now().toISODate();
  })

  return {
    formatDate,
    today,
  }
}