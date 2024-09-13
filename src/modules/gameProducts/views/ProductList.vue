<template>
  <div>
    <ul class="grid is-col-min-10 is-column-gap-4 is-row-gap-8">
      <li v-for="productGame in productGames" :key="productGame.id" class="cell">
        <enter-animate animationType="special-fade" :has-full-height="true">
          <game-product-item :product-game="productGame"></game-product-item>
        </enter-animate>
      </li>
    </ul>
    <div class="buttons is-centered" v-if="!allLoaded">
      <base-button icon="fa-plus" color="is-primary" class="is-uppercase" :isLoading="isLoading" @click="loadMore(elementsPerPage)">Load more results</base-button>
    </div>
    <base-notification v-else color="is-success" class="has-text-centered" :is-light="true">Congratulations! You've reached the end of the catalog!</base-notification>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { GameProduct } from "../models/GameProduct";
import { GameProductFilters } from "../models/GameProductFilters";
import { useStore } from "vuex";
import BaseNotification from "@/core/components/elements/BaseNotification.vue";
import EnterAnimate from "@/core/components/animations/EnterAnimate.vue";
import GameProductItem from "../components/GameProductItem.vue";

const elementsPerPage = 12;

onMounted(() => {
  loadProducts();
});

const filters = reactive<GameProductFilters>({
  forceRefresh: true,
  take: elementsPerPage,
  skip: 0,
});

const store = useStore();
const productGames = computed<GameProduct[]>(() => store.getters["gameProducts/gameProductList"]);

const error = ref("");
const isLoading = ref(false);
async function loadProducts() {
  isLoading.value = true;
  try {
    await store.dispatch("gameProducts/loadGameProductList", filters);
  } catch (err: any) {
    error.value = err.message || "Something went wrong, try again later";
  }
  isLoading.value = false;
}

async function loadMore(quantity: number) {
  filters.skip! += quantity;
  filters.take! += quantity;

  isLoading.value = true;
  try {
    await store.dispatch("gameProducts/loadMoreProducts", filters);
  } catch (err: any) {
    error.value = err.message || "Something went wrong, try again later";
  }
  isLoading.value = false;
}

const allLoaded = computed(() => {
  const areAllLoaded = productGames.value.length < filters.take!;
  return areAllLoaded && !isLoading.value;
});
</script>
