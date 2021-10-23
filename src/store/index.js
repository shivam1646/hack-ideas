import Vue from "vue";
import Vuex from "vuex";
import idea from "./idea.module";
import upvote from "./upvote.module";
import users from '../../users.json';
import { INITIAL_STATE } from '../../mock-data';
import { getStorage } from '../../utils';

Vue.use(Vuex);

const state = INITIAL_STATE;

export const getters = {
  ideasCount: state => state.ideas.length
};

export const mutations = {
  setEmployeeId(state, employeeId) {
    state.employeeId = employeeId;
  },
  setLoggedInUser(state, loggedInUser) {
    state.loggedInUser = loggedInUser;
  },
  setIdeas(state, ideas) {
    state.ideas = ideas;
  },
  setSortByField(state, sortByField) {
    state.sortByField = sortByField;
  }
};

export const actions = {
  getIdeas({ commit }) {
    commit('setIdeas', getStorage('ideas'));
  },
  login({ state, commit }) {
    const user = users.find(user => user.emp_id === state.employeeId);
    if (!user) {
      throw new Error('Invalid id');
    }
    sessionStorage.setItem('user', JSON.stringify(user));
    commit('setLoggedInUser', user);
  },
  logout({ commit }) {
    sessionStorage.removeItem('user');
    commit('setLoggedInUser', null);
    commit('setEmployeeId', '');
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    idea,
    upvote
  }
});
