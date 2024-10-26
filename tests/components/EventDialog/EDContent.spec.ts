import EDContent from '@/components/EventDialog/EDContent.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

let wrapper: VueWrapper<InstanceType<typeof EDContent>>

describe('EDContent', () => {

  beforeEach(() => {
    wrapper = mount(EDContent, {
      props: {
        content: 'Content'
      }
    });
  })

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render content prop', async () => {
    expect(wrapper.html()).toContain('Content');

    await wrapper.setProps({ content: 'New Content' });

    expect(wrapper.html()).toContain('New Content');
  });
});