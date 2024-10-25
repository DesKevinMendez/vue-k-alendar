
import CDays from '@/components/Calendar/CDays.vue';
import useConfig from '@/composables/useConfig';
import { mount, VueWrapper } from '@vue/test-utils';
const { setLang } = useConfig()

let wrapper: VueWrapper<InstanceType<typeof CDays>>

describe('CDays', () => {

  beforeEach(() => {
    wrapper = mount(CDays);
  });

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('lang', () => {
    it('by default is en', async () => {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',];
      const container = wrapper.find('.k-alendar-days-container');

      container.findAll('div')
        .forEach((day, index) => {
          expect(day.text()).toBe(days[index]);
        });
    })

    it('is es', async () => {
      setLang('es');
      await wrapper.vm.$nextTick();

      const days = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom',];
      const container = wrapper.find('.k-alendar-days-container');

      container.findAll('div')
        .forEach((day, index) => {
          expect(day.text()).toBe(days[index]);
        });
    })

    it('is it', async () => {
      setLang('it');
      await wrapper.vm.$nextTick();

      const days = ['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom',];
      const container = wrapper.find('.k-alendar-days-container');

      container.findAll('div')
        .forEach((day, index) => {
          expect(day.text()).toBe(days[index]);
        });
    })

    it('lang is invalid, it should be english', async () => {
      setLang('invalid');
      await wrapper.vm.$nextTick();

      const days = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom',];
      const container = wrapper.find('.k-alendar-days-container');

      container.findAll('div')
        .forEach((day, index) => {
          expect(day.text()).toBe(days[index]);
        });
    })
  })
});