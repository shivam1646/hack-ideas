import { mutations, actions } from "@/store/idea.module.js";
import { globalMutations } from "@/store/index.js";
import { storeMock } from "../../test-utils";
import {
  INITIAL_IDEA_STATE,
  INITIAL_STATE,
  IDEA_TITLE,
  IDEA_DESCR,
  TAG_IDS,
  LOGGED_IN_USER
} from '../../../mock-data';

describe('idea store', () => {
  let store;

  beforeEach(() => {
    store = storeMock(
      {
        state: INITIAL_STATE,
        mutations: globalMutations,
        modules: {
          idea: {
            namespaced: true,
            state: INITIAL_IDEA_STATE,
            actions,
            mutations
          }
        }
      }
    ).store;
  });

  afterEach(() => {
    global.Storage.prototype.clear();
  })

  describe('actions', () => {
    describe('add', () => {

      beforeEach(() => {
        store.state.idea = {
          ...store.state.idea,
          title: IDEA_TITLE,
          description: IDEA_DESCR,
          tags: TAG_IDS
        }
        store.state.loggedInUser = LOGGED_IN_USER;
      });

      it('should save idea to browser storage', async () => {
        await store.dispatch('idea/add');
        expect(global.Storage.prototype.setItem).toHaveBeenCalledTimes(1);

        const ideas = global.Storage.prototype.getItem('ideas');
        expect(JSON.parse(ideas)[0].title).toBe(IDEA_TITLE);
      });
    });
  });

  describe('mutations', () => {
    describe('setField', () => {

      it ('should set value for the given field', async () => {
        await store.commit('idea/setField', { field: 'title', value: IDEA_TITLE });
        expect(store.state.idea.title).toBe(IDEA_TITLE);
      });
    });

    describe('resetIdea', () => {

      it ('should reset idea state', async () => {
        await store.commit('idea/resetIdea');
        expect(store.state.idea).toMatchObject(INITIAL_IDEA_STATE());
      });
    });
  });
});
