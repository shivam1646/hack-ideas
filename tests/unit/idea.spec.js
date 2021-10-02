import { shallowMount } from "@vue/test-utils";
import { routerMock, vuetifyMock, storeMock } from "../test-utils";
import Idea from "@/components/idea.vue";
import { INITIAL_IDEA_STATE, IDEA_TITLE, IDEA_DESCR, TAG_IDS } from '../../mock-data';
import { TAGS } from '../../data';

const getWrapper = (add) => {

  return shallowMount(Idea, {
    ...storeMock({
      modules: {
        idea: {
          namespaced: true,
          state: INITIAL_IDEA_STATE,
          actions: { add }
        }
      }
    }),
    mocks: {
      ...routerMock()
    },
    vuetify: vuetifyMock()
  });
};

const getTitleField = wrapper => wrapper.find('v-text-field-stub');

const getDescriptionField = wrapper => wrapper.find('v-textarea-stub');

const getTagsField = wrapper => wrapper.find('v-autocomplete-stub');

const getSubmitBtn = wrapper => wrapper.find('v-btn-stub');

const setTitle = (wrapper, value) => {
  const titleField = getTitleField(wrapper);
  titleField.element.value = value;
  titleField.trigger('input');
};

const setDescription = (wrapper, value) => {
  const descriptionField = getDescriptionField(wrapper);
  descriptionField.element.value = value;
  descriptionField.trigger('input');
};

const setTags = (wrapper, value) => {
  const tagsField = getTagsField(wrapper);
  tagsField.element.value = value;
  tagsField.trigger('change');
};

const triggerClick = async wrapper => {
  await wrapper.find('form').trigger('submit.prevent');
}

describe('idea', () => {
  let wrapper;
  let add;

  beforeEach(() => {
    add = jest.fn();
    wrapper = getWrapper(add);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('should have a title, description and tags field and button in disabled state', () => {
    expect(getTitleField(wrapper).props().label).toBe('Title');
    expect(getDescriptionField(wrapper).props().label).toBe('Description');
    expect(getTagsField(wrapper).props().label).toBe('Tags');
    expect(getSubmitBtn(wrapper).props().disabled).toBe(true);
  });

  it('tags field items', () => {
    expect(getTagsField(wrapper).props().items).toEqual(TAGS);
  });

  it('submit should be disabled if form is invalid', async () => {
    setTitle(wrapper, IDEA_TITLE);
    setDescription(wrapper, IDEA_DESCR);

    expect(getSubmitBtn(wrapper).props().disabled).toBe(true);
  });

  describe('submit when form is valid', () => {

    beforeEach(() => {
      add = jest.fn();
      wrapper = getWrapper(add);
    });

    it('should route to home page', async () => {
      setTitle(wrapper, IDEA_TITLE);
      setDescription(wrapper, IDEA_DESCR);
      setTags(wrapper, TAG_IDS);

      await triggerClick(wrapper);
      expect(add).toHaveBeenCalled();
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'home' });
    })
  })
});
