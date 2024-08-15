import { DateTime, type DateTimeFormatOptions } from "luxon";
import { computed, ref } from "vue";
const timezone = ref()

export default function useDate() {

  const formatDate = (date: string, formatStr: DateTimeFormatOptions) => {
    return DateTime.fromISO(date, { setZone: timezone.value }).toLocaleString(formatStr);
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