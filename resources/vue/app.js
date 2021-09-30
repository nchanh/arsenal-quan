require("./bootstrap");

window.Vue = require("vue");

import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import VeeValidate from "vee-validate";
import Toast from "vue-toastification";
import moment from "moment";
import tinymce from "vue-tinymce-editor";
import firebase from "firebase/app";

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

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("hh:mm DD/MM/YYYY");
  }
});
Vue.filter('formatOnlyDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY');
  }
});

Vue.component("tinymce", tinymce);

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.interceptors.response.use(undefined, function(error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch("LogOut");
      return router.push("/login");
    }
  }
});

firebase.initializeApp({
  apiKey: "AIzaSyAmKPUs8denVXNsHuQ5wNFsZJCLx28bPw8",
  authDomain: "arsenalquan-5105e.firebaseapp.com",
  projectId: "arsenalquan-5105e",
  storageBucket: "arsenalquan-5105e.appspot.com",
  messagingSenderId: "545217888521",
  appId: "1:545217888521:web:027adf3cbed1fb884c93d8",
  measurementId: "G-RZ1XLF9LK8"
});

const app = new Vue({
  el: "#app",
  components: { App },
  router,
  store
});
