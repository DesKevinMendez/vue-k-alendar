import KListCalendar from '@/components/List/KListCalendar.vue';

import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import type { KEvent } from '@/types/Events';

describe('KListCalendar', () => {
  let wrapper: VueWrapper<KListCalendar>;
  const events: KEvent[] = [
    {
      id: '1',
      title: 'Event 1',
      start_date: '2025-01-02',
      end_date: '2025-01-02',
      description: 'Description 1',
      color: '#000000',
      autor: 'Author 1',
    },
    {
      id: '2',
      title: 'Event 2',
      start_date: '2025-01-01',
      end_date: '2025-01-01',
      description: 'Description 2',
      color: '#000000',
      autor: 'Author 1',
    },
  ];

  describe('Event clicked', () => {
    beforeEach(() => {
      wrapper = mount(KListCalendar, {
        props: {
          events,
        },
      });
    });

    it('should emit the eventClicked event when the event is clicked', async () => {
      const eventsKListCalendar = wrapper.findAll('.k-list-calendar-event');
      await eventsKListCalendar[0].trigger('click');
      expect(wrapper.emitted('eventClicked')).toBeTruthy();
      expect(wrapper.emitted('eventClicked')[0][0]).toStrictEqual(events[1]);
    });
  });

  describe('simple date', () => {
    beforeEach(() => {
      wrapper = mount(KListCalendar, {
        props: {
          events,
        },
      });
    });


    it('should render the list of events ordered by start date', () => {
      const events = wrapper.findAll('.k-list-calendar-event');
      expect(events[0].find('.k-list-calendar-event-title-text').text()).toBe('Event 2');
      expect(events[0].find('.k-list-calendar-event-description').text()).toBe('Description 2');

      expect(events[1].find('.k-list-calendar-event-title-text').text()).toBe('Event 1');
      expect(events[1].find('.k-list-calendar-event-description').text()).toBe('Description 1');
    });

    it('day-header should render the date and the day', () => {
      const dayHeader = wrapper.find('.day-header');
      expect(dayHeader.find('p').text()).toBe('Wednesday, 01 January 2025');
      expect(dayHeader.find('h3').text()).toBe('2025-01-01');
    });

    it('should render multiple k-list-calendar-event when the events is from different days', () => {
      const dayHeaders = wrapper.findAll('.day-header');
      expect(dayHeaders.length).toBe(2);

      expect(dayHeaders[0].find('p').text()).toBe('Wednesday, 01 January 2025');
      expect(dayHeaders[0].find('h3').text()).toBe('2025-01-01');

      expect(dayHeaders[1].find('p').text()).toBe('Thursday, 02 January 2025');
      expect(dayHeaders[1].find('h3').text()).toBe('2025-01-02');
    });

    it('Day should has the format yyyy-MM-dd', () => {
      const dayHeader = wrapper.find('.day-header');
      expect(dayHeader.find('h3').text()).toBe('2025-01-01');
    });

    it('should view all day when the event has no time', () => {
      const eventsKListCalendar = wrapper.findAll('.k-list-calendar-event');
      expect(eventsKListCalendar[0].find('.k-list-calendar-event-time').text()).toBe('All day');
    });
  })

  describe('date with time', () => {
    beforeEach(() => {
      wrapper = mount(KListCalendar, {
        props: {
          events: [
            {
              ...events[0],
              start_date: '2025-01-01T12:45:12',
            },
            {
              ...events[1],
              start_date: '2025-01-01T22:14:59',
            },
          ],
        },
      });
    });

    it('should render the list of events ordered by start date', async () => {
      const eventsKListCalendar = wrapper.findAll('.k-list-calendar-event');
      expect(eventsKListCalendar[0].find('.k-list-calendar-event-title-text').text()).toBe('Event 1');
      expect(eventsKListCalendar[0].find('.k-list-calendar-event-description').text()).toBe('Description 1');
      expect(eventsKListCalendar[0].find('.k-list-calendar-event-time').text()).toBe('12:45 PM');

      expect(eventsKListCalendar[1].find('.k-list-calendar-event-title-text').text()).toBe('Event 2');
      expect(eventsKListCalendar[1].find('.k-list-calendar-event-description').text()).toBe('Description 2');
      expect(eventsKListCalendar[1].find('.k-list-calendar-event-time').text()).toBe('10:14 PM');
    });

    it('Day should has the format yyyy-MM-dd', () => {
      const dayHeader = wrapper.find('.day-header');
      expect(dayHeader.find('h3').text()).toBe('2025-01-01');
    });
  });

  describe('Events has end date', () => {
    beforeEach(() => {
      wrapper = mount(KListCalendar, {
        props: {
          events: [
            {
              ...events[0],
              start_date: '2025-01-01T12:45:12',
              end_date: '2025-01-01T23:45:12',
            },
          ],
        },
      });
    });

    it('should render the list of events ordered by start date', async () => {
      const kListCalendarEventTime = wrapper.findAll('.k-list-calendar-event-time');
      expect(kListCalendarEventTime[0].text()).toBe('12:45 PM - 11:45 PM');
    });

    it('end_date is a simple date', async () => {
      wrapper = mount(KListCalendar, {
        props: {
          events: [
            {
              ...events[0],
              start_date: '2025-01-01T12:45:12',
              end_date: '2025-01-01',
            },
          ],
        },
      });

      const kListCalendarEventTime = wrapper.findAll('.k-list-calendar-event-time');
      expect(kListCalendarEventTime[0].text()).toBe('12:45 PM');
    });
  });
});