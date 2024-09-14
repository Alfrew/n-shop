<template>
  <div>
    <base-page-title pageTitle="Shopping Cart"></base-page-title>
    <transition-fade>
      <div class="cart columns is-desktop" v-if="cartProducts.length > 0">
        <div class="column is-one-quarter-desktop">
          <cart-summary></cart-summary>
        </div>

        <ul class="column">
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
      </div>

      <base-box v-else>
        <div class="has-text-centered py-6">
          <h3 class="title">No items in your cart</h3>
          <p>Maybe check something <router-link :to="{ name: 'productList' }">here</router-link></p>
        </div>
      </base-box>
    </transition-fade>
  </div>
</template>

<script setup lang="ts">
import { CartGameProduct } from "../models/CartGameProduct";
import { computed } from "vue";
import { useStore } from "vuex";
import BaseNotification from "@/core/components/elements/BaseNotification.vue";
import CartListItem from "../components/CartListItem.vue";
import CartSummary from "../components/CartSummary.vue";
import TransitionFade from "@/core/components/animations/TransitionFade.vue";
import TransitionSlide from "@/core/components/animations/TransitionSlide.vue";

const store = useStore();
const cartProducts = computed<CartGameProduct[]>(() => store.getters["cart/cartProductList"]);
const cartTotal = computed<number>(() => store.getters["cart/cartTotal"]);
</script>

<style scoped lang="scss">
@import "../../../scss/variables.scss";

.cart.columns.is-desktop {
  flex-direction: row-reverse;
}

.cart-item {
  border-bottom: 2px solid $lightGrayColor;

  &.slide-enter-active,
  &.slide-leave-active {
    border-bottom: none;
  }
}
</style>
