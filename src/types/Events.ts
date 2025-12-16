export type KEvent = {
  id: string
  title: string
  start_date: string
  end_date?: string | null
  description: string
  color?: string
}

export type KEventCalendarRender = KEvent & {
  date_calendar_to_render: string
}

export type KEventEmit = {
  event: KEvent
}