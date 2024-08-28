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
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.router-wrapper {
  margin: 48px 24px 24px;
}
</style>
