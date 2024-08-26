import { RouteRecordRaw } from "vue-router";
import UserAuth from "./views/UserAuth.vue";

export const authRoutes: Array<RouteRecordRaw> = [{ name: "userAuth", path: "/auth", component: UserAuth, meta: { requiresUnauth: true } }];
