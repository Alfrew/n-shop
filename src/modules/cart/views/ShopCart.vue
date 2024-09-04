<template>
  <div>
    <h1 class="title has-text-left">Shopping Cart</h1>
    <transition-fade>
      <div class="grid is-column-gap-6" v-if="cartProducts.length > 0">
        <ul class="cell is-col-span-2">
          <transition-fade>
            <li v-if="cartTotal > 80">
              <base-notification color="is-success" :is-light="true">Congratulations you've qualified for free shipping!</base-notification>
            </li>
          </transition-fade>
          <transition-slide :is-for-list="true">
            <li class="cart-item" v-for="cartProduct of cartProducts" :key="cartProduct.id">
              <cart-list-item :cart-product="cartProduct"></cart-list-item>
            </li>
          </transition-slide>
        </ul>

        <div class="cell">
          <cart-summary></cart-summary>
        </div>
      </div>

      <base-card v-else>
        <p class="title">No item in your cart</p>
        <p>Maybe check something <router-link :to="{ name: 'productList' }">here</router-link></p>
      </base-card>
    </transition-fade>
  </div>
</template>

<script setup lang="ts">
import CartListItem from "../components/CartListItem.vue";
import CartSummary from "../components/CartSummary.vue";
import BaseNotification from "@/core/components/elements/BaseNotification.vue";
import TransitionFade from "@/core/components/animations/TransitionFade.vue";
import TransitionSlide from "@/core/components/animations/TransitionSlide.vue";
import { useStore } from "vuex";
import { CartGameProduct } from "../models/CartGameProduct";
import { computed } from "vue";

const store = useStore();
const cartProducts = computed<CartGameProduct[]>(() => store.getters["cart/cartProductList"]);
const cartTotal = computed<number>(() => store.getters["cart/cartTotal"]);
</script>

<style scoped lang="scss">
@import "../../../scss/variables.scss";

.cart-item {
  border-bottom: 2px solid $lightGrayColor;

  &.slide-enter-active,
  &.slide-leave-active {
    border-bottom: none;
  }
}
</style>
