import Vue from "vue";
import VueRouter from "vue-router";

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
  } else {
    next();
  }
});

export default router;
