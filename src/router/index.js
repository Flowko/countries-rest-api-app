import { createRouter,createWebHistory  } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    title:'Countries',
    name: "Home",
    component: Home,
  },
  {
    path: "/country/:country",
    name: "Country",
    component: () =>
      import("../views/Country.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
