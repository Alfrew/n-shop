<template>
  <base-box>
    <div class="columns is-gap-6">
      <div class="column is-three-fifths">
        <enter-animate animation-type="special-fade">
          <figure class="item-cover image is-16by9 animated-placeholder-bg">
            <div v-if="productGame.coverUrl" class="has-ratio cover" :style="'background-image: url(' + productGame.coverUrl + ')'"></div>
          </figure>
        </enter-animate>
      </div>
      <div class="column">
        <enter-animate animation-type="special-fade">
          <h2 class="title" :title="productGame.name">{{ productGame.name }}</h2>
          <p class="subtitle is-6" :title="productGame.releaseDate">{{ formattedDate }}</p>
        </enter-animate>
        <div class="is-flex is-justify-content-space-between is-align-items-center my-5">
          <enter-animate animation-type="special-fade">
            <p class="is-size-4 has-text-weight-medium">${{ productGame.price }}</p>
          </enter-animate>
          <base-button icon="fa-shopping-cart" color="is-primary" mode="is-outlined" class="is-uppercase" @click="addToCart(productGame)">Add to cart</base-button>
        </div>
        <enter-animate animation-type="special-fade">
          <h3 class="title is-5">Description</h3>
          <p>{{ productGame.description }}</p>
        </enter-animate>
      </div>
    </div>
  </base-box>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import { GameProduct } from "../models/GameProduct";
import { useStore } from "vuex";
import EnterAnimate from "@/core/components/animations/EnterAnimate.vue";
import useDateParser from "@/core/hooks/dateParser";

const props = defineProps({ id: { type: String, required: true }, title: { type: String, required: false, default: "Game Detail" } });
const { id, title } = toRefs(props);
document.title = title.value.split("-").join(" ");

const store = useStore();
const productGame = computed<GameProduct>(() => store.getters["gameProducts/gameProductById"](id.value));

const { formatDate } = useDateParser();
const formattedDate = computed(() => {
  return formatDate(productGame.value.releaseDate);
});

function addToCart(gameProduct: GameProduct) {
  store.dispatch("cart/addItemToCart", gameProduct);
}
</script>

<style scoped lang="scss">
.item-cover {
  border-radius: 16px;
  overflow: hidden;
}
</style>
