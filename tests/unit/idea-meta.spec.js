import { shallowMount } from "@vue/test-utils";
import { vuetifyMock } from "../test-utils";
import IdeaMeta from "@/components/idea-meta.vue";
import { TAG_IDS, IDEA_CREATED_AT } from '../../mock-data';

const getWrapper = () => {

  return shallowMount(IdeaMeta, {
    propsData: {
      tags: TAG_IDS,
      createdAt: IDEA_CREATED_AT
    },
    vuetify: vuetifyMock()
  });
};

describe('idea meta', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('should have chips for all the tags attached to the data', () => {
    expect(wrapper.findAll('v-chip-stub').length).toBe(2);
  });
});
