import { VueWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock must be before any imports that use luxon
vi.mock('luxon', async () => {
  const { mockDate } = await import('tests/utils/mockDate')
  return mockDate('2025-12-12T12:00:00.000Z')()
})

import ButtonNextMonth from '@/components/Buttons/ButtonNextMonth.vue'
import useKWeekDays from '@/composables/useKWeekDays'
import useRenderCalendar from '@/composables/useRenderCalendar'
import useView from '@/composables/useView'
import { DateTime } from 'luxon'

describe('ButtonNextMonth', () => {
  let wrapper: VueWrapper<InstanceType<typeof ButtonNextMonth>>

  beforeEach(() => {
    wrapper = mount(ButtonNextMonth)
  })

  it('should render the button with the right arrow character', () => {
    expect(wrapper.find('button').text()).toBe('→')
  })

  describe('when the button is clicked', () => {
    it('should plus one month to the current date if the current view is not day', async () => {
      const { currentDate, generateCalendar, monthDays } = useRenderCalendar()
      const { setCurrentView } = useView()

      const initialDate = DateTime.fromISO('2025-10-11')
      if (!initialDate.isValid) {
        throw new Error('Invalid date')
      }
      currentDate.value = initialDate
      setCurrentView('calendar')

      const initialDateFormatted = initialDate.toFormat('yyyy-MM-dd')
      monthDays.value = generateCalendar(initialDateFormatted)

      expect(initialDateFormatted).toBe('2025-10-11')

      wrapper = mount(ButtonNextMonth)

      await wrapper.find('button').trigger('click')

      const currentDateFormatted = DateTime.fromJSDate(currentDate.value.toJSDate()).toFormat('yyyy-MM-dd')

      expect(wrapper.emitted('handle')?.[0]?.[0]).toStrictEqual(currentDateFormatted)
      expect(currentDateFormatted).toBe('2025-11-11')

      expect(monthDays.value).toStrictEqual([
        {
          day: '2025-10-27',
          class: 'other-month-date',
          events: [],
          text: '27'
        },
        {
          day: '2025-10-28',
          class: 'other-month-date',
          events: [],
          text: '28'
        },
        {
          day: '2025-10-29',
          class: 'other-month-date',
          events: [],
          text: '29'
        },
        {
          day: '2025-10-30',
          class: 'other-month-date',
          events: [],
          text: '30'
        },
        {
          day: '2025-10-31',
          class: 'other-month-date',
          events: [],
          text: '31'
        },
        { day: '2025-11-01', class: '', events: [], text: '1' },
        { day: '2025-11-02', class: '', events: [], text: '2' },
        { day: '2025-11-03', class: '', events: [], text: '3' },
        { day: '2025-11-04', class: '', events: [], text: '4' },
        { day: '2025-11-05', class: '', events: [], text: '5' },
        { day: '2025-11-06', class: '', events: [], text: '6' },
        { day: '2025-11-07', class: '', events: [], text: '7' },
        { day: '2025-11-08', class: '', events: [], text: '8' },
        { day: '2025-11-09', class: '', events: [], text: '9' },
        { day: '2025-11-10', class: '', events: [], text: '10' },
        { day: '2025-11-11', class: '', events: [], text: '11' },
        { day: '2025-11-12', class: '', events: [], text: '12' },
        { day: '2025-11-13', class: '', events: [], text: '13' },
        { day: '2025-11-14', class: '', events: [], text: '14' },
        { day: '2025-11-15', class: '', events: [], text: '15' },
        { day: '2025-11-16', class: '', events: [], text: '16' },
        { day: '2025-11-17', class: '', events: [], text: '17' },
        { day: '2025-11-18', class: '', events: [], text: '18' },
        { day: '2025-11-19', class: '', events: [], text: '19' },
        { day: '2025-11-20', class: '', events: [], text: '20' },
        { day: '2025-11-21', class: '', events: [], text: '21' },
        { day: '2025-11-22', class: '', events: [], text: '22' },
        { day: '2025-11-23', class: '', events: [], text: '23' },
        { day: '2025-11-24', class: '', events: [], text: '24' },
        { day: '2025-11-25', class: '', events: [], text: '25' },
        { day: '2025-11-26', class: '', events: [], text: '26' },
        { day: '2025-11-27', class: '', events: [], text: '27' },
        { day: '2025-11-28', class: '', events: [], text: '28' },
        { day: '2025-11-29', class: '', events: [], text: '29' },
        { day: '2025-11-30', class: '', events: [], text: '30' }
      ])
      
      await wrapper.find('button').trigger('click')

      expect(monthDays.value).toStrictEqual([
        { day: '2025-12-01', class: '', events: [], text: '1' },
        { day: '2025-12-02', class: '', events: [], text: '2' },
        { day: '2025-12-03', class: '', events: [], text: '3' },
        { day: '2025-12-04', class: '', events: [], text: '4' },
        { day: '2025-12-05', class: '', events: [], text: '5' },
        { day: '2025-12-06', class: '', events: [], text: '6' },
        { day: '2025-12-07', class: '', events: [], text: '7' },
        { day: '2025-12-08', class: '', events: [], text: '8' },
        { day: '2025-12-09', class: '', events: [], text: '9' },
        { day: '2025-12-10', class: '', events: [], text: '10' },
        { day: '2025-12-11', class: '', events: [], text: '11' },
        { day: '2025-12-12', class: 'selected', events: [], text: '12' },
        { day: '2025-12-13', class: '', events: [], text: '13' },
        { day: '2025-12-14', class: '', events: [], text: '14' },
        { day: '2025-12-15', class: '', events: [], text: '15' },
        { day: '2025-12-16', class: '', events: [], text: '16' },
        { day: '2025-12-17', class: '', events: [], text: '17' },
        { day: '2025-12-18', class: '', events: [], text: '18' },
        { day: '2025-12-19', class: '', events: [], text: '19' },
        { day: '2025-12-20', class: '', events: [], text: '20' },
        { day: '2025-12-21', class: '', events: [], text: '21' },
        { day: '2025-12-22', class: '', events: [], text: '22' },
        { day: '2025-12-23', class: '', events: [], text: '23' },
        { day: '2025-12-24', class: '', events: [], text: '24' },
        { day: '2025-12-25', class: '', events: [], text: '25' },
        { day: '2025-12-26', class: '', events: [], text: '26' },
        { day: '2025-12-27', class: '', events: [], text: '27' },
        { day: '2025-12-28', class: '', events: [], text: '28' },
        { day: '2025-12-29', class: '', events: [], text: '29' },
        { day: '2025-12-30', class: '', events: [], text: '30' },
        { day: '2025-12-31', class: '', events: [], text: '31' },
        {
          day: '2026-01-01',
          class: 'other-month-date',
          events: [],
          text: '1'
        },
        {
          day: '2026-01-02',
          class: 'other-month-date',
          events: [],
          text: '2'
        },
        {
          day: '2026-01-03',
          class: 'other-month-date',
          events: [],
          text: '3'
        },
        {
          day: '2026-01-04',
          class: 'other-month-date',
          events: [],
          text: '4'
        }
      ])
    })

    it('should plus one day to the current date if the current view is day', async () => {
      const { setCurrentView } = useView()
      const { currentDay, setCurrentDay } = useKWeekDays()
      setCurrentDay('2025-12-11')
      setCurrentView('day')
      wrapper = mount(ButtonNextMonth)
      await wrapper.find('button').trigger('click')

      expect(currentDay.value).toBe('2025-12-12')

      expect(wrapper.emitted('handle')).toBeFalsy()
    })
  })
})

