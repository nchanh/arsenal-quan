import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import { auth } from './modules/auth';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth: auth
  },
  plugins: [createPersistedState()]
});

store.state.auth

