import { DateTime, type DateTimeFormatOptions } from "luxon";
import { computed } from "vue";
export default function useDate() {
  const formatDate = (date: string, formatStr: DateTimeFormatOptions) => {
    return DateTime.fromISO(date).toLocaleString(formatStr);
  }

  const todayUTC = computed(() => {
    return DateTime.utc().toISODate();
  })

  return {
    formatDate,
    todayUTC
  }
}