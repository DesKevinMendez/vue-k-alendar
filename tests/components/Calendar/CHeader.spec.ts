
import CHeader from '@/components/Calendar/CHeader.vue';
import useConfig from '@/composables/useConfig';
import useRenderCalendar from '@/composables/useRenderCalendar';
import { mount, VueWrapper } from '@vue/test-utils';
import { DateTime } from 'luxon';
const { setLang } = useConfig()

let wrapper: VueWrapper<InstanceType<typeof CHeader>>

describe('CHeader', () => {

  beforeEach(() => {
    wrapper = mount(CHeader);
  });

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should exists components', () => {
    expect(wrapper.findComponent({ name: 'ButtonPrevMonth' }).exists()).toBeTruthy();
    expect(wrapper.findComponent({ name: 'ButtonNextMonth' }).exists()).toBeTruthy();
    expect(wrapper.findComponent({ name: 'ButtonTodayMonth' }).exists()).toBeTruthy();
  })

  it('title come from useRenderCalendar', async () => {
    const { title } = useRenderCalendar()

    expect(wrapper.find('.center-title').text()).toBe(title.value)
  })

  describe('clicks on buttons', () => {

    afterEach(() => {
      vi.clearAllMocks()
    })

    it('click on ButtonPrevMonth', async () => {
      const { currentDate } = useRenderCalendar()

      currentDate.value = DateTime.fromISO('2024-10-24') as DateTime<true>

      const button = wrapper.findComponent({ name: 'ButtonPrevMonth' })

      await button.trigger('click')

      expect(wrapper.emitted('handlePrevMonth')).toStrictEqual([['2024-09-24']])
    })

    it('click on ButtonNextMonth', async () => {
      const { currentDate } = useRenderCalendar()

      currentDate.value = DateTime.fromISO('2024-10-24') as DateTime<true>

      const button = wrapper.findComponent({ name: 'ButtonNextMonth' })

      await button.trigger('click')

      expect(wrapper.emitted('handleNextMonth')).toStrictEqual([['2024-11-24']])
    })

    it('click on ButtonTodayMonth', async () => {
      const now = DateTime.now().toISODate()

      const button = wrapper.findComponent({ name: 'ButtonTodayMonth' })

      await button.trigger('click')

      expect(wrapper.emitted('handleToToday')).toStrictEqual([[now]])
    })
  })
});