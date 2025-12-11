import type { KEvent } from "./Events"

export type MonthDays = {
  day: string
  class: string
  events: KEvent[]
  text: string
}

export type DayCalendar = {
  day: string
  class: string
  events: KEvent[]
  text: string
}

export type View = 'list' | 'calendar'