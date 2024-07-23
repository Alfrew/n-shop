import { RouteRecordRaw } from 'vue-router';
import ProductList from './views/ProductList.vue';
import ProductDetail from './views/ProductDetail.vue';

export const productRoutes: Array<RouteRecordRaw> = [
  { name: 'productList', path: '/games', component: ProductList },
  { name: 'productDetail', path: '/games/:id', props: true, component: ProductDetail },
];
