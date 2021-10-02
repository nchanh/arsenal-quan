export const getters = {
  getPost: state => state.post,
  getPosts: state => state.posts,
  getAllPosts: state => state.allPosts,
  getCategoryPosts: state => state.categoryPosts,
  getSearchPosts: state => state.searchPosts,
  getTop4Views: state => state.top4Views,
  getOneRandom: state => state.getOneRandom,
  getError: state => state.error,
}
