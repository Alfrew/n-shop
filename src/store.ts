import { createStore } from 'vuex';
import admin from './modules/admin/store/admin';
import auth from './modules/auth/store/auth';
import cart from './modules/cart/store/cart';
import products from './modules/products/store/products';

export default createStore<any>({
  modules: {
    admin,
    auth,
    cart,
    products,
  },
});
