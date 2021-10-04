import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'

const state = {
  post: {},
  posts: null,
  categoryPosts: null,
  searchPosts: null,
  allPosts: null,
  top4Views: null,
  getOneRandom: null,
  error: false,
  stringError: "",
};

const namespaced = true;

export const modulePost = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};
