import { mount, flushPromises } from '@vue/test-utils'
import App from '@/App.vue'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]), // empty arrays for simplicity
  })
);

describe('App.vue Integration', () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(App, {
      global: {
        stubs: {
          'el-container': true,
          'el-header': true,
          'el-main': true,
          'el-footer': true,
          EmissionTable: { template: '<div />' },
          HeaderImage: { template: '<div />' },
          HeaderBar: { template: '<div />' },
          InfoContent: { template: '<div />' },
          PageFooter: { template: '<div />' },
          ImpressumContent: { template: '<div />' },
          DatenschutzContent: { template: '<div />' },
        }
      }
    });

    await flushPromises(); // wait for all fetches inside mounted()
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should mount and call initial data fetching', () => {
    expect(fetch).toHaveBeenCalledTimes(4); // backend data, faq, countries, companies
  });

  it('should navigate between pages using goto()', async () => {
    expect(wrapper.vm.currentPage).toBe('main');
    await wrapper.vm.goto('info');
    expect(wrapper.vm.currentPage).toBe('info');
    
    await wrapper.vm.goto('impressum');
    expect(wrapper.vm.currentPage).toBe('impressum');
  });

  it('should reset and reload data correctly', async () => {
    const fetchSpy = jest.spyOn(wrapper.vm, 'fetchBackendData');
    await wrapper.vm.reload('data');
    expect(fetchSpy).toHaveBeenCalled();
  });
});
