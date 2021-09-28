import router from "../../../router";

export const actions = {
  async getPost({ commit }, slug) {
    let urlRequest = "post/" + slug;
    let response = await axios.get(urlRequest);
    if (Object.keys(response.data).length === 0) {
      router.push({ name: "urlNotFound" });
    } else {
      commit("setPost", response.data);
    }
  },
  async getPosts({ commit }, page) {
    let urlRequest = "post/pagination?page=" + page;
    let response = await axios.get(urlRequest);
    commit("setPosts", response.data);
  },
  async getAllPosts({ commit }) {
    let urlRequest = "posts";
    let response = await axios.get(urlRequest);
    commit("setAllPosts", response.data);
  },
  async removePost({ rootState, dispatch }, postId) {
    try {
      let headers = {
        headers: { Authorization: `Bearer ${rootState.auth.token}` }
      };
      await axios.delete(`posts/${postId}`, headers);
      await dispatch("getAllPosts");
    } catch (error) {
      console.log(error);
    }
  },
  async insertPost({ commit, rootState, dispatch }, post) {
    let headers = {
      headers: { Authorization: `Bearer ${rootState.auth.token}` }
    };
    try {
      await axios.post("posts", post, headers).then(result => {
        if (result) commit("setError", false);
        else commit("setError", true);
      });
      await dispatch("getAllPosts");
    } catch (error) {
      console.log(error);
    }
  },
  async updatePost({ commit, rootState, dispatch }, post) {
    let headers = {
      headers: { Authorization: `Bearer ${rootState.auth.token}` }
    };
    try {
      await axios.put(`posts/${post.id}`, post, headers).then(result => {
        if (result) commit("setError", false);
        else commit("setError", true);
      });
      await dispatch("getAllPosts");
    } catch (error) {
      console.log(error);
    }
  },
  resetPost({ commit }) {
    commit("resetPost");
  },
  async resetPosts({ commit }) {
    commit("resetPosts");
  }
};
