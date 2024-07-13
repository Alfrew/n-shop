import { createStore } from 'vuex';
import admin from './modules/admin/store/admin';
import auth from './modules/auth/store/auth';
import cart from './modules/cart/store/cart';
import gameProducts from './modules/gameProducts/store/gameProducts';

export default createStore<any>({
  modules: {
    admin,
    auth,
    cart,
    gameProducts,
  },
});
