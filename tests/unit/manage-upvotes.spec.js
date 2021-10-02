import { shallowMount } from "@vue/test-utils";
import { routerMock, vuetifyMock, storeMock } from "../test-utils";
import ManageUpvotes from "@/components/manage-upvotes.vue";
import { LOGGED_IN_USER, UPVOTES } from '../../mock-data';

const remove = jest.fn();
const upvote = jest.fn();

const getWrapper = (ideaId = '1') => {
  return shallowMount(ManageUpvotes, {
    propsData: {
      ideaId,
    },
    ...storeMock({
      state: {
        loggedInUser: LOGGED_IN_USER
      },
      modules: {
        upvote: {
          namespaced: true,
          state: { upvotes: UPVOTES },
          actions: { 
            getUpvotes: jest.fn(({ state }) => {
              state.upvotes = UPVOTES
            }),
            upvote,
            remove
           }
        }
      }
    }),
    mocks: {
      ...routerMock()
    },
    vuetify: vuetifyMock()
  });
};

describe('manage upvotes', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  describe('when user has already upvoted the idea', () => {

    it('user should see button to remove upvote', () => {
      expect(wrapper.findAll('v-icon-stub').length).toBe(1);
      expect(wrapper.find('v-icon-stub').text()).toBe('mdi-thumb-up');
    });

    it('should call action to remove upvote on click', async() => {
      await wrapper.find('v-btn-stub').vm.$emit('click');
      expect(remove).toBeCalledTimes(1);
    });
  });

  describe('when user has not upvoted the idea', () => {

    beforeEach(() => {
      wrapper = getWrapper('2');
    });

    it('user should see button to upvote', () => {
      expect(wrapper.findAll('v-icon-stub').length).toBe(1);
      expect(wrapper.find('v-icon-stub').text()).toBe('mdi-thumb-up-outline');
    });

    it('should call action to upvote on click', async() => {
      await wrapper.find('v-btn-stub').vm.$emit('click');
      expect(upvote).toBeCalledTimes(1);
    });
  });
});
