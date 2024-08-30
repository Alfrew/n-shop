<template>
  <div class="cart-list-item is-flex is-justify-content-space-between py-5">
    <div class="is-flex is-flex-grow-5">
      <router-link :to="productGameLink" class="item-cover image is-16by9 mr-5">
        <figure class="image is-16by9">
          <img :src="cartProduct.coverUrl" alt="Game cover" />
        </figure>
      </router-link>
      <div class="has-text-left">
        <router-link class="title is-6" :to="productGameLink" :title="cartProduct.name">{{ cartProduct.name }}</router-link>
        <p class="mt-3">${{ cartProduct.price }}</p>
      </div>
    </div>
    <div class="is-flex">
      <div>
        <p class="is-size-7 has-text-grey-light has-text-left mb-1">Quantity</p>
        <base-quantity-control
          :quantity="cartProduct.quantity"
          :quantity-max-limit="cartProduct.inStock"
          @increase="increaseQuantity()"
          @decrease="decreaseQuantity()"></base-quantity-control>
      </div>
      <div class="ml-6">
        <p class="mb-4">${{ itemTotal.toFixed(2) }}</p>
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

.cart-list-item {
  height: 154px;
  width: 100%;

  .item-cover {
    border-radius: 16px;
    border: 1px solid $lightGrayColor;
    overflow: hidden;
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
}
</style>
