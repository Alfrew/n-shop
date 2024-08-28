<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/"> FinGames </router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <router-link v-if="isLogged" class="navbar-item" :to="{ name: 'adminProductList' }"> Products </router-link>
        <router-link v-else class="navbar-item" :to="{ name: 'userAuth' }">
          <span class="icon"> <i class="fas fa-user"></i></span>
        </router-link>
        <router-link class="navbar-item" :to="{ name: 'cart' }">
          <base-badge :badge-value="cartQuantity">
            <span class="icon"> <i class="fas fa-shopping-cart"></i></span>
          </base-badge>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import BaseBadge from "../utilities/BaseBadge.vue";
import { useStore } from "vuex";

const store = useStore();
const isLogged = computed<boolean>(() => store.getters["isAuthenticated"]);
const cartQuantity = computed<number>(() => store.getters["cart/cartQuantity"]);
</script>

<style lang="scss" scoped>
.navbar,
.navbar-end {
  display: flex;
  align-items: stretch;
}
.navbar-menu {
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  box-shadow: none;
}
.navbar-end {
  justify-content: flex-end;
  margin-inline-start: auto;
}
</style>
