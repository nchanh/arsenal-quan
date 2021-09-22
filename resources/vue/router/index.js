import Vue from "vue";
import VueRouter from "vue-router";
import { store } from "../store";

import WelcomeComponent from "../components/public/WelcomeComponent";
import LoginComponent from "../components/public/Login";
import RegisterComponent from "../components/public/Register";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: WelcomeComponent
  },
  {
    path: "/login",
    name: "login",
    component: LoginComponent,
    meta: { guest: true }
  },
  {
    path: "/register",
    name: "register",
    component: RegisterComponent,
    meta: { guest: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  console.log();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters['auth/isAuthenticated']) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters['auth/isAuthenticated']) {
      Vue.prototype.$toast.error('Please log out to use the function.');
      next(from['path']);
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
