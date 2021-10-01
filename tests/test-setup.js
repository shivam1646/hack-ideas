import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';

Vue.use(Vuetify);
Vue.use(Vuelidate);

let store = {};

global.Storage.prototype.setItem = jest.fn((key, value) => {
  store[key] = value.toString();
});

global.Storage.prototype.getItem = jest.fn((key) => {
  return store[key];
});

global.Storage.prototype.clear = jest.fn(() => {
  store = {};
});