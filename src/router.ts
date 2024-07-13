import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { productRoutes } from './modules/gameProducts/routes';
import { cartRoutes } from './modules/cart/routes';
import { adminRoutes } from './modules/admin/routes';
import { authRoutes } from './modules/auth/routes';

const routes: Array<RouteRecordRaw> = [];

routes.push(...productRoutes);
routes.push(...cartRoutes);
routes.push(...authRoutes);
routes.push(...adminRoutes);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
