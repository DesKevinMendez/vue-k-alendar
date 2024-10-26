import EDTitle from '@/components/EventDialog/EDTitle.vue';
import type { KEvent } from '@/types';
import { mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

let wrapper: VueWrapper<InstanceType<typeof EDTitle>>

const event: KEvent = {
  title: 'Event 1',
  start_date: '2024-10-13',
  description: 'Description of random event',
  color: '#fe36d9',
  autor: 'Kevin Méndez',
  id: 'ffee34f5-5ebb-487d-ab21-61f42edbc1df',
}

describe('EDTitle', () => {

  beforeEach(() => {
    wrapper = mount(EDTitle, {
      props: {
        event,
      }
    });
  })

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('snapshot', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should render the component', async () => {
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('event is null', async () => {
      await wrapper.setProps({ event: null });
      expect(wrapper.html()).toMatchSnapshot();
      const span = wrapper.find('span');

      expect(span.exists()).toBeFalsy();
    })
  })

  it('span circle', () => {
    const span = wrapper.find('span');
    expect(span.exists()).toBeTruthy();
    expect(span.classes()).toContain('circle');
    expect(span.attributes().style).toBe('background-color: rgb(254, 54, 217);');
  })
});