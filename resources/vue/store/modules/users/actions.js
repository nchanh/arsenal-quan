import router from "../../../router";

export const actions = {
  async getUserLogged({ commit, rootState }) {
    let headers = {
        headers: { Authorization: `Bearer ${rootState.auth.token}` }
      };
    let response = await axios.get('get-user', headers);
    commit("setUserLogged", response.data);
  },
  setUserLoggedEmpty({ commit }) {
    commit("setUserLoggedEmpty");
  },
  async updateUser({ commit, rootState, dispatch }, user) {
    let headers = {
        headers: { Authorization: `Bearer ${rootState.auth.token}` }
      };
    try {
      await axios.put(`users/${user.id}`, user, headers).then(result => {
        if (result) commit("setError", false);
        else commit("setError", true);
      });
      await dispatch("getUserLogged");
    } catch (error) {
      console.log(error);
    }
  },
  async updateImageUser({ commit, rootState, dispatch }, user) {
    let headers = {
        headers: { Authorization: `Bearer ${rootState.auth.token}` }
      };
    try {
      await axios.put(`update-image/${user.id}`, user, headers).then(result => {
        if (result) commit("setError", false);
        else commit("setError", true);
      });
      await dispatch("getUserLogged");
    } catch (error) {
      console.log(error);
    }
  },
  async changePassword({ commit, rootState }, passwords) {
    let headers = {
        headers: { Authorization: `Bearer ${rootState.auth.token}` }
      };
    try {
      await axios.put(`change-password/${passwords.userId}`, passwords, headers).then(result => {
        if (result) commit("setError", false);
        else commit("setError", true);
      });
    } catch (error) {
      console.log(error);
    }
  },
};
