require("./bootstrap");

window.Vue = require("vue");

import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import VeeValidate from "vee-validate";
import Toast from "vue-toastification";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-toastification/dist/index.css";

import router from "./router";
import { store } from "./store";

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: "veeFields",
  errorBagName: "veeErrors"
});
Vue.config.productionTip = false;

const options = {
  position: "top-right",
  timeout: 3500,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: false,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
};
Vue.use(Toast, options);

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {

        originalRequest._retry = true;
        store.dispatch('LogOut')
        return router.push('/login')
    }
  }
})

const app = new Vue({
  el: "#app",
  components: { App },
  router,
  store
});
