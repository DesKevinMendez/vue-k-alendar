import EDAutor from '@/components/EventDialog/EDAutor.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

let wrapper: VueWrapper<InstanceType<typeof EDAutor>>

describe('EDAutor', () => {

  beforeEach(() => {
    wrapper = mount(EDAutor, {
      props: {
        autor: 'Kevin Mendez'
      }
    });
  })

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render prop', async () => {
    expect(wrapper.html()).toContain('Kevin Mendez');

    await wrapper.setProps({ autor: 'Juan Perez' });

    expect(wrapper.html()).toContain('Juan Perez');
  });
});