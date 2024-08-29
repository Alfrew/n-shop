<template>
  <div class="quantity-control">
    <button class="button is-white is-left" :disabled="hasReachedMinLimit" @click="reduceQuantity()">
      <span class="icon"><i class="fa fa-minus"></i></span>
    </button>
    <div class="quantity-control__label">{{ quantity }}</div>
    <button class="button is-white is-right" :disabled="hasReachedMaxLimit" @click="increaseQuantity()">
      <span class="icon"><i class="fa fa-plus"></i></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";

let quantity = defineModel<number>({ required: true });

const props = defineProps({ quantityMaxLimit: { type: Number, required: false }, quantityMinLimit: { type: Number, required: false, default: 1 } });
const { quantityMaxLimit, quantityMinLimit } = toRefs(props);

const hasReachedMinLimit = computed(() => {
  return quantityMinLimit.value >= quantity.value;
});
function reduceQuantity() {
  if (!hasReachedMinLimit.value) {
    quantity.value--;
  }
}

const hasReachedMaxLimit = computed(() => {
  if (quantityMaxLimit) {
    return quantityMaxLimit.value! <= quantity.value;
  } else {
    return false;
  }
});
function increaseQuantity() {
  if (!hasReachedMaxLimit.value) {
    quantity.value++;
  }
}
</script>

<style scoped lang="scss">
@import "../../../scss/variables.scss";

$borderRadius: 12px;

.quantity-control {
  display: flex;
  border: 1px solid $lightGrayColor;
  max-width: min-content;
  border-radius: $borderRadius;

  .quantity-control__label {
    padding: 12px 0px;
    min-width: 40px;
  }

  button {
    border-radius: $borderRadius;
    &.is-left {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &.is-right {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
