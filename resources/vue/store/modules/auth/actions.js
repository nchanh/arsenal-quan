export const actions = {
  async Register({ dispatch }, form) {
    await axios.post("register", form).then((result) => {
      let data = result.data;
    });
    let UserForm = new FormData();
    UserForm.append("username", form.username);
    UserForm.append("password", form.password);
    await dispatch("LogIn", UserForm);
  },
  async LogIn({ commit }, User) {
    await axios.post("login", User).then(response => {
      commit("setToken", response.data.data.token);
      commit("setFullname", response.data.data.fullname);
      commit("setRole", response.data.data.role);
    });
  },
  async LogOut({ commit, state }) {
    let headers = { headers: { Authorization: `Bearer ${state.token}` } };
    await axios.post("logout", null, headers);
    commit("setLogOut");
  }
};
