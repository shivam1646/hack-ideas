import Vue from "vue";
import Vuex from "vuex";
import users from '../../users.json';
import { INITIAL_STATE } from '../../mock-data';

Vue.use(Vuex);

const state = INITIAL_STATE;

export const mutations = {
  setEmployeeId(state, employeeId) {
    state.employeeId = employeeId;
  },
  setLoggedInUser(state, loggedInUser) {
    state.loggedInUser = loggedInUser;
  },
  clear(state) {
    state = {};
  }
};

export const actions = {
  login({ state, commit }) {
    const user = users.find(user => user.emp_id === state.employeeId);
    if (!user) {
      throw new Error('Invalid id');
    }
    sessionStorage.setItem('user', JSON.stringify(user));
    commit('setLoggedInUser', user);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
