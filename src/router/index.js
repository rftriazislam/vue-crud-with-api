import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/category",
    name: "Category",
    component: () =>import("../components/category/category.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>import("../components/auth/login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>import("../components/auth/register.vue"),
  },
  {
    path: "/validate",
    name: "Validate",
    component: () =>import("../components/auth/validate.vue"),
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
