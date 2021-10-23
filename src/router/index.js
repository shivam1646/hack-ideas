import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/home"),
  }, {
    path: "/login",
    name: "login",
    component: () => import("@/components/login"),
  }, {
    path: "/idea/:id",
    name: "idea",
    component: () => import("@/components/idea")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const user = sessionStorage.getItem('user');
  if (to.name !== "login" && !user) {
    next({ name: 'login'});
  } else if (to.name === "login" && user) {
    next({ name: 'home' });
  } else {
    if (!store.state.loggedInUser) {
      store.commit('setLoggedInUser', JSON.parse(user));
    }
    next();
  }
});

export default router;
