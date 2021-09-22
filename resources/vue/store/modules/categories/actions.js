export const actions = {
  async GetPosts({ commit }) {
    let response = await axios.get("categories");
    commit("setCategories", response.data);
  }
};
