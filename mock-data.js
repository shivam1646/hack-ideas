export const INITIAL_STATE = {
  employeeId: '',
  loggedInUser: null,
  ideas: [],
  sortByField: 'createdAt'
};

export const INITIAL_IDEA_STATE = () => ({
  title: '',
  description: '',
  tags: []
});

export const INITIAL_UPVOTE_STATE = () => ({
  upvotes: []
});

export const EMPLOYEE_ID = 'HI-JD101';

export const INVALID_EMPLOYEE_ID = '123';

export const IDEA_TITLE = 'JS Hackathon';

export const IDEA_DESCR = 'Apply your JS skills';

export const IDEA_CREATED_AT = '2021-10-02T17:05:49.623Z';

export const TAG_IDS = [1, 2];

export const LOGGED_IN_USER = { emp_id: EMPLOYEE_ID };

export const IDEAS = [{
  id: '1',
  title: IDEA_TITLE,
  description: IDEA_DESCR,
  tags: TAG_IDS
}, {
  id: '2',
  title: 'Idea 2',
  description: 'description 2',
  tags: [2, 4]
}];

export const UPVOTES = [{
  id: '1',
  ideaId: '1',
  userId: EMPLOYEE_ID
}, {
  id: '2',
  ideaId: '2'
}, {
  id: '3',
  ideaId: '2'
}]