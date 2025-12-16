import { mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock must be before any imports that use luxon
vi.mock('luxon', async () => {
  const { mockDate } = await import('tests/utils/mockDate');
  return mockDate('2024-08-21T12:00:00.000Z')();
});

import VueKAlendar from '@/views/VueKAlendar.vue';
import useConfig from '@/composables/useConfig';

const props = {
  lang: 'es',
  events: [
    {
      id: '9cc69d03-7215-41e2-966a-9c787b690223',
      title: 'Dto',
      description: 'Das',
      color: '#a02222',
      start_date: '2024-08-16T00:35:00.000000Z',
      end_date: '2024-08-17T00:35:00.000000Z'
    },
  ]
}
let wrapper: VueWrapper<InstanceType<typeof VueKAlendar>>

describe('kAlendar', () => {

  beforeEach(() => {
    const { setLang } = useConfig();
    setLang('es');
    wrapper = mount(VueKAlendar, {
      props,
    });
  })

  it('should render the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
