require("./bootstrap");

window.Vue = require("vue");

import Vue from "vue";
import VueRouter from "vue-router";
import VueAxios from "vue-axios";
import axios from "axios";
import VueI18n from 'vue-i18n';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueI18n);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import App from './views/App'
import WelcomeComponent from './views/Welcome'

const routes = [
  {
    name: "welcome",
    path: "/",
    component: WelcomeComponent,
  },
];

const router = new VueRouter({
  mode: "history",
  routes: routes,
});

const app = new Vue({
  el: "#app",
  components: { App },
  router,
});
