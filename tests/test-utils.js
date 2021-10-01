import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

export const routerMock = () => ({
  $router: {
    push: jest.fn(),
  }
});

export function storeMock(storeConfig, config) {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let store = new Vuex.Store(storeConfig);
  Object.assign(store, config);

  return { store, localVue };
}

export const vuetifyMock = () =>
  new Vuetify({
    mocks: {
      $vuetify: {
        breakpoint: {
          lg: true
        }
      }
    }
  });