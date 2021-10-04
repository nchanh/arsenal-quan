import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'

const state = {
  token: null,
  fullname: null,
  role: null,
};

const namespaced = true;

export const auth = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};
