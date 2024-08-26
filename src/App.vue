<template>
  <the-header></the-header>
  <div class="router-wrapper">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import TheHeader from "./core/components/layout/TheHeader.vue";
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

.page-wrapper {
  max-height: calc(100svh - 124px);
  overflow: hidden;
}
</style>
