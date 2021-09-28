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
  setError(state, errorInput) {
    state.error = errorInput;
  },
  resetPost(state) {
    state.post = {};
  },
  resetPosts(state) {
    state.posts = {};
  },
  removePost(state, postId) {
    state.allPosts = state.allPosts.filter(post => post.id !== postId);
  },
  addPost(state, newPost) {
    state.allPosts.unshift(newPost);
  }
};
