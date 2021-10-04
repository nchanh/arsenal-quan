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
  setTop4Views(state, postInput) {
    state.top4Views = postInput;
  },
  setOneRandom(state, postInput) {
    state.getOneRandom = postInput;
  },
  setError(state, errorInput) {
    state.error = errorInput;
  },
  setStringError(state, errorInput) {
    state.stringError = errorInput;
  },
  resetPost(state) {
    state.post = {};
  },
  resetPosts(state) {
    state.posts = {};
  },
};
