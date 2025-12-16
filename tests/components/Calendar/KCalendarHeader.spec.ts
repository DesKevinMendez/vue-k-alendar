import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock must be before any imports that use luxon
vi.mock('luxon', async () => {
  const { mockDate } = await import('tests/utils/mockDate');
  return mockDate('2025-12-11T12:00:00.000Z')();
});

import KCalendarHeader from '@/components/Calendar/KCalendarHeader.vue';
import { DateTime } from 'luxon';
import useView from '@/composables/useView';
import useKWeekDays from '@/composables/useKWeekDays';
import useRenderCalendar from '@/composables/useRenderCalendar';

describe('KCalendarHeader', () => {
  let wrapper: VueWrapper<InstanceType<typeof KCalendarHeader>>;

  beforeEach(() => {
    wrapper = mount(KCalendarHeader);
  });

  describe('buttons', () => {
    it('navigation-buttons-group should has two buttons', () => {
      const navigationButtonsGroup = wrapper.find('.navigation-buttons-group');
      expect(navigationButtonsGroup.findAll('button')).toHaveLength(2);
    });

    it('left-buttons should has three buttons', () => {
      const leftButtons = wrapper.find('.left-buttons');
      expect(leftButtons.findAll('button')).toHaveLength(3);
    });

    it('title-and-controls should has two children', () => {
      const titleAndControls = wrapper.find('.title-and-controls');
      const centerTitle = titleAndControls.find('.center-title');
      const rightControls = titleAndControls.find('.right-controls');
      expect(centerTitle.exists()).toBeTruthy();
      expect(rightControls.exists()).toBeTruthy();
    });
  })

  describe('title formated', () => {
    it('when the view is calendar, the title should be formatted as MMMM yyyy', () => {
      const { setCurrentView } = useView();
      setCurrentView('calendar');
      const { title: titleCalendar } = useRenderCalendar();
      wrapper = mount(KCalendarHeader);
      const title = wrapper.find('.center-title h2');
      expect(title.text()).toBe(titleCalendar.value);
    });

    it('when the view is day, the title should be formatted as dd MMMM yyyy', () => {
      const { setCurrentView } = useView();
      const { currentDayWithFormat } = useKWeekDays();
      setCurrentView('day');
      wrapper = mount(KCalendarHeader);
      const title = wrapper.find('.center-title h2');
      expect(title.text()).toBe(currentDayWithFormat.value);
    });
  });

  describe('emits', () => {
    it('handlePrevMonth should emit the previous month', async () => {
      const { currentDate } = useRenderCalendar()
      currentDate.value = DateTime.now();
      const { setCurrentView } = useView();
      setCurrentView('calendar');
      wrapper = mount(KCalendarHeader);
      const button = wrapper.find('.navigation-buttons-group .k-alendar-navegation-prev');
      await button.trigger('click');
      expect(wrapper.emitted('handlePrevMonth')).toBeTruthy();
      expect(wrapper.emitted('handlePrevMonth')?.[0]?.[0]).toBe(DateTime.now().minus({ months: 1 }).toFormat('yyyy-MM-dd'));
    });

    it('handleNextMonth should emit the next month', async () => {
      const { setCurrentView } = useView();
      const { currentDate } = useRenderCalendar()
      currentDate.value = DateTime.now();
      setCurrentView('calendar');
      wrapper = mount(KCalendarHeader);
      const button = wrapper.find('.navigation-buttons-group .k-alendar-navegation-left');
      await button.trigger('click');
      expect(wrapper.emitted('handleNextMonth')).toBeTruthy();
      expect(wrapper.emitted('handleNextMonth')?.[0]?.[0]).toBe(DateTime.now().plus({ months: 1 }).toFormat('yyyy-MM-dd'));
    });

    it('handleToToday should emit the current date', async () => {
      const { setCurrentView } = useView();
      const { currentDate } = useRenderCalendar()
      currentDate.value = DateTime.now();
      setCurrentView('calendar');
      wrapper = mount(KCalendarHeader);
      const button = wrapper.find('.left-buttons .k-alendar-today-button');
      await button.trigger('click');
      expect(wrapper.emitted('handleToToday')).toBeTruthy();
      expect(wrapper.emitted('handleToToday')?.[0]?.[0]).toBe(DateTime.now().toFormat('yyyy-MM-dd'));
    });
  });
});