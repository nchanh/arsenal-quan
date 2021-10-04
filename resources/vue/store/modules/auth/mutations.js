export const mutations = {
  setToken(state, tokenInput) {
    state.token = tokenInput;
  },
  setFullname(state, fullnameInput) {
    state.fullname = fullnameInput;
  },
  setRole(state, roleInput) {
    state.role = roleInput;
  },
  setLogOut(state) {
    state.token = null;
    state.fullname = null;
    state.role = null;
  },
  register(state) {
    state.fullname = null;
  }
}
