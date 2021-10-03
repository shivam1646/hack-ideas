import { shallowMount } from "@vue/test-utils";
import { vuetifyMock, storeMock } from "../test-utils";
import Toolbar from "@/components/toolbar.vue";

let setSortByField = jest.fn();

const getWrapper = () => {
  return shallowMount(Toolbar, {
    ...storeMock({
      getters: {
        ideasCount: jest.fn(() => 3)
      },
      mutations: {
        setSortByField
      }
    }),
    vuetify: vuetifyMock()
  });
};

describe('toolbar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('should display total count', () => {
    expect(wrapper.find('.count').text()).toBe('3 ideas found.');
  });

  it('should have tabs to sort by upvote count and creation date', () => {
    const tabs = wrapper.findAll('v-tab-stub');
    expect(tabs.length).toBe(2);
    expect(tabs.at(0).text()).toBe('Created at');
    expect(tabs.at(1).text()).toBe('Upvotes count');
  });

  it('should call mutation to set sortby field', async() => {
    await wrapper.find('v-tabs-stub').vm.$emit('change', 1);
    expect(setSortByField).toBeCalledTimes(1);
  });
});
