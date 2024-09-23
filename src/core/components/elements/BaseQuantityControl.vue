<template>
  <div class="quantity-control">
    <button class="button is-left" :disabled="hasReachedMinLimit" @click="reduceQuantity()">
      <span class="icon"><i class="fa fa-minus"></i></span>
    </button>
    <div class="quantity-control__label">{{ quantity }}</div>
    <button class="button is-right" :disabled="hasReachedMaxLimit" @click="increaseQuantity()">
      <span class="icon"><i class="fa fa-plus"></i></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";

const emit = defineEmits(["increase", "decrease"]);

const props = defineProps({
  quantity: { type: Number, required: true },
  quantityMaxLimit: { type: Number, required: false },
  quantityMinLimit: { type: Number, required: false, default: 1 },
});
const { quantity, quantityMaxLimit, quantityMinLimit } = toRefs(props);

const hasReachedMinLimit = computed(() => {
  return quantityMinLimit.value >= quantity.value;
});
function reduceQuantity() {
  if (!hasReachedMinLimit.value) {
    emit("decrease");
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
    emit("increase");
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
    text-align: center;
  }

  button {
    border-radius: $borderRadius;
    border-width: 0px;
    &.is-left {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right-width: 1px;
    }
    &.is-right {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left-width: 1px;
    }
  }
}
</style>
