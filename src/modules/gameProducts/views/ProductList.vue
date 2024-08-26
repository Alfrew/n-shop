<template>
  <ul class="grid is-col-min-10 is-column-gap-4 is-row-gap-8">
    <li v-for="productGame in productGames" :key="productGame.id" class="cell">
      <enter-animate animationType="special-fade">
        <game-product-item :product-game="productGame"></game-product-item>
      </enter-animate>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import GameProductItem from "../components/GameProductItem.vue";
import EnterAnimate from "@/core/components/utilities/EnterAnimate.vue";
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
