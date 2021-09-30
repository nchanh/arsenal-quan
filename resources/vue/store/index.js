import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import { auth } from './modules/auth';
import { moduleCategory } from './modules/categories'
import { modulePost } from './modules/posts'
import { moduleUser } from './modules/users'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth: auth,
    category: moduleCategory,
    post: modulePost,
    user: moduleUser,
  },
  plugins: [createPersistedState()]
});

store.state.auth
store.state.category
store.state.post
store.state.user
