import KWeekDays from '@/components/Calendar/KWeekDays.vue';

import useConfig from '@/composables/useConfig';
import { mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
const fakeDate = '2025-12-11T12:00:00.000Z';

import { mockDate } from 'tests/utils/mockDate';
import useView from '@/composables/useView';

mockDate(fakeDate);

describe('KWeekDays', () => {
  let wrapper: VueWrapper<InstanceType<typeof KWeekDays>>;

  beforeEach(() => {
    wrapper = mount(KWeekDays);
  });

  it('should render the week days in format ccc', () => {
    const weekDays = wrapper.findAll('.k-alendar-days-container div');
    expect(weekDays.length).toBe(7);
    expect(weekDays.at(0)?.text()).toBe('Mon');
    expect(weekDays.at(1)?.text()).toBe('Tue');
    expect(weekDays.at(2)?.text()).toBe('Wed');
    expect(weekDays.at(3)?.text()).toBe('Thu');
    expect(weekDays.at(4)?.text()).toBe('Fri');
    expect(weekDays.at(5)?.text()).toBe('Sat');
    expect(weekDays.at(6)?.text()).toBe('Sun');
  });

  it('should render the week days in format ccc in spanish', () => {
    const { setLang } = useConfig();
    setLang('es');
    wrapper = mount(KWeekDays);

    const weekDays = wrapper.findAll('.k-alendar-days-container div');
    expect(weekDays.length).toBe(7);
    expect(weekDays.at(0)?.text()).toBe('lun');
    expect(weekDays.at(1)?.text()).toBe('mar');
    expect(weekDays.at(2)?.text()).toBe('mié');
    expect(weekDays.at(3)?.text()).toBe('jue');
    expect(weekDays.at(4)?.text()).toBe('vie');
    expect(weekDays.at(5)?.text()).toBe('sáb');
    expect(weekDays.at(6)?.text()).toBe('dom');
  });

  it('should emit date when week day is clicked', async () => {
    const weekDays = wrapper.findAll<HTMLDivElement>('.k-alendar-days-container div');
    await weekDays.at(0)?.trigger('click');
    expect(wrapper.emitted('dateClicked')).toBeTruthy();
    // 2025-12-11 is a Thursday, so the start of the week (Monday) is 2025-12-08
    expect(wrapper.emitted('dateClicked')?.[0]?.[0]).toBe('2025-12-08');
  });

  it('should not be cursor pointer if the current view is not day', () => {
    const { setCurrentView } = useView();
    setCurrentView('calendar');
    wrapper = mount(KWeekDays);
    const weekDays = wrapper.findAll('.k-alendar-days-container div');
    expect(weekDays[0].classes()).toStrictEqual([]);

    setCurrentView('day');
    wrapper = mount(KWeekDays);
    const weekDays2 = wrapper.findAll('.k-alendar-days-container div');
    expect(weekDays2[0].classes()).toContain('k-alendar-day');
  });
});