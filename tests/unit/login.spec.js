import { shallowMount } from "@vue/test-utils";
import { routerMock, vuetifyMock, storeMock } from "../test-utils";
import Login from "@/components/login.vue";
import store from "@/store/index.js";

const getWrapper = (login) => {
  const { state } = store;

  return shallowMount(Login, {
    ...storeMock({
      state,
      actions: { login }
    }),
    mocks: {
      ...routerMock()
    },
    vuetify: vuetifyMock()
  });
};

const triggerClick = async (wrapper, value) => {
  const employeeIdField = wrapper.find('v-text-field-stub');
  employeeIdField.element.value = value;
  employeeIdField.trigger('input');

  await wrapper.find('form').trigger('submit.prevent');
}

describe('login', () => {
  let wrapper;
  let login;

  beforeEach(() => {
    login = jest.fn(() => {
      throw new Error('Invalid id');
    });
    wrapper = getWrapper(login);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('should have an employee id field and button in disabled state', () => {
    expect(wrapper.find('v-text-field-stub').props().label).toBe('Employee id');
    expect(wrapper.find('v-btn-stub').props().disabled).toBe(true);
  });

  it('should show alert for incorrect employee id', async () => {
    await triggerClick(wrapper, 'incorrect');
    expect(login).toHaveBeenCalled();
    expect(wrapper.find('v-alert-stub').props().value).toBeTruthy();
  });

  describe('when employee id is correct', () => {

    beforeEach(() => {
      login = jest.fn();
      wrapper = getWrapper(login);
    });

    it('should route to home page', async () => {
      await triggerClick(wrapper, 'correct');
      expect(login).toHaveBeenCalled();
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'home' });
    })
  })
});
