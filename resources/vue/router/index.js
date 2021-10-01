import Vue from "vue";
import VueRouter from "vue-router";
import { store } from "../store";

import PageNotFound from "../components/errors/PageNotFound.vue";
import HomeComponent from "../components/public/HomeComponent";
import LoginComponent from "../components/public/Login";
import RegisterComponent from "../components/public/Register";
import PostDetailComponent from "../components/public/PostDetailComponent.vue";
import PostManagerComponent from "../components/public/PostManagerComponent.vue";
import ProfileComponent from '../components/public/ProfileComponent.vue'
import SearchCategoryComponent from '../components/public/SearchCategoryComponent.vue'
import SearchComponent from '../components/public/SearchComponent.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "urlNotFound",
    component: PageNotFound },
  {
    path: "/",
    name: "home",
    component: HomeComponent
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
  },
  {
    path: "/post/:Pslug",
    name: "postDetail",
    component: PostDetailComponent,
    meta: { guest: true }
  },
  {
    path: "/posts/manager",
    name: "postManager",
    component: PostManagerComponent,
    meta: { requiresAuth: true }
  },
  {
    path: "/profile",
    name: "profileUser",
    component: ProfileComponent,
    meta: { requiresAuth: true }
  },
  {
    path: "/category/:categorySlug",
    name: "searchCategory",
    component: SearchCategoryComponent,
    meta: { guest: true }
  },
  {
    path: "/search/:keyword",
    name: "search",
    component: SearchComponent,
    meta: { guest: true }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return window.scrollTo({
        top: document.querySelector(to.hash).offsetTop,
        behavior: "smooth"
      });
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["auth/isAuthenticated"]) {
      next();
      return;
    }
    Vue.prototype.$toast.error("Vui lòng đăng nhập để sử dụng chức năng.");
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.guest)) {
    if (store.getters["auth/isAuthenticated"]) {
      Vue.prototype.$toast.error("Vui lòng đăng xuất để sử dụng chức năng.");
      next("/");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
