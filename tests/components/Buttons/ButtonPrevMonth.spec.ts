import ButtonPrevMonth from '@/components/Buttons/ButtonPrevMonth.vue'
import useKWeekDays from '@/composables/useKWeekDays'
import useRenderCalendar from '@/composables/useRenderCalendar'
import useView from '@/composables/useView'
import { VueWrapper, mount } from '@vue/test-utils'
import { DateTime } from 'luxon'
import { beforeEach, describe, expect, it } from 'vitest'

describe('ButtonPrevMonth', () => {
  let wrapper: VueWrapper<InstanceType<typeof ButtonPrevMonth>>

  beforeEach(() => {
    wrapper = mount(ButtonPrevMonth)
  })

  it('should render the button with the left arrow character', () => {
    expect(wrapper.find('button').text()).toBe('←')
  })

  describe('when the button is clicked', () => {
    it('should minus one month to the current date if the current view is not day', async () => {
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

      wrapper = mount(ButtonPrevMonth)

      await wrapper.find('button').trigger('click')

      const currentDateFormatted = DateTime.fromJSDate(currentDate.value.toJSDate()).toFormat('yyyy-MM-dd')

      expect(wrapper.emitted('handle')?.[0]?.[0]).toStrictEqual(currentDateFormatted)
      expect(currentDateFormatted).toBe('2025-09-11')
      expect(monthDays.value).toStrictEqual([
        { day: '2025-09-01', class: '', events: [], text: '1' },
        { day: '2025-09-02', class: '', events: [], text: '2' },
        { day: '2025-09-03', class: '', events: [], text: '3' },
        { day: '2025-09-04', class: '', events: [], text: '4' },
        { day: '2025-09-05', class: '', events: [], text: '5' },
        { day: '2025-09-06', class: '', events: [], text: '6' },
        { day: '2025-09-07', class: '', events: [], text: '7' },
        { day: '2025-09-08', class: '', events: [], text: '8' },
        { day: '2025-09-09', class: '', events: [], text: '9' },
        { day: '2025-09-10', class: '', events: [], text: '10' },
        { day: '2025-09-11', class: '', events: [], text: '11' },
        { day: '2025-09-12', class: '', events: [], text: '12' },
        { day: '2025-09-13', class: '', events: [], text: '13' },
        { day: '2025-09-14', class: '', events: [], text: '14' },
        { day: '2025-09-15', class: '', events: [], text: '15' },
        { day: '2025-09-16', class: '', events: [], text: '16' },
        { day: '2025-09-17', class: '', events: [], text: '17' },
        { day: '2025-09-18', class: '', events: [], text: '18' },
        { day: '2025-09-19', class: '', events: [], text: '19' },
        { day: '2025-09-20', class: '', events: [], text: '20' },
        { day: '2025-09-21', class: '', events: [], text: '21' },
        { day: '2025-09-22', class: '', events: [], text: '22' },
        { day: '2025-09-23', class: '', events: [], text: '23' },
        { day: '2025-09-24', class: '', events: [], text: '24' },
        { day: '2025-09-25', class: '', events: [], text: '25' },
        { day: '2025-09-26', class: '', events: [], text: '26' },
        { day: '2025-09-27', class: '', events: [], text: '27' },
        { day: '2025-09-28', class: '', events: [], text: '28' },
        { day: '2025-09-29', class: '', events: [], text: '29' },
        { day: '2025-09-30', class: '', events: [], text: '30' },
        {
          day: '2025-10-01',
          class: 'other-month-date',
          events: [],
          text: '1'
        },
        {
          day: '2025-10-02',
          class: 'other-month-date',
          events: [],
          text: '2'
        },
        {
          day: '2025-10-03',
          class: 'other-month-date',
          events: [],
          text: '3'
        },
        {
          day: '2025-10-04',
          class: 'other-month-date',
          events: [],
          text: '4'
        },
        {
          day: '2025-10-05',
          class: 'other-month-date',
          events: [],
          text: '5'
        }
      ])
      
      await wrapper.find('button').trigger('click')
      expect(monthDays.value).toStrictEqual([
        {
          day: '2025-07-28',
          class: 'other-month-date',
          events: [],
          text: '28'
        },
        {
          day: '2025-07-29',
          class: 'other-month-date',
          events: [],
          text: '29'
        },
        {
          day: '2025-07-30',
          class: 'other-month-date',
          events: [],
          text: '30'
        },
        {
          day: '2025-07-31',
          class: 'other-month-date',
          events: [],
          text: '31'
        },
        { day: '2025-08-01', class: '', events: [], text: '1' },
        { day: '2025-08-02', class: '', events: [], text: '2' },
        { day: '2025-08-03', class: '', events: [], text: '3' },
        { day: '2025-08-04', class: '', events: [], text: '4' },
        { day: '2025-08-05', class: '', events: [], text: '5' },
        { day: '2025-08-06', class: '', events: [], text: '6' },
        { day: '2025-08-07', class: '', events: [], text: '7' },
        { day: '2025-08-08', class: '', events: [], text: '8' },
        { day: '2025-08-09', class: '', events: [], text: '9' },
        { day: '2025-08-10', class: '', events: [], text: '10' },
        { day: '2025-08-11', class: '', events: [], text: '11' },
        { day: '2025-08-12', class: '', events: [], text: '12' },
        { day: '2025-08-13', class: '', events: [], text: '13' },
        { day: '2025-08-14', class: '', events: [], text: '14' },
        { day: '2025-08-15', class: '', events: [], text: '15' },
        { day: '2025-08-16', class: '', events: [], text: '16' },
        { day: '2025-08-17', class: '', events: [], text: '17' },
        { day: '2025-08-18', class: '', events: [], text: '18' },
        { day: '2025-08-19', class: '', events: [], text: '19' },
        { day: '2025-08-20', class: '', events: [], text: '20' },
        { day: '2025-08-21', class: '', events: [], text: '21' },
        { day: '2025-08-22', class: '', events: [], text: '22' },
        { day: '2025-08-23', class: '', events: [], text: '23' },
        { day: '2025-08-24', class: '', events: [], text: '24' },
        { day: '2025-08-25', class: '', events: [], text: '25' },
        { day: '2025-08-26', class: '', events: [], text: '26' },
        { day: '2025-08-27', class: '', events: [], text: '27' },
        { day: '2025-08-28', class: '', events: [], text: '28' },
        { day: '2025-08-29', class: '', events: [], text: '29' },
        { day: '2025-08-30', class: '', events: [], text: '30' },
        { day: '2025-08-31', class: '', events: [], text: '31' }
      ])
    })

    it('should minus one day to the current date if the current view is day', async () => {
      const { setCurrentView } = useView()
      const { currentDay, setCurrentDay } = useKWeekDays()
      setCurrentDay('2025-12-11')
      setCurrentView('day')
      wrapper = mount(ButtonPrevMonth)
      await wrapper.find('button').trigger('click')

      expect(currentDay.value).toBe('2025-12-10')

      expect(wrapper.emitted('handle')).toBeFalsy()
    })
  })
})