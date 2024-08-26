import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { productRoutes } from "./modules/gameProducts/routes";
import { cartRoutes } from "./modules/cart/routes";
import { adminRoutes } from "./modules/admin/routes";
import { authRoutes } from "./modules/auth/routes";
import store from "./store";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/games" },
  { path: "/:notFound(.*)", redirect: "/games" },
];

routes.push(...productRoutes);
routes.push(...cartRoutes);
routes.push(...authRoutes);
routes.push(...adminRoutes);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next({ name: "userAuth" });
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next({ name: "productList" });
  } else {
    next();
  }
});

export default router;
