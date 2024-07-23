<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/"> FinGames </router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <router-link class="navbar-item" :to="{ name: 'userAuth' }">
          <span class="icon"> <i class="fas fa-user"></i></span>
        </router-link>
        <!-- <router-link class="navbar-item" :to="{ name: 'cart' }">
          <span class="icon"> <i class="fas fa-shopping-cart"></i></span>
        </router-link> -->
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
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
