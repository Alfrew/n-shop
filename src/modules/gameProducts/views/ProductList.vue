<template>
  <div>
    <div class="fixed-grid has-6-cols mb-6">
      <div class="grid">
        <div class="cell is-col-span-6 is-col-span-2-tablet"><base-sort :sortList="sortList" @sort-action="changeSort($event)"></base-sort></div>
        <div class="cell is-col-from-end-1 is-align-content-end"></div>
      </div>
    </div>

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
import { GameProductFilters, GameProductSortListItem, gameProductSortType } from "../models/GameProductFilters";
import { useStore } from "vuex";
import BaseNotification from "@/core/components/elements/BaseNotification.vue";
import BaseSort from "@/core/components/elements/BaseSort.vue";
import EnterAnimate from "@/core/components/animations/EnterAnimate.vue";
import GameProductItem from "../components/GameProductItem.vue";

onMounted(() => {
  loadProducts();
});

const elementsPerPage = 12;

const filters = reactive<GameProductFilters>({
  forceRefresh: true,
  take: elementsPerPage,
  skip: 0,
});

const sortList: GameProductSortListItem[] = [
  { label: "Featured", value: "default" },
  { label: "Release date (oldest first)", value: "releaseDate-asc" },
  { label: "Release date (newest first)", value: "releaseDate-desc" },
  { label: "Title (A-Z)", value: "name-asc" },
  { label: "Title (Z-A)", value: "name-desc" },
  { label: "Price (Low to high)", value: "price-asc" },
  { label: "Price (High to low)", value: "price-desc" },
];

function changeSort(sortValue: gameProductSortType) {
  if (sortValue == "default") {
    filters.orderProperty = undefined;
    filters.orderDirection = undefined;
  } else if (sortValue.split("-")[1] == "asc" || sortValue.split("-")[1] == "desc") {
    filters.orderProperty = sortValue.split("-")[0];
    filters.orderDirection = sortValue.split("-")[1] as "asc" | "desc";
  }
  filters.skip = 0;
  filters.take = elementsPerPage;
  loadProducts();
}

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
