import { mutations, actions } from "@/store/index.js";
import { storeMock } from "../../test-utils";
import { INITIAL_STATE, EMPLOYEE_ID, INVALID_EMPLOYEE_ID } from '../../../mock-data';

describe('global store', () => {
  let store;

  beforeEach(() => {
    store = storeMock(
      {
        state: INITIAL_STATE,
        actions,
        mutations
      }
    ).store;
  });

  afterEach(() => {
    global.Storage.prototype.clear();
  })

  describe('actions', () => {
    describe('login', () => {

      it('should save user to browser storage', async () => {
        store.state.employeeId = EMPLOYEE_ID;
        await store.dispatch('login');
        expect(global.Storage.prototype.setItem).toHaveBeenCalledTimes(1);

        const loggedInUser = global.Storage.prototype.getItem('user');
        expect(JSON.parse(loggedInUser).emp_id).toBe(EMPLOYEE_ID);
      });

      it('should throw error', async () => {
        let error;
        store.state.employeeId = INVALID_EMPLOYEE_ID;
        try {
          await store.dispatch('login');
        } catch (e) {
          error = e;
        }
        expect(error).toMatchObject(new Error('Invalid id'));
      });
    });
  });

  describe('mutations', () => {
    describe('setEmployeeId', () => {

      it ('should set employeeId', async () => {
        await store.commit('setEmployeeId', INVALID_EMPLOYEE_ID);
        expect(store.state.employeeId).toBe(INVALID_EMPLOYEE_ID);
      });
      
      it ('should set setLoggedInUser', async () => {
        await store.commit('setLoggedInUser', { emp_id: EMPLOYEE_ID });
        expect(store.state.loggedInUser.emp_id).toBe(EMPLOYEE_ID);
      });
    })
  });
});
