import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Confirmation from "../views/Confirmation.vue";
import NewAccount from "../views/NewAccount.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/confirmation",
    name: "Confirmation",
    component: Confirmation,
  },
  {
    path: "/new_account",
    name: "New_Account",
    component: NewAccount,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: -100 }
  }
});

export default router;
