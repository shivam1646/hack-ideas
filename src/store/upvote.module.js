import { INITIAL_UPVOTE_STATE } from '../../mock-data';
import { createUpvote, addToStorage, getStorage, removeUpvoteFromStorage } from '../../utils';

export const state = INITIAL_UPVOTE_STATE;

export const mutations = {
  setUpvotes(state, upvotes) {
    state.upvotes = upvotes;
  }
}

export const actions = {
  getUpvotes({ commit }) {
    commit('setUpvotes', getStorage('upvotes'));
  },
  upvote({ rootState, commit }, ideaId) {
    try {
      commit('setUpvotes', addToStorage('upvotes', createUpvote(rootState, ideaId)));
    } catch (err) {
      console.log('storage error');
    }
  },
  remove({ rootState, commit }, ideaId) {
    try {
      commit('setUpvotes', removeUpvoteFromStorage('upvotes', ideaId, rootState));
    } catch (err) {
      console.log('storage error');
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
