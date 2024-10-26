import CIndex from '@/components/Calendar/CIndex.vue'
import useRenderCalendar from '@/composables/useRenderCalendar'
import { mount, VueWrapper } from '@vue/test-utils'
import { Date2024Oct23WithoutEvents } from './../../fakes/monthDaysWithoutCEvents'
import { useDialog } from '@/composables/useDialog'
import type { KEvent } from '@/types'
import useEvent from '@/composables/useEvent'

let wrapper: VueWrapper<InstanceType<typeof CIndex>>

const events: KEvent[] = [
  {
    title: 'Event 7',
    start_date: '2024-10-01',
    description: 'Description of random event',
    color: '#677d73',
    autor: 'Kevin Méndez',
    id: 'a5ad72d6-1ab2-47a7-8870-73df8b2c6dc8'
  },
  {
    title: 'Event 8',
    start_date: '2024-10-01',
    description: 'Description of random event',
    color: '#677d73',
    autor: 'Kevin Méndez',
    id: 'a5ad72d6-1ab2-47a7-8870-73df8b2c6dc8'
  },
  {
    title: 'Event 9',
    start_date: '2024-10-01',
    description: 'Description of random event',
    color: '#677d73',
    autor: 'Kevin Méndez',
    id: 'a5ad72d6-1ab2-47a7-8870-73df8b2c6dc8'
  },
  {
    title: 'Event 10',
    start_date: '2024-10-01',
    description: 'Description of random event',
    color: '#677d73',
    autor: 'Kevin Méndez',
    id: 'a5ad72d6-1ab2-47a7-8870-73df8b2c6dc8'
  }
]

describe('CIndex', () => {
  beforeEach(() => {
    wrapper = mount(CIndex)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render the component', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('window.innerWidth < 768 (475px)', () => {
    const originalInnnerWidth = window.innerWidth
    const innerWidth = 475

    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: innerWidth
      })
    })

    afterEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: originalInnnerWidth
      })

      vi.clearAllMocks()
    })

    const setupMonthDays = async () => {
      const { monthDays } = useRenderCalendar()
      monthDays.value = Date2024Oct23WithoutEvents
      await wrapper.vm.$nextTick()
      return monthDays
    }

    const restoreMonthDays = async (dayIndex: number) => {
      const { monthDays } = useRenderCalendar()
      monthDays.value[dayIndex].events = []
      await wrapper.vm.$nextTick()
    }

    it('date has one event', async () => {
      const monthDays = await setupMonthDays()

      const kAlendarContainer = wrapper.find('.k-alendar-container')
      const days = kAlendarContainer.findAll('.date')

      monthDays.value[1].events = events.slice(0, 1)

      await wrapper.vm.$nextTick()

      const kAlendarSpanContainer = days[1].find('.k-alendar-span-container')

      const firstSpanHasDay = kAlendarSpanContainer.find('.k-alendar-text')
      const secondSpanHasPoint = kAlendarSpanContainer.find('.point')
      expect(firstSpanHasDay.text()).toBe('1')
      expect(secondSpanHasPoint.exists()).toBeTruthy()
      monthDays.value[1].events = []
    })

    it('date has more than one event', async () => {
      const monthDays = await setupMonthDays()

      const kAlendarContainer = wrapper.find('.k-alendar-container')
      const days = kAlendarContainer.findAll('.date')

      monthDays.value[2].events = events.slice(0, 2)

      await wrapper.vm.$nextTick()

      const kAlendarSpanContainer = days[2].find('.k-alendar-span-container')

      const firstSpanHasDay = kAlendarSpanContainer.find('.k-alendar-text')
      const secondSpanHasPoint = kAlendarSpanContainer.find('.point')
      expect(firstSpanHasDay.text()).toBe('2')
      expect(secondSpanHasPoint.exists()).toBeTruthy()

      monthDays.value[1].events = []
    })

    it('do click on the event but this dont have events', async () => {
      await setupMonthDays()

      const { dialogPositionToRender } = useDialog()

      const kAlendarContainer = wrapper.find('.k-alendar-container')
      const days = kAlendarContainer.findAll('.date')

      await wrapper.vm.$nextTick()
      const kAlendarDateRow = days[1]

      expect(dialogPositionToRender.value).toStrictEqual({ x: 0, y: 0 })
      await kAlendarDateRow.trigger('click')
      expect(dialogPositionToRender.value).toStrictEqual({ x: 37, y: 16 })
    })

    it('do click on the event but this have one event', async () => {
      const event: KEvent = events[0]

      const { dialogPositionToRender, openEventsDetailDialog } = useDialog()
      const { monthDays, calendarDaySelect } = useRenderCalendar()
      const { eventSelected } = useEvent()

      monthDays.value = Date2024Oct23WithoutEvents

      const monthDayClicked = monthDays.value[1]
      await wrapper.vm.$nextTick()

      const kAlendarContainer = wrapper.find('.k-alendar-container')
      const days = kAlendarContainer.findAll('.date')

      monthDayClicked.events = events.slice(0, 1)

      await wrapper.vm.$nextTick()

      const kAlendarDateRow = days[1]

      await kAlendarDateRow.trigger('click')

      expect(eventSelected.value).toStrictEqual(event)
      expect(calendarDaySelect.value).toStrictEqual(monthDayClicked)
      expect(openEventsDetailDialog.value).toBeTruthy()
      expect(dialogPositionToRender.value).toStrictEqual({ x: 37, y: 16 })
      expect(wrapper.emitted('eventClicked')).toStrictEqual([[event]])

      monthDayClicked.events = []
    })

    it('do click on the event but this have more than one event', async () => {
      const { dialogPositionToRender, openEventsDetailDialog } = useDialog()
      const { monthDays, calendarDaySelect } = useRenderCalendar()
      const { eventSelected } = useEvent()

      monthDays.value = Date2024Oct23WithoutEvents

      const monthDayClicked = monthDays.value[1]
      await wrapper.vm.$nextTick()

      const kAlendarContainer = wrapper.find('.k-alendar-container')
      const days = kAlendarContainer.findAll('.date')

      await wrapper.vm.$nextTick()

      monthDayClicked.events = events.slice(0, 2)

      await wrapper.vm.$nextTick()

      const kAlendarDateRow = days[1]

      await kAlendarDateRow.trigger('click')

      expect(eventSelected.value).toStrictEqual({
        description: '',
        id: 'more',
        start_date: '',
        title: ''
      })
      expect(calendarDaySelect.value).toStrictEqual(monthDayClicked)
      expect(openEventsDetailDialog.value).toBeTruthy()
      expect(dialogPositionToRender.value).toStrictEqual({ x: 37, y: 16 })
      expect(wrapper.emitted('eventClicked')).toBeUndefined()

      monthDayClicked.events = []
    })
  })

  describe('window.innerWidth > 768 (1024px)', () => {
    afterEach(() => {
      vi.clearAllMocks()
    })

    const setOffsetHeightToKAlendarSpanContainer = (height: number = 24) => {
      // Setting offsetHeight to all .k-alendar-text
      wrapper.findAll('.k-alendar-span-container').forEach((span) => {
        Object.defineProperty(span.element, 'offsetHeight', {
          writable: true,
          value: height // 24 is the size of the real browser render in this size of screen (1024)
        })
      })
    }

    const setupMonthDays = async (dayIndex: number) => {
      const { monthDays } = useRenderCalendar()
      monthDays.value = Date2024Oct23WithoutEvents

      // define the height of the date row
      Object.defineProperty((wrapper.vm as any).dateRefs[`2024-10-0${dayIndex}`], 'clientHeight', {
        writable: true,
        value: 138 // 138 is the size of the real browser render in this size of screen (1024)
      })

      await wrapper.vm.$nextTick()
      return monthDays
    }

    it('date has one event', async () => {
      const rowDayCalendar = 1

      const monthDays = await setupMonthDays(rowDayCalendar)

      const kAlendarContainer = wrapper.find('.k-alendar-container')
      const days = kAlendarContainer.findAll('.date')

      monthDays.value[rowDayCalendar].events = events.slice(0, 1)

      await wrapper.vm.$nextTick()

      const kAlendarSpanContainer = days[rowDayCalendar].find('.events')
      const liEvent = kAlendarSpanContainer.findAll('li')

      expect(liEvent.length).toBe(1)
      expect(liEvent[0].text()).toBe('Event 7')

      monthDays.value[rowDayCalendar].events = []
    })

    it('date has two events', async () => {
      const rowDayCalendar = 1
      const monthDays = await setupMonthDays(1)

      const kAlendarContainer = wrapper.find('.k-alendar-container')
      const days = kAlendarContainer.findAll('.date')

      monthDays.value[rowDayCalendar].events = events.slice(0, 2)

      setOffsetHeightToKAlendarSpanContainer()

      await wrapper.vm.$nextTick()

      const kAlendarSpanContainer = days[rowDayCalendar].find('.events')
      const liEvent = kAlendarSpanContainer.findAll('li')

      expect(liEvent.length).toBe(2)
      expect(liEvent[0].text()).toBe('Event 7')
      expect(liEvent[1].text()).toBe('Event 8')

      monthDays.value[rowDayCalendar].events = []
    })

    it('date has many events and not all is filled in the row', async () => {
      const rowDayCalendar = 1
      const monthDays = await setupMonthDays(1)

      const kAlendarContainer = wrapper.find('.k-alendar-container')
      const days = kAlendarContainer.findAll('.date')

      monthDays.value[rowDayCalendar].events = events

      setOffsetHeightToKAlendarSpanContainer()

      await wrapper.vm.$nextTick()

      const kAlendarSpanContainer = days[rowDayCalendar].find('.events')
      const liEvent = kAlendarSpanContainer.findAll('li')

      expect(liEvent.length).toBe(3)
      expect(liEvent[0].text()).toBe('Event 7')
      expect(liEvent[1].text()).toBe('Event 8')
      expect(liEvent[2].text()).toBe('+2')

      monthDays.value[rowDayCalendar].events = []
    })

    it('do click on event', async () => {
      const rowDayCalendar = 1

      const { openEventsDetailDialog, dialogPositionToRender } = useDialog()
      const monthDays = await setupMonthDays(1)
      const { eventSelected } = useEvent()
      const { calendarDaySelect } = useRenderCalendar()

      dialogPositionToRender.value = { x: 100, y: 100 }

      const kAlendarContainer = wrapper.find('.k-alendar-container')
      const days = kAlendarContainer.findAll('.date')

      monthDays.value[rowDayCalendar].events = events.slice(0, 1)

      setOffsetHeightToKAlendarSpanContainer()

      await wrapper.vm.$nextTick()

      const kAlendarSpanContainer = days[rowDayCalendar].find('.events')
      const liEvent = kAlendarSpanContainer.findAll('li')

      await liEvent[0].trigger('click')
      expect(eventSelected.value).toStrictEqual(events[0])
      expect(wrapper.emitted('eventClicked')).toStrictEqual([[events[0]]])
      expect(calendarDaySelect.value).toStrictEqual(monthDays.value[rowDayCalendar])
      expect(dialogPositionToRender.value).toStrictEqual({ x: 0, y: 0 }) // collision function return this in the test
      expect(openEventsDetailDialog.value).toBeTruthy()

      monthDays.value[rowDayCalendar].events = []
    })

    it('do click on event but id of the event is "more"', async () => {
      const rowDayCalendar = 1

      const { eventSelected } = useEvent()
      const monthDays = await setupMonthDays(1)

      const kAlendarContainer = wrapper.find('.k-alendar-container')
      const days = kAlendarContainer.findAll('.date')

      monthDays.value[rowDayCalendar].events = events.slice(0, 1)

      setOffsetHeightToKAlendarSpanContainer()

      await wrapper.vm.$nextTick()

      const kAlendarSpanContainer = days[rowDayCalendar].find('.events')
      const liEvent = kAlendarSpanContainer.findAll('li')
      eventSelected.value.id = 'more'

      await liEvent[0].trigger('click')
      expect(wrapper.emitted('eventClicked')).toBeUndefined()

      monthDays.value[rowDayCalendar].events = []
    })
  })
})
