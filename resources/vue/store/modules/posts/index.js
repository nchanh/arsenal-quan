import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'

const state = {
  post: {},
  posts: null,
  allPosts: null,
  error: false,
};

const namespaced = true;

export const modulePost = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};