export const getters = {
  isAuthenticated: state => !!state.token,
  getRole: state => state.role,
  getToken: state => state.token,
  getFullname: state => state.fullname
}
