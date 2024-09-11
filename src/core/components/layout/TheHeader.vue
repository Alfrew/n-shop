<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" title="Products page" to="/"> FinGames </router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <template v-if="isLogged">
          <router-link class="navbar-item" title="Admin page" :to="{ name: 'adminProductList' }">
            <span class="icon"><i class="fas fa-list"></i></span>
          </router-link>
          <span class="navbar-link is-arrowless" title="Logout" @click="logout()">
            <span class="icon"><i class="fas fa-right-from-bracket"></i></span>
          </span>
        </template>

        <router-link v-else class="navbar-item" title="Login page" :to="{ name: 'userAuth' }">
          <span class="icon"><i class="fas fa-user"></i></span>
        </router-link>

        <router-link class="navbar-item" title="Shopping cart" :to="{ name: 'cart' }">
          <base-badge :badge-value="cartQuantity">
            <span class="icon"><i class="fas fa-shopping-cart"></i></span>
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
function logout() {
  store.dispatch("logout");
}
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
