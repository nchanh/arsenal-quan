import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'

const state = {
  categories: {},
};

const namespaced = true;

export const moduleCategory = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};
