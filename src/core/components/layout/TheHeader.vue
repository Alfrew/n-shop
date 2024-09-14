<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" title="Products page" to="/"> FinGames </router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <transition-fade>
          <router-link v-if="isLogged" class="navbar-item" title="Admin page" :to="{ name: 'adminProductList' }">
            <span class="icon"><i class="fas fa-list"></i></span>
          </router-link>
        </transition-fade>

        <transition-fade>
          <span v-if="isLogged" class="navbar-link is-arrowless" title="Logout" @click="logout()">
            <span class="icon"><i class="fas fa-right-from-bracket"></i></span>
          </span>

          <router-link v-else class="navbar-item" title="Login page" :to="{ name: 'userAuth' }">
            <span class="icon"><i class="fas fa-user"></i></span>
          </router-link>
        </transition-fade>

        <transition-fade>
          <span v-if="isLightTheme" class="navbar-link is-arrowless" title="Enable dark theme" @click="toggleTheme()">
            <span class="icon"><i class="fas fa-moon"></i></span>
          </span>
          <span v-else class="navbar-link is-arrowless" title="Enable light theme" @click="toggleTheme()">
            <span class="icon"><i class="fas fa-sun"></i></span>
          </span>
        </transition-fade>

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
import { computed, ref } from "vue";
import { useStore } from "vuex";
import BaseBadge from "../utilities/BaseBadge.vue";
import TransitionFade from "../animations/TransitionFade.vue";

const theme = ref<"light" | "dark">("light");
const isLightTheme = computed<boolean>(() => theme.value == "light");
document.querySelector("html")!.setAttribute("data-theme", theme.value);
function toggleTheme() {
  theme.value = isLightTheme.value ? "dark" : "light";
  document.querySelector("html")!.setAttribute("data-theme", theme.value);
}

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
