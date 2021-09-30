export const mutations = {
  setUserLogged(state, userInput) {
    state.userLogged = userInput;
  },
  setUserLoggedEmpty(state) {
    state.userLogged = {};
  },
  setError(state, errorInput) {
    state.error = errorInput;
  },
};
