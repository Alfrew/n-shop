<template>
  <div class="card">
    <div class="card-image">
      <figure class="image">
        <img :src="productGame.imageUrl" alt="Game cover" />
      </figure>
    </div>
    <header class="card-content">
      <p class="title">{{ productGame.name }}</p>
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
import { PropType, computed, toRefs } from 'vue';
import { GameProduct } from '../models/GameProduct';

const props = defineProps({ productGame: { type: Object as PropType<GameProduct>, required: true } });
const { productGame } = toRefs(props);

const productGameLink = computed(() => {
  return { name: 'productDetail', params: { id: productGame.value.id } };
});
</script>

<style scoped lang="scss">
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.card-content {
  flex: 1;
}
</style>
