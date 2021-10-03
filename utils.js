import { v4 as uuid } from 'uuid';


export const createIdea = (state, rootState) => {
  const { title, description, tags } = state;
  const { loggedInUser: { emp_id: createdBy } } = rootState;
  return {
    id: uuid(),
    title,
    description,
    tags,
    createdBy,
    createdAt: new Date()
  }
}

export const createUpvote = (rootState, ideaId) => {
  const { loggedInUser: { emp_id: userId } } = rootState;
  return {
    id: uuid(),
    userId,
    ideaId
  }
}

export const addToStorage = (item, itemToAdd) => {
  const list = [...getStorage(item), itemToAdd];
  return _updateStorage(item, list);
}

export const getStorage = item => {
  const list = localStorage.getItem(item);
  return list ? JSON.parse(list) : [];
}

export const removeUpvoteFromStorage = (item, id, rootState) => {
  const { loggedInUser: { emp_id: userId } } = rootState;
  const list = getStorage(item).filter(p => {
    if (p.ideaId !== id) {
      return true;
    }
    if (p.userId !== userId) {
      return true;
    }
    return false;
  });
  return _updateStorage(item, list);
}

export const sortBy = (upvotesState) => {
  const createdAt =  _sortByCreatedAt;
  const upvotes = _sortByUpvotes(upvotesState);

  return {
    createdAt,
    upvotes
  }
};

const _sortByCreatedAt = (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

const _sortByUpvotes = (upvotes) => {
  return function(a, b) {
    return _getVotesCount(b, upvotes) - _getVotesCount(a, upvotes);
  }
}

const _getVotesCount = (idea, upvotes) => upvotes.filter(uv => uv.ideaId === idea.id).length

const _updateStorage = (item, list) => {
  localStorage.setItem(item, JSON.stringify(list));
  return list;
}
