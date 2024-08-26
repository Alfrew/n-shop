<template>
  <div class="card">
    <router-link :to="productGameLink" class="card-image">
      <figure class="image">
        <img :src="productGame.imageUrl" alt="Game cover" />
      </figure>
    </router-link>
    <header class="card-content">
      <router-link :to="productGameLink" class="title">{{ productGame.name }}</router-link>
      <p class="subtitle">${{ productGame.price }}</p>
    </header>
    <div class="card-footer">
      <router-link :to="productGameLink" class="card-footer-item">Details</router-link>
      <button class="card-footer-item">
        <span class="icon has-text-primary"><i class="fa fa-cart-plus" aria-hidden="true"></i> </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, toRefs } from "vue";
import { GameProduct } from "../models/GameProduct";

const props = defineProps({ productGame: { type: Object as PropType<GameProduct>, required: true } });
const { productGame } = toRefs(props);

const productGameLink = computed(() => {
  return { name: "productDetail", params: { id: productGame.value.id } };
});
</script>

<style scoped lang="scss">
@import "../../../scss/variables.scss";
.card {
  height: 100%;
  display: flex;
  flex-direction: column;

  .card-image {
    transition: transform 250ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
  }

  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title {
    transition: color 250ms linear;
  }

  &:hover {
    .card-image {
      transform: translate(0, -20px);
    }

    .title {
      color: $mainColor;
    }
  }
}
</style>
