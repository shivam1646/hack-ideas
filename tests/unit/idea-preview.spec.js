import { shallowMount } from "@vue/test-utils";
import { vuetifyMock } from "../test-utils";
import IdeaPreview from "@/components/idea-preview.vue";
import { IDEAS } from '../../mock-data';

const getWrapper = () => {

  return shallowMount(IdeaPreview, {
    propsData: {
      idea: { ...IDEAS[0], id: '1' }
    },
    vuetify: vuetifyMock()
  });
};

describe('idea preview', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('should have a preview image, title and description', () => {
    expect(wrapper.find('v-img-stub')).toBeTruthy();
    expect(wrapper.find('h3').text()).toBe(IDEAS[0].title);
    expect(wrapper.find('.description').text()).toBe(IDEAS[0].description);
  });

  it('should have a component to display idea meta data', () => {
    expect(wrapper.findComponent({ name: 'idea-meta' }).props().tags).toEqual(IDEAS[0].tags);
  });

  it('should have a component to display upvotes', () => {
    expect(wrapper.findComponent({ name: 'manage-upvotes' }).props().ideaId).toEqual('1');
  });
});
