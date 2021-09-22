export const getters = {
  isAuthenticated: state => !!state.token,
  getToken: state => state.token,
  getFullname: state => state.fullname
}
