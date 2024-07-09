import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { productRoutes } from './modules/products';
import { cartRoutes } from './modules/cart';
import { adminRoutes } from './modules/admin';
import { authRoutes } from './modules/auth';

const routes: Array<RouteRecordRaw> = [];

routes.concat(productRoutes);
routes.concat(cartRoutes);
routes.concat(authRoutes);
routes.concat(adminRoutes);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
