export const mutations = {
  setPost(state, postInput) {
    state.post = postInput;
  },
  setPosts(state, postInput) {
    state.posts = postInput;
  },
  setAllPosts(state, postInput) {
    state.allPosts = postInput;
  },
  setCategoryPosts(state, postInput) {
    state.categoryPosts = postInput;
  },
  setSearchPosts(state, postInput) {
    state.searchPosts = postInput;
  },
  setError(state, errorInput) {
    state.error = errorInput;
  },
  resetPost(state) {
    state.post = {};
  },
  resetPosts(state) {
    state.posts = {};
  },
};
