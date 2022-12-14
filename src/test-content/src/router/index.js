import HomeView from "../views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  // routes requiring auth
  {
    path: "/books",
    name: "books",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/books/BooksView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DashboardView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/flyers",
    name: "flyers",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/flyers/FlyersView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/flyer-maker/:name",
    name: "flyer-maker",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/flyers/FlyerMakerView.vue"
      ),
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProfileView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/support",
    name: "support",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SupportView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
