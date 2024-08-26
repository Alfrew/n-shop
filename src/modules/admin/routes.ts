import { RouteRecordRaw } from "vue-router";
import AdminProductList from "./views/AdminProductList.vue";

export const adminRoutes: Array<RouteRecordRaw> = [{ name: "adminProductList", path: "/admin/games", component: AdminProductList, meta: { requiresAuth: true } }];
