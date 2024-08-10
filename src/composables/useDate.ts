import { UTCDate } from "@date-fns/utc"
import { format } from 'date-fns'
import { es } from "date-fns/locale"
export default function useDate() {

  const dateInUTC = (date: string) => {
    return new UTCDate(date)
  }

  const formatDate = (date: string, formatStr: string) => {
    return format(new UTCDate(date), formatStr, { locale: es })
  }

  return {
    dateInUTC,
    formatDate
  }
}