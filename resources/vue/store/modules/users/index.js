import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'

const state = {
  userLogged: {},
  error: false,
};

const namespaced = true;

export const moduleUser = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};
