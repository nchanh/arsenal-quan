export const mutations = {
  setToken(state, tokenInput) {
    state.token = tokenInput;
  },
  setFullname(state, fullnameInput) {
    state.fullname = fullnameInput;
  },
  setLogOut(state) {
    state.token = null;
    state.fullname = null;
  },
  register(state) {
    state.fullname = null;
  }
}
