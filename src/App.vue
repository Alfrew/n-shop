<template>
  <the-header></the-header>
  <div class="router-wrapper">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import TheHeader from "./core/components/layout/TheHeader.vue";
import { useStore } from "vuex";

const store = useStore();
onMounted(() => {
  store.dispatch("cart/getCartStorage");
  store.dispatch("tryLogin");
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.router-wrapper {
  margin: 48px auto 24px;
  max-width: 1080px;
  padding: 0 24px;
}
</style>
