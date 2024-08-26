<template>
  <ul class="grid is-col-min-10">
    <li v-for="productGame in productGames" :key="productGame.id" class="cell">
      <game-product-item :product-game="productGame"></game-product-item>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import GameProductItem from "../components/GameProductItem.vue";
import { GameProduct } from "../models/GameProduct";
import { computed, onMounted, ref } from "vue";

onMounted(() => {
  loadProducts();
});

const store = useStore();
const productGames = computed<GameProduct[]>(() => store.getters["gameProducts/gameProductList"]);
const error = ref("");
const isLoading = ref(false);
async function loadProducts(forceRefresh = false) {
  isLoading.value = true;
  try {
    await store.dispatch("gameProducts/loadGameProductList", {
      forceRefresh: forceRefresh,
    });
  } catch (err: any) {
    error.value = err.message || "Something went wrong, try again later";
  }
  isLoading.value = false;
}
</script>
