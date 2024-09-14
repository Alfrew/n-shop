<template>
  <div class="card">
    <router-link :to="productGameLink" class="card-image">
      <figure class="image is-1by1 animated-placeholder-bg">
        <div v-if="productGame.imageUrl" class="has-ratio cover" :style="'background-image: url(' + productGame.imageUrl + ')'"></div>
      </figure>
    </router-link>
    <header class="card-content">
      <div>
        <router-link :to="productGameLink" class="title is-4">{{ productGame.name }}</router-link>
        <p class="subtitle is-7">{{ formattedDate }}</p>
      </div>
      <p class="is-flex is-justify-content-space-between is-align-items-center">
        <b class="has-text-weight-bold is-size-5">${{ productGame.price }}</b>
        <base-tag :color="productGameTagColor" :is-rounded="true" size="is-medium">{{ productGame.type }}</base-tag>
      </p>
    </header>
    <div class="card-footer">
      <router-link :to="productGameLink" class="card-footer-item">Details</router-link>
      <button class="card-footer-item hover-scale" @click="addToCart(productGame)">
        <span class="icon has-text-primary"><i class="fa fa-cart-plus" aria-hidden="true"></i></span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComputedRef, PropType, computed, toRefs } from "vue";
import { GameProduct } from "../models/GameProduct";
import { RouteLocationRaw } from "vue-router";
import { useStore } from "vuex";
import BaseTag from "@/core/components/elements/BaseTag.vue";
import useDateParser from "@/core/hooks/dateParser";

const props = defineProps({ productGame: { type: Object as PropType<GameProduct>, required: true } });
const { productGame } = toRefs(props);

const productGameLink: ComputedRef<RouteLocationRaw> = computed(() => {
  const productName = productGame.value.name.split(" ").join("-");
  return { name: "productDetail", params: { id: productGame.value.id, title: productName } };
});

const { formatDate } = useDateParser();
const formattedDate = computed(() => {
  return formatDate(productGame.value.releaseDate);
});

const productGameTagColor = computed(() => {
  switch (productGame.value.type) {
    case "DLC":
      return "is-link";
    case "GAME":
      return "is-info";
    case "BUNDLE":
      return "is-warning";
    default:
      return "";
  }
});

const store = useStore();
function addToCart(gameProduct: GameProduct) {
  store.dispatch("cart/addItemToCart", gameProduct);
}
</script>

<style lang="scss" scoped>
@import "../../../scss/variables.scss";
.card {
  height: 100%;
  display: flex;
  flex-direction: column;

  .card-image {
    transition: transform 250ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    overflow: hidden;
  }

  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 12px;
    gap: 32px;
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
