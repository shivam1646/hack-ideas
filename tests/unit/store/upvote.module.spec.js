import { mutations, actions } from "@/store/upvote.module.js";
import { storeMock } from "../../test-utils";
import {
  INITIAL_STATE,
  INITIAL_UPVOTE_STATE,
  UPVOTES,
  LOGGED_IN_USER
} from '../../../mock-data';

describe('idea store', () => {
  let store;

  beforeEach(() => {
    store = storeMock(
      {
        state: INITIAL_STATE,
        modules: {
          upvote: {
            namespaced: true,
            state: INITIAL_UPVOTE_STATE,
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
    beforeEach(() => {
      store.state.loggedInUser = LOGGED_IN_USER;
    });

    describe('getUpvotes', () => {
      it('should get upvotes from browser storage and commit them', async () => {
        await store.dispatch('upvote/getUpvotes');
        expect(global.Storage.prototype.getItem).toHaveBeenCalledTimes(1);
      });
    });

    describe('upvote', () => {
      it('should upvote idea', async () => {
        await store.dispatch('upvote/upvote', '1');
        expect(global.Storage.prototype.setItem).toHaveBeenCalledTimes(1);

        const upvotes = global.Storage.prototype.getItem('upvotes');
        expect(JSON.parse(upvotes)[0].ideaId).toEqual('1');
      });
    });

    describe('remove', () => {
      it('should remove upvote from idea', async () => {
        await store.dispatch('upvote/remove', '1');
        expect(global.Storage.prototype.setItem).toBeCalledTimes(2);

        const upvotes = global.Storage.prototype.getItem('upvotes');
        expect(JSON.parse(upvotes).length).toBe(0);
      });
    });
  });

  describe('mutations', () => {
    describe('setUpvotes', () => {
      it ('should set upvotes', async () => {
        await store.commit('upvote/setUpvotes', UPVOTES);
        expect(store.state.upvote.upvotes).toEqual(UPVOTES);
      });
    });
  });
});
