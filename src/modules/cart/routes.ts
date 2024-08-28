import { RouteRecordRaw } from "vue-router";
import ShopCart from "./views/ShopCart.vue";

export const cartRoutes: Array<RouteRecordRaw> = [{ name: "cart", path: "/cart", component: ShopCart }];
