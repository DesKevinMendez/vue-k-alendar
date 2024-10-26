import KDialog from '@/components/Reusable/KDialog.vue';
import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';

let wrapper: VueWrapper<InstanceType<typeof KDialog>>

describe('KDialog', () => {

  beforeEach(() => {
    wrapper = mount(KDialog, {
      props: {
        modelValue: false,
      }
    });
  })

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the component', async () => {
    expect(wrapper.html()).toMatchSnapshot();

  });

  describe('open/close', () => {
    const originalShowModal = HTMLDialogElement.prototype.showModal;
    const originalClose = HTMLDialogElement.prototype.close;
    const showModal = vi.fn();
    const close = vi.fn();

    beforeEach(() => {
      HTMLDialogElement.prototype.showModal = showModal;
      HTMLDialogElement.prototype.close = close;
      wrapper = mount(KDialog, {
        props: {
          modelValue: false,
        }
      });
    })

    afterEach(() => {
      HTMLDialogElement.prototype.showModal = originalShowModal;
      HTMLDialogElement.prototype.close = originalClose;

      showModal.mockRestore();
      close.mockRestore();

      vi.clearAllMocks();
    });

    it('change', async () => {
      await wrapper.setProps({ modelValue: true });

      expect(showModal).toHaveBeenCalled();
      expect(close).not.toHaveBeenCalled();

      await wrapper.setProps({ modelValue: false });
      expect(close).toHaveBeenCalled();
      expect(showModal).toHaveBeenCalledTimes(1);
    });
  });

  // TODO: test mounted and unmounted
  describe('mounted/unmounted', () => {
    it('is mounted', async () => { });

    it('is unmounted', async () => { });
  })

  it('openDialog should be false when close is called', async () => {
    const button = wrapper.find('.k-alendar-button-close')
    wrapper.vm.openDialog = true;

    await button.trigger('click');
    await nextTick();

    expect(wrapper.vm.openDialog).toStrictEqual(false);
  })

  describe('slots', () => {
    const header = '<div class="k-alendar-header-slot">Header</div>';
    const defaultSlot = '<div class="k-alendar-default-slot">Default</div>';
    const footer = '<div class="k-alendar-footer-slot">Footer</div>';

    beforeEach(() => {
      wrapper = mount(KDialog, {
        props: {
          modelValue: false,
        },
        slots: {
          header,
          default: defaultSlot,
          footer,
        }
      });
    })

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should render the header slot', async () => {
      expect(wrapper.html()).toContain(header);
    });

    it('should render the default slot', async () => {
      expect(wrapper.html()).toContain(defaultSlot);
    });

    it('should render the footer slot', async () => {
      expect(wrapper.html()).toContain(footer);
    });
  });
});