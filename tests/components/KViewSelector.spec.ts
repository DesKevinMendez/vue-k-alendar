import KViewSelector from '@/components/KViewSelector.vue';
import useConfig from '@/composables/useConfig';
import useDate from '@/composables/useDate';
import useKWeekDays from '@/composables/useKWeekDays';
import useView from '@/composables/useView';

import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';

describe('KViewSelector', () => {
  let wrapper: VueWrapper<InstanceType<typeof KViewSelector>>;

  beforeEach(() => {
    wrapper = mount(KViewSelector);
  });

  it('should render the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('click on button should set the current view', async () => {
    const { currentView } = useView();
    const button = wrapper.findAll('button');

    await button[0].trigger('click'); // Month view
    expect(currentView.value).toBe('calendar');

    await button[1].trigger('click'); // Day view
    expect(currentView.value).toBe('day');

    await button[2].trigger('click'); // List view
    expect(currentView.value).toBe('list');
  });

  it('click on button should set the current day', async () => {
    const { currentDay, setCurrentDay } = useKWeekDays();
    const { today } = useDate();

    setCurrentDay('2025-01-01');
    expect(currentDay.value).not.toBe(today.value);

    const button = wrapper.findAll('button');

    await button[0].trigger('click');
    expect(currentDay.value).toBe(today.value);
  });

  it('button should containt k-view-selector-button-active if the current view is the same as the button value', async () => {
    const { currentView } = useView();
    const button = wrapper.findAll('button');

    expect(currentView.value).toBe('calendar');
    expect(button[0].classes()).toContain('k-view-selector-button-active');
    expect(button[1].classes()).not.toContain('k-view-selector-button-active');
    expect(button[2].classes()).not.toContain('k-view-selector-button-active');

    await button[1].trigger('click');
    expect(button[0].classes()).not.toContain('k-view-selector-button-active');
    expect(button[1].classes()).toContain('k-view-selector-button-active');
    expect(button[2].classes()).not.toContain('k-view-selector-button-active');

    await button[2].trigger('click');
    expect(button[0].classes()).not.toContain('k-view-selector-button-active');
    expect(button[1].classes()).not.toContain('k-view-selector-button-active');
    expect(button[2].classes()).toContain('k-view-selector-button-active');

    await button[0].trigger('click');
    expect(button[0].classes()).toContain('k-view-selector-button-active');
    expect(button[1].classes()).not.toContain('k-view-selector-button-active');
    expect(button[2].classes()).not.toContain('k-view-selector-button-active');
  });

  describe('when the lang is changed', () => {
    it('should render the component with the correct labels', () => {
      const { setLang } = useConfig();
      setLang('es');
      wrapper = mount(KViewSelector);
      const button1 = wrapper.findAll('button');
      expect(button1[0].text()).toBe('Mes');
      expect(button1[1].text()).toBe('Día');
      expect(button1[2].text()).toBe('Lista');

      setLang('en');
      wrapper = mount(KViewSelector);
      const button2 = wrapper.findAll('button');
      expect(button2[0].text()).toBe('Month');
      expect(button2[1].text()).toBe('Day');
      expect(button2[2].text()).toBe('List');

      setLang('fr');
      wrapper = mount(KViewSelector);
      const button3 = wrapper.findAll('button');
      expect(button3[0].text()).toBe('Mois');
      expect(button3[1].text()).toBe('Jour');
      expect(button3[2].text()).toBe('Liste');
    });
  });
});