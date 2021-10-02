import { shallowMount } from "@vue/test-utils";
import { routerMock, vuetifyMock, storeMock } from "../test-utils";
import Home from "@/components/home.vue";
import { INITIAL_STATE, INITIAL_UPVOTE_STATE, IDEAS, UPVOTES } from '../../mock-data';

const getWrapper = (initialState, initialUpvoteState = INITIAL_UPVOTE_STATE) => {
  return shallowMount(Home, {
    ...storeMock({
      state: { ...INITIAL_STATE, ...initialState },
      actions: {
        getIdeas: jest.fn(({ state }) => {
          state.ideas = IDEAS
        })
      },
      modules: {
        upvote: {
          namespaced: true,
          state: initialUpvoteState
        }
      }
    }),
    mocks: {
      ...routerMock()
    },
    vuetify: vuetifyMock()
  });
};

describe('home', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('home screen should have a toolbar to sort ideas and see total count', () => {
    expect(wrapper.findComponent({ name: 'toolbar' })).toBeTruthy();
  });

  it('home screen should list all the ideas', () => {
    expect(wrapper.findAllComponents({ name: 'idea-preview' }).length).toBe(2);
  });

  describe('sort by upvotes count', () => {
    beforeEach(() => {
      wrapper = getWrapper({
        sortByField: 'upvotes'
      }, {
        upvotes: UPVOTES
      });
    });

    it('idea with most upvotes should appear first', () => {
      const ideas = wrapper.findAllComponents({ name: 'idea-preview' });
      expect(ideas.at(0).props().idea.id).toBe('2');
      expect(ideas.at(1).props().idea.id).toBe('1');
    });
  })
});
