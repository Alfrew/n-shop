import { ActionContext } from "vuex";
import { CartGameProduct } from "../models/CartGameProduct";
import { CartStore } from "../models/CartStore";
import { GameProduct } from "@/modules/gameProducts/models/GameProduct";

export default {
  namespaced: true,
  state: {
    cart: [],
  },
  mutations: {
    updateCart(state: CartStore, payload: CartGameProduct[]) {
      state.cart = payload;
    },
  },
  actions: {
    addItemToCart(context: ActionContext<CartStore, CartStore>, payload: GameProduct) {
      const cart: CartGameProduct[] = context.getters.cartProductList;
      const productIdx = cart.findIndex((product) => {
        return product.id === payload.id;
      });
      const itemExistInCart = productIdx !== -1;
      if (itemExistInCart) {
        cart[productIdx].quantity += 1;
        //*
        if (payload.inStock && payload.inStock < cart[productIdx].quantity) {
          cart[productIdx].quantity = payload.inStock;
        }
        //*
      } else {
        const newCartItem: CartGameProduct = { ...payload, quantity: 1 };
        cart.push(newCartItem);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      context.commit("updateCart", cart);
    },
    removeItemFromCart(context: ActionContext<CartStore, CartStore>, payload: string) {
      const cart: CartGameProduct[] = context.getters.cartProductList;
      const productIdx = cart.findIndex((product) => {
        return product.id === payload;
      });
      cart.splice(productIdx, 1);

      localStorage.setItem("cart", JSON.stringify(cart));
      context.commit("updateCart", cart);
    },
    reduceQuantityForItem(context: ActionContext<CartStore, CartStore>, payload: string) {
      const cart: CartGameProduct[] = context.getters.cartProductList;
      const productIdx = cart.findIndex((product) => {
        return product.id === payload;
      });
      cart[productIdx].quantity -= 1;

      localStorage.setItem("cart", JSON.stringify(cart));
      context.commit("updateCart", cart);
    },
    getCartStorage(context: ActionContext<CartStore, CartStore>) {
      const jsonCart = localStorage.getItem("cart");

      if (jsonCart) {
        const cart = JSON.parse(jsonCart);
        context.commit("updateCart", cart);
      }
    },
  },
  getters: {
    cartProductList(state: CartStore): CartGameProduct[] {
      return state.cart;
    },
    cartTotal(state: CartStore): number {
      let cartTotal = 0;
      state.cart.forEach((game) => {
        cartTotal += game.price * game.quantity;
      });
      return cartTotal;
    },
    cartQuantity(state: CartStore): number {
      let cartQuantity = 0;
      state.cart.forEach((game) => {
        cartQuantity += game.quantity;
      });
      return cartQuantity;
    },
  },
};
