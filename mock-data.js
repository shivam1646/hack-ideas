export const INITIAL_STATE = {
  employeeId: '',
  loggedInUser: null,
  ideas: []
};

export const INITIAL_IDEA_STATE = () => ({
  title: '',
  description: '',
  tags: []
});

export const EMPLOYEE_ID = 'HI-JD101';

export const INVALID_EMPLOYEE_ID = '123';

export const IDEA_TITLE = 'JS Hackathon';

export const IDEA_DESCR = 'Apply your JS skills';

export const TAG_IDS = [1, 2];

export const LOGGED_IN_USER = { emp_id: EMPLOYEE_ID };