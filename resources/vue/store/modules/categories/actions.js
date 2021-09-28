export const actions = {
  async getCategories({ commit }) {
    let response = await axios.get("categories");
    commit("setCategories", response.data);
  }
};
