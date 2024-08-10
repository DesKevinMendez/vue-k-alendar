import { UTCDate } from "@date-fns/utc"

export default function useDate() {

  const dateInUTC = (date: string) => {
    return new UTCDate(date)
  }

  return {
    dateInUTC
  }
}