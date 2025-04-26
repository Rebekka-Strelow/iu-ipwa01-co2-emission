import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]), 
  })
)

describe('App.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App, {
      global: {
        stubs: ['el-container', 'el-header', 'el-main', 'el-footer'], 
      },
    });
  });

  it('mounts properly and shows main page', () => {
    expect(wrapper.vm.currentPage).toBe('main');
  });

  it('changes currentPage and calls reset twice', () => {
    const wrapper = shallowMount(App)
    const resetSpy = jest.spyOn(wrapper.vm, 'reset')

    wrapper.vm.goto('info')

    expect(wrapper.vm.currentPage).toBe('info')
    expect(resetSpy).toHaveBeenCalledWith('data')
    expect(resetSpy).toHaveBeenCalledWith('faq')
  });
})

