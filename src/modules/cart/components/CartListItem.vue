<template>
  <div class="cart-list-item columns is-tablet py-5">
    <router-link :to="productGameLink" class="column">
      <figure class="item-cover image is-16by9 animated-placeholder-bg">
        <div v-if="cartProduct.coverUrl" class="has-ratio cover" :style="'background-image: url(' + cartProduct.coverUrl + ')'"></div>
      </figure>
    </router-link>
    <div class="column">
      <router-link class="title is-6" :to="productGameLink" :title="cartProduct.name">{{ cartProduct.name }}</router-link>
      <p class="mt-3">${{ cartProduct.price }}</p>
    </div>
    <div class="column is-flex is-justify-content-space-between">
      <div>
        <p class="is-size-7 has-text-grey-light mb-1">Quantity</p>
        <base-quantity-control
          :quantity="cartProduct.quantity"
          :quantity-max-limit="cartProduct.inStock"
          @increase="increaseQuantity()"
          @decrease="decreaseQuantity()"></base-quantity-control>
      </div>
      <div>
        <p class="mb-4 has-text-centered has-text-weight-bold">${{ itemTotal.toFixed(2) }}</p>
        <base-button mode="is-text" @click="removeItem(cartProduct.id)">Remove</base-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseQuantityControl from "@/core/components/elements/BaseQuantityControl.vue";
import { computed, PropType, toRefs } from "vue";
import { CartGameProduct } from "../models/CartGameProduct";
import { useStore } from "vuex";

const props = defineProps({ cartProduct: { type: Object as PropType<CartGameProduct>, required: true } });
const { cartProduct } = toRefs(props);

const productGameLink = computed(() => {
  return { name: "productDetail", params: { id: cartProduct.value.id } };
});

const itemTotal = computed(() => {
  return cartProduct.value.price * cartProduct.value.quantity;
});

function decreaseQuantity() {
  store.dispatch("cart/reduceQuantityForItem", cartProduct.value.id);
}

function increaseQuantity() {
  store.dispatch("cart/addItemToCart", cartProduct.value);
}

const store = useStore();
function removeItem(id: string) {
  store.dispatch("cart/removeItemFromCart", id);
}
</script>

<style scoped lang="scss">
@import "../../../scss/variables.scss";

.item-cover {
  border-radius: 16px;
  border: 1px solid $lightGrayColor;
  overflow: hidden;
  min-width: 200px;
}

.title {
  transition: color 250ms linear;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
  &:hover {
    color: $mainColor;
  }
}
</style>
