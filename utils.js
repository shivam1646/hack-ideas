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
  return updateStorage(item, list);
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
  return updateStorage(item, list);
}

export const getVotesCount = (idea, upvotes) => upvotes.filter(uv => uv.ideaId === idea.id).length

const updateStorage = (item, list) => {
  localStorage.setItem(item, JSON.stringify(list));
  return list;
}
