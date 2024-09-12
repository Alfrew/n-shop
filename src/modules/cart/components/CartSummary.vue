<template>
  <div class="summary py-6 px-4 has-background-light">
    <h2 class="title has-text-centered">Order summary</h2>
    <div class="mb-3 has-border-bottom">
      <p class="is-flex is-justify-content-space-between">
        Item(s) subtotal <span>${{ cartTotal.toFixed(2) }}</span>
      </p>
    </div>

    <div class="mb-3 has-border-bottom">
      <p class="is-flex is-justify-content-space-between">
        Shipping
        <span v-if="shipping">${{ shipping }}</span>
        <span v-else>Free</span>
      </p>
    </div>

    <div class="mb-5">
      <p class="is-size-5 has-text-weight-bold is-flex is-justify-content-space-between">
        Order total <span>${{ orderTotal.toFixed(2) }}</span>
      </p>
    </div>

    <div class="buttons is-centered"><base-button color="is-success" mode="is-outlined" class="is-uppercase">Go to Checkout</base-button></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

const shipping = ref(0);

const store = useStore();
const cartTotal = computed<number>(() => store.getters["cart/cartTotal"]);

watch(cartTotal, (newValue) => {
  if (newValue > 0 && newValue < 80) {
    shipping.value = 10;
  } else {
    shipping.value = 0;
  }
});

const orderTotal = computed(() => {
  return cartTotal.value + shipping.value;
});
</script>

<style scoped lang="scss">
@import "../../../scss/variables.scss";

.summary {
  position: sticky;
  top: 0;
  border-radius: 16px;

  .has-border-bottom {
    border-bottom: 1px solid $lightGrayColor;
  }
}
</style>
