import { INITIAL_IDEA_STATE } from '../../mock-data';
import { createIdea, addToStorage } from '../../utils';

export const state = INITIAL_IDEA_STATE;

export const mutations = {
  setField(state, { field, value }) {
    state[field] = value;
  },
  resetIdea(state) {
    Object.assign(state, INITIAL_IDEA_STATE());
  }
};

export const actions = {
  add({ state, rootState, commit }) {
    commit('setIdeas', addToStorage('ideas', createIdea(state, rootState)), { root: true });
    commit('resetIdea');
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
